---
applyTo: "**/*.{scss,sass,css},assets/css/**"
description: "SCSS standards for ASI Saga subdomain repositories — ontology-only, zero raw CSS"
---

# Subdomain SCSS Instructions

## Content-Only Architecture

Subdomain repositories should rarely need custom SCSS. The theme provides complete styling through layouts and the ontological design system. Only create `assets/css/custom.scss` when you need subdomain-specific component styling.

## MANDATORY: Zero Raw CSS

Subdomain SCSS files must contain **ZERO raw CSS properties**:

- ❌ NO `margin`, `padding`, `color`, `font-size`, `background`, `border`
- ❌ NO unit values: `px`, `rem`, `em`, `%`, `vh`, `vw`
- ❌ NO color values: `#hex`, `rgb()`, `hsl()`, `oklch()`
- ❌ NO `@extend` (causes Jekyll build errors)
- ✅ ONLY ontological mixins from `@import "ontology/index"`
- ✅ Max 3 nesting levels

## File Setup

If custom styling is needed, create `assets/css/custom.scss`:

```scss
---
---
@import "ontology/index";

.my-component {
  @include genesis-entity('primary');
}
```

The `---` front matter is required for Jekyll to process the file.

## Ontology Mixins

### Environment (Layout)

```scss
@include genesis-environment('distributed');   // Auto-fit grid
@include genesis-environment('focused');       // Single column, max-width
@include genesis-environment('associative');   // Flexbox network
@include genesis-environment('chronological'); // Vertical timeline
@include genesis-environment('manifest');      // Dashboard grid
```

### Entity (Visual Presence)

```scss
@include genesis-entity('primary');      // Main card/block
@include genesis-entity('secondary');    // Supporting content
@include genesis-entity('imperative');   // Urgent/important
@include genesis-entity('latent');       // Inactive/dimmed
@include genesis-entity('aggregate');    // Container wrapper
@include genesis-entity('ancestral');    // Archived/historical
```

### Cognition (Typography)

```scss
@include genesis-cognition('axiom');      // Headlines
@include genesis-cognition('discourse');  // Body text
@include genesis-cognition('protocol');   // Code/technical
@include genesis-cognition('gloss');      // Metadata/small
@include genesis-cognition('motive');     // Instructional
@include genesis-cognition('quantum');    // Tags/chips
```

### Synapse (Interaction)

```scss
@include genesis-synapse('navigate');     // Links
@include genesis-synapse('execute');      // Action buttons
@include genesis-synapse('inquiry');      // Search/expand
@include genesis-synapse('destructive');  // Delete/remove
@include genesis-synapse('social');       // Share/connect
```

### State (Temporal Condition)

```scss
@include genesis-state('stable');         // Verified/normal
@include genesis-state('evolving');       // Loading/updating
@include genesis-state('deprecated');     // Outdated
@include genesis-state('locked');         // Restricted
@include genesis-state('simulated');      // Preview/demo
```

### Atmosphere (Mood)

```scss
@include genesis-atmosphere('neutral');   // Default
@include genesis-atmosphere('ethereal');  // Light/peaceful
@include genesis-atmosphere('void');      // Dark/immersive
@include genesis-atmosphere('vibrant');   // Energetic
```

## Common Patterns

### Card Grid

```scss
.project-grid {
  @include genesis-environment('distributed');

  .project-card {
    @include genesis-entity('primary');

    .project-card__title { @include genesis-cognition('axiom'); }
    .project-card__desc { @include genesis-cognition('discourse'); }
    .project-card__link { @include genesis-synapse('navigate'); }
  }
}
```

### Article Layout

```scss
.article {
  @include genesis-environment('focused');
  @include genesis-atmosphere('ethereal');

  .article__title { @include genesis-cognition('axiom'); }
  .article__meta { @include genesis-cognition('gloss'); }
  .article__body { @include genesis-cognition('discourse'); }
}
```

## Identifying Semantic Gaps

If no mixin combination serves your need:

1. Review all variants above and try creative combinations
2. Confirm the gap is **semantic** (WHAT), not **visual** (HOW)
3. Submit an Ontological Proposition PR to `theme.asisaga.com`

→ **Proposition process**: Theme's `.github/AGENTS.MD`

## Verification Checklist

Before committing SCSS:
- [ ] Only `@import "ontology/index"` (no other imports)
- [ ] Zero raw CSS properties
- [ ] No `px`, `rem`, `%`, or color values
- [ ] SCSS nesting mirrors HTML structure
- [ ] Max 3 nesting levels
