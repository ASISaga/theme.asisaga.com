// Injects structured data for better search results
// Fetches JSON-LD data directly from a fixed JSON file
(function() {
  var jsonUrl = '/assets/json/structured-data.json';
  fetch(jsonUrl)
    .then(function(response) { return response.text(); })
    .then(function(json) {
      var ldScript = document.createElement('script');
      ldScript.type = 'application/ld+json';
      ldScript.textContent = json;
      document.head.appendChild(ldScript);
    })
    .catch(function() {/* fail silently */});
})();
