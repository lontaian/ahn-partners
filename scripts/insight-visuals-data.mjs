export const INSIGHT_VISUAL_VERSION = '20260721-2';

export const INSIGHT_VISUALS = [
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
  }
];

export const INSIGHT_VISUALS_BY_SLUG = new Map(INSIGHT_VISUALS.map((item) => [item.slug, item]));
