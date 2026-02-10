---
applyTo: ".github/**/*.md,.github/**/*.prompt.md,.github/skills/**/*"
description: "GitHub Copilot agent instructions for .github directory: prompts, skills, and agent documentation"
---

# GitHub Agent Instructions

## PRIMARY METHOD: Tool Leverage, Not Replacement

**AI agents SUPERCHARGE existing tools (linters, validation scripts, npm commands), not replace them.**

### Quick Start

**Agent prompt template** (`.prompt.md`):
```yaml
---
description: "Brief description (1-256 chars)"
name: "agent_name"  # snake_case
agent: "agent"
model: "claude-3-5-sonnet-20241022"
tools: ['*']  # or ['Bash', 'Read'] or ['mcp-server/*']
---
```

**Agent skill template** (`SKILL.md`):
```yaml
---
name: skill-name  # kebab-case, matches directory
description: One-sentence purpose with keywords (1-1024 chars)
license: MIT
metadata:
  author: ASISaga
  version: "2.1"
  category: design-system  # or testing, documentation, automation
  role: specialist-role
allowed-tools: Bash(npm:*) Bash(sass:*) Read
---
```

## MANDATORY RULES

**Prompt Files:**
- ✅ YAML frontmatter: `description`, `name`, `agent`, `model`, `tools`
- ✅ snake_case for `name`, version history at bottom
- ✅ Reference tools explicitly - NO reimplementation
- ❌ NO duplicate agent responsibilities

**Skill Files:**
- ✅ YAML frontmatter: `name`, `description`, `license`, `metadata`, `allowed-tools`
- ✅ kebab-case directory/name, discoverable keywords
- ✅ Structure: Purpose → When to Use → Workflows → Validation
- ✅ Validation scripts in `scripts/validate-*.sh`
- ✅ Detailed specs in `references/*.md`
- ❌ NO static content in SKILL.md

**Documentation:**
- ✅ Version headers with dates
- ✅ Update existing files, don't create new
- ❌ NO duplicate content

## Tool Integration (REQUIRED)

**npm scripts** - Always reference, never reimplement:
```bash
npm test              # All tests
npm run test:scss     # SCSS compilation
npm run lint:scss     # Stylelint
npm run lint:scss:fix # Auto-fix
```

**Validation scripts** - Call via bash:
```bash
./.github/skills/theme-genome-agent/scripts/validate-ontology.sh
./.github/skills/scss-refactor-agent/scripts/validate-scss.sh path/to/file
./.github/skills/html-template-agent/scripts/validate-html.sh path/to/file
```

**Linters** - Integrate, don't duplicate:
- Stylelint: `.stylelintrc.json`
- Sass: Built-in compiler
- Custom: `scripts/` in skills

**MCP servers** (when available):
```yaml
tools: ['mcp-server-name/*']
```

## Skill Directory Structure

```
.github/skills/agent-name/
├── SKILL.md                # Main definition
├── scripts/                # Automation
│   └── validate-*.sh      # Executable validation
├── references/             # Detailed specs
│   └── *.md               # Static content
└── assets/                 # Visual examples (optional)
```

**Naming:**
- Directory: `kebab-case-name`
- Categories: `design-system`, `testing`, `documentation`, `automation`
- Roles: `lead-architect`, `specialist`, `expert`, `migration`, `semantic-structure`

## Validation Requirements

**Before committing:**
1. YAML frontmatter valid
2. Names match conventions
3. Tools explicitly listed
4. Run `npm test`
5. Test validation scripts
6. Update cross-references

**Scripts must:**
- Be executable (`chmod +x`)
- Return exit codes (0 = success)
- Integrate existing tools

## Documentation Updates

**Core files:**
- `AGENTS.MD` - Complete architecture (~600 lines)
- `AGENT-INDEX.md` - Quick navigation (~400 lines)
- `AGENT-QUICK-REFERENCE.md` - Ontology cheat sheet
- `AGENT-WORKFLOWS.md` - Integrated workflows

**Version tracking:**
```markdown
**Version**: X.Y.Z - Enhancement  
**Last Updated**: YYYY-MM-DD  
**Status**: Production Ready
```

**Cross-references:**
```markdown
→ **Complete guide**: `/docs/specifications/github-copilot-agent-guidelines.md`
→ **Spec**: `.github/skills/agent-name/references/SPEC.md`
→ **Validation**: `scripts/validate-*.sh`
```

## Anti-Patterns & Best Practices

### ❌ DON'T:
1. Duplicate tool functionality (npm scripts, linters)
2. Create agents with overlapping responsibilities
3. Put static content in SKILL.md (use `references/`)
4. Validate without scripts
5. Forget tool declarations in frontmatter
6. Skip version updates

### ✅ DO:
1. Reference npm scripts for testing/linting
2. Define clear agent boundaries
3. Offload specs to `references/*.md`
4. Automate via `scripts/validate-*.sh`
5. Explicitly list tools in frontmatter
6. Maintain version history

## Agent Enhancement Workflow

1. Identify gap in capabilities
2. Check if existing agent can be extended
3. Create structure (skill directory or prompt file)
4. Add validation script (if applicable)
5. Write detailed references
6. Update `AGENT-INDEX.md`
7. Test: `npm test` + validation scripts
8. Submit PR with rationale

## Ontological Proposition System

**Evolutionary mechanism for design system growth:**

1. Subdomain Evolution Agent identifies semantic gap
2. Creates proposition PR
3. Theme Genome Agent reviews for:
   - Semantic purity (not visual-only)
   - Redundancy (covered by existing?)
   - Universal applicability (3+ subdomains?)
4. If approved, implements in engine
5. Documents in GENOME.md

→ **Template**: `.github/PULL_REQUEST_TEMPLATE/ontological_proposition.md`

## Documentation References

**Complete guidelines:**
- `/docs/specifications/github-copilot-agent-guidelines.md` - Comprehensive agent development guide
- `.github/AGENTS.MD` - Complete ecosystem architecture
- `.github/AGENT-INDEX.md` - Quick navigation
- `.github/skills/README.md` - Skills overview
- `/docs/references/agent-skill-spec.md` - Agent Skills specification

**Related instructions:**
- `.github/instructions/scss.instructions.md` - SCSS standards
- `.github/instructions/html.instructions.md` - HTML/Liquid templates
- `.github/instructions/js.instructions.md` - JavaScript patterns
- `.github/instructions/docs.instructions.md` - Documentation standards

**Related systems:**
- `/docs/systems/ontology/` - Ontological design system
- `GENOME.md` - Evolutionary history

## GitHub Copilot Best Practices

**For AI coding agents in .github/:**

1. **Understand first** - Read `AGENTS.MD` and related prompts
2. **Leverage tools** - Use npm scripts, validation scripts, MCP servers
3. **Think ontologically** - Separate semantic from visual
4. **Test thoroughly** - Run `npm test` + validation scripts
5. **Document changes** - Update versions, cross-references, examples

**Quality checklist:**
- [ ] Clear activation triggers
- [ ] Tool declarations complete
- [ ] Validation automated
- [ ] Boundaries defined
- [ ] Cross-references current
- [ ] Tests passing

---

**Applies to**: `.github/**/*.md`, `.github/**/*.prompt.md`, `.github/skills/**/*`  
**Complements**: Other `.github/instructions/*.instructions.md` files  
**Tool Integration**: npm scripts, bash validation, MCP servers, linters
