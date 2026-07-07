# Ahn Partners Insights 로컬 구현·검증 보고서

작성일: 2026-07-07  
대상 저장소: `/mnt/c/dev/client/personal/ahn-partners`  
상태: 로컬 구현 완료, 커밋/푸시/배포 미실행

이 문서는 `/insights` 로컬 구현 결과를 외부 검증자가 재현·분석할 수 있도록 작업 범위, 변경 파일, QA 결과, 남은 검토 포인트를 한곳에 정리한 기록이다.

---

## 1. 작업 목표

- Ahn Partners 사이트에 `/insights` 콘텐츠 허브를 로컬 구현한다.
- 일반 블로그가 아니라 `AI 전환`, `AX 교육`, `업무 분석`, `운영 시스템`, `신사업 실행` 중심의 전문가형 인사이트 허브로 구성한다.
- `lazyweb.com`은 시각 복제가 아니라 정보 구조 참고용으로만 사용한다.
- 기존 Ahn Partners 브랜드 chrome을 유지한다.
  - black glass header
  - dark footer
  - Inter / Pretendard / Playfair font stack
  - teal / amber accent
  - rounded elevated cards
- 글별 공유가 가능하도록 각 글에 고유 URL, OG metadata, JSON-LD, OG 이미지를 둔다.
- 배포는 사용자 컨펌 전까지 하지 않는다.

---

## 2. 주요 산출물

### 신규/수정된 핵심 파일

```text
DESIGN.md
INSIGHTS_LOCAL_IMPLEMENTATION_REPORT.md
insights.html
insights/insights.css
insights/insights.js
insights/ai-strategy-execution.html
insights/ax-education-design.html
insights/workflow-analysis-before-ai.html
images/og/insights/ai-strategy-execution.jpg
images/og/insights/ax-education-design.jpg
images/og/insights/workflow-analysis-before-ai.jpg
netlify.toml
sitemap.xml
```

### Git 상태 기준 변경 목록

최종 확인 명령:

```bash
GIT_MASTER=1 git status --short --untracked-files=all
```

출력:

```text
 M insights.html
 M netlify.toml
 M sitemap.xml
?? DESIGN.md
?? INSIGHTS_LOCAL_IMPLEMENTATION_REPORT.md
?? images/og/insights/ai-strategy-execution.jpg
?? images/og/insights/ax-education-design.jpg
?? images/og/insights/workflow-analysis-before-ai.jpg
?? insights/ai-strategy-execution.html
?? insights/ax-education-design.html
?? insights/insights.css
?? insights/insights.js
?? insights/workflow-analysis-before-ai.html
```

Diff stat 최종 확인:

```bash
GIT_MASTER=1 git diff --stat
```

출력:

```text
 insights.html | 177 ++++++++++++++++++++++++++++++++++++----------------------
 netlify.toml  |  16 +++++-
 sitemap.xml   |  18 ++++++
 3 files changed, 144 insertions(+), 67 deletions(-)
```

참고: `git diff --stat`은 tracked 파일만 집계한다. 신규 untracked 파일은 위 `git status --short --untracked-files=all` 목록을 기준으로 확인해야 한다.

---

## 3. 구현 내용 요약

### 3.1 `/insights` 허브

파일: `insights.html`

구성:

- hero: `AI 전환을 실행의 언어로`
- topic strip:
  - 전체
  - AI 전략
  - AX 교육
  - 업무 분석
  - 데이터 의사결정
  - 운영 시스템
  - 신사업 실행
  - 테이블 노트
- featured insight
- latest insights 3개 카드
- 주제 시리즈 카드
- `테이블 노트` side-note 섹션
- newsletter CTA
- 기존 header/footer 유지
- hub JSON-LD: `CollectionPage`

중요 수정:

- 로컬 단순 서버에서 `/newsletter`가 404가 되던 문제를 막기 위해 CTA href를 `newsletter.html`로 수정했다.

### 3.2 글 상세 3개

파일:

```text
insights/ai-strategy-execution.html
insights/ax-education-design.html
insights/workflow-analysis-before-ai.html
```

각 글 공통 구성:

- breadcrumb
- category / title / dek / meta
- 공유 버튼 5개
  - 링크 복사
  - 카카오톡 공유
  - 기기 공유
  - LinkedIn
  - X
- 본문 카드
- aside CTA
- related posts
- 기존 header/footer 유지
- 글별 canonical URL
- `og:type=article`
- 글별 `og:image`
- Twitter card
- `article:published_time`, `article:modified_time`, `article:section`, `article:tag`
- JSON-LD: `BlogPosting`

### 3.3 공유 동작

파일: `insights/insights.js`

동작:

- 모바일 메뉴 open/close
- body scroll lock
- `navigator.clipboard.writeText` 기반 링크 복사
- `navigator.share` 지원 시 native share
- Kakao SDK가 있으면 Kakao Share 사용
- Kakao SDK가 없으면 링크 복사 fallback
- LinkedIn / X는 popup share URL open

로컬에서는 Kakao SDK가 없으므로 `카카오톡 공유`는 링크 복사 fallback으로 동작한다.

### 3.4 OG 이미지

파일:

```text
images/og/insights/ai-strategy-execution.jpg
images/og/insights/ax-education-design.jpg
images/og/insights/workflow-analysis-before-ai.jpg
```

확인 결과:

```text
JPEG image data, 1200x630, components 3
```

각 글은 자기 글의 OG 이미지를 참조한다.

### 3.5 Netlify / sitemap

파일: `netlify.toml`

추가:

```toml
[[headers]]
  for = "/insights/*.html"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"

[[redirects]]
  from = "/insights"
  to = "/insights.html"
  status = 200

[[redirects]]
  from = "/insights/:slug"
  to = "/insights/:slug.html"
  status = 200
```

파일: `sitemap.xml`

추가 URL:

```text
https://ahn-partners.net/insights/ai-strategy-execution.html
https://ahn-partners.net/insights/ax-education-design.html
https://ahn-partners.net/insights/workflow-analysis-before-ai.html
```

---

## 4. 로컬 검증 방법

### 4.1 로컬 서버 실행

저장소 루트에서:

```bash
python3 -m http.server 4186
```

검증 URL:

```text
http://127.0.0.1:4186/insights.html
http://127.0.0.1:4186/insights/ai-strategy-execution.html
http://127.0.0.1:4186/insights/ax-education-design.html
http://127.0.0.1:4186/insights/workflow-analysis-before-ai.html
http://127.0.0.1:4186/newsletter.html
```

### 4.2 HTTP status 확인

실행한 명령:

```bash
for url in \
  "http://127.0.0.1:4186/insights.html" \
  "http://127.0.0.1:4186/newsletter.html" \
  "http://127.0.0.1:4186/insights/ai-strategy-execution.html" \
  "http://127.0.0.1:4186/insights/ax-education-design.html" \
  "http://127.0.0.1:4186/insights/workflow-analysis-before-ai.html"; do
  curl -s -o /dev/null -w '%{http_code} %{url_effective}\n' "$url"
done
```

확인 결과:

```text
200 http://127.0.0.1:4186/insights.html
200 http://127.0.0.1:4186/newsletter.html
200 http://127.0.0.1:4186/insights/ai-strategy-execution.html
200 http://127.0.0.1:4186/insights/ax-education-design.html
200 http://127.0.0.1:4186/insights/workflow-analysis-before-ai.html
```

### 4.3 정적 참조/JSON-LD 확인

실행한 검증:

- `insights.html` 및 글 상세 3개에서 `href` / `src` 참조 확인
- JSON-LD 파싱 확인
- OG image 참조 파일 존재 확인

결과:

```text
HTML href/src and JSON-LD OK for 4 pages
```

---

## 5. Browser QA 결과

Playwright로 실제 브라우저에서 확인했다.

### 5.1 Desktop 1280px

대상:

```text
hub-desktop
ai-desktop
ax-desktop
workflow-desktop
```

확인 결과:

- 모든 route 정상 로드
- `scrollWidth === viewportWidth`
- horizontal overflow 없음
- console error 0
- active nav: `인사이트`
- footer present
- 글 상세 share button count: 5
- 글 상세 JSON-LD: `BlogPosting`
- hub JSON-LD: `CollectionPage`

### 5.2 Mobile 375px

대상:

```text
hub-mobile
ai-mobile
article blockquote check for all 3 articles
```

확인 결과:

- horizontal overflow 없음
- topic strip은 의도적으로 horizontal scroll
- 모바일 메뉴 open 시 body overflow: `hidden`
- 모바일 메뉴 close 시 body overflow: `""`
- blockquote 줄바꿈 CJK 문제 수정 확인

### 5.3 공유 버튼 동작

검증 대상: `insights/ai-strategy-execution.html`

결과:

```json
{
  "copy": { "text": "링크 복사 완료", "copied": true },
  "kakao": { "text": "링크 복사 완료", "copied": true },
  "native": { "text": "링크 복사 완료", "copied": true }
}
```

LinkedIn / X:

- LinkedIn popup 열림
- X intent tweet URL 열림

### 5.4 newsletter CTA

검증 대상: `insights.html`

확인 결과:

```json
{
  "newsletterLinks": ["newsletter.html", "newsletter.html"],
  "ctaClickUrl": "http://127.0.0.1:4186/newsletter.html",
  "ctaClickTitle": "Ahn's Newsletter 구독 | Ahn Partners"
}
```

---

## 6. LSP / Biome 검증

사용자가 Biome 재설치를 요청해 전역 설치했다.

설치 명령:

```bash
npm install -g @biomejs/biome
```

확인:

```bash
command -v biome
biome --version
```

결과:

```text
/home/chris/.nvm/versions/node/v24.14.0/bin/biome
Version: 2.5.2
```

Biome 설치 후 LSP diagnostics를 실행했고, 처음에는 접근성/스타일 경고가 잡혔다. 다음 항목을 수정했다.

- 모바일 메뉴 버튼에 `type="button"` 추가
- 장식 SVG에 `aria-hidden="true" focusable="false"` 추가
- 글 상세 공유 버튼들에 `type="button"` 추가
- share row의 불필요한 ARIA 제거
- CSS의 불필요한 `!important` 제거
- blockquote CJK 줄바꿈 규칙 유지

최종 diagnostics 대상:

```text
insights.html
insights/ai-strategy-execution.html
insights/ax-education-design.html
insights/workflow-analysis-before-ai.html
insights/insights.css
insights/insights.js
```

최종 결과:

```text
No diagnostics found
```

---

## 7. Visual QA / Oracle 리뷰 결과

### 7.1 1차 CJK visual QA

결과: PASS with concerns

의견:

- desktop hub/article, mobile hub/article 전반은 Ahn chrome과 CJK 줄바꿈 기준에 맞음
- non-blocking polish:
  - hero subcopy의 `Full / Insight` 줄바꿈은 `Full&nbsp;Insight`로 다듬을 수 있음
  - newsletter CTA의 `깊게` 단독 줄은 의도적 편집으로 볼 수 있음

### 7.2 1차 integrity visual QA

결과: REVISE

blocker:

- `insights.html`의 두 CTA가 `href="/newsletter"`라서 단순 로컬 서버에서 404 발생

수정:

- 두 링크를 `newsletter.html`로 변경

post-fix Oracle 결과:

```text
VERDICT: PASS
BLOCKING: None for local-only completion
```

### 7.3 fresh visual QA A

결과: PASS

요약:

- real DOM/static-site implementation
- Ahn Partners chrome 유지
- route loading 정상
- console error 없음
- desktop/mobile overflow 없음
- share fallback 정상
- metadata/OG/JSON-LD 정상
- sitemap/Netlify config 정상

### 7.4 fresh visual QA B

결과: REVISE

blocker:

- 모바일 AI 글 blockquote에서 `운영 방식 / 의 재설계입니다.`로 조사 `의`가 분리됨

수정:

```css
.post-body blockquote{word-break:keep-all;line-break:strict}
```

post-fix mobile 375px 확인:

```json
[
  {
    "page": "AI",
    "lines": ["AI 전략은 도입 목록이 아니라 운영", "방식의 재설계입니다."],
    "rule": "keep-all/strict"
  },
  {
    "page": "AX",
    "lines": ["교육은 이벤트가 아니라 운영 방식 변경의", "시작점입니다."],
    "rule": "keep-all/strict"
  },
  {
    "page": "Workflow",
    "lines": ["AI 적용 후보는 업무 목록이 아니라 흐름", "위에서 찾아야 합니다."],
    "rule": "keep-all/strict"
  }
]
```

post-fix CJK Oracle 결과:

```text
VERDICT: PASS
BLOCKING: None for the previous CJK blocker or obvious regressions
```

---

## 8. 외부 검수 체크리스트

### 8.1 허브 페이지

열기:

```text
http://127.0.0.1:4186/insights.html
```

확인할 것:

- Ahn Partners 기존 header/footer와 톤이 맞는가
- hero 문구가 적절한가
- topic strip 구성이 적절한가
- latest 글 3개 구성이 적절한가
- `테이블 노트`의 위치와 톤이 적절한가
- newsletter CTA가 자연스러운가
- mobile 375px에서 topic strip scroll이 어색하지 않은가

### 8.2 글 상세 3개

열기:

```text
http://127.0.0.1:4186/insights/ai-strategy-execution.html
http://127.0.0.1:4186/insights/ax-education-design.html
http://127.0.0.1:4186/insights/workflow-analysis-before-ai.html
```

확인할 것:

- 제목과 dek가 Ahn Partners 톤에 맞는가
- 본문이 너무 AI스럽거나 과장되지 않았는가
- 본문 길이가 적절한가
- CTA가 글 주제와 맞는가
- 관련 글 연결이 자연스러운가
- 모바일에서 제목과 blockquote 줄바꿈이 어색하지 않은가

### 8.3 공유 버튼

각 글 상세에서 확인:

- 링크 복사
- 카카오톡 공유
- 기기 공유
- LinkedIn
- X

로컬 기대 동작:

- Kakao SDK 없음 → 링크 복사 fallback
- `링크 복사 완료` 문구 표시
- LinkedIn/X는 popup 또는 새 탭 share URL

### 8.4 OG 이미지

확인 파일:

```text
images/og/insights/ai-strategy-execution.jpg
images/og/insights/ax-education-design.jpg
images/og/insights/workflow-analysis-before-ai.jpg
```

확인할 것:

- 1200x630 사이즈
- 제목 가독성
- Ahn Partners 브랜드 톤
- 카카오톡/LinkedIn 공유 썸네일로 자연스러운지

---

## 9. 아직 하지 않은 것

- 커밋하지 않음
- 푸시하지 않음
- 배포하지 않음
- Netlify 실제 배포 라우팅은 검증하지 않음
- Kakao 실제 공유 캐시는 배포 후에만 검증 가능

배포 후 Kakao OG cache clear:

```text
https://developers.kakao.com/tool/clear/og
```

---

## 10. 승인 후 권장 다음 단계

사용자 검수 승인 후:

1. 최종 diff 확인

   ```bash
   GIT_MASTER=1 git status --short --untracked-files=all
   GIT_MASTER=1 git diff
   ```

2. 필요 시 atomic commit 계획 수립

   변경 파일 수가 많으므로 단일 커밋보다 2개 이상으로 나누는 것이 좋다.

   예시 분리:

   - 디자인 시스템/허브 구조
   - 글 상세/공유/OG 이미지
   - sitemap/Netlify 라우팅
   - 검증 보고서

3. 커밋

   이 환경에서는 git-master 규칙상 모든 git 명령에 `GIT_MASTER=1` prefix 필요.

4. 배포

   사용자가 명시적으로 승인한 후에만 진행.

5. 배포 후 검증

   - `/insights`
   - `/insights/ai-strategy-execution`
   - `/insights/ax-education-design`
   - `/insights/workflow-analysis-before-ai`
   - Kakao OG cache clear
   - 카카오톡/LinkedIn/X 실제 preview 확인

---

## 11. 최종 판정

현재 기준:

```text
로컬 구현: 완료
로컬 QA: 통과
LSP/Biome diagnostics: 통과
Visual QA blockers: 해소
커밋: 미실행
푸시: 미실행
배포: 미실행
```

외부 검수자는 이 문서의 URL과 체크리스트를 따라 로컬에서 동일 표면을 확인하면 된다.
