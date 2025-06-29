// Injects SEO meta tags for better search results
// Fetches meta data directly from a fixed JSON file
(function() {
  var jsonUrl = '/assets/json/seo-meta.json';
  fetch(jsonUrl)
    .then(function(response) { return response.json(); })
    .then(function(meta) {
      if (meta.description) {
        var desc = document.createElement('meta');
        desc.name = 'description';
        desc.content = meta.description;
        document.head.appendChild(desc);
      }
      if (meta.keywords) {
        var kw = document.createElement('meta');
        kw.name = 'keywords';
        kw.content = meta.keywords;
        document.head.appendChild(kw);
      }
    })
    .catch(function() {/* fail silently */});
})();
