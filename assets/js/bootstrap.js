class BootstrapLoader {
  // Use relative path to shared cdn-config.json for all subdomains
  constructor(configUrl = '/assets/json/cdn-config.json') {
    this.configUrl = configUrl;
    this.loadBootstrap();
  }

  loadBootstrap() {
    fetch(this.configUrl)
      .then(response => response.json())
      .then(config => {
        if (typeof window.bootstrap === 'undefined') {
          const bootstrapConfig = config.bootstrap;
          const bootstrapScript = document.createElement('script');
          bootstrapScript.src = bootstrapConfig.url;
          if (bootstrapConfig.integrity) {
            bootstrapScript.integrity = bootstrapConfig.integrity;
          }
          bootstrapScript.crossOrigin = bootstrapConfig.crossorigin;
          document.head.appendChild(bootstrapScript);
          bootstrapScript.onload = () => this.initializeBootstrapComponents();
        } else {
          this.initializeBootstrapComponents();
        }
      });
  }

  initializeBootstrapComponents() {
    document.addEventListener('DOMContentLoaded', function() {
      // Enable all tooltips
      document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(function(el) {
        new bootstrap.Tooltip(el);
      });

      // Enable all popovers
      document.querySelectorAll('[data-bs-toggle="popover"]').forEach(function(el) {
        new bootstrap.Popover(el);
      });

      // Enable all dropdowns
      document.querySelectorAll('.dropdown-toggle').forEach(function(el) {
        new bootstrap.Dropdown(el);
      });

      // Show a toast on page load (if present)
      var toastEl = document.getElementById('myToast');
      if (toastEl) {
        new bootstrap.Toast(toastEl).show();
      }
    });
  }
}

// Instantiate the loader
new BootstrapLoader();