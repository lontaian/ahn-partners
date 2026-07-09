// insights OG 이미지 일괄 생성 (1200x630)
// 사용: brand-engine 디렉터리에서 node C:/dev/client/personal/ahn-partners/scripts/gen-og-insights.mjs [slug ...]
// (playwright-core가 brand-engine node_modules에 있어서 거기서 실행)
// 데이터는 아래 POSTS에 유지한다. 새 글 추가 시 한 항목 추가 후 해당 slug만 재생성.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire('C:/Dev/client/personal/brand-engine/package.json');
const { chromium } = require('playwright-core');

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const TEMPLATE = 'file:///' + path.join(ROOT, 'images/og/insights/_og-template.html').replace(/\\/g, '/');
const OUT = path.join(ROOT, 'images/og/insights');

// c: 카테고리(모노 라벨), t: 제목(|가 줄바꿈), s: 부제, g: 우하단 태그
const POSTS = [
  { slug: 'silent-shelving', c: 'AI STRATEGY', t: 'AI 도입 프로젝트|열에 아홉은 성과 없이 끝납니다', s: '기술이 부족해서가 아닙니다. 끝을 정하지 않고 시작하기 때문입니다.' },
  { slug: 'ai-executive-misconception', c: 'AI STRATEGY', t: 'AI 전환에서 경영진이|가장 많이 하는 착각', s: '도구를 고르기 전에, 어떤 판단이 느리고 반복되는지부터 정리해야 합니다.' },
  { slug: 'ai-strategy-execution', c: 'AI STRATEGY', t: 'AI 전략이|실행되지 않는 이유', s: '전략이 실행 단위로 내려와야 책임자와 데이터와 숫자가 정해집니다.' },
  { slug: 'workflow-analysis-before-ai', c: 'WORKFLOW', t: 'AI 도입 전 먼저 봐야 할|업무 병목 지도', s: '시간이 새는 곳은 일하는 구간이 아니라 기다리는 구간입니다.' },
  { slug: 'exception-work-first', c: 'WORKFLOW', t: '반복 업무보다 예외 업무가|진짜 비용입니다', s: '자동화가 무너지는 곳은 반복이 아니라 예외 처리 구간입니다.' },
  { slug: 'dashboard-decision-gap', c: 'DATA', t: '대시보드는 늘어나는데|결정은 그대로인 이유', s: '지표에 주인과 임계값과 행동이 붙어야 화면이 결정으로 이어집니다.' },
  { slug: 'data-that-pays', c: 'DATA', t: '쌓이는 데이터와|돈이 되는 데이터는 다릅니다', s: '결정을 바꾸는 데이터만 자산이고, 그렇지 않은 데이터는 비용입니다.' },
  { slug: 'erp-in-house-lessons', c: 'OPERATIONS', t: '패키지 ERP를 버리고|직접 만들며 배운 것', s: '자체 개발의 진짜 산출물은 코드가 아니라 글로 쓰인 업무 규칙이었습니다.' },
  { slug: 'outsourced-system-neglect', c: 'OPERATIONS', t: '외주로 만든 시스템이|1년 뒤 방치되는 이유', s: '오픈 이후 수정을 맡을 담당자와 권한이 회사 안에 없기 때문입니다.' },
  { slug: 'ax-education-design', c: 'AX EDUCATION', t: 'AX 교육을 업무 전환으로|설계하는 법', s: '교육의 성과는 강의가 아니라 다음 주에 달라지는 업무에서 나옵니다.' },
  { slug: 'executive-vibe-coding', c: 'AX EDUCATION', t: '임원이 직접 만들어 본|뒤에야 보이는 것들', s: '강의가 판단을 바꾸지 않습니다. 직접 만들어 본 경험이 바꿉니다.' },
  { slug: 'hydrogen-new-business-execution', c: 'NEW BUSINESS', t: '100억 수소충전소에서 배운|신사업 실행의 순서', s: '기술 검토는 2할이었습니다. 죽는 조건부터 목록으로 써야 합니다.' },
  { slug: 'first-customer-first', c: 'NEW BUSINESS', t: '투자자보다|첫 고객이 먼저입니다', s: '첫 고객 이전의 매출 전망은 가설이고, 이후는 기록입니다.' },
  { slug: 'table-note-service-operations', c: 'TABLE NOTE', t: '좋은 식당은|운영이 보입니다', s: '좋은 서비스는 직원의 감각이 아니라 운영 설계에서 나옵니다.', g: 'TABLE NOTE' },
  { slug: 'promotion-trap', c: 'PEOPLE & ORG', t: '일 잘하는 사람을 승진시키면|두 번 잃습니다', s: '최고의 실무자를 잃고, 나쁜 관리자를 얻습니다.' },
  { slug: 'quiet-exit', c: 'PEOPLE & ORG', t: '에이스는 퇴사 통보 전에|먼저 조용해집니다', s: '사직서는 마지막 신호입니다. 붙잡을 시점은 몇 달 앞에 있습니다.' },
  { slug: 'safe-failure', c: 'AX EDUCATION', t: '잘 크는 주니어는|일찍 틀려본 주니어입니다', s: '성장은 강의장이 아니라 안전하게 틀릴 수 있는 일터에서 일어납니다.' },
];

const only = process.argv.slice(2);
const targets = only.length ? POSTS.filter(p => only.includes(p.slug)) : POSTS;
if (!targets.length) { console.error('대상 없음:', only.join(', ')); process.exit(1); }

const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const p of targets) {
  const q = new URLSearchParams({ c: p.c, t: p.t, s: p.s, ...(p.g ? { g: p.g } : {}) });
  await page.goto(`${TEMPLATE}?${q}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400); // 웹폰트 안정화
  const out = path.join(OUT, `${p.slug}.jpg`);
  await page.screenshot({ path: out, type: 'jpeg', quality: 90 });
  console.log('generated', out);
}
await browser.close();
