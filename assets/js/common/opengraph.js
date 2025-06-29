// Injects Open Graph meta tags for social sharing
// Fetches OG data directly from a fixed JSON file
(function() {
  var jsonUrl = '/assets/json/opengraph.json';
  fetch(jsonUrl)
    .then(function(response) { return response.json(); })
    .then(function(meta) {
      Object.keys(meta).forEach(function(key) {
        var og = document.createElement('meta');
        og.setAttribute('property', key);
        og.content = meta[key];
        document.head.appendChild(og);
      });
    })
    .catch(function() {/* fail silently */});
})();
