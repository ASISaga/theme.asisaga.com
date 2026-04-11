# TODO — Genesis Theme Repository

**Generated**: 2026-03-26  
**Source**: Gap analysis between `.github/specs/` and codebase  
**Purpose**: Track actionable work items derived from specification-to-code gaps

---

## 1. Design Token Pipeline

The repository specification (`.github/specs/repository.md`) describes a W3C DTCG token pipeline that is not yet implemented. The current system uses CSS custom properties defined directly in SCSS files.

- [ ] Create `tokens.json` in W3C DTCG format as the single source of truth for design tokens
- [ ] Create `_data/tokens.yml` for Jekyll template access to token values
- [ ] Integrate Style Dictionary v4 for automated token transformation (`tokens.json` → `_sass/_tokens.scss` + `_data/tokens.yml`)
- [ ] Consolidate color tokens (currently split between `_sass/ontology/_tokens.scss` and `_sass/ontology/foundation/` files) into the DTCG source
- [ ] Create `Token_DNA_Validator` agent skill to enforce zero hard-coded hex/pixel values
- [ ] Create `Layout_Ontologist` agent skill for Figma JSON → semantic HTML mapping
- [ ] Create `Jekyll_Architect` agent skill for recursive Liquid template assembly
- [ ] Create `SCSS_Synthesizer` agent skill for Figma layout key → CSS translation
- [ ] Create `Physics_Orchestrator` agent skill for Motion library data-attribute binding

→ **Specification**: `.github/specs/repository.md`

---

## 2. Ontology Variant Documentation

The ontology has grown from 33 foundational variants to 89 total variants through subdomain evolution. Documentation needs to reflect this growth.

- [ ] Update `docs/specifications/scss-ontology-system.md` to document all 89 variants (currently may only cover foundational set)
- [ ] Update `_sass/ontology/INTEGRATION-GUIDE.md` with examples for evolved variants
- [ ] Update `GENOME.md` with evolution records for all 56 evolved variants
- [ ] Ensure all 14 evolved environment variants have usage examples in `_sass/ontology/_sample.scss`
- [ ] Ensure all 14 evolved synapse variants have usage examples
- [ ] Document responsive atmosphere variants (`dense-desktop`, `spacious-mobile`, `viewport-aware`) usage patterns

→ **Specification**: `.github/specs/ontological-design-system.md`

---

## 3. Component Library Specification

62+ SCSS component files and 3 web components exist in code but lack formal specification linkage in `.github/specs/`.

- [ ] Cross-reference `docs/specifications/component-library.md` from `.github/specs/genesis-theme-repository.md` (done)
- [ ] Audit `docs/specifications/component-library.md` to ensure all 62+ SCSS component files are cataloged
- [ ] Document the 12 sacred components (`_sass/includes/sacred/`) — purpose, usage patterns, relationship to atmosphere
- [ ] Document web component trinity pattern (HTML template + SCSS + JS) in a formal spec
- [ ] Add architectural justification for web components vs. Liquid includes
- [ ] Document component mixin patterns (`_sass/ontology/mixins/`) — when to use mixins vs. direct component files
- [ ] Ensure `docs/systems/components/` guides are up to date with current component inventory

→ **Specification**: `.github/specs/genesis-theme-repository.md`, `docs/specifications/component-library.md`

---

## 4. JavaScript Architecture

50+ JavaScript modules exist across `assets/js/` but have no formal `.github/specs/` entry.

- [ ] Ensure `docs/specifications/javascript.md` covers all 50+ modules and their relationships
- [ ] Document the `genesis-*.js` module pattern — how 12 genesis modules bind to ontological categories
- [ ] Document Motion library integration architecture (`motion-utils.js`, `motion-presets.js`, `motion-gestures.js`, `motion-migration.js`)
- [ ] Document web component JavaScript lifecycle (`assets/js/components/`)
- [ ] Document the `common.js` → `script.js` loading chain and utility availability
- [ ] Document SEO/metadata modules (`structured-data.js`, `opengraph.js`, `seo-meta.js`, `twitter-card.js`)

→ **Specification**: `docs/specifications/javascript.md`, `docs/specifications/javascript-interaction-patterns.md`

---

## 5. Testing & Quality

30+ test pages and 3 Playwright E2E specs exist, but testing expectations are not formally specified.

- [ ] Define minimum test coverage requirements for new layouts (which test categories must be covered)
- [ ] Define minimum test coverage for new components (responsive, mobile, accessibility)
- [ ] Add Playwright E2E tests for web component instantiation and lifecycle
- [ ] Add Playwright E2E tests for Motion library animation behavior
- [ ] Add SCSS compilation regression tests for all 89 ontology variants
- [ ] Add visual regression testing for sacred component styles
- [ ] Document the relationship between test categories and CI/CD workflow triggers

→ **Specification**: `.github/specs/genesis-theme-repository.md`

---

## 6. Accessibility Compliance

Accessibility standards exist in `docs/specifications/accessibility.md` but lack enforcement automation.

- [ ] Add automated WCAG 2.1 AA validation to CI/CD pipeline (e.g., axe-core or pa11y)
- [ ] Audit all 20 layouts for WCAG landmark compliance
- [ ] Audit all web components for ARIA attribute correctness
- [ ] Add touch target size validation (WCAG 2.5.5 ≥ 44px) to automated tests
- [ ] Validate color contrast ratios for all atmosphere variants against WCAG thresholds
- [ ] Add keyboard navigation E2E tests for all synapse interaction variants

→ **Specification**: `docs/specifications/accessibility.md`

---

## 7. Documentation Consolidation

31 system documentation files across `docs/systems/` may have overlap or staleness compared to the 22 specification files in `docs/specifications/`.

- [ ] Audit `docs/systems/motion/` (7 files) for redundancy — consolidate overlapping Motion guides
- [ ] Audit `docs/systems/ontology/` (10 files) for staleness — ensure migration guides reflect current 89-variant system
- [ ] Audit `docs/systems/components/` (7 files) for accuracy — ensure web component guides match current implementation
- [ ] Audit `docs/systems/layout/` (5 files) for completeness — ensure all 20 layouts are covered
- [ ] Update `docs/README.md` index to reflect current file inventory
- [ ] Archive completed implementation docs to `docs/archive/` per documentation standards

→ **Specification**: `.github/instructions/docs.instructions.md`

---

## 8. Sample Content Coverage

16 sample pages exist but some layouts lack sample content.

- [ ] Create sample page for `app.html` layout (currently missing)
- [ ] Create sample page for `scrollable.html` layout (currently missing)
- [ ] Create sample page for `fixed-height.html` layout (currently missing)
- [ ] Create sample page for `minimal.html` layout (currently missing)
- [ ] Create sample page for `minimal-base.html` layout (currently missing)
- [ ] Update `_samples/README.md` with any new sample pages

→ **Reference**: `_samples/README.md`

---

## 9. Agent Intelligence Evolution

The agent system has gaps between specified capabilities and implemented skills.

- [ ] Implement 5 agent skills described in `.github/specs/repository.md` (Token_DNA_Validator, Layout_Ontologist, Jekyll_Architect, SCSS_Synthesizer, Physics_Orchestrator)
- [ ] Add agent quality metrics tracking for evolved ontology variants
- [ ] Add duplication detection for ontology variant overlap (semantic similarity checking)
- [ ] Ensure all 13 spec files pass `npm run dogfood` validation
- [ ] Update agent guidelines in `docs/specifications/github-copilot-agent-guidelines.md` to reference current 89-variant system

→ **Specification**: `.github/specs/agent-intelligence-framework.md`, `.github/specs/repository.md`

---

## 10. Build & Performance

Performance targets exist in `docs/specifications/performance.md` but lack automated enforcement.

- [ ] Add Lighthouse CI to GitHub Actions workflow for Core Web Vitals monitoring
- [ ] Add CSS bundle size monitoring (current ontology produces ~1.1MB compiled; track for regression)
- [ ] Add JavaScript bundle size tracking
- [ ] Implement CSS tree-shaking or purging for production builds
- [ ] Add build time monitoring to CI/CD pipeline
- [ ] Validate that duplicate `@import` of ontology doesn't occur (prevents 22MB bloat)

→ **Specification**: `docs/specifications/performance.md`, `docs/specifications/build-deployment.md`

---

## Priority Matrix

| Priority | Category | Estimated Effort | Impact |
|----------|----------|-----------------|--------|
| 🔴 High | Design Token Pipeline | Large | Foundational infrastructure |
| 🔴 High | Ontology Variant Documentation | Medium | Developer experience |
| 🟡 Medium | Component Library Specification | Medium | Discoverability |
| 🟡 Medium | JavaScript Architecture | Medium | Maintainability |
| 🟡 Medium | Testing & Quality | Medium | Reliability |
| 🟡 Medium | Accessibility Compliance | Medium | Compliance |
| 🟢 Low | Documentation Consolidation | Small | Clarity |
| 🟢 Low | Sample Content Coverage | Small | Completeness |
| 🟢 Low | Agent Intelligence Evolution | Large | Automation |
| 🟢 Low | Build & Performance | Medium | Optimization |

---

**Maintaining this document**: Update items as they are completed. Move completed sections to a `## Completed` section at the bottom with completion dates. Run `npm run dogfood` to validate agent system alignment after changes.
