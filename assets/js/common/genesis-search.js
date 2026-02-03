/**
 * Genesis Search Web Component
 * 
 * Search interface with filters, results, and accessibility.
 * 
 * @example
 * <genesis-search live-search="true" min-chars="3">
 *   <form><!-- search form --></form>
 * </genesis-search>
 */

import { GenesisElement } from './genesis-element.js';

export class GenesisSearch extends GenesisElement {
  static get observedAttributes() {
    return ['live-search', 'min-chars', 'debounce'];
  }

  constructor() {
    super();
    this._searchTimeout = null;
    this._resultsCount = 0;
  }

  connectedCallback() {
    super.connectedCallback();
    
    this._setupSearchInput();
    this._setupFilters();
    this._setAriaRoles();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._searchTimeout) {
      clearTimeout(this._searchTimeout);
    }
  }

  /**
   * Setup search input functionality
   */
  _setupSearchInput() {
    const searchInput = this.querySelector('input[type="search"], #search-input');
    const searchForm = this.querySelector('form');
    const liveSearch = this.getAttribute('live-search') === 'true';
    const minChars = parseInt(this.getAttribute('min-chars')) || 2;
    const debounce = parseInt(this.getAttribute('debounce')) || 300;
    
    if (searchInput) {
      // Live search on input
      if (liveSearch) {
        searchInput.addEventListener('input', (e) => {
          const query = e.target.value.trim();
          
          if (this._searchTimeout) {
            clearTimeout(this._searchTimeout);
          }
          
          if (query.length >= minChars) {
            this._searchTimeout = setTimeout(() => {
              this._performSearch(query);
            }, debounce);
          } else if (query.length === 0) {
            this._clearResults();
          }
        });
      }
      
      // Form submission
      if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const query = searchInput.value.trim();
          if (query.length >= minChars) {
            this._performSearch(query);
          }
        });
      }
      
      // Clear button
      const clearBtn = this.querySelector('[data-search-clear]');
      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          searchInput.value = '';
          searchInput.focus();
          this._clearResults();
        });
      }
    }
  }

  /**
   * Setup filter functionality
   */
  _setupFilters() {
    const filters = this.querySelectorAll('[data-filter], .search__filter-option');
    
    filters.forEach(filter => {
      filter.addEventListener('change', () => {
        this._applyFilters();
      });
    });
  }

  /**
   * Set ARIA roles for accessibility
   */
  _setAriaRoles() {
    const searchForm = this.querySelector('form');
    if (searchForm && !searchForm.hasAttribute('role')) {
      searchForm.setAttribute('role', 'search');
    }
    
    const resultsContainer = this.querySelector('[data-search-results], .search__results');
    if (resultsContainer) {
      resultsContainer.setAttribute('role', 'region');
      resultsContainer.setAttribute('aria-live', 'polite');
      resultsContainer.setAttribute('aria-atomic', 'false');
    }
    
    const resultsCount = this.querySelector('[data-results-count], .search__count');
    if (resultsCount) {
      resultsCount.setAttribute('aria-live', 'polite');
    }
  }

  /**
   * Perform search (placeholder - to be extended by implementation)
   */
  _performSearch(query) {
    // Dispatch custom event for search
    this.dispatchEvent(new CustomEvent('search', {
      detail: { query },
      bubbles: true
    }));
    
    // Update aria-label for accessibility
    const resultsContainer = this.querySelector('[data-search-results], .search__results');
    if (resultsContainer) {
      resultsContainer.setAttribute('aria-label', `Search results for ${query}`);
    }
  }

  /**
   * Apply active filters
   */
  _applyFilters() {
    const activeFilters = Array.from(this.querySelectorAll('[data-filter]:checked'))
      .map(filter => ({
        name: filter.name,
        value: filter.value
      }));
    
    // Dispatch custom event for filter change
    this.dispatchEvent(new CustomEvent('filter-change', {
      detail: { filters: activeFilters },
      bubbles: true
    }));
  }

  /**
   * Clear search results
   */
  _clearResults() {
    const resultsContainer = this.querySelector('[data-search-results], .search__results');
    if (resultsContainer) {
      resultsContainer.innerHTML = '';
    }
    
    const resultsCount = this.querySelector('[data-results-count], .search__count');
    if (resultsCount) {
      resultsCount.textContent = '';
    }
    
    // Dispatch custom event
    this.dispatchEvent(new CustomEvent('search-cleared', {
      bubbles: true
    }));
  }

  /**
   * Update results count
   */
  updateResultsCount(count) {
    this._resultsCount = count;
    const resultsCount = this.querySelector('[data-results-count], .search__count');
    if (resultsCount) {
      resultsCount.textContent = `${count} result${count !== 1 ? 's' : ''} found`;
    }
  }
}

// Register the custom element
if (!customElements.get('genesis-search')) {
  customElements.define('genesis-search', GenesisSearch);
}
