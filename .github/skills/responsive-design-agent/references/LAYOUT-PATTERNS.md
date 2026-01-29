# Responsive Layout Patterns

**Version**: 2.1.0  
**For**: responsive-design-agent skill  
**Purpose**: Production-ready responsive layout patterns using Genesis Ontological mixins

---

## Table of Contents

1. [Grid Layouts](#grid-layouts)
2. [Content Layouts](#content-layouts)
3. [Navigation Layouts](#navigation-layouts)
4. [Dashboard Layouts](#dashboard-layouts)
5. [Media Layouts](#media-layouts)
6. [Form Layouts](#form-layouts)
7. [Performance Considerations](#performance-considerations)

---

## Grid Layouts

### Auto-Responsive Card Grid

**Pattern**: Cards that automatically adjust column count based on available space.

**HTML:**
```html
<div class="product-grid">
  <article class="product-card"><!-- Card 1 --></article>
  <article class="product-card"><!-- Card 2 --></article>
  <article class="product-card"><!-- Card 3 --></article>
  <article class="product-card"><!-- Card 4 --></article>
</div>
```

**SCSS:**
```scss
@import "ontology/index";

.product-grid {
  @include genesis-environment('distributed');
  // Mobile: 1 column
  // Tablet: 2 columns
  // Desktop: auto-fit (min 300px, max 4 columns)
  
  .product-card {
    @include genesis-entity('primary');
    
    .product-image {
      @include genesis-entity('image-adaptive');
    }
  }
}
```

**Result**:
- Mobile (< 768px): Single column, full width
- Tablet (768-1024px): 2 columns
- Desktop (> 1024px): Auto-fit grid (typically 3-4 columns)
- Automatically responsive without media queries

### Masonry Grid (Pinterest-style)

**Pattern**: Variable-height cards in a masonry layout.

**HTML:**
```html
<div class="masonry-grid">
  <article class="masonry-item"><!-- Variable height content --></article>
  <article class="masonry-item"><!-- Variable height content --></article>
  <article class="masonry-item"><!-- Variable height content --></article>
</div>
```

**SCSS:**
```scss
.masonry-grid {
  @include genesis-environment('distributed');
  
  // Override with masonry-specific properties
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: 20px; // Small row height for granular control
  gap: var(--space-bento);
  
  .masonry-item {
    @include genesis-entity('primary');
    // Items span multiple rows based on content height
    grid-row: span var(--row-span, 10);
  }
}
```

**JavaScript** (to calculate row spans):
```javascript
document.querySelectorAll('.masonry-item').forEach(item => {
  const height = item.offsetHeight;
  const rowHeight = 20; // Match grid-auto-rows
  const gap = 24; // Match gap
  const rowSpan = Math.ceil((height + gap) / (rowHeight + gap));
  item.style.setProperty('--row-span', rowSpan);
});
```

### Featured + Grid Hybrid

**Pattern**: Large featured item followed by grid of smaller items.

**HTML:**
```html
<div class="blog-layout">
  <article class="blog-layout__featured">
    <div class="featured-post"><!-- Featured content --></div>
  </article>
  
  <div class="blog-layout__grid">
    <article class="blog-card"><!-- Card 1 --></article>
    <article class="blog-card"><!-- Card 2 --></article>
    <article class="blog-card"><!-- Card 3 --></article>
  </div>
</div>
```

**SCSS:**
```scss
.blog-layout {
  @include genesis-environment('focused');
  
  .blog-layout__featured {
    @include genesis-entity('primary');
    margin-bottom: var(--space-narrative);
  }
  
  .blog-layout__grid {
    @include genesis-environment('distributed');
  }
  
  .blog-card {
    @include genesis-entity('secondary');
  }
}
```

---

## Content Layouts

### Article Reading Layout

**Pattern**: Optimized for long-form content reading with proper line length.

**HTML:**
```html
<article class="article">
  <header class="article__header">
    <h1 class="article__title">Article Title</h1>
    <div class="article__meta">
      <time datetime="2026-01-29">January 29, 2026</time>
      <span class="article__author">By Jane Smith</span>
    </div>
  </header>
  
  <div class="article__content">
    <p>Lorem ipsum dolor sit amet...</p>
    <h2>Section Heading</h2>
    <p>More content...</p>
  </div>
  
  <aside class="article__sidebar">
    <div class="table-of-contents"><!-- TOC --></div>
    <div class="related-posts"><!-- Related --></div>
  </aside>
</article>
```

**SCSS:**
```scss
.article {
  @include genesis-environment('focused');
  
  .article__header {
    @include genesis-entity('primary');
    margin-bottom: var(--space-narrative);
  }
  
  .article__title {
    @include genesis-cognition('axiom');
  }
  
  .article__meta {
    @include genesis-cognition('gloss');
  }
  
  .article__content {
    @include genesis-cognition('discourse');
    max-width: 70ch; // Optimal reading line length
  }
  
  .article__sidebar {
    @include genesis-entity('secondary');
    
    @include from(lg) {
      position: sticky;
      top: 2rem;
      max-height: calc(100vh - 4rem);
      overflow-y: auto;
    }
  }
}
```

### Split Content Layout

**Pattern**: Equal split between content and media/sidebar.

**HTML:**
```html
<section class="split-layout">
  <div class="split-layout__content">
    <h2 class="split-layout__title">Content Title</h2>
    <p class="split-layout__text">Description text...</p>
  </div>
  
  <div class="split-layout__media">
    <img src="image.jpg" alt="Description" class="split-layout__image">
  </div>
</section>
```

**SCSS:**
```scss
.split-layout {
  display: grid;
  gap: var(--space-narrative);
  
  // Mobile: Stack vertically
  grid-template-columns: 1fr;
  
  // Desktop: Side-by-side
  @include from(md) {
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }
  
  .split-layout__content {
    @include genesis-cognition('discourse');
  }
  
  .split-layout__title {
    @include genesis-cognition('axiom');
  }
  
  .split-layout__image {
    @include genesis-entity('image-adaptive');
  }
}
```

### Sidebar Layout (3-Column)

**Pattern**: Left sidebar, main content, right sidebar.

**HTML:**
```html
<div class="three-column-layout">
  <aside class="left-sidebar">
    <nav><!-- Navigation --></nav>
  </aside>
  
  <main class="main-content">
    <article><!-- Main content --></article>
  </main>
  
  <aside class="right-sidebar">
    <div class="widget"><!-- Widgets --></div>
  </aside>
</div>
```

**SCSS:**
```scss
.three-column-layout {
  display: grid;
  gap: var(--space-network);
  
  // Mobile: Stack all vertically
  grid-template-columns: 1fr;
  grid-template-areas:
    "main"
    "left"
    "right";
  
  // Tablet: Main + Right sidebar
  @include from(md) {
    grid-template-columns: 2fr 1fr;
    grid-template-areas:
      "main right"
      "left left";
  }
  
  // Desktop: All three columns
  @include from(lg) {
    grid-template-columns: 250px 1fr 300px;
    grid-template-areas: "left main right";
  }
  
  .left-sidebar { grid-area: left; }
  .main-content { grid-area: main; }
  .right-sidebar { grid-area: right; }
}
```

---

## Navigation Layouts

### Horizontal Navigation (Responsive)

**Pattern**: Horizontal menu on desktop, off-canvas drawer on mobile.

**HTML:**
```html
<header class="site-header">
  <div class="site-header__container">
    <a href="/" class="site-brand">Logo</a>
    
    <button 
      class="nav-toggle" 
      aria-expanded="false" 
      aria-controls="primary-nav"
    >
      Menu
    </button>
    
    <nav id="primary-nav" class="primary-nav">
      <ul class="primary-nav__list">
        <li><a href="/about">About</a></li>
        <li><a href="/services">Services</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  </div>
</header>
```

**SCSS:**
```scss
.site-header {
  @include genesis-environment('navigation-primary');
  @include genesis-entity('primary');
  
  .site-brand {
    @include genesis-synapse('navigate');
  }
  
  .nav-toggle {
    @include genesis-synapse('execute');
    
    // Hide on desktop
    @include from(md) {
      display: none;
    }
  }
  
  .primary-nav {
    // Mobile: Off-canvas drawer
    position: fixed;
    top: 0;
    left: -80%;
    width: 80%;
    height: 100vh;
    background: var(--surface-primary);
    transform: translateX(0);
    transition: transform 0.3s ease;
    
    &[aria-expanded="true"] {
      transform: translateX(100%);
    }
    
    // Desktop: Horizontal menu
    @include from(md) {
      position: static;
      width: auto;
      height: auto;
      transform: none;
      background: transparent;
    }
  }
  
  .primary-nav__list {
    // Mobile: Vertical stack
    display: flex;
    flex-direction: column;
    gap: 0;
    
    // Desktop: Horizontal row
    @include from(md) {
      flex-direction: row;
      gap: var(--space-network);
    }
  }
}
```

### Sticky Navigation with Scroll Behavior

**Pattern**: Navigation becomes fixed and compact on scroll.

**SCSS:**
```scss
.sticky-nav {
  @include genesis-environment('navigation-primary');
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: padding 0.3s ease, box-shadow 0.3s ease;
  
  // Normal state
  padding: var(--space-bento) 0;
  
  // Scrolled state (add .scrolled class via JavaScript)
  &.scrolled {
    padding: calc(var(--space-bento) * 0.5) 0;
    box-shadow: var(--shadow-elevated);
    backdrop-filter: blur(20px);
  }
}
```

**JavaScript:**
```javascript
const nav = document.querySelector('.sticky-nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});
```

---

## Dashboard Layouts

### Admin Dashboard Grid

**Pattern**: Named grid areas for dashboard components.

**HTML:**
```html
<div class="dashboard">
  <header class="dashboard__header">Header</header>
  <aside class="dashboard__sidebar">Sidebar</aside>
  <main class="dashboard__main">Main Content</main>
  <aside class="dashboard__widgets">Widgets</aside>
  <footer class="dashboard__footer">Footer</footer>
</div>
```

**SCSS:**
```scss
.dashboard {
  @include genesis-environment('manifest');
  min-height: 100vh;
  
  // Mobile: Stacked
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
    "header"
    "main"
    "widgets"
    "sidebar"
    "footer";
  gap: var(--space-network);
  
  // Tablet: 6 columns
  @include from(md) {
    grid-template-columns: repeat(6, 1fr);
    grid-template-areas:
      "header header header header header header"
      "sidebar sidebar main main main main"
      "sidebar sidebar widgets widgets widgets widgets"
      "footer footer footer footer footer footer";
  }
  
  // Desktop: 12 columns
  @include from(lg) {
    grid-template-columns: repeat(12, 1fr);
    grid-template-areas:
      "header header header header header header header header header header header header"
      "sidebar sidebar sidebar main main main main main main widgets widgets widgets"
      "sidebar sidebar sidebar main main main main main main widgets widgets widgets"
      "footer footer footer footer footer footer footer footer footer footer footer footer";
  }
  
  .dashboard__header { grid-area: header; }
  .dashboard__sidebar { grid-area: sidebar; }
  .dashboard__main { grid-area: main; }
  .dashboard__widgets { grid-area: widgets; }
  .dashboard__footer { grid-area: footer; }
}
```

### Stats Dashboard

**Pattern**: Grid of metric cards with responsive columns.

**HTML:**
```html
<div class="stats-dashboard">
  <div class="stat-card">
    <h3 class="stat-card__label">Total Users</h3>
    <p class="stat-card__value">12,458</p>
    <p class="stat-card__change stat-card__change--positive">+12.5%</p>
  </div>
  
  <div class="stat-card">
    <h3 class="stat-card__label">Revenue</h3>
    <p class="stat-card__value">$45,231</p>
    <p class="stat-card__change stat-card__change--positive">+8.2%</p>
  </div>
  
  <div class="stat-card">
    <h3 class="stat-card__label">Conversion Rate</h3>
    <p class="stat-card__value">3.24%</p>
    <p class="stat-card__change stat-card__change--negative">-2.1%</p>
  </div>
  
  <div class="stat-card">
    <h3 class="stat-card__label">Avg. Session</h3>
    <p class="stat-card__value">4m 32s</p>
    <p class="stat-card__change stat-card__change--neutral">0.0%</p>
  </div>
</div>
```

**SCSS:**
```scss
.stats-dashboard {
  display: grid;
  gap: var(--space-network);
  
  // Mobile: 1 column
  grid-template-columns: 1fr;
  
  // Tablet: 2 columns
  @include from(sm) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  // Desktop: 4 columns
  @include from(lg) {
    grid-template-columns: repeat(4, 1fr);
  }
  
  .stat-card {
    @include genesis-entity('primary');
    
    .stat-card__label {
      @include genesis-cognition('gloss');
    }
    
    .stat-card__value {
      @include genesis-cognition('axiom');
    }
    
    .stat-card__change {
      @include genesis-cognition('quantum');
      
      &--positive { color: var(--accent-life-force); }
      &--negative { color: var(--accent-urgency); }
      &--neutral { color: var(--text-secondary); }
    }
  }
}
```

---

## Media Layouts

### Responsive Image Gallery

**Pattern**: Image grid with lightbox support.

**HTML:**
```html
<div class="image-gallery">
  <a href="/images/full/image1.jpg" class="gallery-item">
    <img 
      src="/images/thumb/image1.jpg" 
      alt="Description" 
      class="gallery-item__image"
      loading="lazy"
    >
  </a>
  <!-- More gallery items -->
</div>
```

**SCSS:**
```scss
.image-gallery {
  @include genesis-environment('distributed');
  @include genesis-atmosphere('dense-desktop');
  
  .gallery-item {
    @include genesis-entity('primary');
    position: relative;
    overflow: hidden;
    
    &::after {
      content: '';
      display: block;
      padding-bottom: 100%; // 1:1 aspect ratio
    }
  }
  
  .gallery-item__image {
    @include genesis-entity('image-adaptive');
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  .gallery-item:hover .gallery-item__image {
    transform: scale(1.05);
  }
}
```

### Video Embed (Responsive)

**Pattern**: Maintains 16:9 aspect ratio across all viewports.

**HTML:**
```html
<div class="video-embed">
  <iframe 
    src="https://www.youtube.com/embed/VIDEO_ID" 
    title="Video title"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
    class="video-embed__iframe"
  ></iframe>
</div>
```

**SCSS:**
```scss
.video-embed {
  @include genesis-entity('embed-responsive');
  // Automatically maintains 16:9 aspect ratio
  // Handles all responsive sizing
}
```

---

## Form Layouts

### Multi-Column Form

**Pattern**: Single column on mobile, multi-column on desktop.

**HTML:**
```html
<form class="multi-column-form">
  <div class="form-row">
    <div class="form-field">
      <label for="first-name">First Name</label>
      <input type="text" id="first-name" name="firstName">
    </div>
    
    <div class="form-field">
      <label for="last-name">Last Name</label>
      <input type="text" id="last-name" name="lastName">
    </div>
  </div>
  
  <div class="form-row">
    <div class="form-field">
      <label for="email">Email</label>
      <input type="email" id="email" name="email">
    </div>
  </div>
  
  <div class="form-row">
    <div class="form-field">
      <label for="message">Message</label>
      <textarea id="message" name="message" rows="5"></textarea>
    </div>
  </div>
  
  <div class="form-actions">
    <button type="submit">Submit</button>
  </div>
</form>
```

**SCSS:**
```scss
.multi-column-form {
  @include genesis-environment('interaction-form');
  
  .form-row {
    display: grid;
    gap: var(--space-network);
    
    // Mobile: Single column
    grid-template-columns: 1fr;
    
    // Desktop: Multi-column
    @include from(md) {
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }
  }
  
  .form-field {
    label {
      @include genesis-cognition('motive');
    }
    
    input,
    textarea {
      @include genesis-synapse('input-primary');
      width: 100%;
    }
  }
  
  .form-actions {
    button {
      @include genesis-synapse('execute');
    }
  }
}
```

---

## Performance Considerations

### Container Queries Over Media Queries

Use container queries for component-based responsive design:

```scss
.card-grid {
  container-type: inline-size;
  container-name: grid;
  
  .card {
    // Default: Full width
    width: 100%;
    
    // When container > 600px: 2 columns
    @container grid (min-width: 600px) {
      width: calc(50% - 1rem);
    }
    
    // When container > 900px: 3 columns
    @container grid (min-width: 900px) {
      width: calc(33.333% - 1rem);
    }
  }
}
```

### Content-Visibility for Performance

Optimize rendering of off-screen content:

```scss
.long-list-item {
  content-visibility: auto;
  contain-intrinsic-size: 0 500px; // Estimated height
}
```

### Lazy Loading Strategy

```html
<!-- Images -->
<img src="placeholder.jpg" data-src="actual.jpg" loading="lazy" alt="Description">

<!-- Iframes -->
<iframe src="video.html" loading="lazy" title="Video"></iframe>
```

### Grid Auto-Flow for Dynamic Content

```scss
.dynamic-grid {
  display: grid;
  grid-auto-flow: dense; // Fill gaps automatically
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
```

---

## Testing Checklist

For each responsive layout, verify:

- [ ] **Mobile (375px)**: Single column, touch-friendly
- [ ] **Tablet (768px)**: Appropriate column adjustments
- [ ] **Desktop (1024px+)**: Full layout with all features
- [ ] **Touch targets**: ≥ 44x44px on mobile
- [ ] **Text size**: ≥ 16px to prevent iOS zoom
- [ ] **Landscape orientation**: Works on rotated devices
- [ ] **Container queries**: Components adapt to container size
- [ ] **Performance**: No layout shifts, smooth scrolling
- [ ] **Accessibility**: Keyboard navigation, screen readers
- [ ] **Reduced motion**: Respects prefers-reduced-motion

---

## Resources

- **Skill**: [responsive-design-agent/SKILL.md](../SKILL.md)
- **Responsive Guide**: [RESPONSIVE-GUIDE.md](RESPONSIVE-GUIDE.md)
- **Ontology Reference**: `_sass/ontology/INTEGRATION-GUIDE.md`
- **Instructions**: `.github/instructions/scss.instructions.md`
- **Container Queries**: [MDN Container Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries)
- **CSS Grid**: [CSS Tricks Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)

---

**Version**: 2.1.0  
**Last Updated**: 2026-01-29  
**Maintained by**: responsive-design-agent skill
