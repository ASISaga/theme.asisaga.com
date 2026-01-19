# Design Tokens Translation Guide

**Version**: 1.0  
**Purpose**: Comprehensive guide for translating Figma design tokens to Genesis Semantic Design System  
**Audience**: Figma Design Bridge Agent, developers, designers

---

## Overview

This guide provides detailed instructions for extracting design tokens from Figma and translating them into the Genesis Semantic Design System's OKLCH-based token architecture.

## Color Token Translation

### Step 1: Extract from Figma

Use Figma MCP to access color variables or extract colors from design elements:

```javascript
// Example Figma color structure
{
  "colors": {
    "surface/primary": "#1a1a2e",
    "surface/secondary": "#16213e",
    "accent/neural": "#8b5cf6",
    "accent/life-force": "#10b981",
    "text/primary": "#ffffff",
    "text/secondary": "rgba(255, 255, 255, 0.7)"
  }
}
```

### Step 2: Convert Hex to OKLCH

**Why OKLCH?**
- Perceptually uniform color space
- Better for gradients and color manipulation
- HDR-ready for future displays
- Consistent lightness perception

**Conversion Process**:

1. Use color conversion tool or library
2. Format: `oklch(L% C H [/ alpha])`
   - L (Lightness): 0-100%
   - C (Chroma): 0-0.4 typically
   - H (Hue): 0-360 degrees

**Example Conversions**:

```scss
// Dark Surface
#1a1a2e → oklch(15% 0.02 260)

// Secondary Surface
#16213e → oklch(18% 0.03 250)

// Neural Accent (Purple)
#8b5cf6 → oklch(55% 0.25 290)

// Life Force Accent (Green)
#10b981 → oklch(65% 0.18 160)

// White Text
#ffffff → oklch(100% 0 0)

// Semi-transparent White
rgba(255, 255, 255, 0.7) → oklch(100% 0 0 / 0.7)
```

### Step 3: Map to Genesis Tokens

Match extracted colors to appropriate semantic tokens in `_sass/ontology/_tokens.scss`:

| Figma Variable Name | OKLCH Value | Genesis Token | Usage |
|---------------------|-------------|---------------|-------|
| surface/primary | oklch(15% 0.02 260) | `--surface-primary` | Main background |
| surface/secondary | oklch(18% 0.03 250) | `--surface-secondary` | Elevated elements |
| surface/glass | (with alpha) | `--glass-surface` | Glassmorphism backgrounds |
| accent/neural | oklch(55% 0.25 290) | `--accent-neural` | AI/tech accent |
| accent/life-force | oklch(65% 0.18 160) | `--accent-life-force` | Growth/progress |
| accent/consciousness | oklch(60% 0.22 45) | `--accent-consciousness` | Wisdom/insight |
| accent/essence | oklch(70% 0.20 90) | `--accent-essence` | Energy/power |
| text/primary | oklch(100% 0 0) | `--text-primary` | Primary text |
| text/secondary | oklch(100% 0 0 / 0.7) | `--text-secondary` | Supporting text |
| text/accent | (varies) | `--text-accent` | Highlighted text |
| border/primary | oklch(30% 0.02 260) | `--border-primary` | Standard borders |
| border/accent | (varies) | `--border-accent` | Emphasized borders |

### Step 4: Implement in Code

**Never use raw hex values**:

```scss
// ❌ WRONG: Raw hex from Figma
.component {
  background-color: #1a1a2e;
  color: #ffffff;
}

// ✅ CORRECT: Genesis semantic tokens
.component {
  background-color: var(--surface-primary);
  color: var(--text-primary);
}
```

**For theme engine work** (advanced):

```scss
// In _sass/ontology/_tokens.scss
:root {
  // Surface tokens
  --surface-primary: oklch(15% 0.02 260);
  --surface-secondary: oklch(18% 0.03 250);
  
  // Accent tokens
  --accent-neural: oklch(55% 0.25 290);
  --accent-life-force: oklch(65% 0.18 160);
}
```

## Typography Token Translation

### Step 1: Extract Figma Text Styles

Example Figma typography structure:

```javascript
{
  "textStyles": {
    "Display/XL": {
      "fontFamily": "Inter",
      "fontSize": "72px",
      "fontWeight": "700",
      "lineHeight": "1.1",
      "letterSpacing": "-0.02em"
    },
    "Heading/H1": {
      "fontFamily": "Inter",
      "fontSize": "48px",
      "fontWeight": "700",
      "lineHeight": "1.2"
    },
    "Body/Regular": {
      "fontFamily": "Inter",
      "fontSize": "16px",
      "fontWeight": "400",
      "lineHeight": "1.6"
    },
    "Code/Mono": {
      "fontFamily": "Fira Code",
      "fontSize": "14px",
      "fontWeight": "400",
      "lineHeight": "1.5"
    }
  }
}
```

### Step 2: Map to Cognition Variants

**Genesis Cognition System** (information-type based):

| Figma Text Style | Information Type | Genesis Variant | Typical Size Range |
|------------------|------------------|-----------------|-------------------|
| Display XL/XXL | Foundational headlines | `axiom` | 2-3.5rem (32-56px) |
| Heading 1-3 | Major headlines | `axiom` | 1.5-2.5rem (24-40px) |
| Body Large/Regular | Standard content | `discourse` | 1-1.125rem (16-18px) |
| Body Small | Dense paragraphs | `discourse` | 0.875-1rem (14-16px) |
| Code/Mono | Technical content | `protocol` | 0.875-1rem (14-16px) |
| Caption/Label | Small metadata | `gloss` | 0.75-0.875rem (12-14px) |
| Button/CTA | Instructional text | `motive` | 0.875-1rem (14-16px) |
| Tag/Badge | Micro labels | `quantum` | 0.625-0.75rem (10-12px) |

**Key Principle**: Choose based on **semantic intent**, not size alone.

### Step 3: Implement in SCSS

Use `genesis-cognition()` mixins instead of raw font properties:

```scss
// ❌ WRONG: Raw typography from Figma
.article-title {
  font-family: 'Inter', sans-serif;
  font-size: 48px;
  font-weight: 700;
  line-height: 1.2;
}

// ✅ CORRECT: Genesis cognition mixin
.article-title {
  @include genesis-cognition('axiom');
  // All typography properties handled by engine
}
```

### Step 4: Understanding Fluid Typography

Genesis uses `clamp()` for responsive typography:

```scss
// Engine implementation (theme internal)
@mixin genesis-cognition($intent) {
  @if $intent == 'axiom' {
    font-size: clamp(2rem, 5vw, 3.5rem);      // Scales with viewport
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-tight);
  }
  @else if $intent == 'discourse' {
    font-size: clamp(1rem, 2vw, 1.125rem);
    font-weight: var(--font-weight-normal);
    line-height: var(--line-height-relaxed);
  }
  // ...additional variants
}
```

**Developers**: Don't override these values. If size feels wrong, the design may need a different cognition variant.

## Spacing Token Translation

### Step 1: Extract Figma Auto Layout Spacing

Example Figma spacing:

```javascript
{
  "components": {
    "Card": {
      "paddingTop": "24px",
      "paddingRight": "24px",
      "paddingBottom": "24px",
      "paddingLeft": "24px",
      "gap": "16px"
    },
    "Button": {
      "paddingTop": "12px",
      "paddingRight": "24px",
      "paddingBottom": "12px",
      "paddingLeft": "24px"
    }
  }
}
```

### Step 2: Map to Genesis Space Tokens

| Figma Spacing | Genesis Token | Use Case |
|---------------|---------------|----------|
| 4px | `--space-quantum` | Tiny gaps, tight spacing |
| 8px | `--space-network` | Component internal spacing |
| 12px | `--space-synapse` | Small component padding |
| 16px | `--space-narrative` | Comfortable reading spacing |
| 24px | `--space-bento` | Card/section padding |
| 32px | `--space-manifest` | Section margins |
| 48px | `--space-environment` | Large section gaps |
| 64px+ | `--space-cosmos` | Major layout divisions |

### Step 3: Implement via Ontology

**Spacing is handled by ontological mixins**, not manual padding:

```scss
// ❌ WRONG: Manual spacing from Figma
.card {
  padding: 24px;
  gap: 16px;
}

// ✅ CORRECT: Ontology handles spacing
.card {
  @include genesis-entity('primary');
  // Padding, gap handled by entity mixin
}
```

**How ontology handles spacing** (engine layer):

```scss
// Theme internal - engine layer
@mixin genesis-entity($nature) {
  @if $nature == 'primary' {
    padding: var(--space-bento);      // 24px
    gap: var(--space-narrative);      // 16px
  }
  @else if $nature == 'secondary' {
    padding: var(--space-narrative);  // 16px
    gap: var(--space-network);        // 8px
  }
}
```

## Effect Token Translation

### Glassmorphism from Figma

Figma effects (blur, transparency) → Genesis atmosphere variants

**Example Figma Effects**:
```javascript
{
  "backgroundBlur": "20px",
  "backgroundOpacity": 0.1,
  "borderOpacity": 0.2,
  "shadowBlur": "40px"
}
```

**Genesis Mapping**:
```scss
.glass-card {
  @include genesis-entity('primary');
  @include genesis-atmosphere('ethereal');
  // Handles blur, transparency, borders automatically
}
```

**Engine Implementation** (reference):
```scss
@mixin genesis-atmosphere($vibe) {
  @if $vibe == 'ethereal' {
    backdrop-filter: blur(20px);
    background-color: var(--glass-light);  // oklch with low opacity
    border: 1px solid var(--border-glass-light);
  }
  @else if $vibe == 'void' {
    backdrop-filter: blur(40px);
    background-color: var(--glass-dark);
    border: 1px solid var(--border-glass-dark);
  }
}
```

### Shadow Effects

**Figma Shadows** → Genesis shadow tokens

```javascript
// Figma shadow
{
  "shadowType": "drop-shadow",
  "x": 0,
  "y": 4,
  "blur": 16,
  "spread": 0,
  "color": "rgba(0, 0, 0, 0.3)"
}
```

**Genesis Shadow Tokens**:
```scss
:root {
  --shadow-sm: 0 2px 8px oklch(0% 0 0 / 0.1);
  --shadow-md: 0 4px 16px oklch(0% 0 0 / 0.2);
  --shadow-lg: 0 8px 32px oklch(0% 0 0 / 0.3);
  --shadow-glow-neural: 0 0 20px oklch(55% 0.25 290 / 0.4);
}
```

**Usage**:
```scss
// Handled by ontology
.elevated-card {
  @include genesis-entity('primary');
  // Box shadow applied automatically
}
```

## Border Radius Translation

**Figma Corner Radius** → Genesis radius tokens

| Figma Radius | Genesis Token | Use Case |
|--------------|---------------|----------|
| 4px | `--radius-sm` | Small elements, tags |
| 8px | `--radius-md` | Buttons, inputs |
| 12px | `--radius-bento` | Cards, components |
| 16px | `--radius-lg` | Large cards |
| 24px+ | `--radius-xl` | Hero sections |
| 999px | `--radius-pill` | Pill buttons, badges |

**Applied via ontology**:
```scss
.component {
  @include genesis-entity('primary');
  // Border radius handled automatically
}
```

## Animation & Transition Tokens

**Figma Smart Animate** → Genesis motion tokens

| Figma Animation | Genesis Token | Duration |
|----------------|---------------|----------|
| Quick state change | `--motion-snap` | 150ms |
| Standard transition | `--motion-fluid` | 300ms |
| Smooth animation | `--motion-gentle` | 500ms |

**Easing Functions**:
```scss
:root {
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
}
```

**Reduced Motion Support**:
```scss
@media (prefers-reduced-motion: reduce) {
  :root {
    --motion-snap: 0ms;
    --motion-fluid: 0ms;
    --motion-gentle: 0ms;
  }
}
```

## Complete Translation Example

### Figma Component: "Feature Card"

**Figma Specifications**:
```javascript
{
  "name": "Feature Card",
  "layout": {
    "direction": "vertical",
    "padding": "24px",
    "gap": "16px"
  },
  "background": {
    "color": "#1a1a2e",
    "blur": "20px",
    "opacity": 0.8
  },
  "border": {
    "radius": "12px",
    "color": "rgba(139, 92, 246, 0.2)"
  },
  "elements": {
    "icon": { "size": "48px" },
    "title": {
      "style": "Heading/H2",
      "color": "#ffffff"
    },
    "description": {
      "style": "Body/Regular",
      "color": "rgba(255, 255, 255, 0.7)"
    },
    "cta": {
      "style": "Button/Primary"
    }
  }
}
```

**Genesis Translation**:

HTML:
```html
<div class="feature-card">
  <svg class="feature-card__icon" aria-hidden="true">...</svg>
  <h2 class="feature-card__title">Advanced Analytics</h2>
  <p class="feature-card__description">
    Track performance metrics in real-time with AI-powered insights.
  </p>
  <button class="feature-card__cta">Learn More</button>
</div>
```

SCSS:
```scss
---
---
@import "ontology/index";

.feature-card {
  @include genesis-entity('primary');        // Handles padding, background, border
  @include genesis-environment('focused');    // Vertical layout, gap
  @include genesis-atmosphere('ethereal');    // Glassmorphism effects
  
  .feature-card__icon {
    // Size handled by icon system or custom property
  }
  
  .feature-card__title {
    @include genesis-cognition('axiom');     // Heading typography
  }
  
  .feature-card__description {
    @include genesis-cognition('discourse'); // Body text
  }
  
  .feature-card__cta {
    @include genesis-synapse('execute');     // Primary action button
  }
}
```

**Tokens Automatically Applied**:
- Padding: `--space-bento` (24px)
- Gap: `--space-narrative` (16px)
- Background: `--glass-surface` with `--surface-primary` base
- Border radius: `--radius-bento` (12px)
- Border color: `--border-accent` (neural accent with transparency)
- Text colors: `--text-primary`, `--text-secondary`

---

## Common Pitfalls

### ❌ Pitfall 1: Using Raw Hex Values

```scss
// ❌ WRONG
.component {
  background-color: #1a1a2e;  // From Figma
  color: #8b5cf6;             // From Figma
}

// ✅ CORRECT
.component {
  background-color: var(--surface-primary);
  color: var(--accent-neural);
}
```

### ❌ Pitfall 2: Pixel-Perfect Spacing

```scss
// ❌ WRONG: Exact Figma measurements
.component {
  padding: 24px 24px 24px 24px;
  margin-bottom: 16px;
}

// ✅ CORRECT: Ontology handles spacing
.component {
  @include genesis-entity('primary');
  // Spacing handled automatically
}
```

### ❌ Pitfall 3: Font Size Without Context

```scss
// ❌ WRONG: Size from Figma
.title {
  font-size: 48px;
  font-weight: 700;
}

// ✅ CORRECT: Semantic typography
.title {
  @include genesis-cognition('axiom');
  // Size, weight, line-height handled semantically
}
```

### ❌ Pitfall 4: Ignoring Semantic Intent

```scss
// ❌ WRONG: Visual-only thinking
.big-purple-box {
  // Describes HOW it looks, not WHAT it is
}

// ✅ CORRECT: Semantic naming + ontology
.featured-announcement {
  @include genesis-entity('imperative');
  @include genesis-atmosphere('vibrant');
  // Describes role, ontology provides appropriate styling
}
```

## Validation Checklist

Before completing token translation:

- [ ] All hex colors converted to OKLCH
- [ ] Colors mapped to semantic Genesis tokens
- [ ] Typography mapped to cognition variants (not raw font-size)
- [ ] Spacing handled via ontology mixins (not manual padding/margin)
- [ ] Effects (blur, shadow) applied via atmosphere variants
- [ ] Border radius using Genesis radius tokens
- [ ] Animations using Genesis motion tokens
- [ ] Semantic class names (WHAT, not HOW)
- [ ] Zero raw CSS properties in subdomain SCSS
- [ ] Design intent documented in code comments
- [ ] Accessibility maintained (contrast, touch targets)

---

## Resources

### Tools
- [OKLCH Color Picker](https://oklch.com)
- [Figma to OKLCH Converter](https://www.figma.com/community/plugin/...)
- [Contrast Checker](https://webaim.org/resources/contrastchecker/)

### Genesis Documentation
- [Ontology Integration Guide](../../../_sass/ontology/INTEGRATION-GUIDE.md)
- [Design Tokens Reference](../../../_sass/ontology/_tokens.scss)
- [SCSS Instructions](../../instructions/scss.instructions.md)

### Related Skills
- [Figma Design Bridge Agent](../SKILL.md)
- [SCSS Refactor Agent](../../scss-refactor-agent/SKILL.md)
- [Theme Genome Agent](../../theme-genome-agent/SKILL.md)

---

**Version**: 1.0  
**Last Updated**: 2026-01-19  
**Maintainer**: ASI Saga Agent Ecosystem
