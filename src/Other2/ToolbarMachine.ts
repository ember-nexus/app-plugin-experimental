import { assign, setup } from 'xstate';

export const toolbarMachine = setup({
  types: {
    context: {} as {
      numberOfItemsVisibleInToolbarContainer: number;
      isDropdownRequired: boolean;
      orientation: 'horizontal' | 'vertical';
      alignment: 'start' | 'end';
      measurementToolbar: HTMLElement;
      measurementToolbarItems: HTMLElement;
    },
    input: {} as {
      orientation: 'horizontal' | 'vertical';
      alignment: 'start' | 'end';
      measurementToolbar: HTMLElement;
      measurementToolbarItems: HTMLElement;
    },
    events: {} as { type: 'layoutUpdate' },
  },
}).createMachine({
  id: 'toolbar-machine',
  context: ({ input }) => ({
    numberOfItemsVisibleInToolbarContainer: 0,
    isDropdownRequired: false,
    orientation: input.orientation,
    alignment: input.alignment,
    measurementToolbar: input.measurementToolbar,
    measurementToolbarItems: input.measurementToolbarItems,
  }),
  initial: 'Initial',
  states: {
    Initial: {
      always: [
        {
          target: 'CalculateLayout',
        },
      ],
    },
    CalculateLayout: {
      entry: assign(({ context }) => {
        const measurementToolbarBoundingBox = context.measurementToolbar.getBoundingClientRect();
        const measurementToolbarItemsBoundingBox = context.measurementToolbarItems.getBoundingClientRect();
        const measurementToolbarItemsChildren = context.measurementToolbarItems.querySelectorAll('.toolbar-items > *');

        let areAllItemsVisible = false;
        if (context.orientation === 'horizontal') {
          if (measurementToolbarItemsBoundingBox.width <= measurementToolbarBoundingBox.width) {
            areAllItemsVisible = true;
          }
        } else {
          if (measurementToolbarItemsBoundingBox.height <= measurementToolbarBoundingBox.height) {
            areAllItemsVisible = true;
          }
        }
        if (areAllItemsVisible) {
          return {
            isDropdownRequired: false,
            numberOfItemsVisibleInToolbarContainer: measurementToolbarItemsChildren.length,
          };
        }

        const itemPlaceholderBoundingBox = context.measurementToolbar
          .querySelectorAll('.toolbar-items-placeholder')[0]
          .getBoundingClientRect();

        const start =
          (context.orientation === 'horizontal' ? itemPlaceholderBoundingBox.left : itemPlaceholderBoundingBox.top) -
          0.1;
        const end =
          (context.orientation === 'horizontal'
            ? itemPlaceholderBoundingBox.right
            : itemPlaceholderBoundingBox.bottom) + 0.1;

        let numberOfVisibleItems = 0;

        for (let i = 0; i < measurementToolbarItemsChildren.length; i++) {
          const childBoundingBox = measurementToolbarItemsChildren[i].getBoundingClientRect();
          const childBoundingBoxStart =
            context.orientation === 'horizontal' ? childBoundingBox.left : childBoundingBox.top;
          const childBoundingBoxEnd =
            context.orientation === 'horizontal' ? childBoundingBox.right : childBoundingBox.bottom;
          const childIsVisible = childBoundingBoxStart >= start && childBoundingBoxEnd <= end;
          if (!childIsVisible) {
            break;
          }
          numberOfVisibleItems += 1;
        }

        return {
          isDropdownRequired: true,
          numberOfItemsVisibleInToolbarContainer: numberOfVisibleItems,
        };
      }),
      always: [
        {
          target: 'LayoutCalculated',
        },
      ],
    },
    LayoutCalculated: {
      on: {
        layoutUpdate: {
          target: 'CalculateLayout',
        },
      },
    },
  },
});
