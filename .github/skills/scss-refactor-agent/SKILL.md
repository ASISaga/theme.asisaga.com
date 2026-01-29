---
name: scss-refactor-agent
description: Migrate legacy CSS and SCSS to Genesis Ontological mixins. Convert raw CSS properties to semantic ontological patterns, ensure zero-CSS compliance in subdomain files, and maintain the three-tier architecture. Use when refactoring existing stylesheets to adopt the ontology system or auditing subdomain SCSS for semantic purity.
license: MIT
metadata:
  author: ASISaga
  version: "2.1"
  category: design-system
  role: migration-specialist
allowed-tools: Bash(npm:*) Bash(sass:*) Bash(stylelint:*) Read
---

# SCSS Refactor Agent

**Role**: Ontology Migration Expert  
**Scope**: Subdomain SCSS files and legacy component stylesheets  
**Version**: 2.1 - Integrated Validation & Automation

## Purpose

The SCSS Refactor Agent converts legacy CSS/SCSS into ontological mixin-based code. This agent ensures subdomain stylesheets achieve "zero-CSS compliance" - using only Genesis Semantic mixins without any raw CSS properties.

**New in v2.1**: Automated validation scripts, integrated lint/sass testing, comprehensive references.

## When to Use This Skill

Activate when:
- Migrating subdomain stylesheets to ontology
- Auditing for raw CSS violations
- Converting theme components
- Refactoring after new ontological variants are approved
- **NEW**: Running automated validation on SCSS changes

## Golden Rules

**ZERO Raw CSS Properties** - Subdomain SCSS files MUST NOT contain margin, padding, display, color, font-size, or any CSS properties. Only use ontological mixins.

**Mirrored Hierarchy** - SCSS nesting MUST mirror HTML DOM structure exactly.

**Automated Validation** - Always run validation scripts before committing.

## Core Workflow

1. **Intent Analysis**: Classify each CSS rule by semantic intent (Environment, Entity, Cognition, Synapse, State, Atmosphere)
2. **Mirrored Mapping**: Create SCSS structure matching HTML DOM hierarchy
3. **Mixin Selection**: Replace raw CSS with appropriate Genesis mixins
4. **Validation**: Run automated scripts to verify compliance
5. **Testing**: Ensure compilation and lint checks pass

## Quick Example

**Before (Legacy)**:
```scss
.blog-card {
  padding: 2rem;
  background: rgba(26, 26, 46, 0.6);
  backdrop-filter: blur(24px);
  border-radius: 16px;
  
  .card-title {
    font-size: 2rem;
    font-weight: 700;
    color: #ffffff;
  }
}
```

**After (Ontological)**:
```scss
@import "ontology/index";

.blog-card {
  @include genesis-entity('primary');
  
  .card-title {
    @include genesis-cognition('axiom');
  }
}
```

## Automation & Validation

### Validation Script

Run the automated validation script to check zero-CSS compliance:

```bash
# Validate specific SCSS file
./.github/skills/scss-refactor-agent/scripts/validate-scss.sh path/to/file.scss

# The script checks:
# 1. SCSS compilation (npm run test:scss)
# 2. Stylelint compliance (npm run lint:scss)
# 3. Zero-CSS compliance (no raw properties)
# 4. Ontological mixin usage
```

### Quick Commands

```bash
# Test SCSS compilation
npm run test:scss

# Run stylelint
npm run lint:scss

# Auto-fix lint issues
npm run lint:scss:fix

# Run all tests
npm test
```

### Pre-Commit Workflow

Before committing SCSS changes:

```bash
# 1. Validate your file
./.github/skills/scss-refactor-agent/scripts/validate-scss.sh assets/css/style.scss

# 2. Run tests
npm run test:scss

# 3. Run linter
npm run lint:scss

# 4. Fix issues if needed
npm run lint:scss:fix
```

## Detailed Refactoring Guide

See [references/REFACTORING-GUIDE.md](references/REFACTORING-GUIDE.md) for:
- Step-by-step migration process
- Common patterns and solutions
- Troubleshooting guide
- Before/after examples

## State-of-the-Art Web Design Guidelines

Comprehensive reference guides for modern web development:

### [WEB-DESIGN-GUIDELINES.md](references/WEB-DESIGN-GUIDELINES.md)
Complete modern web design best practices:
- Design principles (Progressive Enhancement, Mobile-First)
- Modern CSS features (Container Queries, :has(), clamp())
- Responsive design patterns (Intrinsic Web Design, Fluid Typography)
- OKLCH color space and contrast requirements
- Typography best practices and hierarchy
- Layout systems (CSS Grid, Flexbox, Containment)
- Performance optimization and browser compatibility

### [CSS-ARCHITECTURE-PATTERNS.md](references/CSS-ARCHITECTURE-PATTERNS.md)
Scalable CSS architecture for maintainable codebases:
- Genesis Three-Tier Architecture deep dive
- Comparison with BEM, SMACSS, ITCSS, OOCSS
- Semantic vs Atomic CSS approaches
- Naming conventions and file organization
- Component patterns and composition
- State management strategies
- Theming and maintainability at scale

### [PERFORMANCE-OPTIMIZATION.md](references/PERFORMANCE-OPTIMIZATION.md)
Performance best practices for fast, efficient stylesheets:
- Core Web Vitals and CSS-specific metrics
- CSS loading strategies (Critical CSS, async loading)
- Rendering performance (GPU acceleration, paint optimization)
- Animation performance (60fps, requestAnimationFrame)
- Build-time optimization (minification, tree-shaking)
- Monitoring and testing tools
- Performance budgets and anti-patterns

### [ACCESSIBILITY-STANDARDS.md](references/ACCESSIBILITY-STANDARDS.md)
WCAG 2.2 AA compliance comprehensive guide:
- WCAG principles (Perceivable, Operable, Understandable, Robust)
- Color contrast requirements (4.5:1 for text, 3:1 for UI)
- Touch target standards (44×44px minimum)
- Keyboard accessibility and focus management
- Motion control and reduced motion support
- Screen reader optimization
- Testing and validation checklists

## Resources

### In This Skill
- `scripts/validate-scss.sh` - Automated validation
- `references/REFACTORING-GUIDE.md` - Step-by-step migration
- `references/WEB-DESIGN-GUIDELINES.md` - **NEW** Modern web design best practices
- `references/CSS-ARCHITECTURE-PATTERNS.md` - **NEW** Scalable CSS architecture
- `references/PERFORMANCE-OPTIMIZATION.md` - **NEW** Performance optimization guide
- `references/ACCESSIBILITY-STANDARDS.md` - **NEW** WCAG 2.2 AA compliance

### In Repository
- `_sass/ontology/INTEGRATION-GUIDE.md` - Complete mixin reference
- `_sass/ontology/refactor-agent.md` - Detailed migration guide
- `.github/instructions/scss.instructions.md` - SCSS coding standards
- `.github/AGENT-INDEX.md` - Quick navigation guide

### Related Agents
- `theme-genome-agent` - Reviews ontological changes
- `subdomain-evolution-agent` - Proposes new variants
- `responsive-design-agent` - Ensures mobile-first patterns
- `futuristic-effects-agent` - Advanced visual effects
- `html-template-agent` - Semantic HTML and accessibility

**Version**: 2.1.0 - Integrated Validation + State-of-the-Art Guidelines  
**Last Updated**: 2026-01-29
