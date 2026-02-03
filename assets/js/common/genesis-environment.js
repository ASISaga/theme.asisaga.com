/**
 * Genesis Environment Component
 * 
 * Represents ontological spatial organization and layout logic.
 * This component handles layout behavior without animations.
 * 
 * Usage:
 *   <genesis-environment logic="distributed">
 *     <genesis-entity nature="primary">Content</genesis-entity>
 *   </genesis-environment>
 * 
 * SCSS Integration:
 *   genesis-environment {
 *     @include genesis-environment('distributed');
 *   }
 * 
 * Attributes:
 *   - logic: distributed|focused|associative|chronological|manifest|
 *            navigation-primary|navigation-secondary|navigation-tabs|
 *            navigation-sidebar|navigation-footer|navigation-breadcrumb|
 *            navigation-pagination|navigation-accordion|
 *            interaction-form|community-feed|comment-thread|
 *            notification-center|user-grid
 * 
 * Philosophy:
 *   - No inline HTML/SCSS - pure behavior
 *   - SCSS defines visual layout
 *   - Component handles structural behavior
 *   - Natural HTML extension
 */

import { GenesisElement } from './genesis-element.js';

export class GenesisEnvironment extends HTMLElement {
  static get observedAttributes() {
    return ['logic'];
  }

  constructor() {
    super();
    this._logic = 'distributed';
    this._initialized = false;
  }

  connectedCallback() {
    if (!this._initialized) {
      this._initialize();
      this._initialized = true;
    }
  }

  disconnectedCallback() {
    this._cleanup();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'logic' && oldValue !== newValue && this._initialized) {
      this._logic = newValue || 'distributed';
      this._applyLogic();
    }
  }

  /**
   * Initialize the environment component
   * @private
   */
  _initialize() {
    this._logic = this.getAttribute('logic') || 'distributed';
    
    // Set ARIA role based on logic type
    this._setAriaRole();
    
    // Apply structural behavior
    this._applyLogic();
    
    // Apply responsive observers if needed
    this._setupResponsiveObservers();
  }

  /**
   * Set appropriate ARIA role based on logic type
   * @private
   */
  _setAriaRole() {
    const roleMap = {
      'navigation-primary': 'navigation',
      'navigation-secondary': 'navigation',
      'navigation-tabs': 'tablist',
      'navigation-sidebar': 'navigation',
      'navigation-footer': 'navigation',
      'navigation-breadcrumb': 'navigation',
      'navigation-pagination': 'navigation',
      'navigation-accordion': 'navigation',
      'interaction-form': 'form',
      'community-feed': 'feed',
      'comment-thread': 'region',
      'notification-center': 'region',
      'user-grid': 'region',
    };

    const role = roleMap[this._logic];
    if (role && !this.hasAttribute('role')) {
      this.setAttribute('role', role);
    }

    // Add aria-label if navigation and not present
    if (role === 'navigation' && !this.hasAttribute('aria-label')) {
      const labelMap = {
        'navigation-primary': 'Primary navigation',
        'navigation-secondary': 'Secondary navigation',
        'navigation-sidebar': 'Sidebar navigation',
        'navigation-footer': 'Footer navigation',
        'navigation-breadcrumb': 'Breadcrumb',
        'navigation-pagination': 'Pagination',
        'navigation-accordion': 'Accordion menu',
      };
      const label = labelMap[this._logic];
      if (label) {
        this.setAttribute('aria-label', label);
      }
    }
  }

  /**
   * Apply logic-specific structural behavior
   * @private
   */
  _applyLogic() {
    // Add data attribute for CSS targeting
    this.dataset.logic = this._logic;

    // Handle specific logic types
    switch (this._logic) {
      case 'navigation-tabs':
        this._setupTabNavigation();
        break;
      case 'navigation-accordion':
        this._setupAccordionNavigation();
        break;
      case 'navigation-pagination':
        this._setupPagination();
        break;
      case 'comment-thread':
        this._setupCommentThread();
        break;
      case 'community-feed':
        this._setupFeed();
        break;
      default:
        // Most layouts handled purely by SCSS
        break;
    }
  }

  /**
   * Setup tab navigation behavior
   * @private
   */
  _setupTabNavigation() {
    const tabs = this.querySelectorAll('[role="tab"]');
    tabs.forEach((tab, index) => {
      tab.setAttribute('tabindex', index === 0 ? '0' : '-1');
      
      tab.addEventListener('click', (e) => {
        this._activateTab(tab);
      });
      
      tab.addEventListener('keydown', (e) => {
        this._handleTabKeydown(e, tabs);
      });
    });
  }

  /**
   * Activate a specific tab
   * @private
   */
  _activateTab(tab) {
    // Deactivate all tabs
    const allTabs = this.querySelectorAll('[role="tab"]');
    allTabs.forEach(t => {
      t.setAttribute('aria-selected', 'false');
      t.setAttribute('tabindex', '-1');
    });

    // Activate clicked tab
    tab.setAttribute('aria-selected', 'true');
    tab.setAttribute('tabindex', '0');
    tab.focus();

    // Show associated panel
    const panelId = tab.getAttribute('aria-controls');
    if (panelId) {
      const allPanels = this.querySelectorAll('[role="tabpanel"]');
      allPanels.forEach(p => p.hidden = true);
      
      const panel = document.getElementById(panelId);
      if (panel) {
        panel.hidden = false;
      }
    }
  }

  /**
   * Handle keyboard navigation for tabs
   * @private
   */
  _handleTabKeydown(e, tabs) {
    const currentIndex = Array.from(tabs).indexOf(e.target);
    let nextIndex;

    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        nextIndex = currentIndex - 1;
        if (nextIndex < 0) nextIndex = tabs.length - 1;
        this._activateTab(tabs[nextIndex]);
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        nextIndex = currentIndex + 1;
        if (nextIndex >= tabs.length) nextIndex = 0;
        this._activateTab(tabs[nextIndex]);
        break;
      case 'Home':
        e.preventDefault();
        this._activateTab(tabs[0]);
        break;
      case 'End':
        e.preventDefault();
        this._activateTab(tabs[tabs.length - 1]);
        break;
    }
  }

  /**
   * Setup accordion navigation behavior
   * @private
   */
  _setupAccordionNavigation() {
    const triggers = this.querySelectorAll('[aria-expanded]');
    triggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        const expanded = trigger.getAttribute('aria-expanded') === 'true';
        trigger.setAttribute('aria-expanded', String(!expanded));
        
        const targetId = trigger.getAttribute('aria-controls');
        if (targetId) {
          const target = document.getElementById(targetId);
          if (target) {
            target.hidden = expanded;
          }
        }
      });
    });
  }

  /**
   * Setup pagination behavior
   * @private
   */
  _setupPagination() {
    // Pagination behavior typically handled by application logic
    // Component just provides structural markup
    const current = this.querySelector('[aria-current="page"]');
    if (current) {
      current.setAttribute('tabindex', '-1');
    }
  }

  /**
   * Setup comment thread behavior
   * @private
   */
  _setupCommentThread() {
    // Add nested structure support
    this.dataset.threadDepth = this._getMaxNestingDepth();
  }

  /**
   * Get maximum nesting depth of comment thread
   * @private
   */
  _getMaxNestingDepth(element = this, depth = 0) {
    const children = Array.from(element.children);
    if (children.length === 0) return depth;
    
    return Math.max(...children.map(child => this._getMaxNestingDepth(child, depth + 1)));
  }

  /**
   * Setup feed behavior
   * @private
   */
  _setupFeed() {
    // Mark as live region for screen readers if dynamic
    if (!this.hasAttribute('aria-live')) {
      this.setAttribute('aria-live', 'polite');
    }
  }

  /**
   * Setup responsive observers
   * @private
   */
  _setupResponsiveObservers() {
    // Watch for viewport changes for responsive layouts
    if (this._logic.startsWith('navigation-')) {
      this._setupNavigationResponsiveness();
    }
  }

  /**
   * Setup navigation responsiveness
   * @private
   */
  _setupNavigationResponsiveness() {
    // Add mobile/desktop detection
    const updateResponsiveState = () => {
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      this.dataset.viewport = isMobile ? 'mobile' : 'desktop';
    };

    updateResponsiveState();
    window.addEventListener('resize', updateResponsiveState);
    
    // Store cleanup function
    this._resizeCleanup = () => {
      window.removeEventListener('resize', updateResponsiveState);
    };
  }

  /**
   * Cleanup component resources
   * @private
   */
  _cleanup() {
    if (this._resizeCleanup) {
      this._resizeCleanup();
      this._resizeCleanup = null;
    }
  }
}

// Register the custom element
if (!customElements.get('genesis-environment')) {
  customElements.define('genesis-environment', GenesisEnvironment);
}
