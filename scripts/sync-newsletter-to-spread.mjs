#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import http from 'node:http';

const execFileAsync = promisify(execFile);
const CDP = process.env.CDP_ENDPOINT || 'http://127.0.0.1:9222';
const LIST_URL = process.env.SPREAD_LIST_URL || 'https://app.spread.so/spread/ahn-partners/lists/O7Udbj';
const STATE_PATH = process.env.NEWSLETTER_SYNC_STATE || 'exports/newsletter-spread-sync.json';
const CSV_PATH = process.env.NEWSLETTER_EXPORT_CSV || 'exports/newsletter-subscribers.csv';

function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (error) { reject(error); }
      });
    }).on('error', reject).setTimeout(8000, function onTimeout() {
      this.destroy(new Error(`Timeout: ${url}`));
    });
  });
}

function cdpCall(ws, method, params = {}, timeoutMs = 20000) {
  ws.__seq = (ws.__seq || 0) + 1;
  const id = ws.__seq;
  ws.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      ws.removeEventListener('message', onMessage);
      reject(new Error(`CDP timeout: ${method}`));
    }, timeoutMs);
    function onMessage(event) {
      const msg = JSON.parse(typeof event.data === 'string' ? event.data : Buffer.from(event.data).toString('utf8'));
      if (msg.id !== id) return;
      clearTimeout(timer);
      ws.removeEventListener('message', onMessage);
      if (msg.error) reject(new Error(`${method}: ${msg.error.message}`));
      else resolve(msg.result || {});
    }
    ws.addEventListener('message', onMessage);
  });
}

async function openSpreadPage() {
  await getJson(`${CDP}/json/version`);
  const created = await new Promise((resolve, reject) => {
    const req = http.request(`${CDP}/json/new?${encodeURIComponent(LIST_URL)}`, { method: 'PUT' }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(JSON.parse(data)));
    });
    req.on('error', reject);
    req.end();
  });
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const tabs = await getJson(`${CDP}/json`);
  const tab = tabs.find((item) => item.id === created.id) || tabs.find((item) => item.url?.includes('/lists/O7Udbj'));
  if (!tab?.webSocketDebuggerUrl) throw new Error('Spread CDP tab not found');
  return tab.webSocketDebuggerUrl;
}

function parseCsvLine(line) {
  const cells = [];
  let current = '';
  let quoted = false;
  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    if (ch === '"' && line[i + 1] === '"') { current += '"'; i += 1; continue; }
    if (ch === '"') { quoted = !quoted; continue; }
    if (ch === ',' && !quoted) { cells.push(current); current = ''; continue; }
    current += ch;
  }
  cells.push(current);
  return cells;
}

async function loadSubscribers() {
  await execFileAsync('npm', ['run', 'newsletter:export'], { cwd: process.cwd(), maxBuffer: 1024 * 1024 * 10 });
  const csv = await fs.readFile(CSV_PATH, 'utf8');
  const lines = csv.split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) return [];
  const headers = parseCsvLine(lines[0]).map((h) => h.trim().toLowerCase());
  const emailIndex = headers.findIndex((h) => h === 'email');
  const nameIndex = headers.findIndex((h) => h === 'name');
  const consentIndex = headers.findIndex((h) => h.includes('consent'));
  return lines.slice(1).map((line) => {
    const cells = parseCsvLine(line);
    return {
      email: String(cells[emailIndex] || '').trim().toLowerCase(),
      name: String(cells[nameIndex] || '').trim(),
      consent: String(cells[consentIndex] || '').trim(),
    };
  }).filter((row) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.email));
}

async function loadState() {
  try { return JSON.parse(await fs.readFile(STATE_PATH, 'utf8')); }
  catch { return { synced: {} }; }
}

async function saveState(state) {
  await fs.mkdir(path.dirname(STATE_PATH), { recursive: true });
  await fs.writeFile(STATE_PATH, `${JSON.stringify(state, null, 2)}\n`);
}

async function addViaBrowser(ws, subscriber) {
  const expression = `
(async () => {
  const email = ${JSON.stringify(subscriber.email)};
  if (!location.href.includes('/lists/O7Udbj')) location.href = ${JSON.stringify(LIST_URL)};
  await new Promise(r => setTimeout(r, 500));
  const form = [...document.forms].find(f => f.action.includes('/lists/O7Udbj/entries'));
  const token = form?.querySelector('input[name="authenticity_token"]')?.value;
  if (!token) return { ok: false, error: 'token_not_found', href: location.href, body: document.body.innerText.slice(0, 300) };

  let existing = null;
  try {
    const search = await fetch('/contacts?workspace_id=ahn-partners&query=' + encodeURIComponent(email), {
      headers: { 'Accept': 'application/json' },
      credentials: 'same-origin'
    });
    const json = await search.json();
    existing = (json.data || []).find((contact) => String(contact.email || '').toLowerCase() === email);
  } catch (_) {}

  const payload = {
    authenticity_token: token,
    'entry[entryable_type]': 'Contact',
    'entry[entryable_id]': existing?.id || '',
    commit: '추가'
  };
  if (!existing) {
    payload['contact[first_name]'] = ${JSON.stringify(subscriber.name || '')};
    payload['contact[last_name]'] = '';
    payload['contact[identities_attributes][0][email]'] = email;
    payload['organization[hashid]'] = '';
    payload['contact[title]'] = '';
    payload['contact[phone_number]'] = '';
  }
  const body = new URLSearchParams(payload);
  const res = await fetch('/lists/O7Udbj/entries?workspace_id=ahn-partners', {
    method: 'POST',
    headers: {
      'Accept': 'text/vnd.turbo-stream.html, text/html, application/xhtml+xml',
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'X-CSRF-Token': token
    },
    body,
    credentials: 'same-origin'
  });
  const text = await res.text();
  const plain = text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').slice(0, 500);
  const duplicate = /이미|already|duplicate|존재/.test(plain);
  return { ok: res.ok || duplicate, status: res.status, duplicate, usedExisting: Boolean(existing), contactId: existing?.id || null, email, text: plain };
})()`
  const result = await cdpCall(ws, 'Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true }, 30000);
  return result.result?.value;
}

async function main() {
  const subscribers = await loadSubscribers();
  const state = await loadState();
  const pending = subscribers.filter((row) => !state.synced[row.email]);
  console.log(JSON.stringify({ subscribers: subscribers.length, pending: pending.length }));
  if (pending.length === 0) return;

  const wsUrl = await openSpreadPage();
  const ws = new WebSocket(wsUrl);
  await new Promise((resolve, reject) => {
    ws.addEventListener('open', resolve, { once: true });
    ws.addEventListener('error', reject, { once: true });
  });
  try {
    for (const subscriber of pending) {
      const result = await addViaBrowser(ws, subscriber);
      console.log(JSON.stringify({ email: subscriber.email, result }));
      if (!result?.ok) throw new Error(`Spread add failed for ${subscriber.email}: ${JSON.stringify(result)}`);
      state.synced[subscriber.email] = { at: new Date().toISOString(), name: subscriber.name || null, result: { status: result.status } };
      await saveState(state);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  } finally {
    ws.close();
  }
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});
