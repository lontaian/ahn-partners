#!/usr/bin/env node
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { tmpdir } from 'node:os';
import http from 'node:http';

const CDP_HOST = process.env.CDP_HOST || '127.0.0.1';
const CDP_PORT = Number(process.env.CDP_PORT || 9222);
const CDP = `http://${CDP_HOST}:${CDP_PORT}`;
const DEFAULT_URL = process.env.CDP_START_URL || 'https://app.spread.so/spread/ahn-partners/lists/O7Udbj';
const PROFILE = process.env.BROWSER_PROFILE || (process.platform === 'win32' ? 'C:\\dev\\client\\personal\\jobagent\\.browser-profile' : '/mnt/c/dev/client/personal/jobagent/.browser-profile');
const DEFAULT_TMP = process.platform === 'win32' ? tmpdir() : '/tmp';
const PID_FILE = process.env.CDP_PID_FILE || join(DEFAULT_TMP, 'ahn-partners-cdp-browser.pid');
const LOG_FILE = process.env.CDP_LOG_FILE || join(DEFAULT_TMP, 'ahn-partners-cdp-browser.log');

function fetchJson(url, timeoutMs = 2500) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, (res) => {
      let data = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (error) { reject(error); }
      });
    });
    req.on('error', reject);
    req.setTimeout(timeoutMs, () => req.destroy(new Error(`Timeout: ${url}`)));
  });
}

async function cdpAlive() {
  try {
    const version = await fetchJson(`${CDP}/json/version`);
    return Boolean(version.webSocketDebuggerUrl);
  } catch (_) {
    return false;
  }
}

function newestPlaywrightChrome() {
  const root = '/home/chris/.cache/ms-playwright';
  if (!existsSync(root)) return '';
  const candidates = [];
  for (const entry of readdirSync(root)) {
    const chrome = join(root, entry, 'chrome-linux64', 'chrome');
    if (existsSync(chrome)) candidates.push(chrome);
  }
  return candidates.sort().at(-1) || '';
}

function resolveChrome() {
  const win = process.platform === 'win32';
  const candidates = win ? [
    process.env.CHROME_PATH,
    `${process.env.LOCALAPPDATA || ''}\\Google\\Chrome\\Application\\chrome.exe`,
    `${process.env.ProgramFiles || ''}\\Google\\Chrome\\Application\\chrome.exe`,
    `${process.env['ProgramFiles(x86)'] || ''}\\Google\\Chrome\\Application\\chrome.exe`,
    `${process.env.LOCALAPPDATA || ''}\\Chromium\\Application\\chrome.exe`,
    `${process.env.ProgramFiles || ''}\\Microsoft\\Edge\\Application\\msedge.exe`,
    `${process.env['ProgramFiles(x86)'] || ''}\\Microsoft\\Edge\\Application\\msedge.exe`,
  ] : [
    process.env.CHROME_PATH,
    newestPlaywrightChrome(),
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ];
  const filtered = candidates.filter(Boolean);
  const found = filtered.find((candidate) => existsSync(candidate));
  if (!found) throw new Error(`Chromium/Chrome/Edge 실행 파일을 찾지 못했습니다. CHROME_PATH를 지정하세요. 후보: ${filtered.join(', ')}`);
  return found;
}

async function main() {
  if (await cdpAlive()) {
    console.log(JSON.stringify({ ok: true, alreadyRunning: true, cdp: CDP }));
    return;
  }

  const chrome = resolveChrome();
  mkdirSync(PROFILE, { recursive: true });
  const args = [
    `--remote-debugging-address=${CDP_HOST}`,
    `--remote-debugging-port=${CDP_PORT}`,
    `--user-data-dir=${PROFILE}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-dev-shm-usage',
    DEFAULT_URL,
  ];
  mkdirSync(dirname(LOG_FILE), { recursive: true });
  mkdirSync(dirname(PID_FILE), { recursive: true });
  const out = await import('node:fs').then((fs) => fs.openSync(LOG_FILE, 'a'));
  const child = spawn(chrome, args, { detached: true, stdio: ['ignore', out, out] });
  child.unref();
  writeFileSync(PID_FILE, String(child.pid));

  const deadline = Date.now() + 15000;
  while (Date.now() < deadline) {
    if (await cdpAlive()) {
      console.log(JSON.stringify({ ok: true, started: true, pid: child.pid, cdp: CDP, profile: PROFILE }));
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 750));
  }
  throw new Error(`CDP 브라우저 시작 실패. 로그 확인: ${LOG_FILE}`);
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});
