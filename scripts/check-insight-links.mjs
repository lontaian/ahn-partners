// insights 상호 참조 링크 그래프 검사기
// 사용: node scripts/check-insight-links.mjs
// 검사: (1) 깨진 링크(존재하지 않는 글로 가는 href), (2) 고아 글(본문+related 인바운드 0),
//       (3) posts.js와 파일 목록 불일치, (4) 인바운드 편중 상위 표.
// 규칙(docs 참조: brand-engine docs/insights-pipeline.md 5절): 새 글 게시 시 이 스크립트가 0 오류여야 한다.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'insights');
const files = fs.readdirSync(root).filter(f => f.endsWith('.html'));
const slugs = new Set(files.map(f => f.replace(/\.html$/, '')));

const postsJs = fs.readFileSync(path.join(root, 'posts.js'), 'utf-8');
const manifest = [...postsJs.matchAll(/slug:\s*'([a-z0-9-]+)'/g)].map(m => m[1]);

const outBody = {}, outRelated = {}, inbound = {};
for (const s of slugs) inbound[s] = 0;

for (const f of files) {
  const slug = f.replace(/\.html$/, '');
  const html = fs.readFileSync(path.join(root, f), 'utf-8');
  const body = html.match(/<article class="post-body">([\s\S]*?)<\/article>/);
  const rel = html.match(/class="container related"([\s\S]*?)<\/section>/);
  const links = seg => seg ? [...seg[1].matchAll(/href="([a-z0-9-]+)\.html"/g)].map(m => m[1]) : [];
  outBody[slug] = links(body);
  outRelated[slug] = [...new Set(links(rel))];
  for (const t of outBody[slug]) inbound[t] = (inbound[t] ?? 0) + 1;
  for (const t of outRelated[slug]) inbound[t] = (inbound[t] ?? 0) + 1;
}

let errors = 0;
const report = [];

// 1. 깨진 링크
for (const slug of Object.keys(outBody)) {
  for (const t of [...outBody[slug], ...outRelated[slug]]) {
    if (!slugs.has(t)) { report.push(`오류: ${slug} 이(가) 없는 글 ${t}.html 을 가리킴`); errors++; }
  }
}
// 2. 고아 글
for (const s of slugs) {
  if (inbound[s] === 0) { report.push(`오류: 고아 글(인바운드 0): ${s}`); errors++; }
}
// 3. posts.js 대조
for (const s of slugs) if (!manifest.includes(s)) { report.push(`오류: posts.js에 없는 파일: ${s}`); errors++; }
for (const s of manifest) if (!slugs.has(s)) { report.push(`오류: posts.js에만 있고 파일 없음: ${s}`); errors++; }

// 4. 인바운드 표
const table = [...slugs].map(s => ({ slug: s, in: inbound[s], out: outBody[s].length, rel: outRelated[s].length }))
  .sort((a, b) => b.in - a.in);
console.log('slug'.padEnd(36), '인바운드', '본문아웃', 'related');
for (const r of table) console.log(r.slug.padEnd(36), String(r.in).padStart(4), String(r.out).padStart(6), String(r.rel).padStart(6));
console.log();
for (const line of report) console.log(line);
const top = table[0];
if (top && top.in > table.reduce((a, r) => a + r.in, 0) * 0.3) {
  console.log(`경고: ${top.slug} 에 인바운드 ${top.in}건 편중(전체의 30% 초과). 다음 글 링크는 다른 글로 분산 권장.`);
}
console.log(errors === 0 ? '통과: 깨진 링크 0, 고아 0, posts.js 일치' : `실패: 오류 ${errors}건`);
process.exit(errors === 0 ? 0 : 1);
