/**
 * Modern Modal Component
 * Replaces Bootstrap modal with native HTML/CSS + ES6 JavaScript
 * Supports backdrop, keyboard events, and ARIA attributes
 */

class Modal {
  constructor(element) {
    this.modal = element;
    this.isOpen = false;
    this.backdrop = null;
    this.focusedElementBeforeModal = null;
    this.focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    this.init();
  }

  init() {
    // Find close buttons
    const closeButtons = this.modal.querySelectorAll('[data-dismiss="modal"]');
    closeButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.hide();
      });
    });

    // Close on backdrop click
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.hide();
      }
    });

    // Keyboard support
    this.modal.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.hide();
      }
      
      // Trap focus within modal
      if (e.key === 'Tab') {
        this.trapFocus(e);
      }
    });
  }

  show() {
    // Store the currently focused element
    this.focusedElementBeforeModal = document.activeElement;
    
    this.isOpen = true;
    this.modal.classList.add('show');
    this.modal.style.display = 'block';
    this.modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    
    // Create and show backdrop
    this.createBackdrop();
    
    // Focus the modal
    const firstFocusable = this.modal.querySelector(this.focusableSelector);
    if (firstFocusable) {
      requestAnimationFrame(() => firstFocusable.focus());
    }
    
    // Dispatch custom event
    this.modal.dispatchEvent(new CustomEvent('shown.modal', { bubbles: true }));
  }

  hide() {
    this.isOpen = false;
    this.modal.classList.remove('show');
    this.modal.setAttribute('aria-hidden', 'true');
    
    // Fade out animation
    setTimeout(() => {
      this.modal.style.display = 'none';
      document.body.classList.remove('modal-open');
      this.removeBackdrop();
      
      // Restore focus
      if (this.focusedElementBeforeModal) {
        this.focusedElementBeforeModal.focus();
      }
      
      // Dispatch custom event
      this.modal.dispatchEvent(new CustomEvent('hidden.modal', { bubbles: true }));
    }, 150);
  }

  createBackdrop() {
    this.backdrop = document.createElement('div');
    this.backdrop.className = 'modal-backdrop fade';
    document.body.appendChild(this.backdrop);
    
    // Force reflow
    this.backdrop.offsetHeight;
    this.backdrop.classList.add('show');
    
    // Click backdrop to close
    this.backdrop.addEventListener('click', () => this.hide());
  }

  removeBackdrop() {
    if (this.backdrop) {
      this.backdrop.classList.remove('show');
      setTimeout(() => {
        if (this.backdrop) {
          this.backdrop.remove();
        }
        this.backdrop = null;
      }, 150);
    }
  }

  trapFocus(e) {
    const focusableElements = this.modal.querySelectorAll(this.focusableSelector);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  }
}

/**
 * Initialize all modals on the page
 */
export function initModals() {
  const modals = document.querySelectorAll('.modal');
  const instances = new Map();
  
  modals.forEach(modal => {
    const instance = new Modal(modal);
    instances.set(modal.id, instance);
  });

  // Set up triggers
  const triggers = document.querySelectorAll('[data-toggle="modal"]');
  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = trigger.getAttribute('data-target') || trigger.getAttribute('href');
      const modalId = targetId.replace('#', '');
      const instance = instances.get(modalId);
      if (instance) {
        instance.show();
      }
    });
  });

  return instances;
}

export default Modal;
