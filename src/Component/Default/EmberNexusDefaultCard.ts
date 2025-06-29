import { ApiWrapper, ServiceResolver } from '@ember-nexus/app-core/Service';
import { Element } from '@ember-nexus/app-core/Type/Definition';
import { LitElement, TemplateResult, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { withDescription, withServiceResolver, withStateMachine } from '../../Decorator/index.js';
import { toggleMachine } from '../../Machine/index.js';
import { tmpStyle } from '../../Style/index.js';

@customElement('ember-nexus-default-card')
@withDescription('decorator injected description :D')
@withStateMachine(toggleMachine)
@withServiceResolver()
class EmberNexusDefaultCard extends LitElement {
  static styles = [tmpStyle];

  state: any;
  send: (event: { type: string }) => void;

  serviceResolver!: ServiceResolver;

  @property({ type: String, attribute: 'element-id' })
  elementId: string;

  element?: Element;

  constructor() {
    super();
  }

  async refreshData(): Promise<void> {
    const apiWrapper = await this.serviceResolver.getServiceOrFail<ApiWrapper>(ApiWrapper.identifier);
    this.element = await apiWrapper.getElement(this.elementId);
    this.requestUpdate();
  }

  render(): TemplateResult {
    console.log(this.element);
    let created = this.element?.data?.created;
    created = created ? (created as Date).toISOString() : 'no created date';
    return html`
      <div class="card">
        <div class="title">
          <p class="name font-sans">${this.element?.data?.name ?? 'no name'}</p>
        </div>
        <div class="info font-sans">
          <p><span class="font-mono">${this.element?.type ?? 'element not loaded'}</span></p>
          <p><span>${created}</span></p>
        </div>
        <div class="description font-sans">
          <button @click=${(): void => this.send({ type: 'TOGGLE' })}>State: ${this.state?.value}</button>
        </div>
      </div>
    `;
  }
}

export { EmberNexusDefaultCard };
