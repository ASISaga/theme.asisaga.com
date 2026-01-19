# HTML Template Best Practices - Comprehensive Reference

**Version**: 2.1.0  
**For**: html-template-agent skill  
**Purpose**: Complete guide for creating semantic, accessible HTML templates

---

## Table of Contents

1. [Semantic HTML Principles](#semantic-html-principles)
2. [Accessibility Requirements](#accessibility-requirements)
3. [BEM Naming Convention](#bem-naming-convention)
4. [Jekyll Template Patterns](#jekyll-template-patterns)
5. [Validation Checklist](#validation-checklist)

---

## Semantic HTML Principles

### Rule 1: Content-First Class Naming

**Think WHAT, not HOW**:

```html
<!-- ✅ GOOD: Describes content meaning -->
<article class="research-paper">
  <header class="research-paper__header">
    <h1 class="research-paper__title">Title</h1>
  </header>
</article>

<!-- ❌ BAD: Describes visual appearance -->
<div class="blue-box">
  <div class="big-header">
    <h1 class="bold-text">Title</h1>
  </div>
</div>
```

### Rule 2: Use Semantic HTML5 Elements

```html
<!-- ✅ GOOD: Semantic structure -->
<article>
  <header>
    <h1>Article Title</h1>
    <time datetime="2026-01-19">January 19, 2026</time>
  </header>
  
  <section>
    <h2>Section Title</h2>
    <p>Content...</p>
  </section>
  
  <footer>
    <nav aria-label="Article navigation">
      <a href="/prev">Previous</a>
      <a href="/next">Next</a>
    </nav>
  </footer>
</article>

<!-- ❌ BAD: Non-semantic divs -->
<div class="article">
  <div class="header">
    <div class="title">Article Title</div>
    <div class="date">January 19, 2026</div>
  </div>
  <div class="content">...</div>
</div>
```

---

## Accessibility Requirements

### WCAG AA Mandatory Checklist

#### 1. Skip Link (REQUIRED)

```html
<!-- MUST be the first focusable element -->
<a href="#skip-target" class="sr-only focus-visible">
  Skip to main content
</a>

<!-- Later in the document -->
<main id="skip-target" tabindex="-1">
  <!-- Content -->
</main>
```

#### 2. Main Landmark (REQUIRED)

```html
<!-- Exactly ONE main per page -->
<main id="skip-target" tabindex="-1">
  {{ content }}
</main>
```

#### 3. Landmark Elements

```html
<!-- Page structure with proper landmarks -->
<a href="#skip-target" class="sr-only focus-visible">Skip to main content</a>

<header>
  <nav aria-label="Main navigation">
    <!-- Navigation -->
  </nav>
</header>

<main id="skip-target" tabindex="-1">
  <article>
    <!-- Article content -->
  </article>
  
  <aside aria-label="Related content">
    <!-- Sidebar -->
  </aside>
</main>

<footer>
  <nav aria-label="Footer navigation">
    <!-- Footer links -->
  </nav>
</footer>
```

#### 4. Images with Alt Text

```html
<!-- ✅ GOOD: Meaningful image -->
<img src="diagram.png" alt="Architecture diagram showing three-tier system">

<!-- ✅ GOOD: Decorative image -->
<img src="decoration.png" alt="">

<!-- ❌ BAD: Missing alt -->
<img src="diagram.png">
```

#### 5. Form Labels

```html
<!-- ✅ GOOD: Explicit label association -->
<label for="email">Email Address</label>
<input type="email" id="email" name="email" required>

<!-- ✅ GOOD: Implicit label -->
<label>
  Email Address
  <input type="email" name="email" required>
</label>

<!-- ❌ BAD: No label -->
<input type="email" placeholder="Email">
```

#### 6. Focus Indicators

```html
<!-- Ensure all interactive elements have visible focus -->
<style>
/* Already handled by ontology, but for reference: */
:focus-visible {
  outline: 2px solid var(--accent-consciousness);
  outline-offset: 2px;
}
</style>

<button class="cta-button">Click Me</button>
<a href="/page" class="nav-link">Link</a>
```

---

## BEM Naming Convention

### Structure: Block__Element--Modifier

```html
<!-- Block: Main component -->
<article class="product-card">
  
  <!-- Element: Part of block -->
  <header class="product-card__header">
    <h2 class="product-card__title">Product Name</h2>
  </header>
  
  <div class="product-card__content">
    <p class="product-card__description">Description</p>
    <span class="product-card__price">$99</span>
  </div>
  
  <!-- Modifier: Variation -->
  <div class="product-card__footer product-card__footer--highlighted">
    <button class="product-card__button">Buy Now</button>
  </div>
</article>

<!-- Different state modifier -->
<article class="product-card product-card--featured">
  ...
</article>
```

### BEM Benefits

1. **Clear hierarchy**: Easy to see parent-child relationships
2. **No nesting conflicts**: Specific selectors without deep nesting
3. **Reusable**: Blocks can be moved anywhere
4. **Scalable**: Easy to add new elements or modifiers

---

## Jekyll Template Patterns

### Pattern 1: Parameterized Includes

```liquid
{% comment %}
Card Component
Parameters:
- title: Card title (required)
- description: Card description (optional)
- image: Image URL (optional)
- link: Link URL (optional)
- variant: 'primary' | 'secondary' | 'featured' (default: 'primary')
{% endcomment %}

<article class="card card--{{ include.variant | default: 'primary' }}">
  {% if include.image %}
  <div class="card__image">
    <img src="{{ include.image }}" alt="{{ include.title }}">
  </div>
  {% endif %}
  
  <div class="card__content">
    <h3 class="card__title">{{ include.title }}</h3>
    
    {% if include.description %}
    <p class="card__description">{{ include.description }}</p>
    {% endif %}
    
    {% if include.link %}
    <a href="{{ include.link }}" class="card__link">Learn More</a>
    {% endif %}
  </div>
</article>
```

**Usage**:
```liquid
{% include card.html
   title="My Product"
   description="Amazing product description"
   image="/assets/images/product.png"
   link="/products/item"
   variant="featured"
%}
```

### Pattern 2: Resilient Data Access

```liquid
<!-- Safe data access with defaults -->
{% assign author = page.author | default: site.author | default: "Anonymous" %}
{% assign date = page.date | default: site.time %}

<!-- Check before rendering -->
{% if page.tags and page.tags.size > 0 %}
<div class="post-tags">
  {% for tag in page.tags %}
  <span class="post-tag">{{ tag }}</span>
  {% endfor %}
</div>
{% endif %}
```

### Pattern 3: Layout Composition

**Base Layout** (`_layouts/base.html`):
```html
<!DOCTYPE html>
<html lang="{{ page.lang | default: site.lang | default: 'en' }}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{ page.title }} | {{ site.title }}</title>
  <link rel="stylesheet" href="{{ '/assets/css/style.css' | relative_url }}">
</head>
<body>
  <a href="#skip-target" class="sr-only focus-visible">Skip to main content</a>
  
  {% include header.html %}
  
  <main id="skip-target" tabindex="-1">
    {{ content }}
  </main>
  
  {% include footer.html %}
</body>
</html>
```

**Page Layout** (`_layouts/page.html`):
```html
---
layout: base
---

<article class="page">
  <header class="page__header">
    <h1 class="page__title">{{ page.title }}</h1>
    {% if page.description %}
    <p class="page__description">{{ page.description }}</p>
    {% endif %}
  </header>
  
  <div class="page__content">
    {{ content }}
  </div>
</article>
```

---

## Validation Checklist

### Pre-Commit Checklist

Before committing HTML changes:

- [ ] **Skip link present** as first focusable element
- [ ] **Main landmark** with `id="skip-target"` and `tabindex="-1"`
- [ ] **All images have alt** attributes (empty for decorative)
- [ ] **Form inputs have labels** (explicit or implicit)
- [ ] **No inline styles** or inline JavaScript
- [ ] **Semantic HTML5 elements** used appropriately
- [ ] **BEM naming** for class names
- [ ] **Meaningful class names** (WHAT not HOW)
- [ ] **Proper heading hierarchy** (h1 → h2 → h3)
- [ ] **ARIA only when needed** (prefer native semantics)

### Automated Validation

```bash
# Run validation script
./.github/skills/html-template-agent/scripts/validate-html.sh path/to/template.html

# Should check:
# ✅ Skip link present
# ✅ Main landmark with skip-target
# ✅ No inline styles
# ✅ Semantic class names
# ✅ Images have alt attributes
# ✅ Form labels present
```

---

## Common Patterns

### Pattern: Blog Post

```html
<article class="blog-post">
  <header class="blog-post__header">
    <h1 class="blog-post__title">{{ page.title }}</h1>
    
    <div class="blog-post__meta">
      <time class="blog-post__date" datetime="{{ page.date | date_to_xmlschema }}">
        {{ page.date | date: "%B %d, %Y" }}
      </time>
      
      {% if page.author %}
      <span class="blog-post__author">by {{ page.author }}</span>
      {% endif %}
    </div>
    
    {% if page.tags %}
    <div class="blog-post__tags">
      {% for tag in page.tags %}
      <span class="blog-post__tag">{{ tag }}</span>
      {% endfor %}
    </div>
    {% endif %}
  </header>
  
  <div class="blog-post__content">
    {{ content }}
  </div>
  
  <footer class="blog-post__footer">
    <nav class="blog-post__navigation" aria-label="Post navigation">
      {% if page.previous %}
      <a href="{{ page.previous.url }}" class="blog-post__prev">
        ← {{ page.previous.title }}
      </a>
      {% endif %}
      
      {% if page.next %}
      <a href="{{ page.next.url }}" class="blog-post__next">
        {{ page.next.title }} →
      </a>
      {% endif %}
    </nav>
  </footer>
</article>
```

### Pattern: Card Grid

```html
<div class="project-grid">
  {% for project in site.projects %}
  <article class="project-card">
    {% if project.image %}
    <div class="project-card__image">
      <img src="{{ project.image }}" alt="{{ project.title }}">
    </div>
    {% endif %}
    
    <div class="project-card__content">
      <h2 class="project-card__title">{{ project.title }}</h2>
      <p class="project-card__description">{{ project.description }}</p>
      
      {% if project.tags %}
      <div class="project-card__tags">
        {% for tag in project.tags %}
        <span class="project-card__tag">{{ tag }}</span>
        {% endfor %}
      </div>
      {% endif %}
      
      <a href="{{ project.url }}" class="project-card__link">View Project</a>
    </div>
  </article>
  {% endfor %}
</div>
```

---

## Mapping to Ontological SCSS

HTML provides structure; SCSS provides styling via ontology:

**HTML** (`template.html`):
```html
<div class="feature-section">
  <h2 class="feature-section__title">Features</h2>
  <div class="feature-section__grid">
    <article class="feature-card">
      <h3 class="feature-card__title">Fast</h3>
      <p class="feature-card__description">Lightning quick performance</p>
    </article>
  </div>
</div>
```

**SCSS** (`style.scss`):
```scss
@import "ontology/index";

.feature-section {
  @include genesis-environment('focused');
  
  &__title {
    @include genesis-cognition('axiom');
  }
  
  &__grid {
    @include genesis-environment('distributed');
  }
}

.feature-card {
  @include genesis-entity('primary');
  
  &__title {
    @include genesis-cognition('motive');
  }
  
  &__description {
    @include genesis-cognition('discourse');
  }
}
```

---

## Resources

- **WCAG 2.1 Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/
- **HTML5 Spec**: https://html.spec.whatwg.org/
- **BEM Methodology**: http://getbem.com/
- **Jekyll Documentation**: https://jekyllrb.com/docs/

---

**Version**: 2.1.0  
**Last Updated**: 2026-01-19  
**Maintained by**: html-template-agent

For automation and validation, see `../scripts/validate-html.sh`
