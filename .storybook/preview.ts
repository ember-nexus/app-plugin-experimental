import type { Preview, WebComponentsRenderer } from '@storybook/web-components';
import { withThemeByClassName } from '@storybook/addon-themes';

import * as tmp from '../dist/browser/index';
console.log(tmp);


import * as EmberNexus from '@ember-nexus/web-sdk';
import './style.css?style';
import './preview.css?style';
import {init} from '@ember-nexus/app-core';

const WebSdkConfiguration = EmberNexus.Service.WebSdkConfiguration;
const container = EmberNexus.Container;
container.get(WebSdkConfiguration).setApiHost('https://reference-dataset.ember-nexus.dev');
container.get(WebSdkConfiguration).setToken('secret-token:PIPeJGUt7c00ENn8a5uDlc' as EmberNexus.Type.Definition.Token);
container.get(EmberNexus.BrowserEvent.BrowserEventHandler).addBrowserEventListeners(document.body as HTMLElement);
console.log(document.body);

const serviceResolver = init(document.body);
(window as any).serviceResolver = serviceResolver;

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
  },
  decorators: [
    withThemeByClassName<WebComponentsRenderer>({
      themes: {
        light: '',
        dark: 'dark',
        'high contrast': 'high-contrast'
      },
      defaultTheme: 'light',
    }),
  ],
};

export default preview;
