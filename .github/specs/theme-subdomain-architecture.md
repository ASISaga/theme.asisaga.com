# Theme-Subdomain Architecture Specification

**Version**: 2.0.0  
**Status**: Active  
**Last Updated**: 2026-02-14

## Overview

This specification defines the architecture and responsibilities split between the theme repository and subdomain content repositories in the Genesis Ontological Design System ecosystem.

## Architecture Pattern

The system uses Jekyll's `remote_theme` mechanism to separate infrastructure (theme) from content (subdomains).

```
Theme Repository (infrastructure)
    ↓ remote_theme
Subdomain Repository (content only)
    ↓ Jekyll build
Generated Site
```

## Theme Repository Responsibilities

### Provides

**1. Jekyll Infrastructure**
- All layouts (`_layouts/`)
  - `default.html` - Base layout
  - `post.html` - Blog post layout
  - `page.html` - Static page layout
- All includes (`_includes/`)
  - `head.html` - Document head
  - `header.html` - Site header
  - `footer.html` - Site footer

**2. Complete SCSS System**
- Ontological design system (`_sass/ontology/`)
- Components (`_sass/components/`)
- Layouts (`_sass/layouts/`)
- Common imports (`_sass/_common.scss`)
- Main stylesheet (`assets/css/style.scss`)

**3. Shared JavaScript**
- `assets/js/common.js` - Shared utilities
- Motion library integration
- Progressive enhancement patterns

**4. Agent Intelligence**
- Reference system in `.github/subdomain/`
- Templates for agents, prompts, skills
- Instructions for content-only repositories

### Import Pattern

Single import point in `_sass/_common.scss` (line 64):
```scss
@import "ontology/index";
```

All other SCSS files have ontology available automatically.

## Subdomain Repository Responsibilities

### Provides

**1. HTML Content Only**
- HTML pages (NO Markdown)
- Front matter specifying layout
- Semantic HTML structure

Example page:
```html
---
layout: default
title: "My Page"
---

<article class="content-section">
  <h1>{{ page.title }}</h1>
  <p>Content goes here.</p>
</article>
```

**2. Optional Page-Specific SCSS**
- File: `_sass/main.scss`
- NO Jekyll front matter
- NO `@import` statements
- Uses ontology mixins only
- Theme's `assets/css/style.scss` imports this at build time

Example `_sass/main.scss`:
```scss
// NO front matter, NO @import

.custom-section {
  @include genesis-environment('focused');
  @include genesis-entity('primary');
}
```

**3. Mandatory Subdomain JavaScript**
- File: `assets/js/script.js` (MANDATORY)
- Loaded after theme's `common.js`
- Can use utilities from `common.js`
- Progressive enhancement required

### Restrictions

**DO NOT Include**:
- ❌ `_layouts/` directory
- ❌ `_includes/` directory
- ❌ `_sass/` directory (except `_sass/main.scss`)
- ❌ Front matter in `_sass/main.scss`
- ❌ `@import` statements in `_sass/main.scss`
- ❌ Markdown content (use HTML only)

## Build Process

### Jekyll Compilation

1. **Theme loading**: Jekyll loads theme via `remote_theme: ASISaga/theme.asisaga.com`
2. **Layout resolution**: Subdomain pages use theme layouts
3. **SCSS merging**: Theme's `assets/css/style.scss` imports subdomain's `_sass/main.scss`
4. **JavaScript loading**: Theme layouts load:
   - `common.js` (theme utilities)
   - `script.js` (subdomain-specific)

### SCSS Import Chain

```
Theme: assets/css/style.scss
  ↓ imports
Theme: _sass/_common.scss
  ↓ imports (line 64)
Theme: _sass/ontology/index.scss
  ↓ makes available
Subdomain: _sass/main.scss (uses mixins)
```

## Configuration

### Theme `_config.yml`

Defines theme settings, builds complete system:
```yaml
remote_theme: ASISaga/theme.asisaga.com
sass:
  sass_dir: _sass
  style: compressed
```

### Subdomain `_config.yml`

Minimal configuration, relies on theme:
```yaml
remote_theme: ASISaga/theme.asisaga.com
title: "Subdomain Title"
description: "Subdomain description"
```

## Agent Intelligence Setup

### Subdomain Setup

Copy from theme's `.github/subdomain/`:
```bash
# From subdomain repository root
cp -r /path/to/theme/.github/subdomain/* .github/
```

Provides:
- `copilot-instructions.md` - Content-focused context
- `instructions/` - Content, SCSS, JS standards
- `agents/` - Content author, SCSS compliance
- `skills/` - Content-specific capabilities
- `prompts/` - Content authoring workflows

### File Structure

```
subdomain-repo/.github/
├── copilot-instructions.md     # Content-focused
├── instructions/
│   ├── content.instructions.md # HTML standards
│   ├── scss.instructions.md    # Ontology-only
│   └── js.instructions.md      # Script.js standards
├── agents/
│   ├── content-author.agent.md
│   └── scss-compliance.agent.md
├── skills/
│   └── content-author/SKILL.md
└── prompts/
    └── content-author.prompt.md
```

## Validation

### Theme Repository

```bash
npm test              # All tests
npm run test:scss     # SCSS compilation
npm run lint:scss     # Stylelint
npm run test:e2e      # E2E tests
```

### Subdomain Repository

```bash
npm test              # SCSS + linting
npm run test:scss     # SCSS compilation
npm run lint:scss     # Stylelint
```

Subdomain Stylelint config disallows:
- `@import` (enforces theme-provided ontology)
- `@extend` (Jekyll build issues)

## GitHub Copilot MCP Configuration

Subdomains should add theme repository to MCP firewall settings for code reference:

```
https://github.com/ASISaga/theme.asisaga.com
```

This enables:
- Ontological mixin code completion
- Theme documentation reference
- Layout/include suggestions

## Examples

### Creating Subdomain Page

```html
---
layout: default
title: "About Us"
---

<article class="about-content">
  <header class="about-header">
    <h1>{{ page.title }}</h1>
  </header>
  
  <div class="about-body">
    <p>Content here...</p>
  </div>
</article>
```

With optional styling (`_sass/main.scss`):
```scss
.about-content {
  @include genesis-environment('focused');
}

.about-header {
  @include genesis-entity('primary');
  
  h1 {
    @include genesis-cognition('axiom');
  }
}

.about-body {
  @include genesis-cognition('discourse');
}
```

## References

→ **Ontology specification**: `.github/specs/ontological-design-system.md`  
→ **Subdomain setup guide**: `.github/subdomain/README.md`  
→ **Complete SCSS reference**: `/docs/specifications/scss-ontology-system.md`

---

**Related Specifications**:
- `.github/specs/ontological-design-system.md`
- `.github/specs/agent-intelligence-framework.md`
