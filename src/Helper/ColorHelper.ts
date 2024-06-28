import { Node, Relation } from '@ember-nexus/web-sdk/Type/Definition';
import ColorHash from 'color-hash';

function getColorFromElementOrId(id: string, element: null | Node | Relation): string {
  const color = element?.data?.color;
  if (color) {
    return String(color);
  }

  const type = element?.type;
  if (type) {
    return new ColorHash().hex(type);
  }

  return new ColorHash().hex(id);
}

export { getColorFromElementOrId };
