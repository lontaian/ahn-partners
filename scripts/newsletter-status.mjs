#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';

function readSiteId() {
  if (process.env.NETLIFY_SITE_ID) return process.env.NETLIFY_SITE_ID;
  const statePath = '.netlify/state.json';
  if (existsSync(statePath)) {
    const state = JSON.parse(readFileSync(statePath, 'utf8'));
    if (state.siteId) return state.siteId;
  }
  throw new Error('Netlify site id를 찾을 수 없습니다.');
}

function netlifyApi(method, data) {
  const output = execFileSync('npx', ['netlify', 'api', method, '--data', JSON.stringify(data)], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  return JSON.parse(output);
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

function normalize(submission, source, formName) {
  const data = submission.data ?? {};
  return {
    id: submission.id,
    form: formName,
    source,
    email: String(data.email ?? submission.email ?? '').trim().toLowerCase(),
    name: String(data.name ?? submission.name ?? '').trim(),
    consent_newsletter: data.consent_newsletter ?? '',
    created_at: submission.created_at ?? '',
  };
}

function loadSyncState() {
  try { return JSON.parse(readFileSync('exports/newsletter-spread-sync.json', 'utf8')); }
  catch { return { synced: {} }; }
}

const siteId = readSiteId();
const forms = netlifyApi('listSiteForms', { site_id: siteId });
const formByName = new Map(forms.map((form) => [form.name, form]));
const rows = [];
const rawCounts = {};

for (const [formName, source] of [['newsletter', 'newsletter_form'], ['contact', 'contact_form']]) {
  const form = formByName.get(formName);
  if (!form) {
    rawCounts[formName] = { formFound: false, submissions: 0 };
    continue;
  }
  const submissions = netlifyApi('listFormSubmissions', { form_id: form.id });
  rawCounts[formName] = { formFound: true, formId: form.id, submissions: submissions.length };
  for (const submission of submissions) rows.push(normalize(submission, source, formName));
}

const eligible = rows
  .filter((row) => validEmail(row.email))
  .filter((row) => isTruthy(row.consent_newsletter))
  .filter((row) => !looksLikeTest(row));

const deduped = [...eligible]
  .sort((a, b) => String(a.created_at).localeCompare(String(b.created_at)))
  .reduce((map, row) => map.set(row.email, row), new Map());

const subscribers = [...deduped.values()].sort((a, b) => String(a.email).localeCompare(String(b.email)));
const state = loadSyncState();
const syncedEmails = new Set(Object.keys(state.synced || {}).map((email) => email.toLowerCase()));
const pending = subscribers.filter((row) => !syncedEmails.has(row.email));
const lastSubmissions = [...rows]
  .sort((a, b) => String(b.created_at).localeCompare(String(a.created_at)))
  .slice(0, 5)
  .map((row) => ({ form: row.form, email: row.email, name: row.name, consent: row.consent_newsletter, created_at: row.created_at }));

const summary = {
  siteId,
  rawCounts,
  eligibleSubscribers: subscribers.length,
  spreadSynced: subscribers.length - pending.length,
  spreadPending: pending.length,
  pending: pending.map((row) => ({ email: row.email, name: row.name, created_at: row.created_at })),
  lastSubmissions,
  commands: {
    exportCsv: 'npm run newsletter:export',
    syncSpread: 'npm run newsletter:sync-spread',
  },
};

console.log(JSON.stringify(summary, null, 2));
