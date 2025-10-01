import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';

import { indexStyles } from '../../Style/index.js';

@customElement('ember-nexus-icon')
class EmberNexusIcon extends LitElement {
  static styles = [unsafeCSS(indexStyles)];

  render(): TemplateResult {

    return html`
      <div class="inline-grid min-h-[36px] min-w-[36px] select-none place-items-center text-center align-middle text-sm font-medium leading-none disabled:pointer-events-none">
        <slot></slot>
      </div>
    `;
  }
}

export { EmberNexusIcon };
