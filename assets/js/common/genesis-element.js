/**
 * GenesisElement - Base class for all Genesis Ontological Web Components
 * 
 * This base class provides common functionality for ontology-based Web Components:
 * - Animation lifecycle management
 * - Motion library integration
 * - Reduced motion support
 * - Attribute observation
 * - Event handling
 * 
 * NO INLINE HTML OR SCSS - Components are transparent containers
 * that enhance existing HTML/SCSS with animation behavior
 */

import { presets } from './motion-presets.js';

/**
 * Base class for Genesis ontological components
 */
export class GenesisElement extends HTMLElement {
  constructor() {
    super();
    this._animations = [];
    this._observers = [];
  }

  /**
   * Lifecycle: Component added to DOM
   * Override in subclasses to add entrance animations
   */
  connectedCallback() {
    // Wait for Motion library to be available
    this._waitForMotion(() => {
      this._applyEntranceAnimation();
      this._setupInteractionHandlers();
      this._setupScrollObserver();
    });
  }

  /**
   * Lifecycle: Component removed from DOM
   * Cleanup animations and observers
   */
  disconnectedCallback() {
    this._cleanup();
  }

  /**
   * Lifecycle: Attribute changed
   * Override in subclasses to handle attribute changes
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this._handleAttributeChange(name, oldValue, newValue);
    }
  }

  /**
   * Wait for Motion library to be available
   */
  _waitForMotion(callback) {
    if (this._hasMotion()) {
      callback();
    } else {
      // Motion might not be loaded yet, wait for it
      const checkInterval = setInterval(() => {
        if (this._hasMotion()) {
          clearInterval(checkInterval);
          callback();
        }
      }, 100);

      // Give up after 5 seconds
      setTimeout(() => clearInterval(checkInterval), 5000);
    }
  }

  /**
   * Check if Motion library is available
   */
  _hasMotion() {
    return typeof window.Motion !== 'undefined' && 
           typeof window.Motion.animate === 'function';
  }

  /**
   * Get Motion library
   */
  _getMotion() {
    return this._hasMotion() ? window.Motion : null;
  }

  /**
   * Check if user prefers reduced motion
   */
  _prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /**
   * Apply animation preset with reduced motion support
   */
  _applyPreset(element, preset, customOptions = {}) {
    if (!preset || !this._hasMotion()) return null;

    const Motion = this._getMotion();
    const options = { ...preset.options, ...customOptions };

    if (this._prefersReducedMotion()) {
      options.duration = 0.001;
      options.delay = 0;
    }

    const animation = Motion.animate(element, preset.keyframes, options);
    this._animations.push(animation);
    return animation;
  }

  /**
   * Apply entrance animation (override in subclasses)
   */
  _applyEntranceAnimation() {
    // To be implemented by subclasses
  }

  /**
   * Setup interaction handlers (override in subclasses)
   */
  _setupInteractionHandlers() {
    // To be implemented by subclasses
  }

  /**
   * Setup scroll observer for scroll-triggered animations
   */
  _setupScrollObserver() {
    if (this.hasAttribute('scroll-reveal')) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this._applyEntranceAnimation();
              observer.unobserve(this);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
      );

      observer.observe(this);
      this._observers.push(observer);
    }
  }

  /**
   * Handle attribute changes (override in subclasses)
   */
  _handleAttributeChange(name, oldValue, newValue) {
    // To be implemented by subclasses
  }

  /**
   * Setup hover effect
   */
  _setupHoverEffect(hoverType) {
    const Motion = this._getMotion();
    if (!Motion || this._prefersReducedMotion()) return;

    const element = this;

    switch (hoverType) {
      case 'cardHover':
        element.addEventListener('mouseenter', () => {
          Motion.animate(element, { y: -4, boxShadow: '0 8px 24px oklch(0.2 0.01 250 / 0.15)' }, { duration: 0.3 });
        });
        element.addEventListener('mouseleave', () => {
          Motion.animate(element, { y: 0, boxShadow: '0 2px 8px oklch(0.2 0.01 250 / 0.1)' }, { duration: 0.3 });
        });
        break;

      case 'subtle':
        element.addEventListener('mouseenter', () => {
          Motion.animate(element, { opacity: 0.8 }, { duration: 0.2 });
        });
        element.addEventListener('mouseleave', () => {
          Motion.animate(element, { opacity: 1 }, { duration: 0.2 });
        });
        break;

      case 'buttonHover':
        element.addEventListener('mouseenter', () => {
          Motion.animate(element, { scale: 1.05 }, { duration: 0.2 });
        });
        element.addEventListener('mouseleave', () => {
          Motion.animate(element, { scale: 1 }, { duration: 0.2 });
        });
        break;

      case 'linkHover':
        // Link hover handled by CSS typically
        break;

      case 'shake':
        element.addEventListener('mouseenter', () => {
          const shakePreset = presets.emphasis?.shake;
          if (shakePreset) {
            this._applyPreset(element, shakePreset);
          }
        });
        break;

      case 'bounce':
        element.addEventListener('mouseenter', () => {
          const bouncePreset = presets.emphasis?.bounce;
          if (bouncePreset) {
            this._applyPreset(element, bouncePreset);
          }
        });
        break;
    }
  }

  /**
   * Cleanup animations and observers
   */
  _cleanup() {
    // Stop all animations
    this._animations.forEach(animation => {
      if (animation && typeof animation.cancel === 'function') {
        animation.cancel();
      }
    });
    this._animations = [];

    // Disconnect observers
    this._observers.forEach(observer => {
      if (observer && typeof observer.disconnect === 'function') {
        observer.disconnect();
      }
    });
    this._observers = [];
  }

  /**
   * Get animation delay based on element index (for stagger effects)
   */
  _getStaggerDelay() {
    const parent = this.parentElement;
    if (!parent) return 0;

    const siblings = Array.from(parent.children).filter(
      child => child.tagName === this.tagName
    );
    const index = siblings.indexOf(this);
    return index * 0.1; // 100ms stagger
  }
}
