---
applyTo: ".github/agents/*.agent.md"
description: "Coding standards for GitHub Copilot Custom Agent files"
---

# Agent Files Instructions

## File Format

**YAML Frontmatter (required):**
```yaml
---
name: agent-name
description: "One-line description of agent purpose"
prompt: |
  Multi-line agent instructions
  [detailed prompt content]
tools: ['*']  # or specific tools list
---
```

## Requirements

- **name**: kebab-case identifier
- **description**: Clear, concise purpose (1-256 chars)
- **prompt**: Multi-line instructions for the agent
- **tools**: List of allowed tools (use `['*']` for all)

## Keep Concise

Agent files should be minimal. For detailed patterns:
→ **Specifications**: `.github/specs/agent-intelligence-framework.md`  
→ **Documentation**: `.github/docs/`

## Related Files

- Corresponding prompt file: `.github/prompts/{name}.prompt.md`
- Corresponding skill directory: `.github/skills/{name}/`

## Related Documentation

→ **Agent framework**: `.github/specs/agent-intelligence-framework.md` - Complete agent system specification  
→ **Agent guidelines**: `/docs/specifications/github-copilot-agent-guidelines.md` - Standards and best practices  
→ **Self-learning system**: `/docs/specifications/agent-self-learning-system.md` - Dogfooding and Ouroboros  
→ **Agent philosophy**: `.github/docs/agent-philosophy.md` - Core principles and vision

---

**Version**: 1.1 - Added spec references for dogfooding  
**Last Updated**: 2026-02-14
