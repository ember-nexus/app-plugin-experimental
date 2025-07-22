import { Event } from '@ember-nexus/app-core/Type/Definition';

import { EventIdentifier } from '../Type/Enum/index.js';

class ThemeChangeEvent extends Event {
  static identifier: EventIdentifier = EventIdentifier.themeChangeEvent;

  constructor(private theme: string) {
    super(ThemeChangeEvent.identifier);
  }

  getTheme(): string {
    return this.theme;
  }

  /**
   * this event can not be stopped
   */
  stopPropagation(): this {
    return this;
  }
}

export { ThemeChangeEvent };
