# Decision Matrices

**Last Updated**: 2026-02-14  
**Audience**: All agents, contributors

## Overview

This document provides quick-reference decision matrices for common scenarios in the agent ecosystem.

## For Subdomain Agents

### "Should I Create an Ontological Proposition PR?"

| Scenario | Action | Reasoning |
|----------|--------|-----------|
| Need new color or spacing | ❌ NO PR | Visual details are engine concern, not semantic |
| Need specific font size | ❌ NO PR | Typography handled by cognition mixins |
| Found semantic pattern gap | ✅ YES PR | Missing role = ontological evolution needed |
| Existing mixin doesn't match intent | ✅ YES PR | Propose refinement or new variant |
| Just want different styling | ❌ NO PR | Use existing mixins differently or adjust engine |
| Need to combine multiple roles | ❌ NO PR | Use multiple mixins together |
| Discovered universal interaction pattern | ✅ YES PR | New synapse variant candidate |
| Found state not represented | ✅ YES PR | New state variant candidate |

### "Should I Use Raw CSS Properties?"

| Scenario | Action | Reasoning |
|----------|--------|-----------|
| In subdomain SCSS files | ❌ NEVER | Zero-CSS rule - use ontological mixins only |
| In theme engine files | ✅ YES | Engine layer is where CSS properties live |
| For one-off visual tweak | ❌ NO | Violates semantic architecture |
| For testing/prototyping | ⚠️ TEMPORARY | Must refactor to mixins before merging |

### "Which Ontological Category Should I Use?"

| Content Purpose | Category | Variant Examples |
|----------------|----------|------------------|
| Layout/arrangement | Environment | `distributed`, `focused`, `chronological` |
| Visual prominence | Entity | `primary`, `secondary`, `imperative` |
| Text/information type | Cognition | `axiom`, `discourse`, `protocol`, `gloss` |
| User interaction | Synapse | `navigate`, `execute`, `inquiry` |
| Temporal condition | State | `stable`, `evolving`, `deprecated` |
| Overall mood/vibe | Atmosphere | `neutral`, `ethereal`, `vibrant` |

## For Theme Genome Agent

### "Should I Accept This Ontological Proposition PR?"

| PR Content | Decision | Action |
|------------|----------|--------|
| "Make buttons blue" | ❌ REJECT | Not semantic; visual preference only |
| "Add error state for forms" | ✅ APPROVE | Valid semantic state, universal |
| "Add hover effect to cards" | ❌ REJECT | Visual implementation, engine concern |
| "Represent draft/incomplete data" | ✅ CONSIDER | Check if `state('evolving')` covers this |
| Already covered by existing mixin | ❌ REJECT | Guide to existing solution |
| Universal ASI pattern | ✅ APPROVE | Add to global interface |
| Subdomain-specific edge case | ⚠️ CONSIDER | May deny or add as engine variant |
| Request lacks semantic framing | ⚠️ REQUEST REVISION | Ask for "what" and "why" |
| Combines existing variants | ❌ REJECT | Show how to use multiple mixins |

### "Should I Refactor the Ontology?"

| Indicator | Action | Reasoning |
|-----------|--------|-----------|
| >50 variants in one category | ✅ REFACTOR | Consider splitting category |
| Multiple variants with same purpose | ✅ REFACTOR | Consolidate redundant options |
| Variant never used across subdomains | ✅ DEPRECATE | Mark for removal if truly unused |
| Community requests similar patterns | ✅ GENERALIZE | Create broader variant |
| Breaking changes needed | ⚠️ MAJOR VERSION | Document migration path |

## For SCSS Refactor Agent

### "How Should I Convert This CSS?"

| Legacy CSS Pattern | Ontological Conversion | Notes |
|--------------------|------------------------|-------|
| `.header { padding: 2rem; }` | `@include genesis-environment('focused');` | Layout concerns |
| `.primary-button { background: blue; }` | `@include genesis-synapse('execute');` | Interaction role |
| `.title { font-size: 2rem; font-weight: bold; }` | `@include genesis-cognition('axiom');` | Information hierarchy |
| `.card { box-shadow: ...; border: ...; }` | `@include genesis-entity('primary');` | Visual presence |
| `.disabled { opacity: 0.5; }` | `@include genesis-state('deprecated');` | Temporal condition |
| `.alert { background: red; }` | `@include genesis-entity('imperative');` | Urgent visual nature |

### "Is This HTML-SCSS Mapping Correct?"

| Pattern | Status | Action |
|---------|--------|--------|
| SCSS nesting mirrors HTML DOM | ✅ CORRECT | Maintain this structure |
| SCSS classes don't match HTML | ❌ WRONG | Create 1:1 mapping |
| One HTML class, multiple SCSS includes | ✅ CORRECT | Combining mixins is fine |
| Using parent selector (&) appropriately | ✅ CORRECT | BEM-style modifiers |
| Deep nesting (>3 levels) | ⚠️ WARNING | May indicate complex DOM |

## For HTML Template Agent

### "Should I Add This HTML Element?"

| Element Purpose | Decision | Guidance |
|----------------|----------|----------|
| Semantic meaning (article, nav, header) | ✅ ADD | Use HTML5 semantic elements |
| Visual styling wrapper | ⚠️ MINIMIZE | Only if needed for layout/styling |
| Accessibility (skip link, sr-only) | ✅ ADD | WCAG compliance required |
| JavaScript hook | ✅ ADD | Use data-* attributes |
| Decoration only | ❌ AVOID | Use CSS pseudo-elements if possible |

### "What Class Name Should I Use?"

| Naming Approach | Status | Example |
|----------------|--------|---------|
| Content-focused (what it is) | ✅ CORRECT | `.research-paper`, `.user-profile` |
| Visual-focused (how it looks) | ❌ WRONG | `.blue-box`, `.large-text` |
| BEM methodology | ✅ CORRECT | `.card__header--highlighted` |
| Utility classes | ⚠️ AVOID | Use ontological mixins instead |
| Generic (div, box, container) | ⚠️ MINIMIZE | Be more specific when possible |

## For JavaScript Integration Agent

### "Should I Add JavaScript for This?"

| Feature | Decision | Approach |
|---------|----------|----------|
| Core content display | ❌ NO | HTML should work without JS |
| Interactive enhancement | ✅ YES | Progressive enhancement |
| Animation/transition | ✅ YES (Motion) | Use Motion library |
| Form validation | ✅ YES | Add client-side validation |
| Accessibility (keyboard nav) | ✅ YES | Ensure keyboard support |
| Visual-only effect | ⚠️ CONSIDER | Could CSS handle this? |

### "Which Synapse Variant Does This Map To?"

| User Action | Synapse Variant | Typical Elements |
|-------------|----------------|------------------|
| Click link to another page | `navigate` | Links, breadcrumbs |
| Submit form or trigger action | `execute` | Buttons, submit inputs |
| Open search or input field | `inquiry` | Search bars, input focus |
| Delete or destructive action | `destructive` | Delete buttons, confirmations |
| Share or social interaction | `social` | Share buttons, like buttons |

## For Agent Evolution Agent

### "Should I Refactor This Agent File?"

| Indicator | Action | Reasoning |
|-----------|--------|-----------|
| Agent duplicates spec content | ✅ REFACTOR | Extract to spec, add reference |
| Agent >500 lines | ✅ REFACTOR | Extract to separate docs |
| Agent lacks spec references | ✅ UPDATE | Add references for context |
| Agent has outdated information | ✅ UPDATE | Sync with current specs |
| Multiple agents say same thing | ✅ CONSOLIDATE | Extract to shared doc |

### "How Do I Measure Agent Quality?"

| Metric | Good Range | Action if Low |
|--------|------------|---------------|
| Spec coverage (% with references) | >80% | Add spec references |
| Context efficiency (info/tokens) | >50 | Remove duplication, add refs |
| Validation pass rate | >90% | Fix validation issues |
| Optimal agents (concise & referenced) | >25% | Refactor verbose agents |
| Duplication score | <10% | Consolidate repeated content |

## Quick Reference: All Ontological Variants

**Environment** (Layout Logic):
- `distributed`, `focused`, `associative`, `chronological`, `manifest`

**Entity** (Visual Presence):
- `primary`, `secondary`, `imperative`, `latent`, `aggregate`, `ancestral`

**Cognition** (Information Type):
- `axiom`, `discourse`, `protocol`, `gloss`, `motive`, `quantum`

**Synapse** (Interaction):
- `navigate`, `execute`, `inquiry`, `destructive`, `social`

**State** (Temporal Condition):
- `stable`, `evolving`, `deprecated`, `locked`, `simulated`

**Atmosphere** (Sensory Vibe):
- `neutral`, `ethereal`, `void`, `vibrant`

→ **Complete details**: `/docs/specifications/scss-ontology-system.md`

## References

**Related Documentation**:
- `.github/docs/ontological-proposition-guide.md` - PR workflow
- `.github/docs/agent-workflows.md` - Workflows and practical examples
- `/docs/specifications/scss-ontology-system.md` - All variants detailed
- `.github/specs/ontological-design-system.md` - Complete specification

**Agent Resources**:
- `.github/prompts/` - All agent prompts
- `.github/skills/` - All agent skills
- `.github/docs/agent-onboarding.md` - Training materials

---

**Version**: 1.0  
**Purpose**: Quick-reference decision trees for all agents
