// GA4 로더. 측정 ID는 아래 한 줄만 교체하면 전 페이지에 적용된다.
// 속성: ahn-partners.net (계정 262010376, 스트림 15227496273, 설치 2026-07-09)
(function () {
  var GA_ID = 'G-XG843WLLVL';
  if (GA_ID === 'G-PENDING') return; // ID 발급 전에는 아무것도 하지 않는다
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_ID);

  function track(name, parameters) {
    gtag('event', name, parameters || {});
  }

  function ready() {
    var params = new URLSearchParams(window.location.search);
    var campaign = params.get('utm_campaign') || '';
    var isNewsletterVisit =
      params.get('utm_source') === 'brief' &&
      params.get('utm_medium') === 'email' &&
      /^no/i.test(campaign);

    if (isNewsletterVisit) {
      var arrivalKey = 'ga-newsletter-arrival:' + campaign + ':' + window.location.pathname;
      var alreadyTracked = false;
      try {
        alreadyTracked = window.sessionStorage.getItem(arrivalKey) === '1';
        if (!alreadyTracked) window.sessionStorage.setItem(arrivalKey, '1');
      } catch (_) {
        // Storage can be unavailable in strict privacy modes; GA4 still receives the visit.
      }
      if (!alreadyTracked) {
        track('newsletter_arrival', {
          campaign: campaign,
          content: params.get('utm_content') || '',
          page_path: window.location.pathname,
        });
      }
    }

    var newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', function () {
        track('newsletter_signup_submit', {
          page_path: window.location.pathname,
        });
      });
    }

    if (/\/newsletter-success(?:\.html)?$/.test(window.location.pathname)) {
      track('newsletter_signup', {
        page_path: window.location.pathname,
      });
    }

    document.addEventListener('click', function (event) {
      var link = event.target.closest && event.target.closest('a[href]');
      if (!link) return;
      var url;
      try {
        url = new URL(link.href, window.location.href);
      } catch (_) {
        return;
      }
      var href = link.getAttribute('href') || '';
      if (
        href.indexOf('about.html#contact') >= 0 ||
        href.indexOf('/about#contact') >= 0 ||
        url.protocol === 'mailto:' ||
        url.protocol === 'tel:'
      ) {
        track('contact_intent', {
          link_url: url.href,
          link_text: (link.textContent || '').trim().slice(0, 100),
        });
      }
      if (url.origin === window.location.origin) {
        track('internal_link_click', {
          link_path: url.pathname + url.search + url.hash,
          link_text: (link.textContent || '').trim().slice(0, 100),
        });
      }
    });

    if (/\/insights\//.test(window.location.pathname)) {
      var read50 = false;
      var read90 = false;
      window.addEventListener('scroll', function () {
        var height = document.documentElement.scrollHeight - window.innerHeight;
        if (height <= 0) return;
        var progress = (window.scrollY / height) * 100;
        if (!read50 && progress >= 50) {
          read50 = true;
          track('insight_read_50', { page_path: window.location.pathname });
        }
        if (!read90 && progress >= 90) {
          read90 = true;
          track('insight_read_90', { page_path: window.location.pathname });
        }
      }, { passive: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
  } else {
    ready();
  }
})();
