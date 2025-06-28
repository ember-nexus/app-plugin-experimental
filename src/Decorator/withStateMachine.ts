import { AnyStateMachine, createActor } from 'xstate';

import { Constructor, LifecycleCapableWebComponent } from '../Type/Definition/index.js';

/* eslint @typescript-eslint/no-explicit-any: "off" */
function withStateMachine(
  machine: AnyStateMachine,
): <TBase extends Constructor<LifecycleCapableWebComponent>>(Base: TBase) => any {
  return function <TBase extends Constructor<LifecycleCapableWebComponent>>(Base: TBase): any {
    return class extends Base {
      actor = createActor(machine);
      state = this.actor.getSnapshot();
      send = this.actor.send;

      connectedCallback(): void {
        super.connectedCallback?.();

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
    };
  };
}

export { withStateMachine };
