import { Node, Relation, Uuid } from '@ember-nexus/web-sdk/Type/Definition';
import { LitElement, TemplateResult, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { Actor, createActor } from 'xstate';

import { findBestFontWeightColor, getNameFromElementOrId, getTitleFromElementOrId } from '../../Helper';
import { getColorFromElementOrId } from '../../Helper/ColorHelper';
import { getIconForElement } from '../../Helper/IconHelper';
import { singleElementMachine } from '../../Machine';
import { cardComponentStyle, fontStyle, shadowStyle } from '../../Style';
import { colorWarning } from '../../Type';

@customElement('ember-nexus-default-card')
class EmberNexusDefaultCard extends LitElement {
  static styles = [cardComponentStyle, shadowStyle, fontStyle];

  @property({ type: String, attribute: 'element-id' })
  elementId: string;

  @state()
  protected _element: null | Node | Relation = null;

  @state()
  protected _error: null | string = null;

  @state()
  protected _color: string = '#000';

  protected actor: Actor<typeof singleElementMachine>;

  constructor() {
    super();
  }

  setupActorSubscription(): void {
    this.actor.subscribe((snapshot) => {
      this._element = snapshot.context.element;
      this._error = snapshot.context.error;
      switch (snapshot.value) {
        case 'Loaded':
          this._color = getColorFromElementOrId(this.elementId, this._element);
          break;
        case 'Error':
          this._color = colorWarning;
          break;
        default:
          this._color = '#000';
      }
      this.requestUpdate();
    });
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.actor = createActor(singleElementMachine, {
      input: {
        elementId: this.elementId as Uuid,
        htmlElement: this.renderRoot,
      },
    });
    this.setupActorSubscription();
    this.actor.start();
  }

  disconnectedCallback(): void {
    this.actor.stop();
    super.disconnectedCallback();
  }

  updated(changedProperties): void {
    if (changedProperties.has('elementId')) {
      this.actor.send({
        type: 'reset',
        elementId: this.elementId as Uuid,
      });
    }
  }

  render(): TemplateResult {
    const textStyles = findBestFontWeightColor(this._color, ['#000', '#fff'], [400, 500, 600, 700]);

    const backgroundStyle = {
      backgroundColor: this._color,
    };
    let title: string;
    if (this._error == null) {
      title = getTitleFromElementOrId(this.elementId, this._element);
    } else {
      title = this._error;
    }

    let icon: TemplateResult | null = null;
    const iconStyle = {
      fill: textStyles.color,
    };
    if (this._element) {
      icon = html`<span class="icon" style="${styleMap(iconStyle)}">${getIconForElement(this._element)}</span>`;
    } else {
      icon = html`<span class="icon" style="${styleMap(iconStyle)}">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16" />
        </svg>
      </span>`;
    }

    return html`<div
      class="card-component shadow"
      style="${styleMap({ ...backgroundStyle, ...textStyles })}"
      title="${title}"
    >
      <p class="name font-sans">${icon} ${getNameFromElementOrId(this.elementId, this._element)}</p>
      <div class="info font-sans">${this._element?.type} ${this.elementId}</div>
    </div>`;
  }
}

export { EmberNexusDefaultCard };
