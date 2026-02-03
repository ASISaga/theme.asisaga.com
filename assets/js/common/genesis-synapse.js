/**
 * GenesisSynapse - Web Component for ontological interactions
 * 
 * Usage:
 *   <genesis-synapse vector="execute">
 *     <button>Click Me</button>
 *   </genesis-synapse>
 * 
 * Attributes:
 *   - vector: navigate|execute|inquiry|destructive|social
 * 
 * SCSS Integration:
 *   genesis-synapse {
 *     @include genesis-synapse('execute');
 *   }
 */

import { GenesisElement } from './genesis-element.js';
import { presets } from './motion-presets.js';

/**
 * Animation mappings for synapse vectors
 */
const SYNAPSE_ANIMATIONS = {
  navigate: {
    entrance: null,
    hover: 'linkHover',
    click: null,
  },
  execute: {
    entrance: null,
    hover: 'buttonHover',
    click: 'buttonPress',
  },
  inquiry: {
    entrance: null,
    hover: 'subtle',
    click: null,
  },
  destructive: {
    entrance: null,
    hover: 'shake',
    click: null,
  },
  social: {
    entrance: null,
    hover: 'bounce',
    click: 'heartbeat',
  },
};

/**
 * GenesisSynapse component
 */
export class GenesisSynapse extends GenesisElement {
  /**
   * Observed attributes
   */
  static get observedAttributes() {
    return ['vector'];
  }

  /**
   * Synapses typically don't have entrance animations
   * They're always interactive elements
   */
  _applyEntranceAnimation() {
    // Most synapses don't need entrance animations
    // They appear as part of their container entity
  }

  /**
   * Setup interaction handlers based on vector
   */
  _setupInteractionHandlers() {
    const vector = this.getAttribute('vector') || 'execute';
    const config = SYNAPSE_ANIMATIONS[vector];

    if (!config) {
      console.warn(`Unknown synapse vector: ${vector}`);
      return;
    }

    // Apply hover effect if configured
    if (config.hover) {
      this._setupHoverEffect(config.hover);
    }

    // Apply click effect if configured
    if (config.click) {
      this._setupClickEffect(config.click);
    }
  }

  /**
   * Setup click effect
   */
  _setupClickEffect(clickType) {
    const Motion = this._getMotion();
    if (!Motion || this._prefersReducedMotion()) return;

    this.addEventListener('click', () => {
      switch (clickType) {
        case 'buttonPress':
          Motion.animate(
            this,
            { scale: [1, 0.95, 1] },
            { duration: 0.2 }
          );
          break;

        case 'heartbeat':
          const heartbeatPreset = presets.emphasis?.heartbeat;
          if (heartbeatPreset) {
            this._applyPreset(this, heartbeatPreset);
          }
          break;
      }
    });
  }

  /**
   * Handle attribute changes
   */
  _handleAttributeChange(name, oldValue, newValue) {
    if (name === 'vector' && oldValue !== newValue) {
      // Re-setup interaction handlers when vector changes
      this._cleanup();
      this._setupInteractionHandlers();
    }
  }
}

// Register the custom element
if (!customElements.get('genesis-synapse')) {
  customElements.define('genesis-synapse', GenesisSynapse);
}
