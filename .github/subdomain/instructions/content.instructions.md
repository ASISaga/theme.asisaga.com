---
applyTo: "**/*.md,**/*.html,**/*.markdown,_posts/**,_pages/**"
description: "Content authoring standards for ASI Saga subdomain repositories"
---

# Content Instructions

## Content-Only Architecture

This subdomain creates content that the theme renders. All layouts, includes, and styling come from `theme.asisaga.com`.

**Your files:**
- Markdown pages (`.md`) with front matter
- HTML pages with front matter
- Blog posts in `_posts/` (if applicable)
- Data files in `_data/` (if applicable)
- Static assets in `assets/` (images, downloads)

**NOT your files (theme provides):**
- `_layouts/`, `_includes/`, `_sass/`

## Front Matter

Every page requires YAML front matter:

```markdown
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

## Markdown Best Practices

### Heading Hierarchy

```markdown
# Page Title (h1 — one per page)

## Major Section (h2)

### Subsection (h3)

#### Detail (h4)
```

- ONE `h1` per page (usually from `title` front matter)
- Never skip levels (`h2` → `h4`)
- Use headings for structure, not visual size

### Links

```markdown
[Descriptive link text](url)              <!-- External -->
[Related page]({% link _pages/about.md %}) <!-- Internal with Jekyll -->
[Another page](/about/)                    <!-- Internal with path -->
```

- Use descriptive link text (not "click here")
- Prefer Jekyll `{% link %}` for internal links (validates at build time)

### Images

```markdown
![Descriptive alt text](/assets/images/photo.jpg)
```

- Always provide meaningful alt text
- Use empty alt for decorative images: `![](/assets/images/decorative.svg)`
- Store images in `assets/images/`

### Code Blocks

````markdown
```python
def example():
    return "Always specify language for syntax highlighting"
```
````

## HTML in Content

When using HTML within Markdown or HTML pages:

```html
<article class="research-paper">
  <h2 class="research-paper__title">Paper Title</h2>
  <p class="research-paper__abstract">Abstract text...</p>
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

Posts go in `_posts/` with filename format `YYYY-MM-DD-title.md`:

```markdown
---
layout: post
title: "Post Title"
date: 2026-01-15
categories: [research, ai]
tags: [machine-learning, ontology]
description: "Brief summary for social sharing"
---

Post content starts here.
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
- [ ] Code blocks specify language
- [ ] No inline styles or scripts
