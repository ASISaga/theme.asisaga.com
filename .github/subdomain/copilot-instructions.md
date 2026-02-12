# Copilot Instructions for ASI Saga Subdomain

You are working in an **ASI Saga subdomain repository**. This repository creates HTML content pages that use layouts and styling from the shared theme at `theme.asisaga.com`.

## GitHub Copilot MCP Configuration

**IMPORTANT**: The theme repository URL has been added to your GitHub Copilot MCP firewall settings to enable code reference:

- **Theme URL**: `https://github.com/ASISaga/theme.asisaga.com`

This allows GitHub Copilot to:
- Reference theme's ontological SCSS mixins and design system
- Access theme's layout and component documentation
- Understand theme-subdomain architecture for accurate code generation
- Propose ontological evolutions based on theme's current capabilities

## Architecture: Content Only

This subdomain is **content-only**. The theme repository provides all infrastructure:

- **NO `_layouts/` directory** — Theme provides layouts (`default`, `post`, `page`, etc.)
- **NO `_includes/` directory** — Theme provides includes (`head.html`, `header.html`, `footer.html`)
- **NO `_sass/` directory in theme** — But YES `_sass/main.scss` for page-specific styling
- **NO `assets/css/custom.scss`** — Use `_sass/main.scss` instead for page-specific ontological styling
- **YES HTML content pages** — HTML (NOT Markdown) in root or organized directories
- **YES `_sass/main.scss`** — For page-specific ontological styling (optional, ontology mixins already available from theme)
- **YES `assets/js/script.js`** — For subdomain-specific JavaScript (MANDATORY - loaded after theme's common.js)

## Creating Content Pages

### HTML Pages (ONLY - No Markdown)

```html
---
layout: default
title: "Page Title"
description: "Brief description for SEO and social sharing"
---

<article class="content-section">
  <h1>{{ page.title }}</h1>
  <p>Content with semantic HTML structure.</p>
</article>
```

**IMPORTANT**: Subdomain content is HTML-only. NO Markdown (.md) files.

### Front Matter Options

| Key | Required | Description |
|-----|----------|-------------|
| `layout` | Yes | Theme layout to use (`default`, `post`, `page`) |
| `title` | Yes | Page title |
| `description` | No | SEO description |
| `date` | Posts | Publication date (`YYYY-MM-DD`) |
| `categories` | No | Content categories |
| `tags` | No | Content tags |
| `permalink` | No | Custom URL path |

## Semantic HTML Standards

Use meaningful, content-first class names:

- ✅ `.research-paper`, `.team-member`, `.project-card`
- ❌ `.blue-box`, `.large-text`, `.rounded-card`

### Accessibility Requirements

- Every `<img>` needs `alt` text (empty `alt=""` for decorative images)
- Use semantic elements: `<article>`, `<section>`, `<nav>`, `<aside>`
- Proper heading hierarchy (`h1` → `h2` → `h3`, no skipping)
- Form inputs require associated `<label>` elements

### BEM Naming Convention

```html
<article class="blog-post">
  <header class="blog-post__header">
    <h2 class="blog-post__title">Title</h2>
    <time class="blog-post__date">2026-01-15</time>
  </header>
  <div class="blog-post__content">Content</div>
</article>
```

## Custom SCSS (Optional)

If you need page-specific styling in `_sass/main.scss`:

```scss
// NO front matter
// NO @import needed - ontology mixins already available from theme

.my-page-component {
  @include genesis-entity('primary');
  @include genesis-cognition('discourse');
}
```

### MANDATORY: Zero Raw CSS

- ❌ NO `margin`, `padding`, `color`, `font-size`, `background`
- ❌ NO unit values: `px`, `rem`, `%`
- ❌ NO color values: `#hex`, `rgb()`, `oklch()`
- ❌ NO `@import` statements (ontology already available from theme)
- ❌ NO `assets/css/custom.scss` (use `_sass/main.scss` instead)
- ✅ ONLY ontological mixins (already available from theme via `assets/css/style.scss`)

### Ontology Quick Reference

**Six semantic categories** (31+ variants):

| Category | Mixin | Purpose | Variants |
|----------|-------|---------|----------|
| Environment | `genesis-environment($logic)` | Layout | `distributed`, `focused`, `associative`, `chronological`, `manifest` |
| Entity | `genesis-entity($nature)` | Visual presence | `primary`, `secondary`, `imperative`, `latent`, `aggregate`, `ancestral` |
| Cognition | `genesis-cognition($intent)` | Typography | `axiom`, `discourse`, `protocol`, `gloss`, `motive`, `quantum` |
| Synapse | `genesis-synapse($vector)` | Interaction | `navigate`, `execute`, `inquiry`, `destructive`, `social` |
| State | `genesis-state($condition)` | Temporal state | `stable`, `evolving`, `deprecated`, `locked`, `simulated` |
| Atmosphere | `genesis-atmosphere($vibe)` | Mood/tone | `neutral`, `ethereal`, `void`, `vibrant` |

### Common Patterns

**Card grid:**
```scss
.card-grid {
  @include genesis-environment('distributed');

  .card {
    @include genesis-entity('primary');
    .card-title { @include genesis-cognition('axiom'); }
    .card-text { @include genesis-cognition('discourse'); }
    .card-link { @include genesis-synapse('navigate'); }
  }
}
```

**Blog post:**
```scss
.blog-post {
  @include genesis-environment('focused');
  .post-title { @include genesis-cognition('axiom'); }
  .post-date { @include genesis-cognition('gloss'); }
  .post-content { @include genesis-cognition('discourse'); }
  .read-more { @include genesis-synapse('navigate'); }
}
```

## JavaScript (Mandatory)

**REQUIRED**: `assets/js/script.js` is mandatory in all subdomains.

```javascript
// assets/js/script.js
// This file is MANDATORY - loaded after theme's common.js

document.addEventListener('DOMContentLoaded', () => {
  // Subdomain-specific progressive enhancements
  // Theme utilities available if needed
});
```

**IMPORTANT**:
- Theme's `assets/js/common.js` is loaded first automatically
- Your `script.js` can use utilities from theme's common.js
- Use `data-*` attributes for behavior hooks, not CSS classes
- Progressive enhancement: content works without JavaScript
- Ensure keyboard and screen reader accessibility

## Testing & Linting

**Before committing** any SCSS changes, run:

```bash
npm test              # Run SCSS compilation test + stylelint
npm run test:scss     # Test SCSS compilation (catches undefined mixins)
npm run lint:scss     # Run stylelint on _sass/**/*.scss
npm run lint:scss:fix # Auto-fix stylelint issues
```

**What these tests catch:**
- **SCSS compilation** — Detects undefined mixins, variables, syntax errors
- **Stylelint** — Enforces code quality, BEM naming, zero-CSS compliance
- **Import violations** — Ensures no `@import` statements in subdomain SCSS
- **Nesting depth** — Validates max 3 nesting levels

**Pre-commit workflow:**
1. `npm run test:scss` — Verify SCSS compiles
2. `npm run lint:scss` — Check code style
3. Fix any errors reported
4. `npm test` — Run both checks together

## Proposing Ontological Evolutions

If you discover a semantic pattern not covered by existing ontology:

1. **Review** all 31+ variants above
2. **Try** combining existing mixins creatively
3. **Confirm** the gap is semantic (WHAT it represents), not visual (HOW it looks)
4. **Confirm** the pattern would be useful across multiple subdomains
5. **Submit** a PR to `theme.asisaga.com` with an Ontological Proposition

→ See theme's `.github/AGENTS.MD` for the full proposition process.

## Key Principles

1. **Content First** — Focus on creating great content; theme handles presentation
2. **Semantic Thinking** — Name things by what they are, not how they look
3. **Zero Raw CSS** — If custom SCSS is needed, use only ontological mixins
4. **Accessibility Always** — Semantic HTML, alt text, proper headings, keyboard support
5. **Progressive Enhancement** — Core content accessible without JavaScript
