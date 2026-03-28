---
applyTo: "**/*.{html,liquid},_includes/**,_layouts/**"
description: "HTML & Liquid templating for Genesis Semantic Design System"
---

# HTML & Liquid Instructions

## Theme/Subdomain Architecture (CRITICAL)

**Theme repository (this repo):**
- Defines Jekyll layouts in `_layouts/` (default.html, post.html, page.html, etc.)
- Provides reusable includes in `_includes/` (head.html, header.html, footer.html, etc.)
- Layouts load SCSS via `<head>` using `<link rel="stylesheet" href="/assets/css/style.css">`
- **Responsibility**: All layouts, includes, and styling infrastructure

**Subdomain repositories:**
- Create HTML content pages with front matter specifying `layout: default`
- Pages automatically use theme's layouts and styling
- **NO `_layouts/` directory** in subdomains
- **NO `_includes/` directory** in subdomains
- **Page-specific SCSS** in `_sass/main.scss` (optional, ontology-only)
- **Mandatory `assets/js/script.js`** (loaded after theme's common.js)
- **Responsibility**: HTML content only (NO Markdown)

**Example subdomain page:**
```html
---
layout: default
title: "My Page"
---

<article class="content-section">
  <h1>{{ page.title }}</h1>
  <p>Content goes here. Theme layouts handle all structure and styling.</p>
</article>
```

## PRIMARY METHOD: Semantic HTML + Ontology SCSS Mapping

**HTML should be semantic, clean, and ontology-agnostic. SCSS maps classes to ontological roles.**

→ **Complete mapping specification**: `/docs/specifications/ontology-html-mapping.md`

### Ontology-to-HTML Hierarchy Rules

Every element falls into one of four hierarchy levels. Each level has permitted and forbidden mixin categories:

| Level | Element type | Required mixin | Forbidden mixins |
|-------|-------------|----------------|-----------------|
| **1 — Page Layout** | Outermost wrapper inside `<main>` | `genesis-environment()` + `genesis-atmosphere()` | `genesis-entity()`, `genesis-cognition()`, `genesis-synapse()` |
| **2 — Section** | `<header>`, `<footer>`, `<section>`, `<aside>`, `<nav>` | `genesis-environment()` | `genesis-entity()`, `genesis-cognition()` |
| **3 — Component** | Cards, widgets, alerts, form groups | `genesis-entity()` | — (most other categories optional) |
| **4 — Leaf Element** | `<h1>`–`<h6>`, `<p>`, `<a>`, `<button>`, `<span>`, `<time>` | `genesis-cognition()` or `genesis-synapse()` | `genesis-environment()`, `genesis-atmosphere()`, `genesis-entity()` |

**Critical rules:**
- ❌ **Never** apply `genesis-entity()` to structural containers (Level 1 or 2) — entity is for visual objects at Level 3
- ❌ **Never** apply `genesis-cognition()` to containers — cognition is for text elements only
- ❌ **Never** apply `genesis-atmosphere()` to leaf elements — atmosphere is for containers

### Visual Design Element Ownership

Each visual CSS concern maps from a semantic purpose through an owning ontological category. When writing SCSS for HTML elements, use only the owning category's mixin:

| Semantic Purpose | Owner | Visual Design Element |
|-----------------|-------|---------------------|
| Responsive spatial rhythm — `--space-*` token gaps between grid/flex children | `environment` | White space / gap |
| Component breathing room — `--padding-entity-*` clamps per variant density | `entity` | Internal padding |
| Content flow architecture — auto-fit grids, 70ch reading, 12-col dashboard | `environment` | Layout / grid |
| Page mood and emotional tone — OKLCH: `void`=black, `ethereal`=translucent, `sacred`=gradient | `atmosphere` | Colors / backgrounds |
| Information voice and reading intent — `axiom`=bold headlines, `discourse`=serif body, `protocol`=monospace | `cognition` | Typography |
| Component edge treatment — 1px subtle, 2px neon accent, 999px pill via `--radius-bento` | `entity` | Borders / border-radius |
| Ambient depth and spatial layering — `ethereal`=outer glow, `void`=inset shadow, `vibrant`=neon glow | `atmosphere` | Shadows / elevation |
| Lifecycle transitions and temporal signaling — `evolving`=sweep gradient, `scroll-triggered`=fade-in-up, `mentioned`=pulse | `state` | Animations |
| Action-specific interaction feedback — `navigate`=hover underline, `execute`=neon glow, 44px WCAG touch targets | `synapse` | Hover / focus feedback |

### Quick Pattern

**HTML** (semantic class names):
```html
<article class="blog-post">              <!-- Level 1: page wrapper -->
  <header class="post-header">           <!-- Level 2: section -->
    <h1 class="post-title">Title</h1>    <!-- Level 4: leaf -->
    <time class="post-date">Date</time>  <!-- Level 4: leaf -->
  </header>
  <div class="post-body">                <!-- Level 2: section -->
    <p class="post-content">Text</p>     <!-- Level 4: leaf -->
  </div>
</article>
```

**SCSS** (ontology mapping):
```scss
.blog-post {
  @include genesis-environment('focused');   // Level 1: layout
  @include genesis-atmosphere('neutral');    // Level 1: tone

  .post-header {
    @include genesis-environment('associative'); // Level 2: horizontal layout
  }
  .post-title { @include genesis-cognition('axiom'); }     // Level 4
  .post-date { @include genesis-cognition('gloss'); }      // Level 4
  .post-content { @include genesis-cognition('discourse'); } // Level 4
}
```

## Accessibility Requirements (MANDATORY)

### Landmark Elements
- **NEVER nest landmarks** (`<header>`, `<main>`, `<nav>`, `<footer>`, `<aside>`, `<section>`, `<article>`)
- Each page: ONE `<main id="skip-target" tabindex="-1">`
- Each page: ONE `<header>` and ONE `<footer>`
- First focusable element: skip link to `#skip-target`

```html
<a href="#skip-target" class="sr-only focus-visible">Skip to main content</a>
<main id="skip-target" tabindex="-1">{{ content }}</main>
```

### Web Component Landmark Rules

Custom elements wrapping semantic landmarks must **not duplicate** the landmark role:
- ❌ `<genesis-header role="banner">` — inner `<header>` already implies banner
- ❌ `<genesis-footer role="contentinfo">` — inner `<footer>` already implies contentinfo
- ❌ `<genesis-environment role="navigation">` when it contains `<nav>` — let the `<nav>` own the role
- ✅ Custom elements should remove or avoid setting landmark roles when inner elements provide them

### Secondary Footer/Header Elements

Only the page-level `<footer>` (from `_includes/footer.html`) should be a `<footer>` element. All other "footer-like" sections must use `<div>`:
- ✅ `<div class="post__footer-cta" role="group">` for CTA sections
- ✅ `<div class="chatroom-input" role="group">` for input areas
- ✅ `<div class="modal__footer">` for modal footers
- ❌ `<footer class="post__footer-cta">` creates a duplicate contentinfo landmark
- ❌ `<footer class="chatroom-input">` creates a duplicate contentinfo landmark

Similarly, avoid `<main>` in page content — `default.html` already wraps `{{ content }}` in `<main>`:
- ✅ `<div class="genesis-demo">` for content wrapper
- ❌ `<main class="genesis-demo">` creates a duplicate/nested main landmark

### ARIA Tab Pattern

When using tab interfaces (via `genesis-navigation type="tabs"` or manual implementation):
1. `role="tablist"` goes on the container of the tabs
2. Every element between tablist and tab buttons must have `role="presentation"` (makes them transparent)
3. ❌ Never use `role="group"` on tab wrappers — breaks the tablist→tab ownership chain
4. Each `role="tab"` must be a direct ARIA child of `role="tablist"`

```html
<!-- ✅ Correct: tablist on ul, presentation on li -->
<ul role="tablist" aria-label="Settings sections">
  <li role="presentation">
    <a role="tab" aria-selected="true" tabindex="0" href="#profile">Profile</a>
  </li>
  <li role="presentation">
    <a role="tab" aria-selected="false" tabindex="-1" href="#security">Security</a>
  </li>
</ul>
```

### Heading Hierarchy

- One `<h1>` per page (typically from `layout-header.html`)
- Never skip heading levels: h1 → h2 → h3 (not h1 → h3)
- Component headings must use the appropriate level for their context (h2 under h1, h3 under h2)
- ❌ Don't hardcode `<h3>` in reusable components that appear directly under `<h1>` — use `<h2>` instead

### Icon-Only Elements

Spans with only icon content must have both `role` and `aria-label`:
```html
<!-- ✅ Correct: role="img" makes aria-label valid on span -->
<span role="img" aria-label="Categories">
  <i class="fas fa-folder" aria-hidden="true"></i>
</span>

<!-- ❌ Wrong: aria-label on plain span is prohibited -->
<span aria-label="Categories">
  <i class="fas fa-folder" aria-hidden="true"></i>
</span>
```

### Scrollable Regions

Scrollable containers must be keyboard-accessible:
```html
<!-- ✅ Correct: tabindex + role + aria-label -->
<div class="chatroom-messages" tabindex="0" role="log" aria-label="Chat messages" aria-live="polite">
  {{ content }}
</div>
```

### Images & Forms
```html
<!-- Images require alt -->
<img src="..." alt="Descriptive text">     <!-- Meaningful -->
<img src="..." alt="">                     <!-- Decorative -->

<!-- Forms require label association -->
<label for="email">Email</label>
<input type="email" id="email" name="email">
```

## Visual Hierarchy Philosophy

→ **Complete guide**: `/docs/specifications/html-semantic-patterns.md`

**Key principles:**
- **Purposeful nesting** - Only when semantically meaningful
- **Flat when possible** - Avoid unnecessary wrapper divs
- **Color purpose** - Each accent should communicate something
- **Glassmorphism** - Use for specific UI needs (headers, modals), not everywhere

**Card usage:**
- ✅ Grouping related content, clickable blocks, distinct sections
- ❌ Excessive nested cards, decoration without semantic meaning

## Content-First Naming

**Think WHAT it represents:**
- ✅ `.research-paper`, `.user-profile`, `.product-card`
- ❌ `.blue-box`, `.large-text`, `.rounded-card`

**BEM-style structure:**
```html
<article class="research-paper">
  <header class="research-paper__header">
    <h1 class="research-paper__title">Title</h1>
  </header>
  <div class="research-paper__content research-paper__content--draft">
    Content...
  </div>
</article>
```

## Jekyll & Liquid Best Practices

- Use semantic HTML5 elements appropriately
- Parameterized includes: `{% include component.html param="value" %}`
- NO inline JS or CSS in templates
- Keep Liquid logic lightweight
- Provide sensible defaults for missing data

### Component Development

```liquid
{% comment %}
Alert Component
Parameters:
- type: 'urgent' | 'info' | 'warning' (default: 'info')
- title: Alert heading text
- message: Alert body text
- dismissible: true | false (default: false)
{% endcomment %}

<div class="alert alert--{{ include.type | default: 'info' }}">
  {% if include.title %}<h3 class="alert__title">{{ include.title }}</h3>{% endif %}
  {% if include.message %}<p class="alert__message">{{ include.message }}</p>{% endif %}
  {% if include.dismissible %}<button class="alert__dismiss">×</button>{% endif %}
</div>
```

## Responsive Design

**HTML stays clean** - SCSS handles all responsiveness via ontology mixins:
- Fluid typography (clamp() values scale automatically)
- Responsive grids (`genesis-environment('distributed')` auto-fits)
- Container queries (components adapt to their container)

**Test viewports:** 375px, 768px, 1440px minimum
**Touch targets:** ≥ 44px (enforced by ontology)

## Documentation References

**Semantic patterns & examples:**
- `/docs/specifications/html-semantic-patterns.md` - Complete patterns, BEM naming, card usage, visual hierarchy
- `/docs/specifications/html-liquid.md` - Jekyll/Liquid architecture
- `/docs/specifications/component-library.md` - Reusable components
- `/docs/specifications/accessibility.md` - A11y requirements
- `/docs/specifications/responsive-design.md` - Responsive patterns

**Ontology mapping:**
- `/docs/specifications/ontology-html-mapping.md` - **Formal hierarchy rules for mixin-to-HTML mapping**
- `/docs/specifications/scss-ontology-system.md` - All ontological variants
- `_sass/ontology/INTEGRATION-GUIDE.md` - API reference

**Test pages** (organized in `/tests/`):
- `/tests/layouts/` - Jekyll layout integration tests
- `/tests/components/` - Component library demos
- `/tests/responsive/` - Responsive behavior tests
- See `/tests/README.md` for complete catalog

**Evolution:**
- `.github/.github/docs/agent-philosophy.md` - Ontological Proposition system
- `.github/prompts/subdomain-evolution-agent.prompt.md` - Proposing new variants
