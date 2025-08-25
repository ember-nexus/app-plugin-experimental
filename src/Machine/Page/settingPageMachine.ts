import { ServiceResolver } from '@ember-nexus/app-core/Service';
import { assign, fromPromise, setup } from 'xstate';

import { resolveService } from '../../Decorator/index.js';
import { LanguageService } from '../../Service/index.js';
import { LifecycleCapableWebComponent } from '../../Type/Definition/index.js';

type HTMLElementWithOptionalOnServiceResolverLoaded = LifecycleCapableWebComponent & {
  onServiceResolverLoaded?(serviceResolver: ServiceResolver): void;
};

const enum settingPageMachineTags {
  Loading = 'LOADING',
  WaitingForSaveSettings = 'WAITING_FOR_SAVE_SETTINGS',
  SavingSettings = 'SAVING_SETTINGS',
  Error = 'ERROR',
}

const settingPageMachine = setup({
  actors: {
    getServiceResolver: fromPromise<
      ServiceResolver,
      {
        htmlElement: HTMLElementWithOptionalOnServiceResolverLoaded;
      }
    >(({ input }) => {
      return resolveService(input.htmlElement);
    }),
    saveSettings: fromPromise<
      void,
      {
        serviceResolver: ServiceResolver;
        language: string;
      }
    >(({ input }) => {
      const languageService = input.serviceResolver?.getServiceOrFail<LanguageService>(LanguageService.identifier);
      languageService.applyLanguage(input.language);
      return Promise.resolve();
    }),
  },
  types: {
    context: {} as {
      htmlElement: HTMLElementWithOptionalOnServiceResolverLoaded;
      error: null | unknown;
      serviceResolver: null | ServiceResolver;
    },
    input: {} as {
      htmlElement: HTMLElementWithOptionalOnServiceResolverLoaded;
    },
    events: {} as { type: 'saveSettings' },
  },
}).createMachine({
  id: 'setting-page-machine',
  context: ({ input }) => ({
    htmlElement: input.htmlElement,
    error: null,
    serviceResolver: null,
  }),
  initial: 'Initial',
  states: {
    Initial: {
      tags: [settingPageMachineTags.Loading],
      always: [
        {
          target: 'GetServiceResolver',
        },
      ],
    },
    GetServiceResolver: {
      tags: [settingPageMachineTags.Loading],
      invoke: {
        src: 'getServiceResolver',
        input: ({ context }) => ({
          htmlElement: context.htmlElement,
        }),
        onDone: {
          target: 'WaitingForSaveSettings',
          actions: [
            assign({
              serviceResolver: ({ event }) => event.output,
            }),
            ({ context }): void => {
              context.htmlElement.onServiceResolverLoaded?.(context.serviceResolver!);
            },
          ],
        },
        onError: {
          target: 'UnrecoverableError',
          actions: assign({
            error: ({ event }) => event.error,
          }),
        },
      },
    },
    WaitingForSaveSettings: {
      tags: [settingPageMachineTags.WaitingForSaveSettings],
      on: {
        saveSettings: {
          target: 'SaveSettings',
        },
      },
    },
    SaveSettings: {
      tags: [settingPageMachineTags.SavingSettings],
      entry: assign({
        error: null,
      }),
      invoke: {
        src: 'saveSettings',
        // @ts-expect-error error description
        input: ({ context }) => ({
          serviceResolver: context.serviceResolver,
          language: 'de',
        }),
        onDone: {
          target: 'WaitingForSaveSettings',
        },
        onError: {
          target: 'WaitingForSaveSettings',
          actions: assign({
            error: ({ event }) => event.error,
          }),
        },
      },
    },
    UnrecoverableError: {
      tags: [settingPageMachineTags.Error],
    },
  },
});

export { settingPageMachine, settingPageMachineTags };
