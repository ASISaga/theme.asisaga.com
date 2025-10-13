# Specification

This specification defines the structural and governance rules for layouts, grids, and includes in this project.  
It serves as the root reference, linking to the two core documents:

- [Grid Governance](./layout-grid-governance.md)  
- [Layout Taxonomy](./layout-taxonomy.md)  

---

## Purpose
- Ensure consistent use of containers, rows, and columns across all layouts.  
- Provide a clear taxonomy of layouts, organized by base templates and specialized archetypes.  
- Act as a living contract for collaborators, encoding both technical rules and structural patterns.  

---

## Scope
This specification applies to:
1. **Layouts** — including base templates (`default`, `scrollable`, `fixed-height`, `minimal-base`) and all specialized layouts that inherit from them.  
2. **Grid usage** — including placement of containers, rows, and columns in layouts, content, and includes.  
3. **Includes** — simple, fixed, and complex/dynamic, with rules for where grid structures are allowed.  

---

## Structure
- **Grid Governance** defines *how* containers, rows, and columns are used.  
- **Layout Taxonomy** defines *which* layouts exist, how they inherit from base templates, and what structural responsibilities they carry.  

Together, these documents form the complete specification for layout and grid architecture.

---

## Governance
- This specification is a **living document**.  
- Updates to `grid-governance.md` or `layout-taxonomy.md` must be reflected here.  
- All contributors are expected to follow these rules when creating or modifying layouts.  

---