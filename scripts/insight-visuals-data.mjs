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
  },
  {
    slug: 'organizational-silence', category: 'SILENCE RISK', layout: 'signal', composition: 'vertical',
    title: '나쁜 소식에 한 번 부정적으로 반응하면 팀원은 다음 소식을 숨깁니다',
    thesis: '침묵은 용기가 없어서가 아니라 말했을 때 어떤 일이 생기는지를 이미 학습한 결과입니다.',
    items: [{ label: '나쁜 소식 보고' }, { label: '부정적 반응' }, { label: '다음 소식 차단' }, { label: '문제 수면 아래 축적' }]
  },
  {
    slug: 'hiring-learning-speed', category: 'ORG AND PEOPLE', layout: 'compare', composition: 'split',
    title: '경력이 길어도 역할이 3년 뒤 달라질 자리에서는 학습 속도가 더 중요합니다',
    thesis: '채용 결정이 과거 경험에만 의존할 때 조직 환경 변화 속도가 그 경험의 유효 기간을 결정합니다.',
    items: [{ label: '경력 연수 기준', detail: '환경이 안정적일 때 유효하다' }, { label: '학습 속도 기준', detail: '역할이 빠르게 바뀔 때 더 강하게 작동한다' }]
  },
  {
    slug: 'measurement-trap-goodhart', category: 'METRICS THAT MOVE', layout: 'compare', composition: 'reverse',
    title: '지표가 목표가 되는 순간 그 지표는 좋은 지표이기를 멈춥니다',
    thesis: '지표를 달성하는 가장 쉬운 방법이 실제 성과를 내는 것과 일치하지 않을 때 구성원은 지표를 최적화하고 실제 목표를 잊습니다.',
    items: [{ label: '정보 지표', detail: '실제 상태를 파악한다' }, { label: '달성 목표', detail: '우회 방법이 생긴다' }]
  },
  {
    slug: 'intuition-vs-data-decision', category: 'DATA DECISION', layout: 'matrix', composition: 'split',
    title: '직관이 데이터를 이기는 상황과 데이터가 직관을 대체해야 하는 상황은 다릅니다',
    thesis: '직관이 형성된 환경과 지금 환경이 유사한지를 먼저 확인해야 직관과 데이터 중 어느 쪽에 더 비중을 둘지 결정할 수 있습니다.',
    items: [{ label: '환경 유사성' }, { label: '측정 가능성' }, { label: '직관 우세' }, { label: '데이터 우세' }]
  },
  {
    slug: 'organizational-forgetting', category: 'DECISION MEMORY', layout: 'branch', composition: 'split',
    title: '인수인계 문서에 절차는 남지만 왜 그 절차인지는 사라집니다',
    thesis: '결과만 기록하고 이유를 버리는 것이 조직의 기본 설정이고 이를 바꾸려면 의도적인 구조가 필요합니다.',
    items: [{ label: '절차와 양식', detail: '남는다' }, { label: '판단 근거', detail: '사라진다' }, { label: '실패 이유', detail: '다시 반복된다' }]
  },
  {
    slug: 'curse-of-knowledge', category: 'AI OPERATING MODEL', layout: 'flow', composition: 'split',
    title: '전문가가 설명량을 늘릴수록 경영진이 필요한 정보와 멀어집니다',
    thesis: '경영진에게 필요한 정보는 기술적 정확성이 아니라 지금 하지 않으면 발생하는 비용과 하면 생기는 변화입니다.',
    items: [{ label: '기술 세부 설명' }, { label: '경영진 혼란' }, { label: '추가 자료 요청' }, { label: '결정 연기' }]
  },
  {
    slug: 'reward-decoupled-from-title', category: 'PEOPLE & ORG', layout: 'stack', composition: 'vertical',
    title: '보상과 직책이 같은 경로에 있으면 전문가도 관리자가 되어야 합니다',
    thesis: '보상 경로와 직책 경로를 분리하면 전문가가 관리자가 되지 않아도 성장할 수 있습니다.',
    items: [{ label: '전문 역량' }, { label: '직책 승진 압박' }, { label: '관리 역할 불일치' }]
  },
  {
    slug: 'speed-paradox-reversible-decisions', category: 'DECISION MEMORY', layout: 'ratio', composition: 'split',
    title: '바꿀 수 있는 결정을 신중하게 처리할수록 바꿔야 할 결정이 늦어집니다',
    thesis: '되돌릴 수 있는 결정은 빠르게 실행하고 결과로 배우며, 되돌릴 수 없는 결정은 검토를 두 번 거쳐야 합니다.',
    items: [{ label: '되돌릴 수 있는 결정', value: '빠르게 실행' }, { label: '되돌릴 수 없는 결정', value: '충분한 검토' }]
  },
  {
    slug: 'report-vs-work', category: 'PEOPLE & ORG', layout: 'compare', composition: 'vertical',
    title: '관리자가 보지 못한 성과는 보고된 성과로 대체됩니다',
    thesis: '결과 지표가 없는 평가 환경에서 보고 빈도와 품질이 성과 대리 지표가 됩니다.',
    items: [{ label: '보고 기반 평가', detail: '가시성이 높을수록 유리하다' }, { label: '결과 기반 평가', detail: '실제 기여도가 드러난다' }]
  },
  {
    slug: 'sunk-cost-project', category: 'NEW BUSINESS', layout: 'timeline', composition: 'vertical',
    title: '이미 쓴 돈이 앞으로의 결정에 영향을 주는 순간 판단이 오염됩니다',
    thesis: '매몰비용은 이미 돌이킬 수 없고, 계속 여부의 기준은 앞으로 더 쓸 비용과 앞으로 얻을 가치의 비교뿐입니다.',
    items: [{ label: '투자 시작' }, { label: '경고 신호' }, { label: '매몰비용 심리' }, { label: '추가 손실' }]
  },
  {
    slug: 'new-business-betting-learning-speed', category: 'NEW BUSINESS', layout: 'compare', composition: 'split',
    title: '신사업 초기 자본 배분에서 중요한 것은 베팅 규모가 아닙니다',
    thesis: '얼마나 확신하는가가 아니라 얼마나 빨리 검증할 수 있는가가 초기 자본 배분의 기준입니다.',
    items: [{ label: '베팅 규모 기준', detail: '얼마나 확신하는가' }, { label: '학습 속도 기준', detail: '얼마나 빨리 검증하는가' }]
  },
  {
    slug: 'technical-debt-capital-allocation', category: 'CAPITAL', layout: 'flow', composition: 'split',
    title: '기술부채 상환 예산은 부채 총량이 아니라 다음 사업과의 충돌로 결정합니다',
    thesis: '사업 계획과 기술부채 지도를 같은 회의에서 펼치면 예산 배정 논리가 달라집니다.',
    items: [{ label: '다음 사업 계획' }, { label: '충돌 부채 확인' }, { label: '선 상환' }, { label: '개발 일정 확보' }]
  },
  {
    slug: 'meetings-signal-distrust', category: 'LEADERSHIP', layout: 'compare', composition: 'split',
    title: '회의가 많은 조직에는 두 종류가 있습니다',
    thesis: '결정을 받으러 모이는 팀에서 회의를 없애면 결정 경로가 막혀 팀이 멈춥니다.',
    items: [{ label: '정보 공유 회의', detail: '줄여도 팀이 움직인다' }, { label: '결정 허락 회의', detail: '없애면 팀이 멈춘다' }]
  },
  {
    slug: 'hydrogen-station-chicken-egg', category: 'NEW BUSINESS', layout: 'loop', composition: 'vertical',
    title: '수소충전소와 수소차는 서로를 기다립니다',
    thesis: '수요와 공급이 서로를 결정하는 구조에서 사업계획서에 필요한 것은 교착을 깨는 순서 설계입니다.',
    items: [{ label: '수소차 수요 부족' }, { label: '충전소 추가 지연' }, { label: '충전소 밀도 부족' }, { label: '수소차 구매 지연' }]
  },
  {
    slug: 'ace-leaves-quietly', category: 'TALENT', layout: 'signal', composition: 'vertical',
    title: '에이스가 떠나기 전 먼저 조용해집니다',
    thesis: '이탈 결정은 통보 12개월 전 세 가지 행동 변화로 시작됩니다.',
    items: [{ label: '자발적 기여 감소' }, { label: '관계망 변화' }, { label: '지식 정리 시작' }, { label: '퇴사 통보' }]
  },
  {
    slug: 'smart-city-real-bottleneck', category: 'OPERATIONS', layout: 'stack', composition: 'vertical',
    title: '관제 시스템을 켜도 운영이 바뀌지 않는 이유',
    thesis: '스마트시티의 진짜 병목은 기술이 아니라 결정 기준과 권한과 책임의 부재입니다.',
    items: [{ label: '결정 기준' }, { label: '결정 권한' }, { label: '책임 구조' }]
  },
  {
    slug: 'bottleneck-code-to-goal', category: 'TECHNOLOGY', layout: 'compare', composition: 'split',
    title: '개발이 느린 게 아니라 무엇을 만들지 결정이 안 된 것이 병목입니다',
    thesis: '병목이 코드 이전에 있으면 인력을 더 넣어도 속도가 나지 않습니다.',
    items: [{ label: '코드 병목', detail: '인력과 툴이 해법이다' }, { label: '목표 병목', detail: '기획 프로세스가 해법이다' }]
  },
  {
    slug: 'ax-code-immersion-trap', category: 'AX', layout: 'flow', composition: 'reverse',
    title: 'AI 도구를 너무 잘 이해하면 해결하려던 문제를 잊게 됩니다',
    thesis: '구현 이해도가 높아지는 것과 업무 문제 해결이 가까워지는 것은 같은 방향이 아닙니다.',
    items: [{ label: '업무 문제 정의' }, { label: '구현 몰입' }, { label: '기술 과제 집중' }, { label: '업무 개선 없음' }]
  },
  {
    slug: 'planning-dev-boundary', category: 'OPERATIONS', layout: 'timeline', composition: 'split',
    title: '기획이 끝난 뒤에도 요구사항이 바뀌는 조직의 공통점',
    thesis: '결정이 빠진 채 개발이 시작되면 요구사항 변경 비용이 단계마다 크게 늘어납니다.',
    items: [{ label: '기획 단계', value: '비용 1' }, { label: '개발 단계', value: '비용 10배' }, { label: '테스트 단계', value: '수십 배' }]
  },
  {
    slug: 'build-vs-buy-kr', category: 'TECHNOLOGY', layout: 'ratio', composition: 'vertical',
    title: 'ERP를 직접 만들겠다는 결정이 3년 뒤 예산을 두 배로 만드는 이유',
    thesis: '운영 지원 소프트웨어에서 자체 개발의 경쟁 우위는 대부분 1년 안에 사라집니다.',
    items: [{ label: '초기 비용 비교', value: '자체 개발 유리' }, { label: '3년 TCO', value: '패키지 경제적' }]
  },
  {
    slug: 'delegation-paradox', category: 'LEADERSHIP', layout: 'compare', composition: 'split',
    title: '직접 처리하는 CEO가 조직의 판단력을 빼앗습니다',
    thesis: '위임 실패 비용은 즉각 보이고, 미위임 비용은 3년 뒤 판단력 부재로 나타납니다.',
    items: [{ label: '위임 실패 비용', detail: '즉각 신호가 온다' }, { label: '미위임 비용', detail: '3년 뒤 팀이 혼자 결정하지 못한다' }]
  },
  {
    slug: 'bad-news-speed', category: 'SILENCE RISK', layout: 'compare', composition: 'split',
    title: '나쁜 소식이 늦게 도착하는 조직의 공통점',
    thesis: '보고 속도는 나쁜 소식을 처음 전했을 때 CEO의 반응이 결정합니다.',
    items: [{ label: '원인 추궁 반응', detail: '다음 소식이 늦고 가공되어 온다' }, { label: '상황 파악 반응', detail: '다음 소식이 빠르고 날것으로 온다' }]
  },
  {
    slug: 'system-adoption-trap', category: 'OPERATIONS', layout: 'compare', composition: 'split',
    title: '도입 비용은 계약서에 있고 정착 비용은 어디에도 없습니다',
    thesis: '도구 도입과 업무 흐름 정착은 같은 프로젝트가 아닙니다.',
    items: [{ label: '도입 비용', detail: '계약서에 명시된다' }, { label: '정착 비용', detail: '어느 계획에도 없다' }]
  },
  {
    slug: 'data-that-changes-decisions', category: 'DATA DECISION', layout: 'compare', composition: 'reverse',
    title: '데이터가 결정 뒤에 들어오면 그것은 보고용입니다',
    thesis: '데이터가 결정을 바꾸려면 선택지가 열려 있는 결정 직전에 있어야 합니다.',
    items: [{ label: '결정 전 데이터', detail: '방향이 달라진다' }, { label: '결정 후 데이터', detail: '보고 자료가 된다' }]
  },
  {
    slug: 'corporate-newbiz-dies', category: 'NEW BUSINESS', layout: 'compare', composition: 'split',
    title: '대기업 신사업이 죽는 건 돈이 없어서가 아닙니다',
    thesis: '본업의 ROI 잣대로 신사업을 재면 신사업은 항상 실패처럼 보입니다.',
    items: [{ label: '본업 평가 기준', detail: '매출, 이익률, 점유율' }, { label: '신사업 평가 기준', detail: '가설 검증, 반복 고객' }]
  },
  {
    slug: 'ai-adoption-start-with-pain', category: 'AI STRATEGY', layout: 'compare', composition: 'reverse',
    title: 'AI 도입을 기술 선택으로 시작하면 현장이 6개월 뒤 돌아섭니다',
    thesis: '고통이 없는 자리에서 변화도 생기지 않습니다.',
    items: [{ label: '도구 선택 먼저', detail: '쓸 업무를 나중에 찾게 된다' }, { label: '고통 발굴 먼저', detail: '현장이 도구를 먼저 달라고 한다' }]
  },
  {
    slug: 'ai-summary-illusion', category: 'DATA DECISION', layout: 'flow', composition: 'split',
    title: 'AI가 요약했다고 읽은 것이 됩니까',
    thesis: 'AI 요약의 유창성이 이해 착각을 만들고 빠진 정보를 없는 것처럼 보이게 합니다.',
    items: [{ label: 'AI 요약' }, { label: '유창성 착각' }, { label: '빠진 정보 미인식' }, { label: '결정 오류' }]
  },
  {
    slug: 'exec-use-ai-directly', category: 'LEADERSHIP', layout: 'compare', composition: 'split',
    title: 'AI를 직접 쓰는 임원과 보고로만 받는 임원의 판단이 달라지는 지점',
    thesis: 'AI 출력이 어떤 조건에서 틀리는지를 경험으로 알아야 팀에 정확한 기준을 전달할 수 있습니다.',
    items: [{ label: '직접 사용 임원', detail: '위임 기준이 경험에서 나온다' }, { label: '보고 경유 임원', detail: '과대 또는 과소 위임이 생긴다' }]
  },
  {
    slug: 'zero-to-one-newbiz', category: 'NEW BUSINESS', layout: 'timeline', composition: 'vertical',
    title: '신사업이 첫 결제 전에 멈추는 구간',
    thesis: '제품 완성 전에 고객이 지금 이 문제를 충분히 불편해하는지 먼저 확인해야 합니다.',
    items: [{ label: '문제 검증' }, { label: '수요 확인' }, { label: '제품 개발' }, { label: '첫 결제' }]
  },
  {
    slug: 'busy-vs-progress', category: 'OPERATIONS', layout: 'compare', composition: 'vertical',
    title: '가장 바빴던 주가 가장 안 움직인 주였습니다',
    thesis: '활동 지표가 많으면 바쁜 것이고, 결정과 납품이 늘어야 진척입니다.',
    items: [{ label: '활동 지표', detail: '회의, 보고, 이메일' }, { label: '성과 지표', detail: '결정, 납품, 계약' }]
  },
  {
    slug: 'gov-funding-ai-evaluation', category: 'AI STRATEGY', layout: 'compare', composition: 'split',
    title: 'AI로 인건비를 줄이면 정부 평가에서 불이익을 받는 구조',
    thesis: '인건비 투입량이 사업 신뢰도 지표인 한, AI 도입 기업은 평가에서 불리합니다.',
    items: [{ label: '투입 중심 평가', detail: '인건비 많을수록 신뢰 점수 높음' }, { label: '성과 중심 평가', detail: 'AI 생산성이 신뢰 기준이 되어야 함' }]
  },
  {
    slug: 'hydrogen-bus-tco', category: 'CAPITAL', layout: 'ratio', composition: 'split',
    title: '수소버스 경제성은 10년 총소유비용으로 봐야 합니다',
    thesis: '오늘 단가표로 10년을 사면 틀립니다. 보조금 없는 시나리오의 TCO를 먼저 계산하십시오.',
    items: [{ label: '차량 구입비', value: '구매 시점 결정' }, { label: '10년 운용 비용', value: '연료+정비+충전 접근비' }]
  },
  {
    slug: 'best-tech-vs-sellable-tech', category: 'TECHNOLOGY', layout: 'compare', composition: 'split',
    title: '최고 기술보다 전환 비용이 낮은 기술이 시장을 잡습니다',
    thesis: '시장은 정확도가 아니라 기존 시스템에 붙는 용이성을 먼저 봅니다.',
    items: [{ label: '기술 우수성', detail: '정확도, 속도를 높인다' }, { label: '전환 용이성', detail: '연동 시간, 구현 비용을 낮춘다' }]
  },
  {
    slug: 'hydrogen-station-permits', category: 'NEW BUSINESS', layout: 'flow', composition: 'vertical',
    title: '수소충전소 인허가는 기술 준비와 병렬로 Day 1부터 시작합니다',
    thesis: '인허가 세 단계 중 하나가 막히면 나머지 전체가 멈춥니다. 기술 일정과 함께 Gantt에 넣으십시오.',
    items: [{ label: '부지 확정' }, { label: '주민 동의' }, { label: '관계기관 협의' }, { label: '운영 시작' }]
  },
  {
    slug: 'ai-agent-workforce-move', category: 'AI OPERATING MODEL', layout: 'branch', composition: 'split',
    title: 'AI 에이전트 도입이 감축이 되느냐 이동이 되느냐는 CEO 설계에 달려 있습니다',
    thesis: 'AI가 반복 업무를 가져갈 때 다음 역할을 미리 정하지 않으면 이동이 아니라 감축이 됩니다.',
    items: [{ label: 'AI 에이전트 도입' }, { label: '이동 설계 있음', detail: '역할 재배치' }, { label: '이동 설계 없음', detail: '자리 소멸' }]
  },
  {
    slug: 'leader-subtracts', category: 'LEADERSHIP', layout: 'compare', composition: 'split',
    title: '추가는 관성이고 제거는 결정입니다',
    thesis: '과제를 추가하는 비용은 보이지 않고 제거하는 비용은 바로 보입니다. 그래서 목록은 항상 늘어납니다.',
    items: [{ label: '과제 추가', detail: '대화 한 번, 비용은 팀에 분산' }, { label: '과제 제거', detail: '설명 필요, 저항이 즉시 보임' }]
  },
  {
    slug: 'years-vs-decisions', category: 'TALENT', layout: 'compare', composition: 'split',
    title: '판단력은 연차가 아니라 직접 내린 결정의 수에서 납니다',
    thesis: '연차는 시간이 흐르면 자동으로 쌓이지만 결정 경험은 의도적으로 만들어야 쌓입니다.',
    items: [{ label: '연차', detail: '시간이 지나면 자동으로 늘어난다' }, { label: '결정 횟수', detail: '의도적으로 설계해야 늘어난다' }]
  },
  {
    slug: 'tech-to-coo-shift', category: 'OPERATIONS', layout: 'flow', composition: 'split',
    title: '기술 리더가 운영 총괄로 전환할 때 처음 만나는 실패',
    thesis: '기술에서는 옳은 답이 결과를 만들지만 운영에서는 납득이 실행을 만듭니다.',
    items: [{ label: '옳은 답' }, { label: '납득' }, { label: '실행' }]
  },
  {
    slug: 'decision-loneliness', category: 'LEADERSHIP', layout: 'signal', composition: 'vertical',
    title: '결정의 외로움을 없애려 할 때 결정의 질이 나빠집니다',
    thesis: '외로움이 불편해서 합의를 찾고 결정을 미루면 외로움은 줄지만 결정 책임 주체가 흐려집니다.',
    items: [{ label: '합의 과잉' }, { label: '결정 지연' }, { label: '외부 의존' }, { label: '결정 품질 저하' }]
  },
  {
    slug: 'ai-talent-development', category: 'AX EDUCATION', layout: 'stack', composition: 'vertical',
    title: 'AI가 반복 업무를 가져가면 주니어 판단력이 자라는 사다리가 사라집니다',
    thesis: '반복 업무는 단순 노동이 아니라 패턴과 판단력이 자라는 토양입니다. 사다리를 의도적으로 다시 설계해야 합니다.',
    items: [{ label: '반복 업무 경험' }, { label: '실수와 수정' }, { label: '패턴 이해' }, { label: '독립 판단력' }]
  },
  {
    slug: 'ace-counteroffer', category: 'TALENT', layout: 'compare', composition: 'split',
    title: '카운터오퍼를 수락한 에이스가 여섯 달 안에 다시 나가는 이유',
    thesis: '카운터오퍼는 이직 이유가 오로지 보상일 때만 효과가 있습니다.',
    items: [{ label: '카운터오퍼', detail: '보상이 이유일 때만 효과가 있다' }, { label: '역할과 성장 변화', detail: '인정과 성장이 이유일 때 처방이다' }]
  },
  {
    slug: 'ai-productivity-paradox', category: 'AX', layout: 'flow', composition: 'split',
    title: 'AI 도구로 직원이 빨라졌는데 회사 실적이 그대로인 이유',
    thesis: '개인 처리량이 오르면 병목이 다음 단계로 이동합니다. 조직 성과는 흐름 전체가 결정합니다.',
    items: [{ label: '개인 처리량' }, { label: '인접 업무 대기' }, { label: '의사결정 공백' }, { label: '성과 정체' }]
  },
  {
    slug: 'rules-that-choke', category: 'LEADERSHIP', layout: 'flow', composition: 'split',
    title: '품질을 지키려 만든 규칙이 조직을 굳히는 세 단계',
    thesis: '규칙은 불신이 만들고 시간이 굳힙니다. 규칙이 많은 조직은 품질이 높은 조직이 아닙니다.',
    items: [{ label: '문제 발생' }, { label: '규칙 추가' }, { label: '목표 치환' }, { label: '형식적 준수' }]
  },
  {
    slug: 'kill-fast-asset', category: 'NEW BUSINESS', layout: 'timeline', composition: 'vertical',
    title: '빨리 접은 프로젝트에서 건진 기준이 다음 신사업을 고칩니다',
    thesis: '중단 시점에 기록된 구체적인 수치와 조건이 다음 신사업 평가의 진입 필터가 됩니다.',
    items: [{ label: '중단 기준 도달' }, { label: '빠른 중단' }, { label: '기준 기록' }, { label: '다음 신사업 필터' }]
  },
  {
    slug: 'hq-vs-field', category: 'OPERATIONS', layout: 'compare', composition: 'split',
    title: '본사가 현장보다 두 달 늦게 아는 구조가 결정 오류를 만듭니다',
    thesis: '현장 조건 차이에 민감한 결정을 평균 데이터로 내리는 구조가 오류를 만듭니다.',
    items: [{ label: '본사 평균 데이터', detail: '분산이 사라진 결정' }, { label: '현장 실제 조건', detail: '평균을 벗어난 신호' }]
  },
  {
    slug: 'why-people-stay', category: 'TALENT', layout: 'compare', composition: 'split',
    title: '연봉을 올려줘도 떠나고, 깎여도 남는 이유',
    thesis: '연봉은 이탈 이유를 제거하고, 성장과 인정은 잔류 이유를 만듭니다. 방향이 다른 처방입니다.',
    items: [{ label: '연봉 인상', detail: '이탈 이유를 제거한다' }, { label: '성장과 인정', detail: '잔류 이유를 만든다' }]
  },
  {
    slug: 'leader-speaks-last', category: 'LEADERSHIP', layout: 'flow', composition: 'split',
    title: '내가 먼저 말한 회의에서 팀원들의 의견이 사라졌습니다',
    thesis: '리더가 마지막에 말하는 것은 예절이 아니라 팀이 독립적으로 판단할 공간을 만드는 구조입니다.',
    items: [{ label: '리더 선발언' }, { label: '닻내리기 효과' }, { label: '팀 발언 수렴' }, { label: '반론 차단' }]
  },
  {
    slug: 'ideas-die-indifference', category: 'CULTURE', layout: 'signal', composition: 'vertical',
    title: '아이디어를 죽인 건 반박이 아니라 무반응이었습니다',
    thesis: '팀이 조용해지는 것은 생각을 멈춘 것이 아니라 꺼내는 것을 멈춘 것입니다.',
    items: [{ label: '아이디어 제출' }, { label: '무반응' }, { label: '제안 행동 소멸' }, { label: '침묵 학습' }]
  },
  {
    slug: 'consultant-filter', category: 'ADVISORY', layout: 'stack', composition: 'vertical',
    title: '좋은 컨설팅과 나쁜 컨설팅을 가르는 기준 세 가지, 저희도 예외가 아닙니다',
    thesis: '안 된다는 말을 먼저 할 수 있는 컨설턴트가 좋은 컨설턴트입니다.',
    items: [{ label: '실패 경험 공개' }, { label: '불가 사항 먼저' }, { label: '숫자로 기준 합의' }]
  },
  {
    slug: 'new-system-not-faster', category: 'OPERATIONS', layout: 'compare', composition: 'split',
    title: '새 시스템을 도입했는데 더 느려진 이유는 구 시스템을 끄지 않았기 때문입니다',
    thesis: '새 시스템 도입 계획에 구 시스템 종료 날짜가 없으면 프로젝트 종료 시 시스템이 두 개가 됩니다.',
    items: [{ label: '구 시스템 유지', detail: '이중 부담과 혼선이 지속된다' }, { label: '구 시스템 종료', detail: '새 시스템이 기준이 된다' }]
  },
  {
    slug: 'hydrogen-operator-vs-investor', category: 'NEW BUSINESS', layout: 'compare', composition: 'split',
    title: '수소충전소에 투자한 사람과 운영하는 사람이 보는 숫자가 다릅니다',
    thesis: '투자자 언어로만 쓴 수소 사업 계획서에 운영자 가동률 시나리오가 없으면 현실 검증이 빠진 것입니다.',
    items: [{ label: '투자자 숫자', detail: '시장 규모와 기술 완성도' }, { label: '운영자 숫자', detail: '가동률과 유지보수 비용' }]
  },
  {
    slug: 'ai-tool-list-trap', category: 'AI STRATEGY', layout: 'compare', composition: 'split',
    title: 'AI 도구 목록이 전략이 아닌 이유는 경계가 없기 때문입니다',
    thesis: '어느 판단에서 AI를 쓰고 어느 판단에서 사람이 책임지는지를 먼저 정해야 합니다.',
    items: [{ label: '도구 목록 먼저', detail: '업무 방식이 그대로 남는다' }, { label: '경계 설계 먼저', detail: '도구가 업무를 실제로 바꾼다' }]
  },
  {
    slug: 'newbiz-endurance', category: 'NEW BUSINESS', layout: 'branch', composition: 'split',
    title: '신사업이 느릴 때, 멈춰야 하는지 기다려야 하는지를 구분하는 방법',
    thesis: '느린 것과 틀린 것의 구분이 없으면 멈춰야 할 것을 계속하거나 기다려야 할 것을 포기합니다.',
    items: [{ label: '느린 신사업' }, { label: '반복 사용 있음', detail: '타이밍 문제, 기다린다' }, { label: '반복 사용 없음', detail: '가설 문제, 재검토한다' }]
  },
  {
    slug: 'costliest-lesson', category: 'LEADERSHIP', layout: 'compare', composition: 'split',
    title: '논리가 맞아도 납득이 없으면 결정은 실행되지 않습니다',
    thesis: '설득은 반박을 없애는 것이고, 납득은 그 결정이 자기 일이 된다고 느끼는 것입니다.',
    items: [{ label: '설득', detail: '반박이 없어진다' }, { label: '납득', detail: '결정이 자기 일이 된다' }]
  },
  {
    slug: 'success-trap', category: 'LEADERSHIP', layout: 'signal', composition: 'vertical',
    title: '성공한 공식이 환경이 바뀐 뒤에도 계속될 때, 공식 자체가 실패 원인이 됩니다',
    thesis: '잘됐을 때 멈춰버린 의심이 환경 변화를 알아채지 못하게 합니다.',
    items: [{ label: '성공 지속' }, { label: '의심 중단' }, { label: '환경 변화' }, { label: '공식이 실패 원인' }]
  },
  {
    slug: 'cant-delegate-psychology', category: 'LEADERSHIP', layout: 'stack', composition: 'vertical',
    title: '위임이 안 되는 이유는 상대를 못 믿어서가 아닙니다',
    thesis: '위임을 막는 것은 팀원 역량이 아니라 위임자 내면의 세 층위 심리 장벽입니다.',
    items: [{ label: '통제감 상실 불안' }, { label: '품질 기준 불안' }, { label: '설명 비용 인식' }]
  },
  {
    slug: 'step-back-to-lead', category: 'LEADERSHIP', layout: 'compare', composition: 'split',
    title: '대표가 매일 달릴수록 팀은 방향을 잃습니다',
    thesis: '리더가 항상 실행 안에 있으면 방향을 점검하는 시간이 조직에서 사라집니다.',
    items: [{ label: '실행 안에 있음', detail: '바로 앞 일만 보인다' }, { label: '물러서서 봄', detail: '전체 패턴과 방향이 보인다' }]
  },
  {
    slug: 'junior-grows-conditions', category: 'TALENT', layout: 'compare', composition: 'split',
    title: '주니어가 빨리 크는 조직은 교육이 많은 곳이 아닙니다',
    thesis: '성장 속도를 결정하는 것은 교육량이 아니라 실패 허용 범위와 피드백 주기입니다.',
    items: [{ label: '교육량 증가', detail: '성장 속도가 달라지지 않는다' }, { label: '실패 허용과 피드백 주기', detail: '성장 속도가 결정된다' }]
  },
  {
    slug: 'depth-over-speed', category: 'TALENT', layout: 'compare', composition: 'split',
    title: '한 분야를 깊이 판 사람이 위기에서 흔들리지 않는 이유',
    thesis: '전문가는 선택지를 나열해 비교하지 않고 패턴을 인식해 먼저 배제합니다.',
    items: [{ label: '넓은 경험', detail: '선택지를 나열하고 분석한다' }, { label: '깊은 전문성', detail: '패턴을 인식해 빠르게 배제한다' }]
  },
  {
    slug: 'manager-makes-team', category: 'TALENT', layout: 'ratio', composition: 'split',
    title: '팀 성과 차이의 70%는 복지나 제도가 아니라 관리자에서 납니다',
    thesis: '같은 회사 안에서도 팀마다 성과 차이가 크게 나는 결정 변수는 관리자입니다.',
    items: [{ label: '관리자 행동', value: '7할' }, { label: '제도와 복지', value: '3할' }]
  },
  {
    slug: 'report-execution-loop', category: 'OPERATIONS', layout: 'compare', composition: 'split',
    title: '보고 주기가 실행 주기보다 짧아지면 팀장은 번역기가 됩니다',
    thesis: '실행이 끝나기 전에 보고를 요구하면 팀장은 없는 정보를 추정으로 채워 올리게 됩니다.',
    items: [{ label: '보고 주기 > 실행 주기', detail: '아직 없는 정보를 추정으로 채운다' }, { label: '보고 주기 = 실행 주기', detail: '팀장의 실행 시간과 현장 정보 품질이 돌아온다' }]
  },
  {
    slug: 'newbiz-to-profit-steps', category: 'NEW BUSINESS', layout: 'flow', composition: 'vertical',
    title: '신사업을 흑자로 돌린 팀이 먼저 한 일은 매출 목표가 아니라 손실 구멍 막기였습니다',
    thesis: '매출이 늘수록 손실도 커지는 구조를 먼저 멈춰야 흑자 단위를 찾을 수 있습니다.',
    items: [{ label: '손실 구멍 막기' }, { label: '흑자 단위 하나 찾기' }, { label: '그 단위만 키우기' }]
  },
  {
    slug: 'govfund-direction-trap', category: 'NEW BUSINESS', layout: 'compare', composition: 'split',
    title: '보조금이 가장 비싼 자본이 되는 순간은 사업 방향이 서류 요건을 따라 움직일 때입니다',
    thesis: '지원금 요건에 맞춰 방향을 바꾸기 시작하면 기회비용이 지원금 금액을 넘어섭니다.',
    items: [{ label: '요건과 전략이 일치', detail: '이자 없는 비용 절감이다' }, { label: '요건 때문에 방향 변경', detail: '방향 전환 비용이 지원금을 초과한다' }]
  },
  {
    slug: 'global-negotiation-leverage', category: 'NEW BUSINESS', layout: 'compare', composition: 'split',
    title: '거인 앞에서 협상 우위를 만드는 것은 규모가 아니라 포기할 수 있는 대안의 수입니다',
    thesis: '협상에서 힘은 회사 크기가 아니라 이 계약이 없어도 갈 수 있는 대안에서 나옵니다.',
    items: [{ label: '대안 없는 협상', detail: '상대가 먼저 안다. 가격 압박이 강해진다' }, { label: '대안 있는 협상', detail: '조건을 선택할 여지가 생긴다' }]
  },
  {
    slug: 'fcev-real-bottleneck', category: 'OPERATIONS', layout: 'stack', composition: 'vertical',
    title: '수소전기차 보급이 느린 진짜 이유는 차가 아니라 충전이 될지 모른다는 불확실성입니다',
    thesis: '충전소 수가 아니라 가동률, 대기 시간, 충전 완료 예측 가능성이 구매 결정을 막고 있습니다.',
    items: [{ label: '충전소 실시간 가동 정보' }, { label: '대기 시간 예측' }, { label: '충전 완료 확실성' }]
  },
  {
    slug: 'mgmt-vs-direction', category: 'LEADERSHIP', layout: 'compare', composition: 'split',
    title: '관리를 잘해도 방향이 틀리면 조직은 효율적으로 실패합니다',
    thesis: '효율성은 일을 제대로 하는 것이고 효과성은 제대로 된 일을 하는 것입니다. 두 가지는 다른 능력입니다.',
    items: [{ label: '관리 개선', detail: '같은 방향을 더 빠르게 간다' }, { label: '방향 판단', detail: '가야 할 곳이 맞는지를 먼저 결정한다' }]
  },
  {
    slug: 'tech-to-management-breaks', category: 'LEADERSHIP', layout: 'compare', composition: 'split',
    title: '처음 팀장이 된 개발자가 가장 먼저 잃는 것은 기술이 아닙니다',
    thesis: '직접 만든 것이 작동할 때 오는 즉각적 성취감이 사라지고 이 공백을 채우지 못하면 팀원 업무에 끼어들게 됩니다.',
    items: [{ label: '만드는 성취감', detail: '코드가 작동하면 즉각 온다' }, { label: '만들게 하는 성취감', detail: '팀원 판단이 자라는 것을 보며 온다' }]
  },
  {
    slug: 'week-starts-reactive', category: 'LEADERSHIP', layout: 'compare', composition: 'split',
    title: '월요일 오전을 받은 메일로 시작하면 그 주의 의사결정 순서는 남이 정합니다',
    thesis: '주의 첫 30분을 내가 내려야 할 결정 목록으로 시작하면 의사결정의 주도권이 달라집니다.',
    items: [{ label: '받은 메일 먼저', detail: '남의 안건이 하루의 첫 에너지를 채운다' }, { label: '결정 목록 먼저', detail: '내 기준으로 메일을 판단한다' }]
  },
  {
    slug: 'ai-judgment-remains', category: 'AI STRATEGY', layout: 'stack', composition: 'vertical',
    title: 'AI가 분석을 다 해도 CEO가 직접 해야 하는 판단이 세 가지 남습니다',
    thesis: 'AI가 분석을 빠르게 만들수록 결정, 책임, 신뢰라는 CEO 고유 역할이 더 선명하게 드러납니다.',
    items: [{ label: '어떤 질문을 할지' }, { label: '결과의 책임' }, { label: '팀의 신뢰와 의미' }]
  },
  {
    slug: 'engagement-leading-indicators', category: 'TALENT', layout: 'compare', composition: 'split',
    title: '이직률이 높아졌을 때는 이미 몰입도가 낮아진 지 수개월이 지난 시점입니다',
    thesis: '만족도와 이직률은 과거를 보여주고 몰입도는 6개월에서 12개월 뒤 성과 방향을 먼저 보여줍니다.',
    items: [{ label: '만족도와 이직률', detail: '후행 지표, 이미 문제가 생긴 뒤에 나온다' }, { label: '몰입도', detail: '선행 지표, 성과 변화 6-12개월 전 신호다' }]
  },
  {
    slug: 'ai-build-not-prompt', category: 'AI STRATEGY', layout: 'compare', composition: 'split',
    title: 'ChatGPT를 잘 쓰는 것으로는 경쟁 우위가 생기지 않습니다',
    thesis: '차별화는 AI를 쓰는 것이 아니라 자사 데이터와 업무 흐름에 AI를 연결한 도구를 구축하는 데서 옵니다.',
    items: [{ label: '프롬프트 사용', detail: '경쟁자도 같은 방식으로 배운다' }, { label: '도구 구축', detail: '자사 데이터가 연결된 운영 자산이 된다' }]
  },
  {
    slug: 'ai-like-managing-people', category: 'AI OPERATING MODEL', layout: 'stack', composition: 'vertical',
    title: 'AI에게 업무를 잘 맡기는 역량은 27년 사람 관리 경험과 같은 종류입니다',
    thesis: '업무를 맡기는 지시의 품질이 AI 결과물의 품질을 결정합니다.',
    items: [{ label: '단위를 작게' }, { label: '기준을 하나만' }, { label: '맥락을 먼저' }]
  },
  {
    slug: 'question-over-answer-ai', category: 'AI STRATEGY', layout: 'flow', composition: 'split',
    title: 'AI가 즉시 답을 줄수록 대표가 키워야 할 역량은 질문입니다',
    thesis: '답을 구하는 비용이 0에 가까워질수록 어떤 질문을 할 것인가가 경영 역량이 됩니다.',
    items: [{ label: '큰 질문' }, { label: 'AI 즉시 답' }, { label: '빠른 오답' }, { label: '잘못된 결정' }]
  },
  {
    slug: 'ai-personal-vs-org', category: 'AI OPERATING MODEL', layout: 'compare', composition: 'split',
    title: '직원이 AI 활용법을 개발해도 그 방법이 그 사람과 함께 퇴사합니다',
    thesis: 'AI 생산성이 개인 자산으로 쌓이는 회사와 조직 자산으로 축적되는 회사의 차이는 지금 만들어지고 있습니다.',
    items: [{ label: '개인 암묵지', detail: '직원이 퇴사하면 방법이 사라진다' }, { label: '조직 형식지', detail: '공유와 검토로 팀 자산이 된다' }]
  },
  {
    slug: 'nondev-builds-with-ai', category: 'AI STRATEGY', layout: 'stack', composition: 'vertical',
    title: '개발팀 없이 현장 직원이 AI로 업무 도구를 만들기 시작하면 조직에 세 가지 일이 생깁니다',
    thesis: '막는 것이 아니라 관리하는 체계가 현장 속도와 조직 거버넌스를 동시에 만듭니다.',
    items: [{ label: 'IT 모르는 데이터 흐름' }, { label: '유지보수 공백' }, { label: '규제 준수 공백' }]
  },
  {
    slug: 'leader-unspoken-expectations', category: 'LEADERSHIP', layout: 'flow', composition: 'split',
    title: '말하지 않은 기대치를 팀이 알아서 파악하기를 기다리면 팀은 성과보다 신호 해석을 먼저 배웁니다',
    thesis: '기대치가 명시되지 않으면 팀은 일보다 리더를 읽는 능력을 먼저 개발합니다.',
    items: [{ label: '기대치 미명시' }, { label: '질문 억제' }, { label: '신호 해석 학습' }, { label: '일보다 리더 파악' }]
  },
  {
    slug: 'control-room-lesson', category: 'OPERATIONS', layout: 'signal', composition: 'vertical',
    title: '관제실에 표시하는 데이터를 늘릴수록 운영자가 정작 중요한 신호를 놓쳤습니다',
    thesis: '행동이 없는 지표는 화면에 있어야 할 이유가 없습니다. 정보가 많을수록 핵심 신호가 잡음에 묻힙니다.',
    items: [{ label: '지표 추가' }, { label: '잡음 증가' }, { label: '핵심 신호 소실' }, { label: '판단 지연' }]
  },
  {
    slug: 'attention-direction', category: 'LEADERSHIP', layout: 'compare', composition: 'split',
    title: '리더가 어느 회의에 시간을 쓰는지가 팀 전체에 이번 달 우선순위를 공표합니다',
    thesis: '전략 발표가 아니라 리더의 캘린더와 질문 방향이 조직의 실제 우선순위를 만듭니다.',
    items: [{ label: '전략 선언', detail: '분기에 한 번 도달한다' }, { label: '주의 방향', detail: '매일 팀에 신호로 읽힌다' }]
  },
  {
    slug: 'org-flow-design', category: 'OPERATIONS', layout: 'flow', composition: 'vertical',
    title: '안건이 많아도 조직이 움직이지 않는 것은 우선순위가 없어서가 아닙니다',
    thesis: '안건이 실행되지 않는 이유는 우선순위 부재가 아니라 흐름 경로의 제약 지점입니다.',
    items: [{ label: '안건 선언' }, { label: '흐름 경로 제약' }, { label: '대기 누적' }, { label: '실행 없음' }]
  },
  {
    slug: 'show-your-work', category: 'CULTURE', layout: 'compare', composition: 'split',
    title: '완성된 결과만 팀에 공유하면 중간 판단의 오류는 다음 사람에게도 반복됩니다',
    thesis: '과정을 공유하는 것은 미완성을 드러내는 것이 아니라 다음 사람의 학습 비용을 줄이는 행동입니다.',
    items: [{ label: '결과만 공유', detail: '판단 경로가 사라진다' }, { label: '과정 공유', detail: '다음 사람의 학습 비용이 줄어든다' }]
  },
  {
    slug: 'ev-vs-commercial-reality', category: 'MOBILITY', layout: 'compare', composition: 'split',
    title: '전기차가 상용차 현장에서 기대와 달랐던 이유',
    thesis: '기술의 우열이 아니라 차의 쓰임이 에너지 선택을 결정합니다.',
    items: [{ label: '기술 우열 판단', detail: '배터리냐 수소냐' }, { label: '차량 쓰임 판단', detail: '하중, 거리, 충전 접근성' }]
  },
  {
    slug: 'hydrogen-use-case-split', category: 'MOBILITY', layout: 'compare', composition: 'split',
    title: '수소차가 망했다는 말, 절반만 맞습니다',
    thesis: '승용차에서 진 것이 대형 상용차에서도 진 것을 의미하지 않습니다.',
    items: [{ label: '승용차 시장', detail: '전기차가 이미 앞섰다' }, { label: '대형 상용차 시장', detail: '경쟁이 아직 열려 있다' }]
  },
  {
    slug: 'hydrogen-timing-lesson', category: 'NEW BUSINESS', layout: 'compare', composition: 'split',
    title: '옳은 기술에 너무 일찍 투자한 것이 문제였습니다',
    thesis: '기술 타당성 판단과 시장 준비도 판단은 다른 질문입니다.',
    items: [{ label: '기술 타당성', detail: '기술이 맞는가' }, { label: '시장 준비도', detail: '지금이 들어갈 타이밍인가' }]
  },
  {
    slug: 'ai-speed-not-revenue', category: 'AI STRATEGY', layout: 'flow', composition: 'split',
    title: 'AI로 업무가 빨라졌는데 매출이 그대로인 이유',
    thesis: 'AI 속도가 병목을 건너지 못하면 조직 성과에 닿지 않습니다.',
    items: [{ label: 'AI 개인 속도 향상' }, { label: '병목 구간', detail: '사람 검토, 승인 대기' }, { label: '매출 연결 없음' }]
  },
  {
    slug: 'success-inertia-self-renewal', category: 'LEADERSHIP', layout: 'signal', composition: 'vertical',
    title: '한때 통한 방식이 경영자 자신을 가두는 방식',
    thesis: '방식이 통하는 동안 멈춘 점검이 환경 변화 이후 장벽이 됩니다.',
    items: [{ label: '방식 성공' }, { label: '점검 중단' }, { label: '맥락 변화' }, { label: '방식이 장벽' }]
  },
  {
    slug: 'hire-juniors-ai-era', category: 'TALENT', layout: 'compare', composition: 'split',
    title: 'AI가 초급 업무를 대신한다고 신입을 안 뽑으면 3년 뒤 조직에서 무슨 일이 생기는가',
    thesis: '신입 채용의 목적은 초급 업무 처리가 아니라 3년 뒤 관리자 파이프라인입니다.',
    items: [{ label: '단기 인건비 절감', detail: 'AI가 초급 업무를 처리한다' }, { label: '3년 뒤 관리자 공백', detail: '외부 채용 비용이 더 크게 온다' }]
  },
  {
    slug: 'busy-vs-ai', category: 'AI STRATEGY', layout: 'loop', composition: 'vertical',
    title: 'AI 도구를 도입한 뒤 야근이 줄지 않는 이유는 150년 전에 이미 설명됐습니다',
    thesis: '효율 향상은 수요 감소가 아니라 수요 증가로 이어집니다.',
    items: [{ label: 'AI 속도 향상' }, { label: '업무 요청 증가' }, { label: '처리 기준 상향' }, { label: '야근 유지' }]
  },
  {
    slug: 'midyear-checkpoint', category: 'PLANNING', layout: 'compare', composition: 'split',
    title: '8월에 확인해야 할 것은 달성률이 아니라 목표 자체가 아직 맞는가입니다',
    thesis: '중간 점검의 질문은 얼마나 달성했는가가 아니라 방향이 아직 유효한가입니다.',
    items: [{ label: '달성률 점검', detail: '얼마나 왔는가' }, { label: '목표 유효성 감사', detail: '방향이 아직 맞는가' }]
  },
  {
    slug: 'reverse-from-yearend', category: 'PLANNING', layout: 'timeline', composition: 'reverse',
    title: '12월 31일 원하는 상태를 먼저 쓰면 이번 주 할 일 목록이 달라집니다',
    thesis: '출발점이 아닌 도착점에서 역산하면 지금 해야 할 일이 달라집니다.',
    items: [{ label: '12월 31일 상태' }, { label: '10월 말 역산' }, { label: '8월 말 역산' }, { label: '이번 주 첫 행동' }]
  },
  {
    slug: 'ai-lecture-exposed', category: 'AX EDUCATION', layout: 'compare', composition: 'split',
    title: 'AI 강의 수강 인원이 늘어도 회사 매출이 오르지 않는 이유는 시장 구조에 있습니다',
    thesis: '강의가 파는 것은 개인 속도이고 조직 성과는 프로세스 재설계에서 옵니다.',
    items: [{ label: '개인 기술 교육', detail: '도구 사용법을 판다' }, { label: '프로세스 전환', detail: '조직 성과 경로를 재설계한다' }]
  },
  {
    slug: 'ai-pilot-operation-gap', category: 'AI STRATEGY', layout: 'compare', composition: 'split',
    title: '파일럿에서 성공한 AI가 전사 배포 이후 사라지는 이유',
    thesis: '파일럿 성공 조건은 현업 조직에 그대로 이전되지 않습니다.',
    items: [{ label: '파일럿 조건', detail: '전담 인원, 경영진 직보, 데이터 지원' }, { label: '현업 조건', detail: '기존 KPI, 지원 없음, 역할 미정의' }]
  },
  {
    slug: 'ai-decision-rights-map', category: 'AI OPERATING MODEL', layout: 'stack', composition: 'vertical',
    title: '어느 결정을 AI에게 맡겼는지 지금 문서화돼 있습니까',
    thesis: 'AI 결정 권한 지도가 없으면 추천이 실행으로 넘어가는 시점을 조직이 알지 못합니다.',
    items: [{ label: '자율 실행', detail: '소액, 반복, 되돌릴 수 있음' }, { label: '담당자 승인', detail: '예산 초과, 신규 거래처' }, { label: '임원 승인', detail: '전략 계약, 인사 결정' }]
  },
  {
    slug: 'security-owns-ai-code', category: 'AI STRATEGY', layout: 'compare', composition: 'split',
    title: 'AI가 쓴 코드의 보안 취약점은 누가 책임집니까',
    thesis: 'AI가 코드를 썼다고 보안 검토 책임이 사라지는 것은 아닙니다.',
    items: [{ label: 'AI 생성 코드', detail: '취약점이 기능 안에 섞인다' }, { label: '검토 없이 배포', detail: '데이터 노출 경로가 된다' }]
  },
  {
    slug: 'vendor-demo-workflow-gap', category: 'AI STRATEGY', layout: 'compare', composition: 'split',
    title: '데모에서 98%였던 AI 정확도가 현업에서 절반으로 줄어든 이유',
    thesis: '벤더 데모는 최적 조건에서 나옵니다. 실제 데이터와 예외로 다시 확인해야 합니다.',
    items: [{ label: '데모 조건', detail: '정제 데이터, 단선 흐름' }, { label: '실제 업무', detail: '비정형 입력, 예외, 시스템 연동' }]
  },
  {
    slug: 'automation-stop-button', category: 'AUTOMATION ECONOMICS', layout: 'flow', composition: 'split',
    title: '자동화를 켜기 전에 끄는 방법을 먼저 설계해야 합니다',
    thesis: '자동화 오작동의 피해는 사람보다 빠르게 커집니다. 중단 기준, 권한자, 복구 경로가 먼저입니다.',
    items: [{ label: '임계치 설정' }, { label: '중단 권한자' }, { label: '복구 경로' }, { label: '재가동 승인' }]
  },
  {
    slug: 'nice-leader-ruins', category: 'LEADERSHIP', layout: 'branch', composition: 'split',
    title: '좋은 사람이라는 평판을 지키려다 팀에서 솔직한 말이 사라집니다',
    thesis: '불편한 대화를 피하는 리더가 의도 없이 팀의 솔직함을 없앱니다.',
    items: [{ label: '피드백 공백', detail: '기준을 알 수 없다' }, { label: '침묵 학습', detail: '말해도 소용없다는 경험' }, { label: '기준 하향', detail: '팀 전체 수준이 낮아진다' }]
  },
  {
    slug: 'b2b-internal-champion', category: 'SALES', layout: 'flow', composition: 'vertical',
    title: 'B2B 계약이 검토 단계에서 멈추는 이유는 고객사 내부에 있습니다',
    thesis: '고객사 내부에서 구매를 밀어주는 사람이 없으면 계약은 검토 중에 사라집니다.',
    items: [{ label: '직접 수혜자' }, { label: '내부 신뢰' }, { label: '내부 설득 자료' }, { label: '구매 완료' }]
  },
  {
    slug: 'field-feedback-loop', category: 'OPERATING SYSTEM', layout: 'loop', composition: 'vertical',
    title: '현장에서 올라온 말이 다시 현장으로 내려오지 않으면 보고가 멈춥니다',
    thesis: '피드백 수집이 아니라 결과가 돌아오는 순환 구조가 현장 보고를 이어갑니다.',
    items: [{ label: '현장 보고' }, { label: '접수 확인' }, { label: '처리 결과 통보' }, { label: '반영 사례 공유' }]
  },
  {
    slug: 'data-owner-not-dashboard', category: 'DATA DECISION', layout: 'compare', composition: 'split',
    title: '지표 정의가 부서마다 다르면 대시보드 회의는 숫자 싸움이 됩니다',
    thesis: '지표 소유자 없이 대시보드를 늘리면 불일치도 함께 커집니다.',
    items: [{ label: '소유자 없는 지표', detail: '부서마다 정의가 달라진다' }, { label: '소유자 있는 지표', detail: '집계 방식과 기준이 하나다' }]
  },
  {
    slug: 'nocode-hidden-work', category: 'WORKFLOW', layout: 'stack', composition: 'vertical',
    title: '노코드로 만드는 것은 반나절이지만 굴리는 것은 그다음부터입니다',
    thesis: '만들기는 빠르지만 유지보수 비용은 코드와 같습니다. 생애 주기를 만들기에 포함해야 합니다.',
    items: [{ label: 'API 변경 대응' }, { label: '데이터 예외 처리' }, { label: '운영 지식 이전' }]
  },
  {
    slug: 'field-regression-signal', category: 'OPERATIONS', layout: 'stack', composition: 'vertical',
    title: '도입 완료 보고를 받은 날 현장은 엑셀로 돌아가 있었습니다',
    thesis: '도입 완료와 현장 안착은 다른 사건입니다. 회귀 신호 세 가지를 측정하지 않으면 시스템이 껍데기가 됩니다.',
    items: [{ label: '로그인 월말 집중' }, { label: '병렬 엑셀 지속' }, { label: '예외 처리 20% 초과' }]
  },
  {
    slug: 'erp-exception-policy', category: 'SYSTEMS', layout: 'compare', composition: 'split',
    title: '예외를 담당자가 처리한다는 ERP 정책이 시스템 전체를 개인에게 묶습니다',
    thesis: '예외 처리 책임이 사람에게 묶이는 순간 그 사람이 시스템의 실질 운영자가 됩니다.',
    items: [{ label: '담당자 재량 처리', detail: '이력 없고 일관성 없고 그 사람이 없으면 멈춘다' }, { label: '시스템 내재화', detail: '처리 경로가 시스템 안에 있고 이력이 조직에 남는다' }]
  },
  {
    slug: 'legacy-integration-boundary', category: 'SYSTEMS', layout: 'compare', composition: 'split',
    title: '레거시와 신규 시스템의 경계를 계약서에 쓰지 않으면 프로젝트 범위가 매 회의마다 달라집니다',
    thesis: '경계를 정한다는 것은 신규 시스템이 무엇을 모른다고 가정할 것인가를 정하는 것입니다.',
    items: [{ label: '경계 미정의', detail: '연동 가능한 모든 것이 1단계 요청으로 들어온다' }, { label: '경계 문서화', detail: '추가 요청은 변경 프로세스와 비용 산정을 거쳐야 한다' }]
  },
  {
    slug: 'ai-cycle-structural-shift', category: 'AI STRATEGY', layout: 'compare', composition: 'split',
    title: '인터넷 때도 ERP 때도 이런 말을 들었습니다. 이번 AI에는 한 가지가 구조적으로 다릅니다',
    thesis: '과거 사이클은 시스템이 사람의 지시를 실행했고, 이번 사이클은 시스템이 결과물의 초안을 만듭니다.',
    items: [{ label: '과거 세 사이클', detail: '사람이 판단하고 시스템이 실행했다' }, { label: 'AI 사이클', detail: '시스템이 초안을 만들고 사람이 검토한다' }]
  },
  {
    slug: 'exec-tool-bus-factor', category: 'AI STRATEGY', layout: 'stack', composition: 'vertical',
    title: '경영진이 AI로 만든 도구는 그 경영진이 없으면 멈춥니다',
    thesis: 'AI 덕분에 도구를 만들기 쉬워진 만큼 버스팩터 1 도구도 쉽게 만들어집니다.',
    items: [{ label: '사용법을 만든 사람만 안다' }, { label: 'API 키가 개인 계정에 묶인다' }, { label: '작동 로직 문서가 없다' }]
  },
  {
    slug: 'meeting-map-before-minutes', category: 'WORKFLOW', layout: 'flow', composition: 'split',
    title: '회의를 시작하기 전에 결정 지도부터 그려야 합니다',
    thesis: '참석자와 결정 권한이 먼저 확정되지 않으면 회의록은 논쟁의 속기록이 됩니다.',
    items: [{ label: '결정 항목 확정' }, { label: '결정자 지정' }, { label: '의견 제공자 사전 입력' }, { label: '회의에서 결정' }]
  },
  {
    slug: 'control-room-metric-pruning', category: 'OPERATIONS', layout: 'compare', composition: 'split',
    title: '지표는 늘어나는데 없애는 기준이 없습니다',
    thesis: '지표를 추가하는 것은 문제에 반응하는 능력이고, 지표를 없애는 것은 무엇이 중요한지 판단하는 능력입니다.',
    items: [{ label: '지표 추가', detail: '문제마다 쌓이고 비대칭 구조로 사라지지 않는다' }, { label: '지표 폐기 기준', detail: '3개월 결정 무관, 중복, 문제 해결됨이면 비활성화한다' }]
  },
  {
    slug: 'govfund-shadow-work', category: 'NEW BUSINESS', layout: 'compare', composition: 'split',
    title: '정부지원사업 수주 후에 진짜 일이 시작됩니다',
    thesis: '지원사업의 실비용은 사업비가 아닙니다. 정산, 감사 대응, 중간 보고가 팀의 실행 자원을 소모합니다.',
    items: [{ label: '사업비 집행', detail: '계획서에 적힌 연구와 개발' }, { label: '그림자 업무', detail: '정산 증빙, 중간 보고, 현장 감사 대응' }]
  },
  {
    slug: 'gov-rnd-execution-muscle', category: 'NEW BUSINESS', layout: 'compare', composition: 'split',
    title: '정부 R&D를 끝낸 뒤 조직에 무엇이 남습니까',
    thesis: '기술 역량 향상이 시장 실행력으로 전환되는 경로가 별도로 설계되지 않으면 그 둘은 분리됩니다.',
    items: [{ label: 'R&D가 키우는 역량', detail: '마일스톤 관리, 문서화, 감사 대응' }, { label: '상업 실행이 요구하는 역량', detail: '빠른 고객 검증, 출시 일정 단축, 기능 우선순위 결정' }]
  },
  {
    slug: 'app-downloads-are-not-moat', category: 'NEW BUSINESS', layout: 'compare', composition: 'split',
    title: '앱 다운로드 100만은 경쟁 우위가 아닙니다',
    thesis: '설치 수는 시작점이지 해자가 아닙니다. 경쟁사가 같은 기능을 만들어도 고객이 남는 이유가 해자입니다.',
    items: [{ label: '다운로드 수', detail: '마케팅 효과를 보여준다. 6개월 뒤 경쟁사도 만들 수 있다' }, { label: '리텐션과 전환 비용', detail: '고객이 이동하지 않는 이유를 보여주는 지표다' }]
  },
  {
    slug: 'ai-reading-vs-understanding', category: 'AX EDUCATION', layout: 'compare', composition: 'split',
    title: 'AI 요약을 읽은 뒤 설명하지 못하면 그것은 이해가 아닙니다',
    thesis: '읽히는 느낌과 이해는 다른 인지 과정입니다. 설명할 수 있어야 의사결정에 쓸 수 있는 이해입니다.',
    items: [{ label: '정보 소비', detail: '유창하게 읽혔다, 다 알 것 같다' }, { label: '이해', detail: '설명할 수 있다, 반론을 제기할 수 있다' }]
  },
  {
    slug: 'exec-ai-investment-judgment', category: 'AI STRATEGY', layout: 'stack', composition: 'vertical',
    title: 'AI에 예산을 배정하기 전에 직접 써봐야 달라지는 세 가지 판단',
    thesis: '직접 써본 임원은 파일럿 범위, 사람 검토 단계, 성과 지표를 다르게 설정합니다.',
    items: [{ label: '파일럿 범위' }, { label: '사람 검토 단계' }, { label: '측정 가능한 성과 지표' }]
  },
  {
    slug: 'ai-tool-count-not-a-metric', category: 'AI STRATEGY', layout: 'compare', composition: 'reverse',
    title: '도입한 AI 도구 수를 이사회에 보고하는 것이 AI 전략을 후퇴시키는 이유',
    thesis: '세기 쉬운 것이 지표가 되면 조직은 실질 변화 대신 숫자를 채우는 쪽으로 움직입니다.',
    items: [{ label: 'AI 도구 수', detail: '도입됐는가를 측정한다' }, { label: '업무 방식 변화', detail: '달라졌는가를 측정한다' }]
  },
  {
    slug: 'saved-time-conversion-gap', category: 'WORKFLOW', layout: 'flow', composition: 'split',
    title: 'AI로 아낀 시간이 회사 손익에 나타나지 않는 이유',
    thesis: '절약된 시간이 성과로 전환되려면 명시적 의사결정이 필요합니다. 자동으로 전환되지 않습니다.',
    items: [{ label: '시간 절약' }, { label: '전환 결정 부재' }, { label: '팀 내 흡수' }, { label: '손익 변화 없음' }]
  },
  {
    slug: 'question-design-as-skill', category: 'AX EDUCATION', layout: 'compare', composition: 'split',
    title: 'AI 질문을 잘 만드는 직원이 팀에 두 명이면 그것은 역량이 아니라 의존입니다',
    thesis: '개인 역량과 팀 역량은 다릅니다. 잘 작동한 질문을 공유하면 팀 기준으로 이동합니다.',
    items: [{ label: '개인 역량', detail: '그 두 명이 없으면 팀의 AI 수준이 급감한다' }, { label: '팀 역량', detail: '잘 작동한 질문이 팀 공유 기준이 된다' }]
  },
  {
    slug: 'bad-news-travel-time', category: 'OPERATING SYSTEM', layout: 'flow', composition: 'reverse',
    title: '나쁜 소식이 CEO에게 도달하는 데 며칠이 걸리는지 측정해 본 적 있습니까',
    thesis: '나쁜 소식 도달 시간은 측정 가능한 수치입니다. 측정 없이는 단축도 없습니다.',
    items: [{ label: '현장 발생' }, { label: '완충(확정 대기)' }, { label: '포장(강도 낮춤)' }, { label: 'CEO 인지' }]
  },
  {
    slug: 'undelegatable-decision-types', category: 'ORG AND PEOPLE', layout: 'stack', composition: 'vertical',
    title: '위임해도 되는 결정과 CEO만 할 수 있는 결정은 구조가 다릅니다',
    thesis: '위임 불가 결정은 세 구조로 판별합니다. 이 목록이 없으면 모든 결정이 CEO에게 오거나, 와야 할 것이 안 옵니다.',
    items: [{ label: 'CEO 고유 맥락 의존' }, { label: '조직 전체 귀속 책임' }, { label: '내부 이해 충돌 중재' }]
  },
  {
    slug: 'newbiz-institutionalization-trap', category: 'NEW BUSINESS', layout: 'timeline', composition: 'vertical',
    title: '기업 신사업이 사내 인정을 받을수록 더 빨리 죽는 이유',
    thesis: '제도화 단계가 신사업의 가장 치명적인 지점입니다. 인정의 방식이 기존 BU 편입이기 때문입니다.',
    items: [{ label: '챔피언 창업' }, { label: '첫 고객 확보' }, { label: '기존 BU 편입' }, { label: '핵심 인재 이탈' }]
  },
  {
    slug: 'counteroffer-structural-latency', category: 'ORG AND PEOPLE', layout: 'compare', composition: 'split',
    title: '에이스가 사표를 낸 뒤에야 연봉 이야기가 나오는 구조적 이유',
    thesis: '카운터오퍼가 가능했다면 사전 인상도 가능했습니다. 사표가 트리거가 되는 것은 시스템의 구조적 지연입니다.',
    items: [{ label: '사표 이후', detail: '긴박성이 생겨 예외 승인이 난다' }, { label: '사표 이전', detail: '보상 검토 주기 안에 경로가 없다' }]
  },
  {
    slug: 'rule-asymmetry-no-deletion', category: 'OPERATING SYSTEM', layout: 'compare', composition: 'split',
    title: '규정을 만드는 절차는 있는데 없애는 절차가 없는 이유',
    thesis: '신설에는 승인 절차가 있고 폐지에는 없습니다. 구조가 비대칭이면 결과도 비대칭입니다.',
    items: [{ label: '규정 신설', detail: '사건, 검토, 승인, 담당 부서가 있다' }, { label: '규정 폐지', detail: '제안 채널, 검토 기준, 담당자가 없다' }]
  }
];

export const INSIGHT_VISUALS_BY_SLUG = new Map(INSIGHT_VISUALS.map((item) => [item.slug, item]));
