function roundPercent(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function countEvents(emails) {
  const counts = new Map();
  for (const email of emails) {
    const event = email.last_event ?? 'unknown';
    counts.set(event, (counts.get(event) ?? 0) + 1);
  }
  return counts;
}

function emailAddress(email) {
  const value = Array.isArray(email.to) ? email.to[0] : email.to;
  return String(value ?? '').trim().toLowerCase();
}

export function collectUniqueBouncedRecipients(emails, subjects) {
  const allowed = new Set(subjects);
  const recipients = new Set();

  for (const email of emails) {
    if (allowed.has(email.subject) && email.last_event === 'bounced') {
      const address = emailAddress(email);
      if (address) recipients.add(address);
    }
  }

  return [...recipients].sort();
}

export function summarizeResendCampaigns(emails, subjects) {
  return subjects.map((subject) => {
    const campaignEmails = emails.filter((email) => email.subject === subject);
    const events = countEvents(campaignEmails);
    const generated = campaignEmails.length;
    const bounced = events.get('bounced') ?? 0;
    const suppressed = events.get('suppressed') ?? 0;
    const deliveredOnly = events.get('delivered') ?? 0;
    const opened = events.get('opened') ?? 0;
    const clicked = events.get('clicked') ?? 0;
    const complained = events.get('complained') ?? 0;
    const delivered = generated - bounced - suppressed;
    const engaged = opened + clicked;

    return {
      subject,
      generated,
      delivered,
      deliveredOnly,
      opened,
      clicked,
      engaged,
      bounced,
      suppressed,
      complained,
      deliveryRate: delivered ? roundPercent((delivered / generated) * 100) : 0,
      engagementRate: delivered ? roundPercent((engaged / delivered) * 100) : 0,
      clickRate: delivered ? roundPercent((clicked / delivered) * 100) : 0,
      bounceRate: generated ? roundPercent((bounced / generated) * 100) : 0,
    };
  });
}

function newsletterDimensionFilter() {
  return {
    andGroup: {
      expressions: [
        {
          filter: {
            fieldName: 'sessionSource',
            stringFilter: { matchType: 'EXACT', value: 'brief' },
          },
        },
        {
          filter: {
            fieldName: 'sessionMedium',
            stringFilter: { matchType: 'EXACT', value: 'email' },
          },
        },
        {
          filter: {
            fieldName: 'sessionCampaignName',
            stringFilter: { matchType: 'BEGINS_WITH', value: 'no' },
          },
        },
      ],
    },
  };
}

export function buildGa4ReportRequests({ startDate, endDate }) {
  const common = {
    dateRanges: [{ startDate, endDate }],
    dimensionFilter: newsletterDimensionFilter(),
    keepEmptyRows: false,
    limit: '10000',
  };

  return [
    {
      ...common,
      dimensions: [
        { name: 'sessionCampaignName' },
        { name: 'sessionSource' },
        { name: 'sessionMedium' },
      ],
      metrics: [
        { name: 'sessions' },
        { name: 'totalUsers' },
        { name: 'screenPageViews' },
        { name: 'engagedSessions' },
        { name: 'engagementRate' },
        { name: 'averageSessionDuration' },
      ],
      orderBys: [{ dimension: { dimensionName: 'sessionCampaignName' } }],
    },
    {
      ...common,
      dimensions: [
        { name: 'sessionCampaignName' },
        { name: 'landingPagePlusQueryString' },
      ],
      metrics: [
        { name: 'sessions' },
        { name: 'totalUsers' },
        { name: 'screenPageViews' },
        { name: 'engagedSessions' },
      ],
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
    },
    {
      ...common,
      dimensions: [
        { name: 'sessionCampaignName' },
        { name: 'eventName' },
      ],
      metrics: [
        { name: 'eventCount' },
        { name: 'totalUsers' },
      ],
      orderBys: [
        { dimension: { dimensionName: 'sessionCampaignName' } },
        { metric: { metricName: 'eventCount' }, desc: true },
      ],
    },
  ];
}

export function parseGa4Report(report) {
  const dimensions = (report.dimensionHeaders ?? []).map(({ name }) => name);
  const metrics = report.metricHeaders ?? [];

  return (report.rows ?? []).map((row) => {
    const result = {};
    dimensions.forEach((name, index) => {
      result[name] = row.dimensionValues?.[index]?.value ?? '';
    });
    metrics.forEach(({ name, type }, index) => {
      const raw = row.metricValues?.[index]?.value ?? '0';
      result[name] = type === 'TYPE_INTEGER' ? Number.parseInt(raw, 10) : Number(raw);
    });
    return result;
  });
}

export function upsertDailyHistory(history, entry) {
  return [...history.filter((item) => item.reportDate !== entry.reportDate), entry].sort(
    (a, b) => a.reportDate.localeCompare(b.reportDate),
  );
}

export function upsertCampaignConfig(config, entry) {
  return {
    ...config,
    campaigns: [
      ...(config.campaigns ?? []).filter(
        ({ campaign }) => campaign !== entry.campaign,
      ),
      entry,
    ].sort((a, b) => a.date.localeCompare(b.date)),
  };
}

export function selectSafeBounceContacts(
  bouncedRecipients,
  gmailContacts,
  subscriberContacts,
) {
  const bounced = new Set(bouncedRecipients.map((email) => email.toLowerCase()));
  const subscribers = new Set(
    subscriberContacts.map(({ email }) => String(email).toLowerCase()),
  );

  return gmailContacts
    .filter(({ email }) => {
      const normalized = String(email).toLowerCase();
      return bounced.has(normalized) && !subscribers.has(normalized);
    })
    .map(({ id, email }) => ({ id, email }))
    .sort((a, b) => a.email.localeCompare(b.email));
}

export function summarizeGmailFeedback({ replies = [], formSubmissions = [] }) {
  return {
    replyCount: replies.length,
    formSubmissionCount: formSubmissions.length,
    replies,
    formSubmissions,
  };
}

export function renderMarkdownReport(report) {
  const lines = [
    `# Ahn's Newsletter 자동 성과 리포트`,
    '',
    `- 보고일: ${report.reportDate}`,
    `- 생성시각: ${report.generatedAt}`,
    `- GA4 상태: ${report.ga4.status}`,
    '',
    '## 전체 퍼널',
    '',
    `- 발송 생성: ${report.overall?.generated ?? 0}`,
    `- 유효 전달: ${report.overall?.delivered ?? 0}`,
    `- 열람 이상: ${report.overall?.engaged ?? 0}`,
    `- 링크 클릭: ${report.overall?.clicked ?? 0}`,
    `- 사이트 세션: ${report.overall?.siteSessions ?? 0}`,
    `- 직접 회신/문의: ${report.overall?.replies ?? 0}`,
    `- 뉴스레터 폼 신청: ${report.overall?.formSubmissions ?? 0}`,
    '',
    '## Resend 발송 성과',
    '',
    '| 제목 | 생성 | 유효 전달 | 전달률 | 열람 이상 | 관여율 | 클릭 | 클릭률 | 반송 | 억제 | 신고 |',
    '|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|',
  ];

  for (const campaign of report.resend.campaigns) {
    lines.push(
      `| ${campaign.subject} | ${campaign.generated} | ${campaign.delivered} | ${campaign.deliveryRate}% | ${campaign.engaged} | ${campaign.engagementRate}% | ${campaign.clicked} | ${campaign.clickRate}% | ${campaign.bounced} | ${campaign.suppressed} | ${campaign.complained} |`,
    );
  }

  lines.push('', '## 사용자 피드백과 사이트 전환', '');
  const feedback = report.feedback ?? {
    status: 'not-configured',
    replies: [],
    formSubmissions: [],
  };
  lines.push(
    `- Gmail 수집 상태: ${feedback.status}`,
    `- 직접 회신/문의: ${feedback.replies?.length ?? 0}건`,
    `- 뉴스레터 폼 신청: ${feedback.formSubmissions?.length ?? 0}건`,
  );
  for (const reply of feedback.replies ?? []) {
    lines.push(
      `- 회신 ${reply.receivedAt ?? ''} · ${reply.from ?? ''} · ${reply.subject ?? ''}: ${reply.snippet ?? ''}`,
    );
  }

  lines.push('', '## GA4 뉴스레터 유입', '');
  if (report.ga4.campaignRows.length === 0) {
    lines.push('- 수집된 뉴스레터 캠페인 행이 없습니다.');
  } else {
    lines.push(
      '| 캠페인 | 세션 | 사용자 | 페이지뷰 | 참여 세션 | 참여율 | 평균 세션(초) |',
      '|---|---:|---:|---:|---:|---:|---:|',
    );
    for (const row of report.ga4.campaignRows) {
      lines.push(
        `| ${row.sessionCampaignName ?? ''} | ${row.sessions ?? 0} | ${row.totalUsers ?? 0} | ${row.screenPageViews ?? 0} | ${row.engagedSessions ?? 0} | ${roundPercent((row.engagementRate ?? 0) * 100)}% | ${roundPercent(row.averageSessionDuration ?? 0)} |`,
      );
    }
  }

  lines.push('', '## GA4 내부 행동과 전환', '');
  if ((report.ga4.eventRows ?? []).length === 0) {
    lines.push('- 수집된 뉴스레터 행동 이벤트가 없습니다.');
  } else {
    lines.push(
      '| 캠페인 | 이벤트 | 이벤트 수 | 사용자 |',
      '|---|---|---:|---:|',
    );
    for (const row of report.ga4.eventRows) {
      lines.push(
        `| ${row.sessionCampaignName ?? ''} | ${row.eventName ?? ''} | ${row.eventCount ?? 0} | ${row.totalUsers ?? 0} |`,
      );
    }
  }

  lines.push('', '## GA4 랜딩 페이지', '');
  if (report.ga4.landingRows.length === 0) {
    lines.push('- 수집된 랜딩 페이지 행이 없습니다.');
  } else {
    lines.push(
      '| 캠페인 | 랜딩 페이지 | 세션 | 사용자 | 페이지뷰 | 참여 세션 |',
      '|---|---|---:|---:|---:|---:|',
    );
    for (const row of report.ga4.landingRows) {
      lines.push(
        `| ${row.sessionCampaignName ?? ''} | ${row.landingPagePlusQueryString ?? ''} | ${row.sessions ?? 0} | ${row.totalUsers ?? 0} | ${row.screenPageViews ?? 0} | ${row.engagedSessions ?? 0} |`,
      );
    }
  }

  return `${lines.join('\n')}\n`;
}
