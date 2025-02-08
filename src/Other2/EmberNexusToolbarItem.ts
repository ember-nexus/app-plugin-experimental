import { LitElement, TemplateResult, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ember-nexus-toolbar-item2')
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
      background-color: #fff;
    }
  `;

  @property({ type: String })
  label?: string;

  render(): TemplateResult {
    return html`<div class="toolbar-item">${this.label}</div>`;
  }
}

export { EmberNexusToolbarItem };
