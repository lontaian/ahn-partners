# Ahn Partners Design System

## 1. Atmosphere & Identity

Ahn Partners는 “AI 전환을 결정에서 실행까지 옮기는 기술경영 파트너”처럼 보여야 한다. 표면은 컨설팅 회사처럼 차분하지만, 상호작용과 시각 장치는 실제로 만들고 운영하는 팀의 감각을 보여준다. 시그니처는 **검정 기반의 executive chrome 위에 teal/amber 실행 그라디언트가 짧게 지나가는 구조**다. 홈의 어두운 hero, gooey canvas, 대형 타이포, 흰 카드와 검정 패널의 대비를 유지한다.

Lazyweb 참고점은 복제 대상이 아니라 IA 기준이다. lazyweb.com은 1120px 중앙 칼럼, 얇은 고정 상단 nav, 탭형 보조 메뉴, 실측된 카드/리포트 단위 탐색을 쓴다. Ahn Partners에는 그 구조만 가져오고, 시각 언어는 기존 Ahn의 검정 헤더·대형 한글 타이포·둥근 카드·teal/amber accent를 유지한다.

## 2. Color

### Palette

| Role | Token | Light | Dark | Usage |
|------|-------|-------|------|-------|
| Surface/base | `--bg-color`, `--bg` | `#f8f8f8` | `#050505` | Page background, dark hero background |
| Surface/primary | `--surface-color`, `--surface` | `#ffffff` | `#111111` | Cards, article body panels, newsletter form cards |
| Surface/section-dark | `--section-dark` | `#111111` | `#050505` | Footer, note card, newsletter dark section |
| Surface/deep-blue | `--surface-deep-blue` | `#1a1f2b` | `#1a1f2b` | Service/thinking section |
| Text/primary | `--text-color`, `--text` | `#111111` | `#ffffff` | Headlines, body text |
| Text/secondary | `--text-muted`, `--muted` | `#666666` | `rgba(255,255,255,0.68)` | Descriptions, footer secondary text |
| Text/tertiary | `--text-tertiary` | `#999999` | `#555555` | Footer links, captions, low-emphasis metadata |
| Border/light | `--border-light` | `rgba(0,0,0,0.08)` | `rgba(255,255,255,0.08)` | Cards, header border, separators |
| Border/input | `--border-input` | `rgba(0,0,0,0.14)` | `rgba(255,255,255,0.14)` | Forms and share controls |
| Accent/teal | `--teal` | `#2dd4bf` | `#2dd4bf` | Primary highlight, category accents, focus rings |
| Accent/teal-dark | `--teal-dark` | `#0f766e` | `#0f766e` | Eyebrow text, input focus border |
| Accent/amber | `--amber` | `#f5a623` | `#f5a623` | Secondary highlight, newsletter hover, gradient stop |
| Accent/gradient | `--grad` | `linear-gradient(120deg,#2dd4bf,#f5a623)` | same | Emphasis text, selected mobile menu item, primary badges |
| Status/success | `--status-success` | `#047857` | `#a7f3d0` | Newsletter success message |
| Status/error | `--status-error` | `#b91c1c` | `#fecaca` | Newsletter error message |

### Rules

- 검정/흰색의 큰 면을 먼저 만들고 accent는 작게 쓴다. Accent는 CTA, active state, focus, metadata highlight에만 쓴다.
- `--grad`는 장식 배경으로 남발하지 않는다. 제목의 핵심 단어, badge, CTA hover에 제한한다.
- Insights 글 카드의 카테고리 색은 기존 프로젝트 카드 색상 체계를 따른다: AI/웹앱 `#0d9488`, 자동화/운영 `#b45309`, 분석 `#6d28d9`, 플랫폼/시스템 `#1d4ed8`.
- Lazyweb의 black/white bordered style은 Ahn에서는 “탭/필터의 구조”만 가져온다. 버튼 radius를 0으로 바꾸지 않는다.

## 3. Typography

### Font Stack

- Primary: `'Inter', 'Pretendard Variable', Pretendard, sans-serif`
- Korean primary: `'Pretendard Variable', Pretendard, var(--font-main)`
- Display serif: `'Playfair Display', serif`
- Mono: only when code, URL, or publication metadata needs a machine-readable tone. Do not introduce a new mono font unless implementation requires it.

### Scale

| Level | Size | Weight | Line Height | Tracking | Usage |
|-------|------|--------|-------------|----------|-------|
| Hero/display-thin | `clamp(2.2rem, 8vw, 5.5rem)` | 100 | 0.8-0.95 | `-0.05em` | English hero word-thin pattern |
| Hero/display-bold | `clamp(3.5rem, 12vw, 10rem)` | 800-900 | 0.8-0.98 | `-0.02em` to `-0.06em` | Main hero word-bold/title pattern |
| Page title | `clamp(3.4rem, 10vw, 7.4rem)` | 800-900 | 0.92-0.94 | `-0.015em` to `-0.06em` | `insights.html`, `newsletter.html` title |
| Section title | `clamp(2.4rem, 7vw, 5.5rem)` | 800-900 | 0.9-1.0 | `-0.015em` to `-0.02em` | Section headers |
| Article H1 | `clamp(2.6rem, 7vw, 5.8rem)` | 900 | 0.96 | `-0.035em` | Individual insight post title |
| H2 | `clamp(1.8rem, 4vw, 3rem)` | 800 | 1.1-1.2 | `-0.04em` | Article sections, card clusters |
| H3/card title | `1.1rem` to `1.8rem` | 700-800 | 1.2-1.3 | `-0.02em` to `-0.04em` | Cards, process titles |
| Lead | `clamp(1.05rem, 2vw, 1.35rem)` | 400 | 1.6-1.8 | normal | Hero/body intro |
| Body | `1rem` | 400 | 1.7-1.8 | normal | Korean body copy |
| Body/sm | `0.85rem` to `0.95rem` | 400-600 | 1.5-1.7 | normal | Metadata, hints, descriptions |
| Eyebrow | `0.75rem` to `0.78rem` | 700-900 | 1.2 | `0.16em` to `0.2em` | Section/category label |

### Rules

- Korean title lines use `word-break: keep-all` by default.
- `Ahn Partners` in visible copy and copyright must not wrap. Use `Ahn&nbsp;Partners` where line wrapping can split the brand.
- Playfair Display italic is reserved for one highlighted English word or title fragment, as in `Newsletter`. Do not use it for Korean body text.
- Lazyweb’s Space Grotesk display style is not adopted because Ahn already has Inter/Pretendard/Playfair contrast. The transferable part is the tight `clamp()` display scale and document-like hierarchy.

## 4. Spacing & Layout

### Base Unit

All spacing derives from 4px. Existing source often uses rem values; map them to the token table below before introducing new UI.

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 4px | Icon-to-label gap, small separators |
| `--space-2` | 8px | Chip padding, micro gaps |
| `--space-3` | 12px | Tab/control padding, compact rows |
| `--space-4` | 16px | Card inner rhythm, form groups |
| `--space-5` | 20px | Container side padding |
| `--space-6` | 24px | Card padding mobile, header gutters |
| `--space-8` | 32px | Card padding desktop, grid gap |
| `--space-10` | 40px | Section-internal gap, list clusters |
| `--space-12` | 48px | Hero action spacing, major card gap |
| `--space-16` | 64px | Compact section padding |
| `--space-20` | 80px | Header height offset, page section gap |
| `--space-24` | 96px | Large section gap |
| `--space-40` | 160px | Home page maximum section rhythm (`10rem`) |

### Grid

- Global max container: `1400px` for header/footer/home sections.
- Content/article max container: `1120px` for insights and newsletter pages.
- Article reading column: `720px-780px` body column, with optional right share rail on desktop.
- Lazyweb reference uses a 1120px centered canvas and tab strip above hero. Ahn should reuse the 1120px insights canvas while keeping the site’s 1400px chrome.

### Breakpoints

- Mobile: `max-width: 768px`, hide desktop nav and show mobile menu.
- Insights panel breakpoint: `820px-900px`, collapse two/three-column layouts to one column.
- Desktop: `min-width: 768px`, project grids become two columns; wider grids may become three only when content remains legible.

### Rules

- Header height is 80px. Anchored sections need `scroll-margin-top: 80px`.
- Full-height heroes use `min-height: 100vh` only where already present; future work should prefer `100dvh` for mobile stability.
- No new page may invent separate header/footer spacing. Use the common chrome from `index.html`, `about.html`, `insights.html`, and `newsletter.html`.

## 5. Components

### Global Header
- **Structure**: fixed header, 80px height, logo mark + wordmark, desktop nav, mobile menu button, full-screen mobile overlay.
- **Variants**: transparent over dark hero on home/about; fixed black glass on content pages.
- **Spacing**: header container `1400px`, side padding `20px`, nav gap `2.5rem`.
- **States**: default, scrolled, active nav, hover, mobile overlay open/closed.
- **Accessibility**: mobile menu button has Korean `aria-label`; close button has `aria-label="닫기"`; overlay locks body scroll.
- **Motion**: background/backdrop/border transition `0.35s`; overlay opacity `0.3s ease`.

### Global Footer
- **Structure**: dark footer, wordmark, one-line descriptor, link cluster, copyright.
- **Variants**: current site-wide footer only; do not create a separate insights footer.
- **Spacing**: `4rem 0 2rem`, top gap `3rem`, link gap `2rem`.
- **States**: footer links transition from `#999` to white.
- **Accessibility**: footer links are text links, not icon-only links.
- **Motion**: color `0.2s` only.

### Hero Title Block
- **Structure**: eyebrow, large title, lead, action row.
- **Variants**: home dark canvas hero; content-page light hero; article detail hero.
- **Spacing**: content-page hero `7rem 0 4rem`, mobile `5rem 0 3rem`.
- **States**: none; title is not interactive.
- **Accessibility**: one `h1` per page.
- **Motion**: reveal animation may be used on full home sections; content pages should keep motion minimal.

### Card
- **Structure**: kicker/category, title, summary, optional metadata, link/action.
- **Variants**: white rounded card, dark note card, project visual card, publication card.
- **Spacing**: `2rem` padding; min height only when card heights need alignment.
- **States**: default, hover, focus-within. Hover lifts by `translateY(-2px to -4px)` and may change background only if contrast remains AA.
- **Accessibility**: if the whole card is clickable, keep a real `<a>` for the title/action and ensure focus ring is visible.
- **Motion**: transform/background/color `0.2s-0.3s`.

### Filter / Topic Strip
- **Structure**: horizontal chip group or segmented tab strip.
- **Source**: existing project filter chips plus Lazyweb’s top segmented navigation.
- **Variants**: sticky category filter, non-sticky topic strip for insights.
- **Spacing**: wrapper padding `8px`, chip padding `8px 18px`, gap `8px`.
- **States**: active, inactive, hover, focus.
- **Accessibility**: if filtering in-page content, use buttons with `aria-pressed`; if navigating to a topic page, use links with `aria-current="page"`.
- **Motion**: color/background/border `0.2s`. No sliding indicator until implemented with reduced-motion support.

### Insight Hub Card
- **Structure**: `article` card with category eyebrow, title, 2-3 sentence summary, publication date, read time, primary link.
- **Variants**: featured large card, standard grid card, compact list item, `Table Note` card.
- **Spacing**: featured card can use a two-column layout; standard grid cards use `2rem` padding and `1.25rem` gap.
- **Featured visual**: 화면의 35% 이상을 차지하는 비주얼은 글의 핵심 주장, 검증된 수치, 업무 구조 중 하나를 독립적으로 전달해야 한다. 제목·카테고리·의미 없는 번호만 넣은 장식 패널은 금지한다.
- **Content density**: 큰 비주얼에는 최소 2개의 관계 있는 정보 단위와 그 관계를 설명하는 시각 문법이 있어야 한다. 정보가 없다면 비주얼 면적을 줄이거나 제거한다.
- **States**: default, hover, focus-within. Hover uses lift and subtle border darkening, not unrelated animation.
- **Accessibility**: title link is the primary focus target; metadata remains text.
- **Motion**: transform `0.2s ease`, border/background `0.2s`.

### Insight Article Page
- **Structure**: category breadcrumb, title, dek, metadata, share row, article body, related insights, newsletter CTA.
- **Variants**: Full Insight, Executive Brief archive, Table Note.
- **Spacing**: body column max `720px-780px`; line height `1.8`; paragraph gap `1.2rem`; section gap `3rem-4rem`.
- **States**: share buttons default/hover/focus/active; copy-link success state.
- **Accessibility**: share actions are buttons/links with labels: `링크 복사`, `카카오톡 공유`, `LinkedIn 공유`, `X 공유`.
- **Motion**: share feedback opacity/label swap only; no distracting body animation.

### Share Controls
- **Structure**: inline share row near article hero and repeated at article end. Optional sticky right rail on desktop only if it does not crowd the article.
- **Variants**: link copy button, Kakao share button, native share button on mobile, LinkedIn/X fallback links.
- **States**: default, hover, focus, active, copied success, SDK unavailable fallback.
- **Accessibility**: buttons require visible text or `aria-label`; do not use emoji icons.
- **Motion**: color/background `0.15s-0.2s`; copied feedback should be immediate and textual.

### Newsletter CTA
- **Structure**: dark section or white elevated card with eyebrow, short pitch, one CTA.
- **Variants**: site section, article footer card, inline paragraph CTA.
- **Spacing**: large section uses current `newsletter-section`; article CTA uses `2rem` card padding.
- **States**: hover lifts CTA by `translateY(-2px)`.
- **Accessibility**: CTA link text states the destination: `Ahn's Executive Brief 구독하기`.

## 6. Motion & Interaction

### Timing

| Type | Duration | Easing | Usage |
|------|----------|--------|-------|
| Micro | 150-200ms | `ease` or `cubic-bezier(0.4,0,0.2,1)` | Link/button hover, share control state |
| Standard | 300-350ms | `ease` | Header chrome, mobile overlay |
| Reveal | 900ms | `cubic-bezier(0.2,0.7,0.2,1)` | Existing `.reveal` sections |
| Card emphasis | 300-500ms | `ease` | Work card glow/wordmark hover |
| Carousel | 650ms | `ease` | Case carousel opacity |

### Rules

- Animate only `transform`, `opacity`, `filter`, `background`, `color`, `border-color`.
- Do not animate layout properties.
- Use `IntersectionObserver` for reveal, as current `index.html` does.
- Respect `prefers-reduced-motion` when adding new article/menu behavior.
- Motion must show state or affordance. Decorative motion is allowed only for the home hero canvas and abstract project visuals already in the brand.

## 7. Depth & Surface

### Strategy

Use **mixed depth**:

| Level | Value | Usage |
|-------|-------|-------|
| Border/subtle | `1px solid rgba(0,0,0,0.08)` | Cards on light backgrounds |
| Header glass | `rgba(5,5,5,0.75)` + `backdrop-filter: blur(16px)` + `1px solid rgba(255,255,255,0.08)` | Fixed chrome |
| Card shadow | `0 24px 80px rgba(0,0,0,0.08-0.10)` | Insights/newsletter cards |
| Dark card shadow | `0 30px 80px rgba(0,0,0,0.35)` | White card over dark section |
| Abstract visual glow | radial gradients + blur `40px-50px` | Project/insight visual cards |
| Rounded card radius | `28px` | Current insights/newsletter cards |
| Small visual radius | `8px-12px` | Work cards, case visuals |
| Pill radius | `999px` | CTA buttons, chips |

### Rules

- Ahn cards should feel editorial and substantial, not flat SaaS tiles.
- Lazyweb’s square, border-only cards are not adopted as a surface style. The useful part is its clean hierarchy and segmented navigation.
- Use shadows on large cards sparingly. If every card has `0 24px 80px`, the page becomes heavy; list-mode cards may use only border and white surface.

## 8. Insights Menu, Sharing & OG Plan

### Position

`/insights` should become an editorial content hub, not a blog roll. The top menu label remains **인사이트**. Under that page, use a Lazyweb-inspired segmented topic strip:

```text
전체 | AI 전략 | AX 교육 | 업무 분석 | 데이터 의사결정 | 운영 시스템 | 신사업 실행 | 테이블 노트
```

Desktop can show this as a horizontal strip below the hero. Mobile should allow horizontal scroll or wrap into two rows; do not hide topics behind a dropdown until there are more than 8 topics.

### Information Architecture

Start with one hub and static article pages:

```text
/insights.html
/insights/ai-strategy-execution.html
/insights/ax-education-design.html
/insights/workflow-analysis-before-ai.html
/insights/table-note-service-system.html
```

When a category has 3+ posts, promote it to a folder hub:

```text
/insights/
  index.html
  ai-strategy/
    index.html
    roadmap-to-execution.html
  table-note/
    index.html
    restaurant-service-system.html
```

### Hub Layout

1. Hero: `Insights` + Korean value proposition.
2. Topic strip: segmented links, active state visible.
3. Featured insight: one large card with category, title, summary, date/read time.
4. Latest grid: 2-3 columns desktop, 1 column mobile.
5. Series blocks: AI 실행, AX 교육 설계, 운영 시스템 노트.
6. `테이블 노트`: visually quieter side section near the lower half, not the top priority.
7. Newsletter CTA: “이메일에서는 Executive Brief, 웹에서는 Full Insight.”

### Individual Post Sharing

Each post needs its own canonical URL and share metadata. A single global OG image is acceptable for the homepage, but it is weak for article sharing. For article sharing, per-post OG is the right default because KakaoTalk, Slack, LinkedIn, X, and iMessage all build the preview from page-level metadata.

Per-post sharing requirements:

- `link rel="canonical"` points to the article URL.
- `og:type` is `article`.
- `og:url`, `og:title`, `og:description`, `og:image`, `og:image:alt` are unique per post.
- `twitter:card` remains `summary_large_image`.
- `article:published_time`, `article:modified_time`, `article:section`, and `article:tag` are included.
- JSON-LD uses `BlogPosting` for normal insights and can use `Article` for more formal reports.

Recommended article meta template:

```html
<link rel="canonical" href="https://ahn-partners.net/insights/ai-strategy-execution.html">
<meta property="og:type" content="article">
<meta property="og:url" content="https://ahn-partners.net/insights/ai-strategy-execution.html">
<meta property="og:title" content="AI 전략이 실행되지 않는 이유 | Ahn Partners">
<meta property="og:description" content="AI 전략이 PoC에서 멈추는 이유와 실행 구조 설계 방법을 정리합니다.">
<meta property="og:image" content="https://ahn-partners.net/images/og/insights/ai-strategy-execution.jpg?v=20260706-1">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="AI 전략이 실행되지 않는 이유 - Ahn Partners">
<meta property="article:published_time" content="2026-07-06T09:00:00+09:00">
<meta property="article:modified_time" content="2026-07-06T09:00:00+09:00">
<meta property="article:section" content="AI 전략">
<meta property="article:tag" content="AI 전략">
<meta property="article:tag" content="AX">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="AI 전략이 실행되지 않는 이유 | Ahn Partners">
<meta name="twitter:description" content="AI 전략이 PoC에서 멈추는 이유와 실행 구조 설계 방법을 정리합니다.">
<meta name="twitter:image" content="https://ahn-partners.net/images/og/insights/ai-strategy-execution.jpg?v=20260706-1">
```

### OG Image System

Per-post OG는 같은 브랜드 프레임 안에서 서로 다른 정보 구조를 보여주는 **일관된 시스템**으로 만든다. 제목과 부제만 바꾼 단일 템플릿 반복은 허용하지 않는다.

- Size: `1200x630`.
- Background: dark `#050505` or off-white `#f8f8f8` depending on series.
- Brand: Ahn Partners wordmark, never split across lines.
- Category label: small eyebrow in teal/amber.
- Title: 2-3 lines max, Korean `keep-all` composition.
- Visual brief: 글마다 `thesis`, `layout`, `composition`, `items`를 작성한다. `scripts/insight-visuals-data.mjs`가 단일 원본이다.
- Visual grammar: `flow`, `compare`, `loop`, `stack`, `timeline`, `ratio`, `matrix`, `signal`, `branch` 중 논지에 맞는 방식을 고른다.
- Composition: `split`, `reverse`, `vertical`을 순환해 모든 이미지가 같은 구도로 보이지 않게 한다.
- Evidence: 숫자는 본문에서 검증된 값만 쓰고, 숫자마다 단위와 의미를 설명하는 라벨을 붙인다. 설명되지 않은 장식 숫자는 금지한다.
- Density: 큰 비주얼 패널에는 최소 2개의 관계 있는 정보 단위가 있어야 한다. 점무늬·글로우·그라데이션만으로 빈 면을 채우지 않는다.
- Accessibility: `og:image:alt`는 글 제목을 설명하고, 정보형 비주얼의 핵심은 본문에도 텍스트로 존재해야 한다.
- Save to `images/og/insights/{slug}.jpg`.
- 한 이미지를 여러 글이 공유하거나 파일이 없는 상태를 허용하지 않는다.
- 생성 후 `node scripts/check-insight-visuals.mjs`로 글별 고유 이미지, 파일 존재, 비주얼 브리프, 시각 문법 다양성을 검사한다.
- Use cache buster query only when replacing an already-deployed image.

### KakaoTalk Sharing

KakaoTalk will still use OG tags when a user pastes a URL. That alone is enough for normal sharing. If the site adds an explicit “카카오톡 공유” button, use Kakao JavaScript SDK only on article pages and fall back to copy-link if the SDK is not loaded.

Share row order:

```text
링크 복사 | 카카오톡 공유 | LinkedIn | X
```

Mobile may call `navigator.share()` first:

```js
if (navigator.share) {
  navigator.share({ title: document.title, text: description, url: location.href });
} else {
  navigator.clipboard.writeText(location.href);
}
```

Kakao explicit button requirements:

- Use the article’s URL, title, description, and per-post OG image.
- Do not hard-code the homepage image.
- If Kakao SDK fails, show `링크가 복사되었습니다.`
- After deployment, Kakao OG cache may need manual clearing: `https://developers.kakao.com/tool/clear/og`.

### My Position

Per-post OG is not optional once individual posts exist. A single fixed OG image makes every shared article look like the homepage and lowers click confidence. Use the global `images/og-image.jpg` only for site-level pages. Every insight article should own its URL, title, description, and OG image.

### First Implementation Scope

Do first:

1. Create `insights.html` hub redesign using existing header/footer chrome.
2. Create 3 static article pages under `/insights/`.
3. Add per-post OG metadata and `BlogPosting` JSON-LD.
4. Add share row with copy-link and native share; Kakao explicit button can be added after Kakao app key decision.
5. Update `sitemap.xml`.

Do later:

1. Category folder hubs.
2. RSS feed.
3. `llms.txt` article index expansion.
4. Automated OG generator.
5. Kakao SDK button if explicit Kakao sharing matters beyond pasted-link previews.
