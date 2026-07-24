import { setTimeout as delay } from 'node:timers/promises';

const RESEND_API = 'https://api.resend.com';
const GA4_DATA_API = 'https://analyticsdata.googleapis.com/v1beta';
const GMAIL_API = 'https://gmail.googleapis.com/gmail/v1/users/me';

async function readJson(response, operation) {
  const body = await response.json();
  if (!response.ok) {
    throw new Error(`${operation} failed (${response.status}): ${JSON.stringify(body)}`);
  }
  return body;
}

function resendHeaders(apiKey) {
  return {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };
}

export async function fetchAllResendEmails({ apiKey, fetchImpl = fetch }) {
  const emails = [];
  let after = null;

  for (;;) {
    const url = new URL(`${RESEND_API}/emails`);
    url.searchParams.set('limit', '100');
    if (after) url.searchParams.set('after', after);

    const response = await fetchImpl(url.toString(), {
      headers: resendHeaders(apiKey),
    });
    const page = await readJson(response, 'Resend email list');
    emails.push(...(page.data ?? []));

    if (!page.has_more || page.data?.length === 0) return emails;
    after = page.data.at(-1).id;
  }
}

export async function fetchResendAudienceContacts({
  apiKey,
  audienceId,
  fetchImpl = fetch,
}) {
  const contacts = [];
  let after = null;

  for (;;) {
    const url = new URL(
      `${RESEND_API}/audiences/${encodeURIComponent(audienceId)}/contacts`,
    );
    url.searchParams.set('limit', '100');
    if (after) url.searchParams.set('after', after);
    const response = await fetchImpl(url.toString(), {
      headers: resendHeaders(apiKey),
    });
    const page = await readJson(response, `Resend audience ${audienceId} contacts`);
    contacts.push(...(page.data ?? []));
    if (!page.has_more || page.data?.length === 0) return contacts;
    after = page.data.at(-1).id;
  }
}

export async function deleteResendContacts({
  apiKey,
  contacts,
  fetchImpl = fetch,
  delayMs = 550,
}) {
  const deleted = [];

  for (const contact of contacts) {
    const response = await fetchImpl(
      `${RESEND_API}/contacts/${encodeURIComponent(contact.id)}`,
      {
        method: 'DELETE',
        headers: resendHeaders(apiKey),
      },
    );
    const result = await readJson(response, `Delete Resend contact ${contact.id}`);
    if (!result.deleted) {
      throw new Error(`Resend did not confirm deletion for contact ${contact.id}`);
    }
    deleted.push(contact);
    if (delayMs > 0) await delay(delayMs);
  }

  return deleted;
}

export async function refreshAuthorizedUserAccessToken(credentials, fetchImpl = fetch) {
  const body = new URLSearchParams({
    client_id: credentials.client_id,
    client_secret: credentials.client_secret,
    refresh_token: credentials.refresh_token,
    grant_type: 'refresh_token',
  });
  const response = await fetchImpl('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });
  const result = await readJson(response, 'Google OAuth token refresh');
  if (!result.access_token) throw new Error('Google OAuth response did not include access_token');
  return result.access_token;
}

export async function runGa4Reports({
  propertyId,
  accessToken,
  requests,
  fetchImpl = fetch,
}) {
  const reports = [];
  for (const request of requests) {
    const response = await fetchImpl(
      `${GA4_DATA_API}/properties/${encodeURIComponent(propertyId)}:runReport`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      },
    );
    reports.push(await readJson(response, 'GA4 runReport'));
  }
  return reports;
}

function gmailHeader(message, name) {
  return (
    message.payload?.headers?.find(
      (header) => String(header.name).toLowerCase() === name.toLowerCase(),
    )?.value ?? ''
  );
}

export async function fetchGmailMessages({
  accessToken,
  query,
  fetchImpl = fetch,
}) {
  const ids = [];
  let pageToken = null;

  for (;;) {
    const url = new URL(`${GMAIL_API}/messages`);
    url.searchParams.set('q', query);
    url.searchParams.set('maxResults', '100');
    if (pageToken) url.searchParams.set('pageToken', pageToken);
    const response = await fetchImpl(url.toString(), {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const page = await readJson(response, 'Gmail message search');
    ids.push(...(page.messages ?? []).map(({ id }) => id));
    if (!page.nextPageToken) break;
    pageToken = page.nextPageToken;
  }

  const messages = [];
  for (const id of ids) {
    const url = new URL(`${GMAIL_API}/messages/${encodeURIComponent(id)}`);
    url.searchParams.set('format', 'metadata');
    for (const header of ['From', 'To', 'Subject', 'Date']) {
      url.searchParams.append('metadataHeaders', header);
    }
    const response = await fetchImpl(url.toString(), {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const message = await readJson(response, `Gmail message ${id}`);
    messages.push({
      id: message.id,
      threadId: message.threadId,
      from: gmailHeader(message, 'From'),
      to: gmailHeader(message, 'To'),
      subject: gmailHeader(message, 'Subject'),
      date: gmailHeader(message, 'Date'),
      snippet: message.snippet ?? '',
      receivedAt: message.internalDate
        ? new Date(Number(message.internalDate)).toISOString()
        : null,
    });
  }

  return messages;
}
