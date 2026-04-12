#!/usr/bin/env bash
# ============================================================================
# SCSS → TOKENS (Reverse Translation)
# ============================================================================
# Parses SCSS variable declarations from _sass/design/_variables.scss
# and _sass/design/_colors.scss, then writes a structured tokens.json to
# .github/skills/style-dictionary/tokens-extracted.json.
#
# Usage:
#   .github/skills/style-dictionary/scripts/scss-to-tokens.sh           # extract to tokens-extracted.json
#   .github/skills/style-dictionary/scripts/scss-to-tokens.sh --apply   # overwrite _design/tokens/2-color.json
#
# Note: The reverse extraction produces a single consolidated JSON.
# The --apply mode writes the extracted output to 2-color.json as a starting point.
# Manually review and split the result into the appropriate _design/tokens/*.json files.
# ============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../../../.." && pwd)"
SKILL_DIR="$SCRIPT_DIR/.."

EXTRACTED="$SKILL_DIR/tokens-extracted.json"
TOKENS="$REPO_ROOT/_design/tokens/2-color.json"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}┌─────────────────────────────────────────────────────┐${NC}"
echo -e "${BLUE}│   Style Dictionary — SCSS → Tokens                 │${NC}"
echo -e "${BLUE}└─────────────────────────────────────────────────────┘${NC}"
echo ""

# Verify source files
SCSS_COLORS="$REPO_ROOT/_sass/design/_colors.scss"
SCSS_VARS="$REPO_ROOT/_sass/design/_variables.scss"

for f in "$SCSS_COLORS" "$SCSS_VARS"; do
  if [[ ! -f "$f" ]]; then
    echo -e "${RED}✗ Source file not found: $f${NC}"
    exit 1
  fi
done

# Run the reverse translation via the Node.js script
echo -e "${BLUE}Parsing SCSS variables from:${NC}"
echo -e "  $SCSS_COLORS"
echo -e "  $SCSS_VARS"
echo ""

node "$SKILL_DIR/script.mjs" --reverse
echo ""

# Count extracted tokens
TOKEN_COUNT=$(grep -c '"value"' "$EXTRACTED" 2>/dev/null || echo "0")
echo -e "${GREEN}✓ Extracted ${TOKEN_COUNT} token(s) to: ${EXTRACTED}${NC}"
echo ""

# Apply mode: overwrite tokens.json
if [[ "${1:-}" == "--apply" ]]; then
  echo -e "${YELLOW}⚠ Overwriting: ${TOKENS}${NC}"
  read -r -p "Confirm overwrite? [y/N] " confirm
  if [[ "$confirm" =~ ^[Yy]$ ]]; then
    cp "$EXTRACTED" "$TOKENS"
    rm -f "$EXTRACTED"
    echo -e "${GREEN}✓ Applied extracted tokens to _design/tokens/2-color.json.${NC}"
  else
    echo -e "${YELLOW}Aborted. Extracted file preserved at: ${EXTRACTED}${NC}"
  fi
  exit 0
fi

# Default: staged output only
echo -e "  Next steps:"
echo -e "    1. Review:  cat ${EXTRACTED}"
echo -e "    2. Apply:   ${BASH_SOURCE[0]} --apply"
echo -e "    3. Validate forward sync: .github/skills/style-dictionary/scripts/tokens-to-scss.sh --diff"
