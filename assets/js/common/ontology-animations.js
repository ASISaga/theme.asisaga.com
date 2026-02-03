/**
 * Ontology-Aware Animation System
 * 
 * Automatically applies Motion animations based on ontological SCSS mixins
 * Enables subdomains to be "animation-blind" - animations work through ontology
 * 
 * This module detects ontological roles from class naming patterns and applies
 * appropriate Motion animations automatically. Subdomains only need to use
 * genesis-* mixins in their SCSS - animations are applied automatically.
 * 
 * USAGE IN SUBDOMAINS:
 * 1. Use ontological mixins in your SCSS: @include genesis-entity('primary');
 * 2. Add a class that indicates ontological usage: class="my-card"
 * 3. Animations apply automatically - no JavaScript needed!
 * 
 * The system detects:
 * - Elements with data-genesis-* attributes (explicit marking)
 * - Common semantic patterns (card, button, heading, etc.)
 * - Scroll-triggered elements
 */

import { presets } from './motion-presets.js';

/**
 * Check if Motion library is available
 */
function hasMotion() {
  return typeof window.Motion !== 'undefined' && typeof window.Motion.animate === 'function';
}

/**
 * Check if reduced motion is preferred
 */
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get Motion library
 */
function getMotion() {
  if (!hasMotion()) {
    console.warn('Motion library not available for ontology animations');
    return null;
  }
  return window.Motion;
}

/**
 * Apply animation preset with reduced motion support
 */
function applyPreset(element, preset, customOptions = {}) {
  if (!preset || !hasMotion()) return null;
  
  const Motion = getMotion();
  const options = { ...preset.options, ...customOptions };
  
  if (prefersReducedMotion()) {
    options.duration = 0.001;
    options.delay = 0;
  }
  
  return Motion.animate(element, preset.keyframes, options);
}

/**
 * ONTOLOGY ANIMATION MAPPINGS
 * Define which animations apply to which ontological roles
 */

const ONTOLOGY_ANIMATIONS = {
  /**
   * ENTITY ANIMATIONS
   * Based on genesis-entity($nature) mixin
   */
  entity: {
    'primary': {
      entrance: 'fadeInUp',      // Main content fades in from bottom
      hover: 'cardHover',        // Lift effect on hover
    },
    'secondary': {
      entrance: 'fadeIn',        // Secondary content simple fade
      hover: 'subtle',           // Subtle hover effect
    },
    'imperative': {
      entrance: 'bounceIn',      // Urgent content bounces in
      emphasis: 'pulse',         // Continuous pulse to draw attention
    },
    'latent': {
      entrance: 'fadeIn',        // Dormant content fades in quietly
      hover: null,               // No hover for inactive content
    },
    'aggregate': {
      entrance: 'scaleIn',       // Container scales in
      hover: null,               // Containers don't need hover
    },
  },
  
  /**
   * SYNAPSE ANIMATIONS
   * Based on genesis-synapse($vector) mixin
   */
  synapse: {
    'navigate': {
      hover: 'linkHover',        // Link underline animation
      click: null,
    },
    'execute': {
      hover: 'buttonHover',      // Button pulse on hover
      click: 'buttonPress',      // Press effect on click
    },
    'inquiry': {
      hover: 'subtle',           // Subtle hover for search/expand
      click: null,
    },
    'destructive': {
      hover: 'shake',            // Shake to indicate danger
      click: null,
    },
    'social': {
      hover: 'bounce',           // Bounce for social actions
      click: 'heartbeat',        // Heartbeat on click
    },
  },
  
  /**
   * STATE ANIMATIONS
   * Based on genesis-state($condition) mixin
   */
  state: {
    'scroll-triggered': {
      entrance: 'scrollReveal',  // Fade in when scrolled into view
    },
    'evolving': {
      emphasis: 'pulse',         // Pulse for updating content
    },
    'deprecated': {
      entrance: 'fadeIn',        // Deprecated content fades in
      emphasis: null,
    },
  },
  
  /**
   * COGNITION ANIMATIONS
   * Based on genesis-cognition($intent) mixin
   */
  cognition: {
    'axiom': {
      entrance: 'fadeInDown',    // Headlines come from top
    },
    'discourse': {
      entrance: 'fadeIn',        // Body text simple fade
    },
    'quantum': {
      entrance: 'scaleIn',       // Tags/chips scale in
      hover: 'bounce',           // Bounce on hover
    },
  },
};

/**
 * Detect ontological role from element
 * Priority: data attributes > semantic patterns > element type
 */
function detectOntologyRole(element) {
  const roles = {};
  
  // 1. Check for explicit data attributes (highest priority)
  if (element.dataset.genesisEntity) {
    roles.entity = element.dataset.genesisEntity;
  }
  if (element.dataset.genesisSynapse) {
    roles.synapse = element.dataset.genesisSynapse;
  }
  if (element.dataset.genesisState) {
    roles.state = element.dataset.genesisState;
  }
  if (element.dataset.genesisCognition) {
    roles.cognition = element.dataset.genesisCognition;
  }
  
  // 2. Infer from semantic class patterns
  const classes = Array.from(element.classList).join(' ');
  
  // Entity patterns - cards, containers, panels
  if (classes.match(/card|panel|box|container|wrapper|section/i) && !roles.entity) {
    roles.entity = 'primary';
  }
  
  // Synapse patterns - buttons, links, actions
  if ((classes.match(/button|btn|cta/i) || element.tagName === 'BUTTON') && !roles.synapse) {
    roles.synapse = 'execute';
  }
  if ((classes.match(/link|anchor/i) || element.tagName === 'A') && !roles.synapse) {
    roles.synapse = 'navigate';
  }
  
  // Cognition patterns - headings, text
  if (element.tagName && element.tagName.match(/^H[1-6]$/) && !roles.cognition) {
    roles.cognition = 'axiom';
  }
  if (classes.match(/tag|chip|badge/i) && !roles.cognition) {
    roles.cognition = 'quantum';
  }
  
  // State patterns - special states
  if (classes.match(/scroll-trigger|fade-in|reveal/i) && !roles.state) {
    roles.state = 'scroll-triggered';
  }
  
  return roles;
}

/**
 * Apply entrance animation based on ontological role
 */
function applyEntranceAnimation(element, roles, delay = 0) {
  let preset = null;
  let presetName = null;
  
  // Priority: state > entity > synapse > cognition
  if (roles.state && ONTOLOGY_ANIMATIONS.state[roles.state]?.entrance) {
    presetName = ONTOLOGY_ANIMATIONS.state[roles.state].entrance;
    
    if (presetName === 'scrollReveal') {
      // Special handling for scroll-triggered animations
      setupScrollRevealOntology(element);
      return;
    }
  } else if (roles.entity && ONTOLOGY_ANIMATIONS.entity[roles.entity]?.entrance) {
    presetName = ONTOLOGY_ANIMATIONS.entity[roles.entity].entrance;
  } else if (roles.synapse && ONTOLOGY_ANIMATIONS.synapse[roles.synapse]?.entrance) {
    presetName = ONTOLOGY_ANIMATIONS.synapse[roles.synapse].entrance;
  } else if (roles.cognition && ONTOLOGY_ANIMATIONS.cognition[roles.cognition]?.entrance) {
    presetName = ONTOLOGY_ANIMATIONS.cognition[roles.cognition].entrance;
  }
  
  if (presetName) {
    preset = presets.entrance[presetName];
    if (preset) {
      applyPreset(element, preset, { delay });
    }
  }
}

/**
 * Apply hover animation based on ontological role
 */
function applyHoverAnimation(element, roles) {
  let hoverType = null;
  
  if (roles.entity && ONTOLOGY_ANIMATIONS.entity[roles.entity]?.hover) {
    hoverType = ONTOLOGY_ANIMATIONS.entity[roles.entity].hover;
  } else if (roles.synapse && ONTOLOGY_ANIMATIONS.synapse[roles.synapse]?.hover) {
    hoverType = ONTOLOGY_ANIMATIONS.synapse[roles.synapse].hover;
  } else if (roles.cognition && ONTOLOGY_ANIMATIONS.cognition[roles.cognition]?.hover) {
    hoverType = ONTOLOGY_ANIMATIONS.cognition[roles.cognition].hover;
  }
  
  if (hoverType && hasMotion()) {
    setupHoverEffect(element, hoverType);
  }
}

/**
 * Apply emphasis animation based on ontological role
 */
function applyEmphasisAnimation(element, roles) {
  let emphasisType = null;
  
  if (roles.entity && ONTOLOGY_ANIMATIONS.entity[roles.entity]?.emphasis) {
    emphasisType = ONTOLOGY_ANIMATIONS.entity[roles.entity].emphasis;
  } else if (roles.synapse && ONTOLOGY_ANIMATIONS.synapse[roles.synapse]?.emphasis) {
    emphasisType = ONTOLOGY_ANIMATIONS.synapse[roles.synapse].emphasis;
  } else if (roles.state && ONTOLOGY_ANIMATIONS.state[roles.state]?.emphasis) {
    emphasisType = ONTOLOGY_ANIMATIONS.state[roles.state].emphasis;
  }
  
  if (emphasisType && hasMotion()) {
    const preset = presets.emphasis[emphasisType];
    if (preset) {
      applyPreset(element, preset);
    }
  }
}

/**
 * Setup hover effect for element
 */
function setupHoverEffect(element, hoverType) {
  const Motion = getMotion();
  if (!Motion || prefersReducedMotion()) return;
  
  if (hoverType === 'cardHover') {
    // Card lift effect
    element.addEventListener('mouseenter', () => {
      Motion.animate(
        element,
        {
          y: -4,
          boxShadow: '0 8px 24px oklch(0.08 0.01 250 / 0.2)',
        },
        { duration: 0.3 }
      );
    });
    
    element.addEventListener('mouseleave', () => {
      Motion.animate(
        element,
        {
          y: 0,
          boxShadow: '0 2px 8px oklch(0.08 0.01 250 / 0.15)',
        },
        { duration: 0.3 }
      );
    });
  } else if (hoverType === 'buttonHover') {
    // Button pulse effect
    element.addEventListener('mouseenter', () => {
      Motion.animate(
        element,
        { scale: 1.05 },
        { duration: 0.2 }
      );
    });
    
    element.addEventListener('mouseleave', () => {
      Motion.animate(
        element,
        { scale: 1 },
        { duration: 0.2 }
      );
    });
  } else if (hoverType === 'subtle') {
    // Subtle opacity change
    element.addEventListener('mouseenter', () => {
      Motion.animate(
        element,
        { opacity: 0.8 },
        { duration: 0.2 }
      );
    });
    
    element.addEventListener('mouseleave', () => {
      Motion.animate(
        element,
        { opacity: 1 },
        { duration: 0.2 }
      );
    });
  } else if (hoverType === 'linkHover') {
    // Link underline animation - only if it's an actual link
    if (element.tagName !== 'A') return;
    
    element.style.position = 'relative';
    element.style.textDecoration = 'none';
    
    const underline = document.createElement('span');
    underline.style.cssText = 'position: absolute; bottom: 0; left: 0; width: 0; height: 2px; background: currentColor;';
    element.appendChild(underline);
    
    element.addEventListener('mouseenter', () => {
      Motion.animate(
        underline,
        { width: '100%' },
        { duration: 0.3 }
      );
    });
    
    element.addEventListener('mouseleave', () => {
      Motion.animate(
        underline,
        { width: '0' },
        { duration: 0.3 }
      );
    });
  }
}

/**
 * Setup scroll-triggered reveal for element
 */
function setupScrollRevealOntology(element) {
  if (!hasMotion() || prefersReducedMotion()) {
    // If reduced motion, just show the element
    element.style.opacity = '1';
    element.style.transform = 'none';
    return;
  }
  
  const Motion = getMotion();
  
  // Set initial state
  element.style.opacity = '0';
  element.style.transform = 'translateY(30px)';
  
  // Use Intersection Observer for scroll detection
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          Motion.animate(
            entry.target,
            {
              opacity: [0, 1],
              y: [30, 0],
            },
            {
              duration: 0.6,
              easing: 'ease-out',
            }
          );
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  );
  
  observer.observe(element);
}

/**
 * Initialize ontology-based animations for all elements
 */
export function initOntologyAnimations(container = document.body) {
  if (!hasMotion()) {
    console.log('Motion library not available - ontology animations disabled');
    return;
  }
  
  // Find candidates: elements with classes (potential ontological usage)
  const elements = container.querySelectorAll('[class]');
  let animatedCount = 0;
  
  elements.forEach((element, index) => {
    // Detect ontological role
    const roles = detectOntologyRole(element);
    
    // Skip if no ontological role detected
    if (Object.keys(roles).length === 0) return;
    
    // Calculate stagger delay for entrance animations
    const delay = index * 0.05;
    
    // Apply entrance animation
    applyEntranceAnimation(element, roles, delay);
    
    // Apply hover animation
    applyHoverAnimation(element, roles);
    
    // Apply emphasis animation if needed
    applyEmphasisAnimation(element, roles);
    
    animatedCount++;
  });
  
  console.log(`Ontology animations initialized for ${animatedCount} elements`);
}

/**
 * Auto-initialize on DOM ready
 * Can be disabled by setting window.disableOntologyAnimations = true
 */
if (typeof document !== 'undefined' && typeof window !== 'undefined') {
  if (!window.disableOntologyAnimations) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        initOntologyAnimations();
      });
    } else {
      // DOM already loaded
      setTimeout(() => initOntologyAnimations(), 100);
    }
  }
}

export default {
  initOntologyAnimations,
  detectOntologyRole,
};
