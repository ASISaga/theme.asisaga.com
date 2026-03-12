---
name: scss-compliance
description: Validate and enforce zero-CSS compliance in subdomain page-specific SCSS files. Ensure all styling uses only Genesis Ontological mixins with no raw CSS properties, unit values, color values, or imports. Use when auditing or creating subdomain page-specific SCSS in _sass/main.scss.
license: MIT
metadata:
  author: ASISaga
  version: "2.0"
  category: design-system
  role: compliance-specialist
allowed-tools: Bash Read Edit
---

# SCSS Compliance

**Role**: Zero-CSS Compliance Enforcer  
**Scope**: Subdomain page-specific SCSS (`_sass/main.scss`)  
**Version**: 2.0

## Purpose

Ensure subdomain page-specific SCSS files use only Genesis Ontological mixins with zero raw CSS properties. Subdomains rarely need custom SCSS — the theme provides complete styling. When page-specific SCSS is needed, it must use ontological mixins exclusively in `_sass/main.scss`.

## When to Use This Skill

Activate when:
- Creating `_sass/main.scss` for page-specific styling
- Auditing existing subdomain SCSS for compliance
- Reviewing PRs that add or modify SCSS files
- Checking for raw CSS violations
- Migrating from old `assets/css/custom.scss` pattern

**Don't use for:**
- Theme SCSS refactoring (use theme's scss-refactor-agent)
- Modifying theme's `_sass/` directory (theme responsibility)
- Creating `assets/css/custom.scss` (deprecated, use `_sass/main.scss`)

## Zero-CSS Rules

**Forbidden in subdomain SCSS:**
- ❌ Raw properties: `margin`, `padding`, `color`, `font-size`, `background`, `border`
- ❌ Unit values: `px`, `rem`, `em`, `%`, `vh`, `vw`
- ❌ Color values: `#hex`, `rgb()`, `hsl()`, `oklch()`
- ❌ `@extend` (Jekyll build errors)
- ❌ `@import` statements (ontology already available from theme)
- ❌ Jekyll front matter (`---`)

**Required:**
- ✅ File location: `_sass/main.scss` (NOT `assets/css/custom.scss`)
- ✅ NO front matter (it's a partial, not a standalone file)
- ✅ NO imports (ontology mixins already available)
- ✅ Only ontological mixins
- ✅ Max 3 nesting levels

## Audit Workflow

### 1. Find SCSS Files

```bash
find _sass -name "*.scss" 2>/dev/null
# Should only find _sass/main.scss if present
```

### 2. Check for Raw CSS

```bash
# Raw properties
grep -nE "(margin|padding|color|font-size|background|border|display|position):" _sass/main.scss

# Raw values
grep -nE "[0-9]+(px|rem|em|%)" _sass/main.scss

# Color values
grep -nE "(#[0-9a-fA-F]{3,8}|rgb|hsl|oklch)\(" _sass/main.scss
```

### 3. Verify NO Imports or Front Matter

```bash
# Should have NO imports (ontology already available)
grep -n "@import" _sass/main.scss

# Should have NO front matter
head -5 _sass/main.scss | grep "^---$"
```

## Ontology Quick Reference

| Category | Mixin | Common Variants |
|----------|-------|----------------|
| Environment | `genesis-environment($logic)` | `distributed`, `focused`, `manifest` |
| Entity | `genesis-entity($nature)` | `primary`, `secondary`, `imperative` |
| Cognition | `genesis-cognition($intent)` | `axiom`, `discourse`, `protocol` |
| Synapse | `genesis-synapse($vector)` | `navigate`, `execute`, `inquiry` |
| State | `genesis-state($condition)` | `stable`, `evolving`, `deprecated` |
| Atmosphere | `genesis-atmosphere($vibe)` | `neutral`, `ethereal`, `void` |

## Visual Design Element Ownership

Each CSS concern has one owning category. Verify no property is set by the wrong mixin:

| Visual Element | Owner | Forbidden Elsewhere |
|---------------|-------|-------------------|
| White space / gap | `environment` | Entity must not set gap |
| Internal padding | `entity` | Environment must not set padding |
| Colors / backgrounds | `atmosphere` | Cognition must not set background |
| Typography | `cognition` | Entity must not set font-* |
| Borders / shape | `entity` | Atmosphere must not set border |
| Animations | `state` | Entity must not set animation |
| Hover / focus | `synapse` | Cognition must not set :hover |

## Hierarchy-Level Rules

Subdomain content is typically Level 3–4:

| Level | Element type | Required | Forbidden |
|-------|-------------|----------|-----------|
| 3 — Component | Cards, widgets | `entity` | — |
| 4 — Leaf | `<h1>`, `<p>`, `<a>`, `<button>` | `cognition` or `synapse` | `environment`, `atmosphere`, `entity` |

→ **Full specification**: theme's `docs/specifications/ontology-html-mapping.md`

## Compliance Checklist

- [ ] File is `_sass/main.scss` (NOT `assets/css/custom.scss`)
- [ ] NO Jekyll front matter (`---`)
- [ ] NO `@import` statements
- [ ] Zero raw CSS properties
- [ ] No unit values (`px`, `rem`, `%`)
- [ ] No color values (`#hex`, `rgb()`, `oklch()`)
- [ ] No `@extend` usage
- [ ] Max 3 nesting levels
- [ ] SCSS nesting mirrors HTML structure
- [ ] Hierarchy compliance: components use `entity`, leaf elements use `cognition`/`synapse`
- [ ] Property ownership: borders only by `entity`, fonts only by `cognition`, backgrounds only by `atmosphere`

## Resources

- `instructions/scss.instructions.md` — Complete SCSS standards with hierarchy rules and visual element ownership
- `copilot-instructions.md` — Ontology quick reference table with hierarchy rules
- Theme's `docs/specifications/ontology-html-mapping.md` — Formal hierarchy rules

**Related Skills**: content-author, subdomain-evolution
