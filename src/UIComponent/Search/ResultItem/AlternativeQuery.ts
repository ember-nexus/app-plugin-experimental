import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import {customElement, property, query, state} from 'lit/decorators.js';

import { indexStyles } from '../../../Style/index.js';
import {unsafeHTML} from "lit/directives/unsafe-html.js";
import {Type, History, Ellipsis} from "lucide-static";

@customElement('ember-nexus-ui-search-result-item-alternative-query')
class AlternativeQuery extends LitElement {
  static styles = [unsafeCSS(indexStyles)];

  @query('button') buttonEl!: HTMLButtonElement;

  @property()
  text?: string;

  @property()
  variant?: string;

  @state()
  private isKeyDown: boolean = false;

  onKeyUp(event: KeyboardEvent): void {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }
    this.isKeyDown = false;
    this.buttonEl.click();
    event.preventDefault();
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key !== "Enter" && event.key !== " ") {
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
    let variantIcon = Ellipsis;
    if (this.variant === 'history') {
      variantIcon = History;
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
          <ember-nexus-icon>${unsafeHTML(variantIcon)}</ember-nexus-icon>
        </div>
        <div class="justify-self-start grow shrink py-1 flex items-center truncate">
          <slot class="w-full flex"></slot>
        </div>
        <div class="shrink-0 flex justify-center items-center">
          <ember-nexus-icon class="shrink-0">${unsafeHTML(Type)}</ember-nexus-icon>
        </div>
      </button>
    `;
  }
}

export { AlternativeQuery };
