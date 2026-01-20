---
name: responsive-design-agent
description: Implement mobile-first responsive patterns using Genesis Ontological mixins with container queries. Apply WCAG 2.5.5 touch targets, fluid typography, responsive grids, and modern container-based responsiveness. Use when implementing responsive layouts, optimizing mobile UX, or ensuring accessibility compliance.
license: MIT
metadata:
  author: ASISaga
  version: "3.0"
  category: design-system
  role: responsive-specialist
  updated: "2026-01-20"
---

# Responsive Design Agent

**Role**: Container Query Responsive Specialist  
**Scope**: Modern container-based responsive implementations  
**Version**: 3.0 - Container Query Migration Complete

## Purpose

The Responsive Design Agent ensures all subdomain implementations follow mobile-first principles with **container queries** (not viewport media queries), proper touch targets, fluid typography, and responsive grids using Genesis Ontological mixins.

**MAJOR UPDATE v3.0**: Complete migration from viewport-based media queries to container queries. All responsive behavior now based on container width, not viewport width.

## When to Use This Skill

Activate when implementing new responsive layouts, optimizing mobile UX, ensuring WCAG touch target compliance, or refactoring viewport-dependent designs to container-based patterns.

## Core Principles

### Container Queries (v3.0+)

**Components respond to container size, NOT viewport size:**

```scss
// Container queries (PRIMARY method)
@include compact { }      // Container < 768px
@include medium { }       // Container 768px-1023px
@include medium-up { }    // Container ≥ 768px
@include large { }        // Container ≥ 1024px
@include xlarge { }       // Container ≥ 1440px
@include ultrawide { }    // Container ≥ 1920px

// Generic container queries
@include from($width) { } // Container ≥ width
@include until($width) { }// Container < width
@include between($min, $max) { } // Container between widths
```

**Backward-compatible aliases** (use container queries):
```scss
@include mobile-only { }  // Alias for compact
@include tablet-only { }  // Alias for medium
@include tablet-up { }    // Alias for medium-up
@include desktop-up { }   // Alias for large
```

### WCAG 2.5.5 Touch Targets

All interactive elements MUST be **44x44px minimum** on small containers:

```scss
// Ontological mixins handle this automatically
.button {
  @include genesis-synapse('execute');  // 44x44px in compact containers
}

.nav-link {
  @include genesis-synapse('navigate');  // 44x44px in compact containers
}
```

### Fluid Typography

Minimum 16px in compact containers to prevent iOS zoom:

```scss
.body-text {
  @include genesis-cognition('discourse');  // 16px minimum
}

.form-input {
  @include genesis-synapse('input-primary');  // 16px to prevent zoom
}
```

## Responsive Ontological Patterns

### Environment Variants (Container-Based)

**Distributed Grid** - Auto-responsive based on container:
```scss
.project-grid {
  @include genesis-environment('distributed');
  // Compact containers: 1 column
  // Medium containers: 2 columns
  // Large containers: auto-fit (min 300px)
  // Automatically sets container-type: inline-size
}
```

**Manifest Dashboard** - Responsive columns based on container:
```scss
.dashboard {
  @include genesis-environment('manifest');
  // Compact: 2 columns
  // Medium: 6 columns
  // Large: 12 columns
}
```

**Navigation** - Container-aware:
```scss
.site-nav {
  @include genesis-environment('navigation-primary');
  // Large containers: Horizontal sticky header
  // Compact containers: Off-canvas drawer (80% width)
}
```

**Form Layout** - Container-responsive:
```scss
.contact-form {
  @include genesis-environment('interaction-form');
  // Compact: Single column
  // Medium: 2 columns
  // Large: Multi-column (auto-fit)
}
```

## Container vs Viewport Queries

### When to Use Container Queries (PRIMARY)

Use for **component-level responsiveness**:
- Grid layouts
- Card components
- Form layouts
- Navigation components
- Typography scaling
- Button sizing

**All Genesis Ontological mixins use container queries by default.**

### When to Use Viewport Queries (RARE)

Use only for **page-level layout** or **accessibility**:
- Root HTML/body styles
- Accessibility preferences (`prefers-reduced-motion`, `prefers-contrast`)
- Full-viewport height sections

```scss
// Accessibility (correct usage of media queries)
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; }
}

// Viewport-specific (rare cases)
@include viewport-from($breakpoint) { }  // Use sparingly
```

## Testing Container Responsiveness

Test components at these container widths:
- **375px** - Compact containers (mobile)
- **768px** - Medium containers (tablet)
- **1024px** - Large containers (desktop)
- **1440px** - XLarge containers (wide desktop)

**Pro tip**: Use browser DevTools to resize individual containers, not just viewport.

## Common Responsive Patterns

### Hero Section (Container-Based)

```scss
.hero {
  @include genesis-environment('focused');
  @include genesis-atmosphere('viewport-aware');  // Full viewport height
  @include genesis-atmosphere('spacious-mobile');  // Touch-friendly
  
  .hero-title {
    @include genesis-cognition('axiom');  // Fluid 32px → 56px based on container
  }
  
  .hero-cta {
    @include genesis-synapse('execute');  // 44x44px in compact containers
  }
}
```

### Product Grid (Container-Responsive)

```scss
.product-grid {
  @include genesis-environment('distributed');  // Auto-responsive to container
  @include genesis-atmosphere('dense-desktop');  // High density in large containers
  
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

## Migration from Media Queries

If you have legacy viewport media queries, convert to container queries:

**Before (Viewport-based - DEPRECATED):**
```scss
.component {
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
}
```

**After (Container-based - MODERN):**
```scss
.component {
  container-type: inline-size;  // Enable container queries
  
  @include compact {
    grid-template-columns: 1fr;
  }
}
```

**Even better (Ontological):**
```scss
.component {
  @include genesis-environment('distributed');
  // Automatically handles responsive behavior
}
```

## Accessibility Requirements

### Reduced Motion (Media Query - Correct)

Animations respect `prefers-reduced-motion`:

```scss
// Handled automatically by ontology
.animated-card {
  @include genesis-state('scroll-triggered');
  // No animation if user prefers reduced motion
}
```

### High Contrast (Media Query - Correct)

Support `prefers-contrast: high`:

```scss
// Ontology disables glassmorphism and increases borders
.glass-panel {
  @include genesis-entity('primary');
  // Automatically adapts to high contrast mode
}
```

### Touch Targets (Container-based)

Verify all interactive elements meet 44x44px in compact containers:

```scss
// All synapse variants automatically handle this
.button {
  @include genesis-synapse('execute');  // Min 44x44px in compact
}
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
- `_sass/base/_responsive-system.scss` - Container query mixins
- `.github/instructions/scss.instructions.md` - SCSS best practices
- `.github/prompts/responsive-design-agent.prompt.md` - Detailed prompt
- `GENOME.md` - v3.0 container query migration documentation

**Related Skills**: scss-refactor-agent, html-template-agent

---

**Breaking Changes in v3.0**:
- All responsive mixins now use container queries by default
- Media queries only for accessibility and page-level layout
- Components must have `container-type: inline-size` (handled by ontology)
- Viewport-based breakpoints deprecated (use container-based instead)
