import { Node, Relation, Uuid } from '@ember-nexus/web-sdk/Type/Definition';
import { LitElement, TemplateResult, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { Actor, createActor } from 'xstate';

import { findBestFontWeightColor, getInitialsFromElementOrId, getTitleFromElementOrId } from '../../Helper';
import { getColorFromElementOrId } from '../../Helper/ColorHelper';
import { singleElementMachine } from '../../Machine';
import { fontStyle, framelessComponentStyle } from '../../Style';
import { colorWarning } from '../../Type';

@customElement('ember-nexus-default-frameless')
class EmberNexusDefaultFrameless extends LitElement {
  static styles = [framelessComponentStyle, fontStyle];

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
    let content: TemplateResult;
    let title: string;
    if (this._error == null) {
      content = html`<span style="${styleMap(textStyles)}">
        ${getInitialsFromElementOrId(this.elementId, this._element)}
      </span>`;
      title = getTitleFromElementOrId(this.elementId, this._element);
    } else {
      content = html`<div class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16" />
        </svg>
      </div>`;
      title = this._error;
    }
    return html`<div class="frameless-component font-sans" style="${styleMap(backgroundStyle)}" title="${title}">
      ${content}
    </div>`;
  }
}

export { EmberNexusDefaultFrameless };
