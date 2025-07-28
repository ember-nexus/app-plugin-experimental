import { ApiConfiguration, ApiWrapper, ServiceResolver } from '@ember-nexus/app-core/Service';
import { Token, UniqueUserIdentifier } from '@ember-nexus/app-core/Type/Definition';
import { assign, fromPromise, setup } from 'xstate';

import { resolveService } from '../../Decorator/index.js';
import {LifecycleCapableWebComponent} from "../../Type/Definition";

type HTMLElementWithOptionalOnServiceResolverLoaded = LifecycleCapableWebComponent & {
  onServiceResolverLoaded?(serviceResolver: ServiceResolver): void;
};

const enum loginPageMachineTags {
  Loading = 'LOADING',
  WaitingForFormEdit = 'WAITING_FOR_FORM_EDIT',
  SubmittingForm = 'SUBMITTING_FORM',
  Error = 'ERROR',
  LoginSuccessful = 'LOGIN_SUCCESSFUL',
}

const loginPageMachine = setup({
  actors: {
    getServiceResolver: fromPromise<
      ServiceResolver,
      {
        htmlElement: HTMLElementWithOptionalOnServiceResolverLoaded;
      }
    >(({ input }) => {
      return resolveService(input.htmlElement);
    }),
    postToken: fromPromise<
      Token,
      {
        uniqueUserIdentifier: UniqueUserIdentifier;
        password: string;
        serviceResolver: ServiceResolver;
      }
    >(({ input }) => {
      const apiWrapper = input.serviceResolver.getServiceOrFail<ApiWrapper>(ApiWrapper.identifier);
      const promise = apiWrapper.postToken(input.uniqueUserIdentifier, input.password);
      return promise;
    }),
  },
  types: {
    context: {} as {
      htmlElement: HTMLElementWithOptionalOnServiceResolverLoaded;
      uniqueUserIdentifier: UniqueUserIdentifier | string;
      password: string;
      error: null | unknown;
      serviceResolver: null | ServiceResolver;
    },
    input: {} as {
      htmlElement: HTMLElementWithOptionalOnServiceResolverLoaded;
    },
    events: {} as
      | { type: 'formClear' }
      | { type: 'formUpdate'; uniqueUserIdentifier: UniqueUserIdentifier | string; password: string }
      | { type: 'formSubmit' },
  },
}).createMachine({
  id: 'login-page-machine',
  context: ({ input }) => ({
    htmlElement: input.htmlElement,
    uniqueUserIdentifier: '',
    password: '',
    element: null,
    error: null,
    serviceResolver: null,
  }),
  initial: 'Initial',
  states: {
    Initial: {
      tags: [loginPageMachineTags.Loading],
      always: [
        {
          target: 'GetServiceResolver',
        },
      ],
    },
    GetServiceResolver: {
      tags: [loginPageMachineTags.Loading],
      invoke: {
        src: 'getServiceResolver',
        input: ({ context }) => ({
          htmlElement: context.htmlElement,
        }),
        onDone: {
          target: 'WaitingForFormUpdate',
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
    WaitingForFormUpdate: {
      tags: [loginPageMachineTags.WaitingForFormEdit],
      on: {
        formClear: {
          actions: [
            assign({
              uniqueUserIdentifier: () => '',
              password: () => '',
            }),
            ({ context }): void => {
              context.htmlElement.requestUpdate?.();
            },
          ],
          target: 'WaitingForFormUpdate',
        },
        formUpdate: {
          actions: assign({
            uniqueUserIdentifier: ({ event }) => event.uniqueUserIdentifier,
            password: ({ event }) => event.password,
          }),
          target: 'WaitingForFormUpdate',
        },
        formSubmit: {
          target: 'SubmittingForm',
        },
      },
    },
    SubmittingForm: {
      tags: [loginPageMachineTags.SubmittingForm],
      entry: assign({
        error: null,
      }),
      invoke: {
        src: 'postToken',
        // @ts-expect-error error description
        input: ({ context }) => ({
          serviceResolver: context.serviceResolver,
          uniqueUserIdentifier: context.uniqueUserIdentifier,
          password: context.password,
        }),
        onDone: {
          target: 'LoginSuccessful',
          actions: ({ context, event }) => {
            const serviceResolver = context.serviceResolver;
            const apiConfiguration = serviceResolver?.getServiceOrFail<ApiConfiguration>(ApiConfiguration.identifier);
            apiConfiguration?.setToken(event.output);
          },
        },
        onError: {
          target: 'WaitingForFormUpdate',
          actions: assign({
            error: ({ event }) => event.error,
          }),
        },
      },
    },
    LoginSuccessful: {
      tags: [loginPageMachineTags.LoginSuccessful],
    },
    UnrecoverableError: {
      tags: [loginPageMachineTags.Error],
    },
  },
});

export { loginPageMachine, loginPageMachineTags };
