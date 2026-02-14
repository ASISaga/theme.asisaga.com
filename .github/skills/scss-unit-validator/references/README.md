# SCSS Unit Validator - References

This directory contains reference documentation and examples for the SCSS Unit Compatibility Validator skill.

## Quick Links

- **Main Skill Definition**: `../SKILL.md`
- **Validation Script**: `../scripts/validate-units.sh`
- **Specification**: `/docs/specifications/fluid-design-unit-compatibility.md`
- **User Guide**: `/docs/guides/SCSS-UNIT-TESTING.md`

## Usage Examples

### Valid Patterns

All these patterns pass validation because they use calc() or clamp():

```scss
// Fluid typography with boundaries
$font-h1: clamp(2.5rem, calc(5vw + 1rem), 4rem);

// Responsive spacing
.section {
  margin: calc(2vw + 1rem);
  padding: calc(5vw - 0.5rem);
}

// Complex fluid calculations
.hero {
  font-size: clamp(
    3rem,
    calc(2rem + 5vw),
    7rem
  );
}
```

### Invalid Patterns

These patterns fail validation and cause Sass compilation errors:

```scss
// ❌ Direct arithmetic
$spacing: 5vw + 1rem;

// ❌ Property value without calc
.box {
  margin: 2vw - 0.5rem;
}

// FIX: Wrap in calc()
$spacing: calc(5vw + 1rem);
.box {
  margin: calc(2vw - 0.5rem);
}
```

## Validation Statistics

Based on the Genesis Theme codebase:

- **Files scanned**: 147 SCSS files
- **Valid patterns found**: 221
- **Errors detected**: 0
- **Scan time**: < 1 second

## Integration Points

### NPM Scripts
- `npm run validate:scss:units` - Run validator
- `npm test` - Includes unit validation
- `VERBOSE=1 npm run validate:scss:units` - Show all valid patterns

### CI/CD
- Workflow: `.github/workflows/scss-validation.yml`
- Runs on: Push to main, pull requests, manual trigger
- Checks: Sass compilation + unit validation + StyleLint

### Agent Intelligence System
- Skill category: Testing/Validation
- Auto-invoked: When editing SCSS files
- Related agents: scss-refactor-agent, responsive-design-agent

## Common Use Cases

1. **Pre-commit validation**: Ensure SCSS compiles before pushing
2. **Refactoring legacy code**: Migrate fixed sizes to fluid design
3. **Code review**: Automated checks in pull requests
4. **Learning tool**: Verbose mode shows all fluid design patterns
5. **Documentation**: Examples of proper calc/clamp usage

## Technical Details

### Detection Method

The validator uses grep with extended regex to:

1. Find all lines with viewport units (vw, vh, vmin, vmax)
2. Filter for arithmetic operations (+, -, *, /)
3. Check if mixed with root units (rem, em)
4. Verify they're inside calc() or clamp()
5. Skip comments and documentation

### Performance

- Uses native grep (parallelizable)
- No file parsing overhead
- Regex-based pattern matching
- Scales to thousands of files

### False Positives

The validator filters:
- Single-line comments (`//`)
- Multi-line comments (`/* */`)
- Documentation comments (`///`)
- Code inside strings

## Related Documentation

- **Specification**: Full technical details on unit compatibility
- **User Guide**: Step-by-step usage instructions
- **SCSS Instructions**: Integration with development workflow
- **Ontology System**: Semantic design patterns using fluid units

## Version History

### v1.0 (2026-02-14)
- Initial release
- Validates calc/clamp usage
- CI/CD integration
- Comprehensive documentation
- 221 valid patterns in Genesis Theme

## Contributing

To improve the validator:

1. Edit: `.github/skills/scss-unit-validator/scripts/validate-units.sh`
2. Test: `npm run validate:scss:units`
3. Update: This documentation and SKILL.md
4. Commit: Include version number in commit message

## Support

For issues or questions:
- Check: `/docs/guides/SCSS-UNIT-TESTING.md`
- Review: `/docs/specifications/fluid-design-unit-compatibility.md`
- See examples: `_sass/base/design/_semantic-typography.scss`
