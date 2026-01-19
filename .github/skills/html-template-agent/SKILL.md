---
name: html-template-agent
description: Create semantic HTML5 templates with accessibility-first principles for Genesis Ontological Design System. Ensure proper landmark elements, meaningful class names, WCAG compliance, and BEM-style naming. Use when building Jekyll templates, includes, or auditing HTML structure for semantic correctness.
license: MIT
metadata:
  author: ASISaga
  version: "2.0"
  category: design-system
  role: semantic-structure
---

# HTML Template Agent

**Role**: Semantic Structure and Accessibility Expert  
**Scope**: Jekyll templates, includes, and HTML structure

## Purpose

The HTML Template Agent ensures all HTML follows semantic best practices, uses meaningful content-first class names, and meets WCAG AA accessibility standards. This agent creates the "Content" tier of the three-tier architecture (Content → Interface → Engine).

## When to Use This Skill

Activate when creating new Jekyll layouts, building reusable includes, auditing HTML for accessibility, implementing semantic class naming, or ensuring landmark element integrity.

## Core Principles

### Content-First Naming

**Think WHAT, not HOW**:
- ✅ `.research-paper`, `.user-profile`, `.product-card`
- ❌ `.blue-box`, `.large-text`, `.rounded-card`

### Accessibility Requirements (MANDATORY)

- **ONE** `<main id="skip-target">` per page with tabindex="-1"
- **ONE** `<header>` and `<footer>` per page
- Skip link as first focusable element
- All images have descriptive `alt` attributes
- All form inputs have associated `<label>` elements
- Visible focus indicators on interactive elements
- Support `prefers-reduced-motion` and `prefers-contrast`

### Semantic HTML5 Structure

```html
<!-- Skip link (REQUIRED first) -->
<a href="#skip-target" class="sr-only focus-visible">Skip to main content</a>

<!-- Main landmark (REQUIRED, exactly one) -->
<main id="skip-target" tabindex="-1">
  <article class="blog-post">
    <header class="post-header">
      <h1 class="post-title">Title</h1>
      <time class="post-date" datetime="2026-01-19">January 19, 2026</time>
    </header>
    
    <div class="post-content">
      <p>Content...</p>
    </div>
  </article>
</main>
```

## BEM-Style Class Naming

Use Block-Element-Modifier pattern:

```html
<!-- Block: main component -->
<article class="research-paper">
  <!-- Elements: parts of block -->
  <header class="research-paper__header">
    <h1 class="research-paper__title">Title</h1>
    <time class="research-paper__date">Date</time>
  </header>
  
  <!-- Modifiers: variations -->
  <div class="research-paper__content research-paper__content--draft">
    Content...
  </div>
</article>
```

## Jekyll Template Best Practices

### Parameterized Includes

```liquid
{% comment %}
Alert Component
Parameters:
- type: 'urgent' | 'info' | 'warning'
- title: Alert heading
- message: Alert body
- dismissible: true | false
{% endcomment %}

<div class="alert alert--{{ include.type | default: 'info' }}">
  {% if include.title %}
  <h3 class="alert__title">{{ include.title }}</h3>
  {% endif %}
  
  {% if include.message %}
  <p class="alert__message">{{ include.message }}</p>
  {% endif %}
</div>
```

### Resilient to Missing Data

Always provide defaults and check for existence:

```liquid
{% assign author = page.author | default: site.author %}
{% if author %}
  <span class="post-author">{{ author }}</span>
{% endif %}
```

## Common Patterns

### Blog Post Template

```html
<article class="blog-post">
  <header class="post-header">
    <h1 class="post-title">{{ page.title }}</h1>
    <div class="post-meta">
      <time class="post-date" datetime="{{ page.date }}">
        {{ page.date | date: "%B %d, %Y" }}
      </time>
      {% if page.tags %}
      <div class="post-tags">
        {% for tag in page.tags %}
        <span class="post-tag">{{ tag }}</span>
        {% endfor %}
      </div>
      {% endif %}
    </div>
  </header>
  
  <div class="post-content">
    {{ content }}
  </div>
  
  <footer class="post-footer">
    <a href="/blog" class="back-link">← Back to Blog</a>
  </footer>
</article>
```

### Card Grid

```html
<div class="project-grid">
  {% for project in site.projects %}
  <article class="project-card">
    <h2 class="project-card__title">{{ project.title }}</h2>
    <p class="project-card__description">{{ project.description }}</p>
    <a href="{{ project.url }}" class="project-card__link">View Project</a>
  </article>
  {% endfor %}
</div>
```

## Landmark Elements Rules

**Never nest landmarks**:
- ❌ Don't put `<nav>` inside `<main>`
- ❌ Don't put `<header>` inside `<article>` if it's the page header
- ✅ Use `aria-label` to disambiguate duplicate landmarks

**Example**:
```html
<nav aria-label="Main navigation">...</nav>
<main id="skip-target">
  <nav aria-label="Section navigation">...</nav>
</main>
```

## Accessibility Checklist

Before committing HTML:

- [ ] Skip link present and functional
- [ ] Exactly one `<main>` with id="skip-target"
- [ ] All interactive elements keyboard accessible
- [ ] All images have appropriate `alt` text
- [ ] Form labels associated with inputs
- [ ] Semantic heading hierarchy (h1 → h2 → h3)
- [ ] No inline styles or JavaScript
- [ ] Meaningful class names (WHAT, not HOW)
- [ ] ARIA used only when native semantics insufficient

## Mapping to Ontology

HTML provides semantic structure; SCSS maps to ontological roles:

**HTML**:
```html
<div class="feature-card">
  <h2 class="feature-title">Title</h2>
  <p class="feature-description">Description</p>
  <button class="feature-action">Action</button>
</div>
```

**SCSS (separate file)**:
```scss
.feature-card {
  @include genesis-entity('primary');
  
  .feature-title { @include genesis-cognition('axiom'); }
  .feature-description { @include genesis-cognition('discourse'); }
  .feature-action { @include genesis-synapse('execute'); }
}
```

## Resources

- `.github/instructions/html.instructions.md` - Complete HTML guidelines
- `_sass/ontology/INTEGRATION-GUIDE.md` - Ontology reference for class mapping
- Jekyll documentation for Liquid syntax

**Related Skills**: scss-refactor-agent, theme-genome-agent
