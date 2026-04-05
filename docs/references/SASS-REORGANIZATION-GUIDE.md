# /_sass Directory Reorganization Guide

**Date**: 2026-04-05  
**Version**: 3.0 - Separation of Concerns & Technical Debt Cleanup

## Overview

The `/_sass` directory has been thoroughly reorganized for clear separation of concerns, elimination of duplication, and removal of all technical debt. This is v3.0 — backward compatibility with deprecated patterns is not maintained.

## Current Structure

```
_sass/
├── _main.scss                   # Layer 2: Full theme bundle (reference implementation)
├── _test-compile.scss           # SCSS compilation test entry point
│
├── base/                        # Foundation layer
│   ├── _fontawesome.scss        # Font Awesome 6 (vendored in vendor/fontawesome/)
│   ├── _fonts.scss              # @font-face declarations
│   ├── _icons.scss              # Icon system configuration
│   │
│   ├── design/                  # Design tokens & visual foundation
│   │   ├── _colors.scss              # OKLCH + semantic color tokens (centralized)
│   │   ├── _variables-generated.scss # Generated from _design/tokens.json — DO NOT EDIT
│   │   ├── _variables.scss           # ALL Sass variables: shadows, opacity, spacing, breakpoints
│   │   ├── _dimensions.scss          # Spacing and sizing tokens
│   │   ├── _typography.scss          # Unified: fluid scale + sacred families + material primitives
│   │   └── _theme.scss               # Theme-level configuration
│   │
│   ├── layout/                  # Layout system
│   │   ├── _responsive-system.scss   # Modern breakpoints, container queries, fluid spacing
│   │   ├── _layout-wrappers.scss     # Layout containers
│   │   └── _layout.scss              # Base layout structures
│   │
│   ├── utilities/               # Sass utilities
│   │   ├── _mixins.scss              # Core Sass mixins
│   │   ├── _semantic-mixins.scss     # Semantic mixins (buttons, gradients)
│   │   ├── _accessibility.scss       # WCAG compliance helpers
│   │   └── _common.scss              # Common utility styles
│   │
│   └── effects/                 # Visual effects
│       ├── _animations.scss          # Core keyframe animations
│       ├── _futuristic-effects.scss  # Glassmorphism, glows, gradients
│       └── _ambient-layer.scss       # Sentient ambient atmosphere
│
├── ontology/                    # Ontological Design System
│   ├── _index.scss              # ⭐ Layer 1: Universal base import
│   ├── _tokens.scss             # CSS custom properties
│   ├── _engines.scss            # Engine layer dispatch
│   ├── _interface.scss          # Public semantic API
│   ├── engines/                 # 6 ontological engines
│   │   ├── _atmosphere.scss, _cognition.scss, _entity.scss
│   │   ├── _environment.scss, _state.scss, _synapse.scss
│   │   └── _index.scss
│   └── samples/                 # Usage examples (not compiled to production)
│
├── components/                  # Reusable UI components
│   ├── core/                    # Core UI: header, footer, navbar, cards
│   ├── mixins/                  # Component mixins (loaded before implementations)
│   ├── sections/                # Page sections: hero, CTA, testimonial, timeline
│   ├── products/                # Product-specific components
│   ├── sacred/                  # Sacred/consciousness-themed components
│   ├── specialized/             # Specialized: LinkedIn, base-layout, layout-styles
│   └── web-components/          # Web component template SCSS (canonical location)
│       ├── _index.scss
│       ├── _product-card.scss, _testimonial-card.scss, _alert-card.scss
│
├── includes/                    # Mirrors _includes/ HTML hierarchy
│   ├── _index.scss              # Aggregates all include SCSS files
│   ├── [root includes]          # One-to-one with _includes/*.html
│   ├── components/              # One-to-one with _includes/components/*.html
│   └── layouts/                 # Include-specific layout styles
│
├── layouts/                     # Page layout SCSS (mirrors _layouts/*.html)
│   ├── _bento-engine.scss       # Native CSS Grid system
│   ├── _responsive-enhancements.scss  # Cross-layout responsive refinements
│   └── [20+ layout files]
│
├── demo/                        # Demo-only styles (not for subdomains)
│   ├── _index-demo.scss
│   └── _ontology-demo.scss
│
├── samples/                     # Sample SCSS (not compiled)
│
└── vendor/                      # Vendored third-party
    ├── _rfs.scss
    └── fontawesome/
```

## v3.0 Changes (Separation of Concerns)

### Files Removed

| File | Reason |
|------|--------|
| `base/layout/_responsive.scss` | Deprecated legacy responsive (replaced by `_responsive-system.scss`) |
| `ontology/_theme-layouts.scss` | Orphaned compatibility shim; imports were already in `_main.scss` |
| `base/design/_design-tokens.scss` | Merged into `_variables.scss` (single source for all tokens) |
| `base/design/_semantic-typography.scss` | Merged into `_typography.scss` (unified typography) |
| `components/_product-card.scss` | Duplicate of `web-components/_product-card.scss` |
| `components/_testimonial-card.scss` | Duplicate of `web-components/_testimonial-card.scss` |
| `components/_alert-card.scss` | Duplicate of `web-components/_alert-card.scss` |
| `includes/_futuristic-effects.scss` | Empty stub (comments only, no CSS output) |
| `includes/_motion-library.scss` | Empty stub (comments only, no CSS output) |
| `includes/_transcendent-hero.scss` | Empty stub (comments only, no CSS output) |
| `includes/components/_template-loader.scss` | Empty stub (comments only, no CSS output) |

### Files Consolidated

| Before | After |
|--------|-------|
| `_design-tokens.scss` + `_variables.scss` | Single `_variables.scss` with all tokens |
| `_typography.scss` + `_semantic-typography.scss` | Single `_typography.scss` with fluid scale + sacred families |
| 3 root-level card files + `web-components/` | Single canonical location in `web-components/` |

### Files Moved

| Before | After |
|--------|-------|
| `_sass/_index-demo.scss` | `_sass/demo/_index-demo.scss` |
| `_sass/_ontology-demo.scss` | `_sass/demo/_ontology-demo.scss` |

## Two-Layer Architecture

```
assets/css/style.scss
├── Layer 1: ontology/index    ← Universal base (all subdomains)
└── Layer 2: _main.scss        ← Theme bundle (components, includes, layouts)
```

## File Location Quick Reference

**Sass variables?** → `base/design/_variables.scss`  
**Generated tokens?** → `base/design/_variables-generated.scss` (DO NOT EDIT)  
**Colors?** → `base/design/_colors.scss`  
**Typography?** → `base/design/_typography.scss`  
**Animations?** → `base/effects/_animations.scss`  
**Glassmorphism?** → `base/effects/_futuristic-effects.scss`  
**Layout containers?** → `base/layout/_layout-wrappers.scss`  
**Responsive mixins?** → `base/layout/_responsive-system.scss`  
**Core mixins?** → `base/utilities/_mixins.scss`  
**Web component cards?** → `components/web-components/`  
**Demo styles?** → `demo/`

## Testing

```bash
npm test                        # Run all checks
npm run test:scss               # Sass compilation
npm run validate:scss:units     # Unit compatibility
npm run lint:scss               # Stylelint
npm run tokens:build            # Regenerate variables from tokens.json
```

## Adding New Files

**New component?** → Create in appropriate `components/` subdirectory, add import to `_main.scss`  
**New design token?** → Add to `base/design/_variables.scss`  
**New animation?** → Add to `base/effects/`  
**New layout?** → Create in `layouts/`, add import to `_main.scss`

## Related Documentation

- `_sass/README.md` — Architecture overview
- `_sass/ontology/INTEGRATION-GUIDE.md` — Ontology system guide
- `.github/instructions/scss.instructions.md` — SCSS coding standards
- `/docs/specifications/scss-ontology-system.md` — All ontological variants
