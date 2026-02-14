# Genesis Ontological Design System Specification

**Version**: 2.0.0  
**Status**: Active  
**Last Updated**: 2026-02-14

## Overview

The Genesis Ontological Design System is a semantic-first CSS framework built on SCSS mixins that prioritize meaning over appearance. It follows a three-tier architecture to maintain separation between pure semantic intent, visual implementation, and content application.

## Scope

This specification defines:
- The six semantic categories and their variants
- Three-tier architecture (Engine → Theme → Subdomains)
- Import rules and compilation patterns
- Ontological Proposition System for evolution

## Three-Tier Architecture

### 1. Engine Layer (`_sass/ontology/`)

Pure semantic mixins with zero implementation assumptions:
- No color values, spacing values, or visual specifics
- Only semantic variant names
- Provides the vocabulary for design intent

### 2. Theme Layer (`_sass/components/`, `_sass/layouts/`)

Visual implementation using ontology:
- Maps semantic mixins to actual CSS properties
- Defines the visual language
- Implements components and layouts

### 3. Subdomain Layer

Content pages with optional page-specific styling:
- Uses ontology mixins exclusively (no raw CSS)
- Page-specific SCSS in `_sass/main.scss`
- NO `@import` statements (ontology provided by theme)

## Six Semantic Categories

### 1. genesis-environment($logic)

**Purpose**: Layout structure and spatial organization

**Variants**:
- `'distributed'` - Grid-based, auto-fitting layouts
- `'focused'` - Centered, constrained content
- `'associative'` - Related items grouped together
- `'chronological'` - Time-based or sequential flow
- `'manifest'` - Full visibility, prominent display

### 2. genesis-entity($nature)

**Purpose**: Visual presence and hierarchy

**Variants**:
- `'primary'` - Main content or action
- `'secondary'` - Supporting content
- `'imperative'` - Critical or urgent
- `'latent'` - De-emphasized or hidden until interaction
- `'aggregate'` - Collection or summary
- `'ancestral'` - Historical or deprecated but preserved

### 3. genesis-cognition($intent)

**Purpose**: Typography and textual meaning

**Variants**:
- `'axiom'` - Headers, fundamental truths
- `'discourse'` - Body text, main narrative
- `'protocol'` - Instructions, procedures
- `'gloss'` - Metadata, annotations
- `'motive'` - Calls to action
- `'quantum'` - Code, technical content

### 4. genesis-synapse($vector)

**Purpose**: Interaction and user actions

**Variants**:
- `'navigate'` - Links and navigation
- `'execute'` - Buttons and actions
- `'inquiry'` - Forms and input
- `'destructive'` - Delete or remove actions
- `'social'` - Share and connect

### 5. genesis-state($condition)

**Purpose**: Temporal states and status

**Variants**:
- `'stable'` - Normal, default state
- `'evolving'` - Loading, in progress
- `'deprecated'` - Outdated but accessible
- `'locked'` - Disabled or restricted
- `'simulated'` - Preview or demo mode

### 6. genesis-atmosphere($vibe)

**Purpose**: Mood and emotional tone

**Variants**:
- `'neutral'` - Default, balanced
- `'ethereal'` - Light, airy
- `'void'` - Dark, mysterious
- `'vibrant'` - Energetic, bold

## Usage Example

```scss
.blog-post {
  @include genesis-environment('focused');
  
  .post-header {
    @include genesis-entity('primary');
  }
  
  .post-title {
    @include genesis-cognition('axiom');
  }
  
  .post-meta {
    @include genesis-cognition('gloss');
  }
  
  .post-content {
    @include genesis-cognition('discourse');
  }
  
  .read-more {
    @include genesis-synapse('navigate');
    @include genesis-cognition('motive');
  }
}
```

## Import Rules

### Theme Repository

**Single import point** in `_sass/_common.scss`:
```scss
@import "ontology/index";  // Line 64
```

**DO NOT import in**:
- Component files (`_sass/components/*.scss`)
- Layout files (`_sass/layouts/*.scss`)
- Any other `_sass/` file (ontology already available)

### Subdomain Repositories

**NO imports** - ontology provided by theme via `remote_theme`:
- `_sass/main.scss` has NO front matter
- `_sass/main.scss` has NO `@import` statements
- Ontology mixins available automatically
- Use mixins directly

## Ontological Proposition System

### Purpose

Evolutionary mechanism for extending the ontology when subdomains encounter use cases not expressible with existing variants.

### Process

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

### Validation Criteria

**Semantic Purity Examples**:
- ✅ Named by purpose: `'chronicle'`, `'ephemeral'`, `'resonant'`
- ❌ Named by appearance: `'blue-glossy'`, `'rounded-shadow'`

**Non-Redundancy**:
- ✅ Fills genuine gap in ontology
- ❌ Overlaps existing variants or combinations

**Universal Applicability**:
- ✅ Useful across multiple contexts/subdomains
- ❌ Solves only one specific use case

## Testing & Validation

```bash
npm test              # All tests (compilation + lint)
npm run test:scss     # SCSS compilation check
npm run lint:scss     # Stylelint validation
```

## Complete Reference

→ **Full ontology documentation**: `/docs/specifications/scss-ontology-system.md`  
→ **Integration guide**: `_sass/ontology/INTEGRATION-GUIDE.md`  
→ **Genome history**: `GENOME.md`

---

**Related Specifications**:
- `.github/specs/theme-subdomain-architecture.md`
- `.github/specs/agent-intelligence-framework.md`
