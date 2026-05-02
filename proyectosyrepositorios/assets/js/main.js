const root = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');
const themeLabel = document.querySelector('.theme-toggle__label');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const setTheme = (theme) => {
  const isDark = theme === 'dark';
  root.dataset.theme = theme;
  localStorage.setItem('preferred-theme', theme);
  themeToggle?.setAttribute('aria-pressed', String(isDark));

  if (themeLabel) {
    themeLabel.textContent = isDark ? 'Modo claro' : 'Modo oscuro';
  }
};

const savedTheme = localStorage.getItem('preferred-theme');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

setTheme(savedTheme || systemTheme);

themeToggle?.addEventListener('click', () => {
  const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(nextTheme);
});

if (!prefersReducedMotion.matches) {
  const updateParallax = () => {
    root.style.setProperty('--parallax-shift', String(window.scrollY));
  };

  updateParallax();
  window.addEventListener('scroll', updateParallax, { passive: true });
}
