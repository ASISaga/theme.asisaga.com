---
name: content-author
description: Create well-structured, accessible content pages for ASI Saga subdomain repositories. Use when creating Markdown or HTML pages, blog posts, or data-driven content that relies on theme layouts from theme.asisaga.com.
license: MIT
metadata:
  author: ASISaga
  version: "1.0"
  category: content
  role: content-specialist
allowed-tools: Bash Read Edit
---

# Content Author

**Role**: Content Creation Specialist  
**Scope**: Subdomain content pages (Markdown, HTML, data files)  
**Version**: 1.0

## Purpose

Create well-structured, accessible content pages that leverage theme layouts. Subdomain repos are content-only — all layouts, includes, and styling come from `theme.asisaga.com`.

## When to Use This Skill

Activate when:
- Creating new Markdown or HTML pages
- Writing blog posts for `_posts/`
- Organizing content with `_data/` files
- Structuring page front matter
- Adding semantic HTML to content

**Don't use for:**
- Creating layouts or includes (theme responsibility)
- Writing SCSS (use scss-compliance skill)
- Modifying theme infrastructure

## Content Creation Workflow

### 1. Choose Page Type

| Type | Layout | Location | Front Matter |
|------|--------|----------|-------------|
| Standard page | `default` | Root or `_pages/` | `layout: default` |
| Blog post | `post` | `_posts/YYYY-MM-DD-title.md` | `layout: post` |
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

- ONE `h1` per page (from title front matter)
- Never skip heading levels (`h2` → `h4`)
- Use semantic HTML: `<article>`, `<section>`, `<nav>`
- Content-first BEM class names: `.research-paper__title`

### 4. Accessibility

- All `<img>` elements need `alt` text
- Links need descriptive text (not "click here")
- Form inputs need associated `<label>` elements
- No inline styles or scripts

## Quality Checklist

- [ ] Front matter includes `layout` and `title`
- [ ] Heading hierarchy correct (no skipped levels)
- [ ] Images have alt text
- [ ] Links have descriptive text
- [ ] No `_layouts/` or `_includes/` files created
- [ ] No inline styles or scripts
- [ ] Code blocks specify language

## Resources

- `instructions/content.instructions.md` — Complete content standards
- `copilot-instructions.md` — Architecture overview and ontology reference

**Related Skills**: scss-compliance, subdomain-evolution
