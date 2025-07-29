import { Event } from '@ember-nexus/app-core/Type/Definition';

import { EventIdentifier } from '../Type/Enum/index.js';

class LanguageChangeEvent extends Event {
  static identifier: EventIdentifier = EventIdentifier.languageChangeEvent;

  constructor(private language: string) {
    super(LanguageChangeEvent.identifier);
  }

  getLanguage(): string {
    return this.language;
  }

  /**
   * this event can not be stopped
   */
  stopPropagation(): this {
    return this;
  }
}

export { LanguageChangeEvent };
