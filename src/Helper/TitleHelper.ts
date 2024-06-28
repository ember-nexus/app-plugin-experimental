import { Node, Relation } from '@ember-nexus/web-sdk/Type/Definition';

import { getNameFromElementOrId } from './NameHelper';
import { titleTypeMaxLength } from '../Type';

function getTitleFromElementOrId(id: string, element: null | Node | Relation): string {
  const name = getNameFromElementOrId(id, element);

  let type = element?.type;
  if (!type) {
    type = 'unknown';
  }
  type = type.substring(0, titleTypeMaxLength);

  return `${name} (${type})`;
}

export { getTitleFromElementOrId };
