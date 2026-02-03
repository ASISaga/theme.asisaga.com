/**
 * Genesis Navbar Web Component
 * 
 * Main navigation bar with dropdown menus and keyboard support.
 * Extends genesis-navigation with additional navbar-specific features.
 * 
 * @example
 * <genesis-navbar orientation="horizontal">
 *   <nav><!-- navigation items --></nav>
 * </genesis-navbar>
 */

import { GenesisElement } from './genesis-element.js';

export class GenesisNavbar extends GenesisElement {
  static get observedAttributes() {
    return ['orientation', 'mobile-breakpoint'];
  }

  constructor() {
    super();
    this._dropdownStates = new Map();
  }

  connectedCallback() {
    super.connectedCallback();
    
    this._setAriaRole();
    this._setupDropdowns();
    this._setupKeyboardNavigation();
    this._setupCurrentPageIndicator();
    this._setupMobileResponsive();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // Cleanup event listeners
  }

  /**
   * Set ARIA role for navigation
   */
  _setAriaRole() {
    const nav = this.querySelector('nav');
    if (nav && !nav.hasAttribute('aria-label')) {
      nav.setAttribute('aria-label', 'Main navigation');
    }
    
    const menubar = this.querySelector('[role="menubar"]');
    if (menubar) {
      // Already has proper role
    } else {
      const list = this.querySelector('ul');
      if (list) {
        list.setAttribute('role', 'menubar');
      }
    }
  }

  /**
   * Setup dropdown menu functionality
   */
  _setupDropdowns() {
    const dropdownToggles = this.querySelectorAll('[data-dropdown-toggle], .navbar__link--dropdown');
    
    dropdownToggles.forEach((toggle, index) => {
      const dropdownId = toggle.getAttribute('aria-controls') || `dropdown-${index}`;
      const dropdown = this.querySelector(`#${dropdownId}`) || toggle.nextElementSibling;
      
      if (dropdown) {
        this._dropdownStates.set(dropdownId, false);
        
        // Click handler
        toggle.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this._toggleDropdown(toggle, dropdown, dropdownId);
        });
        
        // Hover support for desktop
        if (window.innerWidth > 768) {
          const parent = toggle.closest('li');
          if (parent) {
            parent.addEventListener('mouseenter', () => {
              this._openDropdown(toggle, dropdown, dropdownId);
            });
            
            parent.addEventListener('mouseleave', () => {
              this._closeDropdown(toggle, dropdown, dropdownId);
            });
          }
        }
      }
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.contains(e.target)) {
        this._closeAllDropdowns();
      }
    });
  }

  /**
   * Toggle dropdown state
   */
  _toggleDropdown(toggle, dropdown, dropdownId) {
    const isOpen = this._dropdownStates.get(dropdownId);
    
    if (isOpen) {
      this._closeDropdown(toggle, dropdown, dropdownId);
    } else {
      // Close other dropdowns first
      this._closeAllDropdowns();
      this._openDropdown(toggle, dropdown, dropdownId);
    }
  }

  /**
   * Open dropdown
   */
  _openDropdown(toggle, dropdown, dropdownId) {
    this._dropdownStates.set(dropdownId, true);
    toggle.setAttribute('aria-expanded', 'true');
    dropdown.setAttribute('aria-hidden', 'false');
    dropdown.classList.add('is-open');
    
    // Set focus to first item in dropdown
    const firstLink = dropdown.querySelector('a, button');
    if (firstLink) {
      firstLink.setAttribute('tabindex', '0');
    }
  }

  /**
   * Close dropdown
   */
  _closeDropdown(toggle, dropdown, dropdownId) {
    this._dropdownStates.set(dropdownId, false);
    toggle.setAttribute('aria-expanded', 'false');
    dropdown.setAttribute('aria-hidden', 'true');
    dropdown.classList.remove('is-open');
    
    // Reset tabindex for dropdown items
    const links = dropdown.querySelectorAll('a, button');
    links.forEach(link => link.setAttribute('tabindex', '-1'));
  }

  /**
   * Close all dropdowns
   */
  _closeAllDropdowns() {
    const dropdownToggles = this.querySelectorAll('[data-dropdown-toggle], .navbar__link--dropdown');
    
    dropdownToggles.forEach(toggle => {
      const dropdownId = toggle.getAttribute('aria-controls');
      const dropdown = this.querySelector(`#${dropdownId}`) || toggle.nextElementSibling;
      
      if (dropdown) {
        this._closeDropdown(toggle, dropdown, dropdownId);
      }
    });
  }

  /**
   * Setup keyboard navigation
   */
  _setupKeyboardNavigation() {
    const menuItems = this.querySelectorAll('[role="menuitem"]');
    
    menuItems.forEach((item, index) => {
      item.addEventListener('keydown', (e) => {
        switch(e.key) {
          case 'ArrowRight':
            e.preventDefault();
            const nextItem = menuItems[index + 1] || menuItems[0];
            nextItem.focus();
            break;
            
          case 'ArrowLeft':
            e.preventDefault();
            const prevItem = menuItems[index - 1] || menuItems[menuItems.length - 1];
            prevItem.focus();
            break;
            
          case 'ArrowDown':
            // Open dropdown if present
            const dropdown = item.nextElementSibling;
            if (dropdown && dropdown.matches('[role="menu"]')) {
              e.preventDefault();
              const firstLink = dropdown.querySelector('a, button');
              if (firstLink) {
                firstLink.focus();
              }
            }
            break;
            
          case 'Escape':
            // Close dropdown and return focus to toggle
            const parentDropdown = item.closest('[role="menu"]');
            if (parentDropdown) {
              e.preventDefault();
              const toggle = parentDropdown.previousElementSibling;
              if (toggle) {
                const dropdownId = toggle.getAttribute('aria-controls');
                this._closeDropdown(toggle, parentDropdown, dropdownId);
                toggle.focus();
              }
            }
            break;
        }
      });
    });
  }

  /**
   * Setup current page indicator
   */
  _setupCurrentPageIndicator() {
    const currentPath = window.location.pathname;
    const links = this.querySelectorAll('a');
    
    links.forEach(link => {
      const linkPath = new URL(link.href, window.location.origin).pathname;
      
      if (linkPath === currentPath) {
        link.setAttribute('aria-current', 'page');
        link.classList.add('active', 'navbar__link--active');
        
        // Also mark parent item if in dropdown
        const parentItem = link.closest('.navbar__item');
        if (parentItem) {
          parentItem.classList.add('navbar__item--active');
        }
      }
    });
  }

  /**
   * Setup mobile responsive behavior
   */
  _setupMobileResponsive() {
    const breakpoint = parseInt(this.getAttribute('mobile-breakpoint')) || 768;
    
    const handleResize = () => {
      if (window.innerWidth <= breakpoint) {
        this.classList.add('mobile');
        this.classList.remove('desktop');
      } else {
        this.classList.add('desktop');
        this.classList.remove('mobile');
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    
    switch(name) {
      case 'orientation':
        this.setAttribute('data-orientation', newValue);
        break;
    }
  }
}

// Register the custom element
if (!customElements.get('genesis-navbar')) {
  customElements.define('genesis-navbar', GenesisNavbar);
}
