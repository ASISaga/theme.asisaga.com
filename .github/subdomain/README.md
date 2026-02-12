# 📦 Subdomain Intelligence System - Reference Template

**Version**: 1.0  
**Last Updated**: 2026-02-12  
**Source**: `theme.asisaga.com/.github/subdomain/`

## Overview

This directory contains a **reference GitHub Copilot coding agent intelligence system** for ASI Saga subdomain repositories. Copy this directory into your subdomain's `.github/` to enable coherent theme-subdomain AI-assisted development.

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
├── instructions/              # Coding standards
│   ├── content.instructions.md
│   ├── scss.instructions.md
│   └── js.instructions.md
└── prompts/                   # Agent workflows
    └── content-author.prompt.md
```

### 2. Verify Theme Dependency

Ensure your subdomain's `_config.yml` references the theme:

```yaml
remote_theme: ASISaga/theme.asisaga.com
```

### 3. Customize

Edit `copilot-instructions.md` to set your subdomain name and any domain-specific context.

## Architecture

Subdomain repositories are **content-only**. The theme repository provides all layouts, includes, SCSS, and styling infrastructure.

| Responsibility | Theme Repo | Subdomain Repo |
|---------------|-----------|----------------|
| Layouts (`_layouts/`) | ✅ | ❌ |
| Includes (`_includes/`) | ✅ | ❌ |
| SCSS / Ontology (`_sass/`) | ✅ | ❌ |
| Design tokens | ✅ | ❌ |
| Content pages | ❌ | ✅ |
| Custom SCSS (optional) | ❌ | ✅ (`assets/css/custom.scss`) |
| JavaScript (optional) | ❌ | ✅ (`assets/js/script.js`) |

## File Purposes

### `copilot-instructions.md`
Main context file for GitHub Copilot. Provides the agent with understanding of the theme-subdomain architecture, available ontological mixins, and content creation standards.

### `instructions/content.instructions.md`
Standards for creating Markdown and HTML content pages. Covers front matter, semantic structure, and content organization.

### `instructions/scss.instructions.md`
Rules for subdomain SCSS (if custom styling is needed). Enforces ontology-only patterns with zero raw CSS.

### `instructions/js.instructions.md`
Standards for subdomain JavaScript. Covers progressive enhancement, `data-*` attribute hooks, and interaction patterns.

### `prompts/content-author.prompt.md`
Agent prompt for content creation workflows. Guides AI in creating well-structured, accessible content pages.

## Relationship to Theme Intelligence System

The theme repository (`theme.asisaga.com`) has a comprehensive agent ecosystem:

```
Theme .github/
├── agents/           # Internal coordination (protected)
├── instructions/     # Theme coding standards
├── prompts/          # Theme agent workflows
├── skills/           # Executable capabilities
├── AGENTS.MD         # Ecosystem architecture
└── subdomain/        # ← This reference template
```

The subdomain intelligence system is a **focused subset** designed for content-oriented repositories, while the theme intelligence system manages the full design system evolution.

### How They Work Together

1. **Theme agents** manage the ontology, layouts, and styling infrastructure
2. **Subdomain agents** create content using theme layouts and propose ontological evolutions
3. **Shared vocabulary**: Both use Genesis Ontological terminology
4. **Evolution flow**: Subdomain identifies gap → proposes to theme → theme reviews → implements

## Ontological Propositions

When your subdomain identifies a semantic gap not covered by current ontology:

1. Review all existing variants (see `copilot-instructions.md`)
2. Try combining existing mixins first
3. If genuine gap exists, create a PR to `theme.asisaga.com` using the Ontological Proposition template
4. The Theme Genome Agent will review your proposal

→ **Full process**: Theme's `.github/AGENTS.MD`  
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
