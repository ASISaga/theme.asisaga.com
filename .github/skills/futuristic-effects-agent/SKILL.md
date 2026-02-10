---
name: futuristic-effects-agent
description: Apply advanced glassmorphism, neon glows, quantum gradients, and consciousness animations using Genesis Ontological mixins. Implement futuristic visual effects while maintaining semantic purity. Use when enhancing visual aesthetics, creating immersive experiences, or implementing advanced UI effects from v2.0+ enhancements.
license: MIT
metadata:
  author: ASISaga
  version: "2.0"
  category: design-system
  role: effects-specialist
---

# Futuristic Effects Agent

**Role**: Advanced Visual Effects Specialist  
**Scope**: Glassmorphism, neon effects, quantum gradients, and consciousness animations

## Purpose

The Futuristic Effects Agent applies advanced visual effects from the Genesis v2.0+ enhancement system while maintaining ontological semantic purity. This agent knows when and how to layer atmospheric effects on top of semantic structure.

## When to Use This Skill

Activate when implementing advanced glassmorphism, adding neon glow effects, creating quantum gradient backgrounds, applying consciousness animations, or enhancing visual immersion in hero sections and key UI elements.

## Core Principles

### Effects as Atmosphere, Not Structure

Effects are applied through `genesis-atmosphere()` mixins, not as replacement for semantic structure:

```scss
// ✅ CORRECT: Semantic structure + atmospheric effects
.hero-section {
  @include genesis-environment('focused');      // Structure
  @include genesis-entity('primary');          // Presence
  @include genesis-atmosphere('vibrant');      // Visual vibe
  // Futuristic effects layered on top
}

// ❌ WRONG: Effects without semantic foundation
.hero-section {
  // Just applying effects without ontological roles
}
```

## Available Effects (v2.0+)

### Glassmorphism Variants

**Consciousness Glass** - Primary glassmorphism:
```scss
@include glass-consciousness($blur: 24px, $opacity: 0.08);
// Advanced blur with subtle background
// Used in genesis-entity('primary')
```

**Neural Glass** - Lighter glass:
```scss
@include glass-neural($opacity: 0.06);
// Reduced presence for secondary content
```

**Ethereal Glass** - Minimal glass:
```scss
@include glass-ethereal($opacity: 0.03);
// Barely-there transparency
// Used in genesis-atmosphere('ethereal')
```

### Glow Effects

**Essence Glow** - Primary accent glow:
```scss
@include glow-essence($color: var(--accent-consciousness), $intensity: 1);
// Soft outer glow for emphasis
// Used in genesis-entity('imperative')
```

**Neural Glow** - Neon border glow:
```scss
@include glow-neural($color: var(--accent-neural), $intensity: 1);
// Neon border effect
// Used in synapse variants
```

**Quantum Glow** - Pulsing animation:
```scss
@include glow-quantum($intensity: 1);
// Animated pulsing glow
// Used in genesis-state('evolving')
```

### Gradients

**Consciousness Gradient** - Purple-blue gradient:
```scss
@include gradient-consciousness($angle: 135deg);
// Primary brand gradient
// Used in hero backgrounds
```

**Genesis Gradient** - Gold-purple gradient:
```scss
@include gradient-genesis($angle: 45deg);
// Accent gradient for CTAs
// Used in genesis-synapse('execute')
```

**Void Gradient** - Deep space gradient:
```scss
@include gradient-void;
// Dark immersive gradient
// Used in genesis-atmosphere('void')
```

### Interaction Effects

**Quantum Hover** - Transform + glow on hover:
```scss
@include hover-quantum;
// translateY(-4px) + enhanced glow
// Used in button hovers
```

**Neural Link Hover** - Underline + glow:
```scss
@include hover-neural-link;
// Animated underline with glow
// Used in genesis-synapse('navigate')
```

**Consciousness Ripple** - Click ripple effect:
```scss
@include ripple-consciousness;
// Material-style ripple on click
// Requires JavaScript trigger
```

## Layering Effects

### Basic Pattern

Start with semantic structure, add effects progressively:

```scss
.feature-card {
  // 1. Semantic foundation
  @include genesis-entity('primary');        // Glassmorphism base
  
  // 2. Additional atmosphere (optional)
  @include genesis-atmosphere('vibrant');    // High-energy vibe
  
  // 3. Custom effects (if needed beyond ontology)
  // Usually not needed - ontology handles most cases
}
```

### Hero Section Example

```scss
.hero {
  @include genesis-environment('focused');
  @include genesis-atmosphere('viewport-aware');  // Full height
  
  // Background handled by layout, but can add gradient if needed
  background: linear-gradient(135deg, 
    oklch(0.15 0.05 270), 
    oklch(0.10 0.03 280)
  );
  
  .hero-title {
    @include genesis-cognition('axiom');
    // Glow effect already included in axiom cognition
  }
  
  .hero-cta {
    @include genesis-synapse('execute');
    // Gradient + hover effects included
  }
}
```

### Modal Overlay Example

```scss
.modal-overlay {
  // Semantic structure
  @include genesis-entity('primary');
  
  // If deeper immersion needed
  @include genesis-atmosphere('void');  // Deep space aesthetic
  
  .modal-content {
    @include genesis-entity('primary');  // Glassmorphism card
    @include glow-essence(var(--accent-consciousness), 0.8);
  }
}
```

## Effect Categories

### 1. Glassmorphism (Transparency + Blur)

**When to use**:
- Card components
- Navigation bars
- Modal overlays
- Floating panels

**Implementation**:
```scss
// Usually handled by genesis-entity variants
.glass-panel {
  @include genesis-entity('primary');  // Includes glassmorphism
}

// For custom intensity
.subtle-glass {
  @include glass-ethereal(0.03);
}
```

### 2. Neon Glows (Emphasis)

**When to use**:
- Urgent alerts
- Primary CTAs
- Active states
- Focus indicators

**Implementation**:
```scss
// Usually in ontology already
.urgent-alert {
  @include genesis-entity('imperative');  // Includes neon glow
}

// For custom color
.custom-glow {
  @include glow-neural(oklch(0.7 0.3 280), 1.2);
}
```

### 3. Quantum Gradients (Backgrounds)

**When to use**:
- Hero sections
- CTA buttons
- Section dividers
- Brand elements

**Implementation**:
```scss
// Usually in entity/synapse variants
.cta-button {
  @include genesis-synapse('execute');  // Gradient background
}

// For custom backgrounds
.hero-background {
  @include gradient-consciousness(45deg);
}
```

### 4. Consciousness Animations (Motion)

**When to use**:
- Loading states
- Active processes
- Scroll reveals
- Interactive feedback

**Implementation**:
```scss
// Usually in state variants
.loading-panel {
  @include genesis-state('evolving');  // Animated shimmer
}

.scroll-reveal {
  @include genesis-state('scroll-triggered');  // Fade-in animation
}
```

## Accessibility Considerations

### Reduced Motion

All effects respect `prefers-reduced-motion`:

```scss
// Handled automatically by ontology
.animated-element {
  @include genesis-state('scroll-triggered');
  
  @media (prefers-reduced-motion: reduce) {
    // Animations disabled automatically
  }
}
```

### High Contrast Mode

Glassmorphism disabled in high contrast:

```scss
// Handled automatically by ontology
.glass-card {
  @include genesis-entity('primary');
  
  @media (prefers-contrast: high) {
    // Glassmorphism disabled, solid backgrounds used
    // Borders increased for better definition
  }
}
```

### Performance

Heavy effects on mobile should be reduced:

```scss
// Ontology handles this automatically
.glow-card {
  @include genesis-entity('imperative');
  // Mobile: Simplified glow
  // Desktop: Full effect with multiple shadows
}
```

## Common Effect Combinations

### Immersive Hero

```scss
.immersive-hero {
  @include genesis-environment('focused');
  @include genesis-atmosphere('viewport-aware');  // Full height
  @include genesis-atmosphere('void');            // Deep space vibe
  
  // Background gradient for depth
  background: linear-gradient(180deg,
    oklch(0.10 0.03 280) 0%,
    oklch(0.05 0.02 270) 100%
  );
  
  .hero-title {
    @include genesis-cognition('axiom');  // Includes subtle glow
  }
  
  .hero-cta {
    @include genesis-synapse('execute');  // Gradient + hover effect
  }
}
```

### Alert Panel with Urgency

```scss
.critical-alert {
  @include genesis-entity('imperative');    // Neon border + pulsing
  @include genesis-state('evolving');       // Animated state
  
  .alert-title {
    @include genesis-cognition('motive');   // Accent color text
  }
  
  .alert-action {
    @include genesis-synapse('destructive'); // Danger button
  }
}
```

### Interactive Card

```scss
.interactive-card {
  @include genesis-entity('primary');        // Glassmorphism
  @include hover-quantum;                    // Lift + glow on hover
  
  .card-title {
    @include genesis-cognition('axiom');
  }
  
  .card-link {
    @include genesis-synapse('navigate');
    @include hover-neural-link;              // Underline glow
  }
}
```

## Performance Tips

1. **Limit blur intensity** on mobile (ontology does this automatically)
2. **Reduce shadow layers** on lower-end devices
3. **Use will-change** sparingly for animations
4. **Prefer transform over position** for animations
5. **Batch DOM reads/writes** for ripple effects

## Browser Compatibility

Effects use modern CSS features:

- `backdrop-filter` - Safari 9+, Chrome 76+, Firefox 103+
- `oklch()` colors - Safari 15+, Chrome 111+, Firefox 113+
- Container queries - Safari 16+, Chrome 105+, Firefox 110+

**Fallbacks** are provided automatically by ontology mixins.

## Resources

**Effects & Animation**:
- `/docs/specifications/animation-system.md` - Complete animation architecture
- `/docs/MOTION-INTEGRATION.md` - Motion library integration
- `/docs/specifications/scss-ontology-system.md` - Atmosphere and state variants

**Design Foundations**:
- `/docs/specifications/color-system.md` - OKLCH color tokens for effects
- `/docs/specifications/accessibility.md` - Reduced motion, contrast requirements
- `/docs/specifications/performance.md` - Performance optimization

**Implementation**:
- `.github/prompts/futuristic-effects-agent.prompt.md` - Detailed effects guide
- `_sass/ontology/_engines.scss` - Effect implementations
- `_sass/base/_design-tokens.scss` - Effect color tokens

**Related Skills**: responsive-design-agent, scss-refactor-agent, agent-evolution-agent

**Version**: 2.0.1 - Enhanced Spec References  
**Last Updated**: 2026-02-10
