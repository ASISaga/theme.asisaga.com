/**
 * Genesis Footer Web Component
 * 
 * Site footer with navigation links, social links, and copyright info.
 * Includes back-to-top button functionality.
 * 
 * @example
 * <genesis-footer show-back-to-top="true">
 *   <!-- Footer content -->
 * </genesis-footer>
 */

import { GenesisElement } from './genesis-element.js';

export class GenesisFooter extends GenesisElement {
  static get observedAttributes() {
    return ['show-back-to-top'];
  }

  connectedCallback() {
    super.connectedCallback();
    
    this._setAriaRole();
    this._setupBackToTop();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._backToTopButton) {
      this._backToTopButton.removeEventListener('click', this._scrollToTop);
    }
    if (this._handleScroll) {
      window.removeEventListener('scroll', this._handleScroll);
    }
  }

  /**
   * Set ARIA role for footer
   */
  _setAriaRole() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'contentinfo');
    }
  }

  /**
   * Setup back-to-top button functionality
   */
  _setupBackToTop() {
    const showBackToTop = this.getAttribute('show-back-to-top') !== 'false';
    
    if (!showBackToTop) return;
    
    this._backToTopButton = this.querySelector('[data-back-to-top], .genesis-back-to-top, #back-to-top');
    
    if (this._backToTopButton) {
      this._scrollToTop = this._scrollToTop.bind(this);
      this._handleScroll = this._handleBackToTopVisibility.bind(this);
      
      this._backToTopButton.addEventListener('click', this._scrollToTop);
      window.addEventListener('scroll', this._handleScroll, { passive: true });
      
      // Initial check
      this._handleBackToTopVisibility();
    }
  }

  /**
   * Scroll to top of page
   */
  _scrollToTop(e) {
    e.preventDefault();
    
    const reducedMotion = this._prefersReducedMotion();
    
    if (reducedMotion) {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
    
    // Focus on skip link or main content
    const skipTarget = document.getElementById('skip-target') || document.querySelector('main');
    if (skipTarget) {
      skipTarget.focus();
    }
  }

  /**
   * Handle back-to-top button visibility based on scroll position
   */
  _handleBackToTopVisibility() {
    if (!this._backToTopButton) return;
    
    const scrollY = window.scrollY;
    const threshold = 300;
    
    if (scrollY > threshold) {
      this._backToTopButton.classList.add('visible');
      this._backToTopButton.removeAttribute('hidden');
    } else {
      this._backToTopButton.classList.remove('visible');
      this._backToTopButton.setAttribute('hidden', '');
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    
    switch(name) {
      case 'show-back-to-top':
        if (this._backToTopButton) {
          if (newValue === 'false') {
            this._backToTopButton.style.display = 'none';
          } else {
            this._backToTopButton.style.display = '';
          }
        }
        break;
    }
  }
}

// Register the custom element
if (!customElements.get('genesis-footer')) {
  customElements.define('genesis-footer', GenesisFooter);
}
