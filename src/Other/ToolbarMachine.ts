import { assign, setup } from 'xstate';


export const toolbarMachine = setup({
  types: {
    context: {} as {
      maxToolbarWidth: number;
      renderDropdown: boolean;
      numberOfItemsVisibleInToolbarContainer: number;
      toolbarMeasureContainer: HTMLElement;
      toolbarMeasureContainerContent: HTMLElement;
      toolbarDropdownButton: HTMLElement;
    },
    input: {} as {
      toolbarMeasureContainer: HTMLElement;
      toolbarMeasureContainerContent: HTMLElement;
      toolbarDropdownButton: HTMLElement;
    },
    events: {} as { type: 'layoutUpdate' },
  },
}).createMachine({
  id: 'toolbar-machine',
  context: ({ input }) => ({
    maxToolbarWidth: 0,
    renderDropdown: false,
    numberOfItemsVisibleInToolbarContainer: 0,
    toolbarMeasureContainer: input.toolbarMeasureContainer,
    toolbarMeasureContainerContent: input.toolbarMeasureContainerContent,
    toolbarDropdownButton: input.toolbarDropdownButton,
  }),
  initial: 'Initial',
  states: {
    Initial: {
      entry: assign({
        maxToolbarWidth: ({ context }) => {
          return context.toolbarMeasureContainer.getBoundingClientRect().width;
        }
      }),
      always: [
        {
          target: 'CalculateLayout',
        }
      ],
    },
    CalculateLayout: {
      entry: assign(({ context }) => {
        console.log("calculating layout...");
        console.log(context);


        // const maxToolbarWidth = context.maxToolbarWidth;
        const maxToolbarWidth = context.toolbarMeasureContainer.getBoundingClientRect().width;
        const dropdownButtonWidth = context.toolbarDropdownButton.getBoundingClientRect().width;
        const toolbarMeasureContainerContentOffsetLeft = context.toolbarMeasureContainer.getBoundingClientRect().left;


        let numberOfVisibleElementsWithoutDropdownButton = 0;
        let numberOfVisibleElementsWithDropdownButton = 0;
        let toolbarMeasureContainerContentItems = context.toolbarMeasureContainerContent.querySelectorAll('.toolbar-item');
        for (let i = 0; i < toolbarMeasureContainerContentItems.length; i++) {
          const item = toolbarMeasureContainerContentItems[i];
          const itemBoundingBox = item.getBoundingClientRect();
          const isItemVisibleWithoutDropdownButton = (
            itemBoundingBox.left >= toolbarMeasureContainerContentOffsetLeft &&
            itemBoundingBox.right <= toolbarMeasureContainerContentOffsetLeft + maxToolbarWidth
          );
          const isItemVisibleWithDropdownButton = (
            itemBoundingBox.left >= toolbarMeasureContainerContentOffsetLeft &&
            itemBoundingBox.right <= toolbarMeasureContainerContentOffsetLeft + maxToolbarWidth - dropdownButtonWidth
          );
          // console.log(item);
          // console.log(itemBoundingBox);
          if (isItemVisibleWithoutDropdownButton) {
            numberOfVisibleElementsWithoutDropdownButton += 1;
          }
          if (isItemVisibleWithDropdownButton) {
            numberOfVisibleElementsWithDropdownButton += 1;
          }
          if (!isItemVisibleWithoutDropdownButton && !isItemVisibleWithDropdownButton) {
            break;
          }
        }

        console.log(numberOfVisibleElementsWithDropdownButton, numberOfVisibleElementsWithoutDropdownButton);

        if (numberOfVisibleElementsWithoutDropdownButton === toolbarMeasureContainerContentItems.length) {
          return {
            renderDropdown: false,
            numberOfItemsVisibleInToolbarContainer: numberOfVisibleElementsWithoutDropdownButton,
          };
        }

        return {
          renderDropdown: true,
          numberOfItemsVisibleInToolbarContainer: numberOfVisibleElementsWithDropdownButton,
        };

        // const maxToolbarVisibleContainerBoundingBox = context.toolbarMeasureContainer.getBoundingClientRect();
        // let numberOfVisibleElements = 0;
        // let toolbarMeasureContainerContentItems = context.toolbarMeasureContainerContent.querySelectorAll('.toolbar-item');
        // for (let i = 0; i < toolbarMeasureContainerContentItems.length; i++) {
        //   const item = toolbarMeasureContainerContentItems[i];
        //   const itemBoundingBox = item.getBoundingClientRect();
        //   const isItemVisible = (
        //     itemBoundingBox.left >= maxToolbarVisibleContainerBoundingBox.left &&
        //     itemBoundingBox.right <= maxToolbarVisibleContainerBoundingBox.right
        //   );
        //   // console.log(item);
        //   // console.log(itemBoundingBox);
        //   if (isItemVisible) {
        //     numberOfVisibleElements += 1;
        //   } else {
        //     console.log("breaked after steps: ", numberOfVisibleElements);
        //     break;
        //   }
        // }

        // console.log("number of visible elements:", numberOfVisibleElements);
        //
        // return {
        //   renderDropdown: true,
        //   numberOfItemsVisibleInToolbarContainer: numberOfVisibleElements,
        // };
      }),
      always: [
        {
          target: 'LayoutCalculated',
        }
      ],
    },
    LayoutCalculated: {
      on: {
        layoutUpdate: {
          target: 'CalculateLayout',
        },
      },
    }
  },
});
