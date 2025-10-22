import { Dropdown, Tooltip, Popover, Toast } from '../vendor/bootstrap.esm.js';

class BootstrapLoader {
  initializeBootstrapComponents() {
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => new Tooltip(el));
    document.querySelectorAll('[data-bs-toggle="popover"]').forEach(el => new Popover(el));
    document.querySelectorAll('.dropdown-toggle').forEach(el => new Dropdown(el));
    const toastEl = document.getElementById('myToast');
    if (toastEl) new Toast(toastEl).show();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new BootstrapLoader().initializeBootstrapComponents();
});