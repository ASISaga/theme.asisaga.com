# GitHub Copilot Instructions Directory

This directory contains path-activated instruction files that GitHub Copilot automatically loads based on the files you're editing.

## Structure Overview

### Generic Framework (Reusable)

**`github-agent-system.instructions.md`** (16KB, MIT Licensed)
- Complete reusable framework for GitHub Copilot agent intelligence
- Ouroboros & dogfooding philosophy
- Five-pillar structure (agents, instructions, prompts, skills)
- Agent/prompt/skill templates
- Validation workflows and tool integration
- Context window optimization strategies
- Repository adaptation guide

**Copy this file to any repository** to establish a best-practice Copilot agent ecosystem.

### Repository-Specific

**`theme-specific.instructions.md`** (10KB, Theme Only)
- Genesis Ontological Design System theme patterns
- Ontological Proposition System
- Subdomain intelligence system (`.github/subdomain/`)
- Theme vs subdomain responsibilities
- Theme-specific npm scripts and validation

**DO NOT copy to other repositories** unless implementing similar architecture.

**`github.instructions.md`** (3KB, Navigation Pointer)
- Points to generic framework and theme-specific files
- Helps agents find the right instructions
- Migration guide from v1.5 to v2.0

### Other Instruction Files

These files contain both generic patterns (reusable) and repository-specific content:

- **`scss.instructions.md`** - SCSS patterns + Genesis Ontology system
- **`html.instructions.md`** - HTML/Liquid patterns + theme architecture
- **`js.instructions.md`** - JavaScript patterns + Motion library
- **`docs.instructions.md`** - Generic documentation standards

## How It Works

### Path-Based Activation

Each instruction file has an `applyTo` glob pattern in its frontmatter:

```yaml
---
applyTo: "**/*.scss,_sass/**"
description: "SCSS coding standards"
---
```

When you edit a file matching the pattern, GitHub Copilot automatically loads these instructions into context.

### Context Window Optimization

**Key strategies:**

1. **No Duplication**: Instructions don't repeat `copilot-instructions.md`
2. **Path Specificity**: Only relevant instructions loaded per file
3. **Reference, Don't Inline**: Link to `/docs/specifications/` for details
4. **Lean Content**: Tables, lists, examples over prose

### Navigation Pattern

```
copilot-instructions.md (high-level context)
    ↓
.github/instructions/ (path-specific details)
    ↓
/docs/specifications/ (complete references)
```

## Using in Your Repository

### Option 1: Copy Generic Framework Only

```bash
# Copy the generic template
cp .github/instructions/github-agent-system.instructions.md \
   /your-repo/.github/instructions/

# Adapt to your domain
# - Update npm scripts references
# - Customize categories/roles
# - Add domain-specific examples
```

### Option 2: Full Theme Structure

```bash
# Copy all instruction files
cp -r .github/instructions/ /your-repo/.github/

# Remove theme-specific file
rm /your-repo/.github/instructions/theme-specific.instructions.md

# Adapt remaining files to your domain
```

### Option 3: Start Fresh with Generic Template

1. Create `.github/instructions/` directory
2. Copy `github-agent-system.instructions.md` as your base
3. Create domain-specific instruction files as needed
4. Update `copilot-instructions.md` to reference them

## File Naming Conventions

**Pattern**: `category.instructions.md`

**Examples:**
- `scss.instructions.md` - SCSS/CSS patterns
- `python.instructions.md` - Python patterns
- `api.instructions.md` - API development
- `testing.instructions.md` - Testing practices

**Always use lowercase** for better cross-platform compatibility.

## Frontmatter Requirements

All instruction files must have valid YAML frontmatter:

```yaml
---
applyTo: "glob/pattern/**"
description: "Brief description for agent discovery"
---
```

**`applyTo`**: Glob pattern for file activation
**`description`**: One-line purpose (helps agents discover)

## Best Practices

### DO ✅

- Keep instructions focused and specific
- Reference external docs (`/docs/specifications/`)
- Use tables, lists, and examples
- Update inline (don't create new versions)
- Test glob patterns match intended files

### DON'T ❌

- Duplicate `copilot-instructions.md` content
- Include massive code blocks (reference files instead)
- Create overlapping `applyTo` patterns
- Use generic patterns that always load

## Testing Glob Patterns

Verify your `applyTo` pattern matches intended files:

```bash
# Test pattern matching
shopt -s globstar
echo .github/**/*.md
echo **/*.{scss,sass,css}
```

Or use a glob tester like [globtester.com](https://globtester.com).

## Migration Guide

### From v1.5 (Monolithic)

**Before (v1.5):**
```
.github/instructions/
└── github.instructions.md (all content, 5KB)
```

**After (v2.0):**
```
.github/instructions/
├── github.instructions.md (navigation, 3KB)
├── github-agent-system.instructions.md (generic, 16KB)
└── theme-specific.instructions.md (theme only, 10KB)
```

**Benefits:**
- Generic framework can be copied to other repos
- Theme-specific patterns isolated
- Better context window efficiency
- Clearer separation of concerns

## Documentation

**Complete guidelines:**
- `/docs/specifications/github-copilot-agent-guidelines.md` - Agent development
- `.github/AGENTS.MD` - Ecosystem architecture
- `.github/AGENT-INDEX.md` - Quick navigation

**Related:**
- `.github/prompts/` - Agent task definitions
- `.github/skills/` - Executable capabilities
- `.github/agents/` - Internal coordination

## Version History

**v2.0.0 (2026-02-13):**
- Split into generic framework + theme-specific
- Created `github-agent-system.instructions.md` (reusable)
- Created `theme-specific.instructions.md` (theme only)
- Updated `github.instructions.md` (navigation)
- Added this README

**v1.5 (2026-02-12):**
- Single `github.instructions.md` file
- Mixed generic and theme-specific content

## License

**Generic files** (`github-agent-system.instructions.md`): MIT License - Free to copy and adapt

**Theme-specific files**: For Genesis Ontological Design System theme repository only

**Other files**: Follow repository license

---

**Questions?** See `.github/AGENTS.MD` or `/docs/specifications/github-copilot-agent-guidelines.md`
