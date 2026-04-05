---
applyTo: "_sass/layouts/**"
description: "Standards for page layout styles in _sass/layouts/"
---

# Layout SCSS Instructions

## Canonical Purpose

`_sass/layouts/` contains **page layout styles** — page-level structures that mirror `_layouts/*.html` templates. Each layout file corresponds to a Jekyll layout template.

## Directory Structure

```
layouts/
├── _bento-engine.scss              # Native CSS Grid system (shared layout primitive)
├── _base-structure.scss            # Fundamental page layout containers (.layout-container, etc.)
├── _layout-ontology.scss           # Ontology-mapped layout classes (legacy class mappings)
├── _responsive-enhancements.scss   # Cross-layout responsive refinements
├── _default.scss                   # Default base layout
├── _post.scss                      # Blog post layout
├── _article.scss                   # Long-form article layout
├── _archive.scss                   # Archive/listing layout
├── _dashboard.scss                 # Analytics dashboard layout
├── _chatroom.scss                  # Real-time chat layout
├── _landing.scss                   # Marketing landing page
├── _docs.scss                      # Documentation layout
└── [12+ more layout files]         # app, faq, form, gallery, profile, search, settings, splash, etc.
```

## What Belongs Here

- ✅ Page-level layout structures (flex columns, grid systems)
- ✅ Layout-specific BEM selectors (`.post-layout`, `.dashboard-layout`)
- ✅ Grid primitives (bento-engine)
- ✅ Fundamental page containers (`.layout-container`, `.page-content`)
- ✅ Responsive layout enhancements
- ✅ Layout-specific ontology class mappings

## What Does NOT Belong

- ❌ Reusable UI components (→ `components/`)
- ❌ Design tokens or variables (→ `base/design/`)
- ❌ Utility classes (→ `base/utilities/`)
- ❌ Include-specific overrides (→ `includes/`)

## Hierarchy Level

Layouts operate at **Levels 1–2** in the ontological hierarchy:

| Level | Required Mixin | Forbidden Mixins |
|-------|----------------|-----------------|
| **1 — Page Layout** | `environment` + `atmosphere` | `entity`, `cognition`, `synapse` |
| **2 — Section** | `environment` | `entity`, `cognition` |

```scss
// ✅ Correct: Level 1 page wrapper
.post-layout {
  @include genesis-environment('focused');
  @include genesis-atmosphere('neutral');
}

// ✅ Correct: Level 2 section
.post__header {
  @include genesis-environment('associative');
}

// ❌ Wrong: entity on a layout wrapper (Level 3 only)
.post-layout {
  @include genesis-entity('primary');
}
```

## Layout File Naming

- Each file corresponds 1:1 to a Jekyll layout in `_layouts/`
- File naming: `_<layout-name>.scss` matches `_layouts/<layout-name>.html`
- BEM root class: `.<layout-name>-layout` (e.g., `.post-layout`, `.dashboard-layout`)
- Nested selectors: `.<layout-name>__<element>` (e.g., `.post__header`, `.dashboard__title`)

## Shared Layout Primitives

- **`_bento-engine.scss`** — Native CSS Grid system used across all layouts
- **`_base-structure.scss`** — Fundamental page containers (`.layout-container`, `.page-layout`)
- **`_layout-ontology.scss`** — Ontology-mapped classes for legacy layout selectors
- **`_responsive-enhancements.scss`** — Cross-layout responsive refinements

These are imported BEFORE individual layout files in `_main.scss`.

## Layout vs Component Distinction

| Aspect | Layout (`layouts/`) | Component (`components/`) |
|--------|-------------------|-----------------------|
| **Scope** | Full page structure | Self-contained visual unit |
| **Hierarchy** | Level 1–2 | Level 3 |
| **Primary mixin** | `environment` + `atmosphere` | `entity` |
| **Naming** | `.<layout>-layout`, `.<layout>__<part>` | `.card`, `.hero`, `.modal` |
| **Mirrors** | `_layouts/*.html` | Reusable across layouts |

→ **Layout system spec**: `/docs/specifications/layout-system.md`  
→ **Ontology mapping**: `/docs/specifications/ontology-html-mapping.md`  
→ **Architecture**: `_sass/README.md`
