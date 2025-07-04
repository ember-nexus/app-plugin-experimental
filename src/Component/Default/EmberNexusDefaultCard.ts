import { ApiWrapper, ServiceResolver } from '@ember-nexus/app-core/Service';
import { Element } from '@ember-nexus/app-core/Type/Definition';
import {LitElement, TemplateResult, html, unsafeCSS} from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { withDescription, withServiceResolver, withStateMachine } from '../../Decorator/index.js';
import { toggleMachine } from '../../Machine/index.js';
import {appStyles} from "../../Style";

@customElement('ember-nexus-default-card')
@withDescription('decorator injected description :D')
@withStateMachine(toggleMachine)
@withServiceResolver()
class EmberNexusDefaultCard extends LitElement {
  static styles = [unsafeCSS(appStyles)];

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
      <div class="card bg-base-100 w-96 shadow-sm">
        <div class="card-body p-3">
          <h2 class="card-title">
            ${this.element?.data?.name ?? 'no name'}
            <div class="badge badge-sm badge-neutral">${this.element?.type ?? 'unknown type'}</div>
          </h2>
          <p class="font-mono text-xs">${this.element?.id ?? 'no id'}</p>
          <button
            class="btn ${this.state?.value === 'on' ? 'btn-success' : 'btn-error'}"
            @click=${(): void => this.send({ type: 'TOGGLE' })}
          >State: ${this.state?.value}</button>
        </div>
      </div>
    `;
  }
}

export { EmberNexusDefaultCard };
