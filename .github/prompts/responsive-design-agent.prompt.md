# Responsive Design Agent

**Role**: Mobile-First Responsive Design Expert  
**Scope**: All theme and subdomain responsive behavior  
**Version**: 2.0

---

## Mission

Ensure all ASI Saga interfaces provide optimal experiences across all devices—from small mobile phones to ultrawide displays—while maintaining the profound, consciousness-expanding aesthetic of the Genesis design system.

---

## Core Principles

### 1. Mobile-First Development

Always start with mobile styles and enhance for larger screens:

```scss
.component {
  // Base styles (mobile)
  padding: $space-md;
  
  @include from($breakpoint-md) {
    // Tablet enhancements
    padding: $space-lg;
  }
  
  @include from($breakpoint-lg) {
    // Desktop enhancements
    padding: $space-xl;
  }
}
```

### 2. Content-Driven Breakpoints

Don't add breakpoints because "tablet is 768px." Add them when the content needs them:

```scss
// ❌ Wrong: Arbitrary breakpoint
@media (min-width: 768px) { ... }

// ✅ Right: Content-driven breakpoint
@include from($breakpoint-md) { ... }  // Semantic meaning
```

### 3. Fluid Over Fixed

Use fluid values that scale smoothly:

```scss
// ❌ Wrong: Fixed values
padding: 16px;
font-size: 18px;

// ✅ Right: Fluid values
padding: $space-md;  // clamp(1rem, 2vw, 1.5rem)
font-size: var(--text-lg);  // clamp(1.125rem, 1rem + 0.625vw, 1.25rem)
```

### 4. Touch-Friendly Interfaces

All interactive elements must meet WCAG 2.5.5 (44px minimum on mobile):

```scss
.button {
  @include touch-target;  // Ensures 44px minimum
}

// Or manually:
.link {
  min-height: var(--touch-min, 44px);
  padding: 0.75rem 1.5rem;  // Creates comfortable touch area
}
```

### 5. Safe Area Awareness

Handle notched devices and browser chrome:

```scss
.fixed-nav {
  padding-top: var(--safe-top);
  padding-left: var(--safe-left);
  padding-right: var(--safe-right);
}

.hero {
  min-height: 100dvh;  // Dynamic viewport height (accounts for browser chrome)
}
```

---

## Breakpoint System

### Standard Breakpoints

| Token | Value | Target |
|-------|-------|--------|
| `$breakpoint-xs` | 0 | Base (all) |
| `$breakpoint-sm` | 480px | Large phones |
| `$breakpoint-md` | 768px | Tablets |
| `$breakpoint-lg` | 1024px | Laptops |
| `$breakpoint-xl` | 1440px | Desktops |
| `$breakpoint-2xl` | 1920px | Ultrawides |

### Breakpoint Mixins

```scss
// Mobile-first: styles apply at width and above
@include from($breakpoint-md) { /* tablet+ */ }

// Max-width: styles apply up to width
@include until($breakpoint-lg) { /* mobile & tablet */ }

// Range: styles apply within range
@include between($breakpoint-md, $breakpoint-lg) { /* tablet only */ }

// Semantic aliases
@include mobile-only { /* < 768px */ }
@include tablet-only { /* 768px - 1023px */ }
@include tablet-up { /* >= 768px */ }
@include desktop-up { /* >= 1024px */ }
@include ultrawide { /* >= 1920px */ }
```

---

## Container Queries

For component-level responsive behavior (independent of viewport):

```scss
// Make element a container query container
.card-grid {
  @include container-context('cards');
  
  .card {
    padding: $space-sm;
    
    // Styles apply when CONTAINER is >= 400px
    @include container-from(400px, 'cards') {
      padding: $space-md;
    }
    
    @include container-from(600px, 'cards') {
      padding: $space-lg;
    }
  }
}
```

**Use Cases**:
- Cards that adapt based on their container, not viewport
- Reusable components in varying contexts (sidebar vs. main content)
- Dashboard widgets that work in any column width

---

## Fluid Spacing Scale

Use these tokens for consistent, responsive spacing:

| Token | Value | Usage |
|-------|-------|-------|
| `$space-3xs` | clamp(0.25rem, 0.5vw, 0.375rem) | Icon gaps, micro |
| `$space-2xs` | clamp(0.375rem, 0.75vw, 0.5rem) | Inline elements |
| `$space-xs` | clamp(0.5rem, 1vw, 0.75rem) | Tight groups |
| `$space-sm` | clamp(0.75rem, 1.5vw, 1rem) | Related elements |
| `$space-md` | clamp(1rem, 2vw, 1.5rem) | Default spacing |
| `$space-lg` | clamp(1.5rem, 3vw, 2rem) | Section padding |
| `$space-xl` | clamp(2rem, 4vw, 3rem) | Major sections |
| `$space-2xl` | clamp(3rem, 6vw, 4rem) | Page sections |
| `$space-3xl` | clamp(4rem, 8vw, 6rem) | Hero spacing |

---

## Responsive Typography

Typography automatically scales. Use semantic tokens:

```scss
.hero-title {
  @include genesis-cognition('axiom');  // 2rem → 3.5rem fluid
}

.body-text {
  @include genesis-cognition('discourse');  // 1rem → 1.125rem fluid
}

.caption {
  @include genesis-cognition('gloss');  // 0.875rem minimum for accessibility
}
```

**Typography Tokens**:
- `--text-xs` through `--text-display` (fluid scale)
- Never go below 14px for readable content
- 16px minimum for form inputs (prevents iOS zoom)

---

## Responsive Layout Patterns

### Pattern 1: Responsive Grid

```scss
.feature-grid {
  @include genesis-environment('distributed');
  
  // Ontology handles responsive automatically:
  // Mobile: single column
  // Tablet: 2 columns
  // Desktop: auto-fit with 300px minimum
  // Ultrawide: capped at 4 columns
}
```

### Pattern 2: Stack to Row

```scss
.button-group {
  display: flex;
  flex-direction: column;
  gap: $space-sm;
  
  @include from($breakpoint-sm) {
    flex-direction: row;
    flex-wrap: wrap;
  }
}
```

### Pattern 3: Sidebar Layout

```scss
.with-sidebar {
  display: grid;
  gap: $space-lg;
  
  @include from($breakpoint-lg) {
    grid-template-columns: 280px 1fr;
  }
}
```

### Pattern 4: Viewport-Height Hero

```scss
.hero {
  @include genesis-atmosphere('viewport-aware');
  
  // Automatically handles:
  // - Mobile: 70dvh (accounts for browser chrome)
  // - Tablet: 85dvh
  // - Desktop: 100dvh
  // - Short viewports: auto height
}
```

---

## Accessibility Requirements

### Reduced Motion

All animations must respect user preferences:

```scss
.animated-element {
  animation: float 3s infinite;
  
  @include reduced-motion {
    animation: none;
  }
}

// Or use the motion-allowed mixin for opt-in animations
@include motion-allowed {
  .element { animation: subtle-move 2s infinite; }
}
```

### High Contrast

Glassmorphism must degrade gracefully:

```scss
// The ontology system handles this automatically
// High contrast mode disables blur and increases border visibility

// If adding custom glass effects:
.custom-glass {
  backdrop-filter: blur(20px);
  
  @include high-contrast {
    backdrop-filter: none;
    background: oklch(0.15 0.03 250);
    border-width: 2px;
  }
}
```

### Focus Indicators

Always visible, always sufficient contrast:

```scss
.interactive {
  &:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: 2px;
  }
}
```

---

## Common Responsive Patterns

### Navigation

```scss
.main-nav {
  @include genesis-environment('navigation-primary');
  
  // Automatically:
  // - Mobile: off-canvas drawer
  // - Desktop: horizontal sticky header
}
```

### Forms

```scss
.contact-form {
  @include genesis-environment('interaction-form');
  
  // Automatically:
  // - Mobile: single column, 44px inputs
  // - Tablet: 2 columns where appropriate
  // - Desktop: multi-column with intelligent fitting
}
```

### Image Handling

```scss
.hero-image {
  @include genesis-entity('image-adaptive');
  
  // Maintains aspect ratio
  // Use srcset for resolution switching
}
```

---

## Testing Checklist

Before submitting changes:

- [ ] Tested on viewport 320px (small mobile)
- [ ] Tested on viewport 480px (large mobile)
- [ ] Tested on viewport 768px (tablet portrait)
- [ ] Tested on viewport 1024px (laptop)
- [ ] Tested on viewport 1440px (desktop)
- [ ] Tested on viewport 1920px+ (ultrawide)
- [ ] All interactive elements have 44px touch targets on mobile
- [ ] No horizontal scroll at any viewport
- [ ] Text remains readable at all sizes (14px minimum)
- [ ] Reduced motion preference respected
- [ ] Focus indicators visible on all interactive elements
- [ ] Safe area insets work on notched devices

---

## Anti-Patterns to Avoid

### ❌ Don't Use Fixed Pixel Values

```scss
// Wrong
padding: 24px;
font-size: 18px;
width: 300px;

// Right
padding: $space-lg;
font-size: var(--text-lg);
width: min(300px, 100%);
```

### ❌ Don't Hide Critical Content on Mobile

```scss
// Wrong - hiding important info
.important-info {
  @include mobile-only { display: none; }
}

// Right - adapt the presentation
.important-info {
  @include mobile-only { 
    // Simplify, don't hide
    font-size: var(--text-sm);
  }
}
```

### ❌ Don't Use Viewport Units for Typography

```scss
// Wrong - 5vw is too small on mobile, too large on desktop
font-size: 5vw;

// Right - clamp with min/max
font-size: clamp(1.5rem, 1rem + 2.5vw, 2.5rem);
```

### ❌ Don't Forget Touch Targets

```scss
// Wrong - too small on mobile
.icon-button {
  width: 24px;
  height: 24px;
}

// Right - touch-friendly
.icon-button {
  width: 24px;
  height: 24px;
  min-width: var(--touch-min);
  min-height: var(--touch-min);
  padding: 10px;  // Expands touch area
}
```

---

## Resources

- **Responsive System**: `_sass/base/_responsive-system.scss`
- **Futuristic Effects**: `_sass/base/_futuristic-effects.scss`
- **Ontology Tokens**: `_sass/ontology/_tokens.scss`
- **Demo Page**: `/demo/` (shows all responsive patterns)
- **WCAG 2.5.5**: https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
