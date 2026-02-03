/**
 * Genesis Dashboard Web Component
 * 
 * Dashboard layout with widgets and responsive grid.
 * 
 * @example
 * <genesis-dashboard layout="grid" columns="3">
 *   <!-- dashboard widgets -->
 * </genesis-dashboard>
 */

import { GenesisElement } from './genesis-element.js';

export class GenesisDashboard extends GenesisElement {
  static get observedAttributes() {
    return ['layout', 'columns'];
  }

  connectedCallback() {
    super.connectedCallback();
    
    this._setupLayout();
    this._setupWidgets();
  }

  /**
   * Setup dashboard layout
   */
  _setupLayout() {
    const layout = this.getAttribute('layout') || 'grid';
    const columns = this.getAttribute('columns') || '3';
    
    this.setAttribute('data-layout', layout);
    this.style.setProperty('--dashboard-columns', columns);
  }

  /**
   * Setup dashboard widgets
   */
  _setupWidgets() {
    const widgets = this.querySelectorAll('[data-widget], .dashboard-widget');
    
    widgets.forEach((widget, index) => {
      widget.setAttribute('data-widget-id', `widget-${index}`);
      
      // Add entrance animation
      if (!this._prefersReducedMotion()) {
        widget.style.opacity = '0';
        widget.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
          widget.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
          widget.style.opacity = '1';
          widget.style.transform = 'translateY(0)';
        }, index * 50);
      }
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    
    switch(name) {
      case 'layout':
        this.setAttribute('data-layout', newValue);
        break;
      case 'columns':
        this.style.setProperty('--dashboard-columns', newValue);
        break;
    }
  }
}

// Register the custom element
if (!customElements.get('genesis-dashboard')) {
  customElements.define('genesis-dashboard', GenesisDashboard);
}
