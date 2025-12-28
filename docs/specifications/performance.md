# Performance Standards

## Overview

This specification defines performance standards, optimization techniques, and best practices for the ASI Saga theme. The goal is to deliver fast, efficient experiences across all devices and network conditions.

## Performance Targets

### Core Web Vitals

**Target scores (Lighthouse)**:

| Metric | Target | Minimum |
|--------|--------|---------|
| **Performance** | ≥ 90 | ≥ 80 |
| **Accessibility** | 100 | ≥ 95 |
| **Best Practices** | 100 | ≥ 90 |
| **SEO** | 100 | ≥ 90 |

### Web Vitals Metrics

**Largest Contentful Paint (LCP)**:
- **Good**: ≤ 2.5s
- **Needs Improvement**: 2.5s - 4.0s
- **Poor**: > 4.0s

**First Input Delay (FID)**:
- **Good**: ≤ 100ms
- **Needs Improvement**: 100ms - 300ms
- **Poor**: > 300ms

**Cumulative Layout Shift (CLS)**:
- **Good**: ≤ 0.1
- **Needs Improvement**: 0.1 - 0.25
- **Poor**: > 0.25

## Asset Optimization

### Images

**Compression**:
```bash
# Use tools like ImageOptim, TinyPNG, or Squoosh
# Target: 70-80% quality for JPEGs
# Use WebP format when possible
```

**Responsive Images**:
```html
<img 
  src="image-800.jpg"
  srcset="
    image-400.jpg 400w,
    image-800.jpg 800w,
    image-1200.jpg 1200w
  "
  sizes="(max-width: 768px) 100vw, 800px"
  loading="lazy"
  alt="Description">
```

**Lazy Loading**:
```html
<!-- Native lazy loading -->
<img src="image.jpg" loading="lazy" alt="Description">

<!-- For background images -->
<div class="lazy-bg" data-bg="background.jpg"></div>
```

```javascript
// JavaScript lazy loading for background images
const lazyBackgrounds = document.querySelectorAll('.lazy-bg');

const bgObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bg = entry.target.dataset.bg;
      entry.target.style.backgroundImage = `url(${bg})`;
      bgObserver.unobserve(entry.target);
    }
  });
});

lazyBackgrounds.forEach(el => bgObserver.observe(el));
```

### CSS

**Minimize and Optimize**:
```scss
// Remove unused Bootstrap components
// In _common.scss, only import what you need

// ✅ GOOD: Selective imports
@import "bootstrap/functions";
@import "bootstrap/variables";
@import "bootstrap/mixins";
@import "bootstrap/grid";
@import "bootstrap/utilities";

// ❌ BAD: Import everything
@import "bootstrap/bootstrap";  // Too large
```

**Critical CSS**:
```html
<!-- Inline critical CSS in <head> -->
<style>
  /* Above-the-fold styles */
  body { font-family: sans-serif; }
  .header { background: #0B1426; }
  /* ... */
</style>

<!-- Load full CSS asynchronously -->
<link rel="preload" href="/assets/css/style.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="/assets/css/style.css"></noscript>
```

**CSS Containment** (MANDATORY):
```scss
.layout-container,
.site-main,
.content-wrapper {
  contain: layout style;
  isolation: isolate;
}
```

### JavaScript

**Module Strategy**:
```javascript
// Use ES6 modules (native browser support)
// No bundling overhead for application code

// Entry point: assets/js/common.js
import "./common/header-scroll.js";
import "./common/bootstrap.js";
import "./common/footer.js";

// Comment out unused modules
// import './common/analytics.js';
// import './common/animations.js';
```

**Script Loading**:
```html
<!-- ✅ GOOD: Deferred/async loading -->
<script type="module" src="/assets/js/common.js"></script>
<script defer src="/assets/js/legacy.js"></script>

<!-- ❌ BAD: Blocking script -->
<script src="/assets/js/app.js"></script>
```

**Code Splitting**:
```javascript
// Load heavy features on-demand
async function loadChatroom() {
  const { ChatroomApp } = await import('./chatroom-app.js');
  new ChatroomApp();
}

// Trigger on user action
document.querySelector('#open-chat').addEventListener('click', loadChatroom);
```

### Fonts

**Font Loading Strategy**:
```scss
// Use font-display: swap
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter.woff2') format('woff2');
  font-display: swap;  // Show fallback immediately
  font-weight: 400;
  font-style: normal;
}
```

```html
<!-- Preload critical fonts -->
<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>
```

**Fallback Fonts**:
```scss
$font-family-interface: 'Inter', -apple-system, BlinkMacSystemFont, 
                        'Segoe UI', Roboto, sans-serif;
// System fonts load instantly while web font loads
```

## Rendering Performance

### Layout Stability (CLS)

**Reserve space for dynamic content**:
```html
<!-- ✅ GOOD: Set dimensions -->
<img src="image.jpg" width="800" height="600" alt="Description">

<!-- Or use aspect-ratio -->
<img src="image.jpg" style="aspect-ratio: 16/9; width: 100%;" alt="Description">

<!-- ❌ BAD: No dimensions -->
<img src="image.jpg" alt="Description">
```

**Avoid layout shifts**:
```scss
// ✅ GOOD: Placeholder for ads/embeds
.ad-container {
  min-height: 250px;
  background: $gray-100;
}

// ❌ BAD: Content appears and shifts layout
```

### Paint Performance

**Use hardware acceleration**:
```scss
// ✅ GOOD: transform and opacity (GPU-accelerated)
.element {
  transform: translateX(0);
  opacity: 1;
  transition: transform 0.3s ease, opacity 0.3s ease;
  
  &:hover {
    transform: translateX(10px);
    opacity: 0.8;
  }
}

// ❌ BAD: Layout properties (CPU-bound)
.element {
  left: 0;
  transition: left 0.3s ease;
  
  &:hover {
    left: 10px;  // Triggers layout recalculation
  }
}
```

**Will-change optimization**:
```scss
.complex-animation {
  will-change: transform, opacity;
  
  &.animating {
    animation: complex-motion 2s ease;
  }
  
  &.complete {
    will-change: auto;  // Remove after animation
  }
}
```

### Reflow/Repaint Minimization

**Batch DOM updates**:
```javascript
// ❌ BAD: Multiple reflows
for (let i = 0; i < 100; i++) {
  document.body.appendChild(createItem(i));  // Reflow each time
}

// ✅ GOOD: Single reflow
const fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
  fragment.appendChild(createItem(i));
}
document.body.appendChild(fragment);  // One reflow
```

**Read/write DOM separately**:
```javascript
// ❌ BAD: Interleaved read/write
const height1 = el1.offsetHeight;  // Read
el1.style.height = height1 + 10 + 'px';  // Write
const height2 = el2.offsetHeight;  // Read (forces reflow)
el2.style.height = height2 + 10 + 'px';  // Write

// ✅ GOOD: Batch reads, then writes
const height1 = el1.offsetHeight;
const height2 = el2.offsetHeight;
el1.style.height = height1 + 10 + 'px';
el2.style.height = height2 + 10 + 'px';
```

## Network Performance

### Resource Hints

```html
<!-- DNS prefetch for external domains -->
<link rel="dns-prefetch" href="https://fonts.googleapis.com">

<!-- Preconnect for critical third-party origins -->
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Preload critical resources -->
<link rel="preload" href="/assets/css/style.css" as="style">
<link rel="preload" href="/assets/js/common.js" as="script">
<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>

<!-- Prefetch for likely next navigation -->
<link rel="prefetch" href="/about/">
```

### Compression

**Enable Gzip/Brotli** (server configuration):
```
# .htaccess (Apache)
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/json
</IfModule>

# Nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
```

### Caching

**HTTP headers** (server configuration):
```
# Static assets (CSS, JS, fonts, images)
Cache-Control: public, max-age=31536000, immutable

# HTML
Cache-Control: public, max-age=3600, must-revalidate

# Service Worker for offline support (future)
```

**Cache busting**:
```liquid
<!-- Add query string with build time -->
<link rel="stylesheet" href="{{ '/assets/css/style.css' | relative_url }}?v={{ site.time | date: '%s' }}">
```

## JavaScript Performance

### Debouncing and Throttling

```javascript
// Debounce: Wait for pause in events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Usage: Search input
const debouncedSearch = debounce(searchFunction, 300);
input.addEventListener('input', debouncedSearch);

// Throttle: Limit execution rate
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Usage: Scroll handler
const throttledScroll = throttle(scrollHandler, 100);
window.addEventListener('scroll', throttledScroll);
```

### Efficient Event Delegation

```javascript
// ✅ GOOD: Single listener for all buttons
document.addEventListener('click', (e) => {
  if (e.target.matches('[data-action="delete"]')) {
    handleDelete(e.target);
  }
});

// ❌ BAD: Listener for each button
document.querySelectorAll('[data-action="delete"]').forEach(button => {
  button.addEventListener('click', handleDelete);
});
```

### Avoid Memory Leaks

```javascript
// ✅ GOOD: Remove listeners
class Component {
  constructor() {
    this.handleClick = this.handleClick.bind(this);
    this.button.addEventListener('click', this.handleClick);
  }
  
  destroy() {
    this.button.removeEventListener('click', this.handleClick);
  }
  
  handleClick() {
    // Handle click
  }
}

// Clear intervals and timeouts
const interval = setInterval(update, 1000);
// Later:
clearInterval(interval);
```

## Third-Party Scripts

### Async Loading

```html
<!-- ✅ GOOD: Async third-party scripts -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>

<!-- Defer for order-dependent scripts -->
<script defer src="https://cdn.example.com/library.js"></script>
```

### Lazy Load Non-Critical Scripts

```javascript
// Load analytics after page load
window.addEventListener('load', () => {
  const script = document.createElement('script');
  script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_ID';
  script.async = true;
  document.head.appendChild(script);
});
```

## Monitoring

### Performance API

```javascript
// Measure page load time
window.addEventListener('load', () => {
  const perfData = performance.getEntriesByType('navigation')[0];
  console.log('Page load time:', perfData.loadEventEnd - perfData.fetchStart);
  console.log('DOM ready:', perfData.domContentLoadedEventEnd - perfData.fetchStart);
});

// Measure specific operations
performance.mark('operation-start');
// ... do work ...
performance.mark('operation-end');
performance.measure('operation-duration', 'operation-start', 'operation-end');
const measure = performance.getEntriesByName('operation-duration')[0];
console.log('Operation took:', measure.duration, 'ms');
```

### Core Web Vitals

```javascript
// Web Vitals library (optional)
import {getCLS, getFID, getFCP, getLCP, getTTFB} from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

## Build Optimization

### SCSS Optimization

```scss
// Remove unused styles
// Use PurgeCSS or similar in production build

// Minimize nesting
// ✅ GOOD: Shallow nesting
.card {
  &__title {
    font-size: 1.5rem;
  }
}

// ❌ BAD: Deep nesting (larger compiled CSS)
.container {
  .row {
    .col {
      .card {
        .title {
          font-size: 1.5rem;
        }
      }
    }
  }
}
```

### Jekyll Optimization

```yaml
# _config.yml

# Production build
JEKYLL_ENV: production

# Optimize output
sass:
  style: compressed
  
# Exclude unnecessary files
exclude:
  - node_modules
  - _samples
  - docs
  - README.md
```

## Performance Testing

### Tools

**Lighthouse**:
```bash
# CLI
npm install -g lighthouse
lighthouse https://example.com --view

# Chrome DevTools
# Open DevTools > Lighthouse tab > Generate report
```

**WebPageTest**:
- https://www.webpagetest.org/
- Test from multiple locations
- Test on real devices

**Chrome DevTools**:
- Performance tab for profiling
- Network tab for asset analysis
- Coverage tab for unused CSS/JS

### Performance Budget

Set limits for asset sizes:

| Resource Type | Budget | Current |
|---------------|--------|---------|
| HTML | < 50 KB | - |
| CSS | < 100 KB | - |
| JavaScript | < 150 KB | - |
| Images (per page) | < 500 KB | - |
| Total Page Weight | < 1 MB | - |
| Requests | < 30 | - |

## Performance Checklist

### Critical Optimizations
- [ ] Images compressed and lazy-loaded
- [ ] CSS minified (Jekyll production build)
- [ ] JavaScript deferred or async
- [ ] Fonts use `font-display: swap`
- [ ] Critical CSS inlined
- [ ] Resource hints used (preconnect, prefetch)
- [ ] HTTP compression enabled (Gzip/Brotli)
- [ ] Caching headers configured
- [ ] CSS containment applied to layouts

### Advanced Optimizations
- [ ] Unused CSS removed
- [ ] Code splitting implemented
- [ ] Service worker for offline support (future)
- [ ] HTTP/2 enabled on server
- [ ] CDN for static assets (if applicable)
- [ ] Image format optimization (WebP)
- [ ] Third-party scripts lazy-loaded

### Testing
- [ ] Lighthouse score ≥ 90
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] Tested on 3G network
- [ ] Tested on low-end device

## Best Practices

### Do's

✅ Optimize images before uploading  
✅ Use lazy loading for below-fold content  
✅ Minimize and compress CSS/JS  
✅ Use efficient animations (transform, opacity)  
✅ Implement caching strategies  
✅ Monitor Core Web Vitals  
✅ Test on real devices and networks  

### Don'ts

❌ Don't load unnecessary libraries  
❌ Don't use blocking scripts in `<head>`  
❌ Don't animate layout properties  
❌ Don't forget to remove `will-change` after use  
❌ Don't ignore performance budgets  
❌ Don't ship uncompressed images  
❌ Don't use synchronous XHR  

## Related Specifications

- [Responsive Design](./responsive-design.md)
- [Animation System](./animation-system.md)
- [JavaScript](./javascript.md)
- [Build & Deployment](./build-deployment.md)
