// Google Analytics setup for ASI Saga Jekyll site
// Loads Google Analytics if the site config provides an ID via data attributes

(function() {
  var scriptTag = document.currentScript;
  var gaId = scriptTag && (scriptTag.getAttribute('data-ga-id') || scriptTag.getAttribute('data-ga-mid'));
  if (!gaId) return;

  var script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + gaId;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', gaId);
})();
