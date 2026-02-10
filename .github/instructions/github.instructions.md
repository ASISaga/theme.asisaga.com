---
applyTo: ".github/**/*.md,.github/**/*.prompt.md,.github/skills/**/*"
description: "GitHub Copilot agent instructions for .github directory: prompts, skills, and agent documentation"
---

# GitHub Agent Instructions

## PRIMARY METHOD: Tool Leverage, Not Replacement

**AI agents SUPERCHARGE existing tools (linters, validation scripts, npm commands), not replace them.**

### Quick Start Templates

**Agent prompt** (`.prompt.md`):
```yaml
---
description: "Brief (1-256 chars)"
name: "agent_name"  # snake_case
agent: "agent"
model: "claude-3-5-sonnet-20241022"
tools: ['*']
---
```

**Agent skill** (`SKILL.md`):
```yaml
---
name: skill-name  # kebab-case
description: One-sentence purpose (1-1024 chars)
license: MIT
metadata:
  author: ASISaga
  version: "2.1"
  category: design-system
  role: specialist-role
allowed-tools: Bash(npm:*) Read
---
```

→ **Complete guidelines**: `/docs/specifications/github-copilot-agent-guidelines.md`

## MANDATORY RULES

**Prompts**: YAML frontmatter, snake_case names, reference tools, no duplication  
**Skills**: kebab-case, Purpose→When→Workflows→Validation structure, scripts in `scripts/`, specs in `references/`  
**Docs**: Version headers, update (don't create new), no duplication

## Tool Integration (REQUIRED)

**npm scripts**: `npm test`, `npm run test:scss`, `npm run lint:scss`  
**Validation scripts**: `./.github/skills/[agent]/scripts/validate-*.sh`  
**Linters**: Stylelint (`.stylelintrc.json`), Sass compiler, custom scripts

→ **All scripts**: `.github/skills/agent-evolution-agent/scripts/README.md`

## Skill Directory Structure

```
.github/skills/agent-name/
├── SKILL.md           # Main definition
├── scripts/           # Validation scripts
├── references/        # Detailed specs
└── assets/            # Visual examples (optional)
```

**Categories**: design-system, testing, documentation, automation, meta-intelligence  
**Roles**: lead-architect, specialist, expert, migration, semantic-structure

## Validation

**Before committing:**
1. YAML frontmatter valid
2. Names match conventions (snake_case prompts, kebab-case skills)
3. Tools explicitly listed
4. Run `npm test`
5. Test validation scripts

**Scripts must**: Be executable, return exit codes, integrate existing tools

## Documentation Updates

**Core files**: `AGENTS.MD` (~600L), `AGENT-INDEX.md` (~400L), `AGENT-QUICK-REFERENCE.md`, `AGENT-WORKFLOWS.md`

**Version tracking**:
```markdown
**Version**: X.Y.Z - Enhancement  
**Last Updated**: YYYY-MM-DD
```

## Anti-Patterns

❌ Duplicate tool functionality (npm, linters)  
❌ Overlapping agent responsibilities  
❌ Static content in SKILL.md (use `references/`)  
❌ Validate without scripts  
❌ Skip tool declarations

✅ Reference npm scripts  
✅ Clear agent boundaries  
✅ Offload to `references/*.md`  
✅ Automate via `scripts/*.sh`  
✅ Maintain version history

## Ontological Proposition System

**Evolutionary mechanism:**
1. Subdomain Evolution Agent identifies gap
2. Creates proposition PR
3. Theme Genome Agent reviews (semantic, redundancy, universal)
4. If approved, implements in engine
5. Documents in GENOME.md

→ **Template**: `.github/PULL_REQUEST_TEMPLATE/ontological_proposition.md`

## Documentation References

**Complete guidelines**:
- `/docs/specifications/github-copilot-agent-guidelines.md` - **Comprehensive agent development**
- `/docs/specifications/agent-self-learning-system.md` - Dogfooding & continuous learning
- `.github/AGENTS.MD` - Ecosystem architecture
- `.github/AGENT-INDEX.md` - Quick navigation

**Test pages** (organized in `/tests/`):
- `/tests/README.md` - Complete test page catalog and organization
- Test pages moved from root to categorized subdirectories
- Integration with agent testing workflows

**Related instructions**: scss.instructions.md, html.instructions.md, js.instructions.md, docs.instructions.md

---

**Applies to**: `.github/**/*.md`, `.github/**/*.prompt.md`, `.github/skills/**/*`  
**Version**: 1.3 - Added test page organization references
**Last Updated**: 2026-02-10
