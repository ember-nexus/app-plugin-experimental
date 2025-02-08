import { LitElement, TemplateResult, html, css } from 'lit';
import { customElement} from 'lit/decorators.js';
import {Actor, createActor} from "xstate";
import {toolbarMachine} from "./ToolbarMachine";


@customElement('ember-nexus-toolbar')
class EmberNexusToolbar extends LitElement {

  static styles = css`
    * {
      box-sizing: border-box;
    }

    .hidden {
      pointer-events: none;
      user-select: none;
      opacity: 0.1;
      visibility: hidden;
      position: absolute;
    }

    .toolbar-style {
      background-color: #FBFBFE;
      padding: 0.5rem;
      border: 2px solid lime;
      border-radius: 0.25rem;
    }

    .toolbar {
      position: relative;
      display: flex;
      justify-content: flex-end;
      overflow: hidden;
    }
    .toolbar > * {
      flex: none;
    }

    .toolbar-container {
      display: flex;
      gap: 0.5rem;
      flex-wrap: nowrap;
    }
    .toolbar-horizontal > .toolbar-container {
      flex-direction: row;
    }
    .toolbar-container > * {
      flex: none;
    }
    .toolbar-measure-container-content {
      border-style: dashed;
      position: absolute;
      top: 0;
      left: 0;
    }
    .toolbar-measure-container {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
    }
    .toolbar-visible-container {
      display: inline-flex;
      width: min-content;
    }

    .toolbar-dropdown-button {
      width: 2.5rem;
      height: 2.5rem;
      border: 1px solid #000;
      text-align: center;
      position: relative;
      margin-left: 0.5rem;
    }

    .toolbar-dropdown-content {
      position: absolute;
      top: 100%;
      right: 0;
      visibility: hidden;
    }
  `;
  private resizeObserver: ResizeObserver;

  protected actor: Actor<typeof toolbarMachine>;



  setupActorSubscription(): void {
    this.actor.subscribe((snapshot) => {
      console.log('snapshot', snapshot);
      this.requestUpdate();
    });
  }

  connectedCallback(): void {
    super.connectedCallback();
  }

  firstUpdated() {
    this.actor = createActor(toolbarMachine, {
      input: {
        toolbarMeasureContainer: this.renderRoot.querySelectorAll('.toolbar-measure-container')[0] as HTMLElement,
        toolbarMeasureContainerContent: this.renderRoot.querySelectorAll('.toolbar-measure-container-content')[0] as HTMLElement,
        toolbarDropdownButton: this.renderRoot.querySelectorAll('.toolbar-dropdown-button-measure > .toolbar-dropdown-button')[0] as HTMLElement
      },
    });
    this.setupActorSubscription();
    this.actor.start();

    this.resizeObserver = new ResizeObserver(() => {
      this.actor.send({'type': 'layoutUpdate'});
    });

    this.resizeObserver.observe(this.renderRoot.querySelectorAll('.toolbar-measure-container')[0]);
  }

  disconnectedCallback(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    this.actor.stop();
    super.disconnectedCallback();
  }

  // calculateLayout(){
  //   const maxToolbarVisibleContainerBoundingBox = this.renderRoot.querySelectorAll('.toolbar-measure-container')[0].getBoundingClientRect();
  //   // console.log(maxToolbarVisibleContainerBoundingBox);
  //   let numberOfVisibleElements = 0;
  //   let toolbarMeasureContainerContentItems = this.renderRoot.querySelectorAll('.toolbar-measure-container-content > .toolbar-item');
  //   // console.log(toolbarMeasureContainerContentItems);
  //   for (let i = 0; i < toolbarMeasureContainerContentItems.length; i++) {
  //     const item = toolbarMeasureContainerContentItems[i];
  //     const itemBoundingBox = item.getBoundingClientRect();
  //     const isItemVisible = (
  //       itemBoundingBox.left >= maxToolbarVisibleContainerBoundingBox.left &&
  //       itemBoundingBox.right <= maxToolbarVisibleContainerBoundingBox.right
  //     );
  //     // console.log(item);
  //     // console.log(itemBoundingBox);
  //     if (isItemVisible) {
  //       numberOfVisibleElements += 1;
  //     } else {
  //       console.log("breaked after steps: ", numberOfVisibleElements);
  //       break;
  //     }
  //   }
  //   console.log("number of visible elements:", numberOfVisibleElements);
  // }
  //
  //
  // disconnectedCallback() {
  //   if (this.resizeObserver) {
  //     this.resizeObserver.disconnect();
  //   }
  //   super.disconnectedCallback();
  // }

  render(): TemplateResult {
    const itemData = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    let toolbarMeasureContainerContentItems: TemplateResult[] = [];
    let toolbarVisibleContainerItems: TemplateResult[] = [];
    let toolbarDropdownContainerItems: TemplateResult[] = [];

    const context = this.actor?.getSnapshot().context;

    // let numberOfItemsVisibleInToolbarContainer = 8;
    for (let i = 0; i < itemData.length; i++) {
      const rawItem = html`
        <ember-nexus-toolbar-item
          color="lime"
          label="${itemData[i]}"
        >
        </ember-nexus-toolbar-item>
      `;

      const toolbarItem = html`<div class="toolbar-item">${rawItem}</div>`;
      const dropdownContentItem = html`<div class="dropdown-content-item">${rawItem}</div>`;

      toolbarMeasureContainerContentItems.push(toolbarItem);
      if (context && i < context?.numberOfItemsVisibleInToolbarContainer) {
        toolbarVisibleContainerItems.push(toolbarItem);
      } else {
        toolbarDropdownContainerItems.push(dropdownContentItem);
      }
    }

    let dropdownButtonTemplate: TemplateResult | null = html`
      <div class="toolbar-dropdown-button">
        +
        <div class="toolbar-dropdown-content">
          ${toolbarDropdownContainerItems}
        </div>
      </div>
    `;
    const dropdownButtonTemplateMeasure = dropdownButtonTemplate;
    if (context?.renderDropdown !== true) {
      dropdownButtonTemplate = null;
    }

    return html`<div class="toolbar-style">

      <div class="toolbar toolbar-horizontal">

      <div class="toolbar-container toolbar-measure-container-content hidden">
        ${toolbarMeasureContainerContentItems}
      </div>

      <div class="toolbar-container toolbar-measure-container hidden">
      </div>

      <div class="toolbar-dropdown-button-measure hidden">
        ${dropdownButtonTemplateMeasure}
      </div>

      <div class="toolbar-container toolbar-visible-container">
        ${toolbarVisibleContainerItems}
      </div>

      ${dropdownButtonTemplate}

      </div>

    </div>`;
  }
}

export { EmberNexusToolbar };
