/**
 * Genesis Form Component
 * 
 * Enhanced form component with validation and accessibility.
 * 
 * Usage:
 *   <genesis-form layout="vertical|horizontal|inline" validate="true">
 *     <form>
 *       <label>Name</label>
 *       <input type="text" required>
 *       <button type="submit">Submit</button>
 *     </form>
 *   </genesis-form>
 * 
 * SCSS Integration:
 *   genesis-form {
 *     @include genesis-environment('interaction-form');
 *   }
 */

import { GenesisElement } from './genesis-element.js';

export class GenesisForm extends GenesisElement {
  static get observedAttributes() {
    return ['layout', 'validate'];
  }

  connectedCallback() {
    super.connectedCallback();
    this._applyFormBehavior();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this._applyFormBehavior();
    }
  }

  _applyFormBehavior() {
    const layout = this.getAttribute('layout') || 'vertical';
    const validate = this.getAttribute('validate') === 'true';

    // Set data attributes for CSS targeting
    this.dataset.layout = layout;

    const form = this.querySelector('form');
    if (!form) return;

    // Enhance form inputs
    this._enhanceInputs(form);

    // Setup validation if enabled
    if (validate) {
      this._setupValidation(form);
    }

    // Setup submit button state
    this._setupSubmitButton(form);
  }

  _enhanceInputs(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
      // Ensure labels are associated
      const label = form.querySelector(`label[for="${input.id}"]`);
      if (!label && !input.hasAttribute('aria-label')) {
        console.warn('Input without associated label:', input);
      }

      // Add aria-required for required fields
      if (input.hasAttribute('required') && !input.hasAttribute('aria-required')) {
        input.setAttribute('aria-required', 'true');
      }

      // Add aria-invalid initially false
      if (!input.hasAttribute('aria-invalid')) {
        input.setAttribute('aria-invalid', 'false');
      }

      // Enhance with floating label behavior if needed
      if (input.parentElement.classList.contains('floating-label')) {
        this._setupFloatingLabel(input);
      }
    });
  }

  _setupFloatingLabel(input) {
    const updateLabel = () => {
      const hasValue = input.value.length > 0;
      input.parentElement.classList.toggle('has-value', hasValue);
    };

    input.addEventListener('input', updateLabel);
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });
    input.addEventListener('blur', () => {
      input.parentElement.classList.remove('focused');
      updateLabel();
    });

    // Initial state
    updateLabel();
  }

  _setupValidation(form) {
    const inputs = form.querySelectorAll('input, textarea, select');

    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        this._validateInput(input);
      });

      input.addEventListener('input', () => {
        // Clear error on input
        if (input.getAttribute('aria-invalid') === 'true') {
          this._clearInputError(input);
        }
      });
    });

    form.addEventListener('submit', (e) => {
      let isValid = true;
      inputs.forEach(input => {
        if (!this._validateInput(input)) {
          isValid = false;
        }
      });

      if (!isValid) {
        e.preventDefault();
        // Focus first invalid input
        const firstInvalid = form.querySelector('[aria-invalid="true"]');
        if (firstInvalid) {
          firstInvalid.focus();
        }
      }
    });
  }

  _validateInput(input) {
    const isValid = input.checkValidity();
    input.setAttribute('aria-invalid', (!isValid).toString());

    if (!isValid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._clearInputError(input);
    }

    return isValid;
  }

  _showInputError(input, message) {
    // Look for or create error message element
    let errorEl = input.parentElement.querySelector('.form-error');
    
    if (!errorEl) {
      errorEl = document.createElement('span');
      errorEl.className = 'form-error';
      errorEl.setAttribute('role', 'alert');
      input.parentElement.appendChild(errorEl);
    }

    errorEl.textContent = message;
    errorEl.id = `${input.id}-error`;
    input.setAttribute('aria-describedby', errorEl.id);
  }

  _clearInputError(input) {
    const errorEl = input.parentElement.querySelector('.form-error');
    if (errorEl) {
      errorEl.textContent = '';
      input.removeAttribute('aria-describedby');
    }
    input.setAttribute('aria-invalid', 'false');
  }

  _setupSubmitButton(form) {
    const submitBtn = form.querySelector('[type="submit"]');
    if (!submitBtn) return;

    // Disable submit during submission
    form.addEventListener('submit', () => {
      submitBtn.disabled = true;
      submitBtn.setAttribute('aria-busy', 'true');
      
      // Re-enable after a delay (in case of client-side handling)
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.removeAttribute('aria-busy');
      }, 2000);
    });
  }
}

// Register the custom element
if (!customElements.get('genesis-form')) {
  customElements.define('genesis-form', GenesisForm);
}
