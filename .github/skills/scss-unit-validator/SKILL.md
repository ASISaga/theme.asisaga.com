---
name: scss-unit-validator
description: Validates SCSS unit compatibility to prevent Sass compilation errors from mixing incompatible units like vw and rem
license: MIT
metadata:
  author: ASISaga
  version: "1.0"
  category: testing
  role: validator
allowed-tools: Bash(validation:*) Read
---

# SCSS Unit Compatibility Validator

## Role and Scope

This skill validates that viewport units (vw, vh, vmin, vmax) and root-relative units (rem, em) are only mixed within CSS functions like `calc()` or `clamp()` where browsers can compute them at runtime. Prevents Sass compilation errors that occur when the preprocessor attempts to mathematically solve equations with incompatible units.

## Purpose

Sass/Jekyll builds fail when attempting to pre-compute mixed-unit arithmetic like `5vw + 1rem` outside of CSS functions. Since Sass doesn't know the viewport width or root font size at compile time, it cannot resolve these calculations. This validator ensures all fluid design patterns use proper CSS runtime functions.

## When to Use This Skill

- Before committing SCSS changes involving fluid typography or spacing
- When implementing responsive designs with viewport units
- During CI/CD validation to catch unit compatibility issues
- After refactoring SCSS files with responsive patterns
- When troubleshooting Sass compilation errors about incompatible units

## Core Responsibilities

1. **Detect Invalid Patterns**: Flag viewport/rem arithmetic outside calc/clamp
2. **Validate Fluid Design**: Confirm proper use of calc/clamp for mixed units
3. **Report Clear Errors**: Provide file, line number, and fix suggestions
4. **Track Valid Patterns**: Count and optionally display valid fluid design usage
5. **CI Integration**: Exit with appropriate codes for automated workflows

## Validation Script

**Location**: `.github/skills/scss-unit-validator/scripts/validate-units.sh`

**Usage**:
```bash
# Standard validation (shows errors only)
npm run validate:scss:units

# Verbose mode (shows all valid patterns)
VERBOSE=1 npm run validate:scss:units
```

**What it checks**:
- ✅ **Valid**: `calc(5vw + 1rem)`, `clamp(1rem, 2vw + 0.5rem, 2rem)`
- ❌ **Invalid**: `5vw + 1rem`, `$spacing: 2vw - 0.5rem`
- ⚠️ **Warning**: Sass variables with viewport unit arithmetic

## Examples

### Valid Fluid Typography
```scss
// CORRECT: Using calc() for mixed units
$font-h1: clamp(2.5rem, calc(5vw + 1rem), 4rem);
$font-body: clamp(1rem, calc(0.5vw + 0.75rem), 1.125rem);

h1 {
  font-size: clamp(2rem, calc(4vw + 0.5rem), 3rem);
  margin-bottom: clamp(1rem, 2vw, 1.5rem);
}
```

### Invalid Patterns (Will Fail)
```scss
// WRONG: Direct arithmetic without calc()
$font-size: 5vw + 1rem;  // ❌ Sass compilation error
padding: 2vw - 0.5rem;   // ❌ Incompatible units

// FIX: Wrap in calc()
$font-size: calc(5vw + 1rem);  // ✅ Valid
padding: calc(2vw - 0.5rem);   // ✅ Valid
```

## Tool Integration

**NPM Script** (add to package.json):
```json
{
  "scripts": {
    "validate:scss:units": "./.github/skills/scss-unit-validator/scripts/validate-units.sh",
    "test:scss:full": "npm run test:scss && npm run validate:scss:units"
  }
}
```

**CI/CD Integration** (GitHub Actions):
```yaml
- name: Validate SCSS Unit Compatibility
  run: npm run validate:scss:units
```

## Validation Workflow

1. **Run validator**: `npm run validate:scss:units`
2. **Review errors**: Check file/line numbers for invalid patterns
3. **Fix issues**: Wrap mixed-unit arithmetic in calc()/clamp()
4. **Re-validate**: Run validator until clean
5. **Commit**: Changes are safe for Sass compilation

## Exit Codes

- `0`: All unit mixing is valid (passes CI)
- `1`: Found incompatible unit errors (fails CI)

## Related Documentation

→ **Fluid Design Patterns**: `/docs/specifications/responsive-design.md`  
→ **SCSS Instructions**: `.github/instructions/scss.instructions.md`  
→ **Ontology System**: `/docs/specifications/scss-ontology-system.md`  
→ **CSS Functions**: https://developer.mozilla.org/en-US/docs/Web/CSS/calc

---

**Version**: 1.0  
**Last Updated**: 2026-02-14
