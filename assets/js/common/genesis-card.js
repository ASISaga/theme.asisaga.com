/**
 * Genesis Card Component
 * 
 * A specialized entity component for card-based content.
 * Extends GenesisEntity with card-specific behaviors.
 * 
 * Usage:
 *   <genesis-card variant="default|featured|compact|media">
 *     <h3>Card Title</h3>
 *     <p>Card content</p>
 *   </genesis-card>
 * 
 * SCSS Integration:
 *   genesis-card {
 *     @include genesis-entity('primary');
 *   }
 *   genesis-card[variant="featured"] {
 *     @include genesis-entity('imperative');
 *   }
 */

import { GenesisElement } from './genesis-element.js';

export class GenesisCard extends GenesisElement {
  static get observedAttributes() {
    return ['variant', 'clickable', 'hover-lift'];
  }

  connectedCallback() {
    super.connectedCallback();
    this._applyCardBehavior();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this._applyCardBehavior();
    }
  }

  _applyCardBehavior() {
    const variant = this.getAttribute('variant') || 'default';
    const clickable = this.hasAttribute('clickable');
    const hoverLift = this.getAttribute('hover-lift') !== 'false'; // Default true

    // Set data attribute for CSS targeting
    this.dataset.variant = variant;

    // Apply entrance animation based on variant
    if (this._shouldAnimate()) {
      this._applyEntranceAnimation(variant);
    }

    // Apply hover effects
    if (hoverLift) {
      this._setupHoverLift();
    }

    // Make clickable if specified
    if (clickable) {
      this._makeClickable();
    }

    // Set ARIA role for card
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'article');
    }
  }

  _applyEntranceAnimation(variant) {
    const animations = {
      'default': 'fadeInUp',
      'featured': 'bounceIn',
      'compact': 'fadeIn',
      'media': 'scaleIn'
    };

    const animationName = animations[variant] || 'fadeInUp';
    
    if (window.Motion && window.motionPresets) {
      const preset = window.motionPresets.entrance[animationName];
      if (preset) {
        this._applyPreset(this, preset);
      }
    }
  }

  _setupHoverLift() {
    if (window.Motion) {
      this.addEventListener('mouseenter', () => {
        if (!this._reducedMotion()) {
          window.Motion.animate(this, {
            transform: ['translateY(0px)', 'translateY(-4px)'],
            boxShadow: [
              'var(--shadow-md, 0 4px 6px rgba(0,0,0,0.1))',
              'var(--shadow-lg, 0 10px 20px rgba(0,0,0,0.15))'
            ]
          }, {
            duration: 0.3,
            easing: 'ease-out'
          });
        }
      });

      this.addEventListener('mouseleave', () => {
        if (!this._reducedMotion()) {
          window.Motion.animate(this, {
            transform: ['translateY(-4px)', 'translateY(0px)'],
            boxShadow: [
              'var(--shadow-lg, 0 10px 20px rgba(0,0,0,0.15))',
              'var(--shadow-md, 0 4px 6px rgba(0,0,0,0.1))'
            ]
          }, {
            duration: 0.3,
            easing: 'ease-in'
          });
        }
      });
    }
  }

  _makeClickable() {
    // Find first link in card
    const link = this.querySelector('a');
    if (link) {
      this.style.cursor = 'pointer';
      this.setAttribute('tabindex', '0');
      
      const handleClick = (e) => {
        // Don't trigger if clicking on a link or button directly
        if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
          return;
        }
        link.click();
      };

      this.addEventListener('click', handleClick);
      this.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick(e);
        }
      });
    }
  }
}

// Register the custom element
if (!customElements.get('genesis-card')) {
  customElements.define('genesis-card', GenesisCard);
}
