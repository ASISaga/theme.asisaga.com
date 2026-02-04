/**
 * Web Component: Alert Card
 * 
 * Namespace:
 *   HTML:  _includes/web-component-templates/alert-card.html
 *   SCSS:  _sass/components/_alert-card.scss
 *   JS:    assets/js/components/alert-card.js
 * 
 * Usage:
 *   import { createAlertCard } from './alert-card.js';
 *   
 *   const alert = createAlertCard({
 *     type: 'success',
 *     title: 'Success!',
 *     message: 'Operation completed successfully.',
 *     dismissible: true
 *   });
 *   
 *   document.body.appendChild(alert);
 */

import { instantiateTemplate } from './template-utils.js';

/**
 * Alert type to icon SVG mapping
 */
const ALERT_ICONS = {
  info: `<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>`,
  success: `<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>`,
  warning: `<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>`,
  error: `<circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>`
};

/**
 * Create an alert card instance
 * @param {Object} data - Alert data
 * @param {string} [data.type='info'] - Alert type (info|success|warning|error)
 * @param {string} [data.title] - Alert title (optional)
 * @param {string} data.message - Alert message text
 * @param {boolean} [data.dismissible=false] - Whether alert can be dismissed
 * @returns {Element} - Alert card element
 */
export function createAlertCard(data) {
  const template = document.getElementById('template-alert-card');
  const card = instantiateTemplate(template);
  
  if (!card) {
    console.error('Alert card template not found');
    return null;
  }
  
  // Set alert type
  const type = data.type || 'info';
  card.classList.add(`wc-alert-card--${type}`);
  card.setAttribute('data-type', type);
  
  // Update icon based on type
  const iconSvg = card.querySelector('.wc-alert-card__icon-svg');
  if (iconSvg && ALERT_ICONS[type]) {
    iconSvg.innerHTML = ALERT_ICONS[type];
  }
  
  // Populate title
  const title = card.querySelector('.wc-alert-card__title');
  if (title) {
    if (data.title) {
      title.textContent = data.title;
      title.style.display = '';
    } else {
      title.style.display = 'none';
    }
  }
  
  // Populate message
  const message = card.querySelector('.wc-alert-card__message');
  if (message && data.message) {
    message.textContent = data.message;
  }
  
  // Setup dismiss button
  const dismissButton = card.querySelector('.wc-alert-card__dismiss');
  if (dismissButton) {
    if (data.dismissible) {
      dismissButton.style.display = '';
      dismissButton.addEventListener('click', () => {
        card.remove();
      });
    } else {
      dismissButton.remove();
    }
  }
  
  return card;
}

/**
 * Create and show an alert (convenience method)
 * @param {Object} data - Alert data
 * @param {Element|string} [container] - Container to append to (default: body)
 * @param {number} [duration] - Auto-dismiss after duration in ms (0 = no auto-dismiss)
 * @returns {Element} - Alert card element
 */
export function showAlert(data, container = document.body, duration = 0) {
  if (typeof container === 'string') {
    container = document.querySelector(container);
  }
  
  const alert = createAlertCard(data);
  if (!alert) return null;
  
  container.appendChild(alert);
  
  // Auto-dismiss if duration specified
  if (duration > 0) {
    setTimeout(() => {
      alert.remove();
    }, duration);
  }
  
  return alert;
}

/**
 * Show info alert
 */
export function showInfo(message, title, options = {}) {
  return showAlert({ ...options, type: 'info', message, title });
}

/**
 * Show success alert
 */
export function showSuccess(message, title, options = {}) {
  return showAlert({ ...options, type: 'success', message, title });
}

/**
 * Show warning alert
 */
export function showWarning(message, title, options = {}) {
  return showAlert({ ...options, type: 'warning', message, title });
}

/**
 * Show error alert
 */
export function showError(message, title, options = {}) {
  return showAlert({ ...options, type: 'error', message, title });
}

export default {
  createAlertCard,
  showAlert,
  showInfo,
  showSuccess,
  showWarning,
  showError,
};
