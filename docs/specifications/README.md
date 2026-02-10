# ASI Saga Theme Specifications

This directory contains comprehensive technical specifications for the ASI Saga theme codebase. These specifications document the architecture, patterns, conventions, and best practices used throughout the project.

## Purpose

These specifications serve as:
- **Reference Documentation**: Detailed technical reference for developers working on the theme
- **Onboarding Guide**: Help new contributors understand the codebase structure and conventions
- **Design Contract**: Living documentation of architectural decisions and patterns
- **Quality Baseline**: Standards for code quality, accessibility, and performance

## Specifications Index

### Core Architecture
1. [**Architecture Overview**](./architecture.md) - System architecture, technology stack, and design patterns
2. [**Build & Deployment**](./build-deployment.md) - Build process, asset compilation, and deployment workflows
3. [**GitHub Copilot Agent Guidelines**](./github-copilot-agent-guidelines.md) - AI agent development for .github/ directory

### Frontend Technologies
3. [**HTML & Liquid Templating**](./html-liquid.md) - Jekyll templates, Liquid syntax, and semantic HTML patterns
4. [**SCSS & Styling**](./scss-styling.md) - SCSS architecture, component styles, and theming system
5. [**JavaScript Modules**](./javascript.md) - JavaScript architecture, ES6 modules, and interaction patterns

### Component Systems
6. [**Component Library**](./component-library.md) - Reusable UI components and their specifications
7. [**Layout System**](./layout-system.md) - Layout templates, grid system, and page structure
8. [**Navigation Components**](./navigation.md) - Header, navbar, footer, and navigation patterns

### Quality Standards
9. [**Accessibility Standards**](./accessibility.md) - WCAG compliance, semantic HTML, and inclusive design
10. [**Responsive Design**](./responsive-design.md) - Mobile-first approach, breakpoints, and adaptive layouts
11. [**Performance Standards**](./performance.md) - Loading optimization, asset management, and runtime performance

### Design System
12. [**Color System**](./color-system.md) - Sacred color palette, contrast requirements, and theming
13. [**Typography**](./typography.md) - Font system, text hierarchy, and readability standards
14. [**Animation System**](./animation-system.md) - Sacred animations, transitions, and motion design

## How to Use These Specifications

### For New Contributors
1. Start with [Architecture Overview](./architecture.md) to understand the system
2. Review the relevant technology specifications (HTML, SCSS, JS) for your work area
3. Reference [Accessibility Standards](./accessibility.md) before making any changes
4. Consult component-specific docs when working with existing components

### For Code Reviews
- Verify changes align with specifications in the relevant domains
- Check accessibility and responsive design compliance
- Ensure new components follow established patterns

### For Planning New Features
- Review existing component library to avoid duplication
- Consult layout system for page structure patterns
- Reference design system specs for visual consistency

## Maintaining These Specifications

These are **living documents** that should be updated when:
- New patterns or conventions are established
- Architecture decisions are made
- New components are added to the library
- Best practices evolve

All changes to specifications should be reviewed and approved to ensure consistency.

## Related Documentation

- [Layout Grid Governance](../layout-grid-governance.md) - Bootstrap grid usage rules
- [Layout Taxonomy](../layout-taxonomy.md) - Layout hierarchy and inheritance
- [Implementation Guides](../layout-implementation-guide.md) - Practical usage examples
- [GitHub Instructions](.github/instructions/) - File-specific development guidelines

## Version

**Specification Version**: 1.0.0  
**Theme Version**: Compatible with current theme  
**Last Updated**: December 2024
