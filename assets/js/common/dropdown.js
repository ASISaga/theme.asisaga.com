/**
 * Modern Dropdown Component
 * Replaces Bootstrap dropdown with native HTML/CSS + ES6 JavaScript
 * Supports keyboard navigation and ARIA attributes
 */

class Dropdown {
  constructor(element) {
    this.toggle = element;
    this.menu = null;
    this.isOpen = false;
    this.init();
  }

  init() {
    // Find the dropdown menu (next sibling or specified target)
    const target = this.toggle.getAttribute('data-toggle-target');
    if (target) {
      this.menu = document.querySelector(target);
    } else {
      this.menu = this.toggle.nextElementSibling;
      while (this.menu && !this.menu.classList.contains('dropdown-menu')) {
        this.menu = this.menu.nextElementSibling;
      }
    }

    if (!this.menu) {
      console.warn('Dropdown menu not found for', this.toggle);
      return;
    }

    // Set up event listeners
    this.toggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.toggleDropdown();
    });

    // Keyboard navigation
    this.toggle.addEventListener('keydown', (e) => this.handleKeydown(e));
    this.menu.addEventListener('keydown', (e) => this.handleMenuKeydown(e));

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (this.isOpen && !this.toggle.contains(e.target) && !this.menu.contains(e.target)) {
        this.close();
      }
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
        this.toggle.focus();
      }
    });
  }

  toggleDropdown() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.isOpen = true;
    this.menu.classList.add('show');
    this.toggle.setAttribute('aria-expanded', 'true');
    
    // Focus first menu item
    const firstItem = this.menu.querySelector('a, button');
    if (firstItem) {
      setTimeout(() => firstItem.focus(), 0);
    }
  }

  close() {
    this.isOpen = false;
    this.menu.classList.remove('show');
    this.toggle.setAttribute('aria-expanded', 'false');
  }

  handleKeydown(e) {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
      e.preventDefault();
      this.open();
    }
  }

  handleMenuKeydown(e) {
    const items = Array.from(this.menu.querySelectorAll('a, button')).filter(
      item => !item.disabled && item.offsetParent !== null
    );
    const currentIndex = items.indexOf(document.activeElement);

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        items[nextIndex].focus();
        break;
      case 'ArrowUp':
        e.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        items[prevIndex].focus();
        break;
      case 'Home':
        e.preventDefault();
        items[0].focus();
        break;
      case 'End':
        e.preventDefault();
        items[items.length - 1].focus();
        break;
      case 'Tab':
        this.close();
        break;
    }
  }
}

/**
 * Initialize all dropdowns on the page
 */
export function initDropdowns() {
  const toggles = document.querySelectorAll('[data-toggle="dropdown"]');
  toggles.forEach(toggle => new Dropdown(toggle));
}

export default Dropdown;
