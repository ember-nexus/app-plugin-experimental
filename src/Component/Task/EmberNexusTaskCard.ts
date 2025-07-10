import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Circle, CircleCheckBig, CircleQuestionMark, CircleSlash, TriangleAlert } from 'lucide-static';
import { SnapshotFrom } from 'xstate';

import { withGetElementMachine } from '../../Decorator/withGetElementMachine.js';
import { getElementMachine, getElementMachineTags } from '../../Machine/index.js';
import { indexStyles } from '../../Style/index.js';

@customElement('ember-nexus-task-card')
@withGetElementMachine()
class EmberNexusTaskCard extends LitElement {
  static styles = [unsafeCSS(indexStyles)];

  state: SnapshotFrom<typeof getElementMachine>;

  get stateTag(): getElementMachineTags {
    return [...this.state.tags][0] as getElementMachineTags;
  }

  @property({ type: String, attribute: 'element-id' })
  elementId: string;

  render(): TemplateResult {
    switch (this.stateTag) {
      case getElementMachineTags.Error:
        const errorName = this.state.context?.error?.constructor?.name ?? 'Error';
        const errorDescription = (this.state.context?.error as Error)?.message ?? String(this.state.context?.error);
        return html`
          <div class="card bg-base-100 w-96 border-warning border-2 border-solid shadow-sm">
            <figure class="absolute h-full w-full opacity-25">
              <span class="absolute -bottom-2 -right-4 text-warning text-[96px]">${unsafeHTML(TriangleAlert)}</span>
            </figure>
            <div class="relative card-body p-3">
              <h2 class="card-title">${errorName}</h2>
              <p class="font-mono text-xs">${this.state.context?.element?.id ?? this.elementId}</p>
              <p class="font-mono text-xs">${errorDescription}</p>
            </div>
          </div>
        `;
      case getElementMachineTags.Loading:
        return html`
          <div class="card bg-base-100 w-96 shadow-sm">
            <div class="card-body p-3">
              <h2 class="card-title">Loading</h2>
              <p class="font-mono text-xs">${this.state.context?.element?.id ?? this.elementId}</p>
            </div>
          </div>
        `;
      case getElementMachineTags.Loaded:
        let icon: string;
        switch (this.state.context?.element?.data?.status) {
          case 'todo':
            icon = Circle;
            break;
          case 'blocked':
            icon = CircleSlash;
            break;
          case 'done':
            icon = CircleCheckBig;
            break;
          default:
            icon = CircleQuestionMark;
        }
        return html`
          <div class="card bg-base-100 w-96 shadow-sm">
            <div class="card-body p-3">
              <h2 class="card-title">
                <span>${unsafeHTML(icon)}</span>
                ${this.state.context?.element?.data?.title ?? 'unknown title'}
              </h2>
            </div>
          </div>
        `;
    }
  }
}

export { EmberNexusTaskCard };
