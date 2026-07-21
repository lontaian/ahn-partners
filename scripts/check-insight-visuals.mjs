import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { INSIGHT_VISUALS, INSIGHT_VISUAL_VERSION } from './insight-visuals-data.mjs';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const articleDir = path.join(root, 'insights');
const imageDir = path.join(root, 'images', 'og', 'insights');
const cardImageDir = path.join(root, 'images', 'insights');
const articleFiles = fs.readdirSync(articleDir).filter((name) => name.endsWith('.html'));
const errors = [];
const references = new Map();
const briefs = new Map(INSIGHT_VISUALS.map((item) => [item.slug, item]));
const allowedLayouts = new Set(['flow', 'compare', 'loop', 'stack', 'timeline', 'ratio', 'matrix', 'signal', 'branch']);
const allowedCompositions = new Set(['split', 'reverse', 'vertical']);

if (briefs.size !== INSIGHT_VISUALS.length) errors.push('비주얼 브리프 slug가 중복되었습니다.');

function jpegSize(filePath) {
  const bytes = fs.readFileSync(filePath);
  if (bytes[0] !== 0xff || bytes[1] !== 0xd8) return null;
  let offset = 2;
  while (offset + 8 < bytes.length) {
    if (bytes[offset] !== 0xff) { offset += 1; continue; }
    const marker = bytes[offset + 1];
    if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) {
      return { height: bytes.readUInt16BE(offset + 5), width: bytes.readUInt16BE(offset + 7) };
    }
    if (marker === 0xd8 || marker === 0xd9) { offset += 2; continue; }
    const length = bytes.readUInt16BE(offset + 2);
    if (length < 2) return null;
    offset += length + 2;
  }
  return null;
}

for (const file of articleFiles) {
  const slug = path.basename(file, '.html');
  const html = fs.readFileSync(path.join(articleDir, file), 'utf8');
  const match = html.match(/<meta property="og:image" content="https:\/\/ahn-partners\.net\/images\/og\/insights\/([^?"']+)\?v=([^"']+)/);
  const expected = `${slug}.jpg`;
  if (!match) errors.push(`${file}: og:image가 없습니다.`);
  else {
    const image = match[1];
    if (image !== expected) errors.push(`${file}: og:image는 ${expected}여야 하지만 ${image}입니다.`);
    if (match[2] !== INSIGHT_VISUAL_VERSION) errors.push(`${file}: OG 버전은 ${INSIGHT_VISUAL_VERSION}이어야 하지만 ${match[2]}입니다.`);
    if (!references.has(image)) references.set(image, []);
    references.get(image).push(file);
  }
  if (!briefs.has(slug)) errors.push(`${file}: 정보형 비주얼 브리프가 없습니다.`);
  const ogPath = path.join(imageDir, expected);
  if (!fs.existsSync(ogPath)) errors.push(`${file}: ${expected} 파일이 없습니다.`);
  else {
    const size = jpegSize(ogPath);
    if (!size || size.width !== 1200 || size.height !== 630) errors.push(`${file}: OG 이미지는 1200x630이어야 합니다.`);
  }
}

for (const [image, files] of references) {
  if (files.length > 1) errors.push(`${image}: 여러 글이 같은 이미지를 사용합니다 (${files.join(', ')}).`);
}

const hub = fs.readFileSync(path.join(root, 'insights.html'), 'utf8');
const cardReferences = new Map();
const cardArticles = [...hub.matchAll(/<article[^>]*\bclass="insight-card"[^>]*>([\s\S]*?)<\/article>/g)];
for (const [, body] of cardArticles) {
  const slugMatch = body.match(/href="insights\/([a-z0-9-]+)\.html"/);
  if (!slugMatch) continue;
  const slug = slugMatch[1];
  const imageMatch = body.match(/<img src="images\/insights\/([a-z0-9-]+\.jpg)\?v=([^"]+)"[^>]*alt="([^"]+)"/);
  if (!imageMatch) { errors.push(`${slug}: 인사이트 카드 이미지가 없습니다.`); continue; }
  const expected = `${slug}.jpg`;
  if (imageMatch[1] !== expected) errors.push(`${slug}: 카드 이미지는 ${expected}여야 하지만 ${imageMatch[1]}입니다.`);
  if (imageMatch[2] !== INSIGHT_VISUAL_VERSION) errors.push(`${slug}: 카드 이미지 버전은 ${INSIGHT_VISUAL_VERSION}이어야 합니다.`);
  if (!imageMatch[3].trim()) errors.push(`${slug}: 카드 이미지 대체 텍스트가 비어 있습니다.`);
  if (!cardReferences.has(imageMatch[1])) cardReferences.set(imageMatch[1], []);
  cardReferences.get(imageMatch[1]).push(slug);
  const cardPath = path.join(cardImageDir, expected);
  if (!fs.existsSync(cardPath)) errors.push(`${slug}: 화면용 이미지 ${expected}가 없습니다.`);
  else {
    const size = jpegSize(cardPath);
    if (!size || size.width !== 720 || size.height !== 450) errors.push(`${slug}: 화면용 이미지는 720x450이어야 합니다.`);
  }
}
if (cardReferences.size !== INSIGHT_VISUALS.length) errors.push(`화면용 카드 이미지는 ${INSIGHT_VISUALS.length}개여야 하지만 ${cardReferences.size}개입니다.`);
for (const [image, slugs] of cardReferences) {
  if (slugs.length > 1) errors.push(`${image}: 여러 카드가 같은 화면용 이미지를 사용합니다 (${slugs.join(', ')}).`);
}

for (const visual of INSIGHT_VISUALS) {
  if (!articleFiles.includes(`${visual.slug}.html`)) errors.push(`${visual.slug}: 대응하는 인사이트 글이 없습니다.`);
  if (!allowedLayouts.has(visual.layout)) errors.push(`${visual.slug}: 허용되지 않은 layout ${visual.layout}`);
  if (!allowedCompositions.has(visual.composition)) errors.push(`${visual.slug}: 허용되지 않은 composition ${visual.composition}`);
  if (!visual.title || !visual.thesis || !Array.isArray(visual.items) || visual.items.length < 2) errors.push(`${visual.slug}: title, thesis, items 2개 이상이 필요합니다.`);
  for (const item of visual.items || []) {
    if (item.value && !item.label) errors.push(`${visual.slug}: 수치는 의미를 설명하는 label과 함께 써야 합니다.`);
  }
}

const layouts = new Set(INSIGHT_VISUALS.map((item) => item.layout));
const compositions = new Set(INSIGHT_VISUALS.map((item) => item.composition));
if (layouts.size < 5) errors.push(`시각 문법이 ${layouts.size}종뿐입니다. 최소 5종이 필요합니다.`);
if (compositions.size < 3) errors.push(`화면 구도가 ${compositions.size}종뿐입니다. split, reverse, vertical이 모두 필요합니다.`);

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join('\n'));
  process.exit(1);
}

console.log(`통과: 인사이트 ${articleFiles.length}편, 고유 OG ${references.size}개, 화면용 카드 ${cardReferences.size}개, 시각 문법 ${layouts.size}종, 화면 구도 ${compositions.size}종`);
