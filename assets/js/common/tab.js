/**
 * Modern Tab Component
 * Simple tab navigation for settings and other tabbed interfaces
 * Supports keyboard navigation and ARIA attributes
 */

class Tab {
  constructor(element) {
    this.trigger = element;
    this.target = null;
    this.init();
  }

  init() {
    // Find the tab panel target
    const targetId = this.trigger.getAttribute('href');
    if (targetId) {
      this.target = document.querySelector(targetId);
    }

    if (!this.target) {
      console.warn('Tab target not found for', this.trigger);
      return;
    }

    // Set up event listeners
    this.trigger.addEventListener('click', (e) => {
      e.preventDefault();
      this.show();
    });

    // Keyboard support
    this.trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.show();
      }
    });
  }

  show() {
    // Hide all sibling tabs
    const tabList = this.trigger.closest('[role="tablist"]') || this.trigger.closest('.nav');
    if (tabList) {
      const allTriggers = tabList.querySelectorAll('[data-toggle="tab"]');
      allTriggers.forEach(trigger => {
        trigger.classList.remove('active');
        trigger.setAttribute('aria-selected', 'false');
        const targetId = trigger.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
          target.classList.remove('active', 'show');
        }
      });
    }

    // Show this tab
    this.trigger.classList.add('active');
    this.trigger.setAttribute('aria-selected', 'true');
    this.target.classList.add('active', 'show');

    // Dispatch custom event
    this.target.dispatchEvent(new CustomEvent('shown.tab', { bubbles: true }));
  }
}

/**
 * Initialize all tabs on the page
 */
export function initTabs() {
  const triggers = document.querySelectorAll('[data-toggle="tab"]');
  triggers.forEach(trigger => new Tab(trigger));
}

export default Tab;
