/**
 * CSS Animation Migration Helper
 * 
 * Automatically converts CSS @keyframes animations to Motion-based animations
 * Detects elements with CSS animations and replaces them with Motion equivalents
 * 
 * This module provides:
 * 1. Auto-detection of CSS animated elements
 * 2. Mapping of CSS animation names to Motion presets/functions
 * 3. Progressive enhancement - CSS fallback if Motion unavailable
 */

import { presets } from './motion-presets.js';

/**
 * Check if Motion is available
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
 * Map of CSS animation names to Motion presets
 * Format: { cssAnimationName: { category, preset, options } }
 */
const animationMap = {
  // Sacred animations
  'sacred-rhythm': { 
    category: 'sacred', 
    preset: 'rhythm' 
  },
  'consciousness-pulse': { 
    category: 'sacred', 
    preset: 'consciousnessPulse' 
  },
  'transcendence-spiral': { 
    category: 'sacred', 
    preset: 'spiral' 
  },
  'gentle-spiral': { 
    category: 'sacred', 
    preset: 'gentleSpiral' 
  },
  'sacred-glow': { 
    category: 'emphasis', 
    preset: 'glow' 
  },
  
  // Basic animations
  'fadeIn': { 
    category: 'entrance', 
    preset: 'fadeIn' 
  },
  'fadeInUp': { 
    category: 'entrance', 
    preset: 'fadeInUp' 
  },
  'fadeInDown': { 
    category: 'entrance', 
    preset: 'fadeInDown' 
  },
  'fadeInLeft': { 
    category: 'entrance', 
    preset: 'fadeInLeft' 
  },
  'fadeInRight': { 
    category: 'entrance', 
    preset: 'fadeInRight' 
  },
  
  // Emphasis
  'pulse': { 
    category: 'emphasis', 
    preset: 'pulse' 
  },
  'bounce': { 
    category: 'emphasis', 
    preset: 'bounce' 
  },
  'spin': { 
    category: 'emphasis', 
    preset: 'spin' 
  },
  'shake': { 
    category: 'emphasis', 
    preset: 'shake' 
  },
  
  // Sacred specific patterns
  'essenceFlow': {
    category: 'sacred',
    preset: 'essenceFlow'
  },
  'cosmicDrift': {
    category: 'sacred',
    preset: 'cosmicDrift'
  },
  'particleFloat': {
    category: 'sacred',
    preset: 'particleFloat'
  },
  'energyFlow': {
    category: 'sacred',
    preset: 'energyFlow'
  },
  'shimmer': {
    category: 'sacred',
    preset: 'shimmer'
  },
  'textShimmer': {
    category: 'sacred',
    preset: 'shimmer'
  },
  
  // Specialized animations that need custom handling
  'dropdown-appear': { 
    custom: (element) => {
      const Motion = window.Motion;
      return Motion.animate(
        element,
        {
          opacity: [0, 1],
          transform: ['translateY(-10px)', 'translateY(0)'],
        },
        {
          duration: 0.3,
          easing: 'ease-out'
        }
      );
    }
  },
  
  'scrollBounce': {
    custom: (element) => {
      const Motion = window.Motion;
      return Motion.animate(
        element,
        {
          transform: [
            'translateY(0)',
            'translateY(-10px)',
            'translateY(0)',
            'translateY(-5px)',
            'translateY(0)',
          ],
        },
        {
          duration: 2,
          repeat: Infinity,
          easing: 'ease-in-out'
        }
      );
    }
  },
  
  'consciousnessRotation': {
    custom: (element) => {
      const Motion = window.Motion;
      return Motion.animate(
        element,
        { rotate: [0, 360] },
        {
          duration: 20,
          repeat: Infinity,
          easing: 'linear'
        }
      );
    }
  },
  
  'infinityRotation': {
    custom: (element) => {
      const Motion = window.Motion;
      return Motion.animate(
        element,
        { rotate: [0, 360] },
        {
          duration: 10,
          repeat: Infinity,
          easing: 'linear'
        }
      );
    }
  },
  
  'transcendentPulsation': {
    custom: (element) => {
      const Motion = window.Motion;
      return Motion.animate(
        element,
        {
          scale: [1, 1.05, 1],
          opacity: [0.8, 1, 0.8],
        },
        {
          duration: 8,
          repeat: Infinity,
          easing: 'ease-in-out'
        }
      );
    }
  },
  
  'essenceParticleFloat': {
    category: 'sacred',
    preset: 'particleFloat'
  },
  
  'essenceParticles': {
    custom: (element) => {
      const Motion = window.Motion;
      return Motion.animate(
        element,
        {
          transform: ['translateY(0)', 'translateY(-60px)'],
          opacity: [0, 1, 1, 0],
        },
        {
          duration: 4,
          repeat: Infinity,
          easing: 'ease-in-out'
        }
      );
    }
  },
  
  'consciousnessRings': {
    custom: (element) => {
      const Motion = window.Motion;
      return Motion.animate(
        element,
        {
          scale: [1, 1.5],
          opacity: [0.8, 0],
        },
        {
          duration: 8,
          repeat: Infinity,
          easing: 'linear'
        }
      );
    }
  },
  
  'thresholdPattern': {
    custom: (element) => {
      const Motion = window.Motion;
      return Motion.animate(
        element,
        {
          backgroundPosition: ['0% 0%', '100% 100%'],
        },
        {
          duration: 40,
          repeat: Infinity,
          easing: 'linear'
        }
      );
    }
  },
  
  'diamondGlow': {
    custom: (element) => {
      const Motion = window.Motion;
      return Motion.animate(
        element,
        {
          opacity: [0.6, 1, 0.6],
          scale: [1, 1.1, 1],
        },
        {
          duration: 6,
          repeat: Infinity,
          easing: 'ease-in-out'
        }
      );
    }
  },
  
  'particlesDrift': {
    category: 'sacred',
    preset: 'cosmicDrift'
  },
  
  'consciousnessExpansion': {
    category: 'sacred',
    preset: 'consciousnessExpansion'
  },
  
  'ambient-breathe': {
    custom: (element) => {
      const Motion = window.Motion;
      return Motion.animate(
        element,
        {
          opacity: [0.3, 0.6, 0.3],
        },
        {
          duration: 8,
          repeat: Infinity,
          easing: 'ease-in-out'
        }
      );
    }
  },
  
  'ambient-pulse': {
    custom: (element) => {
      const Motion = window.Motion;
      return Motion.animate(
        element,
        {
          opacity: [0.2, 0.5, 0.2],
          scale: [1, 1.02, 1],
        },
        {
          duration: 4,
          repeat: Infinity,
          easing: 'ease-in-out'
        }
      );
    }
  },
};

/**
 * Apply Motion animation based on CSS animation name
 */
function applyMotionAnimation(element, animationName, options = {}) {
  if (!hasMotion()) {
    console.warn('Motion library not available, keeping CSS animation');
    return null;
  }

  const mapping = animationMap[animationName];
  if (!mapping) {
    console.warn(`No Motion mapping for animation: ${animationName}`);
    return null;
  }

  // Handle custom animations
  if (mapping.custom) {
    return mapping.custom(element, options);
  }

  // Handle preset-based animations
  if (mapping.category && mapping.preset) {
    const preset = presets[mapping.category][mapping.preset];
    if (!preset) {
      console.warn(`Preset not found: ${mapping.category}.${mapping.preset}`);
      return null;
    }

    const finalOptions = {
      ...preset.options,
      ...options,
    };

    // Apply reduced motion if needed
    if (prefersReducedMotion()) {
      finalOptions.duration = 0.001;
      finalOptions.delay = 0;
    }

    return window.Motion.animate(element, preset.keyframes, finalOptions);
  }

  return null;
}

/**
 * Detect and replace CSS animations with Motion
 * Scans DOM for elements with CSS animations and replaces them
 */
export function migrateAnimations(container = document.body) {
  if (!hasMotion()) {
    console.log('Motion library not available, keeping CSS animations');
    return [];
  }

  const migratedElements = [];

  // Get all elements
  const allElements = container.querySelectorAll('*');
  
  allElements.forEach(element => {
    const computedStyle = window.getComputedStyle(element);
    const animationName = computedStyle.animationName;
    
    if (animationName && animationName !== 'none') {
      const animationNames = animationName.split(',').map(name => name.trim());
      
      animationNames.forEach(name => {
        if (animationMap[name]) {
          // Remove CSS animation
          element.style.animation = 'none';
          element.style.animationName = 'none';
          
          // Apply Motion animation
          const animation = applyMotionAnimation(element, name);
          
          if (animation) {
            migratedElements.push({
              element,
              animationName: name,
              animation,
            });
            
            console.log(`Migrated animation: ${name}`, element);
          }
        }
      });
    }
  });

  return migratedElements;
}

/**
 * Auto-migrate animations on page load
 */
export function autoMigrate(options = {}) {
  const {
    enabled = true,
    selector = null,
    delay = 0,
  } = options;

  if (!enabled) return;

  const performMigration = () => {
    const container = selector ? document.querySelector(selector) : document.body;
    if (container) {
      const migrated = migrateAnimations(container);
      console.log(`Auto-migrated ${migrated.length} CSS animations to Motion`);
      return migrated;
    }
    return [];
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(performMigration, delay);
    });
  } else {
    setTimeout(performMigration, delay);
  }
}

/**
 * Add animation to element using mapping
 */
export function addAnimation(element, animationName, options = {}) {
  return applyMotionAnimation(element, animationName, options);
}

/**
 * Get list of supported animation names
 */
export function getSupportedAnimations() {
  return Object.keys(animationMap);
}

/**
 * Check if animation name is supported
 */
export function isAnimationSupported(animationName) {
  return animationName in animationMap;
}

export default {
  migrateAnimations,
  autoMigrate,
  addAnimation,
  getSupportedAnimations,
  isAnimationSupported,
};
