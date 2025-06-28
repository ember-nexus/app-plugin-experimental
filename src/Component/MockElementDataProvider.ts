import { LitElement, TemplateResult, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ember-nexus-mock-element-data-provider')
class EmberNexusMockElementDataProvider extends LitElement {
  @property({ type: String, attribute: 'element-id' })
  elementId: string;

  @property({ type: String, attribute: 'element-data' })
  elementData: string;

  constructor() {
    super();
  }

  handleGetElementEvent(event: any): void {
    if (event.getElementId() != this.elementId) {
      return;
    }
    const elementRawData = JSON.parse(this.elementData);
    elementRawData['id'] = this.elementId;
    event.setElement(elementRawData);
    event.stopPropagation();
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('ember-nexus-sdk-get-element', this.handleGetElementEvent);
  }

  disconnectedCallback(): void {
    this.removeEventListener('ember-nexus-sdk-get-element', this.handleGetElementEvent);
    super.disconnectedCallback();
  }

  render(): TemplateResult {
    return html`<slot></slot>`;
  }
}

export { EmberNexusMockElementDataProvider };
