/**
 * Genesis Header Web Component
 * 
 * Site header with branding, logo, and navigation integration.
 * Handles mobile menu toggle and sticky behavior.
 * 
 * @example
 * <genesis-header brand-url="/" logo-src="/logo.png" sticky="true">
 *   <genesis-navbar></genesis-navbar>
 * </genesis-header>
 */

import { GenesisElement } from './genesis-element.js';

export class GenesisHeader extends GenesisElement {
  static get observedAttributes() {
    return ['brand-url', 'logo-src', 'brand-text', 'tagline', 'sticky'];
  }

  constructor() {
    super();
    this._mobileMenuOpen = false;
    this._scrollY = 0;
  }

  connectedCallback() {
    super.connectedCallback();
    
    this._setAriaRole();
    this._setupMobileToggle();
    this._setupStickyBehavior();
    this._handleScroll = this._handleScroll.bind(this);
    
    if (this.getAttribute('sticky') === 'true') {
      window.addEventListener('scroll', this._handleScroll, { passive: true });
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('scroll', this._handleScroll);
  }

  /**
   * Set ARIA role for header
   */
  _setAriaRole() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'banner');
    }
  }

  /**
   * Setup mobile menu toggle functionality
   */
  _setupMobileToggle() {
    const toggle = this.querySelector('[data-nav-toggle], .genesis-header__toggle');
    const nav = this.querySelector('[data-nav-menu], .genesis-header__nav');
    
    if (!toggle || !nav) return;

    let overlay = document.querySelector('[data-nav-overlay]');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'genesis-nav-overlay';
      overlay.setAttribute('data-nav-overlay', '');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.appendChild(overlay);
    }

    const setNavState = (open) => {
      this._mobileMenuOpen = open;
      toggle.setAttribute('aria-expanded', open);
      nav.classList.toggle('is-open', open);
      nav.setAttribute('data-nav-open', open);
      this.classList.toggle('menu-open', open);

      if (overlay) {
        overlay.setAttribute('data-nav-open', open);
        overlay.setAttribute('aria-hidden', (!open).toString());
      }

      if (open) {
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';

        const firstLink = nav.querySelector('a, button');
        if (firstLink) {
          setTimeout(() => firstLink.focus(), 150);
        }
      } else {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        toggle.focus();
      }
    };

    toggle.addEventListener('click', () => setNavState(!this._mobileMenuOpen));

    if (overlay) {
      overlay.addEventListener('click', () => setNavState(false));
    }

    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 1024) {
          setTimeout(() => setNavState(false), 300);
        }
      });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this._mobileMenuOpen) {
        setNavState(false);
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (this._mobileMenuOpen && !this.contains(e.target)) {
        setNavState(false);
      }
    });

    // Close on resize to desktop
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (window.innerWidth >= 1024) {
          setNavState(false);
        }
      }, 250);
    });
  }

  /**
   * Setup sticky header behavior
   */
  _setupStickyBehavior() {
    if (this.getAttribute('sticky') === 'true') {
      this.classList.add('sticky');
    }
  }

  /**
   * Handle scroll events for sticky header effects
   */
  _handleScroll() {
    const currentScrollY = window.scrollY;
    
    // Add scrolled class when scrolled down
    if (currentScrollY > 50) {
      this.classList.add('scrolled');
    } else {
      this.classList.remove('scrolled');
    }
    
    // Hide header when scrolling down, show when scrolling up
    if (currentScrollY > this._scrollY && currentScrollY > 200) {
      this.classList.add('hidden');
    } else {
      this.classList.remove('hidden');
    }
    
    this._scrollY = currentScrollY;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    
    switch(name) {
      case 'sticky':
        if (newValue === 'true') {
          this.classList.add('sticky');
          window.addEventListener('scroll', this._handleScroll, { passive: true });
        } else {
          this.classList.remove('sticky');
          window.removeEventListener('scroll', this._handleScroll);
        }
        break;
    }
  }
}

// Register the custom element
if (!customElements.get('genesis-header')) {
  customElements.define('genesis-header', GenesisHeader);
}
