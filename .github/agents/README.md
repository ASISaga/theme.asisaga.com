# 🔒 Agent Internal Configuration

**Version**: 1.3.0  
**Last Updated**: 2026-02-10  
**Status**: Production - GitHub Copilot Custom Agents Compatible

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
├── README.md (this file)              # Directory purpose and guidelines
├── .gitkeep                           # Ensures directory is tracked
│
├── Configuration Files (YAML - Centralized)
├── agent-capabilities.yml             # Capability matrix for all agents
├── agent-routing.yml                  # Task routing rules and priorities
├── agent-handoff.yml                  # Multi-agent handoff protocols
├── feature-flags.yml                  # System-level feature toggles
├── quality-thresholds.yml             # Quality metrics and thresholds
│
└── Agent Context Files (Markdown - Per-Agent)
    ├── agent-evolution-agent.agent.md
    ├── theme-genome-agent.agent.md
    ├── subdomain-evolution-agent.agent.md
    ├── scss-refactor-agent.agent.md
    ├── html-template-agent.agent.md
    ├── responsive-design-agent.agent.md
    ├── futuristic-effects-agent.agent.md
    └── documentation-manager-agent.agent.md
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

## Configuration Files

### YAML Files (Centralized Coordination)

#### agent-capabilities.yml

Defines the capabilities, scope, and tools for each agent in the ecosystem.

**Purpose**: Meta-agents use this to understand which agent handles which tasks.

**Contents**:
- Agent category and role definitions
- Scope of each agent (file patterns, domains)
- Specific capabilities (validation, creation, analysis, etc.)
- Tool requirements
- Agent dependencies and trigger relationships

**Example Use**: When a task involves SCSS refactoring, the routing system checks this file to see that `scss-refactor-agent` has `convert_to_ontological_mixins` capability.

### agent-routing.yml

Task routing rules determining which agent handles which tasks based on patterns, context, and priority.

**Purpose**: Automated task assignment to appropriate agents.

**Contents**:
- Pattern-based routing (file types, paths)
- Context-based routing (keywords, task types)
- Priority levels (critical, high, medium, low)
- Workflow chains for common scenarios
- Conflict resolution rules
- Emergency override protocols

**Example Use**: A file matching `**/*.scss` with context "legacy CSS conversion" routes to `scss-refactor-agent` with high priority.

### agent-handoff.yml

Protocols for how agents coordinate and hand off work in multi-step workflows.

**Purpose**: Ensures smooth transitions between agents with proper context passing.

**Contents**:
- Handoff protocols between agent pairs
- Context data passed during handoffs
- Validation checklists for handoffs
- Workflow chains with sequential/parallel steps
- State management during handoffs
- Failure handling procedures

**Example Use**: When `html-template-agent` completes semantic HTML, it hands off to `scss-refactor-agent` with HTML structure, class names, and accessibility requirements.

### feature-flags.yml

System-level feature toggles controlling agent behaviors and capabilities.

**Purpose**: Gradual rollout of new features and quick disabling if issues arise.

**Contents**:
- Global feature flags (coordination, validation, dogfooding)
- Agent-specific feature toggles
- Experimental features in beta
- Deprecated features with sunset dates
- Performance controls and limits
- Monitoring and telemetry settings
- Rollout schedules

**Example Use**: `zero_duplication_enforcement: true` ensures all agents check for duplicate content before committing.

### quality-thresholds.yml

Quality metrics, thresholds, and acceptance criteria for agent work products.

**Purpose**: Validation standards and continuous improvement targets.

**Contents**:
- Universal quality standards (minimum, optimal, excellence)
- Agent-specific thresholds (lines, spec references, coverage)
- Code quality requirements (SCSS, HTML, JavaScript)
- Documentation quality standards
- Performance thresholds
- Ontological purity criteria
- Quality gates by stage (pre-commit, pre-merge, post-merge)
- Error budgets and SLAs

**Example Use**: Before merging, validates that SCSS files have `zero_css_compliance: true` in subdomain files and all linters pass.

### Markdown Files (Per-Agent Context)

#### *.agent.md Files (GitHub Copilot Custom Agents Format)

Individual agent profiles following GitHub Copilot's Custom Agents specification with YAML frontmatter.

**Format** (GitHub Copilot Custom Agents):
```yaml
---
name: agent-name
description: Purpose and capabilities (one-line)
prompt: |
  Detailed instructions defining behavior and expertise
  (multi-line prompt with all agent context)
tools: ['tool1', 'tool2']  # optional
---
```

**Purpose**: Agent profiles that define custom agent behavior for GitHub Copilot coding agent.

**Contents** (YAML frontmatter):
- **name**: Unique identifier for the agent (e.g., `scss-refactor-agent`)
- **description**: One-line explanation of purpose and capabilities
- **prompt**: Custom instructions defining behavior, expertise, workflows, and standards
- **tools**: Optional list of tools the agent can access

**Files** (8 custom agents):
1. `agent-evolution-agent.agent.md` - Meta-intelligence optimizer
2. `theme-genome-agent.agent.md` - Ontological gatekeeper
3. `subdomain-evolution-agent.agent.md` - Proposition creator
4. `scss-refactor-agent.agent.md` - Migration expert
5. `html-template-agent.agent.md` - Semantic structure specialist
6. `responsive-design-agent.agent.md` - Mobile-first specialist
7. `futuristic-effects-agent.agent.md` - Visual effects specialist
8. `documentation-manager-agent.agent.md` - Documentation quality

**Specification**: Follows GitHub Copilot Custom Agents format with YAML frontmatter. See: GitHub Copilot/Concepts/Agents/Coding agent/Custom agents documentation.

**Example Use**: Assign agent to task or issue to instantiate custom agent with defined behavior, tools, and expertise.

**Relationship to Other Files**:
```
Per-Agent Files:
├── .github/prompts/{agent}.prompt.md     → Detailed instructions (HOW)
├── .github/skills/{agent}/SKILL.md       → Executable capability (WHAT)
└── .github/agents/{agent}.agent.md       → Custom agent profile (WHO) ← GitHub Copilot Format

Centralized Files:
└── .github/agents/*.yml                  → System coordination (WHEN/WHERE)
```

The `.agent.md` files use GitHub Copilot's Custom Agents specification format, making them compatible with GitHub Copilot coding agent for assignment to tasks and issues.

## When to Update Configuration Files

### agent-capabilities.yml
- New agent added to ecosystem
- Agent gains new capability
- Agent scope changes
- Tool requirements updated
- Dependencies change

### agent-routing.yml
- New file patterns need routing
- Task type workflows change
- Priority levels adjusted
- New conflict scenarios emerge
- Emergency procedures updated

### agent-handoff.yml
- New multi-agent workflow created
- Handoff protocols refined
- Context passing requirements change
- Validation steps updated
- Failure handling improved

### feature-flags.yml
- New feature rolled out
- Experimental feature tested
- Feature deprecated/sunset
- Performance limits adjusted
- Monitoring requirements change

### quality-thresholds.yml
- Quality standards raised
- New validation requirements
- Performance targets adjusted
- SLA commitments change
- Error budgets modified

## Version History

### v1.3.0 (2026-02-10)
- Converted 8 `*.agent.md` files to GitHub Copilot Custom Agents format
- Added YAML frontmatter with name, description, prompt, tools
- Files now compatible with GitHub Copilot coding agent
- Follows official GitHub Copilot Custom Agents specification
- Reduced from ~1,530 lines to ~482 lines (focused on agent profiles)

### v1.2.0 (2026-02-10)
- Added 8 `*.agent.md` files (per-agent context and metadata)
- Standardized agent file structure following naming pattern
- Documented agent identity, context, coordination, performance
- Established cross-references between prompts, skills, and agent files
- Total: 13 files (5 YAML + 8 Markdown + README)

### v1.1.0 (2026-02-10)
- Added agent-capabilities.yml (capability matrix)
- Added agent-routing.yml (task routing rules)
- Added agent-handoff.yml (handoff protocols)
- Added feature-flags.yml (feature toggles)
- Added quality-thresholds.yml (quality metrics)
- Documented all configuration files
- Established update guidelines

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
