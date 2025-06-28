import { createMachine } from 'xstate';

const toggleMachine = createMachine({
  id: 'toggle',
  types: {} as {
    context: object;
    events: { type: 'TOGGLE' };
  },
  initial: 'off',
  states: {
    off: { on: { TOGGLE: 'on' } },
    on: { on: { TOGGLE: 'off' } },
  },
});

export { toggleMachine };
