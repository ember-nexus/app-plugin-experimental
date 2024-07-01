import { Node, Relation, Uuid } from '@ember-nexus/web-sdk/Type/Definition';
import { LitElement, TemplateResult, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { Actor, createActor } from 'xstate';

import { getTitleFromElementOrId } from '../../Helper';
import { singleElementMachine } from '../../Machine';
import { inlineTextComponentStyle } from '../../Style';

@customElement('ember-nexus-default-inline-text')
class EmberNexusDefaultInlineText extends LitElement {
  static styles = [inlineTextComponentStyle];

  @property({ type: String, attribute: 'element-id' })
  elementId: string;

  @state()
  protected _element: null | Node | Relation = null;

  @state()
  protected _error: null | string = null;

  protected actor: Actor<typeof singleElementMachine>;

  constructor() {
    super();
  }

  setupActorSubscription(): void {
    this.actor.subscribe((snapshot) => {
      this._element = snapshot.context.element;
      this._error = snapshot.context.error;
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
    return html`<span class="inline-text-component">
      <slot name="prefix"></slot>
      ${getTitleFromElementOrId(this.elementId, this._element)}
      <slot name="suffix"></slot>
    </span>`;
  }
}

export { EmberNexusDefaultInlineText };
