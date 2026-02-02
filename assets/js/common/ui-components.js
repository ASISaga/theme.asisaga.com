/**
 * Modern UI Components
 * Lightweight replacements for Bootstrap components
 * @version 1.0.0
 */

/**
 * Modal Component
 * Accessible modal dialog with focus trap and keyboard navigation
 */
export class Modal {
  constructor(element) {
    this.element = element;
    this.isOpen = false;
    this.previousFocus = null;
    this.focusableElements = null;
    
    this.init();
  }
  
  init() {
    // Find all focusable elements
    this.updateFocusableElements();
    
    // Setup event listeners
    this.setupEventListeners();
  }
  
  updateFocusableElements() {
    const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    this.focusableElements = Array.from(
      this.element.querySelectorAll(focusableSelectors)
    ).filter(el => !el.hasAttribute('disabled'));
  }
  
  setupEventListeners() {
    // Close button clicks
    const closeButtons = this.element.querySelectorAll('[data-modal-dismiss]');
    closeButtons.forEach(btn => {
      btn.addEventListener('click', () => this.hide());
    });
    
    // Backdrop click
    this.element.addEventListener('click', (e) => {
      if (e.target === this.element) {
        this.hide();
      }
    });
    
    // Keyboard events
    this.element.addEventListener('keydown', (e) => this.handleKeyboard(e));
  }
  
  show() {
    if (this.isOpen) return;
    
    // Store previous focus
    this.previousFocus = document.activeElement;
    
    // Show modal
    this.element.classList.add('modal--show');
    this.element.setAttribute('aria-hidden', 'false');
    this.isOpen = true;
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Focus first element
    this.updateFocusableElements();
    if (this.focusableElements.length > 0) {
      this.focusableElements[0].focus();
    }
    
    // Dispatch event
    this.element.dispatchEvent(new CustomEvent('modal:shown', { bubbles: true }));
  }
  
  hide() {
    if (!this.isOpen) return;
    
    // Hide modal
    this.element.classList.remove('modal--show');
    this.element.setAttribute('aria-hidden', 'true');
    this.isOpen = false;
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    // Restore focus
    if (this.previousFocus) {
      this.previousFocus.focus();
    }
    
    // Dispatch event
    this.element.dispatchEvent(new CustomEvent('modal:hidden', { bubbles: true }));
  }
  
  toggle() {
    this.isOpen ? this.hide() : this.show();
  }
  
  handleKeyboard(e) {
    if (!this.isOpen) return;
    
    // Escape key closes modal
    if (e.key === 'Escape') {
      this.hide();
      return;
    }
    
    // Tab key for focus trap
    if (e.key === 'Tab') {
      this.handleTabKey(e);
    }
  }
  
  handleTabKey(e) {
    if (this.focusableElements.length === 0) return;
    
    const firstElement = this.focusableElements[0];
    const lastElement = this.focusableElements[this.focusableElements.length - 1];
    
    // Shift + Tab on first element
    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    }
    // Tab on last element
    else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  }
  
  setContent(title, body) {
    const titleEl = this.element.querySelector('.modal__title');
    const bodyEl = this.element.querySelector('.modal__body');
    
    if (titleEl && title) {
      titleEl.textContent = title;
    }
    if (bodyEl && body) {
      bodyEl.innerHTML = body;
    }
    
    // Update focusable elements after content change
    this.updateFocusableElements();
  }
}

/**
 * Collapse Component
 * Accessible collapse/accordion with smooth animations
 */
export class Collapse {
  constructor(element, options = {}) {
    this.element = element;
    this.trigger = null;
    this.isExpanded = element.classList.contains('faq-item__content--show');
    this.parent = options.parent || null;
    this.duration = options.duration || 300;
    
    this.init();
  }
  
  init() {
    // Find trigger button
    const triggerId = this.element.id;
    this.trigger = document.querySelector(`[data-collapse-target="#${triggerId}"]`);
    
    if (!this.trigger) return;
    
    // Setup event listener
    this.trigger.addEventListener('click', () => this.toggle());
    
    // Set initial ARIA states
    this.updateAriaStates();
  }
  
  show() {
    if (this.isExpanded) return;
    
    // Close siblings if parent is set
    if (this.parent) {
      const siblings = document.querySelectorAll(`[data-collapse-parent="${this.parent}"]`);
      siblings.forEach(sibling => {
        if (sibling !== this.element && sibling._collapseInstance) {
          sibling._collapseInstance.hide();
        }
      });
    }
    
    // Get the element's natural height
    this.element.style.height = '0px';
    this.element.classList.add('faq-item__content--show');
    
    const height = this.element.scrollHeight;
    this.element.style.height = `${height}px`;
    
    // After animation, set to auto for responsive behavior
    setTimeout(() => {
      this.element.style.height = 'auto';
      this.element.dispatchEvent(new CustomEvent('collapse:shown', { bubbles: true }));
    }, this.duration);
    
    this.isExpanded = true;
    this.updateAriaStates();
  }
  
  hide() {
    if (!this.isExpanded) return;
    
    // Set explicit height first
    this.element.style.height = `${this.element.scrollHeight}px`;
    
    // Force reflow
    this.element.offsetHeight;
    
    // Animate to 0
    this.element.style.height = '0px';
    
    setTimeout(() => {
      this.element.classList.remove('faq-item__content--show');
      this.element.dispatchEvent(new CustomEvent('collapse:hidden', { bubbles: true }));
    }, this.duration);
    
    this.isExpanded = false;
    this.updateAriaStates();
  }
  
  toggle() {
    this.isExpanded ? this.hide() : this.show();
  }
  
  updateAriaStates() {
    if (!this.trigger) return;
    
    this.trigger.setAttribute('aria-expanded', this.isExpanded);
    
    if (this.isExpanded) {
      this.trigger.classList.remove('faq-item__button--collapsed');
    } else {
      this.trigger.classList.add('faq-item__button--collapsed');
    }
  }
}

/**
 * Tab Component
 * Accessible tab navigation with keyboard support
 */
export class Tabs {
  constructor(container) {
    this.container = container;
    this.tabs = [];
    this.panels = [];
    this.currentIndex = 0;
    
    this.init();
  }
  
  init() {
    // Find all tab links
    this.tabs = Array.from(this.container.querySelectorAll('[data-tab-toggle]'));
    
    if (this.tabs.length === 0) return;
    
    // Find all tab panels
    this.tabs.forEach(tab => {
      const href = tab.getAttribute('href');
      if (href && href.startsWith('#')) {
        const panel = document.querySelector(href);
        if (panel) {
          this.panels.push(panel);
        }
      }
    });
    
    // Setup event listeners
    this.tabs.forEach((tab, index) => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        this.showTab(index);
      });
      
      tab.addEventListener('keydown', (e) => this.handleKeyboard(e, index));
    });
    
    // Find and activate the initially active tab
    const activeTab = this.tabs.findIndex(tab => 
      tab.classList.contains('settings-nav-link--active')
    );
    if (activeTab !== -1) {
      this.showTab(activeTab);
    }
  }
  
  showTab(index) {
    if (index < 0 || index >= this.tabs.length) return;
    
    // Hide all panels
    this.panels.forEach(panel => {
      panel.setAttribute('aria-hidden', 'true');
      panel.style.display = 'none';
    });
    
    // Deactivate all tabs
    this.tabs.forEach(tab => {
      tab.classList.remove('settings-nav-link--active');
      tab.setAttribute('aria-selected', 'false');
      tab.setAttribute('tabindex', '-1');
    });
    
    // Show selected panel
    if (this.panels[index]) {
      this.panels[index].setAttribute('aria-hidden', 'false');
      this.panels[index].style.display = 'block';
    }
    
    // Activate selected tab
    this.tabs[index].classList.add('settings-nav-link--active');
    this.tabs[index].setAttribute('aria-selected', 'true');
    this.tabs[index].setAttribute('tabindex', '0');
    this.tabs[index].setAttribute('aria-current', 'page');
    
    this.currentIndex = index;
    
    // Dispatch event
    this.container.dispatchEvent(new CustomEvent('tab:changed', {
      bubbles: true,
      detail: { index, tab: this.tabs[index], panel: this.panels[index] }
    }));
  }
  
  handleKeyboard(e, currentIndex) {
    let newIndex = currentIndex;
    
    switch(e.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        newIndex = currentIndex > 0 ? currentIndex - 1 : this.tabs.length - 1;
        break;
      
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        newIndex = currentIndex < this.tabs.length - 1 ? currentIndex + 1 : 0;
        break;
      
      case 'Home':
        e.preventDefault();
        newIndex = 0;
        break;
      
      case 'End':
        e.preventDefault();
        newIndex = this.tabs.length - 1;
        break;
      
      default:
        return;
    }
    
    this.showTab(newIndex);
    this.tabs[newIndex].focus();
  }
}

/**
 * Component Manager
 * Initializes all UI components on the page
 */
export class UIComponents {
  constructor() {
    this.modals = new Map();
    this.collapses = new Map();
    this.tabs = new Map();
    this.initialized = false;
  }
  
  init() {
    if (this.initialized) {
      console.warn('UI Components already initialized');
      return;
    }
    
    try {
      this.initModals();
      this.initCollapses();
      this.initTabs();
      
      this.initialized = true;
      console.log('Modern UI Components initialized successfully');
    } catch (error) {
      console.error('Error initializing UI components:', error);
    }
  }
  
  initModals() {
    const modalElements = document.querySelectorAll('.modal');
    modalElements.forEach((el, index) => {
      const modal = new Modal(el);
      this.modals.set(el.id || `modal-${index}`, modal);
      
      // Store instance on element for external access
      el._modalInstance = modal;
    });
  }
  
  initCollapses() {
    const collapseElements = document.querySelectorAll('[data-collapse-target]');
    collapseElements.forEach(trigger => {
      const targetId = trigger.getAttribute('data-collapse-target');
      if (!targetId) return;
      
      const target = document.querySelector(targetId);
      if (!target) return;
      
      const parent = target.getAttribute('data-collapse-parent');
      const collapse = new Collapse(target, { parent });
      this.collapses.set(targetId, collapse);
      
      // Store instance on element for external access
      target._collapseInstance = collapse;
    });
  }
  
  initTabs() {
    const tabContainers = document.querySelectorAll('.settings-nav');
    tabContainers.forEach((container, index) => {
      const tabs = new Tabs(container);
      this.tabs.set(`tabs-${index}`, tabs);
    });
  }
  
  // Get modal by ID
  getModal(id) {
    return this.modals.get(id);
  }
  
  // Get collapse by target ID
  getCollapse(targetId) {
    return this.collapses.get(targetId);
  }
  
  // Reinitialize after dynamic content
  reinit() {
    this.dispose();
    this.init();
  }
  
  dispose() {
    this.modals.clear();
    this.collapses.clear();
    this.tabs.clear();
    this.initialized = false;
  }
}

// Create singleton instance
const uiComponents = new UIComponents();

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    uiComponents.init();
  });
} else {
  uiComponents.init();
}

// Export for external use
export default uiComponents;
