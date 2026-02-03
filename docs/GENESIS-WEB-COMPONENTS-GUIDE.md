# Genesis Web Components - Complete Guide

**Version**: 2.0  
**Date**: 2026-02-03  
**Architecture**: Ontological Web Components

---

## Overview

Genesis Web Components provide a **natural HTML extension** approach to the ontological design system. Instead of JavaScript scanning the DOM for class patterns, components extend HTML with built-in animation behavior through Web Components lifecycle methods.

### Why Web Components?

**Problem with v1.0** (DOM Scanning):
- Felt "unnatural" - JavaScript programmatically detecting and animating elements
- Implicit pattern matching - inferred roles from class names
- Single point in time - scanned once on DOMContentLoaded
- Difficult to debug - animations applied via side effects

**Solution with v2.0** (Web Components):
- **Natural** - `<genesis-entity>` feels like native HTML
- **Explicit** - `nature="primary"` declares intent directly
- **Lifecycle-driven** - Animations tied to component lifecycle (mount/unmount)
- **Reactive** - Responds to attribute changes automatically

---

## Architecture

### Component Hierarchy

```
GenesisElement (base class)
├── GenesisEntity (content blocks)
├── GenesisSynapse (interactions)
├── GenesisCognition (typography)
└── GenesisState (temporal states)
```

### Separation of Concerns

| Layer | Responsibility | Location |
|-------|---------------|----------|
| **HTML** | Semantic structure with explicit ontological roles | `.html` files |
| **SCSS** | Visual appearance (colors, layout, typography) | `.scss` files |
| **Web Component** | Animation behavior (entrance, hover, emphasis) | `.js` modules |

**Key Principle**: No inline HTML/SCSS in JavaScript. Components are transparent containers.

---

## Components Reference

### 1. `<genesis-entity>`

Represents ontological content blocks with visual presence.

**File**: `assets/js/common/genesis-entity.js`

**Attributes**:
- `nature` (required): `primary|secondary|imperative|latent|aggregate|ancestral`
- `scroll-reveal` (optional): Enable scroll-triggered animation

**Usage**:
```html
<genesis-entity nature="primary">
  <h2>My Card Title</h2>
  <p>Card content goes here</p>
</genesis-entity>
```

**SCSS Integration**:
```scss
genesis-entity {
  @include genesis-entity('primary');
}

genesis-entity[nature="secondary"] {
  @include genesis-entity('secondary');
}
```

**Animation Mappings**:
| Nature | Entrance | Hover | Emphasis |
|--------|----------|-------|----------|
| `primary` | fadeInUp | Card lift (+4px) | - |
| `secondary` | fadeIn | Subtle (opacity 0.8) | - |
| `imperative` | bounceIn | - | Continuous pulse |
| `latent` | fadeIn | None | - |
| `aggregate` | scaleIn | None | - |
| `ancestral` | fadeIn | None | - |

---

### 2. `<genesis-synapse>`

Represents ontological interactions (buttons, links, actions).

**File**: `assets/js/common/genesis-synapse.js`

**Attributes**:
- `vector` (required): `navigate|execute|inquiry|destructive|social`

**Usage**:
```html
<genesis-synapse vector="execute">
  <button>Click Me</button>
</genesis-synapse>

<genesis-synapse vector="navigate">
  <a href="/page">Go to Page</a>
</genesis-synapse>
```

**SCSS Integration**:
```scss
genesis-synapse[vector="execute"] {
  @include genesis-synapse('execute');
}
```

**Animation Mappings**:
| Vector | Hover | Click |
|--------|-------|-------|
| `navigate` | Link underline | - |
| `execute` | Button pulse (scale 1.05) | Press effect |
| `inquiry` | Subtle opacity | - |
| `destructive` | Shake (warning) | - |
| `social` | Bounce | Heartbeat |

---

### 3. `<genesis-cognition>`

Represents ontological information types (typography).

**File**: `assets/js/common/genesis-cognition.js`

**Attributes**:
- `intent` (required): `axiom|discourse|protocol|gloss|motive|quantum`

**Usage**:
```html
<genesis-cognition intent="axiom">
  <h1>Headline Text</h1>
</genesis-cognition>

<genesis-cognition intent="quantum">Tag</genesis-cognition>
```

**SCSS Integration**:
```scss
genesis-cognition[intent="axiom"] {
  @include genesis-cognition('axiom');
}
```

**Animation Mappings**:
| Intent | Entrance | Hover |
|--------|----------|-------|
| `axiom` | fadeInDown | - |
| `discourse` | fadeIn | - |
| `protocol` | fadeIn | - |
| `gloss` | fadeIn | - |
| `motive` | fadeIn | - |
| `quantum` | scaleIn | Bounce |

---

### 4. `<genesis-state>`

Represents ontological temporal states.

**File**: `assets/js/common/genesis-state.js`

**Attributes**:
- `condition` (required): `stable|evolving|deprecated|locked|simulated|scroll-triggered`

**Usage**:
```html
<genesis-state condition="evolving">
  <div>Updating content...</div>
</genesis-state>

<genesis-state condition="scroll-triggered">
  <div>Reveals on scroll</div>
</genesis-state>
```

**SCSS Integration**:
```scss
genesis-state[condition="evolving"] {
  @include genesis-state('evolving');
}
```

**Animation Mappings**:
| Condition | Entrance | Emphasis |
|-----------|----------|----------|
| `stable` | fadeIn | - |
| `evolving` | fadeIn | Continuous pulse |
| `deprecated` | fadeIn | - |
| `locked` | fadeIn | - |
| `simulated` | fadeIn | - |
| `scroll-triggered` | fadeInUp | - |

---

## Lifecycle Methods

Web Components use standard lifecycle callbacks:

### `connectedCallback()`

Called when component is added to the DOM.

**Actions**:
1. Wait for Motion library to load
2. Apply entrance animation based on component type and attributes
3. Setup interaction handlers (hover, click)
4. Setup scroll observer if needed

### `disconnectedCallback()`

Called when component is removed from the DOM.

**Actions**:
1. Cancel all running animations
2. Disconnect intersection observers
3. Clean up event listeners

### `attributeChangedCallback(name, oldValue, newValue)`

Called when observed attributes change.

**Actions**:
1. Clean up existing animations
2. Re-apply animations with new attribute values
3. Update interaction handlers

---

## Advanced Features

### Scroll-Triggered Animations

Use `scroll-reveal` attribute or `condition="scroll-triggered"`:

```html
<genesis-entity nature="primary" scroll-reveal>
  Content fades in when scrolled into view
</genesis-entity>

<genesis-state condition="scroll-triggered">
  Another way to achieve scroll reveal
</genesis-state>
```

**How it works**:
- Uses Intersection Observer API
- Triggers when element is 10% visible
- Automatically disconnects after triggering (runs once)

### Stagger Delays

Components automatically stagger when multiple of the same type are siblings:

```html
<div>
  <genesis-entity nature="primary">Card 1</genesis-entity>
  <!-- Delay: 0ms -->
  
  <genesis-entity nature="primary">Card 2</genesis-entity>
  <!-- Delay: 100ms -->
  
  <genesis-entity nature="primary">Card 3</genesis-entity>
  <!-- Delay: 200ms -->
</div>
```

**Implementation**: `_getStaggerDelay()` method calculates delay based on sibling index.

### Reduced Motion Support

All components automatically respect user preferences:

```javascript
if (this._prefersReducedMotion()) {
  options.duration = 0.001;  // Near-instant
  options.delay = 0;         // No delay
}
```

**Testing**:
- **macOS**: System Preferences → Accessibility → Display → Reduce motion
- **Windows**: Settings → Ease of Access → Display → Show animations
- **Browser**: DevTools → Rendering → Emulate CSS `prefers-reduced-motion`

---

## Migration Guide

### From v1.0 (DOM Scanning) to v2.0 (Web Components)

**Old Approach** (v1.0):
```html
<div class="card">
  <h2>My Card</h2>
  <p>Content here</p>
</div>

<!-- JavaScript scans for "card" class and applies animation -->
```

**New Approach** (v2.0):
```html
<genesis-entity nature="primary">
  <h2>My Card</h2>
  <p>Content here</p>
</genesis-entity>

<!-- Component animates automatically on mount -->
```

### Migration Steps

1. **Replace wrapper divs with Web Components**
   ```html
   <!-- Before -->
   <div class="product-card">...</div>
   
   <!-- After -->
   <genesis-entity nature="primary">...</genesis-entity>
   ```

2. **Add explicit attributes**
   ```html
   <!-- Before (implicit) -->
   <div class="card"><!-- Inferred as entity('primary') --></div>
   
   <!-- After (explicit) -->
   <genesis-entity nature="primary">...</genesis-entity>
   ```

3. **Update SCSS selectors**
   ```scss
   /* Before */
   .card {
     @include genesis-entity('primary');
   }
   
   /* After */
   genesis-entity {
     @include genesis-entity('primary');
   }
   
   /* Or with attribute selector */
   genesis-entity[nature="primary"] {
     @include genesis-entity('primary');
   }
   ```

4. **Remove data attributes** (no longer needed)
   ```html
   <!-- Before -->
   <div class="card" data-genesis-entity="primary">...</div>
   
   <!-- After -->
   <genesis-entity nature="primary">...</genesis-entity>
   ```

### Migration Checklist

- [ ] Replace wrapper divs with appropriate Web Components
- [ ] Add explicit `nature`, `vector`, `intent`, or `condition` attributes
- [ ] Update SCSS selectors from classes to element selectors
- [ ] Remove old `data-genesis-*` attributes
- [ ] Test animations work correctly
- [ ] Verify reduced motion support
- [ ] Test scroll-triggered animations

---

## Best Practices

### DO ✅

- **Use semantic HTML inside components**
  ```html
  <genesis-entity nature="primary">
    <article>
      <h2>Title</h2>
      <p>Content</p>
    </article>
  </genesis-entity>
  ```

- **Use explicit attributes**
  ```html
  <genesis-entity nature="primary">  <!-- ✅ Clear -->
  ```

- **Keep SCSS separate**
  ```scss
  genesis-entity {
    @include genesis-entity('primary');  // Visual styling
  }
  // Component handles animation automatically
  ```

- **Nest components when semantically appropriate**
  ```html
  <genesis-entity nature="primary">
    <h2>Card Title</h2>
    <genesis-synapse vector="execute">
      <button>Action</button>
    </genesis-synapse>
  </genesis-entity>
  ```

### DON'T ❌

- **Don't add inline styles**
  ```html
  <genesis-entity style="color: red">  <!-- ❌ Use SCSS -->
  ```

- **Don't rely on class name inference**
  ```html
  <genesis-entity class="card">  <!-- ❌ Use nature attribute -->
  ```

- **Don't mix v1.0 and v2.0 approaches**
  ```html
  <div class="card" data-genesis-entity="primary">  <!-- ❌ Old approach -->
  <genesis-entity nature="primary">  <!-- ✅ New approach -->
  ```

- **Don't nest components unnecessarily**
  ```html
  <genesis-entity>
    <genesis-entity>
      <genesis-entity>  <!-- ❌ Too much nesting -->
  ```

---

## Troubleshooting

### Components Not Animating

**Check 1**: Verify Motion library is loaded
```javascript
console.log(window.Motion);  // Should not be undefined
```

**Check 2**: Check browser console for errors
Look for component registration messages:
```
Genesis Ontology Web Components initialized: {
  genesis-entity: true,
  genesis-synapse: true,
  ...
}
```

**Check 3**: Verify attributes are correct
```html
<genesis-entity nature="primary">  <!-- ✅ Correct -->
<genesis-entity nature="main">     <!-- ❌ Unknown nature -->
```

### Animations Too Fast/Slow

Animations use Motion presets. To customize:
1. Modify `motion-presets.js` in theme repository
2. Or pass custom options when calling `_applyPreset()`

### Hover Effects Not Working

1. Verify component has hover animation configured
2. Check that element is not disabled
3. Ensure element is clickable/hoverable (has `cursor: pointer`)

### Scroll Animations Not Triggering

1. Verify `scroll-reveal` attribute or `condition="scroll-triggered"`
2. Check element is actually scrolled into view (10% threshold)
3. Animation only triggers once - reload page to test again

---

## Performance

### Benchmarks

| Metric | v1.0 (DOM Scan) | v2.0 (Web Components) |
|--------|----------------|----------------------|
| **Initial Setup** | 50ms (DOM scan) | 0ms (lazy on mount) |
| **Animation Start** | DOMContentLoaded | connectedCallback |
| **Memory Overhead** | Global observers | Per-component cleanup |
| **Reactivity** | Manual re-scan | attributeChangedCallback |
| **Bundle Size** | 15KB | 18KB (+3KB) |

### Optimization Tips

1. **Lazy Load Components**: Import only when needed
2. **Use `scroll-reveal`**: Avoid animating off-screen content
3. **Limit Nesting**: Keep component hierarchy shallow
4. **Batch Attribute Changes**: Change multiple attributes together

---

## Browser Support

Web Components are supported in all modern browsers:

- ✅ Chrome 67+
- ✅ Firefox 63+
- ✅ Safari 10.1+
- ✅ Edge 79+

**Polyfills**: Not needed for modern browsers. For older browsers, use `@webcomponents/webcomponentsjs`.

---

## Examples

### Example 1: Product Card

```html
<genesis-entity nature="primary">
  <article class="product-card">
    <img src="product.jpg" alt="Product">
    
    <genesis-cognition intent="axiom">
      <h2>Product Name</h2>
    </genesis-cognition>
    
    <genesis-cognition intent="discourse">
      <p>Product description goes here...</p>
    </genesis-cognition>
    
    <div class="product-tags">
      <genesis-cognition intent="quantum">Featured</genesis-cognition>
      <genesis-cognition intent="quantum">New</genesis-cognition>
    </div>
    
    <genesis-synapse vector="execute">
      <button>Add to Cart</button>
    </genesis-synapse>
  </article>
</genesis-entity>
```

### Example 2: Scroll-Triggered Features

```html
<section class="features">
  <h2>Our Features</h2>
  
  <genesis-state condition="scroll-triggered">
    <div class="feature">
      <h3>Feature 1</h3>
      <p>Description...</p>
    </div>
  </genesis-state>
  
  <genesis-state condition="scroll-triggered">
    <div class="feature">
      <h3>Feature 2</h3>
      <p>Description...</p>
    </div>
  </genesis-state>
</section>
```

### Example 3: Live Updating Content

```html
<genesis-state condition="evolving">
  <div class="live-data">
    <span id="counter">Loading...</span>
  </div>
</genesis-state>

<script>
  // Update content - component keeps pulsing
  setInterval(() => {
    document.getElementById('counter').textContent = 
      Math.floor(Math.random() * 100);
  }, 2000);
</script>
```

---

## Resources

- **Demo Page**: `/genesis-web-components-demo.html`
- **Base Class**: `assets/js/common/genesis-element.js`
- **Components**: `assets/js/common/genesis-*.js`
- **Registration**: `assets/js/common/ontology-components.js`
- **Motion Presets**: `assets/js/common/motion-presets.js`

---

## Changelog

### v2.0 (2026-02-03)

**Added**:
- ✨ Complete Web Components architecture
- 🧬 Four ontological components (entity, synapse, cognition, state)
- 🔄 Lifecycle-driven animations (connectedCallback)
- 📝 Declarative attributes (nature, vector, intent, condition)
- 🎨 Clean separation: no inline HTML/SCSS in JavaScript
- ♿ Automatic reduced motion support
- 📊 Scroll-triggered animations with Intersection Observer
- 🎯 Stagger delays for sibling components

**Removed**:
- ❌ DOM scanning approach (ontology-animations.js deprecated)
- ❌ Class name pattern matching
- ❌ Implicit role inference

**Benefits**:
- Natural HTML extension (feels like native elements)
- Explicit intent (attributes over class inference)
- Reactive (responds to attribute changes)
- Maintainable (modular component architecture)

---

**Last Updated**: 2026-02-03  
**Version**: 2.0  
**Architecture**: Web Components  
**Maintainer**: ASI Saga Team
