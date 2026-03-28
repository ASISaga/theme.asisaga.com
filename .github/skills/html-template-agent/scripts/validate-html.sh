#!/usr/bin/env bash
# HTML Validation Script for html-template-agent
# Validates HTML for semantic structure and accessibility
# Updated with rules from axe-core accessibility audit (March 2026)

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
        echo "  ✅ Basic accessibility checks passed"
    fi
    
    return $issues
}

# Function to check audit-derived rules (from axe-core audit March 2026)
check_audit_rules() {
    local file="$1"
    local issues=0
    
    echo "Checking audit-derived rules: $file"
    
    # Check for duplicate footer landmarks (non-page footers should be <div>)
    # Skip _includes/footer.html which is the legitimate page-level footer
    local basename
    basename=$(basename "$file")
    if [ "$basename" != "footer.html" ]; then
        if grep -q '<footer' "$file" 2>/dev/null; then
            echo "  ⚠️  Found <footer> in non-footer template — may create duplicate contentinfo landmark"
            echo "      Use <div role=\"group\"> instead for CTA sections, input areas, widget footers"
            issues=$((issues + 1))
        fi
    fi
    
    # Check for nested main elements
    if grep -q '<main' "$file"; then
        local is_default
        is_default=$(basename "$file")
        if [ "$is_default" != "default.html" ]; then
            echo "  ⚠️  Found <main> in non-default template — may create duplicate/nested main landmark"
            echo "      Use <div> instead — default.html already wraps {{ content }} in <main>"
            issues=$((issues + 1))
        fi
    fi
    
    # Check for role="group" on tab wrappers (breaks tablist→tab chain)
    if grep -q 'role="tablist"' "$file" || grep -q 'role="tab"' "$file"; then
        if grep -q 'role="group"' "$file"; then
            echo "  ❌ Found role=\"group\" alongside tab roles — breaks tablist→tab ownership chain"
            echo "      Use role=\"presentation\" on intermediate wrappers instead"
            issues=$((issues + 1))
        fi
    fi
    
    # Check for aria-label on plain spans without role
    # Simple heuristic: if any <span aria-label=...> exists without role= on the same tag
    if grep -qE '<span[^>]*aria-label=' "$file"; then
        local spans_with_label
        spans_with_label=$(grep -cE '<span[^>]*aria-label=' "$file" 2>/dev/null || true)
        local spans_with_role_and_label
        spans_with_role_and_label=$(grep -cE '<span[^>]*role=[^>]*aria-label=|<span[^>]*aria-label=[^>]*role=' "$file" 2>/dev/null || true)
        spans_with_label=${spans_with_label:-0}
        spans_with_role_and_label=${spans_with_role_and_label:-0}
        if [ "$spans_with_label" -gt "$spans_with_role_and_label" ]; then
            echo "  ⚠️  Found <span aria-label> without role — add role=\"img\" for valid aria-label on span"
            issues=$((issues + 1))
        fi
    fi
    
    # Check heading hierarchy (basic: h3 without preceding h2)
    # NOTE: This check only applies to complete pages/layouts, not partials or includes
    # (parent layouts may provide the missing h2 level)
    if grep -q '<h3' "$file" && ! grep -q '<h2' "$file"; then
        if grep -q 'layout:' "$file"; then
            # Only warn for top-level layouts that define the full page structure
            echo "  ⚠️  Found <h3> without <h2> — may skip heading levels (verify parent layout provides h2)"
            issues=$((issues + 1))
        fi
    fi
    
    if [ $issues -eq 0 ]; then
        echo "  ✅ Audit-derived accessibility checks passed"
    fi
    
    return $issues
}

# Main validation
echo "📋 Validation Tasks:"
echo "1. Check semantic HTML structure"
echo "2. Check accessibility compliance"
echo "3. Check audit-derived rules (landmark dedup, heading order, tab pattern)"
echo ""

if [ $# -gt 0 ]; then
    if [ -f "$1" ]; then
        check_semantic_html "$1"
        check_accessibility "$1"
        check_audit_rules "$1"
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
