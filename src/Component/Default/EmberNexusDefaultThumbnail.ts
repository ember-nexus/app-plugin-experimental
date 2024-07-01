import { Node, Relation, Uuid } from '@ember-nexus/web-sdk/Type/Definition';
import { LitElement, TemplateResult, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { Actor, createActor } from 'xstate';

import { findBestFontWeightColor, getFirstNameOrFirstLettersFromIdFromElementOrId } from '../../Helper';
import { getColorFromElementOrId } from '../../Helper/ColorHelper';
import { singleElementMachine } from '../../Machine';
import { shadowStyle } from '../../Style';
import { thumbnailComponentStyle } from '../../Style';
import { colorWarning } from '../../Type';

@customElement('ember-nexus-default-thumbnail')
class EmberNexusDefaultThumbnail extends LitElement {
  static styles = [thumbnailComponentStyle, shadowStyle];

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
    return html`<div class="thumbnail-component shadow" style="${styleMap(backgroundStyle)}">
      <span class="name" style="${styleMap(textStyles)}"
        >${getFirstNameOrFirstLettersFromIdFromElementOrId(this.elementId, this._element)}</span
      >
      <span class="type" style="${styleMap(textStyles)}">${this._element?.type}</span>
    </div>`;
  }
}

export { EmberNexusDefaultThumbnail };
