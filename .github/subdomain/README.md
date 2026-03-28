# 📦 Subdomain Intelligence System - Reference Template

**Version**: 1.1 - Added linting and SCSS testing infrastructure  
**Last Updated**: 2026-02-12  
**Source**: `theme.asisaga.com/.github/subdomain/`

## Overview

This directory contains a **reference GitHub Copilot coding agent intelligence system** for ASI Saga subdomain repositories. Copy this directory into your subdomain's `.github/` to enable coherent theme-subdomain AI-assisted development with integrated linting and testing.

## Setup

### 1. Copy to Your Subdomain Repository

```bash
# From your subdomain repository root
cp -r <theme-repo>/.github/subdomain/* .github/
```

Your subdomain `.github/` should then contain:

```
.github/
├── copilot-instructions.md   # Main Copilot context
├── package.json              # npm scripts for linting and testing
├── .stylelintrc.yml          # Stylelint configuration
├── .gitignore                # Exclude node_modules and build artifacts
├── agents/                   # GitHub Copilot Custom Agent definitions
│   ├── content-author.agent.md
│   ├── scss-compliance.agent.md
│   └── subdomain-evolution.agent.md
├── instructions/             # Path-specific coding standards
│   ├── content.instructions.md    # HTML-only content authoring
│   ├── scss.instructions.md       # Page-specific ontology SCSS
│   └── js.instructions.md         # Mandatory script.js
├── prompts/                  # Agent workflows
│   └── content-author.prompt.md
├── skills/                   # Agent skill definitions
│   ├── content-author/SKILL.md
│   ├── scss-compliance/SKILL.md
│   └── subdomain-evolution/SKILL.md
└── _sass/                    # SCSS reference and testing
    ├── README.md             # SCSS reference documentation
    └── _test-compile.scss    # SCSS compilation test file
```

### 2. Verify Theme Dependency

Ensure your subdomain's `_config.yml` references the theme:

```yaml
remote_theme: ASISaga/theme.asisaga.com
```

### 3. Install Development Dependencies

Install npm packages for linting and testing:

```bash
npm install
```

This installs Sass compiler, Stylelint, and required plugins for SCSS validation.

### 4. Customize

Edit `copilot-instructions.md` to set your subdomain name and any domain-specific context.

## Architecture

Subdomain repositories are **content-only** with HTML pages and optional page-specific styling/JavaScript. The theme repository provides all layouts, includes, and styling infrastructure.

| Responsibility | Theme Repo | Subdomain Repo |
|---------------|-----------|----------------|
| Layouts (`_layouts/`) | ✅ | ❌ |
| Includes (`_includes/`) | ✅ | ❌ |
| Ontology SCSS (`_sass/ontology/`) | ✅ | ❌ |
| Design tokens & theme SCSS | ✅ | ❌ |
| HTML content pages | ❌ | ✅ (HTML only, NO Markdown) |
| Page-specific SCSS | ❌ | ✅ (`_sass/main.scss`, ontology-only) |
| JavaScript | ❌ | ✅ (`assets/js/script.js`, MANDATORY) |

**Build Process**:
- Theme's `assets/css/style.scss` imports `ontology/index` directly (Layer 1: universal base)
- At build time, Jekyll merges theme's `style.scss` (via `_main.scss`) with subdomain's `_sass/main.scss`
- Theme layouts automatically load `assets/js/common.js` then `assets/js/script.js`

## Testing & Linting

The subdomain reference template includes npm scripts for SCSS testing and linting:

```bash
npm test              # Run SCSS compilation test + stylelint
npm run test:scss     # Test SCSS compilation (catches undefined mixins)
npm run lint:scss     # Run stylelint on _sass/**/*.scss
npm run lint:scss:fix # Auto-fix stylelint issues
```

**Pre-commit workflow:**
1. `npm run test:scss` — Verify SCSS compiles without errors
2. `npm run lint:scss` — Check code quality and style
3. `npm test` — Run both checks together

**Configuration files included:**
- `package.json` — npm scripts and dependencies
- `.stylelintrc.yml` — Stylelint rules for subdomain SCSS
- `_sass/_test-compile.scss` — SCSS compilation test file

## GitHub Copilot MCP Configuration

**IMPORTANT**: Add the theme repository URL to your GitHub Copilot MCP firewall settings for code reference:

- **Theme URL**: `https://github.com/ASISaga/theme.asisaga.com`

This enables GitHub Copilot to:
- Reference theme's ontological SCSS mixins and design system
- Access theme's layout and component documentation  
- Understand theme-subdomain architecture for accurate code generation
- Propose ontological evolutions based on theme's current capabilities

**How to configure:**
1. Open GitHub Copilot settings in your IDE
2. Add the theme repository URL to the MCP allowed sources
3. Restart your IDE to apply the settings

This ensures that when GitHub Copilot generates code for your subdomain, it has access to the theme's design system documentation and can provide accurate ontological mixin suggestions.

## File Purposes

### `copilot-instructions.md`
Main context file for GitHub Copilot. Provides the agent with understanding of the theme-subdomain architecture, available ontological mixins, content creation standards, and MCP firewall configuration for theme code reference.

### `package.json`
npm scripts and dependencies for SCSS linting and testing. Includes Sass compiler, Stylelint, and required plugins. Install with `npm install`.

### `.stylelintrc.yml`
Stylelint configuration enforcing subdomain-specific rules: no `@import` statements, BEM naming, max 3 nesting levels, zero raw CSS properties.

### `.gitignore`
Excludes node_modules, build artifacts, and OS/IDE files from version control. Subdomain repositories should use this to keep their repository clean.

### `_sass/`
SCSS reference and testing directory. Contains `_test-compile.scss` for SCSS compilation validation and `README.md` explaining subdomain SCSS structure.

### `agents/`
GitHub Copilot Custom Agent definitions (`.agent.md` format). Three subdomain-scoped agents for content authoring, SCSS compliance, and ontological evolution. See `agents/README.md`.

### `instructions/content.instructions.md`
Standards for creating HTML content pages (NO Markdown). Covers front matter, semantic structure, and HTML organization. Path-specific instruction triggered by `**/*.html`.

### `instructions/scss.instructions.md`
Rules for page-specific SCSS in `_sass/main.scss`. Enforces ontology-only patterns with zero raw CSS. NO `assets/css/custom.scss`. Path-specific instruction triggered by `_sass/**/*.scss`.

### `instructions/js.instructions.md`
Standards for mandatory `assets/js/script.js`. Covers progressive enhancement, `data-*` attribute hooks, and interaction patterns. Path-specific instruction triggered by `assets/js/**/*.js`.

### `prompts/content-author.prompt.md`
Agent prompt for content creation workflows. Guides AI in creating well-structured, accessible content pages.

### `skills/`
Agent skill definitions (SKILL.md format). Three subdomain-scoped skills for content authoring, SCSS compliance, and ontological proposition creation. See `skills/README.md`.

## Relationship to Theme Intelligence System

The theme repository (`theme.asisaga.com`) has a comprehensive agent ecosystem:

```
Theme .github/
├── agents/           # Internal coordination (protected)
├── instructions/     # Theme coding standards
├── prompts/          # Theme agent workflows
├── skills/           # Executable capabilities
├── .github/docs/agent-philosophy.md         # Ecosystem architecture
└── subdomain/        # ← This reference template
```

The subdomain intelligence system is a **focused subset** designed for content-oriented repositories, while the theme intelligence system manages the full design system evolution.

### How They Work Together

1. **Theme agents** manage the ontology, layouts, and styling infrastructure
2. **Subdomain agents** create content using theme layouts and propose ontological evolutions
3. **Shared vocabulary**: Both use Genesis Ontological terminology
4. **Shared format**: Both use `.agent.md` (GitHub Copilot Custom Agents) and `SKILL.md` (Agent Skills spec)
5. **Evolution flow**: Subdomain identifies gap → proposes to theme → theme reviews → implements

## Ontological Propositions

When your subdomain identifies a semantic gap not covered by current ontology:

1. Review all existing variants (see `copilot-instructions.md`)
2. Try combining existing mixins first
3. If genuine gap exists, create a PR to `theme.asisaga.com` using the Ontological Proposition template
4. The Theme Genome Agent will review your proposal

→ **Full process**: Theme's `.github/.github/docs/agent-philosophy.md`  
→ **PR template**: Theme's `.github/PULL_REQUEST_TEMPLATE/ontological_proposition.md`

## Keeping Up to Date

Periodically sync your subdomain's `.github/` with the latest reference template from the theme repository:

```bash
# Check for updates
diff -r .github/ <theme-repo>/.github/subdomain/
```

---

**Maintained by**: Theme Genome Agent  
**Source**: `theme.asisaga.com/.github/subdomain/`
