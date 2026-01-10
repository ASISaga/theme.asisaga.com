/**
 * Modern Collapse Component
 * Replaces Bootstrap collapse with native HTML/CSS + ES6 JavaScript
 * Supports accordion behavior and ARIA attributes
 */

class Collapse {
  constructor(element) {
    this.trigger = element;
    this.target = null;
    this.isOpen = false;
    this.parent = null;
    this.init();
  }

  init() {
    // Find the collapse target
    const targetId = this.trigger.getAttribute('data-toggle-target') || 
                     this.trigger.getAttribute('data-target');
    if (targetId) {
      this.target = document.querySelector(targetId);
    }

    if (!this.target) {
      console.warn('Collapse target not found for', this.trigger);
      return;
    }

    // Check for parent (accordion behavior)
    const parentId = this.trigger.getAttribute('data-parent');
    if (parentId) {
      this.parent = document.querySelector(parentId);
    }

    // Set initial state
    this.isOpen = this.target.classList.contains('show') || 
                  this.trigger.getAttribute('aria-expanded') === 'true';
    
    // Set up event listeners
    this.trigger.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggle();
    });

    // Keyboard support
    this.trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.toggle();
      }
    });
  }

  toggle() {
    this.isOpen ? this.hide() : this.show();
  }

  show() {
    // If part of an accordion, close siblings
    if (this.parent) {
      const siblings = this.parent.querySelectorAll('[data-toggle="collapse"]');
      siblings.forEach(sibling => {
        if (sibling !== this.trigger) {
          const siblingTargetId = sibling.getAttribute('data-toggle-target') || 
                                  sibling.getAttribute('data-target');
          const siblingTarget = document.querySelector(siblingTargetId);
          if (siblingTarget && siblingTarget.classList.contains('show')) {
            siblingTarget.classList.remove('show');
            sibling.setAttribute('aria-expanded', 'false');
            sibling.classList.add('collapsed');
          }
        }
      });
    }

    this.isOpen = true;
    this.target.classList.add('show');
    this.trigger.setAttribute('aria-expanded', 'true');
    this.trigger.classList.remove('collapsed');
    
    // Dispatch custom event
    this.target.dispatchEvent(new CustomEvent('shown.collapse', { bubbles: true }));
  }

  hide() {
    this.isOpen = false;
    this.target.classList.remove('show');
    this.trigger.setAttribute('aria-expanded', 'false');
    this.trigger.classList.add('collapsed');
    
    // Dispatch custom event
    this.target.dispatchEvent(new CustomEvent('hidden.collapse', { bubbles: true }));
  }
}

/**
 * Initialize all collapse elements on the page
 */
export function initCollapse() {
  const triggers = document.querySelectorAll('[data-toggle="collapse"]');
  triggers.forEach(trigger => new Collapse(trigger));
}

export default Collapse;
