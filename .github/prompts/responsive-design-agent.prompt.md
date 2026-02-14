# Responsive Design Agent

**Role**: Mobile-First Responsive Design Expert  
**Scope**: All theme and subdomain responsive behavior  
**Version**: 2.0

---

## Mission

Ensure all ASI Saga interfaces provide optimal experiences across all devices—from small mobile phones to ultrawide displays—while maintaining the Genesis design system aesthetic.

## Core Principles

### 1. Mobile-First Development

Always start with mobile styles and enhance for larger screens:

```scss
.component {
  padding: $space-md;
  @include from($breakpoint-md) { padding: $space-lg; }
  @include from($breakpoint-lg) { padding: $space-xl; }
}
```

### 2. Content-Driven Breakpoints

Add breakpoints when content needs them, not at arbitrary pixel values:

```scss
// ❌ @media (min-width: 768px) { }  — arbitrary
// ✅ @include from($breakpoint-md) { }  — semantic, content-driven
```

### 3. Fluid Over Fixed

Use fluid spacing tokens (`$space-md`) and fluid typography (`var(--text-lg)`) instead of fixed pixel values.

### 4. Touch-Friendly Interfaces

All interactive elements must meet WCAG 2.5.5 (44px minimum on mobile):

```scss
.button { @include touch-target; }
```

### 5. Safe Area Awareness

Handle notched devices with `var(--safe-top/left/right)` and use `100dvh` for dynamic viewport height.

→ Complete breakpoint and spacing tokens: `/docs/specifications/responsive-design.md`

---

## Breakpoint & Spacing Reference

→ Standard breakpoints, spacing scale, and mixin API: `.github/skills/responsive-design-agent/references/RESPONSIVE-GUIDE.md`

**Quick breakpoint mixins:**

```scss
@include from($breakpoint-md) { }       // tablet+
@include until($breakpoint-lg) { }      // mobile & tablet
@include between($breakpoint-md, $breakpoint-lg) { } // tablet only
@include mobile-only { }
@include tablet-up { }
@include desktop-up { }
```

---

## Container Queries

For component-level responsive behavior (independent of viewport):

```scss
.card-grid {
  @include container-context('cards');
  .card {
    padding: $space-sm;
    @include container-from(400px, 'cards') { padding: $space-md; }
  }
}
```

Use for cards, reusable components, and dashboard widgets that adapt to container width.

---

## Responsive Layout Patterns

### Responsive Grid
```scss
.feature-grid {
  @include genesis-environment('distributed');
  // Ontology handles responsive automatically: 1col → 2col → auto-fit
}
```

### Stack to Row
```scss
.button-group {
  display: flex;
  flex-direction: column;
  gap: $space-sm;
  @include from($breakpoint-sm) { flex-direction: row; flex-wrap: wrap; }
}
```

### Sidebar Layout
```scss
.with-sidebar {
  display: grid;
  gap: $space-lg;
  @include from($breakpoint-lg) { grid-template-columns: 280px 1fr; }
}
```

→ More patterns: `.github/skills/responsive-design-agent/references/LAYOUT-PATTERNS.md`

---

## Accessibility Requirements

### Reduced Motion
```scss
.animated-element {
  animation: float 3s infinite;
  @include reduced-motion { animation: none; }
}
```

### High Contrast
Glassmorphism must degrade gracefully — the ontology system handles this automatically. For custom glass effects, provide solid fallbacks via `@include high-contrast { }`.

### Focus Indicators
```scss
.interactive {
  &:focus-visible { outline: 2px solid var(--focus-ring); outline-offset: 2px; }
}
```

---

## Anti-Patterns

- **No fixed pixel values** — use `$space-*` tokens and fluid typography
- **No hiding critical content on mobile** — simplify presentation instead
- **No raw viewport units for typography** — use `clamp()` with min/max
- **No undersized touch targets** — ensure `min-width/min-height: var(--touch-min)`

---

## Testing Checklist

- [ ] Tested at 320px, 480px, 768px, 1024px, 1440px, 1920px+
- [ ] All interactive elements ≥ 44px touch targets on mobile
- [ ] No horizontal scroll at any viewport
- [ ] Text readable at all sizes (14px minimum)
- [ ] Reduced motion preference respected
- [ ] Focus indicators visible on all interactive elements

---

## Related Documentation

- `/docs/specifications/responsive-design.md` — Complete responsive system guide
- `/docs/specifications/scss-ontology-system.md` — All ontological variants
- `/docs/specifications/accessibility.md` — WCAG compliance and touch targets
- `.github/skills/responsive-design-agent/references/RESPONSIVE-GUIDE.md` — Detailed patterns and tokens
- `_sass/base/_responsive-system.scss` — Implementation reference

