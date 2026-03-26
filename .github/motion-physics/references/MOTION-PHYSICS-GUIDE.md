# Motion Physics Reference Guide

**Version**: 2.0  
**Last Updated**: 2026-03-26  
**Status**: Active

## Overview

Detailed reference for the Genesis Motion Physics system — spring tokens, animation presets, gesture API, and ontology integration patterns.

## Token Schema (`_data/tokens.yml`)

All motion constants must reference token paths. Forbidden: inline numeric `stiffness`, `damping`, `mass`, or `duration`.

```yaml
# _data/tokens.yml (canonical shape)
motion:
  spring:
    snappy:
      stiffness: 400
      damping:   30
      mass:      1
    natural:
      stiffness: 200
      damping:   25
      mass:      1
    soft:
      stiffness: 120
      damping:   20
      mass:      1
  duration:
    instant:  0.001   # reduced-motion fallback
    fast:     0.3
    normal:   0.5
    slow:     0.8
    sacred:   2.0
```

**Usage in JS:**

```javascript
// Tokens are compiled by Jekyll into _data/ and available via Liquid,
// or can be fetched at runtime from /assets/json/tokens.json if published there.
// Example: fetch('/assets/json/tokens.json').then(r => r.json()).then(tokens => { ... })
const spring = tokens.motion.spring.snappy;
animate(element, { x: [offset, 0] }, {
  stiffness: spring.stiffness,
  damping:   spring.damping,
  mass:      spring.mass,
});
```

## Available Animation Functions (`motion-utils.js`)

### Sacred Animations

| Function | Pattern | Duration Token |
|----------|---------|----------------|
| `animateSacredRhythm(el, opts)` | Scale pulse 1 → 1.05 → 1 | `sacred` (2s loop) |
| `animateConsciousnessPulse(el, opts)` | Glow + scale | `sacred` (2s loop) |
| `animateTranscendenceSpiral(el, opts)` | Rotate 360° | 8s loop |
| `animateGentleSpiral(el, opts)` | Slow rotation | 20s loop |
| `animateSacredGlow(el, opts)` | Box-shadow glow | `sacred` (3s loop) |

### Entrance Animations

| Function | Transform | Duration Token |
|----------|-----------|----------------|
| `animateFadeIn(el, opts)` | `opacity 0→1, y 20→0` | `normal` |
| `animatePulse(el, opts)` | Scale pulse | `normal` |
| `animateBounce(el, opts)` | Y bounce | `normal` |
| `animateConsciousnessEmergence(el, opts)` | Multi-step timeline | custom |

### Interactive Effects

| Function | Trigger | Effect |
|----------|---------|--------|
| `setupCardHover(el, opts)` | `mouseenter/leave` | Y lift + shadow |
| `setupButtonHover(el, opts)` | `mouseenter/leave` | Scale pulse |
| `setupSacredInteractive(el, opts)` | `mouseenter/leave` | Sacred glow |

### Scroll Effects

| Function | Trigger | Effect |
|----------|---------|--------|
| `setupParallax(el, opts)` | Scroll | Y offset (data-speed) |
| `setupScrollReveal(els, opts)` | IntersectionObserver | Fade-in-up |
| `setupStaggeredReveal(els, opts)` | IntersectionObserver | Staggered fade-in |
| `setupNavbarScroll(el, opts)` | Scroll | Backdrop + height change |

### Timeline / Page

| Function | Description |
|----------|-------------|
| `setupTimelineInteraction(marker, content, opts)` | Timeline marker expand |
| `animatePageTransition(el, opts)` | Page fade-in on load |

## Preset Library (`motion-presets.js`)

50+ presets across 5 categories:

```javascript
import { presets } from './motion-presets.js';

// entrance
presets.entrance.fadeIn
presets.entrance.fadeInUp
presets.entrance.fadeInDown
presets.entrance.fadeInLeft
presets.entrance.fadeInRight
presets.entrance.scaleIn
presets.entrance.slideInLeft
presets.entrance.slideInRight

// exit
presets.exit.fadeOut
presets.exit.fadeOutDown
presets.exit.scaleOut

// emphasis
presets.emphasis.pulse
presets.emphasis.shake
presets.emphasis.bounce
presets.emphasis.wobble

// transition
presets.transition.flip
presets.transition.rotate
```

### Usage

```javascript
import { animate } from 'motion';
import { presets } from './motion-presets.js';

const { keyframes, options } = presets.entrance.fadeInUp;
animate(element, keyframes, options);
```

## Gesture API (`motion-gestures.js`)

### Swipe

```javascript
import { setupSwipe } from './motion-gestures.js';

const cleanup = setupSwipe(element, {
  onSwipeLeft:  () => nextSlide(),
  onSwipeRight: () => prevSlide(),
  threshold:    50,     // px minimum distance
  allowedTime:  300,    // ms maximum duration
  animate:      true,   // show visual feedback
});

// Remove listeners when done
cleanup();
```

### Drag

```javascript
import { setupDrag } from './motion-gestures.js';

setupDrag(element, {
  onDragStart: (x, y) => { },
  onDrag:      (x, y, deltaX, deltaY) => { },
  onDragEnd:   (x, y) => { },
  constrainX:  false,
  constrainY:  true,
  animate:     true,
});
```

### Pinch / Zoom

```javascript
import { setupPinch } from './motion-gestures.js';

setupPinch(element, {
  onPinchIn:  (scale) => zoomOut(scale),
  onPinchOut: (scale) => zoomIn(scale),
  minScale:   0.5,
  maxScale:   3,
});
```

### Double-Tap / Long-Press

```javascript
import { setupDoubleTap, setupLongPress } from './motion-gestures.js';

setupDoubleTap(element, { onDoubleTap: (x, y) => like(x, y) });
setupLongPress(element,  { onLongPress: (x, y) => contextMenu(x, y), delay: 500 });
```

## CSS Migration (`motion-migration.js`)

Convert legacy `@keyframes` classes to Motion.dev programmatic calls:

```javascript
import { migrateAnimationClass } from './motion-migration.js';

// Replaces class-based CSS animation with Motion.dev equivalent
migrateAnimationClass(element, 'fade-in');    // → animateFadeIn()
migrateAnimationClass(element, 'slide-in-up'); // → animateFadeIn(y: 20)
```

## Ontology Integration

Ontological mixins emit HTML data attributes; `ontology-animations.js` picks them up at runtime — subdomains need no JavaScript.

### Automatic Mappings

| Ontological Mixin | Auto-Applied Motion |
|-------------------|---------------------|
| `genesis-entity('primary')` | `animateFadeIn` (entrance) + `setupCardHover` |
| `genesis-entity('imperative')` | `animateSacredGlow` + neon pulse |
| `genesis-synapse('execute')` | `setupButtonHover` |
| `genesis-synapse('navigate')` | Link underline transition |
| `genesis-state('evolving')` | Progress sweep animation |
| `genesis-state('scroll-triggered')` | `setupScrollReveal` |
| `genesis-cognition('axiom')` | `animateFadeIn` (entrance, down) |
| `genesis-atmosphere('vibrant')` | `animateSacredRhythm` background |

### Manual Override

Add `data-motion-intent` to opt into a specific physics profile:

```html
<div class="chat-bubble" data-motion-intent="sent">...</div>
<div class="chat-bubble" data-motion-intent="received">...</div>
<div class="chat-bubble" data-motion-intent="system">...</div>
```

## Performance Checklist

| Rule | Detail |
|------|--------|
| ✅ Use `transform` + `opacity` | GPU-composited, zero layout cost |
| ✅ IntersectionObserver | Only animate elements in viewport |
| ✅ `will-change` scoped | Add before, remove after animation |
| ✅ Stagger large lists | Avoid simultaneous heavy animations |
| ❌ Never animate `width`/`height`/`top`/`left` | Triggers layout reflow |
| ❌ Never animate many elements at once | Use `stagger` utility instead |

## Accessibility Requirements

```javascript
// Every new animation function must include this guard
import { prefersReducedMotion, getAnimationOptions } from './motion-utils.js';

export function myAnimation(element, options = {}) {
  const opts = getAnimationOptions({ duration: 0.5, ...options });
  // opts.duration === 0.001 when reduced motion is active
  animate(element, { opacity: [0, 1] }, opts);
}
```

WCAG SC 2.3.3 (AAA): Motion animation triggered by interaction must be disableable unless it is essential to the functionality or the information being conveyed — always provide a `prefers-reduced-motion` path.  
WCAG SC 1.4.3: Animated text meets 4.5:1 contrast throughout.

## Testing

### Visual Test Pages

| Path | Coverage |
|------|----------|
| `/tests/motion/` | Presets, gestures demo |
| `/tests/ontology/ontology-animations-demo.html` | Ontology-integrated animations |

### Manual Checklist

- [ ] Sacred rhythm pulses with heartbeat pattern
- [ ] Consciousness pulse shows glow effect
- [ ] Card hover lifts + shadow
- [ ] Button hover pulses
- [ ] Scroll reveal fades in items
- [ ] Stagger reveal staggers items correctly
- [ ] All animations disabled under `prefers-reduced-motion`
- [ ] No console errors
- [ ] 60fps on mid-range device (Chrome DevTools)

## Related Documentation

→ **Motion integration guide**: `docs/systems/motion/MOTION-INTEGRATION.md`  
→ **Complete motion guide**: `docs/systems/motion/MOTION-COMPLETE-GUIDE.md`  
→ **Ontology animation integration**: `docs/systems/motion/ONTOLOGY-ANIMATION-INTEGRATION.md`  
→ **Animation system spec**: `docs/specifications/animation-system.md`  
→ **JS interaction patterns**: `docs/specifications/javascript-interaction-patterns.md`  
→ **Performance spec**: `docs/specifications/performance.md`  
→ **Accessibility spec**: `docs/specifications/accessibility.md`
