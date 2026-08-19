/**
 * 14호부터 17호를 13호 템플릿에서 만든다. (2026-08-19, 잔여일수 루프 사이클 3)
 *
 * 캘린더 규칙: 남은 예약이 2건 이하가 되면 다음 4개를 채운다.
 * 지금은 6건이지만 8월 27일이면 0이 되므로 미리 채운다. 발송 뒤가 아니라 남은 수로 판단한다.
 *
 * 필러 분산: 14호 AI 전환(경영), 15호 사업(첫 고객), 16호 데이터, 17호 교육.
 * 사이클 2의 스레드 소재 6편과 겹치지 않게 골랐다.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const TPL = readFileSync('briefs/2026-08-27-newsletter.html', 'utf8');

const ISSUES = [
  {
    no: 14, date: '2026-09-01', dateKo: '2026. 9. 1 화요일', slug: 'ai-executive-misconception',
    subject: 'AI를 도입해도 결정 속도가 그대로면 도구를 산 것이지 전환을 한 것이 아닙니다',
    h1: 'AI를 샀는데<br>결정 속도는 그대로입니다',
    preview: 'AI를 도입해도 결정이 빨라지지 않는다면 바뀐 것은 도구뿐입니다.',
    body: [
      'AI 도입 보고를 받으면 대개 도입률과 사용량이 먼저 나옵니다. 몇 명이 계정을 받았고 월간 호출이 얼마나 늘었는지가 표로 정리돼 있습니다. 그런데 그 표만으로는 무엇이 좋아졌는지 알 수 없습니다. 결정이 빨라졌는지, 재작업이 줄었는지, 고객 응답이 짧아졌는지는 적혀 있지 않습니다.',
      '경영진이 가장 많이 하는 착각은 도구를 넣으면 일하는 방식이 따라 바뀐다는 것입니다. 실제로는 반대입니다. 결재 단계와 책임 경계가 그대로면 답이 빨리 나와도 그 답이 움직이는 속도는 예전과 같습니다. 초안이 10분 만에 나오는데 승인에 나흘이 걸리면 전체 시간은 거의 줄지 않습니다.',
      '그래서 도입 성과는 사용량이 아니라 통과 시간으로 봐야 합니다. 요청이 들어와서 결과가 나갈 때까지 걸리는 시간, 그 사이에 사람 손을 거치는 횟수. 이 둘이 안 줄었다면 도구를 산 것이지 전환을 한 것이 아닙니다.',
    ],
    checks: [
      '요청부터 결과까지 걸리는 시간을 도입 전후로 재고 있습니까?',
      'AI가 만든 결과를 누가 어떤 권한으로 승인하는지 정해져 있습니까?',
      '도입 보고에 사용량 말고 통과 시간이 들어 있습니까?',
    ],
    filler: 'AI 전환',
    notes: [
      { slug: 'approval-boundary', text: 'AI 도입의 병목은 답변 속도가 아니라 권한입니다' },
      { slug: 'workflow-analysis-before-ai', text: 'AI 도입 전에 먼저 봐야 할 업무 병목 지도' },
    ],
  },
  {
    no: 15, date: '2026-09-03', dateKo: '2026. 9. 3 목요일', slug: 'first-customer-first',
    subject: '투자자를 먼저 설득하면 팔리지 않는 것을 잘 설명하는 회사가 됩니다',
    h1: '투자자보다<br>첫 고객이 먼저입니다',
    preview: '투자자를 먼저 설득하면 팔리지 않는 것을 잘 설명하는 회사가 됩니다.',
    body: [
      '신사업을 시작할 때 자료를 먼저 만듭니다. 시장 규모와 경쟁 구도와 수익 모델이 정리된 자료입니다. 그 자료로 투자자를 만나고 사내 심의를 통과합니다. 문제는 그 자료가 고객이 아니라 심사자를 향해 쓰였다는 점입니다.',
      '심사자를 설득하는 능력과 고객이 돈을 내게 하는 능력은 다릅니다. 심사자는 논리가 맞으면 통과시킵니다. 고객은 논리가 맞아도 지금 불편하지 않으면 사지 않습니다. 그래서 자료를 잘 만드는 팀이 매출은 못 내는 일이 생깁니다.',
      '순서를 바꾸면 자료의 성격이 달라집니다. 돈을 낼 사람 한 명을 먼저 찾고, 그 사람이 왜 냈는지를 자료에 씁니다. 한 명이 낸 이유는 시장 규모 추정보다 강한 근거입니다. 추정은 반박당하지만 실제로 받은 돈은 반박되지 않습니다.',
    ],
    checks: [
      '이 사업에 돈을 낼 사람을 한 명이라도 만나 봤습니까?',
      '자료의 논리가 고객이 아니라 심사자를 향해 있지는 않습니까?',
      '첫 고객이 산 이유를 그 사람의 말로 적어 두셨습니까?',
    ],
    filler: '신사업 실행',
    notes: [
      { slug: 'second-customer-test', text: '두 번째 고객이 같은 이유로 사는지가 진짜 시험입니다' },
      { slug: 'experiment-budget', text: '신사업 예산은 성공이 아니라 오답을 사는 돈입니다' },
    ],
  },
  {
    no: 16, date: '2026-09-08', dateKo: '2026. 9. 8 화요일', slug: 'data-that-pays',
    subject: '데이터를 모아도 결정에 안 쓰이면 그건 자산이 아니라 보관 비용입니다',
    h1: '쌓이는 데이터와<br>돈이 되는 데이터는 다릅니다',
    preview: '데이터를 모아도 결정에 쓰이지 않으면 자산이 아니라 보관 비용입니다.',
    body: [
      '데이터를 모으자는 결정은 쉽습니다. 나중에 쓸 데가 있을 것 같고, 지우는 것보다 두는 편이 안전해 보입니다. 그래서 로그와 이력과 원본이 계속 쌓입니다. 문제는 쌓는 비용은 매달 나가는데 쓰는 시점이 오지 않는다는 것입니다.',
      '돈이 되는 데이터에는 공통점이 하나 있습니다. 그 데이터를 보고 바뀌는 결정이 있다는 점입니다. 재고를 얼마나 둘지, 어느 고객에게 먼저 연락할지, 어느 설비를 언제 세울지. 결정이 붙어 있으면 데이터의 값이 계산됩니다. 결정이 없으면 아무리 많아도 값이 0입니다.',
      '그래서 새 데이터를 모으기 전에 묻습니다. 이걸 보고 무엇을 다르게 하겠습니까. 답이 안 나오면 모으지 않습니다. 이미 모으고 있는 것 중에도 이 질문에 답이 없는 것이 있으면 보관 주기를 줄입니다. 줄이는 것만으로 비용이 눈에 띄게 내려갑니다.',
    ],
    checks: [
      '지금 모으는 데이터마다 그것을 보고 바뀌는 결정이 있습니까?',
      '결정이 붙지 않은 데이터의 보관 비용을 계산해 보셨습니까?',
      '새 수집을 시작할 때 무엇을 다르게 할지 먼저 적습니까?',
    ],
    filler: '데이터',
    notes: [
      { slug: 'metric-owner', text: '대시보드에 숫자보다 먼저 적어야 할 것은 담당자입니다' },
      { slug: 'dashboard-decision-gap', text: '대시보드는 늘어나는데 결정은 그대로인 이유' },
    ],
  },
  {
    no: 17, date: '2026-09-10', dateKo: '2026. 9. 10 목요일', slug: 'ai-training-behavior-protocol',
    subject: 'AI 교육을 강의로 끝내면 다음 주에 아무도 쓰지 않습니다',
    h1: 'AI 교육은 버튼이 아니라<br>작업 순서를 바꿔야 남습니다',
    preview: 'AI 교육을 강의로 끝내면 다음 주에 아무도 쓰지 않습니다.',
    body: [
      'AI 교육을 하면 만족도는 대체로 높게 나옵니다. 신기하고 유용해 보이기 때문입니다. 그런데 두 주 뒤에 실제 사용량을 보면 교육 전으로 돌아가 있습니다. 배운 것이 없어서가 아니라 돌아갈 자리가 없어서입니다.',
      '강의는 도구 사용법을 가르칩니다. 어디를 누르고 무엇을 입력하는지입니다. 그런데 현업이 막히는 지점은 버튼이 아닙니다. 이 결과를 그대로 보고서에 써도 되는지, 틀리면 누가 책임지는지, 기존 절차의 어느 단계를 대체하는지입니다. 이 질문에 답이 없으면 안 쓰는 편이 안전합니다.',
      '그래서 교육을 작업 순서로 설계합니다. 특정 업무 하나를 골라 기존 절차를 적고, 그중 어느 단계를 AI가 대신하고 어느 단계는 사람이 확인하는지를 정합니다. 그 순서를 두 주간 실제 업무에 적용하게 합니다. 남는 것은 강의가 아니라 바뀐 순서입니다.',
    ],
    checks: [
      'AI 교육 뒤에 바뀐 작업 절차가 문서로 남아 있습니까?',
      '결과를 어디까지 그대로 쓸 수 있는지 기준이 정해져 있습니까?',
      '교육 성과를 만족도가 아니라 두 주 뒤 사용량으로 보고 있습니까?',
    ],
    filler: '교육과 조직',
    notes: [
      { slug: 'ax-education-design', text: 'AX 교육을 업무 전환으로 설계하는 법' },
      { slug: 'training-last-mile', text: '교육의 10퍼센트만 남는다던 그 숫자는 출처가 없었습니다' },
    ],
  },
];

const BAD = /[—–―─-╿·…→←↑↓⇒]|[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u;

for (const it of ISSUES) {
  let h = TPL;

  // 헤더 메타
  h = h.replace(/<title>[^<]*<\/title>/, `<title>Ahn's Newsletter No.${it.no} | ${it.subject}</title>`);
  h = h.replace(/NO\. 13/g, `NO. ${it.no}`);
  h = h.replace(/2026\. 8\. 27 목요일/g, it.dateKo);

  // 프리뷰(제목 아래 한 줄) 두 군데
  h = h.replace(/백업이 성공했다는 알림은 복구가 된다는 증명이 아닙니다\. 해 본 적이 있어야 압니다\./g, it.preview);

  // h1
  h = h.replace(/백업 성공 알림은<br\s*\/?>복구 증명이 아닙니다/, it.h1);
  h = h.replace(/백업 성공 알림은[\s\S]{0,20}?복구 증명이 아닙니다/, it.h1.replace(/<br\s*\/?>/, ' '));

  // 본문 3문단 치환
  // 본문 3문단만 갈아끼운다. 앞뒤 테이블 마크업은 건드리지 않는다.
  // 처음엔 CHECK 앞까지 통째로 지웠다가 <table> 여는 태그가 같이 날아가 마크업이 깨졌다.
  // 그래서 첫 문단의 <p 부터 마지막 문단의 </p> 까지, 문단 경계 안에서만 자른다.
  const anchor = h.indexOf('매일 아침 백업 성공 알림이 옵니다');
  const s0 = h.lastIndexOf('<p ', anchor);
  const lastAnchor = h.lastIndexOf('성공 기준은');
  const lastP = h.indexOf('</p>', lastAnchor);
  if (s0 >= 0 && lastP > s0) {
    const st = "font-family:'Apple SD Gothic Neo','Malgun Gothic',Arial,sans-serif;font-size:15.5px;line-height:1.9;color:#333333;word-break:keep-all;";
    const html = it.body
      .map((para, i) => `<p style="margin:${i === 0 ? '0' : '16px 0 0'};${st}">${para}</p>`)
      .join('');
    h = h.slice(0, s0) + html + h.slice(lastP + 4);
  }
  // CHECK 3항목
  const oldChecks = [
    '복구 완료가 실제 업무 기능과 숫자로 정의돼 있습니까?',
    '주 담당자 없이 대체 담당자가 권한을 얻을 수 있습니까?',
    '최근 분기에 실제 백업으로 목표 시간 안에 복구해 봤습니까?',
  ];
  oldChecks.forEach((o, i) => { h = h.replace(o, it.checks[i]); });

  // 필러 라벨과 전문 읽기 링크
  h = h.replace(/운영 복원력/g, it.filler);
  h = h.replace(/insights\/restore-drill\.html/g, `insights/${it.slug}.html`);

  // SHORT NOTES
  h = h.replace(/insights\/dashboard-decision-gap\.html/g, `insights/${it.notes[0].slug}.html`);
  h = h.replace(/insights\/forecast-action-rule\.html/g, `insights/${it.notes[1].slug}.html`);
  h = h.replace('알람을 늘릴수록 중요한 장애에 늦게 반응합니다', it.notes[0].text);
  h = h.replace('한 사람만 아는 업무는 전문성이 아니라 중단 위험입니다', it.notes[1].text);

  const flags = [];
  if (BAD.test(h.replace(/<[^>]+>/g, ' '))) flags.push('표기위반');
  if (h.includes('백업')) flags.push('13호 잔재');
  if (!h.includes('{{{RESEND_UNSUBSCRIBE_URL}}}')) flags.push('수신거부 토큰 없음');
  if (!h.includes('같은 고민을 하는 한 분에게 전달')) flags.push('전달유도 없음');

  const out = `briefs/${it.date}-newsletter.html`;
  writeFileSync(out, h, 'utf8');
  console.log(`  no${String(it.no).padStart(3, '0')} ${it.date} ${h.length}자 ${flags.length ? flags.join(', ') : 'OK'}`);
}
