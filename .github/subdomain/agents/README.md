# Subdomain Agent Configuration

**Version**: 1.0  
**Last Updated**: 2026-02-12  
**Source**: `theme.asisaga.com/.github/subdomain/agents/`

## Purpose

This directory contains **GitHub Copilot Custom Agent definitions** for subdomain repositories. These `.agent.md` files define specialized agent behaviors that understand the theme-subdomain architecture.

When copied to a subdomain's `.github/agents/`, these agents become available for assignment to tasks and issues via GitHub Copilot coding agent.

## Available Agents

| Agent | File | Role |
|-------|------|------|
| Content Author | `content-author.agent.md` | Creates well-structured content pages |
| SCSS Compliance | `scss-compliance.agent.md` | Enforces zero-CSS ontology-only SCSS |
| Subdomain Evolution | `subdomain-evolution.agent.md` | Identifies ontological gaps, creates propositions |

## Format

All files follow the **GitHub Copilot Custom Agents** specification:

```yaml
---
name: agent-name
description: One-line purpose
prompt: |
  Multi-line instructions defining agent behavior
tools: ['tool1', 'tool2']
---
```

## Relationship to Theme Agents

The theme repository has 8 agents covering the full design system. Subdomain agents are a **focused subset** for content-oriented work:

| Theme Agent | Subdomain Equivalent | Notes |
|------------|---------------------|-------|
| theme-genome-agent | — | Theme-only (reviews propositions) |
| subdomain-evolution-agent | `subdomain-evolution.agent.md` | Subdomain-scoped version |
| scss-refactor-agent | `scss-compliance.agent.md` | Focused on compliance, not migration |
| html-template-agent | `content-author.agent.md` | Focused on content, not layouts |
| agent-evolution-agent | — | Theme-only (meta-intelligence) |
| responsive-design-agent | — | Theme-only (layout infrastructure) |
| futuristic-effects-agent | — | Theme-only (effects engine) |
| documentation-manager-agent | — | Theme-only (system docs) |

## Setup

When copying subdomain intelligence to your repo:

```bash
cp -r <theme-repo>/.github/subdomain/agents/ .github/agents/
```

---

**Maintained by**: Theme Genome Agent  
**Source**: `theme.asisaga.com/.github/subdomain/agents/`
