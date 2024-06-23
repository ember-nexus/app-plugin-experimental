import {LitElement, html} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';

import {Node, Relation, validateUuidFromString} from "@ember-nexus/web-sdk/Type/Definition";
import {GetElementEvent} from "@ember-nexus/web-sdk/BrowserEvent/Element";
import {ActionArgs, Actor, createActor} from "xstate";
import {
  singleElementMachine
} from "../../Machine";
import {Uuid} from "@ember-nexus/web-sdk/dist/types/Type/Definition";


@customElement('ember-nexus-default-icon')
class EmberNexusDefaultIcon extends LitElement {

  @property({type: String})
  id: string;

  @state()
  protected _element: null | Node | Relation = null;
  protected _error: null | string = null;

  protected actor: Actor<typeof singleElementMachine>;

  constructor() {
    super();
    this.actor = createActor(singleElementMachine, {
      input: {
        elementId: '7b80b203-2b82-40f5-accd-c7089fe6114e' as Uuid,
        htmlElement: global.window.document.getElementById('event-root')!
      }
    });
    this.actor.start();
  }

  disconnectedCallback() {
    this.actor.stop();
    super.disconnectedCallback();
  }

  startLoadingElement(context: ActionArgs<ElementContext, any, any>) {
    const elementId = context.context.id;
    if (elementId == null) {
      throw "No Id.";
    }
    const loadElementEvent = new GetElementEvent(elementId);
    this.dispatchEvent(loadElementEvent);
    loadElementEvent.getElement()
      ?.then(
        (element: Node | Relation) => {
          this.actor.send({
            type: 'ELEMENT_LOADED',
            element: element
          } as ElementLoadedEvent);
        }
      )
      .catch((error) => {
        this.actor.send({
          type: 'ERROR',
          error: error.message
        } as ErrorEvent);
      });
    this.actor.send({
      type: 'ELEMENT_LOADING_STARTED'
    });
  }

  startLoadingStart(context: ActionArgs<ElementContext, any, any>) {
    console.log("trying to load start node");
    if (
      !Object.prototype.hasOwnProperty.call(context.context.element, 'start') ||
      !Object.prototype.hasOwnProperty.call(context.context.element, 'end')
    ) {
      return;
    }
    const element = context.context.element as Relation;
    const loadElementEvent = new GetElementEvent(element.start);
    this.dispatchEvent(loadElementEvent);
    loadElementEvent.getElement()
      ?.then(
        (start: Node | Relation) => {
          if (
            Object.prototype.hasOwnProperty.call(start, 'start') &&
            Object.prototype.hasOwnProperty.call(start, 'end')
          ) {
            throw new Error("Start node can not be a relation.");
          }
          this.actor.send({
            type: 'START_LOADED',
            element: start as Node
          } as StartLoadedEvent);
        }
      )
      .catch((error) => {
        this.actor.send({
          type: 'ERROR',
          error: error.message
        } as ErrorEvent);
      });
    this.actor.send({
      type: 'START_LOADING_STARTED'
    });
  }

  startLoadingEnd(context: ActionArgs<ElementContext, any, any>) {
    if (
      !Object.prototype.hasOwnProperty.call(context.context.element, 'start') ||
      !Object.prototype.hasOwnProperty.call(context.context.element, 'end')
    ) {
      return;
    }
    const element = context.context.element as Relation;
    const loadElementEvent = new GetElementEvent(element.end);
    this.dispatchEvent(loadElementEvent);
    loadElementEvent.getElement()
      ?.then(
        (end: Node | Relation) => {
          if (
            Object.prototype.hasOwnProperty.call(end, 'start') &&
            Object.prototype.hasOwnProperty.call(end, 'end')
          ) {
            throw new Error("End node can not be a relation.");
          }
          this.actor.send({
            type: 'END_LOADED',
            element: end as Node
          } as EndLoadedEvent);
        }
      )
      .catch((error) => {
        this.actor.send({
          type: 'ERROR',
          error: error.message
        } as ErrorEvent);
      });
    this.actor.send({
      type: 'END_LOADING_STARTED'
    });
  }

  firstUpdated() {
    setTimeout(function(){}, 500);
    this.loadData();
  }

  updated(changedProperties) {
    if (changedProperties.has('id')) {
      this.loadData();
    }
  }

  loadData() {
    const event = new GetElementEvent(
      validateUuidFromString(this.id)
    );
    this.dispatchEvent(event);

    event.getElement()?.then((element) => {
      this._element = element ?? null;
      this.requestUpdate('_element');
    })
  }

  render(){
    return html`
      <div style="border: 1px solid black; padding 1em; border-radius: 5px;">
        <p>id: ${this.id}</p>
        <p>Element name: ${this._element?.data?.name ?? 'no name found'}</p>
      </div>`;
  }
}

export {EmberNexusDefaultIcon};
