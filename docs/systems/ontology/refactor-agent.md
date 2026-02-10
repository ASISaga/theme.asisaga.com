This Migration Agent Directive is designed to be copy-pasted directly into the system prompt or chat window of the AI agent tasked with refactoring your subdomains. It provides the "Logic Gates" necessary to ensure the Ontological Handshake is executed without introducing technical debt.
🤖 AGENT DIRECTIVE: Subdomain Ontological Refactor
Context
You are refactoring a subdomain repository to align with the Project Genesis central theme. The architecture is a "Mirrored SCSS" system. The HTML is already semantic and audited. Your task is to bridge the HTML to the Theme's Ontological Interface.
The Golden Rules
 * Zero Raw CSS: You are strictly forbidden from using properties like margin, padding, display, color, font-size, or background.
 * Strict Handshake: You must only use mixins from the interface.scss (Environment, Entity, Cognition, Synapse, State, Atmosphere).
 * Mirrored Structure: Your SCSS nesting must perfectly reflect the HTML DOM hierarchy.
 * Agnostic Thinking: Do not think about "how it looks." Think about "what it means."
Refactor Workflow
Step 1: Intent Analysis
Scan the index.html (or other HTML files). For every unique class, determine its role:
 * Is it a layout container? → Environment
 * Is it a content block/module? → Entity
 * Is it text/information? → Cognition
 * Is it a link/button? → Synapse
 * Is it a status indicator? → State
Step 2: Mirrored Mapping
Create/Update the _sass/mirror-styles.scss. Use the following mapping logic:
/* Example Refactor Pattern */
.semantic-class-name {
  // 1. Assign Environment Logic
  @include genesis-environment('...'); 

  .child-element {
    // 2. Assign Entity Nature
    @include genesis-entity('...');

    .text-element {
      // 3. Assign Cognitive Frequency
      @include genesis-cognition('...');
    }
    
    .action-element {
      // 4. Assign Interaction Vector
      @include genesis-synapse('...');
    }
  }
}

Step 3: Variable & Mixin Purge
 * Remove any @import that points to local Bootstrap or legacy files.
 * Ensure the only import is @import "genesis-interface"; (the remote theme bridge).
 * Delete all local $variable definitions.
Decision Matrix for Agent Selection
| If you encounter... | Map to this Mixin | Preferred Argument |
|---|---|---|
| Main Page Wrapper | genesis-environment | 'focused' (prose) or 'distributed' (grid) |
| Research Card / Post Preview | genesis-entity | 'primary' |
| Background/Sidebar Card | genesis-entity | 'secondary' |
| Hero Heading / Page Title | genesis-cognition | 'axiom' |
| Paragraph / Body Text | genesis-cognition | 'discourse' |
| Terminal Log / Code Block | genesis-cognition | 'protocol' |
| "Read More" / "Visit Site" | genesis-synapse | 'navigate' |
| "Submit" / "Toggle" / "Save" | genesis-synapse | 'execute' |
Final Verification Protocol
Before finishing, you must verify:
 * Does the SCSS contain a single pixel value? If yes, delete and replace with a semantic mixin.
 * Is the HTML untouched? If you changed the HTML classes, revert and fix the SCSS instead.
 * Is the hierarchy 1:1? Check that every class in the HTML has a corresponding nested selector in the SCSS.