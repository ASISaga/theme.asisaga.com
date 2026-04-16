---
applyTo: "_sass/ontology/**"
description: "Standards for the Ontological Design System engine in _sass/ontology/"
---

# Ontology Engine Instructions

## Canonical Purpose

`_sass/ontology/` is the **Ontological Design System engine** — Layer 1 of the two-layer SCSS architecture. It provides the universal base that all subdomains and theme components build upon.

## Directory Structure

```
ontology/
├── _index.scss          # ⭐ Universal base import (the ONLY import subdomains need)
├── _tokens.scss         # CSS custom properties (spacing, sizing, motion, z-index, radius)
├── _engines.scss        # Engine layer dispatch
├── _interface.scss      # Public semantic API (genesis-* mixins)
└── engines/             # Engine implementations + infrastructure
    ├── _atmosphere.scss # Sensory texture & emotional tone
    ├── _cognition.scss  # Typography & information intent
    ├── _entity.scss     # Visual presence & material properties
    ├── _environment.scss# Spatial organization & layout
    ├── _state.scss      # Temporal conditions & system status
    ├── _synapse.scss    # Interactions & navigation
    ├── _fontawesome.scss# Font Awesome 6 Free (vendored)
    ├── _fonts.scss      # @font-face declarations
    ├── _icons.scss      # Icon system configuration
    ├── components/      # Component engine implementations
    ├── effects/         # Visual effects (animations, glassmorphism, ambient)
    ├── layout/          # Layout primitives (responsive system, wrappers)
    └── utilities/       # Sass mixins, accessibility, common utilities
```

Design tokens live at `_sass/design/` (separate from `ontology/`) — see `scss-base.instructions.md`.

## What Belongs Here

- ✅ Ontological engine implementations (6 categories + component engine)
- ✅ Public semantic API (`_interface.scss`)
- ✅ CSS custom properties (`_tokens.scss`)
- ✅ Infrastructure: fonts, icons, Font Awesome, effects, layout, utilities

## What Does NOT Belong

- ❌ Design tokens / variables (→ `_sass/design/`)
- ❌ Component-specific include styles (→ `includes/`)
- ❌ Layout-specific page styles (→ `layouts/`)

## Import Rules

- `_index.scss` imports design tokens from `../design/` and infrastructure from `engines/`
- `_index.scss` is imported ONLY by `assets/css/style.scss` — never by other `_sass/` partials
- Engine files (`engines/*.scss`) are internal — never import individually

## Engine Architecture

Each engine provides one or more `@mixin` definitions dispatched by variant name:

```scss
// In engines/_environment.scss
@mixin genesis-environment($logic) {
  @if $logic == 'distributed' { /* auto-fit grid */ }
  @else if $logic == 'focused' { /* single-column 70ch */ }
  // ...
}
```

The `_interface.scss` re-exports all 6 mixins as the public API.

## Colour Values (CRITICAL — NO RAW oklch() IN ENGINE FILES)

**All colour values in `_sass/ontology/engines/` MUST use `$color-*` Sass variables.**  
Raw `oklch()`, `hex`, `rgb()`, and `hsl()` literals are **forbidden** in engine files.  
This is enforced by stylelint (`declaration-property-value-disallowed-list`).

### Three usage contexts

```scss
// 1. Regular CSS property → plain $color-* variable
background: $color-dark-profound-black;
color: $color-accent-neon-blue;

// 2. CSS custom property definition → #{} interpolation REQUIRED
--badge-bg: #{$color-accent-neon-blue};        // ✅ correct
--badge-bg: $color-accent-neon-blue;           // ❌ Sass treats RHS as literal string

// 3. var() fallback → plain variable, no interpolation needed
background: var(--genesis-bg-surface, $color-dark-profound-black);  // ✅
```

### Adding a new colour

1. Add the token to `_design/tokens/2-color.json` under the appropriate ontological category:
   ```json
   "color": {
     "wisdom": {
       "my-new-shade": {
         "$type": "color",
         "$value": "oklch(0.85 0.18 95)",
         "$description": "Brief description"
       }
     }
   }
   ```
2. Regenerate: `npm run tokens:build`
3. Reference: `$color-wisdom-my-new-shade`

### Token locations

| Purpose | File | Variable prefix |
|---------|------|----------------|
| Existing semantic tokens (brand, status, etc.) | `_sass/design/_colors-generated.scss` | `$color-*` |
| Ontological palette tokens | `_design/tokens/2-color.json` → `color.{category}.*` | `$color-ether-*`, `$color-spark-*`, `$color-wisdom-*`, etc. |

**NEVER** declare `$color-*` variables inside engine files — those belong exclusively in `_sass/design/`.

## Adding New Variants

1. Review existing variants in the engine file
2. Verify the gap cannot be expressed by combining existing variants
3. Add the new `@else if` branch in the appropriate engine
4. **Use only `$color-*` variables for all colour values** (see section above)
5. Update `/docs/specifications/scss-ontology-system.md`
6. Update `GENOME.md` with the evolution entry

→ **Ontology system spec**: `/docs/specifications/scss-ontology-system.md`  
→ **Integration guide**: `_sass/ontology/INTEGRATION-GUIDE.md`  
→ **Evolution history**: `GENOME.md`  
→ **Proposition process**: `.github/prompts/subdomain-evolution-agent.prompt.md`
