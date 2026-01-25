/**
 * ASI Saga Theme - Futuristic Three.js Enhancement Layer
 * 
 * Adds dynamic particle systems, neural network visualizations,
 * and futuristic lighting effects to enhance the profound black aesthetic
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    particles: {
      count: 150,
      size: { min: 1, max: 3 },
      speed: 0.0005,
      color: 0x3A86FF,  // Neon blue
      opacity: { min: 0.3, max: 0.8 }
    },
    neural: {
      nodeCount: 30,
      connectionDistance: 150,
      lineOpacity: 0.15,
      nodeSize: 2
    },
    effects: {
      enableGlow: true,
      glowIntensity: 0.6,
      enableMotion: true
    }
  };

  class FuturisticBackgroundEffect {
    constructor() {
      this.container = null;
      this.scene = null;
      this.camera = null;
      this.renderer = null;
      this.particles = [];
      this.neuralNodes = [];
      this.connections = [];
      this.animationId = null;
      
      // Check if reduced motion is preferred
      this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    init() {
      if (this.reducedMotion) {
        console.log('Futuristic effects disabled due to reduced motion preference');
        return;
      }

      // Create container
      this.container = document.createElement('div');
      this.container.id = 'futuristic-background';
      this.container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        pointer-events: none;
        background: transparent;
      `;
      
      // Insert at the beginning of body
      if (document.body.firstChild) {
        document.body.insertBefore(this.container, document.body.firstChild);
      } else {
        document.body.appendChild(this.container);
      }

      // Initialize Three.js
      this.setupScene();
      this.createParticles();
      this.createNeuralNetwork();
      this.animate();

      // Handle window resize
      window.addEventListener('resize', () => this.onWindowResize(), false);
    }

    setupScene() {
      // Scene
      this.scene = new THREE.Scene();

      // Camera
      this.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      this.camera.position.z = 300;

      // Renderer
      this.renderer = new THREE.WebGLRenderer({ 
        alpha: true,
        antialias: true 
      });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.container.appendChild(this.renderer.domElement);
    }

    createParticles() {
      const geometry = new THREE.BufferGeometry();
      const positions = [];
      const velocities = [];

      for (let i = 0; i < CONFIG.particles.count; i++) {
        positions.push(
          (Math.random() - 0.5) * 800,
          (Math.random() - 0.5) * 800,
          (Math.random() - 0.5) * 800
        );
        
        velocities.push(
          (Math.random() - 0.5) * CONFIG.particles.speed,
          (Math.random() - 0.5) * CONFIG.particles.speed,
          (Math.random() - 0.5) * CONFIG.particles.speed
        );
      }

      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      geometry.setAttribute('velocity', new THREE.Float32BufferAttribute(velocities, 3));

      const material = new THREE.PointsMaterial({
        color: CONFIG.particles.color,
        size: CONFIG.particles.size.max,
        transparent: true,
        opacity: CONFIG.particles.opacity.max,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
      });

      this.particles = new THREE.Points(geometry, material);
      this.scene.add(this.particles);
    }

    createNeuralNetwork() {
      const geometry = new THREE.BufferGeometry();
      const positions = [];

      // Create neural nodes
      for (let i = 0; i < CONFIG.neural.nodeCount; i++) {
        const node = {
          x: (Math.random() - 0.5) * 600,
          y: (Math.random() - 0.5) * 600,
          z: (Math.random() - 0.5) * 200
        };
        this.neuralNodes.push(node);
        positions.push(node.x, node.y, node.z);
      }

      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

      const material = new THREE.PointsMaterial({
        color: CONFIG.particles.color,
        size: CONFIG.neural.nodeSize,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
      });

      const nodes = new THREE.Points(geometry, material);
      this.scene.add(nodes);

      // Create connections
      this.updateConnections();
    }

    updateConnections() {
      // Remove old connections
      this.connections.forEach(conn => this.scene.remove(conn));
      this.connections = [];

      // Create new connections based on distance
      for (let i = 0; i < this.neuralNodes.length; i++) {
        for (let j = i + 1; j < this.neuralNodes.length; j++) {
          const node1 = this.neuralNodes[i];
          const node2 = this.neuralNodes[j];
          
          const distance = Math.sqrt(
            Math.pow(node2.x - node1.x, 2) +
            Math.pow(node2.y - node1.y, 2) +
            Math.pow(node2.z - node1.z, 2)
          );

          if (distance < CONFIG.neural.connectionDistance) {
            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array([
              node1.x, node1.y, node1.z,
              node2.x, node2.y, node2.z
            ]);
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

            const material = new THREE.LineBasicMaterial({
              color: CONFIG.particles.color,
              transparent: true,
              opacity: CONFIG.neural.lineOpacity * (1 - distance / CONFIG.neural.connectionDistance),
              blending: THREE.AdditiveBlending
            });

            const line = new THREE.Line(geometry, material);
            this.scene.add(line);
            this.connections.push(line);
          }
        }
      }
    }

    animate() {
      this.animationId = requestAnimationFrame(() => this.animate());

      // Rotate particles slowly
      if (this.particles) {
        this.particles.rotation.y += 0.0002;
        this.particles.rotation.x += 0.0001;
      }

      // Animate neural nodes
      this.neuralNodes.forEach(node => {
        node.x += (Math.random() - 0.5) * 0.5;
        node.y += (Math.random() - 0.5) * 0.5;
        
        // Keep nodes within bounds
        node.x = Math.max(-300, Math.min(300, node.x));
        node.y = Math.max(-300, Math.min(300, node.y));
      });

      // Update connections occasionally
      if (Math.random() > 0.97) {
        this.updateConnections();
      }

      this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    destroy() {
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
      }
      if (this.container && this.container.parentNode) {
        this.container.parentNode.removeChild(this.container);
      }
    }
  }

  // Initialize after DOM and Three.js are loaded
  function initWhenReady() {
    if (typeof THREE === 'undefined') {
      console.warn('Three.js not loaded, futuristic effects disabled');
      return;
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        const effect = new FuturisticBackgroundEffect();
        effect.init();
      });
    } else {
      const effect = new FuturisticBackgroundEffect();
      effect.init();
    }
  }

  // Export for potential external use
  window.FuturisticBackgroundEffect = FuturisticBackgroundEffect;
  
  // Auto-initialize
  initWhenReady();

})();
