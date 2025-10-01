import { i18n } from 'i18next';

import { ServiceResolverCapableWebComponent } from './ServiceResolverCapableWebComponent.js';
import { LanguageService } from '../../Service/index.js';

interface TranslationCapableWebComponent extends ServiceResolverCapableWebComponent {
  i18n: i18n;
  languageService?: LanguageService;
}

export { TranslationCapableWebComponent };
