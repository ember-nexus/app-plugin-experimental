import { ApiWrapper, ServiceResolver } from '@ember-nexus/app-core/Service';
import { Node, Relation, Uuid, uuidv4Regex } from '@ember-nexus/app-core/Type/Definition';
import { assign, fromPromise, setup } from 'xstate';

import { resolveService } from '../Decorator/index.js';

const enum getElementMachineTags {
  Loading = 'LOADING',
  Loaded = 'LOADED',
  Error = 'ERROR',
}

const getElementMachine = setup({
  actors: {
    getServiceResolver: fromPromise<ServiceResolver, { htmlElement: HTMLElement }>(({ input }) => {
      return resolveService(input.htmlElement);
    }),
    getElement: fromPromise<Node | Relation, { elementId: Uuid; serviceResolver: ServiceResolver }>(({ input }) => {
      const apiWrapper = input.serviceResolver.getServiceOrFail<ApiWrapper>(ApiWrapper.identifier);
      return apiWrapper.getElement(input.elementId);
    }),
  },
  guards: {
    isValidElementId: ({ context }) => String(context.elementId).match(uuidv4Regex) !== null,
    isElementIdEmpty: ({ context }) =>
      context.elementId === null || context.elementId === undefined || context.elementId === '',
  },
  types: {
    context: {} as {
      elementId: null | Uuid;
      htmlElement: HTMLElement;
      element: null | Node | Relation;
      error: null | unknown;
      serviceResolver: null | ServiceResolver;
    },
    input: {} as {
      elementId: Uuid;
      htmlElement: HTMLElement;
    },
    events: {} as { type: 'reset'; elementId: Uuid },
  },
}).createMachine({
  id: 'get-element-machine',
  context: ({ input }) => ({
    elementId: input.elementId,
    htmlElement: input.htmlElement,
    element: null,
    error: null,
    serviceResolver: null,
  }),
  initial: 'Initial',
  states: {
    Initial: {
      tags: [getElementMachineTags.Loading],
      always: [
        {
          target: 'GetServiceResolver',
        },
      ],
    },
    GetServiceResolver: {
      tags: [getElementMachineTags.Loading],
      invoke: {
        src: 'getServiceResolver',
        input: ({ context }) => ({
          htmlElement: context.htmlElement,
        }),
        onDone: {
          target: 'ReadyToGetElement',
          actions: assign({
            serviceResolver: ({ event }) => event.output,
          }),
        },
        onError: {
          target: 'UnrecoverableError',
          actions: assign({
            error: ({ event }) => event.error,
          }),
        },
      },
    },
    ReadyToGetElement: {
      tags: [getElementMachineTags.Loading],
      entry: assign({
        elementId: ({ context }) => context.elementId,
        element: null,
        error: null,
      }),
      always: [
        {
          guard: 'isValidElementId',
          target: 'GetElement',
        },
        {
          guard: 'isElementIdEmpty',
          target: 'RecoverableError',
          actions: assign({
            error: 'Element id can not be empty.',
          }),
        },
        {
          target: 'RecoverableError',
          actions: assign({
            error: 'Unable to parse element id as uuid.',
          }),
        },
      ],
    },
    GetElement: {
      tags: [getElementMachineTags.Loading],
      invoke: {
        src: 'getElement',
        // @ts-expect-error error description
        input: ({ context }) => ({
          elementId: context.elementId,
          serviceResolver: context.serviceResolver,
        }),
        onDone: {
          target: 'Loaded',
          actions: assign({
            element: ({ event }) => event.output,
          }),
        },
        onError: {
          target: 'RecoverableError',
          actions: assign({
            error: ({ event }) => event.error,
          }),
        },
      },
    },
    Loaded: {
      tags: [getElementMachineTags.Loaded],
      on: {
        reset: {
          actions: assign({
            elementId: ({ event }) => event.elementId,
          }),
          target: 'ReadyToGetElement',
        },
      },
    },
    RecoverableError: {
      tags: [getElementMachineTags.Error],
      on: {
        reset: {
          actions: assign({
            elementId: ({ event }) => event.elementId,
          }),
          target: 'ReadyToGetElement',
        },
      },
    },
    UnrecoverableError: {
      tags: [getElementMachineTags.Error],
    },
  },
});

export { getElementMachine, getElementMachineTags };
