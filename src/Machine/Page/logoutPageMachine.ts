import {ApiConfiguration, ServiceResolver} from '@ember-nexus/app-core/Service';
import {assign, fromPromise, setup} from 'xstate';

import {resolveService} from '../../Decorator/index.js';
import {LifecycleCapableWebComponent} from '../../Type/Definition/index.js';

type HTMLElementWithOptionalOnServiceResolverLoaded = LifecycleCapableWebComponent & {
  onServiceResolverLoaded?(serviceResolver: ServiceResolver): void;
};

const enum logoutPageMachineTags {
  Loading = 'LOADING',
  WaitingForLogoutConfirmation = 'WAITING_FOR_LOGOUT_CONFIRMATION',
  LoggingOut = 'LOGGING_OUT',
  Error = 'ERROR',
  LogoutSuccessful = 'LOGOUT_SUCCESSFUL',
}

const logoutPageMachine = setup({
  actors: {
    getServiceResolver: fromPromise<
      ServiceResolver,
      {
        htmlElement: HTMLElementWithOptionalOnServiceResolverLoaded;
      }
    >(({input}) => {
      return resolveService(input.htmlElement);
    }),
    logOut: fromPromise<
      void,
      {
        serviceResolver: ServiceResolver
      }
    >(({input}) => {
      const apiConfiguration = input.serviceResolver?.getServiceOrFail<ApiConfiguration>(ApiConfiguration.identifier);
      apiConfiguration?.setToken(null);
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
    events: {} as
      | { type: 'confirmLogout' }
  },
}).createMachine({
  id: 'logout-page-machine',
  context: ({input}) => ({
    htmlElement: input.htmlElement,
    error: null,
    serviceResolver: null,
  }),
  initial: 'Initial',
  states: {
    Initial: {
      tags: [logoutPageMachineTags.Loading],
      always: [
        {
          target: 'GetServiceResolver',
        },
      ],
    },
    GetServiceResolver: {
      tags: [logoutPageMachineTags.Loading],
      invoke: {
        src: 'getServiceResolver',
        input: ({context}) => ({
          htmlElement: context.htmlElement,
        }),
        onDone: {
          target: 'WaitingForLogoutConfirmation',
          actions: [
            assign({
              serviceResolver: ({event}) => event.output,
            }),
            ({context}): void => {
              context.htmlElement.onServiceResolverLoaded?.(context.serviceResolver!);
            },
          ],
        },
        onError: {
          target: 'UnrecoverableError',
          actions: assign({
            error: ({event}) => event.error,
          }),
        },
      },
    },
    WaitingForLogoutConfirmation: {
      tags: [logoutPageMachineTags.WaitingForLogoutConfirmation],
      on: {
        confirmLogout: {
          target: 'LoggingOut',
        },
      },
    },
    LoggingOut: {
      tags: [logoutPageMachineTags.LoggingOut],
      entry: assign({
        error: null,
      }),
      invoke: {
        src: 'logOut',
        // @ts-expect-error error description
        input: ({context}) => ({
          serviceResolver: context.serviceResolver
        }),
        onDone: {
          target: 'LogoutSuccessful'
        },
        onError: {
          target: 'WaitingForLogoutConfirmation',
          actions: assign({
            error: ({event}) => event.error,
          }),
        },
      },
    },
    LogoutSuccessful: {
      tags: [logoutPageMachineTags.LogoutSuccessful],
    },
    UnrecoverableError: {
      tags: [logoutPageMachineTags.Error],
    },
  },
});

export {logoutPageMachine, logoutPageMachineTags};
