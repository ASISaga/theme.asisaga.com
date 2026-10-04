/**
 * Chatroom Web Component
 *
 * Hydrates the static chatroom shell shipped by the theme's Liquid includes
 * (_includes/chatroom/header.html, messages.html, input.html, mcp-panel.html,
 * toggle-strip.html, members-sidebar.html) and manages all interactive
 * behaviour. All structural chrome is static HTML rendered at Jekyll build
 * time — this class never clones or generates structural markup. Its only
 * generative role is inserting genuinely dynamic content: chat messages,
 * MCP tool results, and live status/count updates.
 *
 * Built on Lit (https://lit.dev) for reactive properties and lifecycle management.
 * Extends GenesisElement (LitElement, light DOM) — the same base as all other
 * Genesis web components.
 *
 * Usage — via the chatroom layout (maps front-matter → attributes AND emits
 * the static shell this class hydrates):
 *   layout: chatroom
 *   title: My Chat
 *
 * A page using this layout already contains, in its rendered HTML: the
 * header, messages container, input bar, optional MCP panel, and optional
 * toggle-strip/members-sidebar (see _layouts/chatroom.html). This class does
 * not build any of that — it queries for it and attaches behaviour.
 */

import { GenesisElement } from './common/genesis-element.js';
import { ensureChatroomTemplates } from './chatroom-templates.js';
import './chatroom-panels.js';

export class ChatroomApp extends GenesisElement {
    static properties = {
        title:                { type: String },
        participants:         { type: String },
        placeholder:          { type: String },
        maxLength:            { type: Number,  attribute: 'max-length' },
        showConnectionStatus: { type: Boolean, attribute: 'show-connection-status' },
        mcpApps:              { type: String,  attribute: 'mcp-apps' },
        mcpEndpoint:          { type: String,  attribute: 'mcp-endpoint' },
        chatData:             { type: String,  attribute: 'chat-data' },
        apiEndpoint:          { type: String,  attribute: 'api-endpoint' },
        autoRefresh:          { type: Boolean, attribute: 'auto-refresh' },
        refreshInterval:      { type: Number,  attribute: 'refresh-interval' },
        theme:                { type: String },
        owner:                { type: String },
        stepId:               { type: String,  attribute: 'step-id' },
        totalSteps:           { type: Number,  attribute: 'total-steps' },
    };

    constructor() {
        super();
        this.config = null;
        this._mcpPendingCount = 0;
        this.refreshIntervalId = null;
        this._apiConnected = false;
        this._domainTemplates = null;
        this._sharedTemplates = null;
        this.maxLength = 1000;
        this.refreshInterval = 3000;
    }

    _parseMcpApps(raw) {
        if (!raw) return [];
        try {
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return raw.split(',').map(token => {
                const [name, endpoint = ''] = token.trim().split(':');
                return { name: name.trim(), label: name.trim(), endpoint: endpoint.trim(), icon: 'fas fa-robot' };
            }).filter(app => app.name);
        }
    }

    connectedCallback() {
        super.connectedCallback();

        // Dynamic-content templates (message bubbles, tool-result rows) still
        // need to exist for the legacy msg.type fallback path and the
        // _cloneDomainAgentTemplate() fallback — structural chrome does not
        // use this mechanism at all, since it's already static HTML.
        ensureChatroomTemplates();

        this.setAttribute('data-chatroom-component', '');
        document.body.classList.add('chatroom-body');
        this.closest('main')?.classList.add('chatroom-main');
        if (this.theme) this.classList.add(`chatroom--theme-${this.theme}`);

        this.config = {
            title: this.title || 'Chat',
            participants: this.participants || null,
            placeholder: this.placeholder || 'Type a message...',
            maxLength: this.maxLength || 1000,
            showConnectionStatus: this.showConnectionStatus,
            apiEndpoint: this.apiEndpoint || null,
            autoRefresh: this.autoRefresh,
            refreshInterval: this.refreshInterval || 3000,
            mcpApps: this._parseMcpApps(this.mcpApps),
            mcpEndpoint: this.mcpEndpoint || null,
            chatMessages: this._parseChatData(this.chatData),
            owner: this.owner || null,
            stepId: this.stepId || null,
            totalSteps: this.totalSteps || null,
        };

        this._hydrate();
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

    updated(changedProperties) {
        super.updated(changedProperties);
        if (!this.hasUpdated || !this.config) return;
        if (changedProperties.has('title')) {
            this.updateTitle(this.title);
        }
        if (changedProperties.has('participants')) {
            this.updateParticipants(this.participants);
        }
        if (changedProperties.has('theme')) {
            const prev = changedProperties.get('theme');
            if (prev) this.classList.remove(`chatroom--theme-${prev}`);
            if (this.theme) this.classList.add(`chatroom--theme-${this.theme}`);
        }
    }

    // =========================================================================
    // Hydration — the static shell already exists in the DOM (rendered by the
    // theme's Liquid includes at build time). This class only populates
    // dynamic content into it and calls subclass extension hooks. It never
    // clones or builds structural markup.
    // =========================================================================

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
     * Clone an HTML <template> element by ID and return its first child element.
     * Used only for genuinely dynamic content (messages, MCP results) — never
     * for structural chrome, which is static HTML already in the DOM.
     */
    _cloneTemplate(id) {
        const tpl = document.getElementById(id);
        if (!tpl) return null;
        return tpl.content.firstElementChild.cloneNode(true);
    }

    /**
     * Populate the already-static shell with initial dynamic content: title,
     * owner, step progress, participants, MCP toggle badge, and any
     * pre-loaded chat messages. Calls the subclass extension hooks
     * (_onInputBuilt, _onLayoutBuilt) against the existing static input/root
     * elements, so subclasses can still add their own buttons without any
     * class needing to generate structural markup.
     */
    _hydrate() {
        const { title, owner, stepId, totalSteps, participants, mcpApps, chatMessages } = this.config;

        const titleEl = this.querySelector('.chatroom-title');
        if (titleEl) titleEl.textContent = title;

        const ownerEl = this.querySelector('.chatroom-owner');
        if (ownerEl && owner) {
            ownerEl.textContent = owner;
            ownerEl.hidden = false;
        }

        const stepEl = this.querySelector('.chatroom-step-progress');
        if (stepEl && stepId && totalSteps) {
            stepEl.textContent = `Step ${stepId} of ${totalSteps}`;
            stepEl.hidden = false;
        }

        const participantsEl = this.querySelector('.chatroom-participants');
        if (participantsEl && participants) {
            participantsEl.textContent = `${participants} agents in session`;
            participantsEl.hidden = false;
        }

        const messagesEl = this.querySelector('.chatroom-messages');
        if (messagesEl && chatMessages.length > 0) {
            messagesEl.replaceChildren();
            chatMessages.forEach(m => {
                const el = this._buildMessage(m);
                if (el) messagesEl.appendChild(el);
            });
        }

        const inputEl = this.querySelector('.chatroom-input');
        if (inputEl) this._onInputBuilt(inputEl);
        this._onLayoutBuilt(this);

        if (messagesEl) messagesEl.scrollTop = messagesEl.scrollHeight;

        // The static MCP panel/toggle may exist from build time even if the
        // JS-resolved mcpApps ended up empty (e.g. malformed JSON in the
        // mcp-apps attribute) — reconcile that here.
        const mcpToggle = this.querySelector('.chatroom-mcp-apps-toggle');
        if (mcpToggle && mcpApps.length === 0) {
            mcpToggle.hidden = true;
        }
    }

    /**
     * Extension hook — called with the static .chatroom-input element after
     * hydration. Override in subclasses to add toolbar buttons, file-attach
     * controls, or other input-area customisations into its existing
     * .chatroom-input-toolbar-left / -right slots.
     */
    // eslint-disable-next-line no-unused-vars
    _onInputBuilt(_inputEl) { /* override in subclasses */ }

    /**
     * Extension hook — called with the component root after hydration.
     * Override in subclasses to add header action buttons, inject extra
     * markup into the existing static header, or wire additional behavior.
     * Header action buttons go into `.chatroom-actions` and should use
     * `class="chatroom-header-btn"` — the theme's styled icon-button
     * contract (same chrome as `.chatroom-settings-btn`).
     */
    // eslint-disable-next-line no-unused-vars
    _onLayoutBuilt(_rootEl) { /* override in subclasses */ }

    // =========================================================================
    // JSON-LD Domain API
    // =========================================================================

    registerDomain(typeToTemplateMap) {
        this._domainTemplates = Object.assign({}, typeToTemplateMap);
    }

    registerSharedTemplates(typeToTemplateMap) {
        this._sharedTemplates = Object.assign({}, typeToTemplateMap);
    }

    loadDomain(messages) {
        if (!Array.isArray(messages)) return;
        const container = this.elements?.messagesContainer;
        if (!container) return;
        container.replaceChildren();
        messages.forEach(item => {
            const el = this._buildFromJsonLd(item);
            if (el) container.appendChild(el);
        });
        container.scrollTop = container.scrollHeight;
    }

    _buildFromJsonLd(item) {
        if (!item || (!this._domainTemplates && !this._sharedTemplates)) return null;
        const type = item['@type'];
        if (!type) return null;
        const templateId = this._domainTemplates?.[type] ?? this._sharedTemplates?.[type];
        if (!templateId) return null;
        const el = this._cloneTemplate(templateId);
        if (!el) return null;
        this._fillFromSchema(el, item);
        return el;
    }

    _fillFromSchema(el, data) {
        el.querySelectorAll('[data-schema]').forEach(field => {
            const value = this._getJsonLdValue(data, field.getAttribute('data-schema'));
            if (value !== null && value !== undefined && value !== '') {
                field.textContent = String(value);
                field.removeAttribute('hidden');
            }
        });

        el.querySelectorAll('[data-schema-avatar]').forEach(avatarEl => {
            const id = this._getJsonLdValue(data, avatarEl.getAttribute('data-schema-avatar'));
            if (!id) return;
            const safeId = this._safeClass(String(id));
            avatarEl.classList.add(`chatroom__avatar--${safeId}`);

            const iconPath = avatarEl.getAttribute('data-schema-avatar-icon');
            const iconClass = iconPath ? this._getJsonLdValue(data, iconPath) : null;
            if (iconClass) {
                const i = document.createElement('i');
                i.className = this._safeIcon(String(iconClass));
                i.setAttribute('aria-hidden', 'true');
                avatarEl.replaceChildren(i);
            } else {
                avatarEl.textContent = String(id).toUpperCase().slice(0, 3);
            }
        });

        el.querySelectorAll('[data-schema-list]').forEach(listEl => {
            const items = this._getJsonLdValue(data, listEl.getAttribute('data-schema-list'));
            if (!Array.isArray(items) || !items.length) return;
            listEl.replaceChildren();
            items.forEach(item => {
                const label = item.name || item.label || '';
                const detail = item.description || item.detail || '';
                const row = this._buildToolResultItem(label, detail);
                if (row) listEl.appendChild(row);
            });
            listEl.removeAttribute('hidden');
        });

        el.querySelectorAll('[data-schema-parent-show]').forEach(parentEl => {
            const value = this._getJsonLdValue(data, parentEl.getAttribute('data-schema-parent-show'));
            if (value !== null && value !== undefined && value !== '') {
                parentEl.removeAttribute('hidden');
            }
        });
    }

    _getJsonLdValue(data, path) {
        if (!path) return null;
        return path.split('.').reduce((obj, key) => obj?.[key] ?? null, data) ?? null;
    }

    _cloneDomainAgentTemplate() {
        const agentType = this._domainTemplates?.['__agent_message'];
        if (agentType) {
            const id = this._domainTemplates[agentType];
            if (id) return this._cloneTemplate(id);
        }
        const sharedType = this._sharedTemplates?.['__agent_message'];
        if (sharedType) {
            const id = this._sharedTemplates[sharedType];
            if (id) return this._cloneTemplate(id);
        }
        // eslint-disable-next-line no-console
        console.warn('[ChatroomApp] No agent message template found. Call registerSharedTemplates() or registerDomain() first.');
        return this._cloneTemplate('template-chatroom-message-ai');
    }

    _buildDomainUserMsg(text) {
        const userType =
            this._domainTemplates?.['__user_message'] ??
            this._sharedTemplates?.['__user_message'];
        if (!userType) return null;
        const msg = {
            '@type': userType,
            sender: { '@type': 'Person', name: 'You', identifier: 'you' },
            text,
            dateSent: this._formatNow(),
        };
        return this._buildFromJsonLd(msg);
    }

    _buildMessage(msg) {
        if (msg['@type'] && (this._domainTemplates || this._sharedTemplates)) {
            const el = this._buildFromJsonLd(msg);
            if (el) return el;
        }
        switch (msg.type) {
            case 'system':  return this._buildSystemMsg(msg);
            case 'ai':      return this._buildAiMsg(msg);
            case 'own':     return this._buildOwnMsg(msg);
            case 'typing':  return this._buildTypingMsg(msg);
            default:        return null;
        }
    }

    _buildSystemMsg(msg) {
        const el = this._cloneTemplate('template-chatroom-message-system');
        if (!el) return null;

        const kind = this._safeClass(msg.kind || 'default');
        el.classList.remove('chatroom__system-message--default');
        el.classList.add(`chatroom__system-message--${kind}`);

        const labelEl = el.querySelector('.chatroom__agenda-label');
        if (labelEl && msg.label) {
            labelEl.textContent = msg.label;
            labelEl.hidden = false;
        }

        const titleEl = el.querySelector('.chatroom__agenda-title');
        if (titleEl && msg.title) {
            titleEl.textContent = msg.title;
            titleEl.hidden = false;
        }

        return el;
    }

    _buildAiMsg(msg) {
        const el = this._cloneTemplate('template-chatroom-message-ai');
        if (!el) return null;

        const avatar = msg.avatar || 'ai';
        const avatarEl = el.querySelector('.chatroom__avatar');
        if (avatarEl) {
            avatarEl.classList.add(`chatroom__avatar--${this._safeClass(avatar)}`);
            if (avatar === 'ai') {
                const iconEl = avatarEl.querySelector('i');
                if (iconEl) {
                    iconEl.className = this._safeIcon(msg.icon || 'fas fa-robot');
                    iconEl.setAttribute('aria-hidden', 'true');
                }
            } else {
                avatarEl.textContent = avatar.toUpperCase();
            }
        }

        const authorEl = el.querySelector('.chatroom__author');
        if (authorEl && msg.author) {
            authorEl.textContent = msg.author;
            authorEl.hidden = false;
        }

        const roleEl = el.querySelector('.chatroom__agent-role');
        if (roleEl && msg.role) {
            roleEl.textContent = msg.role;
            roleEl.hidden = false;
        }

        const timeEl = el.querySelector('.chatroom__time');
        if (timeEl && msg.time) {
            timeEl.textContent = msg.time;
            timeEl.hidden = false;
        }

        const badgeEl = el.querySelector('.chatroom__tool-badge');
        if (badgeEl && msg.tool_badge) {
            const iconEl = badgeEl.querySelector('i');
            if (iconEl) {
                iconEl.className = this._safeIcon(msg.tool_badge_icon || 'fas fa-wrench');
                iconEl.setAttribute('aria-hidden', 'true');
            }
            const textEl = badgeEl.querySelector('.chatroom__tool-badge-text');
            if (textEl) textEl.textContent = msg.tool_badge;
            badgeEl.hidden = false;
        }

        const textEl = el.querySelector('.chatroom__text');
        if (textEl) textEl.textContent = msg.text || '';

        if (Array.isArray(msg.tool_results) && msg.tool_results.length) {
            const listEl = el.querySelector('.chatroom__tool-results');
            if (listEl) {
                listEl.setAttribute('aria-label', `${msg.author || ''} results`);
                msg.tool_results.forEach(r => {
                    const item = this._buildToolResultItem(r.label, r.detail);
                    if (item) listEl.appendChild(item);
                });
                listEl.hidden = false;
            }
        }

        return el;
    }

    _buildOwnMsg(msg) {
        const el = this._cloneTemplate('template-chatroom-message-own');
        if (!el) return null;

        const timeEl = el.querySelector('.chatroom__time');
        if (timeEl && msg.time) {
            timeEl.textContent = msg.time;
            timeEl.hidden = false;
        }

        const authorEl = el.querySelector('.chatroom__author');
        if (authorEl && msg.author) {
            authorEl.textContent = msg.author;
            authorEl.hidden = false;
        }

        const textEl = el.querySelector('.chatroom__text');
        if (textEl) textEl.textContent = msg.text || '';

        const avatarEl = el.querySelector('.chatroom__avatar');
        if (avatarEl) avatarEl.textContent = msg.initials || 'Y';

        return el;
    }

    _buildTypingMsg(msg) {
        const el = this._cloneTemplate('template-chatroom-message-typing');
        if (!el) return null;

        const avatar = msg.avatar || 'ai';
        const avatarEl = el.querySelector('.chatroom__avatar');
        if (avatarEl) {
            avatarEl.classList.add(`chatroom__avatar--${this._safeClass(avatar)}`);
            avatarEl.textContent = avatar.toUpperCase();
        }

        const textEl = el.querySelector('.chatroom__typing-text');
        if (textEl) textEl.textContent = msg.text || '';

        return el;
    }

    _buildToolResultItem(label, detail) {
        const item = this._cloneTemplate('template-chatroom-tool-result-item');
        if (!item) return null;

        const labelEl = item.querySelector('.chatroom__tool-result-label');
        if (labelEl && label) {
            labelEl.textContent = label;
            labelEl.hidden = false;
        }

        const detailEl = item.querySelector('.chatroom__tool-result-detail');
        if (detailEl && detail !== undefined && detail !== null && detail !== '') {
            const detailText = typeof detail === 'object'
                ? JSON.stringify(detail, null, 2)
                : String(detail);
            detailEl.textContent = detailText;
            detailEl.hidden = false;
        }

        return item;
    }

    /**
     * Query the static shell for the elements this class needs to hydrate
     * and wire behaviour into. Every selector below targets HTML that
     * already exists — rendered by _includes/chatroom/*.html at build time.
     */
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
        if (this.elements.sendButton) {
            this.elements.sendButton.addEventListener('click', () => this.sendMessage());
        }

        if (this.elements.inputField) {
            this.elements.inputField.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });

            if (this.elements.charCount) {
                this.elements.inputField.addEventListener('input', () => {
                    const count = this.elements.inputField.value.length;
                    this.elements.charCount.textContent = `${count}/${this.config.maxLength}`;
                });
            }

            if (this.config.showTypingIndicator) {
                let typingTimeout;
                this.elements.inputField.addEventListener('input', () => {
                    clearTimeout(typingTimeout);
                    this.emitTyping(true);
                    typingTimeout = setTimeout(() => this.emitTyping(false), 1000);
                });
            }

            this.elements.inputField.addEventListener('input', () => this._updateSlashHint());
        }

        if (this.elements.mcpAppsToggle) {
            this.elements.mcpAppsToggle.addEventListener('click', () => this.toggleMcpAppsPanel());
        }
    }

    // =========================================================================
    // MCP App Support
    // =========================================================================

    /**
     * Wire up click handlers on the static MCP app buttons already rendered
     * by _includes/chatroom/mcp-panel.html. Does not generate any markup —
     * the buttons and their data-mcp-app/data-mcp-endpoint attributes are
     * already in the DOM.
     */
    _setupMcpAppsPanel() {
        if (!this.config.mcpApps.length) return;

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

    _activateMcpApp(appName) {
        if (!this.elements.inputField) return;
        this.elements.inputField.value = `/${appName} `;
        this.elements.inputField.focus();
        const len = this.elements.inputField.value.length;
        this.elements.inputField.setSelectionRange(len, len);
        this._updateSlashHint();
        this.closeMcpAppsPanel();
    }

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

    _detectSlashCommand(text) {
        const match = text.match(/^\/(\S+)\s*([\s\S]*)$/);
        if (!match) return null;
        const [, appName, query] = match;
        const app = this.config.mcpApps.find(a => a.name === appName);
        if (!app) return null;
        return { app, query: query.trim() };
    }

    async callMcpApp(app, query) {
        const endpoint = app.endpoint || this.config.mcpEndpoint;
        if (!endpoint) {
            this._appendMcpError(app, 'No endpoint configured for this MCP app.');
            return;
        }

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

    _appendMcpThinking(app) {
        const container = this.elements.messagesContainer;
        if (!container) return document.createElement('div');

        const el = this._cloneDomainAgentTemplate();
        if (!el) return document.createElement('div');

        el.classList.add('chatroom__message--thinking');
        el.setAttribute('aria-live', 'polite');

        const avatarEl = el.querySelector('.chatroom__avatar');
        if (avatarEl) {
            avatarEl.classList.add('chatroom__avatar--ai');
            const iconEl = avatarEl.querySelector('i');
            if (iconEl) {
                iconEl.className = this._safeIcon(app.icon || 'fas fa-robot');
                iconEl.setAttribute('aria-hidden', 'true');
            } else {
                const i = document.createElement('i');
                i.className = this._safeIcon(app.icon || 'fas fa-robot');
                i.setAttribute('aria-hidden', 'true');
                avatarEl.replaceChildren(i);
            }
        }

        const authorEl = el.querySelector('.chatroom__author');
        if (authorEl) {
            authorEl.textContent = app.label || app.name;
            authorEl.hidden = false;
        }

        const textEl = el.querySelector('.chatroom__text');
        if (textEl) {
            textEl.classList.add('chatroom__thinking-dots');
            const dot1 = document.createElement('span');
            dot1.setAttribute('aria-label', 'Thinking');
            const dot2 = document.createElement('span');
            dot2.setAttribute('aria-hidden', 'true');
            const dot3 = document.createElement('span');
            dot3.setAttribute('aria-hidden', 'true');
            textEl.replaceChildren(dot1, dot2, dot3);
        }

        container.appendChild(el);
        container.scrollTop = container.scrollHeight;
        return el;
    }

    _appendMcpMessage(app, query, data) {
        const container = this.elements.messagesContainer;
        if (!container) return;

        const text = typeof data === 'string' ? data
            : data.text || data.content || data.message || data.result || data.answer
            || JSON.stringify(data, null, 2);

        const hasToolCall = data.tool_used || data.tool || data.tool_name;
        const toolName = hasToolCall ? (data.tool_used || data.tool || data.tool_name) : null;

        const el = this._cloneDomainAgentTemplate();
        if (!el) return;

        const avatarEl = el.querySelector('.chatroom__avatar');
        if (avatarEl) {
            avatarEl.classList.add('chatroom__avatar--ai');
            const iconEl = avatarEl.querySelector('i');
            if (iconEl) {
                iconEl.className = this._safeIcon(app.icon || 'fas fa-robot');
                iconEl.setAttribute('aria-hidden', 'true');
            } else {
                const i = document.createElement('i');
                i.className = this._safeIcon(app.icon || 'fas fa-robot');
                i.setAttribute('aria-hidden', 'true');
                avatarEl.replaceChildren(i);
            }
        }

        const authorEl = el.querySelector('.chatroom__author');
        if (authorEl) {
            authorEl.textContent = app.label || app.name;
            authorEl.hidden = false;
        }

        const timeEl = el.querySelector('.chatroom__time');
        if (timeEl) {
            timeEl.textContent = this._formatNow();
            timeEl.hidden = false;
        }

        if (toolName) {
            const badgeEl = el.querySelector('.chatroom__tool-badge');
            if (badgeEl) {
                const iconEl = badgeEl.querySelector('i');
                if (iconEl) {
                    iconEl.className = 'fas fa-wrench';
                    iconEl.setAttribute('aria-hidden', 'true');
                }
                const textSpan = badgeEl.querySelector('.chatroom__tool-badge-text');
                if (textSpan) textSpan.textContent = toolName;
                badgeEl.title = 'Tool used';
                badgeEl.hidden = false;
            }
        }

        const textEl = el.querySelector('.chatroom__text');
        if (textEl) textEl.textContent = text;

        this._appendToolResults(el, data);

        container.appendChild(el);
        container.scrollTop = container.scrollHeight;
    }

    _appendMcpError(app, errorText) {
        const container = this.elements.messagesContainer;
        if (!container) return;

        const el = this._cloneDomainAgentTemplate();
        if (!el) return;

        el.classList.add('chatroom__message--ai-error');

        const avatarEl = el.querySelector('.chatroom__avatar');
        if (avatarEl) {
            avatarEl.classList.add('chatroom__avatar--ai-error');
            const iconEl = avatarEl.querySelector('i');
            if (iconEl) {
                iconEl.className = 'fas fa-exclamation-triangle';
                iconEl.setAttribute('aria-hidden', 'true');
            } else {
                const i = document.createElement('i');
                i.className = 'fas fa-exclamation-triangle';
                i.setAttribute('aria-hidden', 'true');
                avatarEl.replaceChildren(i);
            }
        }

        const authorEl = el.querySelector('.chatroom__author');
        if (authorEl) {
            authorEl.textContent = app.label || app.name;
            authorEl.hidden = false;
        }

        const timeEl = el.querySelector('.chatroom__time');
        if (timeEl) {
            timeEl.textContent = this._formatNow();
            timeEl.hidden = false;
        }

        const textEl = el.querySelector('.chatroom__text');
        if (textEl) {
            textEl.classList.add('chatroom__text--error');
            const xIcon = document.createElement('i');
            xIcon.className = 'fas fa-circle-xmark';
            xIcon.setAttribute('aria-hidden', 'true');
            textEl.replaceChildren(xIcon, document.createTextNode(` ${errorText}`));
        }

        container.appendChild(el);
        container.scrollTop = container.scrollHeight;
    }

    _appendToolResults(msgEl, data) {
        const results = data.tool_result || data.results || data.documents || data.items;
        if (!Array.isArray(results) || results.length === 0) return;

        const listEl = msgEl.querySelector('.chatroom__tool-results');
        if (!listEl) return;

        listEl.setAttribute('aria-label', 'Tool results');

        results.slice(0, 5).forEach(item => {
            let label = '';
            let detail = '';
            if (typeof item === 'string') {
                label = item;
            } else {
                label = item.title || item.name || item.label || item.id || '';
                detail = item.content || item.description || item.value || '';
            }
            const row = this._buildToolResultItem(label, detail);
            if (row) listEl.appendChild(row);
        });

        if (results.length > 5) {
            const more = document.createElement('li');
            more.className = 'chatroom__tool-result-more';
            more.textContent = `+${results.length - 5} more`;
            listEl.appendChild(more);
        }

        listEl.hidden = false;
    }

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

    toggleMcpAppsPanel() {
        const panel = this.elements.mcpAppsPanel;
        if (!panel) return;
        const isOpen = panel.getAttribute('aria-hidden') !== 'true';
        this._setPanelOpen(panel, !isOpen);
    }

    closeMcpAppsPanel() {
        const panel = this.elements.mcpAppsPanel;
        if (!panel) return;
        this._setPanelOpen(panel, false);
    }

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

        const slashCmd = this._detectSlashCommand(text);
        if (slashCmd) {
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
            const container = this.elements.messagesContainer;
            if (container) {
                const el = this._buildDomainUserMsg(text) ?? this._buildOwnMsg({
                    text,
                    time: this._formatNow(),
                    author: 'You',
                    initials: 'Y',
                });
                if (el) container.appendChild(el);
                container.scrollTop = container.scrollHeight;
            }
            this.elements.inputField.value = '';
            this._resetPlaceholder();
        }
    }

    _appendUserMessage(text) {
        const container = this.elements.messagesContainer;
        if (!container) return;
        const el = this._buildDomainUserMsg(text) ?? this._buildOwnMsg({
            time: this._formatNow(),
            author: 'You',
            text,
            initials: 'Y',
        });
        if (el) container.appendChild(el);
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
                container.replaceChildren();
                if (Array.isArray(messages) && messages.length) {
                    messages.forEach(m => {
                        const el = this._buildMessage(m);
                        if (el) container.appendChild(el);
                    });
                } else {
                    const empty = document.createElement('div');
                    empty.className = 'chatroom-empty-state';
                    empty.textContent = 'No messages yet. Start the conversation!';
                    container.appendChild(empty);
                }
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

        if (!document.querySelector('[data-chatroom-component]')) {
            document.body.classList.remove('chatroom-body');
        }
        const mainEl = this.closest('main') ?? document.querySelector('main');
        if (mainEl && !mainEl.querySelector('[data-chatroom-component]')) {
            mainEl.classList.remove('chatroom-main');
        }

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
        const container = this.elements?.messagesContainer;
        if (!container) return;
        container.replaceChildren();
        const empty = document.createElement('div');
        empty.className = 'chatroom-empty-state';
        empty.textContent = 'No messages yet. Start the conversation!';
        container.appendChild(empty);
    }

    // =========================================================================
    // Helpers
    // =========================================================================

    _safeIcon(icon) {
        if (!icon) return 'fas fa-robot';
        return /^[\w\s-]+$/.test(icon) ? icon : 'fas fa-robot';
    }

    _safeClass(value) {
        if (!value) return 'default';
        return String(value)
            .replace(/[^a-z0-9-]/gi, '-')
            .replace(/-+/g, '-')
            .replace(/^-+|-+$/g, '')
            .toLowerCase() || 'default';
    }

    _formatNow() {
        return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    }
}

if (!customElements.get('chatroom-app')) {
    customElements.define('chatroom-app', ChatroomApp);
}

export default ChatroomApp;
