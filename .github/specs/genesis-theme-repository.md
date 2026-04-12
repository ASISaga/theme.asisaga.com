# Genesis Ontological Design System Theme Repository

**Version**: 1.1.0  
**Status**: Active  
**Last Updated**: 2026-03-26

## Overview

This specification defines the Genesis Ontological Design System theme repository at `theme.asisaga.com` — a Jekyll theme providing an ontological SCSS design system, semantic HTML layouts, and agent intelligence system templates.

## Repository Role

This is a **Jekyll theme repository** providing:
- Ontological SCSS design system (89 semantic variants across 6 categories)
- 20 semantic HTML layouts and 27+ reusable includes
- 50+ JavaScript modules (common utilities, Motion library, web components)
- 62+ SCSS component files (core, sections, products, sacred, web components)
- Agent intelligence system templates for subdomain bootstrapping
- Reference implementation with 16 sample pages across 5 content categories
- Comprehensive test suite (30+ test pages, Playwright E2E, SCSS validation)

## Architecture References

The Genesis theme implements two major architectural systems:

### 1. Ontological Design System

**Six semantic categories: environment, entity, cognition, synapse, state, atmosphere**
- 89 total variants (33 foundational + 56 evolved)
- Three-tier architecture: Engine → Theme → Subdomains

→ **Full specification**: `.github/specs/ontological-design-system.md`

### 2. Theme-Subdomain Architecture

**Clean separation of infrastructure and content:**
- Theme provides: layouts, includes, SCSS, JS infrastructure
- Subdomains provide: HTML content, optional page-specific SCSS
- Clean separation via Jekyll's `remote_theme` mechanism

→ **Full specification**: `.github/specs/theme-subdomain-architecture.md`

## Repository Structure

```
theme.asisaga.com/
├── _layouts/           # 20 Jekyll layouts (default, post, article, dashboard, etc.)
├── _includes/          # 27+ reusable includes (head, header, footer, components/)
│   └── components/     # 3 web component templates + loader
├── _sass/              # Complete SCSS system
│   ├── ontology/       # Ontological Design System engine (Layer 1 universal base)
│   ├── base/           # Foundation: design tokens, fonts, utilities, effects
│   ├── components/     # Reusable UI components (core, sections, products, sacred, web)
│   ├── includes/       # Include-specific styles mirroring _includes/ hierarchy
│   ├── layouts/        # Page layout styles mirroring _layouts/ (+ grid primitives)
│   ├── demo/           # Demo-only styles (not for subdomains)
│   ├── samples/        # Example/reference SCSS (not compiled)
│   ├── vendor/         # Vendored third-party (Font Awesome)
│   └── _main.scss      # Component bundle (all layouts + includes + components)
├── assets/
│   ├── css/            # Compiled stylesheets
│   ├── js/             # 50+ JavaScript modules
│   │   ├── common/     # 41 shared utilities (genesis-*, motion-*, etc.)
│   │   └── components/ # 4 web component scripts
│   └── json/           # SEO/metadata JSON files
├── _samples/           # 16 sample pages across 5 categories
├── tests/              # Test pages organized by category
│   ├── e2e/            # Playwright E2E regression tests
│   ├── responsive/     # Responsive design tests
│   ├── mobile/         # Mobile-specific tests (touch targets, portrait)
│   ├── motion/         # Motion library tests
│   ├── navigation/     # Navigation and scroll tests
│   ├── overflow/       # Overflow containment tests
│   ├── components/     # Web component demos
│   ├── layouts/        # Layout integration tests
│   └── ontology/       # Ontology system demos
├── docs/               # Complete documentation
│   ├── specifications/ # 22 technical specifications
│   ├── guides/         # 12 implementation guides
│   ├── systems/        # 31 system documentation files
│   └── references/     # Technical references and audit findings
├── GENOME.md           # Evolutionary history of the ontology
├── CHANGELOG.md        # Release history
└── .github/
    ├── specs/          # This directory — system specifications
    ├── subdomain/      # Reference system for subdomain repos
    ├── instructions/   # Path-activated coding standards
    ├── prompts/        # Agent task definitions
    ├── skills/         # Executable agent capabilities
    ├── workflows/      # GitHub Actions CI/CD
    └── docs/           # Agent system implementation guides
```

## Layouts (20 layouts)

All layouts are defined in `_layouts/` and documented in `_layouts/README.md`:

| Layout | Purpose |
|--------|---------|
| `default.html` | Canonical full-featured page scaffold |
| `app.html` | Lightweight app shell |
| `post.html` | Blog post layout |
| `article.html` | Long-form article layout |
| `archive.html` | Archive/listing layout |
| `docs.html` | Documentation layout |
| `faq.html` | FAQ accordion layout |
| `form.html` | Form-based layout |
| `search.html` | Search results layout |
| `gallery.html` | Image gallery layout |
| `landing.html` | Marketing landing page |
| `dashboard.html` | Analytics dashboard |
| `settings.html` | Settings panel layout |
| `chatroom.html` | Real-time chat layout |
| `profile.html` | User profile layout |
| `splash.html` | Full-screen splash page |
| `scrollable.html` | Full-height scrollable viewport |
| `fixed-height.html` | Fixed-height viewport |
| `minimal-base.html` | Stripped-down base (no header/footer) |
| `minimal.html` | Minimal content wrapper |

→ **Layout details and frontmatter reference**: `_layouts/README.md`  
→ **Layout system specification**: `docs/specifications/layout-system.md`

## Component Library

### SCSS Components (62+ files in `_sass/includes/`)

| Category | Files | Examples |
|----------|-------|---------|
| **Core** | 7 | cards, footer, header, navbar, back-to-top, LinkedIn, specialized |
| **Sections** | 8 | hero, CTA, feature-grid, testimonial, timeline |
| **Products** | 10 | product-page, product-card, product-benefits, product-layout |
| **Sacred** | 12 | consciousness-cards, genesis-blocks, transcendent-hero |
| **Mixins** | 11 | card, hero, form, team, content-section component mixins |
| **Web Components** | 4 | alert-card, product-card, testimonial-card (+ index) |

### Web Components (3 working components)

Each web component follows a trinity namespace pattern:

| Component | HTML Template | SCSS | JavaScript |
|-----------|--------------|------|------------|
| `alert-card` | `_includes/components/alert-card.html` | `_sass/includes/web-components/_alert-card.scss` | `assets/js/components/alert-card.js` |
| `product-card` | `_includes/components/product-card.html` | `_sass/includes/web-components/_product-card.scss` | `assets/js/components/product-card.js` |
| `testimonial-card` | `_includes/components/testimonial-card.html` | `_sass/includes/web-components/_testimonial-card.scss` | `assets/js/components/testimonial-card.js` |

→ **Component library specification**: `docs/specifications/component-library.md`  
→ **Web component guide**: `_includes/components/README.md`  
→ **Web component system docs**: `docs/systems/components/`

## SCSS Architecture (`_sass/`)

### Canonical Subdirectory Purposes

Each `_sass/` subdirectory has a single, well-defined responsibility:

| Directory | Canonical Purpose |
|-----------|------------------|
| **`design/`** | Design tokens only — pure SCSS mappings to `_design/tokens/*.json`; the only place for `$variable` declarations |
| **`ontology/`** | Ontological Design System engine (Layer 1) — 6 semantic engines, public API, CSS tokens, infrastructure |
| **`ontology/engines/`** | Engine infrastructure — fonts, utilities, layout, effects (non-token foundation files) |
| **`includes/`** | Include-specific styles — one-to-one SCSS for `_includes/` HTML templates |
| **`layouts/`** | Page layout styles — page-level structures mirroring `_layouts/` HTML |
| **`demo/`** | Demo-only styles — not for subdomains or production |
| **`samples/`** | Example/reference SCSS — not compiled to production |
| **`vendor/`** | Vendored third-party SCSS — Font Awesome |

### Boundary Rules

- **Layout code** (page-level containers, flex columns, grid systems) → `layouts/`
- **Utility classes** (`.sr-only`, `.container`, legacy compatibility) → `ontology/engines/utilities/`
- **Component code** (visual UI elements: cards, buttons, heroes, modals) → `includes/core/`
- **Design tokens** (colors, spacing, typography scales) → `design/`
- **Non-token infrastructure** (fonts, effects, utilities, layout primitives) → `ontology/engines/`
- **Ontology engines and API** → `ontology/` only

### Two-Layer Architecture

```
assets/css/style.scss          ← Jekyll compilation entry point
├── Layer 1: ontology/index    ← Universal base (fonts, tokens, mixins, effects, ontological API)
└── Layer 2: _main.scss        ← Theme bundle (components, includes, layouts, demo styles)
```

→ **Full SCSS architecture**: `_sass/README.md`  
→ **Path-specific SCSS instructions**: `.github/instructions/scss-*.instructions.md`

## JavaScript Architecture (50+ modules)

### Entry Points

| File | Purpose | Loaded By |
|------|---------|-----------|
| `assets/js/common.js` | Theme shared utilities | `_includes/head.html` |
| `assets/js/genesis-theme.js` | Theme initialization | Layout templates |
| `assets/js/futuristic-effects.js` | Visual effects | Layout templates |
| Subdomain `assets/js/script.js` | Page-specific behavior | After `common.js` |

### Module Categories (`assets/js/common/`)

| Category | Files | Examples |
|----------|-------|---------|
| **Genesis Ontology** | 12 | `genesis-state.js`, `genesis-navbar.js`, `genesis-card.js`, etc. |
| **Motion Library** | 4 | `motion-utils.js`, `motion-presets.js`, `motion-gestures.js` |
| **Navigation** | 3 | `header-scroll.js`, `navbar-keyboard.js`, `skip-link.js` |
| **SEO/Metadata** | 4 | `structured-data.js`, `opengraph.js`, `seo-meta.js`, `twitter-card.js` |
| **Animations** | 2 | `animations.js`, `ontology-animations.js` |
| **Utilities** | 6+ | `analytics.js`, `fontawesome.js`, `ui-components.js`, etc. |

→ **JavaScript specification**: `docs/specifications/javascript.md`  
→ **Interaction patterns**: `docs/specifications/javascript-interaction-patterns.md`  
→ **Motion integration**: `docs/systems/motion/`

## Sample Content (16 pages across 5 categories)

| Category | Samples | Layout Used |
|----------|---------|-------------|
| **Content-Driven** | post, article, archive, profile | `post`, `article`, `archive`, `profile` |
| **Marketing** | landing, gallery, form | `landing`, `gallery`, `form` |
| **Knowledge** | docs, faq | `docs`, `faq` |
| **Application** | dashboard, chatroom, search, settings | `dashboard`, `chatroom`, `search`, `settings` |
| **Utility** | 404, splash | `default`, `splash` |

→ **Sample documentation**: `_samples/README.md`

## Key Design Principles

### For This Repository

1. **Semantic Purity** — Name by WHAT, not HOW
2. **Accessibility First** — WCAG 2.1 AA compliance, semantic HTML
3. **Progressive Enhancement** — Content-first, JS enhances
4. **Context Efficiency** — Reference specs/docs, don't duplicate

### For Agent Intelligence

1. **Tool Leverage** — Use existing linters/tests, don't duplicate
2. **Path Specificity** — Instructions match exact file patterns
3. **Template-Based** — Bootstrap from proven patterns
4. **Spec-Driven** — Details in specs, summaries in instructions

## Testing & Validation

### Test Organization

Test pages are organized in `/tests/` with categorized subdirectories:

| Category | Tests | Focus |
|----------|-------|-------|
| `e2e/` | 3 specs | Playwright structural regression, navbar dimensions |
| `responsive/` | 3 pages | Grid centering, width collapse, responsive UI |
| `mobile/` | 7 pages | Touch targets (WCAG 2.5.5), portrait, gutters, nav drawer |
| `motion/` | 4 pages | Motion library, presets, gestures |
| `navigation/` | 5 pages | Header scroll, visibility, background |
| `overflow/` | 3 pages | Overflow containment strategies |
| `components/` | 3 pages | Web component template demos |
| `layouts/` | 3 pages | Layout migration, Jekyll integration |
| `ontology/` | 1 page | Ontology animation demos |

→ **Test catalog**: `tests/README.md`  
→ **E2E testing guide**: `docs/PLAYWRIGHT-TESTING.md`

### Validation Workflow

```bash
npm test              # Run all linters and SCSS compilation
npm run test:scss     # Sass compilation check
npm run lint:scss     # Stylelint for code quality
npm run validate:scss:units  # Unit compatibility validation
npm run test:e2e      # Playwright E2E tests
```

### Agent Validation

```bash
npm run dogfood                     # Complete agent quality audit
npm run validate:agents             # Agent file quality
npm run validate:agents:duplicates  # Duplication detection
npm run validate:agents:sync        # Spec synchronization
```

→ **Tool reference**: `.github/docs/conventional-tools.md`

### CI/CD Workflows (`.github/workflows/`)

| Workflow | Purpose | Trigger |
|----------|---------|---------|
| `scss-validation.yml` | SCSS compilation + linting | Push/PR |
| `agent-quality.yml` | Agent quality audit (dogfooding) | Push/PR |
| `playwright.yml` | E2E regression testing | Push/PR |

→ **Workflow specification**: `.github/specs/workflows.md`

## Documentation Resources

### Technical Specifications (`docs/specifications/`)

22 comprehensive specification files covering:
- **Design System**: ontology-html-mapping, scss-ontology-system, color-system, typography
- **Components**: component-library, futuristic-effects
- **Layout**: layout-system, responsive-design, fluid-design-unit-compatibility
- **Interaction**: javascript, javascript-interaction-patterns, animation-system
- **Quality**: accessibility, performance, build-deployment
- **Architecture**: architecture, html-semantic-patterns, html-liquid, scss-styling
- **Agent System**: agent-self-learning-system, github-copilot-agent-guidelines

### Implementation Guides (`docs/guides/`)

12 practical guides covering Stylelint, SCSS testing, color schemes, GPU acceleration, agent skills usage.

### System Documentation (`docs/systems/`)

31 files across 4 subsystems: components (7), layout (5), motion (7), ontology (10).

→ **Documentation index**: `docs/README.md`  
→ **Specifications README**: `docs/specifications/README.md`

## Subdomain Template System

The theme provides a complete reference system in `.github/subdomain/` for bootstrapping subdomain repositories:

```
.github/subdomain/
├── agents/             # Custom agents (3 .agent.md files)
├── skills/             # Skills (3 SKILL.md directories)
├── instructions/       # Path-specific (content, scss, js)
├── prompts/            # Agent prompts
├── copilot-instructions.md
└── README.md           # Complete setup guide
```

→ **Setup guide**: `.github/subdomain/README.md`  
→ **Architecture**: `.github/docs/agent-philosophy.md` (Subdomain Intelligence System section)

## Bootstrapping New Repositories

To set up agent intelligence in a new repository:

1. **Use onboarding agent**: Invoke `repository-onboarding` agent
2. **Or manual setup**: Follow `.github/prompts/repository-onboarding.prompt.md`
3. **Or copy templates**: Extract from `.github/specs/agent-intelligence-framework.md`

The system will create:
- `.github/copilot-instructions.md` (adapted to your repo)
- Path-specific instruction files based on tech stack
- Initial agents, prompts, skills
- Specs and docs directories
- Validation and testing setup

## Quick Links

- **Specifications**: `.github/specs/` - Detailed systems and frameworks
- **Documentation**: `.github/docs/` - Implementation guides
- **Subdomain Template**: `.github/subdomain/` - Copy to content repos
- **Full Documentation**: `/docs/` - Complete reference materials
- **Genome History**: `GENOME.md` - Ontology evolutionary record
- **Changelog**: `CHANGELOG.md` - Release history

---

**Repository**: `theme.asisaga.com`  
**License**: MIT
