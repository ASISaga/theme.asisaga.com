---
name: html-template-agent
description: Create semantic HTML5 templates with accessibility-first principles for Genesis Ontological Design System. Ensure proper landmark elements, meaningful class names, WCAG compliance, and BEM-style naming. Use when building Jekyll templates, includes, or auditing HTML structure for semantic correctness.
license: MIT
metadata:
  author: ASISaga
  version: "2.1"
  category: design-system
  role: semantic-structure
allowed-tools: Bash Read
---

# HTML Template Agent

**Role**: Semantic Structure and Accessibility Expert  
**Scope**: Jekyll templates, includes, and HTML structure  
**Version**: 2.1 - Integrated Validation & Automation

## Purpose

The HTML Template Agent ensures all HTML follows semantic best practices, uses meaningful content-first class names, and meets WCAG AA accessibility standards. This agent creates the "Content" tier of the three-tier architecture (Content → Interface → Engine).

**New in v2.1**: Automated validation scripts, comprehensive template guide, accessibility checklist.

## When to Use This Skill

Activate when:
- Creating new Jekyll layouts or includes
- Building reusable HTML components
- Auditing HTML for accessibility
- Implementing semantic class naming
- Ensuring landmark element integrity
- **NEW**: Running automated HTML validation

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

## Quick Example

### Semantic HTML5 Structure

```html
<!-- Skip link (REQUIRED first) -->
<a href="#skip-target" class="sr-only focus-visible">Skip to main content</a>

<!-- Main landmark (REQUIRED, exactly one) -->
<main id="skip-target" tabindex="-1">
  <article class="blog-post">
    <header class="blog-post__header">
      <h1 class="blog-post__title">Title</h1>
      <time class="blog-post__date" datetime="2026-01-19">January 19, 2026</time>
    </header>
    
    <div class="blog-post__content">
      <p>Content...</p>
    </div>
  </article>
</main>
```

## Automation & Validation

### Validation Script

Run the automated validation script to check semantic structure and accessibility:

```bash
# Validate HTML template
./.github/skills/html-template-agent/scripts/validate-html.sh path/to/template.html

# The script checks:
# 1. Skip link presence
# 2. Main landmark with skip-target
# 3. No inline styles
# 4. Semantic class names
# 5. Images with alt attributes
# 6. Form labels
```

### Pre-Commit Workflow

Before committing HTML changes:

```bash
# 1. Validate your template
./.github/skills/html-template-agent/scripts/validate-html.sh _layouts/page.html

# 2. Check all templates if needed
for file in _layouts/*.html; do
  ./.github/skills/html-template-agent/scripts/validate-html.sh "$file"
done
```

## Detailed Guide

See [references/TEMPLATE-GUIDE.md](references/TEMPLATE-GUIDE.md) for:
- Complete accessibility checklist
- BEM naming convention guide
- Jekyll template patterns
- Common HTML patterns
- Validation procedures

## Resources

### In This Skill
- `scripts/validate-html.sh` - **NEW** Automated validation
- `references/TEMPLATE-GUIDE.md` - **NEW** Comprehensive template guide

### In Repository
- `.github/instructions/html.instructions.md` - Complete HTML guidelines
- `_sass/ontology/INTEGRATION-GUIDE.md` - Ontology reference for class mapping
- `.github/AGENT-INDEX.md` - **NEW** Quick navigation guide

### Related Agents
- `scss-refactor-agent` - Maps HTML to ontological SCSS
- `responsive-design-agent` - Ensures mobile-first patterns
- `theme-genome-agent` - Maintains design system

**Version**: 2.1.0 - Integrated Validation  
**Last Updated**: 2026-01-19
