# Responsive-Design-Agent Internal Configuration

**Agent ID**: `responsive-design-agent`  
**Version**: 2.3.1  
**Category**: Design System  
**Role**: Mobile-First Specialist  
**Status**: Active  
**Last Updated**: 2026-02-10

---

## Agent Identity

### Primary Function
Implements mobile-first responsive patterns using Genesis Ontological mixins. Ensures WCAG 2.5.5 touch targets, fluid typography, and container queries.

### Scope
- Responsive design patterns
- Mobile-first implementation
- Touch target validation
- `**/*.scss` files

### Activation Triggers
- Responsive implementation needed
- Mobile-first patterns required
- Touch target violations detected
- Accessibility enhancements for mobile

---

## Context Requirements

### Token Budget
- **Optimal**: 45,000 tokens
- **Maximum**: 90,000 tokens
- **Typical Usage**: 30,000-60,000 tokens

### Dependencies
- `theme-genome-agent` (responsive ontological variants)
- Responsive design specifications
- Accessibility standards (WCAG 2.5.5)

### Required Tools
- `bash` - Sass compilation
- `sass` - Responsive pattern compilation
- `read` - Analyze existing patterns
- `edit` - Apply responsive mixins

---

## Coordination Metadata

### Routing Priority
**High** - Critical for mobile UX

### Handoff Protocols

**Receives From**:
- `scss-refactor-agent` (ontological SCSS ready)
- `html-template-agent` (semantic structure)

**Hands Off To**:
- `futuristic-effects-agent` (visual effects on responsive base)

### Responsive Implementation Workflow
1. Analyze component structure
2. Apply mobile-first ontological mixins
3. Validate touch targets (≥44px)
4. Implement fluid typography
5. Add container queries if needed
6. Test across viewport sizes (375px, 768px, 1440px)

---

## Performance Characteristics

### Speed
- **Single Component**: 10-20 minutes
- **Full Page**: 30-60 minutes
- **Touch Target Audit**: 5-15 minutes

### Accuracy
- **Mobile-First**: 95%
- **Touch Target Compliance**: 100% (enforced)
- **Fluid Typography**: 90%

### Resource Usage
- **Memory**: 300-500 MB
- **Disk I/O**: Moderate
- **CPU**: Moderate

---

## Configuration Overrides

### Feature Flags
```yaml
responsive-design-agent:
  enabled: true
  features:
    mobile_first_enforcement: true
    touch_target_validation: true
    fluid_typography: true
    container_queries: true
    dynamic_viewport_units: true
    reduced_motion_support: true
  limits:
    min_touch_target_px: 44
    max_breakpoints: 5
  safeguards:
    enforce_mobile_first: true
    require_reduced_motion: true
    validate_touch_targets: true
```

### Quality Thresholds
- **Touch Targets**: ≥44px (WCAG 2.5.5)
- **Mobile-First**: Required
- **Fluid Typography**: clamp() values
- **Reduced Motion**: Always respect prefers-reduced-motion

---

## Cross-References

### Related Files
- **Prompt**: `.github/prompts/responsive-design-agent.prompt.md`
- **Skill**: `.github/skills/responsive-design-agent/SKILL.md`
- **Capabilities**: `.github/agents/agent-capabilities.yml` (lines 197-222)
- **Routing**: `.github/agents/agent-routing.yml` (lines 28-34)
- **Handoffs**: `.github/agents/agent-handoff.yml` (lines 101-116)

### Documentation
- `/docs/specifications/responsive-design.md` - Patterns
- `/docs/specifications/accessibility.md` - Touch targets
- `.github/skills/responsive-design-agent/references/LAYOUT-PATTERNS.md`

---

## Historical Context

### Achievements
- 100% touch target compliance across all components
- Mobile-first implementation standard
- Fluid typography system adopted

### Lessons Learned
1. **Mobile First Always**: Design for 375px first
2. **Touch Targets**: 44px minimum (not 40px)
3. **Reduced Motion**: Respect user preferences
4. **Container Queries**: Better than media queries for components

### Common Pitfalls
- Desktop-first approach (reverse workflow)
- Touch targets <44px
- Forgetting reduced-motion alternatives
- Over-reliance on media queries

---

## Agent-Specific Notes

### Unique Capabilities
- **Mobile-First Expertise**: Viewport-first thinking
- **Touch Target Authority**: WCAG 2.5.5 compliance
- **Fluid Systems**: Responsive typography and spacing

### Test Viewports
- **Mobile**: 375px × 667px (iPhone SE)
- **Tablet**: 768px × 1024px (iPad)
- **Desktop**: 1440px × 900px (Standard)

---

**Access Level**: Code Modification  
**Protected**: Yes - Configuration metadata only  
**Maintainer**: UX/Responsive Team  
**Review Frequency**: Per component
