import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ArrowRight, Tag, Funnel } from 'lucide-static';

import { indexStyles } from '../../Style/index.js';
import {unsafeHTML} from "lit/directives/unsafe-html.js";

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

            <ember-nexus-ui-search-result-item>
              <img slot="thumbnailIcon" class="object-cover w-full h-full" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Sacred_lotus_Nelumbo_nucifera.jpg/960px-Sacred_lotus_Nelumbo_nucifera.jpg" />
              <div slot="text">
                <p>Lotus</p>
                <p class="text-sm">sometimes colloquially called a water <strong>lily</strong></p>
              </div>
              <ember-nexus-icon slot="actionIcon" title="link to the element">${unsafeHTML(ArrowRight)}</ember-nexus-icon>
            </ember-nexus-ui-search-result-item>

          </div>

          <div class="divider m-0"></div>

          <p class="text-xs tracking-wide">General results:</p>

          <div class="flex flex-col gap-2">

            <ember-nexus-ui-search-result-item-alternative-query text="water lily">
              <span>water <strong>lily</strong></span>
            </ember-nexus-ui-search-result-item-alternative-query>

            <ember-nexus-ui-search-result-item-owned-by-filter text="IS_MEMBER_OF:Lilieae">
              <ember-nexus-icon slot="thumbnail" title="Tag">${unsafeHTML(Tag)}</ember-nexus-icon>
              <div class="w-full">
                <p class="w-full truncate">Lilieae</p>
                <p class="w-full truncate text-sm">flowering plants in the <strong>lily</strong> family (Liliaceae)</p>
              </div>
            </ember-nexus-ui-search-result-item-owned-by-filter>

            <ember-nexus-ui-search-result-item>
              <ember-nexus-icon slot="thumbnailIcon" title="Tag">${unsafeHTML(Tag)}</ember-nexus-icon>
              <div slot="text">
                <p>Lilieae</p>
                <p class="text-sm text-nowrap overflow-hidden text-ellipsis">flowering plants in the <strong>lily</strong> family (Liliaceae)</p>
              </div>
              <ember-nexus-icon slot="actionIcon">${unsafeHTML(Funnel)}</ember-nexus-icon>
            </ember-nexus-ui-search-result-item>

            <ember-nexus-ui-search-result-item>
              <img slot="thumbnailIcon" class="object-cover w-full h-full" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/ShoshanTzachor-2-wiki-Zachi-Evenor.jpg/500px-ShoshanTzachor-2-wiki-Zachi-Evenor.jpg" />
              <div slot="text">
                <p><strong>lily</strong></p>
                <p class="text-sm">The flame <strong>lily</strong> is red.</p>
              </div>
              <ember-nexus-icon slot="actionIcon">${unsafeHTML(ArrowRight)}</ember-nexus-icon>
            </ember-nexus-ui-search-result-item>

            <ember-nexus-ui-search-result-item>
              <img slot="thumbnailIcon" class="object-cover w-full h-full" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/ShoshanTzachor-2-wiki-Zachi-Evenor.jpg/500px-ShoshanTzachor-2-wiki-Zachi-Evenor.jpg" />
              <div slot="text">
                <p><strong>lily</strong></p>
                <p class="text-sm">The flame <strong>lily</strong> is red.</p>
              </div>
              <ember-nexus-icon slot="actionIcon">${unsafeHTML(ArrowRight)}</ember-nexus-icon>
            </ember-nexus-ui-search-result-item>

            <ember-nexus-ui-search-result-item>
              <img slot="thumbnailIcon" class="object-cover w-full h-full" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/ShoshanTzachor-2-wiki-Zachi-Evenor.jpg/500px-ShoshanTzachor-2-wiki-Zachi-Evenor.jpg" />
              <div slot="text">
                <p><strong>lily</strong></p>
                <p class="text-sm">The flame <strong>lily</strong> is red.</p>
              </div>
              <ember-nexus-icon slot="actionIcon">${unsafeHTML(ArrowRight)}</ember-nexus-icon>
            </ember-nexus-ui-search-result-item>

          </div>

        </div>
      </div>
    `;
  }
}

export { Result };
