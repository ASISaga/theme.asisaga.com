# ASI Saga Theme Documentation

*Last Updated: 2026-01-29 | Version 2.1.0*

Welcome to the comprehensive documentation for the ASI Saga Genesis Semantic Design System.

## 🎉 Latest Updates - v2.1.0

### Complete Responsive Layout System (2026-01-29)
- ✅ **All 21 Jekyll layouts** now fully responsive (375px → 1920px+)
- ✅ **WCAG 2.5.5 compliance** - All touch targets ≥44px across layouts
- ✅ **Documentation guidelines** - New mandatory practices in `.github/instructions/docs.instructions.md`
- ✅ **Consolidated documentation** - Historical work archived properly

See [specifications/responsive-design.md](specifications/responsive-design.md) for complete details.

## 📚 Documentation Structure

**New in v2.1.0**: Documentation now follows progressive enhancement model. See [`.github/instructions/docs.instructions.md`](../.github/instructions/docs.instructions.md) for guidelines.

### Active Documentation

#### [`/guides/`](guides/README.md) - User-Facing Guides
Quick starts, technical guides, and how-to documentation for working with the theme.
- Quick Start Navigation
- Color Scheme Documentation
- GPU Acceleration Guide
- Stylelint Documentation

#### Root Directory
Essential, current documentation:
- [`/README.md`](../README.md) - Primary entry point and architecture overview
- [`/GENOME.md`](../GENOME.md) - Living documentation of ontological evolution
- [`/SASS-REORGANIZATION-GUIDE.md`](../SASS-REORGANIZATION-GUIDE.md) - SCSS structure reference

### Reference Documentation

#### Ontology System
- [`/_sass/ontology/INTEGRATION-GUIDE.md`](../_sass/ontology/INTEGRATION-GUIDE.md) - Complete mixin reference
- [`/_sass/ontology/Readme.md`](../_sass/ontology/Readme.md) - System overview
- [`/_sass/ontology/refactor-agent.md`](../_sass/ontology/refactor-agent.md) - Migration guide

#### Layout System
- [Layout Implementation Guide](layout-implementation-guide.md)
- [Layout Quick Reference](layout-quick-reference.md)
- [Layout Taxonomy](layout-taxonomy.md)
- [Layout Grid Governance](layout-grid-governance.md)

#### Ontology & Semantics
- [Ontology Migration Guide](ONTOLOGY-MIGRATION-GUIDE.md)
- [Ontology Quick Start](ONTOLOGY-QUICK-START.md)
- [Semantic Quick Reference](SEMANTIC-QUICK-REFERENCE.md)
- [Semantic Refactor Guide](SEMANTIC-REFACTOR.md)

#### Component System
- [Single Class Implementation](SINGLE-CLASS-IMPLEMENTATION.md)
- [Visual Summary](VISUAL-SUMMARY.md)

### Historical Documentation

#### [`/archive/`](archive/README.md) - Completed Work
Historical records of implementations, refactorings, and audits:
- **Implementations**: Completed feature implementations and system enhancements
  - Latest: `RESPONSIVE-UX-v2.1.0.md`, `WEB-DESIGN-ENHANCEMENT-v2.0.md`
- **Audits**: Code audits, quality assessments, and fixes
- **Refactorings**: Major refactoring efforts and their outcomes

**Documentation Practice**: Completed implementation docs are archived here, not left in root directory. See [`.github/instructions/docs.instructions.md`](../.github/instructions/docs.instructions.md) for guidelines.

---

## 🎯 Quick Navigation

**I want to...**
- **Get started quickly** → [`/guides/QUICK-START-NAVIGATION.md`](guides/QUICK-START-NAVIGATION.md)
- **Understand the architecture** → [`/README.md`](../README.md)
- **Use ontology mixins** → [`/_sass/ontology/INTEGRATION-GUIDE.md`](../_sass/ontology/INTEGRATION-GUIDE.md)
- **Find SCSS files** → [`/SASS-REORGANIZATION-GUIDE.md`](../SASS-REORGANIZATION-GUIDE.md)
- **Work with colors** → [`/guides/COLOR-SCHEME-DOCUMENTATION.md`](guides/COLOR-SCHEME-DOCUMENTATION.md)
- **Optimize performance** → [`/guides/GPU-ACCELERATION-GUIDE.md`](guides/GPU-ACCELERATION-GUIDE.md)
- **View implementation history** → [`/archive/`](archive/README.md)

---

## 🔧 Developer Resources

### Documentation Guidelines (NEW v2.1.0)
- [`.github/instructions/docs.instructions.md`](../.github/instructions/docs.instructions.md) - **Mandatory** documentation practices
  - Progressive update patterns
  - Consolidation over duplication
  - Proper archival procedures
  - Version section templates

### Agent Ecosystem
- [`.github/AGENTS.MD`](../.github/AGENTS.MD) - Agent ecosystem architecture
- [`.github/skills/`](../.github/skills/) - Agent skill specifications
  - `responsive-design-agent` - Mobile-first responsive patterns (v2.1.0)
  - `scss-refactor-agent` - Ontology migration specialist
  - `html-template-agent` - Semantic HTML & accessibility
  - `futuristic-effects-agent` - Advanced visual effects

### Code Quality
- [`/guides/STYLELINT.md`](guides/STYLELINT.md) - Linting setup and usage
- [`.stylelintrc.yml`](../.stylelintrc.yml) - Stylelint configuration

### Examples & Demos
- [`ontology-demo.html`](ontology-demo.html) - Ontology system demo
- [`full-width-demo.html`](full-width-demo.html) - Layout examples

---

**Organization**: ASI Saga  
**Repository**: theme.asisaga.com  
**Last Updated**: 2026-01-29
