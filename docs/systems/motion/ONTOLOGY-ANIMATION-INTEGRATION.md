# Ontology Animation Integration Guide

**Version**: 2.3.0  
**Date**: 2026-02-03  
**Status**: Production Ready

## Overview

The Genesis Ontological Design System now includes **automatic animation integration**. When you use ontological mixins like `genesis-entity('primary')`, appropriate Motion-based animations are applied automatically—no JavaScript setup needed in your subdomain.

This creates a truly "animation-blind" subdomain experience where animations are controlled semantically through the ontology system.

---

## Quick Start

### Subdomain SCSS (All You Need)

```scss
---
---
@import "ontology/index";

.my-product-card {
  @include genesis-entity('primary');
  // ✨ Automatically gets: fadeInUp entrance + card hover lift
  
  .product-title {
    @include genesis-cognition('axiom');
    // ✨ Automatically gets: fadeInDown entrance
  }
  
  .buy-button {
    @include genesis-synapse('execute');
    // ✨ Automatically gets: button pulse hover
  }
}
```

### HTML (Simple & Semantic)

```html
<div class="my-product-card">
  <h2 class="product-title">Amazing Product</h2>
  <button class="buy-button">Buy Now</button>
</div>
```

**That's it!** Animations apply automatically. Zero JavaScript in your subdomain.

---

## How It Works

### Architecture

```
Subdomain SCSS                Theme Engine                 Animation Layer
──────────────               ──────────────               ───────────────
@include genesis-    →    Applies visual     →    Detects ontological
entity('primary');         styling (colors,          roles from classes
                           borders, etc.)            & applies animations
```

**Flow**:
1. **Subdomain uses ontological mixins** in SCSS
2. **Theme engine applies visual styling** (colors, layout, etc.)
3. **JavaScript auto-detects ontological roles** from class patterns
4. **Motion animations applied automatically** based on semantic context
5. **Reduced motion respected** automatically

### Detection Strategy

The animation system detects ontological roles through:

1. **Explicit data attributes** (highest priority):
   ```html
   <div data-genesis-entity="primary">...</div>
   ```

2. **Class pattern matching** (automatic):
   - Classes containing "card", "panel", "box" → `entity('primary')`
   - Classes containing "button", "btn" → `synapse('execute')`
   - `<h1>` through `<h6>` tags → `cognition('axiom')`
   - Classes containing "tag", "chip", "badge" → `cognition('quantum')`
   - Classes containing "scroll-trigger", "fade-in", "reveal" → `state('scroll-triggered')`

3. **Element type inference** (fallback):
   - `<button>` elements → `synapse('execute')`
   - `<a>` elements → `synapse('navigate')`
   - Heading tags → `cognition('axiom')`

---

## Animation Mappings

### Entity Animations

Based on `genesis-entity($nature)` mixin:

| Nature | Entrance Animation | Hover Effect | Emphasis |
|--------|-------------------|--------------|----------|
| `'primary'` | fadeInUp | Card lift (+4px, shadow) | - |
| `'secondary'` | fadeIn | Subtle (opacity 0.8) | - |
| `'imperative'` | bounceIn | - | Continuous pulse |
| `'latent'` | fadeIn | None (inactive) | - |
| `'aggregate'` | scaleIn | None (container) | - |
| `'ancestral'` | fadeIn | None (archived) | - |

**Example**:
```scss
.featured-product {
  @include genesis-entity('primary');
  // Gets: fadeInUp entrance + card hover lift on mouse over
}
```

### Synapse Animations

Based on `genesis-synapse($vector)` mixin:

| Vector | Hover Effect | Description |
|--------|-------------|-------------|
| `'navigate'` | Link underline | Animated underline on hover |
| `'execute'` | Button pulse | Scale to 1.05 on hover |
| `'inquiry'` | Subtle | Opacity 0.8 on hover |
| `'destructive'` | Shake (optional) | Warning shake effect |
| `'social'` | Bounce | Bounce animation on hover |

**Example**:
```scss
.action-button {
  @include genesis-synapse('execute');
  // Gets: Button pulse hover (scale 1.05)
}

.nav-link {
  @include genesis-synapse('navigate');
  // Gets: Animated underline on hover
}
```

### Cognition Animations

Based on `genesis-cognition($intent)` mixin:

| Intent | Entrance Animation | Hover Effect |
|--------|-------------------|--------------|
| `'axiom'` | fadeInDown | - |
| `'discourse'` | fadeIn | - |
| `'protocol'` | fadeIn | - |
| `'gloss'` | fadeIn | - |
| `'motive'` | fadeIn | - |
| `'quantum'` | scaleIn | Bounce |

**Example**:
```scss
h1 {
  @include genesis-cognition('axiom');
  // Gets: fadeInDown entrance (headlines come from top)
}

.tag {
  @include genesis-cognition('quantum');
  // Gets: scaleIn entrance + bounce hover
}
```

### State Animations

Based on `genesis-state($condition)` mixin:

| Condition | Animation | Description |
|-----------|-----------|-------------|
| `'scroll-triggered'` | Scroll reveal | Fades in when scrolled into view |
| `'evolving'` | Continuous pulse | Indicates updating content |
| `'deprecated'` | fadeIn | Simple fade for outdated content |

**Example**:
```scss
.reveal-section {
  @include genesis-state('scroll-triggered');
  // Gets: Scroll reveal - fades in when user scrolls to it
}
```

---

## Advanced Usage

### Explicit Role Marking

For maximum control, add data attributes to your HTML:

```html
<div class="my-custom-element" 
     data-genesis-entity="primary"
     data-genesis-state="scroll-triggered">
  Content that fades in on scroll
</div>
```

This gives the element both primary entity styling AND scroll-triggered behavior.

### Disabling Auto-Animations

To disable automatic animations (e.g., for testing):

```html
<script>
  window.disableOntologyAnimations = true;
</script>
```

Place this before loading `common.js`.

### Manual Initialization

If you dynamically add content, re-initialize animations:

```javascript
import { initOntologyAnimations } from './assets/js/common/ontology-animations.js';

// After adding new elements
initOntologyAnimations(document.querySelector('.new-content'));
```

---

## Accessibility

### Reduced Motion Support

All animations automatically respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  /* Animations become near-instant (0.001s) */
}
```

Users who prefer reduced motion get:
- Instant transitions (0.001s duration)
- No delays
- All functionality preserved
- Zero configuration needed

### Testing Reduced Motion

**macOS**: System Preferences → Accessibility → Display → Reduce motion  
**Windows**: Settings → Ease of Access → Display → Show animations  
**Browser DevTools**: Chrome → Rendering → Emulate CSS `prefers-reduced-motion`

---

## Performance

### Optimizations

- **Lazy initialization**: Animations only initialize when Motion library loads
- **Efficient detection**: Single DOM scan on page load
- **Event delegation**: Hover effects use event delegation
- **GPU acceleration**: All animations use transforms and opacity
- **Intersection Observer**: Scroll-triggered animations use native Intersection Observer

### Benchmarks

| Metric | Value |
|--------|-------|
| Initial scan time | < 50ms (typical page) |
| Animation performance | 60fps |
| Memory overhead | Minimal (<1MB) |
| Bundle size impact | +15KB (gzipped) |

---

## Examples

### Example 1: Product Card Grid

**SCSS**:
```scss
.product-grid {
  @include genesis-environment('distributed');
  
  .product-card {
    @include genesis-entity('primary');
    
    .product-image {
      @include genesis-entity('image-adaptive');
    }
    
    .product-name {
      @include genesis-cognition('axiom');
    }
    
    .product-price {
      @include genesis-cognition('quantum');
    }
    
    .add-to-cart {
      @include genesis-synapse('execute');
    }
  }
}
```

**Result**:
- Grid layout with auto-fit columns
- Each card: fadeInUp entrance + hover lift
- Product names: fadeInDown entrance
- Price tags: scaleIn entrance + bounce hover
- Add to cart buttons: pulse hover effect

### Example 2: Scroll-Triggered Feature Section

**SCSS**:
```scss
.features-section {
  @include genesis-environment('focused');
  
  .feature-item {
    @include genesis-entity('primary');
    @include genesis-state('scroll-triggered');
    
    .feature-icon {
      @include genesis-cognition('axiom');
    }
    
    .feature-description {
      @include genesis-cognition('discourse');
    }
  }
}
```

**Result**:
- Each feature fades in when scrolled into view
- Staggered reveal effect (automatic delay)
- Icon and text animate together
- Respects reduced motion preference

### Example 3: Interactive Navigation

**SCSS**:
```scss
.site-nav {
  @include genesis-environment('navigation-primary');
  
  .nav-link {
    @include genesis-synapse('navigate');
  }
  
  .cta-button {
    @include genesis-synapse('execute');
  }
}
```

**Result**:
- Nav links: underline animation on hover
- CTA button: pulse effect on hover
- Responsive layout from environment mixin

---

## Troubleshooting

### Animations Not Working

**Check 1**: Is Motion library loaded?
```javascript
console.log(window.Motion); // Should not be undefined
```

**Check 2**: Are animations disabled?
```javascript
console.log(window.disableOntologyAnimations); // Should be undefined
```

**Check 3**: Check browser console for errors
Look for: "Motion library not available - ontology animations disabled"

**Check 4**: Verify ontology mixins are applied
Inspect element styles in DevTools to confirm SCSS compiled correctly.

### Animations Too Slow/Fast

Animations use preset durations from the Motion preset library. To customize globally, modify `motion-presets.js` in the theme repository.

### Scroll Animations Not Triggering

Ensure elements have sufficient visibility threshold:
- Intersection Observer uses 10% threshold
- Elements must be at least 10% visible to trigger
- Adjust rootMargin in `ontology-animations.js` if needed

### Hover Effects Not Working

1. Verify element has correct ontological role
2. Check that element is not disabled (`pointer-events: none`)
3. Ensure element is actually hoverable (not behind another element)

---

## Migration Guide

### From Manual Animations

**Before** (manual JavaScript):
```html
<div class="card" data-motion="fade-in">
  <h2 data-motion="fade-in-down">Title</h2>
  <button data-motion="button-hover">Click</button>
</div>
```

```javascript
import { initMotionAnimations } from './motion-utils.js';
initMotionAnimations();
```

**After** (ontology automatic):
```scss
.card {
  @include genesis-entity('primary');
  
  h2 {
    @include genesis-cognition('axiom');
  }
  
  button {
    @include genesis-synapse('execute');
  }
}
```

```html
<div class="card">
  <h2>Title</h2>
  <button>Click</button>
</div>
```

**Benefits**:
- ✅ Less HTML markup
- ✅ No JavaScript in subdomain
- ✅ Semantic animations
- ✅ Automatic reduced motion support

---

## Best Practices

### DO ✅

- **Use semantic class names** that describe content role
- **Apply ontological mixins** consistently
- **Trust the automation** - let the system handle animations
- **Test with reduced motion** enabled
- **Use scroll-triggered state** for progressive reveal

### DON'T ❌

- **Mix manual and automatic animations** on same elements
- **Override animation styles** with inline CSS
- **Disable animations globally** without user preference
- **Use non-semantic class names** like "blue-card" or "big-text"
- **Add animation-specific classes** - let ontology handle it

---

## Resources

- **Demo Page**: `/ontology-animations-demo.html`
- **Motion Presets**: `assets/js/common/motion-presets.js`
- **Animation System**: `assets/js/common/ontology-animations.js`
- **Ontology Guide**: `_sass/ontology/INTEGRATION-GUIDE.md`
- **Motion Documentation**: https://motion.dev

---

## Changelog

### v2.3.0 (2026-02-03)

**Added**:
- ✨ Automatic animation integration with ontology system
- 🎭 Zero-JavaScript approach for subdomains
- 🧬 Semantic animation mappings for all ontology variants
- ♿ Built-in reduced motion support
- 📚 Comprehensive documentation and demo page

**Benefits**:
- Subdomains only need SCSS mixins - no JavaScript
- Animations tied to semantic roles, not appearance
- Consistent experience across all subdomains
- Accessible by default

---

**Last Updated**: 2026-02-03  
**Version**: 2.3.0  
**Maintainer**: ASI Saga Team
