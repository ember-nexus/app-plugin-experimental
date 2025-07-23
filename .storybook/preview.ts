import type {Preview} from '@storybook/web-components-vite';

import './style.css?style';
import './preview.css?style';

import {init as appPluginExperimentalInit} from '../dist/browser/index.js';
// import * as appPluginExperimental from '../dist/browser/index.js';
// console.log(appPluginExperimental);

// import appPluginExperimental = require('../dist/browser/index.js');
// console.log(appPluginExperimental);
//
// const appPluginExperimentalInit = appPluginExperimental.init;


// import {init as appPluginExperimentalInit} from '../dist/browser/index';


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
const languageService = serviceResolver.getServiceOrFail('ember-nexus.app-plugin-experimental.service.language-service');


const globalTypes = {
  locale: {
    name: "Language",
    defaultValue: "en",
    toolbar: {
      icon: "globe",
      items: [
        // default language
        { value: "en", right: "EN", title: "English" },

        // core languages
        { value: "de", right: "DE", title: "German" },
        { value: "no", right: "NO", title: "Norwegian" },
        { value: "ko", right: "KO", title: "Korean" },

        // additional languages
        { value: "ar", right: "AR", title: "Arabic" },
        { value: "zh-CN", right: "ZH-CN", title: "Chinese" },
        { value: "fr", right: "FR", title: "French" },
        { value: "hi", right: "HI", title: "Hindi" },
        { value: "it", right: "IT", title: "Italian" },
        { value: "ja", right: "JA", title: "Japanese" },
        { value: "ru", right: "RU", title: "Russian" },
        { value: "es", right: "ES", title: "Spanish" },
        { value: "sw", right: "SW", title: "Swahili" },
      ],
      title: "Language",
      dynamicTitle: true
    }
  }
};

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
    (story, context) => {
      const { locale } = context.globals;
      // @ts-ignore
      languageService.applyLanguage(locale);
      return story();
    }
  ],
};
export {globalTypes};
export default preview;
