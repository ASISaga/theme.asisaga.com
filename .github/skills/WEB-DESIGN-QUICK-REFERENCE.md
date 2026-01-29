# Web Design Quick Reference Cheat Sheet

**Version**: 2.1.1  
**Purpose**: Fast lookup for common HTML + SCSS patterns  
**Last Updated**: 2026-01-29

---

## 🎯 Quick Pattern Lookup

### Navigation

**Primary Navigation (Responsive)**
```html
<nav id="primary-nav" class="primary-nav" aria-label="Primary">
  <ul class="primary-nav__list">
    <li><a href="/about" class="primary-nav__link">About</a></li>
  </ul>
</nav>
```
```scss
.primary-nav {
  @include genesis-environment('navigation-primary');
  .primary-nav__link { @include genesis-synapse('navigate'); }
}
```

**Breadcrumbs**
```html
<nav class="breadcrumb" aria-label="Breadcrumb">
  <ol class="breadcrumb__list">
    <li><a href="/" class="breadcrumb__link">Home</a></li>
    <li aria-current="page">Current Page</li>
  </ol>
</nav>
```

---

### Hero Sections

**Full-Width Hero**
```html
<section class="hero" aria-labelledby="hero-title">
  <h1 id="hero-title" class="hero__title">Title</h1>
  <p class="hero__subtitle">Subtitle</p>
  <a href="/cta" class="hero__cta">Get Started</a>
</section>
```
```scss
.hero {
  @include genesis-environment('focused');
  @include genesis-atmosphere('viewport-aware');
  .hero__title { @include genesis-cognition('axiom'); }
  .hero__subtitle { @include genesis-cognition('discourse'); }
  .hero__cta { @include genesis-synapse('execute'); }
}
```

**Split Hero (Content + Image)**
```html
<section class="split-hero">
  <div class="split-hero__content"><!-- Content --></div>
  <div class="split-hero__media">
    <img src="image.jpg" alt="Description" class="split-hero__image">
  </div>
</section>
```
```scss
.split-hero {
  display: grid;
  grid-template-columns: 1fr; // Mobile
  @include from(md) { grid-template-columns: 1fr 1fr; }
  .split-hero__image { @include genesis-entity('image-adaptive'); }
}
```

---

### Cards

**Blog Post Card**
```html
<article class="blog-card">
  <a href="/post" class="blog-card__link">
    <img src="thumb.jpg" alt="Post title" class="blog-card__image">
    <h3 class="blog-card__title">Post Title</h3>
    <p class="blog-card__excerpt">Excerpt...</p>
  </a>
</article>
```
```scss
.blog-card {
  @include genesis-entity('primary');
  .blog-card__image { @include genesis-entity('image-adaptive'); }
  .blog-card__title { @include genesis-cognition('axiom'); }
  .blog-card__excerpt { @include genesis-cognition('discourse'); }
  .blog-card__link { @include genesis-synapse('navigate'); }
}
```

**Feature Card**
```html
<article class="feature-card">
  <h3 class="feature-card__title">Feature Name</h3>
  <p class="feature-card__description">Description...</p>
  <a href="/feature" class="feature-card__link">Learn more →</a>
</article>
```
```scss
.feature-card {
  @include genesis-entity('secondary');
  .feature-card__title { @include genesis-cognition('axiom'); }
  .feature-card__description { @include genesis-cognition('discourse'); }
  .feature-card__link { @include genesis-synapse('navigate'); }
}
```

---

### Forms

**Contact Form**
```html
<form class="contact-form" method="post">
  <div class="form-field">
    <label for="name" class="form-label">Name *</label>
    <input type="text" id="name" class="form-input" required>
  </div>
  <button type="submit" class="form-submit">Submit</button>
</form>
```
```scss
.contact-form {
  @include genesis-environment('interaction-form');
  .form-label { @include genesis-cognition('motive'); }
  .form-input { @include genesis-synapse('input-primary'); }
  .form-submit { @include genesis-synapse('execute'); }
}
```

**Search Form**
```html
<form class="search-form" role="search">
  <label for="search" class="sr-only">Search</label>
  <input type="search" id="search" placeholder="Search..." class="search-input">
  <button type="submit" class="search-button">Search</button>
</form>
```

---

### Grids

**Auto-Responsive Grid**
```html
<div class="card-grid">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
</div>
```
```scss
.card-grid {
  @include genesis-environment('distributed');
  // Mobile: 1 column, Tablet: 2 columns, Desktop: auto-fit
  .card { @include genesis-entity('primary'); }
}
```

**Custom Responsive Grid**
```scss
.custom-grid {
  display: grid;
  gap: var(--space-network);
  grid-template-columns: 1fr; // Mobile
  @include from(sm) { grid-template-columns: repeat(2, 1fr); } // Tablet
  @include from(lg) { grid-template-columns: repeat(4, 1fr); } // Desktop
}
```

---

### Modals

**Modal Dialog**
```html
<div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" hidden>
  <div class="modal__backdrop"></div>
  <div class="modal__dialog">
    <header class="modal__header">
      <h2 id="modal-title" class="modal__title">Modal Title</h2>
      <button class="modal__close" aria-label="Close">×</button>
    </header>
    <div class="modal__body">Content...</div>
    <footer class="modal__footer">
      <button class="modal__confirm">Confirm</button>
      <button class="modal__cancel">Cancel</button>
    </footer>
  </div>
</div>
```
```scss
.modal {
  @include genesis-entity('primary');
  .modal__backdrop { @include genesis-atmosphere('void'); }
  .modal__title { @include genesis-cognition('axiom'); }
  .modal__confirm { @include genesis-synapse('execute'); }
  .modal__cancel { @include genesis-synapse('inquiry'); }
}
```

---

### Interactive Elements

**Accordion**
```html
<div class="accordion__item">
  <h3 class="accordion__header">
    <button class="accordion__trigger" aria-expanded="false" aria-controls="panel-1">
      Question?
    </button>
  </h3>
  <div class="accordion__panel" id="panel-1" hidden>
    <div class="accordion__content">Answer...</div>
  </div>
</div>
```

**Alert**
```html
<div class="alert alert--success" role="alert">
  <h4 class="alert__title">Success!</h4>
  <p class="alert__message">Your changes have been saved.</p>
  <button class="alert__dismiss" aria-label="Dismiss">×</button>
</div>
```
```scss
.alert {
  @include genesis-entity('primary');
  &--success { @include genesis-state('stable'); }
  &--error { @include genesis-entity('imperative'); }
  .alert__title { @include genesis-cognition('motive'); }
  .alert__dismiss { @include genesis-synapse('destructive'); }
}
```

---

### Layouts

**Article Layout**
```html
<article class="article">
  <header class="article__header">
    <h1 class="article__title">Title</h1>
    <time class="article__date" datetime="2026-01-29">Jan 29, 2026</time>
  </header>
  <div class="article__content">Content...</div>
</article>
```
```scss
.article {
  @include genesis-environment('focused');
  .article__title { @include genesis-cognition('axiom'); }
  .article__content { @include genesis-cognition('discourse'); max-width: 70ch; }
}
```

**Split Layout (50/50)**
```html
<section class="split-layout">
  <div class="split-layout__content">Content</div>
  <div class="split-layout__media">Media</div>
</section>
```
```scss
.split-layout {
  display: grid;
  grid-template-columns: 1fr; // Mobile
  @include from(md) { grid-template-columns: 1fr 1fr; } // Desktop
}
```

**Dashboard Grid**
```html
<div class="dashboard">
  <header class="dashboard__header">Header</header>
  <aside class="dashboard__sidebar">Sidebar</aside>
  <main class="dashboard__main">Main</main>
</div>
```
```scss
.dashboard {
  @include genesis-environment('manifest');
  // Auto-responsive: 1 col (mobile) → 6 col (tablet) → 12 col (desktop)
}
```

---

## 📋 Ontological Quick Reference

### Environment (Layout)
```scss
@include genesis-environment('distributed');   // Auto-fit grid
@include genesis-environment('focused');       // Single column (max 70ch)
@include genesis-environment('associative');   // Flexbox network
@include genesis-environment('manifest');      // 12-column dashboard
@include genesis-environment('navigation-primary'); // Responsive nav
@include genesis-environment('interaction-form');   // Responsive form
```

### Entity (Visual Presence)
```scss
@include genesis-entity('primary');         // Main glassmorphism
@include genesis-entity('secondary');       // Lighter glass
@include genesis-entity('imperative');      // Urgent (neon glow)
@include genesis-entity('latent');          // Dimmed/inactive
@include genesis-entity('image-adaptive');  // Responsive images
@include genesis-entity('embed-responsive'); // Video embeds (16:9)
```

### Cognition (Typography)
```scss
@include genesis-cognition('axiom');       // Headlines (2-3.5rem)
@include genesis-cognition('discourse');   // Body text (1-1.125rem)
@include genesis-cognition('protocol');    // Code/technical
@include genesis-cognition('gloss');       // Small annotations (0.8rem)
@include genesis-cognition('motive');      // Instructional (semibold)
@include genesis-cognition('quantum');     // Tags/chips (tiny)
```

### Synapse (Interaction)
```scss
@include genesis-synapse('navigate');      // Links (underline hover)
@include genesis-synapse('execute');       // Primary buttons
@include genesis-synapse('inquiry');       // Secondary buttons
@include genesis-synapse('destructive');   // Danger actions
@include genesis-synapse('input-primary'); // Form inputs (44px, 16px font)
```

### State (Temporal)
```scss
@include genesis-state('stable');          // Normal/verified
@include genesis-state('evolving');        // Loading/updating
@include genesis-state('deprecated');      // Outdated
@include genesis-state('locked');          // Requires clearance
@include genesis-state('scroll-triggered'); // Scroll animations
```

### Atmosphere (Sensory)
```scss
@include genesis-atmosphere('neutral');         // Default
@include genesis-atmosphere('ethereal');        // Light/minimal
@include genesis-atmosphere('void');            // Dark/immersive
@include genesis-atmosphere('vibrant');         // Energetic/colorful
@include genesis-atmosphere('spacious-mobile'); // Touch-friendly
@include genesis-atmosphere('dense-desktop');   // High-density
@include genesis-atmosphere('viewport-aware');  // Full-height sections
```

---

## 🎨 Common Patterns at a Glance

| Pattern | HTML Element | SCSS Mixin |
|---------|--------------|------------|
| **Navigation Link** | `<a href="/page">Link</a>` | `@include genesis-synapse('navigate');` |
| **Primary Button** | `<button>Click</button>` | `@include genesis-synapse('execute');` |
| **Form Input** | `<input type="text">` | `@include genesis-synapse('input-primary');` |
| **Card Container** | `<article class="card">` | `@include genesis-entity('primary');` |
| **Heading** | `<h1>Title</h1>` | `@include genesis-cognition('axiom');` |
| **Body Text** | `<p>Content...</p>` | `@include genesis-cognition('discourse');` |
| **Responsive Grid** | `<div class="grid">` | `@include genesis-environment('distributed');` |
| **Reading Layout** | `<article class="post">` | `@include genesis-environment('focused');` |
| **Alert/Notice** | `<div role="alert">` | `@include genesis-entity('imperative');` |
| **Responsive Image** | `<img src="..." alt="">` | `@include genesis-entity('image-adaptive');` |

---

## 🔧 Responsive Breakpoints

```scss
// Mobile-first approach
.component {
  // Base styles (mobile, < 480px)
  
  @include from(sm) { } // ≥ 480px (large phones)
  @include from(md) { } // ≥ 768px (tablets)
  @include from(lg) { } // ≥ 1024px (laptops)
  @include from(xl) { } // ≥ 1280px (desktops)
  
  // Semantic aliases
  @include tablet { }  // ≥ 768px
  @include desktop { } // ≥ 1024px
}
```

---

## ✅ Accessibility Checklist

**Every Page MUST Have**:
- [ ] Skip link as first focusable element
- [ ] Exactly ONE `<main id="skip-target">` with `tabindex="-1"`
- [ ] Exactly ONE `<header>` and `<footer>`
- [ ] All images have `alt` attributes
- [ ] All form inputs have associated `<label>` elements
- [ ] Interactive elements ≥ 44x44px on mobile
- [ ] Minimum 16px font size to prevent iOS zoom
- [ ] Visible focus indicators (`:focus-visible`)
- [ ] Color contrast ≥ 4.5:1 for text, ≥ 3:1 for UI
- [ ] Support `prefers-reduced-motion`
- [ ] Support `prefers-contrast: high`

---

## 📦 File Import Order

**Subdomain SCSS files** (compilation entry points):
```scss
---
---
@import "ontology/index";  // MUST be first for standalone files

.my-component {
  @include genesis-environment('distributed');
  @include genesis-entity('primary');
}
```

**Theme component/layout files** in `_sass/components/` or `_sass/layouts/`:
```scss
// NO @import needed - ontology already available via _common.scss

.my-component {
  @include genesis-environment('distributed');
  @include genesis-entity('primary');
}
```

---

## 🚀 Quick Commands

```bash
# Test SCSS compilation
npm run test:scss

# Lint SCSS
npm run lint:scss

# Auto-fix lint issues
npm run lint:scss:fix

# Run all tests
npm test

# Validate HTML template
./.github/skills/html-template-agent/scripts/validate-html.sh path/to/file.html

# Validate SCSS file
./.github/skills/scss-refactor-agent/scripts/validate-scss.sh path/to/file.scss
```

---

## 📚 Full Documentation

- **Component Patterns**: `.github/skills/html-template-agent/references/COMPONENT-PATTERNS.md`
- **Layout Patterns**: `.github/skills/responsive-design-agent/references/LAYOUT-PATTERNS.md`
- **Ontology Guide**: `_sass/ontology/INTEGRATION-GUIDE.md`
- **SCSS Instructions**: `.github/instructions/scss.instructions.md`
- **HTML Instructions**: `.github/instructions/html.instructions.md`
- **Skills Overview**: `.github/skills/README.md`
- **Agent Index**: `.github/AGENT-INDEX.md`

---

**Version**: 2.1.1  
**Last Updated**: 2026-01-29  
**Quick Reference for**: Genesis Semantic Design System
