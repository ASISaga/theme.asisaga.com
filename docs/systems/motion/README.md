# Motion System Documentation

*Last Updated: 2026-02-10*

The Genesis Motion System provides semantic, accessible animations using the Motion.dev library.

## Core Documentation

### Complete Guides

**[MOTION-COMPLETE-GUIDE.md](MOTION-COMPLETE-GUIDE.md)**
- Comprehensive motion system guide
- All animation patterns
- Usage examples and best practices

**[MOTION-INTEGRATION.md](MOTION-INTEGRATION.md)**
- Integration with the theme
- Setup and configuration
- Loading and initialization

### Implementation

**[MOTION-IMPLEMENTATION-SUMMARY.md](MOTION-IMPLEMENTATION-SUMMARY.md)**
- Implementation overview
- Architecture decisions
- Technical details

**[MOTION-V2-IMPLEMENTATION-SUMMARY.md](MOTION-V2-IMPLEMENTATION-SUMMARY.md)**
- Version 2 updates and changes
- New features and capabilities
- Migration notes

### Ontology Integration

**[ONTOLOGY-ANIMATION-IMPLEMENTATION.md](ONTOLOGY-ANIMATION-IMPLEMENTATION.md)**
- Ontology-integrated animations
- Semantic animation patterns
- Combining motion with ontological variants

**[ONTOLOGY-ANIMATION-INTEGRATION.md](ONTOLOGY-ANIMATION-INTEGRATION.md)**
- Integration strategies
- Pattern combinations
- Advanced use cases

## Key Features

### Motion.dev Library
- **Lightweight**: 5KB Web Animations API wrapper
- **Accessible**: Built-in reduced motion support
- **Declarative**: Use `data-motion` attributes
- **Performance**: GPU-accelerated transforms

### Animation Patterns

**Declarative Usage:**
```html
<div data-motion="sacred-rhythm">Heartbeat animation</div>
<div data-motion="card-hover">Hover to lift</div>
<button data-motion="button-hover">Hover to pulse</button>
```

**Programmatic Usage:**
```javascript
import { animateFadeIn, setupCardHover } from './common/motion-utils.js';

animateFadeIn(element, { duration: 1, delay: 0.2 });
setupCardHover(card);
```

## Related Documentation

- **[Animation System Specification](../../specifications/animation-system.md)** - Technical specification
- **[JavaScript Interaction Patterns](../../specifications/javascript-interaction-patterns.md)** - JS integration patterns
- **[Performance Guide](../../specifications/performance.md)** - Animation performance

## Source Code

Motion system code lives in:
- `assets/js/common/motion-utils.js` - Motion utilities
- `assets/js/common/animations.js` - Animation initialization
- `_includes/motion-library.html` - Motion.dev library loader

---

**Back to**: [Systems Documentation](../README.md) | [Documentation Home](../../README.md)
