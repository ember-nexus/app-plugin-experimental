import {Constructor} from "../Type/Definition";

function withDescription(description: string) {
  return function <TBase extends Constructor>(Base: TBase) {
    return class extends Base {
      description = description;
    };
  };
}

export {withDescription};
