# Subdomain SCSS Reference

This directory contains reference SCSS files for subdomain repositories.

## `_test-compile.scss`

Test file for SCSS compilation validation. This file:

- Tests that subdomain SCSS structure is correct
- Simulates the subdomain build environment
- Validates that page-specific components follow proper patterns
- **Does NOT use ontology mixins** (those come from theme in actual subdomains)

### Usage

In subdomain repositories, run:

```bash
npm run test:scss
```

This verifies that SCSS files:
- Have correct structure (BEM naming, proper nesting)
- Do NOT include `@import` statements
- Follow max 3 nesting levels
- Are ready for theme's ontology mixins via remote_theme

### Important Notes

**In actual subdomain `_sass/main.scss` files:**
- NO `@import` statements (theme provides ontology automatically)
- NO Jekyll front matter (`---`)
- ONLY ontological mixins from theme
- Page-specific components only

The theme's `assets/css/style.scss` automatically imports subdomain's `_sass/main.scss` at build time, providing all ontology mixins.

---

**Version**: 1.0  
**Last Updated**: 2026-02-12
