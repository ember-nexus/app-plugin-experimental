import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { SnapshotFrom } from 'xstate';

import { withGetElementMachine } from '../../Decorator/withGetElementMachine.js';
import { getElementMachine, getElementMachineTags } from '../../Machine/index.js';
import { appStyles } from '../../Style/index.js';

@customElement('ember-nexus-default-card')
@withGetElementMachine()
class EmberNexusDefaultCard extends LitElement {
  static styles = [unsafeCSS(appStyles)];

  state: SnapshotFrom<typeof getElementMachine>;

  get stateTag(): getElementMachineTags {
    return [...this.state.tags][0] as getElementMachineTags;
  }

  @property({ type: String, attribute: 'element-id' })
  elementId: string;

  renderCardContent(): TemplateResult {
    switch (this.stateTag) {
      case getElementMachineTags.Error:
        return html`
          <h2 class="card-title">Error: ${this.state.context?.element?.data?.name ?? 'unknown name'}</h2>
          <p class="font-mono text-xs">${this.state.context?.element?.id ?? this.elementId}</p>
          <p class="font-mono text-xs">${String(this.state.context?.error)}</p>
        `;
      case getElementMachineTags.Loading:
        return html`
          <h2 class="card-title">Loading</h2>
          <p class="font-mono text-xs">${this.state.context?.element?.id ?? this.elementId}</p>
        `;
      case getElementMachineTags.Loaded:
        return html`
          <h2 class="card-title">
            ${this.state.context?.element?.data?.name ?? 'unknown name'}
            <div class="badge badge-sm badge-neutral">${this.state.context?.element?.type ?? 'unknown type'}</div>
          </h2>
          <p class="font-mono text-xs">${this.state.context?.element?.id ?? this.elementId}</p>
        `;
    }
  }

  render(): TemplateResult {
    return html`
      <div class="card bg-base-100 w-96 shadow-sm">
        <div class="card-body p-3">${this.renderCardContent()}</div>
      </div>
    `;
  }
}

export { EmberNexusDefaultCard };
