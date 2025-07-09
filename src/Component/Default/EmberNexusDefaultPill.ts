import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { SnapshotFrom } from 'xstate';

import { withGetElementMachine } from '../../Decorator/withGetElementMachine.js';
import { getElementMachine, getElementMachineTags } from '../../Machine/index.js';
import { indexStyles } from '../../Style/index.js';

@customElement('ember-nexus-default-pill')
@withGetElementMachine()
class EmberNexusDefaultPill extends LitElement {
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
        return html`
          <div
            class="badge badge-warning font-sans font-semibold rounded-full shadow-sm"
            title="${String(this.state.context?.error)}"
          >
            Error
          </div>
        `;
      case getElementMachineTags.Loading:
        return html` <div class="badge badge-primary font-sans font-semibold rounded-full shadow-sm">Loading</div> `;
      case getElementMachineTags.Loaded:
        let name = this.state.context?.element?.data?.name;
        if (!name) {
          const namePart = (this.state.context?.element?.id ?? this.elementId).slice(0, 8);
          name = html`<span class="font-mono text-xs">${namePart}</span> (${this.state.context?.element?.type})`;
        }
        return html` <div class="badge badge-primary font-sans font-semibold rounded-full shadow-sm">${name}</div> `;
    }
  }
}

export { EmberNexusDefaultPill };
