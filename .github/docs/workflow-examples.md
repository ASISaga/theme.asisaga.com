# Workflow Examples

**Last Updated**: 2026-02-14  
**Audience**: All agents, contributors

## Overview

This document provides practical, step-by-step examples of common workflows in the agent ecosystem.

## Ontological Evolution Workflows

### Example 1: Adding "Archived" Content State

**Scenario**: Documentation site needs to mark old API versions visually while keeping them accessible.

#### Step 1: Subdomain Discovery

Developer at `docs.asisaga.com` identifies need:
- Current patterns don't clearly distinguish archived from current docs
- `state('deprecated')` implies "don't use" but archived docs are still valid references
- Need distinct visual treatment for historical content

#### Step 2: Check Existing Ontology

Review `/docs/specifications/scss-ontology-system.md`:
- `state('deprecated')` - Too negative, implies broken
- `state('stable')` - Doesn't convey historical nature
- `entity('latent')` - Wrong category (entity is about visual prominence)
- **Conclusion**: Gap exists in representing historical content

#### Step 3: Create Ontological Proposition PR

Using `.github/PULL_REQUEST_TEMPLATE/ontological_proposition.md`:

```markdown
## 🧩 Ontological Proposition

**Source Node**: docs.asisaga.com
**Intent (The 'What')**: Represent archived/historical content
**Context (The 'Why')**: Old documentation should remain accessible but clearly marked as historical. Current options don't convey "valid but old" status.

## 🔭 Proposed Role

- **Type**: Entity
- **Suggested Label**: `entity('ancestral')`
- **Relationship**: Distinct from deprecated (which implies broken/obsolete)

## 📋 Use Cases

1. Old API version documentation (still functional)
2. Historical blog posts or announcements
3. Archived project documentation
4. Legacy code examples that work but aren't recommended

## 🌐 Universal Applicability

- Research subdomain: Past experiments and results
- Analytics subdomain: Historical data visualizations
- Documentation: Previous versions
- Blog: Archive section
```

#### Step 4: Theme Agent Review

Theme Genome Agent evaluates:

**Redundancy Check**:
- ❌ Not covered by `state('deprecated')` (different semantic meaning)
- ❌ Not covered by `entity('latent')` (latent = low priority, not historical)

**Generalization Check**:
- ✅ Universal pattern - all sites have historical content

**Semantic Validation**:
- ✅ Semantic purpose: "content from the past, valid but not current"
- ✅ Not just visual preference

**Decision**: ✅ **APPROVE**

#### Step 5: Implementation

Theme agent implements in `_sass/ontology/_engines.scss`:

```scss
/**
 * @category Entity
 * @variant 'ancestral'
 * @origin PR #145 (docs.asisaga.com)
 * @intent Represent historical/archived content
 * @evolution Added in v2.8 to support documentation archives
 * @since 2.8.0
 */
@if $nature == 'ancestral' {
  opacity: 0.7;
  filter: grayscale(0.3);
  border-color: var(--border-muted);
  background-color: var(--background-muted);
  position: relative;
  
  &::before {
    content: 'Archived';
    position: absolute;
    top: var(--spacing-2);
    right: var(--spacing-2);
    padding: var(--spacing-1) var(--spacing-2);
    background: var(--background-muted);
    color: var(--text-muted);
    font-size: var(--font-size-xs);
    font-weight: 600;
    border-radius: var(--radius-sm);
  }
}
```

#### Step 6: Documentation Updates

1. Update `_sass/ontology/_interface.scss` with docs
2. Add to `/docs/specifications/scss-ontology-system.md`
3. Update `GENOME.md` with evolution history
4. Update `.github/specs/ontological-design-system.md`

#### Step 7: Subdomain Adoption

Back at `docs.asisaga.com`:

```scss
// _sass/main.scss
.archived-doc {
  @include genesis-entity('ancestral');
  @include genesis-cognition('discourse');
}
```

```html
<!-- docs page -->
<article class="archived-doc">
  <h1>API v1.0 Documentation</h1>
  <p>This version is no longer actively maintained...</p>
</article>
```

---

### Example 2: Rejecting Visual-Only Request

**Scenario**: Subdomain wants to change button styling.

#### Step 1: Subdomain Request

Developer submits PR:
```markdown
## Ontological Proposition

**Source**: community.asisaga.com
**Intent**: Make cards have rounded corners of 24px instead of 12px
```

#### Step 2: Theme Agent Review

**Semantic Validation**:
- ❌ This is visual implementation detail, not semantic meaning
- No "what" or "why" - only "how"

**Decision**: ❌ **REJECT**

#### Step 3: Educational Response

```markdown
❌ **Rejected - Visual Implementation Detail**

Your request modifies visual appearance without changing semantic meaning.

**Guidance**:
Border radius is an engine concern, controlled by design tokens in `_sass/ontology/_variables.scss`. 

If you need different visual weight or prominence for your cards, consider existing entity variants:
- `entity('primary')` - Standard elevation and presence
- `entity('secondary')` - Subtle, reduced prominence  
- `entity('imperative')` - Enhanced presence for urgent/important content

**To propose a valid ontological evolution, reframe as**:
"We need a way to represent [WHAT semantic purpose], because [WHY existing variants don't serve this purpose]"

**Example of valid semantic framing**:
- ❌ "Cards need bigger border radius"
- ✅ "We need to represent 'highlighted community posts' with more visual prominence than standard posts"

**Next Steps**:
1. Review `/docs/specifications/scss-ontology-system.md` for existing variants
2. Try combining existing mixins (e.g., `entity('primary')` + `state('stable')`)
3. If genuinely no solution exists, submit new PR with semantic framing

**Questions?** See `.github/docs/ontological-proposition-guide.md`
```

---

## SCSS Refactoring Workflows

### Example 3: Migrating Legacy CSS to Ontological Mixins

**Scenario**: Subdomain has legacy CSS file with raw properties.

#### Step 1: Analyze HTML Structure

```html
<article class="blog-post">
  <header class="post-header">
    <h1 class="post-title">Article Title</h1>
    <time class="post-meta">Jan 15, 2026</time>
  </header>
  <div class="post-content">
    <p>Content here...</p>
  </div>
  <footer class="post-footer">
    <button class="share-button">Share</button>
  </footer>
</article>
```

#### Step 2: Identify Legacy CSS

```scss
// OLD: legacy.scss
.blog-post {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.post-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.post-meta {
  font-size: 0.875rem;
  color: #666;
}

.share-button {
  background: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}
```

#### Step 3: Classify Intent for Each Element

| Element | Semantic Purpose | Category | Variant |
|---------|-----------------|----------|---------|
| `.blog-post` | Focused content container | Environment | `focused` |
| `.blog-post` | Primary visual prominence | Entity | `primary` |
| `.post-title` | Main heading/key info | Cognition | `axiom` |
| `.post-meta` | Supplementary info | Cognition | `gloss` |
| `.post-content` | Body text | Cognition | `discourse` |
| `.share-button` | Social interaction | Synapse | `social` |

#### Step 4: Create Ontological SCSS

```scss
// NEW: _sass/main.scss
.blog-post {
  @include genesis-environment('focused');
  @include genesis-entity('primary');
  
  .post-header {
    // No mixins needed - structure only
  }
  
  .post-title {
    @include genesis-cognition('axiom');
  }
  
  .post-meta {
    @include genesis-cognition('gloss');
  }
  
  .post-content {
    @include genesis-cognition('discourse');
  }
  
  .post-footer {
    // No mixins needed - structure only
  }
  
  .share-button {
    @include genesis-synapse('social');
  }
}
```

#### Step 5: Verification

**Checklist**:
- [ ] Zero raw CSS properties in subdomain SCSS
- [ ] SCSS nesting mirrors HTML structure
- [ ] Every class has clear semantic purpose
- [ ] Mixins correctly express intent

**Testing**:
```bash
npm run test:scss    # Verify compilation
npm run lint:scss    # Check for violations
```

---

## Agent Coordination Workflows

### Example 4: Agent Self-Improvement Loop

**Scenario**: Agent Evolution Agent improves itself using dogfooding principles.

#### Step 1: Quality Audit

Run validation:
```bash
cd /home/runner/work/theme.asisaga.com/theme.asisaga.com/.github/skills/agent-evolution-agent/scripts
./audit-agent-quality.sh
```

Output shows:
- Spec coverage: 72% (below 80% target)
- Context efficiency: 48 (below 56 target)
- Agent-evolution-agent itself scores low on optimization

#### Step 2: Self-Analysis

Agent Evolution Agent analyzes its own prompt file:
- Contains 300 lines
- Duplicates content from `/docs/specifications/scss-ontology-system.md`
- Missing references to `.github/docs/dogfooding-guide.md`

#### Step 3: Self-Refactoring

Agent updates `.github/prompts/agent-evolution-agent.prompt.md`:

**Before** (verbose):
```markdown
You should check all agents for the following quality metrics:
- Spec coverage: agents should reference specifications
- Context efficiency: maximize information density
- Duplication: avoid repeating content
...
[300 more lines of detailed procedures]
```

**After** (reference-based):
```markdown
Run quality checks following procedures in `.github/docs/dogfooding-guide.md`.

**Key metrics**:
→ Complete metrics: `.github/docs/agent-metrics.md`

**Validation scripts**:
→ All scripts: `.github/skills/agent-evolution-agent/scripts/`
```

#### Step 4: Metrics Update

Re-run audit:
- Spec coverage: 72% → 85% ✅
- Context efficiency: 48 → 62 ✅
- Agent-evolution-agent now optimal ✅

#### Step 5: Documentation

Update `.github/docs/dogfooding-guide.md` with this example as case study.

---

## Testing & Validation Workflows

### Example 5: End-to-End Testing After Ontology Change

**Scenario**: Added new `entity('ancestral')` variant, need to verify it works.

#### Step 1: Theme Implementation Test

```bash
# Build theme
npm run build:scss

# Check for errors
echo $?  # Should be 0
```

#### Step 2: Visual Regression Test

Create test page:
```html
<!-- tests/ontology/entity-ancestral-demo.html -->
---
layout: default
title: "Entity Ancestral Demo"
---

<div class="test-ancestral">
  <article class="archived-article">
    <h2>Archived Article</h2>
    <p>This content uses entity('ancestral')</p>
  </article>
</div>

<style>
.archived-article {
  @include genesis-entity('ancestral');
  @include genesis-cognition('discourse');
}
</style>
```

#### Step 3: Subdomain Integration Test

At subdomain repo:
```bash
# Pull latest theme
git submodule update --remote theme

# Test SCSS compilation
npm run test:scss

# Check lint
npm run lint:scss
```

#### Step 4: Accessibility Test

```bash
# Run Playwright tests
npm run test:e2e

# Check for violations
# - Archived badge should have sufficient contrast
# - Content should still be keyboard accessible
# - Screen readers should announce "Archived" status
```

---

## References

**Related Documentation**:
- `.github/docs/ontological-proposition-guide.md` - PR process
- `.github/docs/decision-matrices.md` - Quick decisions
- `.github/docs/agent-onboarding.md` - Learning these workflows
- `/docs/specifications/scss-ontology-system.md` - Complete variant list

**Agent Resources**:
- All agents in `.github/agents/`
- All prompts in `.github/prompts/`
- All skills in `.github/skills/`

---

**Version**: 1.0  
**Purpose**: Practical step-by-step workflow examples
