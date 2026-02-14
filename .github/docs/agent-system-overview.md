# Agent System Overview

**Last Updated**: 2026-02-14

Overview of the GitHub Copilot agent intelligence system: directory structure, agent catalog, and learning paths.

---

## Directory Structure

```
.github/
├── copilot-instructions.md          # High-level architecture context
├── instructions/                    # Path-activated coding standards (glob-based)
│   ├── scss.instructions.md         #   SCSS/CSS patterns
│   ├── html.instructions.md         #   HTML/Liquid templating
│   ├── js.instructions.md           #   JavaScript patterns
│   ├── docs.instructions.md         #   Documentation standards
│   ├── agents.instructions.md       #   Agent file standards
│   ├── prompts.instructions.md      #   Prompt file standards
│   └── skills.instructions.md       #   Skill file standards
├── specs/                           # Detailed specifications & frameworks
│   └── agent-intelligence-framework.md
├── docs/                            # Documentation & guides (this directory)
├── agents/                          # Custom agents (*.agent.md)
├── prompts/                         # Agent prompts (*.prompt.md)
├── skills/                          # Agent skills (SKILL.md + scripts)
│   └── {agent-name}/
│       ├── SKILL.md
│       ├── scripts/                 #   Validation & automation
│       └── references/              #   Detailed specifications
└── subdomain/                       # Reference intelligence for subdomain repos
    ├── copilot-instructions.md
    ├── agents/
    ├── instructions/
    ├── prompts/
    └── skills/
```

**Key principle**: Instructions auto-load via `applyTo` glob patterns. Specs and docs are referenced, never duplicated.

---

## Agent Catalog

### Evolutionary Management

| Agent | Skill | Prompt | Validation |
|-------|-------|--------|------------|
| Theme Genome | `.github/skills/theme-genome-agent/` | `theme-genome-agent.prompt.md` | `scripts/validate-ontology.sh` |
| Subdomain Evolution | `.github/skills/subdomain-evolution-agent/` | `subdomain-evolution-agent.prompt.md` | — |
| Agent Evolution | `.github/skills/agent-evolution-agent/` | — | 7 scripts (audit, sync, metrics, duplication, recommendations) |

### Implementation Specialists

| Agent | Skill | Prompt | Validation |
|-------|-------|--------|------------|
| SCSS Refactor | `.github/skills/scss-refactor-agent/` | `scss-refactor-agent.prompt.md` | `scripts/validate-scss.sh` |
| HTML Template | `.github/skills/html-template-agent/` | — | `scripts/validate-html.sh` |
| Responsive Design | `.github/skills/responsive-design-agent/` | `responsive-design-agent.prompt.md` | — |
| Futuristic Effects | `.github/skills/futuristic-effects-agent/` | `futuristic-effects-agent.prompt.md` | — |

### Support

| Agent | Skill | Prompt | Validation |
|-------|-------|--------|------------|
| Documentation Manager | `.github/skills/documentation-manager-agent/` | — | 4 scripts (structure, links, redundancy, metadata) |

All prompts are in `.github/prompts/`. All validation scripts are under `.github/skills/{agent}/scripts/`.

---

## Agent Evolution Agent

The meta-intelligence agent audits and improves the agent ecosystem itself.

**Scripts** (in `.github/skills/agent-evolution-agent/scripts/`):

| Script | Purpose |
|--------|---------|
| `audit-agent-quality.sh` | Quality metrics audit |
| `find-related-agents.sh` | Find agents for a spec |
| `measure-context-efficiency.sh` | Context window analysis |
| `sync-agents-with-specs.sh` | Spec synchronization |
| `detect-duplication.sh` | Cross-agent duplication detection |
| `recommend-improvements.sh` | Improvement recommendations |
| `track-metrics.sh` | Quality metrics over time |

---

## Subdomain Intelligence System

**Location**: `.github/subdomain/`

Subdomain repositories copy this directory into their `.github/` to get AI-assisted development aligned with the theme ontology.

**Contents**: `copilot-instructions.md`, plus `agents/`, `instructions/`, `prompts/`, and `skills/` directories providing 3 agents (`content-author`, `scss-compliance`, `subdomain-evolution`) with matching skills and coding standards.

**Setup**:
```bash
cp -r <theme-repo>/.github/subdomain/* <subdomain-repo>/.github/
```

Full guide: `.github/subdomain/README.md`

---

## Path-Activated Instructions

Each instruction file has an `applyTo` glob pattern in its YAML frontmatter:

```yaml
---
applyTo: "**/*.scss,_sass/**"
description: "SCSS coding standards"
---
```

When editing a matching file, GitHub Copilot automatically loads the relevant instructions.

**Context loading order**:
```
copilot-instructions.md  →  .github/instructions/  →  /docs/specifications/
(high-level context)        (path-specific details)    (complete references)
```

Detailed guide: `.github/docs/path-specific-instructions.md`

---

## Common Workflows

### New Feature Development

```bash
# Validate HTML structure
./.github/skills/html-template-agent/scripts/validate-html.sh template.html

# Validate SCSS
./.github/skills/scss-refactor-agent/scripts/validate-scss.sh styles.scss

# Run full test suite
npm test
```

### Ontological Evolution

```bash
# Validate current ontology
./.github/skills/theme-genome-agent/scripts/validate-ontology.sh

# After engine layer changes
npm run test:scss

# Update GENOME.md and INTEGRATION-GUIDE.md
```

### Documentation Quality

```bash
./.github/skills/documentation-manager-agent/scripts/validate-doc-structure.sh
./.github/skills/documentation-manager-agent/scripts/validate-doc-links.sh docs/
./.github/skills/documentation-manager-agent/scripts/detect-doc-redundancy.sh
./.github/skills/documentation-manager-agent/scripts/check-doc-metadata.sh docs/specifications/
```

### Agent Quality (Dogfooding)

```bash
npm run validate:agents
npm run validate:agents:duplicates
npm run audit:agents
npm run metrics:agents
```

---

## Learning Paths

### New Contributors

1. Read `agent-philosophy.md` — core principles
2. Follow `agent-onboarding.md` — structured training
3. Browse `.github/skills/` — available capabilities
4. Run `npm test` — verify your setup

### AI Agents

1. Load `.github/skills/{agent-name}/SKILL.md`
2. Check `.github/prompts/{agent-name}.prompt.md`
3. Follow `.github/instructions/*.instructions.md` for the file type
4. Run `scripts/validate-*.sh` to validate output

### Theme Maintainers

1. Use theme-genome-agent for PR reviews
2. Run `./.github/skills/theme-genome-agent/scripts/validate-ontology.sh`
3. Keep `GENOME.md` current
4. Run `npm test` before merging

---

## Key Resources

| Resource | Location |
|----------|----------|
| Ontology Integration Guide | `_sass/ontology/INTEGRATION-GUIDE.md` |
| Evolution History | `GENOME.md` |
| Agent Framework Spec | `.github/specs/agent-intelligence-framework.md` |
| Agent Philosophy | `.github/docs/agent-philosophy.md` |
| Conventional Tools | `.github/docs/conventional-tools.md` |
| Dogfooding Guide | `.github/docs/dogfooding-guide.md` |
| Agent Guidelines | `/docs/specifications/github-copilot-agent-guidelines.md` |
| Component Patterns | `.github/skills/html-template-agent/references/COMPONENT-PATTERNS.md` |
| Layout Patterns | `.github/skills/responsive-design-agent/references/LAYOUT-PATTERNS.md` |
