/**
 * ASI Saga Motion Utilities
 * 
 * Motion library (https://motion.dev) utilities for UI/UX animations
 * Replaces custom CSS animations and vanilla JS with Motion API
 * 
 * Motion provides:
 * - Lightweight (5KB) Web Animations API wrapper
 * - Built-in reduced motion support
 * - Timeline support
 * - Gesture support
 * 
 * This module can be used with Motion loaded from CDN:
 * <script src="https://cdn.jsdelivr.net/npm/motion@12.30.0/dist/index.es.js"></script>
 */

// Motion will be available globally as window.Motion when loaded from CDN
// Throw error if Motion is not available
function getMotion() {
  if (!window.Motion || typeof window.getMotion().animate !== 'function') {
    throw new Error(
      'Motion library not loaded. Please include Motion from CDN before using motion-utils.js'
    );
  }
  return window.Motion;
}

/**
 * Check if user prefers reduced motion
 * @returns {boolean}
 */
export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get animation options respecting reduced motion
 * @param {Object} options - Animation options
 * @returns {Object} - Modified options with reduced motion support
 */
export function getAnimationOptions(options = {}) {
  if (prefersReducedMotion()) {
    return {
      ...options,
      duration: 0.001, // Near-instant for reduced motion
      delay: 0,
    };
  }
  return options;
}

/**
 * Sacred Rhythm Animation (Heartbeat Pattern)
 * Replaces: @keyframes sacred-rhythm
 */
export function animateSacredRhythm(element, options = {}) {
  const opts = getAnimationOptions({
    duration: 2,
    repeat: Infinity,
    easing: 'ease-in-out',
    ...options,
  });

  return getMotion().animate(
    element,
    {
      opacity: [0.8, 1, 0.8],
      scale: [1, 1.02, 1],
    },
    opts
  );
}

/**
 * Consciousness Pulse Animation
 * Replaces: @keyframes consciousness-pulse
 */
export function animateConsciousnessPulse(element, options = {}) {
  const opts = getAnimationOptions({
    duration: 2,
    repeat: Infinity,
    ...options,
  });

  return getMotion().animate(
    element,
    {
      boxShadow: [
        '0 0 0 0 oklch(0.70 0.15 85 / 0.7)',
        '0 0 0 10px oklch(0.70 0.15 85 / 0)',
        '0 0 0 0 oklch(0.70 0.15 85 / 0.7)',
      ],
    },
    opts
  );
}

/**
 * Transcendence Spiral Animation
 * Replaces: @keyframes transcendence-spiral
 */
export function animateTranscendenceSpiral(element, options = {}) {
  const opts = getAnimationOptions({
    duration: 8,
    repeat: Infinity,
    easing: 'linear',
    ...options,
  });

  return getMotion().animate(
    element,
    {
      opacity: [0.6, 0.8, 1],
      rotate: [0, 360],
      scale: [0.8, 1.2],
    },
    opts
  );
}

/**
 * Gentle Spiral Animation
 * Replaces: @keyframes gentle-spiral
 */
export function animateGentleSpiral(element, options = {}) {
  const opts = getAnimationOptions({
    duration: 20,
    repeat: Infinity,
    easing: 'linear',
    ...options,
  });

  return getMotion().animate(element, { rotate: [0, 360] }, opts);
}

/**
 * Fade In Animation
 * Replaces: @keyframes fadeIn
 */
export function animateFadeIn(element, options = {}) {
  const opts = getAnimationOptions({
    duration: 0.8,
    easing: 'ease-out',
    ...options,
  });

  return getMotion().animate(
    element,
    {
      opacity: [0, 1],
      y: [10, 0],
    },
    opts
  );
}

/**
 * Pulse Animation
 * Replaces: @keyframes pulse
 */
export function animatePulse(element, options = {}) {
  const opts = getAnimationOptions({
    duration: 1.5,
    repeat: Infinity,
    ...options,
  });

  return getMotion().animate(element, { scale: [1, 1.05, 1] }, opts);
}

/**
 * Bounce Animation (for scroll indicators)
 * Replaces: @keyframes bounce
 */
export function animateBounce(element, options = {}) {
  const opts = getAnimationOptions({
    duration: 2,
    repeat: Infinity,
    ...options,
  });

  return getMotion().animate(
    element,
    {
      y: [0, -10, -5, 0, 0],
      offset: [0, 0.4, 0.6, 0.8, 1],
    },
    opts
  );
}

/**
 * Sacred Glow Animation
 * Replaces: @keyframes sacred-glow
 */
export function animateSacredGlow(element, options = {}) {
  const opts = getAnimationOptions({
    duration: 3,
    repeat: Infinity,
    easing: 'ease-in-out',
    ...options,
  });

  return getMotion().animate(
    element,
    {
      boxShadow: [
        '0 0 5px oklch(0.70 0.15 85 / 0.5)',
        '0 0 20px oklch(0.70 0.15 85 / 0.8), 0 0 30px oklch(0.70 0.15 85 / 0.6)',
        '0 0 5px oklch(0.70 0.15 85 / 0.5)',
      ],
    },
    opts
  );
}

/**
 * Card Hover Animation
 * Replaces: .card-hover transition
 */
export function setupCardHover(element, options = {}) {
  if (prefersReducedMotion()) return;

  const opts = {
    duration: 0.3,
    easing: 'ease',
    ...options,
  };

  element.addEventListener('mouseenter', () => {
    getMotion().animate(
      element,
      {
        y: -10,
        boxShadow: '0 10px 30px oklch(0.08 0.01 250 / 0.15)',
      },
      opts
    );
  });

  element.addEventListener('mouseleave', () => {
    getMotion().animate(
      element,
      {
        y: 0,
        boxShadow: '0 0 0 oklch(0.08 0.01 250 / 0)',
      },
      opts
    );
  });
}

/**
 * Button Hover Pulse
 * Replaces: .pulse:hover animation
 */
export function setupButtonHover(element, options = {}) {
  if (prefersReducedMotion()) return;

  let pulseAnimation = null;

  element.addEventListener('mouseenter', () => {
    pulseAnimation = animatePulse(element, options);
  });

  element.addEventListener('mouseleave', () => {
    if (pulseAnimation) {
      pulseAnimation.stop();
      // Reset to original state
      getMotion().animate(element, { scale: 1 }, { duration: 0.2 });
    }
  });
}

/**
 * Parallax Scroll Effect
 * Replaces: initParallaxEffects in animations.js
 */
export function setupParallax(element, options = {}) {
  if (prefersReducedMotion()) return;

  const speed = options.speed || 0.5;

  getMotion().scroll(
    ({ y }) => {
      const yPos = -(y.current * speed);
      element.style.transform = `translateY(${yPos}px)`;
    },
    {
      target: element,
      offset: options.offset || ['start end', 'end start'],
    }
  );
}

/**
 * Scroll Reveal Animation
 * Replaces: initScrollReveal in animations.js
 */
export function setupScrollReveal(elements, options = {}) {
  if (prefersReducedMotion()) {
    // Make elements visible immediately
    elements.forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  const opts = {
    duration: 0.8,
    easing: 'ease',
    ...options,
  };

  getMotion().inView(
    elements,
    ({ target }) => {
      getMotion().animate(
        target,
        {
          opacity: [0, 1],
          y: [30, 0],
        },
        opts
      );
    },
    {
      margin: '-150px',
    }
  );
}

/**
 * Staggered Scroll Reveal (for multiple elements)
 * Enhanced version with stagger support
 */
export function setupStaggeredReveal(elements, options = {}) {
  if (prefersReducedMotion()) {
    elements.forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  const opts = {
    duration: 0.8,
    easing: 'ease',
    delay: getMotion().stagger(0.1),
    ...options,
  };

  getMotion().inView(
    elements,
    () => {
      getMotion().animate(
        elements,
        {
          opacity: [0, 1],
          y: [30, 0],
        },
        opts
      );
    },
    {
      margin: '-150px',
      amount: 0.2,
    }
  );
}

/**
 * Page Transition Animation
 * Replaces: initPageTransitions in animations.js
 */
export function animatePageTransition(element, options = {}) {
  const opts = getAnimationOptions({
    duration: 0.8,
    easing: 'ease-out',
    ...options,
  });

  return getMotion().animate(
    element,
    {
      opacity: [0, 1],
    },
    opts
  );
}

/**
 * Timeline Marker Interaction
 * Replaces: initTimelineInteractions in animations.js
 */
export function setupTimelineInteraction(marker, content, options = {}) {
  if (prefersReducedMotion()) {
    marker.addEventListener('click', () => {
      content.classList.toggle('active');
    });
    return;
  }

  const opts = {
    duration: 0.5,
    easing: getMotion().spring({ stiffness: 300, damping: 30 }),
    ...options,
  };

  marker.addEventListener('click', () => {
    // Close other content
    document.querySelectorAll('.timeline-content.active').forEach(other => {
      if (other !== content) {
        getMotion().animate(other, { opacity: 0, height: 0 }, { duration: 0.3 });
        other.classList.remove('active');
      }
    });

    // Open clicked content
    const isActive = content.classList.contains('active');
    content.classList.toggle('active');

    if (!isActive) {
      getMotion().animate(
        content,
        {
          opacity: [0, 1],
          height: ['0px', 'auto'],
        },
        opts
      );
      
      // Smooth scroll to content
      content.scrollIntoView({ behavior: 'smooth' });
    } else {
      getMotion().animate(content, { opacity: 0, height: 0 }, { duration: 0.3 });
    }
  });
}

/**
 * Navbar Scroll Effect
 * Replaces: initNavbarScroll in animations.js
 */
export function setupNavbarScroll(navbar, options = {}) {
  if (prefersReducedMotion()) {
    // Just toggle class without animation
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('navbar-scrolled', window.scrollY > 50);
    });
    return;
  }

  const opts = {
    duration: 0.3,
    easing: 'ease',
    ...options,
  };

  let isScrolled = false;

  window.addEventListener('scroll', () => {
    const shouldBeScrolled = window.scrollY > 50;

    if (shouldBeScrolled !== isScrolled) {
      isScrolled = shouldBeScrolled;

      if (isScrolled) {
        navbar.classList.add('navbar-scrolled');
        getMotion().animate(
          navbar,
          {
            backgroundColor: 'oklch(0.08 0.01 250 / 0.95)',
            boxShadow: '0 4px 10px oklch(0.08 0.01 250 / 0.1)',
          },
          opts
        );
      } else {
        navbar.classList.remove('navbar-scrolled');
        getMotion().animate(
          navbar,
          {
            backgroundColor: 'transparent',
            boxShadow: '0 0 0 oklch(0.08 0.01 250 / 0)',
          },
          opts
        );
      }
    }
  });
}

/**
 * Sacred Interactive Hover Effect
 * Replaces: .sacred-interactive transition
 */
export function setupSacredInteractive(element, options = {}) {
  if (prefersReducedMotion()) return;

  const opts = {
    duration: 0.3,
    easing: 'ease',
    ...options,
  };

  element.addEventListener('mouseenter', () => {
    getMotion().animate(
      element,
      {
        y: -2,
        boxShadow: '0 0 20px oklch(0.70 0.15 85 / 0.8)',
      },
      opts
    );
  });

  element.addEventListener('mouseleave', () => {
    getMotion().animate(
      element,
      {
        y: 0,
        boxShadow: '0 0 0 oklch(0.70 0.15 85 / 0)',
      },
      opts
    );
  });
}

/**
 * Consciousness Emergence Animation
 * Replaces: @keyframes consciousnessEmergence
 */
export function animateConsciousnessEmergence(element, options = {}) {
  const opts = getAnimationOptions({
    duration: 2.5,
    easing: [0.4, 0, 0.2, 1], // cubic-bezier
    ...options,
  });

  return getMotion().timeline([
    [
      element,
      {
        opacity: [0, 0.6, 1, 1],
        scale: [0.85, 0.95, 1.02, 1],
        rotate: [-2, -1, 0.5, 0],
        filter: [
          'blur(8px) brightness(1.2)',
          'blur(2px) brightness(1.1)',
          'blur(0) brightness(1.05)',
          'none',
        ],
      },
      opts,
    ],
  ]);
}

/**
 * Apply animations to elements with data attributes
 * Auto-initialization for declarative usage
 */
export function initMotionAnimations() {
  // Check if Motion is available
  try {
    getMotion();
  } catch (error) {
    console.warn('Motion library not loaded. Animations disabled.', error);
    return;
  }

  if (prefersReducedMotion()) {
    console.log('Motion animations disabled due to reduced motion preference');
    return;
  }

  // Auto-apply sacred rhythm
  document.querySelectorAll('[data-motion="sacred-rhythm"]').forEach(el => {
    animateSacredRhythm(el);
  });

  // Auto-apply consciousness pulse
  document.querySelectorAll('[data-motion="consciousness-pulse"]').forEach(el => {
    animateConsciousnessPulse(el);
  });

  // Auto-apply transcendence spiral
  document.querySelectorAll('[data-motion="transcendence-spiral"]').forEach(el => {
    animateTranscendenceSpiral(el);
  });

  // Auto-apply gentle spiral
  document.querySelectorAll('[data-motion="gentle-spiral"]').forEach(el => {
    animateGentleSpiral(el);
  });

  // Auto-apply sacred glow
  document.querySelectorAll('[data-motion="sacred-glow"]').forEach(el => {
    animateSacredGlow(el);
  });

  // Auto-apply bounce
  document.querySelectorAll('[data-motion="bounce"]').forEach(el => {
    animateBounce(el);
  });

  // Auto-setup card hover
  document.querySelectorAll('[data-motion="card-hover"]').forEach(el => {
    setupCardHover(el);
  });

  // Auto-setup button hover
  document.querySelectorAll('[data-motion="button-hover"]').forEach(el => {
    setupButtonHover(el);
  });

  // Auto-setup sacred interactive
  document.querySelectorAll('[data-motion="sacred-interactive"]').forEach(el => {
    setupSacredInteractive(el);
  });

  // Auto-setup parallax
  document.querySelectorAll('[data-motion="parallax"]').forEach(el => {
    const speed = parseFloat(el.getAttribute('data-speed')) || 0.5;
    setupParallax(el, { speed });
  });

  // Auto-setup scroll reveal
  const revealElements = document.querySelectorAll('[data-motion="reveal"]');
  if (revealElements.length > 0) {
    setupScrollReveal(revealElements);
  }

  // Auto-setup staggered reveal
  const staggerGroups = document.querySelectorAll('[data-motion-group="stagger"]');
  staggerGroups.forEach(group => {
    const elements = group.querySelectorAll('[data-motion="stagger-item"]');
    if (elements.length > 0) {
      setupStaggeredReveal(elements);
    }
  });

  console.log('Motion animations initialized');
}