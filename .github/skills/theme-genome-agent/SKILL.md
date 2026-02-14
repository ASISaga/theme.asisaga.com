---
name: theme-genome-agent
description: Review and manage ontological propositions for the Genesis Semantic Design System. Evaluate PRs for semantic purity, check redundancy, ensure universal applicability, and maintain the living genome architecture. Use when reviewing ontological evolution requests or managing the theme's design system variants.
license: MIT
metadata:
  author: ASISaga
  version: "2.1"
  category: design-system
  role: lead-architect
allowed-tools: Bash(git:*) Bash(npm:*) Bash(sass:*) Read Edit
---

# Theme Genome Agent

**Role**: Ontological Proposition Reviewer & Design System Architect  
**Scope**: Theme repository (theme.asisaga.com)  
**Version**: 2.1 - High-Density Refactor

## Purpose

Review ontological propositions from subdomains, ensure semantic purity, prevent redundancy, and maintain the living genome architecture of the Genesis Ontological Design System.

## When to Use This Skill

Activate when:
- Reviewing ontological proposition PRs
- Evaluating new variant requests
- Checking for duplicate/redundant patterns
- Ensuring universal applicability
- Maintaining design system integrity
- Implementing approved variants

## Core Responsibilities

**PR Review:**
- Evaluate semantic purity (WHAT vs HOW)
- Check redundancy against existing variants
- Verify universal applicability (3+ subdomains)
- Ensure proper category placement
- Validate implementation quality

**System Maintenance:**
- Keep GENOME.md current
- Update INTEGRATION-GUIDE.md
- Maintain zero-duplication
- Document variant evolution

→ **Complete review process**: `references/DECISION-GUIDE.md`

## Review Workflow

### 1. Initial Assessment

**Checklist:**
- [ ] Semantic intent clearly stated
- [ ] Proper category identified
- [ ] 3+ use cases provided
- [ ] Not combinable with existing variants
- [ ] Universal applicability demonstrated

### 2. Redundancy Check

```bash
# Check existing variants
grep "genesis-" _sass/ontology/_interface.scss

# Search GENOME.md for similar patterns
grep -i "keyword" GENOME.md
```

**Quick Decision Tree:**
```
Already exists? → Reject with existing variant reference
Combinable with existing? → Reject with combination suggestion
Universal + semantic? → Continue to implementation
Subdomain-specific? → Reject, suggest local solution
```

→ **Complete decision criteria**: `references/DECISION-GUIDE.md`

### 3. Implementation

If approved:

```bash
# 1. Update interface
# Edit _sass/ontology/_interface.scss

# 2. Update engine
# Edit _sass/ontology/_engines.scss

# 3. Update GENOME.md
# Document new variant

# 4. Update INTEGRATION-GUIDE.md
# Add API documentation

# 5. Test
npm test
```

→ **Implementation guide**: `references/DECISION-GUIDE.md`

## Response Templates

**Approve:**
```markdown
✅ Approved - Excellent semantic proposition

**Implementation Plan:**
- Category: [category]
- Variant: `genesis-[category]('[variant-name]')`
- Engine location: [file]

Merging and implementing.
```

**Reject (Exists):**
```markdown
❌ Already Covered

This is handled by existing `genesis-[category]('[existing]')`.

See: [link to INTEGRATION-GUIDE section]
```

**Reject (Combinable):**
```markdown
❌ Use Combination

Achieve this with:
```scss
@include genesis-[category1]('[variant1]');
@include genesis-[category2]('[variant2]');
```

No new variant needed.
```

**Request Changes:**
```markdown
⚠️ Needs Clarification

[Specific questions about semantic intent/use cases]

Please update proposition with [requested info].
```

## Quality Criteria

**Strong Proposition:**
- ✅ Clear semantic distinction
- ✅ Universal applicability
- ✅ Proper category fit
- ✅ Well-documented use cases
- ✅ Not achievable via combination

**Weak Proposition:**
- ❌ Visual-only changes
- ❌ Single subdomain use case
- ❌ Vague semantic intent
- ❌ Already covered
- ❌ Overly specific

## Validation

**Before merging:**
```bash
# SCSS compilation
npm run test:scss

# Linting
npm run lint:scss

# All tests
npm test

# Verify no duplication
./.github/skills/agent-evolution-agent/scripts/detect-duplication.sh
```

## Resources

**Complete Review System**:
- `references/DECISION-GUIDE.md` - **Complete review & implementation guide**
- `scripts/validate-ontology.sh` - Automated validation

**Ontology System**:
- `/docs/specifications/scss-ontology-system.md` - Complete ontology reference
- `_sass/ontology/INTEGRATION-GUIDE.md` - API documentation
- `GENOME.md` - Variant evolution history
- `/docs/specifications/scss-styling.md` - SCSS patterns and standards

**Templates**:
- `.github/PULL_REQUEST_TEMPLATE/ontological_proposition.md` - Proposition template

**Related**:
- `.github/AGENT-WORKFLOWS.md` - Workflow 2: Theme Genome review
- `.github/skills/subdomain-evolution-agent/SKILL.md` - Proposition creation
- `.github/docs/ontological-proposition-guide.md` - Proposition guide
- `/docs/specifications/github-copilot-agent-guidelines.md` - Agent standards
- `/docs/specifications/agent-self-learning-system.md` - Dogfooding and quality

**Related Skills**: subdomain-evolution-agent, scss-refactor-agent, agent-evolution-agent

---

**Version History**:
- **v2.1** (2026-02-10): High-density refactor - 371→152 lines, enhanced spec references
- **v2.0**: Initial theme genome review system
