# SCSS Unit Compatibility Testing Guide

**Last Updated**: 2026-02-14  
**Audience**: Developers implementing fluid design patterns

## Introduction

This guide explains how to use the SCSS unit compatibility validator to prevent Sass compilation errors when mixing viewport units (vw, vh) with root-relative units (rem, em) in fluid design implementations.

## Prerequisites

- Basic understanding of SCSS/Sass
- Familiarity with CSS units (rem, vw, vh, etc.)
- Node.js environment with npm

## Quick Start

### Run the Validator

```bash
# Standard validation (shows errors only)
npm run validate:scss:units

# Verbose mode (shows all valid patterns found)
VERBOSE=1 npm run validate:scss:units

# Run all SCSS tests
npm test
```

### Understanding Output

**Successful validation:**
```
✓ Validation PASSED
All unit mixing is properly handled in calc/clamp

Files checked:     147
Valid patterns:    221
Errors found:      0
```

**Failed validation:**
```
✗ ERROR _sass/components/hero.scss:45
  Incompatible unit mixing outside calc()/clamp()
  margin: 5vw + 1rem;
  Fix: Wrap in calc() or clamp()

✗ Validation FAILED
Fix incompatible unit mixing before deployment
```

## Common Patterns

### Valid Patterns (Pass Validation)

#### Fluid Typography with clamp()
```scss
// ✅ VALID: Scales from 1rem to 1.125rem based on viewport
.text {
  font-size: clamp(1rem, calc(0.5vw + 0.75rem), 1.125rem);
}
```

#### Responsive Spacing with calc()
```scss
// ✅ VALID: Dynamic spacing that scales with viewport
.section {
  margin-bottom: calc(2vw + 1rem);
  padding: calc(5vw - 0.5rem);
}
```

#### Fluid Design Variables
```scss
// ✅ VALID: Store fluid values in variables
$font-h1: clamp(2.5rem, calc(5vw + 1rem), 4rem);

h1 {
  font-size: $font-h1;
}
```

### Invalid Patterns (Fail Validation)

#### Direct Arithmetic
```scss
// ❌ INVALID: Sass cannot compute this
.component {
  margin: 5vw + 1rem;
}

// ✅ FIX: Wrap in calc()
.component {
  margin: calc(5vw + 1rem);
}
```

#### Variable Assignment
```scss
// ❌ INVALID: Assignment fails at compile time
$spacing: 2vw - 0.5rem;

// ✅ FIX: Use calc()
$spacing: calc(2vw - 0.5rem);
```

## Integration with Development Workflow

### Pre-commit Hook

Add to `.git/hooks/pre-commit`:
```bash
#!/bin/bash
npm run validate:scss:units
if [ $? -ne 0 ]; then
  echo "SCSS unit validation failed. Fix errors before committing."
  exit 1
fi
```

### CI/CD Pipeline

The validator runs automatically in GitHub Actions via `.github/workflows/scss-validation.yml`:

```yaml
- name: Validate unit compatibility
  run: npm run validate:scss:units
```

## Troubleshooting

### False Positives

If the validator reports errors in comments:

**Example:**
```scss
// This comment mentions 100vw + 1rem
```

The validator should skip comments automatically. If you encounter this, ensure you're using the latest version of the validation script.

### Performance

The validator uses grep for performance and can check ~150 SCSS files in under 1 second. For very large codebases:

```bash
# Check specific directory
cd _sass/components && grep -rn -E 'calc\|clamp' . --include="*.scss"
```

### Debugging Compilation Errors

If Sass compilation fails with unit errors:

1. **Run the validator**: `npm run validate:scss:units`
2. **Check the line number** reported in the error
3. **Wrap in calc()**: Most issues resolve by adding calc()
4. **Re-validate**: Run validator again to confirm fix

## Advanced Usage

### Custom Validation Rules

Edit `.github/skills/scss-unit-validator/scripts/validate-units.sh` to add custom patterns:

```bash
# Add custom pattern detection
if echo "$line" | grep -qE 'your-pattern-here'; then
  echo "Custom validation error"
fi
```

### Integration with Other Tools

**With Stylelint:**
```bash
npm run lint:scss && npm run validate:scss:units
```

**With Sass compilation:**
```bash
npm run test:scss && npm run validate:scss:units
```

**Full test suite:**
```bash
npm test  # Runs compilation + validation + linting
```

## Examples from Codebase

### Fluid Typography Scale

From `_sass/base/design/_semantic-typography.scss`:

```scss
// Heading scales that adapt to viewport
$font-h1: clamp(2.5rem, calc(5vw + 1rem), 4rem);
$font-h2: clamp(2rem, calc(4vw + 0.5rem), 3rem);
$font-h3: clamp(1.5rem, calc(3vw + 0.5rem), 2.25rem);

// Body text scales
$font-body: clamp(1rem, calc(0.5vw + 0.75rem), 1.125rem);
$font-body-sm: clamp(0.875rem, calc(0.5vw + 0.5rem), 1rem);
```

**Validator result**: ✅ All valid (221 patterns found)

### Component Spacing

From `_sass/components/core/_genesis-footer.scss`:

```scss
.footer-text {
  font-size: clamp(1.125rem, calc(1rem + 0.75vw), 1.5rem);
}
```

**Validator result**: ✅ Valid fluid typography

## Best Practices

1. **Always use clamp() for typography**: Provides min/max boundaries
2. **Test at multiple viewports**: 375px, 768px, 1440px minimum
3. **Run validator before committing**: Catch errors early
4. **Document fluid design decisions**: Why specific min/max values chosen
5. **Consider accessibility**: Use rem for font-size to respect user preferences

## Next Steps

- **Read the specification**: `/docs/specifications/fluid-design-unit-compatibility.md`
- **Review SCSS instructions**: `.github/instructions/scss.instructions.md`
- **Learn the ontology system**: `/docs/specifications/scss-ontology-system.md`
- **See live examples**: `/tests/ontology/` demonstration pages

## References

- **Validator Skill**: `.github/skills/scss-unit-validator/SKILL.md`
- **Specification**: `/docs/specifications/fluid-design-unit-compatibility.md`
- **SCSS Instructions**: `.github/instructions/scss.instructions.md`
- **MDN calc()**: https://developer.mozilla.org/en-US/docs/Web/CSS/calc
- **MDN clamp()**: https://developer.mozilla.org/en-US/docs/Web/CSS/clamp

---

**Guide maintained by**: ASISaga  
**Related Documentation**: fluid-design-unit-compatibility.md, scss.instructions.md
