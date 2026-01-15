---
applyTo: "**/*.{scss,sass,css},_sass/**,assets/css/**"
description: "SCSS guidance for the ASI Saga semantic design system. Applies to theme `_sass` partials and subdomain SCSS files."
---

# Semantic Design System - SCSS Instructions

This file contains rules for the OKLCH-based semantic design system with native CSS Grid and Glassmorphism.

## 🌟 PRIMARY METHOD: Genesis Semantic Engine (Ontology System)

**For ALL new development, use the ontology system exclusively.**

The Genesis Semantic Engine is the **primary and recommended interface** for styling. It provides a three-tier architecture that separates content semantics from visual presentation.

### Quick Start (Primary Method)

```scss
---
---
@import "ontology/index";  // MUST be first import

.my-component {
  @include genesis-environment('distributed');  // Layout logic
  @include genesis-entity('primary');           // Visual presence
  
  .title {
    @include genesis-cognition('axiom');        // Typography
  }
  
  .action-button {
    @include genesis-synapse('execute');        // Interaction
  }
}
```

**Golden Rule**: NEVER use raw CSS properties (margin, padding, color, etc.) in subdomain SCSS. All styling comes from ontological mixins.

---

## Architecture Overview

### Primary: Ontology System (Use This)
- **Three-tier architecture** - Content → Interface → Engine
- **Six semantic categories** - 31 total variants covering all UI needs
- **Zero raw CSS** - Subdomain SCSS uses only mixins
- **Single source of truth** - All visual styling in theme engine

### Legacy: Bento/Material Classes (Backward Compatibility)
- **Bento Engine** - Native CSS Grid layout system  
- **Material Primitives** - Glassmorphism components
- **Bootstrap compatibility** - For gradual migration
- **Maintained but deprecated** - Use ontology for new work

### Foundation (All Methods)
- **OKLCH color space** - Perceptually uniform, HDR-ready
- **Fluid Typography** - clamp() based responsive scaling
- **Accessibility-first** - WCAG AA, reduced motion, high contrast

## Structure & Entry Points

### Primary: Ontology System
- **Main entry**: `@import "ontology/index";` in your SCSS file
- **Interface layer**: `/_sass/ontology/_interface.scss` (6 public mixins)
- **Engine layer**: `/_sass/ontology/_engines.scss` (visual implementation)
- **Documentation**: `/_sass/ontology/INTEGRATION-GUIDE.md`

### Theme Internal Structure
- All theme SCSS lives in `/_sass`
- Theme entry: `_sass/_common.scss` (imports ontology + legacy systems)
- Subdomain entry: `assets/css/style.scss` → imports `ontology/index`
- Component partials: `/_sass/components/` (migrating to ontology)
- Layout partials: `/_sass/layouts/` (legacy patterns)

## Design Tokens

### Primary: Ontology CSS Custom Properties
When using the ontology system, you **do not need** to reference tokens directly. The engine handles all token usage internally.

The ontology engine uses 150+ CSS custom properties defined in `_sass/ontology/_tokens.scss`:
- Spacing: `--space-bento`, `--space-narrative`, `--space-network`
- Typography: `--font-size-*`, `--font-weight-*`, `--line-height-*`
- Colors: `--glass-*`, `--accent-*`, `--border-*`
- Motion: `--motion-fluid`, `--motion-snap`

### Legacy: Sass Variables (Theme Internal Use)
For legacy components and theme development, tokens are in `_sass/base/_design-tokens.scss`:
- Surface tokens: `$surface-primary`, `$surface-elevated`, `$surface-glass`
- Text tokens: `$text-primary`, `$text-secondary`, `$text-accent`
- Accent tokens: `$accent-glow`, `$accent-neural`, `$accent-essence`
- Border tokens: `$border-primary`, `$border-accent`, `$border-glow`
- Shadow tokens: `$shadow-sm`, `$shadow-md`, `$shadow-glow-essence`

**Note**: When using ontology mixins, you never touch these directly.

## Layout System

### Primary: Ontology Environment Mixins
Use **`genesis-environment($logic)`** mixin instead of layout classes:

```scss
.my-layout {
  @include genesis-environment('distributed');  // Auto-fit Bento grid
  @include genesis-environment('focused');      // Single column reading
  @include genesis-environment('associative');  // Flexbox network
  @include genesis-environment('chronological'); // Timeline stream
  @include genesis-environment('manifest');     // 12-column dashboard
}
```

### Legacy: Bento Engine Classes (Backward Compatible)
For HTML-only styling (not recommended for new work):
- **Containers**: `.genesis-viewport`, `.consciousness-viewport`, `.essence-viewport`
- **Layouts**: `.bento-layout`, `.bento-dashboard`, `.bento-gallery`, `.bento-masonry`
- **Cards**: `.bento-card`, `.bento-card--elevated`, `.bento-card--accent`

**Migration Path**: Replace Bento classes with `genesis-environment()` mixins in SCSS.

## Material & Visual Effects

### Primary: Ontology Entity Mixins
Use **`genesis-entity($nature)`** mixin for glassmorphism and visual presence:

```scss
.my-card {
  @include genesis-entity('primary');      // Main glassmorphism card
  @include genesis-entity('secondary');    // Lighter glass effect
  @include genesis-entity('imperative');   // Urgent alert with glow
  @include genesis-entity('latent');       // Dimmed, inactive
  @include genesis-entity('aggregate');    // Container styling
  @include genesis-entity('ancestral');    // Archived appearance
}
```

### Legacy: Material Primitive Classes (Backward Compatible)
For HTML-only styling (not recommended for new work):
- **Glass effects**: `.material-glass`, `.material-glass-elevated`, `.material-glass-subtle`
- **Navigation**: `.material-header`, `.material-footer`
- **Overlays**: `.material-modal`, `.material-overlay`
- **Masks**: `.mask-fade-bottom`, `.mask-fade-top`, `.mask-fade-edges`

**Migration Path**: Replace Material classes with `genesis-entity()` mixins in SCSS.

## Typography

### Primary: Ontology Cognition Mixins
Use **`genesis-cognition($intent)`** mixin for all typography:

```scss
.my-text {
  @include genesis-cognition('axiom');      // Headlines (2-3.5rem, bold)
  @include genesis-cognition('discourse');  // Body text (1-1.125rem, readable)
  @include genesis-cognition('protocol');   // Code/technical (monospace)
  @include genesis-cognition('gloss');      // Small annotations (0.8rem, muted)
  @include genesis-cognition('motive');     // Instructional (semibold, accent)
  @include genesis-cognition('quantum');    // Tags/chips (tiny, uppercase)
}
```

Typography is **semantic** - choose based on information intent, not size.

### Legacy: Typography Classes & Variables (Backward Compatible)
- **Fluid scales**: `$font-h1` through `$font-h6`, `$font-body`, `$font-display-xl`
- **Classes**: `.display-xl`, `.h1`, `.text-lg`, `.font-semibold`

**Migration Path**: Replace typography classes/variables with `genesis-cognition()` mixins.

## Mixins & Utilities

### Primary: Ontology System Mixins (Use These)

**Complete set of 6 ontological categories** (see detailed section below):
- `genesis-environment($logic)` - Layout and spatial organization
- `genesis-entity($nature)` - Visual presence and glassmorphism
- `genesis-cognition($intent)` - Typography and information type
- `genesis-synapse($vector)` - Interactions and navigation
- `genesis-state($condition)` - Temporal state and system status
- `genesis-atmosphere($vibe)` - Sensory texture and emotional tone

These mixins cover **all UI styling needs** without requiring raw CSS.

### Legacy: Semantic Mixins (Theme Internal Use)
From `_sass/base/_semantic-mixins.scss` (for theme development only):
- Layout: `@include d-flex`, `@include flex-direction(column)`
- Spacing: `@include padding-section`, `@include padding-component`
- Buttons: `@include button-variant($bg, $border, $text)`
- Glass: `@include glass-surface($opacity, $blur)`
- Responsive: `@include breakpoint-md { ... }`
- Accessibility: `@include focus-visible`, `@include reduced-motion`

**Note**: Subdomain SCSS should use ontology mixins, not legacy semantic mixins.

## SCSS Rules (MANDATORY)

### For Ontology System (Primary Method)

**ZERO Raw CSS Properties:**
Subdomain SCSS files using ontology MUST NOT contain:
- ❌ `margin`, `padding`, `display`, `color`, `font-size`, `background`
- ❌ Any unit values: `px`, `rem`, `em`, `%`
- ❌ Any color values: `#hex`, `rgb()`, `oklch()`
- ❌ Any raw CSS properties whatsoever

**Only use ontological mixins** - All styling comes from the engine layer.

❌ **WRONG:**
```scss
.my-card {
  padding: 2rem;
  background: #1a1a2e;
  border-radius: 12px;
  color: white;
}
```

✅ **CORRECT:**
```scss
.my-card {
  @include genesis-entity('primary');  // All styling from engine
}
```

### For Theme Development (Internal SCSS)

When working on theme engine or legacy component SCSS:
- **NEVER use `@extend`** in Jekyll SCSS (causes build errors)
- All layout containers MUST use: `contain: layout style; isolation: isolate;`
- All grids MUST be responsive: `grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))`
- Limit nesting to 3 levels; use `&` for modifiers
- Each component has ONE matching SCSS partial
- Use CSS custom properties from token system, not hardcoded values

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

## Ontology System - Genesis Semantic Engine (PRIMARY METHOD)

**This is the REQUIRED approach for all new subdomain development.**

### Three-Tier Architecture

The Genesis Semantic Engine provides a rigorous separation between content and presentation:

**Tier 1: Content (Subdomain HTML)**
- Defines WHAT the data is
- Semantic HTML5 elements with meaningful class names
- One semantic class per element
- No inline styles or style attributes

**Tier 2: Interface (Ontological API)**
- Defines the ROLE of the content
- Agnostic semantic mixins
- NO CSS properties allowed in subdomain SCSS
- Import via: `@import "ontology/index";`

**Tier 3: Engine (Physical Manifestation)**
- Defines the LOOK (OKLCH, Bento, Glassmorphism)
- The ONLY place for raw CSS properties
- Lives in theme repository: `_sass/ontology/_engines.scss`
- Subdomains never touch this layer

### Using the Ontological API

**Import in subdomain SCSS (REQUIRED):**
```scss
---
---
@import "ontology/index";  // Must be first import

.my-content {
  @include genesis-environment('focused');  // Layout logic
  @include genesis-entity('primary');       // Visual presence
  @include genesis-cognition('axiom');      // Typography intent
  @include genesis-synapse('execute');      // Interaction type
  @include genesis-state('stable');         // Temporal state
  @include genesis-atmosphere('ethereal');  // Sensory vibe
}
```

### Complete Ontological Categories (All 31 Variants)

**1. `genesis-environment($logic)` - Layout Organization**
Defines spatial arrangement and layout logic:
- `'distributed'` - Autonomous entities in Bento grid (auto-fit, responsive)
- `'focused'` - Single column for deep reading (max 70ch, centered)
- `'associative'` - Network layout where connections matter (flexbox wrap)
- `'chronological'` - Time-linear vertical stream (timeline, feed)
- `'manifest'` - High-density dashboard (12-column grid, monitoring)

**2. `genesis-entity($nature)` - Visual Presence**
Defines glassmorphism and visual weight:
- `'primary'` - Main content object (active glassmorphism, elevated)
- `'secondary'` - Supporting contextual data (lighter glass, less prominent)
- `'imperative'` - System-critical urgent signal (pulsing neon border, alert)
- `'latent'` - Dormant/inactive content (dimmed, grayscale filter)
- `'aggregate'` - Container for multiple items (larger padding, wrapper)
- `'ancestral'` - Archived/historical data (muted, legacy appearance)

**3. `genesis-cognition($intent)` - Information Type**
Defines typography based on semantic meaning:
- `'axiom'` - Foundational headlines (2-3.5rem, bold, high-resonance)
- `'discourse'` - Standard body prose (1-1.125rem, serif, readable)
- `'protocol'` - Technical/code content (monospace, code styling)
- `'gloss'` - Minor annotations/citations (0.8-0.875rem, muted)
- `'motive'` - Persuasive/instructional text (semibold, accent color)
- `'quantum'` - Tags/chips/micro-content (tiny, uppercase, dense)

**4. `genesis-synapse($vector)` - Interaction**
Defines navigation and action patterns:
- `'navigate'` - Portal to different page (link, underline on hover)
- `'execute'` - Local state change/command (primary action button)
- `'inquiry'` - Request for more data (search, expand, secondary action)
- `'destructive'` - Permanent removal/reset (danger button, red/warning)
- `'social'` - Social sharing connection (rounded, social colors)

**5. `genesis-state($condition)` - Temporal State**
Defines time-based system condition:
- `'stable'` - Content in equilibrium (normal, verified, no special state)
- `'evolving'` - Currently updating/streaming (animated progress indicator)
- `'deprecated'` - No longer verified/current (strikethrough, warning icon)
- `'locked'` - Immutable, requires clearance (blur effect, lock icon)
- `'simulated'` - Projected data, not live (dashed border, diagonal stripes)

**6. `genesis-atmosphere($vibe)` - Sensory Texture**
Defines emotional tone and sensory feel:
- `'neutral'` - Standard system transparency (default, balanced)
- `'ethereal'` - High-transparency, light focus (bright, minimal, peaceful)
- `'void'` - Deep-space, high-contrast (dark, immersive, zero distraction)
- `'vibrant'` - High-energy, data-saturated (colorful, energetic, neon)

### Subdomain SCSS Rules (MANDATORY)

**ZERO Raw CSS:** Subdomain SCSS files MUST NOT contain:
- `margin`, `padding`, `display`, `color`, `font-size`, `background`, etc.
- Any pixel (`px`), rem, or other unit values
- Any color values (hex, rgb, oklch, etc.)
- Any CSS properties whatsoever

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

### Complete Example: Blog Post

```scss
---
---
@import "ontology/index";

.blog-post {
  @include genesis-environment('focused');     // Reading layout
  @include genesis-atmosphere('ethereal');     // Light, peaceful
  
  .post-header {
    @include genesis-entity('primary');        // Elevated card
    
    .post-title { 
      @include genesis-cognition('axiom');     // Large headline
    }
    
    .post-date { 
      @include genesis-cognition('gloss');     // Small metadata
    }
    
    .category-tag {
      @include genesis-cognition('quantum');   // Tiny chip
    }
  }
  
  .post-content {
    @include genesis-cognition('discourse');   // Body text
    
    .code-block {
      @include genesis-cognition('protocol');  // Monospace code
    }
  }
  
  .post-footer {
    @include genesis-entity('secondary');      // Lighter card
    
    .share-button {
      @include genesis-synapse('social');      // Social action
    }
    
    .read-more {
      @include genesis-synapse('navigate');    // Link to next
    }
  }
}
```

### Documentation & Examples
- **Full API guide**: `_sass/ontology/INTEGRATION-GUIDE.md` (11KB comprehensive reference)
- **Usage examples**: `_sass/ontology/_sample.scss` (6+ complete patterns)
- **Architecture SOP**: `_sass/ontology/Readme.md` (Three-tier system overview)
- **AI migration**: `_sass/ontology/refactor-agent.md` (Automated conversion guide)
- **Visual demo**: `/docs/ontology-demo.html` (HTML structure demonstration)

## Legacy Systems (Backward Compatibility Only)

**Note**: These systems are maintained for backward compatibility but are NOT recommended for new development. Use the ontology system instead.

### Bootstrap Compatibility Layer
- Legacy components may use Bootstrap classes via compatibility layer
- Compatibility layer in `_sass/base/_bootstrap-compat.scss`
- Gradually migrate to ontology system
- Bootstrap grid: `.container`, `.row`, `.col-*` (deprecated)

### Bento Engine Classes (HTML-only)
- `.bento-layout`, `.bento-dashboard`, `.bento-gallery` (deprecated)
- Replace with `genesis-environment()` mixins in SCSS

### Material Primitive Classes (HTML-only)
- `.material-glass`, `.material-glass-elevated` (deprecated)
- Replace with `genesis-entity()` mixins in SCSS

## Best Practices (Ontology System)

### Semantic Clarity
- Use meaningful class names: `.research-paper`, not `.blue-box`
- Think about WHAT it is, not HOW it looks
- One primary mixin from each category as needed

### Mirrored Structure
- SCSS nesting should mirror HTML DOM hierarchy exactly
- Makes code easier to understand and maintain

### Combining Mixins
- Apply one from each category for rich semantic meaning
- Example: `genesis-entity('imperative')` + `genesis-state('evolving')` + `genesis-atmosphere('vibrant')`

### Validation Checklist
Before committing subdomain SCSS:
- [ ] Imports `@import "ontology/index";` at the top
- [ ] No raw CSS properties anywhere in file
- [ ] All styling via ontological mixins only
- [ ] SCSS structure mirrors HTML hierarchy
- [ ] Semantic class names used throughout

## Best Practices (Theme Development)

When working on theme engine or legacy components:
- Use semantic tokens from design token system
- Never use raw OKLCH values directly
- Prefer CSS custom properties over Sass variables
- Add descriptive comments in partials
- Test color contrast before committing (WCAG AA minimum)
- Use fluid clamp() for all sizing
