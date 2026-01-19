# Figma MCP Integration Guide

**Version**: 2.0 - Bidirectional Sync  
**MCP Server**: https://mcp.figma.com/mcp  
**Integration Status**: Active in Copilot Coding Agent  
**Last Updated**: 2026-01-19

---

## 🎨 Overview

The Figma Model Context Protocol (MCP) integration enables **bidirectional** design-code workflows within the Genesis Semantic Design System ecosystem. This integration allows AI agents to:
- **Design → Code**: Extract design tokens, inspect component structures, and translate design intent into ontological code
- **Code → Design**: Push implementation changes back to Figma, update design tokens, and sync component variants

### Key Capabilities

The Figma MCP server provides tools for:

1. **Design File Access (Read & Write)**
   - Read Figma files and retrieve component metadata
   - Write updates to Figma components and styles
   - Access design tokens (colors, typography, spacing)
   - Update design token values from code
   - Inspect layer hierarchy and component structure

2. **Design Token Extraction & Sync**
   - **Design → Code**: Extract color values (convert to OKLCH for Genesis system)
   - **Code → Design**: Push OKLCH token updates back to Figma variables
   - **Design → Code**: Retrieve typography scales (map to cognition variants)
   - **Code → Design**: Update Figma text styles from implemented typography
   - **Design → Code**: Access spacing systems (map to environment padding/margins)
   - **Code → Design**: Sync spacing tokens to Figma auto-layout settings

3. **Component Analysis & Synchronization**
   - **Design → Code**: Analyze component variants and states
   - **Code → Design**: Create/update Figma component variants from implementation
   - **Design → Code**: Identify interaction patterns
   - **Code → Design**: Update component descriptions with ontological mapping
   - **Design → Code**: Map design components to ontological entities
   - **Code → Design**: Tag Figma components with Genesis categories

4. **Bidirectional Workflows**
   - Reference design specifications during development
   - Push implementation refinements back to design
   - Validate implementation against design source
   - Update design based on code improvements
   - Maintain continuous design-code synchronization
   - Track change history in both directions

---

## 🧬 Integration with Genesis Ontology

The Figma MCP integration enhances the three-tier ontological architecture with **bidirectional synchronization**:

### Bidirectional Flow: Design ↔ Code ↔ Interface ↔ Engine

```
          DESIGN → CODE FLOW
Figma Design File
    ↓ (Figma MCP extracts)
Design Tokens & Components
    ↓ (Agent translates)
Ontological Variants
    ↓ (Developer applies)
Genesis Semantic SCSS
    ↓ (Compiled to)
Production CSS

          CODE → DESIGN FLOW
Production CSS
    ↓ (Agent analyzes)
Ontological Patterns Used
    ↓ (Agent reverse-maps)
Design Token Values
    ↓ (Figma MCP writes)
Updated Figma Components & Variables
```

### Mapping Strategy

| Figma Concept | Genesis Category | Translation |
|---------------|------------------|-------------|
| **Frames & Auto Layout** | `genesis-environment()` | Layout logic (distributed, focused, etc.) |
| **Components & Variants** | `genesis-entity()` | Visual presence (primary, secondary, etc.) |
| **Text Styles** | `genesis-cognition()` | Typography intent (axiom, discourse, etc.) |
| **Interactive Components** | `genesis-synapse()` | Interaction patterns (navigate, execute, etc.) |
| **Component States** | `genesis-state()` | Temporal conditions (stable, evolving, etc.) |
| **Effects & Fills** | `genesis-atmosphere()` | Sensory texture (ethereal, vibrant, etc.) |

---

## 🚀 Usage Workflows

### 1. Design Token Extraction

When designers update the Figma design system:

```bash
# Agent uses Figma MCP to extract tokens
# Translates to OKLCH color space
# Maps to Genesis design tokens in _sass/ontology/_tokens.scss
```

**Agent Role**: Figma Design Bridge Agent (see `.github/skills/figma-design-bridge-agent/`)

### 2. Component Implementation

When implementing a new design component:

```markdown
1. Agent accesses Figma component via MCP
2. Analyzes visual hierarchy and states
3. Maps to appropriate ontological mixins
4. Generates semantic HTML + SCSS using Genesis patterns
5. Validates against design specifications
```

### 3. Design Review & Validation

During code review:

```markdown
1. Agent references Figma source of truth
2. Compares implemented spacing, colors, typography
3. Ensures semantic mapping is appropriate
4. Suggests refinements if design intent unclear
```

### 4. Code-to-Design Token Sync (NEW - Bidirectional)

When implementation refines design tokens:

```bash
# Developer updates OKLCH token in code
# Agent detects token change
# Converts OKLCH back to RGB/hex
# Uses Figma MCP to update Figma variable
# Designer sees updated token in Figma
```

**Agent Role**: Figma Design Bridge Agent with write permissions

### 5. Component Variant Sync (NEW - Bidirectional)

When new ontological variant is implemented:

```markdown
1. Developer implements new component variant in code
2. Agent analyzes ontological mapping
3. Translates semantic variant to Figma component properties
4. Uses Figma MCP to create/update Figma component variant
5. Adds ontological metadata to Figma component description
6. Designer sees implementation-driven variant in Figma
```

### 6. Implementation Feedback Loop (NEW - Bidirectional)

When code reveals design improvements:

```markdown
1. Developer discovers better spacing/layout during implementation
2. Agent captures improved values from SCSS
3. Converts ontological tokens back to Figma auto-layout
4. Uses Figma MCP to update component in Figma
5. Adds implementation notes to Figma component
6. Designer reviews and approves or iterates
```
2. Compares implemented spacing, colors, typography
3. Ensures semantic mapping is appropriate
4. Suggests refinements if design intent unclear
```

---

## 🛠️ Available MCP Tools

The Figma MCP server exposes the following tool categories:

### File & Node Access (Read & Write)
- Read design file metadata
- Write updates to file properties
- Access specific nodes/components
- Update node properties and styles
- Traverse layer hierarchy
- Create new components/frames

### Design Token Queries & Updates
- Extract color variables
- Update color variable values
- Query typography styles
- Modify text style properties
- Access spacing/sizing tokens
- Sync spacing values to auto-layout

### Component Analysis & Modification
- List component variants
- Create new component variants
- Inspect component properties
- Update component descriptions and metadata
- Analyze component states
- Add custom properties and tags

### Bidirectional Sync Operations (NEW)
- Push token changes from code to Figma
- Update component variants from implementation
- Sync spacing values bidirectionally
- Add implementation metadata to designs
- Track change provenance (code or design initiated)
- Maintain version history for sync operations

### Export & Assets
- Export design assets
- Access images and icons
- Retrieve component previews

*(Note: Specific tool signatures available via MCP server introspection)*

---

## 📋 Best Practices

### For Designers

1. **Use Figma Variables** for design tokens (colors, spacing, typography)
2. **Name components semantically** - focus on WHAT, not HOW
3. **Document component intent** in Figma descriptions
4. **Organize by ontological categories** when possible
5. **Use Auto Layout** for responsive patterns

### For Developers

1. **Reference Figma as source of truth** for design intent
2. **Map design tokens to OKLCH** for perceptual uniformity
3. **Translate components to ontological roles**, not pixel-perfect CSS
4. **Validate semantic mapping** with Figma Design Bridge Agent
5. **Document mapping decisions** in code comments
6. **Push improvements back to Figma** when implementation reveals better approaches
7. **Add implementation notes** to Figma component descriptions
8. **Maintain bidirectional sync** for design token changes

### For Agents

1. **Extract design intent**, not just visual properties
2. **Propose ontological variants** when design reveals semantic gaps
3. **Maintain design-code bidirectional traceability**
4. **Suggest design improvements** for better semantic clarity
5. **Automate repetitive translation** patterns
6. **Push validated changes back to Figma** to keep design in sync
7. **Add metadata to Figma components** documenting ontological mapping
8. **Track change provenance** (design-initiated vs code-initiated)

---

## 🔗 Integration Points

### Agent Skills
- **Figma Design Bridge Agent** (`.github/skills/figma-design-bridge-agent/`)
  - Primary agent for Figma-to-Genesis translation
  - Extracts design tokens and maps to ontology
  - Validates implementation against design source

### Prompts
- Figma Design Bridge Agent prompt (`.github/prompts/figma-design-bridge-agent.prompt.md`)
- Enhanced SCSS Refactor Agent with Figma reference support
- Enhanced HTML Template Agent with design specification validation

### Instructions
- SCSS Instructions (`.github/instructions/scss.instructions.md`)
  - Updated with Figma token extraction guidance
- HTML Instructions (`.github/instructions/html.instructions.md`)
  - Updated with design-to-HTML semantic mapping

---

## 🧪 Example Workflow

### Scenario: Implementing a New Alert Component

**Step 1: Designer creates in Figma**
```
Component: Alert
Variants: Info, Warning, Urgent
States: Default, Dismissed
Auto Layout: Horizontal padding 24px, Vertical padding 16px
```

**Step 2: Agent extracts via Figma MCP**
```javascript
// Agent queries Figma MCP
{
  component: "Alert",
  variants: ["Info", "Warning", "Urgent"],
  states: ["Default", "Dismissed"],
  spacing: { horizontal: 24, vertical: 16 },
  colors: { info: "#...", warning: "#...", urgent: "#..." }
}
```

**Step 3: Agent maps to Genesis Ontology**
```scss
.alert {
  @include genesis-entity('primary');  // Base card
  
  &--info {
    @include genesis-entity('secondary');
    @include genesis-atmosphere('neutral');
  }
  
  &--warning {
    @include genesis-entity('secondary');
    @include genesis-atmosphere('ethereal');
  }
  
  &--urgent {
    @include genesis-entity('imperative');
    @include genesis-atmosphere('vibrant');
  }
  
  &--dismissed {
    @include genesis-state('deprecated');
  }
}
```

**Step 4: Generate semantic HTML**
```html
<div class="alert alert--urgent">
  <h3 class="alert__title">Important Notice</h3>
  <p class="alert__message">System maintenance scheduled.</p>
  <button class="alert__dismiss">Dismiss</button>
</div>
```

---

### Scenario: Code-to-Design Sync (NEW - Bidirectional)

**Step 1: Developer implements component with improvements**
```scss
// Developer discovers better spacing during implementation
.alert {
  @include genesis-entity('primary');
  
  // Implementation refinement: better visual hierarchy
  &__title {
    @include genesis-cognition('motive');  // Changed from 'axiom'
    // Better semantic fit - instructional rather than foundational
  }
}
```

**Step 2: Agent detects improvement**
```javascript
// Agent analyzes committed code
{
  component: "alert",
  changes: [{
    element: "title",
    oldMapping: "cognition('axiom')",
    newMapping: "cognition('motive')",
    reason: "Better semantic fit for instructional content"
  }]
}
```

**Step 3: Agent syncs to Figma**
```javascript
// Agent uses Figma MCP to update design
figmaMCP.updateComponent({
  fileKey: "alert-components",
  componentId: "alert-title",
  updates: {
    textStyle: "Instructional/Medium",  // Mapped from motive
    description: "Ontology: genesis-cognition('motive') - Instructional text, changed from 'axiom' based on implementation learnings"
  }
});
```

**Step 4: Designer reviews in Figma**
```
Figma Component: Alert → Title
- Text style updated to: Instructional/Medium
- Component description shows:
  "Updated from implementation: 2026-01-19
   Ontological mapping: genesis-cognition('motive')
   Rationale: Better semantic fit for instructional alert titles
   Previous: genesis-cognition('axiom')"
   
Designer can:
✓ Accept the change (already applied)
✗ Revert if design intent was different
💬 Add feedback to component notes
```

**Step 5: Continuous sync**
```markdown
- Developer makes token refinement: spacing increased
- Agent converts SCSS token back to Figma auto-layout
- Figma component updated automatically
- Designer sees change, approves
- Design and code stay in perfect sync
```

---

## 🔄 Evolutionary Feedback Loop

### Bidirectional Design ↔ Code → Evolution (UPDATED)

1. **Design reveals semantic gap**
   - Designer creates component not covered by ontology
   - Figma Design Bridge Agent identifies missing semantic role

2. **OR Code reveals design improvement**
   - Developer discovers better semantic mapping during implementation
   - Agent captures improvement and syncs back to Figma
   - Designer reviews code-initiated design update

3. **Ontological Proposition**
   - Agent creates well-formed proposition PR
   - Theme Genome Agent reviews for universal applicability
   - Can be initiated from either design or code side

4. **System Evolution**
   - New variant added to Genesis Ontology
   - GENOME.md updated with evolution source (design or code driven)
   - Both Figma component library and code aligned with new ontology
   - Bidirectional sync ensures consistency

5. **Continuous Sync**
   - Design system and code ontology stay perfectly aligned
   - Semantic roles evolve together from both directions
   - Complete bidirectional traceability maintained
   - Change history tracked with provenance (design vs code initiated)

---

## 📚 Resources

### Documentation
- [Agent Ecosystem Architecture](./.github/AGENTS.MD)
- [Figma Design Bridge Agent Skill](./.github/skills/figma-design-bridge-agent/SKILL.md)
- [Genesis Ontology Integration Guide](./_sass/ontology/INTEGRATION-GUIDE.md)
- [Design Tokens Reference](./.github/skills/figma-design-bridge-agent/references/DESIGN-TOKENS-GUIDE.md)

### External Resources
- [Figma MCP Server](https://mcp.figma.com/mcp)
- [Model Context Protocol Documentation](https://modelcontextprotocol.io)
- [OKLCH Color Space](https://oklch.com)
- [Agent Skills Specification](https://agentskills.io)

---

## 🎯 Current Capabilities & Roadmap

### ✅ Implemented (v2.0 - Bidirectional)

- **Design → Code workflows**
  - Token extraction and OKLCH conversion
  - Component analysis and ontological mapping
  - Semantic HTML and SCSS generation
  - Design validation and traceability

- **Code → Design workflows** (NEW)
  - Push token changes from code to Figma variables
  - Update Figma component variants from implementation
  - Sync spacing values to auto-layout settings
  - Add implementation metadata to Figma components
  - Track change provenance and history

- **Bidirectional synchronization**
  - Continuous design-code alignment
  - Conflict detection and resolution
  - Version tracking in both directions
  - Change review workflows

### 🔮 Future Enhancements (v2.1+)

- **Automated webhook sync** - Real-time bidirectional updates on save
- **Visual regression testing** - Automated screenshot comparison
- **AI-powered conflict resolution** - Smart merge of design and code changes
- **Design system analytics** - Track usage patterns and evolution metrics
- **Collaborative review tools** - In-Figma code review and approval flows
- **Multi-directional sync** - Support for additional design tools beyond Figma

---

**Status**: ✅ Active Integration  
**Maintainer**: ASI Saga Theme Genome Agent  
**Contact**: See [AGENTS.MD](./.github/AGENTS.MD) for agent ecosystem details
