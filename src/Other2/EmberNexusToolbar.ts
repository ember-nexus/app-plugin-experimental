import { LitElement, TemplateResult, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Actor, createActor } from 'xstate';
import {computePosition, offset, shift, autoPlacement, Placement, arrow, size} from '@floating-ui/dom';
import mdiDotsHorizontal from '@mdi/svg/svg/dots-horizontal.svg'
import mdiDotsVertical from '@mdi/svg/svg/dots-vertical.svg'
import {unsafeSVG} from 'lit/directives/unsafe-svg.js';

import { toolbarMachine } from './ToolbarMachine.js';

@customElement('ember-nexus-toolbar2')
class EmberNexusToolbar extends LitElement {
  static styles = css`
    * {
      box-sizing: border-box;
    }

    .toolbar {
      position: relative;
      display: flex;
      justify-content: flex-end;
      align-items: stretch;
      padding: var(--toolbar-padding, 0.25rem);
      gap: var(--toolbar-gap, 0.25rem);
      background-color: var(--toolbar-background-color, #f0f0f4);
      border-radius: var(--toolbar-border-radius, 0.25rem);
    }
    .root.toolbar.horizontal {
      width: 100%;
      height: auto;
    }
    .root.toolbar.vertical {
      width: auto;
      height: 100%;
    }
    .toolbar.horizontal.start,
    .toolbar.horizontal.start .toolbar-items {
      flex-direction: row-reverse;
    }
    .toolbar.horizontal.end,
    .toolbar.horizontal.end .toolbar-items {
      flex-direction: row;
    }
    .toolbar.vertical.start,
    .toolbar.vertical.start .toolbar-items {
      flex-direction: column-reverse;
    }
    .toolbar.vertical.end,
    .toolbar.vertical.end .toolbar-items {
      flex-direction: column;
    }
    .toolbar > * {
      flex: none;
    }

    .toolbar-items {
      display: flex;
      gap: var(--toolbar-gap, 0.25rem);
      align-items: center;
    }
    .toolbar-items > * {
      flex: none;
    }

    .dropdown-button {
      min-width: 2rem;
      min-height: 2rem;
      background-color: var(--toolbar-item-background-color, #fff);
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: var(--toolbar-item-border-radius, 0.25rem);
      position: relative;
    }

    .icon > svg {
      width: 1.2rem;
      height: auto;
      display: block;
    }

    .dropdown-menu {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1000;
    }

    .arrow {
      position: absolute;
      background: var(--toolbar-dropdown-background-color, #333);
      width: 0.5rem;
      height: 0.5rem;
      transform: rotate(45deg);
    }

    .dropdown-menu-content {
      position: relative;
      min-width: 8rem;
      max-width: 15rem;
      max-height: 20rem;
      padding: 0.25rem 0;
      background-color: var(--toolbar-dropdown-background-color, #333);
      border-radius: 0.25rem;
      display: flex;
      flex-direction: column;
    }

    .dropdown-menu-items {
      flex-grow: 1;
      overflow-y: auto;
      min-height: 0;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      max-height: 100%;
      height: 100%;
      padding: 0 0.25rem;
    }

    .measurement-root {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      user-select: none;
      //opacity: 0.5;
      visibility: hidden;
      overflow: hidden;
    }

    .measurement-toolbar.horizontal {
      width: 100%;
    }
    .measurement-toolbar.vertical {
      height: 100%;
    }

    .toolbar-items-placeholder {
      flex: auto;
    }

    .measurement-toolbar-items {
      position: absolute;
    }

    .measurement-toolbar-items.horizontal.start {
      top: 0;
      right: 0;
    }
    .measurement-toolbar-items.horizontal.end {
      top: 0;
      left: 0;
    }
    .measurement-toolbar-items.vertical.start {
      bottom: 0;
      left: 0;
    }
    .measurement-toolbar-items.vertical.end {
      top: 0;
      left: 0;
    }
  `;

  @property({ type: String })
  orientation?: 'horizontal' | 'vertical';

  @property({ type: String })
  alignment?: 'start' | 'end';

  private toolbarResizeObserver: ResizeObserver;
  private toolbarItemResizeObserver: ResizeObserver;

  protected actor: Actor<typeof toolbarMachine>;

  setupActorSubscription(): void {
    this.actor.subscribe(() => {
      this.requestUpdate();
    });
  }

  connectedCallback(): void {
    super.connectedCallback();
  }

  firstUpdated(): void {
    this.actor = createActor(toolbarMachine, {
      input: {
        orientation: this.orientation ?? 'horizontal',
        alignment: this.alignment ?? 'end',
        measurementToolbar: this.renderRoot.querySelectorAll('.measurement-toolbar')[0] as HTMLElement,
        measurementToolbarItems: this.renderRoot.querySelectorAll('.measurement-toolbar-items')[0] as HTMLElement,
      },
    });
    this.setupActorSubscription();
    this.actor.start();

    this.toolbarResizeObserver = new ResizeObserver(() => {
      this.actor.send({ type: 'layoutUpdate' });
    });
    this.toolbarItemResizeObserver = new ResizeObserver(() => {
      this.actor.send({ type: 'layoutUpdate' });
    });

    this.toolbarResizeObserver.observe(this.renderRoot.querySelectorAll('.root.toolbar')[0]);
    this.toolbarItemResizeObserver.observe(this.renderRoot.querySelectorAll('.measurement-toolbar-items')[0]);
  }

  disconnectedCallback(): void {
    if (this.toolbarResizeObserver) {
      this.toolbarResizeObserver.disconnect();
    }
    if (this.toolbarItemResizeObserver) {
      this.toolbarItemResizeObserver.disconnect();
    }
    this.actor.stop();
    super.disconnectedCallback();
  }

  updated() {
    const context = this.actor?.getSnapshot().context;
    if (context?.isDropdownRequired) {

      const dropdownButton = this.renderRoot.querySelectorAll('.root.toolbar > .dropdown-button')[0] as HTMLElement;
      const dropdownMenu = this.renderRoot.querySelectorAll('.dropdown-menu')[0] as HTMLElement;
      const arrowElement = this.renderRoot.querySelectorAll('.arrow')[0] as HTMLElement;

      console.log(dropdownButton, dropdownMenu);

      const allowedPlacements: Placement[] = this.orientation === 'horizontal' ? ['top', 'bottom'] : ['left', 'right'];

      computePosition(
        dropdownButton,
        dropdownMenu,
        {
          middleware: [
            offset(15),
            shift(),
            autoPlacement({
              allowedPlacements: allowedPlacements,
            }),
            arrow({element: arrowElement}),
            size({
              apply({availableWidth, availableHeight, elements}) {
                // Change styles, e.g.
                Object.assign(elements.floating.style, {
                  maxWidth: `${Math.max(0, availableWidth)}px`,
                  maxHeight: `${Math.max(0, availableHeight)}px`,
                });
              },
            }),
          ]
        }
      ).then(({x, y, placement, middlewareData}) => {
        Object.assign(dropdownMenu.style, {
          left: `${x}px`,
          top: `${y}px`,
        });
        if (middlewareData.arrow) {
          const staticSide = {
            top: 'bottom',
            right: 'left',
            bottom: 'top',
            left: 'right',
          }[placement.split('-')[0]] as string;
          const {x, y} = middlewareData.arrow;

          Object.assign(arrowElement.style, {
            left: x != null ? `${x}px` : '',
            top: y != null ? `${y}px` : '',
            [staticSide]: '-0.25rem',
          });
        }
      });

    }
  }

  render(): TemplateResult {
    const itemData = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      // 'K',
      // 'L',
      // 'M',
      // 'N',
      // 'O',
      // 'P',
      // 'Q',
      // 'R',
      // 'S',
      // 'T',
      // 'U',
      // 'V',
      // 'W',
      // 'X',
      // 'Y',
      // 'Z',
    ];

    const context = this.actor?.getSnapshot().context;

    const allToolbarItems: TemplateResult[] = itemData.map(
      (item) => html`<ember-nexus-toolbar-item2 label="${item}"> </ember-nexus-toolbar-item2> `,
    );
    const visibleToolbarItems: TemplateResult[] = allToolbarItems.slice(
      0,
      context?.numberOfItemsVisibleInToolbarContainer ?? 0,
    );
    const dropdownMenuItems: TemplateResult[] = allToolbarItems.slice(
      context?.numberOfItemsVisibleInToolbarContainer ?? 0,
    );

    const dropdownButtonIcon = this.orientation === 'horizontal' ? mdiDotsHorizontal : mdiDotsVertical;


    const dropdownButton = html`
      <div class="dropdown-button">
        <div class="icon">${unsafeSVG(dropdownButtonIcon)}</div>
      </div>
    `;

    const visibleDropdownButton = context?.isDropdownRequired ? dropdownButton : null;
    const dropdownMenu = context?.isDropdownRequired ? html`
      <div class="dropdown-menu">
        <div class="arrow"></div>
        <div class="dropdown-menu-content">
          <div class="dropdown-menu-items">
            ${dropdownMenuItems}
          </div>
        </div>
      </div>
    `: null;

    return html`
      <div class="root toolbar ${this.orientation ?? 'horizontal'} ${this.alignment ?? 'end'}">
        <div class="toolbar-items">${visibleToolbarItems}</div>
        ${visibleDropdownButton}
        ${dropdownMenu}
        <div class="measurement-root">
          <div class="toolbar ${this.orientation ?? 'horizontal'} ${this.alignment ?? 'end'} measurement-toolbar">
            <div class="toolbar-items-placeholder"></div>
            ${dropdownButton}
          </div>
          <div class="toolbar ${this.orientation ?? 'horizontal'} ${this.alignment ?? 'end'} measurement-toolbar-items">
            <div class="toolbar-items">${allToolbarItems}</div>
          </div>
        </div>
      </div>
    `;
  }
}

export { EmberNexusToolbar };
