# CSS Performance Optimization Guide

**Version**: 1.0.0  
**For**: scss-refactor-agent skill  
**Purpose**: Performance best practices for fast, efficient stylesheets

---

## Table of Contents

1. [Performance Metrics](#performance-metrics)
2. [CSS Loading Strategies](#css-loading-strategies)
3. [Rendering Performance](#rendering-performance)
4. [Optimization Techniques](#optimization-techniques)
5. [Animation Performance](#animation-performance)
6. [Build-Time Optimization](#build-time-optimization)
7. [Monitoring & Testing](#monitoring--testing)

---

## Performance Metrics

### 1. Core Web Vitals

**Largest Contentful Paint (LCP)**
- **Target**: < 2.5s
- **CSS Impact**: Block rendering, large stylesheets
- **Optimization**: Critical CSS inlining, async loading

**First Input Delay (FID)**
- **Target**: < 100ms
- **CSS Impact**: Heavy animations, layout thrashing
- **Optimization**: GPU-accelerated properties, debouncing

**Cumulative Layout Shift (CLS)**
- **Target**: < 0.1
- **CSS Impact**: Missing dimensions, font loading, late-loaded CSS
- **Optimization**: Size reservations, font-display, stable layouts

### 2. CSS-Specific Metrics

**Time to First Byte (TTFB)**
- CSS delivery speed
- Server-side processing
- CDN effectiveness

**CSS Parse Time**
- Selector complexity
- File size
- Browser efficiency

**Style Recalculation Time**
- Dynamic changes
- DOM complexity
- Selector specificity

**Layout & Paint Time**
- Geometric changes
- Visual updates
- Composite layers

### 3. Performance Budgets

**Genesis Targets**:
```
Critical CSS: < 14KB (inline)
Main CSS:     < 50KB (gzipped)
Total CSS:    < 100KB (gzipped)

Parse time:   < 50ms
Recalc time:  < 50ms
Paint time:   < 16ms (60fps)
```

---

## CSS Loading Strategies

### 1. Critical CSS Inlining

**Strategy**: Inline above-the-fold CSS for instant rendering

**Implementation**:
```html
<head>
  <!-- Critical inline CSS (< 14KB) -->
  <style>
    /* Base styles */
    /* Above-fold component styles */
    /* Genesis entity('primary') for hero section */
  </style>
  
  <!-- Async load full CSS -->
  <link rel="preload" href="main.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="main.css"></noscript>
</head>
```

**Tools**:
- [Critical](https://github.com/addyosmani/critical) - Extract critical CSS
- [Penthouse](https://github.com/pocketjoso/penthouse) - Critical path CSS
- [Critters](https://github.com/GoogleChromeLabs/critters) - Webpack plugin

### 2. Async CSS Loading

**Pattern**: Non-blocking CSS delivery

```html
<!-- Preload for high priority -->
<link rel="preload" href="styles.css" as="style">

<!-- Async load via media hack -->
<link rel="stylesheet" href="styles.css" media="print" onload="this.media='all'">

<!-- Fallback for no-JS -->
<noscript>
  <link rel="stylesheet" href="styles.css">
</noscript>
```

### 3. Progressive Loading

**Strategy**: Load styles based on viewport/interaction

```html
<!-- Above-fold (inline) -->
<style>/* Critical styles */</style>

<!-- Below-fold (async) -->
<link rel="preload" href="below-fold.css" as="style">

<!-- Interactive features (defer) -->
<link rel="stylesheet" href="interactive.css" media="(hover: hover)">

<!-- Print styles (conditional) -->
<link rel="stylesheet" href="print.css" media="print">
```

### 4. Resource Hints

**Optimize Loading**:
```html
<!-- DNS lookup -->
<link rel="dns-prefetch" href="https://fonts.googleapis.com">

<!-- Early connection -->
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Preload critical assets -->
<link rel="preload" href="styles.css" as="style">
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>

<!-- Prefetch future navigation -->
<link rel="prefetch" href="next-page.css">
```

---

## Rendering Performance

### 1. GPU-Accelerated Properties

**Fast Properties** (GPU-accelerated):
```scss
// ✅ Use these for animations
.element {
  transform: translateX(100px);
  opacity: 0.5;
  filter: blur(5px);
  
  transition: transform 0.3s, opacity 0.3s;
}
```

**Slow Properties** (CPU-bound):
```scss
// ❌ Avoid animating these
.element {
  margin-left: 100px;  // Triggers layout
  width: 50%;          // Triggers layout
  color: red;          // Triggers paint
  background: blue;    // Triggers paint
}
```

### 2. Composite Layers

**Strategy**: Promote to composite layer for smooth animations

```scss
.animated-element {
  // Create new layer
  will-change: transform;
  
  // Or use transform: translateZ(0) hack
  transform: translateZ(0);
  
  // Animation on composite properties only
  &:hover {
    transform: scale(1.1);
  }
}
```

**⚠️ Warning**: Don't overuse `will-change`
```scss
// ❌ Bad: Too many layers
* {
  will-change: transform; // Memory intensive
}

// ✅ Good: Targeted use
.menu-item:hover {
  will-change: transform;
}

.menu-item:not(:hover) {
  will-change: auto; // Release layer
}
```

### 3. Paint Optimization

**Reduce Paint Areas**:
```scss
// ✅ Isolate changing elements
.animated-section {
  contain: layout paint; // Isolate from rest of page
}

// ✅ Use pseudo-elements for effects
.card::before {
  // Glow effect on separate layer
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s;
}

.card:hover::before {
  opacity: 1;
}
```

### 4. Layout Thrashing Prevention

**❌ Bad**: Read then write (forces layout)
```javascript
// JavaScript example (avoid)
const height = element.offsetHeight; // Read (layout)
element.style.height = height + 10 + 'px'; // Write (layout)
```

**✅ Good**: Batch reads and writes
```javascript
// Batch all reads
const height1 = element1.offsetHeight;
const height2 = element2.offsetHeight;

// Then all writes
element1.style.height = height1 + 10 + 'px';
element2.style.height = height2 + 10 + 'px';
```

**Genesis Approach**: Use CSS for dynamic sizing
```scss
.dynamic-element {
  // Let CSS handle sizing
  min-height: clamp(200px, 50vh, 500px);
  
  // No JavaScript measurement needed
}
```

---

## Optimization Techniques

### 1. Selector Performance

**Fast Selectors**:
```scss
// ✅ Class selectors (fastest)
.component {}

// ✅ Single class
.button {}
```

**Slow Selectors**:
```scss
// ❌ Universal selector
* {}

// ❌ Deep descendant
.page .section .container .card .title {}

// ❌ Attribute selectors (without namespace)
[data-whatever="value"] {}

// ❌ Pseudo-class chains
:not(.a):not(.b):not(.c) {}
```

**Genesis Optimization**:
```scss
// ✅ Limit nesting to 3 levels (enforced by linter)
.component {
  .element {
    .nested {
      // Max depth
    }
  }
}
```

### 2. Specificity Management

**Minimize Specificity**:
```scss
// ❌ High specificity
#header .navigation ul li a.active {}

// ✅ Low specificity
.nav-link--active {}
```

**Genesis Approach**:
```scss
// Single class with mixin
.nav-link {
  @include genesis-synapse('navigate');
  
  &--active {
    @include genesis-state('stable');
  }
}
```

### 3. Shorthand Properties

**Use Shorthand**:
```scss
// ❌ Verbose
.element {
  margin-top: 1rem;
  margin-right: 2rem;
  margin-bottom: 1rem;
  margin-left: 2rem;
}

// ✅ Shorthand
.element {
  margin: 1rem 2rem;
}

// ✅ Genesis (automatic via mixins)
.element {
  @include genesis-entity('primary');
  // Shorthand used internally
}
```

### 4. CSS Containment

**Isolation Benefits**:
```scss
.component {
  // Isolate layout calculations
  contain: layout style;
  
  // Create stacking context
  isolation: isolate;
}
```

**Genesis Implementation**:
```scss
@mixin genesis-environment($logic) {
  // Automatic containment for performance
  contain: layout style;
  isolation: isolate;
  
  // Layout implementation
  @if $logic == 'distributed' {
    display: grid;
    // ...
  }
}
```

### 5. Remove Unused CSS

**Tools**:
```bash
# PurgeCSS
npx purgecss --css style.css --content index.html --output clean.css

# UnCSS
npm install -g uncss
uncss https://example.com > clean.css
```

**Genesis Advantage**:
- Ontology mixins only include needed styles
- No utility classes generating unused CSS
- Semantic approach naturally tree-shakeable

---

## Animation Performance

### 1. 60fps Animations

**Requirements**:
- Frame budget: 16.67ms (60fps)
- Use GPU-accelerated properties only
- Minimize paint and layout

**Genesis Animations**:
```scss
@mixin genesis-atmosphere($vibe) {
  @if $vibe == 'vibrant' {
    // GPU-only properties
    transition: transform var(--motion-fluid),
                opacity var(--motion-fluid);
  }
  
  // Respect accessibility
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
}
```

### 2. Animation Best Practices

**✅ DO**:
```scss
.element {
  // Animate transform and opacity only
  transition: transform 0.3s ease-out,
              opacity 0.3s ease-out;
  
  &:hover {
    transform: scale(1.05);
    opacity: 0.9;
  }
}
```

**❌ DON'T**:
```scss
.element {
  // Don't animate layout properties
  transition: width 0.3s, height 0.3s, left 0.3s;
  
  &:hover {
    width: 200px;  // Triggers layout
    height: 200px; // Triggers layout
    left: 50px;    // Triggers layout
  }
}
```

### 3. Motion Reduction

**Accessibility Compliance**:
```scss
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

### 4. requestAnimationFrame

**For JavaScript Animations**:
```javascript
// ✅ Good: Use RAF
function animate() {
  element.style.transform = `translateX(${x}px)`;
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

// ❌ Bad: setInterval
setInterval(() => {
  element.style.transform = `translateX(${x}px)`;
}, 16);
```

---

## Build-Time Optimization

### 1. Minification

**Tools**:
```bash
# cssnano (recommended)
npm install cssnano postcss-cli
npx postcss styles.css --use cssnano -o styles.min.css

# clean-css
npm install -g clean-css-cli
cleancss -o styles.min.css styles.css
```

**Results**:
```
Original:  120 KB
Minified:   85 KB (-29%)
Gzipped:    28 KB (-77% from original)
```

### 2. Autoprefixer

**Cross-Browser Compatibility**:
```bash
npm install autoprefixer postcss-cli
npx postcss styles.css --use autoprefixer -o prefixed.css
```

**PostCSS Config** (postcss.config.js):
```javascript
module.exports = {
  plugins: [
    require('autoprefixer')({
      overrideBrowserslist: ['> 1%', 'last 2 versions']
    }),
    require('cssnano')({
      preset: 'default'
    })
  ]
}
```

### 3. CSS Modules / Scope

**Prevent Naming Conflicts**:
```scss
// Component scoping
.Button_button_3xkj2 {
  @include genesis-synapse('execute');
}

// Or use Shadow DOM
:host {
  @include genesis-entity('primary');
}
```

### 4. Tree Shaking

**Genesis Advantage**:
```scss
// Only imported mixins are included
@import "ontology/index";

.my-component {
  @include genesis-entity('primary');
  // Only 'primary' implementation compiled
}
```

---

## Monitoring & Testing

### 1. Performance Profiling

**Chrome DevTools**:
1. Open DevTools → Performance tab
2. Record while interacting
3. Check for:
   - Long recalc style times
   - Excessive layout
   - Paint flashing

**Rendering Panel**:
1. DevTools → More Tools → Rendering
2. Enable "Paint flashing"
3. Minimize painted areas on interaction

### 2. Lighthouse Audits

**Run Audit**:
```bash
# CLI
npm install -g lighthouse
lighthouse https://example.com --view

# Or use Chrome DevTools → Lighthouse tab
```

**Key Metrics**:
- Performance score
- First Contentful Paint
- Time to Interactive
- Cumulative Layout Shift
- Unused CSS percentage

### 3. Coverage Analysis

**Chrome DevTools Coverage**:
1. DevTools → More Tools → Coverage
2. Reload page
3. Check unused CSS percentage
4. Remove unused rules

**Target**: < 20% unused CSS

### 4. WebPageTest

**Test Multiple Conditions**:
```
URL: https://webpagetest.org
Test from: Multiple global locations
Connection: 3G, 4G, Cable
Browser: Chrome, Firefox, Safari
```

**Analyze**:
- Waterfall chart
- Start render time
- CSS blocking time
- Byte distribution

### 5. Continuous Monitoring

**Performance Budget**:
```json
{
  "budget": {
    "css": {
      "max-size": "50kb",
      "max-requests": 2
    },
    "performance": {
      "fcp": "2s",
      "lcp": "2.5s",
      "cls": "0.1"
    }
  }
}
```

**CI Integration**:
```bash
# Bundle size checking
npm install -g bundlesize
bundlesize
```

---

## Quick Optimization Checklist

### CSS Loading
- [ ] Critical CSS inlined (< 14KB)
- [ ] Full CSS loaded asynchronously
- [ ] Resource hints configured (preload, prefetch)
- [ ] Font loading optimized (font-display: swap)

### Code Quality
- [ ] Minified for production
- [ ] Autoprefixed for browser support
- [ ] Unused CSS removed
- [ ] Selectors optimized (max depth 3)

### Rendering
- [ ] Animations use GPU properties only
- [ ] Containment applied to components
- [ ] No layout thrashing
- [ ] will-change used sparingly

### Accessibility
- [ ] prefers-reduced-motion supported
- [ ] prefers-contrast supported
- [ ] No rapid animations (< 3 flashes/sec)

### Testing
- [ ] Lighthouse score > 90
- [ ] Unused CSS < 20%
- [ ] CSS size < 50KB gzipped
- [ ] LCP < 2.5s
- [ ] CLS < 0.1

---

## Performance Anti-Patterns

### ❌ Avoid These

**1. Excessive Nesting**
```scss
// ❌ Bad
.page .section .container .wrapper .card .header .title {
  // Too specific, slow selector
}
```

**2. Universal Selectors**
```scss
// ❌ Bad
* {
  box-sizing: border-box; // Recalculates everything
}

// ✅ Better
*, *::before, *::after {
  box-sizing: inherit;
}

html {
  box-sizing: border-box;
}
```

**3. @import in CSS**
```css
/* ❌ Bad: Blocks rendering */
@import url('other.css');

/* ✅ Good: Use link tags or SCSS @import */
```

**4. Large Background Images**
```scss
// ❌ Bad
.hero {
  background: url('huge-image.jpg');
}

// ✅ Good: Use responsive images
.hero {
  background: url('hero-small.jpg');
}

@media (min-width: 768px) {
  .hero {
    background: url('hero-medium.jpg');
  }
}
```

**5. Inline Styles**
```html
<!-- ❌ Bad: Not cacheable, not reusable -->
<div style="color: red; font-size: 16px;">

<!-- ✅ Good: Use classes -->
<div class="error-message">
```

---

## Genesis Performance Benefits

### Built-In Optimizations

**1. Zero Duplication**
- Single ontology import prevents duplicate styles
- Semantic engine ensures no redundant CSS
- Mixins reuse implementation internally

**2. Automatic Containment**
- All environment mixins use `contain: layout style`
- Isolated stacking contexts via `isolation: isolate`
- Optimized layout calculations

**3. Efficient Selectors**
- Single-class selectors (fastest)
- Max 3 nesting levels (enforced)
- No universal selectors

**4. Smart Defaults**
- GPU-accelerated animations only
- Reduced motion support built-in
- High contrast support built-in

**5. Tree-Shakeable**
- Only used mixins compiled
- No utility class bloat
- Modular architecture

---

## Resources

### Tools
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WebPageTest](https://www.webpagetest.org/)
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)
- [PurgeCSS](https://purgecss.com/)

### Documentation
- [Web.dev Performance](https://web.dev/performance/)
- [MDN Performance](https://developer.mozilla.org/en-US/docs/Web/Performance)
- [CSS Triggers](https://csstriggers.com/)

### Genesis Resources
- `_sass/ontology/INTEGRATION-GUIDE.md` - Ontological API
- `.github/instructions/scss.instructions.md` - SCSS standards
- `WEB-DESIGN-GUIDELINES.md` - Modern best practices

---

**Version**: 1.0.0  
**Aligned with**: Genesis Semantic Design System v2.1+  
**Last Updated**: 2026-01-29  
**Maintained by**: scss-refactor-agent skill
