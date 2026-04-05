/**
 * Chatroom Web Component
 *
 * Renders the complete executive boardroom chat interface and manages
 * all interactive behaviour. Receives all configuration and initial
 * chat content as HTML attributes, builds its own DOM, then wires up
 * event handlers.
 *
 * Built on Lit (https://lit.dev) for reactive properties and lifecycle management.
 * Extends GenesisElement (LitElement, light DOM) — the same base as all other
 * Genesis web components.
 *
 * Attributes / Lit reactive properties:
 *   title            — Boardroom title (default: "Chat")
 *   participants     — Agent count shown in the header
 *   placeholder      — Textarea placeholder text
 *   max-length       — Maximum input length (default: 1000)
 *   show-toolbar     — Boolean; show formatting toolbar in the input bar
 *   show-connection-status — Boolean; render the live-connection badge
 *   mcp-apps         — JSON array of MCP app descriptors
 *   mcp-endpoint     — Fallback HTTP endpoint for all MCP apps
 *   chat-data        — JSON { messages: [...] } from _data/chatroom/<name>.yml
 *   api-endpoint     — Live API base URL for sending/receiving messages
 *   auto-refresh     — Boolean; poll api-endpoint for new messages
 *   refresh-interval — Polling interval in ms (default: 3000)
 */

import { GenesisElement } from './common/genesis-element.js';

export class ChatroomApp extends GenesisElement {
    /**
     * Lit reactive properties — replaces manual getAttribute() reads.
     * Lit maps each kebab-case attribute to the camelCase property name
     * automatically when the `attribute` option is given.
     */
    static properties = {
        title:                { type: String },
        participants:         { type: String },
        placeholder:          { type: String },
        maxLength:            { type: Number,  attribute: 'max-length' },
        showToolbar:          { type: Boolean, attribute: 'show-toolbar' },
        showConnectionStatus: { type: Boolean, attribute: 'show-connection-status' },
        mcpApps:              { type: String,  attribute: 'mcp-apps' },
        mcpEndpoint:          { type: String,  attribute: 'mcp-endpoint' },
        chatData:             { type: String,  attribute: 'chat-data' },
        apiEndpoint:          { type: String,  attribute: 'api-endpoint' },
        autoRefresh:          { type: Boolean, attribute: 'auto-refresh' },
        refreshInterval:      { type: Number,  attribute: 'refresh-interval' },
    };

    constructor() {
        super();
        this.config = null;   // populated in connectedCallback
        this._mcpPendingCount = 0;
        this.refreshIntervalId = null;
        this._apiConnected = false;
        // Default values for numeric properties (Lit leaves them undefined when absent)
        this.maxLength = 1000;
        this.refreshInterval = 3000;
    }

    /**
     * Parse the mcp-apps attribute into an array of app descriptors.
     * Accepts JSON array or comma-separated "name:endpoint" pairs.
     * @param {string|null} raw
     * @returns {Array<{name: string, label: string, endpoint: string, icon: string}>}
     */
    _parseMcpApps(raw) {
        if (!raw) return [];
        try {
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            // Fallback: comma-separated "name:endpoint" or just "name" list
            return raw.split(',').map(token => {
                const [name, endpoint = ''] = token.trim().split(':');
                return { name: name.trim(), label: name.trim(), endpoint: endpoint.trim(), icon: 'fas fa-robot' };
            }).filter(app => app.name);
        }
    }

    connectedCallback() {
        super.connectedCallback();
        this.config = {
            title: this.title || 'Chat',
            participants: this.participants || null,
            placeholder: this.placeholder || 'Type a message...',
            maxLength: this.maxLength || 1000,
            showToolbar: this.showToolbar,
            showConnectionStatus: this.showConnectionStatus,
            apiEndpoint: this.apiEndpoint || null,
            autoRefresh: this.autoRefresh,
            refreshInterval: this.refreshInterval || 3000,
            mcpApps: this._parseMcpApps(this.mcpApps),
            mcpEndpoint: this.mcpEndpoint || null,
            chatMessages: this._parseChatData(this.chatData),
        };

        this._render();
        this.initializeElements();
        this.attachEventHandlers();
        this._setupMcpAppsPanel();

        if (this.config.apiEndpoint) {
            this.connect();
        }
        if (this.config.autoRefresh && this.config.apiEndpoint) {
            this.startAutoRefresh();
        }

        this.dispatchEvent(new CustomEvent('chatroom-ready', {
            bubbles: true,
            detail: { config: this.config }
        }));
    }

    /**
     * Lit lifecycle: called after reactive property changes.
     * Replaces manual attribute observation for live title/participants updates.
     * Uses `this.hasUpdated` to skip the initial render pass (Lit sets it true
     * after the first complete update cycle).
     */
    updated(changedProperties) {
        super.updated(changedProperties);
        if (!this.hasUpdated || !this.config) return;
        if (changedProperties.has('title')) {
            this.updateTitle(this.title);
        }
        if (changedProperties.has('participants')) {
            this.updateParticipants(this.participants);
        }
    }

    // =========================================================================
    // Rendering — component builds its own DOM from attributes
    // =========================================================================

    /**
     * Parse the chat-data attribute into a messages array.
     * Accepts { messages: [...] } or a plain array.
     * @param {string|null} raw
     * @returns {Array<object>}
     */
    _parseChatData(raw) {
        if (!raw) return [];
        try {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed.messages)) return parsed.messages;
            if (Array.isArray(parsed)) return parsed;
            return [];
        } catch {
            return [];
        }
    }

    /**
     * Render the complete chatroom HTML into this element.
     * Called once at the start of connectedCallback before event wiring.
     */
    _render() {
        const { title, participants, placeholder, showToolbar, showConnectionStatus, mcpApps, chatMessages } = this.config;

        this.innerHTML = `
<div class="chatroom-layout">
  <header class="chatroom-header">
    <div class="chatroom-header-content">
      <div class="chatroom-header-left">
        <h1 class="chatroom-title">${this._escape(title)}</h1>
        <div class="chatroom-header-info">
          ${participants ? `<span class="chatroom-participants">${this._escape(participants)} agents in session</span>` : ''}
          <span class="chatroom-typing-indicator" aria-live="polite" hidden></span>
        </div>
      </div>
      <div class="chatroom-header-right">
        ${showConnectionStatus ? `<div class="chatroom-status-container"><span class="chatroom-status" id="connection-status"></span></div>` : ''}
        <div class="chatroom-actions">
          ${mcpApps.length > 0 ? `<button type="button" class="chatroom-mcp-apps-toggle" aria-label="AI Agent Tools" aria-expanded="false" aria-controls="chatroom-mcp-apps-panel" title="AI Agent Tools"><i class="fas fa-robot" aria-hidden="true"></i></button>` : ''}
          <button type="button" class="chatroom-settings-btn" aria-label="Boardroom Settings"><i class="fas fa-cog" aria-hidden="true"></i></button>
        </div>
      </div>
    </div>
  </header>

  ${this._renderMcpPanel(mcpApps)}

  <div class="chatroom-messages" tabindex="0" role="log" aria-label="Chat messages" aria-live="polite" aria-atomic="false">
    ${chatMessages.length ? chatMessages.map(m => this._renderMessage(m)).join('') : '<div class="chatroom-empty-state">No messages yet. Start the conversation!</div>'}
  </div>

  ${this._renderInput(placeholder, showToolbar, mcpApps)}
</div>`;

        // Scroll to bottom of the pre-loaded message list
        const msgs = this.querySelector('.chatroom-messages');
        if (msgs) msgs.scrollTop = msgs.scrollHeight;
    }

    /** Dispatch a single message to its type-specific renderer. */
    _renderMessage(msg) {
        switch (msg.type) {
            case 'system':  return this._renderSystemMsg(msg);
            case 'ai':      return this._renderAiMsg(msg);
            case 'own':     return this._renderOwnMsg(msg);
            case 'typing':  return this._renderTypingMsg(msg);
            default:        return '';
        }
    }

    _renderSystemMsg(msg) {
        const kind = this._escape(msg.kind || 'default');
        return `<div class="chatroom__system-message chatroom__system-message--${kind}">
  ${msg.label ? `<span class="chatroom__agenda-label">${this._escape(msg.label)}</span>` : ''}
  ${msg.title ? `<span class="chatroom__agenda-title">${this._escape(msg.title)}</span>` : ''}
</div>`;
    }

    _renderAiMsg(msg) {
        const avatar = this._escape(msg.avatar || 'ai');
        const avatarContent = avatar === 'ai'
            ? `<i class="${this._safeIcon(msg.icon || 'fas fa-robot')}" aria-hidden="true"></i>`
            : avatar.toUpperCase();
        const toolResults = Array.isArray(msg.tool_results) && msg.tool_results.length
            ? `<ul class="chatroom__tool-results" aria-label="${this._escape(msg.author || '')} results">
  ${msg.tool_results.map(r => `  <li class="chatroom__tool-result-item">
    ${r.label ? `<strong class="chatroom__tool-result-label">${this._escape(r.label)}</strong>` : ''}
    ${r.detail ? `<span class="chatroom__tool-result-detail">${this._escape(r.detail)}</span>` : ''}
  </li>`).join('')}
</ul>` : '';

        return `<div class="chatroom__message chatroom__message--ai">
  <div class="chatroom__message-row">
    <span class="chatroom__avatar chatroom__avatar--${avatar}" aria-hidden="true">${avatarContent}</span>
    <div class="chatroom__message-body">
      <header class="chatroom__message-meta">
        ${msg.author ? `<strong class="chatroom__author">${this._escape(msg.author)}</strong>` : ''}
        ${msg.role ? `<span class="chatroom__agent-role">${this._escape(msg.role)}</span>` : ''}
        ${msg.time ? `<time class="chatroom__time">${this._escape(msg.time)}</time>` : ''}
        ${msg.tool_badge ? `<span class="chatroom__tool-badge" title="Tool invoked"><i class="${this._safeIcon(msg.tool_badge_icon || 'fas fa-wrench')}" aria-hidden="true"></i> ${this._escape(msg.tool_badge)}</span>` : ''}
      </header>
      <p class="chatroom__text">${this._escape(msg.text || '')}</p>
      ${toolResults}
    </div>
  </div>
</div>`;
    }

    _renderOwnMsg(msg) {
        return `<div class="chatroom__message chatroom__message--own">
  <div class="chatroom__message-row">
    <div class="chatroom__message-body">
      <header class="chatroom__message-meta">
        ${msg.time ? `<time class="chatroom__time">${this._escape(msg.time)}</time>` : ''}
        ${msg.author ? `<strong class="chatroom__author">${this._escape(msg.author)}</strong>` : ''}
      </header>
      <p class="chatroom__text">${this._escape(msg.text || '')}</p>
    </div>
    <span class="chatroom__avatar chatroom__avatar--you" aria-hidden="true">${this._escape(msg.initials || 'Y')}</span>
  </div>
</div>`;
    }

    _renderTypingMsg(msg) {
        const avatar = this._escape(msg.avatar || 'ai');
        return `<div class="chatroom__typing">
  <span class="chatroom__avatar chatroom__avatar--${avatar}" aria-hidden="true">${avatar.toUpperCase()}</span>
  <em class="chatroom__typing-text">${this._escape(msg.text || '')}</em>
</div>`;
    }

    _renderMcpPanel(apps) {
        if (!apps.length) return '';
        const items = apps.map(app => `  <li class="chatroom-mcp-apps__item">
    <button class="chatroom-mcp-apps__btn" type="button"
      data-mcp-app="${this._escape(app.name)}"
      ${app.endpoint ? `data-mcp-endpoint="${this._escape(app.endpoint)}"` : ''}
      aria-label="Invoke ${this._escape(app.label || app.name)}">
      <span class="chatroom-mcp-apps__btn-icon" aria-hidden="true"><i class="${this._safeIcon(app.icon || 'fas fa-robot')}" aria-hidden="true"></i></span>
      <span class="chatroom-mcp-apps__btn-content">
        <strong class="chatroom-mcp-apps__btn-label">${this._escape(app.label || app.name)}</strong>
        ${app.description ? `<span class="chatroom-mcp-apps__btn-desc">${this._escape(app.description)}</span>` : ''}
        <code class="chatroom-mcp-apps__btn-command">/${this._escape(app.name)}</code>
      </span>
    </button>
  </li>`).join('');

        return `<div class="chatroom-mcp-apps" aria-hidden="true" id="chatroom-mcp-apps-panel">
  <div class="chatroom-mcp-apps__header">
    <h2 class="chatroom-mcp-apps__title"><i class="fas fa-robot" aria-hidden="true"></i> AI Agent Tools</h2>
    <p class="chatroom-mcp-apps__hint">Select an agent tool or type <code>/tool-name query</code> in the input field.</p>
  </div>
  <ul class="chatroom-mcp-apps__list" role="list">${items}</ul>
</div>`;
    }

    _renderInput(placeholder, showToolbar, apps) {
        const mcpBtn = apps.length ? `<button type="button" class="chatroom-mcp-apps-toggle chatroom-input-format-btn" aria-label="MCP Apps" aria-expanded="false" aria-controls="chatroom-mcp-apps-panel" title="MCP Apps"><i class="fas fa-plug" aria-hidden="true"></i></button>` : '';

        const toolbar = showToolbar
            ? `<div class="chatroom-input-toolbar">
    <div class="chatroom-input-toolbar-left">${mcpBtn}</div>
    <div class="chatroom-input-toolbar-right">
      <span class="chatroom-char-count" aria-live="polite"></span>
      <button class="chatroom-input-send-btn" type="button" title="Send Message" aria-label="Send Message"><i class="fas fa-paper-plane" aria-hidden="true"></i></button>
    </div>
  </div>`
            : `<div class="chatroom-input-toolbar chatroom-input-toolbar--minimal">
    ${mcpBtn}
    <button class="chatroom-input-send-btn" type="button" title="Send Message" aria-label="Send Message"><i class="fas fa-paper-plane" aria-hidden="true"></i></button>
  </div>`;

        return `<div class="chatroom-input" role="group" aria-label="Message input area">
  <div class="chatroom-input-container">
    <div class="chatroom-input-content">
      <div class="chatroom-input-field-container">
        <textarea class="chatroom-input-field" id="chatroom-input-control"
          placeholder="${this._escape(placeholder)}"
          aria-label="Message input"
          rows="1"
          maxlength="${this.config.maxLength}"></textarea>
      </div>
      ${toolbar}
    </div>
  </div>
</div>`;
    }

    initializeElements() {
        this.elements = {
            header: this.querySelector('.chatroom-header'),
            title: this.querySelector('.chatroom-title'),
            participants: this.querySelector('.chatroom-participants'),
            typingIndicator: this.querySelector('.chatroom-typing-indicator'),
            connectionStatus: this.querySelector('.chatroom-status'),
            messagesContainer: this.querySelector('.chatroom-messages'),
            inputField: this.querySelector('.chatroom-input-field'),
            sendButton: this.querySelector('.chatroom-input-send-btn'),
            toolbar: this.querySelector('.chatroom-input-toolbar'),
            charCount: this.querySelector('.chatroom-char-count'),
            mcpAppsPanel: this.querySelector('.chatroom-mcp-apps'),
            mcpAppsToggle: this.querySelector('.chatroom-mcp-apps-toggle')
        };
    }

    attachEventHandlers() {
        // Send message on button click
        if (this.elements.sendButton) {
            this.elements.sendButton.addEventListener('click', () => this.sendMessage());
        }

        // Send message on Enter key (Shift+Enter for new line)
        if (this.elements.inputField) {
            this.elements.inputField.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });

            // Character count
            if (this.elements.charCount) {
                this.elements.inputField.addEventListener('input', () => {
                    const count = this.elements.inputField.value.length;
                    this.elements.charCount.textContent = `${count}/${this.config.maxLength}`;
                });
            }

            // Typing indicator
            if (this.config.showTypingIndicator) {
                let typingTimeout;
                this.elements.inputField.addEventListener('input', () => {
                    clearTimeout(typingTimeout);
                    this.emitTyping(true);
                    typingTimeout = setTimeout(() => this.emitTyping(false), 1000);
                });
            }

            // Slash-command hint: update placeholder when user types /
            this.elements.inputField.addEventListener('input', () => this._updateSlashHint());
        }

        // MCP apps toggle button
        if (this.elements.mcpAppsToggle) {
            this.elements.mcpAppsToggle.addEventListener('click', () => this.toggleMcpAppsPanel());
        }
    }

    // =========================================================================
    // MCP App Support
    // =========================================================================

    /**
     * Populate the MCP apps panel with app buttons (if not already rendered
     * via Liquid) and wire up click handlers.
     */
    _setupMcpAppsPanel() {
        if (!this.config.mcpApps.length) return;

        // If a panel element already exists (rendered by Liquid), wire up
        // click handlers on the app buttons.
        const panel = this.elements.mcpAppsPanel;
        if (panel) {
            panel.querySelectorAll('[data-mcp-app]').forEach(btn => {
                btn.addEventListener('click', () => {
                    const appName = btn.getAttribute('data-mcp-app');
                    this._activateMcpApp(appName);
                });
            });
        }
    }

    /**
     * Activate an MCP app: pre-fill the input with `/appname ` so the user
     * can complete the query, then focus the input.
     * @param {string} appName
     */
    _activateMcpApp(appName) {
        if (!this.elements.inputField) return;
        this.elements.inputField.value = `/${appName} `;
        this.elements.inputField.focus();
        // Move cursor to end
        const len = this.elements.inputField.value.length;
        this.elements.inputField.setSelectionRange(len, len);
        this._updateSlashHint();
        // Close panel
        this.closeMcpAppsPanel();
    }

    /**
     * Update the input placeholder hint when a slash command is detected.
     */
    _updateSlashHint() {
        if (!this.elements.inputField) return;
        const value = this.elements.inputField.value;
        const match = value.match(/^\/(\S+)\s?/);
        if (match) {
            const appName = match[1];
            const app = this.config.mcpApps.find(a => a.name === appName);
            const label = app ? app.label : appName;
            this.elements.inputField.setAttribute('placeholder', `Ask ${label}…`);
        } else {
            this.elements.inputField.setAttribute('placeholder', this.config.placeholder);
        }
    }

    /**
     * Detect if the input text is a slash command for an MCP app.
     * Returns { app, query } or null.
     * @param {string} text
     * @returns {{ app: object, query: string }|null}
     */
    _detectSlashCommand(text) {
        const match = text.match(/^\/(\S+)\s*([\s\S]*)$/);
        if (!match) return null;
        const [, appName, query] = match;
        const app = this.config.mcpApps.find(a => a.name === appName);
        if (!app) return null;
        return { app, query: query.trim() };
    }

    /**
     * Call an MCP app and display the result as an AI message.
     * @param {object} app  MCP app descriptor { name, label, endpoint, icon }
     * @param {string} query  The query text
     */
    async callMcpApp(app, query) {
        const endpoint = app.endpoint || this.config.mcpEndpoint;
        if (!endpoint) {
            this._appendMcpError(app, 'No endpoint configured for this MCP app.');
            return;
        }

        // Show thinking indicator
        const thinkingEl = this._appendMcpThinking(app);
        this._mcpPendingCount++;
        this._updateMcpAppsToggleBadge();

        this.dispatchEvent(new CustomEvent('chatroom-mcp-request', {
            bubbles: true,
            detail: { app: app.name, query }
        }));

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query })
            });

            if (!response.ok) {
                let detail = '';
                try { detail = await response.text(); } catch { /* ignore */ }
                throw new Error(`MCP app responded with status ${response.status}${detail ? `: ${detail.slice(0, 120)}` : ''}`);
            }

            const data = await response.json();
            thinkingEl.remove();
            this._appendMcpMessage(app, query, data);

            this.dispatchEvent(new CustomEvent('chatroom-mcp-response', {
                bubbles: true,
                detail: { app: app.name, query, data }
            }));
        } catch (error) {
            console.error(`MCP app "${app.name}" error:`, error);
            thinkingEl.remove();
            this._appendMcpError(app, error.message);

            this.dispatchEvent(new CustomEvent('chatroom-error', {
                bubbles: true,
                detail: { error, context: 'mcp-app', app: app.name }
            }));
        } finally {
            this._mcpPendingCount = Math.max(0, this._mcpPendingCount - 1);
            this._updateMcpAppsToggleBadge();
        }
    }

    /**
     * Append a "thinking" indicator message element and return it.
     * @param {object} app
     * @returns {HTMLElement}
     */
    _appendMcpThinking(app) {
        const container = this.elements.messagesContainer;
        if (!container) return document.createElement('div');

        const el = document.createElement('div');
        el.className = 'chatroom__message chatroom__message--ai chatroom__message--thinking';
        el.setAttribute('aria-live', 'polite');
        el.innerHTML = `
            <div class="chatroom__message-row">
                <span class="chatroom__avatar chatroom__avatar--ai" aria-hidden="true">
                    <i class="${this._safeIcon(app.icon)}" aria-hidden="true"></i>
                </span>
                <div class="chatroom__message-body">
                    <header class="chatroom__message-meta">
                        <strong class="chatroom__author">${this._escape(app.label || app.name)}</strong>
                    </header>
                    <p class="chatroom__text chatroom__thinking-dots">
                        <span aria-label="Thinking"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </p>
                </div>
            </div>`;
        container.appendChild(el);
        container.scrollTop = container.scrollHeight;
        return el;
    }

    /**
     * Append an AI response message from an MCP app.
     * @param {object} app
     * @param {string} query  Original user query
     * @param {object} data   Response data from the MCP endpoint
     */
    _appendMcpMessage(app, query, data) {
        const container = this.elements.messagesContainer;
        if (!container) return;

        const text = typeof data === 'string' ? data
            : data.text || data.content || data.message || data.result || data.answer
            || JSON.stringify(data, null, 2);

        const hasToolCall = data.tool_used || data.tool || data.tool_name;
        const toolName = hasToolCall ? (data.tool_used || data.tool || data.tool_name) : null;

        const el = document.createElement('div');
        el.className = 'chatroom__message chatroom__message--ai';
        el.innerHTML = `
            <div class="chatroom__message-row">
                <span class="chatroom__avatar chatroom__avatar--ai" aria-hidden="true">
                    <i class="${this._safeIcon(app.icon)}" aria-hidden="true"></i>
                </span>
                <div class="chatroom__message-body">
                    <header class="chatroom__message-meta">
                        <strong class="chatroom__author">${this._escape(app.label || app.name)}</strong>
                        <time class="chatroom__time">${this._formatNow()}</time>
                        ${toolName ? `<span class="chatroom__tool-badge" title="Tool used"><i class="fas fa-wrench" aria-hidden="true"></i> ${this._escape(toolName)}</span>` : ''}
                    </header>
                    <p class="chatroom__text">${this._escape(text)}</p>
                    ${this._renderToolResult(data)}
                </div>
            </div>`;
        container.appendChild(el);
        container.scrollTop = container.scrollHeight;
    }

    /**
     * Append an error message for a failed MCP call.
     * @param {object} app
     * @param {string} errorText
     */
    _appendMcpError(app, errorText) {
        const container = this.elements.messagesContainer;
        if (!container) return;

        const el = document.createElement('div');
        el.className = 'chatroom__message chatroom__message--ai chatroom__message--ai-error';
        el.innerHTML = `
            <div class="chatroom__message-row">
                <span class="chatroom__avatar chatroom__avatar--ai chatroom__avatar--ai-error" aria-hidden="true">
                    <i class="fas fa-exclamation-triangle" aria-hidden="true"></i>
                </span>
                <div class="chatroom__message-body">
                    <header class="chatroom__message-meta">
                        <strong class="chatroom__author">${this._escape(app.label || app.name)}</strong>
                        <time class="chatroom__time">${this._formatNow()}</time>
                    </header>
                    <p class="chatroom__text chatroom__text--error">
                        <i class="fas fa-circle-xmark" aria-hidden="true"></i> ${this._escape(errorText)}
                    </p>
                </div>
            </div>`;
        container.appendChild(el);
        container.scrollTop = container.scrollHeight;
    }

    /**
     * Render a structured tool-result card if the response data has a
     * `tool_result` or `results` field with an array.
     * @param {object} data
     * @returns {string} HTML string or empty string
     */
    _renderToolResult(data) {
        const results = data.tool_result || data.results || data.documents || data.items;
        if (!Array.isArray(results) || results.length === 0) return '';

        const rows = results.slice(0, 5).map(item => {
            if (typeof item === 'string') {
                return `<li class="chatroom__tool-result-item">${this._escape(item)}</li>`;
            }
            const label = item.title || item.name || item.label || item.id || '';
            const detail = item.content || item.description || item.value || '';
            return `<li class="chatroom__tool-result-item">
                        <strong class="chatroom__tool-result-label">${this._escape(label)}</strong>
                        ${detail ? `<span class="chatroom__tool-result-detail">${this._escape(String(detail))}</span>` : ''}
                    </li>`;
        }).join('');

        const more = results.length > 5
            ? `<li class="chatroom__tool-result-more">+${results.length - 5} more</li>` : '';

        return `<ul class="chatroom__tool-results" aria-label="Tool results">${rows}${more}</ul>`;
    }

    /**
     * Update the MCP apps toggle button badge to show pending request count.
     */
    _updateMcpAppsToggleBadge() {
        const toggle = this.elements.mcpAppsToggle;
        if (!toggle) return;
        let badge = toggle.querySelector('.chatroom-mcp-badge');
        if (this._mcpPendingCount > 0) {
            if (!badge) {
                badge = document.createElement('span');
                badge.className = 'chatroom-mcp-badge';
                badge.setAttribute('aria-hidden', 'true');
                toggle.appendChild(badge);
            }
            badge.textContent = this._mcpPendingCount;
        } else if (badge) {
            badge.remove();
        }
    }

    /** Toggle the MCP apps panel open/closed. */
    toggleMcpAppsPanel() {
        const panel = this.elements.mcpAppsPanel;
        if (!panel) return;
        const isOpen = panel.getAttribute('aria-hidden') !== 'true';
        this._setPanelOpen(panel, !isOpen);
    }

    /** Close the MCP apps panel. */
    closeMcpAppsPanel() {
        const panel = this.elements.mcpAppsPanel;
        if (!panel) return;
        this._setPanelOpen(panel, false);
    }

    /**
     * Set the open state of the MCP apps panel and synchronise ARIA attributes.
     * When open:  role=region and aria-label are present so screen readers know
     *             they are inside the "MCP Apps" landmark.
     * When closed: role and aria-label are removed to avoid conflicting semantics
     *              on an aria-hidden element.
     * @param {HTMLElement} panel
     * @param {boolean} open
     */
    _setPanelOpen(panel, open) {
        panel.setAttribute('aria-hidden', open ? 'false' : 'true');
        panel.classList.toggle('chatroom-mcp-apps--open', open);
        if (open) {
            panel.setAttribute('role', 'region');
            panel.setAttribute('aria-label', 'MCP Apps');
        } else {
            panel.removeAttribute('role');
            panel.removeAttribute('aria-label');
        }
        if (this.elements.mcpAppsToggle) {
            this.elements.mcpAppsToggle.setAttribute('aria-expanded', String(open));
        }
    }

    // =========================================================================
    // Messaging
    // =========================================================================

    async connect() {
        try {
            this.updateConnectionStatus('connecting');
            // Override this method in subclasses for specific connection logic
            const response = await fetch(`${this.config.apiEndpoint}/connect`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                this._apiConnected = true;
                this.updateConnectionStatus('connected');
                await this.loadMessages();
            } else {
                throw new Error('Connection failed');
            }
        } catch (error) {
            console.error('Chatroom connection error:', error);
            this._apiConnected = false;
            this.updateConnectionStatus('error');
        }
    }

    updateConnectionStatus(status) {
        if (!this.elements.connectionStatus) return;

        const statusText = {
            connecting: 'Connecting...',
            connected: 'Live',
            error: 'Connection Error',
            disconnected: 'Disconnected'
        };

        const statusClass = {
            connecting: 'chatroom-status-connecting',
            connected: 'chatroom-status-online',
            error: 'chatroom-status-error',
            disconnected: 'chatroom-status-offline'
        };

        this.elements.connectionStatus.textContent = statusText[status] || status;
        this.elements.connectionStatus.className = `chatroom-status ${statusClass[status] || ''}`;

        this.dispatchEvent(new CustomEvent('chatroom-status-change', {
            bubbles: true,
            detail: { status }
        }));
    }

    async sendMessage() {
        if (!this.elements.inputField) return;
        const text = this.elements.inputField.value.trim();
        if (!text) return;

        // Check for slash command directed at an MCP app
        const slashCmd = this._detectSlashCommand(text);
        if (slashCmd) {
            // Append the user's slash command as a regular message first
            this._appendUserMessage(text);
            this.elements.inputField.value = '';
            this._resetPlaceholder();
            await this.callMcpApp(slashCmd.app, slashCmd.query);
            return;
        }

        const message = {
            text,
            timestamp: new Date().toISOString(),
            sender: 'user'
        };

        this.dispatchEvent(new CustomEvent('chatroom-send-message', {
            bubbles: true,
            detail: { message }
        }));

        if (this.config.apiEndpoint) {
            try {
                const response = await fetch(`${this.config.apiEndpoint}/messages`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(message)
                });

                if (response.ok) {
                    this.elements.inputField.value = '';
                    this._resetPlaceholder();
                    if (this.elements.charCount) {
                        this.elements.charCount.textContent = `0/${this.config.maxLength}`;
                    }
                    await this.loadMessages();
                }
            } catch (error) {
                console.error('Error sending message:', error);
                this.dispatchEvent(new CustomEvent('chatroom-error', {
                    bubbles: true,
                    detail: { error, context: 'send-message' }
                }));
            }
        } else {
            // No API endpoint — append directly
            const container = this.elements.messagesContainer;
            if (container) {
                container.insertAdjacentHTML('beforeend', this._renderOwnMsg({
                    text,
                    time: this._formatNow(),
                    author: 'You',
                    initials: 'Y',
                }));
                container.scrollTop = container.scrollHeight;
            }
            this.elements.inputField.value = '';
            this._resetPlaceholder();
        }
    }

    /**
     * Append a user message bubble directly to the messages container.
     * Used when sending slash commands so the user sees their own text.
     * @param {string} text
     */
    _appendUserMessage(text) {
        const container = this.elements.messagesContainer;
        if (!container) return;
        const el = document.createElement('div');
        el.className = 'chatroom__message chatroom__message--own';
        el.innerHTML = `
            <div class="chatroom__message-row">
                <div class="chatroom__message-body">
                    <header class="chatroom__message-meta">
                        <time class="chatroom__time">${this._formatNow()}</time>
                        <strong class="chatroom__author">You</strong>
                    </header>
                    <p class="chatroom__text">${this._escape(text)}</p>
                </div>
                <span class="chatroom__avatar chatroom__avatar--you" aria-hidden="true">Y</span>
            </div>`;
        container.appendChild(el);
        container.scrollTop = container.scrollHeight;
    }

    _resetPlaceholder() {
        if (this.elements.inputField) {
            this.elements.inputField.setAttribute('placeholder', this.config.placeholder);
        }
    }

    async loadMessages() {
        if (!this.config.apiEndpoint) return;

        try {
            const response = await fetch(`${this.config.apiEndpoint}/messages`);
            if (response.ok) {
                const messages = await response.json();
                const container = this.elements.messagesContainer;
                if (!container) return;
                container.innerHTML = Array.isArray(messages) && messages.length
                    ? messages.map(m => this._renderMessage(m)).join('')
                    : '<div class="chatroom-empty-state">No messages yet. Start the conversation!</div>';
                container.scrollTop = container.scrollHeight;
            }
        } catch (error) {
            console.error('Error loading messages:', error);
        }
    }

    emitTyping(isTyping) {
        this.dispatchEvent(new CustomEvent('chatroom-typing', {
            bubbles: true,
            detail: { isTyping }
        }));
    }

    startAutoRefresh() {
        this.refreshIntervalId = setInterval(() => {
            if (this._apiConnected) {
                this.loadMessages();
            }
        }, this.config.refreshInterval);
    }

    stopAutoRefresh() {
        if (this.refreshIntervalId) {
            clearInterval(this.refreshIntervalId);
            this.refreshIntervalId = null;
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.stopAutoRefresh();
        this.dispatchEvent(new CustomEvent('chatroom-disconnected', { bubbles: true }));
    }

    // =========================================================================
    // Public API
    // =========================================================================

    updateTitle(title) {
        this.config.title = title;
        if (this.elements.title) {
            this.elements.title.textContent = title;
        }
    }

    updateParticipants(count) {
        this.config.participants = count;
        if (this.elements.participants) {
            this.elements.participants.textContent = `${count} participants`;
        }
    }

    clearMessages() {
        this.messages = [];
        this.renderMessages();
    }

    // =========================================================================
    // Helpers
    // =========================================================================

    /** Safely escape HTML for text content. */
    _escape(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    /** Validate and return a safe Font Awesome class string. */
    _safeIcon(icon) {
        if (!icon) return 'fas fa-robot';
        // Allow only alphanumeric, hyphens, spaces — no injection vectors
        return /^[\w\s-]+$/.test(icon) ? icon : 'fas fa-robot';
    }

    /** Format the current time as HH:MM AM/PM. */
    _formatNow() {
        return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    }
}

// Register the custom element
if (!customElements.get('chatroom-app')) {
    customElements.define('chatroom-app', ChatroomApp);
}

export default ChatroomApp;
