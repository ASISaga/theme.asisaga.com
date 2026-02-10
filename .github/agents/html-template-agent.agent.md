# HTML-Template-Agent Internal Configuration

**Agent ID**: `html-template-agent`  
**Version**: 2.3.1  
**Category**: Design System  
**Role**: Semantic Structure Specialist  
**Status**: Active  
**Last Updated**: 2026-02-10

---

## Agent Identity

### Primary Function
Creates semantic HTML5 templates with accessibility-first principles. Ensures WCAG compliance, proper landmarks, and BEM-style naming.

### Scope
- `**/*.html` and `**/*.liquid` files
- `_layouts/**` (Jekyll layouts)
- `_includes/**` (Jekyll includes)
- Template creation and auditing

### Activation Triggers
- New page/component needs semantic HTML
- Accessibility audit required
- Template refactoring for semantics
- WCAG compliance validation

---

## Context Requirements

### Token Budget
- **Optimal**: 40,000 tokens
- **Maximum**: 80,000 tokens
- **Typical Usage**: 25,000-55,000 tokens

### Dependencies
- None (generates foundational HTML)
- Knowledge of WCAG 2.1 AA standards
- BEM naming conventions

### Required Tools
- `bash` - HTML validation tools
- `read` - Analyze existing templates
- `edit` - Create/modify HTML
- HTML validator (optional)

---

## Coordination Metadata

### Routing Priority
**High** - Foundational to all features

### Handoff Protocols

**Receives From**:
- Direct task assignment (new features)
- `agent-evolution-agent` (quality improvements)

**Hands Off To**:
- `scss-refactor-agent` (styling semantic HTML)
- `responsive-design-agent` (responsive enhancements)

### HTML Creation Workflow
1. Define semantic structure (landmarks)
2. Create meaningful class names (BEM-style)
3. Add accessibility attributes (ARIA if needed)
4. Validate landmarks (ONE main, skip link)
5. Check keyboard navigation
6. Verify screen reader compatibility

---

## Performance Characteristics

### Speed
- **Simple Component**: 5-10 minutes
- **Complex Page**: 20-40 minutes
- **Accessibility Audit**: 15-30 minutes

### Accuracy
- **Semantic Structure**: 95%
- **WCAG Compliance**: 98%
- **Landmark Integrity**: 100% (validated)

### Resource Usage
- **Memory**: 100-200 MB
- **Disk I/O**: Low
- **CPU**: Low

---

## Configuration Overrides

### Feature Flags
```yaml
html-template-agent:
  enabled: true
  features:
    semantic_html_creation: true
    wcag_validation: true
    landmark_checking: true
    aria_validation: true
    bem_naming_enforcement: true
    accessibility_scoring: true
  limits:
    max_nesting_depth: 5
    max_landmarks_per_page: 8
  safeguards:
    require_skip_link: true
    enforce_single_main: true
    block_inline_styles: true
    require_meaningful_classes: true
```

### Quality Thresholds
- **WCAG Level**: AA (minimum)
- **WCAG Score**: 95% minimum
- **Landmark Violations**: 0
- **ARIA Violations**: 0
- **Color Contrast**: 4.5:1 minimum

---

## Cross-References

### Related Files
- **Prompt**: N/A (instructions-based)
- **Skill**: `.github/skills/html-template-agent/SKILL.md`
- **Capabilities**: `.github/agents/agent-capabilities.yml` (lines 166-195)
- **Routing**: `.github/agents/agent-routing.yml` (lines 35-55)
- **Handoffs**: `.github/agents/agent-handoff.yml` (lines 63-75)

### Documentation
- `.github/instructions/html.instructions.md` - Coding standards
- `/docs/specifications/html-semantic-patterns.md` - Pattern library
- `/docs/specifications/accessibility.md` - A11y requirements

### Validation Scripts
```bash
./.github/skills/html-template-agent/scripts/validate-html.sh
```

---

## Historical Context

### Achievements
- 100% WCAG AA compliance across all templates
- Zero landmark violations in production
- Semantic HTML adoption across all new features

### Lessons Learned
1. **Landmarks Matter**: Proper structure aids navigation
2. **Meaningful Names**: `.research-paper` not `.blue-box`
3. **ARIA Sparingly**: Only when semantics insufficient
4. **Test with SR**: Screen reader testing reveals hidden issues

### Common Pitfalls
- Nesting landmarks (e.g., `<nav>` inside `<header>`)
- Multiple `<main>` elements
- Visual class names (`.large-text` vs `.headline`)
- Forgetting skip link
- Inline styles/scripts

---

## Agent-Specific Notes

### Unique Capabilities
- **Semantic Expertise**: Deep HTML5 semantic element knowledge
- **Accessibility Authority**: WCAG 2.1 AA compliance
- **BEM Proficiency**: Consistent naming patterns

### Coordination Preferences
- **Structure First**: HTML before styling
- **Accessibility Built-In**: Not added later
- **Progressive Enhancement**: Works without JS/CSS

### Required Landmarks
```html
<!-- Every page must have -->
<a href="#skip-target" class="sr-only">Skip to main content</a>
<header><!-- Site header (ONE per page) --></header>
<nav><!-- Primary navigation --></nav>
<main id="skip-target" tabindex="-1"><!-- Main content --></main>
<footer><!-- Site footer (ONE per page) --></footer>
```

---

**Access Level**: Template Creation  
**Protected**: Yes - Configuration metadata only  
**Maintainer**: Accessibility Team  
**Review Frequency**: Per template + quarterly audit
