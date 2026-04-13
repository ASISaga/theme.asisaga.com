/**
 * Chatroom Domain Sample — initialization script
 *
 * Demonstrates the JSON-LD domain approach for the chatroom component:
 *   - Reads Schema.org JSON-LD messages from the inline #chatroom-domain-data
 *     script element (injected by Jekyll from _data/chatroom/domain/*.json).
 *   - Registers shared (cross-domain) templates once at startup so any domain
 *     can fall back to them for common message types (AI responses, user messages,
 *     typing indicators).
 *   - Registers domain-specific HTML templates so chatroom-app can render any
 *     JSON-LD object whose @type is declared in the domain map, overriding shared
 *     templates where domain styling is preferred.
 *   - Wires up the domain-switcher buttons to hot-swap the full conversation.
 *
 * The chatroom-app element is already registered by importing chatroom-app.js.
 */

import ChatroomApp from './chatroom-app.js'; // also registers <chatroom-app>

// ---------------------------------------------------------------------------
// Shared template registry (cross-domain MCP / infrastructure)
// Maps JSON-LD @type values → HTML <template> element IDs.
// These templates are always available as a fallback for all domains.
// @type values match the JSON-LD data files (no namespace prefix needed when
// @context is declared at the document level).
// ---------------------------------------------------------------------------

const SHARED_TEMPLATES = {
    'AgentMessage':      'template-shared-agent-msg',
    'UserMessage':       'template-shared-user-msg',
    'CommunicateAction': 'template-shared-typing',
    // Reserved keys: resolve which @type to use for live MCP rendering
    '__agent_message':   'AgentMessage',
    '__user_message':    'UserMessage',
};

// ---------------------------------------------------------------------------
// Domain template registries
// Maps JSON-LD @type values → HTML <template> element IDs.
// Overrides shared templates where domain-specific styling is preferred.
// Reserved keys:
//   '__agent_message' — @type whose template is used for MCP agent responses
//   '__user_message'  — @type whose template is used when the user sends a msg
// ---------------------------------------------------------------------------

const DOMAINS = {
    business: {
        theme: null, // default dark boardroom look
        templates: {
            // Business-specific types
            'ScheduleAction':    'template-business-agenda',
            // Business overrides shared AgentMessage / UserMessage / Typing
            'AgentMessage':      'template-business-agent-msg',
            'UserMessage':       'template-business-user-msg',
            'CommunicateAction': 'template-business-typing',
            '__agent_message':   'AgentMessage',
            '__user_message':    'UserMessage',
        },
    },
    party: {
        theme: 'party',
        templates: {
            // Party-specific types
            'SocialEvent':  'template-party-event',
            'HostMessage':  'template-party-host-msg',
            'GuestMessage': 'template-party-guest-msg',
            // Party: MCP responses use shared AgentMessage fallback;
            // user messages resolve to GuestMessage for domain styling.
            '__agent_message':  'AgentMessage',  // falls back to shared template
            '__user_message':   'GuestMessage',
        },
    },
};

// ---------------------------------------------------------------------------
// Read inline JSON-LD domain data injected by Jekyll
// The script element contains the @graph arrays from each domain's .json file.
// ---------------------------------------------------------------------------

function loadDomainData() {
    const el = document.getElementById('chatroom-domain-data');
    if (!el) return {};
    try {
        return JSON.parse(el.textContent);
    } catch {
        return {};
    }
}

// ---------------------------------------------------------------------------
// Activate a domain: register templates, swap theme, reload messages
// ---------------------------------------------------------------------------

function activateDomain(chatroom, domainId, domainData) {
    const domain = DOMAINS[domainId];
    if (!domain) return;

    // Register domain templates with the chatroom component
    chatroom.registerDomain(domain.templates);

    // Apply / remove theme variant CSS class
    chatroom.theme = domain.theme ?? null;

    // Load the domain's JSON-LD @graph array
    const messages = domainData[domainId];
    if (Array.isArray(messages)) {
        chatroom.loadDomain(messages);
    }
}

// ---------------------------------------------------------------------------
// Wire up domain-switcher buttons
// ---------------------------------------------------------------------------

function setupDomainSwitcher(chatroom, domainData) {
    const btns = document.querySelectorAll('[data-domain-switch]');
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const domainId = btn.getAttribute('data-domain-switch');
            btns.forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
            activateDomain(chatroom, domainId, domainData);
        });
    });
}

// ---------------------------------------------------------------------------
// Bootstrap — runs after the chatroom component fires 'chatroom-ready'
// ---------------------------------------------------------------------------

function init(chatroom) {
    const domainData = loadDomainData();

    // Register shared (cross-domain) templates first — available as fallback
    // to all domains including any not yet activated.
    chatroom.registerSharedTemplates(SHARED_TEMPLATES);

    // Start with the business domain
    activateDomain(chatroom, 'business', domainData);

    // Wire up the domain switcher
    setupDomainSwitcher(chatroom, domainData);
}

// chatroom-ready fires in connectedCallback — since module scripts are deferred,
// the custom element may already be connected when this code runs.
const chatroom = document.querySelector('chatroom-app');
if (chatroom) {
    if (chatroom.elements) {
        // Already connected and initialized
        init(chatroom);
    } else {
        // Wait for connectedCallback to complete
        chatroom.addEventListener('chatroom-ready', () => init(chatroom), { once: true });
    }
}
