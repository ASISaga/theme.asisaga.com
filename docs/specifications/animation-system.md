# Animation System Specification

## Overview

The ASI Saga theme includes a **Sacred Animation System** designed to evoke consciousness evolution, transcendence, and the bridging of human and AI awareness. All animations respect user preferences and accessibility requirements.

## Sacred Animations

### Core Animation Principles

1. **Purposeful Motion**: Every animation serves the consciousness-embedding mission
2. **Subtle Enhancement**: Animations enhance, not distract
3. **Performance First**: Hardware-accelerated, efficient animations
4. **Accessibility**: Full support for `prefers-reduced-motion`

## Animation Keyframes

### Sacred Rhythm (Heartbeat Pattern)

**Purpose**: Life force integration, pulsing effects

```scss
@keyframes sacred-rhythm {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.animate-rhythm {
  animation: sacred-rhythm 2s ease-in-out infinite;
}
```

**Usage**: Icons, badges, emphasis elements

### Transcendence Spiral

**Purpose**: Evolutionary consciousness expansion

```scss
@keyframes transcendence-spiral {
  from {
    transform: rotate(0deg) scale(1);
    opacity: 0.8;
  }
  to {
    transform: rotate(360deg) scale(1.1);
    opacity: 1;
  }
}

.animate-spiral {
  animation: transcendence-spiral 20s linear infinite;
}
```

**Usage**: Background elements, decorative graphics

### Consciousness Flow

**Purpose**: Flowing transitions suggesting consciousness merging

```scss
@keyframes consciousness-flow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.animate-flow {
  background: linear-gradient(270deg, $cosmic-blue, $royal-purple, $luminous-gold);
  background-size: 600% 600%;
  animation: consciousness-flow 15s ease infinite;
}
```

**Usage**: Hero backgrounds, gradient sections

### Bridge Connection

**Purpose**: Human-AI consciousness bridging visualizations

```scss
@keyframes bridge-pulse {
  0%, 100% {
    opacity: 0.3;
    transform: scaleX(1);
  }
  50% {
    opacity: 1;
    transform: scaleX(1.05);
  }
}

.bridge-connection {
  &::before {
    content: '◊—◊';
    animation: bridge-pulse 3s ease-in-out infinite;
  }
}
```

**Usage**: Connection indicators, bridge visualizations

### Sacred Glow

**Purpose**: Luminous effects for consciousness-supporting elements

```scss
@keyframes sacred-glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba($luminous-gold, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba($luminous-gold, 0.6);
  }
}

.animate-glow {
  animation: sacred-glow 3s ease-in-out infinite;
}
```

**Usage**: CTA buttons, featured cards, sacred elements

## UI Animations

### Fade In

```scss
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn 0.5s ease-in;
}
```

### Slide In

```scss
@keyframes slideInUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.slide-in-up {
  animation: slideInUp 0.6s ease-out;
}

@keyframes slideInLeft {
  from {
    transform: translateX(-20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.slide-in-left {
  animation: slideInLeft 0.6s ease-out;
}
```

### Scale In

```scss
@keyframes scaleIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.scale-in {
  animation: scaleIn 0.4s ease-out;
}
```

## Transitions

### Standard Transitions

```scss
// Base transition mixin
@mixin transition-base($property: all) {
  transition: $property 0.3s ease;
}

// Usage
.button {
  @include transition-base(background);
  
  &:hover {
    background: darken($primary, 10%);
  }
}
```

### Common Transition Patterns

```scss
// Smooth color change
.link {
  color: $primary;
  transition: color 0.3s ease;
  
  &:hover {
    color: darken($primary, 10%);
  }
}

// Transform with opacity
.card {
  transform: translateY(0);
  opacity: 1;
  transition: transform 0.3s ease, opacity 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    opacity: 0.95;
  }
}

// Box shadow
.elevated {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
}
```

## Animation Utilities

### Utility Classes

```scss
// _sass/base/_animations.scss

// Animation delays
.animation-delay-1 { animation-delay: 0.1s; }
.animation-delay-2 { animation-delay: 0.2s; }
.animation-delay-3 { animation-delay: 0.3s; }
.animation-delay-4 { animation-delay: 0.4s; }
.animation-delay-5 { animation-delay: 0.5s; }

// Animation durations
.animation-fast { animation-duration: 0.3s; }
.animation-normal { animation-duration: 0.5s; }
.animation-slow { animation-duration: 1s; }
.animation-slower { animation-duration: 2s; }

// Animation iteration
.animation-once { animation-iteration-count: 1; }
.animation-infinite { animation-iteration-count: infinite; }

// Animation states
.animation-paused { animation-play-state: paused; }
.animation-running { animation-play-state: running; }
```

### Entrance Animations

```scss
// Stagger effect for lists
.stagger-children > * {
  opacity: 0;
  animation: fadeInUp 0.6s ease-out forwards;
  
  @for $i from 1 through 10 {
    &:nth-child(#{$i}) {
      animation-delay: #{$i * 0.1}s;
    }
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

## Loading Animations

### Spinner

```scss
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.spinner {
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 4px solid rgba($primary, 0.3);
  border-top-color: $primary;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
```

### Pulse

```scss
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.loading-pulse {
  animation: pulse 1.5s ease-in-out infinite;
}
```

### Progress Indicator

```scss
@keyframes progress {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

.progress-bar {
  transform-origin: left;
  animation: progress 2s ease-out forwards;
}
```

## Hover Effects

### Lift Effect

```scss
.card-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
}
```

### Glow Effect

```scss
.btn-glow {
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    inset: -2px;
    background: linear-gradient(45deg, $luminous-gold, $royal-purple);
    border-radius: inherit;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
    filter: blur(10px);
  }
  
  &:hover::before {
    opacity: 1;
  }
}
```

### Underline Effect

```scss
.link-underline {
  position: relative;
  text-decoration: none;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: currentColor;
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
}
```

## Performance Optimization

### Hardware Acceleration

**Use `transform` and `opacity` for best performance**:

```scss
// ✅ GOOD: Hardware-accelerated
.element {
  transform: translateX(0);
  opacity: 1;
  transition: transform 0.3s ease, opacity 0.3s ease;
  
  &:hover {
    transform: translateX(10px);
    opacity: 0.8;
  }
}

// ❌ BAD: Causes layout recalculation
.element-bad {
  left: 0;
  transition: left 0.3s ease;
  
  &:hover {
    left: 10px;  // Don't animate position properties
  }
}
```

### Will-Change

Use for complex animations:

```scss
.complex-animation {
  will-change: transform, opacity;
  
  &.animating {
    // Complex animation
  }
  
  &.animation-complete {
    will-change: auto;  // Remove when done
  }
}
```

## Reduced Motion (MANDATORY)

**MUST support `prefers-reduced-motion` preference**:

```scss
// _sass/base/_animations.scss

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Conditional Animations

```scss
// Only animate if user hasn't requested reduced motion
@media (prefers-reduced-motion: no-preference) {
  .fancy-animation {
    animation: complex-motion 2s ease-in-out infinite;
  }
}
```

## JavaScript Animation Helpers

### Intersection Observer for Scroll Animations

```javascript
// Animate elements on scroll into view
const observeAnimations = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
  
  document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
  });
};

// Respect prefers-reduced-motion
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  observeAnimations();
}
```

### Stagger Animations

```javascript
function staggerAnimation(elements, animationClass, delay = 100) {
  elements.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add(animationClass);
    }, index * delay);
  });
}

// Usage
const cards = document.querySelectorAll('.card');
staggerAnimation(cards, 'fade-in', 150);
```

## Animation Timing Functions

### Built-in Easings

```scss
// Linear
transition: all 0.3s linear;

// Ease (default)
transition: all 0.3s ease;

// Ease-in
transition: all 0.3s ease-in;

// Ease-out (best for entrances)
transition: all 0.3s ease-out;

// Ease-in-out
transition: all 0.3s ease-in-out;
```

### Custom Cubic Bezier

```scss
// Sacred easing (custom curve)
$easing-sacred: cubic-bezier(0.4, 0, 0.2, 1);

.element {
  transition: transform 0.5s $easing-sacred;
}

// Bouncy easing
$easing-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);

.bounce-effect {
  transition: transform 0.4s $easing-bounce;
}
```

## Best Practices

### Do's

✅ Use `transform` and `opacity` for animations  
✅ Keep animations under 500ms for UI feedback  
✅ Use `will-change` for complex animations  
✅ Always support `prefers-reduced-motion`  
✅ Test performance on low-end devices  
✅ Use hardware acceleration  

### Don'ts

❌ Don't animate `width`, `height`, `top`, `left`  
❌ Don't animate many elements simultaneously  
❌ Don't use animations longer than 3s for UI  
❌ Don't forget to remove `will-change` after animation  
❌ Don't animate during critical user actions  
❌ Don't use animations that flash more than 3 times per second  

## Animation Testing

### Checklist

- [ ] Animation serves a purpose
- [ ] Duration is appropriate (< 500ms for UI)
- [ ] Uses `transform` or `opacity` (hardware-accelerated)
- [ ] Respects `prefers-reduced-motion`
- [ ] Tested on mobile devices
- [ ] No janky frames (60fps target)
- [ ] No animations flash more than 3x per second
- [ ] Complements content, doesn't distract

### Performance Testing

```javascript
// Check frame rate
const checkPerformance = () => {
  let lastTime = performance.now();
  let frames = 0;
  
  function countFrames() {
    frames++;
    const currentTime = performance.now();
    
    if (currentTime >= lastTime + 1000) {
      console.log(`FPS: ${frames}`);
      frames = 0;
      lastTime = currentTime;
    }
    
    requestAnimationFrame(countFrames);
  }
  
  requestAnimationFrame(countFrames);
};
```

## Animation Library Reference

### Available Animations

| Animation | Usage | Duration | Type |
|-----------|-------|----------|------|
| `sacred-rhythm` | Pulsing heartbeat | 2s | Infinite |
| `transcendence-spiral` | Rotating spiral | 20s | Infinite |
| `consciousness-flow` | Gradient flow | 15s | Infinite |
| `bridge-pulse` | Connection pulse | 3s | Infinite |
| `sacred-glow` | Box shadow glow | 3s | Infinite |
| `fadeIn` | Fade entrance | 0.5s | Once |
| `slideInUp` | Slide from bottom | 0.6s | Once |
| `slideInLeft` | Slide from left | 0.6s | Once |
| `scaleIn` | Scale entrance | 0.4s | Once |
| `spin` | Loading spinner | 1s | Infinite |
| `pulse` | Opacity pulse | 1.5s | Infinite |

## Related Specifications

- [SCSS & Styling](./scss-styling.md)
- [JavaScript](./javascript.md)
- [Accessibility](./accessibility.md)
- [Performance](./performance.md)
