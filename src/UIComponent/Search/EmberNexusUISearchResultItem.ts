import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';

import { indexStyles } from '../../Style/index.js';

@customElement('ember-nexus-ui-search-result-item')
class EmberNexusUISearchResultItem extends LitElement {
  static styles = [unsafeCSS(indexStyles)];

  render(): TemplateResult {
    return html`
      <button class="btn btn-ghost w-full justify-between px-0 text-start gap-3 h-auto font-normal">
        <div class="shrink-0 w-10 flex justify-center aspect-square items-center">
          <slot name="thumbnailIcon"></slot>
        </div>
        <div class="grow shrink py-1">
          <slot name="text"></slot>
        </div>
        <div class="shrink-0">
          <slot name="actionIcon"></slot>
        </div>
      </button>
    `;
  }
}

export { EmberNexusUISearchResultItem };
