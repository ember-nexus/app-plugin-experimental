import {html, LitElement, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';

import {tmpStyle} from '../../Style';
import {ServiceResolver} from "@ember-nexus/app-core/Service";
import { createActor, AnyStateMachine, createMachine } from 'xstate';

type Constructor<T = {}> = new (...args: any[]) => T;

export function withDescription(description: string) {
  return function <TBase extends Constructor>(Base: TBase) {
    return class extends Base {
      description = description;
    };
  };
}

interface LifecycleHost {
  connectedCallback?(): void;
  disconnectedCallback?(): void;
  requestUpdate?(...args: any[]): void;
}

export function withStateMachine(machine: AnyStateMachine) {
  return function <TBase extends Constructor<LifecycleHost>>(Base: TBase) {
    return class extends Base {
      actor = createActor(machine);
      state = this.actor.getSnapshot();
      send = this.actor.send;

      connectedCallback() {
        super.connectedCallback?.();

        this.actor.subscribe((snapshot) => {
          this.state = snapshot;
          this.requestUpdate?.();
        });

        this.actor.start();
      }

      disconnectedCallback() {
        super.disconnectedCallback?.();
        this.actor.stop();
      }
    };
  };
}

export const toggleMachine = createMachine({
  id: 'toggle',
  types: {} as {
    context: {};
    events: { type: 'TOGGLE' };
  },
  initial: 'off',
  states: {
    off: { on: { TOGGLE: 'on' } },
    on: { on: { TOGGLE: 'off' } },
  },
});


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
