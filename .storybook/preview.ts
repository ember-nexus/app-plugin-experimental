import type {Preview, WebComponentsRenderer} from '@storybook/web-components';
import {withThemeByClassName} from '@storybook/addon-themes';

import './style.css?style';
import './preview.css?style';
import {init as appPluginExperimentalInit} from '../dist/browser/index';
import {init as appCoreInit} from '@ember-nexus/app-core';
import {ApiConfiguration} from "@ember-nexus/app-core/Service";

const serviceResolver = appCoreInit(document.body);
(window as any).serviceResolver = serviceResolver;

const apiConfiguration = serviceResolver.getServiceOrFail<ApiConfiguration>(ApiConfiguration.identifier);
apiConfiguration.setApiHost('https://reference-dataset.ember-nexus.dev');
apiConfiguration.setToken('secret-token:PIPeJGUt7c00ENn8a5uDlc' as any);

appPluginExperimentalInit(serviceResolver);

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
        return a.id === b.id ? 0 : a.id.localeCompare(b.id, undefined, {numeric: true});
      }
    },
    layout: 'centered',
  },
  decorators: [
    withThemeByClassName<WebComponentsRenderer>({
      themes: {
        light: 'light',
        dark: 'dark',
        'high contrast': 'high-contrast'
      },
      defaultTheme: 'light',
    }),
  ],
};

export default preview;
