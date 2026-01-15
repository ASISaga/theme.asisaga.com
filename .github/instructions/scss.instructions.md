---
applyTo: "**/*.{scss,sass,css},_sass/**,assets/css/**"
description: "SCSS guidance for the ASI Saga semantic design system. Applies to theme `_sass` partials and subdomain SCSS files."
---

# Semantic Design System - SCSS Instructions

This file contains rules for the OKLCH-based semantic design system with native CSS Grid and Glassmorphism.

## Architecture Overview
- **NO Bootstrap** - Pure semantic CSS with native Grid and Flexbox
- **OKLCH color space** - High-dynamic-range, perceptually uniform colors
- **Bento Engine** - Native CSS Grid layout system with container queries
- **Material Primitives** - Standardized glassmorphism and backdrop effects
- **Fluid Typography** - clamp() based responsive scaling

## Structure & Entry Points
- All theme SCSS lives in `/_sass`
- Main entry: `assets/css/style.scss` → imports `_common.scss` → imports subdomain `_main.scss`
- Component partials: `/_sass/components/`
- Layout partials: `/_sass/layouts/`
- Base system: `/_sass/base/`

## Design Tokens (The DNA)
- **Use semantic tokens**, never raw OKLCH values directly in components
- Tokens are in `_sass/base/_design-tokens.scss`:
  - Surface tokens: `$surface-primary`, `$surface-elevated`, `$surface-glass`
  - Text tokens: `$text-primary`, `$text-secondary`, `$text-accent`
  - Accent tokens: `$accent-glow`, `$accent-neural`, `$accent-essence`
  - Border tokens: `$border-primary`, `$border-accent`, `$border-glow`
  - Shadow tokens: `$shadow-sm`, `$shadow-md`, `$shadow-glow-essence`

## Layout System - Bento Engine
- Use **Bento containers** instead of Bootstrap .container:
  - `.genesis-viewport` - Full-width (max 1600px)
  - `.consciousness-viewport` - Content-focused (max 1200px)
  - `.essence-viewport` - Narrow content (max 800px)
- Use **Bento layouts** instead of .row/.col-*:
  - `.bento-layout` - Auto-fit responsive grid
  - `.bento-dashboard` - Named grid areas
  - `.bento-gallery` - Image-optimized grid
  - `.bento-masonry` - Dense auto-flow layout
- Use **Bento cards** for components:
  - `.bento-card` - Base glassmorphism card
  - `.bento-card--elevated` - Enhanced depth
  - `.bento-card--accent` - Gold-tinted variant
  - `.bento-card--neural` - Violet-tinted variant

## Material Primitives
- Apply **digital glass** effects via classes:
  - `.material-glass` - Base glassmorphism
  - `.material-glass-elevated` - Stronger effect
  - `.material-glass-subtle` - Lighter effect
  - `.material-header` / `.material-footer` - Navigation surfaces
  - `.material-modal` / `.material-overlay` - Dialog surfaces
- Use **mask effects** for fades:
  - `.mask-fade-bottom`, `.mask-fade-top`, `.mask-fade-edges`, `.mask-fade-radial`

## Typography
- Use **fluid scales** - all sizing uses clamp():
  - Headings: `$font-h1` through `$font-h6`
  - Body: `$font-body`, `$font-body-lg`, `$font-body-sm`
  - Display: `$font-display-xl`, `$font-display-lg`, `$font-display-md`
- Apply via semantic classes: `.display-xl`, `.h1`, `.text-lg`, etc.
- Weight utilities: `.font-light`, `.font-semibold`, `.font-bold`

## Semantic Mixins
Use mixins from `_sass/base/_semantic-mixins.scss`:
- Layout: `@include d-flex`, `@include flex-direction(column)`
- Spacing: `@include padding-section`, `@include padding-component`
- Buttons: `@include button-variant($bg, $border, $text)`
- Glass: `@include glass-surface($opacity, $blur)`
- Responsive: `@include breakpoint-md { ... }`
- Accessibility: `@include focus-visible`, `@include reduced-motion`

## SCSS Rules (MANDATORY)
- **NEVER use `@extend`** in Jekyll SCSS (causes build errors)
- All layout containers MUST use: `contain: layout style; isolation: isolate;`
- All grids MUST be responsive: `grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))`
- Limit nesting to 3 levels; use `&` for modifiers
- Each component has ONE matching SCSS partial

## Color & Contrast (MANDATORY)
- Text MUST be solid colors, WCAG AA compliant
- NEVER use opacity < 0.9 for text (breaks contrast)
- Header/footer text on dark: use `$text-primary` (white)
- Use semantic tokens: `$text-accent`, `$text-consciousness`, etc.

## Responsive Design
- Mobile-first approach required
- Test viewports: 375px, 768px, 1440px minimum
- Touch targets MUST be ≥ 44px
- Minimum font size: 16px (use clamp() for fluid scaling)
- Use `@container` queries where appropriate for component density

## Accessibility
- All interactive elements MUST have visible focus indicators
- Support `prefers-reduced-motion` - disable animations
- Support `prefers-contrast: high` - disable glass effects, increase borders
- Never rely on color alone for meaning

## Ontology System - Genesis Semantic Engine (MANDATORY FOR SUBDOMAINS)

### Three-Tier Architecture
The Genesis Semantic Engine provides a rigorous separation between content and presentation:

**Tier 1: Content (Subdomain HTML)**
- Defines WHAT the data is
- No style attributes; 1 semantic class per element

**Tier 2: Interface (Ontological API)**
- Defines the ROLE of the content
- Agnostic; no CSS properties allowed
- Import via: `@import "ontology/index";`

**Tier 3: Engine (Physical Manifestation)**
- Defines the LOOK (OKLCH, Bento, Glassmorphism)
- The ONLY place for raw CSS properties

### Using the Ontological API

**Import in subdomain SCSS:**
```scss
---
---
@import "ontology/index";  // Must be first import

.my-content {
  @include genesis-environment('focused');  // Layout
  @include genesis-entity('primary');       // Visual weight
  @include genesis-cognition('axiom');      // Typography
  @include genesis-synapse('execute');      // Interaction
  @include genesis-state('stable');         // Temporal state
  @include genesis-atmosphere('ethereal');  // Sensory vibe
}
```

### Complete Ontological Categories

**1. `genesis-environment($logic)` - Layout Organization**
- `'distributed'` - Bento grid (auto-fit responsive)
- `'focused'` - Single column reading (max 70ch)
- `'associative'` - Network/connections (flexbox)
- `'chronological'` - Timeline (vertical sequence)
- `'manifest'` - Dashboard (12-column grid)

**2. `genesis-entity($nature)` - Visual Presence**
- `'primary'` - Main content (glassmorphism)
- `'secondary'` - Supporting context (lighter)
- `'imperative'` - Urgent alert (pulsing neon)
- `'latent'` - Inactive/dormant (dimmed)
- `'aggregate'` - Container (larger padding)
- `'ancestral'` - Archived (muted historical)

**3. `genesis-cognition($intent)` - Information Type**
- `'axiom'` - Headlines (2-3.5rem, bold)
- `'discourse'` - Body text (1-1.125rem, serif)
- `'protocol'` - Code/technical (monospace)
- `'gloss'` - Annotations (small, muted)
- `'motive'` - Instructional (semibold, accent)
- `'quantum'` - Tags/chips (tiny, uppercase)

**4. `genesis-synapse($vector)` - Interaction**
- `'navigate'` - Links to other pages
- `'execute'` - Action buttons
- `'inquiry'` - Search/expand actions
- `'destructive'` - Delete/reset (danger)
- `'social'` - Social sharing links

**5. `genesis-state($condition)` - Temporal State**
- `'stable'` - Normal/verified
- `'evolving'` - Live updating
- `'deprecated'` - No longer current
- `'locked'` - Access restricted
- `'simulated'` - Projected/not live

**6. `genesis-atmosphere($vibe)` - Sensory Feel**
- `'neutral'` - Standard appearance
- `'ethereal'` - Light, minimal
- `'void'` - Dark, immersive
- `'vibrant'` - Colorful, energetic

### Subdomain SCSS Rules (MANDATORY)

**ZERO Raw CSS:** Subdomain SCSS files MUST NOT contain:
- `margin`, `padding`, `display`, `color`, `font-size`, `background`, etc.
- Any pixel (`px`), rem, or other unit values
- Any color values (hex, rgb, oklch, etc.)

**Only use ontological mixins** - All styling comes from the engine layer.

❌ **WRONG:**
```scss
.my-card {
  padding: 2rem;
  background: #1a1a2e;
  border-radius: 12px;
}
```

✅ **CORRECT:**
```scss
.my-card {
  @include genesis-entity('primary');
}
```

### Documentation & Examples
- Full guide: `_sass/ontology/INTEGRATION-GUIDE.md`
- Examples: `_sass/ontology/_sample.scss`
- Architecture: `_sass/ontology/Readme.md`
- AI migration: `_sass/ontology/refactor-agent.md`

## Bootstrap Compatibility
- Legacy components may use Bootstrap classes via compatibility layer
- Gradually migrate to Bento Engine and semantic classes
- Compatibility layer in `_sass/base/_bootstrap-compat.scss`

## Best Practices
- Use semantic tokens, not raw OKLCH values
- Prefer mixins over deep custom rules
- Add descriptive comments in partials
- Test color contrast before committing
- Use fluid clamp() for all sizing
