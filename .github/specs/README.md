# Specifications

**Last Updated**: 2026-03-26

This directory contains specifications and frameworks for the Genesis Ontological Design System theme and its agent intelligence system.

## Files

### Agent System Specifications

- **`agent-intelligence-framework.md`** - Complete reusable framework for establishing Copilot agent ecosystems
  - Five-pillar structure (agents, instructions, prompts, skills, copilot-instructions.md)
  - Tool leverage patterns (reference, don't duplicate)
  - Validation workflows and context window optimization

- **`agents.md`** - Agent file specification (YAML frontmatter, naming, content structure)

- **`prompts.md`** - Prompt file specification (YAML frontmatter, activation triggers)

- **`skills.md`** - Skill file specification (agentskills.io format, directory structure, validation scripts)

- **`instructions.md`** - Instruction file specification (path-activated coding standards, applyTo patterns)

- **`spec-driven-development.md`** - Specification-Driven Development (SDD) methodology
  - Three-stage workflow: Specify → Plan → Tasks
  - Constitutional principles (Library-First, Test-First, Anti-Abstraction)
  - Feature directory structure and clarification discipline

### Repository-Specific Specifications

- **`genesis-theme-repository.md`** - Genesis theme repository specification
  - Repository role, structure, and key design principles
  - Testing and validation workflows
  - Subdomain template system
  - Cross-references to all documentation resources

- **`ontological-design-system.md`** - Genesis Ontological Design System specification
  - Six semantic categories with 89 total variants (31 foundational + 58 evolved)
  - HTML hierarchy rules and visual design element ownership
  - Three-tier architecture (Engine → Theme → Subdomains)
  - Ontological Proposition System for evolution
  - → Full mapping rules: `docs/specifications/ontology-html-mapping.md`

- **`theme-subdomain-architecture.md`** - Theme-subdomain architecture pattern
  - Repository responsibilities split (infrastructure vs content)
  - Jekyll remote_theme mechanism and SCSS import chain
  - Build and integration patterns

- **`repository.md`** - Repository architecture specification
  - Tri-layer stack: Data (DTCG JSON) → Logic (Jekyll) → Presentation (SCSS + Motion)
  - Five-step build protocol
  - Design token pipeline (aspirational W3C DTCG format)

### Business & Enterprise Specifications

- **`workflows.md`** - Business orchestration workflows (C-suite agents, Azure Functions)

- **`enterprise-capabilities.md`** - Enterprise capability workflows (knowledge management, risk governance, decision audit)

## Documentation Cross-Reference Index

The following detailed documentation exists in `/docs/` and is referenced by the specifications above.

### Technical Specifications (`docs/specifications/`)

| Specification | Description | Referenced By |
|--------------|-------------|---------------|
| `ontology-html-mapping.md` | Formal hierarchy rules for mixin-to-HTML mapping (v1.3.0) | `ontological-design-system.md` |
| `scss-ontology-system.md` | All 89 variants, OKLCH colors, design tokens | `ontological-design-system.md` |
| `component-library.md` | Reusable UI component catalog and APIs | `genesis-theme-repository.md` |
| `layout-system.md` | Hierarchical Jekyll layout system | `genesis-theme-repository.md` |
| `javascript.md` | JavaScript ES6 module architecture | `genesis-theme-repository.md` |
| `javascript-interaction-patterns.md` | Semantic interaction patterns and Motion usage | `genesis-theme-repository.md` |
| `animation-system.md` | Sacred animation system and Motion library | `genesis-theme-repository.md` |
| `responsive-design.md` | Mobile-first responsive design (v2.1.0) | `genesis-theme-repository.md` |
| `accessibility.md` | WCAG 2.1 Level AA compliance standards | `genesis-theme-repository.md` |
| `color-system.md` | OKLCH sacred color palette | `genesis-theme-repository.md` |
| `typography.md` | Consciousness-supporting typography system | `genesis-theme-repository.md` |
| `html-semantic-patterns.md` | Visual hierarchy and semantic HTML reference | `genesis-theme-repository.md` |
| `html-liquid.md` | HTML and Liquid templating specification | `genesis-theme-repository.md` |
| `futuristic-effects.md` | Glassmorphism, neon glows, quantum gradients (v2.0) | `genesis-theme-repository.md` |
| `performance.md` | Core Web Vitals targets | `genesis-theme-repository.md` |
| `fluid-design-unit-compatibility.md` | Viewport/rem unit mixing rules | `ontological-design-system.md` |
| `build-deployment.md` | Build pipeline and deployment specification | `genesis-theme-repository.md` |
| `architecture.md` | System architecture overview | `genesis-theme-repository.md` |
| `agent-self-learning-system.md` | Dogfooding and Ouroboros meta-intelligence | `agent-intelligence-framework.md` |
| `github-copilot-agent-guidelines.md` | Agent creation and management standards | `agent-intelligence-framework.md` |

### Guides (`docs/guides/`)

| Guide | Description |
|-------|-------------|
| `STYLELINT.md` | Stylelint setup and configuration |
| `STYLELINT-LIMITATIONS.md` | Why Sass compilation is needed alongside linting |
| `SCSS-UNIT-TESTING.md` | SCSS unit testing patterns |
| `USING-AGENT-SKILLS.md` | How to use agent skills |
| `COLOR-SCHEME-DOCUMENTATION.md` | Color scheme implementation guide |
| `GENESIS-THEME-REFACTORING-GUIDE.md` | Theme refactoring patterns |
| `GPU-ACCELERATION-GUIDE.md` | GPU acceleration for animations |

### System Documentation (`docs/systems/`)

| Subsystem | Files | Description |
|-----------|-------|-------------|
| `components/` | 7 files | Web component patterns, implementation guides |
| `layout/` | 5 files | Layout grid governance, taxonomy, implementation |
| `motion/` | 7 files | Motion library integration, animation implementation |
| `ontology/` | 10 files | Ontology migration, quick start, semantic reference |

## Purpose

Specifications define **how** systems work and **what** patterns to follow. Unlike instructions (which are path-activated for specific file types), specs are reference documents providing detailed technical specifications.

## Usage

Reference these specs when:
- Creating new agents, prompts, or skills
- Understanding system architecture
- Implementing validation workflows
- Adapting system to new repositories
- Learning repository-specific patterns
- Understanding the ontological design system

→ **Architecture**: `.github/docs/agent-philosophy.md`  
→ **Documentation**: `.github/docs/`  
→ **Instructions**: `.github/instructions/`  
→ **Detailed specifications**: `docs/specifications/`  
→ **Implementation guides**: `docs/guides/`  
→ **System documentation**: `docs/systems/`
