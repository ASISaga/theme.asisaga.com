---
applyTo: "_sass/components/**"
description: "Standards for reusable UI components in _sass/components/"
---

# Component SCSS Instructions

## Canonical Purpose

`_sass/components/` contains **reusable UI components** — visual elements like cards, headers, heroes, modals, and forms. Components are self-contained visual units, NOT page-level layout structures.

## Directory Structure

```
components/
├── core/                # Site-wide components present on every page
│   ├── _genesis-core.scss       # body, main, skip-link, ambient layer
│   ├── _genesis-header.scss     # Glassmorphism sticky header
│   ├── _genesis-footer.scss     # Grid footer with deep void aesthetic
│   ├── _header.scss             # Generic header structure
│   ├── _footer.scss             # Generic footer structure
│   ├── _navbar.scss             # Navigation with off-canvas drawer
│   ├── _cards.scss              # Card variants (elevated, accent)
│   ├── _ui-components.scss      # Modal, collapse/accordion, tabs
│   ├── _back-to-top.scss        # Back-to-top button
│   ├── _linkedin.scss           # LinkedIn integration component
│   └── _specialized.scss        # Ontology reference implementations
├── mixins/              # Component factory mixins (loaded before implementations)
│   ├── _card-component.scss
│   ├── _hero-component.scss
│   ├── _form-component.scss
│   └── [8 more mixin files]
├── sections/            # Page sections (hero, CTA, testimonial, etc.)
├── products/            # Product-specific display components
├── sacred/              # Sacred/consciousness-themed components
└── web-components/      # Web component template SCSS (canonical location)
    ├── _index.scss
    ├── _product-card.scss
    ├── _testimonial-card.scss
    └── _alert-card.scss
```

## What Belongs Here

- ✅ Visual UI elements (cards, buttons, modals, heroes, forms)
- ✅ Component factory mixins (in `mixins/` subdirectory)
- ✅ Section patterns (hero, CTA, testimonial, timeline)
- ✅ Domain-specific components (products, sacred)
- ✅ Web component SCSS (in `web-components/`)
- ✅ Third-party integration components (LinkedIn)

## What Does NOT Belong

- ❌ Page layout structures (→ `layouts/`)
- ❌ Utility classes like `.sr-only`, `.container` (→ `base/utilities/`)
- ❌ Design tokens or variables (→ `base/design/`)
- ❌ Include-specific style overrides (→ `includes/`)

## Hierarchy Level

Components are at **Level 3** in the ontological hierarchy:

| Level | Required Mixin | Forbidden Mixins |
|-------|----------------|-----------------|
| **3 — Component** | `genesis-entity()` | — (most categories optional) |

```scss
// ✅ Correct: entity for visual presence, optional state
.card {
  @include genesis-entity('primary');
  @include genesis-state('stable');
}

// ❌ Wrong: atmosphere on a component (Level 1 only)
.card {
  @include genesis-atmosphere('ethereal');
}
```

## Visual Design Element Ownership

When writing component SCSS, use only the owning mixin category for each CSS concern:

| CSS Concern | Owner Mixin | Example |
|-------------|------------|---------|
| `padding` | `entity` | `@include genesis-entity('primary');` |
| `border`, `border-radius` | `entity` | `@include genesis-entity('imperative');` |
| `font-*`, `line-height` | `cognition` | `@include genesis-cognition('axiom');` |
| `:hover`, `:focus` | `synapse` | `@include genesis-synapse('execute');` |
| `opacity`, `filter` | `state` | `@include genesis-state('deprecated');` |

→ **Full ownership table**: `.github/instructions/scss.instructions.md` § Visual Design Element Ownership

## Component Development Rules

- ❌ NEVER use `@extend` (causes Jekyll build errors)
- ✅ Max 3 nesting levels
- ✅ BEM-style naming: `.block__element--modifier`
- ✅ Load mixins/ before implementation files (see `_main.scss` import order)
- ✅ Web component SCSS in `web-components/` only (canonical location)

→ **Component library spec**: `/docs/specifications/component-library.md`  
→ **Ontology mapping**: `/docs/specifications/ontology-html-mapping.md`  
→ **Architecture**: `_sass/README.md`
