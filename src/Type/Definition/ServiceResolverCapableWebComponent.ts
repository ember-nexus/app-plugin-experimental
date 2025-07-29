/* eslint @typescript-eslint/no-explicit-any: "off" */
import { ServiceResolver } from '@ember-nexus/app-core/Service';

import { LifecycleCapableWebComponent } from './LifecycleCapableWebComponent.js';

interface ServiceResolverCapableWebComponent extends LifecycleCapableWebComponent {
  state: {
    context: {
      serviceResolver: ServiceResolver | null;
    };
  };

  onServiceResolverLoaded?(serviceResolver: ServiceResolver): void;
}

export { ServiceResolverCapableWebComponent };
