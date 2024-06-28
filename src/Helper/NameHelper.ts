import { Node, Relation } from '@ember-nexus/web-sdk/Type/Definition';

import { nameMaxLength, shortNameLength } from '../Type';

function getNameFromElementOrId(id: string, element: null | Node | Relation): string {
  const name = element?.data?.name;
  if (!name) {
    return id;
  }
  return String(name)
    .trimStart()
    .substring(0, nameMaxLength + 1)
    .trimEnd();
}

function getShortNameFromElementOrId(id: string, element: null | Node | Relation): string {
  const name = getNameFromElementOrId(id, element);
  const splitName = name.replace(/\s+/g, ' ').split(' ');
  if (splitName.length >= shortNameLength) {
    return splitName
      .map((part) => part.substring(0, 1))
      .join('')
      .toUpperCase()
      .substring(0, shortNameLength);
  }
  return name.toUpperCase().substring(0, shortNameLength);
}

export { getNameFromElementOrId, getShortNameFromElementOrId };
