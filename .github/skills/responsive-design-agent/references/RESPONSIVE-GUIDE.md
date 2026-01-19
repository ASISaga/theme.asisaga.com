# Responsive Design Reference Guide

This guide provides comprehensive reference for implementing mobile-first responsive patterns in the Genesis Semantic Design System with WCAG 2.5.5 compliance.

## Table of Contents

1. [Core Principles](#core-principles)
2. [WCAG 2.5.5 Touch Targets](#wcag-255-touch-targets)
3. [Fluid Typography](#fluid-typography)
4. [Mobile-First Breakpoints](#mobile-first-breakpoints)
5. [Responsive Grid Patterns](#responsive-grid-patterns)
6. [Container Queries](#container-queries)
7. [Viewport Units](#viewport-units)
8. [Accessibility Media Queries](#accessibility-media-queries)
9. [Testing Viewports](#testing-viewports)
10. [Common Patterns](#common-patterns)

## Core Principles

### Mobile-First Approach

Start with mobile styles, progressively enhance for larger screens:

**✅ CORRECT - Mobile First:**
```scss
.component {
  @include genesis-environment('focused');  // Mobile default
  
  @include from(md) {
    // Tablet enhancements
  }
  
  @include from(lg) {
    // Desktop enhancements
  }
}
```

**❌ WRONG - Desktop First:**
```scss
.component {
  // Desktop styles as default
  
  @media (max-width: 768px) {
    // Mobile overrides (anti-pattern)
  }
}
```

### Ontology Handles Responsiveness

Genesis mixins are inherently responsive - you rarely need custom media queries:

```scss
.blog-post {
  @include genesis-environment('focused');  // Auto-responsive
  @include genesis-cognition('discourse');  // Fluid typography
  
  .cta-button {
    @include genesis-synapse('execute');    // 44px touch targets
  }
}
```

## WCAG 2.5.5 Touch Targets

### Minimum Size Requirement

All interactive elements MUST be **44x44 pixels minimum** on mobile devices.

### Ontological Compliance

All `genesis-synapse()` mixins automatically enforce touch targets:

```scss
.button {
  @include genesis-synapse('execute');
  // Automatically:
  // - Mobile: min-height: 44px, min-width: 44px
  // - Tablet+: Natural size
  // - Padding adjusts to meet minimum
}

.nav-link {
  @include genesis-synapse('navigate');
  // Auto-sized for touch
}

.delete-button {
  @include genesis-synapse('destructive');
  // Touch target compliant
}
```

### Manual Implementation (When Necessary)

If not using synapse mixins:

```scss
.custom-interactive {
  min-height: 44px;
  min-width: 44px;
  padding: 12px 16px;
  
  @include from(md) {
    // Can reduce on desktop
    min-height: 36px;
    min-width: auto;
  }
}
```

### Touch Target Spacing

Maintain 8px minimum spacing between touch targets:

```scss
.button-group {
  display: flex;
  gap: 8px;  // Prevents accidental taps
  
  @include from(md) {
    gap: 4px;  // Can reduce on desktop
  }
}
```

## Fluid Typography

### iOS Zoom Prevention

**Minimum 16px font size** on mobile to prevent automatic zoom on iOS:

```scss
// ✅ CORRECT - Uses cognition mixins (16px minimum)
.body-text {
  @include genesis-cognition('discourse');  // 16px-18px fluid
}

.input-field {
  @include genesis-synapse('input-primary');  // 16px to prevent zoom
}

// ❌ WRONG - Will trigger iOS zoom
.body-text {
  font-size: 14px;  // Too small on mobile
}
```

### Fluid Scaling with Clamp

Cognition mixins use `clamp()` for fluid scaling:

```scss
// Implemented in ontology engine
.axiom-text {
  font-size: clamp(2rem, 4vw + 1rem, 3.5rem);
  // Mobile: 2rem (32px)
  // Scales with viewport
  // Desktop: 3.5rem (56px)
}
```

### Typography Scale Reference

| Cognition Variant | Mobile | Tablet | Desktop | Use Case |
|-------------------|--------|--------|---------|----------|
| `axiom` | 2rem (32px) | 2.5rem | 3.5rem | Headlines |
| `discourse` | 1rem (16px) | 1.063rem | 1.125rem | Body text |
| `protocol` | 0.875rem | 0.938rem | 1rem | Code |
| `gloss` | 0.875rem | 0.875rem | 0.875rem | Small text |
| `motive` | 1rem | 1.125rem | 1.25rem | CTAs |
| `quantum` | 0.75rem | 0.813rem | 0.875rem | Tags |

All scales maintain 16px minimum on mobile.

## Mobile-First Breakpoints

### Breakpoint System

```scss
// Viewport breakpoints
$breakpoints: (
  xs: 0,      // Mobile portrait (default)
  sm: 480px,  // Mobile landscape / large phones
  md: 768px,  // Tablets
  lg: 1024px, // Laptops / small desktops
  xl: 1280px, // Desktops
  xxl: 1600px // Large desktops
);
```

### Breakpoint Helpers

**Primary Helpers (Mobile-First):**
```scss
@include from(sm) { }   // ≥480px
@include from(md) { }   // ≥768px
@include from(lg) { }   // ≥1024px
@include from(xl) { }   // ≥1280px
```

**Semantic Aliases:**
```scss
@include mobile-landscape { }  // ≥480px
@include tablet { }            // ≥768px
@include desktop { }           // ≥1024px
@include wide-desktop { }      // ≥1280px
```

**Range Helpers:**
```scss
@include between(sm, md) { }   // 480px-767px
@include until(md) { }         // <768px (use sparingly)
```

### Usage Example

```scss
.responsive-component {
  // Mobile default
  padding: 16px;
  font-size: 1rem;
  
  @include from(md) {
    // Tablet
    padding: 24px;
    font-size: 1.125rem;
  }
  
  @include from(lg) {
    // Desktop
    padding: 32px;
    font-size: 1.25rem;
  }
}
```

## Responsive Grid Patterns

### Distributed Environment (Auto-Fit)

The `distributed` environment creates auto-responsive grids:

```scss
.project-grid {
  @include genesis-environment('distributed');
  // Mobile: 1 column
  // Tablet: 2 columns (auto-fit)
  // Desktop: 3+ columns (auto-fit, min 300px)
}
```

**Implementation:**
```scss
// Ontology engine implementation
display: grid;
grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
gap: var(--space-bento);
```

### Manifest Environment (Dashboard)

12-column responsive grid:

```scss
.dashboard {
  @include genesis-environment('manifest');
  // Mobile: Stacked
  // Tablet: 6 columns
  // Desktop: 12 columns
}
```

### Focused Environment (Reading)

Single-column, responsive width:

```scss
.article-content {
  @include genesis-environment('focused');
  // Mobile: 100% width
  // Tablet: 90% width, max 70ch
  // Desktop: 80% width, max 70ch
}
```

### Custom Responsive Grids

When you need custom behavior:

```scss
.custom-grid {
  display: grid;
  gap: 16px;
  
  // Mobile: 1 column
  grid-template-columns: 1fr;
  
  @include from(sm) {
    // Large phones: 2 columns
    grid-template-columns: repeat(2, 1fr);
  }
  
  @include from(lg) {
    // Desktop: 4 columns
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }
}
```

## Container Queries

### When to Use Container Queries

Use `@container` when a component's layout depends on its container size, not viewport:

```scss
.card-grid {
  container-type: inline-size;
  container-name: card-grid;
}

.card {
  // Default: vertical layout
  
  @container card-grid (min-width: 400px) {
    // Horizontal layout when container allows
    display: flex;
    flex-direction: row;
  }
}
```

### Container Query Support

Container queries are supported in ontology v2.1+:

```scss
// Built into distributed environment
.distributed-grid {
  @include genesis-environment('distributed');
  // Automatically uses container queries for card density
}
```

## Viewport Units

### Standard Viewport Units

```scss
.hero {
  height: 100vh;     // Standard viewport height
  width: 100vw;      // Standard viewport width
  min-height: 100%;  // Fallback
}
```

### Dynamic Viewport Units (Mobile)

Handle mobile browser UI (address bar):

```scss
.full-screen-hero {
  // Use dynamic viewport height
  height: 100dvh;  // Adjusts for browser UI
  
  // Fallback for older browsers
  @supports not (height: 100dvh) {
    height: 100vh;
  }
}
```

**Available Units:**
- `dvh` - Dynamic viewport height (recommended for mobile)
- `svh` - Small viewport height (UI visible)
- `lvh` - Large viewport height (UI hidden)

### Safe Area Insets

Handle mobile notches and rounded corners:

```scss
.header {
  padding-top: env(safe-area-inset-top);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}

.footer {
  padding-bottom: max(env(safe-area-inset-bottom), 16px);
}
```

## Accessibility Media Queries

### Reduced Motion

**MANDATORY** for all animations:

```scss
.animated-element {
  transition: transform 0.3s ease;
  
  @media (prefers-reduced-motion: reduce) {
    transition: none;  // Disable animation
    transform: none;   // Reset transforms
  }
}
```

Ontology mixins handle this automatically:

```scss
.element {
  @include animation-consciousness-pulse(3s);
  // Automatically respects prefers-reduced-motion
}
```

### High Contrast

Disable transparency effects:

```scss
.glass-panel {
  @include genesis-entity('primary');  // Glassmorphism
  
  @media (prefers-contrast: high) {
    // Automatically converts to solid background
    background: var(--surface-primary);
    backdrop-filter: none;
    border: 2px solid var(--border-primary);
  }
}
```

### Reduced Transparency

```scss
@media (prefers-reduced-transparency: reduce) {
  .overlay {
    opacity: 1;  // Full opacity
    background: var(--surface-primary);  // Solid color
  }
}
```

### Color Scheme

```scss
.theme-adaptive {
  @media (prefers-color-scheme: dark) {
    // Dark mode adjustments
    --text: var(--text-dark-mode);
  }
  
  @media (prefers-color-scheme: light) {
    // Light mode adjustments
    --text: var(--text-light-mode);
  }
}
```

## Testing Viewports

### Required Test Sizes

Test at these viewport widths **minimum**:

| Device | Width | Height | Notes |
|--------|-------|--------|-------|
| iPhone SE | 375px | 667px | Smallest modern phone |
| iPhone 14 | 390px | 844px | Standard phone |
| iPad Mini | 768px | 1024px | Small tablet |
| iPad Pro | 1024px | 1366px | Large tablet |
| Laptop | 1440px | 900px | Standard laptop |
| Desktop | 1920px | 1080px | Full HD display |

### Testing Checklist

- [ ] Touch targets ≥44px on mobile
- [ ] Text ≥16px on mobile (no iOS zoom)
- [ ] Grids collapse properly
- [ ] Navigation accessible
- [ ] Forms usable on mobile
- [ ] Animations respect reduced-motion
- [ ] Glass effects work in high-contrast
- [ ] Safe areas respected (notches)
- [ ] Horizontal scrolling prevented
- [ ] Landscape orientation works

### Browser DevTools

**Chrome/Edge:**
1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select device or enter custom dimensions
4. Test responsive behavior

**Firefox:**
1. Open DevTools (F12)
2. Responsive Design Mode (Ctrl+Shift+M)
3. Select device or custom size

## Common Patterns

### Responsive Hero Section

```scss
.hero {
  @include genesis-environment('focused');
  @include genesis-entity('primary');
  
  padding: 32px 16px;
  min-height: 50vh;
  
  @include from(md) {
    padding: 64px 32px;
    min-height: 60vh;
  }
  
  @include from(lg) {
    padding: 96px 48px;
    min-height: 70vh;
  }
  
  .hero-title {
    @include genesis-cognition('axiom');  // Fluid 32px-56px
  }
}
```

### Responsive Navigation

```scss
.nav {
  // Mobile: Hamburger menu
  .nav-toggle {
    @include genesis-synapse('execute');  // 44px touch target
    display: block;
    
    @include from(md) {
      display: none;  // Hide on tablet+
    }
  }
  
  .nav-menu {
    // Mobile: Hidden by default
    display: none;
    
    &.is-open {
      display: flex;
      flex-direction: column;
    }
    
    @include from(md) {
      // Tablet+: Always visible horizontal
      display: flex;
      flex-direction: row;
    }
  }
  
  .nav-link {
    @include genesis-synapse('navigate');  // 44px touch
    padding: 12px 16px;
    
    @include from(md) {
      padding: 8px 12px;
    }
  }
}
```

### Responsive Card Grid

```scss
.feature-grid {
  @include genesis-environment('distributed');
  // Auto-responsive grid (1 → 2 → 3+ columns)
  
  .feature-card {
    @include genesis-entity('primary');
    
    // Stack content on mobile
    .card-image,
    .card-content {
      width: 100%;
    }
    
    @container (min-width: 400px) {
      // Horizontal layout in wider containers
      display: flex;
      
      .card-image {
        width: 40%;
      }
      
      .card-content {
        width: 60%;
      }
    }
  }
}
```

### Responsive Form

```scss
.form {
  .form-field {
    margin-bottom: 16px;
    
    label {
      @include genesis-cognition('motive');
      display: block;
      margin-bottom: 8px;
    }
    
    input {
      @include genesis-synapse('input-primary');
      width: 100%;
      min-height: 44px;  // Touch target
      font-size: 16px;   // Prevent iOS zoom
      padding: 12px;
    }
  }
  
  .form-actions {
    // Mobile: Stacked full-width buttons
    display: flex;
    flex-direction: column;
    gap: 12px;
    
    button {
      @include genesis-synapse('execute');
      width: 100%;
      min-height: 44px;
    }
    
    @include from(sm) {
      // Tablet+: Inline buttons
      flex-direction: row;
      justify-content: flex-end;
      
      button {
        width: auto;
        min-width: 120px;
      }
    }
  }
}
```

## Resources

- **SKILL.md** - Full agent instructions
- **_sass/ontology/INTEGRATION-GUIDE.md** - Complete mixin reference
- **WCAG 2.5.5** - Touch target specification
- **.github/instructions/scss.instructions.md** - SCSS coding standards

---

**Version**: 2.1  
**Last Updated**: 2026-01-19  
**Maintained by**: responsive-design-agent
