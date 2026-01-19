# Futuristic Effects Reference Guide

This guide provides comprehensive reference for implementing advanced visual effects in the Genesis Semantic Design System while maintaining semantic purity and accessibility.

## Table of Contents

1. [Core Principles](#core-principles)
2. [Glassmorphism Effects](#glassmorphism-effects)
3. [Glow Effects](#glow-effects)
4. [Gradient Patterns](#gradient-patterns)
5. [Animations](#animations)
6. [Performance Optimization](#performance-optimization)
7. [Accessibility Requirements](#accessibility-requirements)
8. [Common Patterns](#common-patterns)

## Core Principles

### Effects as Atmosphere Layer

Effects are applied through the `genesis-atmosphere()` mixin system, never as standalone styling:

**✅ CORRECT - Effects with Semantic Foundation:**
```scss
.hero-section {
  @include genesis-environment('focused');      // Spatial structure
  @include genesis-entity('primary');          // Visual presence
  @include genesis-atmosphere('vibrant');      // Effects layer
}
```

**❌ WRONG - Effects Without Semantics:**
```scss
.hero-section {
  background: linear-gradient(...);  // Raw CSS
  backdrop-filter: blur(20px);       // No semantic context
}
```

### The Effects Hierarchy

1. **Base Layer**: Environment + Entity (semantic structure)
2. **Effects Layer**: Atmosphere (visual enhancement)
3. **Interaction Layer**: Synapse (hover, focus states)

## Glassmorphism Effects

### Available Glass Variants

#### Consciousness Glass (Primary)
```scss
@include glass-consciousness($blur: 24px, $opacity: 0.08);
```

**Properties:**
- Blur: 20-28px (high)
- Opacity: 0.06-0.1
- Border: Subtle light border
- Use case: Primary cards, hero sections

**Example:**
```scss
.feature-card {
  @include genesis-entity('primary');  // Includes consciousness glass
}
```

#### Neural Glass (Secondary)
```scss
@include glass-neural($opacity: 0.06);
```

**Properties:**
- Blur: 16px (medium)
- Opacity: 0.04-0.08
- Border: Very subtle
- Use case: Secondary content, sidebar panels

#### Ethereal Glass (Minimal)
```scss
@include glass-ethereal($opacity: 0.03);
```

**Properties:**
- Blur: 12px (low)
- Opacity: 0.02-0.05
- Border: Barely visible
- Use case: Backgrounds, overlays

### Glass Implementation Rules

1. **Always on semantic foundation** - Never apply glass without ontological context
2. **Performance budget** - Max 3 glass layers per viewport
3. **High-contrast fallback** - Must work with `prefers-contrast: high`
4. **Reduced transparency** - Use `prefers-reduced-transparency` support

**High-Contrast Example:**
```scss
.glass-panel {
  @include genesis-entity('primary');
  
  @media (prefers-contrast: high) {
    // Glass automatically disabled in high-contrast mode
    // Solid background applied instead
  }
}
```

## Glow Effects

### Available Glow Variants

#### Essence Glow (Accent Emphasis)
```scss
@include glow-essence($color: var(--accent-consciousness), $intensity: 1);
```

**Properties:**
- Spread: 0-20px
- Opacity: 0.3-0.6
- Use case: Call-to-action buttons, important alerts

**Example:**
```scss
.cta-button {
  @include genesis-synapse('execute');
  @include genesis-entity('imperative');  // Includes essence glow
}
```

#### Neural Glow (Neon Border)
```scss
@include glow-neural($color: var(--accent-neural), $intensity: 0.8);
```

**Properties:**
- Inner glow effect
- Pulsing animation optional
- Use case: Active states, focus indicators

#### Quantum Glow (Subtle Shimmer)
```scss
@include glow-quantum($intensity: 0.5);
```

**Properties:**
- Very subtle, 0-8px spread
- Multi-color shimmer
- Use case: Hover states, interactive elements

### Glow Performance Budget

- **Max 2 active glows** per viewport
- **Disable on mobile** (performance)
- **Reduced-motion support** required for animated glows

**Mobile Optimization:**
```scss
.glow-element {
  @include genesis-entity('imperative');
  
  @media (max-width: 767px) {
    // Glows automatically reduced on mobile
    box-shadow: none;
  }
}
```

## Gradient Patterns

### Consciousness Gradient
```scss
@include gradient-consciousness($angle: 135deg);
```

**Colors:** Violet → Blue → Cyan  
**Use case:** Hero backgrounds, primary sections

### Genesis Gradient
```scss
@include gradient-genesis($angle: 90deg);
```

**Colors:** Gold → Amber → Orange  
**Use case:** Accent elements, highlights

### Void Gradient
```scss
@include gradient-void($angle: 180deg);
```

**Colors:** Deep purple → Black → Deep blue  
**Use case:** Dark mode backgrounds, dramatic sections

### Gradient Best Practices

1. **Angle consistency** - Use 90deg, 135deg, or 180deg
2. **Contrast ratio** - Ensure WCAG AA on text overlays
3. **Performance** - Prefer CSS gradients over images
4. **Fallback** - Solid color for reduced-transparency

## Animations

### Consciousness Pulse
```scss
@include animation-consciousness-pulse($duration: 3s);
```

**Effect:** Subtle scale + opacity pulse  
**Use case:** Loading states, "breathing" UI

### Neural Flow
```scss
@include animation-neural-flow($duration: 2s);
```

**Effect:** Left-to-right shimmer  
**Use case:** Processing indicators, data streams

### Quantum Shimmer
```scss
@include animation-quantum-shimmer($duration: 4s);
```

**Effect:** Multi-color glow cycle  
**Use case:** Special emphasis, magical moments

### Animation Requirements (MANDATORY)

**Reduced-Motion Support:**
```scss
.animated-element {
  @include animation-consciousness-pulse(3s);
  
  @media (prefers-reduced-motion: reduce) {
    animation: none;  // Automatically applied by mixins
  }
}
```

All animation mixins automatically respect `prefers-reduced-motion: reduce`.

## Performance Optimization

### Performance Budget

| Effect Type | Mobile | Tablet | Desktop |
|-------------|--------|--------|---------|
| Glass Layers | 1 | 2 | 3 |
| Active Glows | 0 | 1 | 2 |
| Animations | 0-1 | 1-2 | 2-3 |
| Gradient Complexity | Simple | Medium | Complex |

### Optimization Techniques

**1. Conditional Loading:**
```scss
.heavy-effects {
  @include genesis-entity('primary');  // Base only
  
  @media (min-width: 1024px) {
    @include genesis-atmosphere('vibrant');  // Effects on desktop
  }
}
```

**2. GPU Acceleration:**
```scss
// Automatically applied by ontology mixins
.accelerated {
  transform: translateZ(0);
  will-change: transform;
}
```

**3. Reduce Blur on Mobile:**
```scss
// Ontology mixins automatically reduce blur:
// Desktop: 24px blur
// Tablet: 16px blur
// Mobile: 12px blur
```

## Accessibility Requirements

### Mandatory Checks

1. **✅ Contrast Ratio** - WCAG AA (4.5:1 for text)
2. **✅ Reduced Motion** - Disable animations
3. **✅ High Contrast** - Disable glass, increase borders
4. **✅ Reduced Transparency** - Solid backgrounds fallback
5. **✅ Keyboard Focus** - Visible indicators
6. **✅ Screen Reader** - Effects don't hide content

### High-Contrast Mode

```scss
@media (prefers-contrast: high) {
  .glass-card {
    // Automatically converted to:
    background: var(--surface-primary);  // Solid
    border: 2px solid var(--border-primary);  // Visible border
    backdrop-filter: none;  // No blur
  }
}
```

### Reduced Transparency Mode

```scss
@media (prefers-reduced-transparency: reduce) {
  .glass-overlay {
    background: var(--surface-primary);  // Solid, not transparent
    backdrop-filter: none;
  }
}
```

## Common Patterns

### Hero Section with Full Effects
```scss
.hero-section {
  @include genesis-environment('focused');
  @include genesis-entity('primary');
  @include genesis-atmosphere('vibrant');
  
  .hero-title {
    @include genesis-cognition('axiom');
    @include animation-consciousness-pulse(4s);
  }
  
  .hero-cta {
    @include genesis-synapse('execute');
    @include genesis-entity('imperative');  // Includes glow
  }
}
```

### Card Grid with Glass
```scss
.feature-grid {
  @include genesis-environment('distributed');
  
  .feature-card {
    @include genesis-entity('primary');  // Glass applied
    
    &:hover {
      @include glow-quantum(0.6);  // Subtle hover glow
    }
  }
}
```

### Dashboard with Layered Effects
```scss
.dashboard {
  @include genesis-environment('manifest');
  @include genesis-atmosphere('void');  // Dark gradient
  
  .widget {
    @include genesis-entity('secondary');  // Lighter glass
    
    &.active {
      @include genesis-entity('imperative');  // Glow when active
    }
  }
}
```

### Loading State with Animation
```scss
.loading-indicator {
  @include genesis-entity('latent');  // Dimmed
  @include animation-neural-flow(2s);
  
  @media (prefers-reduced-motion: reduce) {
    // Animation automatically disabled
    opacity: 0.5;  // Static indicator
  }
}
```

## Troubleshooting

### Issue: Glass effect not visible
- **Check**: Is element on dark background?
- **Solution**: Ensure contrast, adjust opacity

### Issue: Performance lag
- **Check**: How many glass layers?
- **Solution**: Reduce to budget limits, optimize blur

### Issue: Glow not showing
- **Check**: Is glow color similar to background?
- **Solution**: Increase contrast, adjust color

### Issue: Animation causing motion sickness
- **Check**: Is reduced-motion supported?
- **Solution**: Add `prefers-reduced-motion` fallback

## Resources

- **SKILL.md** - Full agent instructions
- **_sass/ontology/INTEGRATION-GUIDE.md** - Complete mixin reference
- **GENOME.md** - Effects evolution history
- **.github/instructions/scss.instructions.md** - SCSS coding standards

---

**Version**: 2.1  
**Last Updated**: 2026-01-19  
**Maintained by**: futuristic-effects-agent
