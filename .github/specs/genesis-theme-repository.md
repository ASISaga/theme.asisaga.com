# Genesis Ontological Design System Theme Repository

**Version**: 1.0.0  
**Status**: Active  
**Last Updated**: 2026-02-14

## Overview

This specification defines the Genesis Ontological Design System theme repository at `theme.asisaga.com` - a Jekyll theme providing an ontological SCSS design system, semantic HTML layouts, and agent intelligence system templates.

## Repository Role

This is a **Jekyll theme repository** providing:
- Ontological SCSS design system
- Semantic HTML layouts and includes
- Agent intelligence system templates
- Reference implementation for subdomains

## Architecture References

The Genesis theme implements two major architectural systems:

### 1. Ontological Design System

**Six semantic categories: environment, entity, cognition, synapse, state, atmosphere**
- 31 total variants for complete semantic expression
- Three-tier architecture: Engine → Theme → Subdomains

→ **Full specification**: `.github/specs/ontological-design-system.md`

### 2. Theme-Subdomain Architecture

**Clean separation of infrastructure and content:**
- Theme provides: layouts, includes, SCSS, JS infrastructure
- Subdomains provide: HTML content, optional page-specific SCSS
- Clean separation via Jekyll's `remote_theme` mechanism

→ **Full specification**: `.github/specs/theme-subdomain-architecture.md`

## Repository Structure

```
theme.asisaga.com/
├── _layouts/           # Jekyll layouts (default, post, page)
├── _includes/          # Reusable includes (head, header, footer)
├── _sass/              # Complete SCSS system
│   ├── ontology/       # Ontological design system (31 variants)
│   ├── components/     # UI components
│   ├── layouts/        # Layout patterns
│   └── _common.scss    # Common imports
├── assets/
│   ├── css/            # Compiled stylesheets
│   └── js/             # JavaScript (common.js + Motion library)
├── tests/              # Test pages organized by category
├── docs/               # Complete documentation
└── .github/
    ├── subdomain/      # Reference system for subdomains
    └── [agent system]  # Complete agent intelligence system
```

## Key Design Principles

### For This Repository

1. **Semantic Purity** — Name by WHAT, not HOW
2. **Accessibility First** — WCAG compliance, semantic HTML
3. **Progressive Enhancement** — Content-first approach
4. **Context Efficiency** — Reference specs/docs, don't duplicate

### For Agent Intelligence

1. **Tool Leverage** — Use existing linters/tests, don't duplicate
2. **Path Specificity** — Instructions match exact file patterns
3. **Template-Based** — Bootstrap from proven patterns
4. **Spec-Driven** — Details in specs, summaries in instructions

## Testing & Validation

**Test organization:**
- Test pages organized in `/tests/` with categorized subdirectories
- Responsive tests, mobile tests, motion tests, ontology demos
- See `/tests/README.md` for complete catalog

**Validation workflow:**
```bash
npm test              # Run all linters and SCSS compilation
npm run test:scss     # Sass compilation check
npm run lint:scss     # Stylelint for code quality
npm run test:e2e      # Playwright E2E tests
```

**Agent validation:**
- Agent validation scripts in `.github/skills/*/scripts/`

→ **Tool reference**: `.github/docs/conventional-tools.md`

## Subdomain Template System

The theme provides a complete reference system in `.github/subdomain/` for bootstrapping subdomain repositories:

```
.github/subdomain/
├── agents/             # Custom agents (3 .agent.md files)
├── skills/             # Skills (3 SKILL.md directories)
├── instructions/       # Path-specific (content, scss, js)
├── prompts/            # Agent prompts
├── copilot-instructions.md
└── README.md           # Complete setup guide
```

→ **Setup guide**: `.github/subdomain/README.md`  
→ **Architecture**: `.github/AGENTS.MD` (Subdomain Intelligence System section)

## Bootstrapping New Repositories

To set up agent intelligence in a new repository:

1. **Use onboarding agent**: Invoke `repository-onboarding` agent
2. **Or manual setup**: Follow `.github/prompts/repository-onboarding.prompt.md`
3. **Or copy templates**: Extract from `.github/specs/agent-intelligence-framework.md`

The system will create:
- `.github/copilot-instructions.md` (adapted to your repo)
- Path-specific instruction files based on tech stack
- Initial agents, prompts, skills
- Specs and docs directories
- Validation and testing setup

## Quick Links

- **Specifications**: `.github/specs/` - Detailed systems and frameworks
- **Documentation**: `.github/docs/` - Implementation guides
- **Subdomain Template**: `.github/subdomain/` - Copy to content repos
- **Full Documentation**: `/docs/` - Complete reference materials

---

**Repository**: `theme.asisaga.com`  
**License**: MIT
