This documentation serves as the Standard Operating Procedure (SOP) for both human architects and AI agents. It defines the three-tier architecture that allows your 20 subdomains to remain "Style-Blind" while the Theme Repository acts as the "Visual Brain."
🌐 Project Genesis: The Ontological Handshake
Architecture Version: 2.0 (Exhaustive & Agnostic)
This document outlines the relationship between Semantic Intent (Subdomains) and Physical Manifestation (Theme).
🏛️ 1. The Three-Tier Architecture
To ensure the ecosystem is future-proof, we separate concerns into three distinct layers:
| Layer | Location | Responsibility | Constraint |
|---|---|---|---|
| Tier 1: Content | Subdomain HTML | Defines What the data is. | No style attributes; 1 class per element. |
| Tier 2: Interface | Theme interface.scss | Defines the Role of the content. | Agnostic; no CSS properties allowed. |
| Tier 3: Engine | Theme _engines.scss | Defines the Look (OKLCH, Bento). | The only place for raw CSS/Pixels. |
📘 2. The Ontological Interface (interface.scss)
This is the "Semantic API" exposed by the theme. Subdomain agents use these mixins to map their HTML classes to system roles.
A. Environment (Spatiotemporal Logic)
 * genesis-environment('distributed'): Autonomous bento-grid cells.
 * genesis-environment('focused'): Single-column, narrative optimization.
 * genesis-environment('manifest'): High-density dashboard/monitoring view.
B. Entity (Existence & Presence)
 * genesis-entity('primary'): The core object (Active glassmorphism).
 * genesis-entity('secondary'): Supporting context (Lower opacity).
 * genesis-entity('imperative'): System alerts (Neon-pulsing borders).
C. Cognition (Information Intent)
 * genesis-cognition('axiom'): High-resonance headlines.
 * genesis-cognition('discourse'): Standard body prose for reading.
 * genesis-cognition('protocol'): Technical data, logs, and code.
D. Synapse (Action Vectors)
 * genesis-synapse('navigate'): External node portal.
 * genesis-synapse('execute'): Local state change / Command execution.
⚙️ 3. The Theme Engine (_engines.scss)
The "Driver" layer. It translates the roles above into the Genesis visual language.
// Internal Driver Example
@mixin _theme-engine-entity($nature) {
  border-radius: var(--radius-bento);
  transition: all var(--motion-fluid);

  @if $nature == 'primary' {
    background: oklch(25% 0.02 240 / 0.8);
    backdrop-filter: blur(20px);
    border: 1px solid var(--accent-low);
  }
  @if $nature == 'imperative' {
    background: oklch(40% 0.2 20 / 0.5);
    border: 2px solid var(--neon-alert);
    box-shadow: 0 0 20px var(--neon-alert);
  }
}

🧪 4. Sample Subdomain Client (Mirror Implementation)
A typical implementation for a "Research Hub" subdomain.
Step 1: Audited HTML (index.html)
<main class="research-hub">
  <header class="intro-section">
    <h1 class="hub-title">Neural Logic Research</h1>
  </header>
  
  <section class="paper-grid">
    <article class="research-card">
      <code class="data-id">REF: 001x</code>
      <p class="summary">Analysis of ASI cognitive ethics.</p>
      <a class="action-btn">Download PDF</a>
    </article>
  </section>
</main>

Step 2: Mirrored SCSS (style.scss)
The AI agent creates this mapping. Note the Zero Property rule.
@import "remote-theme-interface";

.research-hub {
  @include genesis-environment('focused');

  .intro-section {
    .hub-title { @include genesis-cognition('axiom'); }
  }

  .paper-grid {
    @include genesis-environment('distributed');
    
    .research-card {
      @include genesis-entity('primary');

      .data-id { @include genesis-cognition('protocol'); }
      .summary { @include genesis-cognition('discourse'); }
      .action-btn { @include genesis-synapse('execute'); }
    }
  }
}

✅ 5. Validation Checklist for AI Agents
 * Semantic Purity: Does the subdomain HTML use tags like <article>, <section>, and <aside> correctly?
 * Property Isolation: Does the subdomain SCSS contain words like px, rem, color, or display? (It shouldn't).
 * Role Alignment: Is a button mapped to a synapse and a title mapped to an axiom?
 * Theme Inheritance: Does the subdomain rely entirely on _engines.scss for its visual weight?
