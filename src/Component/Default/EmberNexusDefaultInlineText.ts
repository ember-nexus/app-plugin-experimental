import { ApiWrapper, ServiceResolver } from '@ember-nexus/app-core/Service';
import { Node, Relation } from '@ember-nexus/app-core/Type/Definition';
import { LitElement, TemplateResult, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { withServiceResolver } from '../../Decorator/index.js';
import { getNameOrFirstLettersFromIdFromElementOrId, getTitleFromElementOrId } from '../../Helper/index.js';
import { inlineTextComponentStyle } from '../../Style/index.js';

@customElement('ember-nexus-default-inline-text')
@withServiceResolver()
class EmberNexusDefaultInlineText extends LitElement {
  static styles = [inlineTextComponentStyle];

  serviceResolver!: ServiceResolver;

  @property({ type: String, attribute: 'element-id' })
  elementId: string;

  @state()
  protected _element: null | Node | Relation = null;

  async refreshData(): Promise<void> {
    if (!this.serviceResolver) {
      return;
    }
    const apiWrapper = await this.serviceResolver.getServiceOrFail<ApiWrapper>(ApiWrapper.identifier);
    this._element = await apiWrapper.getElement(this.elementId);
    this.requestUpdate();
  }

  updated(changedProperties): void {
    if (changedProperties.has('elementId')) {
      this.refreshData();
    }
  }

  render(): TemplateResult {
    let content: string;
    if (this._element) {
      content = getTitleFromElementOrId(this.elementId, this._element);
    } else {
      content = getNameOrFirstLettersFromIdFromElementOrId(this.elementId, this._element);
    }
    return html`<span class="inline-text-component">
      <slot name="prefix"></slot>
      ${content}
      <slot name="suffix"></slot>
    </span>`;
  }
}

export { EmberNexusDefaultInlineText };
