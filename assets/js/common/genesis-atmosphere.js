/**
 * Genesis Atmosphere Component
 * 
 * Represents ontological sensory texture and "vibe" without describing visuals.
 * This component applies atmospheric context through CSS custom properties.
 * 
 * Usage:
 *   <genesis-atmosphere vibe="ethereal">
 *     <div class="content">Content here</div>
 *   </genesis-atmosphere>
 * 
 * SCSS Integration:
 *   genesis-atmosphere {
 *     @include genesis-atmosphere('ethereal');
 *   }
 * 
 * Attributes:
 *   - vibe: neutral|ethereal|void|vibrant|spacious-mobile|dense-desktop|viewport-aware
 * 
 * Philosophy:
 *   - No inline HTML/SCSS - pure atmosphere control
 *   - SCSS defines visual manifestation
 *   - Component manages atmospheric context
 *   - Uses CSS custom properties for communication
 */

export class GenesisAtmosphere extends HTMLElement {
  static get observedAttributes() {
    return ['vibe'];
  }

  constructor() {
    super();
    this._vibe = 'neutral';
    this._initialized = false;
  }

  connectedCallback() {
    if (!this._initialized) {
      this._initialize();
      this._initialized = true;
    }
  }

  disconnectedCallback() {
    this._cleanup();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'vibe' && oldValue !== newValue && this._initialized) {
      this._vibe = newValue || 'neutral';
      this._applyVibe();
    }
  }

  /**
   * Initialize the atmosphere component
   * @private
   */
  _initialize() {
    this._vibe = this.getAttribute('vibe') || 'neutral';
    
    // Apply atmospheric context
    this._applyVibe();
    
    // Setup responsive atmosphere if needed
    this._setupResponsiveAtmosphere();
    
    // Setup viewport awareness if needed
    if (this._vibe === 'viewport-aware') {
      this._setupViewportAwareness();
    }
  }

  /**
   * Apply vibe-specific atmospheric context
   * @private
   */
  _applyVibe() {
    // Add data attribute for CSS targeting
    this.dataset.vibe = this._vibe;

    // Apply CSS custom properties for atmospheric control
    // These communicate with SCSS without inline styles
    this._setCSSProperties();

    // Handle specific vibe behaviors
    switch (this._vibe) {
      case 'ethereal':
        this._applyEtherealContext();
        break;
      case 'void':
        this._applyVoidContext();
        break;
      case 'vibrant':
        this._applyVibrantContext();
        break;
      case 'spacious-mobile':
        this._applySpaciousContext();
        break;
      case 'dense-desktop':
        this._applyDenseContext();
        break;
      case 'viewport-aware':
        this._applyViewportContext();
        break;
      default:
        this._applyNeutralContext();
        break;
    }
  }

  /**
   * Set CSS custom properties for atmospheric communication
   * @private
   */
  _setCSSProperties() {
    // Atmospheric intensity (0-1 scale)
    const intensityMap = {
      'neutral': '0.5',
      'ethereal': '0.8',
      'void': '1.0',
      'vibrant': '1.0',
      'spacious-mobile': '0.6',
      'dense-desktop': '0.4',
      'viewport-aware': '0.5',
    };

    // Spatial density (0-1 scale, higher = more dense)
    const densityMap = {
      'neutral': '0.5',
      'ethereal': '0.3',
      'void': '0.2',
      'vibrant': '0.7',
      'spacious-mobile': '0.2',
      'dense-desktop': '0.8',
      'viewport-aware': '0.5',
    };

    const intensity = intensityMap[this._vibe] || '0.5';
    const density = densityMap[this._vibe] || '0.5';

    // Set properties on element for SCSS to use
    this.style.setProperty('--atmosphere-intensity', intensity);
    this.style.setProperty('--atmosphere-density', density);
  }

  /**
   * Apply ethereal atmospheric context
   * @private
   */
  _applyEtherealContext() {
    // Light, high-transparency, minimal weight
    // Behavior: Reduce visual noise
    this._reduceMotionIfPreferred();
  }

  /**
   * Apply void atmospheric context
   * @private
   */
  _applyVoidContext() {
    // Deep space, high contrast, zero distraction
    // Behavior: Focus mode
    this.dataset.focusMode = 'true';
  }

  /**
   * Apply vibrant atmospheric context
   * @private
   */
  _applyVibrantContext() {
    // High energy, data-saturated, neon
    // Behavior: Enhanced contrast
    this.dataset.highContrast = 'true';
  }

  /**
   * Apply spacious context
   * @private
   */
  _applySpaciousContext() {
    // Generous spacing for touch
    // Behavior: Touch-optimized
    this.dataset.touchOptimized = 'true';
  }

  /**
   * Apply dense context
   * @private
   */
  _applyDenseContext() {
    // High information density
    // Behavior: Compact mode
    this.dataset.compact = 'true';
  }

  /**
   * Apply viewport-aware context
   * @private
   */
  _applyViewportContext() {
    // Content sized relative to viewport
    // Behavior: Dynamic scaling
    this._updateViewportScale();
  }

  /**
   * Setup responsive atmosphere
   * @private
   */
  _setupResponsiveAtmosphere() {
    // Auto-switch between spacious/dense based on viewport
    if (this._vibe === 'spacious-mobile' || this._vibe === 'dense-desktop') {
      this._setupAdaptiveSpacing();
    }
  }

  /**
   * Setup adaptive spacing based on viewport
   * @private
   */
  _setupAdaptiveSpacing() {
    const updateSpacing = () => {
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      
      if (this._vibe === 'spacious-mobile') {
        this.dataset.currentSpacing = isMobile ? 'spacious' : 'normal';
      } else if (this._vibe === 'dense-desktop') {
        this.dataset.currentSpacing = isMobile ? 'normal' : 'dense';
      }
    };

    updateSpacing();
    window.addEventListener('resize', updateSpacing);
    
    this._spacingCleanup = () => {
      window.removeEventListener('resize', updateSpacing);
    };
  }

  /**
   * Setup viewport awareness
   * @private
   */
  _setupViewportAwareness() {
    this._updateViewportScale();
    
    window.addEventListener('resize', () => this._updateViewportScale());
    
    this._viewportCleanup = () => {
      window.removeEventListener('resize', this._updateViewportScale);
    };
  }

  /**
   * Update viewport scale
   * @private
   */
  _updateViewportScale() {
    const vh = window.innerHeight * 0.01;
    const vw = window.innerWidth * 0.01;
    
    this.style.setProperty('--vh', `${vh}px`);
    this.style.setProperty('--vw', `${vw}px`);
  }

  /**
   * Reduce motion if user prefers
   * @private
   */
  _reduceMotionIfPreferred() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      this.dataset.reducedMotion = 'true';
    }
  }

  /**
   * Cleanup component resources
   * @private
   */
  _cleanup() {
    if (this._spacingCleanup) {
      this._spacingCleanup();
      this._spacingCleanup = null;
    }
    
    if (this._viewportCleanup) {
      this._viewportCleanup();
      this._viewportCleanup = null;
    }
  }
}

// Register the custom element
if (!customElements.get('genesis-atmosphere')) {
  customElements.define('genesis-atmosphere', GenesisAtmosphere);
}
