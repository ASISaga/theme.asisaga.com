# HTML & Liquid Templating Specification

## Overview

This specification defines the standards and patterns for HTML structure and Liquid templating in the ASI Saga theme. All HTML must be semantic, accessible, and follow Jekyll/Liquid best practices.

## Semantic HTML Requirements

### Landmark Elements

#### MANDATORY Rules

1. **Never nest landmark elements**
   - ❌ BAD: `<header>` inside `<main>`
   - ✅ GOOD: `<header>` and `<main>` as siblings

2. **One main landmark per page**
   ```html
   <main id="skip-target" tabindex="-1" role="main">
     {{ content }}
   </main>
   ```

3. **One banner and one contentinfo per page**
   ```html
   <header role="banner">...</header>
   <footer role="contentinfo">...</footer>
   ```

4. **Use aria-label for duplicate landmarks**
   ```html
   <nav aria-label="Primary navigation">...</nav>
   <nav aria-label="Footer navigation">...</nav>
   ```

### HTML5 Elements

Use semantic elements appropriately:

- `<header>`: Page or section header (not to be confused with `<head>`)
- `<nav>`: Navigation menus
- `<main>`: Primary page content (one per page)
- `<article>`: Self-contained content (blog posts, news articles)
- `<section>`: Thematic grouping of content
- `<aside>`: Tangentially related content
- `<footer>`: Page or section footer

### Document Structure Template

```html
<!DOCTYPE html>
<html lang="{{ site.lang | default: 'en-US' }}">
  {% include head.html %}
  
  <body class="layout-container">
    <!-- Skip link (REQUIRED) -->
    <a href="#skip-target" class="skip-link">Skip to main content</a>
    
    <div class="page-layout">
      <!-- Header wrapper -->
      <div class="header-wrapper">
        {% include header.html %}
      </div>
      
      <!-- Main content (REQUIRED) -->
      <main class="site-main" id="skip-target" tabindex="-1" role="main">
        <div class="content-wrapper">
          {{ content }}
        </div>
      </main>
      
      <!-- Footer wrapper -->
      <div class="footer-wrapper">
        {% include footer.html %}
      </div>
    </div>
  </body>
</html>
```

## Accessibility Requirements

### Skip Links

**Every page MUST have a skip link** as the first focusable element:

```html
<a href="#skip-target" class="skip-link">Skip to main content</a>
```

With corresponding CSS:
```scss
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  z-index: 100;
  &:focus {
    top: 0;
  }
}
```

### Images

**All images MUST have alt attributes**:

```html
<!-- Meaningful images -->
<img src="logo.png" alt="ASI Saga - Consciousness Embedding Platform">

<!-- Decorative images -->
<img src="decoration.svg" alt="">
```

### Form Labels

**All form inputs MUST have associated labels**:

```html
<!-- Using for/id association -->
<label for="email">Email Address</label>
<input type="email" id="email" name="email" required>

<!-- Using implicit association -->
<label>
  Email Address
  <input type="email" name="email" required>
</label>
```

### Interactive Elements

**All interactive elements MUST**:
- Be keyboard focusable
- Have visible focus indicators
- Have clear purpose/label

```html
<button type="button" aria-label="Close menu">
  <span class="icon-close" aria-hidden="true"></span>
</button>
```

### ARIA Usage

**Use ARIA attributes only when native semantics are insufficient**:

```html
<!-- ❌ Unnecessary ARIA -->
<button role="button">Click Me</button>

<!-- ✅ Useful ARIA -->
<div role="alert" aria-live="polite">
  Form submitted successfully!
</div>

<!-- ✅ Useful ARIA for state -->
<button aria-expanded="false" aria-controls="menu">
  Menu
</button>
```

## Liquid Templating Patterns

### Layout Inheritance

Layouts use Liquid's `{{ content }}` for inheritance:

```liquid
<!-- _layouts/default.html -->
<main>
  {{ content }}
</main>

<!-- _layouts/post.html -->
---
layout: default
---
<article>
  <h1>{{ page.title }}</h1>
  {{ content }}
</article>
```

### Include Syntax

#### Simple Include
```liquid
{% include header.html %}
```

#### Parameterized Include
```liquid
{% include component.html 
   title="Welcome"
   description="Get started with ASI Saga"
   button_text="Learn More"
%}
```

#### Include with Capture
```liquid
{% capture my_content %}
  <p>This is captured content</p>
{% endcapture %}

{% include modal.html content=my_content %}
```

### Variable Access

#### Site Variables
```liquid
{{ site.title }}
{{ site.description }}
{{ site.lang }}
```

#### Page Variables
```liquid
{{ page.title }}
{{ page.date }}
{{ page.author }}
{{ page.layout }}
```

#### Include Parameters
```liquid
<!-- In _includes/card.html -->
<div class="card">
  <h3>{{ include.title }}</h3>
  <p>{{ include.description }}</p>
</div>
```

### Control Flow

#### Conditionals
```liquid
{% if page.featured %}
  <span class="badge">Featured</span>
{% endif %}

{% if page.layout == "post" %}
  {% include post-meta.html %}
{% elsif page.layout == "article" %}
  {% include article-meta.html %}
{% else %}
  <!-- Default case -->
{% endif %}
```

#### Loops
```liquid
{% for item in site.data.nav.items %}
  <a href="{{ item.url }}">{{ item.label }}</a>
{% endfor %}

{% for post in site.posts limit:5 %}
  {% include post-card.html post=post %}
{% endfor %}
```

#### Filters
```liquid
{{ site.title | upcase }}
{{ page.date | date: "%B %d, %Y" }}
{{ content | strip_html | truncatewords: 50 }}
{{ "/assets/images/logo.png" | relative_url }}
```

### Front Matter

Page-specific metadata:

```yaml
---
layout: post
title: "Getting Started with ASI Saga"
date: 2024-12-25
author: "Genesis Architect"
categories: [documentation, tutorial]
tags: [consciousness, embedding]
featured: true
---
```

## Component Patterns

### Parameterized Components

Define clear component APIs with defaults:

```liquid
<!-- _includes/hero.html -->
{% assign title = include.title | default: "Welcome" %}
{% assign subtitle = include.subtitle | default: "" %}
{% assign image = include.image | default: "/assets/images/default-hero.jpg" %}
{% assign cta_text = include.cta_text | default: "Get Started" %}
{% assign cta_url = include.cta_url | default: "/" %}

<section class="hero" style="background-image: url({{ image }});">
  <div class="hero__content">
    <h1>{{ title }}</h1>
    {% if subtitle != "" %}
      <p>{{ subtitle }}</p>
    {% endif %}
    <a href="{{ cta_url }}" class="btn btn-primary">{{ cta_text }}</a>
  </div>
</section>
```

Usage:
```liquid
{% include hero.html 
   title="Embed Human Consciousness"
   subtitle="Join the Genesis Architect Community"
   cta_text="Begin Your Journey"
%}
```

### Component Documentation

Document component parameters in file header:

```liquid
<!--
  Feature Grid Component
  
  Displays a responsive grid of features with icons and descriptions.
  
  Parameters:
    - title (string, optional): Section title
    - features (array, required): Array of feature objects
    - columns (number, optional): Number of columns (default: 3)
    
  Usage:
    {% include feature-grid.html 
       title="Core Features"
       features=site.data.features
       columns=4
    %}
-->
```

### Resilient Components

Handle missing data gracefully:

```liquid
{% if include.items and include.items.size > 0 %}
  {% for item in include.items %}
    <!-- Render item -->
  {% endfor %}
{% else %}
  <p>No items available.</p>
{% endif %}
```

## HTML Coding Standards

### Formatting

```html
<!-- ✅ Good: Proper indentation and structure -->
<div class="container">
  <div class="row">
    <div class="col-md-6">
      <h2>Title</h2>
      <p>Content goes here.</p>
    </div>
  </div>
</div>

<!-- ❌ Bad: Inconsistent indentation -->
<div class="container">
<div class="row">
<div class="col-md-6">
<h2>Title</h2>
<p>Content goes here.</p>
</div></div></div>
```

### Attributes

```html
<!-- ✅ Good: Logical attribute order -->
<input 
  type="email" 
  id="user-email" 
  name="email"
  class="form-control"
  placeholder="Enter email"
  required
  aria-describedby="email-help"
>

<!-- Use double quotes consistently -->
<div class="card" data-id="123">
```

### Comments

```html
<!-- Section: Hero -->
<section class="hero">
  <!-- Hero content -->
</section>
<!-- End Section: Hero -->

<!-- Component: Feature Grid -->
{% include feature-grid.html %}
```

## Common Patterns

### Navigation Menu

```liquid
<nav aria-label="Primary navigation">
  <ul class="nav-menu">
    {% for item in site.data.nav.items %}
      <li class="nav-item">
        <a href="{{ item.url }}" 
           {% if page.url == item.url %}class="active"{% endif %}>
          {{ item.label }}
        </a>
      </li>
    {% endfor %}
  </ul>
</nav>
```

### Post Loop

```liquid
<div class="post-list">
  {% for post in site.posts %}
    <article class="post-preview">
      <h2>
        <a href="{{ post.url }}">{{ post.title }}</a>
      </h2>
      <time datetime="{{ post.date | date: '%Y-%m-%d' }}">
        {{ post.date | date: "%B %d, %Y" }}
      </time>
      <p>{{ post.excerpt | strip_html | truncatewords: 50 }}</p>
    </article>
  {% endfor %}
</div>
```

### Conditional Content

```liquid
{% if page.hero_image %}
  <div class="page-hero" style="background-image: url({{ page.hero_image }});">
    <h1>{{ page.title }}</h1>
  </div>
{% else %}
  <div class="page-header">
    <h1>{{ page.title }}</h1>
  </div>
{% endif %}
```

## Anti-Patterns to Avoid

### ❌ Don't Use Inline Styles
```html
<!-- Bad -->
<div style="color: red; margin: 10px;">Content</div>

<!-- Good -->
<div class="alert alert-danger">Content</div>
```

### ❌ Don't Use Inline JavaScript
```html
<!-- Bad -->
<button onclick="alert('Hi')">Click</button>

<!-- Good -->
<button data-action="greet">Click</button>
```

### ❌ Don't Use Classes for Behavior
```html
<!-- Bad -->
<div class="toggle-menu">...</div>

<!-- Good -->
<div data-toggle="menu">...</div>
```

### ❌ Don't Nest Liquid Logic Too Deeply
```liquid
<!-- Bad: Hard to read -->
{% for item in items %}
  {% if item.active %}
    {% for subitem in item.subitems %}
      {% if subitem.visible %}
        ...
      {% endif %}
    {% endfor %}
  {% endif %}
{% endfor %}

<!-- Good: Extract to include -->
{% for item in items %}
  {% if item.active %}
    {% include subitem-list.html subitems=item.subitems %}
  {% endif %}
{% endfor %}
```

## Performance Considerations

### Minimize Liquid Processing

```liquid
<!-- ✅ Good: Assign once, use multiple times -->
{% assign formatted_date = page.date | date: "%B %d, %Y" %}
<time>{{ formatted_date }}</time>
<meta content="{{ formatted_date }}">

<!-- ❌ Bad: Process multiple times -->
<time>{{ page.date | date: "%B %d, %Y" }}</time>
<meta content="{{ page.date | date: "%B %d, %Y" }}">
```

### Use Includes Judiciously

- Include files add processing time
- Balance DRY principle with performance
- For very small snippets, consider duplication

## Testing Checklist

Before committing HTML/Liquid changes:

- [ ] Validate HTML (W3C validator)
- [ ] Test with keyboard navigation
- [ ] Test with screen reader
- [ ] Check all links work
- [ ] Verify responsive behavior
- [ ] Check browser console for errors
- [ ] Validate accessibility (WAVE, axe)

## Related Specifications

- [Accessibility Standards](./accessibility.md)
- [Component Library](./component-library.md)
- [Layout System](./layout-system.md)
