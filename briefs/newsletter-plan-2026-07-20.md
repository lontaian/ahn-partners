# Ahn's Newsletter 발송 준비안

작성일: 2026-07-20 (KST)
공식 도메인: https://ahn-partners.net

## 발송 일정

- 2026-07-21 (화) 08:30 KST — No.003 「답변보다 먼저, 승인 경계를 정하세요」
  - `Newsletter Subscribers`와 `Gmail Contacts`에 별도 Broadcast로 동시 발송
- 2026-07-23 (목) 08:30 KST — No.004 「회의록을 줄이고 결정 로그를 남기세요」
  - `Newsletter Subscribers`와 `Gmail Contacts`에 별도 Broadcast로 동시 발송

두 Audience는 합치지 않습니다. 같은 본문을 Audience별 Broadcast로 나눠 보내 수신자와 발송 결과를 각각 추적합니다.

## 발송 전 체크리스트

- [x] `phantas19@gmail.com`에서 확인한 뉴스레터 수신 동의 지인을 `Gmail Contacts`에 추가
- [x] 사이트 신청자는 `Newsletter Subscribers`, 동의 지인은 `Gmail Contacts`로 분리
- [x] 활성 수신자 수 확인: `Newsletter Subscribers` 15명, `Gmail Contacts` 214명
- [x] HTML 안의 `{{{RESEND_UNSUBSCRIBE_URL}}}` 자리와 연락처 확인
- [x] 두 뉴스레터를 내부 주소로 시험 발송하고 Resend 수락 확인
- [x] Resend에서 두 Audience의 수신자 수, 예약 시각, 캠페인 ID 확인

## 실행 명령(승인 후에만 실행)

```powershell
node --env-file=.env scripts/brief-send.mjs --file briefs/2026-07-21-newsletter.html --subject "답변보다 먼저, 승인 경계를 정하세요" --campaign no003 --audience subscribers --at "2026-07-21T08:30:00+09:00"
node --env-file=.env scripts/brief-send.mjs --file briefs/2026-07-21-newsletter.html --subject "답변보다 먼저, 승인 경계를 정하세요" --campaign no003 --audience gmail --at "2026-07-21T08:30:00+09:00"
node --env-file=.env scripts/brief-send.mjs --file briefs/2026-07-23-newsletter.html --subject "회의록을 줄이고 결정 로그를 남기세요" --campaign no004 --audience subscribers --at "2026-07-23T08:30:00+09:00"
node --env-file=.env scripts/brief-send.mjs --file briefs/2026-07-23-newsletter.html --subject "회의록을 줄이고 결정 로그를 남기세요" --campaign no004 --audience gmail --at "2026-07-23T08:30:00+09:00"
```

예약 후 Resend에서 네 Broadcast가 모두 `scheduled` 상태인지 확인합니다.

## 취소한 잘못된 예약

| 발송 시각 | Audience | Broadcast ID | 상태 |
|---|---|---|---|
| 2026-07-21 08:30 KST | Newsletter Subscribers | `f707f6c9-018f-4528-af22-e2c17f0ec6dd` | deleted |
| 2026-07-21 08:30 KST | Gmail Contacts | `5d30dee8-4341-499d-93b2-adb08dfb60c2` | deleted |
| 2026-07-23 08:30 KST | Newsletter Subscribers | `f4ca7030-1e53-4d9f-af17-ad2c62264a7d` | deleted |
| 2026-07-23 08:30 KST | Gmail Contacts | `3fa5e8b6-4900-4eeb-877a-8baea74c561e` | deleted |

## 모바일 폭 수정으로 다시 취소한 예약

| 발송 시각 | 호수 | Audience | Broadcast ID | 상태 |
|---|---:|---|---|---|
| 2026-07-21 08:30 KST | No.003 | Newsletter Subscribers | `84882e12-a2c8-44b0-9754-f1fb0300d1a3` | deleted |
| 2026-07-21 08:30 KST | No.003 | Gmail Contacts | `fd9686d5-0c44-4023-8451-f69f72247986` | deleted |
| 2026-07-23 08:30 KST | No.004 | Newsletter Subscribers | `44201a82-3348-4787-a829-8e81be291edf` | deleted |
| 2026-07-23 08:30 KST | No.004 | Gmail Contacts | `ef07795a-be45-406b-bc78-107d3608e3e4` | deleted |

## 다크 헤더 로고 교체를 위해 취소한 예약

| 발송 시각 | 호수 | Audience | Broadcast ID | 상태 |
|---|---:|---|---|---|
| 2026-07-21 08:30 KST | No.003 | Newsletter Subscribers | `5c8c2f35-3586-4f15-ba56-ef7aed9ef011` | deleted |
| 2026-07-21 08:30 KST | No.003 | Gmail Contacts | `51746ae9-8a0d-4fb4-8fa3-55cd74b1b48d` | deleted |
| 2026-07-23 08:30 KST | No.004 | Newsletter Subscribers | `412e2ed8-7d85-4a95-9c6a-6067d6d55d6f` | deleted |
| 2026-07-23 08:30 KST | No.004 | Gmail Contacts | `3cefc76b-1b71-4562-9fd6-0f14104af8dd` | deleted |

## 현재 상태

- 검정 헤더용 공식 조합 `ap-mark.png` + `ap-wordmark-web.png` 적용
- No.003 테스트 발송 완료: `c61ddc86-7941-4b7b-b993-10f55104464b`
- 전체 Audience 예약 없음. 테스트 확인 후 No.003과 No.004를 다시 예약해야 함
