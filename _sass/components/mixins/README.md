# Component Mixins

This directory contains reusable SCSS mixins for component patterns.

These mixins define component structures and patterns that can be imported and used across the theme. They must be loaded before individual component implementations that use them.

## Files

- `_card-component.scss` - Card component mixins
- `_content-section-component.scss` - Content section patterns
- `_cta-component.scss` - Call-to-action component mixins
- `_form-component.scss` - Form component patterns
- `_header-component.scss` - Header section mixins
- `_hero-component.scss` - Hero section patterns
- `_image-card-component.scss` - Image card mixins
- `_layout-component.scss` - Layout component patterns
- `_products-grid-component.scss` - Product grid mixins
- `_section-component.scss` - Generic section mixins
- `_team-component.scss` - Team member component patterns

## Usage

These files are imported early in `_common.scss` to make their mixins available to other components.
