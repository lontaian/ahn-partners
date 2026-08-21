/**
 * 코호트 짝 검사. subscribers 와 gmail 이 같은 호에 다 있는지 본다.
 *
 * 배경(2026-08-21): 18호와 19호가 subscribers 만 예약되고 gmail 코호트가 통째로 빠졌다.
 * 17호까지는 둘 다 있었는데 18호부터 한쪽만 만들었다. 예약 건수만 세면 정상으로 보여서
 * 넉 달 뒤에나 알아챘을 문제다. 호 단위로 짝을 맞춰 세야 잡힌다.
 *
 * Resend 의 브로드캐스트 이름은 "no018-subscribers" 형식이다. 이름에서 호를 뽑아 짝을 본다.
 * 대기 목록(config/pending-broadcasts.json)의 초안도 같이 센다. 초안도 결국 나갈 것이므로.
 *
 * 실행: node --env-file=.env scripts/check-cohort-parity.mjs
 */
import { readFileSync, existsSync } from 'node:fs';

const COHORTS = ['subscribers', 'gmail'];
const r = await fetch('https://api.resend.com/broadcasts', {
  headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
});
if (!r.ok) throw new Error(`브로드캐스트 조회 실패 ${r.status}`);
const { data = [] } = await r.json();

const seen = new Map(); // no -> Set(cohort)
const sent = new Set(); // 이미 나간 호. 되돌릴 수 없으니 경고 대상이 아니다.
const note = (name) => {
  const m = String(name || '').match(/^(no\d{3})-(\w+)$/);
  if (!m) return m;
  if (!seen.has(m[1])) seen.set(m[1], new Set());
  seen.get(m[1]).add(m[2]);
  return m;
};
data.forEach((b) => {
  const m = note(b.name);
  // 초기 1, 2호는 subscribers 코호트만 있던 시절 것이다. 지금 gmail 로 보내면
  // 그 구독자에게는 몇 달 지난 글이 새 글처럼 도착한다. 나간 호는 손대지 않는다.
  if (m && b.status === 'sent') sent.add(m[1]);
});

// 대기 목록은 campaign 필드에 코호트가 붙은 것도, 안 붙은 것도 있다.
// 안 붙은 옛 항목은 subscribers 로 본다. 그때는 코호트를 하나만 썼기 때문이다.
const LIST = 'config/pending-broadcasts.json';
if (existsSync(LIST)) {
  for (const it of JSON.parse(readFileSync(LIST, 'utf8'))) {
    const c = String(it.campaign || '');
    note(/-\w+$/.test(c) ? c : `${c}-subscribers`);
  }
}

const gaps = [];
for (const [no, set] of [...seen].sort()) {
  if (sent.has(no)) continue; // 이미 나간 호
  const missing = COHORTS.filter((c) => !set.has(c));
  if (missing.length) gaps.push(`${no}: ${missing.join(', ')} 없음`);
}

console.log(`호 ${seen.size}개 검사`);
if (gaps.length) {
  console.log(`★코호트 결손 ${gaps.length}건`);
  gaps.forEach((g) => console.log(`  ${g}`));
  process.exitCode = 1;
} else {
  console.log('전 호 코호트 짝 정상');
}
