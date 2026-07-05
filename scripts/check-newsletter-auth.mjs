#!/usr/bin/env node
import { Resolver } from 'node:dns/promises';
import { existsSync, readFileSync } from 'node:fs';

const resolver = new Resolver();
resolver.setServers((process.env.DNS_SERVERS || '1.1.1.1,8.8.8.8').split(',').map((server) => server.trim()).filter(Boolean));

const DOMAIN = process.env.NEWSLETTER_DOMAIN || 'ahn-partners.net';
const SELECTORS = (process.env.DKIM_SELECTORS || 'default,google,selector1,selector2,k1,s1,s2,cf2024-1,spread,relate')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

function argValue(prefix) {
  const arg = process.argv.find((item) => item.startsWith(prefix));
  return arg ? arg.slice(prefix.length) : '';
}

async function txt(name) {
  try { return (await resolver.resolveTxt(name)).map((parts) => parts.join('')); }
  catch { return []; }
}

async function mx(name) {
  try { return await resolver.resolveMx(name); }
  catch { return []; }
}

async function cname(name) {
  try { return await resolver.resolveCname(name); }
  catch { return []; }
}

function findSpf(records) {
  return records.find((record) => /^v=spf1\b/i.test(record)) || '';
}

function findDmarc(records) {
  return records.find((record) => /^v=DMARC1\b/i.test(record)) || '';
}

function parseHeader(headerText) {
  const unfolded = headerText.replace(/\r?\n[ \t]+/g, ' ');
  const lines = unfolded.split(/\r?\n/);
  const auth = lines.filter((line) => /^Authentication-Results:/i.test(line));
  const dkim = lines.filter((line) => /^DKIM-Signature:/i.test(line));
  const from = lines.find((line) => /^From:/i.test(line)) || '';
  const returnPath = lines.find((line) => /^Return-Path:/i.test(line)) || '';
  const receivedSpf = lines.find((line) => /^Received-SPF:/i.test(line)) || '';
  const dkimParsed = dkim.map((line) => ({
    domain: /\bd=([^;\s]+)/i.exec(line)?.[1] || '',
    selector: /\bs=([^;\s]+)/i.exec(line)?.[1] || '',
  }));
  return { from, returnPath, receivedSpf, authenticationResults: auth, dkimSignatures: dkimParsed };
}

function verdict({ rootSpf, dmarc, envelopeSpf, dkimRecords, header }) {
  const issues = [];
  const ok = [];

  if (rootSpf.includes('include:spf.forwardemail.net')) ok.push('root SPF includes Forward Email');
  else issues.push('root SPF does not include Forward Email');

  if (dmarc) ok.push(`DMARC exists (${dmarc})`);
  else issues.push('DMARC record is missing');

  if (/p=reject/i.test(dmarc)) ok.push('DMARC policy is strict p=reject');
  else issues.push('DMARC policy is not p=reject');

  if (envelopeSpf.includes('include:amazonses.com')) ok.push('envelope SPF includes Amazon SES');
  else issues.push('envelope SPF does not include Amazon SES');

  if (dkimRecords.length) ok.push(`published DKIM selectors found: ${dkimRecords.map((r) => r.selector).join(', ')}`);
  else if (!header) issues.push('no common DKIM selector records found; confirm Spread/Relate custom sending domain DKIM selector in UI');

  if (header) {
    const authText = header.authenticationResults.join(' ');
    for (const key of ['spf', 'dkim', 'dmarc']) {
      if (new RegExp(`${key}=pass`, 'i').test(authText)) ok.push(`Gmail header ${key.toUpperCase()}=PASS`);
      else if (new RegExp(`${key}=fail|${key}=softfail|${key}=neutral`, 'i').test(authText)) issues.push(`Gmail header shows ${key.toUpperCase()} not passing`);
      else issues.push(`Gmail header ${key.toUpperCase()} result not found`);
    }
  }

  return { ok, issues };
}

const headerPath = argValue('--header=');
const header = headerPath && existsSync(headerPath) ? parseHeader(readFileSync(headerPath, 'utf8')) : null;
const headerSelectors = (header?.dkimSignatures || [])
  .filter((sig) => sig.domain === DOMAIN && sig.selector)
  .map((sig) => sig.selector);
const selectors = [...new Set([...SELECTORS, ...headerSelectors])];

const [rootMx, rootTxt, dmarcTxt, envelopeMx, envelopeTxt] = await Promise.all([
  mx(DOMAIN),
  txt(DOMAIN),
  txt(`_dmarc.${DOMAIN}`),
  mx(`envelope.${DOMAIN}`),
  txt(`envelope.${DOMAIN}`),
]);

const dkimRecords = [];
for (const selector of selectors) {
  const name = `${selector}._domainkey.${DOMAIN}`;
  const records = await txt(name);
  const cnames = await cname(name);
  if (records.length || cnames.length) dkimRecords.push({ selector, name, txt: records, cname: cnames });
}

const rootSpf = findSpf(rootTxt);
const dmarc = findDmarc(dmarcTxt);
const envelopeSpf = findSpf(envelopeTxt);
const result = {
  domain: DOMAIN,
  mx: rootMx,
  txt: rootTxt,
  spf: rootSpf,
  dmarc,
  envelope: { mx: envelopeMx, txt: envelopeTxt, spf: envelopeSpf },
  dkimRecords,
  header,
};
result.verdict = verdict({ rootSpf, dmarc, envelopeSpf, dkimRecords, header });
console.log(JSON.stringify(result, null, 2));
