# Subdomain Agent Skills

**Version**: 1.0  
**Last Updated**: 2026-02-12  
**Source**: `theme.asisaga.com/.github/subdomain/skills/`

## Overview

This directory contains **Agent Skills** for subdomain repositories. Skills are structured, reusable capabilities that AI agents use to perform specific tasks, following the [Agent Skills specification](https://agentskills.io) format.

## Available Skills

| Skill | Directory | Purpose |
|-------|-----------|---------|
| Content Author | `content-author/` | Create well-structured content pages |
| SCSS Compliance | `scss-compliance/` | Validate zero-CSS ontology-only SCSS |
| Subdomain Evolution | `subdomain-evolution/` | Identify ontological gaps and create propositions |

## Skill Structure

Each skill directory contains:

```
skill-name/
└── SKILL.md           # Skill definition with YAML frontmatter
```

## Relationship to Theme Skills

The theme has 8 skills covering the full design system. Subdomain skills are a **focused subset**:

| Theme Skill | Subdomain Skill | Scope Difference |
|------------|-----------------|-----------------|
| html-template-agent | `content-author` | Content pages, not layouts/includes |
| scss-refactor-agent | `scss-compliance` | Compliance checking, not legacy migration |
| subdomain-evolution-agent | `subdomain-evolution` | Identical purpose, subdomain-scoped |

Skills not needed in subdomains: theme-genome-agent, agent-evolution-agent, responsive-design-agent, futuristic-effects-agent, documentation-manager-agent (these manage theme infrastructure).

## Setup

```bash
cp -r <theme-repo>/.github/subdomain/skills/ .github/skills/
```

---

**Maintained by**: Theme Genome Agent  
**Source**: `theme.asisaga.com/.github/subdomain/skills/`
