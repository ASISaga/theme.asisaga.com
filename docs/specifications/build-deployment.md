# Build & Deployment Specification

## Overview

This specification documents the build process, asset compilation, and deployment workflows for the ASI Saga theme. The theme is a Jekyll-based static site with SCSS compilation and JavaScript module bundling.

## Technology Stack

### Core Technologies

- **Jekyll**: Static site generator (Ruby-based)
- **SCSS/Sass**: CSS preprocessor (compiled by Jekyll)
- **Vite**: Build tool for JavaScript vendor libraries
- **Git**: Version control
- **GitHub Pages**: Hosting platform (typical deployment target)

### Build Tools

```json
// Note: No package.json in root (Jekyll handles most compilation)
// Vite used only for vendor library bundling (Popper.js)
```

## Build Process

### Jekyll Build

Jekyll handles:
- SCSS compilation to CSS
- Liquid template processing
- Markdown to HTML conversion
- Static file copying

**Command**:
```bash
jekyll build
```

**Output**: `_site/` directory

**Configuration**: 
- Jekyll configuration would typically be in `_config.yml` (not present in codebase currently)
- SCSS entry point: `assets/css/style.scss`
- SCSS partials: `_sass/` directory

### SCSS Compilation

**Entry Point**: `assets/css/style.scss`

```scss
// assets/css/style.scss
---
# Front matter required for Jekyll processing
---

@import "common";
```

**Process**:
1. Jekyll processes files with front matter
2. `@import "common"` loads `_sass/_common.scss`
3. `_common.scss` imports all partials in correct order
4. Jekyll compiles to `_site/assets/css/style.css`

**Output**: `_site/assets/css/style.css`

### JavaScript Bundling

**Vendor Libraries** (Vite):

**File**: `vite.config.js`

```javascript
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(process.env.NODE_MODULES_PATH || 'node_modules', '@popperjs/core/lib/index.js'),
            name: 'Popper',
            formats: ['es'],
            fileName: () => 'popper.esm.js'
        },
        outDir: path.resolve(process.env.VENDOR_DIR || 'theme.asisaga.com/assets/js/vendor'),
        emptyOutDir: false,
        rollupOptions: {
            output: {
                exports: 'named'
            }
        }
    }
})
```

**Purpose**: Bundles Popper.js for Bootstrap tooltips/popovers

**Command** (if needed):
```bash
vite build
```

**Application JavaScript**:
- ES6 modules loaded natively by browser
- No bundling required (modern browsers support ES6 modules)
- Entry point: `assets/js/common.js`

## Directory Structure

### Source Files

```
theme.asisaga.com/
├── _layouts/          # Jekyll layouts
├── _includes/         # Liquid includes
├── _sass/             # SCSS source files
│   ├── _common.scss   # Main SCSS entry point
│   ├── base/
│   ├── bootstrap/
│   ├── components/
│   ├── layouts/
│   └── fontawesome/
├── assets/
│   ├── css/
│   │   └── style.scss # CSS entry point (processed by Jekyll)
│   ├── js/
│   │   ├── common.js  # JS entry point
│   │   ├── common/    # JS modules
│   │   └── vendor/    # Vendor libraries
│   └── images/
├── _data/             # Structured data (JSON)
├── _samples/          # Example pages
├── docs/              # Documentation
└── vite.config.js     # Vite configuration
```

### Build Output

```
_site/                 # Generated site (not committed)
├── assets/
│   ├── css/
│   │   └── style.css  # Compiled CSS
│   ├── js/
│   │   ├── common.js  # Copied JS
│   │   └── common/    # Copied modules
│   └── images/        # Copied images
├── index.html         # Generated pages
└── ...
```

## Development Workflow

### Local Development

1. **Install Jekyll**:
```bash
gem install jekyll bundler
```

2. **Install dependencies** (if Gemfile exists):
```bash
bundle install
```

3. **Serve site locally**:
```bash
jekyll serve
```

**Output**:
```
Server address: http://127.0.0.1:4000/
Server running... press ctrl-c to stop.
```

4. **Live reload**: Jekyll auto-rebuilds on file changes

### Making Changes

**SCSS Changes**:
1. Edit files in `_sass/`
2. Jekyll auto-recompiles on save
3. Refresh browser to see changes

**HTML/Liquid Changes**:
1. Edit files in `_layouts/`, `_includes/`, or page content
2. Jekyll auto-regenerates on save
3. Refresh browser

**JavaScript Changes**:
1. Edit files in `assets/js/`
2. No compilation needed (ES6 modules)
3. Refresh browser (may need hard refresh: Ctrl+F5)

### Build Commands

**Development build**:
```bash
jekyll build
```

**Production build**:
```bash
JEKYLL_ENV=production jekyll build
```

**Serve with drafts**:
```bash
jekyll serve --drafts
```

**Incremental build** (faster):
```bash
jekyll build --incremental
```

## Deployment

### GitHub Pages Deployment

**Automatic deployment** (if configured):
- Push to `main` or `gh-pages` branch
- GitHub Actions builds and deploys automatically
- Site available at `https://username.github.io/repo/`

**Manual deployment**:
1. Build site locally:
```bash
JEKYLL_ENV=production jekyll build
```

2. Deploy `_site/` contents to web server

### Deployment Checklist

- [ ] All changes committed and pushed
- [ ] Build completes without errors
- [ ] SCSS compiles without warnings
- [ ] JavaScript modules load correctly
- [ ] Images and assets copied correctly
- [ ] Links are not broken
- [ ] Site tested in target browsers
- [ ] Accessibility verified
- [ ] Performance checked (Lighthouse)

## Asset Management

### Images

**Location**: `assets/images/`

**Optimization**:
- Compress images before committing
- Use appropriate formats (WebP for photos, SVG for icons)
- Provide multiple sizes for responsive images

**Usage in templates**:
```liquid
<img src="{{ '/assets/images/logo.png' | relative_url }}" alt="Logo">
```

### Fonts

**Font Awesome**:
- Source in `_sass/fontawesome/`
- Imported in `_common.scss`

**Google Fonts** (if used):
```html
<!-- In _includes/head.html -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap">
```

### Vendor Libraries

**Bootstrap**:
- Source in `_sass/bootstrap/`
- Imported in `_common.scss`
- JavaScript in `assets/js/vendor/bootstrap.esm.js`

**Popper.js**:
- Built with Vite
- Output: `assets/js/vendor/popper.esm.js`

## Performance Optimization

### CSS

- **Minimize imports**: Only import needed Bootstrap components
- **Remove unused styles**: Audit and remove unused SCSS
- **Critical CSS**: Inline critical CSS in `<head>` (future optimization)

### JavaScript

- **ES6 modules**: Native browser support (no bundling overhead)
- **Lazy loading**: Load non-critical scripts asynchronously
- **Comment unused imports**: Keep bundle size minimal

```javascript
// Import only what's needed
import "./common/header-scroll.js";
import "./common/bootstrap.js";
import "./common/footer.js";

// Comment out unused modules
// import './common/analytics.js';
// import './common/animations.js';
```

### Images

- **Compress**: Use tools like ImageOptim, TinyPNG
- **Lazy load**: Use `loading="lazy"` attribute
- **Responsive images**: Use `srcset` for different sizes

```html
<img 
  src="image-800.jpg"
  srcset="image-400.jpg 400w, image-800.jpg 800w, image-1200.jpg 1200w"
  sizes="(max-width: 768px) 100vw, 800px"
  loading="lazy"
  alt="Description">
```

## Caching Strategy

### Static Assets

**Headers to set** (on production server):

```
# CSS and JS (with versioning)
Cache-Control: public, max-age=31536000, immutable

# Images
Cache-Control: public, max-age=2592000

# HTML
Cache-Control: public, max-age=3600, must-revalidate
```

### Cache Busting

**Jekyll approach**:
```liquid
<link rel="stylesheet" href="{{ '/assets/css/style.css' | relative_url }}?v={{ site.time | date: '%s' }}">
```

## Environment Variables

### Jekyll Environments

```bash
# Development (default)
jekyll serve

# Production
JEKYLL_ENV=production jekyll build
```

**Usage in templates**:
```liquid
{% if jekyll.environment == "production" %}
  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
{% endif %}
```

### Vite Environment

**Custom variables** (in vite.config.js):

```javascript
process.env.NODE_MODULES_PATH  // Path to node_modules
process.env.VENDOR_DIR          // Output directory for vendor files
```

## Continuous Integration

### GitHub Actions Example

**.github/workflows/build.yml** (example):

```yaml
name: Build and Deploy

on:
  push:
    branches: [ main ]

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Ruby
      uses: ruby/setup-ruby@v1
      with:
        ruby-version: '3.0'
        bundler-cache: true
    
    - name: Build site
      run: |
        bundle exec jekyll build
      env:
        JEKYLL_ENV: production
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./_site
```

## Troubleshooting

### Common Build Issues

**SCSS compilation errors**:
```
Error: Invalid CSS after "...": expected "}", was "@extend .btn;"
```
**Solution**: Never use `@extend` in Jekyll SCSS

**Jekyll not finding partials**:
```
Error: File to import not found or unreadable: common
```
**Solution**: Check import path and ensure partial has underscore prefix

**JavaScript module errors**:
```
Uncaught SyntaxError: Cannot use import statement outside a module
```
**Solution**: Ensure script tag has `type="module"` attribute

### Debugging

**Jekyll verbose output**:
```bash
jekyll build --verbose
```

**SCSS debugging**:
```scss
@debug "Variable value: #{$variable}";
@warn "Checking value: #{$value}";
```

**JavaScript debugging**:
```javascript
console.log('Module loaded:', import.meta.url);
```

## Build Checklist

Before deploying:

- [ ] Jekyll build completes without errors
- [ ] SCSS compiles without warnings
- [ ] JavaScript modules load correctly
- [ ] All links work (check with link checker)
- [ ] Images display correctly
- [ ] Site works in all target browsers
- [ ] Accessibility validated (WAVE, axe)
- [ ] Performance tested (Lighthouse score ≥ 90)
- [ ] SEO meta tags present
- [ ] 404 page works
- [ ] Responsive design verified

## Monitoring

### Post-Deployment

- Monitor site availability
- Check error logs
- Track performance metrics
- Monitor Core Web Vitals
- Review analytics data

### Tools

- **Google Analytics**: User tracking
- **Google Search Console**: SEO monitoring
- **Lighthouse CI**: Performance tracking
- **Uptime monitoring**: Site availability

## Related Specifications

- [Architecture](./architecture.md)
- [Performance Standards](./performance.md)
