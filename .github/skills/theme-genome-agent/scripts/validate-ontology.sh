#!/usr/bin/env bash
# Ontology Validation Script for theme-genome-agent
# Validates ontological propositions and engine layer changes

set -e

SKILL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REPO_ROOT="$(cd "$SKILL_DIR/../../.." && pwd)"

echo "🔍 Theme Genome Agent - Ontology Validation"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Function to validate engine layer syntax
validate_engine_layer() {
    echo "Validating engine layer..."
    
    cd "$REPO_ROOT"
    
    # Test SCSS compilation
    if npm run test:scss > /tmp/engine-test.log 2>&1; then
        echo "✅ Engine layer compiles successfully"
    else
        echo "❌ Engine layer compilation failed"
        cat /tmp/engine-test.log | tail -30
        return 1
    fi
    
    # Check for proper documentation in engine
    local engine_file="_sass/ontology/_engines.scss"
    if [ -f "$engine_file" ]; then
        local documented_variants=$(grep -c "@category\|@variant\|@origin" "$engine_file" || true)
        echo "✅ Found $documented_variants documented variant markers"
    fi
    
    return 0
}

# Function to check GENOME.md is updated
check_genome_updated() {
    echo "Checking GENOME.md documentation..."
    
    local genome_file="$REPO_ROOT/GENOME.md"
    if [ ! -f "$genome_file" ]; then
        echo "❌ GENOME.md not found"
        return 1
    fi
    
    # Check last update date
    if grep -q "$(date +%Y-%m)" "$genome_file"; then
        echo "✅ GENOME.md appears to be current"
    else
        echo "⚠️  GENOME.md may need updating"
    fi
    
    return 0
}

# Function to validate ontological purity
check_ontological_purity() {
    echo "Checking ontological purity..."
    
    local interface_file="$REPO_ROOT/_sass/ontology/_interface.scss"
    
    if [ -f "$interface_file" ]; then
        # Interface layer should have ZERO CSS properties
        if grep -qE '^\s*(margin|padding|color|background|border):' "$interface_file"; then
            echo "❌ Interface layer contains raw CSS properties (violation)"
            return 1
        else
            echo "✅ Interface layer is pure (zero CSS properties)"
        fi
    fi
    
    return 0
}

# Main validation
echo "📋 Validation Tasks:"
echo "1. Validate engine layer compilation"
echo "2. Check GENOME.md documentation"
echo "3. Verify ontological purity"
echo ""

validate_engine_layer
check_genome_updated
check_ontological_purity

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✨ Ontology validation complete!"
