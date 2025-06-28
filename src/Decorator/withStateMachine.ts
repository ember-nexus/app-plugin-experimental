import {AnyStateMachine, createActor} from "xstate";
import {Constructor, LifecycleCapableWebComponent} from "../Type/Definition";

function withStateMachine(machine: AnyStateMachine) {
  return function <TBase extends Constructor<LifecycleCapableWebComponent>>(Base: TBase) {
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

export {withStateMachine};
