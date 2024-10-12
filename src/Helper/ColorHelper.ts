import { Node, Relation } from '@ember-nexus/web-sdk/Type/Definition';
import ColorHash from 'color-hash';

function getColorFromElement(element: null | Node | Relation): string | null {
  const color = element?.data?.color;
  if (color) {
    return String(color);
  }
  return null;
}

function getColorFromType(type: null | string): string | null {
  if (type === null) {
    return null;
  }
  return new ColorHash().hex(type);
}

function getColorFromId(id: string): string {
  return new ColorHash().hex(id);
}

function getColorFromElementOrId(id: string, element: null | Node | Relation): string {
  return getColorFromElement(element) ?? getColorFromType(element?.type ?? null) ?? getColorFromId(id);
}

export { getColorFromElementOrId, getColorFromElement, getColorFromType, getColorFromId };
