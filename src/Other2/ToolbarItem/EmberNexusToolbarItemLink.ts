import { LitElement, TemplateResult, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ember-nexus-toolbar-item-link')
class EmberNexusToolbarItemLink extends LitElement {
  static styles = css`
    * {
      box-sizing: border-box;
    }

    .toolbar-item {
      min-width: 2rem;
      min-height: 2rem;
      padding: 0.25rem;
      border-radius: var(--toolbar-item-border-radius, 0.25rem);
      background-color: var(--toolbar-item-background-color, #fff);
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `;

  @property({ type: String })
  label?: string;

  @property({ type: String })
  link?: string;

  render(): TemplateResult {
    return html`<a class="toolbar-item" href="${this.link}">${this.label}</a>`;
  }
}

export { EmberNexusToolbarItemLink };
