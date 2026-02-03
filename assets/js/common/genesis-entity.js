/**
 * GenesisEntity - Web Component for ontological entities
 * 
 * Usage:
 *   <genesis-entity nature="primary">
 *     <h2>My Content</h2>
 *   </genesis-entity>
 * 
 * Attributes:
 *   - nature: primary|secondary|imperative|latent|aggregate|ancestral
 *   - scroll-reveal: Enable scroll-triggered animation
 * 
 * SCSS Integration:
 *   genesis-entity {
 *     @include genesis-entity('primary');
 *   }
 */

import { GenesisElement } from './genesis-element.js';
import { presets } from './motion-presets.js';

/**
 * Animation mappings for entity natures
 */
const ENTITY_ANIMATIONS = {
  primary: {
    entrance: 'fadeInUp',
    hover: 'cardHover',
  },
  secondary: {
    entrance: 'fadeIn',
    hover: 'subtle',
  },
  imperative: {
    entrance: 'bounceIn',
    emphasis: 'pulse',
  },
  latent: {
    entrance: 'fadeIn',
    hover: null,
  },
  aggregate: {
    entrance: 'scaleIn',
    hover: null,
  },
  ancestral: {
    entrance: 'fadeIn',
    hover: null,
  },
};

/**
 * GenesisEntity component
 */
export class GenesisEntity extends GenesisElement {
  /**
   * Observed attributes
   */
  static get observedAttributes() {
    return ['nature', 'scroll-reveal'];
  }

  /**
   * Apply entrance animation based on nature
   */
  _applyEntranceAnimation() {
    const nature = this.getAttribute('nature') || 'primary';
    const config = ENTITY_ANIMATIONS[nature];

    if (!config) {
      console.warn(`Unknown entity nature: ${nature}`);
      return;
    }

    // Apply entrance animation
    if (config.entrance) {
      const preset = presets.entrance?.[config.entrance];
      if (preset) {
        const delay = this.hasAttribute('scroll-reveal') ? 0 : this._getStaggerDelay();
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
   * Setup interaction handlers based on nature
   */
  _setupInteractionHandlers() {
    const nature = this.getAttribute('nature') || 'primary';
    const config = ENTITY_ANIMATIONS[nature];

    if (!config) return;

    // Apply hover effect if configured
    if (config.hover) {
      this._setupHoverEffect(config.hover);
    }
  }

  /**
   * Handle attribute changes
   */
  _handleAttributeChange(name, oldValue, newValue) {
    if (name === 'nature' && oldValue !== newValue) {
      // Re-apply animations when nature changes
      this._cleanup();
      this._applyEntranceAnimation();
      this._setupInteractionHandlers();
    }
  }
}

// Register the custom element
if (!customElements.get('genesis-entity')) {
  customElements.define('genesis-entity', GenesisEntity);
}
