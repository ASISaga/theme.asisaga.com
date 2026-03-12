# Ontology-to-HTML Mapping Specification

*Formal guidelines for applying Genesis ontological mixins to HTML elements*

**Version**: 1.0.0
**Status**: Active
**Last Updated**: 2026-03-12

## Overview

This specification defines **which ontological mixins must be applied at each level of the HTML hierarchy**. It prevents visual inconsistencies caused by misuse of the Genesis Semantic Design System.

Every layout and component in the theme repository — and every page in subdomain repositories — must follow these rules.

## Scope

- **Included**: Mapping rules for all six ontological categories, HTML element hierarchy, layout-level conventions, component-level conventions, and subdomain content-level conventions.
- **Excluded**: Engine-level CSS implementation details (see `_sass/ontology/engines/`), color token values (see `scss-ontology-system.md`).

## Core Principle: One Layer Per Concern

Each ontological category owns exactly one concern. **Never apply a mixin to handle a concern it does not own.**

| Category | Concern | Owns | Forbidden to Set |
|----------|---------|------|------------------|
| **Environment** | Spatial layout | `display`, `grid`, `flex`, `gap`, `max-width`, `place-items` | `background`, `color`, `border`, `box-shadow`, `font-*` |
| **Entity** | Visual surface | `border`, `border-radius`, `padding`, `backdrop-filter` | `display`, `grid`, `gap`, `font-*`, `color` |
| **Cognition** | Typography | `font-size`, `font-weight`, `font-family`, `line-height`, `letter-spacing`, `text-transform` | `display`, `padding`, `border`, `background` |
| **Synapse** | Interaction | `cursor`, hover/focus states, `transition`, interaction feedback | `display`, `grid`, `font-size` |
| **State** | Temporal condition | `opacity`, `filter`, `animation`, `text-decoration` | `display`, `padding`, `font-size`, `background` |
| **Atmosphere** | Emotional tone | `background`, `box-shadow`, `backdrop-filter` | `display`, `grid`, `font-*`, `border` |

## HTML Hierarchy Levels

The Genesis system recognizes four hierarchy levels. Each level has permitted and forbidden mixin categories.

### Level 1 — Page Layout (the outermost content wrapper)

**HTML elements**: The root wrapper inside `<main>` — typically a `<div>`, `<article>`, or `<section>` with a layout class like `.post-layout`, `.dashboard-layout`, `.landing-layout`.

**Required mixins**:

| Mixin | Purpose | Example |
|-------|---------|---------|
| `genesis-environment($logic)` | Defines the page's spatial logic | `'focused'`, `'chronological'`, `'manifest'` |
| `genesis-atmosphere($vibe)` | Sets the page's emotional tone | `'neutral'`, `'vibrant'`, `'void'` |

**Forbidden mixins** at this level:

| Mixin | Reason |
|-------|--------|
| `genesis-entity()` | Page wrappers are not visual objects; they are spatial containers |
| `genesis-cognition()` | Page wrappers contain text, they are not text |
| `genesis-synapse()` | Page wrappers are not interactive elements |

**Choosing the right `environment`**:

| Content pattern | Environment | Use when |
|----------------|-------------|----------|
| Long-form reading (blog, article, docs) | `'focused'` | Content benefits from a single narrow column (max 70ch) |
| Card grids, portfolios, galleries | `'distributed'` | Content is a collection of autonomous items in a responsive grid |
| Dashboards, analytics, monitoring | `'manifest'` | High-density 12-column layout with KPI widgets |
| Feeds, timelines, changelogs | `'chronological'` | Items arranged in time-linear vertical order |
| Network graphs, relationship views | `'associative'` | Connections between items matter; flexbox wrap |
| Sidebar + main content | `'convergent'` | Two-column layout with sidebar |
| Multi-panel app shells | `'panelled'` | Three+ column app layout |
| Marketing/landing pages | `'chronological'` | Sections stacked vertically for scroll-through |

**Choosing the right `atmosphere`**:

| Page type | Atmosphere | Rationale |
|-----------|-----------|-----------|
| Standard content pages | `'neutral'` | Default, balanced, no special mood |
| Documentation, reading-focused | `'ethereal'` | Light, peaceful, minimal distraction |
| Dashboards, admin, dark UIs | `'void'` | Deep-space, immersive, high-contrast |
| Marketing, landing pages | `'vibrant'` | High-energy, colorful, attention-grabbing |

### Level 2 — Section (semantic groupings within a page)

**HTML elements**: `<header>`, `<footer>`, `<section>`, `<aside>`, `<nav>` — structural groupings within the page layout.

**Required mixins**:

| Mixin | Purpose | Example |
|-------|---------|---------|
| `genesis-environment($logic)` | Internal layout of the section's children | `'associative'` for horizontal meta rows, `'chronological'` for vertical lists |

**Optional mixins**:

| Mixin | When to use |
|-------|-------------|
| `genesis-atmosphere($vibe)` | Only when the section has a distinctly different mood from the page (e.g., a dark footer on a light page) |

**Forbidden mixins** at this level:

| Mixin | Reason |
|-------|--------|
| `genesis-entity()` | Sections are structural containers, not leaf-level content objects. Entity is reserved for cards, widgets, and self-contained visual items. |
| `genesis-cognition()` | Sections contain text elements; they are not text |

**Guidance for common sections**:

| Section | Recommended mixins | Notes |
|---------|-------------------|-------|
| Page header (`<header>`) | `genesis-environment('associative')` | Horizontal layout for title + meta |
| Metadata row | `genesis-environment('associative')` | Horizontal flex for date, author, reading time |
| Sidebar / TOC | `genesis-environment('chronological')` | Vertical nav list |
| Content area | `genesis-environment('focused')` | Narrow reading column |
| Footer CTA | `genesis-environment('focused')` | Centered call-to-action |
| Tag/category list | `genesis-environment('associative')` | Horizontal tag chips |

### Level 3 — Component (self-contained visual objects)

**HTML elements**: `<article>` (when nested), `<div>` with component class, cards, widgets, form groups, alerts, stat blocks.

**Required mixins**:

| Mixin | Purpose | Example |
|-------|---------|---------|
| `genesis-entity($nature)` | Defines the component's visual weight and surface | `'primary'`, `'secondary'`, `'imperative'` |

**Optional mixins**:

| Mixin | When to use |
|-------|-------------|
| `genesis-environment($logic)` | When the component's internal layout needs explicit spatial logic |
| `genesis-state($condition)` | When the component has temporal state (loading, deprecated, locked) |
| `genesis-atmosphere($vibe)` | Only when the component needs a mood distinct from its parent section |

**Choosing the right `entity`**:

| Component role | Entity | Visual effect |
|---------------|--------|---------------|
| Primary content card, main widget | `'primary'` | Active glassmorphism, elevated, prominent |
| Supporting info, sidebar card | `'secondary'` | Lighter glass, less prominent |
| Alert, notification, urgent banner | `'imperative'` | Pulsing neon border, draws attention |
| Disabled card, inactive widget | `'latent'` | Dimmed, grayscale, de-emphasized |
| Wrapper around multiple child items | `'aggregate'` | Larger padding, subtle border |
| Archived/historical content | `'ancestral'` | Muted, legacy appearance |

### Level 4 — Leaf Element (text, links, buttons, images)

**HTML elements**: `<h1>`–`<h6>`, `<p>`, `<a>`, `<button>`, `<span>`, `<time>`, `<code>`, `<img>`, `<input>`.

**Required mixins** (choose based on element role):

| Element role | Mixin | Variant | Notes |
|-------------|-------|---------|-------|
| Page title, section heading | `genesis-cognition('axiom')` | Fluid 2–3.5rem, bold | `<h1>`, `<h2>` with primary heading role |
| Body text, paragraphs | `genesis-cognition('discourse')` | 1–1.125rem, serif, readable | `<p>`, `<div>` with prose content |
| Code blocks, technical content | `genesis-cognition('protocol')` | Monospace, code styling | `<code>`, `<pre>`, `<kbd>` |
| Metadata, captions, timestamps | `genesis-cognition('gloss')` | 0.8–0.875rem, muted | `<time>`, `<span>` with metadata |
| Persuasive text, CTA copy | `genesis-cognition('motive')` | Semibold, accent color | CTA headings, instructional text |
| Tags, chips, badges | `genesis-cognition('quantum')` | Tiny, uppercase, dense | `<span>` tags, category labels |
| Page navigation links | `genesis-synapse('navigate')` | Underline on hover | `<a>` links to other pages |
| Primary action buttons | `genesis-synapse('execute')` | Prominent button styling | `<button>`, `<a>` for primary CTA |
| Search, expand, secondary actions | `genesis-synapse('inquiry')` | Subtle button styling | Search buttons, "show more" |
| Delete, cancel, destructive actions | `genesis-synapse('destructive')` | Red/warning styling | `<button>` for danger actions |
| Social sharing links | `genesis-synapse('social')` | Rounded, social colors | Social media links |

**Forbidden mixins** at this level:

| Mixin | Reason |
|-------|--------|
| `genesis-environment()` | Leaf elements do not define spatial layout |
| `genesis-atmosphere()` | Leaf elements do not set emotional tone |
| `genesis-entity()` | Leaf elements are not visual surfaces (exception: images with `'image-adaptive'`) |

**Exception — Images**:
```scss
.hero-image { @include genesis-entity('image-adaptive'); }
.embed-video { @include genesis-entity('embed-responsive'); }
```

## Combination Rules

### Permitted Combinations Per Element

An element may receive **at most one mixin from each category**, and only from categories permitted at its hierarchy level.

| Level | Environment | Entity | Cognition | Synapse | State | Atmosphere |
|-------|:-----------:|:------:|:---------:|:-------:|:-----:|:----------:|
| 1 — Page Layout | ✅ Required | ❌ | ❌ | ❌ | ❌ | ✅ Required |
| 2 — Section | ✅ Required | ❌ | ❌ | ❌ | Optional | Optional |
| 3 — Component | Optional | ✅ Required | ❌ | ❌ | Optional | Optional |
| 4 — Leaf Element | ❌ | ❌* | ✅ or Synapse | ✅ or Cognition | Optional | ❌ |

*Exception: `genesis-entity('image-adaptive')` and `genesis-entity('embed-responsive')` are permitted on leaf-level media elements.

### Forbidden Combinations

1. **Never apply `genesis-entity()` to a structural container** (Level 1 or Level 2). Entity is for leaf-level visual objects at Level 3.
2. **Never apply `genesis-cognition()` to a container**. Cognition is for text elements, not their wrappers.
3. **Never stack `genesis-environment()` and `genesis-entity()` on the same element** except at Level 3 when a component both needs internal layout and visual surface.
4. **Never apply `genesis-atmosphere()` to leaf elements**. Atmosphere is for containers (Level 1–3).

## Layout Reference

This section shows the correct ontological mixin application for each theme layout.

### `default.html` — Base scaffold

```scss
.layout-container {
  @include genesis-atmosphere('neutral');      // Level 1: page tone
}
.page-content {
  // Structural flex — no ontological mixin needed for the default wrapper.
  // Child layouts define their own environment.
}
```

### `post.html` — Blog post

```scss
.post-layout {
  @include genesis-environment('focused');     // Level 1: narrow reading column
  @include genesis-atmosphere('neutral');      // Level 1: standard tone

  .post__header {                              // Level 2: section
    @include genesis-environment('associative');
  }
  .post__title {                               // Level 4: leaf
    @include genesis-cognition('axiom');
  }
  .post__meta {                                // Level 2: metadata section
    @include genesis-environment('associative');
  }
  .post__meta-date,
  .post__meta-author {                         // Level 4: leaf metadata
    @include genesis-cognition('gloss');
  }
  .post__tag {                                 // Level 4: leaf
    @include genesis-cognition('quantum');
  }
  .post__content {                             // Level 2: body section
    @include genesis-cognition('discourse');
  }
  .post__cta-button {                          // Level 4: leaf
    @include genesis-synapse('execute');
  }
}
```

### `article.html` — Long-form article with TOC

```scss
.article-layout {
  @include genesis-environment('convergent');   // Level 1: sidebar + main
  @include genesis-atmosphere('neutral');

  .article-toc-sidebar {                       // Level 2: sidebar section
    @include genesis-environment('chronological');
  }
  .article-toc-title {                         // Level 4: leaf
    @include genesis-cognition('motive');
  }
  .article-main-col {                          // Level 2: main content area
    @include genesis-environment('focused');
  }
  .article__title {                            // Level 4: leaf
    @include genesis-cognition('axiom');
  }
  .article__meta {                             // Level 2: metadata section
    @include genesis-environment('associative');
  }
  .article__meta-date,
  .article__meta-author {                      // Level 4: leaf metadata
    @include genesis-cognition('gloss');
  }
}
```

### `dashboard.html` — High-density dashboard

```scss
.dashboard-layout {
  @include genesis-environment('manifest');     // Level 1: 12-col grid
  @include genesis-atmosphere('neutral');

  .dashboard__header {                         // Level 2: header section
    @include genesis-environment('associative');
  }
  .dashboard__title {                          // Level 4: leaf
    @include genesis-cognition('axiom');
  }
  .dashboard__action-btn {                     // Level 4: leaf
    @include genesis-synapse('execute');
  }
  // Widget cards are Level 3 — defined by subdomain content:
  // .widget { @include genesis-entity('primary'); }
}
```

### `landing.html` — Marketing landing page

```scss
.landing-layout {
  @include genesis-environment('chronological'); // Level 1: stacked sections
  @include genesis-atmosphere('vibrant');         // Level 1: high-energy

  .landing__hero {                               // Level 2: hero section
    @include genesis-environment('focused');
  }
  .landing__title {                              // Level 4: leaf
    @include genesis-cognition('axiom');
  }
  .landing__subtitle {                           // Level 4: leaf
    @include genesis-cognition('discourse');
  }
  .landing__hero-button {                        // Level 4: leaf
    @include genesis-synapse('execute');
  }
}
```

### `form.html` — Multi-step form

```scss
.form-layout {
  @include genesis-environment('interaction-form'); // Level 1: form layout
  @include genesis-atmosphere('neutral');

  .form__header {                               // Level 2: header section
    @include genesis-environment('focused');
  }
  .form__title {                                // Level 4: leaf
    @include genesis-cognition('axiom');
  }
  .form__progress {                             // Level 3: progress component
    @include genesis-state('evolving');
  }
  .form__progress-bar {                         // Level 3: visual bar
    @include genesis-entity('imperative');
  }
  .form__step {                                 // Level 4: leaf
    @include genesis-cognition('gloss');
  }
  .form__submit {                               // Level 4: leaf
    @include genesis-synapse('execute');
  }
}
```

### `gallery.html` — Media gallery

```scss
.gallery-layout {
  @include genesis-environment('distributed');   // Level 1: bento grid
  @include genesis-atmosphere('neutral');

  .gallery__title {                             // Level 4: leaf
    @include genesis-cognition('axiom');
  }
  // Gallery items are Level 3 — defined by subdomain:
  // .gallery-item { @include genesis-entity('primary'); }
  // .gallery-item img { @include genesis-entity('image-adaptive'); }
}
```

### `archive.html` — Listing/index

```scss
.archive-layout {
  @include genesis-environment('distributed');   // Level 1: grid of items
  @include genesis-atmosphere('neutral');

  .archive__header {                            // Level 2: header section
    @include genesis-environment('focused');
  }
  .archive__title {                             // Level 4: leaf
    @include genesis-cognition('axiom');
  }
  .archive__description {                       // Level 4: leaf
    @include genesis-cognition('discourse');
  }
  // Archive items are Level 3 — defined by subdomain:
  // .archive-item { @include genesis-entity('secondary'); }
}
```

## Subdomain (Client Repository) Rules

Subdomain repositories create HTML content pages that use the theme's layouts. They must follow these rules:

### Rule 1 — Zero Raw CSS

Subdomain `_sass/main.scss` may **only** contain ontological mixin calls. No raw CSS properties are permitted.

```scss
// ✅ CORRECT — subdomain _sass/main.scss
.research-card {
  @include genesis-entity('primary');

  &__title { @include genesis-cognition('axiom'); }
  &__abstract { @include genesis-cognition('discourse'); }
  &__tag { @include genesis-cognition('quantum'); }
  &__read-more { @include genesis-synapse('navigate'); }
}
```

```scss
// ❌ WRONG — raw CSS in subdomain
.research-card {
  @include genesis-entity('primary');
  padding: 2rem;          // ❌ Entity already handles padding
  border-radius: 12px;    // ❌ Entity already handles border-radius
  background: white;      // ❌ Entity already handles background
}
```

### Rule 2 — Respect Hierarchy Levels

Subdomain content sits inside the theme's layout wrapper (Level 1) and sections (Level 2). Subdomain-defined elements are typically Level 3 (components) and Level 4 (leaf elements).

```html
<!-- Subdomain page content (inside theme layout) -->
<div class="research-grid">                <!-- Level 3: component grid -->
  <article class="research-card">          <!-- Level 3: component -->
    <h2 class="research-card__title">...</h2>  <!-- Level 4: leaf -->
    <p class="research-card__abstract">...</p> <!-- Level 4: leaf -->
    <a class="research-card__link">Read</a>    <!-- Level 4: leaf -->
  </article>
</div>
```

```scss
// Subdomain _sass/main.scss
.research-grid {
  @include genesis-environment('distributed');  // Grid layout for cards
}

.research-card {
  @include genesis-entity('primary');           // Card visual surface

  &__title { @include genesis-cognition('axiom'); }
  &__abstract { @include genesis-cognition('discourse'); }
  &__link { @include genesis-synapse('navigate'); }
}
```

### Rule 3 — No Ontology Import

Subdomains must **not** import `ontology/index` in their `_sass/main.scss`. The theme's build pipeline makes the ontology available automatically.

### Rule 4 — Mirrored Structure

SCSS nesting must mirror the HTML DOM structure:

```html
<article class="card">
  <h2 class="card__title">...</h2>
  <div class="card__body">
    <p class="card__description">...</p>
    <a class="card__action">...</a>
  </div>
</article>
```

```scss
.card {
  @include genesis-entity('primary');

  &__title { @include genesis-cognition('axiom'); }

  &__body {
    &__description { @include genesis-cognition('discourse'); }
    &__action { @include genesis-synapse('execute'); }
  }
}
```

## Decision Flowchart

Use this flowchart when deciding which mixin to apply to an element:

```
Is the element a page-level wrapper?
├── YES → genesis-environment() + genesis-atmosphere()
└── NO
    Is the element a structural section (header, footer, sidebar, nav)?
    ├── YES → genesis-environment() only
    └── NO
        Is the element a visual component (card, widget, alert)?
        ├── YES → genesis-entity() + optional genesis-state()
        └── NO
            Is the element interactive (link, button)?
            ├── YES → genesis-synapse()
            └── NO
                Is the element text content?
                ├── YES → genesis-cognition()
                └── NO
                    Is it a media element (image, video)?
                    └── YES → genesis-entity('image-adaptive')
```

## Validation Checklist

Before merging any layout, component, or subdomain SCSS:

- [ ] **Level 1 wrappers** have exactly `genesis-environment()` + `genesis-atmosphere()`
- [ ] **Level 2 sections** have `genesis-environment()` only (no `genesis-entity()`)
- [ ] **Level 3 components** have `genesis-entity()` (no `genesis-environment()` on the same element unless internal layout is needed)
- [ ] **Level 4 leaf elements** have `genesis-cognition()` or `genesis-synapse()` — never both on the same element (exception: metadata rows)
- [ ] No raw CSS properties in subdomain SCSS files
- [ ] SCSS nesting mirrors HTML DOM structure
- [ ] No `genesis-entity()` on structural containers
- [ ] No `genesis-cognition()` on containers
- [ ] No `genesis-atmosphere()` on leaf elements
- [ ] `npm test` passes (SCSS compilation + unit validation + lint)

## References

- **Ontology API reference**: `_sass/ontology/INTEGRATION-GUIDE.md`
- **Ontology architecture**: `_sass/ontology/Readme.md`
- **SCSS ontology system**: `docs/specifications/scss-ontology-system.md`
- **HTML semantic patterns**: `docs/specifications/html-semantic-patterns.md`
- **SCSS coding instructions**: `.github/instructions/scss.instructions.md`
- **HTML coding instructions**: `.github/instructions/html.instructions.md`
