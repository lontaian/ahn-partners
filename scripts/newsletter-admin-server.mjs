#!/usr/bin/env node
import { execFile } from 'node:child_process';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { randomBytes } from 'node:crypto';

const HOST = process.env.NEWSLETTER_ADMIN_HOST || '127.0.0.1';
const PORT = Number(process.env.NEWSLETTER_ADMIN_PORT || 3467);
const TOKEN_FILE = process.env.NEWSLETTER_ADMIN_TOKEN_FILE || '.netlify/newsletter-admin-token';
const LOG_FILE = process.env.NEWSLETTER_ADMIN_LOG || 'exports/newsletter-admin.log';
const AUTO_SYNC_MINUTES = Number(process.env.NEWSLETTER_AUTO_SYNC_MINUTES || 10);

let running = false;
let lastRun = null;
let lastStatus = null;
let lastLog = '';

function ensureToken() {
  if (process.env.NEWSLETTER_ADMIN_TOKEN) return process.env.NEWSLETTER_ADMIN_TOKEN;
  if (existsSync(TOKEN_FILE)) return readFileSync(TOKEN_FILE, 'utf8').trim();
  mkdirSync('.netlify', { recursive: true });
  const token = randomBytes(24).toString('hex');
  writeFileSync(TOKEN_FILE, `${token}\n`, { mode: 0o600 });
  return token;
}

const TOKEN = ensureToken();

function appendLog(line) {
  mkdirSync('exports', { recursive: true });
  const text = `[${new Date().toISOString()}] ${line}\n`;
  writeFileSync(LOG_FILE, text, { flag: 'a' });
  lastLog = `${text}${lastLog}`.slice(0, 12000);
}

function runNodeScript(script, args = [], timeoutMs = 180000) {
  return new Promise((resolve) => {
    execFile('node', [script, ...args], { cwd: process.cwd(), timeout: timeoutMs, maxBuffer: 1024 * 1024 * 20 }, (error, stdout, stderr) => {
      resolve({ ok: !error, code: error?.code ?? 0, signal: error?.signal ?? null, stdout, stderr, error: error?.message || null });
    });
  });
}

async function getStatus() {
  const result = await runNodeScript('scripts/newsletter-status.mjs', [], 120000);
  if (!result.ok) throw new Error(result.stderr || result.error || 'status failed');
  const json = JSON.parse(result.stdout.slice(result.stdout.indexOf('{')));
  lastStatus = json;
  return json;
}

async function syncNow(reason = 'manual') {
  if (running) return { ok: false, alreadyRunning: true, lastRun };
  running = true;
  appendLog(`sync start reason=${reason}`);
  try {
    const ensure = await runNodeScript('scripts/ensure-cdp-browser.mjs', [], 30000);
    appendLog(`ensure-cdp ok=${ensure.ok} ${ensure.stdout.trim()} ${ensure.stderr.trim()}`);
    if (!ensure.ok) throw new Error(ensure.stderr || ensure.error || 'ensure cdp failed');

    const before = await getStatus();
    const sync = await runNodeScript('scripts/sync-newsletter-to-spread.mjs', [], 240000);
    appendLog(`sync command ok=${sync.ok}\nstdout=${sync.stdout.trim()}\nstderr=${sync.stderr.trim()}`);
    if (!sync.ok) throw new Error(sync.stderr || sync.error || 'sync failed');
    const after = await getStatus();
    lastRun = { at: new Date().toISOString(), reason, ok: true, before, after, output: sync.stdout.trim() };
    return { ok: true, before, after, output: sync.stdout.trim() };
  } catch (error) {
    lastRun = { at: new Date().toISOString(), reason, ok: false, error: error.message };
    appendLog(`sync failed ${error.stack || error.message}`);
    return { ok: false, error: error.message };
  } finally {
    running = false;
  }
}

function authorized(req, url) {
  const supplied = req.headers['x-admin-token'] || url.searchParams.get('token');
  return supplied === TOKEN;
}

function json(res, status, data) {
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
  res.end(JSON.stringify(data, null, 2));
}

function htmlPage() {
  const data = JSON.stringify({ token: TOKEN });
  return `<!doctype html>
<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Ahn's Newsletter Admin</title>
<style>
body{font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,'Pretendard',sans-serif;margin:0;background:#f8f8f8;color:#111}.wrap{max-width:1040px;margin:0 auto;padding:32px 20px}h1{font-size:34px;letter-spacing:-.04em}.grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}.card{background:#fff;border:1px solid #e5e5e5;border-radius:18px;padding:18px;box-shadow:0 10px 30px rgba(0,0,0,.04)}.num{font-size:32px;font-weight:800}.label{color:#666;font-size:13px}.actions{display:flex;gap:10px;flex-wrap:wrap;margin:18px 0}button{border:0;border-radius:999px;background:#111;color:#fff;padding:12px 16px;font-weight:800;cursor:pointer}button.secondary{background:#fff;color:#111;border:1px solid #ddd}button:disabled{opacity:.55;cursor:wait}pre{background:#111;color:#e8e8e8;padding:16px;border-radius:16px;overflow:auto;max-height:420px}.pending li{margin:.45rem 0}.ok{color:#047857}.warn{color:#b45309}.bad{color:#b91c1c}@media(max-width:760px){.grid{grid-template-columns:1fr 1fr}}</style>
</head><body><div class="wrap">
<h1>Ahn's Newsletter Admin</h1>
<p>Netlify Forms 저장 상태와 Spread <strong>Newsletter Subscribers</strong> 동기화 상태를 확인하고, 버튼으로 즉시 반영합니다.</p>
<div class="actions"><button id="refresh">상태 새로고침</button><button id="sync">지금 Spread 동기화</button><button id="auto" class="secondary">자동 새로고침 켜짐</button></div>
<div class="grid">
<div class="card"><div class="num" id="newsletter">-</div><div class="label">Newsletter 제출</div></div>
<div class="card"><div class="num" id="eligible">-</div><div class="label">실제 구독 대상</div></div>
<div class="card"><div class="num ok" id="synced">-</div><div class="label">Spread 동기화 완료</div></div>
<div class="card"><div class="num warn" id="pending">-</div><div class="label">동기화 대기</div></div>
</div>
<div class="card" style="margin-top:14px"><h3>대기 목록</h3><ul class="pending" id="pendingList"></ul></div>
<div class="card" style="margin-top:14px"><h3>최근 제출</h3><pre id="recent">loading...</pre></div>
<div class="card" style="margin-top:14px"><h3>실행 로그</h3><pre id="log"></pre></div>
</div><script>
const CONFIG=${data};
async function api(path, opts={}){const res=await fetch(path+(path.includes('?')?'&':'?')+'token='+CONFIG.token,{...opts,headers:{'x-admin-token':CONFIG.token,'content-type':'application/json',...(opts.headers||{})}}); const data=await res.json(); if(!res.ok) throw new Error(data.error||res.statusText); return data;}
function render(s){document.getElementById('newsletter').textContent=s.rawCounts?.newsletter?.submissions??'-';document.getElementById('eligible').textContent=s.eligibleSubscribers??'-';document.getElementById('synced').textContent=s.spreadSynced??'-';document.getElementById('pending').textContent=s.spreadPending??'-';document.getElementById('pendingList').innerHTML=(s.pending||[]).map(p=>'<li>'+p.email+' '+(p.name||'')+'</li>').join('')||'<li class="ok">대기 없음</li>';document.getElementById('recent').textContent=JSON.stringify(s.lastSubmissions||[],null,2)}
async function refresh(){document.getElementById('refresh').disabled=true;try{const d=await api('/api/status');render(d.status);document.getElementById('log').textContent=d.log||'';}catch(e){document.getElementById('log').textContent=e.stack||e.message}finally{document.getElementById('refresh').disabled=false}}
async function sync(){document.getElementById('sync').disabled=true;document.getElementById('log').textContent='동기화 실행 중...';try{const d=await api('/api/sync',{method:'POST'});render(d.after||d.status||{});document.getElementById('log').textContent=JSON.stringify(d,null,2)}catch(e){document.getElementById('log').textContent=e.stack||e.message}finally{document.getElementById('sync').disabled=false;setTimeout(refresh,1500)}}
document.getElementById('refresh').onclick=refresh;document.getElementById('sync').onclick=sync;refresh();setInterval(refresh,30000);
</script></body></html>`;
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  if (url.pathname === '/api/health') {
    return json(res, 200, { ok: true, running, lastRun });
  }
  if (url.pathname === '/') {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' });
    res.end(htmlPage());
    return;
  }
  if (!authorized(req, url)) return json(res, 401, { ok: false, error: 'unauthorized' });
  try {
    if (url.pathname === '/api/status') {
      const status = await getStatus();
      let fileLog = lastLog;
      try { fileLog = await readFile(LOG_FILE, 'utf8'); fileLog = fileLog.split('\n').slice(-80).join('\n'); } catch {}
      return json(res, 200, { ok: true, running, lastRun, status, log: fileLog });
    }
    if (url.pathname === '/api/sync' && req.method === 'POST') {
      const result = await syncNow('admin_button');
      return json(res, result.ok ? 200 : 500, result);
    }
    return json(res, 404, { ok: false, error: 'not_found' });
  } catch (error) {
    return json(res, 500, { ok: false, error: error.message });
  }
});

server.listen(PORT, HOST, () => {
  const url = `http://${HOST}:${PORT}/?token=${TOKEN}`;
  console.log(`Ahn's Newsletter Admin: ${url}`);
  console.log(`Auto sync interval: ${AUTO_SYNC_MINUTES} minutes`);
});

setInterval(() => {
  syncNow('interval').catch((error) => appendLog(`interval error ${error.stack || error.message}`));
}, Math.max(1, AUTO_SYNC_MINUTES) * 60 * 1000);
