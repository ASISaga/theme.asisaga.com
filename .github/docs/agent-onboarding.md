# Agent Onboarding & Training

**Last Updated**: 2026-02-14  
**Audience**: New agents, contributors learning the system

## Overview

Structured onboarding path for new agents (AI or human) joining the ASI Saga agent ecosystem.

## Onboarding Checklist

### Phase 1: Foundation (Required)

- [ ] Read `.github/copilot-instructions.md` — High-level architecture
- [ ] Review directory structure in `.github/` (instructions vs specs vs docs)
- [ ] Read `.github/docs/agent-philosophy.md` — Core principles

### Phase 2: Specifications (Required)

- [ ] Read `.github/specs/agent-intelligence-framework.md` — Complete framework
- [ ] Read `.github/specs/genesis-theme-repository.md` — Repository specifics
- [ ] Review `/docs/specifications/scss-ontology-system.md` — All 31 variants

### Phase 3: Agent System (Required)

- [ ] Review agents in `.github/agents/`, prompts in `.github/prompts/`, skills in `.github/skills/`
- [ ] Understand handoff protocols: `.github/docs/agent-communication.md`

### Phase 4: Workflows (Required)

- [ ] Read `.github/docs/ontological-proposition-guide.md` — PR workflow
- [ ] Read `.github/docs/decision-matrices.md` — Quick decisions
- [ ] Read `.github/docs/agent-workflows.md` — Practical examples

### Phase 5: Quality & Evolution (Recommended)

- [ ] Read `.github/docs/agent-metrics.md` — Quality measurement
- [ ] Read `.github/docs/dogfooding-guide.md` — Self-improvement
- [ ] Run `npm test` and validation scripts to understand checks

## Training Scenarios

### Scenario 1: Visual Request Recognition

**Setup**: Subdomain requests "dark mode toggle"

<details>
<summary>Answer</summary>

Valid ontological request IF framed semantically. Guide to existing `genesis-atmosphere('void')`. Reject visual-only framing like "make background black and text white."

→ `.github/docs/decision-matrices.md`
</details>

### Scenario 2: Identifying Semantic Gaps

**Setup**: Subdomain needs to show "incomplete data being calculated"

<details>
<summary>Answer</summary>

Try `cognition('protocol') + state('evolving')` combination first. If insufficient, propose new variant with semantic framing and universal applicability.

→ `.github/docs/ontological-proposition-guide.md`
</details>

### Scenario 3: SCSS Refactoring

**Setup**: Convert `.alert-box { background: #ff0000; color: white; padding: 1rem; font-weight: bold; }`

<details>
<summary>Answer</summary>

Red + bold = urgency. Convert to `@include genesis-entity('imperative'); @include genesis-cognition('protocol');`

→ `.github/docs/decision-matrices.md`
</details>

### Scenario 4: Headline Sizing Request

**Setup**: "We need bigger headlines"

<details>
<summary>Answer</summary>

Use `genesis-cognition('axiom')` for primary headings. Guide toward semantic thinking — ask WHAT needs emphasis and WHY, not "bigger."
</details>

### Scenario 5: Multiple Mixins

**Setup**: Card needs layout, visual style, and state indication

<details>
<summary>Answer</summary>

Combine categories: `environment('distributed')` for layout, `entity('primary')` for visual, `state('stable')` for condition. Child elements get their own: `cognition('axiom')` for titles, `synapse('execute')` for buttons.

→ `/docs/specifications/scss-ontology-system.md`
</details>

## Agent Role Quick Guide

Each agent type has a specific focus. See the corresponding prompt file for full details.

| Agent | Focus | Key Prompt |
|-------|-------|------------|
| Theme Genome | PR review, ontological purity, GENOME.md | `theme-genome-agent.prompt.md` |
| Subdomain Evolution | Identifying gaps, creating propositions | `subdomain-evolution-agent.prompt.md` |
| SCSS Refactor | CSS→mixin conversion, zero-CSS enforcement | `scss-refactor-agent.prompt.md` |
| HTML Template | Semantic structure, accessibility, BEM | `.github/instructions/html.instructions.md` |
| Agent Evolution | Quality metrics, duplication elimination | `.github/docs/dogfooding-guide.md` |

## Competency Levels

| Level | Knowledge | Skills |
|-------|-----------|--------|
| **Beginner** | Three-tier architecture, 6 categories, semantic vs visual | Classify elements, identify obvious gaps |
| **Intermediate** | All 31 variants, mixin combinations, PR process | Refactor simple CSS, write propositions, use validation tools |
| **Advanced** | Ontological philosophy, edge cases, evolution principles | Complex PR reviews, legacy refactoring, system improvements |
| **Expert** | Complete mastery, historical evolution, all edge cases | Evaluate any PR, design system components, evolve the system |

## Quick Reference Card

```
ONTOLOGICAL CATEGORIES (6)
━━━━━━━━━━━━━━━━━━━━━━━━
Environment → Layout logic      Entity → Visual presence
Cognition → Information type    Synapse → Interaction
State → Temporal condition      Atmosphere → Sensory vibe

DECISION SHORTCUTS
━━━━━━━━━━━━━━━━━━
Visual only? → REJECT           Semantic gap? → CONSIDER PR
Existing coverage? → USE IT     Urgent? → entity('imperative')
Title? → cognition('axiom')     Button? → synapse('execute')

VALIDATION
━━━━━━━━━━━━━━━━━━
npm test          → Run all tests
npm run test:scss → SCSS only
npm run lint:scss → Style check
```

## References

- `.github/copilot-instructions.md` — Start here
- `.github/specs/agent-intelligence-framework.md` — Complete framework
- `/docs/specifications/scss-ontology-system.md` — All 31 variants
- `.github/docs/agent-workflows.md` — Practical examples
- `GENOME.md` — Evolution history

---

**Version**: 1.0  
**Purpose**: Structured onboarding and training for new agents
