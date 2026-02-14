---
applyTo: ".github/prompts/*.prompt.md"
description: "Coding standards for agent prompt files"
---

# Prompt Files Instructions

## File Format

**YAML Frontmatter (required):**
```yaml
---
description: "Brief agent purpose (1-256 chars)"
name: "agent_name"  # snake_case
agent: "agent"
model: "claude-3-5-sonnet-20241022"
tools: ['*']
---
```

## Body Structure

1. Agent role and purpose
2. Core responsibilities (actionable list)
3. When to use (activation triggers)
4. Workflows and examples
5. Tool integration
6. Related documentation

## Tool Integration

**Reference existing tools, never duplicate:**

```bash
npm test              # Run all tests
npm run test:scss     # SCSS compilation
npm run lint:scss     # Stylelint validation
```

**Validation scripts:**
```bash
./.github/skills/[skill-name]/scripts/validate-*.sh
```

## Keep Focused

Reference detailed patterns instead of duplicating:
→ **Specifications**: `.github/specs/agent-intelligence-framework.md`  
→ **Documentation**: `.github/docs/`

## Related Documentation

→ **Agent framework**: `.github/specs/agent-intelligence-framework.md` - Complete system specification  
→ **Agent guidelines**: `/docs/specifications/github-copilot-agent-guidelines.md` - Standards and best practices  
→ **Self-learning system**: `/docs/specifications/agent-self-learning-system.md` - Dogfooding and Ouroboros  
→ **Conventional tools**: `.github/docs/conventional-tools.md` - All npm scripts and validation commands  
→ **Agent philosophy**: `.github/docs/agent-philosophy.md` - Core principles

---

**Version**: 1.1 - Added spec references for dogfooding  
**Last Updated**: 2026-02-14
