# AGENTS.md — ahn-partners.net 정적 사이트

Ahn Partners 컨설팅 사이트(ahn-partners.netlify.app, ahn-partners.net). 순수 정적 HTML/CSS.

## 소유와 운영
- 이 저장소는 ahn-partners 운영 루프(hermes cron) 담당이다. 콘텐츠 소재와 톤은
  `C:\Dev\client\personal\brand-engine` 의 CLAUDE.md, playbooks.md 규칙을 따른다.
- 배포는 Netlify. git push 자격은 GCM 헤드리스가 안 되므로 store 헬퍼와 디바이스 플로우를 쓴다.
- `.gitignore` 가 `*.png` 를 막으므로 이미지 추가 시 `git add -f` 가 필요하다.

## 규칙
- 표기 규칙: 대시, 가운뎃점, 말줄임표, 화살표, 이모지 금지. 전 산출물 적용.
- 모든 외부 공개 글은 게시 전 humanize 필수. AI 티 금지.
- LinkedIn 은 개인 채널이다. LinkedIn 콘텐츠에 이 사이트 홍보와 ahn-partners.net 링크를 넣지 않는다.
- 브랜드 자산: ap-abstract 마크와 파비콘, ap-wordmark(Ahn.Partners).
- 이메일 발신 표시명: chris@ 만 Chris Ahn, 그 외 전부 Ahn Partners. 안병선 실명 금지.
