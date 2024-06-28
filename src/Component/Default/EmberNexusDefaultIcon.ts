import {LitElement, html} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import ColorHash from 'color-hash';

import {Node, Relation, Uuid} from "@ember-nexus/web-sdk/Type/Definition";
import {Actor, createActor} from "xstate";
import {
  singleElementMachine
} from "../../Machine";
import {shadowStyle} from "../../Style";
import {iconComponentStyle} from "../../Style";
import {findBestTextColorWeightPair} from "../../Helper";
import {styleMap} from 'lit/directives/style-map.js';


@customElement('ember-nexus-default-icon')
class EmberNexusDefaultIcon extends LitElement {

  static styles = [
    iconComponentStyle,
    shadowStyle
  ];

  @property({type: String})
  id: string;

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

  connectedCallback() {
    super.connectedCallback();
    this.actor = createActor(singleElementMachine, {
      input: {
        elementId: this.id as Uuid,
        htmlElement: this.renderRoot
      }
    });

    this.actor.subscribe((snapshot) => {
      this._element = snapshot.context.element;
      this._error = snapshot.context.error;
      switch (snapshot.value) {
        case 'Loaded':
          this._color = (new ColorHash()).hex((this._element?.type) as string ?? this.id);
          break;
        case 'Error':
          this._color = '#f00';
          break;
        default:
          this._color = '#000';
      }
      this.requestUpdate();
    });

    this.actor.start();
  }

  disconnectedCallback() {
    this.actor.stop();
    super.disconnectedCallback();
  }

  render(){
    const textOptions = findBestTextColorWeightPair(this._color, ['#000', '#fff'], [400, 500, 600, 700]);

    const backgroundStyle = {
      backgroundColor: this._color
    };
    const textStyles = {
      fontWeight: textOptions.textWeight,
      color: textOptions.textColor
    };
    return html`
      <div class="icon-component shadow" style="${styleMap(backgroundStyle)}" title="${this._element?.data?.name ?? this.id} (${this._element?.type ?? 'unknown'})">
        <span style="${styleMap(textStyles)}">${String(this._element?.data?.name ?? this.id).substring(0, 2)}</span>
        ${this._error !== null ? html`<span>Error</span>` : null}
      </div>`;
  }
}

export {EmberNexusDefaultIcon};
