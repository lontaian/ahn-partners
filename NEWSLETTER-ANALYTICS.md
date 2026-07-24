# Newsletter analytics

이 파이프라인은 뉴스레터 한 호의 성과와 전체 뉴스레터 퍼널을 같은 캠페인 키로 연결한다.

## 연결 구조

`brief-send.mjs`가 사이트 링크에 `utm_source=brief`, `utm_medium=email`, `utm_campaign=noNNN`을 붙인다. 발송 성공 시 `config/newsletter-analytics.json`에도 캠페인·발송일·제목을 자동 등록한다.

- Resend: 생성, 유효 전달, 열람 이상, 클릭, 반송, 억제, 신고
- Netlify: 뉴스레터 신청과 사이트 문의, 유입 referrer/UTM
- Gmail: 제목으로 캠페인에 귀속한 직접 회신(선택 수집)
- ahn-partners.net: 뉴스레터 유입, 랜딩 페이지, 내부 링크 이동, 인사이트 50%/90% 읽기, 문의 의향, 구독 제출·완료
- GA4: 위 사이트 행동을 `sessionCampaignName=noNNN` 기준으로 묶어 호별 및 전체 집계

## 실행과 결과물

- 수동 실행: `npm run newsletter:analytics`
- 자동 실행: Windows 작업 스케줄러 `AhnPartners-Newsletter-Analytics-Daily`
- 실행 시각: 매일 09:15 KST
- 브라우저 조건: 없음. Resend API, Netlify API, GA4 서비스 계정을 사용한다.
- 네트워크가 없거나 API가 실패하면 작업은 실패 상태와 로그를 남기고 다음 예약에서 다시 시도한다.

결과물은 Git에 포함되지 않는 `exports/newsletter-analytics/`에 쌓인다.

- `latest.md`: 사람이 읽는 최신 통합 보고서
- `snapshots/YYYY-MM-DD.json`: 날짜별 전체 스냅숏
- `history.jsonl`: 같은 날짜는 갱신하고 날짜순으로 누적한 시계열 원본
- `logs/task-YYYY-MM-DD.log`: 예약 작업 실행 로그
- `private/bounce-backup-*.json`: 반송 주소 삭제 전 비공개 백업

## 호별과 전체 해석

호별 분석은 `noNNN` 한 건에 대해 전달 → 열람 이상 → 클릭 → 사이트 세션 → 내부 행동/전환 → 직접 회신을 본다. 전체 분석은 등록된 모든 캠페인의 같은 단계를 합산해 콘텐츠별 차이와 전체 추세를 함께 본다.

Resend의 `last_event`는 최종 상태이므로 클릭 수신자는 열람 수에 중복되지 않는다. 보고서의 `열람 이상`은 `opened + clicked`로 계산한 고유 최소 관여자 수다.

## 운영

새 뉴스레터는 `brief-send.mjs`로 발송하면 캠페인 레지스트리에 자동 등록된다. 직접 HTML이나 Resend UI로 발송한 경우에는 `config/newsletter-analytics.json`에 캠페인, 날짜, 제목을 추가해야 한다.

반송 정리는 먼저 `npm run newsletter:bounces:check`로 백업과 삭제 대상을 확인한다. 실제 삭제는 `node --env-file=.env scripts/newsletter-remove-bounces.mjs --apply`로만 수행한다. 자발 구독자 목록에 존재하는 주소는 삭제 대상에서 제외된다.
