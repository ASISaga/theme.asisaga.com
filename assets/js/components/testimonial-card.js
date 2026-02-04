/**
 * Web Component: Testimonial Card
 * 
 * Namespace:
 *   HTML:  _includes/web-component-templates/testimonial-card.html
 *   SCSS:  _sass/components/_testimonial-card.scss
 *   JS:    assets/js/components/testimonial-card.js
 * 
 * Usage:
 *   import { createTestimonialCard } from './testimonial-card.js';
 *   
 *   const testimonial = createTestimonialCard({
 *     text: 'This is amazing!',
 *     name: 'John Doe',
 *     company: 'Acme Corp',
 *     avatar: '/path/to/avatar.jpg'
 *   });
 *   
 *   document.querySelector('.testimonials').appendChild(testimonial);
 */

import { instantiateTemplate } from './template-utils.js';

/**
 * Create a testimonial card instance
 * @param {Object} data - Testimonial data
 * @param {string} data.text - Testimonial quote text
 * @param {string} data.name - Author name
 * @param {string} [data.company] - Author company (optional)
 * @param {string} [data.avatar] - Author avatar URL (optional)
 * @returns {Element} - Testimonial card element
 */
export function createTestimonialCard(data) {
  const template = document.getElementById('template-testimonial-card');
  const card = instantiateTemplate(template);
  
  if (!card) {
    console.error('Testimonial card template not found');
    return null;
  }
  
  // Populate quote text
  const text = card.querySelector('.wc-testimonial-card__text');
  if (text && data.text) {
    text.textContent = data.text;
  }
  
  // Populate author name
  const name = card.querySelector('.wc-testimonial-card__name');
  if (name && data.name) {
    name.textContent = data.name;
  }
  
  // Populate company
  const company = card.querySelector('.wc-testimonial-card__company');
  if (company) {
    if (data.company) {
      company.textContent = data.company;
      company.style.display = '';
    } else {
      company.style.display = 'none';
    }
  }
  
  // Populate avatar
  const avatarContainer = card.querySelector('.wc-testimonial-card__avatar');
  const avatarImage = card.querySelector('.wc-testimonial-card__avatar-image');
  
  if (avatarContainer && avatarImage) {
    if (data.avatar) {
      avatarImage.src = data.avatar;
      avatarImage.alt = data.name || '';
      avatarContainer.style.display = '';
    } else {
      avatarContainer.style.display = 'none';
    }
  }
  
  return card;
}

/**
 * Create multiple testimonial cards
 * @param {Array<Object>} testimonials - Array of testimonial data objects
 * @returns {Array<Element>} - Array of testimonial card elements
 */
export function createTestimonialCards(testimonials) {
  return testimonials.map(testimonial => createTestimonialCard(testimonial));
}

/**
 * Render testimonial cards to a container
 * @param {Element|string} container - Container element or selector
 * @param {Array<Object>} testimonials - Array of testimonial data objects
 * @param {boolean} replace - Whether to replace existing content (default: false)
 * @returns {Array<Element>} - Array of created card elements
 */
export function renderTestimonialCards(container, testimonials, replace = false) {
  if (typeof container === 'string') {
    container = document.querySelector(container);
  }
  
  if (!container) {
    console.error('Container not found');
    return [];
  }
  
  if (replace) {
    container.innerHTML = '';
  }
  
  const cards = createTestimonialCards(testimonials);
  cards.forEach(card => {
    container.appendChild(card);
  });
  
  return cards;
}

export default {
  createTestimonialCard,
  createTestimonialCards,
  renderTestimonialCards,
};
