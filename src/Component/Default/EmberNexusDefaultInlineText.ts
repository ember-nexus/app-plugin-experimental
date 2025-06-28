import { Node, Relation, Uuid } from '@ember-nexus/app-core/Type/Definition';
import { LitElement, TemplateResult, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { Actor, createActor } from 'xstate';

import { getNameOrFirstLettersFromIdFromElementOrId, getTitleFromElementOrId } from '../../Helper/index.js';
import { singleElementMachine } from '../../Machine/index.js';
import { inlineTextComponentStyle } from '../../Style/index.js';

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
    let content: string;
    switch (this.actor.getSnapshot().value) {
      case 'Loaded':
        content = getTitleFromElementOrId(this.elementId, this._element);
        break;
      case 'Error':
        content = '[' + this._error + ']';
        break;
      default:
        content = getNameOrFirstLettersFromIdFromElementOrId(this.elementId, this._element);
    }
    return html`<span class="inline-text-component">
      <slot name="prefix"></slot>
      ${content}
      <slot name="suffix"></slot>
    </span>`;
  }
}

export { EmberNexusDefaultInlineText };
