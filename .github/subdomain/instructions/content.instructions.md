---
applyTo: "**/*.html,_posts/**,_pages/**"
description: "Content authoring standards for ASI Saga subdomain repositories - HTML only"
---

# Content Instructions

## Content-Only Architecture

This subdomain creates HTML content that the theme renders. All layouts, includes, and styling come from `theme.asisaga.com`.

**Your files:**
- HTML pages with front matter (NO Markdown - HTML only)
- Blog posts in `_posts/` (if applicable)
- Data files in `_data/` (if applicable)
- Static assets in `assets/` (images, downloads)
- Page-specific SCSS in `_sass/main.scss` (ontology-only, optional)
- JavaScript in `assets/js/script.js` (mandatory - see js.instructions.md)

**NOT your files (theme provides):**
- `_layouts/`, `_includes/`

## Front Matter

Every HTML page requires YAML front matter:

```html
---
layout: default
title: "Page Title"
description: "Brief description for SEO"
---
```

### Required Fields

| Field | Purpose |
|-------|---------|
| `layout` | Theme layout (`default`, `post`, `page`) |
| `title` | Page title (used in `<title>` and `<h1>`) |

### Optional Fields

| Field | Purpose |
|-------|---------|
| `description` | SEO meta description |
| `date` | Publication date for posts (`YYYY-MM-DD`) |
| `categories` | Content categorization |
| `tags` | Content tagging |
| `permalink` | Custom URL path |
| `image` | Social sharing image |

## HTML Best Practices

### Heading Hierarchy

```html
<h1>Page Title</h1> <!-- One per page -->

<h2>Major Section</h2>

<h3>Subsection</h3>

<h4>Detail</h4>
```

- ONE `h1` per page (usually from `{{ page.title }}`)
- Never skip levels (`h2` → `h4`)
- Use headings for structure, not visual size

### Links

```html
<a href="https://example.com">Descriptive link text</a>  <!-- External -->
<a href="/about/">Internal page</a>                      <!-- Internal -->
```

- Use descriptive link text (not "click here")
- Add `aria-label` for icon-only links

### Images

```html
<img src="/assets/images/photo.jpg" alt="Descriptive alt text">
```

- Always provide meaningful alt text
- Use empty alt for decorative images: `<img src="..." alt="">`
- Store images in `assets/images/`

### Code Blocks

```html
<pre><code class="language-python">
def example():
    return "Semantic code blocks with language class"
</code></pre>
```

## HTML in Content

When using HTML with Liquid templating:

```html
<article class="research-paper">
  <h2 class="research-paper__title">{{ page.title }}</h2>
  <p class="research-paper__abstract">{{ page.description }}</p>
  <div class="research-paper__content">
    {{ content }}
  </div>
</article>
```

### Semantic Elements

| Element | Use For |
|---------|---------|
| `<article>` | Self-contained content (blog post, paper) |
| `<section>` | Thematic grouping with heading |
| `<nav>` | Navigation links |
| `<aside>` | Tangentially related content |
| `<figure>` | Images, diagrams, code with caption |
| `<time>` | Dates and times |

### Class Naming

Use content-first BEM naming:
- ✅ `.research-paper__title`, `.team-member__bio`
- ❌ `.big-text`, `.blue-box`, `.mt-4`

## Blog Posts

Posts go in `_posts/` with filename format `YYYY-MM-DD-title.html`:

```html
---
layout: post
title: "Post Title"
date: 2026-01-15
categories: [research, ai]
tags: [machine-learning, ontology]
description: "Brief summary for social sharing"
---

<article class="blog-post">
  <div class="blog-post__content">
    Post content starts here.
  </div>
</article>
```

## Data Files

Use `_data/` for structured content:

```yaml
# _data/team.yml
- name: "Team Member"
  role: "Researcher"
  bio: "Brief biography"
```

Access in content:
```liquid
{% for member in site.data.team %}
  {{ member.name }} - {{ member.role }}
{% endfor %}
```

## Quality Checklist

Before committing content:
- [ ] Front matter includes `layout` and `title`
- [ ] Heading hierarchy is correct (no skipped levels)
- [ ] Images have alt text
- [ ] Links use descriptive text
- [ ] No inline styles or scripts
- [ ] HTML is semantic and accessible
- [ ] Content works without JavaScript
