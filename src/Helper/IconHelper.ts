import { Node, Relation } from '@ember-nexus/app-core/Type/Definition';
import { TemplateResult, html } from 'lit';

function getIconForElement(element: Node | Relation): TemplateResult {
  if (Object.hasOwn(element, 'start') && Object.hasOwn(element, 'end')) {
    // element is relation

    // arrow right / edge icon
    return html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M14 16.94V12.94H5.08L5.05 10.93H14V6.94L19 11.94Z" />
    </svg>`;
  }
  // element is node

  // circle / node icon
  return html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path
      d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
    />
  </svg>`;
}

export { getIconForElement };
