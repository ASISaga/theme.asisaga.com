/**
 * Template Utilities
 * 
 * JavaScript utilities for instantiating HTML templates from the web-component-templates directory.
 * 
 * These utilities work with HTML5 <template> tags that are not rendered on page load
 * but can be cloned and instantiated dynamically via JavaScript.
 * 
 * Usage:
 *   import { instantiateTemplate, populateTemplate } from './template-utils.js';
 *   
 *   const template = document.getElementById('template-product-card');
 *   const data = { title: 'My Product', description: '...' };
 *   const instance = instantiateTemplate(template, data);
 *   document.querySelector('.container').appendChild(instance);
 */

/**
 * Clone a template and return its content
 * @param {HTMLTemplateElement} template - The template element to clone
 * @returns {DocumentFragment} - Cloned template content
 */
export function cloneTemplate(template) {
  if (!template || !(template instanceof HTMLTemplateElement)) {
    console.error('Invalid template element provided');
    return null;
  }
  
  return template.content.cloneNode(true);
}

/**
 * Populate a cloned template with data
 * @param {DocumentFragment|Element} fragment - The cloned template fragment
 * @param {Object} data - Data to populate the template
 * @returns {Element} - The first element in the fragment
 */
export function populateTemplate(fragment, data = {}) {
  // Get the first element from the fragment
  const element = fragment.firstElementChild || fragment;
  
  // Populate text content based on data attributes or class names
  Object.keys(data).forEach(key => {
    const value = data[key];
    
    // Find elements by data attribute selector
    const selector = `[data-${key}]`;
    const targets = element.querySelectorAll(selector);
    
    // Also try class-based selection (e.g., .wc-card__title)
    const classSelector = `.wc-${element.className.split(' ')[0].replace('wc-', '')}__${key}`;
    const classTargets = element.querySelectorAll(classSelector);
    
    // Combine both selections
    const allTargets = [...targets, ...classTargets];
    
    allTargets.forEach(target => {
      if (target.tagName === 'IMG') {
        target.src = value;
        target.alt = data.title || data.name || '';
      } else if (target.tagName === 'A') {
        target.href = value;
        if (value) {
          target.style.display = '';
        }
      } else {
        target.textContent = value;
      }
    });
  });
  
  return element;
}

/**
 * Instantiate a template with data
 * @param {HTMLTemplateElement|string} template - Template element or ID
 * @param {Object} data - Data to populate the template
 * @returns {Element} - Populated template instance
 */
export function instantiateTemplate(template, data = {}) {
  // If template is a string, get the element by ID
  if (typeof template === 'string') {
    template = document.getElementById(template);
  }
  
  const fragment = cloneTemplate(template);
  if (!fragment) {
    return null;
  }
  
  return populateTemplate(fragment, data);
}

/**
 * Instantiate multiple templates from an array of data
 * @param {HTMLTemplateElement|string} template - Template element or ID
 * @param {Array<Object>} dataArray - Array of data objects
 * @returns {Array<Element>} - Array of populated instances
 */
export function instantiateMultiple(template, dataArray = []) {
  return dataArray.map(data => instantiateTemplate(template, data));
}

/**
 * Append instantiated template to a container
 * @param {Element|string} container - Container element or selector
 * @param {HTMLTemplateElement|string} template - Template element or ID
 * @param {Object} data - Data to populate the template
 * @returns {Element} - The appended element
 */
export function appendTemplate(container, template, data = {}) {
  if (typeof container === 'string') {
    container = document.querySelector(container);
  }
  
  if (!container) {
    console.error('Container not found');
    return null;
  }
  
  const instance = instantiateTemplate(template, data);
  if (instance) {
    container.appendChild(instance);
  }
  
  return instance;
}

/**
 * Replace container contents with instantiated templates
 * @param {Element|string} container - Container element or selector
 * @param {HTMLTemplateElement|string} template - Template element or ID
 * @param {Array<Object>} dataArray - Array of data objects
 * @returns {Array<Element>} - Array of appended elements
 */
export function replaceWithTemplates(container, template, dataArray = []) {
  if (typeof container === 'string') {
    container = document.querySelector(container);
  }
  
  if (!container) {
    console.error('Container not found');
    return [];
  }
  
  // Clear container
  container.innerHTML = '';
  
  // Append all instances
  const instances = instantiateMultiple(template, dataArray);
  instances.forEach(instance => {
    container.appendChild(instance);
  });
  
  return instances;
}

// Export all functions as a utility object
export default {
  cloneTemplate,
  populateTemplate,
  instantiateTemplate,
  instantiateMultiple,
  appendTemplate,
  replaceWithTemplates,
};
