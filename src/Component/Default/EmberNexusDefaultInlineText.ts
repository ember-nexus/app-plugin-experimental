import {LitElement, TemplateResult, html, unsafeCSS} from 'lit';
import { customElement, property } from 'lit/decorators.js';

import {appStyles} from '../../Style/index.js';
import {withGetElementMachine} from "../../Decorator/withGetElementMachine";
import {SnapshotFrom} from "xstate";
import {getElementMachine, getElementMachineTags} from "../../Machine";

@customElement('ember-nexus-default-inline-text')
@withGetElementMachine()
class EmberNexusDefaultInlineText extends LitElement {
  static styles = [unsafeCSS(appStyles)];

  state: SnapshotFrom<typeof getElementMachine>;

  get stateTag(): getElementMachineTags {
    return [...this.state.tags][0] as getElementMachineTags;
  }

  @property({ type: String, attribute: 'element-id' })
  elementId: string;

  renderInlinteTextContent(): TemplateResult {
    switch (this.stateTag) {
      case getElementMachineTags.Error:
        return html`${String(this.state.context?.error)}`;
      case getElementMachineTags.Loading:
        return html`Loading`;
      case getElementMachineTags.Loaded:
        return html`${this.state.context?.element?.data?.name ?? this.state.context?.element?.id ?? this.elementId} (${this.state.context?.element?.type ?? 'unknown type'})`;
    }
  }

  render(): TemplateResult {
    return html`<span>${this.renderInlinteTextContent()}</span>`;
  }
}

export { EmberNexusDefaultInlineText };
