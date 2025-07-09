import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { TriangleAlert } from 'lucide-static';
import { SnapshotFrom } from 'xstate';

import { withGetElementMachine } from '../../Decorator/withGetElementMachine.js';
import { getElementMachine, getElementMachineTags } from '../../Machine/index.js';
import { indexStyles } from '../../Style/index.js';

@customElement('ember-nexus-default-thumbnail')
@withGetElementMachine()
class EmberNexusDefaultThumbnail extends LitElement {
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
        const errorDescription = (this.state.context?.error as Error)?.message ?? String(this.state.context?.error);
        return html`
          <div class="card bg-base-100 border-warning border-2 border-solid thumbnail shadow-sm">
            <figure class="absolute h-full w-full opacity-25">
              <span class="absolute -bottom-2 -right-4 text-warning text-[96px]">${unsafeHTML(TriangleAlert)}</span>
            </figure>
            <div class="relative card-body items-center justify-center h-full p-3 pb-5">
              <h2 class="card-title flex-none">Error</h2>
              <p class="flex-none text-center font-mono text-xs">${errorDescription}</p>
            </div>
          </div>
        `;
      case getElementMachineTags.Loading:
        return html`
          <div class="card thumbnail bg-base-100 shadow-sm">
            <div class="card-body items-center justify-center h-full p-3 pb-5">
              <h2 class="card-title flex-none">Loading</h2>
            </div>
          </div>
        `;
      case getElementMachineTags.Loaded:
        return html`
          <div class="card thumbnail bg-base-100 shadow-sm">
            <div class="card-body items-center justify-center h-full p-3 pb-5">
              <h2 class="card-title flex-none text-center">
                ${this.state.context?.element?.data?.name ?? 'unknown name'}
              </h2>
              <p class="font-mono text-xs flex-none">
                ${(this.state.context?.element?.id ?? this.elementId).slice(0, 8)}
              </p>
            </div>
          </div>
        `;
    }
    return html``;
  }
}

export { EmberNexusDefaultThumbnail };
