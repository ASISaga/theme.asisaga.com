/**
 * Chatroom Panels
 *
 * Attaches runtime behavior to the toggle strip and members sidebar shells
 * rendered by the chatroom layout (_includes/chatroom/toggle-strip.html and
 * _includes/chatroom/members-sidebar.html). This module does not generate
 * any markup — it only reads and manipulates DOM that already exists on
 * the page, and reads visibility from attributes on the chatroom/boardroom
 * component element.
 *
 * Responsibilities:
 *   - Show/hide the toggle strip and members sidebar based on the
 *     show-toggle-strip / show-members-sidebar attributes on the nearest
 *     chatroom component element (chatroom-app, boardroom-app, or any
 *     other ChatroomApp subclass).
 *   - Toggle the members sidebar open/closed via the toggle strip's
 *     members button and collapse button.
 *   - Filter #chatroomMembersList items by search text and by
 *     online/away/all status, toggling the empty-state message when no
 *     items match.
 *   - Provide a small public API (window.ChatroomPanels) for setting the
 *     notification badge count, used by consuming components.
 *
 * Data contract for member list items (populated by the consuming
 * component, e.g. BoardroomApp.renderAgents() — this module does not
 * create these elements):
 *   <li class="chatroom-members-sidebar__item"
 *       data-status="online|away|offline"
 *       data-name="lowercase searchable name">
 *     ...
 *   </li>
 *
 * Usage: import this module once per page (e.g. from chatroom-app.js or
 * the page's own module_js) after the toggle-strip and members-sidebar
 * markup is present in the DOM.
 */

const SELECTORS = {
    toggleStrip: '#chatroomToggleStrip',
    membersSidebar: '#chatroomMembersSidebar',
    toggleMembersBtn: '#chatroomToggleMembersBtn',
    collapseBtn: '#chatroomToggleStripCollapseBtn',
    notificationBadge: '#chatroomNotificationBadge',
    searchInput: '#chatroomMembersSearchInput',
    searchClearBtn: '#chatroomMembersSearchClearBtn',
    filterButtons: '[data-filter]',
    membersList: '#chatroomMembersList',
    emptyState: '#chatroomMembersEmptyState',
};

const HIDDEN_CLASS = {
    toggleStrip: 'chatroom-toggle-strip--hidden',
    membersSidebar: 'chatroom-members-sidebar--hidden',
};

/**
 * Find the nearest chatroom component element (chatroom-app, boardroom-app,
 * or any other subclass) that hosts the given panel element. Component
 * elements are marked with data-chatroom-component by ChatroomApp's own
 * connectedCallback, so this works regardless of the actual tag name.
 * @param {Element} panelEl
 * @returns {Element|null}
 */
function findComponentHost(panelEl) {
    // data-chatroom-component is set by ChatroomApp.connectedCallback(), which
    // may not have run yet when this module first evaluates (this module is
    // imported by chatroom-app.js, so it evaluates before the custom element
    // is defined). The show-* attributes are static HTML emitted by the
    // chatroom layout, so they are readable immediately — fall back to the
    // panel's direct parent, which is the component element in the layout.
    return panelEl.closest('[data-chatroom-component]') || panelEl.parentElement;
}

/**
 * Apply initial visibility to a panel based on a boolean attribute on its
 * component host. Called once at init; attribute changes after init are
 * not observed (the component is expected to be reconfigured via a fresh
 * page load, consistent with how other chatroom attributes behave).
 * @param {Element|null} panelEl
 * @param {string} attrName  e.g. 'show-toggle-strip'
 * @param {string} hiddenClass
 */
function applyInitialVisibility(panelEl, attrName, hiddenClass) {
    if (!panelEl) return;
    const host = findComponentHost(panelEl);
    const shouldShow = host ? host.hasAttribute(attrName) : false;
    panelEl.classList.toggle(hiddenClass, !shouldShow);
}

/**
 * Wire up the members-sidebar open/closed toggle, controlled from either
 * button in the toggle strip. Both buttons stay in sync via aria-expanded.
 * @param {Element|null} sidebarEl
 * @param {Element|null} toggleBtn
 * @param {Element|null} collapseBtn
 */
function initSidebarToggle(sidebarEl, toggleBtn, collapseBtn) {
    if (!sidebarEl || (!toggleBtn && !collapseBtn)) return;

    const setExpanded = (expanded) => {
        sidebarEl.classList.toggle(HIDDEN_CLASS.membersSidebar, !expanded);
        if (toggleBtn) toggleBtn.setAttribute('aria-expanded', String(expanded));
        if (collapseBtn) collapseBtn.setAttribute('aria-expanded', String(expanded));
    };

    const toggle = () => {
        const isExpanded = toggleBtn
            ? toggleBtn.getAttribute('aria-expanded') !== 'false'
            : collapseBtn.getAttribute('aria-expanded') !== 'false';
        setExpanded(!isExpanded);
    };

    if (toggleBtn) toggleBtn.addEventListener('click', toggle);
    if (collapseBtn) collapseBtn.addEventListener('click', toggle);
}

/**
 * Return true if a list item matches the current search text and status
 * filter.
 * @param {Element} item
 * @param {string} searchText  Lowercase search query, may be empty.
 * @param {string} statusFilter  'all' | 'online' | 'away'
 * @returns {boolean}
 */
function itemMatches(item, searchText, statusFilter) {
    const status = item.getAttribute('data-status') || '';
    const name = item.getAttribute('data-name') || '';

    if (statusFilter !== 'all' && status !== statusFilter) return false;
    if (searchText && !name.includes(searchText)) return false;
    return true;
}

/**
 * Re-apply the current search text and status filter to every item in the
 * members list, and toggle the empty-state message when nothing matches.
 * @param {Element} listEl
 * @param {Element|null} emptyStateEl
 * @param {string} searchText
 * @param {string} statusFilter
 */
function applyFilters(listEl, emptyStateEl, searchText, statusFilter) {
    const items = listEl.querySelectorAll('.chatroom-members-sidebar__item');
    let visibleCount = 0;

    items.forEach((item) => {
        const matches = itemMatches(item, searchText, statusFilter);
        item.hidden = !matches;
        if (matches) visibleCount += 1;
    });

    if (emptyStateEl) {
        emptyStateEl.classList.toggle(
            'chatroom-members-sidebar__empty-state--visible',
            visibleCount === 0
        );
    }

    return visibleCount;
}

/**
 * Wire up search input, clear button, and filter buttons against the
 * members list.
 * @param {Document|Element} root
 */
function initMembersFilter(root) {
    const searchInput = root.querySelector(SELECTORS.searchInput);
    const clearBtn = root.querySelector(SELECTORS.searchClearBtn);
    const filterButtons = root.querySelectorAll(SELECTORS.filterButtons);
    const listEl = root.querySelector(SELECTORS.membersList);
    const emptyStateEl = root.querySelector(SELECTORS.emptyState);

    if (!listEl) return;

    let statusFilter = 'all';

    const runFilters = () => {
        const searchText = (searchInput?.value || '').trim().toLowerCase();
        applyFilters(listEl, emptyStateEl, searchText, statusFilter);
        if (clearBtn) {
            clearBtn.classList.toggle(
                'chatroom-members-sidebar__search-clear-btn--visible',
                searchText.length > 0
            );
        }
    };

    if (searchInput) {
        searchInput.addEventListener('input', runFilters);
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (searchInput) searchInput.value = '';
            runFilters();
            searchInput?.focus();
        });
    }

    filterButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            statusFilter = btn.getAttribute('data-filter') || 'all';
            filterButtons.forEach((b) => {
                b.classList.toggle(
                    'chatroom-members-sidebar__filter-btn--active',
                    b === btn
                );
            });
            runFilters();
        });
    });

    // Run once at init in case list items are already present (e.g.
    // server-rendered or populated before this module runs).
    runFilters();

    // Re-run whenever the consuming component mutates the list (adds or
    // removes members at runtime).
    const observer = new MutationObserver(runFilters);
    observer.observe(listEl, { childList: true });
}

/**
 * Set the notification badge count on the toggle strip. Hides the badge
 * entirely when count is 0 or falsy.
 * @param {number} count
 */
function setNotificationCount(count) {
    const badge = document.querySelector(SELECTORS.notificationBadge);
    if (!badge) return;
    if (count > 0) {
        badge.textContent = String(count);
        badge.hidden = false;
    } else {
        badge.hidden = true;
    }
}

/**
 * Initialise all chatroom panel behavior for a given root (defaults to the
 * whole document). Safe to call multiple times; each call only wires up
 * elements it finds, and does nothing if the panels are absent.
 * @param {Document|Element} [root=document]
 */
function initChatroomPanels(root = document) {
    const toggleStripEl = root.querySelector(SELECTORS.toggleStrip);
    const sidebarEl = root.querySelector(SELECTORS.membersSidebar);
    const toggleBtn = root.querySelector(SELECTORS.toggleMembersBtn);
    const collapseBtn = root.querySelector(SELECTORS.collapseBtn);

    applyInitialVisibility(toggleStripEl, 'show-toggle-strip', HIDDEN_CLASS.toggleStrip);
    applyInitialVisibility(sidebarEl, 'show-members-sidebar', HIDDEN_CLASS.membersSidebar);

    initSidebarToggle(sidebarEl, toggleBtn, collapseBtn);
    initMembersFilter(root);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initChatroomPanels());
} else {
    initChatroomPanels();
}

// Small public API for consuming components (e.g. BoardroomApp) to update
// the notification badge without reaching into this module's internals.
window.ChatroomPanels = {
    setNotificationCount,
    init: initChatroomPanels,
};

export { initChatroomPanels, setNotificationCount };
