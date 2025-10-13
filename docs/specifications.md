# Specification

This specification defines the structural and governance rules for layouts, grids, and includes in this project.  
It serves as the root reference, linking to the core documents and implementation guides.

## Core Documents

- [Grid Governance](./layout-grid-governance.md) - Rules for containers, rows, and columns
- [Layout Taxonomy](./layout-taxonomy.md) - Hierarchical organization of all layouts
- [Layout Implementation Guide](./layout-implementation-guide.md) - Comprehensive usage guide with examples
- [Layout Quick Reference](./layout-quick-reference.md) - Quick reference for developers

---

## Purpose
- Ensure consistent use of bootstrap containers, rows, and columns across all jekyll layouts.  
- Provide a clear taxonomy of layouts, organized by base templates and specialized archetypes.  
- Offer comprehensive implementation guides and quick references for developers.
- Act as a living contract for collaborators, encoding both technical rules and structural patterns.  

---

## Scope
This specification applies to:
1. **Layouts** — including base templates (`default`, `scrollable`, `fixed-height`, `minimal-base`) and all specialized layouts that inherit from them.  
2. **Grid usage** — including placement of containers, rows, and columns in layouts, content, and includes.  
3. **Includes** — simple, fixed, and complex/dynamic, with rules for where grid structures are allowed.
4. **Implementation** — practical examples and usage patterns documented in the implementation guide.
5. **Samples** — working examples in the `_samples/` directory demonstrating each layout.

---

## Structure
- **Grid Governance** defines *how* containers, rows, and columns are used.  
- **Layout Taxonomy** defines *which* layouts exist, how they inherit from base templates, and what structural responsibilities they carry.
- **Layout Implementation Guide** provides comprehensive documentation on using each layout with examples.
- **Layout Quick Reference** offers quick lookup for common patterns and configurations.

Together, these documents form the complete specification for layout and grid architecture.

---

## Implementation Status

### Completed
✓ All specialized layouts created and documented (15 specialized + 3 base templates)
✓ Base templates (scrollable, fixed-height, minimal-base)
✓ Specialized layouts across all categories
✓ Sample includes for major layouts
✓ Sample pages in _samples/ directory
✓ Enhanced header with transparency and responsiveness
✓ Futuristic navbar with modern animations
✓ Comprehensive documentation and guides

### File Structure
```
_layouts/
├── default.html (root layout - pre-existing)
├── app.html (application layout - pre-existing)
├── Base Templates
│   ├── scrollable.html
│   ├── fixed-height.html
│   └── minimal-base.html
├── Content-Driven
│   ├── post.html
│   ├── article.html
│   ├── archive.html
│   └── profile.html
├── Marketing
│   ├── landing.html
│   ├── gallery.html
│   └── form.html
├── Knowledge
│   ├── docs.html
│   └── faq.html
├── Application
│   ├── dashboard.html
│   ├── chatroom.html
│   ├── search.html
│   └── settings.html
└── Utility
    ├── minimal.html
    └── splash.html

_includes/layouts/
├── post/
├── article/
├── archive/
├── profile/
├── landing/
├── gallery/
├── form/
├── faq/
├── dashboard/
└── splash/

_samples/
├── content-driven/
├── marketing/
├── knowledge/
├── application/
└── utility/

Note: This implementation adds 18 new layouts (3 base + 15 specialized) 
to the existing default.html and app.html layouts.
```

---

## Governance
- This specification is a **living document**.  
- Updates to `grid-governance.md` or `layout-taxonomy.md` must be reflected here.  
- All contributors are expected to follow these rules when creating or modifying layouts.  

---