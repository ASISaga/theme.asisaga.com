// AOS (Animate On Scroll) initialization for ASI Saga
// This script initializes AOS after the library is loaded, using the script id from data attribute

document.addEventListener('DOMContentLoaded', function() {
  var scriptTag = document.currentScript;
  var aosScriptId = scriptTag && scriptTag.getAttribute('data-aos-script-id');
  var aosScript = aosScriptId ? document.getElementById(aosScriptId) : null;
  if (aosScript && typeof AOS !== 'undefined' && AOS.init) {
    AOS.init();
  }
});
