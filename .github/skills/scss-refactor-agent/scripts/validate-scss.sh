#!/usr/bin/env bash
# SCSS Validation Script for scss-refactor-agent
# Validates SCSS files for zero-CSS compliance and ontological purity

set -e

SKILL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REPO_ROOT="$(cd "$SKILL_DIR/../../.." && pwd)"

echo "🔍 SCSS Refactor Agent - Validation Script"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Function to check for raw CSS properties in SCSS files
check_zero_css_compliance() {
    local file="$1"
    local violations=0
    
    # List of raw CSS properties that should not appear in subdomain SCSS
    local forbidden_properties=(
        "margin:" "padding:" "display:" "color:" "font-size:"
        "background:" "border:" "width:" "height:" "position:"
        "top:" "left:" "right:" "bottom:" "flex:" "grid:"
    )
    
    echo "Checking: $file"
    
    for prop in "${forbidden_properties[@]}"; do
        if grep -q "  $prop" "$file"; then
            echo "  ❌ Found raw CSS property: $prop"
            violations=$((violations + 1))
        fi
    done
    
    if [ $violations -eq 0 ]; then
        echo "  ✅ Zero-CSS compliant"
    fi
    
    return $violations
}

# Function to validate ontological mixin usage
check_ontological_usage() {
    local file="$1"
    
    echo "Checking ontological mixin usage in: $file"
    
    # Check if file imports ontology
    if ! grep -q "@import.*ontology" "$file" && ! grep -q "@use.*ontology" "$file"; then
        echo "  ⚠️  Warning: File doesn't import ontology system"
        return 1
    fi
    
    # Check for genesis mixin usage
    local mixin_count=$(grep -c "@include genesis-" "$file" || true)
    if [ $mixin_count -gt 0 ]; then
        echo "  ✅ Uses $mixin_count genesis mixins"
    else
        echo "  ⚠️  Warning: No genesis mixins found"
    fi
    
    return 0
}

# Main validation
echo "📋 Validation Tasks:"
echo "1. Test SCSS compilation"
echo "2. Run stylelint"
echo "3. Check zero-CSS compliance (if target file provided)"
echo ""

# Task 1: Test SCSS compilation
echo "Task 1: Testing SCSS compilation..."
cd "$REPO_ROOT"
if npm run test:scss > /tmp/scss-test.log 2>&1; then
    echo "✅ SCSS compilation successful"
else
    echo "❌ SCSS compilation failed"
    cat /tmp/scss-test.log | tail -20
    exit 1
fi
echo ""

# Task 2: Run stylelint
echo "Task 2: Running stylelint..."
if npm run lint:scss > /tmp/lint.log 2>&1; then
    echo "✅ Stylelint passed"
else
    echo "⚠️  Stylelint found issues (may be pre-existing)"
    cat /tmp/lint.log | tail -10
fi
echo ""

# Task 3: Check specific file if provided
if [ $# -gt 0 ]; then
    echo "Task 3: Checking zero-CSS compliance for: $1"
    if [ -f "$1" ]; then
        check_zero_css_compliance "$1"
        check_ontological_usage "$1"
    else
        echo "❌ File not found: $1"
        exit 1
    fi
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✨ Validation complete!"
