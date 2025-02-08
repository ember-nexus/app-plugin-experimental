import { LitElement, TemplateResult, html, css } from 'lit';
import {customElement, property} from 'lit/decorators.js';


@customElement('ember-nexus-toolbar-item')
class EmberNexusToolbarItem extends LitElement {

  static styles = css`
    * {
      box-sizing: border-box;
    }

    .toolbar-item {
      min-width: 1rem;
      min-height: 1rem;
      padding: 0.5rem;
      border-radius: 0.25rem;
      background-color: #F0F0F4;
      border: 2px solid transparent;
    }
  `;

  @property({type: String})
  color?: string;

  @property({type: String})
  label?: string;

  render(): TemplateResult {
    let color = '#f0f0f4';
    if (this.color) {
      color = this.color;
    }
    return html`<div class="toolbar-item" style="border-color: ${color};">
      ${this.label}
    </div>`;
  }
}

export { EmberNexusToolbarItem };
