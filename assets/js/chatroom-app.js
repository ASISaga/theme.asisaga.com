/**
 * Chatroom Web Component
 * Generic chatroom interface that can be extended for specific applications.
 * Supports MCP (Model Context Protocol) apps for AI agent integration.
 * Integrates with Jekyll liquid templates and external SCSS.
 */

class ChatroomApp extends HTMLElement {
    constructor() {
        super();
        // Don't use shadow DOM to allow Jekyll liquid to work
        // and external SCSS to style the component

        // Configuration from attributes
        this.config = {
            title: this.getAttribute('title') || 'Chat',
            participants: this.getAttribute('participants') || null,
            showAvatar: this.hasAttribute('show-avatar'),
            avatarUrl: this.getAttribute('avatar-url') || '/assets/images/default-avatar.png',
            placeholder: this.getAttribute('placeholder') || 'Type a message...',
            maxLength: parseInt(this.getAttribute('max-length')) || 1000,
            showToolbar: this.hasAttribute('show-toolbar'),
            showTypingIndicator: this.hasAttribute('show-typing-indicator'),
            showConnectionStatus: this.hasAttribute('show-connection-status'),
            apiEndpoint: this.getAttribute('api-endpoint') || null,
            autoRefresh: this.hasAttribute('auto-refresh'),
            refreshInterval: parseInt(this.getAttribute('refresh-interval')) || 3000,
            // MCP app support
            mcpApps: this._parseMcpApps(this.getAttribute('mcp-apps')),
            mcpEndpoint: this.getAttribute('mcp-endpoint') || null
        };

        // State
        this.messages = [];
        this.isConnected = false;
        this.typingUsers = [];
        this.refreshIntervalId = null;
        this._mcpPendingCount = 0;
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
        // The HTML structure is provided by Jekyll template
        // We just need to attach event handlers and initialize
        this.initializeElements();
        this.attachEventHandlers();
        this._setupMcpAppsPanel();

        if (this.config.apiEndpoint) {
            this.connect();
        }

        if (this.config.autoRefresh && this.config.apiEndpoint) {
            this.startAutoRefresh();
        }

        // Emit ready event
        this.dispatchEvent(new CustomEvent('chatroom-ready', {
            bubbles: true,
            detail: { config: this.config }
        }));
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
                this.isConnected = true;
                this.updateConnectionStatus('connected');
                await this.loadMessages();
            } else {
                throw new Error('Connection failed');
            }
        } catch (error) {
            console.error('Chatroom connection error:', error);
            this.isConnected = false;
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
            // No API endpoint, just add to local messages
            this.addMessage(message);
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
                this.messages = await response.json();
                this.renderMessages();
            }
        } catch (error) {
            console.error('Error loading messages:', error);
        }
    }

    renderMessages() {
        if (!this.elements.messagesContainer) return;

        this.elements.messagesContainer.innerHTML = '';

        if (this.messages.length === 0) {
            this.elements.messagesContainer.innerHTML = '<div class="chatroom-empty-state">No messages yet. Start the conversation!</div>';
            return;
        }

        this.messages.forEach(message => {
            const messageEl = this.createMessageElement(message);
            this.elements.messagesContainer.appendChild(messageEl);
        });

        // Scroll to bottom
        this.elements.messagesContainer.scrollTop = this.elements.messagesContainer.scrollHeight;
    }

    createMessageElement(message) {
        const div = document.createElement('div');
        div.className = `chatroom-message ${message.sender === 'user' ? 'chatroom-message-sent' : 'chatroom-message-received'}`;

        const avatar = document.createElement('img');
        avatar.src = message.avatar || this.config.avatarUrl;
        avatar.alt = message.sender;
        avatar.className = 'chatroom-message-avatar';

        const content = document.createElement('div');
        content.className = 'chatroom-message-content';

        const text = document.createElement('div');
        text.className = 'chatroom-message-text';
        text.textContent = message.text;

        const time = document.createElement('div');
        time.className = 'chatroom-message-time';
        time.textContent = this.formatTime(message.timestamp);

        content.appendChild(text);
        content.appendChild(time);
        div.appendChild(avatar);
        div.appendChild(content);

        return div;
    }

    addMessage(message) {
        this.messages.push(message);
        this.renderMessages();
    }

    formatTime(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    }

    emitTyping(isTyping) {
        this.dispatchEvent(new CustomEvent('chatroom-typing', {
            bubbles: true,
            detail: { isTyping }
        }));
    }

    startAutoRefresh() {
        this.refreshIntervalId = setInterval(() => {
            if (this.isConnected) {
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
customElements.define('chatroom-app', ChatroomApp);

export default ChatroomApp;
