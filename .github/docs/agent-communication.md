# Agent Communication Protocols

**Last Updated**: 2026-02-14  
**Audience**: All agents, system architects

## Overview

How agents communicate with each other, with human developers, and with the broader ecosystem.

## Communication Channels

| Channel | Purpose | When to Use |
|---------|---------|-------------|
| **Pull Requests** | Propose/review ontological changes | Simple variant proposals |
| **GitHub Issues** | Complex proposals needing community input | Breaking changes, architecture, multi-subdomain coordination |
| **Code Comments** | Document inline reasoning for future agents | Why a variant was added, origin PR, semantic distinctions |
| **GENOME.md** | Evolutionary history record | After each accepted PR (maintained by Theme Genome Agent) |
| **Spec Updates** | Keep agents synchronized | After significant system changes |

→ PR workflow details: `.github/docs/ontological-proposition-guide.md`

## Agent Handoff Configuration

Coordination files in `.github/agents/`:
- `agent-handoff.yml` — Workflow transitions between agents
- `agent-coordination.yml` — Agent capabilities and routing
- `quality-thresholds.yml` — Quality gates
- `feature-flags.yml` — System-level toggles

## Agent-to-Agent Protocols

### Subdomain Evolution → Theme Genome

1. Subdomain prepares proposition and submits PR with template
2. Theme acknowledges within 48h
3. Theme evaluates (redundancy, generalization, semantic purity)
4. Theme responds with decision + reasoning
5. Subdomain implements if approved, or refines if requested
6. Theme merges and updates GENOME.md

### SCSS Refactor ↔ HTML Template

1. HTML agent ensures semantic structure and purposeful class naming
2. SCSS agent creates mirrored SCSS with ontological mixins
3. Both validate visual result matches intent

### Agent Evolution → All Agents

1. Evolution runs quality audits and identifies issues
2. Evolution notifies relevant agent with data-driven feedback
3. Target agent fixes, Evolution validates and updates metrics

## Agent-to-Human Protocols

### Core Principles

- **DO**: Explain "why," provide examples, reference docs, suggest alternatives, encourage semantic thinking
- **DON'T**: Say "no" without explanation, use undefined jargon, assume knowledge level

### Rejecting Requests

1. Acknowledge the request
2. Explain why it doesn't fit the ontological model
3. Suggest existing variants as alternatives
4. Offer to help reframe semantically
5. Link to `.github/docs/ontological-proposition-guide.md`

## Breaking Changes Protocol

1. Open GitHub Issue for discussion
2. Document migration path
3. Provide 90-day minimum migration period
4. Update CHANGELOG and GENOME.md

## Conflict Resolution

1. Each agent states position with reasoning, referencing specs/docs
2. Identify specific point of disagreement
3. Escalate to human maintainer if needed
4. Document decision in `decision-matrices.md` for future reference

## References

- `.github/docs/ontological-proposition-guide.md` — PR workflow
- `.github/docs/decision-matrices.md` — Quick decisions
- `.github/docs/agent-workflows.md` — Practical examples

---

**Version**: 1.0  
**Purpose**: Define clear communication protocols for agent ecosystem
