---
applyTo: "_sass/**/*.{scss,sass}"
description: "SCSS standards for ASI Saga subdomain repositories — page-specific ontology-only styling"
---

# Subdomain SCSS Instructions

## Content-Only Architecture with Page-Specific SCSS

Subdomain repositories should have page-specific SCSS in `_sass/main.scss` when needed. The theme provides the ontological design system. At build time, `assets/css/style.scss` from the theme gets merged into the subdomain by Jekyll, importing `_sass/main.scss` from the subdomain.

**NO `assets/css/custom.scss`** — Use `_sass/main.scss` for page-specific styling only.

## MANDATORY: Zero Raw CSS

Subdomain SCSS files must contain **ZERO raw CSS properties**:

- ❌ NO `margin`, `padding`, `color`, `font-size`, `background`, `border`
- ❌ NO unit values: `px`, `rem`, `em`, `%`, `vh`, `vw`
- ❌ NO color values: `#hex`, `rgb()`, `hsl()`, `oklch()`
- ❌ NO `@extend` (causes Jekyll build errors)
- ❌ NO `@import "ontology/index"` (theme provides this)
- ✅ ONLY ontological mixins (already available from theme)
- ✅ Max 3 nesting levels

## File Setup

If page-specific styling is needed, create `_sass/main.scss`:

```scss
// NO front matter needed
// NO @import needed - ontology mixins already available from theme

.my-page-component {
  @include genesis-entity('primary');
}
```

**IMPORTANT**: 
- Do NOT add Jekyll front matter (`---`) to `_sass/main.scss`
- Do NOT import `ontology/index` (theme already provides it)
- This file is for page-specific component styling only
- For new components needed across subdomains, create PR to theme

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

If no mixin combination serves your page-specific styling need:

1. Review all variants above and try creative combinations
2. Confirm the gap is **semantic** (WHAT), not **visual** (HOW)
3. Confirm this styling would be useful across multiple subdomains
4. Submit PR to `theme.asisaga.com` to add the component to theme (NOT subdomain)
5. If truly page-specific to this subdomain only, submit an Ontological Proposition

→ **Proposition process**: Theme's `.github/AGENTS.MD`

## Verification Checklist

Before committing SCSS:
- [ ] File is `_sass/main.scss` (NOT `assets/css/custom.scss`)
- [ ] NO Jekyll front matter (`---`)
- [ ] NO `@import` statements (ontology already available)
- [ ] Zero raw CSS properties
- [ ] No `px`, `rem`, `%`, or color values
- [ ] SCSS nesting mirrors HTML structure
- [ ] Max 3 nesting levels
- [ ] Page-specific components only (shared components go to theme)
- [ ] Run `npm run test:scss` — Verify SCSS compiles
- [ ] Run `npm run lint:scss` — Check code quality
- [ ] All tests pass before committing
