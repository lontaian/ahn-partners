export const INSIGHT_VISUAL_VERSION = '20260721-2';

export const INSIGHT_VISUALS = [
  {
    slug: 'hindsight-bias-review', category: 'ORG AND PEOPLE', layout: 'compare', composition: 'split',
    title: "'그럴 줄 알았다'가 나오는 회고 회의",
    thesis: '결과를 알고 보면 당시의 판단 난이도가 사라집니다.',
    items: [{ label: '결과 공개 먼저', detail: '그럴 줄 알았다' }, { label: '상황 복원 먼저', detail: '그때는 무엇이 보였나' }]
  },
  {
    slug: 'parkinsons-law-deadline', category: 'WORKFLOW', layout: 'ratio', composition: 'split',
    title: '일정을 넉넉하게 줄수록 늦어지는 이유',
    thesis: '일은 주어진 시간을 채울 때까지 늘어납니다.',
    items: [{ label: '넉넉한 일정', detail: '범위와 회의가 늘어난다' }, { label: '짧은 마감', detail: '핵심만 남는다' }]
  },
  {
    slug: 'ai-executive-misconception', category: 'AI STRATEGY', layout: 'compare', composition: 'split',
    title: 'AI 전환에서 경영진이 가장 많이 하는 착각',
    thesis: '도구 선택보다 반복되는 판단의 병목이 먼저입니다.',
    items: [{ label: '도구 목록', detail: '무엇을 살 것인가' }, { label: '판단 병목', detail: '무엇이 왜 멈추는가' }]
  },
  {
    slug: 'ai-strategy-execution', category: 'AI STRATEGY', layout: 'flow', composition: 'reverse',
    title: 'AI 전략이 실행되지 않는 이유',
    thesis: '전략은 실행 단위로 내려와야 움직입니다.',
    items: [{ label: '전략' }, { label: '실행 단위' }, { label: '책임자' }, { label: '데이터' }]
  },
  {
    slug: 'ax-education-design', category: 'AX EDUCATION', layout: 'loop', composition: 'vertical',
    title: 'AX 교육을 업무 전환으로 설계하는 법',
    thesis: '교육의 끝이 아니라 다음 업무가 전환의 시작입니다.',
    items: [{ label: '학습' }, { label: '첫 업무' }, { label: '피드백' }, { label: '재사용' }]
  },
  {
    slug: 'dashboard-decision-gap', category: 'DATA DECISION', layout: 'flow', composition: 'split',
    title: '대시보드는 늘어나는데 결정은 그대로인 이유',
    thesis: '숫자에는 다음 행동이 붙어야 합니다.',
    items: [{ label: '지표' }, { label: '임계값' }, { label: '담당자' }, { label: '행동' }]
  },
  {
    slug: 'data-that-pays', category: 'DATA DECISION', layout: 'compare', composition: 'reverse',
    title: '쌓이는 데이터와 돈이 되는 데이터는 다릅니다',
    thesis: '결정을 바꾸지 못하는 데이터는 자산이 아니라 비용입니다.',
    items: [{ label: '쌓이는 데이터', detail: '저장량이 늘어납니다' }, { label: '돈이 되는 데이터', detail: '선택이 달라집니다' }]
  },
  {
    slug: 'erp-in-house-lessons', category: 'OPERATING SYSTEM', layout: 'stack', composition: 'vertical',
    title: '패키지 ERP를 버리고 직접 만들며 배운 것',
    thesis: '오래 남는 것은 코드보다 글로 쓰인 업무 규칙입니다.',
    items: [{ label: '화면과 코드' }, { label: '업무 규칙' }, { label: '운영 소유권' }]
  },
  {
    slug: 'exception-work-first', category: 'WORKFLOW', layout: 'branch', composition: 'split',
    title: '반복 업무보다 예외 업무가 진짜 비용입니다',
    thesis: '자동화는 정상 경로가 아니라 예외에서 무너집니다.',
    items: [{ label: '정상 경로', detail: '빠르게 통과' }, { label: '예외 경로', detail: '사람의 복구' }, { label: '재작업', detail: '숨은 비용' }]
  },
  {
    slug: 'executive-vibe-coding', category: 'AX EDUCATION', layout: 'loop', composition: 'reverse',
    title: '임원이 직접 만들어 본 뒤에야 보이는 것들',
    thesis: '직접 만들어 본 경험이 도구를 보는 판단을 바꿉니다.',
    items: [{ label: '직접 만들기' }, { label: '한계 발견' }, { label: '업무 대입' }, { label: '판단 변화' }]
  },
  {
    slug: 'first-customer-first', category: 'NEW BUSINESS', layout: 'timeline', composition: 'vertical',
    title: '투자자보다 첫 고객이 먼저입니다',
    thesis: '투자는 검증 수단이 아니라 검증된 수요의 증폭 수단입니다.',
    items: [{ label: '문제' }, { label: '첫 결제' }, { label: '반복 사용' }, { label: '투자' }]
  },
  {
    slug: 'hydrogen-new-business-execution', category: 'NEW BUSINESS', layout: 'ratio', composition: 'split',
    title: '100억 수소충전소에서 배운 신사업 실행의 순서',
    thesis: '기술 검토보다 부지·인허가·주민·운영 준비가 더 컸습니다.',
    items: [{ label: '기술 검토', value: '2할' }, { label: '실행 조건', value: '8할' }]
  },
  {
    slug: 'outsourced-system-neglect', category: 'OPERATING SYSTEM', layout: 'timeline', composition: 'reverse',
    title: '외주로 만든 시스템이 1년 뒤 방치되는 이유',
    thesis: '수정할 손과 권한이 회사 안에 남아야 합니다.',
    items: [{ label: '납품' }, { label: '수정 요청' }, { label: '담당자 부재' }, { label: '방치' }]
  },
  {
    slug: 'promotion-trap', category: 'PEOPLE & ORG', layout: 'matrix', composition: 'vertical',
    title: '일 잘하는 사람을 승진시키면 두 번 잃습니다',
    thesis: '실무 성과와 관리 역량은 같은 축이 아닙니다.',
    items: [{ label: '실무 성과' }, { label: '관리 역량' }, { label: '보상' }, { label: '직책' }]
  },
  {
    slug: 'quiet-exit', category: 'PEOPLE & ORG', layout: 'signal', composition: 'split',
    title: '에이스는 퇴사 통보 전에 먼저 조용해집니다',
    thesis: '사직서는 마지막 신호입니다.',
    items: [{ label: '질문 감소' }, { label: '의견 철회' }, { label: '관계 정리' }, { label: '퇴사 통보' }]
  },
  {
    slug: 'safe-failure', category: 'AX EDUCATION', layout: 'loop', composition: 'reverse',
    title: '잘 크는 주니어는 일찍 틀려본 주니어입니다',
    thesis: '안전한 작은 실패가 실제 역량을 만듭니다.',
    items: [{ label: '작은 실패' }, { label: '피드백' }, { label: '재시도' }, { label: '성장' }]
  },
  {
    slug: 'silent-shelving', category: 'AI STRATEGY', layout: 'branch', composition: 'vertical',
    title: 'AI 도입 프로젝트 열에 아홉은 성과 없이 끝납니다',
    thesis: '성공과 실패보다 위험한 끝은 조용한 폐기입니다.',
    items: [{ label: '성공 판정' }, { label: '실패 판정' }, { label: '조용한 폐기' }]
  },
  {
    slug: 'table-note-service-operations', category: 'TABLE NOTE', layout: 'stack', composition: 'split', accent: 'amber',
    title: '좋은 식당은 운영이 보입니다',
    thesis: '좋은 경험은 감각이 아니라 반복 가능한 운영에서 나옵니다.',
    items: [{ label: '주문' }, { label: '주방' }, { label: '서빙' }, { label: '기억' }]
  },
  {
    slug: 'table-note-empty-table', category: 'TABLE NOTE', layout: 'flow', composition: 'reverse', accent: 'amber',
    title: '빈 테이블은 내일 다시 팔 수 없습니다',
    thesis: '예약금보다 취소 시점과 좌석 재판매율을 보십시오.',
    items: [{ label: '예약' }, { label: '빠른 취소' }, { label: '대기 고객' }, { label: '좌석 재판매' }]
  },
  {
    slug: 'table-note-wine-inventory', category: 'TABLE NOTE', layout: 'ratio', composition: 'vertical', accent: 'amber',
    title: '팔리지 않는 와인은 취향이 아니라 묶인 현금입니다',
    thesis: '와인 한 병의 생산성은 마진과 회전율이 함께 만듭니다.',
    items: [{ label: '병당 마진', value: '가격의 성과' }, { label: '재고 회전', value: '선택의 성과' }]
  },
  {
    slug: 'table-note-menu-labor', category: 'TABLE NOTE', layout: 'matrix', composition: 'split', accent: 'amber',
    title: '잘 팔리는 메뉴가 반드시 많이 남기는 메뉴는 아닙니다',
    thesis: '접시의 이익에서 주방이 쓴 시간을 빼야 진짜 손익이 보입니다.',
    items: [{ label: '판매량' }, { label: '식재료비' }, { label: '조리시간' }, { label: '병목 점유' }]
  },
  {
    slug: 'table-note-meal-pace', category: 'TABLE NOTE', layout: 'timeline', composition: 'reverse', accent: 'amber',
    title: '빨리 치운다고 테이블이 빨리 도는 것은 아닙니다',
    thesis: '식사는 서두르지 않고 주문과 계산의 대기만 줄이십시오.',
    items: [{ label: '착석·주문', value: '대기 단축' }, { label: '식사 중', value: '흐름 유지' }, { label: '계산', value: '즉시 처리' }]
  },
  {
    slug: 'workflow-analysis-before-ai', category: 'WORKFLOW', layout: 'timeline', composition: 'reverse',
    title: 'AI 도입 전 먼저 봐야 할 업무 병목 지도',
    thesis: '시간이 새는 곳은 일하는 구간보다 기다리는 구간입니다.',
    items: [{ label: '작업' }, { label: '대기' }, { label: '승인' }, { label: '예외' }]
  },
  {
    slug: 'approval-boundary', category: 'AI OPERATING MODEL', layout: 'flow', composition: 'split',
    title: 'AI는 샀는데 결재판은 그대로인 회사',
    thesis: '병목은 모델이 아니라 답을 행동으로 바꾸는 권한입니다.',
    items: [{ label: 'AI 초안', value: '10분' }, { label: '승인 대기', value: '3일' }, { label: '실제 실행' }]
  },
  {
    slug: 'decision-log', category: 'DECISION MEMORY', layout: 'matrix', composition: 'reverse',
    title: '회의록에는 있는데 회사에는 없는 것',
    thesis: '발언보다 선택의 이유가 조직의 기억이 됩니다.',
    items: [{ label: '선택한 안' }, { label: '버린 안' }, { label: '판단 근거' }, { label: '재검토 신호' }]
  },
  {
    slug: 'exception-path', category: 'AUTOMATION ECONOMICS', layout: 'ratio', composition: 'vertical',
    title: '자동화 ROI는 예외 한 건의 처리 시간에서 갈립니다',
    thesis: '건수보다 사람에게 돌아온 한 건의 시간을 보십시오.',
    items: [{ label: '정상 95건', value: '몇 초' }, { label: '예외 5건', value: '건당 30분' }]
  },
  {
    slug: 'metric-owner', category: 'METRICS THAT MOVE', layout: 'flow', composition: 'split',
    title: '담당자 없는 KPI는 숫자가 아니라 구경거리입니다',
    thesis: '지표가 행동으로 이어지는 네 가지 연결입니다.',
    items: [{ label: '지표' }, { label: '임계값' }, { label: '담당자' }, { label: '첫 행동' }]
  },
  {
    slug: 'repeat-behavior', category: 'DEMAND SIGNAL', layout: 'signal', composition: 'reverse',
    title: '고객의 칭찬보다 다음 예약이 더 정직합니다',
    thesis: '말보다 비용을 치른 다음 행동이 강한 수요 신호입니다.',
    items: [{ label: '칭찬' }, { label: '다음 예약' }, { label: '선결제' }, { label: '동료 추천' }]
  },
  {
    slug: 'vendor-handoff', category: 'ACCEPTANCE TEST', layout: 'flow', composition: 'vertical',
    title: '외주 시스템의 진짜 납품일은 운영자가 혼자 복구한 날입니다',
    thesis: '정상 시연보다 내부 운영자의 단독 복구가 검수 기준입니다.',
    items: [{ label: '장애 발생' }, { label: '운영자 단독 복구' }, { label: '납품 완료' }]
  },
  {
    slug: 'training-last-mile', category: 'LEARNING TRANSFER', layout: 'timeline', composition: 'split',
    title: 'AI 교육이 실패하는 이유는 교육 뒤 첫 업무가 없어서입니다',
    thesis: '교육 이후 첫 산출물과 재사용까지 설계해야 합니다.',
    items: [{ label: '교육 종료' }, { label: '첫 산출물', value: '7일' }, { label: '재사용', value: '30일' }]
  },
  {
    slug: 'deletion-budget', category: 'AI CODE LIABILITY', layout: 'stack', composition: 'reverse',
    title: 'AI로 빨리 만든 코드는 언제 지울지부터 정해야 합니다',
    thesis: '싼 생성 뒤에는 오래 남는 운영비가 따라옵니다.',
    items: [{ label: '생성비' }, { label: '검토비' }, { label: '운영비' }, { label: '삭제비' }]
  },
  {
    slug: 'question-debt', category: 'SILENCE RISK', layout: 'signal', composition: 'vertical',
    title: '질문 없는 팀은 정렬된 팀이 아니라 포기한 팀일 수 있습니다',
    thesis: '침묵은 합의가 아니라 질문을 포기한 결과일 수 있습니다.',
    items: [{ label: '질문 감소' }, { label: '가정 고착' }, { label: '재작업 증가' }]
  },
  {
    slug: 'experiment-budget', category: 'CHEAP TRUTH', layout: 'branch', composition: 'split',
    title: '신사업 예산은 성공이 아니라 오답을 사는 돈입니다',
    thesis: '좋은 실험은 다음 큰 투자를 막거나 정당화합니다.',
    items: [{ label: '가설' }, { label: '관찰' }, { label: '계속' }, { label: '수정' }, { label: '중단' }]
  },
  {
    slug: 'ai-training-behavior-protocol', category: 'BEHAVIOR PROTOCOL', layout: 'loop', composition: 'vertical',
    title: 'AI 교육은 버튼이 아니라 작업 순서를 바꿔야 남습니다', thesis: '질문부터 수정까지 반복 가능한 순서를 훈련합니다.',
    items: [{ label: '질문' }, { label: '초안' }, { label: '검증' }, { label: '수정' }]
  },
  {
    slug: 'workaround-signal', category: 'WORKAROUND SIGNAL', layout: 'branch', composition: 'reverse',
    title: '현장 엑셀은 규정 위반이 아니라 시스템 결함의 신고서입니다', thesis: '금지하기 전에 우회 작업이 복구한 능력을 봅니다.',
    items: [{ label: '현장 우회' }, { label: '유지' }, { label: '시스템 흡수' }, { label: '안전한 폐기' }]
  },
  {
    slug: 'interruption-recovery-time', category: 'RECOVERY TIME', layout: 'timeline', composition: 'split',
    title: '급한 일을 먼저 처리할수록 중요한 일이 더 늦어집니다', thesis: '3분짜리 알림 뒤에는 보이지 않는 복귀 시간이 남습니다.',
    items: [{ label: '집중 업무' }, { label: '중단', value: '3분' }, { label: '맥락 복구', value: '15분' }, { label: '다음 행동' }]
  },
  {
    slug: 'forecast-action-rule', category: 'DECISION UNDER LOSS', layout: 'ratio', composition: 'reverse',
    title: '예측 범위를 보여 줘도 결정은 저절로 좋아지지 않습니다', thesis: '예측은 숫자이고 결정은 오류 비용의 선택입니다.',
    items: [{ label: '과잉 비용', value: '재고·폐기' }, { label: '부족 비용', value: '품절·이탈' }]
  },
  {
    slug: 'restore-drill', category: 'RECOVERY PROOF', layout: 'flow', composition: 'split',
    title: '백업 성공 알림은 복구 성공 증명이 아닙니다', thesis: '저장 완료가 아니라 업무 복구까지 시험합니다.',
    items: [{ label: '백업' }, { label: '운영자 복원' }, { label: '현업 검증' }, { label: '업무 재개' }]
  },
  {
    slug: 'actionable-alert', category: 'ACTIONABLE ALERT', layout: 'signal', composition: 'vertical',
    title: '알람을 늘릴수록 중요한 장애에 늦게 반응합니다', thesis: '첫 행동이 없는 알람은 신호가 아니라 소음입니다.',
    items: [{ label: '잡음' }, { label: '행동 가능 신호' }, { label: '담당자' }, { label: '첫 행동' }]
  },
  {
    slug: 'knowledge-concentration', category: 'KNOWLEDGE CONCENTRATION', layout: 'matrix', composition: 'split',
    title: '한 사람만 아는 업무는 전문성이 아니라 중단 위험입니다', thesis: '문서보다 독립적으로 끝낼 수 있는 사람을 셉니다.',
    items: [{ label: '관찰' }, { label: '공동 수행' }, { label: '단독 수행' }, { label: '복기' }]
  },
  {
    slug: 'coaching-capacity', category: 'COACHING CAPACITY', layout: 'timeline', composition: 'reverse',
    title: '관리자의 일정표에 코칭 시간이 없으면 육성 계획도 없습니다', thesis: '관찰과 재시도를 위한 시간을 업무 용량에 넣습니다.',
    items: [{ label: '과업 관찰' }, { label: '행동 피드백' }, { label: '다음 시도' }, { label: '독립 판단' }]
  },
  {
    slug: 'second-customer-test', category: 'SECOND CUSTOMER TEST', layout: 'compare', composition: 'vertical',
    title: '첫 고객의 요구를 제품 전략으로 착각하지 마십시오', thesis: '첫 계약은 문제를, 두 번째 유사 계약은 반복을 증명합니다.',
    items: [{ label: '첫 고객', value: '맞춤 요구' }, { label: '두 번째 고객', value: '반복 가능성' }]
  },
  {
    slug: 'budget-for-things-that-do-not-show', category: 'OPERATING SYSTEM', layout: 'compare', composition: 'split',
    title: '사고를 막으면 아무도 모릅니다',
    thesis: '청구서가 있는 복구가 기록 없는 예방 예산을 이깁니다.',
    items: [{ label: '복구 비용', detail: '청구서가 남는다' }, { label: '예방 효과', detail: '기록이 남지 않는다' }]
  },
  {
    slug: 'customer-who-asks-for-a-feature', category: 'WORKFLOW', layout: 'compare', composition: 'split',
    title: '요구는 기능으로 오지만 문제는 업무에 있습니다',
    thesis: '무엇에 쓰는지 물으면 요구의 절반이 다른 모양으로 바뀝니다.',
    items: [{ label: '기능 요구', detail: '화면마다 버튼' }, { label: '업무 실제', detail: '월말 표 하나' }]
  },
  {
    slug: 'data-we-cannot-take-with-us', category: 'OPERATING SYSTEM', layout: 'compare', composition: 'split',
    title: '데이터가 우리 것이 아니었습니다',
    thesis: '소유권이 있어도 읽을 수 없으면 우리 것이 아닙니다.',
    items: [{ label: '계약서 소유권', detail: '자산이라 적혀 있다' }, { label: '실질 접근권', detail: '만든 쪽만 읽는다' }]
  },
  {
    slug: 'exception-rate-not-automation-rate', category: 'AUTOMATION ECONOMICS', layout: 'ratio', composition: 'split',
    title: '자동화율 구십 퍼센트의 함정',
    thesis: '자동화율 옆에 예외율과 처리 시간이 없으면 실제 비용을 알 수 없습니다.',
    items: [{ label: '자동화율', value: '보이는 숫자' }, { label: '예외 처리 시간', value: '숨은 비용' }]
  },
  {
    slug: 'first-hire-for-a-new-business', category: 'NEW BUSINESS', layout: 'timeline', composition: 'vertical',
    title: '신사업 첫 채용에서 보는 것',
    thesis: '첫 사람의 성과는 결과가 아니라 문제 목록입니다.',
    items: [{ label: '탐색가 먼저' }, { label: '문제 목록 완성' }, { label: '전문가 채용' }]
  },
  {
    slug: 'handover-to-operations', category: 'OPERATING SYSTEM', layout: 'flow', composition: 'vertical',
    title: '문서를 개발팀이 쓰지 않고 운영팀이 씁니다',
    thesis: '받는 쪽이 쓰면 모르는 것이 드러나고 만드는 쪽이 쓰면 당연한 것이 빠집니다.',
    items: [{ label: '운영팀 초안' }, { label: '개발팀 교정' }, { label: '장애 동행' }, { label: '단독 복구' }]
  },
  {
    slug: 'kpi-that-changes-behavior', category: 'METRICS THAT MOVE', layout: 'compare', composition: 'split',
    title: '지표를 바꿨더니 행동이 바뀌었습니다',
    thesis: '무엇을 재는지가 현장이 무엇을 포기하는지를 정합니다.',
    items: [{ label: '처리 건수', detail: '빠른 것 먼저 잡는다' }, { label: '재발률', detail: '원인부터 찾는다' }]
  },
  {
    slug: 'legacy-system-that-still-runs', category: 'OPERATING SYSTEM', layout: 'compare', composition: 'vertical',
    title: '낡은 것과 위험한 것은 다릅니다',
    thesis: '오래됐다는 것은 교체 근거가 아니라 버텼다는 증거입니다.',
    items: [{ label: '기술 노후', detail: '오래 버텼다' }, { label: '업무 변화', detail: '교체 근거' }]
  },
  {
    slug: 'meeting-that-decides-nothing', category: 'DECISION MEMORY', layout: 'branch', composition: 'split',
    title: '결론이 안 나는 회의는 두 가지 중 하나입니다',
    thesis: '결정할 사람이 없거나 정보가 없거나, 어느 쪽인지 먼저 가릅니다.',
    items: [{ label: '결정자 없음', detail: '권한 없는 자리' }, { label: '정보 없음', detail: '자료 없는 결정 압박' }]
  },
  {
    slug: 'pilot-that-cannot-fail', category: 'NEW BUSINESS', layout: 'compare', composition: 'split',
    title: '실패하면 안 되는 시범사업은 시범이 아닙니다',
    thesis: '잘될 조건만 고른 시범은 확대 판단에 쓸 수 없습니다.',
    items: [{ label: '배우는 시범', detail: '나쁜 조건 포함' }, { label: '증명하는 시범', detail: '좋은 조건만 선택' }]
  },
  {
    slug: 'reporting-line-that-slows-everything', category: 'SILENCE RISK', layout: 'stack', composition: 'vertical',
    title: '보고 단계가 하나 늘면 정보가 줄어듭니다',
    thesis: '단계마다 요약되면서 원인이 지워지고 결론만 남습니다.',
    items: [{ label: '현장 원문' }, { label: '중간 요약' }, { label: '임원 보고' }]
  },
  {
    slug: 'saying-no-to-a-good-idea', category: 'DECISION MEMORY', layout: 'compare', composition: 'split',
    title: '좋은 아이디어를 거절하는 법',
    thesis: '안 한다와 지금은 아니다는 다른 결정이고, 날짜가 그 차이를 만듭니다.',
    items: [{ label: '안 한다', detail: '영구 거절' }, { label: '지금은 아니다', detail: '날짜 붙인 보류' }]
  },
  {
    slug: 'spec-that-changes-after-signing', category: 'OPERATING SYSTEM', layout: 'flow', composition: 'split',
    title: '요구는 반드시 바뀝니다',
    thesis: '변경 창구와 월 한도를 계약에 넣으면 거절 대신 순서가 됩니다.',
    items: [{ label: '변경 요청' }, { label: '월 한도 배정' }, { label: '우선순위 결정' }, { label: '대기 목록' }]
  },
  {
    slug: 'technical-debt-in-business-terms', category: 'OPERATING SYSTEM', layout: 'compare', composition: 'split',
    title: '기술 부채라는 말을 임원에게 쓰지 않습니다',
    thesis: '기술 용어 대신 같은 일이 세 배 걸린다는 문장이 결정을 만듭니다.',
    items: [{ label: '기술 용어', detail: '설명이 필요하다' }, { label: '업무 숫자', detail: '그 자리에서 결정 난다' }]
  },
  {
    slug: 'three-risks-not-forty', category: 'NEW BUSINESS', layout: 'ratio', composition: 'vertical',
    title: '위험 서른 개가 있으면 아무도 보지 않습니다',
    thesis: '서른네 개 목록은 아무도 보지 않고, 셋만 남겼을 때 담당자가 끝까지 봤습니다.',
    items: [{ label: '전체 목록', value: '분기 검토' }, { label: '핵심 위험', value: '매주 확인' }]
  }
];

export const INSIGHT_VISUALS_BY_SLUG = new Map(INSIGHT_VISUALS.map((item) => [item.slug, item]));
