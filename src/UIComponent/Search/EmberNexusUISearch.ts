import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, query } from 'lit/decorators.js';

import { indexStyles } from '../../Style/index.js';
import highlightStyles from './highlight.css?inline';

@customElement('ember-nexus-ui-search')
class EmberNexusUISearch extends LitElement {
  static styles = [unsafeCSS(indexStyles), unsafeCSS(highlightStyles)];

  @query('input') inputEl!: HTMLInputElement;
  @query('.ghost-input') ghostEl!: HTMLElement;

  firstUpdated() {
    // Sync input → ghost on typing
    this.inputEl.addEventListener('input', () => {
      this.ghostEl.textContent = this.inputEl.value;
    });

    // Sync scroll position
    this.inputEl.addEventListener('scroll', () => {
      this.ghostEl.scrollLeft = this.inputEl.scrollLeft;
    });
  }

  render(): TemplateResult {

    return html`
      <div class="card bg-base-100 w-full border-warning border-2 border-solid shadow-sm">
        <div class="relative card-body p-3">
          <h2 class="card-title">Search test</h2>
          <div class="ghost-input-wrapper">
            <p class="input ghost-input">
              <span class="single-flex-child">
                <span class="highlight-span"><span class="highlight-background bg-fuchsia-300"></span>!t</span> <span class="highlight-span"><span class="highlight-background bg-emerald-300"></span>type:Plant</span> <span class="highlight-span"><span class="highlight-background bg-lime-300"></span>type:Taxon</span> Jacaranda
              </span>
            </p>
            <input type="text" placeholder="search" class="input" value="!t type:Plant type:Taxon Jacaranda" />
          </div>
        </div>
      </div>
    `;
  }
}

export { EmberNexusUISearch };
