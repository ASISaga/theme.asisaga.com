// import Bootstrap namespace from the vendored file
import * as bootstrap from './vendor/bootstrap.esm.min.js';

// example: enable all tooltips
document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
new bootstrap.Tooltip(el);
});

// example: enable all popovers
document.querySelectorAll('[data-bs-toggle="popover"]').forEach(el => {
new bootstrap.Popover(el);
});

// example: enable all dropdowns
document.querySelectorAll('.dropdown-toggle').forEach(el => {
new bootstrap.Dropdown(el);
});

// example: show a toast on page load
const toastEl = document.getElementById('myToast');
if (toastEl) {
new bootstrap.Toast(toastEl).show();
}