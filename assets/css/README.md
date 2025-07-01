# SCSS Component System Documentation

This document provides an overview of the reusable SCSS component system for the ASI Saga website. The component system is designed to reduce duplication, improve maintainability, and leverage Bootstrap's functionality more effectively.

## Overview

The component system is organized into reusable mixins that generate class-based styles when included in page-specific SCSS files. Components are prefixed by default but allow for custom prefixing when needed.

## How to Use Components

To use a component in a page-specific SCSS file:

```scss
// Include the component with the default prefix
@include card-component();

// Or include with a custom prefix
@include card-component('custom-prefix');
```

## Available Components

### Card Components
**File:** `_components/_card-component.scss`

- `card-component($prefix: 'card')`: Basic card layout
- `accent-card-component($prefix: 'card', $border-width, $border-color)`: Card with accent border
- `featured-card-component($prefix: 'card', $bg-color)`: Card with highlighted styling

### Image Card Components
**File:** `_components/_image-card-component.scss`

- `image-card-component($prefix: 'card', $img-height)`: Card with image
- `featured-image-card-component($prefix: 'card', $img-height, $border-color)`: Featured card with image and border

### Section Components
**File:** `_components/_section-component.scss`

- `section-component($prefix: 'section')`: Content section layout
- `alt-section-component($prefix: 'section', $bg-color)`: Alternate section with background
- `header-section-component($prefix: 'section')`: Section with header and divider

### Layout Components
**File:** `_components/_layout-component.scss`

- `page-layout($prefix: 'page')`: Basic page layout structure
- `sidebar-layout($prefix: 'page', $sidebar-width)`: Two-column layout with sidebar
- `grid-layout($prefix: 'grid', $cols)`: Multi-column grid system

### Form Components
**File:** `_components/_form-component.scss`

- `form-component($prefix: 'form')`: Basic form layout and styling
- `contact-form-component($prefix: 'contact-form')`: Contact form variation

### Team Components
**File:** `_components/_team-component.scss`

- `team-component($prefix: 'team')`: Team member profiles grid
- `alt-team-component($prefix: 'team')`: Alternative team styling with gradient

### Header Components
**File:** `_components/_header-component.scss`

- `header-component($prefix: 'header')`: Basic page header
- `gradient-header-component($prefix: 'header', $start-color, $end-color)`: Header with gradient background

### Content Section Components
**File:** `_components/_content-section-component.scss`

- `content-section-component($prefix: 'content')`: Text-focused content sections
- `divider-content-section-component($prefix: 'content')`: Content with divider styling

### Hero Components
**File:** `_components/_hero-component.scss`

- `hero-component($prefix: 'hero')`: Basic hero/banner section
- `gradient-hero-component($prefix: 'hero', $start-color, $end-color)`: Hero with gradient background

### Products Grid Components
**File:** `_components/_products-grid-component.scss`

- `products-grid-component($prefix: 'products')`: Products displayed in a grid
- `featured-products-grid-component($prefix: 'products', $accent-color)`: Products with accent styling

### CTA Components
**File:** `_components/_cta-component.scss`

- `cta-component($prefix: 'cta')`: Basic call-to-action section
- `light-cta-component($prefix: 'cta')`: CTA with light gradient background
- `dark-cta-component($prefix: 'cta')`: CTA with dark background and inverted colors

## Best Practices

1. Use component mixins instead of writing custom CSS wherever possible
2. Keep page-specific SCSS files minimal by leveraging components
3. Follow Bootstrap's approach of extending utilities rather than writing custom CSS
4. Use semantic prefixes that match the content (e.g., 'team', 'product', etc.)
5. When customizing components, prefer mixin parameters over additional CSS
6. Maintain consistent naming patterns across components for predictability
