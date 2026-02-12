# Copilot Instructions for Genesis Ontological Design System Theme

You are working in the **Genesis Ontological Design System theme repository** at `theme.asisaga.com`. This repository provides the foundational design system, layouts, and ontological SCSS for ASI Saga subdomain repositories.

## Repository Role

This is the **theme repository** that powers multiple subdomain content sites via Jekyll's `remote_theme` mechanism.

**Your responsibilities:**
- Maintain the Genesis Ontological SCSS design system (`_sass/ontology/`)
- Provide Jekyll layouts (`_layouts/`) and includes (`_includes/`)
- Ensure accessibility, semantic HTML, and responsive design
- Review and implement Ontological Propositions from subdomains
- Maintain agent intelligence system for both theme and subdomains

**Not your responsibility:**
- Creating content (that's for subdomain repositories)

## Three-Tier Architecture

The ontological design system follows a three-tier architecture:

1. **Engine** (`_sass/ontology/`) — Pure semantic mixins, zero implementation assumptions
2. **Theme** (`_sass/components/`, `_sass/layouts/`) — Visual implementation using ontology
3. **Subdomains** — Content pages with optional page-specific styling (via `_sass/main.scss`)

## Path-Specific Instructions

**IMPORTANT**: Detailed coding standards are in `.github/instructions/` and are automatically activated by file path:

- **`.github/instructions/scss.instructions.md`** — SCSS ontology system, import rules, testing
- **`.github/instructions/html.instructions.md`** — Semantic HTML, accessibility, Jekyll/Liquid
- **`.github/instructions/js.instructions.md`** — Progressive enhancement, Motion library, interaction patterns
- **`.github/instructions/docs.instructions.md`** — Documentation standards, version tracking, archival
- **`.github/instructions/github.instructions.md`** — Agent ecosystem, prompts, skills, validation

**DO NOT duplicate these instructions**. They are loaded automatically by GitHub Copilot based on file path.

## Ontology Quick Reference

**Six semantic categories** define all styling:

| Category | Purpose | Example Variants |
|----------|---------|------------------|
| `genesis-environment($logic)` | Layout structure | `distributed`, `focused`, `associative` |
| `genesis-entity($nature)` | Visual presence | `primary`, `secondary`, `imperative` |
| `genesis-cognition($intent)` | Typography | `axiom`, `discourse`, `protocol` |
| `genesis-synapse($vector)` | Interaction | `navigate`, `execute`, `inquiry` |
| `genesis-state($condition)` | Temporal state | `stable`, `evolving`, `deprecated` |
| `genesis-atmosphere($vibe)` | Mood/tone | `neutral`, `ethereal`, `void` |

→ **Complete reference**: `/docs/specifications/scss-ontology-system.md`

## Theme-Subdomain Architecture

**Theme provides:**
- All `_layouts/`, `_includes/`, `_sass/` (except subdomain's `_sass/main.scss`)
- `assets/css/style.scss` (imports `_sass/common.scss` which includes ontology)
- `assets/js/common.js` (shared utilities, Motion library)
- Complete ontological design system

**Subdomains provide:**
- HTML content pages (NO Markdown)
- `_sass/main.scss` (page-specific styling, ontology-only, optional)
- `assets/js/script.js` (subdomain-specific JavaScript, MANDATORY)

**Build process:**
- Jekyll merges theme's `assets/css/style.scss` with subdomain's `_sass/main.scss`
- Theme layouts load `common.js` first, then subdomain's `script.js`

## Agent Ecosystem

This repository maintains agent intelligence for both theme and subdomains:

- **`.github/agents/`** — Internal agent coordination (protected directory)
- **`.github/prompts/`** — Agent workflows for theme development
- **`.github/skills/`** — Executable agent capabilities
- **`.github/subdomain/`** — Reference intelligence system for subdomains to copy

**Key agents:**
- `html-template-agent` — Semantic HTML5 templates with accessibility
- `scss-refactor-agent` — Migrate legacy CSS to ontology
- `responsive-design-agent` — Mobile-first responsive patterns
- `futuristic-effects-agent` — Advanced visual effects
- `theme-genome-agent` — Ontological evolution gatekeeper
- `subdomain-evolution-agent` — Ontological proposition creation
- `documentation-manager-agent` — Documentation quality and structure
- `agent-evolution-agent` — Meta-agent for ecosystem optimization

→ **Complete guide**: `.github/AGENTS.MD`

## Ontological Evolution

When subdomains identify semantic gaps:

1. **Subdomain** creates Ontological Proposition PR with use cases
2. **Theme Genome Agent** reviews for semantic purity, redundancy, universality
3. **If approved**, implement in `_sass/ontology/` and document in `GENOME.md`
4. **Update** subdomain intelligence system to reflect new variant

→ **Template**: `.github/PULL_REQUEST_TEMPLATE/ontological_proposition.md`

## Testing & Validation

**Before committing:**
1. `npm test` — Run all linters and SCSS compilation
2. `npm run test:scss` — Sass compilation check (catches undefined mixins/vars)
3. `npm run lint:scss` — Stylelint for code quality
4. Agent validation scripts in `.github/skills/*/scripts/`

**Test pages** organized in `/tests/` with categorized subdirectories.

## Key Principles

1. **Semantic Purity** — Name by WHAT it represents, not HOW it looks
2. **Zero Raw CSS** — Subdomain SCSS uses only ontology mixins
3. **Accessibility First** — WCAG compliance, semantic HTML, keyboard support
4. **Progressive Enhancement** — Content accessible without JavaScript
5. **Context Efficiency** — Path-specific instructions prevent duplication
6. **Ontological Evolution** — System grows through dogfooding and propositions

## Documentation Structure

- `/docs/specifications/` — Technical specs and ontology reference
- `/docs/guides/` — User-facing tutorials and how-tos
- `/docs/archive/` — Completed implementations and historical records

→ **Documentation index**: `/docs/README.md`

---

**Repository**: `theme.asisaga.com`  
**Subdomain Intelligence**: `.github/subdomain/`  
**Agent Ecosystem**: `.github/AGENTS.MD`  
**Ontology System**: `/docs/specifications/scss-ontology-system.md`
