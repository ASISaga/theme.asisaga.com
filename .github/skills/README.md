# Agent Skills for Genesis Semantic Design System v2.1

**Version**: 2.1.0 - Integrated Validation & Automation  
**Last Updated**: 2026-01-19  
**Status**: Production Ready with Automated Testing

This directory contains Agent Skills for the Genesis Semantic Design System - a living genome architecture that manages the ontological evolution of the ASI Saga theme repository.

## 🚀 What's New in v2.1

- ✅ **Automated validation scripts** in each skill
- ✅ **Integrated lint/sass testing** workflows
- ✅ **Comprehensive reference guides** in references/
- ✅ **Ready for CI/CD** with pre-built automation
- ✅ **Enhanced cross-references** between all documentation

## What are Agent Skills?

Agent Skills are structured, reusable capabilities that AI agents can use to perform specific tasks. Each skill follows the [Agent Skills specification](https://agentskills.io) format with:

- **SKILL.md** - Required file with YAML frontmatter and instructions
- **scripts/** - **NEW** Automation and validation scripts
- **references/** - **NEW** Detailed specifications and guides
- **assets/** - **NEW** Visual examples and templates (ready for future use)

## Available Skills

### 1. theme-genome-agent

**Role**: Ontological Gatekeeper and Evolution Manager

Manages the evolutionary growth of the Genesis Semantic Design System by reviewing ontological propositions from subdomains, ensuring semantic purity, and maintaining the three-tier architecture.

**Use when**: Reviewing PRs with `ontological-proposition` label, evaluating new variant requests, or managing design system evolution.

**NEW Automation**:
```bash
# Validate ontology changes
./.github/skills/theme-genome-agent/scripts/validate-ontology.sh
```

### 2. subdomain-evolution-agent

**Role**: Ontological Proposition Creator

Identifies semantic gaps in the design system and creates well-formed propositions for new ontological variants based on real-world usage patterns.

**Use when**: Subdomain development reveals missing semantic patterns, or repeatedly combining mixins in the same way.

### 3. scss-refactor-agent

**Role**: Ontology Migration Expert

Converts legacy CSS/SCSS into ontological mixin-based code, ensuring "zero-CSS compliance" where subdomain stylesheets use only Genesis Semantic mixins.

**Use when**: Migrating subdomain from legacy CSS, auditing SCSS for raw CSS violations, or refactoring theme components.

**NEW Automation**:
```bash
# Validate SCSS file for zero-CSS compliance
./.github/skills/scss-refactor-agent/scripts/validate-scss.sh path/to/file.scss
```

**NEW Resources**:
- `references/REFACTORING-GUIDE.md` - Comprehensive refactoring guide

### 4. html-template-agent

**Role**: Semantic Structure and Accessibility Expert

Ensures all HTML follows semantic best practices, uses meaningful content-first class names, and meets WCAG AA accessibility standards.

**Use when**: Creating Jekyll layouts/includes, auditing HTML for accessibility, or implementing semantic class naming.

**NEW Automation**:
```bash
# Validate HTML template
./.github/skills/html-template-agent/scripts/validate-html.sh path/to/template.html
```

### 5. responsive-design-agent

**Role**: Mobile-First Responsive Specialist

Implements mobile-first responsive patterns with proper WCAG 2.5.5 touch targets (44px minimum), fluid typography, and responsive grids.

**Use when**: Implementing responsive layouts, optimizing mobile UX, or ensuring accessibility compliance across viewport sizes.

### 6. futuristic-effects-agent

**Role**: Advanced Visual Effects Specialist

Applies advanced glassmorphism, neon glows, quantum gradients, and consciousness animations while maintaining semantic purity.

**Use when**: Enhancing visual aesthetics, creating immersive experiences, or implementing advanced UI effects from v2.0+ enhancements.

## Skill Organization

Each skill directory now contains:

```
skill-name/
├── SKILL.md                 # Required: Skill definition with frontmatter
├── scripts/                 # NEW: Automation & validation scripts
│   └── validate-*.sh       # Automated testing and validation
├── references/              # NEW: Detailed specifications & guides
│   └── *.md                # Comprehensive reference documentation
└── assets/                  # NEW: Visual examples & templates (ready for use)
```

## Quick Start & Workflows

### For Human Developers

```bash
# 1. Navigate to skills directory
cd .github/skills

# 2. Choose a skill and read SKILL.md
cat scss-refactor-agent/SKILL.md

# 3. Run validation script
./scss-refactor-agent/scripts/validate-scss.sh path/to/file.scss

# 4. Check references for detailed guides
cat scss-refactor-agent/references/REFACTORING-GUIDE.md
```

### Integrated Workflows

**Workflow 1: SCSS Refactoring**
```bash
# Validate SCSS file
./.github/skills/scss-refactor-agent/scripts/validate-scss.sh assets/css/style.scss

# Test compilation
npm run test:scss

# Run linter
npm run lint:scss
```

**Workflow 2: HTML Validation**
```bash
# Validate HTML template
./.github/skills/html-template-agent/scripts/validate-html.sh _layouts/default.html
```

**Workflow 3: Ontology Changes**
```bash
# Validate ontology system
./.github/skills/theme-genome-agent/scripts/validate-ontology.sh

# Test all changes
npm test
```

## Using Skills

### For AI Agents

Skills are designed to be loaded by AI agents when needed:

1. **Discovery**: Agent reads skill metadata (name, description) to identify relevant skills
2. **Activation**: When task matches, agent loads full SKILL.md content
3. **Execution**: Agent follows instructions and best practices in the skill
4. **Resources**: Agent loads additional files (scripts, references) as needed

### For Human Developers

Skills serve as comprehensive guides for working with the Genesis Semantic Design System:

- Read SKILL.md files to understand agent workflows
- Use as reference for ontological principles and patterns
- Follow examples and best practices
- Understand the decision-making process behind design system evolution

## Ontological Categories Reference

The Genesis Semantic Design System has 6 ontological categories with 31+ variants:

1. **Environment** (8 variants) - Spatial logic and layout patterns
2. **Entity** (8 variants) - Visual presence and glassmorphism
3. **Cognition** (6 variants) - Typography based on semantic meaning
4. **Synapse** (6 variants) - User interactions and navigation
5. **State** (6 variants) - Temporal conditions and system status
6. **Atmosphere** (7 variants) - Sensory texture and emotional tone

See `_sass/ontology/INTEGRATION-GUIDE.md` for complete variant reference.

## Design System Architecture

The Genesis Semantic Design System uses a three-tier architecture:

**Tier 1: Content (HTML)**
- Defines WHAT the data is
- Semantic HTML5 with meaningful class names
- Lives in subdomain repositories

**Tier 2: Interface (Ontological Mixins)**
- Defines the ROLE of content
- Agnostic semantic mixins (no CSS properties)
- Lives in `_sass/ontology/_interface.scss`

**Tier 3: Engine (Visual Implementation)**
- Defines the LOOK (OKLCH, Bento, Glassmorphism)
- The ONLY place for raw CSS properties
- Lives in `_sass/ontology/_engines.scss`

## Evolutionary Process

The design system grows through an **Ontological Proposition** process:

1. **Subdomain identifies gap** (subdomain-evolution-agent)
2. **Creates well-formed PR** with semantic justification
3. **Theme reviews proposal** (theme-genome-agent)
4. **Implements if approved** in engine layer
5. **Documents in GENOME.md** with PR origin
6. **Subdomain adopts** new variant

This creates a **living genome** where the design system evolves based on real usage patterns.

## Key Resources

- **AGENTS.MD** - Complete agent ecosystem architecture
- **GENOME.md** - Evolutionary history and variant registry
- **agent-skill-spec.md** - Agent Skills format specification
- **_sass/ontology/INTEGRATION-GUIDE.md** - Complete ontological API reference
- **.github/instructions/** - SCSS, HTML, and JS coding standards
- **.github/prompts/** - Detailed agent prompts

## Validation

All skills in this directory comply with the Agent Skills specification:

✅ Required YAML frontmatter (name, description)  
✅ Name: 1-64 characters, lowercase + hyphens only  
✅ Description: 1-1024 characters with clear purpose  
✅ Directory name matches skill name  
✅ MIT license specified  
✅ Metadata includes author, version, category, role

## Contributing

When adding new skills:

1. Follow the agent-skill-spec.md format strictly
2. Ensure semantic alignment with Genesis ontology
3. Document relationship to existing skills
4. Test with actual agent implementations
5. Update this README with new skill description

## Version

**Skills Version**: 2.0  
**Aligned with**: Genesis Semantic Design System v2.0+  
**Last Updated**: 2026-01-19

---

**See also**: [Agent Skills Documentation](https://agentskills.io) for the complete specification and best practices.
