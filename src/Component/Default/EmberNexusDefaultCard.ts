import {html, LitElement, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';

import {tmpStyle} from '../../Style';
import {ServiceResolver} from "@ember-nexus/app-core/Service";
import {withStateMachine, withDescription} from "../../Decorator";
import {toggleMachine} from "../../Machine";





@customElement('ember-nexus-default-card')
@withDescription('decorator injected description :D')
@withStateMachine(toggleMachine)
class EmberNexusDefaultCard extends LitElement {
  static styles = [tmpStyle];

  description!: string;

  state: any;
  send: (event: { type: string }) => void;

  serviceResolver!: ServiceResolver;

  @property({type: String, attribute: 'element-id'})
  elementId: string;

  constructor() {
    super();
  }

  render(): TemplateResult {
    return html`
      <div class="card">
        <div class="title">
          <p class="name font-sans">name</p>
        </div>
        <div class="info font-sans">
          <p><span class="font-mono">type</span></p>
          <p><span>created</span> <span>updated</span></p>
        </div>
        <div class="description font-sans">
          <p>${this.description}</p>
          <button @click=${() => this.send({ type: 'TOGGLE' })}>
            State: ${this.state?.value}
          </button>
        </div>
      </div>
    `;
  }
}

export {EmberNexusDefaultCard};
