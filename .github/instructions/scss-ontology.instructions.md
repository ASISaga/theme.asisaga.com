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
├── engines/             # 6 ontological engines (internal implementation)
│   ├── _atmosphere.scss # Sensory texture & emotional tone
│   ├── _cognition.scss  # Typography & information intent
│   ├── _entity.scss     # Visual presence & material properties
│   ├── _environment.scss# Spatial organization & layout
│   ├── _state.scss      # Temporal conditions & system status
│   └── _synapse.scss    # Interactions & navigation
└── samples/             # Usage examples (not compiled to production)
```

## What Belongs Here

- ✅ Ontological engine implementations (6 categories)
- ✅ Public semantic API (`_interface.scss`)
- ✅ CSS custom properties (`_tokens.scss`)
- ✅ Usage examples and samples

## What Does NOT Belong

- ❌ Component-specific styles (→ `components/`)
- ❌ Layout-specific styles (→ `layouts/`)
- ❌ Design tokens / variables (→ `base/design/`)
- ❌ Font declarations (→ `base/`)

## Import Rules

- `_index.scss` imports foundation from `base/` (fonts, tokens, utilities, effects)
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

## Adding New Variants

1. Review existing variants in the engine file
2. Verify the gap cannot be expressed by combining existing variants
3. Add the new `@else if` branch in the appropriate engine
4. Update `/docs/specifications/scss-ontology-system.md`
5. Update `GENOME.md` with the evolution entry

→ **Ontology system spec**: `/docs/specifications/scss-ontology-system.md`  
→ **Integration guide**: `_sass/ontology/INTEGRATION-GUIDE.md`  
→ **Evolution history**: `GENOME.md`  
→ **Proposition process**: `.github/prompts/subdomain-evolution-agent.prompt.md`
