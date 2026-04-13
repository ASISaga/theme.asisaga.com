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
 * The component is fully self-contained:
 *   - HTML templates are defined in chatroom-templates.js and injected into the
 *     DOM by the component itself on first use (no Jekyll layout required).
 *   - Viewport CSS classes (chatroom-body / chatroom-main) are applied to
 *     document.body / the nearest <main> in connectedCallback and removed in
 *     disconnectedCallback.
 *
 * Usage — drop into any layout without any special layout configuration:
 *   <chatroom-app title="My Chat" api-endpoint="/api/chat"></chatroom-app>
 *
 * Usage — via the convenience chatroom layout (maps front-matter → attributes):
 *   layout: chatroom
 *   title: My Chat
 *
 * Attributes / Lit reactive properties:
 *   title            — Chatroom title (default: "Chat")
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
import { ensureChatroomTemplates } from './chatroom-templates.js';

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
        // Theme variant: applying chatroom--theme-<value> as a CSS class allows
        // subclasses to style the component differently without a new layout file.
        theme:                { type: String },
        // Workflow owner shown in the chatroom header info bar.
        owner:                { type: String },
        // Step / total-steps pair for a progress indicator in the header.
        stepId:               { type: String,  attribute: 'step-id' },
        totalSteps:           { type: Number,  attribute: 'total-steps' },
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

        // Ensure the HTML <template> elements are in the DOM (self-provision if
        // the page does not use layout: chatroom to inject them via Jekyll).
        ensureChatroomTemplates();

        // Mark this element as a chatroom component so CSS selectors can target
        // any subclass without hardcoding element names in the stylesheet.
        this.setAttribute('data-chatroom-component', '');

        // Apply viewport classes so the component fills the full screen when used
        // in any layout — no body_class / main_class front-matter required.
        document.body.classList.add('chatroom-body');
        this.closest('main')?.classList.add('chatroom-main');

        // Apply theme variant CSS class when the theme attribute is set.
        if (this.theme) this.classList.add(`chatroom--theme-${this.theme}`);

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
            owner: this.owner || null,
            stepId: this.stepId || null,
            totalSteps: this.totalSteps || null,
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
        // Sync theme variant class when the theme attribute changes at runtime.
        if (changedProperties.has('theme')) {
            const prev = changedProperties.get('theme');
            if (prev) this.classList.remove(`chatroom--theme-${prev}`);
            if (this.theme) this.classList.add(`chatroom--theme-${this.theme}`);
        }
    }

    // =========================================================================
    // Rendering — component builds its own DOM from HTML templates
    // Templates are defined in chatroom-templates.js and injected into the DOM
    // by ensureChatroomTemplates() (called in connectedCallback).
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
     * Clone an HTML <template> element by ID and return its first child element.
     * @param {string} id  Template element ID (without leading '#')
     * @returns {Element|null}
     */
    _cloneTemplate(id) {
        const tpl = document.getElementById(id);
        if (!tpl) return null;
        return tpl.content.firstElementChild.cloneNode(true);
    }

    /**
     * Build the complete chatroom DOM from the layout template and insert it
     * into this element.  Called once from connectedCallback before event wiring.
     *
     * Render target resolution:
     *   1. If a `#chatArea` child element exists (placed by the layout when page
     *      content/panels are present), the chat UI is rendered into it — leaving
     *      sibling panels (sidebar, toggle strip, overlay, toasts) untouched.
     *   2. Otherwise the chat UI replaces all children of this element (original
     *      behaviour for plain chatroom pages with no panels).
     *
     * Extension hooks for subclasses (override instead of _render):
     *   _onInputBuilt(inputEl)  — called after the input bar is built; add
     *                             toolbar buttons, file-attach, etc.
     *   _onLayoutBuilt(layout)  — called after input is appended to layout and
     *                             before the layout is inserted into the DOM; add
     *                             header action buttons, badges, etc.
     */
    _render() {
        const { title, participants, placeholder, showToolbar, showConnectionStatus, mcpApps, chatMessages, owner, stepId, totalSteps } = this.config;

        const layout = this._cloneTemplate('template-chatroom-layout');
        if (!layout) return;

        // Populate title
        const titleEl = layout.querySelector('.chatroom-title');
        if (titleEl) titleEl.textContent = title;

        // Conditionally show owner label
        const ownerEl = layout.querySelector('.chatroom-owner');
        if (ownerEl && owner) {
            ownerEl.textContent = owner;
            ownerEl.hidden = false;
        }

        // Conditionally show step progress
        const stepEl = layout.querySelector('.chatroom-step-progress');
        if (stepEl && stepId && totalSteps) {
            stepEl.textContent = `Step ${stepId} of ${totalSteps}`;
            stepEl.hidden = false;
        }

        // Conditionally show participants count
        const participantsEl = layout.querySelector('.chatroom-participants');
        if (participantsEl && participants) {
            participantsEl.textContent = `${participants} agents in session`;
            participantsEl.hidden = false;
        }

        // Conditionally show connection status badge
        const statusContainer = layout.querySelector('.chatroom-status-container');
        if (statusContainer && showConnectionStatus) {
            statusContainer.hidden = false;
        }

        // Conditionally show MCP apps toggle button in the header
        const mcpToggle = layout.querySelector('.chatroom-mcp-apps-toggle');
        if (mcpToggle && mcpApps.length > 0) {
            mcpToggle.hidden = false;
        }

        // Insert MCP apps panel before the messages container
        if (mcpApps.length > 0) {
            const panel = this._buildMcpPanel(mcpApps);
            if (panel) {
                const messagesEl = layout.querySelector('.chatroom-messages');
                if (messagesEl) layout.insertBefore(panel, messagesEl);
            }
        }

        // Populate messages container
        const messagesEl = layout.querySelector('.chatroom-messages');
        if (messagesEl && chatMessages.length > 0) {
            messagesEl.replaceChildren();
            chatMessages.forEach(m => {
                const el = this._buildMessage(m);
                if (el) messagesEl.appendChild(el);
            });
        }

        // Build input area and call the subclass hook before appending
        const inputEl = this._buildInput(placeholder, showToolbar, mcpApps);
        if (inputEl) {
            this._onInputBuilt(inputEl);
            layout.appendChild(inputEl);
        }

        // Call the subclass hook before inserting the layout into the DOM
        this._onLayoutBuilt(layout);

        // Render into #chatArea when panel siblings exist; otherwise own all children
        const chatArea = this.querySelector('#chatArea');
        if (chatArea) {
            chatArea.replaceChildren(layout);
        } else {
            this.replaceChildren(layout);
        }

        // Scroll to bottom of the pre-loaded message list
        if (messagesEl) messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    /**
     * Extension hook — called after the input bar element is built and before
     * it is appended to the layout.  Override in subclasses to add toolbar
     * buttons, file-attach controls, or other input-area customisations.
     * @param {Element} _inputEl  The cloned chatroom-input element.
     */
    // eslint-disable-next-line no-unused-vars
    _onInputBuilt(_inputEl) { /* override in subclasses */ }

    /**
     * Extension hook — called after the full chatroom layout is assembled and
     * before it is inserted into the DOM.  Override in subclasses to add header
     * action buttons, inject extra markup, or modify the layout tree.
     * @param {Element} _layout  The assembled chatroom-layout element.
     */
    // eslint-disable-next-line no-unused-vars
    _onLayoutBuilt(_layout) { /* override in subclasses */ }

    /**
     * Build and return a DOM element for a single message.
     * @param {object} msg
     * @returns {Element|null}
     */
    _buildMessage(msg) {
        switch (msg.type) {
            case 'system':  return this._buildSystemMsg(msg);
            case 'ai':      return this._buildAiMsg(msg);
            case 'own':     return this._buildOwnMsg(msg);
            case 'typing':  return this._buildTypingMsg(msg);
            default:        return null;
        }
    }

    /**
     * Build a system/agenda divider message element.
     * @param {object} msg
     * @returns {Element|null}
     */
    _buildSystemMsg(msg) {
        const el = this._cloneTemplate('template-chatroom-message-system');
        if (!el) return null;

        // Replace the default kind modifier with the actual message kind
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

    /**
     * Build an AI agent message element.
     * @param {object} msg
     * @returns {Element|null}
     */
    _buildAiMsg(msg) {
        const el = this._cloneTemplate('template-chatroom-message-ai');
        if (!el) return null;

        // Avatar — icon or initials
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
                // Replace icon with initials text
                avatarEl.textContent = avatar.toUpperCase();
            }
        }

        // Author
        const authorEl = el.querySelector('.chatroom__author');
        if (authorEl && msg.author) {
            authorEl.textContent = msg.author;
            authorEl.hidden = false;
        }

        // Agent role
        const roleEl = el.querySelector('.chatroom__agent-role');
        if (roleEl && msg.role) {
            roleEl.textContent = msg.role;
            roleEl.hidden = false;
        }

        // Timestamp
        const timeEl = el.querySelector('.chatroom__time');
        if (timeEl && msg.time) {
            timeEl.textContent = msg.time;
            timeEl.hidden = false;
        }

        // Tool badge
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

        // Message text
        const textEl = el.querySelector('.chatroom__text');
        if (textEl) textEl.textContent = msg.text || '';

        // Tool results
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

    /**
     * Build a user's own message element.
     * @param {object} msg
     * @returns {Element|null}
     */
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

    /**
     * Build a typing/deliberating indicator element.
     * @param {object} msg
     * @returns {Element|null}
     */
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

    /**
     * Build the MCP apps panel element populated with app buttons.
     * @param {Array} apps
     * @returns {Element|null}
     */
    _buildMcpPanel(apps) {
        if (!apps.length) return null;

        const panel = this._cloneTemplate('template-chatroom-mcp-panel');
        if (!panel) return null;

        const list = panel.querySelector('.chatroom-mcp-apps__list');
        if (list) {
            apps.forEach(app => {
                const item = this._buildMcpItem(app);
                if (item) list.appendChild(item);
            });
        }

        return panel;
    }

    /**
     * Build a single MCP app list item element.
     * @param {object} app  { name, label, endpoint, icon, description }
     * @returns {Element|null}
     */
    _buildMcpItem(app) {
        const item = this._cloneTemplate('template-chatroom-mcp-item');
        if (!item) return null;

        const btn = item.querySelector('.chatroom-mcp-apps__btn');
        if (btn) {
            btn.setAttribute('data-mcp-app', app.name);
            if (app.endpoint) btn.setAttribute('data-mcp-endpoint', app.endpoint);
            btn.setAttribute('aria-label', `Invoke ${app.label || app.name}`);
        }

        const iconEl = item.querySelector('.chatroom-mcp-apps__btn-icon i');
        if (iconEl) {
            iconEl.className = this._safeIcon(app.icon || 'fas fa-robot');
            iconEl.setAttribute('aria-hidden', 'true');
        }

        const labelEl = item.querySelector('.chatroom-mcp-apps__btn-label');
        if (labelEl) labelEl.textContent = app.label || app.name;

        const descEl = item.querySelector('.chatroom-mcp-apps__btn-desc');
        if (descEl && app.description) {
            descEl.textContent = app.description;
            descEl.hidden = false;
        }

        const cmdEl = item.querySelector('.chatroom-mcp-apps__btn-command');
        if (cmdEl) cmdEl.textContent = `/${app.name}`;

        return item;
    }

    /**
     * Build the input area element, selecting the correct toolbar variant.
     * @param {string}  placeholder
     * @param {boolean} showToolbar
     * @param {Array}   apps
     * @returns {Element|null}
     */
    _buildInput(placeholder, showToolbar, apps) {
        const wrapper = this._cloneTemplate('template-chatroom-input');
        if (!wrapper) return null;

        const textarea = wrapper.querySelector('.chatroom-input-field');
        if (textarea) {
            textarea.setAttribute('placeholder', placeholder);
            textarea.setAttribute('maxlength', String(this.config.maxLength));
        }

        // Build and append the correct toolbar variant
        const toolbarTplId = showToolbar
            ? 'template-chatroom-toolbar-full'
            : 'template-chatroom-toolbar-minimal';
        const toolbar = this._cloneTemplate(toolbarTplId);

        if (toolbar && apps.length > 0) {
            // Build MCP toggle button and insert into the toolbar
            const mcpToggle = document.createElement('button');
            mcpToggle.type = 'button';
            mcpToggle.className = 'chatroom-mcp-apps-toggle chatroom-input-format-btn';
            mcpToggle.setAttribute('aria-label', 'MCP Apps');
            mcpToggle.setAttribute('aria-expanded', 'false');
            mcpToggle.setAttribute('aria-controls', 'chatroom-mcp-apps-panel');
            mcpToggle.title = 'MCP Apps';
            const plugIcon = document.createElement('i');
            plugIcon.className = 'fas fa-plug';
            plugIcon.setAttribute('aria-hidden', 'true');
            mcpToggle.appendChild(plugIcon);

            if (showToolbar) {
                const leftDiv = toolbar.querySelector('.chatroom-input-toolbar-left');
                if (leftDiv) leftDiv.appendChild(mcpToggle);
            } else {
                // Minimal toolbar: insert before the send button
                const sendBtn = toolbar.querySelector('.chatroom-input-send-btn');
                if (sendBtn) toolbar.insertBefore(mcpToggle, sendBtn);
            }
        }

        if (toolbar) {
            const content = wrapper.querySelector('.chatroom-input-content');
            if (content) content.appendChild(toolbar);
        }

        return wrapper;
    }

    /**
     * Build a single tool result list item element.
     * @param {string} label
     * @param {string} detail
     * @returns {Element|null}
     */
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

        const el = this._cloneTemplate('template-chatroom-message-ai');
        if (!el) return document.createElement('div');

        el.classList.add('chatroom__message--thinking');
        el.setAttribute('aria-live', 'polite');

        const avatarEl = el.querySelector('.chatroom__avatar');
        if (avatarEl) {
            const iconEl = avatarEl.querySelector('i');
            if (iconEl) {
                iconEl.className = this._safeIcon(app.icon || 'fas fa-robot');
                iconEl.setAttribute('aria-hidden', 'true');
            }
        }

        const authorEl = el.querySelector('.chatroom__author');
        if (authorEl) {
            authorEl.textContent = app.label || app.name;
            authorEl.hidden = false;
        }

        // Replace the text paragraph with animated thinking dots
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

        const el = this._cloneTemplate('template-chatroom-message-ai');
        if (!el) return;

        const avatarEl = el.querySelector('.chatroom__avatar');
        if (avatarEl) {
            const iconEl = avatarEl.querySelector('i');
            if (iconEl) {
                iconEl.className = this._safeIcon(app.icon || 'fas fa-robot');
                iconEl.setAttribute('aria-hidden', 'true');
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

    /**
     * Append an error message for a failed MCP call.
     * @param {object} app
     * @param {string} errorText
     */
    _appendMcpError(app, errorText) {
        const container = this.elements.messagesContainer;
        if (!container) return;

        const el = this._cloneTemplate('template-chatroom-message-ai');
        if (!el) return;

        el.classList.add('chatroom__message--ai-error');

        const avatarEl = el.querySelector('.chatroom__avatar');
        if (avatarEl) {
            avatarEl.classList.add('chatroom__avatar--ai-error');
            const iconEl = avatarEl.querySelector('i');
            if (iconEl) {
                iconEl.className = 'fas fa-exclamation-triangle';
                iconEl.setAttribute('aria-hidden', 'true');
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

    /**
     * Append structured tool-result items to an AI message element when the
     * response data contains a `tool_result`, `results`, `documents`, or `items`
     * array field.
     * @param {Element} msgEl  AI message element (cloned from template)
     * @param {object}  data   MCP response data
     */
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
                const el = this._buildOwnMsg({
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

    /**
     * Append a user message bubble directly to the messages container.
     * Used when sending slash commands so the user sees their own text.
     * @param {string} text
     */
    _appendUserMessage(text) {
        const container = this.elements.messagesContainer;
        if (!container) return;
        const el = this._buildOwnMsg({
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

        // Remove viewport classes when the last chatroom component leaves the DOM.
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
        this.messages = [];
        this.renderMessages();
    }

    // =========================================================================
    // Helpers
    // =========================================================================

    /** Validate and return a safe Font Awesome class string. */
    _safeIcon(icon) {
        if (!icon) return 'fas fa-robot';
        // Allow only alphanumeric, hyphens, spaces — no injection vectors
        return /^[\w\s-]+$/.test(icon) ? icon : 'fas fa-robot';
    }

    /** Sanitise a string for use as a CSS class name modifier. */
    _safeClass(value) {
        if (!value) return 'default';
        return String(value)
            .replace(/[^a-z0-9-]/gi, '-')
            .replace(/-+/g, '-')
            .replace(/^-+|-+$/g, '')
            .toLowerCase() || 'default';
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
