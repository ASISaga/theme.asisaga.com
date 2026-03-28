#!/usr/bin/env bash
# ============================================================================
# TOKENS → SCSS (Forward Translation via Style Dictionary v4)
# ============================================================================
# Converts .github/skills/style-dictionary/tokens.json into SCSS variable
# declarations at _sass/base/design/_variables-generated.scss using
# Style Dictionary v4.
#
# Usage:
#   .github/skills/style-dictionary/scripts/tokens-to-scss.sh           # generate staged file
#   .github/skills/style-dictionary/scripts/tokens-to-scss.sh --diff    # generate and show diff
#   .github/skills/style-dictionary/scripts/tokens-to-scss.sh --apply   # overwrite production _variables.scss
#
# The default output is a staged file. Review the diff before using --apply.
# ============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../../../.." && pwd)"
SKILL_DIR="$SCRIPT_DIR/.."

GENERATED="$REPO_ROOT/_sass/base/design/_variables-generated.scss"
PRODUCTION="$REPO_ROOT/_sass/base/design/_variables.scss"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}┌─────────────────────────────────────────────────────┐${NC}"
echo -e "${BLUE}│   Style Dictionary v4 — Tokens → SCSS              │${NC}"
echo -e "${BLUE}└─────────────────────────────────────────────────────┘${NC}"
echo ""

# Generate SCSS from tokens.json using Style Dictionary v4
echo -e "${BLUE}Generating SCSS from tokens.json via Style Dictionary...${NC}"
node "$SKILL_DIR/sd.config.mjs"
echo ""

# Diff mode
if [[ "${1:-}" == "--diff" ]]; then
  echo -e "${BLUE}Diff: _variables-generated.scss vs _variables.scss${NC}"
  echo ""
  if diff "$PRODUCTION" "$GENERATED"; then
    echo -e "${GREEN}✓ No differences — tokens and production SCSS are in sync.${NC}"
  else
    echo ""
    echo -e "${YELLOW}Differences found. Review above and run with --apply to overwrite production.${NC}"
    exit 0
  fi
  exit 0
fi

# Apply mode: overwrite production
if [[ "${1:-}" == "--apply" ]]; then
  echo -e "${YELLOW}⚠ Overwriting production file: ${PRODUCTION}${NC}"
  echo -e "${YELLOW}  Make sure you have reviewed the diff first.${NC}"
  read -r -p "Confirm overwrite? [y/N] " confirm
  if [[ "$confirm" =~ ^[Yy]$ ]]; then
    cp "$GENERATED" "$PRODUCTION"
    rm -f "$GENERATED"
    echo -e "${GREEN}✓ Applied generated SCSS to production file.${NC}"
    echo -e "${GREEN}  Run 'npm run test:scss' to validate.${NC}"
  else
    echo -e "${YELLOW}Aborted. Staged file preserved at: ${GENERATED}${NC}"
  fi
  exit 0
fi

# Default: staged output only
echo -e "${GREEN}✓ Staged file written: ${GENERATED}${NC}"
echo ""
echo -e "  Next steps:"
echo -e "    1. Review: diff ${PRODUCTION} ${GENERATED}"
echo -e "    2. Apply:  ${BASH_SOURCE[0]} --apply"
echo -e "    3. Validate: npm run test:scss"
