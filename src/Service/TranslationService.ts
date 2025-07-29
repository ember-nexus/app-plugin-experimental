import { EventDispatcher, ServiceResolver } from '@ember-nexus/app-core/Service';
import { EventInterface } from '@ember-nexus/app-core/Type/Definition';
import i18next, { i18n } from 'i18next';

import { LanguageService } from './LanguageService.js';
import ar from '../Asset/Translation/ar.json';
import de from '../Asset/Translation/de.json';
import en from '../Asset/Translation/en.json';
import es from '../Asset/Translation/es.json';
import fr from '../Asset/Translation/fr.json';
import hi from '../Asset/Translation/hi.json';
import it from '../Asset/Translation/it.json';
import ja from '../Asset/Translation/ja.json';
import ko from '../Asset/Translation/ko.json';
import no from '../Asset/Translation/no.json';
import ru from '../Asset/Translation/ru.json';
import sw from '../Asset/Translation/sw.json';
import zhCN from '../Asset/Translation/zh-CN.json';
import { LanguageChangeEvent } from '../Event/index.js';
import { ServiceIdentifier } from '../Type/Enum/index.js';

class TranslationService {
  static identifier: ServiceIdentifier = ServiceIdentifier.translationService;

  private i18nInstance: i18n;

  constructor(
    languageService: LanguageService,
    private eventDispatcher: EventDispatcher,
  ) {
    this.i18nInstance = i18next.createInstance(
      {
        lng: languageService.getActiveLanguage(),
        debug: true,
        fallbackLng: 'en',
        resources: {
          en: { translation: en },
          de: { translation: de },
          no: { translation: no },
          ko: { translation: ko },

          ar: { translation: ar },
          es: { translation: es },
          fr: { translation: fr },
          hi: { translation: hi },
          it: { translation: it },
          ja: { translation: ja },
          ru: { translation: ru },
          sw: { translation: sw },
          'zh-CN': { translation: zhCN },
        },
      },
      () => {
        this.eventDispatcher.addListener(LanguageChangeEvent.identifier, this);
      },
    );
  }

  static constructFromServiceResolver(serviceResolver: ServiceResolver): TranslationService {
    return new TranslationService(
      serviceResolver.getServiceOrFail<LanguageService>(LanguageService.identifier),
      serviceResolver.getServiceOrFail<EventDispatcher>(EventDispatcher.identifier),
    );
  }

  onEvent(event: EventInterface): void {
    if (event.getIdentifier() === LanguageChangeEvent.identifier) {
      this.i18nInstance.changeLanguage((event as LanguageChangeEvent).getLanguage());
    }
  }

  getI18nInstance(): i18n {
    return this.i18nInstance;
  }
}

export { TranslationService };
