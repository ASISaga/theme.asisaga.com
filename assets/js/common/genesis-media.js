/**
 * Genesis Media Component
 * 
 * Enhanced media container with lazy loading and aspect ratio support.
 * 
 * Usage:
 *   <genesis-media ratio="16:9|4:3|1:1|21:9" lazy="true">
 *     <img src="image.jpg" alt="Description">
 *   </genesis-media>
 * 
 * SCSS Integration:
 *   genesis-media {
 *     @include genesis-entity('secondary');
 *   }
 */

import { GenesisElement } from './genesis-element.js';

export class GenesisMedia extends GenesisElement {
  static get observedAttributes() {
    return ['ratio', 'lazy', 'caption'];
  }

  connectedCallback() {
    super.connectedCallback();
    this._applyMediaBehavior();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this._applyMediaBehavior();
    }
  }

  _applyMediaBehavior() {
    const ratio = this.getAttribute('ratio') || 'auto';
    const lazy = this.getAttribute('lazy') === 'true';
    const caption = this.getAttribute('caption');

    // Set data attributes for CSS targeting
    this.dataset.ratio = ratio;

    // Apply aspect ratio via CSS custom property
    if (ratio !== 'auto') {
      const [width, height] = ratio.split(':').map(Number);
      if (width && height) {
        this.style.setProperty('--aspect-ratio', `${width} / ${height}`);
      }
    }

    // Setup lazy loading
    if (lazy) {
      this._setupLazyLoad();
    }

    // Add caption if specified
    if (caption) {
      this._addCaption(caption);
    }

    // Enhance image/video
    const media = this.querySelector('img, video');
    if (media) {
      this._enhanceMedia(media);
    }
  }

  _setupLazyLoad() {
    const media = this.querySelector('img, video');
    if (!media) return;

    // Use native lazy loading if available
    if ('loading' in HTMLImageElement.prototype) {
      media.setAttribute('loading', 'lazy');
    } else {
      // Fallback to Intersection Observer
      this._setupIntersectionObserver(media);
    }
  }

  _setupIntersectionObserver(media) {
    const dataSrc = media.getAttribute('data-src');
    if (!dataSrc) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          media.src = dataSrc;
          media.removeAttribute('data-src');
          observer.unobserve(media);
        }
      });
    }, {
      rootMargin: '50px'
    });

    observer.observe(media);
  }

  _enhanceMedia(media) {
    // Ensure alt text for images
    if (media.tagName === 'IMG' && !media.hasAttribute('alt')) {
      console.warn('Image without alt text:', media);
      media.setAttribute('alt', '');
    }

    // Add loading state
    if (!media.complete) {
      this.classList.add('loading');
      
      media.addEventListener('load', () => {
        this.classList.remove('loading');
        this.classList.add('loaded');
        this._applyEntranceAnimation();
      });

      media.addEventListener('error', () => {
        this.classList.remove('loading');
        this.classList.add('error');
      });
    } else {
      this.classList.add('loaded');
      this._applyEntranceAnimation();
    }
  }

  _applyEntranceAnimation() {
    if (this._shouldAnimate() && window.Motion && window.motionPresets) {
      const preset = window.motionPresets.entrance.fadeIn;
      if (preset) {
        this._applyPreset(this, preset);
      }
    }
  }

  _addCaption(captionText) {
    // Check if caption already exists
    let caption = this.querySelector('figcaption');
    
    if (!caption) {
      // Convert to figure if needed
      if (this.tagName !== 'FIGURE') {
        const figure = document.createElement('figure');
        figure.className = this.className;
        
        // Move all children to figure
        while (this.firstChild) {
          figure.appendChild(this.firstChild);
        }
        
        this.appendChild(figure);
      }

      caption = document.createElement('figcaption');
      this.querySelector('figure, genesis-media').appendChild(caption);
    }

    caption.textContent = captionText;
  }
}

// Register the custom element
if (!customElements.get('genesis-media')) {
  customElements.define('genesis-media', GenesisMedia);
}
