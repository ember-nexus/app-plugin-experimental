import type { Preview, WebComponentsRenderer } from '@storybook/web-components';
import { withThemeByClassName } from '@storybook/addon-themes';

import * as tmp from '../dist/browser/index';
console.log(tmp);


import * as EmberNexus from '@ember-nexus/web-sdk';
import './style.css?style';
import './preview.css?style';

const WebSdkConfiguration = EmberNexus.Service.WebSdkConfiguration;
const container = EmberNexus.Container;
container.get(WebSdkConfiguration).setApiHost('https://reference-dataset.ember-nexus.dev');
container.get(WebSdkConfiguration).setToken('secret-token:PIPeJGUt7c00ENn8a5uDlc' as EmberNexus.Type.Definition.Token);
container.get(EmberNexus.BrowserEvent.BrowserEventHandler).addBrowserEventListeners(document.body as HTMLElement);
console.log(document.body);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: (a, b) => {
        return a.id === b.id ? 0 : a.id.localeCompare(b.id, undefined, { numeric: true });
      }
    },
    layout: 'centered',
    backgrounds: {
      values: [
        { name: 'Light', value: '#FBFBFE' },
        { name: 'Dark', value: '#1A1A1A' },
        { name: 'Menu', value: '#F0F0F4' },
      ],
      default: 'Light',
    },
  },
  decorators: [
    withThemeByClassName<WebComponentsRenderer>({
      themes: {
        light: 'light',
        dark: 'dark',
        'high contrast': 'high-contrast',
        forest: 'forest',
        sand: 'sand'
      },
      defaultTheme: 'light',
    }),
  ],
};

export default preview;
