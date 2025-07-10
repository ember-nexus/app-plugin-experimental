import { ServiceResolver } from '@ember-nexus/app-core/Service';

import { ShikiJsonHighlighterService } from './Service/index.js';

function init(serviceResolver: ServiceResolver): void {
  const services = [ShikiJsonHighlighterService];
  for (let i = 0; i < services.length; i++) {
    serviceResolver.setService(services[i].identifier, services[i].constructFromServiceResolver(serviceResolver));
  }
}

export { init };
