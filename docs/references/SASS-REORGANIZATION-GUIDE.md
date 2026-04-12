# /_sass Directory Reorganization Guide

**Date**: 2026-04-12  
**Version**: 4.0 - Design Token Alignment & Architecture Clarity

## Overview

The `/_sass` directory uses a two-layer architecture with a clear separation between generated design tokens and hand-authored semantic mappings. v4.0 aligns `_sass/design/` directly with `_design/tokens/` as the single source of truth for all raw OKLCH color values.

## Current Structure

```
_sass/
├── _main.scss                   # Layer 2: Full theme bundle (reference implementation)
├── _test-compile.scss           # SCSS compilation test entry point
│
├── design/                      # Design token layer (maps to _design/tokens/*.json)
│   ├── _colors.scss              # Semantic color aliases + extended tokens
│   ├── _variables-generated.scss # ⚠️ Generated from _design/tokens/*.json — DO NOT EDIT
│   ├── _variables.scss           # Sacred aliases, component tokens (unique vars only)
│   ├── _dimensions.scss          # Breakpoints, fluid spacing, icon sizes, component dims
│   ├── _typography.scss          # Unified: fluid scale + sacred families + material primitives
│   └── _theme.scss               # Theme-level section classes
│
├── ontology/                    # Ontological Design System (Layer 1)
│   ├── _index.scss              # ⭐ Universal base import (subdomains @import this)
│   ├── _tokens.scss             # CSS custom properties
│   ├── _engines.scss            # Engine layer dispatch
│   ├── _interface.scss          # Public semantic API (genesis-* mixins)
│   └── engines/                 # 6 engines + infrastructure
│       ├── _atmosphere.scss, _cognition.scss, _entity.scss
│       ├── _environment.scss, _state.scss, _synapse.scss
│       ├── _component.scss      # Component engine dispatch
│       ├── _fontawesome.scss    # Font Awesome 6 (vendored)
│       ├── _fonts.scss          # @font-face + font mixins
│       ├── _icons.scss          # Icon system
│       ├── components/          # Component engine implementations
│       ├── effects/             # Animations, glassmorphism, ambient layer
│       ├── layout/              # Responsive system, layout wrappers
│       └── utilities/           # Core mixins, semantic mixins, accessibility, common
│
├── includes/                    # Mirrors _includes/ HTML hierarchy
│   ├── _index.scss              # Aggregates all include SCSS files
│   ├── [root includes]          # One-to-one with _includes/*.html
│   ├── components/              # One-to-one with _includes/components/*.html
│   └── layouts/                 # Include-specific layout styles
│
├── layouts/                     # Page layout SCSS (mirrors _layouts/*.html, 20 files)
│
├── demo/                        # Demo-only styles (not for subdomains)
│
├── samples/                     # Sample SCSS (not compiled)
│
└── vendor/                      # Vendored third-party
    └── fontawesome/
```

## Design Token Architecture (_design/ ↔ _sass/design/)

```
_design/tokens/          ──generates──▶  _sass/design/
1-identity.json          ┐
2-color.json             │              _variables-generated.scss
3-typography.json        ├──────────▶   (npm run tokens:build)
4-spacing.json           │
5-sys.json               │
6-ontology.json          ┘

_sass/design/_colors.scss  ──aliases──▶  $color-transcendent-white: $color-light-white
                                          $color-neon-blue: $color-accent-neon-blue
                                          (semantic short-names → generated token names)
```

### Token Tiers

| Tier | Files | Description |
|------|-------|-------------|
| 1 — Identity | `1-identity.json` | Golden ratio, base grid unit |
| 2 — Primitive | `2-color.json`, `3-typography.json`, `4-spacing.json` | Raw OKLCH values, font families, spacing |
| 3 — System | `5-sys.json` | Semantic cross-references (action, surface, text, border) |
| 4 — Ontology | `6-ontology.json` | Atmosphere / entity / cognition / synapse mappings |

### Layering in `_sass/design/`

1. **`_variables-generated.scss`** — Raw primitives (auto-generated, do not edit)
2. **`_colors.scss`** — Semantic aliases + extended color tokens (imports generated first)
3. **`_variables.scss`** — Sacred aliases + unique component tokens
4. **`_dimensions.scss`** — Breakpoints, fluid spacing, icon sizes (unique, un-tokenised)

## v4.0 Changes (Design Token Alignment)

### Import Order Fixed
`_variables-generated.scss` is now imported before `_colors.scss` so that `_colors.scss`
can reference generated token variables as the source of truth.

### Color Primitives Moved to JSON
Raw OKLCH color values that used to live in `_colors.scss` Section 1 are now exclusively
defined in `_design/tokens/2-color.json`. `_colors.scss` only defines **semantic aliases**
on top of the generated token names — no raw OKLCH duplicates.

### Duplicate Declarations Removed
- Spacing tokens `$spacing-xs` … `$spacing-3xl` removed from `_dimensions.scss` (already generated)
- Border-width tokens `$border-width-*` removed from `_dimensions.scss` (already generated)
- `$spacing-base` helper variable removed (was only used to compute the now-generated spacing vars)

### Token Value Fix
`color.accent.gold` updated from `oklch(0.65 …)` to `oklch(0.70 …)` to match the
`$color-essence-gold` value used throughout the codebase.

### `color.accent.gold-muted` Added
New token `$color-accent-gold-muted: oklch(0.60 0.10 88)` added to `2-color.json`
and aliased as `$color-gold-muted` in `_colors.scss`.

## v3.0 Changes (Separation of Concerns)

| File Removed | Reason |
|------|--------|
| `base/design/_design-tokens.scss` | Merged into `_variables.scss` |
| `base/design/_semantic-typography.scss` | Merged into `_typography.scss` |
| `ontology/_theme-layouts.scss` | Orphaned compatibility shim |
| `base/layout/_responsive.scss` | Replaced by `_responsive-system.scss` |
| Duplicate card files in `components/` | Canonical location is `components/web-components/` |

## Two-Layer Architecture

```
assets/css/style.scss
├── Layer 1: ontology/index    ← Universal base (all subdomains import this)
└── Layer 2: _main.scss        ← Theme bundle (components, includes, layouts)
```

## File Location Quick Reference

**Raw color values?** → Edit `_design/tokens/2-color.json`, run `npm run tokens:build`  
**Semantic color aliases?** → `design/_colors.scss` (Section 1)  
**Generated tokens?** → `design/_variables-generated.scss` (⚠️ DO NOT EDIT)  
**Sacred aliases + component vars?** → `design/_variables.scss`  
**Breakpoints + fluid spacing?** → `design/_dimensions.scss`  
**Typography?** → `design/_typography.scss`  
**Animations?** → `ontology/engines/effects/_animations.scss`  
**Glassmorphism?** → `ontology/engines/effects/_futuristic-effects.scss`  
**Layout containers?** → `ontology/engines/layout/_layout-wrappers.scss`  
**Responsive mixins?** → `ontology/engines/layout/_responsive-system.scss`  
**Core mixins?** → `ontology/engines/utilities/_mixins.scss`  
**Web component cards?** → `includes/components/web-components/`  
**Demo styles?** → `demo/`

## Testing

```bash
npm test                        # Run all checks
npm run test:scss               # Sass compilation
npm run validate:scss:units     # Unit compatibility
npm run lint:scss               # Stylelint
npm run tokens:build            # Regenerate _variables-generated.scss from _design/tokens/*.json
```

## Adding New Files

**New component?** → Create in appropriate subdirectory, add import to `_main.scss`  
**New raw color value?** → Add to `_design/tokens/2-color.json`, run `npm run tokens:build`  
**New semantic color alias?** → Add to `design/_colors.scss` Section 1 or 2  
**New design token (non-color)?** → Add to `design/_variables.scss`  
**New animation?** → Add to `ontology/engines/effects/`  
**New layout?** → Create in `layouts/`, add import to `_main.scss`

## Related Documentation

- `_sass/README.md` — Architecture overview
- `_sass/ontology/INTEGRATION-GUIDE.md` — Ontology system guide
- `.github/instructions/scss.instructions.md` — SCSS coding standards
- `/docs/specifications/scss-ontology-system.md` — All ontological variants
- `_design/tokens/` — Design token source files
