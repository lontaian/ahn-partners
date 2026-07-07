(function(){
  window.__INSIGHTS_JS_V = 3;
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
    var previous = button.textContent;
    button.classList.add('copied');
    button.textContent = label || '링크가 복사되었습니다';
    window.setTimeout(function(){ button.classList.remove('copied'); button.textContent = previous; }, 1800);
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
