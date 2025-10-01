import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Tag } from 'lucide-static';

import { indexStyles } from '../../Style/index.js';

@customElement('ember-nexus-ui-search-result')
class Result extends LitElement {
  static styles = [unsafeCSS(indexStyles)];

  render(): TemplateResult {
    return html`
      <div class="card bg-base-100 w-full shadow-sm">
        <div class="card-body p-3">
          <p class="text-xs tracking-wide">From your search history:</p>

          <div class="flex flex-col gap-2">
            <ember-nexus-ui-search-result-item-alternative-query variant="history" text="lily">
              <span><strong>lily</strong></span>
            </ember-nexus-ui-search-result-item-alternative-query>

            <ember-nexus-ui-search-result-item-alternative-query variant="history" text="flame lily">
              <span>flame <strong>lily</strong></span>
            </ember-nexus-ui-search-result-item-alternative-query>

            <ember-nexus-ui-search-result-item-element>
              <ember-nexus-ui-icon-image
                class="w-10 h-full rounded-box overflow-hidden"
                slot="thumbnail"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Sacred_lotus_Nelumbo_nucifera.jpg/960px-Sacred_lotus_Nelumbo_nucifera.jpg"
              ></ember-nexus-ui-icon-image>
              <div>
                <p>Lotus</p>
                <p class="text-sm">sometimes colloquially called a water <strong>lily</strong></p>
              </div>
            </ember-nexus-ui-search-result-item-element>
          </div>

          <div class="divider m-0"></div>

          <p class="text-xs tracking-wide">General results:</p>

          <div class="flex flex-col gap-2">
            <ember-nexus-ui-search-result-item-alternative-query text="water lily">
              <span>water <strong>lily</strong></span>
            </ember-nexus-ui-search-result-item-alternative-query>

            <ember-nexus-ui-search-result-item-owned-by-filter text="IS_MEMBER_OF:Lilieae">
              <ember-nexus-ui-icon slot="thumbnail" title="Tag">${unsafeHTML(Tag)}</ember-nexus-ui-icon>
              <div class="w-full">
                <p class="w-full truncate">Lilieae</p>
                <p class="w-full truncate text-sm">flowering plants in the <strong>lily</strong> family (Liliaceae)</p>
              </div>
            </ember-nexus-ui-search-result-item-owned-by-filter>

            <ember-nexus-ui-search-result-item-owned-by-filter text="IS_MEMBER_OF:Lilieae">
              <ember-nexus-ui-icon slot="thumbnail" title="Tag">${unsafeHTML(Tag)}</ember-nexus-ui-icon>
              <div class="w-full">
                <p class="w-full truncate">Lilieae</p>
                <p class="w-full truncate text-sm">flowering plants in the <strong>lily</strong> family</p>
              </div>
            </ember-nexus-ui-search-result-item-owned-by-filter>

            <ember-nexus-ui-search-result-item-element>
              <ember-nexus-ui-icon-image
                class="w-10 h-full rounded-box overflow-hidden"
                slot="thumbnail"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Sacred_lotus_Nelumbo_nucifera.jpg/960px-Sacred_lotus_Nelumbo_nucifera.jpg"
              ></ember-nexus-ui-icon-image>
              <div>
                <p>Lotus</p>
                <p class="text-sm">some description</p>
              </div>
            </ember-nexus-ui-search-result-item-element>

            <ember-nexus-ui-search-result-item-element>
              <ember-nexus-ui-icon-image
                class="w-10 h-full rounded-box overflow-hidden"
                slot="thumbnail"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Sacred_lotus_Nelumbo_nucifera.jpg/960px-Sacred_lotus_Nelumbo_nucifera.jpg"
              ></ember-nexus-ui-icon-image>
              <div>
                <p>Lotus</p>
                <p class="text-sm">sometimes colloquially called a water <strong>lily</strong></p>
              </div>
            </ember-nexus-ui-search-result-item-element>

            <ember-nexus-ui-search-result-item-element>
              <ember-nexus-ui-icon-image
                class="w-10 h-full rounded-box overflow-hidden"
                slot="thumbnail"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Sacred_lotus_Nelumbo_nucifera.jpg/960px-Sacred_lotus_Nelumbo_nucifera.jpg"
              ></ember-nexus-ui-icon-image>
              <div>
                <p>Lotus</p>
                <p class="text-sm">sometimes colloquially called a water <strong>lily</strong></p>
              </div>
            </ember-nexus-ui-search-result-item-element>
          </div>
        </div>
      </div>
    `;
  }
}

export { Result };
