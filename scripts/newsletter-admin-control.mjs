#!/usr/bin/env node
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import http from 'node:http';

const HOST = process.env.NEWSLETTER_ADMIN_HOST || '127.0.0.1';
const PORT = Number(process.env.NEWSLETTER_ADMIN_PORT || 3467);
const PID_FILE = process.env.NEWSLETTER_ADMIN_PID || '/tmp/ahn-newsletter-admin.pid';
const LOG_FILE = process.env.NEWSLETTER_ADMIN_PROCESS_LOG || '/tmp/ahn-newsletter-admin.out';
const TOKEN_FILE = process.env.NEWSLETTER_ADMIN_TOKEN_FILE || '.netlify/newsletter-admin-token';
const command = process.argv[2] || 'status';

function token() {
  if (process.env.NEWSLETTER_ADMIN_TOKEN) return process.env.NEWSLETTER_ADMIN_TOKEN;
  if (existsSync(TOKEN_FILE)) return readFileSync(TOKEN_FILE, 'utf8').trim();
  return '';
}

function request(path, timeoutMs = 3000) {
  return new Promise((resolve, reject) => {
    const req = http.get(`http://${HOST}:${PORT}${path}`, (res) => {
      let data = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve({ status: res.statusCode, data }));
    });
    req.on('error', reject);
    req.setTimeout(timeoutMs, () => req.destroy(new Error('timeout')));
  });
}

async function isRunning() {
  const t = token();
  if (!t) return false;
  try {
    const res = await request(`/api/health`, 5000);
    return res.status === 200;
  } catch (_) {
    return false;
  }
}

function processAlive(pid) {
  try { process.kill(pid, 0); return true; } catch { return false; }
}

async function start() {
  if (await isRunning()) {
    console.log(JSON.stringify({ ok: true, alreadyRunning: true, url: `http://${HOST}:${PORT}/?token=${token()}` }, null, 2));
    return;
  }
  mkdirSync('exports', { recursive: true });
  const out = await import('node:fs').then((fs) => fs.openSync(LOG_FILE, 'a'));
  const child = spawn(process.execPath, ['scripts/newsletter-admin-server.mjs'], {
    cwd: process.cwd(),
    detached: true,
    stdio: ['ignore', out, out],
    env: process.env,
  });
  child.unref();
  writeFileSync(PID_FILE, String(child.pid));
  const deadline = Date.now() + 15000;
  while (Date.now() < deadline) {
    if (await isRunning()) {
      console.log(JSON.stringify({ ok: true, started: true, pid: child.pid, url: `http://${HOST}:${PORT}/?token=${token()}`, log: LOG_FILE }, null, 2));
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 750));
  }
  throw new Error(`관리자 서버 시작 실패. 로그: ${LOG_FILE}`);
}

async function status() {
  const t = token();
  const running = await isRunning();
  let pid = null;
  if (existsSync(PID_FILE)) pid = Number(readFileSync(PID_FILE, 'utf8'));
  console.log(JSON.stringify({ ok: true, running, pid, pidAlive: pid ? processAlive(pid) : false, url: t ? `http://${HOST}:${PORT}/?token=${t}` : null, log: LOG_FILE }, null, 2));
}

async function stop() {
  let stopped = false;
  if (existsSync(PID_FILE)) {
    const pid = Number(readFileSync(PID_FILE, 'utf8'));
    if (pid && processAlive(pid)) {
      process.kill(pid, 'SIGTERM');
      stopped = true;
    }
    try { unlinkSync(PID_FILE); } catch {}
  }
  console.log(JSON.stringify({ ok: true, stopped }, null, 2));
}

try {
  if (command === 'start') await start();
  else if (command === 'stop') await stop();
  else if (command === 'status') await status();
  else throw new Error(`Unknown command: ${command}`);
} catch (error) {
  console.error(error.stack || error.message);
  process.exit(1);
}
