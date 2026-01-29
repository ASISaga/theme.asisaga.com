# State-of-the-Art Web Design Guidelines

**Version**: 1.0.0  
**For**: scss-refactor-agent skill  
**Purpose**: Modern web design best practices for Genesis Semantic Design System

---

## Table of Contents

1. [Design Principles](#design-principles)
2. [Modern CSS Features](#modern-css-features)
3. [Responsive Design Patterns](#responsive-design-patterns)
4. [Color & Contrast](#color--contrast)
5. [Typography](#typography)
6. [Layout Systems](#layout-systems)
7. [Performance](#performance)
8. [Accessibility](#accessibility)
9. [Browser Compatibility](#browser-compatibility)

---

## Design Principles

### 1. Progressive Enhancement

**Philosophy**: Build from a solid foundation upward, ensuring core functionality works everywhere.

**Implementation**:
- Start with semantic HTML (works without CSS/JS)
- Layer on CSS for visual enhancement
- Add JavaScript for interactivity
- Use feature detection, not browser detection

**Genesis Approach**:
```scss
// Base semantic structure first
.content-card {
  @include genesis-entity('primary');
  
  // Enhanced features for capable browsers
  @supports (backdrop-filter: blur(10px)) {
    @include genesis-atmosphere('ethereal');
  }
}
```

### 2. Mobile-First Design

**Philosophy**: Design for mobile devices first, then progressively enhance for larger screens.

**Benefits**:
- Forces focus on essential content
- Better performance on mobile devices
- Easier to scale up than scale down
- Aligns with majority of web traffic

**Genesis Approach**:
```scss
// Mobile base (uses responsive mixins internally)
.product-grid {
  @include genesis-environment('distributed');
  // Automatically scales from mobile to desktop
}
```

### 3. Content-First Approach

**Philosophy**: Content should dictate design, not the other way around.

**Implementation**:
- Use semantic class names that describe content role
- Let content flow naturally with intrinsic sizing
- Avoid fixed dimensions when possible
- Use container queries for component-level responsiveness

**Genesis Approach**:
```scss
// Semantic naming reflects content purpose
.research-paper {
  @include genesis-environment('focused');  // Optimized for reading
  
  .paper-abstract {
    @include genesis-cognition('discourse');  // Body prose
  }
}
```

### 4. Performance Budget

**Philosophy**: Set and maintain performance budgets for optimal user experience.

**Targets**:
- **CSS Size**: < 50KB gzipped for critical CSS
- **Time to Interactive**: < 3.8s on 3G
- **First Contentful Paint**: < 1.8s
- **Cumulative Layout Shift**: < 0.1

**Genesis Approach**:
- Single ontology import prevents CSS bloat
- Atomic mixin system enables tree-shaking
- Zero duplicate styles via semantic engine

---

## Modern CSS Features

### 1. CSS Custom Properties (Variables)

**Use for**: Dynamic theming, responsive values, DRY code

**Genesis Integration**:
```scss
// Engine layer defines custom properties
:root {
  --space-bento: clamp(1rem, 3vw, 2rem);
  --glass-opacity: 0.85;
  --accent-consciousness: oklch(0.75 0.15 270);
}

// Mixins consume properties internally
@mixin genesis-entity($nature) {
  backdrop-filter: blur(calc(var(--glass-blur) * 1px));
  background: oklch(from var(--glass-base) l c h / var(--glass-opacity));
}
```

### 2. Container Queries

**Use for**: Component-level responsiveness independent of viewport

**Benefits**:
- Components adapt to their container, not viewport
- More modular and reusable components
- Better for design systems

**Genesis Integration**:
```scss
@mixin genesis-environment($logic) {
  @if $logic == 'distributed' {
    container-type: inline-size;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
    
    @container (min-width: 600px) {
      gap: var(--space-network);
    }
  }
}
```

### 3. Cascade Layers

**Use for**: Managing specificity and source order conflicts

**Benefits**:
- Explicit specificity control
- Easier third-party integration
- Cleaner cascade management

**Example**:
```scss
@layer base, components, utilities, overrides;

@layer base {
  @include genesis-entity('primary');
}

@layer utilities {
  // Higher priority utilities
}
```

### 4. Subgrid

**Use for**: Aligning nested grid items with parent grid

**Benefits**:
- Easier complex layouts
- Better alignment across nested elements
- Cleaner markup

**Example**:
```scss
.parent-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
}

.nested-grid {
  display: grid;
  grid-template-columns: subgrid;
  grid-column: span 6;
}
```

### 5. clamp() Function

**Use for**: Fluid, responsive sizing without media queries

**Genesis Integration**:
```scss
// Fluid typography
--font-size-axiom: clamp(2rem, 4vw + 1rem, 3.5rem);

// Fluid spacing
--space-bento: clamp(1rem, 3vw, 2rem);
```

### 6. Logical Properties

**Use for**: Internationalization and writing mode support

**Replace**:
- `margin-left` → `margin-inline-start`
- `margin-right` → `margin-inline-end`
- `margin-top` → `margin-block-start`
- `padding-left` → `padding-inline-start`

**Benefits**:
- Automatic RTL support
- Works with vertical writing modes
- More semantic

**Genesis Integration**:
```scss
@mixin genesis-entity($nature) {
  padding-inline: var(--space-bento);
  padding-block: var(--space-narrative);
  margin-block-end: var(--space-discourse);
}
```

### 7. :has() Selector

**Use for**: Parent selectors and advanced conditional styling

**Benefits**:
- Style parents based on children
- Conditional layouts without JavaScript
- More semantic CSS

**Example**:
```scss
// Card with image gets different layout
.card:has(img) {
  display: grid;
  grid-template-areas: "image content";
}

// Form with errors shows validation
.form:has(.error) {
  border-color: var(--accent-warning);
}
```

---

## Responsive Design Patterns

### 1. Intrinsic Web Design

**Philosophy**: Let content dictate size, use modern CSS for flexible layouts

**Key Techniques**:
- `auto-fit` and `auto-fill` for responsive grids
- `min()`, `max()`, `clamp()` for fluid sizing
- Flexbox with `flex-basis` for flexible components
- Container queries for component responsiveness

**Genesis Pattern**:
```scss
.gallery {
  @include genesis-environment('distributed');
  // Generates:
  // display: grid;
  // grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
}
```

### 2. Fluid Typography

**Best Practice**: Scale typography smoothly across viewport sizes

**Genesis Integration**:
```scss
@mixin genesis-cognition($intent) {
  @if $intent == 'axiom' {
    font-size: var(--font-size-axiom); // clamp(2rem, 4vw + 1rem, 3.5rem)
    line-height: 1.2;
  }
}
```

### 3. Touch Targets (WCAG 2.5.5)

**Requirement**: Minimum 44×44px touch targets for interactive elements

**Genesis Compliance**:
```scss
@mixin genesis-synapse($vector) {
  // All interactive elements get minimum touch target
  min-width: 44px;
  min-height: 44px;
  padding: var(--space-synapse); // Ensures size
}
```

### 4. Responsive Images

**Best Practices**:
- Use `srcset` and `sizes` for resolution switching
- Use `picture` element for art direction
- Use `loading="lazy"` for off-screen images
- Provide appropriate formats (WebP, AVIF)

**HTML Example**:
```html
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Description" loading="lazy">
</picture>
```

### 5. Viewport Units

**Modern Units**:
- `dvh` - Dynamic viewport height (accounts for mobile browser UI)
- `lvh` - Large viewport height (maximum)
- `svh` - Small viewport height (minimum)
- `vi` - Viewport inline (respects writing mode)
- `vb` - Viewport block (respects writing mode)

**Genesis Usage**:
```scss
.full-screen-hero {
  min-height: 100dvh; // Better than 100vh on mobile
  padding-inline: var(--space-bento);
}
```

---

## Color & Contrast

### 1. OKLCH Color Space

**Why OKLCH**:
- Perceptually uniform (equal changes = equal perceived differences)
- HDR-ready for modern displays
- Better interpolation than RGB/HSL
- Accessible contrast calculations

**Genesis Implementation**:
```scss
// Define in OKLCH
--accent-consciousness: oklch(0.75 0.15 270);
--text-primary: oklch(0.95 0.01 0);

// Relative colors for variations
--accent-hover: oklch(from var(--accent-consciousness) calc(l * 0.9) c h);
```

### 2. Contrast Requirements

**WCAG AA Standards**:
- **Normal text**: 4.5:1 minimum
- **Large text** (18pt+): 3:1 minimum
- **UI components**: 3:1 minimum

**Testing**:
```scss
// Genesis ensures text is solid color, never transparent
@mixin genesis-cognition($intent) {
  color: var(--text-primary); // Solid OKLCH value
  // NEVER: opacity < 0.9 on text (breaks contrast)
}
```

### 3. Color Meaning

**Best Practice**: Never rely on color alone to convey information

**Implementation**:
- Use icons + color for status
- Use text labels + color for actions
- Provide patterns/textures for charts

**Genesis Example**:
```scss
.status-indicator {
  @include genesis-state('stable');
  
  &::before {
    content: '✓'; // Icon reinforces color
  }
}
```

### 4. Dark Mode Support

**Best Practice**: Design for both light and dark from the start

**Genesis Approach**:
```scss
@media (prefers-color-scheme: dark) {
  :root {
    --glass-base: oklch(0.15 0.01 270);
    --text-primary: oklch(0.95 0.01 0);
  }
}
```

---

## Typography

### 1. Fluid Type Scale

**Best Practice**: Use clamp() for smooth scaling across viewports

**Genesis Scale**:
```scss
// Modular scale with fluid sizing
--font-size-quantum: clamp(0.7rem, 0.5vw + 0.6rem, 0.8rem);
--font-size-gloss: clamp(0.8rem, 0.7vw + 0.7rem, 0.875rem);
--font-size-discourse: clamp(1rem, 1vw + 0.9rem, 1.125rem);
--font-size-axiom: clamp(2rem, 4vw + 1rem, 3.5rem);
```

### 2. Line Height

**Best Practices**:
- **Body text**: 1.5 - 1.8 (optimal readability)
- **Headlines**: 1.1 - 1.3 (tighter for impact)
- **UI elements**: 1.0 - 1.2 (compact)

**Genesis Implementation**:
```scss
@mixin genesis-cognition($intent) {
  @if $intent == 'discourse' {
    line-height: 1.6; // Body text
  } @else if $intent == 'axiom' {
    line-height: 1.2; // Headlines
  }
}
```

### 3. Measure (Line Length)

**Best Practice**: 45-75 characters per line for optimal readability

**Genesis Implementation**:
```scss
@mixin genesis-environment($logic) {
  @if $logic == 'focused' {
    max-inline-size: 70ch; // Character-based width
    margin-inline: auto;
  }
}
```

### 4. Font Loading

**Best Practices**:
- Use `font-display: swap` to prevent FOIT (Flash of Invisible Text)
- Preload critical fonts
- Subset fonts for smaller file size
- Use variable fonts for efficiency

**Example**:
```scss
@font-face {
  font-family: 'CustomFont';
  src: url('font.woff2') format('woff2');
  font-display: swap;
  font-weight: 100 900; // Variable font
}
```

### 5. Hierarchy

**Best Practice**: Use size, weight, and color to establish clear hierarchy

**Genesis Semantic Approach**:
```scss
// Size represents information type, not just visual weight
.headline { @include genesis-cognition('axiom'); }      // Foundational
.body { @include genesis-cognition('discourse'); }      // Standard prose
.caption { @include genesis-cognition('gloss'); }       // Annotations
.tag { @include genesis-cognition('quantum'); }         // Micro-content
```

---

## Layout Systems

### 1. CSS Grid

**When to Use**:
- Two-dimensional layouts
- Precise control needed
- Complex alignment requirements

**Modern Patterns**:
```scss
// Auto-fit responsive grid
.grid-auto {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
  gap: var(--space-network);
}

// Named areas for semantic layouts
.page-layout {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 250px 1fr;
}
```

### 2. Flexbox

**When to Use**:
- One-dimensional layouts
- Unknown number of items
- Distributing space between items

**Modern Patterns**:
```scss
// Flex gap (better than margins)
.flex-container {
  display: flex;
  gap: var(--space-bento);
  flex-wrap: wrap;
}

// Auto-margins for alignment
.flex-item {
  margin-inline-start: auto; // Push to end
}
```

### 3. Containment

**Best Practice**: Use `contain` property for performance optimization

**Genesis Integration**:
```scss
@mixin genesis-environment($logic) {
  contain: layout style; // Isolate layout calculations
  isolation: isolate;    // Create stacking context
}
```

### 4. Spacing

**Best Practice**: Use consistent, proportional spacing system

**Genesis Tokens**:
```scss
--space-quantum: 0.25rem;     // 4px - Micro adjustments
--space-synapse: 0.5rem;      // 8px - Tight spacing
--space-gloss: 0.75rem;       // 12px - Small gaps
--space-discourse: 1rem;      // 16px - Standard spacing
--space-bento: clamp(1rem, 3vw, 2rem);      // Responsive
--space-narrative: clamp(1.5rem, 5vw, 3rem); // Large sections
```

---

## Performance

### 1. CSS Optimization

**Best Practices**:
- Minimize specificity
- Avoid deep nesting (max 3 levels)
- Use shorthand properties
- Combine similar selectors
- Remove unused CSS

**Genesis Enforcement**:
```scss
// Stylelint enforces max nesting: 3
.component {
  .element {
    .nested {
      // ✅ OK - 3 levels
    }
  }
}
```

### 2. Critical CSS

**Strategy**:
- Inline above-fold CSS
- Load full CSS asynchronously
- Preload critical resources

**Implementation**:
```html
<style>
  /* Critical inline CSS for above-fold content */
</style>
<link rel="preload" href="main.css" as="style">
<link rel="stylesheet" href="main.css" media="print" onload="this.media='all'">
```

### 3. Paint & Layout Performance

**Avoid**:
- Layout thrashing (reading then writing styles)
- Forced synchronous layouts
- Complex selectors (descendant, child combinators)

**Optimize**:
- Use `transform` and `opacity` for animations (GPU-accelerated)
- Batch DOM reads and writes
- Use `will-change` sparingly

**Genesis Animations**:
```scss
@mixin genesis-atmosphere($vibe) {
  @if $vibe == 'vibrant' {
    // GPU-accelerated properties only
    transition: transform var(--motion-fluid), opacity var(--motion-fluid);
  }
  
  @media (prefers-reduced-motion: reduce) {
    transition: none; // Respect user preference
  }
}
```

### 4. Asset Optimization

**Best Practices**:
- Minify CSS in production
- Use CSS custom properties for dynamic values (no JS required)
- Remove dead code
- Use tree-shaking with module bundlers

---

## Accessibility

### 1. Semantic HTML Foundation

**Requirements**:
- Use proper landmarks (`<header>`, `<main>`, `<nav>`, `<footer>`)
- Exactly one `<main>` per page
- Skip link as first focusable element
- Proper heading hierarchy (h1-h6)

**Example**:
```html
<a href="#skip-target" class="sr-only">Skip to main content</a>
<header>...</header>
<main id="skip-target" tabindex="-1">
  {{ content }}
</main>
<footer>...</footer>
```

### 2. Focus Management

**Requirements**:
- Visible focus indicators
- Logical tab order
- Skip links for navigation
- No keyboard traps

**Genesis Implementation**:
```scss
@mixin genesis-synapse($vector) {
  // All interactive elements get focus styles
  &:focus-visible {
    outline: 2px solid var(--accent-focus);
    outline-offset: 2px;
  }
}
```

### 3. Reduced Motion

**Requirement**: Respect `prefers-reduced-motion` for accessibility

**Genesis Compliance**:
```scss
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 4. High Contrast Mode

**Requirement**: Support `prefers-contrast: high` for vision impairments

**Genesis Implementation**:
```scss
@media (prefers-contrast: high) {
  @mixin genesis-entity($nature) {
    // Disable glass effects
    backdrop-filter: none;
    background: var(--surface-solid);
    border: 2px solid var(--border-contrast);
  }
}
```

### 5. Screen Reader Support

**Best Practices**:
- Use ARIA labels when native semantics insufficient
- Provide text alternatives for images
- Use `aria-live` for dynamic content
- Hide decorative content with `aria-hidden="true"`

---

## Browser Compatibility

### 1. Feature Detection

**Use `@supports`** instead of browser detection:

```scss
// Baseline
.element {
  background: var(--fallback-color);
}

// Enhanced for supporting browsers
@supports (backdrop-filter: blur(10px)) {
  .element {
    backdrop-filter: blur(10px);
    background: oklch(from var(--base) l c h / 0.85);
  }
}
```

### 2. Progressive Enhancement

**Layer features**:
1. **Level 1**: Works everywhere (semantic HTML)
2. **Level 2**: Works in modern browsers (CSS Grid, Flexbox)
3. **Level 3**: Enhanced in cutting-edge browsers (Container queries, :has())

**Genesis Approach**:
```scss
// Level 1: Basic layout (all browsers)
.component {
  @include genesis-entity('primary');
}

// Level 2: Enhanced layout (modern browsers)
@supports (display: grid) {
  .component {
    @include genesis-environment('distributed');
  }
}

// Level 3: Advanced features (cutting-edge)
@supports (container-type: inline-size) {
  .component {
    container-type: inline-size;
  }
}
```

### 3. Baseline 2024

**Target**: Features available in all modern browsers (2024)

**Safe to Use**:
- ✅ CSS Grid
- ✅ Flexbox
- ✅ Custom Properties
- ✅ `clamp()`, `min()`, `max()`
- ✅ Logical properties
- ✅ `dvh` viewport units
- ✅ `:has()` selector
- ✅ Container queries
- ✅ `@supports`

**Use with Care** (emerging):
- ⚠️ View Transitions API
- ⚠️ Anchor Positioning
- ⚠️ Cascade Layers (good support, but check usage)

---

## Resources

### Official Standards
- [W3C CSS Specifications](https://www.w3.org/Style/CSS/)
- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS)

### Genesis Resources
- `_sass/ontology/INTEGRATION-GUIDE.md` - Complete ontological API
- `.github/instructions/scss.instructions.md` - SCSS coding standards
- `GENOME.md` - Evolutionary history and variant registry

### Testing Tools
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Can I Use](https://caniuse.com/) - Browser compatibility
- [Baseline](https://web.dev/baseline) - Cross-browser feature availability

---

**Version**: 1.0.0  
**Aligned with**: Genesis Semantic Design System v2.1+  
**Last Updated**: 2026-01-29  
**Maintained by**: scss-refactor-agent skill
