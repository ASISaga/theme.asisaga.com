/**
 * Modern Dropdown Component - Vanilla JavaScript
 * Replaces Bootstrap Dropdown with modern vanilla JS
 */

class ModernDropdown {
  constructor(element) {
    this.dropdown = element;
    this.toggle = element.querySelector('.dropdown__toggle, [data-dropdown-toggle]');
    this.menu = element.querySelector('.dropdown__menu, [data-dropdown-menu]');
    
    if (!this.toggle || !this.menu) return;
    
    this.isOpen = false;
    this.init();
  }
  
  init() {
    // Mark as JS-enhanced
    this.dropdown.setAttribute('data-dropdown-enhanced', '');
    
    // Toggle on click
    this.toggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.toggle();
    });
    
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!this.dropdown.contains(e.target) && this.isOpen) {
        this.close();
      }
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
        this.toggle.focus();
      }
    });
    
    // Keyboard navigation
    this.menu.addEventListener('keydown', (e) => {
      this.handleKeyboard(e);
    });
  }
  
  toggle() {
    this.isOpen ? this.close() : this.open();
  }
  
  open() {
    this.isOpen = true;
    this.menu.classList.add('is-open');
    this.toggle.setAttribute('aria-expanded', 'true');
    
    // Focus first item
    const firstItem = this.menu.querySelector('.dropdown__item, [data-dropdown-item]');
    if (firstItem) {
      setTimeout(() => firstItem.focus(), 100);
    }
  }
  
  close() {
    this.isOpen = false;
    this.menu.classList.remove('is-open');
    this.toggle.setAttribute('aria-expanded', 'false');
  }
  
  handleKeyboard(e) {
    const items = Array.from(this.menu.querySelectorAll('.dropdown__item, [data-dropdown-item]'));
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
    }
  }
}

// Auto-initialize all dropdowns
document.addEventListener('DOMContentLoaded', () => {
  const dropdowns = document.querySelectorAll('.dropdown, [data-dropdown]');
  dropdowns.forEach(dropdown => new ModernDropdown(dropdown));
  console.log(`Initialized ${dropdowns.length} modern dropdowns`);
});

export { ModernDropdown };
