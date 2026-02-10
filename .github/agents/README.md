# 🔒 Agent Internal Configuration

**Version**: 1.0.0  
**Last Updated**: 2026-02-10  
**Status**: Protected Directory

---

## Purpose

This directory contains **internal agent configuration files** that are isolated from general agent access during normal operations. These files provide context, metadata, and coordination logic for the GitHub Copilot agent ecosystem but should not be accessed or modified during standard agent tasks.

## Access Restrictions

Per the agent intelligence system design:

> **Agents cannot access files in `.github/agents/` during normal operations.**
> 
> These files contain instructions for other agents and internal coordination logic. Accessing them during task execution may lead to misbehavior or context contamination.

This restriction ensures:
- **Clean separation of concerns** - Task execution vs. agent coordination
- **Context efficiency** - Agents focus on task-relevant information
- **System stability** - Internal configurations remain protected
- **Predictable behavior** - Agents operate within defined boundaries

## What Belongs Here

### ✅ Appropriate Content

1. **Agent Coordination Metadata**
   - Agent handoff logic between different agent types
   - Task routing rules and decision trees
   - Agent capability matrices and feature flags

2. **Internal System Configuration**
   - Agent version compatibility matrices
   - System-level feature toggles
   - Internal performance metrics schemas

3. **Protected Context**
   - Cross-agent state management rules
   - Internal validation schemas
   - System health check configurations

### ❌ What Doesn't Belong Here

1. **Coding Standards** → Use `.github/instructions/`
2. **Agent Prompts** → Use `.github/prompts/`
3. **Agent Skills** → Use `.github/skills/`
4. **User-Facing Documentation** → Use `/docs/`
5. **Validation Scripts** → Use `.github/skills/*/scripts/`

## Directory Structure

```
.github/agents/
├── README.md (this file)        # Directory purpose and guidelines
├── .gitkeep                     # Ensures directory is tracked
└── [Future internal configs]    # Added as system evolves
```

## Relationship to Agent Ecosystem

This directory is part of the broader agent intelligence system:

```
.github/
├── agents/           # 🔒 Internal configurations (protected)
├── instructions/     # 📋 Coding standards (path-specific)
├── prompts/          # 🤖 Agent instructions (detailed workflows)
├── skills/           # 🛠️ Executable capabilities (reusable)
├── AGENTS.MD         # 📚 Ecosystem architecture
└── AGENT-INDEX.md    # 🚀 Quick navigation
```

**Coordination Flow:**
1. **Instructions** define coding standards (WHAT to do)
2. **Prompts** define agent workflows (HOW to do it)
3. **Skills** package capabilities (EXECUTABLE tools)
4. **Agents/** contains internal coordination (PROTECTED logic)

## When to Add Files Here

Only add files to `.github/agents/` when:

- [ ] The content is genuinely internal system configuration
- [ ] Exposing it to agents during tasks would cause issues
- [ ] It's not appropriate for any other `.github/` directory
- [ ] You've documented WHY it belongs here
- [ ] You've updated this README with the new file's purpose

**Before adding**: Ask "Should agents see this during normal tasks?"
- **Yes** → It belongs elsewhere (instructions, prompts, skills, docs)
- **No** → It may belong here

## Access During Development

### Agent Evolution Meta-Tasks

The **agent-evolution-agent** (meta-intelligence layer) MAY access this directory when:

1. Performing system-wide agent ecosystem audits
2. Coordinating multi-agent workflows at the system level
3. Updating agent coordination logic
4. Validating system health and integrity

### Manual Access

Developers and maintainers can access this directory directly for:

- System-level debugging
- Agent coordination updates
- Ecosystem architecture changes
- Integration testing

## Version History

### v1.0.0 (2026-02-10)
- Initial directory creation
- Established access restrictions
- Documented purpose and guidelines
- Integrated into agent ecosystem

---

## Related Documentation

- `.github/AGENTS.MD` - Complete ecosystem architecture
- `.github/AGENT-INDEX.md` - Quick navigation and directory structure
- `.github/instructions/github.instructions.md` - Agent development standards
- `/docs/specifications/github-copilot-agent-guidelines.md` - Comprehensive guidelines
- `/docs/specifications/agent-self-learning-system.md` - Dogfooding & evolution

---

**Note**: This directory was added to formalize the protected configuration layer referenced in agent system limitations. It provides a clear location for internal coordination logic while maintaining the principle of least access for task-executing agents.
