---
name: content-author
description: Create well-structured, accessible HTML content pages for ASI Saga subdomain repositories. Use when creating HTML pages, blog posts, or data-driven content that relies on theme layouts from theme.asisaga.com. HTML-only, NO Markdown.
license: MIT
metadata:
  author: ASISaga
  version: "2.0"
  category: content
  role: content-specialist
allowed-tools: Bash Read Edit
---

# Content Author

**Role**: Content Creation Specialist  
**Scope**: Subdomain HTML content pages (NO Markdown)  
**Version**: 2.0

## Purpose

Create well-structured, accessible HTML content pages that leverage theme layouts. Subdomain repos are content-only — all layouts, includes, and styling come from `theme.asisaga.com`.

## When to Use This Skill

Activate when:
- Creating new HTML pages (NO Markdown)
- Writing blog posts for `_posts/` (as .html files)
- Organizing content with `_data/` files
- Structuring page front matter
- Adding semantic HTML to content

**Don't use for:**
- Creating Markdown (.md) files (not supported)
- Creating layouts or includes (theme responsibility)
- Writing SCSS (use scss-compliance skill)
- Modifying theme infrastructure

## Content Creation Workflow

### 1. Choose Page Type

| Type | Layout | Location | Front Matter |
|------|--------|----------|-------------|
| Standard page | `default` | Root or `_pages/` | `layout: default` |
| Blog post | `post` | `_posts/YYYY-MM-DD-title.html` | `layout: post` |
| Custom page | `page` | Root or directory | `layout: page` |

### 2. Write Front Matter

**Required:** `layout` and `title`

```yaml
---
layout: default
title: "Clear, Descriptive Title"
description: "Concise summary for SEO"
---
```

### 3. Structure Content

- ONE `h1` per page (usually `{{ page.title }}`)
- Never skip heading levels (`h2` → `h4`)
- Use semantic HTML: `<article>`, `<section>`, `<nav>`
- Content-first BEM class names: `.research-paper__title`

### 4. Accessibility

- All `<img>` elements need `alt` text
- Links need descriptive text (not "click here")
- Form inputs need associated `<label>` elements
- No inline styles or scripts

## Quality Checklist

- [ ] HTML files only (NO .md files)
- [ ] Front matter includes `layout` and `title`
- [ ] Heading hierarchy correct (no skipped levels)
- [ ] Images have alt text
- [ ] Links have descriptive text
- [ ] No `_layouts/` or `_includes/` files created
- [ ] No inline styles or scripts
- [ ] `assets/js/script.js` exists (mandatory)

## Resources

- `instructions/content.instructions.md` — Complete HTML content standards
- `instructions/js.instructions.md` — Mandatory script.js requirements
- `copilot-instructions.md` — Architecture overview and ontology reference

**Related Skills**: scss-compliance, subdomain-evolution
