/**
 * 30일 밖이라 예약하지 못한 초안을 때가 되면 예약한다.
 *
 * 배경(2026-08-20): Resend 는 scheduled_at 을 30일 이내로만 받는다.
 * 그보다 먼 호는 브로드캐스트 초안까지만 만들어 두고 여기에 기록해 둔다.
 * 이 스크립트를 매일 돌리면 발송일이 30일 안으로 들어온 순간 자동으로 예약된다.
 *
 * 목록 파일: config/pending-broadcasts.json
 *   [{ "id": "...", "at": "2026-09-22T08:30:00+09:00", "campaign": "no020" }]
 *
 * 실행: node --env-file=.env scripts/schedule-pending-broadcasts.mjs
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const LIST = 'config/pending-broadcasts.json';
if (!existsSync(LIST)) { console.log('대기 목록 없음'); process.exit(0); }

const items = JSON.parse(readFileSync(LIST, 'utf8'));
if (!items.length) { console.log('대기 목록 비어 있음'); process.exit(0); }

const headers = {
  Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
  'Content-Type': 'application/json',
};

const now = Date.now();
const LIMIT_MS = 29 * 24 * 3600 * 1000; // 30일 경계에 딱 붙지 않게 하루 여유
const remain = [];

for (const it of items) {
  const due = new Date(it.at).getTime();
  if (due - now > LIMIT_MS) {
    console.log(`대기 ${it.campaign} ${it.at} (아직 30일 밖)`);
    remain.push(it);
    continue;
  }
  if (due < now) {
    console.log(`★지남 ${it.campaign} ${it.at} 발송일이 이미 지났다. 사람이 확인할 것`);
    remain.push(it);
    continue;
  }
  const res = await fetch(`https://api.resend.com/broadcasts/${it.id}/send`, {
    method: 'POST', headers, body: JSON.stringify({ scheduled_at: it.at }),
  });
  const j = await res.json();
  if (res.ok) {
    console.log(`예약 완료 ${it.campaign} ${it.at}`);
  } else {
    console.log(`★예약 실패 ${it.campaign} ${res.status} ${JSON.stringify(j)}`);
    remain.push(it);
  }
}

writeFileSync(LIST, `${JSON.stringify(remain, null, 1)}\n`, 'utf8');
console.log(`대기 잔여 ${remain.length}건`);
