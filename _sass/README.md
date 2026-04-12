# SCSS Architecture — ASI Saga Design System v3.0

## Two-Layer Architecture

```
assets/css/style.scss          ← Jekyll compilation entry point
├── Layer 1: ontology/index    ← Universal base (design tokens + ontological API)
└── Layer 2: _main.scss        ← Theme bundle (includes, layouts, demo styles)
```

**Subdomains** import `ontology/index` + a minimal `_main.scss` with only the layouts they need.

## Canonical Directory Purposes

Each subdirectory of `_sass/` has a single, well-defined responsibility:

| Directory | Canonical Purpose | What Belongs Here | What Does NOT Belong |
|-----------|------------------|-------------------|---------------------|
| **`design/`** | Design tokens only — SCSS mappings to `_design/tokens/*.json` | Colors, variables, typography, dimensions — all `$variable` declarations | Fonts, effects, utilities, component styles |
| **`ontology/`** | Ontological Design System engine (Layer 1) | 6 semantic engines, public API, CSS tokens, infrastructure | Layout-specific styles |
| **`ontology/engines/`** | Engine infrastructure — fonts, utilities, layout, effects | Fonts, icon config, layout primitives, effects, utility mixins, component engines | Design token `$variables` |
| **`includes/`** | Include-specific styles + reusable UI components | One-to-one SCSS for `_includes/*.html`, core components, sections, products, sacred, web-components | Page layout structures, design tokens |
| **`layouts/`** | Page layout styles mirroring `_layouts/` HTML | Layout structures, grid systems, page-type-specific styles | Reusable component styles, design tokens |
| **`demo/`** | Demo-only styles for the theme's showcase pages | Index page demo, ontology animation demos | Production styles needed by subdomains |
| **`samples/`** | Example/reference SCSS (not compiled to production) | Ontology usage examples, showcase patterns | Production code |
| **`vendor/`** | Vendored third-party SCSS | Font Awesome | Custom theme code |

### Boundary Rules

- **Layout code** (page-level containers, flex columns, grid systems) → `layouts/`
- **Utility classes** (`.sr-only`, `.container`, legacy compatibility) → `ontology/engines/utilities/`
- **Component code** (visual UI elements: cards, buttons, heroes, modals) → `includes/core/`
- **Design tokens** (`$variables`, colors, spacing, typography scales) → `design/`
- **Infrastructure** (fonts, icons, effects, layout primitives) → `ontology/engines/`
- **Ontology engines and API** → `ontology/` only

## Directory Structure

```
_sass/
├── _main.scss                   # Layer 2: Full theme bundle (reference implementation)
├── _test-compile.scss           # SCSS compilation test entry point
│
├── design/                      # Design Tokens — maps to _design/tokens/*.json
│   ├── _colors.scss             # OKLCH + semantic color tokens (centralized)
│   ├── _variables-generated.scss# Generated from _design/tokens/*.json — DO NOT EDIT
│   ├── _variables.scss          # Theme-wide Sass variables (sacred aliases, component tokens)
│   ├── _dimensions.scss         # Spacing and sizing tokens
│   ├── _typography.scss         # Unified: fluid scale + sacred families
│   └── _theme.scss              # Theme-level configuration
│
├── ontology/                    # Ontological Design System (Layer 1)
│   ├── _index.scss              # ⭐ Universal base import (the ONLY import subdomains need)
│   ├── _tokens.scss             # CSS custom properties (spacing, sizing, motion, z-index, radius)
│   ├── _engines.scss            # Engine layer dispatch
│   ├── _interface.scss          # Public semantic API (genesis-* mixins)
│   └── engines/                 # Engine implementations + infrastructure
│       ├── _atmosphere.scss     # Sensory texture & emotional tone
│       ├── _cognition.scss      # Typography & information intent
│       ├── _entity.scss         # Visual presence & material properties
│       ├── _environment.scss    # Spatial organization & layout
│       ├── _state.scss          # Temporal conditions & system status
│       ├── _synapse.scss        # Interactions & navigation
│       ├── _fontawesome.scss    # Font Awesome 6 (vendored in vendor/fontawesome/)
│       ├── _fonts.scss          # @font-face declarations
│       ├── _icons.scss          # Icon system configuration
│       ├── components/          # Component engine implementations
│       ├── effects/             # Visual effects
│       │   ├── _animations.scss          # Core keyframe animations
│       │   ├── _futuristic-effects.scss  # Glassmorphism, glows, gradients
│       │   └── _ambient-layer.scss       # Sentient ambient atmosphere
│       ├── layout/              # Layout primitives
│       │   ├── _responsive-system.scss   # Modern breakpoints, container queries
│       │   ├── _layout-wrappers.scss     # Layout containers
│       │   ├── _layout.scss              # Base layout structures
│       │   ├── _base-structure.scss      # Fundamental page layout containers
│       │   ├── _layout-ontology.scss     # Ontology-mapped layout classes
│       │   └── _responsive-enhancements.scss # Cross-layout responsive refinements
│       └── utilities/           # Sass utilities and legacy compatibility
│           ├── _mixins.scss              # Core Sass mixins
│           ├── _semantic-mixins.scss     # Semantic mixins (buttons, gradients)
│           ├── _structural-mixins.scss   # Structural utility mixins (positioning, flex, grid)
│           ├── _accessibility.scss       # WCAG compliance helpers
│           ├── _common.scss              # Common utility styles
│           └── _legacy-utilities.scss    # Legacy compatibility (.sr-only, .container, .row)
│
│   │   └── [more core files]
│   ├── sections/                # Page sections: hero, CTA, testimonial, timeline
│   ├── products/                # Product-specific display components
│   ├── sacred/                  # Sacred/consciousness-themed components
│   ├── web-components/          # Web component template SCSS
│   ├── components/              # One-to-one with _includes/components/*.html
│   └── layouts/                 # Include-specific layout styles
│
├── layouts/                     # Page layout styles mirroring _layouts/*.html
│   └── [20 layout files]       # app, default, post, article, dashboard, etc.
│
├── demo/                        # Demo-only styles (not for subdomains)
├── samples/                     # Sample/example SCSS (not compiled)
└── vendor/                      # Vendored third-party SCSS
    └── fontawesome/             # Font Awesome 6 Free SCSS
```

## Import Chain

```
ontology/_index.scss (Layer 1):
  0. Foundation:       fonts, icons, colors, variables, dimensions
  1. Utilities:        mixins, semantic-mixins, accessibility, common
  2. Typography:       unified fluid + sacred typography
  3. Layout:           responsive-system, layout-wrappers, layout
  4. Effects:          animations, futuristic-effects, ambient-layer
  5. Ontology Tokens:  CSS custom properties
  6. Ontology Engines: atmosphere, cognition, entity, environment, state, synapse
  7. Ontology API:     public semantic interface

_main.scss (Layer 2):
  1. Layout utilities:  bento-engine
  2. Foundation utils:  legacy-utilities (compatibility classes)
  3. Component mixins:  ontology/mixins/ (load before implementations)
  4. Core includes:     header, footer, navbar, cards, UI, LinkedIn, specialized
  5. Section includes
  6. Product includes
  7. Sacred includes
  8. Web components:    includes/web-components/_index.scss
  9. Includes:          includes/_index.scss (mirrors _includes/)
  10. Layouts:           base-structure, layout-ontology, responsive-enhancements, 20 page layouts
  11. Demo styles:       demo/_index-demo.scss
```

## Ontological API

Six semantic categories available after importing `ontology/index`:

```scss
@include genesis-environment($logic);    // Layout: 'distributed', 'focused', 'associative', etc.
@include genesis-entity($nature);        // Visual: 'primary', 'secondary', 'imperative', etc.
@include genesis-cognition($intent);     // Typography: 'axiom', 'discourse', 'protocol', etc.
@include genesis-synapse($vector);       // Interaction: 'navigate', 'execute', 'inquiry', etc.
@include genesis-state($condition);      // State: 'stable', 'evolving', 'deprecated', etc.
@include genesis-atmosphere($vibe);      // Atmosphere: 'neutral', 'ethereal', 'void', etc.
```

## Testing

```bash
npm test                        # Run all checks (compilation + units + lint)
npm run test:scss               # Sass compilation check
npm run validate:scss:units     # Unit compatibility validation
npm run lint:scss               # Stylelint code quality
npm run tokens:build            # Regenerate _variables-generated.scss from tokens.json
```

## Key Rules

1. **`ontology/index`** imported ONLY in `assets/css/style.scss` — never in `_sass/` partials
2. **Variables in `design/`** — never declare `$variables` elsewhere; design/ is the ONLY exempt directory
3. **Typography unified in `design/_typography.scss`** — fluid scale + sacred families + material primitives
4. **Web component SCSS in `includes/web-components/`** — canonical location, no duplicates
5. **Demo styles in `demo/`** — separated from production code
6. **No `@extend`** — causes Jekyll build errors
7. **Max 3 nesting levels**
8. **Layout code in `layouts/`** — never in `includes/`
9. **Utility classes in `ontology/engines/utilities/`** — never in `includes/`
