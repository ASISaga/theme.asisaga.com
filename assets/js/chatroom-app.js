/**
 * Chatroom Web Component
 * Generic chatroom interface that can be extended for specific applications
 * Integrates with Jekyll liquid templates and external SCSS
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
            refreshInterval: parseInt(this.getAttribute('refresh-interval')) || 3000
        };

        // State
        this.messages = [];
        this.isConnected = false;
        this.typingUsers = [];
        this.refreshIntervalId = null;
    }

    connectedCallback() {
        // The HTML structure is provided by Jekyll template
        // We just need to attach event handlers and initialize
        this.initializeElements();
        this.attachEventHandlers();

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
            charCount: this.querySelector('.chatroom-char-count')
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
        }
    }

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
        const text = this.elements.inputField.value.trim();
        if (!text) return;

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

    // Public API methods
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
}

// Register the custom element
customElements.define('chatroom-app', ChatroomApp);

export default ChatroomApp;
