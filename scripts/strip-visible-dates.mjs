/**
 * insights 화면에 보이는 날짜를 제거한다.
 *
 * 배경(2026-08-21 사용자 지시): 글을 몰아서 올리면 목록에 같은 날짜가 줄줄이 보인다.
 * 보기 좋지 않으니 과거분까지 전부 빼고, 앞으로도 넣지 않는다.
 *
 * 지우는 것은 사람 눈에 보이는 것만이다.
 *   - 목록(insights.html)의 `<div class="meta-row">` 안 날짜 span
 *   - 개별 글의 `<div class="post-meta">` 안 날짜 span
 * 남기는 것:
 *   - JSON-LD 의 datePublished, dateModified (검색엔진이 신선도 판단에 쓴다)
 *   - sitemap.xml 의 lastmod, feed.xml 의 pubDate (크롤링과 구독에 필요하다)
 * 화면에서 빼는 것과 기계에게 숨기는 것은 다르다. 후자까지 지우면 SEO 손해다.
 *
 * 실행: node scripts/strip-visible-dates.mjs [--dry]
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';

const DRY = process.argv.includes('--dry');
// <span>2026.07.20</span> 또는 <span>2026-07-20</span> 형태만 지운다.
// 날짜가 다른 텍스트와 한 span 에 섞여 있으면 건드리지 않는다(오삭제 방지).
const DATE_SPAN = /<span>\s*20\d{2}[.\-]\s?\d{1,2}[.\-]\s?\d{1,2}\s*<\/span>/g;

/** meta-row 와 post-meta 블록 안에서만 날짜 span 을 지운다. */
function stripInBlocks(html) {
  let n = 0;
  const out = html.replace(/<div class="(meta-row|post-meta)">([\s\S]*?)<\/div>/g, (m, cls, inner) => {
    const cleaned = inner.replace(DATE_SPAN, () => { n += 1; return ''; });
    return `<div class="${cls}">${cleaned}</div>`;
  });
  return { out, n };
}

const targets = ['insights.html', ...readdirSync('insights').filter((f) => f.endsWith('.html')).map((f) => `insights/${f}`)];
let files = 0;
let total = 0;
for (const f of targets) {
  const before = readFileSync(f, 'utf8');
  const { out, n } = stripInBlocks(before);
  if (!n) continue;
  files += 1;
  total += n;
  if (!DRY) writeFileSync(f, out, 'utf8');
}
console.log(`${DRY ? '[DRY] ' : ''}날짜 제거: 파일 ${files}개, span ${total}개`);

// 남아 있는 화면 날짜가 없는지 확인한다. 결과를 눈으로 대조하는 대신 코드로 센다.
let leftover = 0;
for (const f of targets) {
  const html = readFileSync(f, 'utf8');
  for (const m of html.matchAll(/<div class="(meta-row|post-meta)">([\s\S]*?)<\/div>/g)) {
    if (/20\d{2}[.\-]\s?\d{1,2}[.\-]\s?\d{1,2}/.test(m[2])) leftover += 1;
  }
}
console.log(leftover ? `★남은 화면 날짜 ${leftover}건` : '화면 날짜 잔여 없음');
if (leftover && !DRY) process.exitCode = 1;
