import { Dropdown, Tooltip, Popover, Toast, Collapse } from '../vendor/bootstrap.esm.js';

/**
 * Bootstrap component initializer
 * Initializes all Bootstrap interactive components on page load
 */
class BootstrapLoader {
  /**
   * Initialize all Bootstrap components used in the site
   */
  initializeBootstrapComponents() {
    // Initialize tooltips
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => new Tooltip(el));

    // Initialize popovers
    document.querySelectorAll('[data-bs-toggle="popover"]').forEach(el => new Popover(el));

    // Initialize dropdowns (critical for nav dropdowns)
    document.querySelectorAll('[data-bs-toggle="dropdown"]').forEach(el => new Dropdown(el));

    // Initialize collapse components (for mobile nav)
    // Collapse must be initialized on collapsible content elements (.collapse), not toggle buttons.
    // Using { toggle: false } prevents auto-toggling on init; toggle buttons handle show/hide.
    document.querySelectorAll('.collapse').forEach(el => new Collapse(el, { toggle: false }));

    // Initialize toasts if present
    const toastEl = document.getElementById('myToast');
    if (toastEl) new Toast(toastEl).show();
  }
}

// Initialize Bootstrap components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const loader = new BootstrapLoader();
  loader.initializeBootstrapComponents();
  console.log('Bootstrap components initialized');
});

// Export for potential use in other modules
export { BootstrapLoader };
