import { GetElementEvent } from '@ember-nexus/web-sdk/BrowserEvent/Element';
import { validateUuidFromString } from '@ember-nexus/web-sdk/Type/Definition';
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('ember-nexus-test')
class Test extends LitElement {
  @property({ type: String })
  id: string;

  @state()
  protected _elementName = '-';

  firstUpdated() {
    setTimeout(function () {}, 500);
    this.loadData();
  }

  updated(changedProperties) {
    if (changedProperties.has('id')) {
      this.loadData();
    }
  }

  loadData() {
    // const event = new EmberNexus.BrowserEvent.Element.GetElementEvent(
    //   EmberNexus.Type.Definition.validateUuidFromString(this.id)
    // );
    // console.log(EmberNexus.Type.Definition.validateUuidFromString("not an uuid"));

    const event = new GetElementEvent(validateUuidFromString(this.id));
    console.log(validateUuidFromString('not an uuid'));

    this.dispatchEvent(event);

    console.log('load data is executed :D');
    console.log(this.id);
    console.log('--------------------');

    event.getElement()?.then((element) => {
      this._elementName = (element.data?.name as string) ?? 'no name';
      this.requestUpdate('_elementName');
    });
  }

  render() {
    return html`<div style="border: 1px solid black; padding 1em; border-radius: 5px;">
      <p>id: ${this.id}</p>
      <p>Element name: ${this._elementName}</p>
    </div>`;
  }
}

export { Test };
