import { ServiceIdentifier } from '../Type/Enum/index.js';
import {Registry} from "@ember-nexus/app-core/Type/Definition";
import {Theme} from "../Type/Definition";

class ThemeService {
  static identifier: ServiceIdentifier = ServiceIdentifier.themeService;

  public themes: Registry<Theme>;
  private activeTheme: Theme;
  private styleSheet: CSSStyleSheet;

  constructor() {
    this.themes = new Registry();
    this.styleSheet = new CSSStyleSheet();
  }

  static constructFromServiceResolver(): ThemeService {
    return new ThemeService();
  }

  applyTheme(themeIdentifier: string): this
  {
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
    return this;
  }

  getStyleSheet(): CSSStyleSheet
  {
    return this.styleSheet;
  }

  getActiveTheme(): Theme
  {
    return this.activeTheme;
  }
}

export { ThemeService };
