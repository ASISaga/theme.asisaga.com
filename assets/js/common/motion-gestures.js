/**
 * ASI Saga Motion Gesture Support
 * 
 * Gesture detection and animation support using Motion library
 * Provides: swipe, drag, pinch/zoom gestures
 * 
 * Usage:
 * import { setupSwipe, setupDrag, setupPinch } from './motion-gestures.js';
 * setupSwipe(element, { onSwipeLeft: () => console.log('Swiped left!') });
 */

/**
 * Check if user prefers reduced motion
 */
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get Motion library
 */
function getMotion() {
  if (!window.Motion || typeof window.Motion.animate !== 'function') {
    throw new Error('Motion library not loaded. Include Motion from CDN.');
  }
  return window.Motion;
}

/**
 * SWIPE GESTURE DETECTION
 * Detects directional swipes (left, right, up, down)
 */

/**
 * Setup swipe gesture on element
 * @param {HTMLElement} element - Element to detect swipes on
 * @param {Object} options - Configuration options
 * @param {Function} options.onSwipeLeft - Callback for left swipe
 * @param {Function} options.onSwipeRight - Callback for right swipe
 * @param {Function} options.onSwipeUp - Callback for up swipe
 * @param {Function} options.onSwipeDown - Callback for down swipe
 * @param {number} options.threshold - Minimum distance for swipe (default: 50px)
 * @param {number} options.restraint - Maximum perpendicular distance (default: 100px)
 * @param {number} options.allowedTime - Maximum time for swipe (default: 300ms)
 * @param {boolean} options.animate - Whether to animate feedback (default: true)
 * @returns {Function} Cleanup function to remove listeners
 */
export function setupSwipe(element, options = {}) {
  const {
    onSwipeLeft = null,
    onSwipeRight = null,
    onSwipeUp = null,
    onSwipeDown = null,
    threshold = 50,
    restraint = 100,
    allowedTime = 300,
    animate = true,
  } = options;

  let startX = 0;
  let startY = 0;
  let startTime = 0;
  let distX = 0;
  let distY = 0;

  const handleTouchStart = (e) => {
    const touch = e.changedTouches[0];
    startX = touch.pageX;
    startY = touch.pageY;
    startTime = new Date().getTime();
  };

  const handleTouchEnd = (e) => {
    const touch = e.changedTouches[0];
    distX = touch.pageX - startX;
    distY = touch.pageY - startY;
    const elapsedTime = new Date().getTime() - startTime;

    if (elapsedTime <= allowedTime) {
      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
        // Horizontal swipe
        if (distX > 0) {
          // Swipe right
          if (onSwipeRight) {
            if (animate && !prefersReducedMotion()) {
              animateSwipeFeedback(element, 'right');
            }
            onSwipeRight(e);
          }
        } else {
          // Swipe left
          if (onSwipeLeft) {
            if (animate && !prefersReducedMotion()) {
              animateSwipeFeedback(element, 'left');
            }
            onSwipeLeft(e);
          }
        }
      } else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) {
        // Vertical swipe
        if (distY > 0) {
          // Swipe down
          if (onSwipeDown) {
            if (animate && !prefersReducedMotion()) {
              animateSwipeFeedback(element, 'down');
            }
            onSwipeDown(e);
          }
        } else {
          // Swipe up
          if (onSwipeUp) {
            if (animate && !prefersReducedMotion()) {
              animateSwipeFeedback(element, 'up');
            }
            onSwipeUp(e);
          }
        }
      }
    }
  };

  element.addEventListener('touchstart', handleTouchStart, false);
  element.addEventListener('touchend', handleTouchEnd, false);

  // Return cleanup function
  return () => {
    element.removeEventListener('touchstart', handleTouchStart);
    element.removeEventListener('touchend', handleTouchEnd);
  };
}

/**
 * Animate visual feedback for swipe
 */
function animateSwipeFeedback(element, direction) {
  const Motion = getMotion();
  const distance = 10;
  
  const transforms = {
    left: `translateX(-${distance}px)`,
    right: `translateX(${distance}px)`,
    up: `translateY(-${distance}px)`,
    down: `translateY(${distance}px)`,
  };

  Motion.animate(
    element,
    {
      transform: [transforms[direction], 'translate(0, 0)'],
    },
    {
      duration: 0.3,
      easing: 'ease-out',
    }
  );
}

/**
 * DRAG GESTURE SUPPORT
 * Allows dragging elements with constraints
 */

/**
 * Setup drag gesture on element
 * @param {HTMLElement} element - Element to make draggable
 * @param {Object} options - Configuration options
 * @param {string} options.axis - Constrain to axis ('x', 'y', or 'both') (default: 'both')
 * @param {Object} options.bounds - Bounds for dragging { top, right, bottom, left }
 * @param {Function} options.onDragStart - Callback when drag starts
 * @param {Function} options.onDrag - Callback during drag (receives { x, y })
 * @param {Function} options.onDragEnd - Callback when drag ends
 * @param {boolean} options.inertia - Enable inertia on release (default: true)
 * @param {number} options.friction - Friction for inertia (0-1, default: 0.8)
 * @returns {Function} Cleanup function
 */
export function setupDrag(element, options = {}) {
  const {
    axis = 'both',
    bounds = null,
    onDragStart = null,
    onDrag = null,
    onDragEnd = null,
    inertia = true,
    friction = 0.8,
  } = options;

  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let currentX = 0;
  let currentY = 0;
  let velocityX = 0;
  let velocityY = 0;
  let lastX = 0;
  let lastY = 0;
  let lastTime = 0;

  const handleStart = (e) => {
    isDragging = true;
    const point = e.touches ? e.touches[0] : e;
    startX = point.clientX - currentX;
    startY = point.clientY - currentY;
    lastX = point.clientX;
    lastY = point.clientY;
    lastTime = Date.now();

    element.style.cursor = 'grabbing';
    
    if (onDragStart) {
      onDragStart({ x: currentX, y: currentY });
    }
  };

  const handleMove = (e) => {
    if (!isDragging) return;
    
    e.preventDefault();
    const point = e.touches ? e.touches[0] : e;
    const now = Date.now();
    const dt = now - lastTime;

    let newX = point.clientX - startX;
    let newY = point.clientY - startY;

    // Apply axis constraints
    if (axis === 'x') {
      newY = 0;
    } else if (axis === 'y') {
      newX = 0;
    }

    // Apply bounds
    if (bounds) {
      if (bounds.left !== undefined && newX < bounds.left) newX = bounds.left;
      if (bounds.right !== undefined && newX > bounds.right) newX = bounds.right;
      if (bounds.top !== undefined && newY < bounds.top) newY = bounds.top;
      if (bounds.bottom !== undefined && newY > bounds.bottom) newY = bounds.bottom;
    }

    // Calculate velocity
    if (dt > 0) {
      velocityX = (point.clientX - lastX) / dt;
      velocityY = (point.clientY - lastY) / dt;
    }

    currentX = newX;
    currentY = newY;
    lastX = point.clientX;
    lastY = point.clientY;
    lastTime = now;

    element.style.transform = `translate(${currentX}px, ${currentY}px)`;

    if (onDrag) {
      onDrag({ x: currentX, y: currentY, velocityX, velocityY });
    }
  };

  const handleEnd = (e) => {
    if (!isDragging) return;
    
    isDragging = false;
    element.style.cursor = 'grab';

    if (onDragEnd) {
      onDragEnd({ x: currentX, y: currentY, velocityX, velocityY });
    }

    // Apply inertia if enabled and not reduced motion
    if (inertia && !prefersReducedMotion() && (Math.abs(velocityX) > 0.1 || Math.abs(velocityY) > 0.1)) {
      applyInertia(element, currentX, currentY, velocityX, velocityY, friction, axis, bounds);
    }
  };

  // Add event listeners
  element.addEventListener('mousedown', handleStart);
  element.addEventListener('touchstart', handleStart, { passive: false });
  
  document.addEventListener('mousemove', handleMove);
  document.addEventListener('touchmove', handleMove, { passive: false });
  
  document.addEventListener('mouseup', handleEnd);
  document.addEventListener('touchend', handleEnd);

  element.style.cursor = 'grab';
  element.style.touchAction = 'none';

  // Return cleanup function
  return () => {
    element.removeEventListener('mousedown', handleStart);
    element.removeEventListener('touchstart', handleStart);
    document.removeEventListener('mousemove', handleMove);
    document.removeEventListener('touchmove', handleMove);
    document.removeEventListener('mouseup', handleEnd);
    document.removeEventListener('touchend', handleEnd);
    element.style.cursor = '';
    element.style.touchAction = '';
  };
}

/**
 * Apply inertia animation after drag release
 */
function applyInertia(element, startX, startY, velocityX, velocityY, friction, axis, bounds) {
  const Motion = getMotion();
  
  // Calculate final position based on velocity and friction
  const distance = 100; // Max distance to travel
  let finalX = startX + velocityX * distance;
  let finalY = startY + velocityY * distance;

  // Apply axis constraints
  if (axis === 'x') {
    finalY = startY;
  } else if (axis === 'y') {
    finalX = startX;
  }

  // Apply bounds
  if (bounds) {
    if (bounds.left !== undefined && finalX < bounds.left) finalX = bounds.left;
    if (bounds.right !== undefined && finalX > bounds.right) finalX = bounds.right;
    if (bounds.top !== undefined && finalY < bounds.top) finalY = bounds.top;
    if (bounds.bottom !== undefined && finalY > bounds.bottom) finalY = bounds.bottom;
  }

  Motion.animate(
    element,
    {
      transform: `translate(${finalX}px, ${finalY}px)`,
    },
    {
      duration: 0.8,
      easing: [0.25, 0.46, 0.45, 0.94], // ease-out-quad
    }
  );
}

/**
 * PINCH/ZOOM GESTURE SUPPORT
 * Two-finger pinch for scaling elements
 */

/**
 * Setup pinch/zoom gesture on element
 * @param {HTMLElement} element - Element to enable pinch on
 * @param {Object} options - Configuration options
 * @param {number} options.minScale - Minimum scale (default: 0.5)
 * @param {number} options.maxScale - Maximum scale (default: 3)
 * @param {Function} options.onPinchStart - Callback when pinch starts
 * @param {Function} options.onPinch - Callback during pinch (receives { scale })
 * @param {Function} options.onPinchEnd - Callback when pinch ends
 * @returns {Function} Cleanup function
 */
export function setupPinch(element, options = {}) {
  const {
    minScale = 0.5,
    maxScale = 3,
    onPinchStart = null,
    onPinch = null,
    onPinchEnd = null,
  } = options;

  let isPinching = false;
  let initialDistance = 0;
  let currentScale = 1;

  const getDistance = (touch1, touch2) => {
    const dx = touch2.clientX - touch1.clientX;
    const dy = touch2.clientY - touch1.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      isPinching = true;
      initialDistance = getDistance(e.touches[0], e.touches[1]);
      
      if (onPinchStart) {
        onPinchStart({ scale: currentScale });
      }
    }
  };

  const handleTouchMove = (e) => {
    if (!isPinching || e.touches.length !== 2) return;
    
    e.preventDefault();
    
    const currentDistance = getDistance(e.touches[0], e.touches[1]);
    let newScale = (currentDistance / initialDistance) * currentScale;

    // Apply scale constraints
    newScale = Math.max(minScale, Math.min(maxScale, newScale));

    element.style.transform = `scale(${newScale})`;

    if (onPinch) {
      onPinch({ scale: newScale, delta: newScale - currentScale });
    }
  };

  const handleTouchEnd = (e) => {
    if (!isPinching) return;
    
    if (e.touches.length < 2) {
      isPinching = false;
      
      // Get final scale from transform
      const transform = window.getComputedStyle(element).transform;
      if (transform !== 'none') {
        const matrix = new DOMMatrix(transform);
        currentScale = matrix.a; // scale X value
      }

      if (onPinchEnd) {
        onPinchEnd({ scale: currentScale });
      }
    }
  };

  element.addEventListener('touchstart', handleTouchStart, { passive: false });
  element.addEventListener('touchmove', handleTouchMove, { passive: false });
  element.addEventListener('touchend', handleTouchEnd, { passive: false });

  // Return cleanup function
  return () => {
    element.removeEventListener('touchstart', handleTouchStart);
    element.removeEventListener('touchmove', handleTouchMove);
    element.removeEventListener('touchend', handleTouchEnd);
  };
}

/**
 * DOUBLE TAP GESTURE
 * Quick double tap for zoom toggle
 */

/**
 * Setup double tap gesture
 * @param {HTMLElement} element - Element to detect double tap on
 * @param {Object} options - Configuration options
 * @param {Function} options.onDoubleTap - Callback for double tap
 * @param {number} options.delay - Max time between taps (default: 300ms)
 * @returns {Function} Cleanup function
 */
export function setupDoubleTap(element, options = {}) {
  const {
    onDoubleTap = null,
    delay = 300,
  } = options;

  let lastTap = 0;

  const handleTouchEnd = (e) => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;

    if (tapLength < delay && tapLength > 0) {
      // Double tap detected
      if (onDoubleTap) {
        onDoubleTap(e);
      }
      lastTap = 0; // Reset
    } else {
      lastTap = currentTime;
    }
  };

  element.addEventListener('touchend', handleTouchEnd);

  return () => {
    element.removeEventListener('touchend', handleTouchEnd);
  };
}

/**
 * LONG PRESS GESTURE
 * Hold for contextual actions
 */

/**
 * Setup long press gesture
 * @param {HTMLElement} element - Element to detect long press on
 * @param {Object} options - Configuration options
 * @param {Function} options.onLongPress - Callback for long press
 * @param {number} options.duration - Hold duration in ms (default: 500ms)
 * @returns {Function} Cleanup function
 */
export function setupLongPress(element, options = {}) {
  const {
    onLongPress = null,
    duration = 500,
  } = options;

  let pressTimer = null;

  const handleStart = (e) => {
    pressTimer = setTimeout(() => {
      if (onLongPress) {
        onLongPress(e);
      }
    }, duration);
  };

  const handleEnd = () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      pressTimer = null;
    }
  };

  element.addEventListener('touchstart', handleStart);
  element.addEventListener('mousedown', handleStart);
  element.addEventListener('touchend', handleEnd);
  element.addEventListener('touchmove', handleEnd); // Cancel if finger moves
  element.addEventListener('mouseup', handleEnd);
  element.addEventListener('mouseleave', handleEnd);

  return () => {
    if (pressTimer) clearTimeout(pressTimer);
    element.removeEventListener('touchstart', handleStart);
    element.removeEventListener('mousedown', handleStart);
    element.removeEventListener('touchend', handleEnd);
    element.removeEventListener('touchmove', handleEnd);
    element.removeEventListener('mouseup', handleEnd);
    element.removeEventListener('mouseleave', handleEnd);
  };
}

/**
 * COMBINED GESTURE SETUP
 * Setup multiple gestures on one element
 */

/**
 * Setup multiple gestures on element
 * @param {HTMLElement} element - Element to setup gestures on
 * @param {Object} config - Gesture configurations
 * @param {Object} config.swipe - Swipe config
 * @param {Object} config.drag - Drag config
 * @param {Object} config.pinch - Pinch config
 * @param {Object} config.doubleTap - Double tap config
 * @param {Object} config.longPress - Long press config
 * @returns {Function} Cleanup function for all gestures
 */
export function setupGestures(element, config = {}) {
  const cleanupFunctions = [];

  if (config.swipe) {
    cleanupFunctions.push(setupSwipe(element, config.swipe));
  }

  if (config.drag) {
    cleanupFunctions.push(setupDrag(element, config.drag));
  }

  if (config.pinch) {
    cleanupFunctions.push(setupPinch(element, config.pinch));
  }

  if (config.doubleTap) {
    cleanupFunctions.push(setupDoubleTap(element, config.doubleTap));
  }

  if (config.longPress) {
    cleanupFunctions.push(setupLongPress(element, config.longPress));
  }

  // Return combined cleanup function
  return () => {
    cleanupFunctions.forEach(cleanup => cleanup());
  };
}

/**
 * UTILITY: Check if device has touch support
 */
export function hasTouchSupport() {
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
}

/**
 * Default export with all gesture functions
 */
export default {
  setupSwipe,
  setupDrag,
  setupPinch,
  setupDoubleTap,
  setupLongPress,
  setupGestures,
  hasTouchSupport,
};
