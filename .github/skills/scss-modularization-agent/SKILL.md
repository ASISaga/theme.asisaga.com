---
name: scss-modularization-agent
description: Transform monolithic SCSS architecture into intrinsically modular structure with atomic design and code reuse. Eliminates global component imports by creating layered module system.
license: MIT
metadata:
  author: ASISaga
  version: "1.0"
  category: architecture
  role: modularization-architect
---

# SCSS Modularization Agent

Transform monolithic SCSS into modular architecture using Atomic Design principles with Sass modules (`@use`/`@forward`).

## Problem

**Monolithic Anti-Pattern**:
- All 75+ components imported globally
- 14MB CSS (36,641 selectors)
- No code reuse
- Massive output regardless of page needs

## Solution: Atomic Modular Architecture

### Layer System

**Atoms** (`_sass/atoms/`) - Primitive, single-responsibility patterns:
```scss
// _sass/atoms/_glass.scss
@mixin surface($opacity: 0.85) {
  background: oklch(from var(--surface) l c h / $opacity);
  backdrop-filter: blur(20px);
}
```

**Molecules** (`_sass/molecules/`) - Composed components:
```scss
// _sass/molecules/_card.scss
@use "../atoms/glass";
@use "../atoms/spacing";

@mixin card() {
  @include glass.surface();
  @include spacing.component();
}
```

**Organisms** (`_sass/organisms/`) - Feature components:
```scss
// _sass/organisms/_product-card.scss
@use "../molecules/card";
@use "../molecules/button";

.product-card {
  @include card.card();
  .cta { @include button.primary(); }
}
```

**Per-Page Bundles**:
```scss
// assets/css/blog.scss
@use "atoms";
@use "molecules";
@use "organisms/article"; // Only blog components
// Result: 2-3MB (not 14MB)
```

## Refactoring Process

### 1. Extract Atoms (Most Reused Patterns)
```bash
# Find duplicates
grep -r "backdrop-filter" _sass/ | wc -l
grep -r "clamp(" _sass/ | wc -l
```

Create atoms:
- Glass effects
- Spacing
- Typography
- Grids
- Borders

### 2. Build Molecules (Composable Components)
Compose from atoms:
- Cards
- Buttons  
- Forms
- Navigation

### 3. Refactor Organisms (Use Molecules)
Convert existing components to use atoms/molecules

### 4. Create Per-Layout Bundles
```
assets/css/blog.scss       → 2-3MB
assets/css/products.scss   → 3-4MB
assets/css/dashboard.scss  → 2-3MB
```

## Key Principles

✅ Use `@use` (not `@import`)  
✅ Explicit dependencies  
✅ Namespacing  
✅ Single responsibility  
✅ Composition over duplication  
✅ Load only what's needed  

❌ No global imports  
❌ No code duplication  
❌ No monolithic bundles  

## Expected Results

- 60-80% size reduction per page
- High code reuse (atoms used 10-20x each)
- Better maintainability
- Faster builds

See `/references/` for detailed guides.
