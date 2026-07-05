#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const IS_WINDOWS = process.platform === 'win32';
const NPX = IS_WINDOWS ? 'npx.cmd' : 'npx';

const args = new Set(process.argv.slice(2));
const includeTests = args.has('--include-tests');
const outArg = process.argv.find((arg) => arg.startsWith('--out='));
const outPath = resolve(outArg ? outArg.slice('--out='.length) : 'exports/newsletter-subscribers.csv');

function readSiteId() {
  if (process.env.NETLIFY_SITE_ID) return process.env.NETLIFY_SITE_ID;
  const statePath = '.netlify/state.json';
  if (existsSync(statePath)) {
    const state = JSON.parse(readFileSync(statePath, 'utf8'));
    if (state.siteId) return state.siteId;
  }
  throw new Error('Netlify site id를 찾을 수 없습니다. NETLIFY_SITE_ID를 지정하거나 netlify link를 먼저 실행하세요.');
}

function netlifyApi(method, data) {
  const json = JSON.stringify(data);
  const output = IS_WINDOWS
    ? execFileSync(process.env.ComSpec || 'cmd.exe', ['/d', '/s', '/c', `npx.cmd netlify api ${method} --data %NETLIFY_API_DATA%`], {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'pipe'],
        windowsHide: true,
        env: { ...process.env, NETLIFY_API_DATA: json.replaceAll('"', '\\"') },
      })
    : execFileSync(NPX, ['netlify', 'api', method, '--data', json], {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'pipe'],
      });
  return JSON.parse(output);
}

function csvCell(value) {
  const text = String(value ?? '');
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function isTruthy(value) {
  return ['yes', 'true', 'on', '1', '동의', 'y'].includes(String(value ?? '').trim().toLowerCase());
}

function validEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email ?? '').trim());
}

function looksLikeTest(row) {
  const email = String(row.email ?? '').toLowerCase();
  const name = String(row.name ?? '').toLowerCase();
  return (
    email === 'abc@abc.com' ||
    email.includes('+newsletter-2026') ||
    email.includes('+contact-2026') ||
    email.includes('+spreadform-2026') ||
    name.includes('codex test') ||
    name.includes('chrome test') ||
    name.includes('spread form test')
  );
}

function normalizeSubmission(submission, source) {
  const data = submission.data ?? {};
  return {
    email: String(data.email ?? submission.email ?? '').trim(),
    name: String(data.name ?? submission.name ?? '').trim(),
    source,
    subscribed_at: submission.created_at ?? '',
    consent_newsletter: data.consent_newsletter ?? '',
    referrer: data.referrer ?? '',
  };
}

const siteId = readSiteId();
const forms = netlifyApi('listSiteForms', { site_id: siteId });
const formByName = new Map(forms.map((form) => [form.name, form]));

const rows = [];
for (const [formName, source] of [
  ['newsletter', 'newsletter_form'],
  ['contact', 'contact_form'],
]) {
  const form = formByName.get(formName);
  if (!form) continue;
  const submissions = netlifyApi('listFormSubmissions', { form_id: form.id });
  for (const submission of submissions) {
    const row = normalizeSubmission(submission, source);
    if (!validEmail(row.email)) continue;
    if (!isTruthy(row.consent_newsletter)) continue;
    if (!includeTests && looksLikeTest(row)) continue;
    rows.push(row);
  }
}

const deduped = [...rows]
  .sort((a, b) => String(a.subscribed_at).localeCompare(String(b.subscribed_at)))
  .reduce((map, row) => map.set(row.email.toLowerCase(), row), new Map());

const finalRows = [...deduped.values()].sort((a, b) => String(a.email).localeCompare(String(b.email)));
const header = ['email', 'name', 'source', 'subscribed_at', 'consent_newsletter', 'referrer'];
const csv = [header.join(','), ...finalRows.map((row) => header.map((key) => csvCell(row[key])).join(','))].join('\n') + '\n';

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, csv, 'utf8');
console.log(JSON.stringify({ siteId, output: outPath, count: finalRows.length, includeTests }, null, 2));
