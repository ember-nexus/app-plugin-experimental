import { ServiceResolver } from '@ember-nexus/app-core/Service';

import {LanguageService, ShikiJsonHighlighterService, ThemeService, TranslationService} from './Service/index.js';
import { dark, dim, emerald, light } from './Theme/index.js';

function init(serviceResolver: ServiceResolver): void {
  const services = [ShikiJsonHighlighterService, ThemeService, LanguageService, TranslationService];
  for (let i = 0; i < services.length; i++) {
    serviceResolver.setService(services[i].identifier, services[i].constructFromServiceResolver(serviceResolver));
  }

  const themeService = serviceResolver.getServiceOrFail<ThemeService>(ThemeService.identifier);

  const themes = [light, dark, emerald, dim];
  for (let i = 0; i < themes.length; i++) {
    themeService.themes.setEntry(themes[i].name, themes[i]);
  }
  themeService.applyTheme(light.name);
  const styleSheet = themeService.getStyleSheet();

  document.adoptedStyleSheets = [...document.adoptedStyleSheets, styleSheet];
}

export { init };
