import {ShikiJsonHighlighterService} from './Service/index.js';
import {ServiceResolver} from "@ember-nexus/app-core/Service";

function init(serviceResolver: ServiceResolver): void {
  const services = [
    ShikiJsonHighlighterService,
  ];
  for (let i = 0; i < services.length; i++) {
    serviceResolver.setService(services[i].identifier, services[i].constructFromServiceResolver(serviceResolver));
  }
}

export {init};
