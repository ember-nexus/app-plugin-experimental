import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { TriangleAlert } from 'lucide-static';
import { SnapshotFrom } from 'xstate';

import { withGetElementMachine } from '../../Decorator/withGetElementMachine.js';
import { getElementMachine, getElementMachineTags } from '../../Machine/index.js';
import { indexStyles } from '../../Style/index.js';

@customElement('ember-nexus-task-icon')
@withGetElementMachine()
class EmberNexusTaskIcon extends LitElement {
  static styles = [unsafeCSS(indexStyles)];

  state: SnapshotFrom<typeof getElementMachine>;

  get stateTag(): getElementMachineTags {
    return [...this.state.tags][0] as getElementMachineTags;
  }

  @property({ type: String, attribute: 'element-id' })
  elementId: string;

  renderIconContent(): TemplateResult {
    switch (this.stateTag) {
      case getElementMachineTags.Error:
        return html`
          <div
            class="bg-warning text-warning-content text-sm font-semibold w-6 rounded-full shadow-sm"
            title="${String(this.state.context?.error)}"
          >
            <span>${unsafeHTML(TriangleAlert)}</span>
          </div>
        `;
      case getElementMachineTags.Loading:
        return html`
          <div class="bg-primary text-primary-content text-sm font-semibold w-6 rounded-full shadow-sm">
            <span class="loading loading-spinner loading-xs"></span>
          </div>
        `;
      case getElementMachineTags.Loaded:
        let identifier = this.state.context?.element?.data?.name;
        if (identifier) {
          identifier = String(identifier).toUpperCase().slice(0, 2);
        } else {
          identifier = this.state.context?.element?.id ?? this.elementId;
          identifier = String(identifier).toUpperCase().slice(0, 2);
          identifier = html`<span class="font-mono">${identifier}</span>`;
        }
        return html`
          <div class="bg-primary text-primary-content text-sm font-semibold w-6 rounded-full shadow-sm">
            <span>${identifier}</span>
          </div>
        `;
    }
  }

  render(): TemplateResult {
    return html` <div class="avatar avatar-placeholder select-none">${this.renderIconContent()}</div> `;
  }
}

export { EmberNexusTaskIcon };
