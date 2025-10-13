# Single Class Per Element Implementation Guide

## Overview

This guide documents the refactoring effort to reduce multiple classes per HTML element to ideally one class, unless absolutely necessary for Bootstrap JavaScript functionality.

## Strategy

### Classes That Must Be Kept (JavaScript Dependencies)

The following Bootstrap classes are **required** for JavaScript functionality and must be retained:

- `collapse` - For Bootstrap collapse.js
- `dropdown` - For Bootstrap dropdown.js
- `dropdown-toggle` - For dropdown buttons
- `dropdown-menu` - For dropdown containers
- `dropdown-item` - For dropdown items
- `dropdown-divider` - For dropdown separators
- `modal`, `modal-fade` - For modal.js
- `modal-dialog`, `modal-content`, `modal-header`, `modal-body`, `modal-footer` - For modal structure
- `btn-close` - For dismissible components
- `tab-pane`, `tab-content` - For tabs.js
- `navbar-toggler` - For navbar collapse

### Refactoring Approach

1. **Merge Bootstrap Utilities into Custom Classes**: Combine Bootstrap utility classes (like `d-flex`, `mb-3`, `fw-bold`, etc.) into single, semantic custom classes
2. **Extend Bootstrap Component Classes**: Add custom styling to required Bootstrap component classes via nested SCSS
3. **Create Combined Utility Classes**: For commonly used utility combinations, create single classes in `_utilities-combined.scss`

## Files Refactored

### Core Components

#### header.html
**Before:**
```html
<header class="site-header navbar navbar-expand-lg container-fluid">
<div class="collapse navbar-collapse site-header-nav">
```

**After:**
```html
<header class="site-header">
<div class="collapse site-header-nav">
```

**SCSS Changes**: Merged `navbar`, `navbar-expand-lg`, `container-fluid` styles into `.site-header`

#### navbar.html
**Before:**
```html
<ul class="site-navbar navbar-nav">
<ul class="dropdown-menu navbar-dropdown">
<a class="dropdown-item navbar-dropdown-item">
```

**After:**
```html
<ul class="site-navbar">
<ul class="dropdown-menu">
<a class="dropdown-item">
```

**SCSS Changes**: Merged custom navbar styles into Bootstrap dropdown classes within `.site-navbar` context

#### hero.html
**Before:**
```html
<a class="btn btn-primary btn-lg pulse hero-button">
```

**After:**
```html
<a class="hero-button">
```

**SCSS Changes**: Consolidated all button styles (btn, btn-primary, btn-lg, pulse) into `.hero-button`

### Layout Files

#### settings.html
**Before:**
```html
<div class="settings-layout h-100">
  <aside class="col-lg-3 border-end bg-light py-4">
    <h4 class="fw-bold mb-4 px-3">
    <button class="btn btn-primary me-2">
```

**After:**
```html
<div class="settings-layout">
  <aside class="settings-sidebar col-lg-3">
    <h4 class="settings-sidebar-heading">
    <button class="settings-save-btn">
```

**SCSS Changes**: Created semantic classes that include all utility styles

#### landing.html
**Before:**
```html
<div class="row align-items-center min-vh-50">
<h1 class="display-3 fw-bold mb-4">
<a class="btn btn-light btn-lg">
```

**After:**
```html
<div class="landing-hero-row">
<h1 class="landing-hero-title">
<a class="landing-hero-cta">
```

**SCSS Changes**: Created specific landing component classes

### Component Includes

#### dashboard-widget.html
**Before:**
```html
<div class="d-flex justify-content-between align-items-start mb-3">
<h5 class="card-title text-muted mb-0">
<h2 class="display-6 fw-bold mb-0">
```

**After:**
```html
<div class="widget-header">
<h5 class="widget-title">
<h2>
```

**SCSS Changes**: Created `.dashboard-widget-component` with nested semantic classes

#### post-meta.html
**Before:**
```html
<div class="meta-info text-muted mb-3">
<span class="meta-date me-3">
<span class="badge bg-secondary me-1 mb-1">
```

**After:**
```html
<div class="meta-info">
<span class="meta-date">
<span class="tag-badge">
```

**SCSS Changes**: Created `.post-meta-component` with nested semantic classes

#### content-modal.html
**Before:**
```html
<div class="modal-dialog modal-dialog-centered modal-lg">
<button class="btn btn-secondary">
```

**After:**
```html
<div class="modal-dialog-centered-lg">
<button class="btn-secondary">
```

**SCSS Changes**: Created combined modal and button classes in `_utilities-combined.scss`

## Utility Classes Created

A new file `_sass/base/_utilities-combined.scss` was created with commonly used utility combinations:

- `.flex-between-center` - `d-flex justify-content-between align-items-center`
- `.flex-start` - `d-flex align-items-start`
- `.flex-gap-2` - `d-flex gap-2`
- `.text-muted-small` - `text-muted small`
- `.badge-light-dark` - `badge bg-light text-dark`
- `.btn-primary-lg` - `btn btn-primary btn-lg`
- `.modal-dialog-centered-lg` - `modal-dialog modal-dialog-centered modal-lg`
- And many more...

## SCSS Structure

### Component-Specific SCSS
Each component now has comprehensive SCSS that includes:
1. Base structural styles
2. Bootstrap utility equivalents
3. Custom enhancements
4. Responsive breakpoints
5. State variations (hover, focus, active)

### Example Pattern
```scss
.component-name {
  // Base styles (display, position, etc.)
  display: flex;
  
  // Bootstrap utilities merged in
  padding: 1rem;
  margin-bottom: 1.5rem;
  
  // Custom enhancements
  border-radius: 0.5rem;
  
  // Nested elements
  .component-child {
    // Child styles
  }
  
  // State variations
  &:hover {
    // Hover state
  }
  
  // Responsive
  @media (min-width: 768px) {
    // Tablet and up
  }
}
```

## Benefits of This Approach

1. **Cleaner HTML**: Easier to read and maintain
2. **Better Semantics**: Class names describe purpose, not presentation
3. **Centralized Styling**: All component styles in one place
4. **Easier Refactoring**: Change styles once in SCSS instead of updating multiple HTML files
5. **Better Performance**: Fewer class attribute bytes in HTML
6. **Maintains Functionality**: Bootstrap JavaScript still works with required classes

## Guidelines for Future Development

1. **When Adding New Components**:
   - Create a semantic class name that describes the component
   - Add all necessary styles to the SCSS file
   - Use only one class in HTML (except Bootstrap JS-required classes)

2. **When Using Bootstrap Components**:
   - Keep required JavaScript classes
   - Merge utility classes into your custom class via SCSS
   - Extend Bootstrap component classes in your SCSS when needed

3. **When Creating Variations**:
   - Use modifier classes (BEM style): `.component-name--modifier`
   - Or use parameters in includes: `{% include component.html variant="alt" %}`

## Next Steps

While significant progress has been made on core components and layouts, the following files still have opportunities for consolidation:

1. Sample files in `_samples/` directory
2. Remaining layout files
3. Additional component includes
4. Documentation pages

The patterns established in this refactoring can be applied to these remaining files as needed.
