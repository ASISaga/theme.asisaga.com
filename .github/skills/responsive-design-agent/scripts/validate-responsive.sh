#!/usr/bin/env bash
# Responsive Validation Script for responsive-design-agent
# Validates mobile-first patterns, touch targets, and fluid typography

set -e

SKILL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REPO_ROOT="$(cd "$SKILL_DIR/../../.." && pwd)"

echo "🔍 Responsive Design Agent - Validation Script"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Function to check touch target compliance (WCAG 2.5.5)
check_touch_targets() {
    local file="$1"
    local violations=0
    
    echo "Checking WCAG 2.5.5 touch targets (44x44px): $file"
    
    # Check for hardcoded small interactive elements
    if grep -qE "min-(width|height):\s*([1-3][0-9]|[0-9])px" "$file"; then
        echo "  ⚠️  Warning: Found small interactive elements (<44px)"
        violations=$((violations + 1))
    fi
    
    # Check for proper synapse mixin usage (handles touch targets)
    local synapse_count=$(grep -c "@include genesis-synapse" "$file" || true)
    if [ $synapse_count -gt 0 ]; then
        echo "  ✅ Found $synapse_count synapse mixins (touch targets handled)"
    else
        if grep -qE "(button|\.btn|input|\.link)" "$file"; then
            echo "  ⚠️  Interactive elements without synapse mixins"
            violations=$((violations + 1))
        fi
    fi
    
    return $violations
}

# Function to validate fluid typography
check_fluid_typography() {
    local file="$1"
    local issues=0
    
    echo "Checking fluid typography (16px minimum): $file"
    
    # Check for hardcoded small font sizes
    if grep -qE "font-size:\s*(1[0-5]|[0-9])px" "$file"; then
        echo "  ❌ Found font sizes <16px (iOS zoom trigger)"
        issues=$((issues + 1))
    fi
    
    # Check for clamp() usage (fluid typography)
    local clamp_count=$(grep -c "clamp(" "$file" || true)
    if [ $clamp_count -gt 0 ]; then
        echo "  ✅ Using fluid typography with clamp() ($clamp_count instances)"
    fi
    
    # Check for cognition mixin usage (handles fluid scaling)
    local cognition_count=$(grep -c "@include genesis-cognition" "$file" || true)
    if [ $cognition_count -gt 0 ]; then
        echo "  ✅ Found $cognition_count cognition mixins (fluid scaling handled)"
    fi
    
    if [ $issues -eq 0 ]; then
        echo "  ✅ Typography validation passed"
    fi
    
    return $issues
}

# Function to check mobile-first approach
check_mobile_first() {
    local file="$1"
    local warnings=0
    
    echo "Checking mobile-first approach: $file"
    
    # Check for desktop-first media queries (anti-pattern)
    if grep -qE "@media.*max-width" "$file"; then
        echo "  ⚠️  Warning: Found max-width media queries (desktop-first pattern)"
        echo "      Prefer min-width (mobile-first) approach"
        warnings=$((warnings + 1))
    fi
    
    # Check for mobile-first breakpoint helpers
    if grep -qE "@include (from\(|tablet|desktop)" "$file"; then
        echo "  ✅ Using mobile-first breakpoint helpers"
    fi
    
    # Check for environment mixins (auto-responsive)
    if grep -q "@include genesis-environment" "$file"; then
        echo "  ✅ Using responsive environment mixins"
    fi
    
    return $warnings
}

# Function to validate responsive grid usage
check_responsive_grids() {
    local file="$1"
    local issues=0
    
    echo "Checking responsive grid patterns: $file"
    
    # Check for hardcoded grid columns (should be auto-fit)
    if grep -qE "grid-template-columns:\s*repeat\([0-9]+," "$file"; then
        echo "  ⚠️  Warning: Fixed grid columns (should use auto-fit)"
        issues=$((issues + 1))
    fi
    
    # Check for distributed environment (auto-responsive grid)
    if grep -q "genesis-environment('distributed')" "$file"; then
        echo "  ✅ Using distributed environment (auto-responsive grid)"
    fi
    
    # Check for container queries
    if grep -q "@container" "$file"; then
        echo "  ✅ Using container queries (advanced responsive)"
    fi
    
    return $issues
}

# Function to check accessibility media queries
check_accessibility_queries() {
    local file="$1"
    local missing=0
    
    echo "Checking accessibility media queries: $file"
    
    # Check for reduced motion support
    if grep -qE "animation|transition.*[0-9]" "$file"; then
        if ! grep -q "prefers-reduced-motion" "$file"; then
            echo "  ❌ Animations without reduced-motion support"
            missing=$((missing + 1))
        else
            echo "  ✅ Reduced-motion support found"
        fi
    fi
    
    # Check for high contrast support
    if grep -qE "glass-|opacity:\s*0\.[0-9]" "$file"; then
        if ! grep -q "prefers-contrast" "$file"; then
            echo "  ⚠️  Transparency effects without high-contrast support"
            missing=$((missing + 1))
        fi
    fi
    
    if [ $missing -eq 0 ]; then
        echo "  ✅ Accessibility media queries validated"
    fi
    
    return $missing
}

# Function to validate viewport units
check_viewport_units() {
    local file="$1"
    local warnings=0
    
    echo "Checking viewport units: $file"
    
    # Check for old vh units (should use dvh for mobile)
    if grep -qE "height:\s*100vh" "$file"; then
        echo "  ℹ️  Found 100vh - consider dynamic viewport units (dvh, svh)"
        warnings=$((warnings + 1))
    fi
    
    # Check for safe area support
    if grep -q "env(safe-area-inset" "$file"; then
        echo "  ✅ Safe area insets support (mobile notches)"
    fi
    
    return $warnings
}

# Main validation
echo "📋 Validation Tasks:"
echo "1. Test SCSS compilation"
echo "2. Check touch target compliance (WCAG 2.5.5)"
echo "3. Validate fluid typography (16px minimum)"
echo "4. Check mobile-first approach"
echo "5. Validate responsive grids"
echo "6. Check accessibility media queries"
echo "7. Validate viewport units"
echo ""

# Task 1: Test SCSS compilation
echo "Task 1: Testing SCSS compilation..."
cd "$REPO_ROOT"
if npm run test:scss > /tmp/responsive-test.log 2>&1; then
    echo "✅ SCSS compilation successful"
else
    echo "❌ SCSS compilation failed"
    cat /tmp/responsive-test.log | tail -20
    exit 1
fi
echo ""

# Tasks 2-7: Check specific file if provided
if [ $# -gt 0 ]; then
    if [ -f "$1" ]; then
        echo "Task 2: Checking touch targets..."
        check_touch_targets "$1"
        echo ""
        
        echo "Task 3: Validating fluid typography..."
        check_fluid_typography "$1"
        echo ""
        
        echo "Task 4: Checking mobile-first approach..."
        check_mobile_first "$1"
        echo ""
        
        echo "Task 5: Validating responsive grids..."
        check_responsive_grids "$1"
        echo ""
        
        echo "Task 6: Checking accessibility queries..."
        check_accessibility_queries "$1"
        echo ""
        
        echo "Task 7: Validating viewport units..."
        check_viewport_units "$1"
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
echo "✨ Responsive validation complete!"
