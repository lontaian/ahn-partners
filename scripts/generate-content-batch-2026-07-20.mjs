import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const insightsDir = path.join(root, 'insights');
const briefsDir = path.join(root, 'briefs');
const site = 'https://ahn-partners.net';
const publishedIso = '2026-07-20T18:00:00+09:00';
const publishedText = '2026.07.20';

const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

const inline = (value) => escapeHtml(value).replace(/\[\[([a-z0-9-]+)\|([^\]]+)\]\]/g, (_, slug, label) => `<a href="${slug}.html">${label}</a>`);
const p = (value) => `<p>${inline(value)}</p>`;
const list = (items) => items.map((item) => `<li>${inline(item)}</li>`).join('');

const posts = [
  {
    slug: 'approval-boundary', topic: 'AI 전략', kicker: 'Decision Boundary',
    title: 'AI가 답을 잘 내도 조직이 느리다면 승인 경계부터 확인하세요',
    deck: '모델의 정확도를 더 높이기 전에, 누가 무엇을 언제 승인하는지부터 설계해야 합니다.',
    image: 'ai-strategy-execution.jpg', minutes: 5,
    tags: ['AI 전략', '승인 경계', '의사결정', '실행'],
    tldr: [
      'AI의 답이 느리게 쓰이는 이유는 품질보다 다음 행동의 승인자가 비어 있기 때문입니다.',
      '예외를 모두 상위 결재로 올리면 자동화는 곧 대기열이 됩니다.',
      '업무마다 추천·검토·승인의 경계를 한 장에 그리면 작은 자동화부터 시작할 수 있습니다.'
    ],
    term: { word: '승인 경계', en: 'Approval Boundary', desc: 'AI가 제안한 결과를 누가 검토하고 어떤 조건에서 확정할지 미리 정한 운영 기준입니다. 각 단계의 책임자와 책임이 넘어가는 시점을 분명히 합니다.' },
    intro: [
      'AI 도입 초기에 가장 많이 듣는 말은 “답은 좋은데 현장에서 못 씁니다”입니다. 모델의 답변을 다시 문서로 옮기고, 담당자를 찾고, 결재 순서를 확인하는 동안 실행할 시기를 놓칩니다.',
      '이때 문제를 모델 성능으로만 해석하면 프롬프트와 벤치마크만 늘어납니다. 실제로는 답변 뒤의 다음 행동에 주인이 없거나, 작은 판단까지 상위 승인으로 묶여 있는 경우가 많습니다. [[ai-strategy-execution|AI 전략이 실행되지 않는 이유]]를 찾을 때 저는 먼저 승인 경계를 그립니다.'
    ],
    sections: [
      { heading: '답변의 품질과 실행의 속도는 다른 지표입니다', paragraphs: [
        '같은 답변이라도 바로 실행할 수 있는 팀과 그렇지 않은 팀의 속도는 크게 다릅니다. 전자는 답변 화면에 추천 결과, 근거, 다음 담당자, 마감 시점을 함께 둡니다. 후자는 답변만 저장하고 실행은 별도 회의로 넘깁니다.',
        '첫 주에는 정확도 점수 대신 “답변이 나온 뒤 첫 행동까지 걸린 시간”을 기록해 보세요. 시간이 긴 단계가 승인인지, 데이터 보완인지, 책임자 탐색인지 구분하면 개선할 곳이 선명해집니다.'
      ] },
      { heading: '모든 예외를 상위 결재로 보내지 마세요', paragraphs: [
        '현장에서는 예외가 생길 때마다 팀장이 확인하도록 설계하기 쉽습니다. 그렇게 하면 안전해 보이지만 팀장은 예외 대기열의 병목이 되고, 담당자는 판단을 학습할 기회를 잃습니다.',
        '금액·고객 영향·법적 위험처럼 실제로 경계를 넘는 조건만 상위로 올리십시오. 나머지는 담당자가 처리하고, 처리 로그와 재검토 조건을 남기는 방식이 더 빠르고 안전합니다.'
      ] },
      { heading: '한 장짜리 경계표가 프로젝트를 살립니다', paragraphs: [
        '업무 이름을 왼쪽에 적고 AI 추천, 담당자 검토, 관리자 승인, 고객 통보를 열로 나누면 책임자가 정해지지 않은 단계가 보입니다. 이 빈칸부터 채워야 자동화가 실제 업무로 이어집니다.',
        '경계표를 완성한 뒤에는 한 가지 업무만 골라 이틀 동안 운영해 보세요. 누가 몇 번 되돌렸는지, 어떤 조건이 모호했는지 기록하면 다음 업무의 경계표는 훨씬 빨리 채워집니다. [[decision-log|결정 로그]]와 함께 쓰면 승인 이유도 남습니다.'
      ] },
      { heading: '시작 전에 확인할 세 가지', paragraphs: [
        '추천 결과를 받은 사람이 오늘 안에 할 수 있는 행동이 적혀 있습니까. 행동이 없다면 AI 기능이 아니라 보고서 기능에 머물러 있는 것입니다.',
        '반려될 때 어디로 되돌아가고, 누가 수정하는지가 정해져 있습니까. 반려 경로가 없으면 담당자는 다시 처음부터 일을 반복합니다.'
      ] }
    ],
    checklist: ['승인자는 역할로 적혀 있고 특정 개인에게 종속되지 않았는가', '예외 조건이 숫자나 관찰 가능한 사건으로 표현됐는가', '결정 후 첫 행동과 마감 시간이 화면에 남는가'],
    related: [
      { slug: 'decision-log', label: '회의록보다 결정 로그가 조직을 빠르게 만듭니다', desc: '승인과 실행 사이의 판단을 기록하는 최소 단위를 정리합니다.' },
      { slug: 'training-last-mile', label: 'AI 교육의 성과는 수료율이 아니라 다음 회의의 질문입니다', desc: '도구 사용법을 실제 질문과 산출물로 옮기는 전환을 다룹니다.' }
    ]
  },
  {
    slug: 'decision-log', topic: '데이터 의사결정', kicker: 'Decision Log',
    title: '회의록보다 결정 로그가 조직을 빠르게 만듭니다',
    deck: '대화의 요약이 아니라 선택·근거·다음 행동을 남기면 같은 논의가 반복되지 않습니다.',
    image: 'dashboard-decision-gap.jpg', minutes: 4,
    tags: ['데이터 의사결정', '결정 로그', '회의', '운영'],
    tldr: [
      '회의록은 무엇을 말했는지 남기지만, 결정 로그는 무엇을 선택했는지 남깁니다.',
      '결정 로그에는 선택지, 판단 기준, 책임자, 재검토 조건 네 가지만 있으면 됩니다.',
      '로그가 쌓이면 대시보드가 보여 주지 못하는 조직의 판단 패턴을 읽을 수 있습니다.'
    ],
    term: { word: '결정 로그', en: 'Decision Log', desc: '중요한 선택을 선택지·근거·책임자·재검토 시점으로 짧게 남기는 운영 기록입니다. 회의의 모든 말을 저장하지 않고 판단의 흔적만 보존합니다.' },
    intro: [
      '회의가 끝난 뒤 참석자에게 공유되는 문서는 대개 발언 순서를 잘 정리한 회의록입니다. 그런데 다음 회의에서 “그래서 지난번에 무엇으로 결정했죠?”라는 질문이 다시 나옵니다. 기록은 많지만 결정은 찾기 어렵기 때문입니다.',
      '저는 [[dashboard-decision-gap|대시보드에 숫자보다 먼저 적어야 할 것]]을 점검할 때 최근 결정 로그부터 봅니다. 숫자가 움직인 이유와 숫자를 움직이기로 한 사람이 함께 보여야 지표가 행동으로 이어집니다.'
    ],
    sections: [
      { heading: '회의록은 기억을 보존하고 결정 로그는 책임을 보존합니다', paragraphs: [
        '회의록은 참석하지 못한 사람이 맥락을 따라가는 데 유용합니다. 하지만 실행을 시작하려면 요약보다 선택이 필요합니다. 결정 로그의 첫 문장은 “우리는 무엇을 하기로 했는가”여야 합니다.',
        '선택 뒤에는 근거를 한두 줄로 적습니다. 데이터가 부족했다면 부족했다고 적어야 합니다. 나중에 결과가 달라졌을 때 당시의 정보와 지금의 정보를 구분할 수 있어야 복기가 가능합니다.'
      ] },
      { heading: '네 칸이면 충분합니다', paragraphs: [
        '첫째 선택지, 둘째 판단 기준, 셋째 책임자와 첫 행동, 넷째 재검토 조건입니다. 이 네 칸을 채우지 못한 안건은 아직 결정된 것이 아니라 논의 중인 안건입니다.',
        '재검토 조건은 날짜보다 사건으로 쓰는 편이 좋습니다. “다음 달에 다시 본다”보다 “반품률이 두 주 연속 기준을 넘으면 다시 본다”처럼 관찰 가능한 신호로 적어야 합니다.'
      ] },
      { heading: '결정 로그가 반복 논의를 줄이는 방식', paragraphs: [
        '새로운 사람이 회의에 들어오면 과거 선택의 이유를 다시 설명해야 합니다. 로그가 있으면 설명은 링크 하나로 끝나고, 논의는 현재의 선택지에 집중됩니다. 팀이 커질수록 이 차이가 커집니다.',
        '반대로 로그를 평가 문서처럼 쓰면 아무도 남기지 않습니다. 한 건을 세 줄로 쓰고, 틀린 판단도 지우지 않는다는 원칙을 정해야 합니다. [[approval-boundary|승인 경계]]를 함께 적으면 누가 어디까지 판단했는지도 분명해집니다.'
      ] },
      { heading: '첫 로그를 쓰는 방법', paragraphs: [
        '이번 주에 반복해서 되돌아온 안건 하나를 고르십시오. 선택지와 기준을 적고, 첫 행동의 담당자를 한 명만 지정하십시오. 팀 전체를 책임자로 적는 순간 로그는 다시 회의록이 됩니다.',
        '일주일 뒤 결과를 붙여 보세요. 맞았는지보다 어떤 신호를 놓쳤는지가 중요합니다. 두 번째 로그부터는 팀의 질문이 바뀌기 시작합니다.'
      ] }
    ],
    checklist: ['선택지가 문장 하나로 요약되는가', '첫 행동의 담당자가 한 명인가', '재검토 조건이 관찰 가능한 사건으로 적혀 있는가'],
    related: [
      { slug: 'metric-owner', label: '대시보드에 숫자보다 먼저 적어야 할 것은 담당자입니다', desc: '지표가 책임으로 연결되는 화면의 최소 조건을 정리합니다.' },
      { slug: 'approval-boundary', label: 'AI가 답을 잘 내도 조직이 느리다면 승인 경계부터 확인하세요', desc: '추천과 확정 사이의 경계를 설계하는 법을 다룹니다.' }
    ]
  },
  {
    slug: 'exception-path', topic: '업무 분석', kicker: 'Exception Path',
    title: '자동화의 성패는 예외 처리에서 갈립니다',
    deck: '정상 건을 빠르게 처리하는 데 집중하면, 실제 비용이 발생하는 예외를 놓치게 됩니다.',
    image: 'exception-work-first.jpg', minutes: 5,
    tags: ['업무 분석', '자동화', '예외 처리', '프로세스'],
    tldr: [
      '정상 흐름은 이미 표준화되어 있어 자동화 효과가 과대평가되기 쉽습니다.',
      '반품·재작업·승인 보류처럼 예외가 몰리는 지점이 실제 운영 비용을 만듭니다.',
      '예외를 유형화하고 되돌아가는 경로를 설계한 뒤 정상 흐름을 자동화해야 합니다.'
    ],
    term: { word: '예외 경로', en: 'Exception Path', desc: '기본 프로세스에서 벗어난 요청이 어디로 이동하고, 어떤 조건에서 원래 흐름으로 돌아오는지를 설명하는 경로입니다.' },
    intro: [
      '자동화 제안서를 볼 때 정상 처리 건수와 절감 시간은 눈에 잘 들어옵니다. 하지만 현장 담당자는 정상 건보다 예외 건을 처리하는 데 더 많은 시간을 씁니다. 주소가 바뀌거나 파일 형식이 다르거나 승인자가 부재하면 표준 절차만으로는 업무를 끝낼 수 없습니다.',
      '[[workflow-analysis-before-ai|AI 도입 전 먼저 봐야 할 업무 병목 지도]]를 그릴 때 정상선 옆에 반드시 예외선을 그어야 하는 이유입니다. 예외를 보지 않은 자동화는 데모에서는 매끄럽고 운영에서는 멈춥니다.'
    ],
    sections: [
      { heading: '정상 처리율만 보면 실제 비용을 놓칩니다', paragraphs: [
        '정상 건은 입력과 출력이 일정합니다. 그래서 자동화 도구가 잘 처리하고, 시연 화면도 깔끔합니다. 문제는 정상 건의 비율만으로 프로젝트의 가치를 계산할 때 시작됩니다.',
        '예외 건은 한 건마다 담당자의 확인, 재입력, 연락, 승인 대기를 부릅니다. 건수는 적어도 한 건당 시간이 길기 때문에 전체 비용을 좌우합니다. 먼저 지난달 예외 건을 열어보고 어떤 유형이 반복되는지 세어야 합니다.'
      ] },
      { heading: '예외를 사람의 실수로만 부르지 마세요', paragraphs: [
        '예외에는 시스템이 제공하지 못한 선택지가 담겨 있습니다. 고객이 규정 밖 요청을 했거나, 현장 조건이 표준 입력에 들어가지 않는 경우입니다. 이를 실수로만 분류하면 같은 요청이 계속 다른 사람의 수작업으로 처리됩니다.',
        '예외 유형마다 “계속 진행”, “추가 정보 요청”, “상위 승인”, “거절” 중 하나의 다음 상태를 정하십시오. 상태가 정해지면 담당자 개인의 경험이 프로세스 자산으로 바뀝니다.'
      ] },
      { heading: '되돌아가는 길을 먼저 설계합니다', paragraphs: [
        '예외 처리가 끝난 뒤 정상 흐름으로 돌아가는 지점이 없다면 업무는 별도 수기 장부가 됩니다. 예외가 해결되었을 때 어떤 데이터를 원래 기록에 붙일지, 누가 닫을지를 정해야 합니다.',
        '자동화 도구에는 실패 메시지보다 다음 선택지를 보여 주십시오. 담당자가 “오류”를 읽는 데서 끝나지 않고, 바로 수정하거나 요청을 넘길 수 있어야 합니다. [[vendor-handoff|외주 시스템의 인수인계]]에서도 이 복귀 경로가 가장 자주 빠집니다.'
      ] },
      { heading: '작은 표로 예외를 시작하세요', paragraphs: [
        '예외 이름, 발생 신호, 첫 담당자, 필요한 추가 정보, 종료 조건 다섯 칸이면 충분합니다. 완벽한 프로세스 맵을 그리느라 배포를 미루지 말고, 가장 많이 되돌아오는 한 유형부터 적으십시오.',
        '한 주 뒤 표를 다시 보며 “이 예외를 없앨 수 있는가”와 “없앨 수 없다면 더 빨리 처리할 수 있는가”를 분리해 판단합니다. 모든 예외를 자동화할 필요는 없지만 모든 예외에 다음 단계는 있어야 합니다.'
      ] }
    ],
    checklist: ['최근 예외 사례를 실제 화면과 함께 확인했는가', '각 예외에 종료 조건이 있는가', '예외가 해결된 뒤 정상 기록으로 복귀하는가'],
    related: [
      { slug: 'vendor-handoff', label: '외주 시스템의 운영 실패는 인수인계에서 시작됩니다', desc: '인수인계 중 누락되기 쉬운 책임과 운영 정보를 확인합니다.' },
      { slug: 'decision-log', label: '회의록보다 결정 로그가 조직을 빠르게 만듭니다', desc: '예외를 처리한 판단을 다음 사람이 재사용하게 만드는 방법입니다.' }
    ]
  },
  {
    slug: 'metric-owner', topic: '데이터 의사결정', kicker: 'Metric Owner',
    title: '대시보드에 숫자보다 먼저 적어야 할 것은 담당자입니다',
    deck: '지표가 움직였을 때 누가 첫 번째로 확인하고 어떤 행동을 하는지까지 보여야 합니다.',
    image: 'data-that-pays.jpg', minutes: 4,
    tags: ['데이터 의사결정', '대시보드', '책임', 'KPI'],
    tldr: [
      '담당자가 없는 지표는 현황을 보여 줄 뿐, 실제 행동으로 이어지기 어렵습니다.',
      '지표마다 소유자·첫 행동·알림 조건을 한 줄로 붙이면 회의가 짧아집니다.',
      '숫자를 늘리기보다 행동으로 이어지지 않는 지표부터 내려야 합니다.'
    ],
    term: { word: '지표 소유자', en: 'Metric Owner', desc: '지표의 정의를 관리하고, 변동이 생겼을 때 첫 행동을 시작할 책임이 있는 사람 또는 역할입니다. 결과의 책임을 혼자 떠안는 사람이 아니라 해석의 출발점을 갖는 사람입니다.' },
    intro: [
      '대시보드를 열면 숫자는 많지만 질문은 더 많아지는 장면을 자주 만납니다. 이번 주 수치가 올랐는지 내렸는지는 보이는데, 왜 움직였고 다음에 무엇을 할지는 화면 밖에 있습니다.',
      '그래서 [[decision-log|결정 로그]]를 정리할 때는 숫자 옆에 담당자와 첫 행동을 같이 기록합니다. 지표를 추가하는 일보다 지표가 움직였을 때 누가 먼저 움직이는지를 정하는 일이 먼저입니다.'
    ],
    sections: [
      { heading: '지표에는 정의와 행동 기준이 함께 있어야 합니다', paragraphs: [
        '지표를 만든다는 것은 팀이 같은 현상을 같은 방식으로 보겠다는 약속입니다. 정의가 달라지면 같은 숫자로 서로 다른 결론을 내립니다. 이름, 계산 시점, 제외 조건을 먼저 적어야 합니다.',
        '정의 다음에는 행동 약속을 붙입니다. 예를 들어 문의 응답 시간이 기준을 넘으면 담당자가 원인을 분류하고, 반복 유형은 다음 주 프로세스 회의 안건으로 올린다는 식입니다.'
      ] },
      { heading: '담당자를 개인 이름으로 고정하지 마세요', paragraphs: [
        '개인 이름만 적어 두면 휴가와 이동이 곧 공백이 됩니다. 역할과 백업 담당자를 함께 적고, 소유권이 바뀌는 순간을 로그로 남겨야 합니다.',
        '팀이 지표를 맡는다고 쓰면 아무도 첫 행동을 시작하지 않습니다. 최종 책임은 역할에 두되, 첫 확인자는 한 명으로 지정하는 방식이 현실적입니다.'
      ] },
      { heading: '행동하지 않는 지표는 과감히 내립니다', paragraphs: [
        '회의에서 세 번 연속 설명만 하고 행동으로 이어지지 않은 지표는 목적을 잃었을 가능성이 큽니다. 쓰지 않는 지표를 정리해야 중요한 지표에 집중할 수 있습니다.',
        '대신 의사결정에 직접 쓰이는 지표를 남기고, 보조 지표는 필요할 때 조회하는 상세 화면으로 보냅니다. [[approval-boundary|승인 경계]]를 지표 화면에 연결하면 숫자 변화가 어느 권한까지 올라가야 하는지도 명확해집니다.'
      ] },
      { heading: '대시보드 개편을 하루 안에 시작하는 법', paragraphs: [
        '현재 화면에서 가장 자주 보는 지표 세 개를 고르십시오. 각 지표에 정의, 소유자, 기준 초과 시 첫 행동을 한 줄씩 붙입니다. 빈칸이 남는 지표는 다음 회의에서 정리 대상으로 표시합니다.',
        '일주일 후 실제로 행동이 시작됐는지 확인합니다. 화면을 예쁘게 바꾸는 것보다 한 건의 행동이 빠르게 시작됐는지가 개편의 성공 기준입니다.'
      ] }
    ],
    checklist: ['지표의 정의와 제외 조건이 한 문장으로 적혀 있는가', '첫 확인자와 백업 역할이 정해져 있는가', '기준을 넘었을 때 할 행동이 화면에 연결돼 있는가'],
    related: [
      { slug: 'decision-log', label: '회의록보다 결정 로그가 조직을 빠르게 만듭니다', desc: '숫자에서 선택으로 이어지는 기록의 구조를 다룹니다.' },
      { slug: 'question-debt', label: '팀의 질문이 줄었다면 이탈 신호부터 확인하세요', desc: '지표가 놓치는 팀의 신호를 질문으로 읽는 방법입니다.' }
    ]
  },
  {
    slug: 'repeat-behavior', topic: '신사업 실행', kicker: 'Repeat Behavior',
    title: '고객 인터뷰보다 다음 주에 반복하는 행동을 보세요',
    deck: '좋다는 말보다 고객이 다시 시간을 쓰고, 비용을 지불하고, 동료를 부르는지를 확인해야 합니다.',
    image: 'first-customer-first.jpg', minutes: 5,
    tags: ['신사업 실행', '고객 검증', '반복 행동', '제품 전략'],
    tldr: [
      '인터뷰는 의도를 보여 주고 반복 행동은 고객이 이 문제를 얼마나 중요하게 여기는지 보여 줍니다.',
      '첫 고객의 칭찬보다 두 번째 사용 날짜와 내부 추천을 기록해야 합니다.',
      '검증 기간에는 기능을 추가하기보다 고객의 반복 사용을 막는 장애 요인 하나를 없애는 데 집중합니다.'
    ],
    term: { word: '반복 행동', en: 'Repeat Behavior', desc: '고객이 별도 설득 없이 다시 사용하거나, 돈·시간·평판을 걸고 다음 사람을 참여시키는 관찰 가능한 행동입니다.' },
    intro: [
      '신사업 초기에 인터뷰를 많이 하면 고객의 언어를 빨리 배울 수 있습니다. 하지만 “좋네요”라는 말이 다음 주 사용으로 이어진다는 보장은 없습니다. 말과 행동 사이에는 예산, 우선순위, 내부 승인이라는 큰 간격이 있습니다.',
      '[[first-customer-first|투자자보다 첫 고객이 먼저인 이유]]도 여기에 있습니다. 첫 고객의 다음 행동을 확인하면 제품의 가치가 말이 아니라 실제 사용 과정에서 검증됩니다.'
    ],
    sections: [
      { heading: '좋다는 말은 출발점일 뿐입니다', paragraphs: [
        '인터뷰에서 고객이 문제를 자세히 설명했다면 중요한 힌트를 얻은 것입니다. 그러나 그 문제가 지금 해결해야 할 문제인지는 아직 모릅니다. 우선순위가 높은 문제라면 고객은 이미 임시방편에 시간과 비용을 쓰고 있습니다.',
        '다음 대화에서는 “언제 다시 사용하시겠습니까”보다 “다음 주 화요일에 누구와 어떤 자료를 가지고 다시 해보실 건가요”처럼 행동을 묻습니다. 날짜·사람·자료가 나오지 않으면 아직 실행 계획이 아닙니다.'
      ] },
      { heading: '반복 사용을 막는 장애 요인을 기록하세요', paragraphs: [
        '첫 사용 후 돌아오지 않는 이유는 기능 부족보다 사용 과정의 불편인 경우가 많습니다. 로그인, 데이터 입력, 내부 승인, 결과 공유 중 어느 단계에서 멈췄는지 한 단계로 표시하십시오.',
        '불편을 한 번에 모두 없애려 하지 말고 가장 자주 멈추는 한 단계부터 개선합니다. 고객이 다시 사용했는지 확인하고, 그 결과를 다음 실험의 기준으로 삼습니다.'
      ] },
      { heading: '반복 행동에는 비용이 붙습니다', paragraphs: [
        '고객이 다시 쓰는 것만으로도 의미가 있지만, 실제 사업이 되려면 무언가를 걸어야 합니다. 예산을 배정하거나, 팀의 시간을 예약하거나, 동료에게 추천하는 행동이 그 신호입니다.',
        '무료 파일럿이라면 돈 대신 시간을 명확히 요청하십시오. 매주 30분의 리뷰 시간을 확보하지 못한다면, 그 고객은 아직 문제를 해결할 준비가 안 된 것입니다. [[experiment-budget|가장 작은 실험을 정하는 법]]과 함께 보면 실험의 비용도 보입니다.'
      ] },
      { heading: '검증 보드를 간단하게 유지하세요', paragraphs: [
        '고객별로 마지막 사용일, 다음 사용일, 함께 참여한 사람, 지불 또는 추천 행동, 멈춘 이유 다섯 칸만 기록합니다. 숫자가 많아지면 다시 보고서가 됩니다.',
        '매주 보드에서 다음 사용일이 없는 고객을 골라 이유를 확인하십시오. 제품을 더 만드는 것보다 이 한 칸을 채우는 일이 신사업의 방향을 더 빨리 알려 줍니다.'
      ] }
    ],
    checklist: ['다음 사용 날짜와 참여자가 정해져 있는가', '고객이 실제로 투입한 시간·예산이 기록돼 있는가', '반복 사용을 막는 장애 요인이 한 단계로 좁혀졌는가'],
    related: [
      { slug: 'experiment-budget', label: '전략을 더 세우기 전에 가장 작은 실험을 정하세요', desc: '검증에 필요한 비용과 중단 조건을 정하는 방법입니다.' },
      { slug: 'first-customer-first', label: '투자자보다 첫 고객이 먼저입니다', desc: '첫 고객을 제품의 공동 설계자로 만드는 실행 순서입니다.' }
    ]
  },
  {
    slug: 'vendor-handoff', topic: '운영 시스템', kicker: 'Handoff',
    title: '외주 시스템의 운영 실패는 인수인계에서 시작됩니다',
    deck: '배포만으로는 끝나지 않습니다. 운영자가 외주사 없이 복구할 수 있어야 인수인계가 완료됩니다.',
    image: 'outsourced-system-neglect.jpg', minutes: 5,
    tags: ['운영 시스템', '외주', '인수인계', '복구'],
    tldr: [
      '외주 프로젝트의 운영 리스크는 기능 목록이 아니라 사라진 맥락에서 생깁니다.',
      '인수인계 문서에는 정상 사용법보다 장애 신호와 복구 순서가 먼저 있어야 합니다.',
      '계약 종료 전에 실제 운영자가 혼자 복구하는 리허설을 해야 합니다.'
    ],
    term: { word: '운영 인수인계', en: 'Operational Handoff', desc: '개발팀이 떠난 뒤에도 운영자가 배포·모니터링·복구를 이어 갈 수 있도록 권한, 신호, 절차, 판단 기준을 넘기는 과정입니다.' },
    intro: [
      '외주 개발이 끝나면 화면과 기능이 정상인지부터 확인합니다. 하지만 운영 장애는 화면 밖에서 시작됩니다. 어떤 로그를 보고, 어느 서버에 접속하고, 어느 시점에 외주사에 연락해야 하는지가 남아 있지 않으면 작은 장애도 장기 중단으로 번집니다.',
      '[[exception-path|예외 흐름이 자동화에서 무너지는 이유]]와 마찬가지로, 인수인계는 정상 사용보다 실패 순간을 기준으로 설계해야 합니다.'
    ],
    sections: [
      { heading: '완료 기준을 배포에서 복구로 바꾸세요', paragraphs: [
        '개발팀은 배포가 끝나면 프로젝트가 끝났다고 느끼고, 운영팀은 장애가 없으면 잘 넘겨받았다고 느낍니다. 둘 사이에 “운영자가 혼자 복구할 수 있는가”라는 기준을 넣어야 합니다.',
        '복구 기준은 구체적으로 씁니다. 예를 들어 알림을 받은 뒤 로그 위치를 찾고, 최근 배포를 확인하고, 안전한 롤백을 실행하는 순서를 운영자가 직접 수행하는 식입니다.'
      ] },
      { heading: '문서보다 접근권한이 먼저입니다', paragraphs: [
        '문서가 아무리 좋아도 운영자가 저장소·배포·모니터링에 접근할 수 없으면 무용합니다. 개인 계정이 아니라 조직 계정과 역할별 권한으로 정리하고, 퇴사나 계약 종료 때 회수할 수 있어야 합니다.',
        '비밀값은 문서에 복사하지 말고 보관 위치와 교체 절차만 남깁니다. 권한 목록과 최근 접근 기록을 함께 확인하면 인수인계 누락을 빠르게 찾을 수 있습니다.'
      ] },
      { heading: '장애 시나리오 세 개를 리허설하세요', paragraphs: [
        '가장 자주 일어나는 장애, 가장 늦게 발견되는 장애, 외주사 없이 해결해야 하는 장애를 하나씩 고릅니다. 각 시나리오에 탐지 신호, 첫 연락 대상, 임시 조치, 정상화 확인을 적습니다.',
        '리허설 중 막힌 지점은 운영자의 역량 문제가 아니라 시스템의 인수인계 결함입니다. [[deletion-budget|지울 예산이 있어야 코드가 자산이 된다는 원칙]]처럼, 인수인계에도 시간을 배정해야 합니다.'
      ] },
      { heading: '계약서에 남겨야 할 마지막 질문', paragraphs: [
        '“문제가 생기면 누구에게 연락하나요”만으로는 부족합니다. 연락 가능한 기간, 응답 기준, 로그를 전달하는 방법, 변경 승인의 주체를 계약과 운영 문서에 함께 남기십시오.',
        '마지막 검수 회의에서는 기능 시연 대신 운영자 단독 복구를 봅니다. 외주사가 대신 조작해 주는 순간, 인수인계의 빈틈은 가려집니다.'
      ] }
    ],
    checklist: ['운영자가 필요한 모든 시스템에 자기 계정으로 접근할 수 있는가', '장애 신호와 복구 순서가 한 장에 있는가', '외주사 없이 복구 리허설을 통과했는가'],
    related: [
      { slug: 'exception-path', label: '자동화의 성패는 예외 처리에서 갈립니다', desc: '운영에서 가장 비싼 예외를 먼저 다루는 방법입니다.' },
      { slug: 'erp-in-house-lessons', label: '패키지 ERP를 버리고 직접 만들며 배운 것', desc: '내부 시스템을 오래 운영하기 위해 필요한 기준을 정리합니다.' }
    ]
  },
  {
    slug: 'training-last-mile', topic: 'AX 교육', kicker: 'Last Mile',
    title: 'AI 교육의 성과는 수료율이 아니라 다음 회의의 질문입니다',
    deck: '도구 사용법을 배운 뒤 실제 업무의 질문이 바뀌는지까지 설계해야 교육이 전환으로 이어집니다.',
    image: 'ax-education-design.jpg', minutes: 4,
    tags: ['AX 교육', '교육 전환', '업무 습관', '질문'],
    tldr: [
      '수료율은 참여를 보여 주지만 업무가 바뀌었는지는 보여 주지 못합니다.',
      '교육 직후 실제 회의 안건 하나를 AI로 다시 작성하게 하면 업무 적용을 막는 요인을 확인할 수 있습니다.',
      '좋은 교육은 프롬프트 모음이 아니라 질문을 더 잘 만드는 반복 루프를 남깁니다.'
    ],
    term: { word: '업무 전환', en: 'Last-mile Adoption', desc: '교육장에서 익힌 방법을 실제 업무에 적용하고 반복하는 과정입니다. 권한, 데이터, 시간과 같은 장애물을 줄여야 학습이 업무 습관으로 이어집니다.' },
    intro: [
      'AI 교육을 마친 날에는 모두가 고개를 끄덕입니다. 그러나 다음 회의에서 예전 자료와 예전 질문이 그대로 나오면 교육은 정보 전달에 머문 것입니다. 전환은 교육장 밖에서 시작됩니다.',
      '[[ax-education-design|AX 교육을 업무 전환으로 설계하는 법]]을 실행할 때 저는 수료증보다 다음 회의에 가져올 산출물을 먼저 정합니다. 질문이 달라져야 도구도 자리를 얻습니다.'
    ],
    sections: [
      { heading: '교육 목표를 기능이 아니라 질문으로 씁니다', paragraphs: [
        '“요약 기능을 사용할 수 있다”는 교육 목표는 행동을 설명하지 못합니다. “회의 전에 반대 의견 세 가지를 뽑아 안건에 추가한다”처럼 질문과 결과를 함께 적어야 합니다.',
        '직무마다 실제 자료를 가져오게 하되 민감 정보는 제거합니다. 교육용 예제가 현실과 멀수록 업무 복귀 순간의 간극이 커집니다.'
      ] },
      { heading: '수료 직후 20분의 과제를 남기세요', paragraphs: [
        '교육이 끝난 뒤 각자가 다음 회의 자료 한 페이지를 골라 질문을 세 번 바꾸게 합니다. 원래 질문, AI에게 맡긴 질문, 사람이 다시 다듬은 질문을 나란히 놓으면 배운 방식이 보입니다.',
        '과제는 완성도보다 제출 여부가 중요합니다. 제출하지 못한 이유가 권한, 데이터, 시간 중 무엇인지 확인하면 조직 차원의 지원 항목이 됩니다.'
      ] },
      { heading: '리더는 답보다 질문을 칭찬해야 합니다', paragraphs: [
        '팀장이 AI가 만든 결과만 칭찬하면 구성원은 그럴듯한 답을 빨리 만드는 데 집중합니다. 질문의 범위가 좋아졌는지, 반대 근거를 포함했는지, 실행 조건을 드러냈는지를 먼저 물어야 합니다.',
        '질문을 공유하는 짧은 루틴을 만드십시오. 매주 하나의 질문을 골라 어떤 맥락이 추가되었을 때 결과가 좋아졌는지 복기하면 [[question-debt|팀의 질문이 줄어드는 순간]]도 조기에 포착할 수 있습니다.'
      ] },
      { heading: '교육의 다음 지표는 작게 잡습니다', paragraphs: [
        '교육 한 달 뒤 모든 업무가 바뀌었는지 조사할 필요는 없습니다. 실제 회의 자료에 AI가 만든 초안이 한 번이라도 들어갔는지, 그 초안에 사람이 남긴 수정이 무엇인지부터 확인합니다.',
        '수정이 많아도 괜찮습니다. 수정 흔적이 있어야 조직에 맞는 기준을 배울 수 있습니다. 중요한 것은 결과를 숨기지 않고 다음 교육의 예제로 되돌리는 것입니다.'
      ] }
    ],
    checklist: ['교육 후 실제 회의 산출물이 정해져 있는가', '질문과 결과를 함께 평가하는가', '수정 흔적을 다음 교육에 재사용하는가'],
    related: [
      { slug: 'approval-boundary', label: 'AI가 답을 잘 내도 조직이 느리다면 승인 경계부터 확인하세요', desc: '교육 이후 실제 실행까지 이어지는 책임 경계를 설계합니다.' },
      { slug: 'executive-vibe-coding', label: '임원이 직접 만들어 본 뒤에야 보이는 것들', desc: '리더가 직접 도구를 써야 확인할 수 있는 업무 적용의 장애 요인을 다룹니다.' }
    ]
  },
  {
    slug: 'deletion-budget', topic: 'AI 전략', kicker: 'Deletion Budget',
    title: '빠르게 만든 코드는 정리하고 지울 시간을 확보해야 자산이 됩니다',
    deck: '개발 속도만 높이면 시스템의 복잡성도 빠르게 커집니다. 검증·정리·삭제 시간을 일정에 포함해야 오래 운영할 수 있습니다.',
    image: 'ai-executive-misconception.jpg', minutes: 5,
    tags: ['AI 전략', '코드 품질', '실험', '운영'],
    tldr: [
      'AI로 만든 첫 결과물의 가치는 속도가 아니라 다음 수정이 쉬운지로 판별됩니다.',
      '실험마다 삭제 조건과 정리 시간을 예약하지 않으면 임시 코드는 영구 경로가 됩니다.',
      '빠르게 만들기와 안전하게 지우기를 같은 계획 안에 넣어야 합니다.'
    ],
    term: { word: '삭제 예산', en: 'Deletion Budget', desc: '실험 결과가 기준을 넘지 못했을 때 코드를 걷어내고 문서와 권한을 정리하기 위해 미리 확보하는 시간과 책임입니다.' },
    intro: [
      'AI 코딩 도구를 쓰면 하루 안에 기능을 만들 수 있습니다. 문제는 기능이 늘어난 속도만큼 이해와 정리가 따라오지 않는다는 데 있습니다. 임시 데이터, 중복 컴포넌트, 확인되지 않은 권한이 다음 작업의 발목을 잡습니다.',
      '[[safe-failure|잘 크는 주니어는 일찍 틀려본 주니어입니다]]라는 원칙을 시스템에도 적용해야 합니다. 실패를 허용하려면 실패한 결과를 지우는 비용까지 계획에 들어 있어야 합니다.'
    ],
    sections: [
      { heading: '속도는 실험의 앞부분만 빠르게 합니다', paragraphs: [
        '생성 도구는 첫 화면과 첫 API를 빠르게 만듭니다. 하지만 운영에 들어가면 데이터 구조, 오류 처리, 권한, 배포 방식이 서로 얽혀 있다는 사실이 드러납니다.',
        '그래서 첫 작업의 완료 기준을 “배포됨”으로 끝내지 말고, “무엇을 버릴지 기록됨”까지 확장합니다. 무엇을 임시로 두었는지 모르면 다음 작업은 임시 위에 쌓입니다.'
      ] },
      { heading: '삭제 조건을 만들면 실험이 정직해집니다', paragraphs: [
        '실험을 시작할 때 성공 조건만 적으면 팀은 결과를 합리화하기 쉽습니다. 일정 기간 안에 사용되지 않거나, 수동 확인 시간이 줄지 않거나, 오류 복구를 설명할 수 없다면 중단한다는 조건을 함께 적어야 합니다.',
        '중단 조건은 실패를 예언하는 장치가 아니라 다음 결정을 빠르게 만드는 장치입니다. [[approval-boundary|승인 경계]]와 연결해 누가 중단을 확정할지까지 정하십시오.'
      ] },
      { heading: '지우는 날의 체크리스트', paragraphs: [
        '코드만 지우면 끝나지 않습니다. 테스트 데이터, 환경변수, 접근권한, 모니터링 알림, 사용자를 안내한 문서까지 함께 정리해야 합니다. 하나라도 남으면 다음 사람이 다시 켭니다.',
        '삭제 후에는 결정 로그에 이유와 배운 점을 남깁니다. 실패를 숨기지 않고 재사용 가능한 기준으로 만들 때, 빠른 실험이 조직의 자산이 됩니다.'
      ] },
      { heading: '정리 시간을 일정에 먼저 넣으세요', paragraphs: [
        '새 기능 일정의 마지막 하루를 항상 정리일로 예약하십시오. 실제로 삭제하지 않아도 임시 항목을 목록으로 만들고, 다음 주에 다시 판단할 수 있습니다.',
        '정리일을 줄이면 당장은 더 많은 기능을 넣을 수 있지만, 다음 변경의 시작점은 점점 늦어집니다. 생성 속도를 운영 속도로 착각하지 않는 것이 핵심입니다.'
      ] }
    ],
    checklist: ['실험 시작 시 중단 조건이 기록됐는가', '임시 권한과 데이터의 만료일이 있는가', '삭제 후 결정 로그와 재사용 기준이 남는가'],
    related: [
      { slug: 'safe-failure', label: '잘 크는 주니어는 일찍 틀려본 주니어입니다', desc: '작은 실패를 학습 자산으로 만드는 안전장치를 정리합니다.' },
      { slug: 'approval-boundary', label: 'AI가 답을 잘 내도 조직이 느리다면 승인 경계부터 확인하세요', desc: '실험을 시작하고 멈추는 권한을 명확히 합니다.' }
    ]
  },
  {
    slug: 'question-debt', topic: '조직과 사람', kicker: 'Question Debt',
    title: '팀의 질문이 줄었다면 이탈 신호부터 확인하세요',
    deck: '조용한 회의는 합의가 아니라 포기의 신호일 수 있습니다. 질문이 사라지는 경로를 먼저 살펴야 합니다.',
    image: 'quiet-exit.jpg', minutes: 5,
    tags: ['조직과 사람', '질문', '이탈', '심리적 안전'],
    tldr: [
      '질문이 줄었다고 팀이 정렬된 것은 아닙니다. 질문해도 바뀌지 않는다는 학습일 수 있습니다.',
      '회의 발언 수보다 질문이 어떻게 처리됐는지를 기록해야 조직의 신뢰를 볼 수 있습니다.',
      '질문을 환영한다고 말하는 것보다 질문 뒤에 실제로 바뀐 사례를 남기는 편이 효과적입니다.'
    ],
    term: { word: '질문 부채', en: 'Question Debt', desc: '팀원이 물어도 달라지지 않는다고 판단해 말하지 않으면서, 해결되지 않은 문제와 정보가 쌓이는 상태입니다.' },
    intro: [
      '어느 순간 회의가 조용해지고 보고서가 매끄러워집니다. 리더는 정렬됐다고 생각하지만, 몇 주 뒤 핵심 인력이 먼저 일정을 비우고 이직 이야기를 꺼내는 경우가 있습니다. 질문을 포기한 뒤에야 침묵이 보였기 때문입니다.',
      '[[quiet-exit|에이스가 퇴사 통보 전에 먼저 조용해지는 이유]]를 살필 때 저는 질문의 개수보다 질문 이후의 변화부터 봅니다. 질문이 실제 결정으로 이어진 경험이 있어야 다음 질문이 나옵니다.'
    ],
    sections: [
      { heading: '침묵은 만족도의 반대편에만 있지 않습니다', paragraphs: [
        '팀원이 업무를 충분히 이해해서 질문이 줄어든 경우도 있습니다. 반대로 질문해도 답이 없고, 답해도 결정이 바뀌지 않아 포기한 경우도 있습니다. 두 상태는 회의록만으로 구분하기 어렵습니다.',
        '최근 한 달 동안 제기된 질문을 세 종류로 나눠 보십시오. 바로 답한 질문, 보류된 질문, 사라진 질문입니다. 보류와 사라짐이 많은데 회의가 조용하다면 질문 부채를 의심할 때입니다.'
      ] },
      { heading: '질문의 처리 결과를 보여 주세요', paragraphs: [
        '질문을 받으면 답변만 하지 말고 처리 상태를 남깁니다. 결정에 반영했는지, 추가 확인이 필요한지, 이번에는 반영하지 않는지 알 수 있어야 합니다.',
        '반영하지 않은 질문도 이유를 설명해야 합니다. 모든 제안을 채택하라는 뜻이 아니라, 질문이 사라지지 않았다는 경험을 반복시키라는 뜻입니다. [[decision-log|결정 로그]]에 질문과 처리 결과를 함께 붙이면 좋습니다.'
      ] },
      { heading: '리더의 첫 반응이 문화를 만듭니다', paragraphs: [
        '질문을 받은 순간 바로 답을 주면 대화는 끝납니다. 먼저 “그 질문이 나온 배경이 무엇인가요”라고 물으면 다른 팀원도 맥락을 보탤 수 있습니다.',
        '좋은 질문이 나왔을 때는 질문자를 칭찬하기보다 질문 때문에 바뀐 결정을 보여 주십시오. 사람은 말보다 실제 결과를 보고 질문해도 안전한지 판단합니다.'
      ] },
      { heading: '이탈 신호를 조기에 확인하는 방법', paragraphs: [
        '일대일에서 “요즘 괜찮나요”만 묻지 말고, 최근에 묻고 싶었지만 묻지 않은 것이 있는지 질문하십시오. 답을 재촉하지 말고, 다음 행동을 약속한 뒤 지키는 것이 중요합니다.',
        '질문이 다시 늘어나는 것이 단기적으로는 회의 시간을 늘릴 수 있습니다. 그러나 질문이 살아 있어야 문제를 일찍 발견하고, 사람이 떠나기 전에 조직이 배울 수 있습니다.'
      ] }
    ],
    checklist: ['보류되거나 사라진 질문을 추적하고 있는가', '반영하지 않은 이유도 공유하는가', '질문 뒤에 실제로 바뀐 결정이 있는가'],
    related: [
      { slug: 'metric-owner', label: '대시보드에 숫자보다 먼저 적어야 할 것은 담당자입니다', desc: '숫자만으로 보이지 않는 책임과 행동을 화면에 붙입니다.' },
      { slug: 'repeat-behavior', label: '고객 인터뷰보다 다음 주에 반복하는 행동을 보세요', desc: '말보다 다음 행동을 확인하는 검증 원칙을 조직에도 적용합니다.' }
    ]
  },
  {
    slug: 'experiment-budget', topic: '신사업 실행', kicker: 'Smallest Experiment',
    title: '전략을 더 세우기 전에 가장 작은 실험을 정하세요',
    deck: '큰 계획은 시작을 늦춥니다. 배울 수 있고, 멈출 수 있고, 다시 시도할 수 있는 최소 단위를 먼저 만드세요.',
    image: 'hydrogen-new-business-execution.jpg', minutes: 5,
    tags: ['신사업 실행', '실험', '가설', '예산'],
    tldr: [
      '좋은 실험은 성공을 보장하지 않고, 다음 판단에 필요한 정보를 빠르게 줍니다.',
      '실험 예산에는 돈뿐 아니라 고객의 시간, 팀의 집중 시간, 중단 비용이 포함됩니다.',
      '시작 조건과 중단 조건을 함께 적으면 전략 회의가 실행 회의로 바뀝니다.'
    ],
    term: { word: '최소 실험', en: 'Smallest Viable Experiment', desc: '가설을 검증하는 데 필요한 범위만 남긴 실행 단위입니다. 결과가 작아도 다음 선택을 바꿀 수 있어야 합니다.' },
    intro: [
      '신사업 회의는 시장 규모와 장기 로드맵을 말하는 데 많은 시간을 씁니다. 그러나 첫 고객이 무엇을 언제 해 줄지 정하지 않은 상태에서 계획만 커지면, 실패했을 때 무엇을 배웠는지도 남지 않습니다.',
      '[[repeat-behavior|고객이 다음 주에 반복하는 행동]]을 확인하려면 실험의 크기를 줄여야 합니다. 작아야 고객과 팀이 실제로 움직이고, 결과를 빠르게 읽을 수 있습니다.'
    ],
    sections: [
      { heading: '실험의 가치는 불확실성을 줄이는 데 있습니다', paragraphs: [
        '실험을 설계할 때 “성공하면 무엇을 얻는가”만 쓰면 투자안이 됩니다. “실패해도 어떤 불확실성을 없애는가”를 적어야 학습안이 됩니다.',
        '검증할 불확실성을 하나만 고르십시오. 고객이 문제를 느끼는지, 비용을 지불하는지, 반복해서 쓰는지 세 가지를 한 번에 검증하려 하면 결과가 섞입니다.'
      ] },
      { heading: '예산에는 사람의 시간을 포함합니다', paragraphs: [
        '작은 파일럿도 고객 인터뷰, 데이터 정리, 지원, 회고에 시간이 듭니다. 이 시간을 예산에서 빼면 실험은 항상 “조금만 더 해 보자”로 늘어납니다.',
        '실험 시작 전에 팀과 고객이 투입할 최대 시간을 적으십시오. 시간이 넘으면 기능을 추가하는 대신 가설을 수정하거나 멈추는 선택을 해야 합니다.'
      ] },
      { heading: '시작과 중단을 같은 문서에 씁니다', paragraphs: [
        '시작 조건에는 대상 고객, 관찰할 행동, 기간, 책임자를 적습니다. 중단 조건에는 반복되지 않는 행동, 예상하지 못한 업무 부담, 되돌리기 어려운 운영 위험을 적습니다.',
        '이 문서가 있으면 결과가 좋지 않아도 판단이 빨라집니다. [[deletion-budget|삭제 예산]]을 함께 잡아 두면 실험이 끝난 뒤 남는 코드와 데이터도 정리할 수 있습니다.'
      ] },
      { heading: '7일짜리 실험 보드', paragraphs: [
        '월요일에 가설과 고객을 확정하고, 수요일에 첫 행동을 관찰하고, 금요일에 결과와 다음 선택을 기록합니다. 일주일 안에 결론을 내리는 것이 아니라 다음 주에 무엇을 바꿀지 정하는 흐름입니다.',
        '보드에는 가설, 관찰 행동, 막힌 단계, 다음 선택 네 칸만 둡니다. 회의 자료를 늘리는 순간 실험은 다시 전략 문서가 됩니다.'
      ] }
    ],
    checklist: ['이번 실험이 줄이는 불확실성이 하나인가', '팀과 고객의 최대 투입 시간이 적혀 있는가', '중단 후 정리할 코드·데이터가 목록화돼 있는가'],
    related: [
      { slug: 'repeat-behavior', label: '고객 인터뷰보다 다음 주에 반복하는 행동을 보세요', desc: '말이 아닌 재사용·지불·추천 행동으로 가설을 검증합니다.' },
      { slug: 'first-customer-first', label: '투자자보다 첫 고객이 먼저입니다', desc: '첫 고객과 함께 실험의 범위를 좁히는 순서입니다.' }
    ]
  }
];

const header = `  <header id="header" class="header"><div class="container header-inner"><a href="../index.html" class="logo"><img src="../images/logo/ap-mark.png" class="logo-mark" alt=""><img src="../images/logo/ap-wordmark-web.png" class="logo-wordmark" alt="Ahn Partners"></a><nav class="desktop-nav" aria-label="주요 메뉴"><ul class="nav-list"><li><a href="../index.html#services" class="nav-link mix-difference">서비스</a></li><li><a href="../index.html#projects" class="nav-link mix-difference">수행 실적</a></li><li><a href="../about.html" class="nav-link mix-difference">소개</a></li><li><a href="../insights.html" class="nav-link mix-difference active" aria-current="page">인사이트</a></li><li><a href="../newsletter.html" class="nav-link mix-difference">뉴스레터</a></li><li><a href="../about.html#contact" class="nav-link mix-difference">문의</a></li></ul></nav><button type="button" class="mobile-menu-btn mix-difference" id="mobileMenuBtn" aria-label="메뉴"><svg aria-hidden="true" focusable="false" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg></button></div></header>
  <div class="mobile-menu-overlay" id="mobileMenu"><button type="button" class="mobile-menu-close" id="mobileClose" aria-label="닫기"><svg aria-hidden="true" focusable="false" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button><ul class="mobile-nav-list"><li><a href="../index.html#services" class="mobile-nav-link">서비스</a></li><li><a href="../index.html#projects" class="mobile-nav-link">수행 실적</a></li><li><a href="../about.html" class="mobile-nav-link">소개</a></li><li><a href="../insights.html" class="mobile-nav-link active" aria-current="page">인사이트</a></li><li><a href="../newsletter.html" class="mobile-nav-link">뉴스레터</a></li><li><a href="../about.html#contact" class="mobile-nav-link">문의</a></li></ul></div>`;

const footer = `  <footer class="footer"><div class="container"><div class="footer-top"><div class="footer-brand"><img src="../images/logo/ap-wordmark-web.png" class="footer-wordmark" alt="Ahn Partners"><div class="footer-brand-desc">AI 전환, 결정부터 실행까지</div></div><div class="footer-links"><a href="../insights.html" class="footer-link">인사이트</a><a href="../newsletter.html" class="footer-link">뉴스레터</a><a href="../about.html#contact" class="footer-link">문의</a><a href="../about.html" class="footer-link">소개</a><a href="../privacy.html" class="footer-link">개인정보 처리방침</a><a href="https://www.youtube.com/@ahn_partners" class="footer-link" target="_blank" rel="noopener">YouTube</a><a href="https://www.linkedin.com/in/chrisahn-intuition/" class="footer-link" target="_blank" rel="noopener">LinkedIn</a><a href="https://www.threads.com/@ahn_partners" class="footer-link" target="_blank" rel="noopener">Threads</a><a href="https://x.com/ahn_partners" class="footer-link" target="_blank" rel="noopener">X</a></div></div><div class="footer-bottom">&copy; 2026 Ahn&nbsp;Partners</div></div></footer>`;

function renderArticle(post) {
  const url = `${site}/insights/${post.slug}.html`;
  const tags = post.tags.map((tag) => `<meta property="article:tag" content="${escapeHtml(tag)}">`).join('\n  ');
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org', '@type': 'BlogPosting', headline: post.title,
    description: post.deck, url, mainEntityOfPage: url, datePublished: publishedIso,
    dateModified: publishedIso, articleSection: post.topic, keywords: post.tags,
    image: `${site}/images/og/insights/${post.image}?v=1`,
    author: { '@type': 'Person', name: '안병선', alternateName: 'Chris Ahn', url: `${site}/about.html` },
    publisher: { '@type': 'Organization', name: 'Ahn Partners', url: `${site}/` }
  });
  const sections = post.sections.map((section) => `<h2>${escapeHtml(section.heading)}</h2>\n${section.paragraphs.map(p).join('\n')}`).join('\n\n');
  const related = post.related.map((item) => `<article class="insight-card"><p class="card-kicker">관련 인사이트</p><h3><a href="${item.slug}.html">${escapeHtml(item.label)}</a></h3><p>${escapeHtml(item.desc)}</p><a class="card-link" href="${item.slug}.html">읽기</a></article>`).join('');
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(post.title)} | Ahn Partners</title>
  <meta name="description" content="${escapeHtml(post.deck)}">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <meta name="author" content="Ahn Partners">
  <meta name="theme-color" content="#050505">
  <link rel="icon" href="../favicon.ico" sizes="any">
  <link rel="icon" type="image/png" href="../favicon.png">
  <link rel="apple-touch-icon" href="../apple-touch-icon.png">
  <link rel="canonical" href="${url}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${url}">
  <meta property="og:title" content="${escapeHtml(post.title)} | Ahn Partners">
  <meta property="og:description" content="${escapeHtml(post.deck)}">
  <meta property="og:image" content="${site}/images/og/insights/${post.image}?v=1">
  <meta property="og:image:secure_url" content="${site}/images/og/insights/${post.image}?v=1">
  <meta property="og:image:type" content="image/jpeg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${escapeHtml(post.title)} - Ahn Partners">
  <meta property="og:site_name" content="Ahn Partners">
  <meta property="og:locale" content="ko_KR">
  <meta property="article:published_time" content="${publishedIso}">
  <meta property="article:modified_time" content="${publishedIso}">
  <meta property="article:section" content="${escapeHtml(post.topic)}">
  ${tags}
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(post.title)} | Ahn Partners">
  <meta name="twitter:description" content="${escapeHtml(post.deck)}">
  <meta name="twitter:image" content="${site}/images/og/insights/${post.image}?v=1">
  <meta name="twitter:image:alt" content="${escapeHtml(post.title)} - Ahn Partners">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;700;800&family=Noto+Serif+KR:wght@600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css">
  <link rel="stylesheet" href="insights.css">
  <script type="application/ld+json">${jsonLd}</script>
  <script src="../js/ga.js" defer></script>
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"홈","item":"${site}/"},{"@type":"ListItem","position":2,"name":"인사이트","item":"${site}/insights.html"},{"@type":"ListItem","position":3,"name":"${escapeHtml(post.title)}","item":"${url}"}]}</script>
  <link rel="alternate" type="application/rss+xml" title="Ahn Partners Insights" href="${site}/feed.xml">
</head>
<body>
${header}
  <main>
    <section class="post-hero"><div class="container"><nav class="breadcrumb" aria-label="Breadcrumb"><a href="../insights.html">인사이트</a><span>/</span><span>${escapeHtml(post.topic)}</span></nav><p class="eyebrow">${escapeHtml(post.kicker)}</p><h1 class="post-title">${escapeHtml(post.title)}</h1><p class="post-dek">${escapeHtml(post.deck)}</p><div class="post-meta"><span>${publishedText}</span><span>${post.minutes}분 읽기</span><span>Full Insight</span></div><div class="share-row"><button type="button" class="share-button" data-share="copy">링크 복사</button><button type="button" class="share-button" data-share="kakao">카카오톡 공유</button><button type="button" class="share-button" data-share="native">기기 공유</button><button type="button" class="share-button" data-share="linkedin">LinkedIn</button><button type="button" class="share-button" data-share="x">X</button></div></div></section>
    <section class="container post-layout"><article class="post-body">
      <div class="post-tldr"><p class="kicker">이 글의 핵심</p><ul>${list(post.tldr)}</ul></div>
      <div class="post-term"><span class="term-word">${escapeHtml(post.term.word)}</span><span class="term-en">${escapeHtml(post.term.en)}</span><p>${escapeHtml(post.term.desc)}</p></div>
      ${post.intro.map(p).join('\n      ')}
      ${sections}
      <div class="post-tldr"><p class="kicker">이번 주에 확인할 것</p><ul>${list(post.checklist)}</ul></div>
    </article><aside class="post-aside"><div class="aside-card"><p class="card-kicker">Ahn's Newsletter</p><p>이런 판단 기준을 매주 화요일 아침 이메일로 받아보세요.</p><a class="text-link text-link-light" href="../newsletter.html">구독하기</a></div><div class="aside-card"><p class="card-kicker">Contact</p><p>조직의 실행 경계와 운영 방식을 함께 점검하고 싶다면 문의해 주세요.</p><a class="text-link text-link-light" href="../about.html#contact">문의하기</a></div></aside></section>
    <section class="container related"><p class="eyebrow">Related</p><div class="related-grid">${related}</div></section>
  </main>
${footer}
  <script src="posts.js"></script>
  <script src="insights.js"></script>
</body>
</html>
`;
}

function newsletter({ no, date, subject, hook, title, paragraphs, questions, article, notes }) {
  const [note1, note2] = notes;
  return `<!DOCTYPE html>
<html lang="ko"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="robots" content="noindex"><title>${escapeHtml(subject)}</title></head>
<body style="margin:0;padding:0;background-color:#f2f2f0;"><div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${escapeHtml(hook)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f2f2f0;"><tr><td align="center" style="padding:32px 16px;"><table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:100%;">
<tr><td style="background-color:#050505;border-radius:20px 20px 0 0;padding:26px 36px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="font-family:'Apple SD Gothic Neo','Malgun Gothic',Arial,sans-serif;font-size:20px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">Ahn Partners</td><td align="right" style="font-family:Arial,sans-serif;font-size:11px;font-weight:700;color:#2dd4bf;letter-spacing:3px;">EXECUTIVE&nbsp;BRIEF</td></tr></table></td></tr>
<tr><td style="height:4px;background-color:#2dd4bf;background-image:linear-gradient(90deg,#2dd4bf,#f5a623);font-size:0;line-height:0;">&nbsp;</td></tr>
<tr><td style="background-color:#ffffff;padding:36px;"><p style="margin:0;font-family:Arial,sans-serif;font-size:12px;font-weight:700;color:#888888;letter-spacing:2px;">NO. ${escapeHtml(no)} &nbsp;|&nbsp; ${escapeHtml(date)}</p><p style="margin:18px 0 0;font-family:'Apple SD Gothic Neo','Malgun Gothic',Arial,sans-serif;font-size:15px;line-height:1.7;color:#0f766e;font-weight:700;word-break:keep-all;">${escapeHtml(hook)}</p><h1 style="margin:14px 0 0;font-family:'Apple SD Gothic Neo','Malgun Gothic',Arial,sans-serif;font-size:27px;line-height:1.32;color:#111111;font-weight:800;letter-spacing:-0.5px;word-break:keep-all;">${escapeHtml(title)}</h1>${paragraphs.map((text) => `<p style="margin:22px 0 0;font-family:'Apple SD Gothic Neo','Malgun Gothic',Arial,sans-serif;font-size:15.5px;line-height:1.85;color:#333333;word-break:keep-all;">${escapeHtml(text)}</p>`).join('')}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px;"><tr><td style="background-color:#f0fbf9;border-left:4px solid #2dd4bf;border-radius:0 14px 14px 0;padding:20px 24px;"><p style="margin:0;font-family:Arial,sans-serif;font-size:11px;font-weight:700;color:#0f766e;letter-spacing:2px;">CHECK</p><p style="margin:12px 0 0;font-family:'Apple SD Gothic Neo','Malgun Gothic',Arial,sans-serif;font-size:14.5px;line-height:1.8;color:#333333;word-break:keep-all;">- ${questions.map(escapeHtml).join('<br>- ')}</p></td></tr></table>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:30px auto 0;"><tr><td style="background-color:#111111;border-radius:999px;"><a href="${site}/insights/${article.slug}.html" style="display:inline-block;padding:14px 34px;font-family:'Apple SD Gothic Neo','Malgun Gothic',Arial,sans-serif;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;">${escapeHtml(article.label)}</a></td></tr></table>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:34px;border-top:1px solid #eeeeee;"><tr><td style="padding-top:22px;"><p style="margin:0;font-family:Arial,sans-serif;font-size:11px;font-weight:700;color:#888888;letter-spacing:2px;">SHORT NOTES</p><p style="margin:12px 0 0;font-family:'Apple SD Gothic Neo','Malgun Gothic',Arial,sans-serif;font-size:14px;line-height:1.8;color:#555555;word-break:keep-all;">- <a href="${site}/insights/${note1.slug}.html" style="color:#0f766e;text-decoration:underline;">${escapeHtml(note1.text)}</a><br>- <a href="${site}/insights/${note2.slug}.html" style="color:#0f766e;text-decoration:underline;">${escapeHtml(note2.text)}</a></p></td></tr></table>
<p style="margin:30px 0 0;font-family:'Apple SD Gothic Neo','Malgun Gothic',Arial,sans-serif;font-size:14.5px;line-height:1.8;color:#555555;word-break:keep-all;">읽어 주셔서 고맙습니다. 답장 주시면 다음 브리프 주제에 반영하겠습니다.<br>Chris Ahn 드림</p></td></tr>
<tr><td style="background-color:#111111;border-radius:0 0 20px 20px;padding:24px 36px;"><p style="margin:0;font-family:'Apple SD Gothic Neo','Malgun Gothic',Arial,sans-serif;font-size:12px;line-height:1.8;color:#9ca3af;word-break:keep-all;">Ahn's Executive Brief는 웹사이트에서 구독을 신청했거나 기존 업무 관계에서 뉴스레터 수신에 동의한 분께 보냅니다.<br>문의: <a href="mailto:hello@ahn-partners.net" style="color:#9ca3af;text-decoration:underline;">hello@ahn-partners.net</a> &nbsp;|&nbsp; 전체 인사이트: <a href="${site}/insights.html" style="color:#9ca3af;text-decoration:underline;">ahn-partners.net/insights</a><br>수신을 원치 않으시면 <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color:#9ca3af;text-decoration:underline;">여기에서 수신거부</a>를 눌러 주세요.</p></td></tr>
</table></td></tr></table></body></html>`;
}

fs.mkdirSync(insightsDir, { recursive: true });
fs.mkdirSync(briefsDir, { recursive: true });
for (const post of posts) fs.writeFileSync(path.join(insightsDir, `${post.slug}.html`), renderArticle(post), 'utf8');

const approval = posts.find((post) => post.slug === 'approval-boundary');
const decision = posts.find((post) => post.slug === 'decision-log');
fs.writeFileSync(path.join(briefsDir, '2026-07-21-newsletter.html'), newsletter({
  no: '018', date: '2026.07.21', subject: '답변보다 먼저, 승인 경계를 정하세요',
  hook: 'AI의 답이 좋은데도 일이 늦다면, 다음 행동의 승인자가 비어 있는지부터 보세요.',
  title: '답변보다 먼저, 승인 경계를 정하세요',
  paragraphs: [
    'AI 도입이 막히는 순간은 모델이 틀렸을 때만이 아닙니다. 답변은 충분히 괜찮은데 누가 검토하고 언제 실행할지 정해지지 않아 화면 안에 머무는 경우가 더 많습니다.',
    '이번 주 인사이트에서는 추천·검토·승인의 책임자를 한 장에 정리하는 방법을 소개합니다. 모든 예외를 상위 결재로 보내지 않으면서도 현장이 안전하게 판단할 수 있는 기준을 만드는 내용입니다.',
    '이번 주에는 자동화하려는 업무 하나를 골라 답변 뒤 첫 행동까지 걸리는 시간을 재 보세요. 병목이 모델인지 승인인지 구분하는 것만으로 다음 투자의 방향이 달라집니다.'
  ],
  questions: ['AI 답변 뒤 첫 행동의 담당자가 한 명으로 정해져 있나요?', '상위 승인이 필요한 예외 조건이 관찰 가능한 사건으로 적혀 있나요?', '반려된 결과가 어디로 돌아가고 누가 수정하는지 보이나요?'],
  article: { slug: approval.slug, label: '승인 경계 읽기' },
  notes: [{ slug: 'decision-log', text: '회의록보다 결정 로그가 조직을 빠르게 만듭니다' }, { slug: 'training-last-mile', text: 'AI 교육의 성과는 다음 회의의 질문입니다' }]
}), 'utf8');
fs.writeFileSync(path.join(briefsDir, '2026-07-23-newsletter.html'), newsletter({
  no: '019', date: '2026.07.23', subject: '회의록을 줄이고 결정 로그를 남기세요',
  hook: '대화는 길어지는데 같은 질문이 반복된다면, 선택의 흔적이 남아 있지 않은 것입니다.',
  title: '회의록을 줄이고 결정 로그를 남기세요',
  paragraphs: [
    '회의록은 맥락을 보존하지만, 실행을 시작할 사람에게 필요한 선택과 다음 행동을 빠르게 보여 주지는 못합니다. 그래서 회의가 끝나도 지난번 결정을 다시 찾는 시간이 생깁니다.',
    '이번 주에는 선택지·판단 기준·첫 행동의 담당자·재검토 조건 네 칸만 남기는 결정 로그를 소개합니다. 짧은 기록이 쌓이면 어떤 기준으로 결정했고 무엇을 놓쳤는지 다시 확인할 수 있습니다.',
    '반복해서 되돌아오는 안건 하나를 골라 첫 로그를 써 보세요. 잘못된 판단을 지우지 않고 남겨야 다음 회의의 질문이 더 정확해집니다.'
  ],
  questions: ['이번 안건의 선택지가 한 문장으로 요약되나요?', '첫 행동의 담당자가 팀 전체가 아닌 한 명으로 적혀 있나요?', '다시 판단할 신호가 날짜가 아닌 사건으로 정의됐나요?'],
  article: { slug: decision.slug, label: '결정 로그 읽기' },
  notes: [{ slug: 'metric-owner', text: '대시보드에 숫자보다 먼저 적어야 할 담당자' }, { slug: 'exception-path', text: '자동화가 예외 흐름에서 무너지는 이유' }]
}), 'utf8');

// newsletter-plan-2026-07-20.md is maintained as a reviewed artifact.
console.log(`generated ${posts.length} insight pages and 2 newsletter drafts`);
