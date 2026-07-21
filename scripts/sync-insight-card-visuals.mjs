// 인사이트 허브의 모든 글 카드에 slug별 화면용 비주얼을 동기화한다.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { INSIGHT_VISUALS_BY_SLUG, INSIGHT_VISUAL_VERSION } from './insight-visuals-data.mjs';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const hubPath = path.join(root, 'insights.html');
const before = fs.readFileSync(hubPath, 'utf8');
let count = 0;

const after = before.replace(/<article([^>]*\bclass="insight-card"[^>]*)>([\s\S]*?)<\/article>/g, (article, attributes, body) => {
  const slugMatch = body.match(/href="insights\/([a-z0-9-]+)\.html"/);
  if (!slugMatch) return article;
  const slug = slugMatch[1];
  const visual = INSIGHT_VISUALS_BY_SLUG.get(slug);
  if (!visual) throw new Error(`${slug}: 화면용 비주얼 브리프가 없습니다.`);
  const cleaned = body.replace(/\s*<figure class="insight-card-visual">[\s\S]*?<\/figure>\s*/, '').trimStart();
  const alt = visual.thesis.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  const figure = `\n          <figure class="insight-card-visual"><img src="images/insights/${slug}.jpg?v=${INSIGHT_VISUAL_VERSION}" width="720" height="450" loading="lazy" decoding="async" alt="${alt}"></figure>\n          `;
  count += 1;
  return `<article${attributes}>${figure}${cleaned}</article>`;
});

if (count !== INSIGHT_VISUALS_BY_SLUG.size) throw new Error(`카드 ${count}개를 찾았지만 비주얼 브리프는 ${INSIGHT_VISUALS_BY_SLUG.size}개입니다.`);
if (after !== before) fs.writeFileSync(hubPath, after, 'utf8');
console.log(`동기화 완료: 인사이트 카드 ${count}개, 이미지 버전 ${INSIGHT_VISUAL_VERSION}`);
