# Agent Skills Validation Scripts

This document provides a quick reference for all validation scripts available in the agent skills ecosystem.

## Quick Reference

| Skill | Script | Usage | Purpose |
|-------|--------|-------|---------|
| theme-genome-agent | validate-ontology.sh | `./.github/skills/theme-genome-agent/scripts/validate-ontology.sh` | Validates engine layer, GENOME.md, and ontological purity |
| subdomain-evolution-agent | validate-proposition.sh | `./.github/skills/subdomain-evolution-agent/scripts/validate-proposition.sh <file>` | Validates ontological propositions before submission |
| scss-refactor-agent | validate-scss.sh | `./.github/skills/scss-refactor-agent/scripts/validate-scss.sh <file>` | Validates zero-CSS compliance and ontological usage |
| html-template-agent | validate-html.sh | `./.github/skills/html-template-agent/scripts/validate-html.sh <file>` | Validates semantic HTML and accessibility |
| responsive-design-agent | validate-responsive.sh | `./.github/skills/responsive-design-agent/scripts/validate-responsive.sh <file>` | Validates WCAG 2.5.5 compliance and mobile-first patterns |
| futuristic-effects-agent | validate-effects.sh | `./.github/skills/futuristic-effects-agent/scripts/validate-effects.sh <file>` | Validates effects accessibility and performance |

## Usage Examples

### 1. Validate Ontology System (Theme Repository)

```bash
./.github/skills/theme-genome-agent/scripts/validate-ontology.sh
```

**Checks:**
- Engine layer SCSS compilation
- GENOME.md documentation currency
- Interface layer ontological purity (zero CSS properties)

### 2. Validate Ontological Proposition

```bash
./.github/skills/subdomain-evolution-agent/scripts/validate-proposition.sh PROPOSITION.md
```

**Checks:**
- Semantic intent vs visual preference
- Gap analysis completeness
- Universal applicability
- PR format and metadata
- Mixin naming conventions

### 3. Validate SCSS File

```bash
./.github/skills/scss-refactor-agent/scripts/validate-scss.sh assets/css/style.scss
```

**Checks:**
- SCSS compilation success
- Stylelint compliance
- Zero-CSS compliance (no raw CSS properties)
- Ontological mixin usage

### 4. Validate HTML Template

```bash
./.github/skills/html-template-agent/scripts/validate-html.sh _layouts/default.html
```

**Checks:**
- Semantic HTML structure (skip links, landmarks)
- Accessibility compliance (alt attributes, labels)
- No inline styles
- Meaningful class names

### 5. Validate Responsive Design

```bash
./.github/skills/responsive-design-agent/scripts/validate-responsive.sh assets/css/style.scss
```

**Checks:**
- Touch target compliance (44x44px minimum)
- Fluid typography (16px minimum)
- Mobile-first approach (no max-width queries)
- Responsive grids (auto-fit patterns)
- Accessibility media queries (reduced-motion, high-contrast)
- Viewport units (dvh, safe-area-inset)

### 6. Validate Visual Effects

```bash
./.github/skills/futuristic-effects-agent/scripts/validate-effects.sh assets/css/style.scss
```

**Checks:**
- Semantic foundation (effects on ontological structure)
- Performance considerations (blur values, glow count)
- Accessibility (reduced-motion, high-contrast support)

## Integrated Workflows

### Before Committing Changes

```bash
# 1. Test SCSS compilation
npm run test:scss

# 2. Run linter
npm run lint:scss

# 3. Validate specific file
./.github/skills/scss-refactor-agent/scripts/validate-scss.sh assets/css/style.scss

# 4. If responsive changes
./.github/skills/responsive-design-agent/scripts/validate-responsive.sh assets/css/style.scss

# 5. If effects added
./.github/skills/futuristic-effects-agent/scripts/validate-effects.sh assets/css/style.scss
```

### Before Submitting Proposition PR

```bash
# 1. Create PROPOSITION.md in your subdomain
# 2. Validate proposition
./.github/skills/subdomain-evolution-agent/scripts/validate-proposition.sh PROPOSITION.md

# 3. Address any warnings
# 4. Submit PR to theme repository with ontological-proposition label
```

### Theme Repository Workflow

```bash
# 1. Validate ontology system
./.github/skills/theme-genome-agent/scripts/validate-ontology.sh

# 2. Test all changes
npm test

# 3. Commit if all validations pass
```

## Exit Codes

All scripts follow standard exit code conventions:

- `0` - Success (all validations passed)
- `1` - Failure (validation errors or warnings)

Use in CI/CD:

```bash
if ./.github/skills/scss-refactor-agent/scripts/validate-scss.sh assets/css/style.scss; then
  echo "Validation passed"
else
  echo "Validation failed"
  exit 1
fi
```

## Prerequisites

All scripts require:
- Node.js and npm installed
- Dependencies installed (`npm install`)
- Valid repository structure

## Troubleshooting

### Script Not Executable

```bash
chmod +x ./.github/skills/*/scripts/*.sh
```

### npm Dependencies Missing

```bash
npm install
```

### Sass Compilation Fails

```bash
# Install Sass if missing
npm install -g sass

# Or use local version
npm run test:scss
```

## Resources

- **README.md** - Complete agent skills overview
- **SKILL.md** - Individual skill instructions
- **references/*.md** - Comprehensive reference guides

---

**Version**: 2.1  
**Last Updated**: 2026-01-19  
**Maintained by**: Agent Skills Ecosystem
