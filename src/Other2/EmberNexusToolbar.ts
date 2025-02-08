import { LitElement, TemplateResult, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Actor, createActor } from 'xstate';

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
      padding: 0.5rem;
      gap: 0.5rem;
      background-color: #f0f0f4;
      border-radius: 0.25rem;
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
      gap: 0.5rem;
      align-items: center;
    }
    .toolbar-items > * {
      flex: none;
    }

    .dropdown-button {
      min-width: 2rem;
      min-height: 2rem;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0.25rem;
      position: relative;
    }

    .dropdown-menu {
      display: none;
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
    this.actor.subscribe((snapshot) => {
      console.log('snapshot', snapshot);
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
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
    ];

    const context = this.actor?.getSnapshot().context;

    const allToolbarItems: TemplateResult[] = itemData.map(
      (item) => html` <ember-nexus-toolbar-item2 label="${item}"> </ember-nexus-toolbar-item2> `,
    );
    const visibleToolbarItems: TemplateResult[] = allToolbarItems.slice(
      0,
      context?.numberOfItemsVisibleInToolbarContainer ?? 0,
    );
    const dropdownMenuItems: TemplateResult[] = allToolbarItems.slice(
      context?.numberOfItemsVisibleInToolbarContainer ?? 0,
    );

    const dropdownButton = html`
      <div class="dropdown-button">
        <div class="icon">+</div>
        <div class="dropdown-menu">${dropdownMenuItems}</div>
      </div>
    `;

    return html`
      <div class="root toolbar ${this.orientation ?? 'horizontal'} ${this.alignment ?? 'end'}">
        <div class="toolbar-items">${visibleToolbarItems}</div>
        ${dropdownButton}
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
