/**
 * Global Theme Toggle — Dark / Light Mode
 *
 * Manages the user's dark/light mode preference across all sample pages.
 * Preference is stored in localStorage under the key 'genesis-theme'.
 * The chosen value ('dark' | 'light') is written to `data-theme` on <html>.
 *
 * Usage (imported by common.js):
 *   import { initThemeToggle } from './theme-toggle.js';
 *   initThemeToggle();
 *
 * The toggle button should carry:
 *   data-theme-toggle
 * and can optionally contain child elements with:
 *   data-theme-icon   — icon element whose classes are swapped on toggle
 *   data-theme-label  — text node swapped on toggle
 */

const STORAGE_KEY = 'genesis-theme';
const THEMES = { DARK: 'dark', LIGHT: 'light' };

/** Read stored preference; fall back to system preference. */
function getStoredTheme() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === THEMES.DARK || stored === THEMES.LIGHT) return stored;
  } catch (_) {
    // localStorage may be unavailable (private browsing, etc.)
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? THEMES.DARK
    : THEMES.LIGHT;
}

/** Write preference to localStorage and apply to <html>. */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch (_) { /* ignore */ }
}

/** Update every theme-toggle button on the page to reflect the current theme. */
function updateButtons(theme) {
  document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
    const isDark = theme === THEMES.DARK;
    btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    btn.setAttribute('aria-pressed', String(isDark));
    btn.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');

    const iconEl = btn.querySelector('[data-theme-icon]');
    if (iconEl) {
      // Swap Font Awesome icon classes
      if (isDark) {
        iconEl.classList.remove('fa-sun');
        iconEl.classList.add('fa-moon');
      } else {
        iconEl.classList.remove('fa-moon');
        iconEl.classList.add('fa-sun');
      }
    }

    const labelEl = btn.querySelector('[data-theme-label]');
    if (labelEl) {
      labelEl.textContent = isDark ? 'Dark' : 'Light';
    }
  });
}

/** Toggle between dark and light. */
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || THEMES.DARK;
  const next = current === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
  applyTheme(next);
  updateButtons(next);
}

/**
 * Initialise the theme system:
 *  1. Apply the stored/system preference.
 *  2. Wire up all [data-theme-toggle] buttons on the current page.
 *
 * Call this once on DOMContentLoaded.
 */
export function initThemeToggle() {
  const theme = getStoredTheme();
  applyTheme(theme);
  updateButtons(theme);

  // Delegate to handle buttons added dynamically or after DOMContentLoaded
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-theme-toggle]');
    if (btn) toggleTheme();
  });

  // Keep in sync with system preference changes (when no manual override yet)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    try {
      const manual = localStorage.getItem(STORAGE_KEY);
      if (!manual) applyTheme(e.matches ? THEMES.DARK : THEMES.LIGHT);
    } catch (_) { /* ignore */ }
  });
}

/**
 * Inline-safe theme init — called by the blocking <script> in <head> to
 * apply data-theme before the first paint (prevents flash of wrong theme).
 */
export function applyStoredTheme() {
  const theme = getStoredTheme();
  document.documentElement.setAttribute('data-theme', theme);
}
