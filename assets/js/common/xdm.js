/**
 * XDM (Experience Data Model) helper for Adobe Experience Platform (AEP).
 *
 * Builds XDM ExperienceEvent payloads from DOM interactions and sends them
 * via the Adobe Web SDK (alloy) when available. Falls back to console logging
 * in development environments.
 *
 * Integrates with genesis-synapse data attributes:
 *   data-synapse="navigate"  → trackLinkClick()
 *   data-synapse="execute"   → trackCtaClick()
 *
 * Usage (in assets/js/script.js or assets/js/common.js):
 *
 *   import { trackPageView, trackLinkClick, trackCtaClick } from './common/xdm.js';
 *
 *   document.addEventListener('DOMContentLoaded', () => {
 *     trackPageView();
 *     document.querySelectorAll('[data-synapse="navigate"]').forEach(link => {
 *       link.addEventListener('click', () => trackLinkClick(link));
 *     });
 *     document.querySelectorAll('[data-synapse="execute"]').forEach(button => {
 *       button.addEventListener('click', () => trackCtaClick(button));
 *     });
 *   });
 *
 * Reference: https://experienceleague.adobe.com/docs/experience-platform/xdm/home.html
 * Spec: docs/specifications/atomic-design-state-xdm-schema.md § Part 3
 */

const XDM_SCHEMA = 'https://ns.adobe.com/xdm/context/experienceevent';

/**
 * Build a base XDM ExperienceEvent payload.
 * @param {string} eventType - XDM event type string
 * @param {object} [details={}] - Additional XDM fields to merge
 * @returns {object} XDM-compliant event payload
 */
function buildXdmEvent(eventType, details = {}) {
  return {
    _schema: XDM_SCHEMA,
    timestamp: new Date().toISOString(),
    eventType,
    web: {
      webPageDetails: {
        URL: window.location.href,
        name: document.title,
        isHomePage: window.location.pathname === '/'
      },
      webReferrer: {
        URL: document.referrer || ''
      }
    },
    environment: {
      type: 'browser',
      browserDetails: {
        userAgent: navigator.userAgent,
        cookiesEnabled: navigator.cookieEnabled,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight
      }
    },
    ...details
  };
}

/**
 * Track a page view event.
 * Call once per page load from DOMContentLoaded.
 */
function trackPageView() {
  const event = buildXdmEvent('web.webpagedetails.pageViews', {
    web: {
      webPageDetails: {
        pageViews: { value: 1 }
      }
    }
  });
  sendXdmEvent(event);
}

/**
 * Track a navigation link-click event.
 * Wires to elements with data-synapse="navigate".
 * @param {HTMLAnchorElement} link - The anchor element that was clicked
 */
function trackLinkClick(link) {
  const event = buildXdmEvent('web.webinteraction.linkClicks', {
    web: {
      webInteraction: {
        name: link.textContent.trim(),
        URL: link.href,
        type: 'other',
        linkClicks: { value: 1 }
      }
    }
  });
  sendXdmEvent(event);
}

/**
 * Track a CTA button click event.
 * Wires to elements with data-synapse="execute".
 * @param {HTMLElement} button - The button element that was clicked
 * @param {string} [ctaName] - Optional human-readable CTA name override
 */
function trackCtaClick(button, ctaName) {
  const event = buildXdmEvent('web.webinteraction.linkClicks', {
    web: {
      webInteraction: {
        name: ctaName || button.textContent.trim(),
        type: 'call-to-action',
        linkClicks: { value: 1 }
      }
    }
  });
  sendXdmEvent(event);
}

/**
 * Send an XDM event payload.
 * Uses Adobe Web SDK (alloy) when available.
 * In development environments, logs to console instead of failing silently.
 * Development is detected by localhost, 127.x.x.x, 192.168.x.x, 10.x.x.x,
 * or hostnames ending in '.local'.
 * @param {object} xdmPayload - XDM ExperienceEvent payload
 */
function sendXdmEvent(xdmPayload) {
  if (typeof window.alloy === 'function') {
    window.alloy('sendEvent', { xdm: xdmPayload });
  } else if (_isDevEnvironment()) {
    console.debug('[XDM Event]', xdmPayload);
  }
}

/**
 * Detect whether the current environment is a development host.
 * @returns {boolean}
 */
function _isDevEnvironment() {
  const h = window.location.hostname;
  return (
    h === 'localhost' ||
    h === '127.0.0.1' ||
    h.endsWith('.local') ||
    /^192\.168\./.test(h) ||
    /^10\./.test(h)
  );
}

export { buildXdmEvent, trackPageView, trackLinkClick, trackCtaClick, sendXdmEvent };
