import { Rule, Ruleset } from '../Type/Definition/index.js';
import { ServiceIdentifier } from '../Type/Enum/index.js';

class PropertyExtractorService {
  static identifier: ServiceIdentifier = ServiceIdentifier.propertyExtractorService;
  constructor() {}

  static constructFromServiceResolver(): PropertyExtractorService {
    return new PropertyExtractorService();
  }

  extractPropertyFromData<T = string>(
    ruleset: Ruleset,
    data: Record<string, unknown>,
    typeValidatorFunction: (value: unknown) => boolean,
    fallback: undefined,
  ): T | typeof fallback {
    for (let i = 0; i < ruleset.length; i++) {
      let ruleResult: false | string = false;
      switch (ruleset[i].type) {
        case 'exact':
          ruleResult = this.exactRuleMatcher(ruleset[i], data);
          break;
        case 'fuzzy':
          ruleResult = this.fuzzyRuleMatcher(ruleset[i], data);
          break;
      }
      if (!ruleResult) continue;
      const ruleValue = data?.[ruleResult];
      if (typeValidatorFunction(ruleValue)) return ruleValue as T;
    }
    return fallback;
  }

  exactRuleMatcher(rule: Rule, data: Record<string, unknown>): false | string {
    if (rule.identifier in data) return rule.identifier;
    return false;
  }

  fuzzyRuleMatcher(_rule: Rule, _data: Record<string, unknown>): false | string {
    return false;
  }

  stringValidator(value: unknown): boolean {
    return typeof value === 'string';
  }

  extractTitleFromData(data: Record<string, unknown>): undefined | string {
    const ruleset: Ruleset = [
      {
        type: 'exact',
        identifier: 'title',
      },
      {
        type: 'exact',
        identifier: 'name',
      },
      {
        type: 'exact',
        identifier: 'label',
      },
      {
        type: 'exact',
        identifier: 'heading',
      },
      {
        type: 'exact',
        identifier: 'header',
      },
      {
        type: 'fuzzy',
        identifier: 'title',
      },
      {
        type: 'fuzzy',
        identifier: 'name',
      },
      {
        type: 'fuzzy',
        identifier: 'label',
      },
      {
        type: 'fuzzy',
        identifier: 'heading',
      },
      {
        type: 'fuzzy',
        identifier: 'header',
      },
    ];
    return this.extractPropertyFromData(ruleset, data, this.stringValidator, undefined);
  }

  extractDescriptionFromData(data: Record<string, unknown>): undefined | string {
    const ruleset: Ruleset = [
      {
        type: 'exact',
        identifier: 'description',
      },
      {
        type: 'exact',
        identifier: 'summary',
      },
      {
        type: 'exact',
        identifier: 'content',
      },
      {
        type: 'exact',
        identifier: 'text',
      },
      {
        type: 'exact',
        identifier: 'detail',
      },
      {
        type: 'exact',
        identifier: 'body',
      },
      {
        type: 'fuzzy',
        identifier: 'description',
      },
      {
        type: 'fuzzy',
        identifier: 'summary',
      },
      {
        type: 'fuzzy',
        identifier: 'content',
      },
      {
        type: 'fuzzy',
        identifier: 'text',
      },
      {
        type: 'fuzzy',
        identifier: 'detail',
      },
      {
        type: 'fuzzy',
        identifier: 'body',
      },
    ];
    return this.extractPropertyFromData(ruleset, data, this.stringValidator, undefined);
  }
}

export { PropertyExtractorService };
