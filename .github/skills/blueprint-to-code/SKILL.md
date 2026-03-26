# Skill: Blueprint to Code Sync
# ID: asisaga/blueprint-to-code
# Version: 1.0.0

## 1. Purpose
The Engineer of Symmetry. This skill manages the bidirectional translation between `_design/` JSON blueprints and the Jekyll `_includes` / `_layouts` code.

## 2. Synthesis (Blueprint -> Code)
When a JSON file in `_design/` changes:
1. **Update `_includes/node.html`:** Ensure the recursive Liquid logic is intact.
2. **Class Mapping:** Convert `layoutMode: "VERTICAL"` to `.stack-vertical` and `itemSpacing` to `--node-gap: var(--spacing-X)`.
3. **Component Generation:** If a new blueprint appears in `_design/includes/`, generate the corresponding `.html` file in `_includes/components/`.

## 3. Extraction (Code -> Blueprint)
When a `.html` or `.scss` file is manually refined in the editor:
1. **Tree Parsing:** Deconstruct the Liquid/HTML DOM tree back into a JSON object.
2. **Blueprint Update:** Sync changes (re-ordering, renaming, or structural shifts) back to the `_design/` JSON.
3. **Difference Engine:** Perform a `diff` check. Only sync structural changes; delegate value changes (colors/fonts) to the `Token_DNA_Orchestrator`.

## 4. Execution Rules
- **No Hardcoding:** The generated code must contain **zero** static values. All values must be Liquid variables or CSS variables derived from tokens.
- **Slugification:** Force `Sent Bubble` (JSON) to `.node-sent-bubble` (HTML/CSS) to ensure the Ontological Handshake.
