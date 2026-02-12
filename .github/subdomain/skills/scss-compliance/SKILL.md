---
name: scss-compliance
description: Validate and enforce zero-CSS compliance in subdomain SCSS files. Ensure all styling uses only Genesis Ontological mixins with no raw CSS properties, unit values, or color values. Use when auditing or creating subdomain custom SCSS.
license: MIT
metadata:
  author: ASISaga
  version: "1.0"
  category: design-system
  role: compliance-specialist
allowed-tools: Bash Read Edit
---

# SCSS Compliance

**Role**: Zero-CSS Compliance Enforcer  
**Scope**: Subdomain SCSS files (`assets/css/`)  
**Version**: 1.0

## Purpose

Ensure subdomain SCSS files use only Genesis Ontological mixins with zero raw CSS properties. Subdomains rarely need custom SCSS — the theme provides complete styling. When custom SCSS is needed, it must use ontological mixins exclusively.

## When to Use This Skill

Activate when:
- Creating `assets/css/custom.scss`
- Auditing existing subdomain SCSS for compliance
- Reviewing PRs that add or modify SCSS files
- Checking for raw CSS violations

**Don't use for:**
- Theme SCSS refactoring (use theme's scss-refactor-agent)
- Modifying `_sass/` directory (theme responsibility)

## Zero-CSS Rules

**Forbidden in subdomain SCSS:**
- ❌ Raw properties: `margin`, `padding`, `color`, `font-size`, `background`, `border`
- ❌ Unit values: `px`, `rem`, `em`, `%`, `vh`, `vw`
- ❌ Color values: `#hex`, `rgb()`, `hsl()`, `oklch()`
- ❌ `@extend` (Jekyll build errors)

**Required:**
- ✅ Jekyll front matter (`---`)
- ✅ `@import "ontology/index"` as only import
- ✅ Only ontological mixins
- ✅ Max 3 nesting levels

## Audit Workflow

### 1. Find SCSS Files

```bash
find assets/css -name "*.scss" 2>/dev/null
```

### 2. Check for Raw CSS

```bash
# Raw properties
grep -nE "(margin|padding|color|font-size|background|border|display|position):" assets/css/custom.scss

# Raw values
grep -nE "[0-9]+(px|rem|em|%)" assets/css/custom.scss

# Color values
grep -nE "(#[0-9a-fA-F]{3,8}|rgb|hsl|oklch)\(" assets/css/custom.scss
```

### 3. Verify Import

```bash
# Should only have ontology/index import
grep -n "@import" assets/css/custom.scss
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

## Compliance Checklist

- [ ] Only `@import "ontology/index"` (no other imports)
- [ ] Zero raw CSS properties
- [ ] No unit values (`px`, `rem`, `%`)
- [ ] No color values (`#hex`, `rgb()`, `oklch()`)
- [ ] No `@extend` usage
- [ ] Max 3 nesting levels
- [ ] SCSS nesting mirrors HTML structure

## Resources

- `instructions/scss.instructions.md` — Complete SCSS standards with all variants
- `copilot-instructions.md` — Ontology quick reference table

**Related Skills**: content-author, subdomain-evolution
