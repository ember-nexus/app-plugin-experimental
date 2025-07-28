import { ServiceResolverCapableWebComponent } from './ServiceResolverCapableWebComponent.js';
import {i18n} from "i18next";

interface TranslationCapableWebComponent extends ServiceResolverCapableWebComponent {
  i18n: i18n;
}

export { TranslationCapableWebComponent };
