---
name: subdomain-evolution-agent
description: Create ontological propositions for the Genesis Semantic Design System when gaps are identified. Analyze existing variants, formulate semantic intents, and submit PRs to theme repository. Use when subdomain development reveals missing semantic patterns that can't be expressed with current ontological variants.
license: MIT
metadata:
  author: ASISaga
  version: "2.0"
  category: design-system
  role: local-intelligence
---

# Subdomain Evolution Agent

**Role**: Ontological Proposition Creator  
**Scope**: Individual subdomain repositories (e.g., research.asisaga.com, docs.asisaga.com)

## Purpose

The Subdomain Evolution Agent identifies semantic gaps in the Genesis Ontological Design System and creates well-formed propositions for new variants. This agent acts as the "local intelligence" that observes real-world usage patterns and proposes evolutionary improvements to the shared design system.

## When to Use This Skill

Activate this skill when:

- Implementing subdomain features that don't fit existing ontological variants
- Repeatedly combining mixins in the same way (indicates missing abstraction)
- Finding yourself writing raw CSS because no mixin exists
- Discovering a semantic pattern used across multiple pages/components
- Needing to represent a state, interaction, or layout type not in current ontology

**Don't use this skill for**:
- Visual preferences ("I want a different color")
- One-off unique features specific to your subdomain
- Changes that can be achieved with existing variant combinations

## Core Process

### Step 1: Identify the Gap

Before creating a proposition, verify this is a genuine semantic gap:

**Checklist**:
- [ ] Reviewed all 31+ existing variants in INTEGRATION-GUIDE.md
- [ ] Attempted to combine existing mixins creatively
- [ ] Confirmed this represents WHAT content is, not HOW it looks
- [ ] Identified the semantic intent (information role, not visual style)
- [ ] Pattern is used in 2+ places in subdomain (or applicable across ecosystem)

**Decision Matrix**:
```
Can I combine existing mixins?
├─ YES → Use combination, don't create PR
└─ NO → Continue

Is this about WHAT or HOW?
├─ HOW (visual detail) → Don't create PR, use existing
└─ WHAT (semantic role) → Continue

Is this universal to ASI ecosystem?
├─ YES → Create PR
└─ NO (subdomain-specific) → Consider local solution
```

### Step 2: Analyze Existing Ontology

Review the 6 categories to determine which one your gap belongs to:

1. **Environment** (Spatial Logic) - Layout and arrangement patterns
2. **Entity** (Visual Presence) - Content weight and glassmorphism styling
3. **Cognition** (Information Type) - Typography based on semantic meaning
4. **Synapse** (Interaction) - User actions and navigation patterns
5. **State** (Temporal Condition) - Time-based or conditional states
6. **Atmosphere** (Sensory Vibe) - Emotional tone and aesthetic texture

**Example Analysis**:
```
Need: Show data that's being calculated but not yet certain

Category Analysis:
- Environment? ❌ Not about layout
- Entity? ❌ Not about visual weight
- Cognition? ❌ Not about information type
- Synapse? ❌ Not about interaction
- State? ✅ Yes! This is a temporal condition
- Atmosphere? ❌ Not about emotional tone

Category: State
```

### Step 3: Formulate the Proposition

Use the ontological proposition template to create a well-formed request.

**Template Structure**:
```markdown
## 🧩 Ontological Proposition

**Source Node**: [subdomain].asisaga.com
**Intent (The 'What')**: [One-line semantic purpose]
**Context (The 'Why')**: [Explain why existing variants don't cover this]

## 🔭 Proposed Role

- **Type**: [Environment/Entity/Cognition/Synapse/State/Atmosphere]
- **Suggested Label**: `[category]('[variant-name]')`
- **Relationship**: [How it relates to existing variants]

## 📋 Use Cases

1. [Specific use case in your subdomain]
2. [Additional use case]
3. [Cross-subdomain applicability if known]

## 🌐 Universal Applicability

[Explain how this benefits multiple subdomains]

## 🎨 Semantic vs Visual

**Semantic Intent**: [What this represents in information architecture]
**NOT About**: [What visual details this is NOT about]
```

### Step 4: Submit the PR

Create a PR to the theme repository using the template:

1. Use `.github/PULL_REQUEST_TEMPLATE/ontological_proposition.md`
2. Add label: `ontological-proposition`
3. Reference any related issues or discussions
4. Be prepared to discuss and refine based on Theme Genome Agent feedback

## Quality Guidelines

### What Makes a Good Proposition

✅ **Good Example**:
```markdown
## Ontological Proposition

**Source**: docs.asisaga.com
**Intent**: Represent content undergoing active calculation or uncertainty
**Context**: Current `state('stable')` implies certainty, `state('evolving')` 
implies completion progress. Need state for "computing but outcome uncertain".

**Proposed Role**:
- Type: State
- Label: `state('calculating')` or `state('pending')`
- Relationship: Temporal condition between initiation and resolution

**Use Cases**:
1. Real-time analytics during computation
2. AI model inference in progress
3. Search results being fetched

**Universal**: All subdomains with async operations need this
**NOT About**: Spinner styling, loading animation speed, or colors
```

❌ **Bad Example**:
```markdown
## Ontological Proposition

**Intent**: Make cards look more modern
**Context**: Current cards are boring

**Proposed**: Add more glassmorphism effects with neon borders

**Use Cases**:
1. Hero cards on homepage
2. Feature showcases
```

**Why this is bad**:
- "More modern" is subjective, not semantic
- "Boring" is aesthetic judgment, not role definition
- "Neon borders" is visual implementation, not semantic intent
- No clear semantic gap identified

### Common Mistakes to Avoid

1. **Visual Language**: Avoid words like "modern", "cool", "pretty", "nicer"
2. **Implementation Details**: Don't specify colors, sizes, animations
3. **One-Off Solutions**: If only your subdomain needs it, implement locally
4. **Redundant Requests**: Always check if combination of existing mixins works
5. **Vague Intents**: Be specific about the semantic role being represented

## Proposition Examples

### Example 1: Valid State Proposition

**Scenario**: Documentation site needs to mark deprecated content that's still accessible

```markdown
## Ontological Proposition

**Source**: docs.asisaga.com
**Intent**: Represent archived/historical content that's valid but no longer current
**Context**: `state('deprecated')` implies "don't use", but we need "was valid then, 
preserved for history". Different semantic meaning.

**Proposed Role**:
- Type: Entity (content weight/presence)
- Label: `entity('ancestral')` or `entity('archived')`
- Relationship: Distinct from deprecated (which warns against use)

**Use Cases**:
1. Old API documentation (v1.x when v2 is current)
2. Historical blog posts from previous site versions
3. Legacy research papers for reference

**Universal**: All subdomains have historical content to preserve
**Semantic Intent**: Content from the past, preserved for context, not current
**NOT About**: Gray colors, muted styling, or archive icons
```

### Example 2: Valid Interaction Proposition

**Scenario**: Multiple subdomains need expandable/collapsible sections

```markdown
## Ontological Proposition

**Source**: research.asisaga.com
**Intent**: Represent disclosure/toggle interactions (expand/collapse)
**Context**: Current `synapse('inquiry')` implies request for MORE data (like 
pagination). We need interaction that REVEALS existing hidden data.

**Proposed Role**:
- Type: Synapse
- Label: `synapse('disclose')` or `synapse('toggle')`
- Relationship: Sister to inquiry but for local visibility toggle

**Use Cases**:
1. Accordion sections in documentation
2. Expandable research abstract sections
3. Collapsible navigation menus

**Universal**: Every subdomain has collapsible UI patterns
**Semantic Intent**: Toggle visibility of existing content
**NOT About**: Animation speed, arrow icons, or transition effects
```

### Example 3: Rejected (Visual Only)

**Scenario**: This would be REJECTED by Theme Genome Agent

```markdown
## Ontological Proposition

**Source**: marketing.asisaga.com
**Intent**: Make buttons more prominent
**Context**: Current buttons don't stand out enough

**Proposed Role**:
- Type: Synapse
- Label: `synapse('prominent-action')`
```

**Why this would be rejected**:
- "More prominent" is visual weight, not semantic role
- Already covered by `synapse('execute')` with `entity('primary')`
- No new semantic meaning - just wants different styling
- Engine concern, not ontological gap

## Implementation After Approval

Once Theme Genome Agent approves your proposition:

1. **Wait for Merge**: Theme agent will implement in engine layer
2. **Update Your Subdomain**: Import new variant after theme release
3. **Adopt in SCSS**: Use the new mixin in your subdomain
4. **Document Locally**: Add examples to subdomain documentation
5. **Share Success**: Report back on adoption and impact

**Example Adoption**:
```scss
// After approval and merge of state('calculating')
@import "ontology/index";

.analytics-panel {
  @include genesis-environment('manifest');
  
  .metric-value {
    @include genesis-cognition('protocol');
    
    &.computing {
      @include genesis-state('calculating');  // New variant!
    }
  }
}
```

## Resources

Essential reading before creating propositions:

- `_sass/ontology/INTEGRATION-GUIDE.md` - All existing variants
- `.github/AGENTS.MD` - Agent ecosystem overview
- `GENOME.md` - Evolutionary history and variant registry
- `.github/prompts/subdomain-evolution-agent.prompt.md` - Detailed guidance
- `.github/PULL_REQUEST_TEMPLATE/ontological_proposition.md` - PR template

## Collaboration Tips

### Working with Theme Genome Agent

- **Be open to feedback**: Agent may suggest alternative solutions
- **Clarify semantics**: If rejected, ask for clarification
- **Iterate**: Refine your proposition based on guidance
- **Learn from rejections**: They improve your semantic thinking

### Building Ecosystem Knowledge

- **Study approved PRs**: Learn from successful propositions
- **Monitor GENOME.md**: Track what variants are being added
- **Cross-subdomain collaboration**: Discuss patterns with other subdomain teams
- **Document locally**: Keep notes on attempted vs approved patterns

## Success Criteria

A successful proposition should:

- [ ] Identify a clear semantic gap
- [ ] Be applicable to 3+ subdomains or use cases
- [ ] Use semantic language (WHAT, not HOW)
- [ ] Fit within existing category structure
- [ ] Include concrete use cases
- [ ] Distinguish itself from existing variants
- [ ] Document why combinations don't work

## Workflow Summary

1. **Identify gap** during subdomain development
2. **Verify** with existing ontology review
3. **Categorize** into one of 6 ontological categories
4. **Formulate** using proposition template
5. **Submit PR** with ontological-proposition label
6. **Engage** with Theme Genome Agent feedback
7. **Adopt** after approval and merge
8. **Document** usage in subdomain

---

**Related Skills**: theme-genome-agent, scss-refactor-agent
**Maintenance**: Update when ontological categories change
**Version**: Aligned with Genesis Semantic Design System v2.0+
