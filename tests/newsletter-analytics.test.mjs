import assert from 'node:assert/strict';
import fs from 'node:fs';
import { generateKeyPairSync } from 'node:crypto';
import test from 'node:test';

async function loadSubject() {
  try {
    return await import('../scripts/newsletter-analytics-lib.mjs');
  } catch {
    return {};
  }
}

async function loadApiSubject() {
  try {
    return await import('../scripts/newsletter-api.mjs');
  } catch {
    return {};
  }
}

test('collectUniqueBouncedRecipients deduplicates repeated bounces and filters subjects', async () => {
  const { collectUniqueBouncedRecipients } = await loadSubject();
  assert.equal(typeof collectUniqueBouncedRecipients, 'function');

  const emails = [
    { subject: 'Issue A', last_event: 'bounced', to: ['A@example.com'] },
    { subject: 'Issue B', last_event: 'bounced', to: ['a@example.com'] },
    { subject: 'Issue A', last_event: 'opened', to: ['opened@example.com'] },
    { subject: 'Other', last_event: 'bounced', to: ['other@example.com'] },
  ];

  assert.deepEqual(
    collectUniqueBouncedRecipients(emails, ['Issue A', 'Issue B']),
    ['a@example.com'],
  );
});

test('summarizeResendCampaigns treats clicked as the latest event after open', async () => {
  const { summarizeResendCampaigns } = await loadSubject();
  assert.equal(typeof summarizeResendCampaigns, 'function');

  const emails = [
    { subject: 'Issue A', last_event: 'delivered' },
    { subject: 'Issue A', last_event: 'opened' },
    { subject: 'Issue A', last_event: 'clicked' },
    { subject: 'Issue A', last_event: 'bounced' },
    { subject: 'Issue A', last_event: 'suppressed' },
  ];

  assert.deepEqual(summarizeResendCampaigns(emails, ['Issue A']), [
    {
      subject: 'Issue A',
      generated: 5,
      delivered: 3,
      deliveredOnly: 1,
      opened: 1,
      clicked: 1,
      engaged: 2,
      bounced: 1,
      suppressed: 1,
      complained: 0,
      deliveryRate: 60,
      engagementRate: 66.67,
      clickRate: 33.33,
      bounceRate: 20,
    },
  ]);
});

test('buildGa4ReportRequests consolidates Resend campaign suffixes per registered issue', async () => {
  const { buildGa4ReportRequests } = await loadSubject();
  assert.equal(typeof buildGa4ReportRequests, 'function');

  const reports = buildGa4ReportRequests({
    startDate: '2026-07-09',
    endDate: '2026-07-24',
    campaigns: ['no003', 'no004'],
  });

  assert.equal(reports.length, 6);
  assert.deepEqual(
    reports.map(({ campaign, kind }) => ({ campaign, kind })),
    [
      { campaign: 'no003', kind: 'campaign' },
      { campaign: 'no003', kind: 'landing' },
      { campaign: 'no003', kind: 'event' },
      { campaign: 'no004', kind: 'campaign' },
      { campaign: 'no004', kind: 'landing' },
      { campaign: 'no004', kind: 'event' },
    ],
  );
  for (const { campaign, request } of reports) {
    assert.deepEqual(request.dateRanges, [
      { startDate: '2026-07-09', endDate: '2026-07-24' },
    ]);
    const serialized = JSON.stringify(request.dimensionFilter);
    assert.match(serialized, /sessionSource/);
    assert.match(serialized, /brief/);
    assert.match(serialized, /sessionMedium/);
    assert.match(serialized, /email/);
    assert.match(serialized, /sessionCampaignName/);
    assert.match(serialized, new RegExp(`\\^${campaign}`));
    assert.match(serialized, /\/\.\*/);
    assert.doesNotMatch(
      JSON.stringify(request.dimensions),
      /sessionCampaignName/,
    );
  }
  assert.deepEqual(reports[2].request.dimensions, [{ name: 'eventName' }]);
});

test('parseGa4Report maps headers and metric values into named rows', async () => {
  const { parseGa4Report } = await loadSubject();
  assert.equal(typeof parseGa4Report, 'function');

  const parsed = parseGa4Report({
    dimensionHeaders: [{ name: 'sessionCampaignName' }],
    metricHeaders: [
      { name: 'sessions', type: 'TYPE_INTEGER' },
      { name: 'engagementRate', type: 'TYPE_FLOAT' },
    ],
    rows: [
      {
        dimensionValues: [{ value: 'no003' }],
        metricValues: [{ value: '12' }, { value: '0.5' }],
      },
    ],
  });

  assert.deepEqual(parsed, [
    { sessionCampaignName: 'no003', sessions: 12, engagementRate: 0.5 },
  ]);
});

test('upsertDailyHistory replaces the same date and sorts ascending', async () => {
  const { upsertDailyHistory } = await loadSubject();
  assert.equal(typeof upsertDailyHistory, 'function');

  const history = [
    { reportDate: '2026-07-23', value: 1 },
    { reportDate: '2026-07-21', value: 1 },
  ];

  assert.deepEqual(
    upsertDailyHistory(history, { reportDate: '2026-07-23', value: 2 }),
    [
      { reportDate: '2026-07-21', value: 1 },
      { reportDate: '2026-07-23', value: 2 },
    ],
  );
});

test('upsertCampaignConfig records a future issue once across both audiences', async () => {
  const { upsertCampaignConfig } = await loadSubject();
  assert.equal(typeof upsertCampaignConfig, 'function');

  const config = {
    campaigns: [
      { campaign: 'no003', date: '2026-07-21', subject: 'Issue A' },
    ],
  };
  const next = upsertCampaignConfig(config, {
    campaign: 'no004',
    date: '2026-07-23',
    subject: 'Issue B',
  });
  assert.deepEqual(
    upsertCampaignConfig(next, {
      campaign: 'no004',
      date: '2026-07-23',
      subject: 'Issue B',
    }).campaigns,
    [
      { campaign: 'no003', date: '2026-07-21', subject: 'Issue A' },
      { campaign: 'no004', date: '2026-07-23', subject: 'Issue B' },
    ],
  );
});

test('selectSafeBounceContacts deletes Gmail contacts but never subscribers', async () => {
  const { selectSafeBounceContacts } = await loadSubject();
  assert.equal(typeof selectSafeBounceContacts, 'function');

  const bounced = ['bounce@example.com', 'subscriber@example.com'];
  const gmailContacts = [
    { id: 'g-1', email: 'bounce@example.com' },
    { id: 'g-2', email: 'subscriber@example.com' },
    { id: 'g-3', email: 'keep@example.com' },
  ];
  const subscriberContacts = [{ id: 's-1', email: 'subscriber@example.com' }];

  assert.deepEqual(
    selectSafeBounceContacts(bounced, gmailContacts, subscriberContacts),
    [{ id: 'g-1', email: 'bounce@example.com' }],
  );
});

test('renderMarkdownReport exposes Resend results and GA4 collection status', async () => {
  const { renderMarkdownReport } = await loadSubject();
  assert.equal(typeof renderMarkdownReport, 'function');

  const markdown = renderMarkdownReport({
    reportDate: '2026-07-24',
    generatedAt: '2026-07-24T10:00:00+09:00',
    resend: {
      campaigns: [
        {
          campaign: 'no003',
          subject: 'Issue A',
          generated: 5,
          delivered: 4,
          deliveryRate: 80,
          engaged: 2,
          engagementRate: 50,
          clicked: 1,
          clickRate: 25,
          bounced: 1,
          suppressed: 0,
          complained: 0,
        },
      ],
    },
    ga4: {
      status: 'ok',
      campaignRows: [{ sessionCampaignName: 'no003', sessions: 3 }],
      landingRows: [],
      eventRows: [
        {
          sessionCampaignName: 'no003',
          eventName: 'newsletter_arrival',
          eventCount: 3,
          totalUsers: 2,
        },
      ],
    },
    feedback: {
      status: 'ok',
      replies: [],
      formSubmissions: [{ email: 'reader@example.com', receivedAt: '2026-07-24' }],
      inquiries: [{ receivedAt: '2026-07-24' }],
    },
    overall: {
      generated: 5,
      delivered: 4,
      engaged: 2,
      clicked: 1,
      siteSessions: 3,
      replies: 0,
      formSubmissions: 1,
    },
  });

  assert.match(markdown, /Issue A/);
  assert.match(markdown, /no003/);
  assert.match(markdown, /GA4.*ok/);
  assert.match(markdown, /newsletter_arrival/);
  assert.match(markdown, /폼 신청.*1/);
  assert.match(markdown, /사이트 문의.*1/);
  assert.match(markdown, /전체 퍼널/);
  assert.match(markdown, /사이트 세션.*3/);
});

test('summarizeGmailFeedback separates reader replies from site form conversions', async () => {
  const { summarizeGmailFeedback } = await loadSubject();
  assert.equal(typeof summarizeGmailFeedback, 'function');

  const feedback = summarizeGmailFeedback({
    replies: [
      {
        from: 'reader@example.com',
        subject: 'Re: Issue A',
        snippet: '좋은 글 감사합니다.',
        receivedAt: '2026-07-24T01:00:00Z',
      },
    ],
    formSubmissions: [
      {
        email: 'new@example.com',
        name: 'New Reader',
        receivedAt: '2026-07-24T02:00:00Z',
      },
    ],
    inquiries: [{ receivedAt: '2026-07-24T03:00:00Z' }],
  });

  assert.equal(feedback.replyCount, 1);
  assert.equal(feedback.formSubmissionCount, 1);
  assert.equal(feedback.inquiryCount, 1);
  assert.equal(feedback.replies[0].snippet, '좋은 글 감사합니다.');
});

test('normalizeNetlifySubmissions keeps attribution without private telemetry', async () => {
  const { normalizeNetlifySubmissions } = await loadSubject();
  assert.equal(typeof normalizeNetlifySubmissions, 'function');

  const submissions = normalizeNetlifySubmissions(
    [
      {
        id: 'submission-1',
        created_at: '2026-07-23T23:25:08.617Z',
        data: {
          email: 'reader@example.com',
          name: 'Reader',
          referrer:
            'https://ahn-partners.net/newsletter?utm_source=brief&utm_medium=email&utm_campaign=no004',
          ip: '127.0.0.1',
          user_agent: 'private',
        },
      },
    ],
    '2026-07-21',
  );

  assert.deepEqual(submissions, [
    {
      id: 'submission-1',
      email: 'reader@example.com',
      name: 'Reader',
      receivedAt: '2026-07-23T23:25:08.617Z',
      referrer:
        'https://ahn-partners.net/newsletter?utm_source=brief&utm_medium=email&utm_campaign=no004',
      campaign: 'no004',
      source: 'brief',
      medium: 'email',
    },
  ]);
});

test('GA loader declares the newsletter journey events used by reports', () => {
  const source = fs.readFileSync(new URL('../js/ga.js', import.meta.url), 'utf8');
  for (const eventName of [
    'newsletter_arrival',
    'insight_read_50',
    'insight_read_90',
    'internal_link_click',
    'contact_intent',
    'newsletter_signup_submit',
    'newsletter_signup',
  ]) {
    assert.match(source, new RegExp(eventName));
  }
});

test('fetchAllResendEmails follows cursor pagination', async () => {
  const { fetchAllResendEmails } = await loadApiSubject();
  assert.equal(typeof fetchAllResendEmails, 'function');

  const urls = [];
  const fetchImpl = async (url) => {
    urls.push(url);
    const secondPage = String(url).includes('after=email-2');
    return {
      ok: true,
      json: async () =>
        secondPage
          ? { has_more: false, data: [{ id: 'email-3' }] }
          : { has_more: true, data: [{ id: 'email-1' }, { id: 'email-2' }] },
    };
  };

  const emails = await fetchAllResendEmails({ apiKey: 'test', fetchImpl });
  assert.deepEqual(
    emails.map(({ id }) => id),
    ['email-1', 'email-2', 'email-3'],
  );
  assert.equal(urls.length, 2);
});

test('deleteResendContacts deletes exact contact ids', async () => {
  const { deleteResendContacts } = await loadApiSubject();
  assert.equal(typeof deleteResendContacts, 'function');

  const calls = [];
  const fetchImpl = async (url, options) => {
    calls.push({ url, method: options.method });
    return { ok: true, json: async () => ({ deleted: true }) };
  };

  const deleted = await deleteResendContacts({
    apiKey: 'test',
    contacts: [
      { id: 'contact-1', email: 'a@example.com' },
      { id: 'contact-2', email: 'b@example.com' },
    ],
    fetchImpl,
    delayMs: 0,
  });

  assert.equal(deleted.length, 2);
  assert.deepEqual(
    calls.map(({ url, method }) => ({ url, method })),
    [
      { url: 'https://api.resend.com/contacts/contact-1', method: 'DELETE' },
      { url: 'https://api.resend.com/contacts/contact-2', method: 'DELETE' },
    ],
  );
});

test('fetchResendAudienceContacts follows cursor pagination', async () => {
  const { fetchResendAudienceContacts } = await loadApiSubject();
  assert.equal(typeof fetchResendAudienceContacts, 'function');

  const fetchImpl = async (url) => {
    const secondPage = String(url).includes('after=contact-2');
    return {
      ok: true,
      json: async () =>
        secondPage
          ? { has_more: false, data: [{ id: 'contact-3', email: 'c@example.com' }] }
          : {
              has_more: true,
              data: [
                { id: 'contact-1', email: 'a@example.com' },
                { id: 'contact-2', email: 'b@example.com' },
              ],
            },
    };
  };

  const contacts = await fetchResendAudienceContacts({
    apiKey: 'test',
    audienceId: 'audience-1',
    fetchImpl,
  });
  assert.deepEqual(
    contacts.map(({ id }) => id),
    ['contact-1', 'contact-2', 'contact-3'],
  );
});

test('refreshAuthorizedUserAccessToken exchanges an ADC refresh token', async () => {
  const { refreshAuthorizedUserAccessToken } = await loadApiSubject();
  assert.equal(typeof refreshAuthorizedUserAccessToken, 'function');

  let request;
  const fetchImpl = async (url, options) => {
    request = { url, options };
    return { ok: true, json: async () => ({ access_token: 'access-token' }) };
  };

  const token = await refreshAuthorizedUserAccessToken(
    {
      client_id: 'client-id',
      client_secret: 'client-secret',
      refresh_token: 'refresh-token',
    },
    fetchImpl,
  );

  assert.equal(token, 'access-token');
  assert.equal(request.url, 'https://oauth2.googleapis.com/token');
  assert.match(request.options.body, /grant_type=refresh_token/);
});

test('createServiceAccountAccessToken exchanges a signed JWT', async () => {
  const { createServiceAccountAccessToken } = await loadApiSubject();
  assert.equal(typeof createServiceAccountAccessToken, 'function');

  const { privateKey } = generateKeyPairSync('rsa', { modulusLength: 2048 });
  let request;
  const fetchImpl = async (url, options) => {
    request = { url, options };
    return { ok: true, json: async () => ({ access_token: 'service-token' }) };
  };
  const token = await createServiceAccountAccessToken(
    {
      client_email: 'analytics@example.iam.gserviceaccount.com',
      private_key: privateKey.export({ type: 'pkcs8', format: 'pem' }),
      token_uri: 'https://oauth2.googleapis.com/token',
    },
    ['https://www.googleapis.com/auth/analytics.readonly'],
    fetchImpl,
  );

  assert.equal(token, 'service-token');
  assert.equal(request.url, 'https://oauth2.googleapis.com/token');
  assert.match(request.options.body, /grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer/);
});

test('runGa4Reports calls the configured property for every request', async () => {
  const { runGa4Reports } = await loadApiSubject();
  assert.equal(typeof runGa4Reports, 'function');

  const calls = [];
  const fetchImpl = async (url, options) => {
    calls.push({ url, body: JSON.parse(options.body) });
    return {
      ok: true,
      json: async () => ({
        dimensionHeaders: [],
        metricHeaders: [],
        rows: [],
      }),
    };
  };

  const reports = await runGa4Reports({
    propertyId: '360327884',
    accessToken: 'access-token',
    requests: [{ dimensions: [] }, { dimensions: [{ name: 'landingPage' }] }],
    fetchImpl,
  });

  assert.equal(reports.length, 2);
  assert.ok(calls.every(({ url }) => url.includes('/properties/360327884:runReport')));
});

test('fetchGmailMessages follows Gmail pagination and returns message metadata', async () => {
  const { fetchGmailMessages } = await loadApiSubject();
  assert.equal(typeof fetchGmailMessages, 'function');

  const calls = [];
  const fetchImpl = async (url) => {
    calls.push(String(url));
    if (String(url).includes('/messages?')) {
      const second = String(url).includes('pageToken=next');
      return {
        ok: true,
        json: async () =>
          second
            ? { messages: [{ id: 'm2' }] }
            : { messages: [{ id: 'm1' }], nextPageToken: 'next' },
      };
    }
    const id = String(url).match(/messages\/(m\d)/)?.[1];
    return {
      ok: true,
      json: async () => ({
        id,
        snippet: `snippet-${id}`,
        internalDate: '1784862000000',
        payload: {
          headers: [
            { name: 'From', value: 'reader@example.com' },
            { name: 'Subject', value: 'Re: Issue A' },
          ],
        },
      }),
    };
  };

  const messages = await fetchGmailMessages({
    accessToken: 'access-token',
    query: 'subject:"Issue A"',
    fetchImpl,
  });

  assert.deepEqual(
    messages.map(({ id }) => id),
    ['m1', 'm2'],
  );
  assert.ok(calls.some((url) => url.includes('pageToken=next')));
});
