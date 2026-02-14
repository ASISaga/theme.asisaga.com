# Skills Mapping to Agent Ecosystem

This document maps the Agent Skills to the corresponding agent prompts and instruction files in the repository.

## Skill to Prompt Mapping

Each skill corresponds to an agent defined in the ecosystem:

| Agent Skill | Related Prompt | Related Instructions | Purpose |
|-------------|----------------|---------------------|---------|
| **theme-genome-agent** | `.github/prompts/theme-genome-agent.prompt.md` | `.github/.github/docs/agent-philosophy.md` | Review and approve ontological propositions |
| **subdomain-evolution-agent** | `.github/prompts/subdomain-evolution-agent.prompt.md` | `.github/.github/docs/agent-philosophy.md` | Create ontological propositions from subdomains |
| **scss-refactor-agent** | `.github/prompts/scss-refactor-agent.prompt.md` | `.github/instructions/scss.instructions.md` | Migrate to ontological mixins |
| **html-template-agent** | N/A (instructions-based) | `.github/instructions/html.instructions.md` | Create semantic HTML templates |
| **responsive-design-agent** | `.github/prompts/responsive-design-agent.prompt.md` | `.github/instructions/scss.instructions.md` | Implement responsive patterns |
| **futuristic-effects-agent** | `.github/prompts/futuristic-effects-agent.prompt.md` | `.github/instructions/scss.instructions.md` | Apply advanced visual effects |
| **documentation-manager-agent** | N/A (instructions-based) | `.github/instructions/docs.instructions.md` | Validate and manage documentation quality |

## Architectural Alignment

### Three-Tier Architecture

Skills align with the Genesis three-tier architecture:

**Tier 1: Content (HTML)**
- Skill: `html-template-agent`
- Output: Semantic HTML5 with meaningful class names
- Principle: Defines WHAT the data is

**Tier 2: Interface (Ontological API)**
- Skills: `scss-refactor-agent`, `responsive-design-agent`, `futuristic-effects-agent`
- Output: SCSS using only Genesis mixins
- Principle: Defines the ROLE of content

**Tier 3: Engine (Visual Implementation)**
- Skills: `theme-genome-agent` (maintains), `subdomain-evolution-agent` (proposes)
- Output: Engine layer SCSS with raw CSS properties
- Principle: Defines the LOOK

### Evolutionary Handshake Protocol

Skills implement the Request-Classification-Review cycle:

1. **Identify Gap** → `subdomain-evolution-agent`
   - Discovers semantic patterns not in current ontology
   - Analyzes existing variants for redundancy
   - Formulates semantic propositions

2. **Submit PR** → `subdomain-evolution-agent`
   - Uses ontological proposition template
   - Provides use cases and justification
   - Submits to theme repository

3. **Review** → `theme-genome-agent`
   - Performs redundancy check
   - Assesses universal applicability
   - Makes approval decision

4. **Implement** → `theme-genome-agent`
   - Adds to engine layer if approved
   - Updates GENOME.md documentation
   - Notifies submitter

5. **Adopt** → `scss-refactor-agent`, `responsive-design-agent`, `futuristic-effects-agent`
   - Subdomains use new variants
   - Refactor existing code if applicable
   - Document usage patterns

## Skill Relationships

### Primary Flow

```
subdomain-evolution-agent
    ↓ (proposes)
theme-genome-agent
    ↓ (approves/implements)
scss-refactor-agent + responsive-design-agent + futuristic-effects-agent
    ↓ (adopt)
html-template-agent (creates structure)
```

### Collaboration Patterns

**For New Features:**
1. `html-template-agent` creates semantic HTML structure
2. `scss-refactor-agent` maps to ontological mixins
3. `responsive-design-agent` ensures mobile-first patterns
4. `futuristic-effects-agent` adds advanced visual effects
5. If gaps found → `subdomain-evolution-agent` proposes new variants

**For Legacy Migration:**
1. `html-template-agent` audits/refactors HTML for semantics
2. `scss-refactor-agent` converts raw CSS to ontological mixins
3. `responsive-design-agent` adds responsive enhancements
4. If semantic gaps → `subdomain-evolution-agent` proposes

**For System Evolution:**
1. `subdomain-evolution-agent` identifies pattern across subdomains
2. `theme-genome-agent` reviews for universal applicability
3. If approved → updates engine layer
4. All implementation skills adopt new variants

## Integration with Existing Documentation

Skills complement existing documentation:

- **.github/docs/agent-philosophy.md** (11.9 KB) - High-level agent ecosystem overview
- **AGENT-QUICK-REFERENCE.md** (11.9 KB) - Quick lookup for ontological categories
- **AGENT-WORKFLOWS.md** (15.6 KB) - Detailed workflow examples
- **agent-skill-spec.md** - Format specification for these skills

Skills provide:
- Executable instructions for AI agents
- Structured decision-making processes
- Concrete examples and patterns
- Validation criteria and checklists

## Usage Scenarios

### Scenario 1: New Subdomain Development

**Skills Used:**
1. `html-template-agent` - Create semantic page templates
2. `scss-refactor-agent` - Set up ontological SCSS structure
3. `responsive-design-agent` - Ensure mobile-first implementation
4. `futuristic-effects-agent` - Add brand-consistent effects

### Scenario 2: Ontological Gap Discovery

**Skills Used:**
1. `subdomain-evolution-agent` - Analyze gap and create proposition
2. `theme-genome-agent` - Review and decide on acceptance
3. (If approved) All implementation skills adopt new variant

### Scenario 3: Legacy Theme Migration

**Skills Used:**
1. `html-template-agent` - Audit and fix semantic HTML
2. `scss-refactor-agent` - Convert to zero-CSS ontological mixins
3. `responsive-design-agent` - Add responsive enhancements
4. `futuristic-effects-agent` - Modernize visual effects

### Scenario 4: Accessibility Audit

**Skills Used:**
1. `html-template-agent` - Check WCAG compliance, landmarks
2. `responsive-design-agent` - Verify touch targets, typography
3. `scss-refactor-agent` - Ensure semantic purity maintained

### Scenario 5: Documentation Quality Control

**Skills Used:**
1. `documentation-manager-agent` - Validate structure and organization
2. `documentation-manager-agent` - Check internal links
3. `documentation-manager-agent` - Detect redundancy
4. `documentation-manager-agent` - Validate metadata and archival

**Workflow:**
```bash
# Pre-commit workflow
./.github/skills/documentation-manager-agent/scripts/validate-doc-structure.sh
./.github/skills/documentation-manager-agent/scripts/validate-doc-links.sh docs/
./.github/skills/documentation-manager-agent/scripts/detect-doc-redundancy.sh
./.github/skills/documentation-manager-agent/scripts/check-doc-metadata.sh docs/specifications/
```


## Maintenance

### When to Update Skills

Update skills when:
- New ontological variants are added (update all implementation skills)
- Category structure changes (update theme-genome-agent, subdomain-evolution-agent)
- Design system version increments (update all skills)
- New responsive patterns emerge (update responsive-design-agent)
- Accessibility standards evolve (update html-template-agent, responsive-design-agent)

### Versioning

Skills follow semantic versioning aligned with Genesis Semantic Design System:

- **Major version**: Breaking changes to ontology architecture
- **Minor version**: New variants or categories added
- **Patch version**: Documentation improvements, bug fixes

Current: v2.0 (aligned with Genesis v2.0)

## References

- **Agent Ecosystem**: `.github/.github/docs/agent-philosophy.md`
- **Ontology Guide**: `_sass/ontology/INTEGRATION-GUIDE.md`
- **Evolution History**: `GENOME.md`
- **Prompts**: `.github/prompts/`
- **Instructions**: `.github/instructions/`

---

**Status**: Active  
**Version**: 2.0  
**Last Updated**: 2026-01-19
