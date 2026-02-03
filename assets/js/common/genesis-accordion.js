/**
 * Genesis Accordion Web Component
 * 
 * Accessible accordion/FAQ component with keyboard support.
 * 
 * @example
 * <genesis-accordion allow-multiple="false" animate="true">
 *   <!-- accordion items -->
 * </genesis-accordion>
 */

import { GenesisElement } from './genesis-element.js';

export class GenesisAccordion extends GenesisElement {
  static get observedAttributes() {
    return ['allow-multiple', 'animate'];
  }

  constructor() {
    super();
    this._openItems = new Set();
  }

  connectedCallback() {
    super.connectedCallback();
    
    this._setupAccordionItems();
    this._setAriaRoles();
  }

  /**
   * Setup accordion items with proper ARIA attributes and event handlers
   */
  _setupAccordionItems() {
    const items = this.querySelectorAll('[data-accordion-item], .faq-item, .accordion-item');
    
    items.forEach((item, index) => {
      const header = item.querySelector('[data-accordion-header], .faq-item__question, .accordion-header');
      const panel = item.querySelector('[data-accordion-panel], .faq-item__answer, .accordion-panel');
      
      if (header && panel) {
        const itemId = `accordion-item-${index}`;
        const panelId = `accordion-panel-${index}`;
        
        // Setup button or make header a button
        let button = header.querySelector('button');
        if (!button) {
          button = document.createElement('button');
          button.type = 'button';
          button.innerHTML = header.innerHTML;
          header.innerHTML = '';
          header.appendChild(button);
        }
        
        // Set ARIA attributes
        button.setAttribute('id', itemId);
        button.setAttribute('aria-expanded', 'false');
        button.setAttribute('aria-controls', panelId);
        
        panel.setAttribute('id', panelId);
        panel.setAttribute('role', 'region');
        panel.setAttribute('aria-labelledby', itemId);
        panel.setAttribute('hidden', '');
        
        // Event listeners
        button.addEventListener('click', () => {
          this._toggleItem(item, button, panel, itemId);
        });
        
        // Keyboard support
        button.addEventListener('keydown', (e) => {
          this._handleKeyDown(e, item, button, items);
        });
        
        // Check if item should be open by default
        if (item.classList.contains('is-open') || item.hasAttribute('open')) {
          this._openItem(button, panel, itemId);
        }
      }
    });
  }

  /**
   * Set ARIA roles for the accordion
   */
  _setAriaRoles() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'presentation');
    }
  }

  /**
   * Toggle accordion item
   */
  _toggleItem(item, button, panel, itemId) {
    const isOpen = this._openItems.has(itemId);
    
    if (isOpen) {
      this._closeItem(button, panel, itemId);
    } else {
      // If not allowing multiple, close others first
      if (this.getAttribute('allow-multiple') !== 'true') {
        this._closeAllItems();
      }
      this._openItem(button, panel, itemId);
    }
  }

  /**
   * Open accordion item
   */
  _openItem(button, panel, itemId) {
    const animate = this.getAttribute('animate') !== 'false';
    
    this._openItems.add(itemId);
    button.setAttribute('aria-expanded', 'true');
    panel.removeAttribute('hidden');
    
    const item = button.closest('[data-accordion-item], .faq-item, .accordion-item');
    if (item) {
      item.classList.add('is-open');
    }
    
    // Animate if enabled and motion is allowed
    if (animate && !this._prefersReducedMotion()) {
      panel.style.overflow = 'hidden';
      panel.style.maxHeight = '0';
      
      requestAnimationFrame(() => {
        panel.style.transition = 'max-height 0.3s ease-out';
        panel.style.maxHeight = panel.scrollHeight + 'px';
        
        panel.addEventListener('transitionend', function handler() {
          panel.style.maxHeight = '';
          panel.style.overflow = '';
          panel.removeEventListener('transitionend', handler);
        });
      });
    }
    
    // Dispatch event
    this.dispatchEvent(new CustomEvent('accordion-opened', {
      detail: { itemId },
      bubbles: true
    }));
  }

  /**
   * Close accordion item
   */
  _closeItem(button, panel, itemId) {
    const animate = this.getAttribute('animate') !== 'false';
    
    this._openItems.delete(itemId);
    button.setAttribute('aria-expanded', 'false');
    
    const item = button.closest('[data-accordion-item], .faq-item, .accordion-item');
    if (item) {
      item.classList.remove('is-open');
    }
    
    // Animate if enabled and motion is allowed
    if (animate && !this._prefersReducedMotion()) {
      panel.style.overflow = 'hidden';
      panel.style.maxHeight = panel.scrollHeight + 'px';
      
      requestAnimationFrame(() => {
        panel.style.transition = 'max-height 0.3s ease-out';
        panel.style.maxHeight = '0';
        
        panel.addEventListener('transitionend', function handler() {
          panel.setAttribute('hidden', '');
          panel.style.maxHeight = '';
          panel.style.overflow = '';
          panel.removeEventListener('transitionend', handler);
        });
      });
    } else {
      panel.setAttribute('hidden', '');
    }
    
    // Dispatch event
    this.dispatchEvent(new CustomEvent('accordion-closed', {
      detail: { itemId },
      bubbles: true
    }));
  }

  /**
   * Close all accordion items
   */
  _closeAllItems() {
    const items = this.querySelectorAll('[data-accordion-item], .faq-item, .accordion-item');
    
    items.forEach((item, index) => {
      const button = item.querySelector('button');
      const panel = item.querySelector('[role="region"]');
      const itemId = `accordion-item-${index}`;
      
      if (button && panel && this._openItems.has(itemId)) {
        this._closeItem(button, panel, itemId);
      }
    });
  }

  /**
   * Handle keyboard navigation
   */
  _handleKeyDown(e, item, button, allItems) {
    const currentIndex = Array.from(allItems).indexOf(item);
    
    switch(e.key) {
      case 'ArrowDown':
        e.preventDefault();
        const nextItem = allItems[currentIndex + 1] || allItems[0];
        const nextButton = nextItem.querySelector('button');
        if (nextButton) nextButton.focus();
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        const prevItem = allItems[currentIndex - 1] || allItems[allItems.length - 1];
        const prevButton = prevItem.querySelector('button');
        if (prevButton) prevButton.focus();
        break;
        
      case 'Home':
        e.preventDefault();
        const firstButton = allItems[0].querySelector('button');
        if (firstButton) firstButton.focus();
        break;
        
      case 'End':
        e.preventDefault();
        const lastButton = allItems[allItems.length - 1].querySelector('button');
        if (lastButton) lastButton.focus();
        break;
    }
  }
}

// Register the custom element
if (!customElements.get('genesis-accordion')) {
  customElements.define('genesis-accordion', GenesisAccordion);
}
