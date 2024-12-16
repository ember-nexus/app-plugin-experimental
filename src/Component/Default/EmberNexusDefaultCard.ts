import CardStyle from '@ember-nexus/uix/Style/Component/CardStyle.css';
import { Node, Relation, Uuid } from '@ember-nexus/web-sdk/Type/Definition';
import { format } from 'date-fns';
import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { Actor, createActor } from 'xstate';

import { findBestFontWeightColor, getNameFromElementOrId, getTitleFromElementOrId } from '../../Helper';
import { getColorFromElementOrId } from '../../Helper/ColorHelper';
import { getIconForElement } from '../../Helper/IconHelper';
import { singleElementMachine } from '../../Machine';
import { tmpStyle } from '../../Style';
import { colorWarning } from '../../Type';

@customElement('ember-nexus-default-card')
class EmberNexusDefaultCard extends LitElement {
  static styles = [unsafeCSS(CardStyle), tmpStyle];

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

    let description = '';
    if (this._element) {
      if ('description' in this._element.data) {
        description = this._element.data.description as string;
      }
    }

    let createdString: null | string = null;
    if (this._element?.data.created) {
      if (this._element?.data.created instanceof Date) {
        createdString = `created on ${format(this._element?.data.created as Date, 'yyyy-MM-dd')}`;
      }
    }

    let updatedString: null | string = null;
    if (this._element?.data.updated) {
      if (this._element?.data.updated instanceof Date) {
        updatedString = `updated on ${format(this._element?.data.updated as Date, 'yyyy-MM-dd')}`;
      }
    }

    return html`<div class="card" style="${styleMap({ ...backgroundStyle, ...textStyles })}" title="${title}">
      <div class="title">
        ${icon}
        <p class="name font-sans">${getNameFromElementOrId(this.elementId, this._element)}</p>
      </div>
      <div class="info font-sans">
        <p><span class="font-mono">${this.elementId}</span> <span>${this._element?.type}</span></p>
        <p><span>${createdString}</span> <span>${updatedString}</span></p>
      </div>
      <div class="description font-sans">
        <p>${description}</p>
      </div>
    </div>`;
  }
}

export { EmberNexusDefaultCard };
