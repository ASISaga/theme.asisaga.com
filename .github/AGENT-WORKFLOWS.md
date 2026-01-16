# 🔄 Agent Workflow Guide

**Version**: 1.0  
**Last Updated**: 2026-01-15  
**Audience**: AI Agents and Human Developers

This document provides comprehensive workflows for all agents in the Genesis Semantic Design System ecosystem.

---

## 📊 Workflow Overview

```
┌─────────────────────────────────────────────────────────────┐
│                   ASI Saga Agent Ecosystem                  │
│                                                             │
│  Subdomain          Theme Repository         Documentation │
│  Agents      ←→     Genome Agent      ←→     Maintenance   │
│     ↓                    ↓                         ↓        │
│  SCSS Refactor      Review & Merge         GENOME.md       │
│  HTML Template      Implement Engine       GUIDE Updates   │
│  JS Integration     Update Interface       Version Docs    │
└─────────────────────────────────────────────────────────────┘
```

---

## 🌱 Workflow 1: Subdomain Identifies Semantic Gap

**Trigger**: Developer encounters pattern not covered by existing ontology

### Phase 1: Local Analysis

**Agent**: Subdomain Evolution Agent

**Steps**:

1. **Identify the Need**
   ```
   Question: "What am I trying to represent?"
   Examples:
   - "Content that's calculating/uncertain"
   - "Historical/archived data"
   - "Social proof elements"
   - "Real-time collaborative presence"
   ```

2. **Review Existing Ontology**
   - Open `_sass/ontology/INTEGRATION-GUIDE.md`
   - Check all 31 variants across 6 categories
   - Review `GENOME.md` for usage examples

3. **Try Combination Approach**
   ```scss
   // Can I combine existing mixins?
   .my-element {
     @include genesis-entity('primary');
     @include genesis-state('evolving');
     @include genesis-atmosphere('vibrant');
   }
   ```

4. **Determine if Gap is Real**
   
   **Valid Gap Indicators**:
   - ✅ Semantic meaning not expressible with combinations
   - ✅ Pattern appears in multiple contexts
   - ✅ Other subdomains would likely need this
   - ✅ Represents information/interaction intent, not visual style

   **Not Valid**:
   - ❌ Just want different colors/sizes
   - ❌ One-off edge case for specific page
   - ❌ Can achieve with mixin combination
   - ❌ Purely visual preference

### Phase 2: Proposition Creation

**If genuine gap identified**:

5. **Draft Proposition**
   - Use template: `.github/PULL_REQUEST_TEMPLATE/ontological_proposition.md`
   - Follow guide: `.github/prompts/subdomain-evolution-agent.prompt.md`

6. **Required Elements**:
   ```markdown
   - Source Node: [subdomain name]
   - Intent: [One sentence - WHAT it represents]
   - Context: [2-3 sentences - WHY needed]
   - Category: [Which of 6 categories]
   - Suggested Label: `category('variant-name')`
   - Use Cases: [3+ concrete examples]
   - Universal Applicability: [How others use it]
   ```

7. **Self-Review Checklist**:
   - [ ] Describes semantic role, not visual style
   - [ ] Cannot achieve with existing combinations
   - [ ] Universal beyond my subdomain
   - [ ] Fits clearly into one category
   - [ ] Well documented with examples
   - [ ] No visual language (colors, sizes, etc.)

### Phase 3: Submission

8. **Create PR to Theme Repository**
   - Branch from theme repo or fork
   - Add label: `ontological-proposition`
   - Complete entire template
   - Submit for review

9. **Wait for Theme Agent Review**
   - Response typically within 1-3 days
   - May receive: Approval, Refinement Request, or Rejection with Guidance

---

## 🧬 Workflow 2: Theme Genome Agent Reviews Proposition

**Trigger**: PR labeled `ontological-proposition` submitted

**Agent**: Theme Genome Agent

### Phase 1: Initial Assessment

**Steps**:

1. **Read Proposition Completely**
   - Understand Intent (WHAT)
   - Understand Context (WHY)
   - Note proposed category and label

2. **Semantic Purity Check**
   
   **Red Flags** (Immediate Reject):
   - Contains color names, pixel values
   - Uses "modern", "clean", "pretty", etc.
   - Requests visual changes without semantic meaning
   - Poorly documented or vague

   **If Red Flags**: Use rejection template from `theme-genome-agent.prompt.md`

### Phase 2: Redundancy Analysis

3. **Check Existing Ontology**
   ```
   Question: "Can this be achieved with current variants?"
   
   Review:
   - All variants in proposed category
   - Combinations across categories
   - Similar patterns in GENOME.md
   ```

4. **Decision Point 1**:
   
   **If Covered by Existing**:
   - Deny PR kindly
   - Explain which mixins solve their need
   - Provide code example
   - Use "Covered by Existing" template

   **If NOT Covered**:
   - Continue to Generalization Check

### Phase 3: Generalization Analysis

5. **Assess Universal Applicability**
   ```
   Questions:
   - Would 3+ subdomains use this?
   - Is this ASI-ecosystem universal or edge case?
   - Does it represent information architecture or implementation detail?
   ```

6. **Decision Point 2**:
   
   **If Universal**:
   - Plan to add to global interface
   - Continue to Refactoring Check

   **If Domain-Specific but Valid**:
   - Consider sub-species variant in engine
   - Mark as specialized use case
   - Document clearly

   **If Too Specific**:
   - Reject with guidance
   - Suggest alternative approaches

### Phase 4: Ontological Refactoring Check

7. **Evaluate System Impact**
   ```
   Questions:
   - Does this reveal bloat in existing category?
   - Should similar variants be merged?
   - Would splitting category improve clarity?
   - Does this suggest new category needed?
   ```

8. **Decision Point 3**:
   
   **If Refactoring Needed**:
   - Plan broader changes
   - Ensure backward compatibility
   - Document migration path

   **If Clean Addition**:
   - Proceed to implementation

### Phase 5: Implementation & Documentation

9. **Update Engine** (`_sass/ontology/_engines.scss`)
   ```scss
   /**
    * @param $[parameter] [new-variant]
    * ORIGIN: PR #XX ([subdomain].asisaga.com)
    * INTENT: [One-line purpose]
    * EVOLUTION: [Initial implementation]
    * @since vX.X.X
    */
   @if $[parameter] == 'new-variant' {
     // Implementation with semantic comments
   }
   ```

10. **Update Interface** (`_sass/ontology/_interface.scss`)
    - Add to parameter documentation
    - Include usage example
    - Note relationships to other variants

11. **Update INTEGRATION-GUIDE.md**
    - Add to appropriate category section
    - Provide complete example
    - Explain when to use vs. alternatives

12. **Update GENOME.md**
    ```markdown
    ## vX.X - Variant Name (YYYY-MM)
    
    ### New Variants
    - `category('variant')` - PR #XX from [subdomain]
      - **Why**: [Semantic gap description]
      - **Impact**: [Expected adoption]
    ```

13. **Version Bump & Changelog**
    - Minor version: New variants (v2.1.0)
    - Patch version: Bug fixes (v2.0.1)
    - Major version: Breaking changes (v3.0.0)

14. **Merge PR**
    - Use "Approved" template in PR comment
    - Merge to main
    - Tag release if appropriate
    - Close PR with summary

### Phase 6: Post-Merge

15. **Monitor Adoption**
    - Watch for subdomains using new variant
    - Track issues or questions
    - Gather feedback for future refinements

16. **Update Metrics** (in GENOME.md)
    - Document adoption rate
    - Note any unexpected uses
    - Record feedback themes

---

## 🔄 Workflow 3: SCSS Refactor (Legacy to Ontology)

**Trigger**: Need to migrate existing CSS to ontological system

**Agent**: SCSS Refactor Agent

### Phase 1: Preparation

**Steps**:

1. **Audit HTML Structure**
   - Note all classes and hierarchy
   - Identify semantic purpose of each element
   - Document any complex interactions

2. **Analyze Current CSS**
   - What visual styles are applied?
   - What's the intended meaning?
   - Are there any one-off hacks?

3. **Review Ontology Options**
   - Study all 31 variants
   - Plan mixin combinations
   - Note any potential gaps

### Phase 2: Classification

4. **Classify Each HTML Element**
   
   **Create mapping table**:
   ```
   Class Name         → Semantic Role      → Ontological Mixin
   .article-grid      → Layout grid        → genesis-environment('distributed')
   .article-card      → Content block      → genesis-entity('primary')
   .article-title     → Headline           → genesis-cognition('axiom')
   .article-date      → Metadata           → genesis-cognition('gloss')
   .read-more         → Navigation link    → genesis-synapse('navigate')
   ```

### Phase 3: Implementation

5. **Create New SCSS File**
   ```scss
   ---
   ---
   @import "ontology/index";
   
   // Mapped classes below
   ```

6. **Build Mirrored Structure**
   - Match HTML hierarchy exactly
   - Use nesting to show relationships
   - Apply ontological mixins

7. **Purge Raw CSS**
   - Remove ALL raw properties
   - Remove ALL old imports
   - Remove ALL variables
   - Keep ONLY mixin calls

### Phase 4: Verification

8. **Run Verification Checklist**
   - [ ] Only `@import "ontology/index";`
   - [ ] Zero raw CSS properties
   - [ ] No pixel/color values
   - [ ] Structure mirrors HTML
   - [ ] HTML unchanged

9. **Visual Testing**
   - Load page in browser
   - Compare to original appearance
   - Test responsive behavior
   - Check accessibility

10. **Identify Any Gaps**
    - Document patterns not mappable
    - Consider if gaps are genuine
    - Propose to Theme Agent if needed

### Phase 5: Finalization

11. **Documentation**
    ```scss
    /**
     * Refactored: [Date]
     * From: Legacy CSS
     * To: Genesis Ontology v2.0
     * Agent: SCSS Refactor Agent
     */
    ```

12. **Commit & Deploy**
    - Clear commit message
    - Note any visual changes
    - Update any related docs

---

## 🎯 Workflow 4: Validation & Quality Assurance

**Trigger**: Pre-deployment validation needed

**Agent**: Any agent performing final checks

### Pre-Commit Validation

**For Subdomain SCSS**:

```bash
# Checklist
✓ Import only ontology/index
✓ Zero raw CSS properties
✓ All classes mapped to mixins
✓ Structure mirrors HTML
✓ Visual fidelity maintained
✓ Accessibility preserved
```

**For Theme Engine**:

```bash
# Checklist
✓ Interface layer has no CSS properties
✓ Engine has all implementations
✓ Documentation updated (GENOME.md, INTEGRATION-GUIDE.md)
✓ Comments include PR origin
✓ Backward compatibility maintained
✓ Accessibility compliance (WCAG AA)
```

### Testing Protocol

**Visual Regression**:
1. Screenshot before changes
2. Screenshot after changes
3. Compare side-by-side
4. Note any differences

**Accessibility Testing**:
1. Screen reader navigation
2. Keyboard-only interaction
3. Color contrast ratios
4. Focus indicators visible

**Responsive Testing**:
1. Test at 375px (mobile)
2. Test at 768px (tablet)
3. Test at 1440px (desktop)
4. Test at 1920px+ (wide)

**Browser Testing**:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## 📚 Workflow 5: Documentation Maintenance

**Trigger**: Any ontological change

**Agent**: Theme Genome Agent or Documentation Maintainer

### Required Updates

**For New Variants**:

1. **GENOME.md**
   - Add to variant registry
   - Document origin and intent
   - Track adoption metrics

2. **INTEGRATION-GUIDE.md**
   - Add to appropriate category
   - Include usage examples
   - Explain when to use

3. **_interface.scss**
   - Update parameter documentation
   - Add inline code examples

4. **_engines.scss**
   - Implement with full doc comments
   - Reference originating PR

**For Refactorings**:

1. **GENOME.md**
   - Document in "Refactorings" section
   - Explain reasoning
   - Note affected subdomains

2. **Migration Guide**
   - Create if breaking change
   - Provide before/after examples
   - List affected variants

3. **Changelog**
   - Version bump
   - Clear description
   - Migration instructions

---

## 🚨 Emergency Workflows

### Workflow 6: Reverting Bad Merge

**If problematic variant was merged**:

1. **Assessment**
   - What broke?
   - How many subdomains affected?
   - Can we fix forward or must revert?

2. **Communication**
   - Create issue documenting problem
   - Notify affected subdomains
   - Propose solution

3. **Resolution**
   - Fix forward if possible (patch release)
   - Revert if necessary (with migration guide)
   - Update documentation
   - Learn and document in GENOME.md

### Workflow 7: Subdomain Bypassed System

**If subdomain committed raw CSS**:

1. **Detection**
   - Code review caught it
   - Agent noticed in audit
   - Build warnings triggered

2. **Education**
   - Create issue (kind, educational tone)
   - Link to relevant documentation
   - Offer to help with refactor

3. **Remediation**
   - Work with subdomain to refactor
   - Use SCSS Refactor Agent
   - Document in GENOME.md as lesson learned

---

## 🎓 Training Workflows

### For New Agents

**Onboarding Sequence**:

1. **Week 1**: Read all documentation
   - AGENTS.MD
   - GENOME.md
   - INTEGRATION-GUIDE.md
   - All instruction files

2. **Week 2**: Shadow reviews
   - Observe existing PR reviews
   - Study approved propositions
   - Understand rejection reasoning

3. **Week 3**: Practice refactors
   - Take sample legacy CSS
   - Convert to ontology
   - Get feedback from senior agent

4. **Week 4**: Supervised work
   - Review PRs with oversight
   - Perform refactors with review
   - Ask questions liberally

---

## 📊 Metrics & Monitoring

### Key Performance Indicators

**System Health**:
- % of subdomain SCSS with zero raw CSS
- Average time from PR to merge
- Acceptance vs. rejection rate
- Variant usage distribution

**Quality Metrics**:
- Documentation completeness
- Accessibility compliance rate
- Visual regression incidents
- Performance benchmarks

**Growth Metrics**:
- New variants per quarter
- Subdomain adoption rate
- Refactoring completions
- Community satisfaction

---

## 🔗 Quick Reference Links

**Core Documents**:
- [AGENTS.MD](AGENTS.MD) - Agent ecosystem
- [GENOME.md](../GENOME.md) - Evolutionary history
- [Evolution Philosophy](../evolution.md) - Foundational concepts

**Agent Prompts**:
- [Theme Genome Agent](prompts/theme-genome-agent.prompt.md)
- [Subdomain Evolution Agent](prompts/subdomain-evolution-agent.prompt.md)
- [SCSS Refactor Agent](prompts/scss-refactor-agent.prompt.md)

**Templates**:
- [Ontological Proposition PR](PULL_REQUEST_TEMPLATE/ontological_proposition.md)

**Instructions**:
- [SCSS Instructions](instructions/scss.instructions.md)
- [HTML Instructions](instructions/html.instructions.md)
- [JS Instructions](instructions/js.instructions.md)

---

**Version**: 1.0  
**Maintained By**: Theme Genome Agent  
**Review Cadence**: Quarterly  
**Last Review**: 2026-01-15

*Workflows evolve with the system. Always use latest version.*
