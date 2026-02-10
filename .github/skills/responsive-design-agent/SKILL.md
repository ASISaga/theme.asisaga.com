---
name: responsive-design-agent
description: Implement mobile-first responsive patterns using Genesis Ontological mixins. Apply WCAG 2.5.5 touch targets, fluid typography, responsive grids, and container queries. Includes production-ready layout patterns for grids, dashboards, navigation, forms, and media. Use when implementing responsive layouts, optimizing mobile UX, or ensuring accessibility compliance across viewport sizes.
license: MIT
metadata:
  author: ASISaga
  version: "2.2"
  category: design-system
  role: responsive-specialist
allowed-tools: Bash(npm:*) Bash(sass:*) Read Edit
---

# Responsive Design Agent

**Role**: Mobile-First Responsive Specialist  
**Scope**: Responsive implementations across all viewports  
**Version**: 2.2 - High-Density Refactor

## Purpose

Ensure subdomain implementations follow mobile-first principles with WCAG 2.5.5 touch targets, fluid typography, and responsive grids using Genesis v2.1.0+ ontological mixins.

## When to Use This Skill

Activate when:
- Implementing new responsive layouts
- Optimizing mobile UX/touch targets
- Ensuring WCAG 2.5.5 compliance
- Refactoring desktop-first to mobile-first
- Creating responsive grids/forms
- Testing viewport breakpoints

## Core Requirements

**WCAG 2.5.5 Touch Targets**: All interactive elements ≥44x44px on mobile  
**Fluid Typography**: Minimum 16px on mobile (prevents iOS zoom)  
**Mobile-First**: Build for mobile, enhance for desktop  
**Accessibility**: Reduced motion, high contrast, keyboard navigation

→ **Complete requirements**: `/docs/specifications/responsive-design.md`

## Quick Patterns

### Responsive Environment Variants

```scss
// Auto-responsive grid (1 → 2 → auto columns)
@include genesis-environment('distributed');

// Dashboard grid (2 → 6 → 12 columns)
@include genesis-environment('manifest');

// Mobile drawer, desktop horizontal nav
@include genesis-environment('navigation-primary');

// Vertical mobile forms, horizontal desktop
@include genesis-environment('interaction-form');
```

### Responsive Atmosphere Variants

```scss
// Full viewport height (100vh → 100svh)
@include genesis-atmosphere('viewport-aware');

// Touch-friendly spacing on mobile
@include genesis-atmosphere('spacious-mobile');

// High density on desktop
@include genesis-atmosphere('dense-desktop');
```

### Common Component Patterns

**Hero Section:**
```scss
.hero {
  @include genesis-environment('focused');
  @include genesis-atmosphere('viewport-aware');
}
```

**Product Grid:**
```scss
.grid {
  @include genesis-environment('distributed');
  @include genesis-atmosphere('dense-desktop');
}
```

**Form:**
```scss
.form {
  @include genesis-environment('interaction-form');
  .input { @include genesis-synapse('input-primary'); }  // 16px, 44px
}
```

→ **Complete patterns**: `references/LAYOUT-PATTERNS.md`

## Mobile Breakpoints

```scss
@include from(sm) { }   // ≥480px  (large phones)
@include from(md) { }   // ≥768px  (tablets)
@include from(lg) { }   // ≥1024px (laptops)
@include from(xl) { }   // ≥1280px (desktops)
```

## Validation

**Before committing:**
```bash
npm run test:scss    # SCSS compilation
npm run lint:scss    # Stylelint checks
npm test             # All checks
```

**Touch target audit:**
- Use DevTools mobile emulation
- Verify all buttons/links ≥44x44px
- Test with actual devices

## Resources

**Complete Responsive System**:
- `/docs/specifications/responsive-design.md` - **Complete responsive design guide**
- `references/LAYOUT-PATTERNS.md` - **Production-ready layout patterns**
- `references/RESPONSIVE-GUIDE.md` - Comprehensive responsive guide

**Core Systems**:
- `/docs/specifications/scss-ontology-system.md` - All responsive variants
- `/docs/specifications/accessibility.md` - WCAG 2.5.5 touch targets
- `/docs/specifications/architecture.md` - System design

**Related**:
- `.github/instructions/scss.instructions.md` - SCSS best practices
- `GENOME.md` - v2.1.0 responsive enhancements

**Related Skills**: scss-refactor-agent, html-template-agent, futuristic-effects-agent

---

**Version History**:
- **v2.2** (2026-02-10): High-density refactor - 370→146 lines, enhanced spec references
- **v2.1.1** (2026-02-10): Enhanced spec references
- **v2.1.0**: v2.1.0 responsive system integration
