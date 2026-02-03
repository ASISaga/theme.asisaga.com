---
applyTo: "**/*.js,assets/js/**"
description: "JavaScript guidance for the ASI Saga theme. Applies to shared and subdomain JS files under `assets/js`."
---

# JavaScript & Interaction Instructions

This file contains guidance for shared JavaScript in the theme and integration rules for subdomain scripts.

## 🌟 Philosophy: Progressive Enhancement

JavaScript should **enhance** the semantic HTML and ontological SCSS foundation, never replace it.

- **Core content** accessible without JavaScript
- **Interactions** layered on top of semantic structure
- **Behavior hooks** via `data-*` attributes, not classes
- **Accessibility** maintained at all levels

### 🎨 Animation Library: Motion

**All UI/UX animations use Motion library** (https://motion.dev):
- **Lightweight**: 5KB Web Animations API wrapper
- **Built-in reduced motion support**: Automatically respects user preferences
- **Declarative usage**: Use `data-motion` attributes
- **Performance**: GPU-accelerated transforms and opacity

**Three.js remains for 3D graphics** (particle systems, neural networks).

See `docs/MOTION-INTEGRATION.md` for complete documentation.

### 🧬 Part of Living Genome

Your JavaScript may reveal interaction patterns not covered by existing `genesis-synapse` variants. If you find yourself repeatedly implementing the same interaction type that lacks semantic identity, consider proposing a new synapse variant (see `.github/AGENTS.MD`).

## Entry Points & Structure
- All shared JS should live in the theme's `assets/js/common.js`.
- Each subdomain must have `assets/js/script.js` which imports `common.js` first, then subdomain-specific modules.
- Use ES6 modules and `import`/`export` syntax.

## Loading & Initialization
- Use `defer` or `type="module"` for script tags.
- Initialize interactive components in `DOMContentLoaded` or via module init functions.

## DOM Hooks & Eventing
- Use `data-*` attributes or ARIA attributes as DOM hooks — do not rely on classes for behavior.
- Use event delegation where possible for dynamic content.

## Accessibility & Progressive Enhancement
- Ensure all interactive widgets support keyboard and screen reader usage.
- Add ARIA attributes only when they add semantic value; prefer native controls.

## Code Quality
- Use kebab-case filenames and clear module names.
- Add JSDoc for public functions.
- Keep shared logic in `common.js`; subdomains should only contain page-specific code.

## Best Practices
- Avoid inline JS in templates.
- Use feature detection and graceful fallback for older browsers.
- Avoid direct DOM querying in many places; prefer well-scoped component initialization.

## Semantic Interaction Patterns

### Mapping to Synapse Variants

When implementing interactions, think about their **semantic purpose**:

**Navigation Actions** → `genesis-synapse('navigate')`
```javascript
// Links that take user to different page/section
document.querySelectorAll('[data-synapse="navigate"]').forEach(link => {
  // Add navigation enhancements (preload, analytics, etc.)
});
```

**Execution Actions** → `genesis-synapse('execute')`
```javascript
// Buttons that perform local state changes
document.querySelectorAll('[data-synapse="execute"]').forEach(button => {
  // Add execution feedback (loading states, confirmation)
});
```

**Inquiry Actions** → `genesis-synapse('inquiry')`
```javascript
// Controls that request more information
document.querySelectorAll('[data-synapse="inquiry"]').forEach(control => {
  // Add search, filter, expand behaviors
});
```

**Destructive Actions** → `genesis-synapse('destructive')`
```javascript
// Dangerous operations requiring confirmation
document.querySelectorAll('[data-synapse="destructive"]').forEach(button => {
  button.addEventListener('click', (e) => {
    if (!confirm('Are you sure?')) {
      e.preventDefault();
    }
  });
});
```

### When to Propose New Synapse Variant

If you implement a repeated interaction pattern without clear synapse mapping:

**Examples of potential new variants**:
- Drag-and-drop reordering → `synapse('reorder')`
- Real-time collaboration cursors → `synapse('collaborate')`
- Undo/redo actions → `synapse('temporal')`
- Vote/rate interactions → `synapse('evaluate')`

**How to propose**:
1. Identify the semantic intent (not implementation)
2. Check if combination of existing variants works
3. Use Ontological Proposition template if genuine gap
4. Submit to theme repository

See `.github/prompts/subdomain-evolution-agent.prompt.md` for guidance.

## Integration with Ontological States

JavaScript can dynamically apply state changes:

```javascript
// Update visual state based on data condition
function updateContentState(element, dataState) {
  // Remove existing state classes
  element.classList.remove('state-stable', 'state-evolving', 'state-deprecated');
  
  // Apply appropriate semantic state
  if (dataState === 'loading') {
    element.classList.add('state-evolving');
  } else if (dataState === 'verified') {
    element.classList.add('state-stable');
  } else if (dataState === 'outdated') {
    element.classList.add('state-deprecated');
  }
}
```

**Note**: State classes should map to `genesis-state()` mixins in SCSS:
```scss
.content-item {
  &.state-stable { @include genesis-state('stable'); }
  &.state-evolving { @include genesis-state('evolving'); }
  &.state-deprecated { @include genesis-state('deprecated'); }
}
```

## Using Motion for Animations

### Declarative Animations (Recommended)

Use `data-motion` attributes for simple animations:

```html
<!-- Sacred Animations -->
<div data-motion="sacred-rhythm">Heartbeat animation</div>
<div data-motion="consciousness-pulse">Pulsing glow</div>
<div data-motion="transcendence-spiral">Rotating spiral</div>

<!-- Interactive Effects -->
<div data-motion="card-hover">Hover to lift</div>
<button data-motion="button-hover">Hover to pulse</button>

<!-- Scroll Effects -->
<div data-motion-group="stagger">
  <div data-motion="stagger-item">Item 1</div>
  <div data-motion="stagger-item">Item 2</div>
</div>
```

### Programmatic Animations

Import Motion utilities for complex animations:

```javascript
import {
  animateFadeIn,
  setupCardHover,
  setupScrollReveal,
} from './common/motion-utils.js';

// Animate element
const element = document.querySelector('.my-element');
animateFadeIn(element, { duration: 1, delay: 0.2 });

// Setup hover effect
const cards = document.querySelectorAll('.product-card');
cards.forEach(card => setupCardHover(card));
```

### Available Animations

**Sacred Animations**: `sacred-rhythm`, `consciousness-pulse`, `transcendence-spiral`, `gentle-spiral`, `sacred-glow`

**Basic**: `fade-in`, `pulse`, `bounce`

**Interactive**: `card-hover`, `button-hover`, `sacred-interactive`

**Scroll**: `parallax`, `reveal`, `stagger-item` (in `stagger` group)

See `docs/MOTION-INTEGRATION.md` for complete API reference.

## Evolutionary Considerations

### Identifying Gaps Through Implementation

As you build interactive features, watch for patterns:

- **Repeated custom behavior** that feels universal
- **Semantic meaning** that existing synapses don't capture
- **State transitions** not covered by current state variants

These are opportunities for ontological evolution!

### Documentation

When implementing complex interactions, document the semantic mapping:

```javascript
/**
 * Real-time collaboration presence system
 * 
 * Semantic Intent: Show who is currently viewing/editing
 * Current Mapping: 
 *   - User avatars: entity('primary')
 *   - Active state: state('evolving')
 *   - Inactive: state('latent')
 * 
 * Potential Evolution: Consider `entity('presence')` variant
 * if pattern becomes universal across subdomains.
 */
class CollaborationPresence {
  // Implementation...
}
```
