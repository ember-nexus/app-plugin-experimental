import { GetElementEvent } from '@ember-nexus/web-sdk/BrowserEvent/Element';
import { Element, Node, Relation, Uuid, uuidv4Regex } from '@ember-nexus/web-sdk/Type/Definition';
import { assign, fromPromise, setup } from 'xstate';

export const singleElementMachine = setup({
  actors: {
    loadElement: fromPromise<Node | Relation, { elementId: Uuid; htmlElement: HTMLElement | DocumentFragment }>(
      async ({ input }) => {
        const event = new GetElementEvent(input.elementId!);
        input.htmlElement.dispatchEvent(event);
        const getElementResult = event.getElement();
        if (getElementResult == null) {
          return Promise.reject('unable to get event handled');
        }
        return getElementResult;
      },
    ),
  },
  guards: {
    isValidElementId: ({ context }) => {
      if (context.elementId == null) {
        return false;
      }
      return context.elementId.match(uuidv4Regex) !== null;
    },
    isElementIdEmpty: ({ context }) => {
      if (context.elementId == null) {
        return true;
      }
      return context.elementId == '';
    },
  },
  types: {
    context: {} as {
      elementId: null | Uuid;
      element: null | Node | Relation;
      error: null | string;
      htmlElement: HTMLElement | DocumentFragment;
    },
    input: {} as {
      elementId: Uuid;
      htmlElement: HTMLElement | DocumentFragment;
    },
    events: {} as { type: 'reset'; elementId: Uuid },
  },
}).createMachine({
  id: 'single-element-machine',
  context: ({ input }) => ({
    elementId: input.elementId,
    element: null,
    error: null,
    htmlElement: input.htmlElement,
  }),
  initial: 'Initial',
  states: {
    Initial: {
      entry: [
        assign({
          element: null,
          error: null,
        }),
        assign({
          elementId: ({ context, event }) => {
            console.log(context, event);
            return context.elementId;
          },
        }),
      ],
      always: [
        {
          guard: 'isValidElementId',
          target: 'Loading',
        },
        {
          guard: 'isElementIdEmpty',
          target: 'Error',
          actions: assign({
            error: 'Element id can not be empty.',
          }),
        },
        {
          target: 'Error',
          actions: assign({
            error: 'Unable to parse element id as uuid.',
          }),
        },
      ],
    },
    Loading: {
      // on: {
      //   reset: {
      //     actions: assign({
      //       elementId: ({ event }) => event.elementId,
      //     }),
      //     target: 'Initial'
      //   }
      // },
      invoke: {
        src: 'loadElement',
        // @ts-expect-error
        input: ({ context }) => ({
          elementId: context.elementId,
          htmlElement: context.htmlElement,
        }),
        onDone: {
          target: 'Loaded',
          actions: assign({
            element: ({ event }) => event.output,
          }),
        },
        onError: {
          target: 'Error',
          actions: assign({
            error: ({ event }) => String(event.error),
          }),
        },
      },
    },
    Loaded: {
      on: {
        reset: {
          actions: assign({
            elementId: ({ event }) => event.elementId,
          }),
          target: 'Initial',
        },
      },
    },
    Error: {
      on: {
        reset: {
          actions: assign({
            elementId: ({ event }) => event.elementId,
          }),
          target: 'Initial',
        },
      },
    },
  },
});

export { Element };
