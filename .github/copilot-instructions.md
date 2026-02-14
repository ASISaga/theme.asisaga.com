# Copilot Instructions for Genesis Ontological Design System Theme

You are working in the **Genesis Ontological Design System theme repository** at `theme.asisaga.com`.

## Repository Role

This is a **Jekyll theme repository** providing:
- Ontological SCSS design system
- Semantic HTML layouts and includes
- Agent intelligence system templates
- Reference implementation for subdomains

→ **Complete architecture**: `.github/specs/theme-subdomain-architecture.md`  
→ **Ontology specification**: `.github/specs/ontological-design-system.md`

## Path-Specific Instructions

**IMPORTANT**: Detailed coding standards are in `.github/instructions/` and are automatically activated by file path:

- **`.github/instructions/scss.instructions.md`** — SCSS ontology system, import rules, testing
- **`.github/instructions/html.instructions.md`** — Semantic HTML, accessibility, Jekyll/Liquid
- **`.github/instructions/js.instructions.md`** — Progressive enhancement, Motion library, interaction patterns
- **`.github/instructions/docs.instructions.md`** — Documentation standards, version tracking, archival
- **`.github/instructions/agents.instructions.md`** — Custom agent file standards
- **`.github/instructions/prompts.instructions.md`** — Agent prompt file standards
- **`.github/instructions/skills.instructions.md`** — Agent skill file standards

**DO NOT duplicate these instructions**. They are loaded automatically by GitHub Copilot based on file path.

## Repository-Specific Specifications

This repository implements two key systems:

**Ontological Design System**:
- Six semantic categories: environment, entity, cognition, synapse, state, atmosphere
- 31 total variants for complete semantic expression
- Three-tier architecture: Engine → Theme → Subdomains

→ **Full specification**: `.github/specs/ontological-design-system.md`

**Theme-Subdomain Architecture**:
- Theme provides: layouts, includes, SCSS, JS infrastructure
- Subdomains provide: HTML content, optional page-specific SCSS
- Clean separation via Jekyll's `remote_theme` mechanism

→ **Full specification**: `.github/specs/theme-subdomain-architecture.md`

## Agent Intelligence System

This repository uses a structured GitHub Copilot agent intelligence system:

**Directory Structure:**
```
.github/
├── copilot-instructions.md     # This file - high-level architecture
├── instructions/               # Path-activated coding standards
│   ├── scss.instructions.md   # SCSS ontology system
│   ├── html.instructions.md   # Semantic HTML & Jekyll
│   ├── js.instructions.md     # JavaScript & Motion library
│   ├── docs.instructions.md   # Documentation standards
│   ├── agents.instructions.md # Custom agent files
│   ├── prompts.instructions.md # Agent prompt files
│   └── skills.instructions.md # Agent skill files
├── specs/                      # Agent specifications & frameworks
├── docs/                       # Agent system documentation
├── agents/                     # Custom agents (*.agent.md)
├── prompts/                    # Agent prompts (*.prompt.md)
├── skills/                     # Agent skills (SKILL.md + scripts)
└── subdomain/                  # Reference system for subdomains
```

**How it works:**
- **Path-specific instructions** auto-load when editing matching files
- **Specs** define detailed frameworks and patterns
- **Docs** provide implementation guides
- **Agents/prompts/skills** provide executable capabilities

→ **Complete architecture**: `.github/AGENTS.MD`  
→ **Framework spec**: `.github/specs/agent-intelligence-framework.md`  
→ **Onboarding**: `.github/prompts/repository-onboarding.prompt.md`

## Bootstrapping New Repositories

To set up agent intelligence in a new repository:

1. **Use onboarding agent**: Invoke `repository-onboarding` agent
2. **Or manual setup**: Follow `.github/prompts/repository-onboarding.prompt.md`
3. **Or copy templates**: Extract from `.github/specs/agent-intelligence-framework.md`

The system will create:
- `.github/copilot-instructions.md` (this file, adapted to your repo)
- Path-specific instruction files based on tech stack
- Initial agents, prompts, skills
- Specs and docs directories
- Validation and testing setup

## Testing & Validation

**Before committing:**
1. `npm test` — Run all linters and SCSS compilation
2. `npm run test:scss` — Sass compilation check (catches undefined mixins/vars)
3. `npm run lint:scss` — Stylelint for code quality
4. Agent validation scripts in `.github/skills/*/scripts/`

**Test pages** organized in `/tests/` with categorized subdirectories.

## Key Design Principles

**For this repository**:
1. **Semantic Purity** — Name by WHAT, not HOW
2. **Accessibility First** — WCAG compliance, semantic HTML
3. **Progressive Enhancement** — Content-first approach
4. **Context Efficiency** — Reference specs/docs, don't duplicate

**For agent intelligence**:
1. **Tool Leverage** — Use existing linters/tests, don't duplicate
2. **Path Specificity** — Instructions match exact file patterns
3. **Template-Based** — Bootstrap from proven patterns
4. **Spec-Driven** — Details in specs, summaries in instructions

---

**Quick Links**:
- **Specifications**: `.github/specs/` - Detailed systems and frameworks
- **Documentation**: `.github/docs/` - Implementation guides
- **Subdomain Template**: `.github/subdomain/` - Copy to content repos
- **Full Documentation**: `/docs/` - Complete reference materials

**Repository**: `theme.asisaga.com`
