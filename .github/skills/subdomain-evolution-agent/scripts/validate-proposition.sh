#!/usr/bin/env bash
# Proposition Validation Script for subdomain-evolution-agent
# Validates ontological propositions before submission to theme repository

set -e

SKILL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REPO_ROOT="$(cd "$SKILL_DIR/../../.." && pwd)"

echo "🔍 Subdomain Evolution Agent - Proposition Validation"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Function to check if proposition is semantic vs visual
check_semantic_intent() {
    local file="$1"
    local score=0
    
    echo "Checking semantic intent in: $file"
    
    # Look for semantic keywords (positive indicators)
    local semantic_keywords=(
        "semantic" "meaning" "intent" "role" "purpose"
        "represents" "indicates" "signifies" "what is"
    )
    
    for keyword in "${semantic_keywords[@]}"; do
        if grep -iq "$keyword" "$file"; then
            score=$((score + 1))
        fi
    done
    
    # Look for visual-only keywords (negative indicators)
    local visual_keywords=(
        "color" "size" "bigger" "smaller" "prettier"
        "style" "look" "appearance" "visual preference"
    )
    
    for keyword in "${visual_keywords[@]}"; do
        if grep -iq "$keyword" "$file"; then
            score=$((score - 2))
        fi
    done
    
    if [ $score -ge 2 ]; then
        echo "  ✅ Strong semantic intent detected"
        return 0
    elif [ $score -ge 0 ]; then
        echo "  ⚠️  Weak semantic intent - strengthen justification"
        return 1
    else
        echo "  ❌ Appears to be visual-only preference (not semantic)"
        return 2
    fi
}

# Function to check if gap analysis was performed
check_gap_analysis() {
    local file="$1"
    local checks=0
    
    echo "Checking gap analysis completeness: $file"
    
    # Required analysis elements
    if grep -iq "existing.*variant" "$file"; then
        echo "  ✅ Existing variants reviewed"
        checks=$((checks + 1))
    else
        echo "  ❌ Missing: Review of existing variants"
    fi
    
    if grep -iq "category" "$file"; then
        echo "  ✅ Ontological category identified"
        checks=$((checks + 1))
    else
        echo "  ❌ Missing: Ontological category classification"
    fi
    
    if grep -iq "use case\|usage\|example" "$file"; then
        echo "  ✅ Use cases provided"
        checks=$((checks + 1))
    else
        echo "  ❌ Missing: Concrete use cases"
    fi
    
    if grep -iq "subdomain\|repository" "$file"; then
        echo "  ✅ Origin subdomain documented"
        checks=$((checks + 1))
    else
        echo "  ⚠️  Warning: Origin subdomain not documented"
    fi
    
    if [ $checks -ge 3 ]; then
        echo "  ✅ Gap analysis complete"
        return 0
    else
        echo "  ❌ Gap analysis incomplete ($checks/4 checks)"
        return 1
    fi
}

# Function to validate universal applicability
check_universal_applicability() {
    local file="$1"
    local warnings=0
    
    echo "Checking universal applicability: $file"
    
    # Check for subdomain-specific language
    if grep -iqE "only.*our|just.*us|specific.*to" "$file"; then
        echo "  ⚠️  Warning: May be subdomain-specific"
        warnings=$((warnings + 1))
    fi
    
    # Check for multiple use cases
    local use_case_count=$(grep -ic "use case\|example\|scenario" "$file" || true)
    if [ $use_case_count -ge 2 ]; then
        echo "  ✅ Multiple use cases documented ($use_case_count)"
    else
        echo "  ⚠️  Warning: Only one use case - may not be universal"
        warnings=$((warnings + 1))
    fi
    
    # Check for ecosystem thinking
    if grep -iqE "across.*subdomain|other.*repositor|ecosystem" "$file"; then
        echo "  ✅ Ecosystem perspective demonstrated"
    else
        echo "  ⚠️  Warning: No ecosystem perspective mentioned"
        warnings=$((warnings + 1))
    fi
    
    if [ $warnings -eq 0 ]; then
        echo "  ✅ Universal applicability validated"
        return 0
    else
        echo "  ⚠️  Applicability concerns ($warnings warnings)"
        return 1
    fi
}

# Function to check PR format and metadata
check_pr_format() {
    local file="$1"
    local errors=0
    
    echo "Checking PR format and metadata: $file"
    
    # Check for required sections
    if ! grep -iq "## Proposed Variant" "$file"; then
        echo "  ❌ Missing: Proposed Variant section"
        errors=$((errors + 1))
    fi
    
    if ! grep -iq "## Semantic Intent" "$file"; then
        echo "  ❌ Missing: Semantic Intent section"
        errors=$((errors + 1))
    fi
    
    if ! grep -iq "## Category" "$file"; then
        echo "  ❌ Missing: Category section"
        errors=$((errors + 1))
    fi
    
    if ! grep -iq "## Justification" "$file"; then
        echo "  ❌ Missing: Justification section"
        errors=$((errors + 1))
    fi
    
    # Check for label mention
    if grep -iq "ontological-proposition" "$file"; then
        echo "  ✅ PR label documented"
    else
        echo "  ⚠️  Warning: 'ontological-proposition' label not mentioned"
    fi
    
    if [ $errors -eq 0 ]; then
        echo "  ✅ PR format validated"
        return 0
    else
        echo "  ❌ PR format incomplete ($errors errors)"
        return 1
    fi
}

# Function to validate mixin naming
check_mixin_naming() {
    local file="$1"
    local issues=0
    
    echo "Checking mixin naming conventions: $file"
    
    # Extract proposed variant name
    local variant_name=$(grep -A1 "Proposed Variant" "$file" | grep -oE "'[^']+'" | head -1 || true)
    
    if [ -n "$variant_name" ]; then
        echo "  Found variant: $variant_name"
        
        # Check naming conventions
        if echo "$variant_name" | grep -qE "^'[a-z-]+'\$"; then
            echo "  ✅ Naming convention valid (lowercase, hyphens)"
        else
            echo "  ❌ Invalid naming: Use lowercase with hyphens only"
            issues=$((issues + 1))
        fi
        
        # Check for semantic vs visual names
        if echo "$variant_name" | grep -iqE "'(red|blue|large|small|pretty|nice)-"; then
            echo "  ❌ Visual name detected - use semantic naming"
            issues=$((issues + 1))
        fi
    else
        echo "  ⚠️  Could not extract variant name"
    fi
    
    if [ $issues -eq 0 ]; then
        echo "  ✅ Naming validation passed"
        return 0
    else
        return 1
    fi
}

# Main validation
echo "📋 Validation Tasks:"
echo "1. Check semantic intent (vs visual preference)"
echo "2. Validate gap analysis completeness"
echo "3. Check universal applicability"
echo "4. Validate PR format and metadata"
echo "5. Check mixin naming conventions"
echo ""

# Default to checking README or PR description
PROPOSITION_FILE=""

if [ $# -gt 0 ]; then
    PROPOSITION_FILE="$1"
elif [ -f "$REPO_ROOT/PROPOSITION.md" ]; then
    PROPOSITION_FILE="$REPO_ROOT/PROPOSITION.md"
elif [ -f "$REPO_ROOT/proposition.md" ]; then
    PROPOSITION_FILE="$REPO_ROOT/proposition.md"
else
    echo "❌ No proposition file found"
    echo ""
    echo "Usage: $0 <proposition-file>"
    echo "Example: $0 PROPOSITION.md"
    echo ""
    echo "Or create a file at repository root:"
    echo "  - PROPOSITION.md"
    echo "  - proposition.md"
    exit 1
fi

if [ ! -f "$PROPOSITION_FILE" ]; then
    echo "❌ File not found: $PROPOSITION_FILE"
    exit 1
fi

echo "Validating proposition file: $PROPOSITION_FILE"
echo ""

# Run all validation checks
TOTAL_ERRORS=0

echo "Task 1: Checking semantic intent..."
if ! check_semantic_intent "$PROPOSITION_FILE"; then
    TOTAL_ERRORS=$((TOTAL_ERRORS + 1))
fi
echo ""

echo "Task 2: Validating gap analysis..."
if ! check_gap_analysis "$PROPOSITION_FILE"; then
    TOTAL_ERRORS=$((TOTAL_ERRORS + 1))
fi
echo ""

echo "Task 3: Checking universal applicability..."
if ! check_universal_applicability "$PROPOSITION_FILE"; then
    TOTAL_ERRORS=$((TOTAL_ERRORS + 1))
fi
echo ""

echo "Task 4: Validating PR format..."
if ! check_pr_format "$PROPOSITION_FILE"; then
    TOTAL_ERRORS=$((TOTAL_ERRORS + 1))
fi
echo ""

echo "Task 5: Checking mixin naming..."
if ! check_mixin_naming "$PROPOSITION_FILE"; then
    TOTAL_ERRORS=$((TOTAL_ERRORS + 1))
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ $TOTAL_ERRORS -eq 0 ]; then
    echo "✨ Proposition validation complete - ready to submit!"
    exit 0
else
    echo "⚠️  Proposition has $TOTAL_ERRORS validation concern(s)"
    echo "   Review and address issues before submitting PR"
    exit 1
fi
