(function(){
  window.__INSIGHTS_JS_V = 4;
  var header = document.getElementById('header');
  var mobileMenuBtn = document.getElementById('mobileMenuBtn');
  var mobileMenu = document.getElementById('mobileMenu');
  var mobileClose = document.getElementById('mobileClose');
  var mobileLinks = document.querySelectorAll('.mobile-nav-link');
  function updateHeader(){ if (!header) return; if (window.scrollY > 20) header.classList.add('scrolled'); else header.classList.remove('scrolled'); }
  function openMenu(){ if (!mobileMenu) return; mobileMenu.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeMenu(){ if (!mobileMenu) return; mobileMenu.classList.remove('open'); document.body.style.overflow = ''; }
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMenu);
  mobileLinks.forEach(function(link){ link.addEventListener('click', closeMenu); });

  // 허브: 토픽 칩 필터링 (data-filter 칩 + data-topic 카드)
  var chips = document.querySelectorAll('.topic-chip[data-filter]');
  var gridCards = document.querySelectorAll('.insight-grid .insight-card[data-topic]');
  if (chips.length && gridCards.length) {
    chips.forEach(function(chip){
      chip.addEventListener('click', function(event){
        event.preventDefault();
        var filter = chip.getAttribute('data-filter');
        chips.forEach(function(c){ c.classList.remove('active'); c.removeAttribute('aria-current'); });
        chip.classList.add('active');
        chip.setAttribute('aria-current', 'true');
        var visible = 0;
        gridCards.forEach(function(card){
          var show = filter === '전체' || card.getAttribute('data-topic') === filter;
          card.classList.toggle('filtered-out', !show);
          if (show) visible += 1;
        });
        var heading = document.getElementById('latest-title');
        if (heading) heading.textContent = filter === '전체' ? '최근 인사이트' : filter + ' (' + visible + ')';
        var latest = document.getElementById('latest');
        if (latest) latest.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  // 글 상세: 읽기 진행 바 + 이전/다음 내비게이션
  var postBody = document.querySelector('.post-body');
  if (postBody) {
    // v3: 컨테이너 가이드선(container-lines 스킬). CSS가 데스크톱 한정으로 표시
    var guides = document.createElement('div');
    guides.className = 'container-guides';
    guides.setAttribute('aria-hidden', 'true');
    document.body.appendChild(guides);
    var bar = document.createElement('div');
    bar.className = 'read-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);
    var updateProgress = function(){
      var rect = postBody.getBoundingClientRect();
      var total = rect.height - window.innerHeight;
      var done = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      bar.style.width = (total > 0 ? (done / total) * 100 : 100) + '%';
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });

    var posts = window.INSIGHT_POSTS || [];
    var current = window.location.pathname.split('/').pop().replace('.html', '');
    var index = -1;
    posts.forEach(function(post, i){ if (post.slug === current) index = i; });
    var related = document.querySelector('.related');
    if (index !== -1 && related) {
      var prev = index > 0 ? posts[index - 1] : null;
      var next = index < posts.length - 1 ? posts[index + 1] : null;
      var nav = document.createElement('nav');
      nav.className = 'container post-nav';
      nav.setAttribute('aria-label', '글 이동');
      var html = '';
      if (prev) html += '<a class="post-nav-card" href="' + prev.slug + '.html"><span class="post-nav-kicker">이전 글</span><span class="post-nav-title">' + prev.title + '</span><span class="post-nav-topic">' + prev.topic + '</span></a>';
      else html += '<a class="post-nav-card post-nav-hub" href="../insights.html"><span class="post-nav-kicker">인사이트</span><span class="post-nav-title">전체 글 보기</span><span class="post-nav-topic">Insights Home</span></a>';
      if (next) html += '<a class="post-nav-card post-nav-next" href="' + next.slug + '.html"><span class="post-nav-kicker">다음 글</span><span class="post-nav-title">' + next.title + '</span><span class="post-nav-topic">' + next.topic + '</span></a>';
      else html += '<a class="post-nav-card post-nav-hub post-nav-next" href="../newsletter.html"><span class="post-nav-kicker">Executive Brief</span><span class="post-nav-title">다음 글은 이메일로 받아보세요</span><span class="post-nav-topic">Newsletter</span></a>';
      nav.innerHTML = html;
      related.parentNode.insertBefore(nav, related);
    }
  }

  // 공유 버튼 아이콘화 (v2): 텍스트 pill을 공식 브랜드 글리프 SVG로 교체
  var SHARE_ICONS = {
    copy: { label: '링크 복사', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>' },
    kakao: { label: '카카오톡으로 공유', svg: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3C6.48 3 2 6.58 2 11c0 2.84 1.87 5.33 4.68 6.75-.15.52-.96 3.33-.99 3.55 0 0-.02.17.09.23.11.06.24.01.24.01.32-.04 3.66-2.39 4.24-2.8.57.08 1.15.13 1.74.13 5.52 0 10-3.58 10-8S17.52 3 12 3z"/></svg>' },
    native: { label: '공유', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>' },
    linkedin: { label: 'LinkedIn으로 공유', svg: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/></svg>' },
    x: { label: 'X로 공유', svg: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>' }
  };
  document.querySelectorAll('.share-row [data-share]').forEach(function(btn){
    var type = btn.getAttribute('data-share');
    // 기기 공유 버튼 제거(2026-07-08 사용자 결정): 링크 복사와 구분이 안 되는 유사 아이콘 중복. 카카오/LinkedIn/X/복사 4종으로 절제
    if (type === 'native') { btn.remove(); return; }
    var icon = SHARE_ICONS[type];
    if (icon) { btn.innerHTML = icon.svg; btn.setAttribute('aria-label', icon.label); btn.setAttribute('title', icon.label); }
  });
  var toastEl = null;
  function showToast(message){
    if (!toastEl) { toastEl = document.createElement('div'); toastEl.className = 'share-toast'; toastEl.setAttribute('role', 'status'); document.body.appendChild(toastEl); }
    toastEl.textContent = message;
    toastEl.classList.add('show');
    window.clearTimeout(toastEl._t);
    toastEl._t = window.setTimeout(function(){ toastEl.classList.remove('show'); }, 1800);
  }
  window.__insightsToast = showToast;

  var shareButtons = document.querySelectorAll('[data-share]');
  if (!shareButtons.length) return;

  var titleMeta = document.querySelector('meta[property="og:title"]');
  var descMeta = document.querySelector('meta[property="og:description"]');
  var imageMeta = document.querySelector('meta[property="og:image"]');
  var pageTitle = titleMeta ? titleMeta.content : document.title;
  var pageDescription = descMeta ? descMeta.content : '';
  var pageImage = imageMeta ? imageMeta.content : '';
  var pageUrl = document.querySelector('link[rel="canonical"]') ? document.querySelector('link[rel="canonical"]').href : window.location.href;

  function setCopied(button, label){
    button.classList.add('copied');
    if (window.__insightsToast) window.__insightsToast(label || '링크가 복사되었습니다');
    window.setTimeout(function(){ button.classList.remove('copied'); }, 1800);
  }

  async function copyUrl(button){
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(button, '링크 복사 완료');
    } catch (error) {
      window.prompt('아래 링크를 복사해 주세요.', pageUrl);
    }
  }

  shareButtons.forEach(function(button){
    button.addEventListener('click', async function(){
      var type = button.getAttribute('data-share');
      if (type === 'native') {
        if (navigator.share) {
          try { await navigator.share({ title: pageTitle, text: pageDescription, url: pageUrl }); return; } catch (error) { return; }
        }
        copyUrl(button);
        return;
      }
      if (type === 'copy') { copyUrl(button); return; }
      if (type === 'kakao') {
        if (window.Kakao && window.Kakao.Share && pageImage) {
          window.Kakao.Share.sendDefault({
            objectType: 'feed',
            content: { title: pageTitle, description: pageDescription, imageUrl: pageImage, link: { mobileWebUrl: pageUrl, webUrl: pageUrl } },
            buttons: [{ title: '글 읽기', link: { mobileWebUrl: pageUrl, webUrl: pageUrl } }]
          });
          return;
        }
        copyUrl(button);
        return;
      }
      if (type === 'linkedin') {
        window.open('https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(pageUrl), '_blank', 'noopener,noreferrer');
        return;
      }
      if (type === 'x') {
        window.open('https://twitter.com/intent/tweet?url=' + encodeURIComponent(pageUrl) + '&text=' + encodeURIComponent(pageTitle), '_blank', 'noopener,noreferrer');
      }
    });
  });
})();


/* 글 하단 인라인 구독 폼 (2026-08-18)
   서버가 skipped(동의 누락, 형식 오류)를 돌려줘도 예전 코드는 성공으로 표시했다.
   여기서는 응답을 읽어 실패를 그대로 알린다. */
(function () {
  var REASON = {
    missing_consent: '수집 동의에 체크해 주세요.',
    invalid_email: '이메일 주소를 다시 확인해 주세요.',
    honeypot: '신청이 처리되지 않았습니다. hello@ahn-partners.net 으로 알려주세요.',
    different_form: '신청이 처리되지 않았습니다. hello@ahn-partners.net 으로 알려주세요.'
  };
  var FAIL = '신청 처리 중 문제가 생겼습니다. 잠시 후 다시 시도하시거나 hello@ahn-partners.net 으로 알려주세요.';

  document.querySelectorAll('form[data-newsletter-inline]').forEach(function (form) {
    var msg = form.querySelector('.inline-subscribe-message');
    var btn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var data = new FormData(form);
      var label = btn ? btn.textContent : '';
      msg.className = 'inline-subscribe-message';
      msg.textContent = '';
      if (btn) { btn.disabled = true; btn.textContent = '신청 중...'; }

      fetch('/newsletter.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString()
      }).then(function () {
        return fetch('/.netlify/functions/newsletter-subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: data.get('email') || '',
            name: data.get('name') || '',
            consent_newsletter: data.get('consent_newsletter') || '',
            'bot-field': data.get('bot-field') || '',
            source: 'insights_inline'
          })
        });
      }).then(function (res) {
        return res.json().catch(function () { return {}; });
      }).then(function (body) {
        if (body && body.skipped) {
          msg.className = 'inline-subscribe-message error';
          msg.textContent = REASON[body.reason] || FAIL;
          return;
        }
        form.reset();
        msg.className = 'inline-subscribe-message success';
        msg.textContent = '신청되었습니다. 확인 메일을 보냈으니 받은편지함을 봐 주세요.';
      }).catch(function () {
        msg.className = 'inline-subscribe-message error';
        msg.textContent = FAIL;
      }).then(function () {
        if (btn) { btn.disabled = false; btn.textContent = label; }
      });
    });
  });
})();
