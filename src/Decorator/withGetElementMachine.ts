import { Uuid } from '@ember-nexus/app-core/Type/Definition';
import { PropertyValues } from '@lit/reactive-element';
import { ActorRefFrom, SnapshotFrom, createActor } from 'xstate';

import { getElementMachine } from '../Machine/index.js';
import { Constructor, ElementCapableWebComponent } from '../Type/Definition/index.js';

/* eslint @typescript-eslint/no-explicit-any: "off" */
function withGetElementMachine(): <TBase extends Constructor<ElementCapableWebComponent>>(Base: TBase) => any {
  return function <TBase extends Constructor<ElementCapableWebComponent>>(Base: TBase): any {
    return class extends Base {
      actor: ActorRefFrom<typeof getElementMachine>;
      state: SnapshotFrom<typeof getElementMachine>;
      send: ActorRefFrom<typeof getElementMachine>['send'];

      connectedCallback(): void {
        super.connectedCallback?.();

        this.actor = createActor(getElementMachine, {
          input: {
            elementId: this.elementId,
            htmlElement: this,
          },
        });
        this.state = this.actor.getSnapshot();
        this.send = this.actor.send;

        this.actor.subscribe((snapshot) => {
          this.state = snapshot;
          this.requestUpdate?.();
        });

        this.actor.start();
      }

      disconnectedCallback(): void {
        super.disconnectedCallback?.();
        this.actor.stop();
      }

      updated(changedProperties: PropertyValues): void {
        // @ts-ignore
        super.updated?.();
        if (changedProperties.has('elementId')) {
          this.actor.send({
            type: 'reset',
            elementId: this.elementId as Uuid,
          });
        }
      }
    };
  };
}

export { withGetElementMachine };
