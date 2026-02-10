---
name: documentation-manager-agent
description: Manage documentation lifecycle, enforce standards, validate structure, detect redundancy, and ensure proper archival. Automate documentation quality checks with validation scripts. Use when creating, updating, or organizing documentation across the repository to maintain single source of truth and prevent documentation drift.
license: MIT
metadata:
  author: ASISaga
  version: "1.0.0"
  category: documentation
  role: documentation-specialist
allowed-tools: Bash Read
---

# Documentation Manager Agent

**Role**: Documentation Quality and Organization Specialist  
**Scope**: All documentation in `/docs`, repository root, and agent documentation  
**Version**: 1.0.0 - Initial Release

## Purpose

The Documentation Manager Agent ensures documentation follows organizational standards, remains maintainable, and avoids redundancy. This agent enforces the principles outlined in `.github/instructions/docs.instructions.md` through automated validation and quality checks.

**Key capabilities:**
- Validate documentation structure and organization
- Detect redundant or outdated documentation
- Verify internal links and cross-references
- Check version metadata and dates
- Enforce archival workflows

## When to Use This Skill

Activate when:
- Creating new documentation files
- Updating existing documentation
- Reorganizing documentation structure
- Moving completed work to archive
- Auditing documentation quality
- Checking for redundant content
- Validating cross-references and links

## Core Principles

### Update, Don't Replace

**NEVER create new summary/completion docs for every change:**
- ✅ Update existing files with new sections
- ✅ Add version headers for significant changes
- ❌ Don't create `FEATURE-SUMMARY-v2.3.0.md` for every change
- ❌ Don't create redundant "COMPLETE" or "FINAL" documents

### Single Source of Truth

**Consolidate similar content:**
- ✅ Merge scattered guides into comprehensive ones
- ✅ Cross-reference related documentation
- ✅ Eliminate duplicate information
- ❌ Don't duplicate content across multiple files

### Proper Archival

**Completed implementation work:**
- ✅ Move to `/docs/archive/implementations/`
- ✅ Preserve for historical reference
- ✅ Link from active docs if still relevant
- ❌ Don't leave completed work in active documentation

## Automation & Validation

### Documentation Structure Validation

Check that documentation follows the organizational hierarchy:

```bash
# Validate overall documentation structure
./.github/skills/documentation-manager-agent/scripts/validate-doc-structure.sh

# Output includes:
# - Active documentation organization check
# - Archive organization check
# - Required files presence (README.md, INDEX.md)
# - Proper categorization of files
```

### Link Validation

Verify that all internal links work correctly:

```bash
# Check all markdown links in docs/
./.github/skills/documentation-manager-agent/scripts/validate-doc-links.sh docs/

# Check specific file
./.github/skills/documentation-manager-agent/scripts/validate-doc-links.sh docs/README.md

# Output includes:
# - Broken internal links
# - Missing referenced files
# - Invalid anchor links
```

### Redundancy Detection

Find duplicate or overlapping content:

```bash
# Detect redundant documentation
./.github/skills/documentation-manager-agent/scripts/detect-doc-redundancy.sh

# Output includes:
# - Similar file names that might be duplicates
# - Files with overlapping content
# - Suggestions for consolidation
```

### Metadata Validation

Check version headers and last updated dates:

```bash
# Validate documentation metadata
./.github/skills/documentation-manager-agent/scripts/check-doc-metadata.sh docs/specifications/

# Output includes:
# - Missing version headers
# - Missing "Last Updated" dates
# - Outdated timestamps (older than 90 days with recent changes)
# - Inconsistent versioning
```

## Pre-Commit Workflow

Before committing documentation changes:

```bash
# 1. Validate structure
./.github/skills/documentation-manager-agent/scripts/validate-doc-structure.sh

# 2. Check your new/updated file
./.github/skills/documentation-manager-agent/scripts/check-doc-metadata.sh docs/path/to/file.md

# 3. Verify internal links
./.github/skills/documentation-manager-agent/scripts/validate-doc-links.sh docs/path/to/file.md

# 4. Check for redundancy
./.github/skills/documentation-manager-agent/scripts/detect-doc-redundancy.sh
```

## Documentation Organization

### Active Documentation (`/docs/`)

**Structure:**
- `/docs/README.md` - Documentation index and navigation
- `/docs/guides/` - User-facing tutorials and how-tos
- `/docs/specifications/` - Technical specs and API references
- `/docs/references/` - Quick references and cheat sheets
- `/docs/systems/` - System documentation organized by domain

### Historical Documentation (`/docs/archive/`)

**Structure:**
- `/docs/archive/implementations/` - Completed feature work
- `/docs/archive/audits/` - Code quality assessments
- `/docs/archive/refactorings/` - Major refactoring records

## Detailed Guides

### [DOCUMENTATION-GUIDE.md](references/DOCUMENTATION-GUIDE.md)
Comprehensive documentation standards:
- File naming conventions
- Version update patterns
- Quality standards checklist
- Anti-patterns to avoid
- Progressive enhancement approach

### [ARCHIVAL-WORKFLOW.md](references/ARCHIVAL-WORKFLOW.md)
Archival process details:
- When to archive documentation
- How to move files to archive
- Linking from active documentation
- Preserving historical context

## Resources

### In This Skill
- `scripts/validate-doc-structure.sh` - Structure validation
- `scripts/validate-doc-links.sh` - Link checking
- `scripts/detect-doc-redundancy.sh` - Redundancy detection
- `scripts/check-doc-metadata.sh` - Metadata validation
- `references/DOCUMENTATION-GUIDE.md` - Comprehensive standards
- `references/ARCHIVAL-WORKFLOW.md` - Archival process

### In Repository
- `/docs/specifications/architecture.md` - System architecture
- `/docs/specifications/build-deployment.md` - Build processes
- `.github/instructions/docs.instructions.md` - Core documentation standards
- `.github/AGENT-INDEX.md` - Quick navigation guide

### Related Agents
- `agent-evolution-agent` - Meta-agent for continuous learning
- `html-template-agent` - HTML documentation structure
- `theme-genome-agent` - Design system documentation

**Version**: 1.0.0 - Initial Release  
**Last Updated**: 2026-02-10
