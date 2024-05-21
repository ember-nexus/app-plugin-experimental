import {LitElement, html} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
// import {GetElementEvent} from "@ember-nexus/web-sdk/dist/BrowserEvent/Element/GetElementEvent";
// import {Node} from "@ember-nexus/web-sdk/src/Type/Definition/Node";
// import {Relation} from "@ember-nexus/web-sdk/src/Type/Definition/Relation";
import * as EmberNexus from "@ember-nexus/web-sdk/dist/ember-nexus-web-sdk";

@customElement('ember-nexus-test')
class Test extends LitElement {

  @property({type: String})
  id: string;

  @state()
  protected _elementName = '-';

  firstUpdated() {
    setTimeout(function(){}, 300);
    this.loadData();
  }

  updated(changedProperties) {
    if (changedProperties.has('id')) {
      this.loadData();
    }
  }

  loadData() {
    const event = new EmberNexus.BrowserEvent.Element.GetElementEvent(this.id);
    this.dispatchEvent(event);

    console.log("load data is executed :D");
    console.log(this.id);
    console.log("--------------------");

    event.getElement()?.then((element) => {
      this._elementName = element.data?.name ?? 'no name';
      this.requestUpdate('_elementName');
    })
  }

  render(){
    return html`<div style="border: 1px solid black; padding 1em; border-radius: 5px;"><p>id: ${this.id}</p><p>Element name: ${this._elementName}</p></div>`;
  }
}

export {Test};
