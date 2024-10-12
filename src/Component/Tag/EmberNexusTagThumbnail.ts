import { Node, Relation, Uuid } from '@ember-nexus/web-sdk/Type/Definition';
import { LitElement, TemplateResult, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { Actor, createActor } from 'xstate';

import { getColorFromElementOrId } from '../../Helper/ColorHelper.js';
import {
  findBestFontWeightColor,
  getNameFromElementOrId,
  getNameOrFirstLettersFromIdFromElementOrId,
} from '../../Helper/index.js';
import { singleElementMachine } from '../../Machine/index.js';
import { fontStyle, shadowStyle } from '../../Style/index.js';
import { thumbnailComponentStyle } from '../../Style/index.js';
import { colorWarning } from '../../Type/index.js';

@customElement('ember-nexus-tag-thumbnail')
class EmberNexusTagThumbnail extends LitElement {
  static styles = [thumbnailComponentStyle, shadowStyle, fontStyle];

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

    const primaryText = getNameOrFirstLettersFromIdFromElementOrId(this.elementId, this._element);
    const primaryTextTitle = getNameFromElementOrId(this.elementId, this._element);
    let secondaryText = this.actor.getSnapshot().value as string;
    let secondaryTextTitle = this.actor.getSnapshot().value as string;

    if ((this.actor.getSnapshot().value as string) === 'Loaded') {
      secondaryText = this._element?.type ?? '';
      secondaryTextTitle = this._element?.type ?? '';
    }

    if ((this.actor.getSnapshot().value as string) === 'Error') {
      secondaryText = 'Error';
      secondaryTextTitle = this._error ?? '';
    }

    return html`<div class="thumbnail-component shadow" style="${styleMap(backgroundStyle)}">
      <span class="name font-sans" style="${styleMap(textStyles)}" title="${primaryTextTitle}"> ${primaryText} </span>
      <span class="type font-sans" style="${styleMap(textStyles)}" title="${secondaryTextTitle}">
        ${secondaryText}
      </span>
    </div>`;
  }
}

export { EmberNexusTagThumbnail };
