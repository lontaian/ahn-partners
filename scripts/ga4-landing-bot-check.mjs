// 목록 착지(/insights.html) 세션의 봇 혼입 판별 (수주나비 루프 C807).
// 기기/브라우저/체류 분해. 기존 newsletter-api의 서비스 계정 인증 재사용.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createServiceAccountAccessToken } from './newsletter-api.mjs';

const adcPath =
  process.env.GOOGLE_APPLICATION_CREDENTIALS ||
  path.join(os.homedir(), 'AppData', 'Roaming', 'ahn-partners', 'ga4-service-account.json');
const credentials = JSON.parse(fs.readFileSync(adcPath, 'utf8'));
const token = await createServiceAccountAccessToken(credentials, [
  'https://www.googleapis.com/auth/analytics.readonly',
]);

const res = await fetch(
  'https://analyticsdata.googleapis.com/v1beta/properties/544871944:runReport',
  {
    method: 'POST',
    headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      dateRanges: [{ startDate: '2026-07-20', endDate: '2026-08-22' }],
      dimensions: [
        { name: 'landingPage' },
        { name: 'deviceCategory' },
        { name: 'browser' },
        { name: 'sessionCampaignName' },
      ],
      metrics: [
        { name: 'sessions' },
        { name: 'engagedSessions' },
        { name: 'averageSessionDuration' },
      ],
      dimensionFilter: {
        andGroup: {
          expressions: [
            { filter: { fieldName: 'landingPage', stringFilter: { matchType: 'CONTAINS', value: 'insights' } } },
            { filter: { fieldName: 'sessionCampaignName', stringFilter: { matchType: 'BEGINS_WITH', value: 'no0' } } },
          ],
        },
      },
      limit: 60,
    }),
  },
);
const data = await res.json();
if (data.error) { console.error('GA4 ERR', data.error.message); process.exit(1); }
for (const row of data.rows || []) {
  const [lp, dev, br, camp] = row.dimensionValues.map((d) => d.value);
  const [s, es, dur] = row.metricValues.map((m) => m.value);
  const isList = lp.includes('insights.html') || lp === '/insights';
  console.log((isList ? 'LIST' : 'post'), '|', camp, '|', dev, '/', br, '| 세션', s, '| 참여', es, '| 평균', Number(dur).toFixed(1) + 's');
}
