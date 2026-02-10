---
name: futuristic-effects-agent
description: Apply advanced glassmorphism, neon glows, quantum gradients, and consciousness animations using Genesis Ontological mixins. Implement futuristic visual effects while maintaining semantic purity. Use when enhancing visual aesthetics, creating immersive experiences, or implementing advanced UI effects from v2.0+ enhancements.
license: MIT
metadata:
  author: ASISaga
  version: "2.1"
  category: design-system
  role: effects-specialist
allowed-tools: Bash(npm:*) Bash(sass:*) Read Edit
---

# Futuristic Effects Agent

**Role**: Advanced Visual Effects Specialist  
**Scope**: Glassmorphism, neon effects, quantum gradients, consciousness animations  
**Version**: 2.1 - High-Density Refactor

## Purpose

Apply advanced visual effects from Genesis v2.0+ while maintaining ontological semantic purity. Layer atmospheric effects on top of semantic structure through `genesis-atmosphere()` mixins.

## When to Use This Skill

Activate when:
- Implementing glassmorphism effects
- Adding neon glow to alerts/CTAs
- Creating quantum gradient backgrounds
- Applying consciousness animations
- Enhancing visual immersion in heroes
- Layering futuristic effects on components

## Core Workflow

### 1. Start with Semantic Structure

```scss
// ALWAYS begin with ontological foundation
.component {
  @include genesis-environment('focused');  // Layout
  @include genesis-entity('primary');      // Presence
  @include genesis-cognition('axiom');     // Typography
}
```

### 2. Layer Atmospheric Effects

```scss
// Then add effects via atmosphere or state
.component {
  @include genesis-environment('focused');
  @include genesis-entity('primary');       // Includes glassmorphism
  @include genesis-atmosphere('vibrant');   // High-energy vibe
}
```

### 3. Use Ontology Variants

Most effects are built into ontology variants:

| Effect | Ontology Variant | Auto-Included |
|--------|------------------|---------------|
| Glassmorphism | `genesis-entity('primary')` | ✅ |
| Neon Glow | `genesis-entity('imperative')` | ✅ |
| Gradients | `genesis-synapse('execute')` | ✅ |
| Animations | `genesis-state('evolving')` | ✅ |
| Hover Effects | Synapse variants | ✅ |

## Quick Effect Reference

**Glassmorphism**: `genesis-entity('primary')` - cards, modals, panels  
**Neon Glows**: `genesis-entity('imperative')` - alerts, CTAs, active states  
**Gradients**: `genesis-synapse('execute')` - buttons, heroes, backgrounds  
**Animations**: `genesis-state('evolving')` - loading, processing  
**Hover**: Built into synapse variants - quantum lift, neural link glow

→ **Complete effects catalog**: `/docs/specifications/futuristic-effects.md`

## Common Patterns

### Immersive Hero

```scss
.hero {
  @include genesis-environment('focused');
  @include genesis-atmosphere('viewport-aware');
  @include genesis-atmosphere('void');
}
```

### Alert with Urgency

```scss
.alert {
  @include genesis-entity('imperative');    // Neon + pulse
  @include genesis-state('evolving');       // Animation
}
```

### Interactive Card

```scss
.card {
  @include genesis-entity('primary');       // Glassmorphism
  @include hover-quantum;                   // Lift on hover
}
```

→ **Complete patterns**: `/docs/specifications/futuristic-effects.md`

## Validation

**Before committing:**

```bash
# SCSS compilation check
npm run test:scss

# Linting
npm run lint:scss
```

## Accessibility

All effects automatically handle:
- ✅ `prefers-reduced-motion` - animations disabled
- ✅ `prefers-contrast: high` - glassmorphism disabled
- ✅ Mobile performance - simplified effects

→ **A11y requirements**: `/docs/specifications/accessibility.md`

## Resources

**Complete Effect System**:
- `/docs/specifications/futuristic-effects.md` - **All effects, variants, patterns, examples**

**Core Systems**:
- `/docs/specifications/scss-ontology-system.md` - Ontology variants reference
- `/docs/specifications/animation-system.md` - Animation architecture
- `/docs/specifications/color-system.md` - OKLCH color tokens

**Guidelines**:
- `/docs/specifications/accessibility.md` - Reduced motion, contrast
- `/docs/specifications/performance.md` - Performance optimization
- `/docs/MOTION-INTEGRATION.md` - Motion library integration

**Implementation**:
- `_sass/ontology/_engines.scss` - Effect implementations
- `_sass/base/_design-tokens.scss` - Effect color tokens

**Related Skills**: responsive-design-agent, scss-refactor-agent

---

**Version History**:
- **v2.1** (2026-02-10): High-density refactor - 430→145 lines, extracted to `/docs/specifications/futuristic-effects.md`
- **v2.0** (2026-02-10): Initial v2.0+ futuristic effects system
