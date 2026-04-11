/**
 * Genesis Navbar Web Component
 * 
 * Main navigation bar with dropdown menus and keyboard support.
 * Extends genesis-navigation with additional navbar-specific features.
 * 
 * Built on Lit (https://lit.dev) for reactive properties and lifecycle management.
 * 
 * @example
 * <genesis-navbar orientation="horizontal">
 *   <nav><!-- navigation items --></nav>
 * </genesis-navbar>
 */

import { GenesisElement } from './genesis-element.js';

const DESKTOP_BREAKPOINT = 1024;
const HOVER_CLOSE_DELAY_MS = 150;

export class GenesisNavbar extends GenesisElement {
  /**
   * Lit reactive properties — replaces static get observedAttributes()
   */
  static properties = {
    orientation: { type: String },
    mobileBreakpoint: { type: String, attribute: 'mobile-breakpoint' },
  };

  constructor() {
    super();
    this._dropdownStates = new Map();
    this._hoverTimers = new Map();
    this._boundDocumentClick = null;
    this._boundResize = null;
    this._desktopBreakpoint = DESKTOP_BREAKPOINT;
  }

  connectedCallback() {
    super.connectedCallback();
    
    this._desktopBreakpoint = parseInt(this.getAttribute('mobile-breakpoint')) || DESKTOP_BREAKPOINT;
    this._setAriaRole();
    this._setupDropdowns();
    this._setupKeyboardNavigation();
    this._setupCurrentPageIndicator();
    this._setupResponsive();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._boundDocumentClick) {
      document.removeEventListener('click', this._boundDocumentClick);
    }
    if (this._boundResize) {
      window.removeEventListener('resize', this._boundResize);
    }
    this._hoverTimers.forEach(timer => clearTimeout(timer));
    this._hoverTimers.clear();
  }

  /**
   * Whether we are in desktop mode (inline nav, hover dropdowns)
   */
  _isDesktop() {
    return window.innerWidth >= this._desktopBreakpoint;
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
    if (!menubar) {
      const list = this.querySelector('ul');
      if (list) {
        list.setAttribute('role', 'menubar');
      }
    }
  }

  /**
   * Setup dropdown menu functionality with responsive hover/click
   */
  _setupDropdowns() {
    const dropdownToggles = this.querySelectorAll('[data-dropdown-toggle], .navbar__link--dropdown');
    
    dropdownToggles.forEach((toggle, index) => {
      const dropdownId = toggle.getAttribute('aria-controls') || `dropdown-${index}`;
      const dropdown = this.querySelector(`#${dropdownId}`) || toggle.nextElementSibling;
      
      if (!dropdown) return;

      this._dropdownStates.set(dropdownId, false);
      
      // Click handler — works at all viewport sizes
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this._toggleDropdown(toggle, dropdown, dropdownId);
      });
      
      // Hover handlers — always bound, but only fire on desktop
      const parent = toggle.closest('li');
      if (parent) {
        parent.addEventListener('mouseenter', () => {
          if (!this._isDesktop()) return;
          clearTimeout(this._hoverTimers.get(dropdownId));
          this._openDropdown(toggle, dropdown, dropdownId);
        });
        
        parent.addEventListener('mouseleave', () => {
          if (!this._isDesktop()) return;
          const timer = setTimeout(() => {
            this._closeDropdown(toggle, dropdown, dropdownId);
          }, HOVER_CLOSE_DELAY_MS);
          this._hoverTimers.set(dropdownId, timer);
        });
      }
    });
    
    // Close dropdowns when clicking outside
    this._boundDocumentClick = (e) => {
      if (!this.contains(e.target)) {
        this._closeAllDropdowns();
      }
    };
    document.addEventListener('click', this._boundDocumentClick);
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
          case 'ArrowRight': {
            e.preventDefault();
            const nextItem = menuItems[index + 1] || menuItems[0];
            nextItem.focus();
            break;
          }
          case 'ArrowLeft': {
            e.preventDefault();
            const prevItem = menuItems[index - 1] || menuItems[menuItems.length - 1];
            prevItem.focus();
            break;
          }
          case 'ArrowDown': {
            const dropdown = item.nextElementSibling;
            if (dropdown && dropdown.matches('[role="menu"]')) {
              e.preventDefault();
              const dropdownId = item.getAttribute('aria-controls');
              this._openDropdown(item, dropdown, dropdownId);
              const firstLink = dropdown.querySelector('a, button');
              if (firstLink) {
                firstLink.focus();
              }
            }
            break;
          }
          case 'Escape': {
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
      try {
        const linkPath = new URL(link.href, window.location.origin).pathname;
        
        if (linkPath === currentPath) {
          link.setAttribute('aria-current', 'page');
          link.classList.add('active', 'navbar__link--active');
          
          const parentItem = link.closest('.navbar__item');
          if (parentItem) {
            parentItem.classList.add('navbar__item--active');
          }
        }
      } catch (e) {
        console.debug('genesis-navbar: skipping link with invalid URL', link.href, e);
      }
    });
  }

  /**
   * Setup responsive behavior — aligned with CSS breakpoint (lg = 1024px)
   */
  _setupResponsive() {
    const handleResize = () => {
      if (this._isDesktop()) {
        this.classList.add('desktop');
        this.classList.remove('mobile');
        // Close any open mobile dropdowns on resize to desktop
        this._closeAllDropdowns();
      } else {
        this.classList.add('mobile');
        this.classList.remove('desktop');
      }
    };
    
    handleResize();
    this._boundResize = handleResize;
    window.addEventListener('resize', this._boundResize);
  }

  /**
   * Lit lifecycle: called after property changes.
   */
  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('orientation') && changedProperties.get('orientation') !== undefined) {
      this.setAttribute('data-orientation', this.orientation);
    }
  }
}

// Register the custom element
if (!customElements.get('genesis-navbar')) {
  customElements.define('genesis-navbar', GenesisNavbar);
}
