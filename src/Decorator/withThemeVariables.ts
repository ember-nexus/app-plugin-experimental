import { Constructor, ElementCapableWebComponent } from '../Type/Definition/index.js';

const THEME_VARIABLE_KEYS = [
  '--color-base-100',
  '--color-base-200',
  '--color-base-300',

  '--color-base-content',
  '--color-primary',
  '--color-primary-content',
  '--color-secondary',
  '--color-secondary-content',
  '--color-accent',
  '--color-accent-content',
  '--color-neutral',
  '--color-neutral-content',

  '--color-info',
  '--color-info-content',
  '--color-success',
  '--color-success-content',
  '--color-warning',
  '--color-warning-content',
  '--color-error',
  '--color-error-content',

  '--radius-selector',
  '--radius-field',
  '--radius-box',
  '--size-selector',
  '--size-field',
  '--border',
  '--depth',
  '--noise',
  '--shiki-theme',
] as const;

type ThemeVariables = Record<(typeof THEME_VARIABLE_KEYS)[number], string>;

function readThemeVariables(element: Element): ThemeVariables {
  const computed = getComputedStyle(element);
  const result = {} as ThemeVariables;

  for (const key of THEME_VARIABLE_KEYS) {
    result[key] = computed.getPropertyValue(key).trim();
  }

  return result;
}

/* eslint @typescript-eslint/no-explicit-any: "off" */
function withThemeVariables(): <TBase extends Constructor<ElementCapableWebComponent>>(Base: TBase) => any {
  return function <TBase extends Constructor<ElementCapableWebComponent>>(Base: TBase): any {
    return class extends Base {
      themeVariables: ThemeVariables | undefined = undefined;

      connectedCallback(): void {
        this.themeVariables = readThemeVariables(this);
        super.connectedCallback?.();
      }
    };
  };
}

export { THEME_VARIABLE_KEYS, ThemeVariables, withThemeVariables };
