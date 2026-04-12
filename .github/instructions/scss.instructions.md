---
applyTo: "**/*.{scss,sass,css},assets/css/**"
description: "Universal SCSS coding standards for Genesis Semantic Design System v2.0"
---

# SCSS Instructions

## PRIMARY METHOD: Genesis Ontology System

**For ALL new development, use ontology mixins exclusively.**

### Quick Start

**Standalone SCSS files** (compilation entry points with Jekyll front matter):
```scss
---
---
@import "ontology/index";  // Required for standalone files

.component {
  @include genesis-environment('distributed');  // Layout
  @include genesis-entity('primary');           // Visual
  @include genesis-cognition('axiom');          // Typography
  @include genesis-synapse('execute');          // Interaction
}
```

**Theme internal files** (`_sass/includes/`, `_sass/layouts/`):
```scss
// NO @import - ontology already imported by assets/css/style.scss
.component {
  @include genesis-environment('distributed');
}
```

### MANDATORY RULES

**Subdomain SCSS** - ZERO raw CSS properties:
- ❌ NO `margin`, `padding`, `color`, `font-size`, `background`
- ❌ NO unit values: `px`, `rem`, `%`
- ❌ NO color values: `#hex`, `rgb()`, `oklch()`
- ✅ ONLY ontological mixins

**Theme internal SCSS:**
- ❌ NEVER use `@extend` (Jekyll build errors)
- ✅ Max 3 nesting levels
- ✅ Use ontology mixins when possible
- ✅ BEM-style naming: `.block__element--modifier`

## Ontology Reference

**Six semantic categories** (89 variants total — 33 foundational + 56 evolved):
→ **Complete reference**: `/docs/specifications/scss-ontology-system.md`

**Quick category list:**
- `genesis-environment($logic)` - Layout: `'distributed'`, `'focused'`, `'associative'`, `'chronological'`, `'manifest'`
- `genesis-entity($nature)` - Visual: `'primary'`, `'secondary'`, `'imperative'`, `'latent'`, `'aggregate'`, `'ancestral'`
- `genesis-cognition($intent)` - Typography: `'axiom'`, `'discourse'`, `'protocol'`, `'gloss'`, `'motive'`, `'quantum'`
- `genesis-synapse($vector)` - Interaction: `'navigate'`, `'execute'`, `'inquiry'`, `'destructive'`, `'social'`
- `genesis-state($condition)` - State: `'stable'`, `'evolving'`, `'deprecated'`, `'locked'`, `'simulated'`
- `genesis-atmosphere($vibe)` - Atmosphere: `'neutral'`, `'ethereal'`, `'void'`, `'vibrant'`

## `_sass/` Directory Architecture

Each subdirectory has a single canonical purpose:

| Directory | Purpose | Path-Specific Instructions |
|-----------|---------|---------------------------|
| **`ontology/`** | Ontological Design System engine (Layer 1) | `scss-ontology.instructions.md` |
| **`ontology/engines/`** | Engine infrastructure: fonts, utilities, layout, effects | — |
| **`design/`** | Design tokens only — pure SCSS mappings to `_design/tokens/*.json` | `scss-base.instructions.md` |
| **`ontology/mixins/`** | Reusable component factory mixins | — |
| **`includes/`** | Include-specific styles + reusable UI components mirroring `_includes/` | `scss-includes.instructions.md` |
| **`includes/core/`** | Site-wide components (header, footer, navbar, cards) | `scss-components.instructions.md` |
| **`layouts/`** | Page layout styles mirroring `_layouts/` | `scss-layouts.instructions.md` |
| **`demo/`** | Demo-only styles (not for subdomains) | — |
| **`samples/`** | Example SCSS (not compiled) | — |
| **`vendor/`** | Vendored third-party (Font Awesome) | — |

**Boundary rules:**
- **Layout code** (page containers, flex columns, grids) → `layouts/`
- **Utility classes** (`.sr-only`, `.container`, legacy) → `ontology/engines/utilities/`
- **Component code** (cards, buttons, heroes, modals) → `includes/core/`
- **Design tokens** (colors, spacing, typography) → `design/`

→ **Full architecture**: `_sass/README.md`

## Visual Design Element Ownership (CRITICAL)

Each visual CSS concern maps from a **semantic purpose** through an owning ontological category to its implementation. Never set a property outside its owner.

| Semantic Purpose | Owner | Visual Design Element | CSS Properties |
|-----------------|-------|---------------------|---------------|
| **Responsive spatial rhythm** | `environment` | White space | `gap`, `margin` (via grid/flex) |
| **Component breathing room** | `entity` | Spacing (internal) | `padding` |
| **Content flow architecture** | `environment` | Layout / grid | `display`, `grid-*`, `flex-*`, `place-*`, `max-width` |
| **Page mood and component surface** | `atmosphere` + `entity` | Color palette | `background`, `color` (via tokens) |
| **Information voice and reading intent** | `cognition` | Typography | `font-size`, `font-weight`, `font-family`, `line-height` |
| **Component edge treatment** | `entity` | Borders | `border`, `border-radius` |
| **Ambient depth and spatial layering** | `atmosphere` | Shading / shadows | `box-shadow` |
| **Lifecycle transitions** | `state` | Animations | `animation`, `transition`, `@keyframes` |
| **Action-specific interaction feedback** | `synapse` | Hover / focus | `:hover`, `:focus`, `cursor`, `transition` |

→ **Full specification**: `/docs/specifications/ontology-html-mapping.md`

## Hierarchy-Level Rules (CRITICAL)

Each HTML element falls into a hierarchy level that determines which mixins are permitted:

| Level | Element type | Required | Optional | Forbidden |
|-------|-------------|----------|----------|-----------|
| **1 — Page Layout** | Outermost wrapper | `environment` + `atmosphere` | — | `entity`, `cognition`, `synapse` |
| **2 — Section** | `<header>`, `<footer>`, `<nav>` | `environment` | `atmosphere`, `state` | `entity`, `cognition` |
| **3 — Component** | Cards, widgets, alerts | `entity` | `environment`, `state`, `atmosphere` | — |
| **4 — Leaf** | `<h1>`–`<h6>`, `<p>`, `<a>`, `<button>` | `cognition` or `synapse` | `state` | `environment`, `atmosphere`, `entity` |

**Key violations to avoid:**
- ❌ `genesis-entity()` on structural containers (Level 1/2) — entity is for visual objects only
- ❌ `genesis-cognition()` on containers — cognition is for text elements only
- ❌ `genesis-atmosphere()` on leaf elements — atmosphere is for containers only

→ **Full specification**: `/docs/specifications/ontology-html-mapping.md`

## WCAG AA Color Accessibility (CRITICAL)

All OKLCH color tokens used for text must meet **4.5:1 contrast ratio** against their background.

**OKLCH lightness rule of thumb:**
- **L ≤ 0.55** for text on white/light surfaces (`oklch(0.99 …)`)
- **L ≥ 0.80** for text on dark/void surfaces (`oklch(0.08 …)`)

**Link underline requirement:**
- Synapse `'navigate'` uses `text-decoration: underline` (not `border-bottom: transparent`)
- Links must be distinguishable from surrounding text without relying solely on color
- Hover may change `text-decoration-thickness` but must retain underline

**Body text color:**
- Body defaults to `$text-primary` (dark) — light backgrounds are the default surface
- ❌ NEVER set body color to `$text-inverse` — causes invisible text on all light sections

→ **Full accessibility specification**: `.github/specs/ontological-design-system.md` § Accessibility Compliance

## Theme/Subdomain Architecture (CRITICAL)

**Theme repository (this repo):**
- Defines Jekyll layouts in `_layouts/` and `_includes/`
- Provides SCSS via `_sass/` imported through layout head
- Builds final theme by importing `ontology/index` directly in `assets/css/style.scss`
- **Responsibility**: All SCSS, layouts, components

**Subdomain repositories:**
- Create HTML pages using Jekyll layouts from theme
- Pages reference theme's SCSS through layout `<head>` 
- **Page-specific SCSS** in `_sass/main.scss` (optional, ontology-only, NO imports)
- **NO `assets/css/custom.scss`** (deprecated, use `_sass/main.scss` instead)
- **NO `_layouts/` or `_includes/`** directories in subdomains
- **Mandatory `assets/js/script.js`** (loaded after theme's common.js)
- **Responsibility**: HTML content only

## Import Rules (CRITICAL)

**DO import `ontology/index` ONLY in:**
- ✅ `assets/css/style.scss` (theme's main stylesheet entry point)

**NEVER import in:**
- ❌ Subdomain's `_sass/main.scss` (ontology already available from theme)
- ❌ `_sass/includes/` partials (ontology already imported by `assets/css/style.scss`)
- ❌ `_sass/layouts/` partials (ontology already imported by `assets/css/style.scss`)
- ❌ Any file inside `_sass/` directory (creates 22MB bloat)

**Why**: `assets/css/style.scss` imports `ontology/index` as Layer 1. All `_sass/` partials imported after this (via `_main.scss`) have ontology available without re-importing. Duplicate imports cause massive CSS bloat (22MB vs 1.1MB).

## Testing & Linting

### CRITICAL: Pre-Commit Validation

**ALWAYS run `npm test` before committing SCSS changes.**

**Required workflow:**
```bash
npm test                    # ⚠️ MANDATORY before committing (runs all checks below)
```

Individual validation commands (all included in `npm test`):
```bash
npm run test:scss           # Fast Sass compilation check (catches undefined mixins/vars)
npm run validate:scss:units # Unit compatibility validation (vw/rem mixing)
npm run lint:scss           # Code style and best practices
```

### Common Errors and Fixes

**❌ Incompatible units error:**
```scss
.component {
  margin: 5vw + 1rem;        // ❌ Sass compilation error
}
```

**✅ Correct approach:**
```scss
.component {
  margin: calc(5vw + 1rem);           // ✅ Browser calculates at runtime
  padding: clamp(1rem, 2vw + 0.5rem, 3rem);  // ✅ Fluid with constraints
}
```

→ **Unit compatibility**: `/docs/specifications/fluid-design-unit-compatibility.md`  
→ **Stylelint guide**: `/docs/guides/STYLELINT.md`  
→ **Unit validator skill**: `.github/skills/scss-unit-validator/SKILL.md`

## Documentation References

**Path-specific instructions** (auto-loaded when editing files in these directories):
- `.github/instructions/scss-ontology.instructions.md` — `_sass/ontology/**`
- `.github/instructions/scss-base.instructions.md` — `_sass/design/**`
- `.github/instructions/scss-components.instructions.md` — `_sass/includes/**`
- `.github/instructions/scss-layouts.instructions.md` — `_sass/layouts/**`
- `.github/instructions/scss-includes.instructions.md` — `_sass/includes/**`

**Complete ontology system:**
- `/docs/specifications/ontology-html-mapping.md` - **Formal hierarchy rules for mixin-to-HTML mapping**
- `/docs/specifications/scss-ontology-system.md` - All variants, OKLCH colors, design tokens
- `_sass/ontology/INTEGRATION-GUIDE.md` - Comprehensive API guide
- `GENOME.md` - Variant history and evolution

**Style guidelines:**
- `/docs/specifications/fluid-design-unit-compatibility.md` - Unit mixing rules
- `/docs/guides/STYLELINT.md` - Linting setup and rules

**Architecture:**
- `_sass/README.md` - Complete SCSS architecture
- `.github/specs/genesis-theme-repository.md` - Repository specification
