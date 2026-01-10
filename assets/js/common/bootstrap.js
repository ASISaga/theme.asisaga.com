import { initDropdowns } from './dropdown.js';
import { initCollapse } from './collapse.js';
import { initModals } from './modal.js';
import { initTabs } from './tab.js';

/**
 * Modern component initializer
 * Replaces Bootstrap with native ES6 components
 * Initializes all interactive components on page load
 */
class ComponentLoader {
  /**
   * Initialize all modern components used in the site
   */
  initializeComponents() {
    // Initialize dropdowns (critical for nav dropdowns)
    initDropdowns();

    // Initialize collapse components (for mobile nav and accordions)
    initCollapse();

    // Initialize modals
    initModals();

    // Initialize tabs
    initTabs();

    console.log('Modern components initialized');
  }
}

// Initialize modern components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const loader = new ComponentLoader();
  loader.initializeComponents();
});

// Export for potential use in other modules
export { ComponentLoader };
