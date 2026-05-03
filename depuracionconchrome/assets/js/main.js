const root = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');
const themeLabel = document.querySelector('.theme-toggle__label');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const inputA = document.querySelector('#numero-a');
const inputB = document.querySelector('#numero-b');
const resultNode = document.querySelector('#resultado');
const statusNode = document.querySelector('#demo-status');
const inspectorAValue = document.querySelector('#inspector-a-value');
const inspectorAType = document.querySelector('#inspector-a-type');
const inspectorBValue = document.querySelector('#inspector-b-value');
const inspectorBType = document.querySelector('#inspector-b-type');
const inspectorResultValue = document.querySelector('#inspector-result-value');
const inspectorResultType = document.querySelector('#inspector-result-type');
const brokenButton = document.querySelector('#demo-broken-button');
const fixedButton = document.querySelector('#demo-fixed-button');
const consoleButton = document.querySelector('#demo-console-button');
const openButton = document.querySelector('#demo-open-button');
const resetButton = document.querySelector('#demo-reset-button');
const consoleHelpText = document.querySelector('#demo-console-help-text');

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

const formatValue = (value) => {
  return typeof value === 'string' ? `"${value}"` : String(value);
};

const updateInspector = (aValue, bValue, resultValue, message) => {
  if (resultNode) {
    resultNode.textContent = String(resultValue);
  }

  if (statusNode) {
    statusNode.textContent = message;
  }

  if (inspectorAValue) {
    inspectorAValue.textContent = formatValue(aValue);
  }

  if (inspectorAType) {
    inspectorAType.textContent = typeof aValue;
  }

  if (inspectorBValue) {
    inspectorBValue.textContent = formatValue(bValue);
  }

  if (inspectorBType) {
    inspectorBType.textContent = typeof bValue;
  }

  if (inspectorResultValue) {
    inspectorResultValue.textContent = formatValue(resultValue);
  }

  if (inspectorResultType) {
    inspectorResultType.textContent = typeof resultValue;
  }
};

const runBrokenSum = () => {
  const aValue = inputA?.value ?? '';
  const bValue = inputB?.value ?? '';
  const resultValue = aValue + bValue;

  updateInspector(
    aValue,
    bValue,
    resultValue,
    `Con error: ${formatValue(aValue)} + ${formatValue(bValue)} produce ${formatValue(resultValue)} porque ambos valores siguen siendo texto.`
  );
};

const runFixedSum = () => {
  const aValue = Number(inputA?.value ?? 0);
  const bValue = Number(inputB?.value ?? 0);
  const resultValue = aValue + bValue;

  updateInspector(
    aValue,
    bValue,
    resultValue,
    `Corregido: ${aValue} + ${bValue} produce ${resultValue} porque los valores ya se convierten a numero antes de sumarse.`
  );
};

const resetDemo = () => {
  if (inputA) {
    inputA.value = '2';
  }

  if (inputB) {
    inputB.value = '3';
  }

  runBrokenSum();
};

const guideConsole = () => {
  const aValue = inputA?.value ?? '';
  const bValue = inputB?.value ?? '';
  const brokenResult = aValue + bValue;

  console.group('Mini demo de depuracion');
  console.log('Atajo recomendado: F12 o Ctrl+Mayus+J');
  console.log('Valor de a:', aValue, '| tipo:', typeof aValue);
  console.log('Valor de b:', bValue, '| tipo:', typeof bValue);
  console.log('Resultado con error:', brokenResult, '| tipo:', typeof brokenResult);
  console.log('Pista: coloca un breakpoint en la linea donde se calcula a + b.');
  console.groupEnd();

  if (consoleHelpText) {
    consoleHelpText.innerHTML = 'Traza enviada a la consola. Ahora abre DevTools con <strong>F12</strong> o <strong>Ctrl + Mayus + J</strong> y revisa los valores impresos antes de poner el breakpoint en la suma.';
  }
};

brokenButton?.addEventListener('click', runBrokenSum);
fixedButton?.addEventListener('click', runFixedSum);
consoleButton?.addEventListener('click', guideConsole);
openButton?.addEventListener('click', () => {
  window.open('depurar.html', '_blank');
});
resetButton?.addEventListener('click', resetDemo);

inputA?.addEventListener('input', runBrokenSum);
inputB?.addEventListener('input', runBrokenSum);

resetDemo();

if (!prefersReducedMotion.matches) {
  const updateParallax = () => {
    root.style.setProperty('--parallax-shift', String(window.scrollY));
  };

  updateParallax();
  window.addEventListener('scroll', updateParallax, { passive: true });
}