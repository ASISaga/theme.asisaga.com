---
name: Ontological Proposition
about: Propose a new semantic variant or refinement to the Genesis Ontology
title: '[ONTOLOGY] '
labels: ontological-proposition
assignees: ''
---

# 🧩 Ontological Proposition

**Source Node**: [e.g., subdomain-name.asisaga.com]

## Intent (The 'What')

> **One sentence** describing the semantic role or pattern this addresses.

[Describe the semantic role clearly and concisely]

## Context (The 'Why')

> **2-3 sentences** explaining why the current ontology doesn't cover this need and what gap it fills.

[Explain the semantic gap - why existing mixins or combinations don't address this]

---

## 🔭 Proposed Role

- **Category**: [ ] Environment | [ ] Entity | [ ] Cognition | [ ] Synapse | [ ] State | [ ] Atmosphere
- **Suggested Label**: `[category]('[variant-name]')`
- **Relationship to Existing**: [How does this relate to current variants?]

---

## 📋 Use Cases

> **List 3+ concrete examples** where this variant would be used.

1. **In my subdomain**: [Specific example from your context]
2. **Universal scenario 1**: [How other subdomains might use this]
3. **Universal scenario 2**: [Another cross-domain use case]

---

## 🌐 Universal Applicability

> **Demonstrate this is not subdomain-specific.**

**Potential users across ecosystem**:
- **Research subdomain**: [How they'd use it]
- **Documentation subdomain**: [How they'd use it]
- **Analytics subdomain**: [How they'd use it]
- **Community subdomain**: [How they'd use it]

---

## 💡 Suggested Implementation (Optional)

> **Conceptual only** - Theme Agent controls actual CSS implementation.

```scss
// Conceptual semantic purpose (not actual CSS):
@if $[parameter] == '[variant-name]' {
  // Purpose: [What this achieves semantically]
  // Example visual direction: [Optional suggestion, but not prescriptive]
}
```

---

## ✅ Validation Checklist

**Before submitting, confirm**:

- [ ] **Semantic, not visual**: Describes WHAT/WHY, not HOW it looks
- [ ] **No redundancy**: Cannot be achieved with existing mixin combinations
- [ ] **Universal scope**: Useful beyond my specific page/subdomain
- [ ] **Proper category fit**: Clearly belongs to one of the 6 categories
- [ ] **Well documented**: Includes concrete examples and use cases
- [ ] **No visual language**: Avoids color names, pixel values, "modern", etc.
- [ ] **Reviewed existing**: I've consulted INTEGRATION-GUIDE.md for existing variants
- [ ] **Tried combinations**: I've attempted to solve with mixin combinations first

---

## 📚 Supporting Information

**Reference materials**:
- Related issue: [#issue-number if applicable]
- Example implementation: [Link to your subdomain branch if available]
- Visual mockup: [Only if it clarifies semantic intent, not as requirement]

**Additional context**:
[Any other information that helps understand the semantic need]

---

## 🤔 Review Considerations

**For Theme Genome Agent**:

Questions I've considered:
- Could `[existing-variant]` be used instead? [Your analysis]
- Could combining `[mixin-1]` + `[mixin-2]` work? [Why not]
- Is this truly universal or edge case? [Your reasoning]

Open questions:
- [Any uncertainties about category placement?]
- [Any concerns about naming?]
- [Any implementation considerations?]

---

**Submission Date**: [YYYY-MM-DD]  
**Ontology Version**: [Current version if known]  
**Submitter**: [@github-username]

---

<!-- 
This template ensures high-quality ontological propositions.
Theme Genome Agent will review based on:
1. Semantic clarity and purity
2. Universal applicability
3. Non-redundancy with existing ontology
4. Proper documentation and examples

For guidance, see:
- .github/agent system documentation - Agent ecosystem
- _sass/ontology/INTEGRATION-GUIDE.md - Complete API
- .github/prompts/subdomain-evolution-agent.prompt.md - Submission guide
-->
