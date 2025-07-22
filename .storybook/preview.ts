import type {Preview} from '@storybook/web-components';

import './style.css?style';
import './preview.css?style';
import {init as appPluginExperimentalInit} from '../dist/browser/index';
import {init as appCoreInit} from '@ember-nexus/app-core';
import {ApiConfiguration} from "@ember-nexus/app-core/Service";
import {withTheme} from "./withTheme.decorator";

const serviceResolver = appCoreInit(document.body);
(window as any).serviceResolver = serviceResolver;

const apiConfiguration = serviceResolver.getServiceOrFail<ApiConfiguration>(ApiConfiguration.identifier);
apiConfiguration.setApiHost('https://reference-dataset.ember-nexus.dev');
apiConfiguration.setToken('secret-token:PIPeJGUt7c00ENn8a5uDlc' as any);

appPluginExperimentalInit(serviceResolver);

const themeService = serviceResolver.getServiceOrFail('ember-nexus.app-plugin-experimental.service.theme-service');


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
    withTheme({
      themes: {
        light: 'light',
        dark: 'dark',
        emerald: 'emerald',
        dim: 'dim',
      },
      defaultTheme: 'light',
      themeService: themeService
    }),
  ],
};

export default preview;
