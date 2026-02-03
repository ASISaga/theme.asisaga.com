/**
 * Web Component: Product Card
 * 
 * Namespace:
 *   HTML:  _includes/web-component-templates/product-card.html
 *   SCSS:  _sass/components/web-components/_product-card.scss
 *   JS:    assets/js/common/web-component-product-card.js
 * 
 * Usage:
 *   import { createProductCard } from './web-component-product-card.js';
 *   
 *   const card = createProductCard({
 *     image: '/path/to/image.jpg',
 *     title: 'Product Name',
 *     description: 'Product description',
 *     url: '/products/product-name',
 *     demoUrl: 'https://demo.example.com'
 *   });
 *   
 *   document.querySelector('.products-grid').appendChild(card);
 */

import { instantiateTemplate } from './template-utils.js';

/**
 * Create a product card instance
 * @param {Object} data - Product card data
 * @param {string} data.image - Product image URL
 * @param {string} data.title - Product title
 * @param {string} data.description - Product description
 * @param {string} data.url - Learn more URL
 * @param {string} [data.demoUrl] - Demo URL (optional)
 * @returns {Element} - Product card element
 */
export function createProductCard(data) {
  const template = document.getElementById('template-product-card');
  const card = instantiateTemplate(template);
  
  if (!card) {
    console.error('Product card template not found');
    return null;
  }
  
  // Populate image or placeholder
  const image = card.querySelector('.wc-product-card__image');
  const placeholder = card.querySelector('.wc-product-card__placeholder');
  const placeholderText = card.querySelector('.wc-product-card__placeholder-text');
  
  if (data.image) {
    image.src = data.image;
    image.alt = data.title || '';
    image.style.display = '';
    placeholder.style.display = 'none';
  } else {
    image.style.display = 'none';
    placeholder.style.display = '';
    if (data.title) {
      placeholderText.textContent = data.title.charAt(0).toUpperCase();
    }
  }
  
  // Populate title
  const title = card.querySelector('.wc-product-card__title');
  if (title && data.title) {
    title.textContent = data.title;
  }
  
  // Populate description
  const description = card.querySelector('.wc-product-card__description');
  if (description && data.description) {
    description.textContent = data.description;
  }
  
  // Populate primary button
  const primaryButton = card.querySelector('.wc-product-card__button--primary');
  if (primaryButton && data.url) {
    primaryButton.href = data.url;
  }
  
  // Populate secondary button (demo)
  const secondaryButton = card.querySelector('.wc-product-card__button--secondary');
  if (secondaryButton) {
    if (data.demoUrl) {
      secondaryButton.href = data.demoUrl;
      secondaryButton.style.display = '';
    } else {
      secondaryButton.remove();
    }
  }
  
  return card;
}

/**
 * Create multiple product cards
 * @param {Array<Object>} products - Array of product data objects
 * @returns {Array<Element>} - Array of product card elements
 */
export function createProductCards(products) {
  return products.map(product => createProductCard(product));
}

/**
 * Render product cards to a container
 * @param {Element|string} container - Container element or selector
 * @param {Array<Object>} products - Array of product data objects
 * @param {boolean} replace - Whether to replace existing content (default: false)
 * @returns {Array<Element>} - Array of created card elements
 */
export function renderProductCards(container, products, replace = false) {
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
  
  const cards = createProductCards(products);
  cards.forEach(card => {
    container.appendChild(card);
  });
  
  return cards;
}

export default {
  createProductCard,
  createProductCards,
  renderProductCards,
};
