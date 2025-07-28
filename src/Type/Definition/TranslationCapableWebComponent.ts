import { i18n } from 'i18next';

import { ServiceResolverCapableWebComponent } from './ServiceResolverCapableWebComponent.js';

interface TranslationCapableWebComponent extends ServiceResolverCapableWebComponent {
  i18n: i18n;
}

export { TranslationCapableWebComponent };
