# GitHub Copilot Agent Guidelines

**Last Updated**: 2026-02-10  
**Version**: 1.1 - Added `.github/agents/` directory  
**Status**: Active

This document provides comprehensive guidelines for creating and maintaining GitHub Copilot agents, prompts, and skills within the `.github/` directory.

## Philosophy: Tool Leverage, Not Replacement

AI agents should **supercharge existing tools** (linters, validation scripts, npm commands, MCP servers) rather than replacing them. This creates a highly intelligent AI agent coding system where:

- Agents orchestrate existing automation
- Validation is automated via scripts
- Testing uses established npm workflows
- Tools are composed, not duplicated

## Agent Types & Structure

### 1. Agent Prompts (`.github/prompts/*.prompt.md`)

Prompt files define detailed instructions for AI agents to perform specific tasks.

**YAML Frontmatter Structure:**
```yaml
---
description: "Brief description of agent purpose (1-256 chars)"
name: "agent_name"  # snake_case
agent: "agent"      # or "ask", "edit", custom agent
model: "claude-3-5-sonnet-20241022"  # or alternative
tools: ['*']        # All tools, or specific: ['Bash', 'Read']
---
```

**Body Structure:**
1. Agent role and purpose
2. Version enhancements (what's new)
3. Core responsibilities (actionable list)
4. When to use (activation triggers)
5. Workflows and examples
6. Tool integration (reference scripts)
7. Decision matrices (if applicable)
8. Related documentation
9. Version history footer

**Model Selection Guidelines:**
- `claude-3-5-sonnet-20241022` - Default, best balance
- `gpt-4` - Alternative for specific use cases
- Document reasoning for non-default models

**Tool Specification Patterns:**
```yaml
tools: ['*']                           # All available tools
tools: ['Bash', 'Read', 'Edit']        # Specific tools
tools: ['Bash(npm:*)', 'Bash(sass:*)'] # Scoped commands
tools: ['mcp-server-name/*']           # MCP server tools
```

### 2. Agent Skills (`.github/skills/*/SKILL.md`)

Skills are executable, reusable capabilities following the [Agent Skills specification](https://agentskills.io).

**YAML Frontmatter Structure:**
```yaml
---
name: skill-name        # kebab-case, matches directory
description: One-sentence purpose with discoverable keywords (1-1024 chars)
license: MIT
metadata:
  author: ASISaga
  version: "2.1"
  category: design-system  # or testing, documentation, automation
  role: specialist-role    # lead-architect, specialist, expert, etc.
allowed-tools: Bash(npm:*) Bash(sass:*) Read
---
```

**Directory Structure:**
```
.github/skills/skill-name/
├── SKILL.md                 # Main skill definition
├── scripts/                 # Automation & validation
│   └── validate-*.sh       # Executable validation scripts
├── references/              # Detailed specifications
│   └── *.md                # Static reference content
└── assets/                  # Visual examples (optional)
```

**Body Structure:**
1. Role and scope statement
2. Purpose paragraph
3. "When to Use This Skill" triggers
4. Core Principles or Responsibilities
5. Workflows and Examples
6. Tool Integration
7. Validation Instructions
8. Related Documentation

**Naming Conventions:**
- Directory: `kebab-case-name`
- Name field: matches directory exactly
- Description: includes keywords for agent discovery
- Version: semantic versioning "X.Y"

**Categories:**
- `design-system` - Ontological and styling work
- `testing` - Quality assurance and validation
- `documentation` - Content and guides
- `automation` - Scripts and workflows

**Roles:**
- `lead-architect` - System-wide governance
- `specialist` - Domain-specific expertise
- `expert` - Deep technical knowledge
- `migration` - Legacy code refactoring
- `semantic-structure` - Content and accessibility

### 3. Agent Internal Configurations (`.github/agents/`)

Protected directory for internal agent coordination logic and system-level configuration.

**Purpose:**
- Agent handoff logic and coordination rules
- System-level feature toggles
- Internal performance metrics schemas
- Cross-agent state management

**Access Restrictions:**
- **Agents cannot access during normal task execution**
- Prevents context contamination and misbehavior
- Maintains clean separation between task work and system coordination
- Only accessible during meta-intelligence tasks (e.g., agent-evolution-agent)

**Directory Structure:**
```
.github/agents/
├── README.md        # Purpose and access guidelines
├── .gitkeep         # Ensures directory is tracked
└── [Future configs] # Added as system evolves
```

**When to Add Files:**
- Content is genuinely internal system configuration
- Exposing it to agents during tasks would cause issues
- Not appropriate for instructions/, prompts/, or skills/
- Documented why it belongs here

**Related Documentation:**
- `.github/agents/README.md` - Complete access guidelines
- `.github/AGENTS.MD` - Ecosystem architecture including agents/

### 4. Agent Documentation (`.github/*.MD`)

Central documentation files that govern the agent ecosystem.

**Core Documents:**
- `AGENTS.MD` - Complete ecosystem architecture (detailed, ~600 lines)
- `AGENT-INDEX.md` - Quick navigation and version info (~400 lines)
- `AGENT-QUICK-REFERENCE.md` - Ontology cheat sheet
- `AGENT-WORKFLOWS.md` - Integrated workflows

**Update Pattern:**
```markdown
# Document Title

**Version**: X.Y.Z - Enhancement Description  
**Last Updated**: YYYY-MM-DD  
**Status**: Production Ready | Active | Draft

[Content with version history at end]
```

## Tool Integration Requirements

### npm Scripts (MANDATORY)

Agents MUST reference, never reimplement:

```bash
# Always use these commands
npm test              # Run all tests (compilation + lint)
npm run test:scss     # SCSS compilation only
npm run lint:scss     # Stylelint checks
npm run lint:scss:fix # Auto-fix lint issues
```

**In prompts/skills, reference like:**
```markdown
Run validation:
```bash
npm run test:scss
```
```

### Validation Scripts (REQUIRED)

Skills with validation must provide executable scripts:

**Script naming:** `scripts/validate-*.sh`

**Example scripts:**
- `.github/skills/theme-genome-agent/scripts/validate-ontology.sh`
- `.github/skills/scss-refactor-agent/scripts/validate-scss.sh`
- `.github/skills/html-template-agent/scripts/validate-html.sh`

**Script requirements:**
- Executable permissions (`chmod +x`)
- Clear error messages
- Exit codes (0 = success, non-zero = failure)
- Integration with existing tools (sass, stylelint, etc.)

**In SKILL.md, document like:**
```markdown
## Validation

Run automated validation:
```bash
./.github/skills/skill-name/scripts/validate-*.sh path/to/file
```
```

### MCP Servers (WHEN AVAILABLE)

If MCP servers are configured, reference them in frontmatter:

```yaml
tools: ['mcp-server-name/*']  # All tools from server
```

**Note**: As of v1.0, no MCP servers are configured. When added, update this documentation.

### Linters and Checkers

Integrate with existing configuration:

- **Stylelint**: `.stylelintrc.json` (SCSS/CSS)
- **Sass Compiler**: Built-in compilation checks
- **Custom Scripts**: Skill-specific validation

**Never duplicate linter logic** - call the tool via bash.

## Documentation Governance

### Version Tracking

All agent-related files should include version information:

```markdown
**Version**: 2.1.1 - Enhancement Description  
**Last Updated**: 2026-02-10  
**Status**: Production Ready
```

### Cross-Referencing

Use consistent reference patterns:

```markdown
→ **Complete guide**: `/docs/specifications/guide-name.md`
→ **Detailed spec**: `.github/skills/agent-name/references/SPEC.md`
→ **Validation**: `scripts/validate-ontology.sh`
→ **Related skill**: `.github/skills/related-skill/`
```

### Update, Don't Replace

- Update existing documentation with new sections
- Add version headers for significant changes
- Maintain historical context when relevant
- Never create duplicate summary files

### Cross-File Relationships

**Instructions ↔ Prompts ↔ Skills:**
- Instructions define WHAT to do (coding standards)
- Prompts define HOW agents do it (detailed workflows)
- Skills package instructions into reusable capabilities

**Coordination:**
- `.github/instructions/scss.instructions.md` → Ontology system usage
- `.github/prompts/scss-refactor-agent.prompt.md` → Migration workflows
- `.github/skills/scss-refactor-agent/SKILL.md` → Executable capability

## Validation Workflows

### Before Committing Agent Changes

1. **Verify frontmatter:**
```bash
# Check YAML is valid
# Ensure required fields present
# Validate naming conventions
```

2. **Run existing tests:**
```bash
npm test  # Compilation + linting
```

3. **Test validation scripts:**
```bash
# Execute all scripts in skills/*/scripts/
./.github/skills/*/scripts/validate-*.sh
```

4. **Update cross-references:**
- Update `AGENT-INDEX.md` with new skill
- Add to workflow examples if applicable
- Cross-link in related documentation

### Pre-Commit Checklist

- [ ] YAML frontmatter valid and complete
- [ ] Name matches directory (skills) or follows convention (prompts)
- [ ] Description is discoverable (1-1024 chars)
- [ ] Tools are explicitly listed
- [ ] Version and date updated
- [ ] Cross-references added
- [ ] Validation scripts tested
- [ ] npm test passes
- [ ] Related docs updated

## Anti-Patterns & Best Practices

### ❌ Anti-Patterns (Avoid These)

1. **Duplicating tool functionality**
   - Don't reimplement npm scripts
   - Don't recreate linter logic
   - Don't build custom validators when scripts exist

2. **Overlapping agent responsibilities**
   - Each agent should have clear boundaries
   - Document handoffs between agents
   - Avoid "kitchen sink" agents

3. **Static content in SKILL.md**
   - Offload detailed specs to `references/`
   - Keep SKILL.md focused on workflows
   - Link to external documentation

4. **Validation without automation**
   - Every validatable task needs a script
   - Scripts should be executable and tested
   - Manual validation is error-prone

5. **Undefined tool access**
   - Always specify `tools` in frontmatter
   - Document tool requirements
   - Test tool availability

6. **Stale version history**
   - Update version on every change
   - Document what changed
   - Maintain accurate dates

### ✅ Best Practices (Follow These)

1. **Leverage existing automation**
   - Call npm scripts via bash
   - Use validation scripts
   - Integrate with linters

2. **Clear agent boundaries**
   - Define specific activation triggers
   - Document related agents
   - Avoid scope creep

3. **Offload to references/**
   - Detailed specs go in `references/*.md`
   - SKILL.md stays workflow-focused
   - Link to external docs

4. **Automate validation**
   - Create `scripts/validate-*.sh`
   - Make scripts executable
   - Test automation regularly

5. **Explicit tool declarations**
   - List all tools in frontmatter
   - Document tool purposes
   - Test tool access

6. **Maintain version history**
   - Update on every change
   - Document enhancements
   - Keep dates accurate

## Evolutionary Design Patterns

### Ontological Proposition System

The agent ecosystem includes an evolutionary mechanism for design system growth:

**Process:**
1. Subdomain Evolution Agent identifies semantic gap
2. Creates ontological proposition PR
3. Theme Genome Agent reviews for:
   - Semantic purity (not visual-only)
   - Redundancy (existing variants cover it?)
   - Universal applicability (benefits 3+ subdomains?)
4. If approved, implements in engine layer
5. Documents in GENOME.md with PR origin

**Template:**
- `.github/PULL_REQUEST_TEMPLATE/ontological_proposition.md`

### Agent Enhancement Workflow

When adding new agent capabilities:

1. **Identify gap:**
   - Review existing agents
   - Check for overlapping responsibilities
   - Define clear activation triggers

2. **Design agent:**
   - Choose type (prompt vs. skill)
   - Define scope and boundaries
   - Document tool requirements

3. **Create structure:**
   - For skills: full directory with `SKILL.md`, `scripts/`, `references/`
   - For prompts: single `.prompt.md` file
   - Follow naming conventions

4. **Add validation:**
   - Create validation script if applicable
   - Test automation
   - Document validation process

5. **Update ecosystem:**
   - Add to `AGENT-INDEX.md`
   - Document in `AGENTS.MD` if major
   - Cross-reference related agents
   - Update workflow examples

6. **Test thoroughly:**
   - Run all npm scripts
   - Execute validation scripts
   - Verify cross-references
   - Check for regressions

## GitHub Copilot Best Practices

### For AI Coding Agents

When working in `.github/` directory:

1. **Understand first:**
   - Read `AGENTS.MD` completely
   - Review related agent prompts
   - Study existing validation scripts

2. **Leverage, don't duplicate:**
   - Use npm scripts via bash
   - Call validation scripts
   - Reference MCP tools when available

3. **Think ontologically:**
   - Separate semantic from visual
   - Document intent, not implementation
   - Maintain three-tier architecture

4. **Test before committing:**
   - Run `npm test`
   - Execute validation scripts
   - Verify cross-references

5. **Document thoroughly:**
   - Update version history
   - Cross-reference related docs
   - Include clear examples

### Quality Standards

Every component must meet:

- **Prompts**: Clear activation triggers, tool declarations, version history
- **Skills**: Validation automation, clear scope, discoverable keywords
- **Agents**: Defined boundaries, documented handoffs, no overlap
- **Documentation**: Synchronized cross-references, current versions, accurate dates

## Related Documentation

**Agent ecosystem:**
- `.github/AGENTS.MD` - Complete architecture
- `.github/AGENT-INDEX.md` - Quick navigation
- `.github/skills/README.md` - Skills overview
- `/docs/references/agent-skill-spec.md` - Agent Skills specification

**Instruction files:**
- `.github/instructions/scss.instructions.md` - SCSS standards
- `.github/instructions/html.instructions.md` - HTML/Liquid templates
- `.github/instructions/js.instructions.md` - JavaScript patterns
- `.github/instructions/docs.instructions.md` - Documentation standards

**Related systems:**
- `/docs/systems/ontology/` - Ontological design system
- `/docs/specifications/` - Technical specifications
- `GENOME.md` - Evolutionary history

**Evolution:**
- `PULL_REQUEST_TEMPLATE/ontological_proposition.md` - Proposal template

---

**Version**: 1.0  
**Last Updated**: 2026-02-10  
**Maintained by**: Theme development team  
**Status**: Active
