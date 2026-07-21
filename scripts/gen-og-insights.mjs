// 인사이트 정보형 OG 이미지 일괄 생성 (1200x630)
// 사용: node scripts/gen-og-insights.mjs [slug ...]
// 새 글은 insight-visuals-data.mjs에 비주얼 브리프를 추가한 뒤 생성한다.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { INSIGHT_VISUALS } from './insight-visuals-data.mjs';

const require = createRequire('C:/Dev/client/personal/brand-engine/package.json');
const { chromium } = require('playwright-core');

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const TEMPLATE = `file:///${path.join(ROOT, 'images/og/insights/_og-template.html').replace(/\\/g, '/')}`;
const OUT = path.join(ROOT, 'images/og/insights');
const only = process.argv.slice(2);
const targets = only.length ? INSIGHT_VISUALS.filter((item) => only.includes(item.slug)) : INSIGHT_VISUALS;

if (!targets.length) {
  console.error('대상 없음:', only.join(', '));
  process.exit(1);
}

const missing = only.filter((slug) => !INSIGHT_VISUALS.some((item) => item.slug === slug));
if (missing.length) {
  console.error('비주얼 브리프 없음:', missing.join(', '));
  process.exit(1);
}

const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });

for (const visual of targets) {
  const query = new URLSearchParams({ data: JSON.stringify(visual) });
  await page.goto(`${TEMPLATE}?${query}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);
  const out = path.join(OUT, `${visual.slug}.jpg`);
  await page.screenshot({ path: out, type: 'jpeg', quality: 92 });
  console.log('generated', out);
}

await browser.close();
