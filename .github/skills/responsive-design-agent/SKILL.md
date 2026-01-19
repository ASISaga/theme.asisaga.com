---
name: responsive-design-agent
description: Implement mobile-first responsive patterns using Genesis Ontological mixins. Apply WCAG 2.5.5 touch targets, fluid typography, responsive grids, and container queries. Use when implementing responsive layouts, optimizing mobile UX, or ensuring accessibility compliance across viewport sizes.
license: MIT
metadata:
  author: ASISaga
  version: "2.0"
  category: design-system
  role: responsive-specialist
---

# Responsive Design Agent

**Role**: Mobile-First Responsive Specialist  
**Scope**: Responsive implementations across all viewports

## Purpose

The Responsive Design Agent ensures all subdomain implementations follow mobile-first principles with proper touch targets, fluid typography, and responsive grids using Genesis Ontological mixins introduced in v2.1.0+.

## When to Use This Skill

Activate when implementing new responsive layouts, optimizing mobile UX, ensuring WCAG touch target compliance, or refactoring desktop-first designs to mobile-first patterns.

## Core Requirements

### WCAG 2.5.5 Touch Targets

All interactive elements MUST be **44x44px minimum** on mobile:

```scss
// Ontological mixins handle this automatically
.button {
  @include genesis-synapse('execute');  // 44x44px on mobile
}

.nav-link {
  @include genesis-synapse('navigate');  // 44x44px on mobile
}
```

### Fluid Typography

Minimum 16px on mobile to prevent iOS zoom:

```scss
.body-text {
  @include genesis-cognition('discourse');  // 16px minimum
}

.form-input {
  @include genesis-synapse('input-primary');  // 16px to prevent zoom
}
```

### Mobile-First Breakpoints

```scss
// Breakpoints handled by ontology mixins
@include from(sm) { }   // ≥480px  (large phones)
@include from(md) { }   // ≥768px  (tablets)
@include from(lg) { }   // ≥1024px (laptops)
@include from(xl) { }   // ≥1280px (desktops)

// Semantic aliases
@include tablet { }     // ≥768px
@include desktop { }    // ≥1024px
```

## Responsive Ontological Patterns

### Environment Variants (v2.1.0+)

**Distributed Grid** - Auto-responsive:
```scss
.project-grid {
  @include genesis-environment('distributed');
  // Mobile: 1 column
  // Tablet: 2 columns
  // Desktop: auto-fit (min 300px)
}
```

**Manifest Dashboard** - Responsive columns:
```scss
.dashboard {
  @include genesis-environment('manifest');
  // Mobile: 2 columns
  // Tablet: 6 columns
  // Desktop: 12 columns
}
```

**Navigation** (v2.2.0+):
```scss
.site-nav {
  @include genesis-environment('navigation-primary');
  // Desktop: Horizontal sticky header
  // Mobile: Off-canvas drawer (80% width)
}
```

**Form Layout** (v2.2.0+):
```scss
.contact-form {
  @include genesis-environment('interaction-form');
  // Mobile: Single column
  // Tablet: 2 columns
  // Desktop: Multi-column (auto-fit)
}
```

### Entity Variants (v2.1.0+)

**Image Adaptive** - Responsive images:
```scss
.hero-image {
  @include genesis-entity('image-adaptive');
  // Maintains 16:9 aspect ratio
  // Configurable via --aspect-ratio
}

// Custom aspect ratio
.portrait-image {
  @include genesis-entity('image-adaptive');
  --aspect-ratio: 133.33%; // 3:4 portrait
}

// Convenience classes
.square-image.ratio-square {
  @include genesis-entity('image-adaptive');
}
```

**Embed Responsive** - Iframes/videos:
```scss
.video-container {
  @include genesis-entity('embed-responsive');
  // Responsive 16:9 for YouTube, etc.
}
```

### Atmosphere Variants (v2.1.0+)

**Spacious Mobile** - Touch-friendly spacing:
```scss
.hero-section {
  @include genesis-atmosphere('spacious-mobile');
  // Mobile: 3rem padding, 2.5rem margins
  // Desktop: 2rem padding, 1.5rem margins
}
```

**Dense Desktop** - High-density layouts:
```scss
.team-grid {
  @include genesis-atmosphere('dense-desktop');
  // Mobile: 1 column
  // Tablet: 2 columns
  // Desktop: Auto-fit grid (cap at 4 columns)
}
```

**Viewport Aware** (v2.2.0+) - Full-height sections:
```scss
.hero {
  @include genesis-atmosphere('viewport-aware');
  // Mobile: 70vh (accounts for browser chrome)
  // Tablet: 85vh
  // Desktop: 100vh
}
```

### State Variants (v2.2.0+)

**Scroll Triggered** - Scroll animations:
```scss
.fade-in-section {
  @include genesis-state('scroll-triggered');
  // Mobile: Faster animations (0.4s), shorter distance (20px)
  // Desktop: Richer animations (0.7s), longer distance (30px)
  // Respects prefers-reduced-motion
}
```

## Testing Viewports

Test at these minimum sizes:

- **375px** - iPhone SE, small phones
- **768px** - Tablets (iPad portrait)
- **1024px** - Laptops, tablets landscape
- **1440px** - Desktop monitors

## Common Responsive Patterns

### Hero Section

```scss
.hero {
  @include genesis-environment('focused');
  @include genesis-atmosphere('viewport-aware');  // Full viewport height
  @include genesis-atmosphere('spacious-mobile');  // Touch-friendly
  
  .hero-title {
    @include genesis-cognition('axiom');  // Fluid 32px → 56px
  }
  
  .hero-cta {
    @include genesis-synapse('execute');  // 44x44px touch target
  }
}
```

### Product Grid

```scss
.product-grid {
  @include genesis-environment('distributed');  // Auto-responsive
  @include genesis-atmosphere('dense-desktop');  // High density on desktop
  
  .product-card {
    @include genesis-entity('primary');
    
    .product-image {
      @include genesis-entity('image-adaptive');  // Responsive images
    }
    
    .product-name {
      @include genesis-cognition('axiom');  // Fluid typography
    }
  }
}
```

### Contact Form

```scss
.contact-form {
  @include genesis-environment('interaction-form');  // Responsive form layout
  
  .form-label {
    @include genesis-cognition('motive');  // Readable label
  }
  
  .form-input {
    @include genesis-synapse('input-primary');  // 44px height, 16px font
  }
  
  .submit-button {
    @include genesis-synapse('execute');  // Touch-optimized
  }
}
```

## Mobile-Specific Considerations

### Navigation Patterns

```scss
.main-nav {
  @include genesis-environment('navigation-primary');
  // Automatically handles:
  // - Desktop: Horizontal sticky header
  // - Mobile: Off-canvas drawer with glassmorphism
  // Requires JavaScript for .nav-open class toggle
}
```

### Touch Target Spacing

```scss
// All synapse variants automatically handle touch targets
.button-group {
  .action-button {
    @include genesis-synapse('execute');  // Min 44x44px
  }
  
  .cancel-button {
    @include genesis-synapse('inquiry');  // Min 44x44px
  }
}
```

### Readable Typography

```scss
// Prevent iOS zoom on form inputs
.search-input {
  @include genesis-synapse('input-primary');  // 16px font size
}

// Ensure readable body text
.article-content {
  @include genesis-cognition('discourse');  // 16px minimum
}
```

## Accessibility Requirements

### Reduced Motion

All animations respect `prefers-reduced-motion`:

```scss
// Handled automatically by ontology
.animated-card {
  @include genesis-state('scroll-triggered');
  // No animation if user prefers reduced motion
}
```

### High Contrast

Support `prefers-contrast: high`:

```scss
// Ontology disables glassmorphism and increases borders
.glass-panel {
  @include genesis-entity('primary');
  // Automatically adapts to high contrast mode
}
```

### Touch Targets

Verify all interactive elements meet 44x44px:

```bash
# Use browser DevTools to audit touch targets
# Or use accessibility testing tools
```

## Testing Commands

```bash
# Test SCSS compilation
npm run test:scss

# Lint SCSS
npm run lint:scss

# Run all checks
npm test
```

## Resources

- `_sass/ontology/INTEGRATION-GUIDE.md` - All responsive variants
- `.github/instructions/scss.instructions.md` - SCSS best practices
- `.github/prompts/responsive-design-agent.prompt.md` - Detailed prompt
- `GENOME.md` - v2.1.0 responsive enhancements documentation

**Related Skills**: scss-refactor-agent, html-template-agent
