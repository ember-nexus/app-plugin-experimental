import type { StorybookConfig } from '@storybook/web-components-webpack5';

import projectWebpackConfig from '../webpack.config.cjs';

const config: StorybookConfig = {
  stories: ['../storybook/**/*.mdx', '../storybook/**/*.stories.ts'],
  addons: [
    '@storybook/addon-webpack5-compiler-swc',
    '@storybook/addon-essentials',
    '@storybook/addon-themes',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/web-components-webpack5',
    options: {},
  },
  webpackFinal: async (config) =>
  {
    let rules = [...config.module.rules, ...projectWebpackConfig.module.rules];
    let filteredRules = [];
    for (let i = 0; i < rules.length; i++) {
      let rule = rules[i];
      if (!('test' in rule)){
        continue;
      }
      if (rule.test.toString().includes('css')) {
        continue;
      }
      filteredRules.push(rule);
    }

    filteredRules.push({
      test: /\.css$/,
      oneOf: [
        {
          resourceQuery: /style/,
          use: [ 'style-loader', 'css-loader' ],
        },
        {
          type: 'asset/source',
        },
      ]
    });



    return {
      ...config,
      module: { ...config.module, rules: filteredRules }
    }
  },
};
export default config;
