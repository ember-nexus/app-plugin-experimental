import {assign, createActor, fromPromise, setup} from 'xstate';
import {Node, Relation, Element, Uuid, uuidv4Regex} from "@ember-nexus/web-sdk/Type/Definition";
import {GetElementEvent} from "@ember-nexus/web-sdk/BrowserEvent/Element";

export const singleElementMachine = setup({
  actors: {
    loadElement: fromPromise<Node | Relation, {elementId: Uuid, htmlElement: HTMLElement}>(async ({input}) => {
      const event = new GetElementEvent(input.elementId!);
      input.htmlElement.dispatchEvent(event);
      const getElementResult = event.getElement();
      if (getElementResult == null) {
        return Promise.reject('unable to get event handled');
      }
      return getElementResult;
    })
  },
  guards: {
    isValidElementId: ({ context }) => {
      if (context.elementId == null) {
        return false;
      }
      return context.elementId.match(uuidv4Regex) !== null;
    },
  },
  types: {
    context: {} as {
      elementId: null | Uuid,
      element: null | Node | Relation,
      error: null | string,
      htmlElement: HTMLElement
    },
    input: {} as {
      elementId: Uuid,
      htmlElement: HTMLElement
    }
  }
}).createMachine({
  id: 'single-element-machine',
  context: ({input}) => ({
    elementId: input.elementId,
    element: null,
    error: null,
    htmlElement: input.htmlElement
  }),
  initial: 'Initial',
  states: {
    Initial: {
      entry: assign({
        element: null,
        error: null
      }),
      always: [
        {
          guard: 'isValidElementId',
          target: 'Loading',
        },
        {
          target: 'Error',
          actions: assign({
            error: 'Unable to parse element id as uuid.'
          })
        }
      ]
    },
    Loading: {
      on: {
        next: 'Loaded',
        reset: 'Initial',
        error: 'Error'
      },
      invoke: {
        src: 'loadElement',
        // @ts-expect-error
        input: ({ context }) => ({
          elementId: context.elementId,
          htmlElement: context.htmlElement
        }),
        onDone: {
          target: 'Loaded',
          actions: [
            () => {
              console.log('on done got called')
            },
            assign({
              element: ({ event }) => event.output
            })
          ]
        },
        onError: {
          target: 'Error',
          actions: assign({
            error: ({ event }) => String(event.error)
          })
        }
      }
      // entry: [
      //   {
      //     type: 'startLoading'
      //   }
      // ]
    },
    Loaded: {
      on: {
        reset: 'Initial'
      }
    },
    Error: {
      on: {
        reset: 'Initial'
      }
    }
  }
});

const actor = createActor(singleElementMachine, {
  input: {
    elementId: '7b80b203-2b82-40f5-accd-c7089fe6114e' as Uuid,
    htmlElement: global.window.document.getElementById('event-root')!
  }
});

// actor.subscribe({
//   complete() {
//     console.log('workflow completed', actor.getSnapshot().output);
//   }
// });

actor.subscribe((snapshot) => {
  console.log('value:', snapshot.value, 'elementId: ', snapshot.context.elementId, ', element: ', snapshot.context.element, ', error: ', snapshot.context.error);
});

actor.start();

// @ts-expect-error
global.window.actor = actor;

export {Element};
