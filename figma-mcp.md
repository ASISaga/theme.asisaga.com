# Figma MCP Integration Guide

**Version**: 1.0  
**MCP Server**: https://mcp.figma.com/mcp  
**Integration Status**: Active in Copilot Coding Agent  
**Last Updated**: 2026-01-19

---

## 🎨 Overview

The Figma Model Context Protocol (MCP) integration enables seamless design-to-code workflows within the Genesis Semantic Design System ecosystem. This integration allows AI agents to directly access Figma design files, extract design tokens, inspect component structures, and translate design intent into ontological code.

### Key Capabilities

The Figma MCP server provides tools for:

1. **Design File Access**
   - Read Figma files and retrieve component metadata
   - Access design tokens (colors, typography, spacing)
   - Inspect layer hierarchy and component structure

2. **Design Token Extraction**
   - Extract color values (convert to OKLCH for Genesis system)
   - Retrieve typography scales (map to cognition variants)
   - Access spacing systems (map to environment padding/margins)

3. **Component Analysis**
   - Analyze component variants and states
   - Identify interaction patterns
   - Map design components to ontological entities

4. **Collaborative Workflows**
   - Reference design specifications during development
   - Validate implementation against design source
   - Maintain design-code synchronization

---

## 🧬 Integration with Genesis Ontology

The Figma MCP integration enhances the three-tier ontological architecture:

### Design → Content → Interface → Engine

```
Figma Design File
    ↓ (Figma MCP extracts)
Design Tokens & Components
    ↓ (Agent translates)
Ontological Variants
    ↓ (Developer applies)
Genesis Semantic SCSS
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

---

## 🛠️ Available MCP Tools

The Figma MCP server exposes the following tool categories:

### File & Node Access
- Read design file metadata
- Access specific nodes/components
- Traverse layer hierarchy

### Design Token Queries
- Extract color variables
- Query typography styles
- Access spacing/sizing tokens

### Component Analysis
- List component variants
- Inspect component properties
- Analyze component states

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

### For Agents

1. **Extract design intent**, not just visual properties
2. **Propose ontological variants** when design reveals semantic gaps
3. **Maintain design-code bidirectional traceability**
4. **Suggest design improvements** for better semantic clarity
5. **Automate repetitive translation** patterns

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

## 🔄 Evolutionary Feedback Loop

### Design → Code → Evolution

1. **Design reveals semantic gap**
   - Designer creates component not covered by ontology
   - Figma Design Bridge Agent identifies missing semantic role

2. **Ontological Proposition**
   - Agent creates well-formed proposition PR
   - Theme Genome Agent reviews for universal applicability

3. **System Evolution**
   - New variant added to Genesis Ontology
   - GENOME.md updated with design-driven evolution
   - Figma component library aligned with ontology

4. **Continuous Sync**
   - Design system and code ontology stay aligned
   - Semantic roles evolve together
   - Bidirectional traceability maintained

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

## 🎯 Future Enhancements

- **Automated token sync** - Webhook integration for design token updates
- **Bidirectional design updates** - Push code changes back to Figma
- **Visual regression testing** - Compare implementation to design specs
- **AI-powered semantic suggestions** - Auto-recommend ontological mappings
- **Design system analytics** - Track ontology usage and evolution patterns

---

**Status**: ✅ Active Integration  
**Maintainer**: ASI Saga Theme Genome Agent  
**Contact**: See [AGENTS.MD](./.github/AGENTS.MD) for agent ecosystem details
