/**
 * Ontology Web Components
 * 
 * This module registers all Genesis Ontological Web Components.
 * Import this once in your application to enable all ontology components.
 * 
 * Components registered (all 6 ontological categories):
 *   - <genesis-environment logic="distributed|focused|associative|chronological|manifest|...">
 *   - <genesis-entity nature="primary|secondary|imperative|latent|aggregate|ancestral">
 *   - <genesis-cognition intent="axiom|discourse|protocol|gloss|motive|quantum">
 *   - <genesis-synapse vector="navigate|execute|inquiry|destructive|social">
 *   - <genesis-state condition="stable|evolving|deprecated|locked|simulated|scroll-triggered">
 *   - <genesis-atmosphere vibe="neutral|ethereal|void|vibrant">
 * 
 * Usage in HTML:
 *   <genesis-environment logic="distributed">
 *     <genesis-entity nature="primary">
 *       <h2>Content</h2>
 *     </genesis-entity>
 *   </genesis-environment>
 * 
 * Usage in SCSS:
 *   genesis-environment {
 *     @include genesis-environment('distributed');
 *   }
 *   genesis-entity {
 *     @include genesis-entity('primary');
 *   }
 * 
 * Benefits:
 *   - Complete ontological coverage (all 6 categories)
 *   - Natural HTML extension (feels like native elements)
 *   - Lifecycle-driven behavior (connectedCallback, disconnectedCallback)
 *   - Declarative attributes (nature="primary" vs programmatic detection)
 *   - No inline HTML/SCSS in JavaScript (triad philosophy)
 *   - Automatic behavior on mount
 *   - Responsive to attribute changes
 */

// Import all component definitions
import { GenesisEnvironment } from './genesis-environment.js';
import { GenesisEntity } from './genesis-entity.js';
import { GenesisCognition } from './genesis-cognition.js';
import { GenesisSynapse } from './genesis-synapse.js';
import { GenesisState } from './genesis-state.js';
import { GenesisAtmosphere } from './genesis-atmosphere.js';

/**
 * Initialize ontology components
 * This function is called automatically when this module is imported
 */
function initOntologyComponents() {
  // Components register themselves when imported
  // This function can be used for any additional initialization if needed
  
  console.log('Genesis Ontology Web Components initialized (all 6 categories):', {
    'genesis-environment': customElements.get('genesis-environment') !== undefined,
    'genesis-entity': customElements.get('genesis-entity') !== undefined,
    'genesis-cognition': customElements.get('genesis-cognition') !== undefined,
    'genesis-synapse': customElements.get('genesis-synapse') !== undefined,
    'genesis-state': customElements.get('genesis-state') !== undefined,
    'genesis-atmosphere': customElements.get('genesis-atmosphere') !== undefined,
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
  GenesisEnvironment,
  GenesisEntity,
  GenesisCognition,
  GenesisSynapse,
  GenesisState,
  GenesisAtmosphere,
};
