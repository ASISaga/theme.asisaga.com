---
applyTo: "docs/**/*.md,*.md"
description: "Documentation best practices for the Genesis Design System. Progressive updates, consolidation, and proper archival."
---

# Documentation Guidelines - Genesis Design System

This file contains mandatory guidelines for creating and maintaining documentation in the Genesis Design System repository.

## 🎯 Core Principles

### 1. **Update, Don't Replace**
**NEVER create new summary/completion docs for every change.** Instead:
- Update existing documentation with new sections
- Add version headers for significant changes
- Use "Last Updated" dates to track currency
- Append to existing guides rather than creating new ones

### 2. **Consolidate Similar Content**
When documentation overlaps:
- Merge scattered guides into comprehensive ones
- Cross-reference related documentation
- Eliminate redundant files
- Maintain single source of truth

### 3. **Progressive Enhancement**
Documentation should evolve progressively:
- Add new sections to existing guides
- Update code examples inline
- Expand existing sections rather than duplicate
- Keep historical context when relevant

### 4. **Proper Archival**
Completed implementation work should be archived:
- Move to `/docs/archive/implementations/`
- Don't delete - preserve for historical reference
- Link from main docs if still relevant
- Keep active docs current and actionable

---

## 📁 Documentation Structure

### Active Documentation (`/docs/`)

**Root Level** - Essential, living documentation:
- `README.md` - Documentation index and navigation
- Domain-specific guides (ontology, layout, semantic, etc.)
- Quick starts and references
- Current implementation guides

**`/docs/guides/`** - User-facing tutorials:
- Quick start guides
- Technical how-tos
- Best practices
- Tool documentation

**`/docs/specifications/`** - Technical specifications:
- System architecture
- Component specifications
- Design tokens
- API references

### Historical Documentation (`/docs/archive/`)

**`/docs/archive/implementations/`** - Completed work:
- Implementation summaries
- Version-specific enhancements
- Feature completion records
- Migration guides (completed)

**`/docs/archive/audits/`** - Code audits:
- Quality assessments
- Fix summaries
- Before/after comparisons
- Performance reports

**`/docs/archive/refactorings/`** - Major refactors:
- Refactoring summaries
- Breaking changes
- Migration paths (historical)

---

## ✅ When to Create New Documentation

### Create New When:
1. **New Feature/System** - Documenting something that doesn't exist yet
2. **New User Guide** - Tutorial for a distinct use case
3. **New Specification** - Formal spec for a new subsystem
4. **Major Version** - Breaking changes require new migration guide

### Update Existing When:
1. **Enhancing Existing Feature** - Add section to existing doc
2. **Bug Fixes/Improvements** - Update relevant sections
3. **Code Examples** - Replace outdated examples inline
4. **Clarifications** - Improve existing content
5. **New Patterns** - Add to existing pattern catalog
6. **Incremental Changes** - Add version section to existing guide

---

## 📝 Documentation Templates

### Progressive Update Pattern

```markdown
# Feature Guide

*Last Updated: 2026-01-29 | Version 2.1.0*

## Overview
[Original content...]

## Version History

### v2.1.0 (2026-01-29)
- Added responsive layout patterns
- Enhanced touch target compliance
- Updated code examples

### v2.0.0 (2026-01-15)
- Initial ontological implementation
- SCSS refactoring complete

## [Rest of original content, updated inline]
```

### Version Section Template

```markdown
## What's New in v2.1.0

**Responsive Enhancements** (2026-01-29):
- Mobile-first layouts for all components
- Touch targets ≥44px (WCAG 2.5.5)
- Keyboard navigation support

**Migration Notes**:
- No breaking changes
- Legacy classes still supported
- See upgrade guide below
```

### Consolidation Pattern

When merging multiple docs:

```markdown
# Comprehensive Guide
*Consolidated from: GUIDE-A.md, GUIDE-B.md, GUIDE-C.md*
*Last Updated: 2026-01-29*

## Table of Contents
- [Section A](#section-a) *(formerly GUIDE-A.md)*
- [Section B](#section-b) *(formerly GUIDE-B.md)*
- [Section C](#section-c) *(formerly GUIDE-C.md)*

## Section A
[Content from GUIDE-A.md...]

## Section B
[Content from GUIDE-B.md...]
```

---

## 🔗 Cross-Referencing

### Internal Links
Always use relative paths and descriptive text:

```markdown
See [Layout System](layout-implementation-guide.md) for details.
→ GOOD

See [here](layout-implementation-guide.md).
→ BAD (not descriptive)
```

### External References
Link to primary sources:

```markdown
Based on [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/)
```

### Version References
Link to specific versions when relevant:

```markdown
For v1.x migration, see [Archive](archive/implementations/v1-migration.md)
```

---

## 📊 Documentation Lifecycle

### 1. Planning Phase
- Check if existing doc can be updated
- Identify documentation to consolidate
- Plan structure for new content

### 2. Creation/Update Phase
- Update existing docs first
- Create new only if necessary
- Follow templates above
- Add version information

### 3. Review Phase
- Verify all links work
- Check for redundancy
- Ensure proper archival
- Update navigation/index

### 4. Maintenance Phase
- Regular updates to active docs
- Archive completed implementations
- Consolidate when appropriate
- Keep version history

---

## 🚫 Anti-Patterns to Avoid

### ❌ DON'T:
1. Create `IMPLEMENTATION-SUMMARY-FEATURE-v2.3.0.md` for every change
2. Create `VISUAL-SUMMARY-PART-2.md` instead of updating Part 1
3. Leave completed implementation docs in root
4. Create redundant "COMPLETE" or "FINAL" documents
5. Duplicate content across multiple files
6. Create one-off summaries that should be in main docs

### ✅ DO:
1. Update `docs/specifications/feature.md` with new version section
2. Expand existing visual guides with new examples
3. Move completed work to `archive/implementations/`
4. Update main documentation progressively
5. Consolidate related content
6. Integrate changes into canonical docs

---

## 📋 Pre-Commit Checklist

Before committing documentation changes:

- [ ] Checked if existing doc can be updated instead
- [ ] Added version/date information
- [ ] Updated table of contents if needed
- [ ] Verified all internal links work
- [ ] Cross-referenced related documentation
- [ ] Moved completed work to archive if applicable
- [ ] Updated `docs/README.md` navigation if needed
- [ ] Followed naming conventions
- [ ] No redundant content created

---

## 📂 File Naming Conventions

### Active Documentation
- **Guides**: `FEATURE-GUIDE.md` or `feature-guide.md`
- **References**: `FEATURE-REFERENCE.md`
- **Quick Starts**: `QUICK-START-FEATURE.md`
- **Specifications**: `feature.md` (lowercase in `/specifications/`)

### Archived Documentation
- **Implementations**: `FEATURE-IMPLEMENTATION.md` or `FEATURE-v2.3.0.md`
- **Audits**: `FEATURE-AUDIT-REPORT.md`
- **Refactorings**: `FEATURE-REFACTORING-COMPLETE.md`

### Avoid
- `FINAL-`, `COMPLETE-`, `SUMMARY-` prefixes on active docs
- Version numbers in active doc names (use inside doc)
- Redundant summaries

---

## 🎯 Quality Standards

### Every Documentation File Should:
1. **Have a clear purpose** - Single responsibility
2. **Be discoverable** - Linked from README or relevant guide
3. **Be maintainable** - Updated, not replaced
4. **Be accurate** - Reflect current codebase
5. **Be complete** - Cover topic comprehensively

### Documentation Reviews Should Check:
1. **Redundancy** - Could this be merged elsewhere?
2. **Currency** - Is this still relevant?
3. **Accuracy** - Does code match examples?
4. **Completeness** - Are all aspects covered?
5. **Navigation** - Is it easy to find?

---

## 🔄 Migration from Old Pattern

### Old Pattern (❌ Avoid)
```
docs/
  IMPLEMENTATION-SUMMARY.md
  IMPLEMENTATION-SUMMARY-v2.0.md
  IMPLEMENTATION-SUMMARY-v2.1.md
  IMPLEMENTATION-SUMMARY-v2.2.md
  VISUAL-SUMMARY.md
  VISUAL-SUMMARY-PART-2.md
  COMPLETE-SUMMARY.md
  FINAL-SUMMARY.md
```

### New Pattern (✅ Use)
```
docs/
  IMPLEMENTATION-GUIDE.md          # Living doc with version sections
  guides/
    VISUAL-REFERENCE.md            # Consolidated visual guide
  archive/implementations/
    IMPLEMENTATION-v2.0-COMPLETE.md  # Historical record
    IMPLEMENTATION-v2.1-COMPLETE.md
```

---

## 📖 Examples

### Example 1: Updating Existing Guide

**Scenario**: Adding responsive patterns to layout guide

**DON'T CREATE**:
- `RESPONSIVE-LAYOUT-GUIDE.md`
- `LAYOUT-GUIDE-RESPONSIVE.md`
- `LAYOUT-RESPONSIVE-ENHANCEMENT.md`

**DO UPDATE**:
- `layout-implementation-guide.md` (add "Responsive Patterns" section)
- Add version note: `### v2.1.0 - Responsive Enhancements`

### Example 2: Completing Implementation

**Scenario**: Finished navigation enhancement v2.3.0

**DON'T CREATE**:
- `NAVIGATION-IMPLEMENTATION-COMPLETE.md` in root

**DO ARCHIVE**:
- Move to: `archive/implementations/NAVIGATION-v2.3.0.md`
- Update: `specifications/navigation.md` with v2.3.0 features
- Link from archive in main doc if relevant

### Example 3: Multiple Visual Summaries

**Scenario**: Have VISUAL-SUMMARY.md, want to add more visuals

**DON'T CREATE**:
- `VISUAL-SUMMARY-PART-2.md`
- `VISUAL-SUMMARY-ADDITIONAL.md`

**DO UPDATE**:
- Add new section to `VISUAL-SUMMARY.md`
- Or consolidate into `guides/VISUAL-REFERENCE.md`

---

## 🎓 Best Practices

### Writing Style
- **Clear and concise** - Respect reader's time
- **Active voice** - "Use X" not "X should be used"
- **Code examples** - Show, don't just tell
- **Progressive disclosure** - Simple first, advanced later

### Organization
- **Logical structure** - Related content together
- **Scannable** - Use headings, lists, tables
- **Searchable** - Use clear terminology
- **Navigable** - Clear TOC and links

### Maintenance
- **Regular review** - Quarterly documentation audits
- **Community feedback** - Accept doc improvement PRs
- **Version alignment** - Keep docs in sync with code
- **Archive old** - Don't delete, archive completed work

---

## ✨ Summary

**Golden Rules**:
1. Update existing docs, don't create new summaries
2. Archive completed implementation work
3. Consolidate related content
4. Use version sections for updates
5. Follow progressive enhancement

**Result**:
- Maintainable documentation
- No redundancy
- Clear information architecture
- Easy to find and update
- Historical records preserved

---

**Version**: 1.0.0  
**Created**: 2026-01-29  
**Authority**: Mandatory for all documentation work
