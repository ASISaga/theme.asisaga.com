# Agent Workflow Guide

**Last Updated**: 2026-02-14  
**Audience**: AI Agents and Human Developers

Core workflows for the Genesis Semantic Design System agent ecosystem.

---

## Workflow Overview

```
Subdomain Agents  ←→  Theme Genome Agent  ←→  Documentation
     ↓                      ↓                       ↓
SCSS Refactor          Review & Merge          GENOME.md
HTML Template          Implement Engine        Guide Updates
```

---

## Workflow 1: Ontological Evolution

**Trigger**: Developer encounters a semantic pattern not covered by existing ontology.

### Phase 1: Gap Identification

**Agent**: Subdomain Evolution Agent

1. **Identify the need** - Ask: "What am I trying to represent semantically?"

2. **Review existing ontology** - Check all 31 variants in `_sass/ontology/INTEGRATION-GUIDE.md` and `/docs/specifications/scss-ontology-system.md`.

3. **Try combinations first**:
   ```scss
   .my-element {
     @include genesis-entity('primary');
     @include genesis-state('evolving');
     @include genesis-atmosphere('vibrant');
   }
   ```

4. **Determine if gap is real**:
   - Valid: Semantic meaning not expressible with combinations, appears in multiple contexts, universal across subdomains, represents intent not visual style
   - Not valid: Just wants different colors/sizes, one-off edge case, achievable with mixin combination, purely visual preference

### Phase 2: Proposition Creation

5. **Draft proposition** using template from `.github/PULL_REQUEST_TEMPLATE/ontological_proposition.md`:
   ```markdown
   - Source Node: [subdomain name]
   - Intent: [One sentence - WHAT it represents]
   - Context: [2-3 sentences - WHY needed]
   - Category: [Which of 6 categories]
   - Suggested Label: `category('variant-name')`
   - Use Cases: [3+ concrete examples]
   - Universal Applicability: [How others use it]
   ```

6. **Self-review checklist**:
   - [ ] Describes semantic role, not visual style
   - [ ] Cannot achieve with existing combinations
   - [ ] Universal beyond my subdomain
   - [ ] Fits clearly into one category
   - [ ] No visual language (colors, sizes, etc.)

### Phase 3: Submission & Review

7. **Create PR** to theme repository with label `ontological-proposition`.

8. **Theme Genome Agent reviews** (see review workflow below).

### Phase 4: Theme Genome Agent Review Process

**Agent**: Theme Genome Agent

1. **Semantic purity check** - Reject immediately if: contains color/pixel values, uses "modern"/"clean"/"pretty", requests visual changes without semantic meaning.

2. **Redundancy analysis** - Can this be achieved with current variants or combinations? If yes, deny with code example showing how.

3. **Generalization check** - Would 3+ subdomains use this? Is it universal or an edge case? Reject if too specific.

4. **System impact assessment** - Does this reveal bloat? Should similar variants be merged? Is a new category needed?

### Phase 5: Implementation

If approved, the Theme Genome Agent:

1. **Updates engine** (`_sass/ontology/_engines.scss`) with full doc comments including PR origin and intent.
2. **Updates interface** (`_sass/ontology/_interface.scss`) with parameter docs.
3. **Updates INTEGRATION-GUIDE.md** with usage examples.
4. **Updates GENOME.md** with evolution history.
5. **Version bumps**: Minor for new variants, patch for fixes, major for breaking changes.
6. **Merges PR** and tags release.

---

## Workflow 2: SCSS Refactoring (Legacy to Ontology)

**Trigger**: Need to migrate existing CSS to ontological system.  
**Agent**: SCSS Refactor Agent

### Step 1: Audit

- Note all HTML classes and their semantic purpose
- Analyze current CSS for intended meaning
- Review ontology options and plan mixin combinations

### Step 2: Classify

Create a mapping table:
```
Class Name         -> Semantic Role      -> Ontological Mixin
.article-grid      -> Layout grid        -> genesis-environment('distributed')
.article-card      -> Content block      -> genesis-entity('primary')
.article-title     -> Headline           -> genesis-cognition('axiom')
.article-date      -> Metadata           -> genesis-cognition('gloss')
.read-more         -> Navigation link    -> genesis-synapse('navigate')
```

### Step 3: Implement

Build new SCSS mirroring HTML structure with only mixin calls. Remove all raw CSS properties, imports, and variables.

### Step 4: Verify

- [ ] Zero raw CSS properties
- [ ] No pixel/color values
- [ ] Structure mirrors HTML
- [ ] HTML unchanged
- Run: `npm run test:scss && npm run lint:scss`

### Step 5: Test & Document

- Visual comparison with original
- Responsive testing at 375px, 768px, 1440px
- Document any unmappable patterns (potential ontological gaps)

---

## Workflow 3: Validation & Quality Assurance

**Trigger**: Pre-deployment validation.

### Pre-Commit Checklists

**Subdomain SCSS**:
- Import only `ontology/index`
- Zero raw CSS properties
- All classes mapped to mixins
- Structure mirrors HTML
- Accessibility preserved

**Theme Engine**:
- Interface layer has no CSS properties
- Engine has all implementations
- Documentation updated (GENOME.md, INTEGRATION-GUIDE.md)
- Comments include PR origin
- Backward compatibility maintained

### Testing Protocol

```bash
npm run test:scss    # Compilation check
npm run lint:scss    # Style compliance
npm test             # Full validation
```

**Responsive**: Test at 375px, 768px, 1440px, 1920px+  
**Accessibility**: Screen reader, keyboard-only, color contrast, focus indicators  
**Browsers**: Chrome, Firefox, Safari, Edge (latest)

---

## Workflow 4: Documentation Maintenance

**Trigger**: Any ontological change.

**For new variants**, update:
1. `GENOME.md` - Variant registry with origin and intent
2. `_sass/ontology/INTEGRATION-GUIDE.md` - Usage examples
3. `_sass/ontology/_interface.scss` - Parameter documentation
4. `_sass/ontology/_engines.scss` - Implementation with doc comments

**For breaking changes**, also create a migration guide with before/after examples.

---

## Practical Example: Adding "Ancestral" Entity Variant

This end-to-end example shows the ontological evolution workflow.

### Scenario

`docs.asisaga.com` needs to mark old API versions visually while keeping them accessible. `state('deprecated')` implies "don't use," but archived docs are still valid references.

### Gap Analysis

Review `/docs/specifications/scss-ontology-system.md`:
- `state('deprecated')` - Too negative, implies broken
- `state('stable')` - Doesn't convey historical nature
- `entity('latent')` - Wrong category
- **Conclusion**: Gap exists for representing historical content

### Proposition PR

```markdown
## Ontological Proposition

**Source Node**: docs.asisaga.com
**Intent**: Represent archived/historical content
**Context**: Old documentation should remain accessible but clearly marked
as historical. Current options don't convey "valid but old" status.

**Type**: Entity
**Suggested Label**: `entity('ancestral')`

**Use Cases**:
1. Old API version documentation (still functional)
2. Historical blog posts or announcements
3. Archived project documentation

**Universal Applicability**:
- Research subdomain: Past experiments and results
- Analytics subdomain: Historical data visualizations
- Blog: Archive section
```

### Review Outcome

Theme Genome Agent evaluates:
- Redundancy: Not covered by `state('deprecated')` (different meaning) or `entity('latent')` (latent = low priority, not historical)
- Generalization: Universal pattern - all sites have historical content
- Semantic: Represents "content from the past, valid but not current"
- **Decision: APPROVE**

### Implementation

Engine addition in `_sass/ontology/_engines.scss`:
```scss
/**
 * @category Entity
 * @variant 'ancestral'
 * @origin PR #145 (docs.asisaga.com)
 * @intent Represent historical/archived content
 * @since 2.8.0
 */
@if $nature == 'ancestral' {
  opacity: 0.7;
  filter: grayscale(0.3);
  border-color: var(--border-muted);
  background-color: var(--background-muted);
}
```

### Subdomain Adoption

```scss
// _sass/main.scss at docs.asisaga.com
.archived-doc {
  @include genesis-entity('ancestral');
  @include genesis-cognition('discourse');
}
```

---

## Rejection Example: Visual-Only Request

**Submitted**: "Make cards have rounded corners of 24px instead of 12px"

**Why rejected**: This is a visual implementation detail, not a semantic meaning. Border radius is controlled by design tokens in `_sass/ontology/_variables.scss`.

**Guidance provided**: Reframe as semantic need. Instead of "cards need bigger border radius," try "we need to represent highlighted community posts with more visual prominence than standard posts." Then review existing entity variants (`primary`, `secondary`, `imperative`) for combinations that may already solve the need.

---

## References

- `.github/docs/agent-philosophy.md` - Agent ecosystem architecture
- `GENOME.md` - Evolutionary history
- `/docs/specifications/scss-ontology-system.md` - Complete variant reference
- `.github/prompts/theme-genome-agent.prompt.md` - Theme review agent
- `.github/prompts/subdomain-evolution-agent.prompt.md` - Proposition creation agent
- `.github/prompts/scss-refactor-agent.prompt.md` - Refactoring agent
- `.github/instructions/scss.instructions.md` - SCSS coding standards
