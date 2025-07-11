import { ActorRefFrom, SnapshotFrom, createActor } from 'xstate';

import { getServiceResolverMachine } from '../Machine/index.js';
import { Constructor, LifecycleCapableWebComponent } from '../Type/Definition/index.js';

/* eslint @typescript-eslint/no-explicit-any: "off" */
function withGetServiceResolverMachine(): <TBase extends Constructor<LifecycleCapableWebComponent>>(Base: TBase) => any {
  return function <TBase extends Constructor<LifecycleCapableWebComponent>>(Base: TBase): any {
    return class extends Base {
      actor: ActorRefFrom<typeof getServiceResolverMachine>;
      state: SnapshotFrom<typeof getServiceResolverMachine>;

      connectedCallback(): void {
        super.connectedCallback?.();

        this.actor = createActor(getServiceResolverMachine, {
          input: {
            htmlElement: this,
          },
        });
        this.state = this.actor.getSnapshot();

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

export { withGetServiceResolverMachine };
