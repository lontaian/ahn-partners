#!/usr/bin/env node
// 뉴스레터 원고 발송 전 자동 검사.
// 사용법: node scripts/brief-check.mjs briefs/2026-08-04-newsletter.html [--no-net]
//
// 이미지 차단 환경에서 브랜딩이 사라지는 문제(2026-07-30 사용자 지적)를 매번 눈으로 확인하지 않으려고 만들었다.
// 검사 항목: 이미지 폴백, 링크 응답, 측정 라벨, 수신거부 토큰, 표기 규칙, 필수 메타.
import { readFileSync } from 'node:fs';

const file = process.argv[2];
const NO_NET = process.argv.includes('--no-net');
if (!file) { console.error('사용법: node scripts/brief-check.mjs <원고.html> [--no-net]'); process.exit(1); }
const html = readFileSync(file, 'utf8');

const fail = [], warn = [], ok = [];

// 1. 이미지 폴백: 차단돼도 레이아웃과 브랜드가 남아야 한다
const imgs = html.match(/<img\b[^>]*>/g) || [];
for (const tag of imgs) {
  const src = (tag.match(/src="([^"]*)"/) || [])[1] || '(src 없음)';
  const short = src.split('/').pop();
  const hasW = /\bwidth="/.test(tag), hasH = /\bheight="/.test(tag);
  const alt = (tag.match(/alt="([^"]*)"/) || [])[1];
  const styled = /color\s*:/.test(tag);
  if (!hasW || !hasH) fail.push(`${short}: width/height 속성 누락. 차단 시 레이아웃이 무너진다`);
  if (alt === undefined) fail.push(`${short}: alt 속성 자체가 없다`);
  if (!styled) fail.push(`${short}: style에 color가 없다. 차단 시 alt 텍스트가 어두운 기본색으로 렌더돼 검은 헤더에서 안 보인다`);
  if (alt && alt.length > 0) {
    const h = Number((tag.match(/height="(\d+)"/) || [])[1] || 0);
    const w = Number((tag.match(/width="(\d+)"/) || [])[1] || 0);
    // 아이콘류(폭도 좁은 것)만 경고한다. 워드마크처럼 폭이 넓으면 12자 정도는 들어간다.
    if (h && h <= 40 && w && w < 60 && alt.length > 4) warn.push(`${short}: ${w}x${h}px 아이콘에 alt가 ${alt.length}자다. 작은 이미지에 긴 alt는 박스를 깨뜨린다`);
    if (!/line-height/.test(tag)) warn.push(`${short}: line-height가 없다. 이미지 높이와 같게 주면 alt 텍스트가 수직 중앙에 온다`);
  }
}
if (!imgs.length) ok.push('이미지 0개. 헤더가 라이브 텍스트라 이미지 차단과 무관하게 브랜딩이 표시된다');
else if (!fail.some((f) => /wordmark/.test(f))) ok.push(`이미지 ${imgs.length}개 폴백 속성 확인`);

// 2. 이미지가 전부 차단된 최악의 경우에도 브랜드가 보이는지(라이브 텍스트)
const liveText = html.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ');
if (!/Ahn\s*Partners/i.test(liveText)) fail.push('라이브 텍스트에 브랜드명이 없다. 이미지가 전부 차단되면 발신 브랜드를 알 수 없다');
else ok.push('라이브 텍스트에 브랜드명 존재');

// 3. 수신거부 토큰(누락 시 스팸 신고와 규정 위반)
if (!html.includes('{{{RESEND_UNSUBSCRIBE_URL}}}')) fail.push('{{{RESEND_UNSUBSCRIBE_URL}}} 토큰이 없다');
else ok.push('수신거부 토큰 존재');

// 4. 측정 라벨(링크별 클릭 분석용). read-full은 주지표다
const ucs = [...html.matchAll(/data-uc="([^"]+)"/g)].map((m) => m[1]);
if (!ucs.includes('read-full')) warn.push('data-uc="read-full"이 없다. 본문 전문 읽기 CTR이 주지표인데 측정되지 않는다');
else ok.push(`측정 라벨 ${ucs.length}개(${ucs.join(', ')})`);

// 5. 표기 규칙(프로젝트 전역): 키보드로 못 치는 특수기호 금지
const banned = [['엠대시', /—/], ['엔대시', /–/], ['가운뎃점', /·/], ['말줄임표', /…/], ['화살표', /[←-⇿⬅-⬇]/], ['이모지', /[\u{1f300}-\u{1faff}\u{2600}-\u{27bf}]/u]];
for (const [name, re] of banned) if (re.test(liveText)) fail.push(`표기 규칙 위반: ${name}이 본문에 있다`);
const curly = (liveText.match(/[“”‘’]/g) || []).length;
if (curly) warn.push(`둥근 따옴표 ${curly}개. 키보드 입력 가능한 " 와 ' 로 바꾸는 편이 규칙에 맞다`);
if (!fail.some((f) => /표기 규칙/.test(f))) ok.push('금지 특수기호 없음');

// 5-1. 테이블 태그 균형(2026-07-30 추가). 정규식 치환으로 헤더를 갈아끼울 때 닫는 태그를 잘못 잡아
// 고아 td가 남고 레이아웃이 통째로 무너진 사고가 있었다. 열닫 개수가 다르면 무조건 실패다.
for (const t of ['table', 'tr', 'td']) {
  const open = (html.match(new RegExp(`<${t}\\b`, 'g')) || []).length;
  const close = (html.match(new RegExp(`</${t}>`, 'g')) || []).length;
  if (open !== close) fail.push(`<${t}> 태그 불균형: 열림 ${open}개, 닫힘 ${close}개. 마크업이 깨져 레이아웃이 무너진다`);
}
if (!fail.some((f) => /태그 불균형/.test(f))) ok.push('table, tr, td 태그 균형 정상');

// 6. 필수 메타
if (!/<title>[^<]+/.test(html)) fail.push('title이 없다');
if (!/mso-hide:all/.test(html)) warn.push('프리헤더(숨김 미리보기 문구)가 없어 보인다');

// 7. 링크와 이미지 응답 확인
const urls = [...new Set([...html.matchAll(/(?:src|href)="(https:\/\/ahn-partners\.net[^"]*)"/g)].map((m) => m[1]))];
if (NO_NET) warn.push(`--no-net 이므로 링크 ${urls.length}건 응답 확인을 건너뛰었다`);
else {
  for (const u of urls) {
    try {
      const r = await fetch(u, { method: 'GET', redirect: 'follow', signal: AbortSignal.timeout(15000) });
      if (!r.ok) fail.push(`링크 응답 ${r.status}: ${u}`);
    } catch (e) { fail.push(`링크 요청 실패: ${u} (${e.message.slice(0, 40)})`); }
  }
  if (!fail.some((f) => /링크/.test(f))) ok.push(`링크와 이미지 ${urls.length}건 모두 정상 응답`);
}

console.log(`\n=== ${file} ===`);
for (const o of ok) console.log(`  통과  ${o}`);
for (const w of warn) console.log(`  주의  ${w}`);
for (const f of fail) console.log(`  실패  ${f}`);
console.log(`\n통과 ${ok.length} / 주의 ${warn.length} / 실패 ${fail.length}`);
if (fail.length) { console.log('실패 항목을 고치기 전에는 발송하지 않는다.'); process.exit(1); }
console.log('발송 가능.');
