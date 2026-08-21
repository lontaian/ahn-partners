/**
 * 인사이트 한 편을 만들어 배포한다. 개별 글, 목록 카드, feed, llms.txt 를 함께 갱신한다.
 *
 * 기존 generate-content-batch-2026-07-20.mjs 는 배치 전용이라 한 편만 추가할 수 없다.
 * 이 스크립트는 그 템플릿을 재사용하되 한 편씩 붙인다.
 *
 * 화면에 날짜를 넣지 않는다(2026-08-21 사용자 지시). JSON-LD 와 sitemap 날짜는 유지한다.
 *
 * 사용: node scripts/publish-insight.mjs <입력.json>
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const inFile = process.argv[2];
if (!inFile) { console.log('사용: node scripts/publish-insight.mjs <입력.json>'); process.exit(1); }
const post = JSON.parse(readFileSync(inFile, 'utf8'));

const root = process.cwd();
const site = 'https://ahn-partners.net';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// 본문 안 [[slug|라벨]] 을 내부 링크로 바꾼다. 기존 글의 관례를 그대로 따른다.
const link = (s) => String(s).replace(/\[\[([a-z0-9-]+)\|([^\]]+)\]\]/g, (m, slug, label) => `<a href="${slug}.html">${esc(label)}</a>`);

const tldr = post.tldr.map((t) => `<li>${link(esc(t))}</li>`).join('');
const sections = post.sections.map((s) => `<h2>${esc(s.heading)}</h2>${s.paragraphs.map((p) => `<p>${link(esc(p))}</p>`).join('')}`).join('');
const checklist = post.checklist.map((c) => `<li>${esc(c)}</li>`).join('');
const sources = post.sources.map((s) => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)}</a></li>`).join('');
const related = (post.related || []).map((r) => `<article class="insight-card"><p class="card-kicker">관련 인사이트</p><h3><a href="${r.slug}.html">${esc(r.label)}</a></h3><p>${esc(r.desc)}</p><a class="card-link" href="${r.slug}.html">읽기</a></article>`).join('');

// 기존 글 하나를 골격으로 쓴다. head 와 nav, footer 를 그대로 유지하려는 것이다.
const tplPath = path.join(root, 'insights', 'approval-boundary.html');
if (!existsSync(tplPath)) { console.log('템플릿 글이 없다'); process.exit(1); }
let html = readFileSync(tplPath, 'utf8');

html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(post.title)} | Ahn Partners</title>`);
html = html.replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(post.deck)}$2`);
html = html.replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(post.title)}$2`);
html = html.replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(post.deck)}$2`);
html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${site}/insights/${post.slug}.html$2`);

// 히어로
html = html.replace(/(<nav class="breadcrumb"[^>]*>.*?<span>)[^<]*(<\/span><\/nav>)/s, `$1${esc(post.topic)}$2`);
html = html.replace(/(<p class="eyebrow">)[^<]*(<\/p>)/, `$1${esc(post.kicker)}$2`);
html = html.replace(/(<h1 class="post-title">)[^<]*(<\/h1>)/, `$1${esc(post.title)}$2`);
html = html.replace(/(<p class="post-dek">)[^<]*(<\/p>)/, `$1${esc(post.deck)}$2`);
html = html.replace(/(<div class="post-meta">).*?(<\/div>)/s, `$1<span>${post.minutes}분 읽기</span><span>Full Insight</span>$2`);

// 본문 교체. article.post-body 안을 통째로 갈아 끼운다.
const body = `<ul class="tldr">${tldr}</ul>${sections}<h2>점검 목록</h2><ul class="checklist">${checklist}</ul><h2>출처</h2><ul class="sources">${sources}</ul>`;
html = html.replace(/(<article class="post-body">)[\s\S]*?(<\/article>)/, `$1${body}$2`);
if (related) html = html.replace(/(<aside class="post-aside">)[\s\S]*?(<\/aside>)/, `$1${related}$2`);

// JSON-LD 는 날짜를 유지한다. 화면에서만 뺀다.
const today = new Date().toISOString().slice(0, 10);
html = html.replace(/("datePublished":\s*")[^"]*(")/, `$1${today}$2`);
html = html.replace(/("dateModified":\s*")[^"]*(")/, `$1${today}$2`);
html = html.replace(/("headline":\s*")[^"]*(")/, `$1${esc(post.title)}$2`);

writeFileSync(path.join(root, 'insights', `${post.slug}.html`), html, 'utf8');
console.log(`글 생성 insights/${post.slug}.html`);

// 목록 카드 삽입. 최신이 위로 오게 첫 카드 앞에 넣는다.
const listPath = path.join(root, 'insights.html');
let list = readFileSync(listPath, 'utf8');
if (list.includes(`insights/${post.slug}.html`)) {
  console.log('목록에 이미 있음. 건너뜀');
} else {
  // 목록 카드는 이미지 figure 와 data-topic 을 포함한다. 기존 40개 카드와 같은 형태여야
  // 필터와 레이아웃이 깨지지 않는다. 이미지는 gen-og-insights 로 나중에 채운다.
  const img = post.image || `${post.slug}.jpg`;
  const card = [
    `        <article class="insight-card" data-topic="${esc(post.topic)}">`,
    `          <figure class="insight-card-visual"><img src="images/insights/${img}" width="720" height="450" loading="lazy" decoding="async" alt="${esc(post.deck)}"></figure>`,
    `          <p class="card-kicker">${esc(post.topic)}</p>`,
    `          <h3><a href="insights/${post.slug}.html">${esc(post.title)}</a></h3>`,
    `          <p>${esc(post.deck)}</p>`,
    `          <div class="meta-row"><span>${post.minutes}분</span></div><a class="card-link" href="insights/${post.slug}.html">읽기</a>`,
    '        </article>',
    '',
  ].join('\n');
  const anchor = list.indexOf('<article class="insight-card" data-topic=');
  if (anchor < 0) { console.log('★목록에서 카드 자리를 못 찾음'); process.exit(1); }
  list = list.slice(0, anchor) + card + list.slice(anchor);
  writeFileSync(listPath, list, 'utf8');
  console.log('목록 카드 추가');
}

// posts.js 등록. 안 넣으면 check-insight-links 가 "posts.js에 없는 파일" 로 실패한다.
// 같은 주제의 기존 글 옆에 두어 이전과 다음 내비게이션이 주제로 이어지게 한다.
const manifestPath = path.join(root, 'insights', 'posts.js');
let manifest = readFileSync(manifestPath, 'utf8');
if (!manifest.includes(`slug: '${post.slug}'`)) {
  const safeTitle = post.title.replace(/'/g, "\\'");
  const line = `  { slug: '${post.slug}', topic: '${post.manifestTopic || post.topic}', title: '${safeTitle}' },`;
  const near = post.related && post.related[0] ? `  { slug: '${post.related[0].slug}',` : null;
  if (near && manifest.includes(near)) manifest = manifest.replace(near, `${line}\n${near}`);
  else manifest = manifest.replace(/\n\];\s*$/, `\n${line}\n];\n`);
  writeFileSync(manifestPath, manifest, 'utf8');
  console.log('posts.js 등록');
}

// 인바운드 링크. 관련 글 본문에 한 문장으로 넣는다.
// post-aside 나 related 섹션에 넣으면 고아 검사에 안 잡힌다. post-body 안이어야 한다.
if (post.related && post.related[0]) {
  const src = path.join(root, 'insights', `${post.related[0].slug}.html`);
  if (existsSync(src)) {
    const h = readFileSync(src, 'utf8');
    if (!h.includes(`${post.slug}.html`)) {
      const m = h.match(/(<article class="post-body">[\s\S]*?)(<\/article>)/);
      if (m) {
        const lead = esc(post.inboundLead || '이어지는 이야기는');
        const sentence = `<p>${lead} <a href="${post.slug}.html">${esc(post.title)}</a>에서 이어집니다.</p>`;
        writeFileSync(src, h.replace(m[0], m[1] + sentence + m[2]), 'utf8');
        console.log(`인바운드 링크 추가: ${post.related[0].slug}`);
      }
    }
  }
}

// 화면 날짜가 새로 들어가지 않았는지 확인한다
const check = readFileSync(path.join(root, 'insights', `${post.slug}.html`), 'utf8');
for (const m of check.matchAll(/<div class="(meta-row|post-meta)">([\s\S]*?)<\/div>/g)) {
  if (/20\d{2}[.\-]\s?\d{1,2}[.\-]\s?\d{1,2}/.test(m[2])) { console.log('★화면에 날짜가 들어갔다'); process.exitCode = 1; }
}
console.log('완료');
