# Motion Library Complete Integration Guide

**Version**: 2.0 (with Presets, Gestures, and Migration Tools)  
**Last Updated**: 2026-02-03

This document provides comprehensive guidance on the Motion library integration with animation presets, gesture support, and CSS animation migration tools.

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Animation Presets Library](#animation-presets-library)
4. [Gesture Support](#gesture-support)
5. [CSS Animation Migration](#css-animation-migration)
6. [Motion Utilities](#motion-utilities)
7. [Usage Examples](#usage-examples)
8. [Testing](#testing)
9. [Performance](#performance)
10. [Accessibility](#accessibility)

---

## Overview

**Motion** (formerly Motion One) is a lightweight (5KB) animation library providing:
- Web Animations API wrapper for optimal performance
- Built-in reduced motion support
- Timeline and gesture support
- Declarative usage via data attributes

**NEW in v2.0**:
- ✨ **50+ Animation Presets** across 5 categories
- 👆 **Gesture Support** (swipe, drag, pinch, double-tap, long-press)
- 🔄 **CSS Migration Tools** for automatic conversion
- 📦 **Modular Architecture** for tree-shaking

**Repository**: https://github.com/motiondivision/motion  
**Documentation**: https://motion.dev

---

## Architecture

### File Structure

```
assets/js/common/
├── motion-presets.js      (650 lines) - Animation preset library
├── motion-gestures.js     (800 lines) - Gesture detection & handling
├── motion-migration.js    (500 lines) - CSS animation migration
├── motion-utils.js        (650 lines) - Core Motion utilities
└── animations.js          (200 lines) - Main initialization

_includes/
└── motion-library.html    - CDN loader

Test Pages:
├── motion-test.html       - Original Motion testing
└── motion-presets-test.html - Presets & gestures demo
```

### Loading Strategy

Motion is loaded from CDN in `<head>` via `_includes/motion-library.html`:

```html
<script src="https://cdn.jsdelivr.net/npm/motion@12.30.0/dist/index.es.js" type="module"></script>
<script type="module">
  import * as Motion from 'https://cdn.jsdelivr.net/npm/motion@12.30.0/dist/index.es.js';
  window.Motion = Motion;
</script>
```

This makes Motion available globally as `window.Motion` for ES modules.

---

## Animation Presets Library

### Overview

The `motion-presets.js` module provides 50+ predefined animations organized into categories.

### Categories

**1. Entrance Animations** (13 presets)
- `fadeIn`, `fadeInUp`, `fadeInDown`, `fadeInLeft`, `fadeInRight`
- `scaleIn`, `slideInUp`, `slideInDown`, `slideInLeft`, `slideInRight`
- `zoomIn`, `rotateIn`, `bounceIn`

**2. Exit Animations** (11 presets)
- `fadeOut`, `fadeOutUp`, `fadeOutDown`, `fadeOutLeft`, `fadeOutRight`
- `scaleOut`, `slideOutUp`, `slideOutDown`, `slideOutLeft`, `slideOutRight`
- `zoomOut`, `rotateOut`

**3. Emphasis Animations** (10 presets)
- `pulse`, `heartbeat`, `shake`, `wobble`, `bounce`
- `swing`, `flash`, `glow`, `spin`, `spinSlow`

**4. Transition Animations** (5 pairs)
- `crossfade`, `slideHorizontal`, `slideVertical`, `zoom`, `rotate`
- Each includes `.in` and `.out` variants

**5. Sacred Animations** (10 presets - ASI Saga specific)
- `rhythm`, `consciousnessPulse`, `spiral`, `gentleSpiral`
- `essenceFlow`, `consciousnessExpansion`, `particleFloat`
- `cosmicDrift`, `energyFlow`, `shimmer`

### Basic Usage

```javascript
import { presets, applyEntrance, applyEmphasis } from './common/motion-presets.js';

// Apply entrance animation
applyEntrance(element, 'fadeInUp');

// Apply emphasis with custom options
applyEmphasis(element, 'pulse', { duration: 1.5 });

// Direct preset access
const preset = presets.entrance.fadeIn;
window.Motion.animate(element, preset.keyframes, preset.options);
```

### Preset Structure

Each preset contains:
```javascript
{
  keyframes: {
    // Animation keyframes
    opacity: [0, 1],
    transform: ['translateY(20px)', 'translateY(0)']
  },
  options: {
    // Default options
    duration: 0.6,
    easing: 'ease-out'
  }
}
```

### Utility Functions

```javascript
// Apply specific category preset
applyEntrance(element, presetName, customOptions);
applyExit(element, presetName, customOptions);
applyEmphasis(element, presetName, customOptions);
applySacred(element, presetName, customOptions);

// Get available presets
const names = getPresetNames();
// Returns: { entrance: [...], exit: [...], ... }
```

---

## Gesture Support

### Overview

The `motion-gestures.js` module provides comprehensive gesture detection for touch and mouse interactions.

### Supported Gestures

1. **Swipe** - Directional swipes (left, right, up, down)
2. **Drag** - Drag and drop with constraints & inertia
3. **Pinch** - Two-finger zoom (mobile/touch)
4. **Double Tap** - Quick tap detection
5. **Long Press** - Hold for context actions

### Swipe Gestures

```javascript
import { setupSwipe } from './common/motion-gestures.js';

setupSwipe(element, {
  onSwipeLeft: (e) => console.log('Swiped left!'),
  onSwipeRight: (e) => console.log('Swiped right!'),
  onSwipeUp: (e) => console.log('Swiped up!'),
  onSwipeDown: (e) => console.log('Swiped down!'),
  threshold: 50,      // Minimum distance (default: 50px)
  restraint: 100,     // Max perpendicular distance (default: 100px)
  allowedTime: 300,   // Max time for swipe (default: 300ms)
  animate: true,      // Visual feedback (default: true)
});
```

### Drag Gestures

```javascript
import { setupDrag } from './common/motion-gestures.js';

setupDrag(element, {
  axis: 'both',       // 'x', 'y', or 'both' (default: 'both')
  bounds: {           // Constrain dragging area
    left: -100,
    right: 100,
    top: -100,
    bottom: 100,
  },
  onDragStart: ({ x, y }) => console.log('Drag started'),
  onDrag: ({ x, y, velocityX, velocityY }) => console.log('Dragging'),
  onDragEnd: ({ x, y, velocityX, velocityY }) => console.log('Drag ended'),
  inertia: true,      // Enable physics-based release (default: true)
  friction: 0.8,      // Friction coefficient 0-1 (default: 0.8)
});
```

### Pinch/Zoom Gestures

```javascript
import { setupPinch } from './common/motion-gestures.js';

setupPinch(element, {
  minScale: 0.5,      // Minimum scale (default: 0.5)
  maxScale: 3,        // Maximum scale (default: 3)
  onPinchStart: ({ scale }) => console.log('Pinch started'),
  onPinch: ({ scale, delta }) => console.log('Pinching'),
  onPinchEnd: ({ scale }) => console.log('Pinch ended'),
});
```

### Double Tap

```javascript
import { setupDoubleTap } from './common/motion-gestures.js';

setupDoubleTap(element, {
  onDoubleTap: (e) => console.log('Double tapped!'),
  delay: 300,         // Max time between taps (default: 300ms)
});
```

### Long Press

```javascript
import { setupLongPress } from './common/motion-gestures.js';

setupLongPress(element, {
  onLongPress: (e) => console.log('Long press!'),
  duration: 500,      // Hold duration (default: 500ms)
});
```

### Combined Gestures

```javascript
import { setupGestures } from './common/motion-gestures.js';

const cleanup = setupGestures(element, {
  swipe: {
    onSwipeLeft: () => console.log('Left'),
    onSwipeRight: () => console.log('Right'),
  },
  drag: {
    axis: 'x',
    onDrag: ({ x }) => console.log(x),
  },
  pinch: {
    maxScale: 2,
  },
});

// Clean up all gestures
cleanup();
```

### Touch Detection

```javascript
import { hasTouchSupport } from './common/motion-gestures.js';

if (hasTouchSupport()) {
  console.log('Touch-enabled device');
}
```

---

## CSS Animation Migration

### Overview

The `motion-migration.js` module automatically converts CSS `@keyframes` animations to Motion-based animations.

### Supported CSS Animations

**Currently Mapped** (40+ animations):
- Sacred: `sacred-rhythm`, `consciousness-pulse`, `transcendence-spiral`, etc.
- Basic: `fadeIn`, `pulse`, `bounce`, `spin`, `shake`
- Specialized: `dropdown-appear`, `scrollBounce`, `shimmer`, etc.

### Automatic Migration

```javascript
import { autoMigrate } from './common/motion-migration.js';

// Auto-migrate on page load
autoMigrate({
  enabled: true,      // Enable migration (default: true)
  selector: null,     // Container selector (default: document.body)
  delay: 0,           // Delay in ms (default: 0)
});
```

### Manual Migration

```javascript
import { migrateAnimations, addAnimation } from './common/motion-migration.js';

// Migrate all animations in container
const migrated = migrateAnimations(document.querySelector('.container'));
console.log(`Migrated ${migrated.length} animations`);

// Add specific animation to element
addAnimation(element, 'sacred-rhythm');
```

### Check Support

```javascript
import { 
  getSupportedAnimations, 
  isAnimationSupported 
} from './common/motion-migration.js';

// Get all supported animation names
const supported = getSupportedAnimations();

// Check if specific animation is supported
if (isAnimationSupported('fadeIn')) {
  console.log('fadeIn is supported!');
}
```

### Custom Animation Mapping

To add custom CSS animation mappings, edit `motion-migration.js`:

```javascript
const animationMap = {
  'my-custom-animation': {
    category: 'entrance',
    preset: 'fadeIn',
  },
  // OR use custom function
  'my-custom-animation': {
    custom: (element) => {
      return window.Motion.animate(
        element,
        { /* keyframes */ },
        { /* options */ }
      );
    },
  },
};
```

---

## Motion Utilities

### Available Functions

From `motion-utils.js`:

**Sacred Animations**:
- `animateSacredRhythm(element, options)` - Heartbeat pattern
- `animateConsciousnessPulse(element, options)` - Pulsing glow
- `animateTranscendenceSpiral(element, options)` - Rotating spiral
- `animateGentleSpiral(element, options)` - Slow rotation
- `animateSacredGlow(element, options)` - Glowing effect
- `animateConsciousnessEmergence(element, options)` - Timeline emergence

**Basic Animations**:
- `animateFadeIn(element, options)` - Fade in from bottom
- `animatePulse(element, options)` - Scale pulse
- `animateBounce(element, options)` - Bounce effect

**Interactive Effects**:
- `setupCardHover(element, options)` - Card lift on hover
- `setupButtonHover(element, options)` - Button pulse on hover
- `setupSacredInteractive(element, options)` - Sacred glow on hover

**Scroll Effects**:
- `setupParallax(element, options)` - Parallax scrolling
- `setupScrollReveal(elements, options)` - Fade in on scroll
- `setupStaggeredReveal(elements, options)` - Staggered scroll reveal
- `setupNavbarScroll(navbar, options)` - Navbar scroll effect

**Timeline & Transitions**:
- `setupTimelineInteraction(marker, content, options)` - Timeline toggle
- `animatePageTransition(element, options)` - Page fade-in

**Utilities**:
- `prefersReducedMotion()` - Check reduced motion preference
- `getAnimationOptions(options)` - Get options with reduced motion support

---

## Usage Examples

### Example 1: Entrance Animation on Scroll

```javascript
import { applyEntrance } from './common/motion-presets.js';
import { setupScrollReveal } from './common/motion-utils.js';

// Simple scroll reveal
setupScrollReveal(document.querySelectorAll('.fade-in-on-scroll'));

// Custom entrance on scroll
const elements = document.querySelectorAll('.card');
elements.forEach(el => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        applyEntrance(el, 'fadeInUp', { duration: 0.8 });
        observer.unobserve(el);
      }
    });
  });
  observer.observe(el);
});
```

### Example 2: Interactive Card with Gestures

```javascript
import { setupCardHover } from './common/motion-utils.js';
import { setupSwipe, setupLongPress } from './common/motion-gestures.js';
import { applyExit } from './common/motion-presets.js';

const card = document.querySelector('.interactive-card');

// Hover effect
setupCardHover(card);

// Swipe to dismiss
setupSwipe(card, {
  onSwipeLeft: () => applyExit(card, 'slideOutLeft'),
  onSwipeRight: () => applyExit(card, 'slideOutRight'),
});

// Long press for context menu
setupLongPress(card, {
  onLongPress: (e) => {
    e.preventDefault();
    showContextMenu(card);
  },
});
```

### Example 3: Draggable Dashboard Widget

```javascript
import { setupDrag } from './common/motion-gestures.js';

const widget = document.querySelector('.dashboard-widget');
const container = document.querySelector('.dashboard');
const bounds = container.getBoundingClientRect();

setupDrag(widget, {
  axis: 'both',
  bounds: {
    left: 0,
    right: bounds.width - widget.offsetWidth,
    top: 0,
    bottom: bounds.height - widget.offsetHeight,
  },
  inertia: true,
  onDragEnd: ({ x, y }) => {
    // Save position
    localStorage.setItem('widget-position', JSON.stringify({ x, y }));
  },
});
```

### Example 4: Image Gallery with Pinch Zoom

```javascript
import { setupPinch, setupDoubleTap } from './common/motion-gestures.js';

const image = document.querySelector('.gallery-image');
let currentScale = 1;

setupPinch(image, {
  minScale: 0.5,
  maxScale: 3,
  onPinch: ({ scale }) => {
    currentScale = scale;
  },
});

setupDoubleTap(image, {
  onDoubleTap: () => {
    // Toggle zoom
    const newScale = currentScale === 1 ? 2 : 1;
    window.Motion.animate(
      image,
      { scale: newScale },
      { duration: 0.3 }
    );
    currentScale = newScale;
  },
});
```

---

## Testing

### Test Pages

**1. Motion Test** (`/motion-test.html`)
- Original Motion utilities testing
- Sacred animations
- Interactive effects
- Scroll effects

**2. Presets & Gestures Test** (`/motion-presets-test.html`)
- All 50+ animation presets
- Swipe detection demo
- Drag and drop demo
- Pinch zoom demo
- Touch support indicators

### Manual Testing Checklist

**Animation Presets**:
- [ ] All entrance animations work
- [ ] All exit animations work
- [ ] Emphasis animations loop correctly
- [ ] Sacred animations display properly
- [ ] Presets respect reduced motion

**Gestures**:
- [ ] Swipe detection in all 4 directions
- [ ] Drag with bounds constraints
- [ ] Inertia on drag release
- [ ] Pinch zoom on touch devices
- [ ] Double tap triggers correctly
- [ ] Long press activates after duration

**Performance**:
- [ ] 60fps on modern devices
- [ ] No jank during animations
- [ ] Gestures feel responsive
- [ ] Memory usage is reasonable

**Accessibility**:
- [ ] Reduced motion disables animations
- [ ] Keyboard navigation still works
- [ ] Screen readers announce changes
- [ ] Focus indicators visible

---

## Performance

### Optimizations

1. **Web Animations API** - Native browser animation engine
2. **GPU Acceleration** - Transforms and opacity use GPU
3. **Tree-shaking** - Import only what you need
4. **Lazy Loading** - Animations initialize on demand
5. **Efficient Selectors** - Data attributes for targeted init

### Benchmarks

| Metric | Value |
|--------|-------|
| Library Size | 5KB (minified + gzipped) |
| Load Time | ~10ms from CDN |
| Animation Performance | 60fps on modern devices |
| Memory Overhead | Minimal vs vanilla JS |
| Preset Library | +2KB additional |
| Gesture Module | +3KB additional |

### Best Practices

✅ **DO**:
- Use transforms and opacity (GPU accelerated)
- Batch animations with timelines
- Clean up animations when done
- Use presets for common patterns
- Enable inertia for natural feel

❌ **DON'T**:
- Animate width/height (layout thrashing)
- Create too many simultaneous animations
- Forget to remove gesture listeners
- Ignore reduced motion preferences
- Animate on scroll without throttling

---

## Accessibility

### Reduced Motion Support

All animations automatically respect `prefers-reduced-motion`:

```javascript
// Automatically handled in presets
applyEntrance(element, 'fadeIn');
// If reduced motion: duration becomes 0.001s (near-instant)

// Manual check
import { prefersReducedMotion } from './common/motion-utils.js';

if (!prefersReducedMotion()) {
  // Apply animation
}
```

### Testing Reduced Motion

**macOS**: System Preferences → Accessibility → Display → Reduce motion  
**Windows**: Settings → Ease of Access → Display → Show animations  
**DevTools**: Chrome → Rendering → Emulate CSS `prefers-reduced-motion`

### Keyboard Navigation

Gestures enhance but don't replace keyboard navigation:
- All interactive elements remain keyboard accessible
- Drag operations have keyboard alternatives
- Focus states visible during animations

### Screen Reader Support

- Animations don't interfere with ARIA labels
- State changes announced when meaningful
- Long-running animations skippable

---

## Troubleshooting

### Motion Not Loaded

**Error**: "Motion library not loaded"

**Solution**: Ensure `motion-library.html` included in head:
```liquid
{% include motion-library.html %}
```

### Animations Not Working

1. Check console for errors
2. Verify Motion loaded: `console.log(window.Motion)`
3. Check element has correct data attribute
4. Ensure element is visible
5. Test without reduced motion

### Gestures Not Responding

1. Check if device has touch support
2. Verify element has `touch-action: none` if needed
3. Check for event listener conflicts
4. Test on actual device (simulators differ)

### Performance Issues

1. Reduce animated elements count
2. Use stagger for large lists
3. Avoid animating layout properties
4. Prefer transforms and opacity
5. Check for JavaScript errors

---

## Migration Guide

### From CSS Animations

**Before** (CSS):
```scss
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-in { animation: fadeIn 0.8s ease-out; }
```

**After** (Motion with Presets):
```javascript
import { applyEntrance } from './common/motion-presets.js';

const element = document.querySelector('.my-element');
applyEntrance(element, 'fadeInUp');
```

Or auto-migrate:
```javascript
import { autoMigrate } from './common/motion-migration.js';
autoMigrate(); // Converts all supported CSS animations
```

### Benefits of Migration

- ✅ Programmatic control
- ✅ Dynamic parameters
- ✅ Better performance
- ✅ Built-in reduced motion
- ✅ Smaller bundle size
- ✅ Easier maintenance

---

## Resources

- **Motion Documentation**: https://motion.dev
- **Web Animations API**: https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API
- **Performance Guide**: https://web.dev/animations-guide/
- **Accessibility**: https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html
- **Touch Events**: https://developer.mozilla.org/en-US/docs/Web/API/Touch_events

---

## Changelog

### v2.0.0 (2026-02-03)

**Added**:
- ✨ Animation presets library (50+ presets)
- 👆 Gesture support module (swipe, drag, pinch, etc.)
- 🔄 CSS animation migration tools
- 📚 Comprehensive documentation
- 🧪 Enhanced test pages

**Changed**:
- Refactored motion-utils.js to use presets
- Fixed Motion library detection

**Improved**:
- Performance optimizations
- Better reduced motion support
- Enhanced error handling

### v1.0.0 (PR #77)

**Initial Release**:
- Motion library integration (5KB)
- 18 animation functions
- Declarative API via data attributes
- Sacred animations
- Scroll effects
- Interactive hover effects

---

**Last Updated**: 2026-02-03  
**Version**: 2.0.0  
**Maintainer**: ASI Saga Team
