# ASI Saga Theme Documentation Index

**Complete guide to the Genesis Semantic Design System**

---

## 🌟 Start Here (New Users)

### Quick Start (5 minutes)
- **[Ontology Quick Start Guide](ONTOLOGY-QUICK-START.md)** - Get started with semantic SCSS in 5 minutes
- **[Visual Demo](ontology-demo.html)** - See the ontology system in action

### Core Concepts (15 minutes)
- **[Ontology Architecture Overview](../_sass/ontology/Readme.md)** - Three-tier system explained
- **[Complete API Reference](../_sass/ontology/INTEGRATION-GUIDE.md)** - All 6 categories and 31 variants

---

## 📚 Primary Documentation (Ontology System)

### Getting Started

| Document | Purpose | Audience |
|----------|---------|----------|
| [Quick Start Guide](ONTOLOGY-QUICK-START.md) | 5-minute introduction | Everyone |
| [Integration Guide](../_sass/ontology/INTEGRATION-GUIDE.md) | Complete API reference | Developers |
| [Architecture Overview](../_sass/ontology/Readme.md) | Three-tier system SOP | Architects & AI agents |
| [Implementation Summary](../_sass/ontology/IMPLEMENTATION-SUMMARY.md) | System status & features | Technical leads |

### Migration & Examples

| Document | Purpose | Audience |
|----------|---------|----------|
| [Migration Guide](ONTOLOGY-MIGRATION-GUIDE.md) | Convert existing components | Developers migrating code |
| [Sample Patterns](../_sass/ontology/_sample.scss) | 6+ proven patterns | Developers learning system |
| [Visual Demo](ontology-demo.html) | HTML structure demo | Visual learners |
| [AI Agent Directive](../_sass/ontology/refactor-agent.md) | Automated migration | AI coding agents |

---

## 🔧 Reference Documentation

### Quick References

| Document | Purpose |
|----------|---------|
| [Semantic Quick Reference](SEMANTIC-QUICK-REFERENCE.md) | Token and class reference |
| [SCSS Instructions](../.github/instructions/scss.instructions.md) | AI agent SCSS guidance |
| [HTML Instructions](../.github/instructions/html.instructions.md) | AI agent HTML guidance |

### Advanced Topics

| Document | Purpose |
|----------|---------|
| [Semantic Refactor Guide](SEMANTIC-REFACTOR.md) | Deep refactoring patterns |
| [Single Class Implementation](SINGLE-CLASS-IMPLEMENTATION.md) | Single-class methodology |
| [Code Audit Findings](CODE_AUDIT_FINDINGS.md) | System audit results |

---

## 🎨 Legacy Systems (Backward Compatibility)

**Note:** These are maintained for backward compatibility but NOT recommended for new development.

### Layout System (Bento Engine)

| Document | Purpose |
|----------|---------|
| [Layout Implementation Guide](layout-implementation-guide.md) | Bento Engine CSS Grid system |
| [Layout Quick Reference](layout-quick-reference.md) | Bento class reference |
| [Layout Taxonomy](layout-taxonomy.md) | Layout pattern catalog |
| [Layout Grid Governance](layout-grid-governance.md) | Grid system rules |

### Design System

| Document | Purpose |
|----------|---------|
| [Specifications](specifications.md) | Material primitives & glassmorphism |
| [Visual Summary](VISUAL-SUMMARY.md) | Design system overview |
| [Refactoring Impact](REFACTORING-IMPACT-SUMMARY.md) | Migration impact analysis |

---

## 📖 Documentation by Use Case

### I want to...

**Build a new component**
1. Start: [Quick Start Guide](ONTOLOGY-QUICK-START.md)
2. Reference: [Complete API](../_sass/ontology/INTEGRATION-GUIDE.md)
3. Examples: [Sample Patterns](../_sass/ontology/_sample.scss)

**Migrate existing component**
1. Start: [Migration Guide](ONTOLOGY-MIGRATION-GUIDE.md)
2. Reference: [Integration Guide](../_sass/ontology/INTEGRATION-GUIDE.md)
3. Help: [AI Agent Directive](../_sass/ontology/refactor-agent.md)

**Understand the architecture**
1. Start: [Architecture Overview](../_sass/ontology/Readme.md)
2. Details: [Implementation Summary](../_sass/ontology/IMPLEMENTATION-SUMMARY.md)
3. Theory: [Three-tier separation explained](../_sass/ontology/Readme.md#the-three-tier-architecture)

**Learn by example**
1. Visual: [Demo Page](ontology-demo.html)
2. Code: [Sample SCSS](../_sass/ontology/_sample.scss)
3. Patterns: [Migration Examples](ONTOLOGY-MIGRATION-GUIDE.md#migration-examples)

**Get quick reference**
1. Tokens: [Semantic Quick Reference](SEMANTIC-QUICK-REFERENCE.md)
2. Classes: [Layout Quick Reference](layout-quick-reference.md)
3. API: [Integration Guide](../_sass/ontology/INTEGRATION-GUIDE.md)

---

## 🎯 Documentation by Role

### Frontend Developer

**Essential:**
- [Quick Start Guide](ONTOLOGY-QUICK-START.md)
- [Complete API Reference](../_sass/ontology/INTEGRATION-GUIDE.md)
- [Sample Patterns](../_sass/ontology/_sample.scss)

**Helpful:**
- [Migration Guide](ONTOLOGY-MIGRATION-GUIDE.md)
- [SCSS Instructions](../.github/instructions/scss.instructions.md)
- [HTML Instructions](../.github/instructions/html.instructions.md)

### Technical Architect

**Essential:**
- [Architecture Overview](../_sass/ontology/Readme.md)
- [Implementation Summary](../_sass/ontology/IMPLEMENTATION-SUMMARY.md)
- [Integration Guide](../_sass/ontology/INTEGRATION-GUIDE.md)

**Helpful:**
- [Code Audit Findings](CODE_AUDIT_FINDINGS.md)
- [Refactoring Impact](REFACTORING-IMPACT-SUMMARY.md)
- [Layout Grid Governance](layout-grid-governance.md)

### AI Coding Agent

**Essential:**
- [SCSS Instructions](../.github/instructions/scss.instructions.md)
- [HTML Instructions](../.github/instructions/html.instructions.md)
- [AI Agent Directive](../_sass/ontology/refactor-agent.md)

**Helpful:**
- [Integration Guide](../_sass/ontology/INTEGRATION-GUIDE.md)
- [Architecture Overview](../_sass/ontology/Readme.md)
- [Migration Guide](ONTOLOGY-MIGRATION-GUIDE.md)

### Content Creator / Designer

**Essential:**
- [Visual Demo](ontology-demo.html)
- [Quick Start Guide](ONTOLOGY-QUICK-START.md)
- [Semantic Quick Reference](SEMANTIC-QUICK-REFERENCE.md)

**Helpful:**
- [Visual Summary](VISUAL-SUMMARY.md)
- [Specifications](specifications.md)
- [Sample Patterns](../_sass/ontology/_sample.scss)

---

## 🔄 System Architecture

### Three-Tier Ontology System (Primary)

```
┌─────────────────────────────────────────────┐
│  Tier 1: Content (HTML in Subdomains)      │
│  - Semantic class names                     │
│  - Meaningful HTML5 elements                │
│  - Zero inline styles                       │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│  Tier 2: Interface (Ontology API)          │
│  - Six semantic categories                  │
│  - 31 total mixins                          │
│  - Zero CSS properties                      │
│  - Import: @import "ontology/index";        │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│  Tier 3: Engine (Theme Implementation)     │
│  - OKLCH color space                        │
│  - Glassmorphism effects                    │
│  - Bento CSS Grid layouts                   │
│  - 150+ CSS custom properties               │
└─────────────────────────────────────────────┘
```

**Documentation:**
- [Architecture Overview](../_sass/ontology/Readme.md)
- [Implementation Details](../_sass/ontology/IMPLEMENTATION-SUMMARY.md)

### Legacy Systems (Backward Compatible)

- **Bento Engine** - CSS Grid layout system ([docs](layout-implementation-guide.md))
- **Material Primitives** - Glassmorphism components ([docs](specifications.md))
- **Bootstrap Compatibility** - For gradual migration

---

## 📁 File Organization

### Primary System Files

```
_sass/ontology/
├── Readme.md                    # Architecture overview & SOP
├── INTEGRATION-GUIDE.md         # Complete API reference
├── IMPLEMENTATION-SUMMARY.md    # System status & features
├── refactor-agent.md            # AI migration directive
├── _index.scss                  # Main entry point
├── _tokens.scss                 # CSS custom properties
├── _engines.scss                # Engine implementations
├── _interface.scss              # Public API (6 mixins)
├── _sample.scss                 # Usage examples
└── _test.scss                   # Compilation test
```

### Documentation Files

```
docs/
├── README.md                    # This index
├── ONTOLOGY-QUICK-START.md      # 5-minute tutorial
├── ONTOLOGY-MIGRATION-GUIDE.md  # Migration how-to
├── ontology-demo.html           # Visual demonstration
├── SEMANTIC-QUICK-REFERENCE.md  # Token reference
├── SEMANTIC-REFACTOR.md         # Refactoring patterns
└── [legacy docs...]             # Bento, Material, etc.
```

### Instruction Files (AI Agents)

```
.github/instructions/
├── scss.instructions.md         # SCSS development guidance
├── html.instructions.md         # HTML templating guidance
└── js.instructions.md           # JavaScript guidance
```

---

## 🎓 Learning Path

### Beginner (New to System)

1. **Read:** [Quick Start Guide](ONTOLOGY-QUICK-START.md)
2. **Watch:** [Visual Demo](ontology-demo.html)
3. **Practice:** Create a simple blog post component
4. **Reference:** [Complete API](../_sass/ontology/INTEGRATION-GUIDE.md)

### Intermediate (Migrating Code)

1. **Read:** [Migration Guide](ONTOLOGY-MIGRATION-GUIDE.md)
2. **Study:** [Sample Patterns](../_sass/ontology/_sample.scss)
3. **Practice:** Migrate one component
4. **Review:** [Architecture Overview](../_sass/ontology/Readme.md)

### Advanced (System Development)

1. **Read:** [Implementation Summary](../_sass/ontology/IMPLEMENTATION-SUMMARY.md)
2. **Study:** [Engine Layer](../_sass/ontology/_engines.scss)
3. **Review:** [Code Audit](CODE_AUDIT_FINDINGS.md)
4. **Understand:** [Three-tier architecture](../_sass/ontology/Readme.md)

---

## 🆘 Getting Help

### Self-Service

1. **Check Quick Start** - [ONTOLOGY-QUICK-START.md](ONTOLOGY-QUICK-START.md)
2. **Search API Reference** - [INTEGRATION-GUIDE.md](../_sass/ontology/INTEGRATION-GUIDE.md)
3. **Review Examples** - [_sample.scss](../_sass/ontology/_sample.scss)
4. **Study Migration Guide** - [ONTOLOGY-MIGRATION-GUIDE.md](ONTOLOGY-MIGRATION-GUIDE.md)

### Common Questions

**Q: How do I get started?**  
A: Start with [Quick Start Guide](ONTOLOGY-QUICK-START.md)

**Q: How do I migrate existing code?**  
A: Follow [Migration Guide](ONTOLOGY-MIGRATION-GUIDE.md)

**Q: What's the difference between ontology and Bento?**  
A: Ontology is semantic SCSS (recommended), Bento is CSS classes (legacy)

**Q: Can I use both systems?**  
A: Yes, they coexist, but choose one per component

**Q: Where's the complete API?**  
A: [Integration Guide](../_sass/ontology/INTEGRATION-GUIDE.md)

---

## 📊 System Status

✅ **Ontology System**: Production Ready  
✅ **Documentation**: Comprehensive (10+ guides)  
✅ **Backward Compatibility**: Full support  
✅ **Migration Tools**: Available (AI agent directive)  
✅ **Examples**: 6+ proven patterns  

**Recommended Approach**: Ontology system for all new development  
**Legacy Support**: Maintained indefinitely for existing code  
**Migration Timeline**: Gradual, at your own pace

---

**Last Updated**: 2026-01-15  
**System Version**: Genesis Semantic Engine 2.0  
**Status**: ✅ Complete & Production Ready
