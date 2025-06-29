// Injects Twitter Card meta tags for social sharing
// Fetches Twitter Card data directly from a fixed JSON file
(function() {
  var jsonUrl = '/assets/json/twitter-card.json';
  fetch(jsonUrl)
    .then(function(response) { return response.json(); })
    .then(function(meta) {
      Object.keys(meta).forEach(function(key) {
        var tw = document.createElement('meta');
        tw.setAttribute('name', key);
        tw.content = meta[key];
        document.head.appendChild(tw);
      });
    })
    .catch(function() {/* fail silently */});
})();
