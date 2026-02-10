---
applyTo: "**/*.{html,liquid},_includes/**,_layouts/**"
description: "HTML & Liquid templating for Genesis Semantic Design System"
---

# HTML & Liquid Instructions

## PRIMARY METHOD: Semantic HTML + Ontology SCSS Mapping

**HTML should be semantic, clean, and ontology-agnostic. SCSS maps classes to ontological roles.**

### Quick Pattern

**HTML** (semantic class names):
```html
<article class="blog-post">
  <header class="post-header">
    <h1 class="post-title">{{ page.title }}</h1>
    <time class="post-date">{{ page.date }}</time>
  </header>
  <div class="post-content">{{ content }}</div>
</article>
```

**SCSS** (ontology mapping):
```scss
@import "ontology/index";

.blog-post {
  @include genesis-environment('focused');
  
  .post-header { @include genesis-entity('primary'); }
  .post-title { @include genesis-cognition('axiom'); }
  .post-date { @include genesis-cognition('gloss'); }
  .post-content { @include genesis-cognition('discourse'); }
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
- `/docs/specifications/scss-ontology-system.md` - All ontological variants
- `_sass/ontology/INTEGRATION-GUIDE.md` - API reference

**Evolution:**
- `.github/AGENTS.MD` - Ontological Proposition system
- `.github/prompts/subdomain-evolution-agent.prompt.md` - Proposing new variants
