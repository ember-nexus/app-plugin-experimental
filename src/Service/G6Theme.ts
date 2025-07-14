import { ExtensionCategory, register } from '@antv/g6';
import { light } from '@antv/g6/esm/themes';

import { ServiceIdentifier } from '../Type/Enum/index.js';

class G6ThemeService {
  static identifier: ServiceIdentifier = ServiceIdentifier.g6ThemeService;
  constructor() {
    this.registerTheme();
  }

  static constructFromServiceResolver(): G6ThemeService {
    return new G6ThemeService();
  }

  registerTheme(): void {
    const theme = {
      ...light,
      background: '#eff1f5',
    };
    console.log(theme);
    register(ExtensionCategory.THEME, 'ember-nexus-light', theme);
  }
}

export { G6ThemeService };
