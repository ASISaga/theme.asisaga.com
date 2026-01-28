# Layout Includes

Reusable, semantic Jekyll includes for common layout patterns in the Genesis Ontological Design System.

## Purpose

These includes reduce duplication across layouts while maintaining:
- **Semantic HTML5** structure
- **BEM-style naming** with customizable prefixes
- **Accessibility-first** markup (ARIA, semantic elements)
- **Content-first class names** (WHAT not HOW)
- **Resilience to missing data** (graceful degradation)

All includes follow the three-tier architecture: semantic HTML (Content tier) → ontological SCSS mapping (Interface tier) → visual styling (Engine tier).

## Available Includes

### 1. Layout Header (`layout-header.html`)

A semantic header component for page/section headers with title, subtitle, and description.

**Parameters:**
- `title` (required) - Main heading text
- `subtitle` (optional) - Subtitle/tagline text
- `description` (optional) - Description or introduction text
- `class_prefix` (required) - BEM block name (e.g., "post", "article", "landing")

**Usage:**
```liquid
{% include layouts/layout-header.html
   class_prefix="post"
   title=page.title
   subtitle="A deep dive into consciousness"
   description=page.excerpt
%}
```

**Output:**
```html
<header class="post__header">
  <h1 class="post__title">My Article Title</h1>
  <p class="post__subtitle">A deep dive into consciousness</p>
  <div class="post__description">
    Article excerpt goes here...
  </div>
</header>
```

---

### 2. Content Metadata (`content-meta.html`)

Displays content metadata with semantic `<time>` elements and Font Awesome icons.

**Parameters:**
- `date` (optional) - Publication date
- `author` (optional) - Author name
- `reading_time` (optional) - Reading time in minutes
- `class_prefix` (required) - BEM block name

**Usage:**
```liquid
{% include layouts/content-meta.html
   class_prefix="article"
   date=page.date
   author=page.author
   reading_time=page.reading_time
%}
```

**Output:**
```html
<div class="article__meta">
  <span class="article__meta-date">
    <i class="far fa-calendar" aria-hidden="true"></i>
    <time datetime="2026-01-15T00:00:00+00:00">January 15, 2026</time>
  </span>
  <span class="article__meta-author">
    <i class="far fa-user" aria-hidden="true"></i>
    Jane Smith
  </span>
  <span class="article__meta-reading-time">
    <i class="far fa-clock" aria-hidden="true"></i>
    5 min read
  </span>
</div>
```

---

### 3. Tags and Categories (`tags-categories.html`)

Displays tags and/or categories with semantic markup and distinct visual grouping.

**Parameters:**
- `tags` (optional) - Array of tag names
- `categories` (optional) - Array of category names
- `class_prefix` (required) - BEM block name

**Usage:**
```liquid
{% include layouts/tags-categories.html
   class_prefix="post"
   tags=page.tags
   categories=page.categories
%}
```

**Output:**
```html
<div class="post__taxonomy">
  <div class="post__categories">
    <span class="post__taxonomy-label" aria-label="Categories">
      <i class="fas fa-folder" aria-hidden="true"></i>
    </span>
    <span class="post__category">Technology</span>
    <span class="post__category">AI</span>
  </div>
  <div class="post__tags">
    <span class="post__taxonomy-label" aria-label="Tags">
      <i class="fas fa-tags" aria-hidden="true"></i>
    </span>
    <span class="post__tag">machine-learning</span>
    <span class="post__tag">consciousness</span>
  </div>
</div>
```

---

### 4. Layout Footer CTA (`layout-footer-cta.html`)

A semantic footer call-to-action component for end-of-content conversion prompts.

**Parameters:**
- `title` (required) - CTA heading text
- `description` (optional) - CTA description/supporting text
- `button_text` (required) - Button/link text
- `button_url` (required) - Button/link destination URL
- `class_prefix` (required) - BEM block name

**Usage:**
```liquid
{% include layouts/layout-footer-cta.html
   class_prefix="article"
   title="Want to Learn More?"
   description="Subscribe to our newsletter for weekly insights on consciousness and AI."
   button_text="Subscribe Now"
   button_url="/subscribe"
%}
```

**Output:**
```html
<footer class="article__footer-cta">
  <h2 class="article__cta-title">Want to Learn More?</h2>
  <p class="article__cta-description">Subscribe to our newsletter for weekly insights on consciousness and AI.</p>
  <div class="article__cta-actions">
    <a href="/subscribe" class="article__cta-button">Subscribe Now</a>
  </div>
</footer>
```

---

## Complete Example: Blog Post Layout

```liquid
---
layout: default
---

<article class="post">
  {% include layouts/layout-header.html
     class_prefix="post"
     title=page.title
     subtitle=page.subtitle
  %}
  
  {% include layouts/content-meta.html
     class_prefix="post"
     date=page.date
     author=page.author
     reading_time=page.reading_time
  %}
  
  {% include layouts/tags-categories.html
     class_prefix="post"
     tags=page.tags
     categories=page.categories
  %}
  
  <div class="post__content">
    {{ content }}
  </div>
  
  {% include layouts/layout-footer-cta.html
     class_prefix="post"
     title="Enjoyed this article?"
     description="Share it with your network or read more like this."
     button_text="More Articles"
     button_url="/blog"
  %}
</article>
```

## Styling with Ontology

After using these includes, create corresponding SCSS using ontological mixins:

```scss
---
---
@import "ontology/index";

.post {
  @include genesis-environment('focused');
  
  &__header {
    @include genesis-entity('primary');
  }
  
  &__title {
    @include genesis-cognition('axiom');
  }
  
  &__subtitle {
    @include genesis-cognition('discourse');
  }
  
  &__meta {
    @include genesis-entity('secondary');
    @include genesis-environment('associative');
    
    &-date,
    &-author,
    &-reading-time {
      @include genesis-cognition('gloss');
    }
  }
  
  &__taxonomy {
    @include genesis-environment('associative');
  }
  
  &__tag,
  &__category {
    @include genesis-cognition('quantum');
  }
  
  &__footer-cta {
    @include genesis-entity('imperative');
    
    .post__cta-title {
      @include genesis-cognition('motive');
    }
    
    .post__cta-button {
      @include genesis-synapse('execute');
    }
  }
}
```

## Benefits

✅ **DRY principle** - Write once, use everywhere  
✅ **Consistent markup** - Same structure across layouts  
✅ **Accessibility** - Semantic HTML, ARIA, proper elements  
✅ **Maintainability** - Update one file, fix everywhere  
✅ **Flexibility** - BEM prefix allows custom styling per context  
✅ **Evolution-ready** - Semantic patterns help identify ontological gaps

## Design Principles

1. **Semantic HTML5** - Use proper elements (`<header>`, `<footer>`, `<time>`)
2. **BEM Naming** - `.block__element--modifier` with customizable block via `class_prefix`
3. **Content-First** - Class names describe WHAT, not HOW (`.post__title` not `.big-bold-text`)
4. **Graceful Degradation** - Handles missing optional parameters elegantly
5. **No Inline Styles** - All visual styling via ontological SCSS mapping
6. **ARIA Where Needed** - Use `aria-hidden` for decorative icons, `aria-label` for context
