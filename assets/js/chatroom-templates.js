/**
 * Chatroom HTML Templates — Dynamic Content Only
 *
 * Defines <template> elements for genuinely dynamic content: individual
 * chat messages and tool-result rows. Structural chrome (header, messages
 * container, input bar, toolbar, MCP panel) is NOT templated here — it is
 * static HTML shipped by the theme's Liquid includes
 * (_includes/chatroom/header.html, messages.html, input.html,
 * mcp-panel.html) and rendered at Jekyll build time. ChatroomApp hydrates
 * that static markup; it never clones or generates it.
 *
 * `ensureChatroomTemplates()` is idempotent — safe to call from multiple
 * components or subclasses. It checks whether the templates are already in
 * the DOM before creating them.
 *
 * Template IDs (used via ChatroomApp._cloneTemplate):
 *   template-chatroom-message-ai      — legacy fallback AI message (used
 *                                        only when no domain/shared JSON-LD
 *                                        template is registered — see
 *                                        ChatroomApp._cloneDomainAgentTemplate)
 *   template-chatroom-message-own     — legacy fallback own/user message
 *   template-chatroom-message-system  — legacy fallback system/agenda divider
 *   template-chatroom-message-typing  — legacy fallback typing indicator
 *   template-chatroom-tool-result-item — single tool-result list row (MCP)
 *
 * The primary, preferred message-rendering path is the JSON-LD domain
 * system (ChatroomApp.registerDomain() / registerSharedTemplates()), using
 * the shared templates in _layouts/chatroom/shared/*.html (agent-message,
 * user-message, typing, system-message, join, leave, acknowledge, inform,
 * reaction). The templates below exist only as a legacy fallback path for
 * consumers that pass plain msg.type-style objects instead of JSON-LD.
 */

/** @type {Array<{id: string, html: string}>} */
const CHATROOM_TEMPLATES = [
    {
        id: 'template-chatroom-message-ai',
        html: `<div class="chatroom__message chatroom__message--ai">
  <div class="chatroom__message-row">
    <span class="chatroom__avatar" aria-hidden="true">
      <i class="fas fa-robot" aria-hidden="true"></i>
    </span>
    <div class="chatroom__message-body">
      <header class="chatroom__message-meta">
        <strong class="chatroom__author" hidden></strong>
        <span class="chatroom__agent-role" hidden></span>
        <time class="chatroom__time" hidden></time>
        <span class="chatroom__tool-badge" title="Tool invoked" hidden>
          <i class="fas fa-wrench" aria-hidden="true"></i>
          <span class="chatroom__tool-badge-text"></span>
        </span>
      </header>
      <p class="chatroom__text"></p>
      <ul class="chatroom__tool-results" hidden></ul>
    </div>
  </div>
</div>`,
    },
    {
        id: 'template-chatroom-message-own',
        html: `<div class="chatroom__message chatroom__message--own">
  <div class="chatroom__message-row">
    <div class="chatroom__message-body">
      <header class="chatroom__message-meta">
        <strong class="chatroom__author" hidden></strong>
        <time class="chatroom__time" hidden></time>
      </header>
      <p class="chatroom__text"></p>
    </div>
    <span class="chatroom__avatar chatroom__avatar--you" aria-hidden="true">You</span>
  </div>
</div>`,
    },
    {
        id: 'template-chatroom-message-system',
        html: `<div class="chatroom__system-message chatroom__system-message--default" role="status" aria-live="polite">
  <span class="chatroom__agenda-label" hidden></span>
  <span class="chatroom__agenda-title" hidden></span>
</div>`,
    },
    {
        id: 'template-chatroom-message-typing',
        html: `<div class="chatroom__typing">
  <span class="chatroom__avatar" aria-hidden="true"></span>
  <em class="chatroom__typing-text"></em>
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
 * Inject the dynamic-content <template> elements into the document if they
 * are not already present. Idempotent — safe to call from multiple
 * instances or subclasses.
 *
 * The templates are placed in a hidden <div id="chatroom-templates">
 * appended to <body>. If that container already exists, only the missing
 * templates are added.
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
