---
name: scss-refactor-agent
description: Migrate legacy CSS and SCSS to Genesis Ontological mixins. Convert raw CSS properties to semantic ontological patterns, ensure zero-CSS compliance in subdomain files, and maintain the three-tier architecture. Use when refactoring existing stylesheets to adopt the ontology system or auditing subdomain SCSS for semantic purity.
license: MIT
metadata:
  author: ASISaga
  version: "2.0"
  category: design-system
  role: migration-specialist
---

# SCSS Refactor Agent

**Role**: Ontology Migration Expert  
**Scope**: Subdomain SCSS files and legacy component stylesheets

## Purpose

The SCSS Refactor Agent converts legacy CSS/SCSS into ontological mixin-based code. This agent ensures subdomain stylesheets achieve "zero-CSS compliance" - using only Genesis Semantic mixins without any raw CSS properties.

## When to Use This Skill

Activate when migrating subdomain stylesheets, auditing for raw CSS violations, converting theme components, or refactoring after new ontological variants are approved.

## Golden Rules

**ZERO Raw CSS Properties** - Subdomain SCSS files MUST NOT contain margin, padding, display, color, font-size, or any CSS properties. Only use ontological mixins.

**Mirrored Hierarchy** - SCSS nesting MUST mirror HTML DOM structure exactly.

## Core Workflow

1. **Intent Analysis**: Classify each CSS rule by semantic intent (Environment, Entity, Cognition, Synapse, State, Atmosphere)
2. **Mirrored Mapping**: Create SCSS structure matching HTML DOM hierarchy
3. **Mixin Selection**: Replace raw CSS with appropriate Genesis mixins
4. **Verification**: Ensure zero raw CSS, proper compilation, visual accuracy

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

## Resources

- `_sass/ontology/INTEGRATION-GUIDE.md` - Complete mixin reference
- `_sass/ontology/refactor-agent.md` - Detailed migration guide
- `.github/instructions/scss.instructions.md` - SCSS rules

**Related Skills**: theme-genome-agent, subdomain-evolution-agent
