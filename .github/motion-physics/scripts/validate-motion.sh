#!/usr/bin/env bash
# Motion Physics Validation Script
# Validates Motion.dev implementation patterns, accessibility guards, and token usage

set -e

SKILL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REPO_ROOT="$(cd "$SKILL_DIR/../.." && pwd)"

echo "🎬 Motion Physics — Validation Script"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# ─── helpers ────────────────────────────────────────────────────────────────

pass() { echo "  ✅ $1"; }
warn() { echo "  ⚠️  $1"; }
fail() { echo "  ❌ $1"; }

# ─── Task 1: Motion source files exist ──────────────────────────────────────

check_motion_files() {
    local errors=0

    echo "Checking Motion source files..."

    local files=(
        "assets/js/common/motion-utils.js"
        "assets/js/common/motion-presets.js"
        "assets/js/common/motion-gestures.js"
        "assets/js/common/motion-migration.js"
        "_includes/motion-library.html"
    )

    for f in "${files[@]}"; do
        if [ -f "$REPO_ROOT/$f" ]; then
            pass "Found: $f"
        else
            fail "Missing: $f"
            errors=$((errors + 1))
        fi
    done

    return $errors
}

# ─── Task 2: No hardcoded spring/duration values ────────────────────────────

check_no_hardcoded_spring() {
    local file="$1"
    local issues=0

    echo "Checking for hardcoded spring/duration values: $file"

    # Flag numeric stiffness/damping/mass as inline literals — not token paths
    if grep -qE "(stiffness|damping|mass):\s*[0-9]+(\.[0-9]+)?\s*(,|\})" "$file"; then
        fail "Hardcoded spring values — pull from tokens.motion.spring.*"
        issues=$((issues + 1))
    else
        pass "No hardcoded spring constants"
    fi

    # Flag hardcoded numeric durations (exclude 0.001 which is the reduced-motion sentinel)
    if grep -qE "duration:\s*[1-9][0-9]*(\.[0-9]+)?\s*(,|\})" "$file"; then
        warn "Numeric duration found — verify it references a token or getAnimationOptions()"
    fi

    return $issues
}

# ─── Task 3: prefers-reduced-motion guard ───────────────────────────────────

check_reduced_motion() {
    local file="$1"
    local issues=0

    echo "Checking prefers-reduced-motion guard: $file"

    if grep -qE "animate\(|animateFadeIn|animateSacred|setupCard|setupButton|setupScroll" "$file"; then
        if grep -q "prefersReducedMotion\|prefers-reduced-motion\|getAnimationOptions" "$file"; then
            pass "Reduced-motion guard found"
        else
            fail "Animation calls without prefers-reduced-motion guard"
            issues=$((issues + 1))
        fi
    else
        pass "No animation calls requiring guard"
    fi

    return $issues
}

# ─── Task 4: WAAPI-safe property usage ──────────────────────────────────────

check_waapi_properties() {
    local file="$1"
    local issues=0

    echo "Checking WAAPI-safe properties: $file"

    # Detect layout-reflow properties in Motion.dev keyframe objects
    # Pattern: animate(el, { ..., layoutProp: value, ... }) — single-line call
    if grep -qE "animate\([^)]*\{[^}]*(width|height|top|left|right|bottom|margin|padding):\s*[0-9]" "$file"; then
        fail "Animating layout properties (width/height/top/left) — use transform/opacity"
        issues=$((issues + 1))
    else
        pass "No layout-property animations detected"
    fi

    # Check for transform + opacity usage (good pattern)
    if grep -qE "transform|opacity" "$file"; then
        pass "GPU-accelerated properties (transform/opacity) in use"
    fi

    return $issues
}

# ─── Task 5: Forbidden frameworks ───────────────────────────────────────────

check_no_forbidden_frameworks() {
    local file="$1"
    local issues=0

    echo "Checking for forbidden animation frameworks: $file"

    if grep -qE "require\(['\"]gsap|import.*from ['\"]gsap|from ['\"]framer-motion" "$file"; then
        fail "Forbidden framework detected (GSAP/Framer Motion) — use vanilla Motion only"
        issues=$((issues + 1))
    else
        pass "No forbidden animation frameworks"
    fi

    return $issues
}

# ─── Task 6: Lint all motion JS files ───────────────────────────────────────

lint_motion_js() {
    local errors=0
    local motion_files

    echo "Linting Motion JS files..."

    mapfile -t motion_files < <(find "$REPO_ROOT/assets/js/common" -name "motion-*.js" 2>/dev/null)

    if [ ${#motion_files[@]} -eq 0 ]; then
        warn "No motion-*.js files found in assets/js/common"
        return 0
    fi

    for f in "${motion_files[@]}"; do
        local rel="${f#$REPO_ROOT/}"
        local file_errors=0

        echo ""
        echo "  File: $rel"
        check_no_hardcoded_spring "$f";      file_errors=$((file_errors + $?))
        check_reduced_motion "$f";           file_errors=$((file_errors + $?))
        check_waapi_properties "$f";         file_errors=$((file_errors + $?))
        check_no_forbidden_frameworks "$f";  file_errors=$((file_errors + $?))
        errors=$((errors + file_errors))
    done

    return $errors
}

# ─── Main ────────────────────────────────────────────────────────────────────

echo "📋 Validation Tasks:"
echo "  1. Verify Motion source files exist"
echo "  2. Lint Motion JS files for hardcoded values"
echo "  3. Check prefers-reduced-motion guards"
echo "  4. Verify WAAPI-safe property usage"
echo "  5. Detect forbidden animation frameworks"
echo ""

TOTAL_ERRORS=0

echo "─── Task 1: Source files ─────────────────────"
cd "$REPO_ROOT"
check_motion_files || TOTAL_ERRORS=$((TOTAL_ERRORS + $?))
echo ""

echo "─── Tasks 2–5: Motion JS lint ────────────────"
lint_motion_js || TOTAL_ERRORS=$((TOTAL_ERRORS + $?))
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ "$TOTAL_ERRORS" -eq 0 ]; then
    echo "✨ Motion physics validation passed!"
    exit 0
else
    echo "💥 Motion physics validation failed ($TOTAL_ERRORS error(s))"
    exit 1
fi
