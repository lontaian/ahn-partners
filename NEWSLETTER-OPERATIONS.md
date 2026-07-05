# Ahn's Newsletter 운영 방식

## 현재 결론

Ahn Partners의 외부 구독 URL은 다음이다.

- `https://ahn-partners.net/newsletter`
- 뉴스레터 공식 명칭: `Ahn's Newsletter`
- Spread 리스트: `Newsletter Subscribers` (`O7Udbj`)

웹 폼 제출은 Netlify Forms에 먼저 저장된다. 이후 Spread 반영 상태는 로컬 운영 명령으로 확인/동기화한다.



## Windows 더블클릭 실행

명령어를 기억할 필요 없이 아래 파일을 Windows 탐색기에서 더블클릭한다.

```text
뉴스레터_동기화_더블클릭.cmd
```

같은 파일의 영문 이름도 있다.

```text
newsletter-sync-double-click.cmd
```

더블클릭하면 새 콘솔 창이 열리고 다음을 자동 실행한다.

1. Windows에서 이 폴더로 이동
2. Windows Node/NPM 확인
3. `npm run newsletter:run` 실행
4. Netlify 제출 확인
5. Spread `Newsletter Subscribers` 동기화
6. 최종 결과 출력
7. Enter를 누를 때까지 창 유지

평소에는 이 파일만 더블클릭하면 된다. WSL은 사용하지 않는다.

## 단발 실행 방식

상시 로컬 서버를 띄우지 않으려면 아래 명령만 사용한다.

```bash
npm run newsletter:run
```

이 명령은 한 번 실행될 때만 리소스를 사용하고 종료된다.

동작 순서:

1. CDP 브라우저(`http://127.0.0.1:9222`)가 살아 있는지 확인한다.
2. 죽어 있으면 `.browser-profile`로 브라우저를 자동 실행한다.
3. Netlify Forms 현재 상태를 확인한다.
4. Spread `Newsletter Subscribers` 리스트에 pending 구독자를 반영한다.
5. 최종 상태를 다시 확인한다.
6. `spreadPending: 0`이면 완료로 출력하고 종료한다.

평소 운영은 이 명령 하나만 기억하면 된다.

Windows CMD에서 직접 실행할 때는 다음과 같다.

```cmd
cd /d C:\dev\active\ahn-partners
npm run newsletter:run
```

Spread/Relate 로그인 세션이 만료된 경우에는 브라우저에서 Google 로그인을 한 번 다시 한 뒤 같은 명령을 재실행한다.

## 새 신청이 들어왔는지 아는 방법

### 1. 이메일 알림

Netlify에 `submission_created` 이메일 hook이 이미 설정되어 있다.

- 수신자: `phantas19@gmail.com`
- 이벤트: 새 form submission 생성
- 확인한 hook id: `699d74360b92f4aa64a5f7fd`

즉 사용자가 `/newsletter` 또는 contact form을 제출하면 Gmail로 Netlify form submission 알림이 와야 한다.

### 2. CLI 상태 확인

```bash
npm run newsletter:status
```

이 명령은 다음을 보여준다.

- Netlify `newsletter` form 원본 제출 수
- Netlify `contact` form 원본 제출 수
- 수신동의/이메일 유효성/테스트 제외 후 실제 구독 대상 수
- Spread 동기화 완료 수
- Spread 동기화 대기 수
- 최근 제출 5건

현재 기준 예시:

- newsletter form 원본 제출: 2
- contact form 원본 제출: 6
- 실제 구독 대상: 1
- Spread pending: 0

## Spread 메일링리스트 업데이트 방법

```bash
npm run newsletter:sync-spread
```

동작:

1. `npm run newsletter:export`로 Netlify Forms에서 신청자를 가져온다.
2. 테스트 제출을 제외한다.
3. 수신동의가 있는 이메일만 남긴다.
4. CDP 브라우저(`http://127.0.0.1:9222`)의 로그인된 Spread 세션으로 `Newsletter Subscribers` 리스트를 연다.
5. 기존 연락처를 검색한다.
6. 없으면 연락처를 만들고, 있으면 기존 contact id로 리스트에 추가한다.
7. 이미 리스트에 있으면 중복을 성공 처리한다.
8. `exports/newsletter-spread-sync.json`에 완료 상태를 기록한다.

재실행해도 이미 동기화된 이메일은 건너뛴다.

## 운영 루틴

권장 루틴:

```cmd
cd /d C:\dev\active\ahn-partners
npm run newsletter:status
npm run newsletter:sync-spread
npm run newsletter:status
```

- 첫 `status`: 새 신청/pending 확인
- `sync-spread`: pending을 Spread에 반영
- 두 번째 `status`: `spreadPending: 0` 확인


## 로컬 관리자 웹

필요할 때만 시각적으로 보고 싶으면 로컬 관리자 웹을 사용할 수 있다. 기본 운영은 단발 실행 방식이다.

### 시작

```bash
npm run newsletter:admin:start
```

출력되는 URL을 브라우저에서 열면 관리자 화면이 뜬다. 예:

```text
http://127.0.0.1:3467/?token=...
```

토큰은 `.netlify/newsletter-admin-token`에 로컬 저장된다. 이 파일은 외부에 공유하지 않는다.

### 기능

관리자 화면에서 할 수 있는 일:

- Netlify Forms 제출 수 확인
- 실제 구독 대상 수 확인
- Spread 동기화 완료/대기 수 확인
- 최근 제출 확인
- `지금 Spread 동기화` 버튼으로 즉시 반영
- 서버가 켜져 있는 동안 10분마다 자동 동기화

### 상태 확인/종료

```bash
npm run newsletter:admin:status
npm run newsletter:admin:stop
```

관리자 서버는 백그라운드로 실행된다. 로그는 `/tmp/ahn-newsletter-admin.out` 및 `exports/newsletter-admin.log`에 남는다.

### 브라우저 세션

관리자 서버와 동기화 스크립트는 자동으로 CDP 브라우저(`http://127.0.0.1:9222`)를 확인하고, 죽어 있으면 `.browser-profile`로 다시 띄운다. 단, Spread/Relate 로그인이 만료되면 사용자가 한 번 Google 로그인을 다시 해야 한다.

## 자동화 root cause와 현재 처리

### 왜 Netlify 제출 직후 Spread 서버리스 자동 등록이 아직 완전하지 않은가

1. Netlify 웹 폼 저장은 정상이다.
2. Netlify Function도 배포되어 있다: `/.netlify/functions/newsletter-subscribe`
3. Relate Public API는 공식 문서상 `Authorization: Bearer {API key}`가 필요하다.
4. Spread/Relate의 Zapier 화면에서 API 키를 생성했지만, `api.relate.so/v1` Public API는 해당 키를 401로 거부했다.
5. 따라서 그 키는 Zapier 연동용 키로 보이며, Public API용 키와 다르다.
6. 서버에서 Spread 내부 UI endpoint를 쿠키로 호출하면 401/422 등 인증/CSRF 문제가 있어 안정적으로 쓸 수 없다.
7. 로그인된 실제 브라우저 컨텍스트 안에서 실행하면 Spread 리스트 추가가 정상 작동한다.

그래서 현재의 미션 완료 기준은 다음이다.

- 제출 저장: Netlify Forms가 담당
- 제출 감지: Netlify 이메일 hook + `newsletter:status`
- 리스트 반영: `newsletter:sync-spread`가 로그인된 브라우저 컨텍스트에서 자동 처리
- 완전 서버리스 전환: Relate에서 Public API용 키를 받으면 기존 Netlify Function이 바로 사용 가능

## Zapier 도입 판단

공식 문서 기준:

- Netlify는 Zapier에서 verified form submission trigger를 지원한다.
- Relate Zapier는 Lead/Contact/Deal/Note 생성 Action을 지원한다.
- Relate Zapier 문서에는 리스트(`Newsletter Subscribers`) entry에 추가하는 Action은 명시되어 있지 않다.

따라서 Zapier로 가능한 것:

1. 새 Netlify form submission 발생
2. Gmail/Google Sheets/Slack 등에 알림 또는 기록
3. Relate Contact/Lead 생성
4. Note로 모든 제출 데이터 저장

Zapier만으로 부족한 것:

- 특정 Spread 리스트 `Newsletter Subscribers`에 contact를 자동으로 넣는 기능은 공식 문서상 확인되지 않았다.

도입 판단:

- 알림/백업/CRM Contact 생성 자동화 용도로는 도입 가치가 있다.
- 뉴스레터 발송 대상 리스트 반영까지 완전 자동화하려면 Public API 키 또는 Relate 측의 리스트 entry Zapier Action 지원이 필요하다.

## Remember/Gmail 주소록 사용 원칙

Remember/Gmail 주소록은 Relate CRM 연락처로 가져올 수 있다. 다만 뉴스레터 발송 대상에 바로 넣으면 안 된다.

운영 원칙:

- CRM 연락처로 가져오기: 가능
- `Ahn's Newsletter` 발송 리스트에 자동 추가: 금지
- 뉴스레터 수신은 `/newsletter`에서 명시적으로 동의한 사람만 추가


## 자동 실행 예약 작업

상시 로컬 서버를 띄우지 않고도 Windows 작업 스케줄러로 하루 1회 자동 동기화한다.

등록된 작업:

```text
AhnPartnersNewsletterSyncDaily
```

현재 설정:

```text
매일 09:00
C:\dev\active\ahn-partners\newsletter-sync-scheduled.cmd
```

스케줄러 전용 실행 파일은 `pause` 없이 종료되며 로그를 남긴다.

```text
exports\newsletter-scheduled.log
```

수동 확인:

```cmd
schtasks /Query /FO LIST /TN AhnPartnersNewsletterSyncDaily
```

로그온 시 실행 작업 `AhnPartnersNewsletterSyncOnLogon`은 현재 Windows 권한 거부로 등록되지 않았다. 일일 09:00 작업은 정상 등록되어 있다.

## 발신 인증/스팸함 진단

Spread 화면 기준 `ahn-partners.net` 발신자 도메인은 `인증됨` 상태다.
확인 URL:

```text
https://app.spread.so/spread/ahn-partners/settings/domains
```

공식 Spread 문서상 커스텀 도메인 발송에는 MX, SPF/DMARC, DKIM 레코드 설정과 인증이 필요하며, CNAME은 DNS Only로 둬야 한다.

현재 DNS 진단 명령:

```cmd
cd /d C:\dev\active\ahn-partners
npm run newsletter:auth
```

현재 확인된 핵심 DNS 상태:

```text
MX: mx1.forwardemail.net, mx2.forwardemail.net
SPF: v=spf1 include:spf.forwardemail.net -all
DMARC: v=DMARC1; p=reject; pct=100; rua=mailto:dmarc-...@forwardemail.net;
envelope MX: feedback-smtp.us-west-1.amazonses.com
envelope SPF: v=spf1 include:amazonses.com ~all
Spread UI: ahn-partners.net 인증됨
```

즉 현재 남은 스팸함 이슈는 단순히 “도메인 인증 미완료”로 보이지 않는다. 다음 판정은 Gmail 원본 헤더가 필요하다.

Gmail 원본 헤더를 파일로 저장한 뒤 아래처럼 실행한다.

```cmd
npm run newsletter:auth -- --header=exports\gmail-original-header.txt
```

확인할 항목:

- SPF pass/fail
- DKIM pass/fail
- DMARC pass/fail
- DKIM `d=` 도메인
- DKIM `s=` selector
- Return-Path
- mailed-by / signed-by

판정 기준:

1. SPF/DKIM/DMARC 중 fail이 있으면 Spread 발신 DNS 또는 alignment 문제다.
2. 모두 pass인데 스팸함이면 신규 도메인 평판, 발송량 워밍업, 본문/링크/수신자 반응 문제다.
3. Gmail 검색 기준 현재 스팸함에서 `ahn-partners.net`, `newsletter@ahn-partners.net`, `Ahn Partners` 테스트 메일은 자동 검색되지 않았다. 메일이 남아 있으면 Gmail UI에서 원본 보기를 열어 헤더를 저장해야 한다.


### 2026-07-05 Gmail 원본 헤더 판정 결과

받은편지함으로 이동된 테스트 메일에서 원본 헤더를 확인했다.

대상 메일:

```text
From: Ahn's Newsletter <newsletter@ahn-partners.net>
Subject: [TEST] Ahn Partners 뉴스레터 발송 설정 확인
Return-Path: ...@envelope.ahn-partners.net
발송 인프라: Amazon SES us-west-1
```

진단 명령:

```cmd
npm run newsletter:auth -- --header=exports\gmail-original-ahn-newsletter.txt
```

결과:

```text
SPF: PASS
DKIM: PASS, d=ahn-partners.net, s=3mmfdklq3jsouvqujdbj73wee5x5eyh2
DMARC: PASS, header.from=ahn-partners.net, p=REJECT
Return-Path: envelope.ahn-partners.net
DKIM DNS: 3mmfdklq3jsouvqujdbj73wee5x5eyh2._domainkey.ahn-partners.net 정상
```

결론:

- DNS/SPF/DKIM/DMARC 인증 문제는 아니다.
- Spread 커스텀 발신 도메인 설정도 UI에서 `인증됨`이다.
- Gmail 스팸함 이동 원인은 인증 실패가 아니라 신규 도메인/신규 발신자 평판, 테스트성 제목(`[TEST]` 반복), 짧은 본문, Gmail 사용자 학습 이슈로 보는 것이 맞다.

조치:

1. 테스트 메일을 스팸함에서 받은편지함으로 옮긴 상태는 Gmail에 정상 신호를 준다.
2. 다음 발송부터 제목의 `[TEST]` 반복을 제거한다.
3. 첫 실제 발송은 소수의 신뢰 수신자에게 보내고, 받은편지함 도착/열람/답장을 유도한다.
4. 한 번에 대량 발송하지 말고 10명 이하 → 20명 이하 → 50명 이하로 천천히 늘린다.
5. 본문 하단에 발신자/수신거부/문의 정보를 명확히 넣는다.
