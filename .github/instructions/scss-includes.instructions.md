---
applyTo: "_sass/includes/**"
description: "Standards for include-specific styles in _sass/includes/"
---

# Include SCSS Instructions

## Canonical Purpose

`_sass/includes/` contains **include-specific styles** — one-to-one SCSS files that mirror the `_includes/` HTML template hierarchy. Each file styles its corresponding HTML include template.

## Directory Structure

```
includes/
├── _index.scss            # Aggregates all include SCSS files
├── [root includes]        # One-to-one with _includes/*.html
│   ├── _header.scss       # Styles for _includes/header.html
│   ├── _footer.scss       # Styles for _includes/footer.html
│   ├── _hero.scss         # Styles for _includes/hero.html
│   ├── _cta.scss          # Styles for _includes/cta.html
│   ├── _navbar.scss       # Styles for _includes/navbar.html
│   └── [more root files]
├── components/            # One-to-one with _includes/components/*.html
│   ├── _card.scss
│   ├── _pagination.scss
│   ├── _breadcrumb.scss
│   └── [more component files]
└── layouts/               # Include-specific layout sub-partials
    ├── _layout-header.scss
    ├── _layout-footer-cta.scss
    ├── archive/           # _archive-item.scss
    ├── dashboard/         # _dashboard-widget.scss
    ├── post/              # _post-meta.scss, _post-navigation.scss
    └── [more layout subdirs]
```

## What Belongs Here

- ✅ SCSS files that correspond 1:1 to `_includes/*.html` templates
- ✅ Include-specific style adjustments
- ✅ Documentation-only files that reference the actual implementation in `components/`
- ✅ Sub-include styles organized by layout (e.g., `layouts/post/_post-meta.scss`)

## What Does NOT Belong

- ❌ Reusable component logic (→ `components/`)
- ❌ Page layout structures (→ `layouts/`)
- ❌ Design tokens (→ `base/design/`)

## Mirror Structure Convention

The directory hierarchy mirrors `_includes/`:

```
_includes/                    →  _sass/includes/
├── header.html               →  ├── _header.scss
├── footer.html               →  ├── _footer.scss
├── hero.html                 →  ├── _hero.scss
├── components/               →  ├── components/
│   ├── card.html             →  │   ├── _card.scss
│   └── pagination.html       →  │   └── _pagination.scss
└── layouts/                  →  └── layouts/
    └── post/                 →      └── post/
        └── post-meta.html    →          └── _post-meta.scss
```

## Relationship to Components

Many include SCSS files are **thin documentation layers** that reference the actual implementation in `components/`. For example:

```scss
// _sass/includes/_header.scss
// All styles are defined in _sass/includes/core/_genesis-header.scss.
// DO NOT add styles here — they would override the carefully crafted header styles.
```

**When to add styles to an include file:**
- Include-specific adjustments not covered by the component
- Contextual overrides (e.g., header looks different in a specific include context)
- BEM selectors specific to the include's HTML structure

**When to use the component file instead:**
- Reusable visual styling that applies across multiple includes
- Core component implementation (header, footer, navbar)

## Aggregation

All include files are aggregated by `_index.scss` and imported as a single unit in `_main.scss`:

```scss
// In _main.scss
@import "includes/index";  // Imports all include SCSS at once
```

→ **Include templates**: `_includes/README.md`  
→ **Component styles**: `_sass/includes/`  
→ **Architecture**: `_sass/README.md`
