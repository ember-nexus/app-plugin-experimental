import { ServiceResolver } from '@ember-nexus/app-core/Service';
import { assign, fromPromise, setup } from 'xstate';

import { resolveService } from '../Decorator/index.js';

const enum getServiceResolverMachineTags {
  Loading = 'LOADING',
  Loaded = 'LOADED',
  Error = 'ERROR',
}

type HTMLElementWithOptionalOnServiceResolverLoaded = HTMLElement & {
  onServiceResolverLoaded?(serviceResolver: ServiceResolver): void;
};

const getServiceResolverMachine = setup({
  actors: {
    getServiceResolver: fromPromise<
      ServiceResolver,
      {
        htmlElement: HTMLElementWithOptionalOnServiceResolverLoaded;
      }
    >(({ input }) => {
      return resolveService(input.htmlElement);
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
  },
}).createMachine({
  id: 'get-service-resolver-machine',
  context: ({ input }) => ({
    htmlElement: input.htmlElement,
    error: null,
    serviceResolver: null,
  }),
  initial: 'Initial',
  states: {
    Initial: {
      tags: [getServiceResolverMachineTags.Loading],
      always: [
        {
          target: 'GetServiceResolver',
        },
      ],
    },
    GetServiceResolver: {
      tags: [getServiceResolverMachineTags.Loading],
      invoke: {
        src: 'getServiceResolver',
        input: ({ context }) => ({
          htmlElement: context.htmlElement,
        }),
        onDone: {
          target: 'Loaded',
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
    Loaded: {
      tags: [getServiceResolverMachineTags.Loaded],
    },
    UnrecoverableError: {
      tags: [getServiceResolverMachineTags.Error],
    },
  },
});

export { getServiceResolverMachine, getServiceResolverMachineTags };
