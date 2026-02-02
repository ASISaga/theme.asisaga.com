import { Dropdown, Tooltip, Popover, Toast, Collapse } from '../vendor/bootstrap.esm.js';

/**
 * Bootstrap component initializer
 * Modern implementation with error handling and lazy initialization
 * @version 2.0 - Updated for v5.3.8
 */
class BootstrapLoader {
  constructor() {
    this.components = new Map();
    this.initialized = false;
  }

  /**
   * Initialize all Bootstrap components used in the site
   * Uses try-catch for graceful degradation
   */
  initializeBootstrapComponents() {
    if (this.initialized) {
      console.warn('Bootstrap components already initialized');
      return;
    }

    try {
      // Initialize tooltips with error handling
      this.initializeTooltips();
      
      // Initialize popovers with error handling
      this.initializePopovers();
      
      // Initialize dropdowns (critical for nav dropdowns)
      this.initializeDropdowns();
      
      // Initialize collapse components (for mobile nav)
      this.initializeCollapse();
      
      // Initialize toasts if present
      this.initializeToasts();
      
      this.initialized = true;
      console.log('Bootstrap v5.3.8 components initialized successfully');
    } catch (error) {
      console.error('Error initializing Bootstrap components:', error);
    }
  }

  /**
   * Initialize tooltip components
   */
  initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipElements.forEach((el, index) => {
      try {
        const tooltip = new Tooltip(el);
        this.components.set(`tooltip-${index}`, tooltip);
      } catch (error) {
        console.warn('Failed to initialize tooltip:', el, error);
      }
    });
  }

  /**
   * Initialize popover components
   */
  initializePopovers() {
    const popoverElements = document.querySelectorAll('[data-bs-toggle="popover"]');
    popoverElements.forEach((el, index) => {
      try {
        const popover = new Popover(el);
        this.components.set(`popover-${index}`, popover);
      } catch (error) {
        console.warn('Failed to initialize popover:', el, error);
      }
    });
  }

  /**
   * Initialize dropdown components
   */
  initializeDropdowns() {
    const dropdownElements = document.querySelectorAll('[data-bs-toggle="dropdown"]');
    dropdownElements.forEach((el, index) => {
      try {
        const dropdown = new Dropdown(el);
        this.components.set(`dropdown-${index}`, dropdown);
      } catch (error) {
        console.warn('Failed to initialize dropdown:', el, error);
      }
    });
  }

  /**
   * Initialize collapse components
   */
  initializeCollapse() {
    const collapseElements = document.querySelectorAll('[data-bs-toggle="collapse"]');
    collapseElements.forEach((el, index) => {
      try {
        const collapse = new Collapse(el, { toggle: false });
        this.components.set(`collapse-${index}`, collapse);
      } catch (error) {
        console.warn('Failed to initialize collapse:', el, error);
      }
    });
  }

  /**
   * Initialize toast components
   */
  initializeToasts() {
    const toastElements = document.querySelectorAll('.toast');
    toastElements.forEach((el, index) => {
      try {
        const toast = new Toast(el);
        this.components.set(`toast-${index}`, toast);
        
        // Auto-show toasts with data-bs-autohide attribute
        if (el.dataset.bsAutohide !== 'false') {
          toast.show();
        }
      } catch (error) {
        console.warn('Failed to initialize toast:', el, error);
      }
    });
  }

  /**
   * Dispose all initialized components
   * Useful for cleanup in SPAs
   */
  dispose() {
    this.components.forEach((component, key) => {
      try {
        if (component && typeof component.dispose === 'function') {
          component.dispose();
        }
      } catch (error) {
        console.warn(`Failed to dispose ${key}:`, error);
      }
    });
    this.components.clear();
    this.initialized = false;
  }

  /**
   * Reinitialize components (e.g., after dynamic content load)
   */
  reinitialize() {
    this.dispose();
    this.initializeBootstrapComponents();
  }
}

// Create singleton instance
const bootstrapLoader = new BootstrapLoader();

// Initialize Bootstrap components when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    bootstrapLoader.initializeBootstrapComponents();
  });
} else {
  // DOM is already loaded
  bootstrapLoader.initializeBootstrapComponents();
}

// Export for potential use in other modules
export { BootstrapLoader, bootstrapLoader };
