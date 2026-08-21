#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';

const IS_WINDOWS = process.platform === 'win32';
const NPX = IS_WINDOWS ? 'npx.cmd' : 'npx';

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
    email.endsWith('@example.com') ||
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

function readSubscriberAudienceId() {
  if (process.env.RESEND_NEWSLETTER_AUDIENCE_ID) return process.env.RESEND_NEWSLETTER_AUDIENCE_ID;
  const config = JSON.parse(readFileSync('config/newsletter-analytics.json', 'utf8'));
  return config.audiences?.subscribers;
}

/**
 * 실제 발송은 Resend 오디언스로 나간다. 폼 제출은 netlify/functions/form-submitted.mjs 가
 * 훅으로 받아 Resend 에 바로 등록하므로, 여기서는 등록이 실제로 됐는지만 대조한다.
 * 예전 Spread 동기화 기록(exports/newsletter-spread-sync.json)은 발송 경로가 아니라 보지 않는다.
 */
async function loadResendContacts() {
  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = readSubscriberAudienceId();
  if (!apiKey) return { ok: false, reason: 'RESEND_API_KEY 없음. npm run newsletter:status 는 .env 를 읽는다', audienceId };
  if (!audienceId) return { ok: false, reason: 'subscribers 오디언스 ID를 찾을 수 없음', audienceId };

  const response = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  if (!response.ok) return { ok: false, reason: `Resend 조회 실패 ${response.status}`, audienceId };

  const body = await response.json();
  const contacts = body.data ?? [];
  return {
    ok: true,
    audienceId,
    emails: new Set(contacts.map((contact) => String(contact.email ?? '').toLowerCase())),
    unsubscribed: contacts.filter((contact) => contact.unsubscribed).length,
    total: contacts.length,
  };
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
const resend = await loadResendContacts();
const missing = resend.ok ? subscribers.filter((row) => !resend.emails.has(row.email)) : [];
const lastSubmissions = [...rows]
  .sort((a, b) => String(b.created_at).localeCompare(String(a.created_at)))
  .slice(0, 5)
  .map((row) => ({ form: row.form, email: row.email, name: row.name, consent: row.consent_newsletter, created_at: row.created_at }));

const summary = {
  siteId,
  rawCounts,
  eligibleSubscribers: subscribers.length,
  resend: resend.ok
    ? {
        audienceId: resend.audienceId,
        contacts: resend.total,
        unsubscribed: resend.unsubscribed,
        deliverable: resend.total - resend.unsubscribed,
        missing: missing.length,
      }
    : { checked: false, reason: resend.reason, audienceId: resend.audienceId ?? null },
  missing: missing.map((row) => ({ email: row.email, name: row.name, created_at: row.created_at })),
  lastSubmissions,
  commands: {
    exportCsv: 'npm run newsletter:export',
    addMissingToResend: 'npm run newsletter:sync-resend',
  },
};

console.log(JSON.stringify(summary, null, 2));

if (!resend.ok) process.exitCode = 1;
