# Ahn's Newsletter 발송 준비안

작성일: 2026-07-20 (KST)
공식 도메인: https://ahn-partners.net

## 발송 일정

- 2026-07-21 (화) — No.003 「AI는 샀는데 결재판은 그대로인 회사」
  - `Newsletter Subscribers`와 `Gmail Contacts`에 별도 Broadcast로 동시 발송
- 2026-07-23 (목) — No.004 「회의록은 있는데 결정은 없는 회사」
  - `Newsletter Subscribers`와 `Gmail Contacts`에 별도 Broadcast로 동시 발송

두 Audience는 합치지 않습니다. 같은 본문을 Audience별 Broadcast로 나눠 보내 수신자와 발송 결과를 각각 추적합니다.

## 발송 전 체크리스트

- [x] `phantas19@gmail.com`에서 확인한 뉴스레터 수신 동의 지인을 `Gmail Contacts`에 추가
- [x] 사이트 신청자는 `Newsletter Subscribers`, 동의 지인은 `Gmail Contacts`로 분리
- [x] 활성 수신자 수 확인: `Newsletter Subscribers` 15명, `Gmail Contacts` 214명
- [x] HTML 안의 `{{{RESEND_UNSUBSCRIBE_URL}}}` 자리와 연락처 확인
- [x] 전면 개정한 두 뉴스레터를 내부 주소로 다시 시험 발송하고 Resend 수락 확인
- [ ] Gmail 실제 수신 화면에서 모바일 줄바꿈·로고·링크 확인
- [ ] 테스트 승인 뒤 두 Audience의 수신자 수와 새 발송 시각 확인

## 실행 명령(승인 후에만 실행)

```powershell
node --env-file=.env scripts/brief-send.mjs --file briefs/2026-07-21-newsletter.html --subject "AI는 샀는데 결재판은 그대로인 회사" --campaign no003 --audience subscribers --at "<승인한 KST 시각>"
node --env-file=.env scripts/brief-send.mjs --file briefs/2026-07-21-newsletter.html --subject "AI는 샀는데 결재판은 그대로인 회사" --campaign no003 --audience gmail --at "<승인한 KST 시각>"
node --env-file=.env scripts/brief-send.mjs --file briefs/2026-07-23-newsletter.html --subject "회의록은 있는데 결정은 없는 회사" --campaign no004 --audience subscribers --at "<승인한 KST 시각>"
node --env-file=.env scripts/brief-send.mjs --file briefs/2026-07-23-newsletter.html --subject "회의록은 있는데 결정은 없는 회사" --campaign no004 --audience gmail --at "<승인한 KST 시각>"
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
- 이전 원고 No.003 테스트 발송 기록: `c61ddc86-7941-4b7b-b993-10f55104464b`
- 전면 개정 No.003 테스트 ID: `c5616ee4-38ff-4262-b64b-d736d9bb6f26`
- 전면 개정 No.004 테스트 ID: `8e66074e-d083-4515-aeeb-dc6a6b795dc2`
- 최종 편집 검수 No.003 테스트 ID: `39fef865-9890-4bcb-971a-65736ee7b9e2` (`delivered`)
- 최종 편집 검수 No.004 테스트 ID: `1d578c4e-0662-438d-be9b-c645a532a7d3` (`delivered`)

## 최종 승인 예약

| 발송 시각 | 호수 | Audience | Broadcast ID | 상태 |
|---|---:|---|---|---|
| 2026-07-21 08:30 KST | No.003 | Newsletter Subscribers | `fbe14986-5322-4a7a-96d2-fefac898d597` | scheduled |
| 2026-07-21 08:30 KST | No.003 | Gmail Contacts | `e9b2ef45-a49d-435c-8e7c-c89725f1d47c` | scheduled |
| 2026-07-23 08:30 KST | No.004 | Newsletter Subscribers | `9883556c-0ea6-476b-b86f-1712e46c2741` | scheduled |
| 2026-07-23 08:30 KST | No.004 | Gmail Contacts | `8d8ee46b-8153-450c-bca9-05bf73e99e85` | scheduled |

직전 승인 예약 4건은 푸터 문구 교체를 위해 발송 전에 삭제했습니다: `dbf0a1bf-673e-419b-9d56-c4bea1290969`, `ed04a8ca-352c-40ab-a55d-cea29aa8dfa9`, `ef9b57c8-e93f-480f-a76b-055b7272ef26`, `0ad9fbcd-5a87-4153-8a3f-4945aa38f89d`.
