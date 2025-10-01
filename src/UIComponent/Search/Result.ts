import DOMPurify from 'dompurify';
import { i18n } from 'i18next';
import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Tag } from 'lucide-static';
import { SnapshotFrom } from 'xstate';

import { withStateMachine, withTranslation } from '../../Decorator/index.js';
import { settingPageMachine } from '../../Machine/Page/index.js';
import { indexStyles } from '../../Style/index.js';

@customElement('ember-nexus-ui-search-result')
@withTranslation()
@withStateMachine(settingPageMachine)
class Result extends LitElement {
  static styles = [unsafeCSS(indexStyles)];

  i18n: i18n;
  state: SnapshotFrom<typeof settingPageMachine>;

  sanitizeContentString(raw: string): string {
    return DOMPurify.sanitize(raw, { ALLOWED_TAGS: ['strong'] });
  }

  render(): TemplateResult {
    const t = this.i18n?.t;
    const searchResults = [
      {
        category: 'history',
        type: 'alternativeQuery',
        text: 'lily',
        content: '<strong>lily</strong>',
      },
      {
        category: 'history',
        type: 'alternativeQuery',
        text: 'flame lily',
        content: 'flame <strong>lily</strong>',
      },
      {
        category: 'history',
        type: 'element',
        thumbnailUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Saucer_Magnolia_--_Magnolia_%C3%97_soulangeana.jpg/960px-Saucer_Magnolia_--_Magnolia_%C3%97_soulangeana.jpg',
        name: 'Magnolia',
        description: 'Magnolia denudata, the <strong>lilytree</strong>[2] or Yulan magnolia',
      },
      {
        category: 'other',
        type: 'alternativeQuery',
        text: 'water lily',
        content: 'water <strong>lily</strong>',
      },
      {
        category: 'other',
        type: 'ownedByFilter',
        thumbnailIcon: 'Tag',
        text: 'IS_MEMBER_OF:Lilieae',
        name: 'Lilieae',
        description: 'flowering plants in the <strong>lily</strong> family (Liliaceae)',
      },
      {
        category: 'other',
        type: 'ownedByFilter',
        thumbnailIcon: 'Tag',
        text: 'IS_MEMBER_OF:Lilieae',
        name: 'Lilieae',
        description: 'flowering plants in the <strong>lily</strong> family',
      },
      {
        category: 'other',
        type: 'element',
        thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flame_lily.png/500px-Flame_lily.png',
        name: 'Flame Lily',
        description:
          'Common names include flame <strong>lily</strong>, climbing <strong>lily</strong>, creeping <strong>lily</strong>, glory <strong>lily</strong>',
      },
      {
        category: 'other',
        type: 'element',
        thumbnailUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/ShoshanTzachor-2-wiki-Zachi-Evenor.jpg/500px-ShoshanTzachor-2-wiki-Zachi-Evenor.jpg',
        name: 'Lily',
        description: 'Lilium candidum, the Madonna <strong>lily</strong>[2][3] or white <strong>lily</strong>',
      },
      {
        category: 'other',
        type: 'element',
        thumbnailUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Sacred_lotus_Nelumbo_nucifera.jpg/960px-Sacred_lotus_Nelumbo_nucifera.jpg',
        name: 'Lotus',
        description: 'It is sometimes colloquially called a water <strong>lily</strong>',
      },
    ];

    const historyResults: TemplateResult[] = [];
    const otherResults: TemplateResult[] = [];
    for (const searchResult of searchResults) {
      let element: TemplateResult | null = null;
      if (searchResult.type === 'alternativeQuery') {
        const variant = searchResult.category === 'history' ? 'history' : false;
        element = html`
          <ember-nexus-ui-search-result-item-alternative-query variant="${variant}" text="${searchResult?.text}">
            <p class="w-full truncate">${unsafeHTML(this.sanitizeContentString(searchResult?.content ?? ''))}</p>
          </ember-nexus-ui-search-result-item-alternative-query>
        `;
      }
      if (searchResult.type === 'element') {
        element = html`
          <ember-nexus-ui-search-result-item-element>
            <ember-nexus-ui-icon-image
              class="w-10 h-full max-h-12 rounded-box overflow-hidden"
              slot="thumbnail"
              src="${searchResult.thumbnailUrl}"
            ></ember-nexus-ui-icon-image>
            <div class="w-full">
              <p class="w-full truncate">${unsafeHTML(this.sanitizeContentString(searchResult?.name ?? ''))}</p>
              <p class="w-full truncate">${unsafeHTML(this.sanitizeContentString(searchResult?.description ?? ''))}</p>
            </div>
          </ember-nexus-ui-search-result-item-element>
          </div>
        `;
      }
      if (searchResult.type === 'ownedByFilter') {
        element = html`
          <ember-nexus-ui-search-result-item-owned-by-filter text="${searchResult?.text}">
            <ember-nexus-ui-icon slot="thumbnail" title="Tag">${unsafeHTML(Tag)}</ember-nexus-ui-icon>
            <div class="w-full">
              <p class="w-full truncate">${unsafeHTML(this.sanitizeContentString(searchResult?.name ?? ''))}</p>
              <p class="w-full truncate">${unsafeHTML(this.sanitizeContentString(searchResult?.description ?? ''))}</p>
            </div>
          </ember-nexus-ui-search-result-item-owned-by-filter>
        `;
      }

      if (element === null) {
        continue;
      }

      if (searchResult.category === 'history') {
        historyResults.push(element);
      } else {
        otherResults.push(element);
      }
    }

    return html`
      <div class="card bg-base-100 w-full shadow-sm">
        <div class="card-body p-3">
          <p class="text-xs tracking-wide">
            ${t?.('ui.search.result.group.history.title') ?? 'Based on your search history:'}
          </p>

          <div class="flex flex-col gap-2">${historyResults}</div>

          <div class="divider m-0"></div>

          <p class="text-xs tracking-wide">${t?.('ui.search.result.group.other.title') ?? 'Other results:'}</p>

          <div class="flex flex-col gap-2">${otherResults}</div>
        </div>
      </div>
    `;
  }
}

export { Result };
