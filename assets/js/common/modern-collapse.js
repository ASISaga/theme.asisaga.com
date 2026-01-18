/**
 * Modern Collapse Component - Vanilla JavaScript
 * Replaces Bootstrap Collapse with modern vanilla JS
 */

class ModernCollapse {
  constructor(element) {
    this.collapse = element;
    this.toggle = document.querySelector(`[data-collapse-toggle="${element.id}"]`) || 
                  element.previousElementSibling;
    
    if (!this.toggle) return;
    
    this.isOpen = this.collapse.classList.contains('is-open');
    this.init();
  }
  
  init() {
    // Set initial ARIA states
    this.toggle.setAttribute('aria-expanded', this.isOpen);
    this.toggle.setAttribute('aria-controls', this.collapse.id);
    
    // Toggle on click
    this.toggle.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggle();
    });
  }
  
  toggle() {
    this.isOpen ? this.close() : this.open();
  }
  
  open() {
    this.isOpen = true;
    this.collapse.classList.add('is-open');
    this.toggle.classList.add('is-expanded');
    this.toggle.setAttribute('aria-expanded', 'true');
    
    // Dispatch custom event
    this.collapse.dispatchEvent(new CustomEvent('collapse:open', {
      bubbles: true,
      detail: { collapse: this }
    }));
  }
  
  close() {
    this.isOpen = false;
    this.collapse.classList.remove('is-open');
    this.toggle.classList.remove('is-expanded');
    this.toggle.setAttribute('aria-expanded', 'false');
    
    // Dispatch custom event
    this.collapse.dispatchEvent(new CustomEvent('collapse:close', {
      bubbles: true,
      detail: { collapse: this }
    }));
  }
}

/**
 * Mobile Navigation Collapse
 * Special handling for mobile nav
 */
class MobileNavCollapse {
  constructor(toggle, target) {
    this.toggle = toggle;
    this.nav = target;
    this.isOpen = false;
    this.init();
  }
  
  init() {
    this.toggle.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggle();
    });
    
    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
        this.toggle.focus();
      }
    });
    
    // Close on outside click (mobile only)
    if (window.innerWidth < 992) {
      document.addEventListener('click', (e) => {
        if (!this.toggle.contains(e.target) && !this.nav.contains(e.target) && this.isOpen) {
          this.close();
        }
      });
    }
  }
  
  toggle() {
    this.isOpen ? this.close() : this.open();
  }
  
  open() {
    this.isOpen = true;
    this.nav.classList.add('is-open');
    this.toggle.setAttribute('aria-expanded', 'true');
  }
  
  close() {
    this.isOpen = false;
    this.nav.classList.remove('is-open');
    this.toggle.setAttribute('aria-expanded', 'false');
  }
}

// Auto-initialize all collapses
document.addEventListener('DOMContentLoaded', () => {
  // Regular collapses
  const collapses = document.querySelectorAll('.collapse, [data-collapse]');
  collapses.forEach(collapse => new ModernCollapse(collapse));
  console.log(`Initialized ${collapses.length} modern collapses`);
  
  // Mobile navigation collapse
  const navToggle = document.querySelector('[data-nav-toggle]');
  const navTarget = document.querySelector('[data-nav-target]');
  
  if (navToggle && navTarget) {
    new MobileNavCollapse(navToggle, navTarget);
    console.log('Initialized mobile navigation collapse');
  }
});

export { ModernCollapse, MobileNavCollapse };
