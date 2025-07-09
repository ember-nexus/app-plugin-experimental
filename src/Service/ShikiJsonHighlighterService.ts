import { ServiceIdentifier } from '../Type/Enum/index.js';
import themeCatppuccinLatte from '@shikijs/themes/catppuccin-latte';
import languageJson from '@shikijs/langs/json';
import { createHighlighterCore} from 'shiki/core';
import { createOnigurumaEngine} from 'shiki/engine/oniguruma';
import {HighlighterCore} from "shiki";
import {ServiceResolver} from "@ember-nexus/app-core/Service";

class ShikiJsonHighlighterService {
  static identifier: ServiceIdentifier = ServiceIdentifier.shikiJsonHighlighterService;

  private highlighterPromise: HighlighterCore;

  constructor() {}

  static constructFromServiceResolver(_serviceResolver: ServiceResolver): ShikiJsonHighlighterService {
    return new ShikiJsonHighlighterService();
  }

  async getShikiHighlighter(): Promise<HighlighterCore> {
    if (this.highlighterPromise) {
      return this.highlighterPromise
    }
    this.highlighterPromise = await createHighlighterCore({
      themes: [
        themeCatppuccinLatte,
      ],
      langs: [
        languageJson
      ],
      engine: createOnigurumaEngine(import('shiki/wasm'))
    });
    return this.highlighterPromise;
  }

}

export { ShikiJsonHighlighterService };
