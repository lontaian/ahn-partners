const DEFAULT_WORKSPACE = 'ahn-partners';
const DEFAULT_LIST_ID = 'O7Udbj';
const SPREAD_ORIGIN = 'https://app.spread.so';
const DEFAULT_RESEND_AUDIENCE_ID = '6b75513b-6845-4eed-818f-d02caea5c20f';

function normalizeString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function normalizeEmail(value) {
  return normalizeString(value).toLowerCase();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function truthyConsent(value) {
  const normalized = normalizeString(value).toLowerCase();
  return ['yes', 'on', 'true', '1', 'agree', 'agreed'].includes(normalized);
}

function decodeHtml(value) {
  return String(value || '')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function extractAuthenticityToken(html) {
  const tokenInput = html.match(/<input[^>]+name=["']authenticity_token["'][^>]*>/i);
  const input = tokenInput ? tokenInput[0] : html;
  const value = input.match(/value=["']([^"']+)["']/i);
  return value ? decodeHtml(value[1]) : '';
}

function parseRequestBody(event) {
  const body = event && event.body ? event.body : '';
  if (!body) return {};

  const headers = event.headers || {};
  const contentType = normalizeString(headers['content-type'] || headers['Content-Type']).toLowerCase();
  const raw = event.isBase64Encoded ? Buffer.from(body, 'base64').toString('utf8') : body;

  if (contentType.includes('application/json')) {
    try {
      return JSON.parse(raw);
    } catch (_) {
      return {};
    }
  }

  const params = new URLSearchParams(raw);
  const data = {};
  for (const [key, value] of params.entries()) data[key] = value;
  return data;
}

function extractSubmissionData(input) {
  const payload = input || {};
  const data = payload.data || payload.payload?.data || payload.form_submission?.data || payload;

  return {
    formName: normalizeString(payload.form_name || payload.formName || data['form-name'] || data.form_name),
    email: normalizeEmail(data.email || data.Email || data['newsletter-email']),
    name: normalizeString(data.name || data.Name || data.full_name || data.fullName),
    consent: data.consent_newsletter || data.consent || data.agree || '',
    botField: normalizeString(data['bot-field'] || data.bot_field || data.company || ''),
    raw: data,
  };
}


function buildRelateApiKey() {
  return normalizeString(process.env.RELATE_API_KEY || process.env.SPREAD_API_KEY);
}

async function relateApiFetch(path, options = {}) {
  const apiKey = buildRelateApiKey();
  if (!apiKey) {
    const error = new Error('RELATE_API_KEY is not configured');
    error.code = 'missing_relate_api_key';
    throw error;
  }

  const response = await fetch(`https://api.relate.so/v1${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Accept: 'application/json',
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(options.headers || {}),
    },
  });
  const text = await response.text();
  let payload = null;
  try { payload = text ? JSON.parse(text) : null; } catch (_) { payload = { raw: text }; }

  if (!response.ok) {
    const error = new Error('Relate API request failed');
    error.details = { status: response.status, path, payload };
    throw error;
  }

  return payload;
}

function firstDataItem(payload) {
  if (!payload) return null;
  if (Array.isArray(payload.data)) return payload.data[0] || null;
  return payload.data || payload;
}

async function findOrCreateRelateContact({ email, name }) {
  const lookup = await relateApiFetch(`/contacts?email=${encodeURIComponent(email)}`);
  const existing = firstDataItem(lookup);
  if (existing && existing.id) return existing;

  const firstName = name ? name : email.split('@')[0];
  const created = await relateApiFetch('/contacts', {
    method: 'POST',
    body: JSON.stringify({
      first_name: firstName,
      emails: [email],
    }),
  });
  const contact = firstDataItem(created);
  if (!contact || !contact.id) {
    const error = new Error('Relate contact create response did not include id');
    error.details = { payload: created };
    throw error;
  }
  return contact;
}

async function addContactToRelateList({ email, name }) {
  const listId = normalizeString(process.env.SPREAD_LIST_ID || process.env.RELATE_LIST_ID) || DEFAULT_LIST_ID;
  const contact = await findOrCreateRelateContact({ email, name });

  try {
    const entry = await relateApiFetch(`/lists/${encodeURIComponent(listId)}/entries`, {
      method: 'POST',
      body: JSON.stringify({
        entryable_id: contact.id,
        entryable_type: 'Contact',
      }),
    });
    return { ok: true, provider: 'relate_api', contactId: contact.id, entry: firstDataItem(entry) };
  } catch (error) {
    const status = error.details && error.details.status;
    const text = JSON.stringify(error.details && error.details.payload || {});
    if (status === 409 || /duplicate|already|이미|중복/i.test(text)) {
      return { ok: true, provider: 'relate_api', contactId: contact.id, alreadyExists: true };
    }
    throw error;
  }
}

function buildSpreadCookie() {
  return normalizeString(process.env.SPREAD_SESSION_COOKIE || process.env.RELATE_SESSION_COOKIE);
}

function safeLogPayload(submission) {
  return {
    formName: submission.formName,
    emailDomain: submission.email.includes('@') ? submission.email.split('@')[1] : '',
    hasName: Boolean(submission.name),
    hasConsent: truthyConsent(submission.consent),
    hasBotField: Boolean(submission.botField),
  };
}

async function addContactToResendAudience({ email, name }) {
  const apiKey = normalizeString(process.env.RESEND_API_KEY);
  if (!apiKey) {
    const error = new Error('RESEND_API_KEY is not configured');
    error.code = 'missing_resend_api_key';
    throw error;
  }

  const audienceId = normalizeString(process.env.RESEND_NEWSLETTER_AUDIENCE_ID) || DEFAULT_RESEND_AUDIENCE_ID;
  const response = await fetch(`https://api.resend.com/audiences/${encodeURIComponent(audienceId)}/contacts`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      first_name: name || undefined,
      unsubscribed: false,
    }),
  });

  const text = await response.text();
  let payload = null;
  try { payload = text ? JSON.parse(text) : null; } catch (_) { payload = { raw: text }; }

  const alreadyExists = response.status === 409 || /already exists|duplicate|contact_already_exists/i.test(text);
  if (!response.ok && !alreadyExists) {
    const error = new Error('Resend contact add failed');
    error.details = { status: response.status, audienceId, payload };
    throw error;
  }

  return {
    ok: true,
    provider: 'resend',
    audienceId,
    contactId: payload && payload.id || null,
    alreadyExists,
  };
}

async function fetchSpreadToken({ workspace, listId, cookie }) {
  const listUrl = `${SPREAD_ORIGIN}/spread/${encodeURIComponent(workspace)}/lists/${encodeURIComponent(listId)}`;
  const response = await fetch(listUrl, {
    method: 'GET',
    headers: {
      Cookie: cookie,
      Accept: 'text/html,application/xhtml+xml',
      'User-Agent': 'AhnPartnersNewsletterSync/1.0',
    },
    redirect: 'follow',
  });

  const html = await response.text();
  const addEntryForm = html.match(new RegExp(`<form[\\s\\S]*?/lists/${listId}/entries[\\s\\S]*?</form>`, 'i'));
  const token = extractAuthenticityToken(addEntryForm ? addEntryForm[0] : html);
  const unauthenticated = response.url.includes('/login') || /sign\s*in|로그인|login/i.test(html.slice(0, 4000));

  if (!response.ok || unauthenticated || !token) {
    const error = new Error('Spread authentication token fetch failed');
    error.details = {
      status: response.status,
      finalUrl: response.url,
      tokenFound: Boolean(token),
      unauthenticated,
    };
    throw error;
  }

  return { token, listUrl };
}

async function addContactToSpread({ email, name }) {
  const cookie = buildSpreadCookie();
  if (!cookie) {
    const error = new Error('SPREAD_SESSION_COOKIE is not configured');
    error.code = 'missing_spread_cookie';
    throw error;
  }

  const workspace = normalizeString(process.env.SPREAD_WORKSPACE) || DEFAULT_WORKSPACE;
  const listId = normalizeString(process.env.SPREAD_LIST_ID) || DEFAULT_LIST_ID;
  const { token, listUrl } = await fetchSpreadToken({ workspace, listId, cookie });

  const endpoint = `${SPREAD_ORIGIN}/lists/${encodeURIComponent(listId)}/entries?workspace_id=${encodeURIComponent(workspace)}`;
  const body = new URLSearchParams({
    authenticity_token: token,
    'entry[entryable_type]': 'Contact',
    'entry[entryable_id]': '',
    'contact[first_name]': name || '',
    'contact[last_name]': '',
    'contact[identities_attributes][0][email]': email,
    'organization[hashid]': '',
    'contact[title]': '',
    'contact[phone_number]': '',
    commit: '추가',
  });

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Cookie: cookie,
      Origin: SPREAD_ORIGIN,
      Referer: listUrl,
      Accept: 'text/vnd.turbo-stream.html, text/html, application/xhtml+xml',
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'X-CSRF-Token': token,
      'User-Agent': 'AhnPartnersNewsletterSync/1.0',
    },
    body,
    redirect: 'follow',
  });

  const text = await response.text();
  const unauthenticated = response.url.includes('/login') || /sign\s*in|로그인|login/i.test(text.slice(0, 4000));
  const alreadyExists = /이미|already|duplicate|중복/i.test(text);
  const successText = /추가되었습니다|added|리스트에 추가/i.test(text);

  if (!response.ok || unauthenticated) {
    const error = new Error('Spread contact add failed');
    error.details = {
      status: response.status,
      finalUrl: response.url,
      unauthenticated,
      alreadyExists,
      successText,
    };
    throw error;
  }

  return {
    ok: true,
    status: response.status,
    finalUrl: response.url,
    redirected: response.redirected,
    alreadyExists,
    successText,
  };
}

async function syncNewsletterSubmission(input, options = {}) {
  const submission = extractSubmissionData(input);
  const expectedForm = options.requireFormName === false ? '' : 'newsletter';

  if (expectedForm && submission.formName && submission.formName !== expectedForm) {
    return { ok: true, skipped: true, reason: 'different_form', submission: safeLogPayload(submission) };
  }
  if (submission.botField) {
    return { ok: true, skipped: true, reason: 'honeypot', submission: safeLogPayload(submission) };
  }
  if (!isValidEmail(submission.email)) {
    return { ok: true, skipped: true, reason: 'invalid_email', submission: safeLogPayload(submission) };
  }
  if (options.requireConsent !== false && !truthyConsent(submission.consent)) {
    return { ok: true, skipped: true, reason: 'missing_consent', submission: safeLogPayload(submission) };
  }

  const result = await addContactToResendAudience({ email: submission.email, name: submission.name });
  return { ok: true, synced: true, result, submission: safeLogPayload(submission) };
}

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
    body: JSON.stringify(body),
  };
}

module.exports = {
  addContactToResendAudience,
  addContactToRelateList,
  addContactToSpread,
  extractSubmissionData,
  jsonResponse,
  parseRequestBody,
  syncNewsletterSubmission,
};
