import { Theme } from '../Type/Definition/index.js';

const dune: Theme = {
  name: 'dune',
  cssVariables: {
    'color-base-100': '#ECEBDE',
    'color-base-200': '#D7D3BF',
    'color-base-300': '#C1BAA1',

    'color-base-content': '#A59D84',
    'color-primary': '#ff073a',
    'color-primary-content': '#ffffff',
    'color-secondary': '#1a1a1a',
    'color-secondary-content': '#ffffff',
    'color-accent': 'oklch(77% 0.152 181.912)',
    'color-accent-content': 'oklch(38% 0.063 188.416)',
    'color-neutral': 'oklch(14% 0.005 285.823)',
    'color-neutral-content': 'oklch(92% 0.004 286.32)',

    'color-info': '#036fe3',
    'color-info-content': '#fff',
    'color-success': '#008539',
    'color-success-content': '#fff',
    'color-warning': '#ffc835',
    'color-warning-content': '#000',
    'color-error': '#da294a',
    'color-error-content': '#000',

    'radius-selector': '1rem',
    'radius-field': '0.5rem',
    'radius-box': '1rem',
    'size-selector': '0.25rem',
    'size-field': '0.25rem',
    border: '1px',
    depth: '0',
    noise: '0',

    'color-code-background': '#ECEBDE',
  },
  shikiTheme: 'catppuccin-latte',
};

export { dune };
