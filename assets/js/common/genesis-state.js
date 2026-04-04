/**
 * GenesisState - Web Component for ontological temporal states
 * 
 * Built on Lit (https://lit.dev) for reactive properties and lifecycle management.
 * 
 * Usage:
 *   <genesis-state condition="evolving">
 *     <div>Updating content...</div>
 *   </genesis-state>
 * 
 * Attributes:
 *   - condition: stable|evolving|deprecated|locked|simulated|scroll-triggered
 * 
 * SCSS Integration:
 *   genesis-state {
 *     @include genesis-state('evolving');
 *   }
 */

import { GenesisElement } from './genesis-element.js';
import { presets } from './motion-presets.js';

/**
 * Animation mappings for state conditions
 */
const STATE_ANIMATIONS = {
  stable: {
    entrance: 'fadeIn',
    emphasis: null,
  },
  evolving: {
    entrance: 'fadeIn',
    emphasis: 'pulse',
  },
  deprecated: {
    entrance: 'fadeIn',
    emphasis: null,
  },
  locked: {
    entrance: 'fadeIn',
    emphasis: null,
  },
  simulated: {
    entrance: 'fadeIn',
    emphasis: null,
  },
  'scroll-triggered': {
    entrance: 'fadeInUp',
    emphasis: null,
  },
};

/**
 * GenesisState component
 */
export class GenesisState extends GenesisElement {
  /**
   * Lit reactive properties — replaces static get observedAttributes()
   */
  static properties = {
    condition: { type: String },
  };

  /**
   * Apply entrance animation based on condition
   */
  _applyEntranceAnimation() {
    const condition = this.getAttribute('condition') || 'stable';
    const config = STATE_ANIMATIONS[condition];

    if (!config) {
      console.warn(`Unknown state condition: ${condition}`);
      return;
    }

    // Apply entrance animation
    if (config.entrance) {
      const preset = presets.entrance?.[config.entrance];
      if (preset) {
        const delay = this._getStaggerDelay();
        this._applyPreset(this, preset, { delay });
      }
    }

    // Apply continuous emphasis if configured
    if (config.emphasis) {
      const emphasisPreset = presets.emphasis?.[config.emphasis];
      if (emphasisPreset) {
        this._applyPreset(this, emphasisPreset);
      }
    }
  }

  /**
   * Setup scroll observer if condition is scroll-triggered
   */
  _setupScrollObserver() {
    const condition = this.getAttribute('condition');
    
    if (condition === 'scroll-triggered') {
      // Use parent's scroll observer implementation
      this.setAttribute('scroll-reveal', '');
      super._setupScrollObserver();
    }
  }

  /**
   * Lit lifecycle: called after property changes.
   * Replaces attributeChangedCallback + _handleAttributeChange pattern.
   */
  updated(changedProperties) {
    super.updated(changedProperties);
    // Only react to changes after initial setup (oldValue !== undefined)
    if (changedProperties.has('condition') && changedProperties.get('condition') !== undefined) {
      this._cleanup();
      this._applyEntranceAnimation();
      this._setupScrollObserver();
    }
  }
}

// Register the custom element
if (!customElements.get('genesis-state')) {
  customElements.define('genesis-state', GenesisState);
}
