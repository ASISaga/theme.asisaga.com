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

const NAV_FOCUS_DELAY_MS = 150;
const NAV_CLOSE_DELAY_MS = 300;
const NAV_RESIZE_DEBOUNCE_MS = 250;

export class GenesisHeader extends GenesisElement {
  static get observedAttributes() {
    return ['brand-url', 'logo-src', 'brand-text', 'tagline', 'sticky'];
  }

  static overlayElement = null;
  static overlayCount = 0;

  constructor() {
    super();
    this._mobileMenuOpen = false;
    this._scrollY = 0;
    this._lockedScrollPosition = 0;
    this._mobileBreakpoint = 1024;
    this._windowWidth = window.innerWidth;
    this._navHandlers = null;
    this._navLinkHandlers = [];
    this._navCloseTimer = null;
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
    this._teardownMobileToggle();
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
    if (this._navHandlers) return;

    let overlay = this.constructor.overlayElement || document.querySelector('[data-nav-overlay]');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'genesis-nav-overlay';
      overlay.setAttribute('data-nav-overlay', '');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.appendChild(overlay);
      this.constructor.overlayElement = overlay;
    }
    this.constructor.overlayCount += 1;

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
        this._lockedScrollPosition = window.scrollY;
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.top = `-${this._lockedScrollPosition}px`;

        const firstLink = nav.querySelector('a, button');
        if (firstLink) {
          setTimeout(() => firstLink.focus(), NAV_FOCUS_DELAY_MS);
        }
      } else {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.top = '';
        window.scrollTo(0, this._lockedScrollPosition);
        this._lockedScrollPosition = 0;
        toggle.focus();
      }
    };

    const onToggleClick = () => setNavState(!this._mobileMenuOpen);
    const onOverlayClick = () => setNavState(false);
    const onKeydown = (e) => {
      if (e.key === 'Escape' && this._mobileMenuOpen) {
        setNavState(false);
      }
    };
    const onDocumentClick = (e) => {
      if (this._mobileMenuOpen && !this.contains(e.target) && e.target !== overlay) {
        setNavState(false);
      }
    };

    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach((link) => {
      const handler = () => {
        const windowWidth = this._windowWidth;
        if (windowWidth < this._mobileBreakpoint) {
          clearTimeout(this._navCloseTimer);
          this._navCloseTimer = setTimeout(() => {
            if (!this.isConnected) return;
            setNavState(false);
          }, NAV_CLOSE_DELAY_MS);
        }
      };
      link.addEventListener('click', handler);
      this._navLinkHandlers.push({ link, handler });
    });

    const onResize = () => {
      if (!this._navHandlers) return;
      this._windowWidth = window.innerWidth;
      clearTimeout(this._navHandlers.resizeTimer);
      this._navHandlers.resizeTimer = setTimeout(() => {
        if (this._windowWidth >= this._mobileBreakpoint) {
          setNavState(false);
        }
      }, NAV_RESIZE_DEBOUNCE_MS);
    };

    this._navHandlers = {
      toggle,
      nav,
      overlay,
      onToggleClick,
      onOverlayClick,
      onKeydown,
      onDocumentClick,
      onResize,
      resizeTimer: null,
    };

    toggle.addEventListener('click', onToggleClick);
    if (overlay) {
      overlay.addEventListener('click', onOverlayClick);
    }
    document.addEventListener('keydown', onKeydown);
    document.addEventListener('click', onDocumentClick);
    window.addEventListener('resize', onResize);
  }

  _teardownMobileToggle() {
    if (!this._navHandlers) return;

    const {
      toggle,
      overlay,
      onToggleClick,
      onOverlayClick,
      onKeydown,
      onDocumentClick,
      onResize,
    } = this._navHandlers;

    if (this._navHandlers.resizeTimer) {
      clearTimeout(this._navHandlers.resizeTimer);
    }
    if (this._navCloseTimer) {
      clearTimeout(this._navCloseTimer);
      this._navCloseTimer = null;
    }

    toggle?.removeEventListener('click', onToggleClick);
    overlay?.removeEventListener('click', onOverlayClick);
    document.removeEventListener('keydown', onKeydown);
    document.removeEventListener('click', onDocumentClick);
    window.removeEventListener('resize', onResize);

    this._navLinkHandlers.forEach(({ link, handler }) => {
      link.removeEventListener('click', handler);
    });
    this._navLinkHandlers = [];

    this.constructor.overlayCount = Math.max(0, this.constructor.overlayCount - 1);
    if (this.constructor.overlayCount === 0 && this.constructor.overlayElement) {
      this.constructor.overlayElement.remove();
      this.constructor.overlayElement = null;
    }

    this._navHandlers = null;
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
