// Executive Brief 발송 자동화 (Resend)
// 사용법:
//   테스트 발송(단건):  node --env-file=.env scripts/brief-send.mjs --file briefs/001-ai-misconception.html --subject "제목" --campaign no001 --test phantas19@gmail.com
//   본 발송(예약):      node --env-file=.env scripts/brief-send.mjs --file briefs/001-ai-misconception.html --subject "제목" --campaign no001 --audience subscribers --at "2026-07-14T08:30:00+09:00"
//   즉시 발송:          --at 생략
// audience: subscribers | gmail  (코호트 2개, 둘 다 보내려면 두 번 실행)
import fs from 'node:fs';
import { upsertCampaignConfig } from './newsletter-analytics-lib.mjs';

const AUDIENCES = {
  subscribers: '6b75513b-6845-4eed-818f-d02caea5c20f', // Newsletter Subscribers (자발 신청)
  gmail: 'd08db842-4a4c-459a-bba6-397d03b93ab3', // Gmail Contacts (동의 지인)
  // 'General'(Resend 기본 생성 추정, 2026-07-08). 실구독자 0명이며 예약과 발송 동작 검증 전용으로 용도를 확정했다(2026-07-30).
  // ★여기에 실제 구독자를 넣지 않는다. 플랜이 세그먼트 3개 한도라 이 자리를 비워두면 검증할 오디언스가 없어진다.
  // API로 오디언스 이름을 바꿀 수 없어(PATCH 405) 이름은 General로 남아 있다.
  test: '9a7514ac-71d6-4de7-9203-d0c81947d78c',
};
// 발신 표시명 규칙(사용자 확정 2026-07-08):
//   newsletter@ = "Ahn's Newsletter" (뉴스레터 발송, 7월 4일 Spread 시절부터의 규칙)
//   hello@ = "Ahn Partners" (일반), chris@ = "Chris Ahn" (개인 명의만)
const FROM = "Ahn's Newsletter <newsletter@ahn-partners.net>";
const REPLY_TO = 'hello@ahn-partners.net';

const args = process.argv.slice(2);
const get = (k) => { const i = args.indexOf('--' + k); return i >= 0 ? args[i + 1] : null; };
const file = get('file'), subject = get('subject'), campaign = get('campaign');
const test = get('test'), audienceKey = get('audience'), at = get('at');
if (!file || !subject || !campaign) { console.error('필수: --file --subject --campaign'); process.exit(1); }

let html = fs.readFileSync(file, 'utf8');

// UTM 부착: ahn-partners.net 링크 전부 (mailto와 unsubscribe 제외)
// 링크별 구분 측정: 앵커에 data-uc="라벨"을 달면 utm_content로 부착된다 (read-full, note-1, footer-subscribe 등)
html = html.replace(/<a\b([^>]*?)href="(https:\/\/ahn-partners\.net[^"]*)"([^>]*)>/g, (m, pre, url, post) => {
  if (url.includes('utm_')) return m;
  const uc = (pre + post).match(/data-uc="([a-z0-9-]+)"/);
  const sep = url.includes('?') ? '&' : '?';
  const content = uc ? `&utm_content=${uc[1]}` : '';
  return `<a${pre}href="${url}${sep}utm_source=brief&utm_medium=email&utm_campaign=${campaign}${content}"${post}>`;
});

const headers = { Authorization: 'Bearer ' + process.env.RESEND_API_KEY, 'Content-Type': 'application/json' };

function registerCampaign() {
  const configPath = new URL('../config/newsletter-analytics.json', import.meta.url);
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  const date = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(at ? new Date(at) : new Date());
  const next = upsertCampaignConfig(config, { campaign, date, subject });
  fs.writeFileSync(configPath, `${JSON.stringify(next, null, 2)}\n`, 'utf8');
}

if (test) {
  // 단건 테스트: unsubscribe 플레이스홀더는 브로드캐스트 전용이라 여기서는 뉴스레터 페이지로 대체
  // (실제 발송에서는 Resend가 수신자별 원클릭 수신거부 URL로 치환한다)
  const testHtml = html.replaceAll('{{{RESEND_UNSUBSCRIBE_URL}}}', 'https://ahn-partners.net/newsletter');
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST', headers,
    body: JSON.stringify({ from: FROM, to: [test], reply_to: REPLY_TO, subject: '[테스트] ' + subject, html: testHtml }),
  });
  console.log('test send:', r.status, JSON.stringify(await r.json()));
} else {

if (!audienceKey || !AUDIENCES[audienceKey]) { console.error('필수: --audience subscribers|gmail'); process.exitCode = 1; }
else {
  const create = await fetch('https://api.resend.com/broadcasts', {
    method: 'POST', headers,
    body: JSON.stringify({
      audience_id: AUDIENCES[audienceKey],
      from: FROM, reply_to: REPLY_TO, subject, html,
      name: campaign + '-' + audienceKey,
    }),
  });
  const cj = await create.json();
  console.log('broadcast create:', create.status, JSON.stringify(cj));
  if (cj.id) {
    registerCampaign();
    const sendBody = at ? { scheduled_at: at } : {};
    const send = await fetch(`https://api.resend.com/broadcasts/${cj.id}/send`, {
      method: 'POST', headers, body: JSON.stringify(sendBody),
    });
    console.log('broadcast send:', send.status, JSON.stringify(await send.json()));
    console.log(at ? `예약 완료: ${at}` : '즉시 발송 완료');
  } else process.exitCode = 1;
}
}
