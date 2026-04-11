---
applyTo: "_sass/design/**"
description: "Standards for the design token layer in _sass/design/ — SCSS mappings to _design/tokens/*.json"
---

# Design Token Layer Instructions

## Canonical Purpose

`_sass/design/` is the **design token layer** — pure SCSS mappings of the JSON token files in `_design/tokens/*.json`. These files define all Sass variables ($variables) and are the ONLY place where $variable declarations are allowed.

**This directory maps directly to `_design/tokens/*.json`.**

The non-token infrastructure (fonts, utilities, layout, effects) is now in `_sass/ontology/engines/`.

## Directory Structure

```
_sass/design/
├── _colors.scss           # OKLCH + semantic color tokens (centralized)
├── _variables-generated.scss  # ⚠️ Generated from _design/tokens/*.json — DO NOT EDIT
├── _variables.scss        # Theme-wide Sass variables (sacred aliases, component tokens)
├── _dimensions.scss       # Spacing and sizing tokens
├── _typography.scss       # Unified: fluid scale + sacred families
└── _theme.scss            # Theme-level configuration
```

## What Belongs Here

- ✅ Design tokens (colors, spacing, typography scales, shadows)
- ✅ CSS custom properties (`--token-*`)
- ✅ Sass variables (`$variable`) — only allowed here

## What Does NOT Belong

- ❌ Font declarations (`@font-face`) → `_sass/ontology/engines/_fonts.scss`
- ❌ Sass utility mixins → `_sass/ontology/engines/utilities/`
- ❌ Visual effects → `_sass/ontology/engines/effects/`
- ❌ Layout primitives → `_sass/ontology/engines/layout/`
- ❌ Ontological engine code → `_sass/ontology/engines/`

## Key Rules

### Design Tokens

- **All color tokens** centralized in `_colors.scss` — OKLCH format
- **Generated tokens** in `_variables-generated.scss` — regenerate with `npm run tokens:build`
- **Manual variables** in `_variables.scss` — shadows, opacity, spacing, breakpoints
- **Typography** unified in `_typography.scss` — fluid scale + sacred families

### $Variable Rule

- `scss/no-dollar-variables` is exempted **only** for `_sass/design/**/*.scss`
- All other SCSS files must use variables, not declare them

→ **Token specification**: `_design/tokens/` (split files)  
→ **Token build**: `npm run tokens:build`  
→ **Color system**: `/docs/specifications/color-system.md`  
→ **Typography**: `/docs/specifications/typography.md`  
→ **Fluid design**: `/docs/specifications/fluid-design-unit-compatibility.md`
