---
name: figma-design-bridge-agent
description: Translate Figma designs into Genesis Semantic Design System code. Extract design tokens, analyze components, map design intent to ontological variants, and maintain design-code synchronization. Use when implementing designs from Figma, extracting design tokens, or validating implementation against design specifications.
license: MIT
metadata:
  author: ASISaga
  version: "1.0"
  category: design-system
  role: design-translator
allowed-tools: Bash(npm:*) Read figma-mcp:*
---

# Figma Design Bridge Agent

**Role**: Design-to-Code Translation Specialist  
**Scope**: Figma design files ↔ Genesis Semantic Design System  
**Version**: 1.0 - Initial Figma MCP Integration

## Purpose

The Figma Design Bridge Agent translates visual designs from Figma into semantic, ontology-based code for the Genesis Design System. This agent acts as the bridge between design intent and implementation, ensuring designs are translated into appropriate ontological roles rather than pixel-perfect CSS.

**Key Philosophy**: Extract semantic intent from design, not just visual properties.

## When to Use This Skill

Activate this skill when:

- Implementing a new component from Figma designs
- Extracting design tokens (colors, typography, spacing) from Figma
- Validating implementation against Figma source of truth
- Identifying semantic gaps revealed by design patterns
- Translating Figma component variants to ontological states
- Synchronizing design system updates with code
- Creating ontological propositions based on design requirements

## Core Responsibilities

### 1. Design Token Extraction & Translation

Extract design tokens from Figma and map them to Genesis design system:

**Color Translation**:
```
Figma Color Variable → OKLCH Conversion → Genesis Token
#1a1a2e → oklch(15% 0.02 260) → $surface-primary
```

**Typography Mapping**:
```
Figma Text Style → Cognition Variant
"Heading/Large" → genesis-cognition('axiom')
"Body/Regular" → genesis-cognition('discourse')
"Label/Small" → genesis-cognition('gloss')
```

**Spacing Extraction**:
```
Figma Auto Layout → Environment Padding
Horizontal: 24px, Vertical: 16px → Appropriate space tokens
```

### 2. Component Analysis & Mapping

Analyze Figma components and map to ontological categories:

**Decision Framework**:
```
Figma Component
├─ Layout Analysis → genesis-environment($logic)
│  ├─ Grid/Auto-fit → 'distributed'
│  ├─ Centered reading → 'focused'
│  ├─ Horizontal flow → 'associative'
│  └─ Vertical timeline → 'chronological'
│
├─ Visual Presence → genesis-entity($nature)
│  ├─ Primary card → 'primary'
│  ├─ Secondary context → 'secondary'
│  ├─ Alert/Urgent → 'imperative'
│  └─ Disabled/Inactive → 'latent'
│
├─ Text Analysis → genesis-cognition($intent)
│  ├─ Headlines → 'axiom'
│  ├─ Body text → 'discourse'
│  ├─ Code/Technical → 'protocol'
│  └─ Annotations → 'gloss'
│
├─ Interaction Type → genesis-synapse($vector)
│  ├─ Navigation link → 'navigate'
│  ├─ Action button → 'execute'
│  ├─ Search/Filter → 'inquiry'
│  └─ Delete/Remove → 'destructive'
│
├─ Component States → genesis-state($condition)
│  ├─ Default/Normal → 'stable'
│  ├─ Loading/Progress → 'evolving'
│  ├─ Disabled/Old → 'deprecated'
│  └─ Preview/Draft → 'simulated'
│
└─ Visual Effects → genesis-atmosphere($vibe)
   ├─ Standard → 'neutral'
   ├─ Light/Airy → 'ethereal'
   ├─ Dark/Immersive → 'void'
   └─ Colorful/Energetic → 'vibrant'
```

### 3. Design-to-Code Translation Workflow

**Step 1: Access Figma Design**
```markdown
1. Use Figma MCP to access the design file
2. Identify target component or design tokens
3. Extract relevant design properties
```

**Step 2: Semantic Analysis**
```markdown
1. Analyze design intent (WHAT it represents, not HOW it looks)
2. Identify component role in information hierarchy
3. Determine interaction patterns and states
```

**Step 3: Ontological Mapping**
```markdown
1. Map layout to environment variant
2. Map visual presence to entity variant
3. Map text to cognition variant
4. Map interactions to synapse variant
5. Map states to state variant
6. Map effects to atmosphere variant
```

**Step 4: Code Generation**
```markdown
1. Generate semantic HTML with BEM-style classes
2. Create SCSS using only ontological mixins
3. Ensure zero raw CSS properties in subdomain code
4. Document mapping decisions in comments
```

**Step 5: Validation**
```markdown
1. Verify semantic intent is preserved
2. Check accessibility (WCAG AA minimum)
3. Validate responsive behavior
4. Test interaction states
```

## Design Token Translation Guide

### Colors: Figma → OKLCH → Genesis

**Process**:
1. Extract color hex value from Figma
2. Convert to OKLCH for perceptual uniformity
3. Map to appropriate Genesis semantic token

**Example**:
```scss
// Figma: "Surface/Dark" #1a1a2e
// OKLCH: oklch(15% 0.02 260)
// Genesis Token: $surface-primary

// Figma: "Accent/Neural" #8b5cf6
// OKLCH: oklch(55% 0.25 290)
// Genesis Token: $accent-neural
```

**Key Principle**: Never use raw hex values. Always convert to OKLCH and use semantic tokens.

### Typography: Figma Styles → Cognition Variants

**Mapping Table**:

| Figma Text Style | Cognition Variant | Genesis Mixin |
|------------------|-------------------|---------------|
| Display XL / Heading 1 | axiom | `@include genesis-cognition('axiom');` |
| Heading 2-3 | axiom (smaller scale) | `@include genesis-cognition('axiom');` |
| Body Large / Regular | discourse | `@include genesis-cognition('discourse');` |
| Code / Monospace | protocol | `@include genesis-cognition('protocol');` |
| Caption / Small | gloss | `@include genesis-cognition('gloss');` |
| Button / Label | motive | `@include genesis-cognition('motive');` |
| Tag / Badge | quantum | `@include genesis-cognition('quantum');` |

### Spacing: Auto Layout → Environment Tokens

**Translation**:
```
Figma Auto Layout Padding → Genesis Space Tokens
8px  → --space-network (tight)
16px → --space-narrative (comfortable)
24px → --space-bento (spacious)
32px → --space-manifest (generous)
```

## Component Implementation Pattern

### Example: Alert Component from Figma

**Figma Component Structure**:
```
Alert Component
├─ Variants: Info, Warning, Urgent
├─ States: Default, Dismissed
├─ Layout: Horizontal, 24px padding
└─ Elements: Icon, Title, Message, Dismiss Button
```

**Semantic HTML**:
```html
<div class="alert alert--urgent">
  <svg class="alert__icon" aria-hidden="true">...</svg>
  <div class="alert__content">
    <h3 class="alert__title">Important Notice</h3>
    <p class="alert__message">System maintenance scheduled for tonight.</p>
  </div>
  <button class="alert__dismiss" aria-label="Dismiss alert">
    <svg aria-hidden="true">×</svg>
  </button>
</div>
```

**Ontological SCSS**:
```scss
---
---
@import "ontology/index";

.alert {
  @include genesis-entity('primary');        // Base card presence
  @include genesis-environment('associative'); // Horizontal layout
  
  &--info {
    @include genesis-entity('secondary');    // Lower emphasis
    @include genesis-atmosphere('neutral');
  }
  
  &--warning {
    @include genesis-entity('secondary');
    @include genesis-atmosphere('ethereal');  // Light, attention-getting
  }
  
  &--urgent {
    @include genesis-entity('imperative');    // High priority
    @include genesis-atmosphere('vibrant');   // High energy
  }
  
  &--dismissed {
    @include genesis-state('deprecated');     // Fading out
  }
  
  .alert__icon {
    // Icon inherits from parent context
  }
  
  .alert__content {
    @include genesis-environment('focused');  // Vertical stack
  }
  
  .alert__title {
    @include genesis-cognition('motive');     // Instructional
  }
  
  .alert__message {
    @include genesis-cognition('discourse');  // Body text
  }
  
  .alert__dismiss {
    @include genesis-synapse('destructive');  // Removal action
  }
}
```

**Mapping Documentation**:
```scss
/**
 * Alert Component - Figma to Genesis Mapping
 * 
 * SOURCE: Figma File "ASI Components" → Alert
 * 
 * DESIGN INTENT:
 * - Temporary notifications with varying urgency levels
 * - User can dismiss after reading
 * - Visual hierarchy: Icon → Title → Message → Action
 * 
 * ONTOLOGICAL DECISIONS:
 * - entity('primary'/'secondary'/'imperative') for urgency levels
 * - state('deprecated') for dismissed state (fading, low priority)
 * - synapse('destructive') for dismiss action (removes from view)
 * - atmosphere variants for emotional tone matching urgency
 * 
 * ALTERNATIVES CONSIDERED:
 * - Could use entity('latent') for dismissed, but 'deprecated' better
 *   represents "content that was valid but is now going away"
 */
```

## Identifying Semantic Gaps

When Figma designs reveal patterns not covered by current ontology:

**Detection**:
1. Component has unique semantic role not covered by 31 variants
2. Combining existing mixins feels forced or semantically wrong
3. Design intent is clear but no appropriate ontological category exists

**Action**:
1. Document the semantic need clearly
2. Create Ontological Proposition using Subdomain Evolution Agent
3. Submit to Theme Genome Agent for review
4. Implement using existing variants as temporary solution
5. Migrate to new variant once approved

**Example**:
```
FIGMA PATTERN: "Calculating/Uncertain Data Display"
Design shows value with animated dots, subtle pulse

CURRENT OPTIONS:
- state('stable') → implies certainty ❌
- state('evolving') → implies progress toward completion ❌
- state('simulated') → implies projected, not live ❌

SEMANTIC GAP: Need state for "actively computing, uncertain result"

PROPOSAL: state('calculating')
- Visual: Subtle animation, muted text, loading indicator
- Semantic: Data is being computed in real-time, value uncertain
- Universal: All subdomains with async calculations
```

## Quality Guidelines

### ✅ Good Patterns

**Semantic Naming**:
```html
<!-- ✅ GOOD: Describes WHAT it is -->
<div class="user-profile">
  <img class="user-profile__avatar" alt="User photo">
  <h2 class="user-profile__name">Jane Doe</h2>
  <p class="user-profile__bio">Software engineer</p>
</div>
```

**Ontological Mapping**:
```scss
// ✅ GOOD: Uses semantic ontology mixins
.user-profile {
  @include genesis-entity('primary');
  
  .user-profile__name {
    @include genesis-cognition('axiom');
  }
  
  .user-profile__bio {
    @include genesis-cognition('discourse');
  }
}
```

**Design Intent Documentation**:
```scss
/**
 * ✅ GOOD: Documents WHY, not just WHAT
 * 
 * SOURCE: Figma "User Components" → Profile Card
 * INTENT: Display user identity with visual hierarchy
 * DECISION: axiom for name (most important), discourse for bio
 */
```

### ❌ Bad Patterns

**Visual Naming**:
```html
<!-- ❌ BAD: Describes HOW it looks, not WHAT it is -->
<div class="blue-box">
  <img class="round-image">
  <h2 class="big-bold-text">Jane Doe</h2>
  <p class="small-gray-text">Software engineer</p>
</div>
```

**Raw CSS Properties**:
```scss
// ❌ BAD: Uses raw CSS instead of ontology
.user-profile {
  padding: 2rem;
  background: #1a1a2e;
  border-radius: 12px;
  
  .user-profile__name {
    font-size: 2rem;
    font-weight: bold;
    color: white;
  }
}
```

**No Design Traceability**:
```scss
// ❌ BAD: No documentation of design source or intent
.user-profile {
  @include genesis-entity('primary');
}
```

## Validation Checklist

Before completing implementation:

- [ ] Figma source referenced and accessible
- [ ] Design intent clearly understood and documented
- [ ] Semantic HTML with meaningful class names (BEM-style)
- [ ] Zero raw CSS properties (ontology mixins only)
- [ ] Appropriate ontological category for each element
- [ ] Color values converted from hex to OKLCH
- [ ] Typography mapped to cognition variants
- [ ] Spacing uses appropriate space tokens
- [ ] Interactive elements have synapse variants
- [ ] Component states have state variants
- [ ] Accessibility: WCAG AA minimum, keyboard navigation
- [ ] Responsive: Mobile-first, touch targets ≥44px
- [ ] Mapping decisions documented in code comments
- [ ] Semantic gaps identified and propositions created

## Integration with Other Agents

**Collaborates With**:
- **Theme Genome Agent**: Submit ontological propositions for semantic gaps
- **Subdomain Evolution Agent**: Create proposals when design reveals needs
- **SCSS Refactor Agent**: Ensure zero-CSS compliance
- **HTML Template Agent**: Generate semantic HTML structures
- **Responsive Design Agent**: Implement mobile-first responsive patterns

**Workflow**:
```
Figma Design
    ↓
[Figma Design Bridge Agent] ← Access via Figma MCP
    ↓ (extracts & maps)
Ontological Code
    ↓ (validates with)
[SCSS Refactor Agent] + [HTML Template Agent]
    ↓ (identifies gaps)
[Subdomain Evolution Agent] → [Theme Genome Agent]
```

## Resources

### Documentation
- [Figma MCP Integration Guide](../../../figma-mcp.md)
- [Design Tokens Translation Guide](references/DESIGN-TOKENS-GUIDE.md)
- [Genesis Ontology Reference](../../../_sass/ontology/INTEGRATION-GUIDE.md)
- [GENOME Evolutionary History](../../../GENOME.md)

### Related Skills
- [Theme Genome Agent](../theme-genome-agent/SKILL.md)
- [SCSS Refactor Agent](../scss-refactor-agent/SKILL.md)
- [HTML Template Agent](../html-template-agent/SKILL.md)

### External Resources
- [Figma MCP Server Documentation](https://mcp.figma.com/mcp)
- [OKLCH Color Space](https://oklch.com)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Status**: ✅ Active Integration (v1.0)  
**Figma MCP**: https://mcp.figma.com/mcp  
**Maintainer**: ASI Saga Agent Ecosystem
