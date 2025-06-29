// aos-url.js
// Dynamically load AOS (Animate On Scroll) library from CDN as a module

export const aosUrl = 'https://unpkg.com/aos@next/dist/aos.js';

export async function loadAOS() {
  if (!window.AOS) {
    await import(/* @vite-ignore */ aosUrl);
  }
}
