---
applyTo: "**/*.{scss,sass,css},_sass/**,assets/css/**"
description: "SCSS coding instructions for Genesis Semantic Design System v2.0"
---

# SCSS Instructions

## PRIMARY METHOD: Genesis Ontology System

**For ALL new development, use ontology mixins exclusively.**

### Quick Start

**Standalone SCSS files** (compilation entry points with Jekyll front matter):
```scss
---
---
@import "ontology/index";  // Required for standalone files

.component {
  @include genesis-environment('distributed');  // Layout
  @include genesis-entity('primary');           // Visual
  @include genesis-cognition('axiom');          // Typography
  @include genesis-synapse('execute');          // Interaction
}
```

**Theme internal files** (`_sass/components/`, `_sass/layouts/`):
```scss
// NO @import - ontology available via _common.scss
.component {
  @include genesis-environment('distributed');
}
```

### MANDATORY RULES

**Subdomain SCSS** - ZERO raw CSS properties:
- ❌ NO `margin`, `padding`, `color`, `font-size`, `background`
- ❌ NO unit values: `px`, `rem`, `%`
- ❌ NO color values: `#hex`, `rgb()`, `oklch()`
- ✅ ONLY ontological mixins

**Theme internal SCSS:**
- ❌ NEVER use `@extend` (Jekyll build errors)
- ✅ Max 3 nesting levels
- ✅ Use ontology mixins when possible
- ✅ BEM-style naming: `.block__element--modifier`

## Ontology Reference

**Six semantic categories** (31 variants total):
→ **Complete reference**: `/docs/specifications/scss-ontology-system.md`

**Quick category list:**
- `genesis-environment($logic)` - Layout: `'distributed'`, `'focused'`, `'associative'`, `'chronological'`, `'manifest'`
- `genesis-entity($nature)` - Visual: `'primary'`, `'secondary'`, `'imperative'`, `'latent'`, `'aggregate'`, `'ancestral'`
- `genesis-cognition($intent)` - Typography: `'axiom'`, `'discourse'`, `'protocol'`, `'gloss'`, `'motive'`, `'quantum'`
- `genesis-synapse($vector)` - Interaction: `'navigate'`, `'execute'`, `'inquiry'`, `'destructive'`, `'social'`
- `genesis-state($condition)` - State: `'stable'`, `'evolving'`, `'deprecated'`, `'locked'`, `'simulated'`
- `genesis-atmosphere($vibe)` - Atmosphere: `'neutral'`, `'ethereal'`, `'void'`, `'vibrant'`

## Theme/Subdomain Architecture (CRITICAL)

**Theme repository (this repo):**
- Defines Jekyll layouts in `_layouts/` and `_includes/`
- Provides SCSS via `_sass/` imported through layout head
- Builds final theme by importing `ontology/index` in `_sass/_common.scss` (line 64)
- **Responsibility**: All SCSS, layouts, components

**Subdomain repositories:**
- Create HTML pages using Jekyll layouts from theme
- Pages reference theme's SCSS through layout `<head>` 
- **Page-specific SCSS** in `_sass/main.scss` (optional, ontology-only, NO imports)
- **NO `assets/css/custom.scss`** (deprecated, use `_sass/main.scss` instead)
- **NO `_layouts/` or `_includes/`** directories in subdomains
- **Mandatory `assets/js/script.js`** (loaded after theme's common.js)
- **Responsibility**: HTML content only

## Import Rules (CRITICAL)

**DO import `ontology/index` ONLY in:**
- ✅ `assets/css/style.scss` (theme's main stylesheet entry point)

**NEVER import in:**
- ❌ Subdomain's `_sass/main.scss` (ontology already available from theme)
- ❌ `_sass/components/` partials (ontology available via `_common.scss`)
- ❌ `_sass/layouts/` partials (ontology available via `_common.scss`)
- ❌ `_sass/samples/` files (ontology available via `_common.scss`)
- ❌ Any file inside `_sass/` directory (creates 22MB bloat)

**Why**: `_common.scss` imports ontology at line 64. Theme's `assets/css/style.scss` imports subdomain's `_sass/main.scss` at build time. Duplicate imports cause massive CSS bloat (22MB vs 1.1MB).

## Testing & Linting

### CRITICAL: Pre-Commit Validation

**ALWAYS run `npm test` before committing SCSS changes.** This prevents build failures like:
```
Conversion error: Jekyll::Converters::Scss encountered an error while converting 'assets/css/style.scss':
Incompatible units: 'vw' and 'rem'. on line 81
```

**Required workflow:**
```bash
npm test                    # ⚠️ MANDATORY before committing (runs all checks below)
```

Individual validation commands (all included in `npm test`):
```bash
npm run test:scss           # Fast Sass compilation check (catches undefined mixins/vars)
npm run validate:scss:units # Unit compatibility validation (vw/rem mixing)
npm run lint:scss           # Code style and best practices
```

### Common Errors and Fixes

**❌ Incompatible units error:**
```scss
// WRONG - Direct arithmetic with incompatible units
.component {
  margin: 5vw + 1rem;        // ❌ Sass compilation error
  padding: 2rem + 3vw;       // ❌ Incompatible units
}
```

**✅ Correct approach:**
```scss
// CORRECT - Use calc() or clamp() for mixing units
.component {
  margin: calc(5vw + 1rem);           // ✅ Browser calculates at runtime
  padding: clamp(1rem, 2vw + 0.5rem, 3rem);  // ✅ Fluid with constraints
}
```

### What Each Tool Catches

**Sass compilation (`npm run test:scss`):**
- Undefined variables (`$gray-100`)
- Undefined mixins (`@include non-existent`)
- Missing mixin parameters
- Syntax errors

**Unit validator (`npm run validate:scss:units`):**
- ⚠️ **Incompatible unit mixing** outside calc()/clamp() (e.g., `5vw + 1rem`)
- Invalid fluid design patterns
- Direct arithmetic with viewport units (vw, vh, vmin, vmax) and root units (rem, em)

**Stylelint (`npm run lint:scss`):**
- `@extend` usage (forbidden in Jekyll)
- Nesting depth > 3 levels
- Code style violations
- Best practice enforcement

### Pre-Commit Hook (Recommended)

Add to `.git/hooks/pre-commit`:
```bash
#!/bin/bash
# Validate SCSS before allowing commit
npm test || {
  echo "❌ SCSS validation failed. Fix errors before committing."
  exit 1
}
```

Make executable: `chmod +x .git/hooks/pre-commit`

→ **Unit compatibility**: `/docs/specifications/fluid-design-unit-compatibility.md`  
→ **Stylelint guide**: `/docs/guides/STYLELINT.md`, `/docs/guides/STYLELINT-LIMITATIONS.md`  
→ **Unit validator skill**: `.github/skills/scss-unit-validator/SKILL.md`

## Ontology Evolution

**Found a semantic gap?**
1. Review existing 31 variants: `/docs/specifications/scss-ontology-system.md`
2. Check combination possibilities
3. Submit Ontological Proposition if genuine gap

→ **Process guide**: `.github/.github/docs/agent-philosophy.md`, `.github/prompts/subdomain-evolution-agent.prompt.md`

## Documentation References

**Complete ontology system:**
- `/docs/specifications/scss-ontology-system.md` - All 31 variants, OKLCH colors, design tokens, complete examples
- `_sass/ontology/INTEGRATION-GUIDE.md` - Comprehensive API guide
- `_sass/ontology/_sample.scss` - Working code examples
- `_sass/ontology/Readme.md` - Three-tier architecture
- `GENOME.md` - Variant history and evolution
- `tests/ontology/ontology-animations-demo.html` - Visual demonstrations

**Style guidelines:**
- `/docs/specifications/fluid-design-unit-compatibility.md` - Unit mixing rules, calc/clamp patterns
- `/docs/guides/STYLELINT.md` - Linting setup and rules
- `/docs/guides/STYLELINT-LIMITATIONS.md` - Why Sass compilation is needed

**Test pages** (organized in `/tests/`):
- `/tests/responsive/` - Responsive design tests
- `/tests/mobile/` - Mobile-specific tests
- `/tests/motion/` - Motion library tests
- `/tests/ontology/` - Ontology system demos
- See `/tests/README.md` for complete catalog

**Migration resources:**
- `_sass/ontology/refactor-agent.md` - Automated SCSS migration
- `.github/prompts/scss-refactor-agent.prompt.md` - AI refactoring guide
