import languageJson from '@shikijs/langs/json';
import themeAndromeeda from '@shikijs/themes/andromeeda';
import themeCatppuccinFrappe from '@shikijs/themes/catppuccin-frappe';
import themeCatppuccinLatte from '@shikijs/themes/catppuccin-latte';
import { HighlighterCore, ThemeRegistration } from 'shiki';
import { createHighlighterCore } from 'shiki/core';
import { createOnigurumaEngine } from 'shiki/engine/oniguruma';

import { ServiceIdentifier } from '../Type/Enum/index.js';

class ShikiJsonHighlighterService {
  static identifier: ServiceIdentifier = ServiceIdentifier.shikiJsonHighlighterService;
  static defaultTheme: string = 'catppuccin-latte';

  private highlighterPromise: HighlighterCore;

  constructor() {}

  static constructFromServiceResolver(): ShikiJsonHighlighterService {
    return new ShikiJsonHighlighterService();
  }

  makeAppThemeAware(theme: ThemeRegistration): ThemeRegistration {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        'editor.background': 'var(--color-code-background)',
      },
      tokenColors: theme.tokenColors?.filter((tokenColor) => !('background' in tokenColor.settings)) || [],
    };
  }

  async getShikiHighlighter(): Promise<HighlighterCore> {
    if (this.highlighterPromise) {
      return this.highlighterPromise;
    }
    const tmp = this.makeAppThemeAware(themeAndromeeda);
    this.highlighterPromise = await createHighlighterCore({
      themes: [this.makeAppThemeAware(themeCatppuccinLatte), this.makeAppThemeAware(themeCatppuccinFrappe), tmp],
      langs: [languageJson],
      engine: createOnigurumaEngine(import('shiki/wasm')),
    });
    return this.highlighterPromise;
  }
}

export { ShikiJsonHighlighterService };
