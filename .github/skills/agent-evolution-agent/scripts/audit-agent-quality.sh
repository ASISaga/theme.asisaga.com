#!/bin/bash
# Agent Quality Audit Script
# Analyzes agent prompts and skills for quality metrics

set -e

GITHUB_DIR=".github"
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo "🔍 Agent Quality Audit v1.0"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

total_agents=0
agents_optimal=0
agents_need_improvement=0
total_context_score=0

# Function to count spec references in a file
count_spec_references() {
    local file="$1"
    if [ ! -f "$file" ]; then
        echo "0"
        return
    fi
    
    # Count references to /docs/specifications/
    local count=$(grep -c "/docs/specifications/" "$file" 2>/dev/null || echo "0")
    echo "$count" | tr -d ' \n\t\r'
}

# Function to get line count safely
get_line_count() {
    local file="$1"
    if [ ! -f "$file" ]; then
        echo "0"
        return
    fi
    wc -l < "$file" 2>/dev/null | tr -d ' \n\t\r'
}

# Function to audit a single agent
audit_agent() {
    local file="$1"
    local agent_name=$(basename "$file" | sed 's/\.prompt\.md$//;s/\.instructions\.md$//')
    
    if [ -f "$file" ] && [ "$(basename "$file")" = "SKILL.md" ]; then
        agent_name=$(basename "$(dirname "$file")")
    fi
    
    total_agents=$((total_agents + 1))
    
    local lines=$(get_line_count "$file")
    local spec_refs=$(count_spec_references "$file")
    
    # Calculate spec reference percentage
    local spec_percentage=0
    if [ "$spec_refs" -gt 0 ]; then
        spec_percentage=$((spec_refs * 20)) # Assume each ref covers ~20% if >=5 refs
        if [ "$spec_percentage" -gt 100 ]; then
            spec_percentage=100
        fi
    fi
    
    total_context_score=$((total_context_score + spec_percentage))
    
    # Determine status
    local status="optimal"
    local color="$GREEN"
    
    if [ "$lines" -gt 400 ] || [ "$spec_refs" -lt 3 ]; then
        status="needs improvement"
        color="$YELLOW"
        agents_need_improvement=$((agents_need_improvement + 1))
    else
        agents_optimal=$((agents_optimal + 1))
    fi
    
    printf "${color}%-30s${NC} | Lines: %-4d | Spec Refs: %-2d | Spec Coverage: %3d%% | Status: %s\n" \
        "$agent_name" "$lines" "$spec_refs" "$spec_percentage" "$status"
}

echo "Instruction Files:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
for file in "$GITHUB_DIR"/instructions/*.instructions.md; do
    if [ -f "$file" ]; then
        audit_agent "$file"
    fi
done

echo ""
echo "Agent Prompts:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
for file in "$GITHUB_DIR"/prompts/*.prompt.md; do
    if [ -f "$file" ]; then
        audit_agent "$file"
    fi
done

echo ""
echo "Agent Skills:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
for file in "$GITHUB_DIR"/skills/*/SKILL.md; do
    if [ -f "$file" ]; then
        audit_agent "$file"
    fi
done

echo ""
echo "Summary:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Total Agents Analyzed: $total_agents"
echo -e "${GREEN}Optimal:${NC} $agents_optimal"
echo -e "${YELLOW}Need Improvement:${NC} $agents_need_improvement"

if [ "$total_agents" -gt 0 ]; then
    avg_spec_coverage=$((total_context_score / total_agents))
    echo "Average Spec Coverage: ${avg_spec_coverage}%"
    
    if [ "$avg_spec_coverage" -ge 80 ]; then
        echo -e "${GREEN}✓ Excellent spec leverage!${NC}"
    elif [ "$avg_spec_coverage" -ge 60 ]; then
        echo -e "${YELLOW}⚠ Good, but can improve spec references${NC}"
    else
        echo -e "${RED}✗ Low spec coverage - refactor needed${NC}"
    fi
fi

echo ""
echo "Recommendations:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ "$agents_need_improvement" -gt 0 ]; then
    echo "• Extract static knowledge to /docs/specifications/"
    echo "• Add spec references to agent prompts"
    echo "• Target: ≥3 spec references per agent"
    echo "• Target: ≤400 lines for prompt files"
    echo "• Target: ≤200 lines for instruction files"
fi

echo ""
echo "✓ Audit complete"
