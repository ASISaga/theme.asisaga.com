/**
 * GenesisCognition - Web Component for ontological information types
 * 
 * Usage:
 *   <genesis-cognition intent="axiom">
 *     <h1>Headline</h1>
 *   </genesis-cognition>
 * 
 * Attributes:
 *   - intent: axiom|discourse|protocol|gloss|motive|quantum
 * 
 * SCSS Integration:
 *   genesis-cognition {
 *     @include genesis-cognition('axiom');
 *   }
 */

import { GenesisElement } from './genesis-element.js';
import { presets } from './motion-presets.js';

/**
 * Animation mappings for cognition intents
 */
const COGNITION_ANIMATIONS = {
  axiom: {
    entrance: 'fadeInDown',
    hover: null,
  },
  discourse: {
    entrance: 'fadeIn',
    hover: null,
  },
  protocol: {
    entrance: 'fadeIn',
    hover: null,
  },
  gloss: {
    entrance: 'fadeIn',
    hover: null,
  },
  motive: {
    entrance: 'fadeIn',
    hover: null,
  },
  quantum: {
    entrance: 'scaleIn',
    hover: 'bounce',
  },
};

/**
 * GenesisCognition component
 */
export class GenesisCognition extends GenesisElement {
  /**
   * Observed attributes
   */
  static get observedAttributes() {
    return ['intent'];
  }

  /**
   * Apply entrance animation based on intent
   */
  _applyEntranceAnimation() {
    const intent = this.getAttribute('intent') || 'discourse';
    const config = COGNITION_ANIMATIONS[intent];

    if (!config) {
      console.warn(`Unknown cognition intent: ${intent}`);
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
  }

  /**
   * Setup interaction handlers based on intent
   */
  _setupInteractionHandlers() {
    const intent = this.getAttribute('intent') || 'discourse';
    const config = COGNITION_ANIMATIONS[intent];

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
    if (name === 'intent' && oldValue !== newValue) {
      // Re-apply animations when intent changes
      this._cleanup();
      this._applyEntranceAnimation();
      this._setupInteractionHandlers();
    }
  }
}

// Register the custom element
if (!customElements.get('genesis-cognition')) {
  customElements.define('genesis-cognition', GenesisCognition);
}
