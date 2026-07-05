#!/usr/bin/env node
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

async function run(label, command, args, options = {}) {
  process.stdout.write(`\n== ${label} ==\n`);
  try {
    const { stdout, stderr } = await execFileAsync(command, args, {
      cwd: process.cwd(),
      timeout: options.timeout ?? 240000,
      maxBuffer: 1024 * 1024 * 20,
      env: process.env,
    });
    if (stdout.trim()) process.stdout.write(`${stdout.trim()}\n`);
    if (stderr.trim()) process.stderr.write(`${stderr.trim()}\n`);
    return { ok: true, stdout, stderr };
  } catch (error) {
    if (error.stdout) process.stdout.write(String(error.stdout));
    if (error.stderr) process.stderr.write(String(error.stderr));
    throw new Error(`${label} 실패: ${error.message}`);
  }
}

function extractJson(stdout) {
  const idx = stdout.indexOf('{');
  if (idx < 0) return null;
  return JSON.parse(stdout.slice(idx));
}

async function main() {
  console.log("Ahn's Newsletter 단발 운영 스크립트");
  console.log('흐름: 브라우저 확인 → 현재 상태 확인 → Spread 동기화 → 최종 상태 확인');

  await run('CDP 브라우저 확인/자동 시작', 'node', ['scripts/ensure-cdp-browser.mjs'], { timeout: 45000 });

  const before = await run('동기화 전 상태', 'node', ['scripts/newsletter-status.mjs'], { timeout: 120000 });
  const beforeJson = extractJson(before.stdout);

  await run('Spread 동기화', 'node', ['scripts/sync-newsletter-to-spread.mjs'], { timeout: 300000 });

  const after = await run('동기화 후 상태', 'node', ['scripts/newsletter-status.mjs'], { timeout: 120000 });
  const afterJson = extractJson(after.stdout);

  console.log('\n== 요약 ==');
  console.log(JSON.stringify({
    before: {
      eligibleSubscribers: beforeJson?.eligibleSubscribers,
      spreadPending: beforeJson?.spreadPending,
    },
    after: {
      eligibleSubscribers: afterJson?.eligibleSubscribers,
      spreadPending: afterJson?.spreadPending,
      spreadSynced: afterJson?.spreadSynced,
    },
    result: afterJson?.spreadPending === 0 ? '완료: Spread 대기 없음' : '확인 필요: Spread 대기 남음',
  }, null, 2));

  if (afterJson?.spreadPending !== 0) process.exitCode = 2;
}

main().catch((error) => {
  console.error(`\n실패: ${error.stack || error.message}`);
  console.error('\n조치: 브라우저에 열린 Spread/Relate에서 Google 로그인이 풀렸는지 확인한 뒤 다시 실행하세요.');
  process.exit(1);
});
