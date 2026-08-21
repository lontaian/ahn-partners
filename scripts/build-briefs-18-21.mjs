/**
 * 18호부터 21호를 13호 템플릿에서 만든다. (2026-08-20, 12-31 목표 루프)
 *
 * 캘린더 규칙: 남은 예약이 2건 이하가 되면 다음 4개를 채운다.
 * 지금 마지막 예약이 09-10 이라 그 뒤가 비어 있어 채운다.
 *
 * 소재는 같은 기간 스레드와 링크드인에 나가는 것과 겹치지 않게 골랐다.
 * 필러 분산: 18호 조직 운영, 19호 생산성, 20호 예산, 21호 사업.
 * 전문 읽기 링크는 실제로 존재하는 insights 슬러그만 쓴다. 없는 슬러그를 넣으면 죽은 링크가 된다.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const TPL = readFileSync('briefs/2026-08-27-newsletter.html', 'utf8');

const ISSUES = [
  {
    no: 18, date: '2026-09-15', dateKo: '2026. 9. 15 화요일', slug: 'decision-log',
    subject: '회의록은 읽히지 않고 결정 로그는 읽힙니다',
    h1: '회의록은 안 읽히고<br>결정 로그는 읽힙니다',
    preview: '회의록은 무슨 말이 오갔는지를 적고 결정 로그는 무엇이 정해졌는지를 적습니다.',
    body: [
      '회의가 끝나면 회의록이 돌아옵니다. 발언 순서대로 정리된 몇 장짜리 문서입니다. 성실하게 쓰였는데 아무도 다시 열지 않습니다. 필요한 것이 어디 있는지 찾기 어렵고, 찾아도 결론이 아니라 논의만 적혀 있기 때문입니다.',
      '결정 로그는 다릅니다. 무엇을 정했는지, 누가 하기로 했는지, 언제까지인지. 세 줄이면 끝납니다. 그리고 이 세 줄은 나중에 실제로 검색됩니다. 반년 뒤에 왜 그렇게 정했는지 물을 때 열리는 것은 회의록이 아니라 이 세 줄입니다.',
      '두 가지를 다 만들 필요는 없습니다. 회의록을 줄이고 결정 로그를 남기는 편이 낫습니다. 정할 것이 없어서 로그가 비었다면 그 회의는 결론이 나지 않은 것이고, 그것을 아는 것도 소득입니다.',
    ],
    checks: [
      '지난달 회의 중 결정이 문서로 남은 것은 몇 건입니까?',
      '결정마다 담당자와 기한이 같이 적혀 있습니까?',
      '반년 전 결정의 이유를 지금 찾을 수 있습니까?',
    ],
    filler: '조직 운영',
    notes: [
      { slug: 'question-debt', text: '답하지 않고 넘어간 질문은 사라지지 않고 쌓입니다' },
      { slug: 'metric-owner', text: '주인이 없는 지표는 아무도 책임지지 않습니다' },
    ],
  },
  {
    no: 19, date: '2026-09-17', dateKo: '2026. 9. 17 목요일', slug: 'interruption-recovery-time',
    subject: '끊긴 집중을 되찾는 시간은 회의 시간에 잡히지 않습니다',
    h1: '회의 삼십 분의<br>진짜 비용',
    preview: '삼십 분 회의의 비용은 삼십 분이 아닙니다. 되돌아오는 시간이 붙습니다.',
    body: [
      '회의 비용을 계산할 때 참석 인원에 시간을 곱합니다. 여덟 명이 삼십 분이면 네 시간입니다. 그런데 실제 비용은 그보다 큽니다. 하던 일을 멈추고 회의에 들어갔다가 나와서 다시 그 일로 돌아가는 데 시간이 걸리기 때문입니다.',
      '깊은 작업일수록 되돌아오는 데 오래 걸립니다. 코드를 보던 사람, 계약서를 검토하던 사람, 숫자를 맞추던 사람은 회의 전에 어디까지 했는지를 다시 찾아야 합니다. 그 시간은 어느 보고서에도 잡히지 않습니다.',
      '그래서 회의를 줄이는 것보다 모으는 것이 먼저입니다. 하루에 흩어진 회의 세 개는 연달아 붙인 회의 세 개보다 훨씬 비쌉니다. 같은 시간을 쓰고도 남는 작업 시간이 다릅니다.',
    ],
    checks: [
      '팀의 회의가 하루 중 흩어져 있습니까, 모여 있습니까?',
      '회의 없는 시간대를 정해 두셨습니까?',
      '급하지 않은 요청을 모아서 한 번에 보내고 계십니까?',
    ],
    filler: '생산성',
    notes: [
      { slug: 'decision-log', text: '회의록보다 결정 로그가 오래 쓰입니다' },
      { slug: 'exception-path', text: '예외 처리 경로가 없으면 사람이 그 자리를 대신합니다' },
    ],
  },
  {
    no: 20, date: '2026-09-22', dateKo: '2026. 9. 22 화요일', slug: 'deletion-budget',
    subject: '만드는 예산은 있고 없애는 예산은 없습니다',
    h1: '만드는 예산은 있고<br>없애는 예산은 없습니다',
    preview: '무엇을 없앨지 정하지 않으면 시스템도 절차도 계속 늘어나기만 합니다.',
    body: [
      '연간 계획에는 새로 만들 것이 적혀 있습니다. 새 시스템, 새 절차, 새 보고서. 그런데 무엇을 없앨지는 어디에도 적혀 있지 않습니다. 그래서 조직이 다루는 것의 수는 매년 늘어나기만 합니다.',
      '늘어난 것을 관리하는 데는 사람이 듭니다. 쓰이지 않는 시스템도 계정을 관리하고 보안 점검을 받고 서버를 씁니다. 아무도 안 보는 보고서도 매주 누군가 만듭니다. 이 비용은 개별로는 작아서 눈에 띄지 않습니다.',
      '그래서 계획을 세울 때 없앨 목록을 같이 만듭니다. 새로 하나를 넣을 때 하나를 뺀다는 규칙이면 더 좋습니다. 뺄 것을 찾다 보면 지금 무엇이 실제로 쓰이는지도 같이 파악됩니다.',
    ],
    checks: [
      '올해 계획에 없앨 항목이 하나라도 적혀 있습니까?',
      '쓰이지 않는 시스템의 연간 유지 비용을 아십니까?',
      '정기 산출물 목록을 마지막으로 점검한 것이 언제입니까?',
    ],
    filler: '예산',
    notes: [
      { slug: 'silent-shelving', text: '방치된 시스템은 쓰이지도 않고 없어지지도 않습니다' },
      { slug: 'knowledge-concentration', text: '한 사람만 아는 업무는 전문성이 아니라 중단 위험입니다' },
    ],
  },
  {
    no: 21, date: '2026-09-24', dateKo: '2026. 9. 24 목요일', slug: 'second-customer-test',
    subject: '첫 고객보다 두 번째 고객이 사업을 증명합니다',
    h1: '첫 고객보다<br>두 번째가 중요합니다',
    preview: '첫 고객은 관계로 옵니다. 두 번째 고객이 와야 제품이 팔린 것입니다.',
    body: [
      '첫 고객이 생기면 사업이 시작된 것 같습니다. 그런데 첫 고객은 관계로 오는 경우가 많습니다. 아는 사람이거나, 우리를 도와주려는 사람이거나, 예전 거래처입니다. 그 계약은 제품이 아니라 신뢰로 성사된 것입니다.',
      '두 번째 고객은 다릅니다. 우리를 모르는 사람이 우리 설명만 듣고 돈을 냈다면 그때 제품이 팔린 것입니다. 그래서 두 번째 계약이 첫 계약보다 훨씬 많은 것을 알려 줍니다.',
      '판단할 때는 두 계약이 얼마나 닮았는지를 봅니다. 같은 이유로 샀다면 그 이유가 시장에 있는 것입니다. 전혀 다른 이유로 샀다면 아직 무엇을 파는지 정해지지 않은 것입니다. 그 차이를 확인하기 전에 규모를 키우면 비싸집니다.',
    ],
    checks: [
      '두 번째 고객이 우리를 모르는 상태에서 왔습니까?',
      '두 고객이 산 이유가 같습니까, 다릅니까?',
      '두 이유를 고객의 말 그대로 적어 두셨습니까?',
    ],
    filler: '사업',
    notes: [
      { slug: 'first-customer-first', text: '투자자보다 첫 고객이 먼저입니다' },
      { slug: 'experiment-budget', text: '실험에는 시작 조건보다 중단 조건이 중요합니다' },
    ],
  },
];

const BAD = /[—–―─-╿·…→←↑↓⇒]|[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u;

for (const it of ISSUES) {
  let h = TPL;

  h = h.replace(/<title>[^<]*<\/title>/, `<title>Ahn's Newsletter No.${it.no} | ${it.subject}</title>`);
  h = h.replace(/NO\. 13/g, `NO. ${it.no}`);
  h = h.replace(/2026\. 8\. 27 목요일/g, it.dateKo);

  h = h.replace(/백업이 성공했다는 알림은 복구가 된다는 증명이 아닙니다\. 해 본 적이 있어야 압니다\./g, it.preview);

  h = h.replace(/백업 성공 알림은<br\s*\/?>복구 증명이 아닙니다/, it.h1);
  h = h.replace(/백업 성공 알림은[\s\S]{0,20}?복구 증명이 아닙니다/, it.h1.replace(/<br\s*\/?>/, ' '));

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

  const oldChecks = [
    '복구 완료가 실제 업무 기능과 숫자로 정의돼 있습니까?',
    '주 담당자 없이 대체 담당자가 권한을 얻을 수 있습니까?',
    '최근 분기에 실제 백업으로 목표 시간 안에 복구해 봤습니까?',
  ];
  oldChecks.forEach((o, i) => { h = h.replace(o, it.checks[i]); });

  h = h.replace(/운영 복원력/g, it.filler);
  h = h.replace(/insights\/restore-drill\.html/g, `insights/${it.slug}.html`);

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
