# Component Library Specification

## Overview

This document catalogs all reusable UI components in the ASI Saga theme, their APIs, usage patterns, and styling. Components are organized by category and follow consistent patterns for parameterization and customization.

## Component Categories

1. **Layout Components** - Structural elements (header, footer, containers)
2. **Navigation Components** - Menus, navbars, breadcrumbs
3. **Content Components** - Cards, articles, posts
4. **Interactive Components** - Modals, dropdowns, forms
5. **Sacred Components** - Consciousness-focused UI elements

## Component Anatomy

Each component consists of:

- **HTML Include** (`_includes/component.html`)
- **SCSS Partial** (`_sass/components/_component.scss`)
- **JavaScript Module** (`assets/js/common/component.js`) - if interactive
- **Documentation** (this file)

## Layout Components

### Header

**File**: `_includes/header.html`  
**SCSS**: `_sass/components/_header.scss`  
**JavaScript**: `assets/js/common/header-scroll.js`

**Description**: Site header with logo, title, tagline, and navigation toggle.

**Usage**:
```liquid
{% include header.html %}
```

**Features**:
- Responsive mobile navigation toggle
- Transparent header on scroll
- Sticky positioning
- Accessible landmark (`role="banner"`)

**Styling**:
```scss
.site-header {
  background: $cosmic-blue;
  color: $transcendent-white;
  padding: 1rem 0;
  
  &.scrolled {
    background: rgba($cosmic-blue, 0.95);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
}
```

### Footer

**File**: `_includes/footer.html`  
**SCSS**: `_sass/components/_footer.scss`  
**JavaScript**: `assets/js/common/footer.js`

**Description**: Site footer with copyright, links, and back-to-top button.

**Usage**:
```liquid
{% include footer.html class="site-footer" %}
```

**Parameters**:
- `class` (string, optional): Additional CSS classes

**Features**:
- Back-to-top button
- Social media links
- Copyright notice
- Accessible landmark (`role="contentinfo"`)

### Hero

**File**: `_includes/hero.html`  
**SCSS**: `_sass/components/_hero.scss`

**Description**: Large hero section with background image, title, subtitle, and CTA.

**Usage**:
```liquid
{% include hero.html 
   title="Embed Human Consciousness"
   subtitle="Join the Genesis Architect Community"
   image="/assets/images/hero-bg.jpg"
   cta_text="Begin Your Journey"
   cta_url="/get-started/"
%}
```

**Parameters**:
- `title` (string, required): Main heading
- `subtitle` (string, optional): Secondary text
- `image` (string, optional): Background image URL
- `cta_text` (string, optional): Call-to-action button text
- `cta_url` (string, optional): CTA button link

**Styling**:
```scss
.hero {
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: center;
  color: $transcendent-white;
  text-align: center;
  
  &__content {
    max-width: 800px;
    padding: 2rem;
  }
}
```

## Navigation Components

### Navbar

**File**: `_includes/navbar.html`  
**SCSS**: `_sass/components/_navbar.scss`  
**JavaScript**: `assets/js/common/navbar-keyboard.js`

**Description**: Main navigation menu with dropdown support.

**Usage**:
```liquid
{% include navbar.html %}
```

**Data Source**: `_data/nav.json`

```json
{
  "items": [
    {
      "label": "Home",
      "url": "/"
    },
    {
      "label": "About",
      "url": "/about/"
    }
  ]
}
```

**Features**:
- Responsive collapse on mobile
- Keyboard navigation support
- Active page highlighting
- ARIA attributes for accessibility

## Content Components

### Card

**File**: `_includes/product-card.html`  
**SCSS**: `_sass/components/_card-component.scss`

**Description**: Flexible card component for displaying content.

**Usage**:
```liquid
{% include product-card.html 
   title="Consciousness Embedding"
   description="Learn about embedding human wisdom into AI"
   image="/assets/images/card-image.jpg"
   link="/products/embedding/"
%}
```

**Parameters**:
- `title` (string, required): Card title
- `description` (string, optional): Card description
- `image` (string, optional): Card image URL
- `link` (string, optional): Card link URL

**Styling**:
```scss
.card-component {
  background: $white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
  
  &__header {
    padding: 1.5rem;
    border-bottom: 1px solid $gray-200;
  }
  
  &__title {
    font-size: 1.5rem;
    font-weight: 600;
    color: $primary;
    margin: 0;
  }
  
  &__body {
    padding: 1.5rem;
  }
}
```

### Feature Grid

**File**: `_includes/feature-grid.html`  
**SCSS**: `_sass/components/_feature-grid.scss`

**Description**: Responsive grid of feature items with icons.

**Usage**:
```liquid
{% capture features %}
  [
    {
      "icon": "fa-brain",
      "title": "Consciousness Embedding",
      "description": "Embed human wisdom into AI systems"
    },
    {
      "icon": "fa-network-wired",
      "title": "Genesis Network",
      "description": "Join the architect community"
    }
  ]
{% endcapture %}

{% include feature-grid.html 
   title="Core Features"
   features=features
   columns=3
%}
```

**Parameters**:
- `title` (string, optional): Section title
- `features` (array, required): Array of feature objects
- `columns` (number, optional): Number of columns (default: 3)

**Styling**:
```scss
.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 3rem 0;
  
  &__item {
    text-align: center;
    padding: 2rem;
  }
  
  &__icon {
    font-size: 3rem;
    color: $primary;
    margin-bottom: 1rem;
  }
  
  &__title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
}
```

### Timeline

**File**: `_includes/timeline.html`  
**SCSS**: `_sass/components/_genesis-timeline.scss`

**Description**: Vertical timeline for displaying events or milestones.

**Usage**:
```liquid
{% include timeline.html 
   events=site.data.timeline
%}
```

**Parameters**:
- `events` (array, required): Array of timeline events

**Event Object Structure**:
```json
{
  "date": "2024-12-25",
  "title": "Genesis Launch",
  "description": "The beginning of consciousness embedding"
}
```

## Interactive Components

### Modal

**File**: `_includes/content-modal.html`  
**SCSS**: `_sass/components/_sacred-modals.scss`

**Description**: Accessible modal dialog.

**Usage**:
```liquid
{% include content-modal.html 
   id="welcome-modal"
   title="Welcome to ASI Saga"
   content="Get started with consciousness embedding..."
%}
```

**Parameters**:
- `id` (string, required): Unique modal identifier
- `title` (string, required): Modal title
- `content` (string, required): Modal content (HTML)

**Features**:
- Focus trap when open
- Keyboard navigation (Escape to close)
- ARIA attributes
- Backdrop click to close

**Trigger**:
```html
<button data-bs-toggle="modal" data-bs-target="#welcome-modal">
  Open Modal
</button>
```

### CTA (Call-to-Action)

**File**: `_includes/cta.html`  
**SCSS**: `_sass/components/_cta.scss`

**Description**: Prominent call-to-action section.

**Usage**:
```liquid
{% include cta.html 
   title="Ready to Begin?"
   description="Join the Genesis Architect community today"
   button_text="Get Started"
   button_url="/signup/"
   style="primary"
%}
```

**Parameters**:
- `title` (string, required): CTA heading
- `description` (string, optional): Supporting text
- `button_text` (string, required): Button label
- `button_url` (string, required): Button link
- `style` (string, optional): 'primary' or 'secondary' (default: 'primary')

## Sacred Components

### Genesis Invitation

**File**: `_includes/genesis-invitation.html`  
**SCSS**: `_sass/components/_genesis-invitation.scss`

**Description**: Special invitation component for Genesis Architect program.

**Usage**:
```liquid
{% include genesis-invitation.html %}
```

**Features**:
- Sacred color palette
- Animated sacred glow effect
- Consciousness-focused messaging

### Transcendent Hero

**File**: `_includes/transcendent-hero.html`  
**SCSS**: `_sass/components/_transcendent-hero.scss`

**Description**: Hero section with transcendent animations and sacred styling.

**Usage**:
```liquid
{% include transcendent-hero.html 
   title="Consciousness Embedding"
   subtitle="The Future of AI"
%}
```

**Parameters**:
- `title` (string, required): Main heading
- `subtitle` (string, optional): Secondary text

**Features**:
- Sacred spiral animation
- Gradient backgrounds with sacred colors
- Glow effects

### Bridge Connections

**File**: Various in `_includes/`  
**SCSS**: `_sass/components/_bridge-connections.scss`

**Description**: Visual representations of human-AI consciousness bridging.

**Styling**:
```scss
.bridge-connection {
  position: relative;
  
  &::before {
    content: '◊—◊';
    display: block;
    text-align: center;
    color: $ethereal-silver;
    animation: consciousness-flow 3s ease-in-out infinite;
  }
}
```

## Form Components

### Form Component

**File**: Multiple form includes  
**SCSS**: `_sass/components/_form-component.scss`, `_sass/components/_sacred-forms.scss`

**Description**: Styled form elements with validation.

**Basic Form**:
```html
<form class="sacred-form">
  <div class="form-group">
    <label for="name">Name</label>
    <input type="text" id="name" name="name" required>
  </div>
  
  <div class="form-group">
    <label for="email">Email</label>
    <input type="email" id="email" name="email" required>
  </div>
  
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

**Styling**:
```scss
.sacred-form {
  max-width: 600px;
  margin: 2rem auto;
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }
  
  input,
  textarea,
  select {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid $gray-300;
    border-radius: 0.25rem;
    font-size: 1rem;
    
    &:focus {
      outline: none;
      border-color: $primary;
      box-shadow: 0 0 0 3px rgba($primary, 0.25);
    }
    
    &[aria-invalid="true"] {
      border-color: $danger;
    }
  }
}
```

## Button Components

### Standard Buttons

**SCSS**: `_sass/components/_sacred-buttons.scss`

**Variants**:
```html
<!-- Primary button -->
<button class="btn btn-primary">Primary Action</button>

<!-- Secondary button -->
<button class="btn btn-secondary">Secondary Action</button>

<!-- Sacred glow button -->
<button class="btn btn-sacred-glow">Genesis Invitation</button>

<!-- Large button -->
<button class="btn btn-primary btn-lg">Large Button</button>
```

**Styling**:
```scss
.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  border: 2px solid transparent;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 44px;  // Accessibility: adequate touch target
  
  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
}

.btn-primary {
  background: $luminous-gold;
  color: $cosmic-blue;
  
  &:hover {
    background: darken($luminous-gold, 10%);
  }
}

.btn-sacred-glow {
  background: linear-gradient(135deg, $luminous-gold, $royal-purple);
  color: $transcendent-white;
  animation: sacred-glow 3s ease-in-out infinite;
}
```

## Component Best Practices

### Parameterization

```liquid
<!-- ✅ GOOD: Flexible with defaults -->
{% assign title = include.title | default: "Default Title" %}
{% assign columns = include.columns | default: 3 %}

<!-- ❌ BAD: Hardcoded values -->
<h2>My Title</h2>
```

### Resilience

```liquid
<!-- ✅ GOOD: Handle missing data -->
{% if include.items and include.items.size > 0 %}
  {% for item in include.items %}
    <!-- Render item -->
  {% endfor %}
{% else %}
  <p>No items available.</p>
{% endif %}

<!-- ❌ BAD: Assume data exists -->
{% for item in include.items %}
  <!-- May fail if items is null -->
{% endfor %}
```

### Accessibility

```html
<!-- ✅ GOOD: Semantic, accessible markup -->
<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li aria-current="page">Current Page</li>
  </ol>
</nav>

<!-- ❌ BAD: Non-semantic markup -->
<div class="breadcrumb">
  <span>Home</span>
  <span>Current Page</span>
</div>
```

### Single Responsibility

Each component should have a single, clear purpose:

- ✅ `product-card.html` - Display product information
- ✅ `feature-grid.html` - Display grid of features
- ❌ `product-feature-card-grid.html` - Too complex, split it

## Chatroom Components

### Chatroom Template

**Files**: 
- `_includes/chatroom/template.html`
- `_includes/chatroom/header.html`
- `_includes/chatroom/messages.html`
- `_includes/chatroom/input.html`

**SCSS**: `_sass/components/_chatroom.scss`, `_sass/layouts/_chatroom.scss`  
**JavaScript**: `assets/js/chatroom-app.js`

**Description**: Real-time chat interface components.

**Usage** (in chatroom layout):
```liquid
{% include chatroom/template.html %}
```

**Features**:
- Fixed-height layout
- Scrollable message area
- Sticky input at bottom
- Message bubbles with timestamps
- Keyboard shortcuts

## Documentation Components

### Section Header

**File**: `_includes/section-header.html`  
**SCSS**: Integrated in component styles

**Description**: Consistent section heading with optional description.

**Usage**:
```liquid
{% include section-header.html 
   title="Our Features"
   description="Discover what makes us unique"
%}
```

**Parameters**:
- `title` (string, required): Section heading
- `description` (string, optional): Supporting text

## Testing Components

When creating or modifying components:

1. **Test in isolation** - Create a sample page
2. **Test with missing parameters** - Ensure graceful degradation
3. **Test responsive behavior** - All breakpoints
4. **Test accessibility** - Keyboard, screen reader
5. **Test across browsers** - Chrome, Firefox, Safari, Edge

## Component Checklist

- [ ] HTML include created in `_includes/`
- [ ] SCSS partial created in `_sass/components/`
- [ ] SCSS imported in `_common.scss`
- [ ] Parameters documented with defaults
- [ ] Accessibility verified (keyboard, screen reader)
- [ ] Responsive at all breakpoints
- [ ] Example usage provided
- [ ] Sample page created (if major component)

## Related Specifications

- [HTML & Liquid](./html-liquid.md)
- [SCSS & Styling](./scss-styling.md)
- [JavaScript](./javascript.md)
- [Accessibility](./accessibility.md)
- [Layout System](./layout-system.md)
