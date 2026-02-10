# Complete Ontological Web Components Guide

## Overview

This guide documents all 6 Genesis ontological categories implemented as Web Components, providing complete coverage of the ontological design system with the triad philosophy (HTML5 + SCSS + ES6 JS).

---

## 🧬 All 6 Ontological Categories

| # | Category | Component | Purpose | Animations |
|---|----------|-----------|---------|------------|
| 1 | **Environment** | `<genesis-environment>` | Spatial organization & layout | No |
| 2 | **Entity** | `<genesis-entity>` | Content presence & weight | Yes |
| 3 | **Cognition** | `<genesis-cognition>` | Information type & modality | Yes |
| 4 | **Synapse** | `<genesis-synapse>` | Interaction & navigation | Yes |
| 5 | **State** | `<genesis-state>` | Temporal condition | Yes |
| 6 | **Atmosphere** | `<genesis-atmosphere>` | Sensory texture & vibe | No |

---

## 1️⃣ Genesis Environment Component

**Purpose**: Layout logic and structural organization without animations.

### Attributes

- `logic` - Layout variant (20+ options)

### Variants

**Basic Layouts**:
- `distributed` - Autonomous entities in non-linear grid
- `focused` - Singular narrative thread for deep reading
- `associative` - Network where connections matter
- `chronological` - Time-linear stream
- `manifest` - High-density dashboard

**Navigation Layouts**:
- `navigation-primary` - Main site navigation
- `navigation-secondary` - Contextual navigation
- `navigation-tabs` - Horizontal tab navigation
- `navigation-sidebar` - Vertical sidebar
- `navigation-footer` - Multi-column footer
- `navigation-breadcrumb` - Breadcrumb trail
- `navigation-pagination` - Pagination controls
- `navigation-accordion` - Accordion/collapsible

**Interaction Layouts**:
- `interaction-form` - Form layout
- `community-feed` - Activity feed/timeline
- `comment-thread` - Nested comments
- `notification-center` - Notification panel
- `user-grid` - User/member grid

### Usage

**HTML**:
```html
<genesis-environment logic="distributed">
  <genesis-entity nature="primary">Card 1</genesis-entity>
  <genesis-entity nature="primary">Card 2</genesis-entity>
  <genesis-entity nature="primary">Card 3</genesis-entity>
</genesis-environment>
```

**SCSS**:
```scss
genesis-environment[logic="distributed"] {
  @include genesis-environment('distributed');
}
```

### Tab Navigation Example

**HTML**:
```html
<genesis-environment logic="navigation-tabs">
  <div role="tablist">
    <button role="tab" aria-selected="true" aria-controls="panel1">Tab 1</button>
    <button role="tab" aria-selected="false" aria-controls="panel2">Tab 2</button>
  </div>
  <div role="tabpanel" id="panel1">Panel 1 Content</div>
  <div role="tabpanel" id="panel2" hidden>Panel 2 Content</div>
</genesis-environment>
```

**Features**:
- ✅ Keyboard navigation (Arrow keys, Home, End)
- ✅ ARIA attributes managed automatically
- ✅ Focus management
- ✅ Panel visibility toggling

### Behaviors

- **Auto-sets ARIA roles** based on logic type (navigation, form, feed, etc.)
- **Tab navigation** with full keyboard support
- **Accordion** expand/collapse handling
- **Responsive detection** (mobile/desktop data attribute)
- **No inline styles** - pure behavioral control

---

## 2️⃣ Genesis Entity Component

**Purpose**: Content presence and visual weight with entrance animations.

### Attributes

- `nature` - Entity variant

### Variants

- `primary` - Main content object (fadeInUp + card hover)
- `secondary` - Supporting data (fadeIn + subtle hover)
- `imperative` - Urgent signal (bounceIn + pulse)
- `latent` - Backgrounded info (fadeIn, no hover)
- `aggregate` - Container summary (scaleIn, no hover)
- `ancestral` - Historical data (fadeIn, muted)

### Usage

**HTML**:
```html
<genesis-entity nature="primary">
  <h2>Product Card</h2>
  <p>Description here</p>
</genesis-entity>
```

**SCSS**:
```scss
genesis-entity {
  @include genesis-entity('primary');
}
```

### Animations

- **Entrance**: fadeInUp, bounceIn, scaleIn (based on nature)
- **Hover**: Card lift effect (+4px translate, enhanced shadow)
- **Emphasis**: Continuous pulse (imperative only)

---

## 3️⃣ Genesis Cognition Component

**Purpose**: Information type and cognitive modality with semantic animations.

### Attributes

- `intent` - Information type

### Variants

- `axiom` - Headlines (fadeInDown from top)
- `discourse` - Standard prose (fadeIn)
- `protocol` - Technical/code (fadeIn, monospace)
- `gloss` - Annotations (fadeIn, small)
- `motive` - Persuasive text (fadeIn, emphasis)
- `quantum` - Tags/chips (scaleIn + bounce hover)

### Usage

**HTML**:
```html
<genesis-cognition intent="axiom">
  <h1>Main Headline</h1>
</genesis-cognition>

<genesis-cognition intent="quantum">JavaScript</genesis-cognition>
<genesis-cognition intent="quantum">Web Components</genesis-cognition>
```

**SCSS**:
```scss
genesis-cognition[intent="axiom"] {
  @include genesis-cognition('axiom');
}

genesis-cognition[intent="quantum"] {
  @include genesis-cognition('quantum');
}
```

### Animations

- **Axiom**: fadeInDown (headlines appear from top)
- **Quantum**: scaleIn + bounce hover (tags bounce on hover)
- **Others**: fadeIn entrance

---

## 4️⃣ Genesis Synapse Component

**Purpose**: Interactive behaviors with hover and click animations.

### Attributes

- `vector` - Interaction type

### Variants

- `navigate` - Links (underline hover)
- `execute` - Buttons (pulse hover + press effect)
- `inquiry` - Search/expand (subtle hover)
- `destructive` - Delete/reset (shake hover)
- `social` - Social sharing (bounce hover)

### Usage

**HTML**:
```html
<genesis-synapse vector="execute">
  <button>Primary Action</button>
</genesis-synapse>

<genesis-synapse vector="navigate">
  <a href="/page">Navigation Link</a>
</genesis-synapse>
```

**SCSS**:
```scss
genesis-synapse[vector="execute"] {
  @include genesis-synapse('execute');
}

genesis-synapse[vector="navigate"] {
  @include genesis-synapse('navigate');
}
```

### Animations

- **Execute**: Button pulse hover + press on click
- **Navigate**: Underline slide-in on hover
- **Destructive**: Shake warning on hover
- **Social**: Bounce on hover

---

## 5️⃣ Genesis State Component

**Purpose**: Temporal states with emphasis animations.

### Attributes

- `condition` - State variant

### Variants

- `stable` - Normal equilibrium (no animation)
- `evolving` - Currently updating (continuous pulse)
- `deprecated` - No longer verified (faded)
- `locked` - Immutable (blur effect)
- `simulated` - Projected data (dashed border)
- `scroll-triggered` - Scroll reveal animation

### Usage

**HTML**:
```html
<genesis-state condition="evolving">
  <div>Live Feed - Currently Streaming</div>
</genesis-state>

<genesis-state condition="scroll-triggered">
  <div>Reveals when scrolled into view</div>
</genesis-state>
```

**SCSS**:
```scss
genesis-state[condition="evolving"] {
  @include genesis-state('evolving');
}

genesis-state[condition="scroll-triggered"] {
  @include genesis-state('scroll-triggered');
}
```

### Animations

- **Evolving**: Continuous pulse (indicates active updates)
- **Scroll-triggered**: Reveals with fadeInUp when entering viewport

---

## 6️⃣ Genesis Atmosphere Component

**Purpose**: Sensory texture and environmental "vibe" without animations.

### Attributes

- `vibe` - Atmospheric variant

### Variants

**Sensory Vibes**:
- `neutral` - Standard transparency (intensity: 0.5, density: 0.5)
- `ethereal` - Light, airy focus (intensity: 0.8, density: 0.3)
- `void` - Deep space, high contrast (intensity: 1.0, density: 0.2)
- `vibrant` - High energy, neon (intensity: 1.0, density: 0.7)

**Responsive Vibes**:
- `spacious-mobile` - Generous spacing on mobile (density: 0.2)
- `dense-desktop` - High density on desktop (density: 0.8)
- `viewport-aware` - Content sized relative to viewport

### Usage

**HTML**:
```html
<genesis-atmosphere vibe="ethereal">
  <div class="content">Light and airy content</div>
</genesis-atmosphere>

<genesis-atmosphere vibe="void">
  <div class="content">Deep space, focused content</div>
</genesis-atmosphere>
```

**SCSS**:
```scss
genesis-atmosphere[vibe="ethereal"] {
  @include genesis-atmosphere('ethereal');
  
  // Can access CSS custom properties
  // --atmosphere-intensity: 0.8
  // --atmosphere-density: 0.3
}

genesis-atmosphere[vibe="void"] {
  @include genesis-atmosphere('void');
  
  // --atmosphere-intensity: 1.0
  // --atmosphere-density: 0.2
}
```

### CSS Custom Properties

Each atmosphere vibe sets:
- `--atmosphere-intensity` - 0 to 1 scale (atmospheric effect strength)
- `--atmosphere-density` - 0 to 1 scale (spatial density, higher = more dense)

**Viewport-aware** also sets:
- `--vh` - 1% of viewport height in pixels
- `--vw` - 1% of viewport width in pixels

### Data Attributes

Components set data attributes for CSS targeting:
- `data-vibe` - Current vibe value
- `data-focus-mode` - "true" for void vibe
- `data-high-contrast` - "true" for vibrant vibe
- `data-touch-optimized` - "true" for spacious-mobile
- `data-compact` - "true" for dense-desktop
- `data-current-spacing` - "spacious", "normal", or "dense"

### Behaviors

- **No animations** - Pure environmental control
- **CSS custom properties** - Communication channel with SCSS
- **Responsive spacing** - Auto-adjusts based on viewport
- **Viewport awareness** - Updates --vh and --vw on resize
- **Reduced motion** - Respects user preferences

---

## 🎨 Triad Philosophy

All components strictly follow the triad:

### HTML5 (Structure)
```html
<!-- Natural Web Component extension -->
<genesis-environment logic="distributed">
  <genesis-entity nature="primary">
    <genesis-cognition intent="axiom">
      <h1>Headline</h1>
    </genesis-cognition>
  </genesis-entity>
</genesis-environment>
```

### SCSS (Appearance)
```scss
// Visual styling separate from behavior
genesis-environment {
  @include genesis-environment('distributed');
}

genesis-entity {
  @include genesis-entity('primary');
}

genesis-cognition {
  @include genesis-cognition('axiom');
}
```

### ES6 JavaScript (Behavior)
```javascript
// Pure behavioral logic
class GenesisEntity extends HTMLElement {
  connectedCallback() {
    this._applyEntranceAnimation();
  }
  // No inline HTML or SCSS
}
```

---

## 📊 Comparison: Animated vs Non-Animated

### Animated Components (4)

**Entity, Cognition, Synapse, State**:
- ✅ Entrance animations on mount
- ✅ Hover effects on interaction
- ✅ Emphasis animations (some variants)
- ✅ Scroll-triggered reveals
- ✅ Motion library integration
- ✅ Automatic reduced motion support

### Non-Animated Components (2)

**Environment, Atmosphere**:
- ✅ Pure behavioral/contextual control
- ✅ Layout management (Environment)
- ✅ Atmospheric context (Atmosphere)
- ✅ ARIA roles and accessibility
- ✅ Responsive observers
- ✅ CSS custom properties
- ❌ No animations - by design

---

## 🧪 Complete Example

### Product Card with All Categories

**HTML**:
```html
<genesis-atmosphere vibe="ethereal">
  <genesis-environment logic="distributed">
    <genesis-entity nature="primary">
      <genesis-cognition intent="axiom">
        <h2>Product Name</h2>
      </genesis-cognition>
      
      <genesis-cognition intent="discourse">
        <p>Product description goes here.</p>
      </genesis-cognition>
      
      <div>
        <genesis-cognition intent="quantum">JavaScript</genesis-cognition>
        <genesis-cognition intent="quantum">Web Components</genesis-cognition>
      </div>
      
      <genesis-synapse vector="execute">
        <button>Add to Cart</button>
      </genesis-synapse>
      
      <genesis-state condition="evolving">
        <span>2 left in stock</span>
      </genesis-state>
    </genesis-entity>
  </genesis-environment>
</genesis-atmosphere>
```

**SCSS**:
```scss
genesis-atmosphere[vibe="ethereal"] {
  @include genesis-atmosphere('ethereal');
}

genesis-environment[logic="distributed"] {
  @include genesis-environment('distributed');
}

genesis-entity[nature="primary"] {
  @include genesis-entity('primary');
}

genesis-cognition[intent="axiom"] {
  @include genesis-cognition('axiom');
}

genesis-cognition[intent="discourse"] {
  @include genesis-cognition('discourse');
}

genesis-cognition[intent="quantum"] {
  @include genesis-cognition('quantum');
}

genesis-synapse[vector="execute"] {
  @include genesis-synapse('execute');
}

genesis-state[condition="evolving"] {
  @include genesis-state('evolving');
}
```

**Result**:
- Ethereal atmosphere (light, airy)
- Distributed grid layout
- Primary entity card with fadeInUp entrance + hover lift
- Axiom headline with fadeInDown
- Discourse body text with fadeIn
- Quantum tags with scaleIn + bounce hover
- Execute button with pulse hover + press effect
- Evolving state with continuous pulse

---

## ✅ Benefits

### Complete Ontological Coverage
- All 6 categories implemented
- Animated AND non-animated components
- Consistent Web Component API

### Clean Separation
- HTML5 for structure
- SCSS for appearance
- ES6 JS for behavior
- No mixing of concerns

### Natural HTML
- Components feel like native elements
- Declarative attributes
- Semantic markup

### Maintainable
- Self-contained components
- Clear lifecycle methods
- Easy to extend

---

## 🚀 Getting Started

1. **Import components**:
```javascript
import './assets/js/common.js';
```

2. **Use in HTML**:
```html
<genesis-entity nature="primary">
  <h2>Content</h2>
</genesis-entity>
```

3. **Style with SCSS**:
```scss
genesis-entity {
  @include genesis-entity('primary');
}
```

That's it! Components handle the rest.

---

**Version**: 2.0 (Complete Coverage)  
**Last Updated**: 2026-02-03  
**Status**: Production Ready
