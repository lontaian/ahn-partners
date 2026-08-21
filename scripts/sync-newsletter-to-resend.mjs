#!/usr/bin/env node
/**
 * sync-newsletter-to-resend.mjs
 *
 * 평소에는 쓸 일이 없다. 폼 제출은 netlify/functions/form-submitted.mjs 훅이 받아
 * Resend 오디언스에 바로 등록한다. 이 스크립트는 그 훅이 실패해서
 * `npm run newsletter:status` 의 resend.missing 이 0 이 아닐 때 쓰는 복구용이다.
 *
 * 환영 메일은 보내지 않는다. 오디언스 등록만 한다.
 *
 * 사용법:
 *   node --env-file-if-exists=.env scripts/sync-newsletter-to-resend.mjs [--apply]
 *   --apply 없이 실행하면 무엇을 넣을지만 보여준다.
 */
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';

const require = createRequire(import.meta.url);
const { addContactToResendAudience } = require('../netlify/functions/_newsletter-sync-core.cjs');

const APPLY = process.argv.includes('--apply');
const IS_WINDOWS = process.platform === 'win32';

function readSiteId() {
  if (process.env.NETLIFY_SITE_ID) return process.env.NETLIFY_SITE_ID;
  if (existsSync('.netlify/state.json')) {
    const state = JSON.parse(readFileSync('.netlify/state.json', 'utf8'));
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
    : execFileSync('npx', ['netlify', 'api', method, '--data', json], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  return JSON.parse(output);
}

const isTruthy = (value) => ['yes', 'true', 'on', '1', '동의', 'y'].includes(String(value ?? '').trim().toLowerCase());
const validEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email ?? '').trim());

function looksLikeTest(row) {
  const email = String(row.email ?? '').toLowerCase();
  const name = String(row.name ?? '').toLowerCase();
  return (
    email === 'abc@abc.com'
    || email.endsWith('@example.com')
    || email.includes('+newsletter-2026')
    || email.includes('+contact-2026')
    || email.includes('+spreadform-2026')
    || name.includes('codex test')
    || name.includes('chrome test')
    || name.includes('spread form test')
  );
}

function readSubscriberAudienceId() {
  if (process.env.RESEND_NEWSLETTER_AUDIENCE_ID) return process.env.RESEND_NEWSLETTER_AUDIENCE_ID;
  return JSON.parse(readFileSync('config/newsletter-analytics.json', 'utf8')).audiences?.subscribers;
}

// Windows 에서 fetch 핸들이 열린 채 process.exit() 을 부르면 libuv 어서션이 난다.
// 종료는 전부 return + process.exitCode 로 처리한다.
async function main() {
const apiKey = process.env.RESEND_API_KEY;
if (!apiKey) {
  console.error('RESEND_API_KEY가 없습니다. .env를 읽도록 --env-file-if-exists=.env 를 붙여 실행하십시오.');
  process.exitCode = 1;
  return;
}

const audienceId = readSubscriberAudienceId();
const siteId = readSiteId();
const forms = netlifyApi('listSiteForms', { site_id: siteId });
const newsletterForm = forms.find((form) => form.name === 'newsletter');
const contactForm = forms.find((form) => form.name === 'contact');

const rows = [];
for (const form of [newsletterForm, contactForm]) {
  if (!form) continue;
  for (const submission of netlifyApi('listFormSubmissions', { form_id: form.id })) {
    const data = submission.data ?? {};
    rows.push({
      email: String(data.email ?? submission.email ?? '').trim().toLowerCase(),
      name: String(data.name ?? submission.name ?? '').trim(),
      consent: data.consent_newsletter ?? '',
      created_at: submission.created_at ?? '',
    });
  }
}

const eligible = [...rows]
  .filter((row) => validEmail(row.email) && isTruthy(row.consent) && !looksLikeTest(row))
  .sort((a, b) => String(a.created_at).localeCompare(String(b.created_at)))
  .reduce((map, row) => map.set(row.email, row), new Map());

const response = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
  headers: { Authorization: `Bearer ${apiKey}` },
});
if (!response.ok) {
  console.error(`Resend 오디언스 조회 실패 ${response.status}`);
  process.exitCode = 1;
  return;
}
const registered = new Set(((await response.json()).data ?? []).map((contact) => String(contact.email ?? '').toLowerCase()));
const missing = [...eligible.values()].filter((row) => !registered.has(row.email));

console.log(`폼 유효 구독자 ${eligible.size}명, Resend 등록 ${registered.size}명, 미등록 ${missing.length}명`);
if (missing.length === 0) {
  console.log('추가할 대상이 없습니다.');
  return;
}

for (const row of missing) console.log(`  ${row.email}${row.name ? ` (${row.name})` : ''}`);

if (!APPLY) {
  console.log('\n미리보기입니다. 실제로 넣으려면 --apply 를 붙여 다시 실행하십시오.');
  return;
}

let added = 0;
let failed = 0;
for (const row of missing) {
  try {
    const result = await addContactToResendAudience({ email: row.email, name: row.name });
    console.log(`추가 ${row.email}${result.alreadyExists ? ' (이미 존재)' : ''}`);
    added += 1;
  } catch (error) {
    console.error(`실패 ${row.email}: ${error.message}`);
    failed += 1;
  }
}
console.log(`\n추가 ${added}건, 실패 ${failed}건`);
if (failed > 0) process.exitCode = 1;
}

await main();
