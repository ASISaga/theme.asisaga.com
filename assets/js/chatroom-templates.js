/**
 * Chatroom HTML Templates — Infrastructure Templates Only
 *
 * Defines the structural <template> elements used by the chatroom-app web
 * component.  Only chatroom infrastructure templates live here; message-type
 * templates are domain-specific and must be provided by the consuming page or
 * subdomain (see samples/application/templates/ for examples).
 *
 * `ensureChatroomTemplates()` is idempotent — safe to call from multiple
 * components or subclasses. It checks whether the templates are already in the
 * DOM (e.g. injected by an older layout) before creating them.
 *
 * Infrastructure template IDs (used via ChatroomApp._cloneTemplate):
 *   template-chatroom-layout          — full chatroom chrome (header, messages, input)
 *   template-chatroom-mcp-panel       — MCP apps slide-in panel
 *   template-chatroom-mcp-item        — single MCP app button row
 *   template-chatroom-input           — textarea message input
 *   template-chatroom-toolbar-full    — full send toolbar
 *   template-chatroom-toolbar-minimal — compact send button
 *   template-chatroom-tool-result-item — single tool-result list row (MCP)
 *
 * Domain message templates are NOT included here.  Register them via
 * ChatroomApp.registerDomain() using Schema.org JSON-LD @type keys mapped to
 * <template> element IDs provided by the consuming page.
 */

/** @type {Array<{id: string, html: string}>} */
const CHATROOM_TEMPLATES = [
    {
        id: 'template-chatroom-layout',
        html: `<div class="chatroom-layout">
  <header class="chatroom-header">
    <div class="chatroom-header-content">
      <div class="chatroom-header-left">
        <h1 class="chatroom-title"></h1>
        <div class="chatroom-header-info">
          <span class="chatroom-owner" hidden></span>
          <span class="chatroom-participants" hidden></span>
          <span class="chatroom-step-progress" hidden></span>
          <span class="chatroom-typing-indicator" aria-live="polite" hidden></span>
        </div>
      </div>
      <div class="chatroom-header-right">
        <div class="chatroom-status-container" hidden>
          <span class="chatroom-status" id="connection-status"></span>
        </div>
        <div class="chatroom-actions">
          <button type="button" class="chatroom-mcp-apps-toggle"
            aria-label="AI Agent Tools" aria-expanded="false"
            aria-controls="chatroom-mcp-apps-panel"
            title="AI Agent Tools" hidden>
            <i class="fas fa-robot" aria-hidden="true"></i>
          </button>
          <button type="button" class="chatroom-settings-btn" aria-label="Boardroom Settings">
            <i class="fas fa-cog" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
  </header>
  <div class="chatroom-messages" tabindex="0" role="log"
    aria-label="Chat messages" aria-live="polite" aria-atomic="false">
    <div class="chatroom-empty-state">No messages yet. Start the conversation!</div>
  </div>
</div>`,
    },
    {
        id: 'template-chatroom-mcp-panel',
        html: `<div class="chatroom-mcp-apps" aria-hidden="true" id="chatroom-mcp-apps-panel">
  <div class="chatroom-mcp-apps__header">
    <h2 class="chatroom-mcp-apps__title">
      <i class="fas fa-robot" aria-hidden="true"></i> AI Agent Tools
    </h2>
    <p class="chatroom-mcp-apps__hint">Select an agent tool or type <code>/tool-name query</code> in the input field.</p>
  </div>
  <ul class="chatroom-mcp-apps__list" role="list"></ul>
</div>`,
    },
    {
        id: 'template-chatroom-mcp-item',
        html: `<li class="chatroom-mcp-apps__item">
  <button class="chatroom-mcp-apps__btn" type="button">
    <span class="chatroom-mcp-apps__btn-icon" aria-hidden="true">
      <i class="fas fa-robot" aria-hidden="true"></i>
    </span>
    <span class="chatroom-mcp-apps__btn-content">
      <strong class="chatroom-mcp-apps__btn-label"></strong>
      <span class="chatroom-mcp-apps__btn-desc" hidden></span>
      <code class="chatroom-mcp-apps__btn-command"></code>
    </span>
  </button>
</li>`,
    },
    {
        id: 'template-chatroom-input',
        html: `<div class="chatroom-input" role="group" aria-label="Message input area">
  <div class="chatroom-input-container">
    <div class="chatroom-input-content">
      <div class="chatroom-input-field-container">
        <textarea class="chatroom-input-field" id="chatroom-input-control"
          aria-label="Message input"
          rows="1"></textarea>
      </div>
    </div>
  </div>
</div>`,
    },
    {
        id: 'template-chatroom-toolbar-full',
        html: `<div class="chatroom-input-toolbar">
  <div class="chatroom-input-toolbar-left">
  </div>
  <div class="chatroom-input-toolbar-right">
    <span class="chatroom-char-count" aria-live="polite"></span>
    <button class="chatroom-input-send-btn" type="button"
      title="Send Message" aria-label="Send Message">
      <i class="fas fa-paper-plane" aria-hidden="true"></i>
    </button>
  </div>
</div>`,
    },
    {
        id: 'template-chatroom-toolbar-minimal',
        html: `<div class="chatroom-input-toolbar chatroom-input-toolbar--minimal">
  <button class="chatroom-input-send-btn" type="button"
    title="Send Message" aria-label="Send Message">
    <i class="fas fa-paper-plane" aria-hidden="true"></i>
  </button>
</div>`,
    },
    {
        id: 'template-chatroom-tool-result-item',
        html: `<li class="chatroom__tool-result-item">
  <strong class="chatroom__tool-result-label" hidden></strong>
  <span class="chatroom__tool-result-detail" hidden></span>
</li>`,
    },
];

/**
 * Inject chatroom <template> elements into the document if they are not already
 * present.  Idempotent — safe to call from multiple instances or subclasses.
 *
 * The templates are placed in a hidden <div id="chatroom-templates"> appended to
 * <body>.  If that container already exists (e.g. from an older layout that still
 * injects templates via Jekyll includes), only the missing templates are added.
 */
export function ensureChatroomTemplates() {
    let container = document.getElementById('chatroom-templates');
    if (!container) {
        container = document.createElement('div');
        container.id = 'chatroom-templates';
        container.hidden = true;
        container.setAttribute('aria-hidden', 'true');
        document.body.appendChild(container);
    }

    for (const { id, html } of CHATROOM_TEMPLATES) {
        if (document.getElementById(id)) continue; // already present
        const tpl = document.createElement('template');
        tpl.id = id;
        tpl.innerHTML = html;
        container.appendChild(tpl);
    }
}
