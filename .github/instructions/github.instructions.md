---
applyTo: ".github/**/*.md,.github/**/*.prompt.md,.github/skills/**/*,.github/prompts/**/*,.github/agents/**/*"
description: "Coding standards for agent intelligence system files"
---

# GitHub Agent System Instructions

## File Structure Requirements

**Agent files** (`.github/agents/*.agent.md`):
- YAML frontmatter with `name`, `description`, `prompt`, optional `tools`
- Follow GitHub Copilot Custom Agents specification
- Keep concise, reference `.github/specs/` for detailed patterns

**Prompt files** (`.github/prompts/*.prompt.md`):
- YAML frontmatter: `description`, `name`, `agent`, `model`, `tools`
- Body: Role, responsibilities, workflows, tool integration
- Reference npm scripts and validation scripts, don't duplicate

**Skill files** (`.github/skills/*/SKILL.md`):
- Follow agentskills.io specification
- YAML frontmatter: `name`, `description`, `license`, `metadata`, `allowed-tools`
- Body: Purpose, when to use, workflows, validation
- Scripts in `scripts/`, detailed specs in `references/`

## Tool Integration (REQUIRED)

**Reference existing tools, never duplicate:**

```bash
npm test              # Run all tests
npm run test:scss     # SCSS compilation
npm run lint:scss     # Stylelint validation
```

**Validation scripts pattern:**
```bash
./.github/skills/[skill-name]/scripts/validate-*.sh
```

## Ontological Proposition System

**For theme-specific evolutionary mechanism:**

1. Subdomain Evolution Agent identifies semantic gap
2. Creates Ontological Proposition PR
3. Theme Genome Agent reviews (semantic purity, no redundancy, universal applicability)
4. If approved, implements in `_sass/ontology/` and documents in `GENOME.md`

→ **Template**: `.github/PULL_REQUEST_TEMPLATE/ontological_proposition.md`  
→ **Agent**: `.github/prompts/theme-genome-agent.prompt.md`  
→ **Skill**: `.github/skills/theme-genome-agent/SKILL.md`

## Documentation References

**Specifications**: `.github/specs/agent-intelligence-framework.md`  
**System docs**: `.github/docs/`  
**Complete architecture**: `.github/AGENTS.MD`  
**Guidelines**: `/docs/specifications/github-copilot-agent-guidelines.md`

---

**Version**: 2.1 - Proper glob-path structure  
**Last Updated**: 2026-02-14
