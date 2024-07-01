import { Node, Relation } from '@ember-nexus/web-sdk/Type/Definition';

import { initialsLength, nameMaxLength } from '../Type';

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

function getInitialsFromElementOrId(id: string, element: null | Node | Relation): string {
  const name = getNameFromElementOrId(id, element);
  const splitName = name.replace(/\s+/g, ' ').split(' ');
  if (splitName.length >= initialsLength) {
    return splitName
      .map((part) => part.substring(0, 1))
      .join('')
      .toUpperCase()
      .substring(0, initialsLength);
  }
  return name.toUpperCase().substring(0, initialsLength);
}

function getFirstNameOrFirstLettersFromIdFromElementOrId(id: string, element: null | Node | Relation): string {
  const name = element?.data?.name;
  if (!name) {
    return id.substring(0, 3).toUpperCase();
  }
  return String(name).replace(/\s+/g, ' ').split(' ')[0];
}

export { getNameFromElementOrId, getInitialsFromElementOrId, getFirstNameOrFirstLettersFromIdFromElementOrId };
