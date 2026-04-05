---
applyTo: "_sass/base/**"
description: "Standards for the foundation layer in _sass/base/"
---

# Base Foundation Instructions

## Canonical Purpose

`_sass/base/` is the **foundation layer** — design tokens, fonts, utilities, effects, and layout primitives. These files are imported by `ontology/_index.scss` as the universal base.

## Directory Structure

```
base/
├── _fontawesome.scss          # Font Awesome 6 (vendored in vendor/fontawesome/)
├── _fonts.scss                # @font-face declarations (Google Fonts)
├── _icons.scss                # Icon system configuration
├── design/                    # Design tokens & visual foundation
│   ├── _colors.scss           # OKLCH + semantic color tokens (centralized)
│   ├── _variables-generated.scss  # ⚠️ Generated from _design/tokens/*.json — DO NOT EDIT
│   ├── _variables.scss        # Theme-wide Sass variables
│   ├── _dimensions.scss       # Spacing and sizing tokens
│   ├── _typography.scss       # Unified: fluid scale + sacred families
│   └── _theme.scss            # Theme-level configuration
├── effects/                   # Visual effects
│   ├── _animations.scss       # Core keyframe animations
│   ├── _futuristic-effects.scss   # Glassmorphism, glows, gradients
│   └── _ambient-layer.scss    # Sentient ambient atmosphere
├── layout/                    # Layout primitives (responsive system)
│   ├── _responsive-system.scss    # Breakpoints, container queries, fluid spacing
│   ├── _layout-wrappers.scss  # Layout containers
│   └── _layout.scss           # Base layout structures
└── utilities/                 # Sass utilities and legacy compatibility
    ├── _mixins.scss           # Core Sass mixins
    ├── _semantic-mixins.scss  # Semantic mixins (buttons, gradients)
    ├── _accessibility.scss    # WCAG compliance helpers
    ├── _common.scss           # Common utility styles
    └── _legacy-utilities.scss # Legacy compatibility (.sr-only, .container, .row)
```

## What Belongs Here

- ✅ Design tokens (colors, spacing, typography scales, shadows)
- ✅ Font declarations (`@font-face`, font loading)
- ✅ Sass utility mixins and functions
- ✅ Visual effects (animations, glassmorphism, ambient)
- ✅ Layout primitives (breakpoints, container queries)
- ✅ Accessibility helpers (`.sr-only`, focus utilities)
- ✅ Legacy compatibility classes (`.container`, `.row`)

## What Does NOT Belong

- ❌ Component-specific styles (→ `components/`)
- ❌ Layout-specific page styles (→ `layouts/`)
- ❌ Ontological engine code (→ `ontology/engines/`)

## Key Rules

### Design Tokens

- **All color tokens** centralized in `design/_colors.scss` — OKLCH format
- **Generated tokens** in `design/_variables-generated.scss` — regenerate with `npm run tokens:build`
- **Manual variables** in `design/_variables.scss` — shadows, opacity, spacing, breakpoints
- **Typography** unified in `design/_typography.scss` — fluid scale + sacred families

### Effects

- Animation `@keyframes` belong in `effects/_animations.scss`
- Glassmorphism and glow mixins in `effects/_futuristic-effects.scss`
- Ambient atmosphere in `effects/_ambient-layer.scss`

### Utilities

- Core mixins (media queries, responsive helpers) in `utilities/_mixins.scss`
- Semantic mixins (button factories, gradient helpers) in `utilities/_semantic-mixins.scss`
- WCAG accessibility utilities in `utilities/_accessibility.scss`
- Legacy Bootstrap-compatible classes in `utilities/_legacy-utilities.scss`

→ **Token specification**: `_design/tokens/` (split files)  
→ **Token build**: `npm run tokens:build`  
→ **Color system**: `/docs/specifications/color-system.md`  
→ **Typography**: `/docs/specifications/typography.md`  
→ **Fluid design**: `/docs/specifications/fluid-design-unit-compatibility.md`
