#!/usr/bin/env bash
# HTML Validation Script for html-template-agent
# Validates HTML for semantic structure and accessibility

set -e

SKILL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REPO_ROOT="$(cd "$SKILL_DIR/../../.." && pwd)"

echo "🔍 HTML Template Agent - Validation Script"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Function to check HTML semantic structure
check_semantic_html() {
    local file="$1"
    local warnings=0
    
    echo "Checking semantic structure: $file"
    
    # Check for skip link
    if ! grep -q 'href="#skip-target"' "$file"; then
        echo "  ⚠️  Missing skip link"
        warnings=$((warnings + 1))
    fi
    
    # Check for main landmark
    if ! grep -q '<main.*id="skip-target"' "$file"; then
        echo "  ⚠️  Missing main landmark with skip-target"
        warnings=$((warnings + 1))
    fi
    
    # Check for inline styles
    if grep -q 'style=' "$file"; then
        echo "  ❌ Found inline styles (forbidden)"
        warnings=$((warnings + 1))
    fi
    
    # Check for meaningful class names
    if grep -qE 'class="(blue|red|large|small|container|box|wrapper)"' "$file"; then
        echo "  ⚠️  Found non-semantic class names"
        warnings=$((warnings + 1))
    fi
    
    if [ $warnings -eq 0 ]; then
        echo "  ✅ Semantic HTML validated"
    fi
    
    return $warnings
}

# Function to check accessibility
check_accessibility() {
    local file="$1"
    local issues=0
    
    echo "Checking accessibility: $file"
    
    # Check for images without alt
    if grep -q '<img' "$file" && ! grep -q 'alt=' "$file"; then
        echo "  ❌ Images without alt attributes"
        issues=$((issues + 1))
    fi
    
    # Check for form inputs without labels
    if grep -q '<input' "$file"; then
        if ! grep -q '<label' "$file"; then
            echo "  ⚠️  Form inputs may be missing labels"
            issues=$((issues + 1))
        fi
    fi
    
    if [ $issues -eq 0 ]; then
        echo "  ✅ Accessibility checks passed"
    fi
    
    return $issues
}

# Main validation
echo "📋 Validation Tasks:"
echo "1. Check semantic HTML structure"
echo "2. Check accessibility compliance"
echo ""

if [ $# -gt 0 ]; then
    if [ -f "$1" ]; then
        check_semantic_html "$1"
        check_accessibility "$1"
    else
        echo "❌ File not found: $1"
        exit 1
    fi
else
    echo "Usage: $0 <html-file>"
    echo "Example: $0 _layouts/default.html"
    exit 1
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✨ Validation complete!"
