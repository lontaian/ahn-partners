// 모든 인사이트의 OG/Twitter/JSON-LD 이미지 경로와 캐시 버전을 slug 기준으로 동기화한다.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { INSIGHT_VISUAL_VERSION } from './insight-visuals-data.mjs';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const articleDir = path.join(root, 'insights');
const files = fs.readdirSync(articleDir).filter((name) => name.endsWith('.html'));

for (const file of files) {
  const slug = path.basename(file, '.html');
  const target = `images/og/insights/${slug}.jpg?v=${INSIGHT_VISUAL_VERSION}`;
  const filePath = path.join(articleDir, file);
  const before = fs.readFileSync(filePath, 'utf8');
  const after = before.replace(/images\/og\/insights\/[a-z0-9-]+\.jpg(?:\?v=[^"']+)?/g, target);
  if (after === before && !before.includes(target)) throw new Error(`${file}: 동기화할 이미지 경로를 찾지 못했습니다.`);
  if (after !== before) fs.writeFileSync(filePath, after, 'utf8');
}

console.log(`동기화 완료: 인사이트 ${files.length}편, OG 버전 ${INSIGHT_VISUAL_VERSION}`);
