import { Node, Relation, Uuid } from '@ember-nexus/web-sdk/Type/Definition';
import { LitElement, TemplateResult, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { Actor, createActor } from 'xstate';

import { getNameFromElementOrId } from '../../Helper';
import { getColorFromElementOrId } from '../../Helper/ColorHelper';
import { singleElementMachine } from '../../Machine';
import { shadowStyle } from '../../Style';
import { pillComponentStyle } from '../../Style';
import { colorWarning } from '../../Type';

@customElement('ember-nexus-default-pill')
class EmberNexusDefaultPill extends LitElement {
  static styles = [pillComponentStyle, shadowStyle];

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

  setupActorSubscription() {
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

  connectedCallback() {
    super.connectedCallback();
    this.actor = createActor(singleElementMachine, {
      input: {
        elementId: this.elementId as Uuid,
        htmlElement: this.renderRoot,
      },
    });

    this.setupActorSubscription();

    this.actor.subscribe((snapshot) => {
      console.log(
        'subscribed actor | value:',
        snapshot.value,
        'elementId: ',
        snapshot.context.elementId,
        ', element: ',
        snapshot.context.element,
        ', error: ',
        snapshot.context.error,
      );
    });

    this.actor.start();
  }

  disconnectedCallback() {
    this.actor.stop();
    super.disconnectedCallback();
  }

  updated(changedProperties) {
    if (changedProperties.has('elementId')) {
      const changedElementId = changedProperties.get('elementId');
      if (changedElementId !== undefined) {
        console.log('sending update request with element id ', changedElementId);
        this.actor.send({
          type: 'reset',
          elementId: changedElementId,
        });
      }
    }
  }

  render() {
    let content: TemplateResult;
    if (this._error == null) {
      content = html`<ember-nexus-default-icon element-id="${this.elementId}"></ember-nexus-default-icon
        ><span> ${getNameFromElementOrId(this.elementId, this._element)} </span>`;
    } else {
      content = html`<div class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16" />
        </svg>
      </div>`;
    }
    return html`<div class="pill-component shadow">${content}</div>`;
  }
}

export { EmberNexusDefaultPill };
