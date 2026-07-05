#!/usr/bin/env node
import { execFile } from 'node:child_process';

const INTERVAL_MINUTES = Number(process.env.NEWSLETTER_SYNC_INTERVAL_MINUTES || 10);
let running = false;

function run(script, timeoutMs = 240000) {
  return new Promise((resolve) => {
    execFile('node', [script], { cwd: process.cwd(), timeout: timeoutMs, maxBuffer: 1024 * 1024 * 20 }, (error, stdout, stderr) => {
      resolve({ ok: !error, stdout, stderr, error: error?.message || null });
    });
  });
}

async function tick(reason) {
  if (running) return;
  running = true;
  const started = new Date().toISOString();
  console.log(`[${started}] newsletter daemon tick reason=${reason}`);
  try {
    const ensure = await run('scripts/ensure-cdp-browser.mjs', 30000);
    console.log(ensure.stdout.trim());
    if (!ensure.ok) throw new Error(ensure.stderr || ensure.error || 'ensure failed');
    const sync = await run('scripts/sync-newsletter-to-spread.mjs', 240000);
    process.stdout.write(sync.stdout);
    if (sync.stderr) process.stderr.write(sync.stderr);
    if (!sync.ok) throw new Error(sync.error || 'sync failed');
  } catch (error) {
    console.error(`[${new Date().toISOString()}] newsletter daemon error`, error.stack || error.message);
  } finally {
    running = false;
  }
}

tick('startup');
setInterval(() => tick('interval'), Math.max(1, INTERVAL_MINUTES) * 60 * 1000);
console.log(`Newsletter sync daemon running every ${INTERVAL_MINUTES} minutes. Press Ctrl+C to stop.`);
