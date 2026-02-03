# Motion Library Integration Guide

This document explains how the Motion library is integrated into the ASI Saga theme for UI/UX animations.

## Overview

**Motion** (formerly Motion One) is a lightweight (5KB) animation library that provides:
- Web Animations API wrapper for optimal performance
- Built-in reduced motion support
- Timeline and gesture support
- Declarative usage via data attributes

**Repository**: https://github.com/motiondivision/motion  
**Documentation**: https://motion.dev

## Architecture

### Files

- **`_includes/motion-library.html`** - CDN loader for Motion library
- **`assets/js/common/motion-utils.js`** - Motion-based animation utilities (16 functions)
- **`assets/js/common/animations.js`** - Main animation initialization using Motion
- **`motion-test.html`** - Comprehensive testing page for all animations

### Loading Strategy

Motion is loaded from CDN in the `<head>` via `_includes/motion-library.html`:

```html
<script src="https://cdn.jsdelivr.net/npm/motion@12.30.0/dist/index.es.js" type="module"></script>
<script type="module">
  import * as Motion from 'https://cdn.jsdelivr.net/npm/motion@12.30.0/dist/index.es.js';
  window.Motion = Motion;
</script>
```

This makes Motion available globally as `window.Motion` for use in our utilities.

## Available Animation Functions

### Sacred Animations

1. **`animateSacredRhythm(element, options)`** - Heartbeat pattern (2s loop)
2. **`animateConsciousnessPulse(element, options)`** - Pulsing glow (2s loop)
3. **`animateTranscendenceSpiral(element, options)`** - Rotating spiral (8s loop)
4. **`animateGentleSpiral(element, options)`** - Slow rotation (20s loop)
5. **`animateSacredGlow(element, options)`** - Glowing effect (3s loop)

### Basic Animations

6. **`animateFadeIn(element, options)`** - Fade in from bottom
7. **`animatePulse(element, options)`** - Scale pulse effect
8. **`animateBounce(element, options)`** - Bounce for scroll indicators
9. **`animateConsciousnessEmergence(element, options)`** - Complex emergence timeline

### Interactive Effects

10. **`setupCardHover(element, options)`** - Card lift on hover
11. **`setupButtonHover(element, options)`** - Button pulse on hover
12. **`setupSacredInteractive(element, options)`** - Sacred glow on hover

### Scroll Effects

13. **`setupParallax(element, options)`** - Parallax scroll effect
14. **`setupScrollReveal(elements, options)`** - Reveal on scroll
15. **`setupStaggeredReveal(elements, options)`** - Staggered scroll reveal
16. **`setupNavbarScroll(navbar, options)`** - Navbar scroll effect

### Timeline

17. **`setupTimelineInteraction(marker, content, options)`** - Timeline marker interaction
18. **`animatePageTransition(element, options)`** - Page fade-in transition

## Declarative Usage (Recommended)

Use `data-motion` attributes for easy integration:

```html
<!-- Sacred Animations -->
<div data-motion="sacred-rhythm">Heartbeat animation</div>
<div data-motion="consciousness-pulse">Pulsing glow</div>
<div data-motion="transcendence-spiral">Rotating spiral</div>
<div data-motion="gentle-spiral">Slow rotation</div>
<div data-motion="sacred-glow">Glowing effect</div>
<div data-motion="bounce">Bounce effect</div>

<!-- Interactive Effects -->
<div data-motion="card-hover">Hover to lift</div>
<button data-motion="button-hover">Hover to pulse</button>
<div data-motion="sacred-interactive">Hover for sacred glow</div>

<!-- Parallax (requires data-speed attribute) -->
<div data-motion="parallax" data-speed="0.5">Parallax layer</div>

<!-- Scroll Reveal (staggered) -->
<div data-motion-group="stagger">
  <div data-motion="stagger-item">Item 1</div>
  <div data-motion="stagger-item">Item 2</div>
  <div data-motion="stagger-item">Item 3</div>
</div>
```

These are automatically initialized by `initMotionAnimations()` on page load.

## Programmatic Usage

Import and use motion utilities directly:

```javascript
import {
  animateFadeIn,
  setupCardHover,
  setupScrollReveal,
} from './common/motion-utils.js';

// Animate element
const element = document.querySelector('.my-element');
animateFadeIn(element, { duration: 1, delay: 0.2 });

// Setup hover effect
const cards = document.querySelectorAll('.product-card');
cards.forEach(card => setupCardHover(card));

// Setup scroll reveal
const revealElements = document.querySelectorAll('.reveal-on-scroll');
setupScrollReveal(revealElements);
```

## Accessibility

### Reduced Motion Support

Motion automatically respects `prefers-reduced-motion` preferences:

```javascript
export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
```

When reduced motion is enabled:
- All animations have near-instant duration (0.001s)
- Scroll reveal elements appear immediately
- Interactive effects still work but without animation

### Testing Reduced Motion

**macOS**: System Preferences > Accessibility > Display > Reduce motion  
**Windows**: Settings > Ease of Access > Display > Show animations  
**DevTools**: Chrome DevTools > Rendering > Emulate CSS media feature `prefers-reduced-motion`

## Performance

### Optimizations

1. **Web Animations API** - Uses browser's native animation engine
2. **GPU Acceleration** - Transforms and opacity changes use GPU
3. **Lazy Loading** - Animations only initialized when elements are in viewport
4. **Efficient Selectors** - Uses data attributes for targeted initialization

### Benchmarks

- **Library Size**: 5KB (minified + gzipped)
- **Load Time**: ~10ms from CDN
- **Animation Performance**: 60fps on modern devices
- **Memory**: Minimal overhead compared to vanilla JS

## Three.js Integration

Motion handles UI/UX animations, while **Three.js remains for 3D graphics**:

- **`assets/js/futuristic-effects.js`** - Three.js particle systems and neural networks
- No conflicts between Motion and Three.js
- Both respect `prefers-reduced-motion`

## Testing

### Comprehensive Test Page

Visit `/motion-test.html` to see all animations in action:

```
http://localhost:4000/motion-test.html
```

Features:
- Sacred animations (6 types)
- Card hover effects
- Button hover effects
- Sacred interactive
- Parallax scrolling
- Scroll reveal with stagger
- Performance info
- Reduced motion indicator

### Manual Testing Checklist

- [ ] Sacred rhythm animates with heartbeat pattern
- [ ] Consciousness pulse shows glowing effect
- [ ] Transcendence spiral rotates smoothly
- [ ] Card hover lifts with shadow
- [ ] Button hover pulses on hover
- [ ] Parallax moves on scroll
- [ ] Scroll reveal fades in items
- [ ] Navbar changes on scroll
- [ ] All animations disabled with reduced motion
- [ ] No console errors
- [ ] 60fps performance

## Migration from CSS Animations

### Before (CSS)

```scss
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.8s ease-out;
}
```

### After (Motion)

```javascript
import { animateFadeIn } from './motion-utils.js';

const element = document.querySelector('.my-element');
animateFadeIn(element);
```

Or declaratively:

```html
<div data-motion="fade-in">Content</div>
```

### Benefits

- Programmatic control
- Dynamic parameters
- Better performance
- Built-in reduced motion
- Smaller bundle size

## Troubleshooting

### Motion Not Loaded

**Error**: "Motion library not loaded. Animations disabled."

**Solution**: Ensure `motion-library.html` is included in `_includes/head.html`:

```liquid
{% include motion-library.html %}
```

### Animations Not Working

1. Check console for errors
2. Verify Motion is loaded: `console.log(window.Motion)`
3. Check element has correct data attribute
4. Ensure element is visible (not `display: none`)
5. Test without reduced motion enabled

### Performance Issues

1. Reduce number of animated elements
2. Use stagger for large lists
3. Avoid animating layout properties (width, height)
4. Prefer transforms and opacity
5. Check for JavaScript errors blocking execution

## Future Enhancements

Potential additions:

- **Gesture support** - Swipe, drag, pinch gestures via Motion
- **More timeline animations** - Complex multi-step animations
- **Custom easing functions** - Spring physics, bounce, etc.
- **Animation presets** - Predefined animation combos
- **Developer tools** - Debug mode, performance metrics

## Resources

- **Motion Documentation**: https://motion.dev
- **Web Animations API**: https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API
- **Performance Best Practices**: https://web.dev/animations-guide/
- **Accessibility**: https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html

## Support

For issues or questions:
1. Check `/motion-test.html` to isolate the problem
2. Review console errors
3. Check Motion library version (12.30.0)
4. Consult Motion docs: https://motion.dev
