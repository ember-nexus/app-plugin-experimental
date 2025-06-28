import { Node, Relation, Uuid } from '@ember-nexus/app-core/Type/Definition';
import { LitElement, TemplateResult, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { Actor, createActor } from 'xstate';

import {
  findBestFontWeightColor,
  getColorFromElement,
  getColorFromElementOrId,
  getNameFromElementOrId,
  getNameOrFirstLettersFromIdFromElementOrId,
} from '../../Helper';
import { singleElementMachine } from '../../Machine';
import { fontStyle, pillComponentStyle, shadowStyle } from '../../Style';
import { colorWarning } from '../../Type';

@customElement('ember-nexus-default-pill')
class EmberNexusDefaultPill extends LitElement {
  static styles = [pillComponentStyle, shadowStyle, fontStyle];

  @property({ type: String, attribute: 'element-id' })
  elementId: string;

  @state()
  protected _element: null | Node | Relation = null;

  @state()
  protected _error: null | string = null;

  @state()
  protected _borderColor: string = '#000';

  @state()
  protected _backgroundColor: string = '#fff';

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
          this._borderColor = getColorFromElementOrId(this.elementId, this._element);
          this._backgroundColor = getColorFromElement(this._element) ?? '#fff';
          break;
        case 'Error':
          this._borderColor = colorWarning;
          this._backgroundColor = colorWarning;
          break;
        default:
          this._borderColor = '#000';
          this._backgroundColor = '#fff';
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
    let content: string;
    let icon: TemplateResult | null = null;
    if (this._error == null) {
      if (this.actor.getSnapshot().value !== 'Loaded') {
        content = getNameOrFirstLettersFromIdFromElementOrId(this.elementId, this._element);
      } else {
        content = getNameFromElementOrId(this.elementId, this._element);
      }
    } else {
      content = 'Error';
      icon = html`<div class="svg-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16" />
        </svg>
      </div>`;
    }
    const colorStyle = {
      backgroundColor: this._backgroundColor,
      borderColor: this._borderColor,
    };
    const textStyles = findBestFontWeightColor(this._backgroundColor, ['#000', '#fff'], [400, 500, 600, 700]);

    return html`<div class="pill-component shadow ${icon ? 'has-icon' : ''}" style="${styleMap(colorStyle)}">
      ${icon}
      <span class="content font-sans" style="${styleMap(textStyles)}">${content}</span>
    </div>`;
  }
}

export { EmberNexusDefaultPill };
