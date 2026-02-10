# SCSS Ontology System Reference

*Complete reference for Genesis Semantic Engine v2.0*

## Quick Reference: Six Ontological Categories

### 1. `genesis-environment($logic)` - Layout Organization

Defines spatial arrangement and layout logic:

- `'distributed'` - Autonomous entities in Bento grid (auto-fit, responsive)
- `'focused'` - Single column for deep reading (max 70ch, centered)
- `'associative'` - Network layout where connections matter (flexbox wrap)
- `'chronological'` - Time-linear vertical stream (timeline, feed)
- `'manifest'` - High-density dashboard (12-column grid, monitoring)

### 2. `genesis-entity($nature)` - Visual Presence

Defines glassmorphism and visual weight:

- `'primary'` - Main content object (active glassmorphism, elevated)
- `'secondary'` - Supporting contextual data (lighter glass, less prominent)
- `'imperative'` - System-critical urgent signal (pulsing neon border, alert)
- `'latent'` - Dormant/inactive content (dimmed, grayscale filter)
- `'aggregate'` - Container for multiple items (larger padding, wrapper)
- `'ancestral'` - Archived/historical data (muted, legacy appearance)

### 3. `genesis-cognition($intent)` - Information Type

Defines typography based on semantic meaning:

- `'axiom'` - Foundational headlines (2-3.5rem, bold, high-resonance)
- `'discourse'` - Standard body prose (1-1.125rem, serif, readable)
- `'protocol'` - Technical/code content (monospace, code styling)
- `'gloss'` - Minor annotations/citations (0.8-0.875rem, muted)
- `'motive'` - Persuasive/instructional text (semibold, accent color)
- `'quantum'` - Tags/chips/micro-content (tiny, uppercase, dense)

### 4. `genesis-synapse($vector)` - Interaction

Defines navigation and action patterns:

- `'navigate'` - Portal to different page (link, underline on hover)
- `'execute'` - Local state change/command (primary action button)
- `'inquiry'` - Request for more data (search, expand, secondary action)
- `'destructive'` - Permanent removal/reset (danger button, red/warning)
- `'social'` - Social sharing connection (rounded, social colors)

### 5. `genesis-state($condition)` - Temporal State

Defines time-based system condition:

- `'stable'` - Content in equilibrium (normal, verified, no special state)
- `'evolving'` - Currently updating/streaming (animated progress indicator)
- `'deprecated'` - No longer verified/current (strikethrough, warning icon)
- `'locked'` - Immutable, requires clearance (blur effect, lock icon)
- `'simulated'` - Projected data, not live (dashed border, diagonal stripes)

### 6. `genesis-atmosphere($vibe)` - Sensory Texture

Defines emotional tone and sensory feel:

- `'neutral'` - Standard system transparency (default, balanced)
- `'ethereal'` - High-transparency, light focus (bright, minimal, peaceful)
- `'void'` - Deep-space, high-contrast (dark, immersive, zero distraction)
- `'vibrant'` - High-energy, data-saturated (colorful, energetic, neon)

## Color Philosophy - OKLCH Values

### Primary Colors (Core Hierarchy)

**Black text on white backgrounds** - Primary content, body text, headings
- Text: `oklch(0.10 0.01 250)` to `oklch(0.15 0.01 250)` (deep black)
- Background: `oklch(0.99 0.005 90)` (pure white)

**White text on black backgrounds** - Headers, footers, navigation, buttons
- Text: `oklch(0.99 0.005 90)` (white)
- Background: `oklch(0.08 0.01 250)` to `oklch(0.12 0.01 250)` (black)

### Secondary Colors

**Light gray backgrounds** - Use when semantic purpose requires distinction from white
- `oklch(0.96 0.005 220)` - Very light gray for cards with purpose

**Dark gray text** - Secondary information, metadata
- `oklch(0.30 0.01 230)` to `oklch(0.35 0.01 230)`

### Accent Colors (Use Purposefully)

**Neon blue** - For interaction feedback, focus states, and emphasis
- `oklch(0.65 0.25 230)` - Use for hover states, focus rings, active elements
- **When to use**: Links on hover, button interactions, focus indicators, alerts
- **Avoid**: Background fills or large surface areas

**Gold** - For special highlights and sacred elements
- `oklch(0.70 0.15 85)` - Use purposefully for emphasis
- **When to use**: Special features, premium content, sacred elements
- **Avoid**: Overuse that diminishes impact

### Design Guidelines

**Avoid Excessive Use:**
- Too many blue tints in backgrounds (use white/light gray instead)
- Multiple levels of nested colored boxes (flatten hierarchy)
- Purple, green backgrounds (use established palette)
- Rose/peach backgrounds (replace with appropriate colors)
- Overuse of glassmorphism effects

**Visual Hierarchy:**
- **Purposeful nesting** - Only nest boxes when semantically meaningful
- **Border radius** - Use as appropriate for the design, not arbitrarily reduced
- **Color accents** - Each color should serve a purpose
- **Glassmorphism** - Use for specific UI needs (headers, modals), not everywhere

## Complete Usage Example

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

## Design Tokens Reference

### Ontology CSS Custom Properties

The ontology engine uses 150+ CSS custom properties defined in `_sass/ontology/_tokens.scss`:

**Spacing:**
- `--space-bento`, `--space-narrative`, `--space-network`

**Typography:**
- `--font-size-*`, `--font-weight-*`, `--line-height-*`

**Colors:**
- `--glass-*`, `--accent-*`, `--border-*`

**Motion:**
- `--motion-fluid`, `--motion-snap`

### Legacy Sass Variables (Theme Internal Use)

For legacy components: `_sass/base/_design-tokens.scss`
- Surface tokens: `$surface-primary`, `$surface-elevated`, `$surface-glass`
- Text tokens: `$text-primary`, `$text-secondary`, `$text-accent`
- Accent tokens: `$accent-glow`, `$accent-neural`, `$accent-essence`
- Border tokens: `$border-primary`, `$border-accent`, `$border-glow`
- Shadow tokens: `$shadow-sm`, `$shadow-md`, `$shadow-glow-essence`

**Note**: When using ontology mixins, you never touch these directly.

## Import Rules

### When to Import `ontology/index`

**DO import in standalone SCSS files:**
- ✅ Subdomain SCSS files (e.g., `assets/css/custom-styles.scss`)
- ✅ Standalone example/demo files (e.g., `assets/css/ontology-examples.scss`)
- ✅ Any SCSS file that is a **compilation entry point** (has Jekyll front matter `---`)

**DO NOT import in theme internal files:**
- ❌ Component partials in `_sass/components/` (already available via `_common.scss`)
- ❌ Layout partials in `_sass/layouts/` (already available via `_common.scss`)
- ❌ Any file imported by `_common.scss` (creates duplication and CSS bloat)

**Why this matters:**
- `_common.scss` imports `ontology/index` at line 37
- `_common.scss` then imports all component and layout partials
- If components/layouts also import ontology, the entire system gets duplicated
- This causes **massive CSS bloat** (22MB instead of 1.1MB output)
- Compilation becomes much slower

## Documentation References

- **Full API guide**: `_sass/ontology/INTEGRATION-GUIDE.md` (comprehensive reference)
- **Usage examples**: `_sass/ontology/_sample.scss` (complete patterns)
- **Architecture SOP**: `_sass/ontology/Readme.md` (three-tier system)
- **AI migration**: `_sass/ontology/refactor-agent.md` (automated conversion)
- **Visual demo**: `/docs/ontology-demo.html` (HTML demonstration)
- **Variant history**: `GENOME.md` (evolution and rationale)
