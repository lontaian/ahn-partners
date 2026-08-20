/**
 * reorder-work-cards.mjs — ahn-partners index.html의 프로젝트 카드 재배열
 *
 * 앞서 정규식으로 카드 블록을 잘라 재배열했다가 닫는 </div>를 잘못 집어
 * 중첩이 깨졌고, 라이브에서 카드가 3열 그리드 대신 세로 한 줄로 쏟아졌다.
 * 그 사고 때문에 여기서는 태그를 파싱하지 않는다. `<!-- Card N: ... -->`
 * 주석만 구분자로 삼아 그리드 내부를 통째로 쪼갠다. 주석 사이 문자열은
 * 손대지 않으므로 태그 균형이 보존된다.
 *
 * 실행 후 반드시 div 균형과 카드 수를 검증한다.
 */

import { readFileSync, writeFileSync } from 'node:fs';

const PATH = new URL('../index.html', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const ORDER = ['sujunavi', 'fms', 'junggubus', 'pt-reports', 'junggu-shuttle', 'route-builder',
  'route-optimizer', 'hydrogen-infra', '1bus', 'onbus-platform', 'rural-mobility'];
const VISIBLE = 6;

const html = readFileSync(PATH, 'utf8');

const gridStart = html.indexOf('<div class="project-grid-3col" id="projectGrid">');
if (gridStart < 0) throw new Error('그리드 시작 못찾음');
const firstCard = html.indexOf('<!-- Card 1:', gridStart);
if (firstCard < 0) throw new Error('첫 카드 주석 못찾음');

// 그리드 끝: 마지막 카드 이후 그리드 컨테이너를 닫는 지점.
// showMoreBtn 앞의 빈 줄 + </div> 를 경계로 삼는다.
const showMore = html.indexOf('id="showMoreBtn"', gridStart);
const tailAnchor = html.lastIndexOf('</div>', html.lastIndexOf('<div style="text-align:center', showMore));
if (tailAnchor < 0) throw new Error('그리드 끝 못찾음');

const head = html.slice(0, firstCard);
const cardsRegion = html.slice(firstCard, tailAnchor);
const tail = html.slice(tailAnchor);

// 주석을 구분자로 쪼갠다. 각 조각은 "<!-- Card N: ... -->" 부터 다음 주석 직전까지.
const pieces = cardsRegion.split(/(?=<!-- Card \d+:)/);
const cards = pieces.filter((p) => /<!-- Card \d+:/.test(p));
const leftover = pieces.filter((p) => !/<!-- Card \d+:/.test(p)).join('');
if (leftover.trim()) throw new Error(`카드 밖 잔여 문자열 발견: ${leftover.trim().slice(0, 80)}`);

const slugOf = (c) => (c.match(/projects\/([a-z0-9-]+)\.html/) || [])[1] || '?';
console.log('현재:', cards.map(slugOf).join(', '), `(${cards.length}개)`);

const ordered = [...cards].sort((a, b) => {
  const ia = ORDER.indexOf(slugOf(a)), ib = ORDER.indexOf(slugOf(b));
  return (ia < 0 ? 999 : ia) - (ib < 0 ? 999 : ib);
});

// 카드 번호, 노출 규칙, 주석 번호를 순서에 맞게 다시 매긴다
const renumbered = ordered.map((card, i) => {
  const n = String(i + 1).padStart(2, '0');
  return card
    .replace(/<!-- Card \d+:/, `<!-- Card ${i + 1}:`)
    .replace(/(card-num">)\d+/, `$1${n}`)
    .replace(/<div class="work-card(?: hidden)?"/, i < VISIBLE ? '<div class="work-card"' : '<div class="work-card hidden"');
});

writeFileSync(PATH, head + renumbered.join('') + tail, 'utf8');

// 검증
const after = readFileSync(PATH, 'utf8');
const seg = after.slice(after.indexOf('id="projectGrid"'), after.indexOf('id="showMoreBtn"'));
const open = (seg.match(/<div\b/g) || []).length;
const close = (seg.match(/<\/div>/g) || []).length;
const order2 = [...seg.matchAll(/onclick="location\.href='projects\/([a-z0-9-]+)\.html'"/g)].map((m) => m[1]);
const hidden = [...seg.matchAll(/<div class="work-card( hidden)?"/g)].map((m) => !!m[1]);
console.log('변경:', order2.join(', '), `(${order2.length}개)`);
console.log(`div 균형: <div> ${open} / </div> ${close} ->`, open === close ? 'OK' : '깨짐');
console.log('노출:', order2.map((s, i) => s + (hidden[i] ? '(hidden)' : '')).join(' '));
console.log('card-num:', (seg.match(/card-num">(\d+)/g) || []).map((x) => x.split('>')[1]).join(' '));
if (open !== close || order2.length !== 11) {
  console.error('검증 실패. 되돌려라: git checkout 364ed04 -- index.html');
  process.exit(1);
}
