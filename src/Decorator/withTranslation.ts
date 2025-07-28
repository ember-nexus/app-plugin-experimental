import { EventDispatcher, ServiceResolver } from '@ember-nexus/app-core/Service';
import { EventInterface } from '@ember-nexus/app-core/Type/Definition';

import { LanguageChangeEvent } from '../Event/index.js';
import { Constructor, TranslationCapableWebComponent } from '../Type/Definition/index.js';
import {TranslationService} from "../Service";

/* eslint @typescript-eslint/no-explicit-any: "off" */
function withTranslation(): <TBase extends Constructor<TranslationCapableWebComponent>>(
  Base: TBase,
) => any {
  return function <TBase extends Constructor<TranslationCapableWebComponent>>(Base: TBase): any {
    return class extends Base {
      private eventDispatcher: EventDispatcher;

      onServiceResolverLoaded(serviceResolver: ServiceResolver): void {
        this.eventDispatcher = serviceResolver.getServiceOrFail<EventDispatcher>(EventDispatcher.identifier);
        this.eventDispatcher.addListener(LanguageChangeEvent.identifier, this);
        this.i18n = serviceResolver.getServiceOrFail<TranslationService>(TranslationService.identifier).getI18nInstance();
        super.onServiceResolverLoaded?.(serviceResolver);
      }

      onEvent(event: EventInterface): void {
        if (event.getIdentifier() === LanguageChangeEvent.identifier) {
          this.requestUpdate?.();
          return;
        }
        // @ts-ignore
        super.onEvent?.();
      }

      disconnectedCallback(): void {
        super.disconnectedCallback?.();
        this.eventDispatcher?.removeListener(LanguageChangeEvent.identifier, this);
      }
    };
  };
}

export { withTranslation };
