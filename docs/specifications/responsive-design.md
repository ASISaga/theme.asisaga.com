# Responsive Design Specification

## Overview

The ASI Saga theme follows a **mobile-first responsive design approach**, ensuring optimal user experience across all devices and screen sizes. All layouts, components, and interactions must be fully responsive and tested across target viewports.

## Mobile-First Philosophy

### Core Principle

Design and develop for mobile devices first, then progressively enhance for larger screens.

```scss
// ✅ GOOD: Mobile-first
.element {
  font-size: 1rem;        // Mobile default
  padding: 1rem;
  
  @media (min-width: 768px) {
    font-size: 1.125rem;  // Tablet
    padding: 1.5rem;
  }
  
  @media (min-width: 1200px) {
    font-size: 1.25rem;   // Desktop
    padding: 2rem;
  }
}

// ❌ BAD: Desktop-first
.element {
  font-size: 1.25rem;     // Desktop
  padding: 2rem;
  
  @media (max-width: 1199px) {
    font-size: 1.125rem;  // Confusing
    padding: 1.5rem;
  }
  
  @media (max-width: 767px) {
    font-size: 1rem;
    padding: 1rem;
  }
}
```

## Breakpoints

### Bootstrap 5.3.5 Breakpoints

```scss
$grid-breakpoints: (
  xs: 0,          // Extra small devices (portrait phones)
  sm: 576px,      // Small devices (landscape phones)
  md: 768px,      // Medium devices (tablets)
  lg: 992px,      // Large devices (desktops)
  xl: 1200px,     // Extra large devices (large desktops)
  xxl: 1400px     // Extra extra large devices (larger desktops)
);
```

### Test Viewports (MANDATORY)

**Minimum required test sizes**:

| Viewport | Width | Device | Priority |
|----------|-------|--------|----------|
| **Mobile** | 375px | iPhone SE | ✅ Required |
| **Tablet** | 768px | iPad | ✅ Required |
| **Desktop** | 1440px | Standard desktop | ✅ Required |
| Small mobile | 320px | Small phones | ⚠️ Nice-to-have |
| Large tablet | 1024px | iPad Pro | ⚠️ Nice-to-have |
| Wide desktop | 1920px | HD displays | ⚠️ Nice-to-have |

### Breakpoint Mixin

```scss
@mixin respond-to($breakpoint) {
  @media (min-width: map-get($grid-breakpoints, $breakpoint)) {
    @content;
  }
}

// Usage
.element {
  width: 100%;
  
  @include respond-to(md) {
    width: 50%;
  }
  
  @include respond-to(lg) {
    width: 33.333%;
  }
}
```

## Grid System

### Theme Layout Containers (January 2026 Update)

**Full-width by default**:

The theme's base layout structure (`default.html`) now provides full viewport width by default:

```scss
.layout-container {
  width: 100%;          // Full viewport width
  min-height: 100vh;    // Full viewport height
}

.content-wrapper {
  width: 100%;          // No max-width constraint
}

.page-layout {
  @include genesis-environment('chronological');  // Vertical stack, no width constraint
}
```

**Individual layout wrappers** apply their own constraints when appropriate:

```scss
// Standard content layouts (max-width: 1200px)
.article-wrapper,
.post-wrapper,
.landing-wrapper,
.archive-wrapper,
.gallery-wrapper {
  width: 100%;
  max-width: 1200px;
  margin-inline: auto;
  padding-inline: clamp(1rem, 3vw, 2rem);
}

// Wide layouts (max-width: 1600px)
.settings-wrapper,
.docs-wrapper {
  width: 100%;
  max-width: 1600px;
  margin-inline: auto;
  padding-inline: clamp(1rem, 3vw, 2rem);
}
```

This enables:
- ✅ Subdomain websites can use full viewport width
- ✅ No more forced 70ch constraint on all content
- ✅ Individual layouts control their own width as needed
- ✅ Responsive padding adapts to viewport size

### Bootstrap Grid

**Container max-widths** (legacy, for backward compatibility):

```scss
$container-max-widths: (
  sm: 540px,
  md: 720px,
  lg: 960px,
  xl: 1140px,
  xxl: 1320px
);
```

### Responsive Columns

```html
<!-- Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns -->
<div class="row">
  <div class="col-12 col-md-6 col-lg-4">Column 1</div>
  <div class="col-12 col-md-6 col-lg-4">Column 2</div>
  <div class="col-12 col-md-6 col-lg-4">Column 3</div>
</div>

<!-- Mobile: Stack, Desktop: Sidebar + Main -->
<div class="row">
  <aside class="col-12 col-lg-3">Sidebar</aside>
  <main class="col-12 col-lg-9">Main content</main>
</div>
```

### CSS Grid (Modern Approach)

**MANDATORY: Use responsive grid templates**:

```scss
// ✅ GOOD: Auto-responsive grid
.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

// ❌ BAD: Fixed columns
.feature-grid-bad {
  display: grid;
  grid-template-columns: repeat(3, 1fr);  // Breaks on mobile
  gap: 2rem;
}
```

### Responsive Grid Patterns

```scss
// 1 column mobile, 2 tablet, 3 desktop
.grid-responsive {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
}

// Sidebar layout
.layout-with-sidebar {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 992px) {
    grid-template-columns: 250px 1fr;
  }
  
  @media (min-width: 1200px) {
    grid-template-columns: 300px 1fr 200px;  // Left sidebar, main, right sidebar
  }
}
```

## Typography Scaling

### Responsive Font Sizes

```scss
body {
  font-size: 1rem;  // 16px mobile
  
  @media (min-width: 768px) {
    font-size: 1.0625rem;  // 17px tablet
  }
  
  @media (min-width: 1200px) {
    font-size: 1.125rem;  // 18px desktop
  }
}

h1 {
  font-size: 2rem;  // 32px mobile
  
  @media (min-width: 768px) {
    font-size: 2.5rem;  // 40px tablet
  }
  
  @media (min-width: 1200px) {
    font-size: 2.618rem;  // ~42px desktop
  }
}
```

### Fluid Typography

Using `clamp()` for smooth scaling:

```scss
h1 {
  font-size: clamp(2rem, 5vw + 1rem, 2.618rem);
}

h2 {
  font-size: clamp(1.5rem, 3vw + 1rem, 2rem);
}

.lead {
  font-size: clamp(1.125rem, 2vw + 0.5rem, 1.5rem);
}
```

## Touch Targets

### Minimum Size (MANDATORY)

**All interactive elements MUST be at least 44x44 pixels**:

```scss
.btn,
.nav-link,
[role="button"],
a.card {
  min-height: 44px;
  min-width: 44px;
  padding: 0.75rem 1.5rem;
}

// Icon-only buttons
.btn-icon {
  min-width: 44px;
  min-height: 44px;
  padding: 0.5rem;
  
  i {
    font-size: 1.5rem;
  }
}
```

### Spacing for Touch

```scss
// Adequate spacing between touch targets
.nav-menu {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;  // At least 8px between targets
  
  @media (min-width: 768px) {
    flex-direction: row;
    gap: 1rem;
  }
}
```

## Navigation Patterns

### Mobile Navigation

```html
<!-- Hamburger menu for mobile -->
<header class="site-header">
  <div class="header-brand">
    <a href="/">Logo</a>
  </div>
  
  <!-- Toggle button (mobile only) -->
  <button 
    class="navbar-toggler" 
    type="button" 
    data-bs-toggle="collapse" 
    data-bs-target="#navbar"
    aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  
  <!-- Collapsible menu -->
  <nav id="navbar" class="collapse navbar-collapse">
    <ul class="navbar-nav">
      <li><a href="/">Home</a></li>
      <li><a href="/about/">About</a></li>
    </ul>
  </nav>
</header>
```

```scss
.navbar-toggler {
  display: block;  // Visible on mobile
  min-width: 44px;
  min-height: 44px;
  
  @media (min-width: 992px) {
    display: none;  // Hidden on desktop
  }
}

.navbar-collapse {
  // Mobile: Full-width vertical menu
  display: none;
  
  &.show {
    display: block;
  }
  
  // Desktop: Horizontal menu
  @media (min-width: 992px) {
    display: flex !important;
  }
}
```

## Images and Media

### Responsive Images

```html
<!-- Srcset for different screen sizes -->
<img 
  src="image-800.jpg"
  srcset="
    image-400.jpg 400w,
    image-800.jpg 800w,
    image-1200.jpg 1200w,
    image-1600.jpg 1600w
  "
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
  alt="Description"
  loading="lazy">

<!-- Picture element for art direction -->
<picture>
  <source media="(min-width: 1200px)" srcset="image-desktop.jpg">
  <source media="(min-width: 768px)" srcset="image-tablet.jpg">
  <img src="image-mobile.jpg" alt="Description">
</picture>
```

### Responsive Videos

```html
<!-- Responsive video container -->
<div class="video-container">
  <iframe 
    src="https://www.youtube.com/embed/VIDEO_ID"
    title="Video title"
    allowfullscreen>
  </iframe>
</div>
```

```scss
.video-container {
  position: relative;
  padding-bottom: 56.25%;  // 16:9 aspect ratio
  height: 0;
  overflow: hidden;
  
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
```

## Layout Patterns

### Stack on Mobile, Side-by-Side on Desktop

```scss
.content-layout {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
}
```

### Reorder on Mobile

```html
<div class="row">
  <!-- Desktop: Image left, text right -->
  <!-- Mobile: Text first, image second -->
  <div class="col-12 col-md-6 order-2 order-md-1">
    <img src="image.jpg" alt="Image">
  </div>
  <div class="col-12 col-md-6 order-1 order-md-2">
    <h2>Text content</h2>
    <p>Description...</p>
  </div>
</div>
```

### Hide/Show Elements

```scss
// Hide on mobile, show on desktop
.desktop-only {
  display: none;
  
  @media (min-width: 992px) {
    display: block;
  }
}

// Show on mobile, hide on desktop
.mobile-only {
  display: block;
  
  @media (min-width: 992px) {
    display: none;
  }
}
```

## Overflow Prevention (MANDATORY)

**Never allow horizontal overflow**:

```scss
// Global
body {
  overflow-x: hidden;  // Only when required and tested
}

// Containers
.container,
.content-wrapper {
  max-width: 100%;
  overflow-wrap: break-word;
}

// Text
p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
}

// Images
img {
  max-width: 100%;
  height: auto;
}

// Tables (make scrollable)
.table-responsive {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
```

## Forms

### Responsive Form Layouts

```scss
.form-group {
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
  }
  
  input,
  textarea,
  select {
    width: 100%;
    min-height: 44px;  // Touch-friendly
    padding: 0.75rem;
    font-size: 1rem;  // Prevents zoom on iOS
  }
}

// Multi-column form (desktop only)
.form-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

### Prevent iOS Zoom on Input Focus

```html
<!-- Font size must be 16px or larger -->
<input type="text" style="font-size: 16px;">
```

```scss
input,
select,
textarea {
  font-size: 1rem;  // 16px - prevents iOS zoom
}
```

## Tables

### Responsive Tables

```html
<!-- Wrapper for horizontal scroll -->
<div class="table-responsive">
  <table class="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>John Doe</td>
        <td>john@example.com</td>
        <td>Admin</td>
      </tr>
    </tbody>
  </table>
</div>
```

```scss
.table-responsive {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;  // Smooth scrolling on iOS
  
  table {
    min-width: 600px;  // Force horizontal scroll on mobile
  }
}
```

## Utilities

### Responsive Utilities

```scss
// Spacing (Bootstrap-style)
.mb-3 {
  margin-bottom: 1rem;
  
  @media (min-width: 768px) {
    margin-bottom: 1.5rem;
  }
  
  @media (min-width: 1200px) {
    margin-bottom: 2rem;
  }
}

// Display
.d-none { display: none; }
.d-block { display: block; }
.d-flex { display: flex; }

.d-md-none { 
  @media (min-width: 768px) { display: none; } 
}
.d-md-block { 
  @media (min-width: 768px) { display: block; } 
}
.d-md-flex { 
  @media (min-width: 768px) { display: flex; } 
}
```

## Testing

### Device Testing

**Physical Devices**:
- [ ] iPhone (Safari)
- [ ] Android phone (Chrome)
- [ ] iPad (Safari)
- [ ] Android tablet (Chrome)

**Browser Dev Tools**:
- [ ] Chrome DevTools device emulation
- [ ] Firefox Responsive Design Mode
- [ ] Safari Web Inspector

### Viewport Testing

**Test at these specific widths**:
- [ ] 320px (small mobile)
- [ ] 375px (iPhone SE) ✅ Required
- [ ] 414px (iPhone Plus)
- [ ] 768px (iPad portrait) ✅ Required
- [ ] 1024px (iPad landscape)
- [ ] 1440px (desktop) ✅ Required
- [ ] 1920px (HD desktop)

### Orientation Testing

- [ ] Portrait orientation
- [ ] Landscape orientation

### Feature Testing

- [ ] All text readable without zooming
- [ ] Touch targets ≥ 44x44px
- [ ] No horizontal scroll
- [ ] Images scale properly
- [ ] Forms usable on mobile
- [ ] Navigation accessible on all sizes
- [ ] Content reflows appropriately

## Performance

### Mobile Performance

```scss
// Optimize for mobile
@media (max-width: 767px) {
  // Reduce animation complexity
  .complex-animation {
    animation: simple-fade 0.3s ease;
  }
  
  // Smaller images
  .hero {
    background-image: url('hero-mobile.jpg');
  }
}

@media (min-width: 768px) {
  .hero {
    background-image: url('hero-tablet.jpg');
  }
}

@media (min-width: 1200px) {
  .hero {
    background-image: url('hero-desktop.jpg');
  }
}
```

### Lazy Loading

```html
<img src="image.jpg" loading="lazy" alt="Description">
```

## Best Practices

### Do's

✅ Design mobile-first  
✅ Test on real devices  
✅ Use relative units (rem, %, vw, vh)  
✅ Ensure touch targets ≥ 44px  
✅ Prevent horizontal scroll  
✅ Use responsive images  
✅ Test landscape orientation  

### Don'ts

❌ Don't use fixed pixel widths  
❌ Don't assume desktop layout  
❌ Don't use hover-only interactions  
❌ Don't create small touch targets  
❌ Don't forget about landscape  
❌ Don't block zooming (user-scalable=no)  
❌ Don't use device-specific breakpoints  

## Accessibility

### Viewport Meta Tag

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

**Never disable zooming**:
```html
<!-- ❌ BAD -->
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">

<!-- ✅ GOOD -->
<meta name="viewport" content="width=device-width, initial-scale=1">
```

## Related Specifications

- [Accessibility](./accessibility.md)
- [SCSS & Styling](./scss-styling.md)
- [Layout System](./layout-system.md)
- [Typography](./typography.md)
- [Performance](./performance.md)
