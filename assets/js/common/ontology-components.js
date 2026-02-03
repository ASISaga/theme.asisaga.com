/**
 * Ontology Web Components
 * 
 * This module registers all Genesis Ontological Web Components.
 * Import this once in your application to enable all ontology components.
 * 
 * Core Ontological Components (6):
 *   - <genesis-environment logic="distributed|focused|associative|chronological|manifest|...">
 *   - <genesis-entity nature="primary|secondary|imperative|latent|aggregate|ancestral">
 *   - <genesis-cognition intent="axiom|discourse|protocol|gloss|motive|quantum">
 *   - <genesis-synapse vector="navigate|execute|inquiry|destructive|social">
 *   - <genesis-state condition="stable|evolving|deprecated|locked|simulated|scroll-triggered">
 *   - <genesis-atmosphere vibe="neutral|ethereal|void|vibrant">
 * 
 * Specialized Components (11):
 *   - <genesis-card variant="default|featured|compact|media">
 *   - <genesis-navigation type="primary|secondary|tabs|breadcrumb|sidebar">
 *   - <genesis-form layout="vertical|horizontal|inline" validate="true">
 *   - <genesis-media ratio="16:9|4:3|1:1|21:9" lazy="true">
 *   - <genesis-header sticky="true">
 *   - <genesis-footer show-back-to-top="true">
 *   - <genesis-navbar orientation="horizontal|vertical">
 *   - <genesis-search live-search="true" min-chars="3">
 *   - <genesis-accordion allow-multiple="false" animate="true">
 *   - <genesis-dashboard layout="grid" columns="3">
 *   - <genesis-chat auto-scroll="true" show-timestamps="true">
 * 
 * Usage in HTML:
 *   <genesis-header sticky="true">
 *     <genesis-navbar></genesis-navbar>
 *   </genesis-header>
 *   <genesis-environment logic="distributed">
 *     <genesis-entity nature="primary">
 *       <h2>Content</h2>
 *     </genesis-entity>
 *   </genesis-environment>
 *   <genesis-footer show-back-to-top="true"></genesis-footer>
 * 
 * Usage in SCSS:
 *   genesis-header {
 *     // Header styling
 *   }
 *   genesis-environment {
 *     @include genesis-environment('distributed');
 *   }
 *   genesis-entity {
 *     @include genesis-entity('primary');
 *   }
 * 
 * Benefits:
 *   - Complete ontological coverage (all 6 categories + 11 specialized)
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
import { GenesisCard } from './genesis-card.js';
import { GenesisNavigation } from './genesis-navigation.js';
import { GenesisForm } from './genesis-form.js';
import { GenesisMedia } from './genesis-media.js';
import { GenesisHeader } from './genesis-header.js';
import { GenesisFooter } from './genesis-footer.js';
import { GenesisNavbar } from './genesis-navbar.js';
import { GenesisSearch } from './genesis-search.js';
import { GenesisAccordion } from './genesis-accordion.js';
import { GenesisDashboard } from './genesis-dashboard.js';
import { GenesisChat } from './genesis-chat.js';

/**
 * Initialize ontology components
 * This function is called automatically when this module is imported
 */
function initOntologyComponents() {
  // Components register themselves when imported
  // This function can be used for any additional initialization if needed
  
  console.log('Genesis Ontology Web Components initialized (all 17 components):', {
    // Core ontological (6)
    'genesis-environment': customElements.get('genesis-environment') !== undefined,
    'genesis-entity': customElements.get('genesis-entity') !== undefined,
    'genesis-cognition': customElements.get('genesis-cognition') !== undefined,
    'genesis-synapse': customElements.get('genesis-synapse') !== undefined,
    'genesis-state': customElements.get('genesis-state') !== undefined,
    'genesis-atmosphere': customElements.get('genesis-atmosphere') !== undefined,
    // Specialized (11)
    'genesis-card': customElements.get('genesis-card') !== undefined,
    'genesis-navigation': customElements.get('genesis-navigation') !== undefined,
    'genesis-form': customElements.get('genesis-form') !== undefined,
    'genesis-media': customElements.get('genesis-media') !== undefined,
    'genesis-header': customElements.get('genesis-header') !== undefined,
    'genesis-footer': customElements.get('genesis-footer') !== undefined,
    'genesis-navbar': customElements.get('genesis-navbar') !== undefined,
    'genesis-search': customElements.get('genesis-search') !== undefined,
    'genesis-accordion': customElements.get('genesis-accordion') !== undefined,
    'genesis-dashboard': customElements.get('genesis-dashboard') !== undefined,
    'genesis-chat': customElements.get('genesis-chat') !== undefined,
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
  // Core ontological
  GenesisEnvironment,
  GenesisEntity,
  GenesisCognition,
  GenesisSynapse,
  GenesisState,
  GenesisAtmosphere,
  // Specialized
  GenesisCard,
  GenesisNavigation,
  GenesisForm,
  GenesisMedia,
  GenesisHeader,
  GenesisFooter,
  GenesisNavbar,
  GenesisSearch,
  GenesisAccordion,
  GenesisDashboard,
  GenesisChat,
};
