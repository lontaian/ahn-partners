import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  fetchAllResendEmails,
  fetchGmailMessages,
  refreshAuthorizedUserAccessToken,
  runGa4Reports,
} from './newsletter-api.mjs';
import {
  buildGa4ReportRequests,
  parseGa4Report,
  renderMarkdownReport,
  summarizeGmailFeedback,
  summarizeResendCampaigns,
  upsertDailyHistory,
} from './newsletter-analytics-lib.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const config = JSON.parse(
  fs.readFileSync(path.join(root, 'config', 'newsletter-analytics.json'), 'utf8'),
);
const apiKey = process.env.RESEND_API_KEY;
if (!apiKey) throw new Error('RESEND_API_KEY is required');

const kstDate = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Seoul',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
}).format(new Date());
const generatedAt = new Date().toISOString();
const startDate = config.campaigns
  .map(({ date }) => date)
  .sort()[0];
const subjects = config.campaigns.map(({ subject }) => subject);

const emails = await fetchAllResendEmails({ apiKey });
const campaigns = summarizeResendCampaigns(emails, subjects).map((summary) => {
  const metadata = config.campaigns.find(({ subject }) => subject === summary.subject);
  return { campaign: metadata.campaign, date: metadata.date, ...summary };
});

let accessToken = null;
let googleError = null;
try {
  const adcPath =
    process.env.GOOGLE_APPLICATION_CREDENTIALS ||
    path.join(os.homedir(), 'AppData', 'Roaming', 'gcloud', 'application_default_credentials.json');
  const credentials = JSON.parse(fs.readFileSync(adcPath, 'utf8'));
  accessToken = await refreshAuthorizedUserAccessToken(credentials);
} catch (error) {
  googleError = error instanceof Error ? error.message : String(error);
}

let feedback = {
  status: 'error',
  error: googleError,
  replies: [],
  formSubmissions: [],
};
let ga4 = {
  status: 'error',
  error: googleError,
  campaignRows: [],
  landingRows: [],
  eventRows: [],
};

if (accessToken) {
  try {
    const replyBatches = await Promise.all(
      config.campaigns.map(async ({ campaign, subject, date }) => {
        const messages = await fetchGmailMessages({
          accessToken,
          query: `in:anywhere after:${date.replaceAll('-', '/')} -from:newsletter@ahn-partners.net subject:"${subject}"`,
        });
        return messages.map((message) => ({ campaign, ...message }));
      }),
    );
    const formMessages = await fetchGmailMessages({
      accessToken,
      query: `in:anywhere after:${startDate.replaceAll('-', '/')} from:formresponses@netlify.com subject:"Form submission from newsletter form:"`,
    });
    const formSubmissions = formMessages.map((message) => ({
      id: message.id,
      email: message.snippet.match(/이메일 \*:\s*([^\s]+)/)?.[1] ?? '',
      name: message.snippet.match(/이름:\s*(.*?)\s+Consent Newsletter:/)?.[1] ?? '',
      receivedAt: message.receivedAt,
    }));
    feedback = {
      status: 'ok',
      ...summarizeGmailFeedback({
        replies: replyBatches.flat(),
        formSubmissions,
      }),
    };
  } catch (error) {
    feedback = {
      ...feedback,
      error: error instanceof Error ? error.message : String(error),
    };
  }

  try {
    const rawReports = await runGa4Reports({
      propertyId: config.ga4PropertyId,
      accessToken,
      requests: buildGa4ReportRequests({
        startDate,
        endDate: kstDate,
      }),
    });
    ga4 = {
      status: 'ok',
      campaignRows: parseGa4Report(rawReports[0]),
      landingRows: parseGa4Report(rawReports[1]),
      eventRows: parseGa4Report(rawReports[2]),
    };
  } catch (error) {
    ga4 = {
      ...ga4,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

const overall = {
  generated: campaigns.reduce((sum, item) => sum + item.generated, 0),
  delivered: campaigns.reduce((sum, item) => sum + item.delivered, 0),
  engaged: campaigns.reduce((sum, item) => sum + item.engaged, 0),
  clicked: campaigns.reduce((sum, item) => sum + item.clicked, 0),
  siteSessions: ga4.campaignRows.reduce((sum, item) => sum + (item.sessions ?? 0), 0),
  replies: feedback.replies.length,
  formSubmissions: feedback.formSubmissions.length,
};
const report = {
  reportDate: kstDate,
  generatedAt,
  overall,
  resend: { campaigns },
  feedback,
  ga4,
};

const outputDir = path.join(root, 'exports', 'newsletter-analytics');
const snapshotsDir = path.join(outputDir, 'snapshots');
fs.mkdirSync(snapshotsDir, { recursive: true });
fs.writeFileSync(
  path.join(snapshotsDir, `${kstDate}.json`),
  `${JSON.stringify(report, null, 2)}\n`,
  'utf8',
);
fs.writeFileSync(
  path.join(outputDir, 'latest.md'),
  renderMarkdownReport(report),
  'utf8',
);

const historyPath = path.join(outputDir, 'history.jsonl');
const history = fs.existsSync(historyPath)
  ? fs
      .readFileSync(historyPath, 'utf8')
      .split(/\r?\n/)
      .filter(Boolean)
      .map((line) => JSON.parse(line))
  : [];
const nextHistory = upsertDailyHistory(history, report);
fs.writeFileSync(
  historyPath,
  `${nextHistory.map((entry) => JSON.stringify(entry)).join('\n')}\n`,
  'utf8',
);

console.log(`report=${path.join(outputDir, 'latest.md')}`);
console.log(`history=${historyPath}`);
console.log(`resend_campaigns=${campaigns.length}`);
console.log(`gmail_status=${feedback.status}`);
console.log(`ga4_status=${ga4.status}`);
if (feedback.status !== 'ok' || ga4.status !== 'ok') process.exitCode = 1;
