# Jekyll Layouts + Ontological Web Components

Complete integration guide for Genesis Ontology Web Components in Jekyll layouts.

## 📋 Overview

This implementation migrates Jekyll layouts from traditional HTML classes to Genesis Ontological Web Components, providing automatic animations, accessibility features, and semantic structure.

### Statistics

- **10 Web Components** (6 core + 4 specialized)
- **8 Layouts Updated** (default, article, post, landing, archive, gallery, form, profile)
- **4 New Components** (card, navigation, form, media)
- **100% Triad Compliant** (HTML/SCSS/JS separation)

---

## 🆕 New Specialized Components

### 1. Genesis Card (`<genesis-card>`)

Card component with animations, hover effects, and clickable behavior.

**Attributes**:
- `variant` - default|featured|compact|media
- `clickable` - Makes entire card clickable
- `hover-lift` - Enable/disable hover lift effect (default: true)

**Example**:
```html
<genesis-card variant="featured" clickable hover-lift="true">
  <h3>Card Title</h3>
  <p>Card content goes here</p>
  <a href="/read-more">Read More</a>
</genesis-card>
```

**Features**:
- Entrance animations based on variant
- Hover lift effect with shadow enhancement
- Clickable card behavior (follows first link)
- ARIA article role
- Keyboard accessible

**SCSS Integration**:
```scss
genesis-card {
  @include genesis-entity('primary');
}

genesis-card[variant="featured"] {
  @include genesis-entity('imperative');
}
```

---

### 2. Genesis Navigation (`<genesis-navigation>`)

Navigation component with keyboard support and ARIA roles.

**Attributes**:
- `type` - primary|secondary|breadcrumb|tabs|sidebar
- `orientation` - horizontal|vertical

**Example**:
```html
<genesis-navigation type="tabs" orientation="horizontal">
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
  </nav>
</genesis-navigation>
```

**Features**:
- Automatic ARIA roles (navigation, tablist, etc.)
- Keyboard navigation (Arrow keys, Home, End)
- Current page detection and marking
- Tab management with aria-selected
- Breadcrumb with aria-current
- Collapsible sidebar sections

**SCSS Integration**:
```scss
genesis-navigation[type="tabs"] {
  @include genesis-environment('navigation-tabs');
}

genesis-navigation[type="sidebar"] {
  @include genesis-environment('navigation-sidebar');
}
```

---

### 3. Genesis Form (`<genesis-form>`)

Enhanced form component with validation and accessibility.

**Attributes**:
- `layout` - vertical|horizontal|inline
- `validate` - true|false (enables HTML5 validation)

**Example**:
```html
<genesis-form layout="vertical" validate="true">
  <form>
    <label for="name">Name</label>
    <input type="text" id="name" required>
    
    <label for="email">Email</label>
    <input type="email" id="email" required>
    
    <button type="submit">Submit</button>
  </form>
</genesis-form>
```

**Features**:
- Built-in HTML5 validation
- Error message handling with ARIA
- Floating label support
- Submit button state management
- Input enhancement (aria-required, aria-invalid)
- Accessibility-first approach

**SCSS Integration**:
```scss
genesis-form {
  @include genesis-environment('interaction-form');
}
```

---

### 4. Genesis Media (`<genesis-media>`)

Media container with lazy loading and aspect ratio support.

**Attributes**:
- `ratio` - 16:9|4:3|1:1|21:9|auto
- `lazy` - true|false (enables lazy loading)
- `caption` - Text caption for the media

**Example**:
```html
<genesis-media ratio="16:9" lazy="true" caption="Beautiful sunset">
  <img src="image.jpg" alt="Sunset over mountains">
</genesis-media>
```

**Features**:
- Aspect ratio preservation via CSS custom properties
- Lazy loading (native or Intersection Observer fallback)
- Loading states (loading, loaded, error)
- Caption generation (creates figcaption)
- Entrance animations on load
- Alt text validation

**SCSS Integration**:
```scss
genesis-media {
  @include genesis-entity('secondary');
}

genesis-media[ratio="16:9"] {
  aspect-ratio: var(--aspect-ratio);
}
```

---

## 📄 Updated Jekyll Layouts

### 1. default.html

**Changes**: Wrapped main content with `<genesis-atmosphere>`

**Before**:
```html
<main id="skip-target" tabindex="-1" class="genesis-main">
  {{ content }}
</main>
```

**After**:
```html
<genesis-atmosphere vibe="neutral">
  <main id="skip-target" tabindex="-1" class="genesis-main">
    {{ content }}
  </main>
</genesis-atmosphere>
```

---

### 2. article.html

**Components Used**: `genesis-environment`, `genesis-entity`, `genesis-cognition`, `genesis-navigation`

**Key Features**:
- Focused reading layout
- Sidebar navigation for TOC
- Typography components for content
- Distributed environment for related articles

**Example Structure**:
```html
<genesis-environment logic="focused">
  <article class="article-layout">
    <genesis-navigation type="sidebar">
      <aside><!-- TOC --></aside>
    </genesis-navigation>
    
    <genesis-entity nature="primary">
      <genesis-cognition intent="discourse">
        {{ content }}
      </genesis-cognition>
    </genesis-entity>
  </article>
</genesis-environment>
```

---

### 3. post.html

**Components Used**: `genesis-environment`, `genesis-entity`, `genesis-cognition`, `genesis-synapse`

**Key Features**:
- Focused post layout
- Social sharing synapse
- Discourse typography for content

---

### 4. landing.html

**Components Used**: `genesis-atmosphere`, `genesis-entity`, `genesis-synapse`, `genesis-media`

**Key Features**:
- Vibrant atmosphere for energy
- Imperative entity for hero section
- Media component for hero image
- Execute synapse for CTA buttons

**Example**:
```html
<genesis-atmosphere vibe="vibrant">
  <genesis-entity nature="imperative">
    <section class="landing__hero">
      <h1>{{ page.hero.title }}</h1>
      
      <genesis-synapse vector="execute">
        <a href="{{ page.hero.cta.url }}">{{ page.hero.cta.text }}</a>
      </genesis-synapse>
      
      <genesis-media ratio="16:9" lazy="true">
        <img src="{{ page.hero.image }}" alt="{{ page.hero.title }}">
      </genesis-media>
    </section>
  </genesis-entity>
</genesis-atmosphere>
```

---

### 5. archive.html

**Components Used**: `genesis-environment`, `genesis-form`, `genesis-synapse`, `genesis-navigation`

**Key Features**:
- Distributed grid layout
- Form for filtering/sorting controls
- Inquiry synapses for selects
- Breadcrumb navigation for pagination

---

### 6. gallery.html

**Components Used**: `genesis-environment`, `genesis-entity`, `genesis-navigation`

**Key Features**:
- Distributed gallery layout
- Tab navigation for category filtering

---

### 7. form.html

**Components Used**: `genesis-environment`, `genesis-form`, `genesis-entity`, `genesis-cognition`, `genesis-state`

**Key Features**:
- Focused form layout
- Form validation
- Evolving state for progress indicator
- Gloss cognition for help text

---

### 8. profile.html

**Components Used**: `genesis-environment`, `genesis-entity`, `genesis-cognition`, `genesis-navigation`, `genesis-media`

**Key Features**:
- Focused profile layout
- Media component for avatar (1:1 ratio)
- Axiom cognition for name
- Social navigation for links
- Quantum cognition for skill tags

---

## 🎨 Migration Patterns

### Pattern 1: Simple Wrapper → Environment

**Before**:
```html
<div class="archive-layout">
  <!-- content -->
</div>
```

**After**:
```html
<genesis-environment logic="distributed">
  <!-- content -->
</genesis-environment>
```

---

### Pattern 2: Card → Genesis Card

**Before**:
```html
<div class="post-card">
  <h3>Title</h3>
  <p>Description</p>
</div>
```

**After**:
```html
<genesis-card variant="default" hover-lift="true">
  <h3>Title</h3>
  <p>Description</p>
</genesis-card>
```

---

### Pattern 3: Navigation → Genesis Navigation

**Before**:
```html
<nav class="tabs">
  <a href="#">Tab 1</a>
  <a href="#">Tab 2</a>
</nav>
```

**After**:
```html
<genesis-navigation type="tabs">
  <nav>
    <a href="#">Tab 1</a>
    <a href="#">Tab 2</a>
  </nav>
</genesis-navigation>
```

---

### Pattern 4: Image → Genesis Media

**Before**:
```html
<img src="photo.jpg" alt="Photo" class="responsive-img">
```

**After**:
```html
<genesis-media ratio="16:9" lazy="true">
  <img src="photo.jpg" alt="Photo">
</genesis-media>
```

---

## ✅ Benefits

### Semantic HTML
Components describe intent and purpose, not visual appearance.

**Example**:
- `<genesis-synapse vector="execute">` = "This is a primary action"
- `<genesis-cognition intent="axiom">` = "This is a foundational statement"

### Automatic Behavior
Components provide built-in functionality:
- **Animations**: Entrance animations based on component type
- **Keyboard Navigation**: Arrow keys, Home, End for navigation
- **Validation**: Form validation with error messages
- **Lazy Loading**: Images load as they enter viewport
- **Accessibility**: ARIA roles, states, and properties

### Progressive Enhancement
All functionality works without JavaScript:
- Semantic HTML structure
- CSS handles visual styling
- JavaScript enhances experience

### Triad Philosophy
Clean separation of concerns:
- **HTML**: Structure and semantics
- **SCSS**: Visual appearance
- **JavaScript**: Behavior and interactivity

### Consistency
All components follow the same patterns:
- Attribute-based configuration
- Lifecycle methods
- SCSS integration points
- Accessibility standards

---

## 📦 Complete Component Library

### Core Ontological (6)

1. **`<genesis-environment>`** - Layout/spatial organization
2. **`<genesis-entity>`** - Content blocks with presence
3. **`<genesis-cognition>`** - Typography and information
4. **`<genesis-synapse>`** - Interactive elements
5. **`<genesis-state>`** - Temporal conditions
6. **`<genesis-atmosphere>`** - Sensory texture

### Specialized (4)

7. **`<genesis-card>`** - Card components
8. **`<genesis-navigation>`** - Navigation elements
9. **`<genesis-form>`** - Form enhancements
10. **`<genesis-media>`** - Media containers

---

## 🔧 SCSS Integration

All components work with Genesis Ontology SCSS mixins:

```scss
@import "ontology/index";

// Environment components
genesis-environment[logic="distributed"] {
  @include genesis-environment('distributed');
}

genesis-environment[logic="focused"] {
  @include genesis-environment('focused');
}

// Entity components
genesis-entity[nature="primary"] {
  @include genesis-entity('primary');
}

genesis-entity[nature="imperative"] {
  @include genesis-entity('imperative');
}

// Card components
genesis-card {
  @include genesis-entity('primary');
}

genesis-card[variant="featured"] {
  @include genesis-entity('imperative');
}

// Navigation components
genesis-navigation[type="tabs"] {
  @include genesis-environment('navigation-tabs');
}

// Form components
genesis-form {
  @include genesis-environment('interaction-form');
}

// Media components
genesis-media {
  @include genesis-entity('secondary');
}
```

---

## 🚀 Next Steps

### Remaining Layouts to Update

- `dashboard.html` - Admin dashboard
- `settings.html` - Settings pages
- `search.html` - Search results
- `faq.html` - FAQ accordion
- `chatroom.html` - Chat interface
- `docs.html` - Documentation
- `splash.html` - Splash/welcome screens
- `app.html` - Application layouts

### Migration Checklist

For each layout:
- [ ] Identify semantic structure
- [ ] Map to appropriate Web Components
- [ ] Replace divs with semantic components
- [ ] Add component attributes
- [ ] Update SCSS selectors
- [ ] Test accessibility
- [ ] Test animations
- [ ] Test keyboard navigation

---

## 📚 Resources

- **Component Guide**: `docs/GENESIS-WEB-COMPONENTS-GUIDE.md`
- **Ontology Guide**: `_sass/ontology/INTEGRATION-GUIDE.md`
- **Live Demo**: `jekyll-layouts-demo.html`
- **Complete Demo**: `genesis-complete-demo.html`

---

**Version**: 1.0  
**Last Updated**: 2026-02-03  
**Status**: Production Ready
