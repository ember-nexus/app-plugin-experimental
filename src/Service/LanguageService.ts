import { EventDispatcher, ServiceResolver } from '@ember-nexus/app-core/Service';

import { LanguageChangeEvent } from '../Event/index.js';
import { ServiceIdentifier } from '../Type/Enum/index.js';

class LanguageService {
  static identifier: ServiceIdentifier = ServiceIdentifier.languageService;

  private activeLanguage: string;

  constructor(private eventDispatcher: EventDispatcher) {}

  static constructFromServiceResolver(serviceResolver: ServiceResolver): LanguageService {
    return new LanguageService(serviceResolver.getServiceOrFail<EventDispatcher>(EventDispatcher.identifier));
  }

  applyLanguage(language: string): this {
    this.activeLanguage = language;
    this.eventDispatcher.dispatchEvent(new LanguageChangeEvent(this.activeLanguage));
    return this;
  }

  getActiveLanguage(): string {
    return this.activeLanguage;
  }
}

export { LanguageService };
