#!/bin/bash
# ============================================================================
# SCSS UNIT COMPATIBILITY VALIDATOR
# ============================================================================
# Detects incompatible unit mixing in SCSS that could cause Sass compilation
# errors. Validates that viewport units (vw, vh, vmin, vmax) and root units
# (rem) are only mixed within calc() or clamp() functions where browsers can
# compute them at runtime.
# ============================================================================

set -euo pipefail

# Colors for output
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Initialize counters
ERRORS=0
WARNINGS=0
CHECKED=0
VALID_PATTERNS=0

echo -e "${BLUE}┌─────────────────────────────────────────────────────┐${NC}"
echo -e "${BLUE}│   SCSS Unit Compatibility Validator v1.0           │${NC}"
echo -e "${BLUE}└─────────────────────────────────────────────────────┘${NC}"
echo ""
echo -e "${BLUE}Scanning SCSS files in _sass/...${NC}"
echo ""

# Use grep to find all potential mixed unit cases
# This is much faster than reading line by line
TEMP_FILE=$(mktemp)

# Find files with calc/clamp containing mixed units (VALID)
grep -rn 'calc\|clamp' _sass --include="*.scss" | \
  grep -E 'v[wh].*r?em|r?em.*v[wh]' > "$TEMP_FILE" || true

if [ -s "$TEMP_FILE" ]; then
  VALID_PATTERNS=$(wc -l < "$TEMP_FILE")
  if [[ "${VERBOSE:-0}" == "1" ]]; then
    while IFS=: read -r file line content; do
      echo -e "${GREEN}✓ VALID${NC} ${file}:${line}"
      echo -e "  ${GREEN}Fluid design: Mixed units in calc/clamp${NC}"
      echo ""
    done < "$TEMP_FILE"
  fi
fi

# Find direct arithmetic mixing (INVALID - outside calc/clamp)
TEMP_INVALID=$(mktemp)
grep -rn -E '[0-9.]+v[wh]|vmin|vmax' _sass --include="*.scss" 2>/dev/null | \
  grep -v '^\s*//' | \
  grep -v '^\s*/\*' | \
  grep -v '///' | \
  grep -E '[\+\-\*\/].*[0-9.]+r?em|r?em.*[\+\-\*\/]' 2>/dev/null | \
  grep -v 'calc\|clamp' > "$TEMP_INVALID" 2>/dev/null || true

if [ -s "$TEMP_INVALID" ]; then
  while IFS=: read -r file line content; do
    echo -e "${RED}✗ ERROR${NC} ${file}:${line}"
    echo -e "  ${YELLOW}Incompatible unit mixing outside calc()/clamp()${NC}"
    echo -e "  ${content}"
    echo -e "  ${YELLOW}Fix: Wrap in calc() or clamp()${NC}"
    echo ""
    ERRORS=$((ERRORS + 1))
  done < "$TEMP_INVALID"
fi

# Count checked files
CHECKED=$(find _sass -type f -name "*.scss" | wc -l)

# Cleanup
rm -f "$TEMP_FILE" "$TEMP_INVALID"

# Summary
echo ""
echo -e "${BLUE}┌─────────────────────────────────────────────────────┐${NC}"
echo -e "${BLUE}│   Validation Summary                                │${NC}"
echo -e "${BLUE}└─────────────────────────────────────────────────────┘${NC}"
echo -e "Files checked:     ${CHECKED}"
echo -e "Valid patterns:    ${GREEN}${VALID_PATTERNS}${NC}"
echo -e "Errors found:      ${RED}${ERRORS}${NC}"
echo -e "Warnings:          ${YELLOW}${WARNINGS}${NC}"
echo ""

if [ $ERRORS -gt 0 ]; then
  echo -e "${RED}✗ Validation FAILED${NC}"
  echo -e "${YELLOW}Fix incompatible unit mixing before deployment${NC}"
  exit 1
elif [ $WARNINGS -gt 0 ]; then
  echo -e "${YELLOW}⚠ Validation PASSED with warnings${NC}"
  echo -e "${YELLOW}Review warnings to ensure Sass can compile${NC}"
  exit 0
else
  echo -e "${GREEN}✓ Validation PASSED${NC}"
  echo -e "${GREEN}All unit mixing is properly handled in calc/clamp${NC}"
  exit 0
fi
