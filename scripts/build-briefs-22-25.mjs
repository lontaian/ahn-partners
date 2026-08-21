/**
 * 22호부터 25호를 13호 템플릿에서 만든다. (2026-08-20, 12-31 목표 루프)
 *
 * 캘린더 규칙: 남은 예약이 2건 이하가 되면 다음 4개를 채운다.
 * 지금 마지막 예약이 09-10 이라 그 뒤가 비어 있어 채운다.
 *
 * 소재는 같은 기간 스레드와 링크드인에 나가는 것과 겹치지 않게 골랐다.
 * 필러 분산: 18호 조직 운영, 19호 생산성, 20호 예산, 21호 사업.
 * 전문 읽기 링크는 실제로 존재하는 insights 슬러그만 쓴다. 없는 슬러그를 넣으면 죽은 링크가 된다.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const TPL = readFileSync('briefs/2026-08-27-newsletter.html', 'utf8');

import { ISSUES } from './briefs-22-25-data.mjs';

const BAD = /[—–―─-╿·…→←↑↓⇒]|[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u;

for (const it of ISSUES) {
  let h = TPL;

  h = h.replace(/<title>[^<]*<\/title>/, `<title>Ahn's Newsletter No.${it.no} | ${it.subject}</title>`);
  h = h.replace(/NO\. 13/g, `NO. ${it.no}`);
  h = h.replace(/2026\. 8\. 27 목요일/g, it.dateKo);

  h = h.replace(/백업이 성공했다는 알림은 복구가 된다는 증명이 아닙니다\. 해 본 적이 있어야 압니다\./g, it.preview);

  h = h.replace(/백업 성공 알림은<br\s*\/?>복구 증명이 아닙니다/, it.h1);
  h = h.replace(/백업 성공 알림은[\s\S]{0,20}?복구 증명이 아닙니다/, it.h1.replace(/<br\s*\/?>/, ' '));

  // 본문 3문단만 갈아끼운다. 앞뒤 테이블 마크업은 건드리지 않는다.
  // 처음엔 CHECK 앞까지 통째로 지웠다가 <table> 여는 태그가 같이 날아가 마크업이 깨졌다.
  // 그래서 첫 문단의 <p 부터 마지막 문단의 </p> 까지, 문단 경계 안에서만 자른다.
  const anchor = h.indexOf('매일 아침 백업 성공 알림이 옵니다');
  const s0 = h.lastIndexOf('<p ', anchor);
  const lastAnchor = h.lastIndexOf('성공 기준은');
  const lastP = h.indexOf('</p>', lastAnchor);
  if (s0 >= 0 && lastP > s0) {
    const st = "font-family:'Apple SD Gothic Neo','Malgun Gothic',Arial,sans-serif;font-size:15.5px;line-height:1.9;color:#333333;word-break:keep-all;";
    const html = it.body
      .map((para, i) => `<p style="margin:${i === 0 ? '0' : '16px 0 0'};${st}">${para}</p>`)
      .join('');
    h = h.slice(0, s0) + html + h.slice(lastP + 4);
  }

  const oldChecks = [
    '복구 완료가 실제 업무 기능과 숫자로 정의돼 있습니까?',
    '주 담당자 없이 대체 담당자가 권한을 얻을 수 있습니까?',
    '최근 분기에 실제 백업으로 목표 시간 안에 복구해 봤습니까?',
  ];
  oldChecks.forEach((o, i) => { h = h.replace(o, it.checks[i]); });

  h = h.replace(/운영 복원력/g, it.filler);
  h = h.replace(/insights\/restore-drill\.html/g, `insights/${it.slug}.html`);

  h = h.replace(/insights\/dashboard-decision-gap\.html/g, `insights/${it.notes[0].slug}.html`);
  h = h.replace(/insights\/forecast-action-rule\.html/g, `insights/${it.notes[1].slug}.html`);
  h = h.replace('알람을 늘릴수록 중요한 장애에 늦게 반응합니다', it.notes[0].text);
  h = h.replace('한 사람만 아는 업무는 전문성이 아니라 중단 위험입니다', it.notes[1].text);

  const flags = [];
  if (BAD.test(h.replace(/<[^>]+>/g, ' '))) flags.push('표기위반');
  if (h.includes('백업')) flags.push('13호 잔재');
  if (!h.includes('{{{RESEND_UNSUBSCRIBE_URL}}}')) flags.push('수신거부 토큰 없음');
  if (!h.includes('같은 고민을 하는 한 분에게 전달')) flags.push('전달유도 없음');

  const out = `briefs/${it.date}-newsletter.html`;
  writeFileSync(out, h, 'utf8');
  console.log(`  no${String(it.no).padStart(3, '0')} ${it.date} ${h.length}자 ${flags.length ? flags.join(', ') : 'OK'}`);
}
