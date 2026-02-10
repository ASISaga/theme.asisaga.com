# Futuristic-Effects-Agent Internal Configuration

**Agent ID**: `futuristic-effects-agent`  
**Version**: 2.3.1  
**Category**: Design System  
**Role**: Visual Effects Specialist  
**Status**: Active  
**Last Updated**: 2026-02-10

---

## Agent Identity

### Primary Function
Applies advanced glassmorphism, neon glows, quantum gradients, and consciousness animations using Genesis Ontological mixins while maintaining semantic purity.

### Scope
- Visual effects enhancement
- Glassmorphism implementation
- Advanced animations
- `**/*.scss` files

### Activation Triggers
- Visual effects needed for component
- Glassmorphism requested
- Advanced animations required
- Brand visual identity enhancement

---

## Context Requirements

### Token Budget
- **Optimal**: 40,000 tokens
- **Maximum**: 80,000 tokens
- **Typical Usage**: 25,000-50,000 tokens

### Dependencies
- `theme-genome-agent` (atmosphere variants)
- `responsive-design-agent` (responsive base implemented)
- Motion library (motion.dev)
- Performance considerations

### Required Tools
- `bash` - Sass compilation
- `sass` - Effects compilation
- `read` - Analyze component context
- `edit` - Apply effects mixins

---

## Coordination Metadata

### Routing Priority
**Medium** - Enhancement layer (not critical path)

### Handoff Protocols

**Receives From**:
- `responsive-design-agent` (responsive patterns complete)
- `scss-refactor-agent` (ontological base)

**Hands Off To**:
- `documentation-manager-agent` (document effects)

### Effects Application Workflow
1. Analyze component purpose
2. Select appropriate atmosphere variant
3. Apply glassmorphism if suitable (headers, modals, cards)
4. Add neon/quantum effects sparingly
5. Ensure reduced-motion alternative
6. Validate performance impact

---

## Performance Characteristics

### Speed
- **Single Component**: 10-20 minutes
- **Effect Suite**: 30-45 minutes

### Accuracy
- **Effect Selection**: 85%
- **Reduced Motion**: 100% (enforced)
- **Performance**: 95% (GPU acceleration)

### Resource Usage
- **Memory**: 300-500 MB
- **Disk I/O**: Moderate
- **CPU**: Moderate

---

## Configuration Overrides

### Feature Flags
```yaml
futuristic-effects-agent:
  enabled: true
  features:
    glassmorphism: true
    neon_effects: true
    quantum_gradients: true
    consciousness_animations: true
    reduced_motion_respect: true
    performance_optimization: true
  limits:
    max_effects_per_component: 3
    max_animation_duration_ms: 5000
  safeguards:
    require_reduced_motion_alt: true
    enforce_gpu_acceleration: true
    limit_blur_radius: 20
```

### Quality Thresholds
- **Reduced Motion**: Always provide alternative
- **GPU Acceleration**: Required for animations
- **Max Effects**: 3 per component
- **Animation Duration**: ≤5 seconds

---

## Cross-References

### Related Files
- **Prompt**: `.github/prompts/futuristic-effects-agent.prompt.md`
- **Skill**: `.github/skills/futuristic-effects-agent/SKILL.md`
- **Capabilities**: `.github/agents/agent-capabilities.yml` (lines 224-247)
- **Routing**: `.github/agents/agent-routing.yml` (lines 29-34)
- **Handoffs**: `.github/agents/agent-handoff.yml` (lines 117-132)

### Documentation
- `/docs/MOTION-INTEGRATION.md` - Motion library
- `/docs/specifications/animation-system.md` - Architecture
- `.github/instructions/scss.instructions.md` - Glassmorphism guidance

---

## Historical Context

### Achievements
- Glassmorphism system across headers/modals
- 100% reduced-motion compliance
- GPU-accelerated animations

### Lessons Learned
1. **Less is More**: Restraint in visual effects
2. **Performance First**: GPU acceleration always
3. **Accessibility**: Reduced motion alternatives
4. **Context Matters**: Not all components need effects

### Common Pitfalls
- Over-using glassmorphism (not everywhere)
- Forgetting reduced-motion alternatives
- CPU-based animations (use GPU)
- Too many effects (visual noise)

---

## Agent-Specific Notes

### Unique Capabilities
- **Glassmorphism Expertise**: Advanced backdrop-filter techniques
- **Motion Integration**: Motion.dev library mastery
- **Performance Optimization**: GPU-accelerated transforms

### When to Use Glassmorphism
✓ Headers and navigation  
✓ Modal overlays  
✓ Card highlights  
✗ Body text backgrounds  
✗ Entire pages  
✗ Non-interactive elements

---

**Access Level**: Code Modification  
**Protected**: Yes - Configuration metadata only  
**Maintainer**: Visual Design Team  
**Review Frequency**: Per effect implementation
