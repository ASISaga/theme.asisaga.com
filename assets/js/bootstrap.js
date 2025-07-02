// import Bootstrap namespace from the vendored file
import * as bootstrap from './vendor/bootstrap.esm.min.js';

// Ensure Bootstrap JS initialization runs after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('[bootstrap.js] DOMContentLoaded: Initializing Bootstrap JS components...');
  // Enable all tooltips
  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
    new bootstrap.Tooltip(el);
  });

  // Enable all popovers
  document.querySelectorAll('[data-bs-toggle="popover"]').forEach(el => {
    new bootstrap.Popover(el);
  });

  // Enable all dropdowns
  document.querySelectorAll('.dropdown-toggle').forEach(el => {
    new bootstrap.Dropdown(el);
  });

  // Show a toast on page load (if present)
  const toastEl = document.getElementById('myToast');
  if (toastEl) {
    new bootstrap.Toast(toastEl).show();
  }
});