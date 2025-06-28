import { Constructor } from '../Type/Definition/index.js';

/* eslint @typescript-eslint/no-explicit-any: "off" */
function withDescription(description: string): <TBase extends Constructor>(Base: TBase) => any {
  return function <TBase extends Constructor>(Base: TBase): any {
    return class extends Base {
      description = description;
    };
  };
}

export { withDescription };
