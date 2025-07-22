import { EventDispatcher, ServiceResolver } from '@ember-nexus/app-core/Service';
import { EventInterface } from '@ember-nexus/app-core/Type/Definition';

import { ThemeChangeEvent } from '../Event/index.js';
import { Constructor, ServiceResolverCapableWebComponent } from '../Type/Definition/index.js';

/* eslint @typescript-eslint/no-explicit-any: "off" */
function withUpdateOnThemeChange(): <TBase extends Constructor<ServiceResolverCapableWebComponent>>(
  Base: TBase,
) => any {
  return function <TBase extends Constructor<ServiceResolverCapableWebComponent>>(Base: TBase): any {
    return class extends Base {
      private eventDispatcher: EventDispatcher;

      onServiceResolverLoaded(serviceResolver: ServiceResolver): void {
        this.eventDispatcher = serviceResolver.getServiceOrFail<EventDispatcher>(EventDispatcher.identifier);
        this.eventDispatcher.addListener(ThemeChangeEvent.identifier, this);
        super.onServiceResolverLoaded?.(serviceResolver);
      }

      onEvent(event: EventInterface): void {
        if (event.getIdentifier() === ThemeChangeEvent.identifier) {
          this.requestUpdate?.();
          return;
        }
        // @ts-ignore
        super.onEvent?.();
      }

      disconnectedCallback(): void {
        super.disconnectedCallback?.();
        this.eventDispatcher?.removeListener(ThemeChangeEvent.identifier, this);
      }
    };
  };
}

export { withUpdateOnThemeChange };
