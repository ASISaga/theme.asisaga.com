#!/usr/bin/env bash
# Effects Validation Script for futuristic-effects-agent
# Validates proper use of glassmorphism, glows, and animations

set -e

SKILL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REPO_ROOT="$(cd "$SKILL_DIR/../../.." && pwd)"

echo "🔍 Futuristic Effects Agent - Validation Script"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Function to check effects are layered on semantic foundation
check_semantic_foundation() {
    local file="$1"
    local warnings=0
    
    echo "Checking semantic foundation in: $file"
    
    # Effects should be used WITH semantic mixins, not alone
    if grep -q "@include genesis-atmosphere" "$file"; then
        # Check if there's also environment/entity mixins
        if ! grep -q "@include genesis-environment\|@include genesis-entity" "$file"; then
            echo "  ⚠️  Warning: Atmosphere effects without semantic structure"
            warnings=$((warnings + 1))
        else
            echo "  ✅ Effects properly layered on semantic foundation"
        fi
    fi
    
    # Check for raw glass/glow mixins without ontological context
    if grep -qE "@include (glass-|glow-)" "$file"; then
        echo "  ℹ️  Found direct glass/glow mixins (advanced usage)"
        echo "      Ensure these are within ontological context"
    fi
    
    return $warnings
}

# Function to validate performance considerations
check_performance() {
    local file="$1"
    local issues=0
    
    echo "Checking performance considerations: $file"
    
    # Check for excessive blur values
    if grep -qE "blur:\s*(3[0-9]|[4-9][0-9]|[1-9][0-9]{2,})px" "$file"; then
        echo "  ⚠️  Warning: High blur values (>30px) may impact performance"
        issues=$((issues + 1))
    fi
    
    # Check for multiple glow layers
    local glow_count=$(grep -c "@include glow-" "$file" || true)
    if [ $glow_count -gt 3 ]; then
        echo "  ⚠️  Warning: Multiple glow layers ($glow_count) may impact performance"
        issues=$((issues + 1))
    fi
    
    # Check for reduced-motion support
    if grep -qE "@include.*animation" "$file"; then
        if ! grep -q "prefers-reduced-motion" "$file" && ! grep -q "reduced-motion" "$file"; then
            echo "  ❌ Animations without reduced-motion support (accessibility violation)"
            issues=$((issues + 1))
        else
            echo "  ✅ Animations respect reduced-motion preference"
        fi
    fi
    
    if [ $issues -eq 0 ]; then
        echo "  ✅ Performance checks passed"
    fi
    
    return $issues
}

# Function to check accessibility compliance
check_accessibility() {
    local file="$1"
    local issues=0
    
    echo "Checking accessibility compliance: $file"
    
    # Glass effects should support high-contrast mode
    if grep -q "@include glass-" "$file"; then
        if ! grep -q "prefers-contrast" "$file"; then
            echo "  ⚠️  Warning: Glass effects should support high-contrast mode"
            echo "      Consider adding prefers-contrast: high fallback"
            issues=$((issues + 1))
        fi
    fi
    
    # Low-opacity text is forbidden
    if grep -qE "opacity:\s*0\.[0-8]" "$file"; then
        local line=$(grep -n "opacity:" "$file" | head -1 | cut -d: -f1)
        echo "  ⚠️  Warning: Low opacity detected (line $line) - ensure text is readable"
        issues=$((issues + 1))
    fi
    
    if [ $issues -eq 0 ]; then
        echo "  ✅ Accessibility checks passed"
    fi
    
    return $issues
}

# Main validation
echo "📋 Validation Tasks:"
echo "1. Test SCSS compilation"
echo "2. Check semantic foundation"
echo "3. Validate performance considerations"
echo "4. Check accessibility compliance"
echo ""

# Task 1: Test SCSS compilation
echo "Task 1: Testing SCSS compilation..."
cd "$REPO_ROOT"
if npm run test:scss > /tmp/effects-test.log 2>&1; then
    echo "✅ SCSS compilation successful"
else
    echo "❌ SCSS compilation failed"
    cat /tmp/effects-test.log | tail -20
    exit 1
fi
echo ""

# Tasks 2-4: Check specific file if provided
if [ $# -gt 0 ]; then
    if [ -f "$1" ]; then
        echo "Task 2: Checking semantic foundation..."
        check_semantic_foundation "$1"
        echo ""
        
        echo "Task 3: Validating performance..."
        check_performance "$1"
        echo ""
        
        echo "Task 4: Checking accessibility..."
        check_accessibility "$1"
    else
        echo "❌ File not found: $1"
        exit 1
    fi
else
    echo "ℹ️  No specific file provided - skipping detailed checks"
    echo "Usage: $0 <scss-file>"
    echo "Example: $0 assets/css/style.scss"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✨ Effects validation complete!"
