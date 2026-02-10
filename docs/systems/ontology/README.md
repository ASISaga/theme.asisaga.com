# Ontology System Documentation

*Last Updated: 2026-02-10*

The Genesis Ontology System is the semantic SCSS engine at the heart of the theme - a revolutionary approach to styling through meaning rather than presentation.

## Core Documentation

### Getting Started

**[ONTOLOGY-QUICK-START.md](ONTOLOGY-QUICK-START.md)**
- Quick start guide for new developers
- Basic usage patterns
- Common examples

**[INTEGRATION-GUIDE.md](INTEGRATION-GUIDE.md)**
- Complete mixin API reference
- All 41+ ontological variants
- Detailed usage examples
- Best practices and patterns

### System Architecture

**[ONTOLOGY-OVERVIEW.md](ONTOLOGY-OVERVIEW.md)**
- System architecture and philosophy
- Three-tier design pattern
- Engine layer documentation
- Design tokens and color system

### Migration & Refactoring

**[ONTOLOGY-MIGRATION-GUIDE.md](ONTOLOGY-MIGRATION-GUIDE.md)**
- Migration from legacy CSS classes
- Step-by-step refactoring process
- Before/after examples

**[SEMANTIC-REFACTOR.md](SEMANTIC-REFACTOR.md)**
- Semantic refactoring strategies
- Pattern recognition
- Code transformation techniques

**[refactor-agent.md](refactor-agent.md)**
- Automated refactoring guide
- AI agent assistance
- Batch conversion strategies

### Quick References

**[SEMANTIC-QUICK-REFERENCE.md](SEMANTIC-QUICK-REFERENCE.md)**
- Quick semantic pattern lookup
- Common use cases
- Cheat sheet

### Complete Implementation

**[COMPLETE-ONTOLOGY-COMPONENTS.md](COMPLETE-ONTOLOGY-COMPONENTS.md)**
- Complete component patterns
- Real-world examples
- Complex compositions

**[COMPLETE-ONTOLOGY-IMPLEMENTATION.md](COMPLETE-ONTOLOGY-IMPLEMENTATION.md)**
- Full implementation details
- Advanced patterns
- Edge cases and solutions

## Six Ontological Categories

The system provides six semantic categories with 41+ variants:

1. **`genesis-environment($logic)`** - Spatial organization (6 variants)
2. **`genesis-entity($nature)`** - Visual presence (10 variants)
3. **`genesis-cognition($intent)`** - Typography & information (8 variants)
4. **`genesis-synapse($vector)`** - Interaction patterns (21 variants)
5. **`genesis-state($condition)`** - Temporal states (14 variants)
6. **`genesis-atmosphere($vibe)`** - Sensory texture (8 variants)

## Philosophy

**Zero CSS Properties in Subdomain Files**
- HTML uses semantic class names
- SCSS maps classes to ontological roles
- Only mixins at the interface level
- CSS properties only in engine layer

## Related Documentation

- **[SCSS Ontology Specification](../../specifications/scss-ontology-system.md)** - Complete technical specification
- **[GENOME.md](../../../GENOME.md)** - Evolutionary history and variant registry
- **[SCSS Styling Guide](../../specifications/scss-styling.md)** - General SCSS guidelines

## Source Code

The ontology system lives in `_sass/ontology/`:
- `_interface.scss` - Mixin definitions (subdomain interface)
- `engines/*.scss` - CSS property implementations
- `_tokens.scss` - Design tokens and variables

---

**Back to**: [Systems Documentation](../README.md) | [Documentation Home](../../README.md)
