/**
 * Ontology Web Components
 * 
 * This module registers all Genesis Ontological Web Components.
 * Import this once in your application to enable all ontology components.
 * 
 * Components registered:
 *   - <genesis-entity nature="primary|secondary|imperative|latent|aggregate|ancestral">
 *   - <genesis-synapse vector="navigate|execute|inquiry|destructive|social">
 *   - <genesis-cognition intent="axiom|discourse|protocol|gloss|motive|quantum">
 *   - <genesis-state condition="stable|evolving|deprecated|locked|simulated|scroll-triggered">
 * 
 * Usage in HTML:
 *   <genesis-entity nature="primary">
 *     <h2>Content</h2>
 *   </genesis-entity>
 * 
 * Usage in SCSS:
 *   genesis-entity {
 *     @include genesis-entity('primary');
 *   }
 * 
 * Benefits:
 *   - Natural HTML extension (feels like native elements)
 *   - Lifecycle-driven animations (connectedCallback, disconnectedCallback)
 *   - Declarative attributes (nature="primary" vs programmatic detection)
 *   - No inline HTML/SCSS in JavaScript
 *   - Automatic animation on mount
 *   - Responsive to attribute changes
 */

// Import all component definitions
import { GenesisEntity } from './genesis-entity.js';
import { GenesisSynapse } from './genesis-synapse.js';
import { GenesisCognition } from './genesis-cognition.js';
import { GenesisState } from './genesis-state.js';

/**
 * Initialize ontology components
 * This function is called automatically when this module is imported
 */
function initOntologyComponents() {
  // Components register themselves when imported
  // This function can be used for any additional initialization if needed
  
  console.log('Genesis Ontology Web Components initialized:', {
    'genesis-entity': customElements.get('genesis-entity') !== undefined,
    'genesis-synapse': customElements.get('genesis-synapse') !== undefined,
    'genesis-cognition': customElements.get('genesis-cognition') !== undefined,
    'genesis-state': customElements.get('genesis-state') !== undefined,
  });
}

// Auto-initialize when module loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initOntologyComponents);
} else {
  initOntologyComponents();
}

// Export components for direct use if needed
export {
  GenesisEntity,
  GenesisSynapse,
  GenesisCognition,
  GenesisState,
};
