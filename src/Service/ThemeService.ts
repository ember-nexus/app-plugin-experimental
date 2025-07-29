import { EventDispatcher, ServiceResolver } from '@ember-nexus/app-core/Service';
import { Registry } from '@ember-nexus/app-core/Type/Definition';

import { ThemeChangeEvent } from '../Event/index.js';
import { Theme } from '../Type/Definition/index.js';
import { ServiceIdentifier } from '../Type/Enum/index.js';

class ThemeService {
  static identifier: ServiceIdentifier = ServiceIdentifier.themeService;

  public themes: Registry<Theme>;
  private activeTheme: Theme;
  private styleSheet: CSSStyleSheet;

  constructor(private eventDispatcher: EventDispatcher) {
    this.themes = new Registry();
    this.styleSheet = new CSSStyleSheet();
  }

  static constructFromServiceResolver(serviceResolver: ServiceResolver): ThemeService {
    return new ThemeService(serviceResolver.getServiceOrFail<EventDispatcher>(EventDispatcher.identifier));
  }

  applyTheme(themeIdentifier: string): this {
    const theme = this.themes.getEntry(themeIdentifier);
    if (theme === null) {
      return this;
    }
    this.activeTheme = theme;
    const cssVars = Object.entries(theme.cssVariables)
      .map(([key, value]) => `  --${key}: ${value};`)
      .join('\n');
    const css = `:root {\n${cssVars}\n}`;

    this.styleSheet.replaceSync(css);
    this.eventDispatcher.dispatchEvent(new ThemeChangeEvent(theme.name));
    return this;
  }

  getStyleSheet(): CSSStyleSheet {
    return this.styleSheet;
  }

  getActiveTheme(): Theme {
    return this.activeTheme;
  }
}

export { ThemeService };
