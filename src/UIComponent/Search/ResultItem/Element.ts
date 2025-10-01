import { i18n } from 'i18next';
import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ArrowLeft, ArrowRight } from 'lucide-static';
import { SnapshotFrom } from 'xstate';

import { withStateMachine, withTranslation } from '../../../Decorator/index.js';
import { settingPageMachine } from '../../../Machine/Page/index.js';
import { LanguageService } from '../../../Service/index.js';
import { indexStyles } from '../../../Style/index.js';

@customElement('ember-nexus-ui-search-result-item-element')
@withTranslation()
@withStateMachine(settingPageMachine)
class Element extends LitElement {
  static styles = [unsafeCSS(indexStyles)];

  i18n: i18n;
  languageService: LanguageService;
  state: SnapshotFrom<typeof settingPageMachine>;

  @query('button') buttonEl!: HTMLButtonElement;

  @state()
  private isKeyDown: boolean = false;

  onKeyUp(event: KeyboardEvent): void {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }
    this.isKeyDown = false;
    this.buttonEl.click();
    event.preventDefault();
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }
    this.isKeyDown = true;
    event.preventDefault();
  }

  onBlur(event: FocusEvent): void {
    this.isKeyDown = false;
    event.preventDefault();
  }

  render(): TemplateResult {
    const t = this.i18n?.t;
    let actionIcon = ArrowRight;
    if (this.languageService?.isRtl()) {
      actionIcon = ArrowLeft;
    }
    return html`
      <button
        @keyup=${this.onKeyUp}
        @keydown=${this.onKeyDown}
        @blur=${this.onBlur}
        ?data-keydown=${this.isKeyDown}
        class="
        w-full flex flex-nowrap content-stretch justify-between gap-3 rounded-box cursor-pointer
        hover:outline-2 hover:outline-offset-2 hover:outline-base-content
        focus:outline-2 focus:outline-offset-2 focus:outline-base-content
        active:outline-2 active:outline-offset-2 active:outline-base-content active:bg-base-content active:text-base-100
        data-keydown:outline-2 data-keydown:outline-offset-2 data-keydown:outline-base-content data-keydown:bg-base-content data-keydown:text-base-100
"
      >
        <div class="w-10 shrink-0 flex justify-center items-center">
          <slot name="thumbnail"></slot>
        </div>
        <div class="justify-self-start grow shrink basis-0 min-w-0 py-1 flex text-start">
          <slot class="w-full h-auto"></slot>
        </div>
        <div class="shrink-0 flex justify-center items-center">
          <ember-nexus-ui-icon
            class="shrink-0"
            title="${t?.('ui.search.resultItem.element.actionHelp') ?? 'open this element'}"
          >
            ${unsafeHTML(actionIcon)}
          </ember-nexus-ui-icon>
        </div>
      </button>
    `;
  }
}

export { Element };
