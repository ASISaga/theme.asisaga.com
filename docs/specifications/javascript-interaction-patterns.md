# JavaScript Interaction Patterns Reference

*Complete reference for semantic interaction patterns and Motion integration*

## Semantic Interaction Patterns

### Mapping to Synapse Variants

When implementing interactions, think about their **semantic purpose**:

#### Navigation Actions → `genesis-synapse('navigate')`

Links that take user to different page/section:

```javascript
// Links that take user to different page/section
document.querySelectorAll('[data-synapse="navigate"]').forEach(link => {
  // Add navigation enhancements (preload, analytics, etc.)
});
```

#### Execution Actions → `genesis-synapse('execute')`

Buttons that perform local state changes:

```javascript
// Buttons that perform local state changes
document.querySelectorAll('[data-synapse="execute"]').forEach(button => {
  // Add execution feedback (loading states, confirmation)
});
```

#### Inquiry Actions → `genesis-synapse('inquiry')`

Controls that request more information:

```javascript
// Controls that request more information
document.querySelectorAll('[data-synapse="inquiry"]').forEach(control => {
  // Add search, filter, expand behaviors
});
```

#### Destructive Actions → `genesis-synapse('destructive')`

Dangerous operations requiring confirmation:

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

#### Social Actions → `genesis-synapse('social')`

Social sharing and connections:

```javascript
// Social sharing buttons
document.querySelectorAll('[data-synapse="social"]').forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const platform = button.dataset.platform;
    const url = button.dataset.url;
    shareToSocial(platform, url);
  });
});
```

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

## Motion Library Integration

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

**Sacred Animations:**
- `sacred-rhythm` - Heartbeat/pulse animation
- `consciousness-pulse` - Pulsing glow effect
- `transcendence-spiral` - Rotating spiral
- `gentle-spiral` - Subtle spiral motion
- `sacred-glow` - Glowing aura effect

**Basic:**
- `fade-in` - Fade in from transparent
- `pulse` - Pulse scaling effect
- `bounce` - Bounce animation

**Interactive:**
- `card-hover` - Card lift on hover
- `button-hover` - Button pulse on hover
- `sacred-interactive` - Sacred interaction effect

**Scroll:**
- `parallax` - Parallax scroll effect
- `reveal` - Reveal on scroll
- `stagger-item` - Stagger animation (in `stagger` group)

## When to Propose New Synapse Variant

If you implement a repeated interaction pattern without clear synapse mapping:

### Examples of Potential New Variants

- Drag-and-drop reordering → `synapse('reorder')`
- Real-time collaboration cursors → `synapse('collaborate')`
- Undo/redo actions → `synapse('temporal')`
- Vote/rate interactions → `synapse('evaluate')`

### How to Propose

1. Identify the semantic intent (not implementation)
2. Check if combination of existing variants works
3. Use Ontological Proposition template if genuine gap
4. Submit to theme repository

See `.github/prompts/subdomain-evolution-agent.prompt.md` for guidance.

## Documentation Pattern Example

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

## Progressive Enhancement Pattern

```javascript
// Check for JavaScript support
if ('querySelector' in document && 'addEventListener' in window) {
  // Initialize enhanced features
  initializeEnhancements();
}

function initializeEnhancements() {
  // Add interactive features
  document.querySelectorAll('[data-synapse="execute"]').forEach(button => {
    button.addEventListener('click', handleExecution);
  });
  
  // Apply motion effects
  if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    initializeMotionEffects();
  }
}
```

## Accessibility-First Patterns

### Keyboard Navigation

```javascript
// Ensure all interactive elements are keyboard accessible
document.querySelectorAll('[data-synapse]').forEach(element => {
  // Make focusable if not already
  if (!element.hasAttribute('tabindex') && !['A', 'BUTTON', 'INPUT'].includes(element.tagName)) {
    element.setAttribute('tabindex', '0');
  }
  
  // Add keyboard event handlers
  element.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      element.click();
    }
  });
});
```

### Focus Management

```javascript
// Trap focus in modal
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];
  
  element.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      } else if (!e.shiftKey && document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    }
  });
}
```

### Reduced Motion Support

```javascript
// Respect user's motion preferences
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initializeAnimation(element) {
  if (prefersReducedMotion) {
    // Skip animations, apply final state immediately
    element.classList.add('animation-complete');
  } else {
    // Apply full animation
    animateFadeIn(element);
  }
}
```

## Event Delegation Pattern

```javascript
// Use event delegation for dynamic content
document.addEventListener('click', (e) => {
  const button = e.target.closest('[data-synapse="execute"]');
  if (button) {
    handleExecution(button);
  }
  
  const link = e.target.closest('[data-synapse="navigate"]');
  if (link) {
    handleNavigation(link);
  }
  
  const social = e.target.closest('[data-synapse="social"]');
  if (social) {
    handleSocialShare(social);
  }
});
```

## Module Pattern

```javascript
// Encapsulate functionality in modules
export class InteractionManager {
  constructor(element) {
    this.element = element;
    this.synapseType = element.dataset.synapse;
    this.init();
  }
  
  init() {
    switch (this.synapseType) {
      case 'navigate':
        this.setupNavigation();
        break;
      case 'execute':
        this.setupExecution();
        break;
      case 'inquiry':
        this.setupInquiry();
        break;
      case 'destructive':
        this.setupDestructive();
        break;
      case 'social':
        this.setupSocial();
        break;
    }
  }
  
  setupNavigation() {
    // Navigation-specific logic
  }
  
  setupExecution() {
    // Execution-specific logic
  }
  
  // ... other methods
}

// Initialize all interactions
document.querySelectorAll('[data-synapse]').forEach(element => {
  new InteractionManager(element);
});
```

## Documentation References

- **Motion integration**: `/docs/MOTION-INTEGRATION.md`
- **Ontology mapping**: `/docs/specifications/scss-ontology-system.md`
- **Synapse evolution**: `.github/prompts/subdomain-evolution-agent.prompt.md`
- **Animation system**: `/docs/specifications/animation-system.md`
- **JavaScript architecture**: `/docs/specifications/javascript.md`
