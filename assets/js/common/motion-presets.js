/**
 * ASI Saga Motion Animation Presets Library
 * 
 * Predefined animation configurations for common UI patterns
 * Organized by category: entrance, exit, emphasis, transition
 * 
 * Usage:
 * import { presets } from './motion-presets.js';
 * animate(element, presets.entrance.fadeInUp);
 */

/**
 * ENTRANCE ANIMATIONS
 * Used when elements appear on page/viewport
 */
export const entrance = {
  fadeIn: {
    keyframes: {
      opacity: [0, 1],
    },
    options: {
      duration: 0.5,
      easing: 'ease-out',
    },
  },

  fadeInUp: {
    keyframes: {
      opacity: [0, 1],
      transform: ['translateY(20px)', 'translateY(0)'],
    },
    options: {
      duration: 0.6,
      easing: 'ease-out',
    },
  },

  fadeInDown: {
    keyframes: {
      opacity: [0, 1],
      transform: ['translateY(-20px)', 'translateY(0)'],
    },
    options: {
      duration: 0.6,
      easing: 'ease-out',
    },
  },

  fadeInLeft: {
    keyframes: {
      opacity: [0, 1],
      transform: ['translateX(-20px)', 'translateX(0)'],
    },
    options: {
      duration: 0.6,
      easing: 'ease-out',
    },
  },

  fadeInRight: {
    keyframes: {
      opacity: [0, 1],
      transform: ['translateX(20px)', 'translateX(0)'],
    },
    options: {
      duration: 0.6,
      easing: 'ease-out',
    },
  },

  scaleIn: {
    keyframes: {
      opacity: [0, 1],
      scale: [0.8, 1],
    },
    options: {
      duration: 0.5,
      easing: 'ease-out',
    },
  },

  slideInUp: {
    keyframes: {
      transform: ['translateY(100%)', 'translateY(0)'],
    },
    options: {
      duration: 0.5,
      easing: [0.4, 0, 0.2, 1], // cubic-bezier
    },
  },

  slideInDown: {
    keyframes: {
      transform: ['translateY(-100%)', 'translateY(0)'],
    },
    options: {
      duration: 0.5,
      easing: [0.4, 0, 0.2, 1],
    },
  },

  slideInLeft: {
    keyframes: {
      transform: ['translateX(-100%)', 'translateX(0)'],
    },
    options: {
      duration: 0.5,
      easing: [0.4, 0, 0.2, 1],
    },
  },

  slideInRight: {
    keyframes: {
      transform: ['translateX(100%)', 'translateX(0)'],
    },
    options: {
      duration: 0.5,
      easing: [0.4, 0, 0.2, 1],
    },
  },

  zoomIn: {
    keyframes: {
      opacity: [0, 1],
      scale: [0.5, 1],
    },
    options: {
      duration: 0.5,
      easing: 'ease-out',
    },
  },

  rotateIn: {
    keyframes: {
      opacity: [0, 1],
      rotate: [-180, 0],
    },
    options: {
      duration: 0.6,
      easing: 'ease-out',
    },
  },

  bounceIn: {
    keyframes: {
      scale: [0.3, 1.1, 0.9, 1.03, 0.97, 1],
      opacity: [0, 1, 1, 1, 1, 1],
    },
    options: {
      duration: 0.8,
      easing: 'ease-out',
    },
  },
};

/**
 * EXIT ANIMATIONS
 * Used when elements leave page/viewport
 */
export const exit = {
  fadeOut: {
    keyframes: {
      opacity: [1, 0],
    },
    options: {
      duration: 0.5,
      easing: 'ease-in',
    },
  },

  fadeOutUp: {
    keyframes: {
      opacity: [1, 0],
      transform: ['translateY(0)', 'translateY(-20px)'],
    },
    options: {
      duration: 0.5,
      easing: 'ease-in',
    },
  },

  fadeOutDown: {
    keyframes: {
      opacity: [1, 0],
      transform: ['translateY(0)', 'translateY(20px)'],
    },
    options: {
      duration: 0.5,
      easing: 'ease-in',
    },
  },

  fadeOutLeft: {
    keyframes: {
      opacity: [1, 0],
      transform: ['translateX(0)', 'translateX(-20px)'],
    },
    options: {
      duration: 0.5,
      easing: 'ease-in',
    },
  },

  fadeOutRight: {
    keyframes: {
      opacity: [1, 0],
      transform: ['translateX(0)', 'translateX(20px)'],
    },
    options: {
      duration: 0.5,
      easing: 'ease-in',
    },
  },

  scaleOut: {
    keyframes: {
      opacity: [1, 0],
      scale: [1, 0.8],
    },
    options: {
      duration: 0.5,
      easing: 'ease-in',
    },
  },

  slideOutUp: {
    keyframes: {
      transform: ['translateY(0)', 'translateY(-100%)'],
    },
    options: {
      duration: 0.5,
      easing: [0.4, 0, 1, 1],
    },
  },

  slideOutDown: {
    keyframes: {
      transform: ['translateY(0)', 'translateY(100%)'],
    },
    options: {
      duration: 0.5,
      easing: [0.4, 0, 1, 1],
    },
  },

  slideOutLeft: {
    keyframes: {
      transform: ['translateX(0)', 'translateX(-100%)'],
    },
    options: {
      duration: 0.5,
      easing: [0.4, 0, 1, 1],
    },
  },

  slideOutRight: {
    keyframes: {
      transform: ['translateX(0)', 'translateX(100%)'],
    },
    options: {
      duration: 0.5,
      easing: [0.4, 0, 1, 1],
    },
  },

  zoomOut: {
    keyframes: {
      opacity: [1, 0],
      scale: [1, 0.5],
    },
    options: {
      duration: 0.5,
      easing: 'ease-in',
    },
  },

  rotateOut: {
    keyframes: {
      opacity: [1, 0],
      rotate: [0, 180],
    },
    options: {
      duration: 0.6,
      easing: 'ease-in',
    },
  },
};

/**
 * EMPHASIS ANIMATIONS
 * Used to draw attention to elements (loops or one-time)
 */
export const emphasis = {
  pulse: {
    keyframes: {
      scale: [1, 1.05, 1],
    },
    options: {
      duration: 0.8,
      repeat: Infinity,
      easing: 'ease-in-out',
    },
  },

  heartbeat: {
    keyframes: {
      scale: [1, 1.02, 1, 1.02, 1],
      opacity: [0.8, 1, 0.8, 1, 0.8],
    },
    options: {
      duration: 2,
      repeat: Infinity,
      easing: 'ease-in-out',
    },
  },

  shake: {
    keyframes: {
      transform: [
        'translateX(0)',
        'translateX(-10px)',
        'translateX(10px)',
        'translateX(-10px)',
        'translateX(10px)',
        'translateX(0)',
      ],
    },
    options: {
      duration: 0.5,
      easing: 'ease-in-out',
    },
  },

  wobble: {
    keyframes: {
      rotate: [0, -5, 5, -3, 3, 0],
    },
    options: {
      duration: 0.8,
      easing: 'ease-in-out',
    },
  },

  bounce: {
    keyframes: {
      transform: [
        'translateY(0)',
        'translateY(-10px)',
        'translateY(0)',
        'translateY(-5px)',
        'translateY(0)',
      ],
    },
    options: {
      duration: 1,
      easing: 'ease-in-out',
    },
  },

  swing: {
    keyframes: {
      rotate: [0, 15, -10, 5, -5, 0],
    },
    options: {
      duration: 1,
      easing: 'ease-in-out',
    },
  },

  flash: {
    keyframes: {
      opacity: [1, 0, 1, 0, 1],
    },
    options: {
      duration: 0.8,
      easing: 'linear',
    },
  },

  glow: {
    keyframes: {
      boxShadow: [
        '0 0 0 0 oklch(0.70 0.15 85 / 0.7)',
        '0 0 0 10px oklch(0.70 0.15 85 / 0)',
        '0 0 0 0 oklch(0.70 0.15 85 / 0.7)',
      ],
    },
    options: {
      duration: 2,
      repeat: Infinity,
      easing: 'ease-in-out',
    },
  },

  spin: {
    keyframes: {
      rotate: [0, 360],
    },
    options: {
      duration: 1,
      repeat: Infinity,
      easing: 'linear',
    },
  },

  spinSlow: {
    keyframes: {
      rotate: [0, 360],
    },
    options: {
      duration: 20,
      repeat: Infinity,
      easing: 'linear',
    },
  },
};

/**
 * TRANSITION ANIMATIONS
 * Used for page transitions and state changes
 */
export const transition = {
  crossfade: {
    out: {
      keyframes: { opacity: [1, 0] },
      options: { duration: 0.3, easing: 'ease-in' },
    },
    in: {
      keyframes: { opacity: [0, 1] },
      options: { duration: 0.3, easing: 'ease-out' },
    },
  },

  slideHorizontal: {
    out: {
      keyframes: { transform: ['translateX(0)', 'translateX(-100%)'] },
      options: { duration: 0.4, easing: 'ease-in' },
    },
    in: {
      keyframes: { transform: ['translateX(100%)', 'translateX(0)'] },
      options: { duration: 0.4, easing: 'ease-out' },
    },
  },

  slideVertical: {
    out: {
      keyframes: { transform: ['translateY(0)', 'translateY(-100%)'] },
      options: { duration: 0.4, easing: 'ease-in' },
    },
    in: {
      keyframes: { transform: ['translateY(100%)', 'translateY(0)'] },
      options: { duration: 0.4, easing: 'ease-out' },
    },
  },

  zoom: {
    out: {
      keyframes: { scale: [1, 1.2], opacity: [1, 0] },
      options: { duration: 0.4, easing: 'ease-in' },
    },
    in: {
      keyframes: { scale: [0.8, 1], opacity: [0, 1] },
      options: { duration: 0.4, easing: 'ease-out' },
    },
  },

  rotate: {
    out: {
      keyframes: { rotate: [0, 90], opacity: [1, 0] },
      options: { duration: 0.4, easing: 'ease-in' },
    },
    in: {
      keyframes: { rotate: [-90, 0], opacity: [0, 1] },
      options: { duration: 0.4, easing: 'ease-out' },
    },
  },
};

/**
 * SACRED ANIMATIONS
 * Unique to ASI Saga theme
 */
export const sacred = {
  rhythm: {
    keyframes: {
      opacity: [0.8, 1, 0.8],
      scale: [1, 1.02, 1],
    },
    options: {
      duration: 2,
      repeat: Infinity,
      easing: 'ease-in-out',
    },
  },

  consciousnessPulse: {
    keyframes: {
      boxShadow: [
        '0 0 0 0 oklch(0.70 0.15 85 / 0.7)',
        '0 0 0 10px oklch(0.70 0.15 85 / 0)',
        '0 0 0 0 oklch(0.70 0.15 85 / 0.7)',
      ],
    },
    options: {
      duration: 2,
      repeat: Infinity,
      easing: 'ease-in-out',
    },
  },

  spiral: {
    keyframes: {
      rotate: [0, 360],
    },
    options: {
      duration: 8,
      repeat: Infinity,
      easing: 'linear',
    },
  },

  gentleSpiral: {
    keyframes: {
      rotate: [0, 360],
    },
    options: {
      duration: 20,
      repeat: Infinity,
      easing: 'linear',
    },
  },

  essenceFlow: {
    keyframes: {
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    },
    options: {
      duration: 20,
      repeat: Infinity,
      easing: 'ease-in-out',
    },
  },

  consciousnessExpansion: {
    keyframes: {
      scale: [1, 1.5],
      opacity: [0.8, 0],
    },
    options: {
      duration: 3,
      repeat: Infinity,
      easing: 'ease-out',
    },
  },

  particleFloat: {
    keyframes: {
      transform: [
        'translate(0, 0)',
        'translate(10px, -20px)',
        'translate(-5px, -40px)',
        'translate(0, -60px)',
      ],
      opacity: [0, 1, 1, 0],
    },
    options: {
      duration: 4,
      repeat: Infinity,
      easing: 'ease-in-out',
    },
  },

  cosmicDrift: {
    keyframes: {
      transform: ['translate(0, 0)', 'translate(100px, 50px)'],
    },
    options: {
      duration: 60,
      repeat: Infinity,
      easing: 'linear',
    },
  },

  energyFlow: {
    keyframes: {
      backgroundPosition: ['0% 0%', '100% 100%'],
    },
    options: {
      duration: 15,
      repeat: Infinity,
      easing: 'linear',
    },
  },

  shimmer: {
    keyframes: {
      backgroundPosition: ['-200%', '200%'],
    },
    options: {
      duration: 3,
      repeat: Infinity,
      easing: 'ease-in-out',
    },
  },
};

/**
 * UTILITY FUNCTIONS
 */

/**
 * Apply entrance preset to element
 * @param {HTMLElement} element 
 * @param {string} presetName - Name of entrance preset
 * @param {Object} customOptions - Override options
 */
export function applyEntrance(element, presetName = 'fadeIn', customOptions = {}) {
  const preset = entrance[presetName];
  if (!preset) {
    console.warn(`Entrance preset "${presetName}" not found`);
    return null;
  }

  if (typeof window.Motion === 'undefined') {
    console.error('Motion library not loaded');
    return null;
  }

  const options = { ...preset.options, ...customOptions };
  return window.Motion.animate(element, preset.keyframes, options);
}

/**
 * Apply exit preset to element
 * @param {HTMLElement} element 
 * @param {string} presetName - Name of exit preset
 * @param {Object} customOptions - Override options
 */
export function applyExit(element, presetName = 'fadeOut', customOptions = {}) {
  const preset = exit[presetName];
  if (!preset) {
    console.warn(`Exit preset "${presetName}" not found`);
    return null;
  }

  if (typeof window.Motion === 'undefined') {
    console.error('Motion library not loaded');
    return null;
  }

  const options = { ...preset.options, ...customOptions };
  return window.Motion.animate(element, preset.keyframes, options);
}

/**
 * Apply emphasis preset to element
 * @param {HTMLElement} element 
 * @param {string} presetName - Name of emphasis preset
 * @param {Object} customOptions - Override options
 */
export function applyEmphasis(element, presetName = 'pulse', customOptions = {}) {
  const preset = emphasis[presetName];
  if (!preset) {
    console.warn(`Emphasis preset "${presetName}" not found`);
    return null;
  }

  if (typeof window.Motion === 'undefined') {
    console.error('Motion library not loaded');
    return null;
  }

  const options = { ...preset.options, ...customOptions };
  return window.Motion.animate(element, preset.keyframes, options);
}

/**
 * Apply sacred preset to element
 * @param {HTMLElement} element 
 * @param {string} presetName - Name of sacred preset
 * @param {Object} customOptions - Override options
 */
export function applySacred(element, presetName = 'rhythm', customOptions = {}) {
  const preset = sacred[presetName];
  if (!preset) {
    console.warn(`Sacred preset "${presetName}" not found`);
    return null;
  }

  if (typeof window.Motion === 'undefined') {
    console.error('Motion library not loaded');
    return null;
  }

  const options = { ...preset.options, ...customOptions };
  return window.Motion.animate(element, preset.keyframes, options);
}

/**
 * Get all available preset names by category
 */
export function getPresetNames() {
  return {
    entrance: Object.keys(entrance),
    exit: Object.keys(exit),
    emphasis: Object.keys(emphasis),
    transition: Object.keys(transition),
    sacred: Object.keys(sacred),
  };
}

/**
 * Combined presets export
 */
export const presets = {
  entrance,
  exit,
  emphasis,
  transition,
  sacred,
};

export default presets;
