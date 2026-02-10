# Layout System Documentation

*Last Updated: 2026-02-10*

The Genesis Layout System provides responsive, accessible, and semantically-pure layout patterns.

## Documentation Files

### Implementation & Usage

**[layout-implementation-guide.md](layout-implementation-guide.md)**
- Complete implementation details
- Layout patterns and best practices
- Code examples and usage patterns
- Integration with ontology system

**[layout-quick-reference.md](layout-quick-reference.md)**
- Quick lookup for common patterns
- Code snippets ready to use
- Responsive breakpoint reference

### Architecture & Governance

**[layout-taxonomy.md](layout-taxonomy.md)**
- Classification of layout types
- Semantic naming conventions
- Layout hierarchy and relationships

**[layout-grid-governance.md](layout-grid-governance.md)**
- Grid system rules and conventions
- Spacing and alignment standards
- Container and breakpoint governance

## Key Concepts

The layout system uses ontological mixins for semantic purity:
- `genesis-environment('distributed')` - Grid/flex layouts
- `genesis-environment('focused')` - Reading-width content
- `genesis-environment('chronological')` - Timeline/flow layouts
- `genesis-environment('associative')` - Network layouts
- `genesis-environment('manifest')` - Full-viewport displays

## Related Documentation

- **[Responsive Design Specification](../../specifications/responsive-design.md)** - Complete responsive patterns
- **[Ontology System](../ontology/)** - Core semantic engine
- **[Architecture Specification](../../specifications/architecture.md)** - Overall architecture

---

**Back to**: [Systems Documentation](../README.md) | [Documentation Home](../../README.md)
