# 🚀 Agent Ecosystem - Supercharged v2.3.1

**Version**: 2.3.1 - Added Protected Agents Directory  
**Last Updated**: 2026-02-10  
**Status**: Production Ready with Continuous Evolution

---

## 🎯 Quick Navigation

| Component | Purpose | Location |
|-----------|---------|----------|
| **Skills** | Executable agent capabilities | `.github/skills/` |
| **Prompts** | Detailed agent instructions | `.github/prompts/` |
| **Instructions** | Coding standards & guidelines | `.github/instructions/` |
| **Agents** | 🔒 Internal configurations (protected) | `.github/agents/` |
| **Validation** | Automated testing scripts | `.github/skills/*/scripts/` |
| **References** | Detailed specifications | `.github/skills/*/references/` |
| **Patterns** | Ready-to-use component & layout patterns | `.github/skills/*/references/` |
| **🆕 Self-Learning** | Meta-agent evolution system | `.github/skills/agent-evolution-agent/` |
| **🆕 Dogfooding Guide** | Agent self-improvement workflows | `.github/DOGFOODING-GUIDE.md` |

---

## 🆕 Meta-Intelligence Layer

### Agent Evolution Agent (v2.3)
**Skill**: `.github/skills/agent-evolution-agent/`  
**Documentation**: 
- `.github/DOGFOODING-GUIDE.md` - Complete workflows
- `.github/skills/agent-evolution-agent/scripts/README.md` - Script documentation

**Validation Scripts (7 total)**: 
- `scripts/audit-agent-quality.sh` - Quality metrics audit
- `scripts/find-related-agents.sh` - Find agents for a spec
- `scripts/measure-context-efficiency.sh` - Context analysis
- `scripts/sync-agents-with-specs.sh` - Spec synchronization
- `scripts/detect-duplication.sh` - **NEW** Duplication detection
- `scripts/recommend-improvements.sh` - **NEW** Improvement recommendations
- `scripts/track-metrics.sh` - **NEW** Metrics tracking over time

**Capabilities**:
- ✅ Audits agent quality and spec coverage
- ✅ Identifies agents needing spec references
- ✅ Measures context window efficiency
- ✅ Syncs agents with specification changes
- ✅ **NEW**: Detects duplicate content across agents
- ✅ **NEW**: Generates actionable improvement recommendations
- ✅ **NEW**: Tracks quality metrics over time with trend analysis
- ✅ **Dogfooding**: Uses its own principles to improve itself

**Quick Start**:
```bash
# Weekly quality workflow
./.github/skills/agent-evolution-agent/scripts/audit-agent-quality.sh
./.github/skills/agent-evolution-agent/scripts/track-metrics.sh
./.github/skills/agent-evolution-agent/scripts/detect-duplication.sh
./.github/skills/agent-evolution-agent/scripts/recommend-improvements.sh

# View historical trends
./.github/skills/agent-evolution-agent/scripts/track-metrics.sh --history

# Sync all agents with specs
./.github/skills/agent-evolution-agent/scripts/sync-agents-with-specs.sh
```

**Metrics** (as of 2026-02-10):
- Average Spec Coverage: **80%** (was 23%)
- Optimal Agents: **9/18 (50%)** (was 4/18)
- Total Spec References Added: **40+**

---

## 🧬 Core Agent System

### Evolutionary Management

#### Theme Genome Agent
**Skill**: `.github/skills/theme-genome-agent/`  
**Prompt**: `.github/prompts/theme-genome-agent.prompt.md`  
**Validation**: `scripts/validate-ontology.sh`

**Capabilities**:
- ✅ Reviews ontological propositions
- ✅ Validates engine layer changes
- ✅ Maintains GENOME.md
- ✅ Auto-checks ontological purity

**Quick Start**:
```bash
# Validate ontology changes
./.github/skills/theme-genome-agent/scripts/validate-ontology.sh
```

#### Subdomain Evolution Agent
**Skill**: `.github/skills/subdomain-evolution-agent/`  
**Prompt**: `.github/prompts/subdomain-evolution-agent.prompt.md`

**Capabilities**:
- ✅ Identifies semantic gaps
- ✅ Creates ontological propositions
- ✅ Submits well-formed PRs
- ✅ Analyzes variant coverage

---

### Implementation Specialists

#### SCSS Refactor Agent
**Skill**: `.github/skills/scss-refactor-agent/`  
**Prompt**: `.github/prompts/scss-refactor-agent.prompt.md`  
**Instructions**: `.github/instructions/scss.instructions.md`  
**Validation**: `scripts/validate-scss.sh`

**Capabilities**:
- ✅ Enforces zero-CSS compliance
- ✅ Validates ontological mixin usage
- ✅ Tests SCSS compilation
- ✅ Runs stylelint checks

**Quick Start**:
```bash
# Validate SCSS file
./.github/skills/scss-refactor-agent/scripts/validate-scss.sh path/to/file.scss

# Run all SCSS tests
npm run test:scss
npm run lint:scss
```

#### HTML Template Agent
**Skill**: `.github/skills/html-template-agent/`  
**Instructions**: `.github/instructions/html.instructions.md`  
**Validation**: `scripts/validate-html.sh`

**Capabilities**:
- ✅ Validates semantic HTML structure
- ✅ Checks WCAG accessibility
- ✅ Verifies landmark elements
- ✅ Ensures BEM naming
- ✅ **NEW** 850+ lines of ready-to-use component patterns

**Pattern Catalog** (v2.1.1):
- Navigation (primary nav, breadcrumbs, tabs)
- Hero sections, cards, forms, modals
- Data display, interactive elements
- Complete HTML + ontological SCSS examples

**Quick Start**:
```bash
# Validate HTML template
./.github/skills/html-template-agent/scripts/validate-html.sh path/to/template.html

# Browse patterns
cat ./.github/skills/html-template-agent/references/COMPONENT-PATTERNS.md
```

#### Responsive Design Agent
**Skill**: `.github/skills/responsive-design-agent/`  
**Prompt**: `.github/prompts/responsive-design-agent.prompt.md`

**Capabilities**:
- ✅ Implements mobile-first patterns
- ✅ Validates touch targets (44px)
- ✅ Ensures fluid typography
- ✅ Tests responsive breakpoints
- ✅ **NEW** 750+ lines of production-ready layout patterns

**Layout Catalog** (v2.1.0):
- Grid layouts (auto-responsive, masonry, hybrid)
- Content layouts (article, split, sidebar)
- Navigation layouts (responsive, sticky)
- Dashboard, media, and form layouts
- Performance optimization patterns

**Quick Start**:
```bash
# Browse layout patterns
cat ./.github/skills/responsive-design-agent/references/LAYOUT-PATTERNS.md
```

#### Futuristic Effects Agent
**Skill**: `.github/skills/futuristic-effects-agent/`  
**Prompt**: `.github/prompts/futuristic-effects-agent.prompt.md`

**Capabilities**:
- ✅ Applies glassmorphism effects
- ✅ Implements neon glows
- ✅ Creates quantum gradients
- ✅ Adds consciousness animations

#### Documentation Manager Agent
**Skill**: `.github/skills/documentation-manager-agent/`  
**Instructions**: `.github/instructions/docs.instructions.md`  
**Validation**: 4 automated validation scripts

**Capabilities**:
- ✅ Validates documentation structure
- ✅ Checks internal links and references
- ✅ Detects redundant documentation
- ✅ Validates version metadata
- ✅ Enforces archival workflows

**Quick Start**:
```bash
# Validate overall structure
./.github/skills/documentation-manager-agent/scripts/validate-doc-structure.sh

# Check links in docs
./.github/skills/documentation-manager-agent/scripts/validate-doc-links.sh docs/

# Detect redundancy
./.github/skills/documentation-manager-agent/scripts/detect-doc-redundancy.sh

# Validate metadata
./.github/skills/documentation-manager-agent/scripts/check-doc-metadata.sh docs/specifications/
```

---

## 🔄 Integrated Workflows

### Workflow 1: New Feature Development

```bash
# 1. Create semantic HTML
./.github/skills/html-template-agent/scripts/validate-html.sh new-feature.html

# 2. Map to ontological SCSS
./.github/skills/scss-refactor-agent/scripts/validate-scss.sh new-feature.scss

# 3. Validate responsive design
npm run test:scss

# 4. Check all styles
npm test
```

### Workflow 2: Ontological Evolution

```bash
# 1. Validate current ontology
./.github/skills/theme-genome-agent/scripts/validate-ontology.sh

# 2. Make engine layer changes
# (edit _sass/ontology/_engines.scss)

# 3. Validate changes
npm run test:scss

# 4. Update documentation
# (update GENOME.md, INTEGRATION-GUIDE.md)
```

### Workflow 3: Legacy Migration

```bash
# 1. Audit existing HTML
./.github/skills/html-template-agent/scripts/validate-html.sh old-template.html

# 2. Refactor SCSS to ontology
./.github/skills/scss-refactor-agent/scripts/validate-scss.sh old-styles.scss

# 3. Test compilation
npm run test:scss

# 4. Lint for quality
npm run lint:scss
```

### Workflow 4: Documentation Quality Control

```bash
# 1. Check documentation structure
./.github/skills/documentation-manager-agent/scripts/validate-doc-structure.sh

# 2. Validate links
./.github/skills/documentation-manager-agent/scripts/validate-doc-links.sh docs/

# 3. Check for redundancy
./.github/skills/documentation-manager-agent/scripts/detect-doc-redundancy.sh

# 4. Validate metadata
./.github/skills/documentation-manager-agent/scripts/check-doc-metadata.sh docs/specifications/
```

---

## 🛠️ Automation Scripts

All skills now include automated validation scripts:

| Skill | Script | Purpose |
|-------|--------|---------|
| theme-genome-agent | `validate-ontology.sh` | Check engine layer & ontological purity |
| scss-refactor-agent | `validate-scss.sh` | Zero-CSS compliance & mixin usage |
| html-template-agent | `validate-html.sh` | Semantic structure & accessibility |
| documentation-manager-agent | `validate-doc-structure.sh` | Check documentation organization |
| documentation-manager-agent | `validate-doc-links.sh` | Verify internal links |
| documentation-manager-agent | `detect-doc-redundancy.sh` | Find duplicate content |
| documentation-manager-agent | `check-doc-metadata.sh` | Validate version metadata |

**Global Commands**:
```bash
# Run all SCSS tests
npm test

# Test compilation only
npm run test:scss

# Lint SCSS
npm run lint:scss

# Auto-fix lint issues
npm run lint:scss:fix
```

---

## 📚 Documentation Hierarchy

```
.github/
├── AGENT-INDEX.md (this file) - Quick navigation
├── AGENTS.MD - Detailed ecosystem architecture
├── AGENT-QUICK-REFERENCE.md - Ontology cheat sheet
├── AGENT-WORKFLOWS.md - Workflow examples
├── DOGFOODING-GUIDE.md - Self-improvement workflows
│
├── agents/ - 🔒 Internal configurations (protected)
│   └── README.md - Purpose and access restrictions
│
├── skills/ - Executable agent capabilities
│   ├── {agent-name}/
│   │   ├── SKILL.md - Agent skill definition
│   │   ├── scripts/ - Validation & automation
│   │   ├── references/ - Detailed specifications
│   │   └── assets/ - Visual examples & templates
│   └── README.md - Skills overview
│
├── prompts/ - Detailed agent instructions
│   └── {agent-name}.prompt.md
│
└── instructions/ - Coding standards
    ├── scss.instructions.md
    ├── html.instructions.md
    ├── js.instructions.md
    ├── docs.instructions.md
    └── github.instructions.md
```

---

## 🎓 Learning Path

### For New Contributors

1. **Start here**: Read this AGENT-INDEX.md
2. **Learn ontology**: `.github/AGENT-QUICK-REFERENCE.md`
3. **Understand architecture**: `.github/AGENTS.MD`
4. **Pick a skill**: Browse `.github/skills/README.md`
5. **Run validation**: Test scripts in `skills/*/scripts/`

### For AI Agents

1. **Load skill**: Read `.github/skills/{agent-name}/SKILL.md`
2. **Check prompt**: Reference `.github/prompts/{agent-name}.prompt.md`
3. **Follow instructions**: Use `.github/instructions/*.instructions.md`
4. **Validate work**: Run `scripts/validate-*.sh`

### For Theme Maintainers

1. **Review PRs**: Use theme-genome-agent skill
2. **Validate changes**: Run ontology validation script
3. **Update docs**: Maintain GENOME.md
4. **Test thoroughly**: `npm test` before merge

---

## 🚀 What's New in v2.1.1

### Enhanced Pattern Catalogs

- ✅ **Component Patterns Catalog** (850+ lines) - html-template-agent
  - 8 comprehensive categories with ready-to-use semantic HTML
  - Navigation, hero sections, cards, forms, modals, data display
  - Each pattern includes HTML structure + ontological SCSS
  - ARIA attributes and accessibility built-in

- ✅ **Layout Patterns Catalog** (750+ lines) - responsive-design-agent
  - 7 layout categories for production-ready responsive designs
  - Grids, content layouts, navigation, dashboards, media, forms
  - Mobile-first patterns with container queries
  - Performance optimization techniques included

- ✅ **Enhanced Skill Descriptions**
  - Pattern-specific keywords for better agent discovery
  - More detailed use cases and examples
  - Cross-references between related patterns

### Quick Access
```bash
# Component patterns (HTML)
cat ./.github/skills/html-template-agent/references/COMPONENT-PATTERNS.md

# Layout patterns (Responsive)
cat ./.github/skills/responsive-design-agent/references/LAYOUT-PATTERNS.md
```

---

## What's New in v2.1.0

### Integrated Validation System

- ✅ **Automated scripts** in all skills
- ✅ **SCSS compilation testing** integrated
- ✅ **Stylelint checks** automated
- ✅ **HTML accessibility validation** added
- ✅ **Ontological purity checks** enforced

### Enhanced Skill Structure

- ✅ **scripts/** directories with automation tools
- ✅ **references/** for detailed specifications
- ✅ **assets/** ready for visual examples
- ✅ **Cross-referenced** documentation

### Streamlined Workflows

- ✅ **Single command** validation
- ✅ **Pre-commit ready** scripts
- ✅ **CI/CD compatible** automation
- ✅ **Developer-friendly** error messages

---

## 🔗 Key Resources

- **Ontology Guide**: `_sass/ontology/INTEGRATION-GUIDE.md`
- **Evolution History**: `GENOME.md`
- **Agent Skills Spec**: `agent-skill-spec.md`
- **Implementation Summary**: `AGENT-SKILLS-IMPLEMENTATION.md`

---

## 📊 System Health

Run these commands to check ecosystem health:

```bash
# 1. Test all SCSS compilation
npm run test:scss

# 2. Run all linting
npm run lint:scss

# 3. Validate ontology
./.github/skills/theme-genome-agent/scripts/validate-ontology.sh

# 4. Full test suite
npm test
```

**Expected Results**:
- ✅ SCSS compilation: Success (with deprecation warnings)
- ✅ Stylelint: Pass or warnings only
- ✅ Ontology validation: All checks pass
- ✅ Overall: Green across all tests

---

## 💡 Tips & Tricks

### For Fast Iteration

```bash
# Watch mode for SCSS changes (if configured)
npm run test:scss -- --watch

# Fix lint issues automatically
npm run lint:scss:fix

# Test specific file
./.github/skills/scss-refactor-agent/scripts/validate-scss.sh path/to/file.scss
```

### For CI/CD Integration

```bash
# Single test command (use in GitHub Actions)
npm test

# Verbose output for debugging
npm run test:scss:verbose
npm run lint:scss:report
```

### For Development

```bash
# Before committing
npm test
./.github/skills/theme-genome-agent/scripts/validate-ontology.sh

# After making SCSS changes
npm run test:scss && npm run lint:scss

# After HTML changes
./.github/skills/html-template-agent/scripts/validate-html.sh _layouts/default.html
```

---

**Version**: 2.1.1 - Enhanced Pattern Catalogs  
**Maintained by**: Theme Genome Agent + Human Developers  
**Last Review**: 2026-01-29

**Status**: 🟢 Production Ready with Comprehensive Pattern Libraries

**New in v2.1.1**: 1,600+ lines of production-ready component and layout patterns
