# GitHub Copilot Agent Intelligence System

This repository uses a structured GitHub Copilot agent intelligence system for optimal AI-assisted development.

## Repository Context

→ **Repository-specific details**: `.github/specs/genesis-theme-repository.md`

## Path-Specific Instructions

Detailed coding standards are in `.github/instructions/` and are **automatically activated** by GitHub Copilot when editing files matching their glob patterns.

**Current instruction files:**
- `scss.instructions.md` — SCSS/CSS patterns and standards
- `html.instructions.md` — HTML/Liquid templating
- `js.instructions.md` — JavaScript patterns
- `docs.instructions.md` — Documentation standards
- `agents.instructions.md` — Agent file standards
- `prompts.instructions.md` — Prompt file standards
- `skills.instructions.md` — Skill file standards
- Plus meta-instructions for specs, docs, and instructions directories

→ **How it works**: `.github/docs/path-specific-instructions.md`  
→ **DO NOT duplicate**: These load automatically, no need to mention in this file

## Agent Intelligence System

This repository implements a complete GitHub Copilot agent intelligence system with structured organization:

**Directory Structure:**
```
.github/
├── copilot-instructions.md     # This file - high-level architecture
├── instructions/               # Path-activated coding standards
├── specs/                      # Detailed specifications & frameworks
├── docs/                       # Implementation guides & references
├── agents/                     # Custom agents (*.agent.md)
├── prompts/                    # Agent prompts (*.prompt.md)
└── skills/                     # Agent skills (SKILL.md + scripts)
```

**How it works:**
- **Path-specific instructions** auto-load when editing matching files
- **Specs** define detailed frameworks and patterns
- **Docs** provide implementation guides
- **Agents/prompts/skills** provide executable capabilities

→ **Complete framework**: `.github/specs/agent-intelligence-framework.md` - Reusable framework  
→ **Philosophy**: `.github/docs/agent-philosophy.md` - Core principles and vision  
→ **All guides**: `.github/docs/README.md` - Complete documentation index

## Bootstrapping New Repositories

This agent intelligence system is designed to be reusable across repositories.

**To set up in a new repository:**

1. **Use onboarding agent**: Invoke `repository-onboarding` agent
2. **Or manual setup**: Follow `.github/prompts/repository-onboarding.prompt.md`
3. **Or copy templates**: Extract from `.github/specs/agent-intelligence-framework.md`

**The system will create:**
- `.github/copilot-instructions.md` (adapted to your repo)
- Path-specific instruction files based on tech stack
- Initial agents, prompts, skills
- Specs and docs directories
- Validation and testing setup

→ **Extraction guide**: `.github/docs/TEMPLATE-EXTRACTION-GUIDE.md`

## Conventional Tools & Testing

All conventional (non-AI) software tools are documented separately for reference.

**Primary validation workflow:**
```bash
npm test                # Run all tests and linters
```

→ **Complete tool reference**: `.github/docs/conventional-tools.md`  
→ **Includes**: npm scripts, linters, test suites, validation scripts, CI/CD integration

## Core Principles

**Agent Intelligence Philosophy:**

1. **Tool Leverage** — Orchestrate existing automation, never duplicate
2. **Path Specificity** — Instructions auto-load based on file patterns
3. **Context Efficiency** — Reference specs/docs, eliminate redundancy
4. **Ouroboros Pattern** — Agents evolve themselves through continuous use

→ **Philosophy details**: `.github/docs/agent-philosophy.md` - Living Genome, dogfooding, core principles

---

## Quick Links

**Agent System:**
- **Framework**: `.github/specs/agent-intelligence-framework.md` - Reusable framework
- **Philosophy**: `.github/docs/agent-philosophy.md` - Core principles and vision
- **Guides**: `.github/docs/` - Implementation and usage guides
- **Index**: `.github/docs/README.md` - Complete documentation index

**Repository Details:**
- **Repository spec**: `.github/specs/genesis-theme-repository.md` - This repository's specifics
- **All specifications**: `.github/specs/` - Detailed systems and frameworks
- **Documentation**: `/docs/` - Complete reference materials

**Tools & Testing:**
- **Conventional tools**: `.github/docs/conventional-tools.md` - npm scripts, linters, validators
- **Path-specific mechanism**: `.github/docs/path-specific-instructions.md` - How auto-loading works
