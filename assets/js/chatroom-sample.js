/**
 * Chatroom Domain Sample — initialization script
 *
 * Demonstrates the JSON-LD domain approach for the chatroom component:
 *   - Reads Schema.org JSON-LD messages from the inline #chatroom-domain-data
 *     script element (injected by Jekyll from _data/chatroom/domain/*.yml).
 *   - Registers domain-specific HTML templates so chatroom-app can render any
 *     JSON-LD object whose @type is declared in the domain map.
 *   - Wires up the domain-switcher buttons to hot-swap the full conversation.
 *
 * The chatroom-app element is already registered by importing chatroom-app.js.
 */

import ChatroomApp from './chatroom-app.js'; // also registers <chatroom-app>

// ---------------------------------------------------------------------------
// Domain template registries
// Maps JSON-LD @type values → HTML <template> element IDs.
// Reserved keys:
//   '__agent_message' — @type whose template is used for MCP agent responses
//   '__user_message'  — @type whose template is used when the user sends a msg
// ---------------------------------------------------------------------------

const DOMAINS = {
    business: {
        theme: null, // default dark boardroom look
        templates: {
            'schema:ScheduleAction':    'template-business-agenda',
            'schema:AgentMessage':      'template-business-agent-msg',
            'schema:UserMessage':       'template-business-user-msg',
            'schema:CommunicateAction': 'template-business-typing',
            '__agent_message':          'schema:AgentMessage',
            '__user_message':           'schema:UserMessage',
        },
    },
    party: {
        theme: 'party',
        templates: {
            'schema:SocialEvent':  'template-party-event',
            'schema:HostMessage':  'template-party-host-msg',
            'schema:GuestMessage': 'template-party-guest-msg',
            '__agent_message':     'schema:HostMessage',
            '__user_message':      'schema:GuestMessage',
        },
    },
};

// ---------------------------------------------------------------------------
// Read inline JSON-LD domain data injected by Jekyll
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

    // Load the domain's JSON-LD messages
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
