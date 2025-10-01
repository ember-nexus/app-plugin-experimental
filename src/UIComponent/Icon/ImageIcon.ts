import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { indexStyles } from '../../Style/index.js';

@customElement('ember-nexus-ui-icon-image')
class ImageIcon extends LitElement {
  static styles = [unsafeCSS(indexStyles)];

  @property()
  src?: string;

  render(): TemplateResult {
    return html`
      <div
        class="inline-grid w-full min-w-[36px] h-full min-h-[36px] select-none place-items-center text-center align-middle text-sm font-medium leading-none disabled:pointer-events-none"
      >
        <img class="w-full h-full object-cover" src="${this.src}" alt="icon" />
      </div>
    `;
  }
}

export { ImageIcon };
