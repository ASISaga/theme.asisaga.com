/**
 * Genesis Chat Web Component
 * 
 * Chat/messaging interface with real-time updates.
 * 
 * @example
 * <genesis-chat auto-scroll="true" show-timestamps="true">
 *   <!-- chat messages -->
 * </genesis-chat>
 */

import { GenesisElement } from './genesis-element.js';

export class GenesisChat extends GenesisElement {
  static get observedAttributes() {
    return ['auto-scroll', 'show-timestamps'];
  }

  constructor() {
    super();
    this._observer = null;
  }

  connectedCallback() {
    super.connectedCallback();
    
    this._setupChatContainer();
    this._setupAutoScroll();
    this._setupInputArea();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._observer) {
      this._observer.disconnect();
    }
  }

  /**
   * Setup chat container
   */
  _setupChatContainer() {
    const messagesContainer = this.querySelector('[data-chat-messages], .chatroom__messages');
    
    if (messagesContainer) {
      messagesContainer.setAttribute('role', 'log');
      messagesContainer.setAttribute('aria-live', 'polite');
      messagesContainer.setAttribute('aria-atomic', 'false');
    }
  }

  /**
   * Setup auto-scroll functionality
   */
  _setupAutoScroll() {
    const autoScroll = this.getAttribute('auto-scroll') !== 'false';
    
    if (!autoScroll) return;
    
    const messagesContainer = this.querySelector('[data-chat-messages], .chatroom__messages');
    
    if (messagesContainer) {
      // Observer for new messages
      this._observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            this._scrollToBottom(messagesContainer);
          }
        });
      });
      
      this._observer.observe(messagesContainer, {
        childList: true,
        subtree: true
      });
      
      // Initial scroll
      this._scrollToBottom(messagesContainer);
    }
  }

  /**
   * Scroll to bottom of messages
   */
  _scrollToBottom(container) {
    const reducedMotion = this._prefersReducedMotion();
    
    if (reducedMotion) {
      container.scrollTop = container.scrollHeight;
    } else {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth'
      });
    }
  }

  /**
   * Setup input area
   */
  _setupInputArea() {
    const form = this.querySelector('form, [data-chat-form]');
    const input = this.querySelector('input[type="text"], textarea, [data-chat-input]');
    
    if (form && input) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const message = input.value.trim();
        
        if (message) {
          // Dispatch custom event for message send
          this.dispatchEvent(new CustomEvent('message-send', {
            detail: { message },
            bubbles: true
          }));
          
          // Clear input
          input.value = '';
          input.focus();
        }
      });
      
      // Auto-expand textarea
      if (input.tagName === 'TEXTAREA') {
        input.addEventListener('input', () => {
          input.style.height = 'auto';
          input.style.height = input.scrollHeight + 'px';
        });
      }
    }
  }

  /**
   * Add message to chat
   */
  addMessage(message, options = {}) {
    const messagesContainer = this.querySelector('[data-chat-messages], .chatroom__messages');
    
    if (!messagesContainer) return;
    
    const messageEl = document.createElement('div');
    messageEl.className = options.className || 'chat-message';
    
    if (options.author) {
      const authorEl = document.createElement('span');
      authorEl.className = 'chat-message__author';
      authorEl.textContent = options.author;
      messageEl.appendChild(authorEl);
    }
    
    const textEl = document.createElement('div');
    textEl.className = 'chat-message__text';
    textEl.textContent = message;
    messageEl.appendChild(textEl);
    
    if (this.getAttribute('show-timestamps') === 'true') {
      const timeEl = document.createElement('time');
      timeEl.className = 'chat-message__time';
      timeEl.textContent = new Date().toLocaleTimeString();
      messageEl.appendChild(timeEl);
    }
    
    messagesContainer.appendChild(messageEl);
  }
}

// Register the custom element
if (!customElements.get('genesis-chat')) {
  customElements.define('genesis-chat', GenesisChat);
}
