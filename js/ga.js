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
})();
