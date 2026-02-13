---
applyTo: ".github/skills/theme-genome-agent/**,.github/skills/subdomain-evolution-agent/**,.github/prompts/theme-genome-agent.prompt.md,.github/prompts/subdomain-evolution-agent.prompt.md,_sass/ontology/**,GENOME.md"
description: "Theme repository specific patterns: Ontological Proposition System, subdomain intelligence, theme-specific workflows"
---

# Theme-Specific Agent Instructions

**Repository-specific patterns for Genesis Ontological Design System theme**

This file contains instructions specific to the `theme.asisaga.com` repository that should NOT be copied to other repositories using the generic agent intelligence system.

## Repository Context

This is the **Genesis Ontological Design System theme repository** that:
- Provides foundational SCSS design system via Jekyll `remote_theme`
- Powers multiple subdomain content repositories
- Maintains reference agent intelligence in `.github/subdomain/`
- Implements Ontological Proposition System for design system evolution

## Theme-Specific Directory Structure

```
.github/
├── agents/           # Internal coordination (protected)
├── instructions/     # Coding standards
│   ├── github-agent-system.instructions.md  # Generic (copy to other repos)
│   ├── theme-specific.instructions.md       # This file (theme only)
│   ├── scss.instructions.md                 # Generic + theme patterns
│   ├── html.instructions.md                 # Generic + theme patterns
│   ├── js.instructions.md                   # Generic + theme patterns
│   └── docs.instructions.md                 # Generic patterns
├── prompts/          # Agent workflows
├── skills/           # Executable capabilities
└── subdomain/        # 📦 Reference intelligence for subdomain repos
    ├── agents/
    ├── instructions/
    ├── prompts/
    ├── skills/
    └── copilot-instructions.md
```

## Subdomain Intelligence System

**Unique to this theme repository:**

The `.github/subdomain/` directory contains a **reference GitHub Copilot coding agent intelligence system** that subdomain repositories copy into their `.github/`.

**Purpose:**
- Provide ready-to-use agent intelligence for content repositories
- Maintain consistency across subdomain projects
- Enable content authors to use AI agents effectively
- Separate theme development from content authoring concerns

**Structure:**
```
.github/subdomain/
├── README.md                    # Setup guide for subdomains
├── copilot-instructions.md      # Subdomain context (not theme)
├── agents/                      # Subdomain-specific agents
│   ├── content-author.agent.md
│   ├── content-qa.agent.md
│   └── semantic-html.agent.md
├── instructions/
│   ├── content.instructions.md  # HTML content patterns
│   ├── scss.instructions.md     # Subdomain SCSS (ontology-only)
│   └── js.instructions.md       # Subdomain JavaScript
├── prompts/
│   └── content-author.prompt.md
├── skills/
│   ├── content-author/
│   ├── content-qa/
│   └── semantic-html/
├── package.json                 # npm scripts for subdomains
├── .stylelintrc.yml            # Subdomain linting config
└── .gitignore                   # Subdomain patterns
```

**Key differences from theme:**
- **No design system work** - Only ontology mixin usage
- **Content focus** - HTML pages, semantic structure
- **No layouts/includes** - Provided by theme via `remote_theme`
- **Simplified tooling** - Just SCSS compilation and linting

**Subdomain setup:**
```bash
# From subdomain repository root
cp -r /path/to/theme/.github/subdomain/* .github/
npm install
npm test  # Verify setup
```

→ **Complete guide**: `.github/subdomain/README.md`

## Ontological Proposition System

**Theme-specific evolutionary mechanism for design system:**

When subdomain developers encounter use cases not expressible with existing ontological variants, they can propose new variants through a formal process.

### Workflow

1. **Subdomain Evolution Agent** identifies semantic gap
   - Reviews existing 31 variants
   - Confirms gap can't be solved by combination
   - Creates Ontological Proposition PR

2. **Theme Genome Agent** reviews proposition
   - **Semantic purity**: Named by WHAT, not HOW
   - **No redundancy**: Doesn't overlap existing variants
   - **Universal applicability**: Useful beyond one use case

3. **If approved**, implement in theme
   - Add variant to `_sass/ontology/`
   - Update `GENOME.md` with variant history
   - Document in `/docs/specifications/scss-ontology-system.md`
   - Update subdomain intelligence with new variant

4. **Update subdomains**
   - Notify subdomain repos of new variant
   - Update examples and documentation

### Proposition Template

→ **Template**: `.github/PULL_REQUEST_TEMPLATE/ontological_proposition.md`

**Required information:**
- Semantic intent (WHAT it represents)
- Use cases from subdomain (real examples)
- Why existing variants insufficient
- Proposed implementation (SCSS)
- Documentation updates

### Validation Criteria

**Semantic Purity:**
- ✅ Named by purpose: `'chronicle'`, `'ephemeral'`, `'resonant'`
- ❌ Named by appearance: `'blue-glossy'`, `'rounded-shadow'`

**Non-Redundancy:**
- ✅ Fills genuine gap in ontology
- ❌ Overlaps existing variants or combinations

**Universal Applicability:**
- ✅ Useful across multiple contexts/subdomains
- ❌ Solves only one specific use case

### Theme Genome Agent Responsibilities

- Review Ontological Propositions
- Maintain semantic purity of design system
- Update `GENOME.md` with evolution history
- Coordinate with subdomain repositories
- Ensure backward compatibility

→ **Agent prompt**: `.github/prompts/theme-genome-agent.prompt.md`  
→ **Agent skill**: `.github/skills/theme-genome-agent/SKILL.md`

## Theme-Specific npm Scripts

**Beyond standard npm test/lint:**

```bash
# SCSS compilation and linting
npm test              # Run all tests (compilation + lint)
npm run test:scss     # Sass compilation check
npm run lint:scss     # Stylelint validation
npm run lint:scss:fix # Auto-fix style issues

# E2E testing (Playwright)
npm run test:e2e        # Test live site
npm run test:e2e:local  # Test local Jekyll server
```

**Used by agents:**
- `scss-refactor-agent` → `npm run test:scss`, `npm run lint:scss`
- `theme-genome-agent` → `npm test`
- `html-template-agent` → `npm run test:e2e:local`

## Theme-Specific Validation Scripts

**Located in skill scripts directories:**

```bash
# Ontology validation
./.github/skills/theme-genome-agent/scripts/validate-ontology.sh

# SCSS refactoring validation
./.github/skills/scss-refactor-agent/scripts/validate-scss.sh

# HTML template validation
./.github/skills/html-template-agent/scripts/validate-html.sh
```

**Integration pattern:**
```bash
# In agent workflow
npm run test:scss
./.github/skills/theme-genome-agent/scripts/validate-ontology.sh _sass/ontology/
```

## Theme Documentation References

**Theme-specific documentation:**

- `/docs/specifications/scss-ontology-system.md` - Complete ontology (31 variants)
- `/docs/specifications/architecture.md` - Theme architecture
- `_sass/ontology/INTEGRATION-GUIDE.md` - Ontology API
- `_sass/ontology/Readme.md` - Three-tier architecture
- `GENOME.md` - Variant evolution history

**Agent ecosystem:**
- `.github/AGENTS.MD` - Complete ecosystem (~600 lines)
- `.github/AGENT-INDEX.md` - Navigation (~400 lines)
- `.github/AGENT-QUICK-REFERENCE.md` - Quick ref
- `.github/AGENT-WORKFLOWS.md` - Integrated workflows
- `.github/DOGFOODING-GUIDE.md` - Self-improvement process

**Subdomain reference:**
- `.github/subdomain/README.md` - Subdomain setup guide
- `.github/subdomain/copilot-instructions.md` - Subdomain context

## Theme vs Subdomain Responsibilities

**Theme provides (this repository):**
- All Jekyll layouts (`_layouts/`)
- All Jekyll includes (`_includes/`)
- Complete SCSS system (`_sass/`)
- Shared JavaScript (`assets/js/common.js`)
- Ontological design system (`_sass/ontology/`)
- Agent intelligence for both theme and subdomains

**Subdomains provide:**
- HTML content pages only (NO Markdown)
- Optional page-specific SCSS (`_sass/main.scss`, ontology-only)
- Mandatory subdomain JavaScript (`assets/js/script.js`)
- NO layouts, includes, or theme SCSS

**Build process:**
- Subdomain uses `remote_theme: ASISaga/theme.asisaga.com`
- Jekyll merges theme's `assets/css/style.scss` with subdomain's `_sass/main.scss`
- Theme layouts load `common.js`, then subdomain's `script.js`

## Theme-Specific Agent Categories

**Categories specific to this repository:**

- `design-system` - Ontological and styling work
- `semantic-structure` - HTML and accessibility
- `meta-intelligence` - Agent evolution
- `testing` - Quality assurance
- `documentation` - Content and guides

**Not typically needed in generic repos:**
- `design-system` (unless they have a design system)
- Specific role names tied to ontology

## Integration with Generic System

**What to copy to other repositories:**
- `.github/instructions/github-agent-system.instructions.md` (generic framework)
- Generic patterns from other instruction files
- Agent/prompt/skill templates

**What NOT to copy to other repositories:**
- This file (`theme-specific.instructions.md`)
- Ontological Proposition System
- Subdomain intelligence references
- Theme-specific npm scripts (unless applicable)
- Theme-specific validation scripts

## Related Instructions

**Generic framework:**
→ `.github/instructions/github-agent-system.instructions.md` - Reusable across repos

**Other theme instruction files** (contain both generic and theme-specific):
→ `.github/instructions/scss.instructions.md` - SCSS with ontology system  
→ `.github/instructions/html.instructions.md` - HTML with theme architecture  
→ `.github/instructions/js.instructions.md` - JavaScript with Motion library  
→ `.github/instructions/docs.instructions.md` - Generic documentation patterns

---

**Applies to**: Theme-specific agents, ontology work, subdomain coordination  
**Version**: 1.0.0 - Extracted from github.instructions.md v1.5  
**Last Updated**: 2026-02-13  
**For**: Genesis Ontological Design System theme repository ONLY
