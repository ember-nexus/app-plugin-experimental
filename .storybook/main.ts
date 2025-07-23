import type { StorybookConfig } from '@storybook/web-components-vite';

// import projectWebpackConfig from '../webpack.config.cjs';

const config: StorybookConfig = {
  stories: ['../storybook/**/*.mdx', '../storybook/**/*.stories.ts'],
  staticDirs: [{ from: '../dist/', to: '/dist' }],
  addons: [
    '@storybook/addon-themes',
    '@storybook/addon-a11y',
    '@storybook/addon-docs'
  ],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  // webpackFinal: async (config) =>
  // {
  //   let rules = [...config.module.rules, ...projectWebpackConfig.module.rules];
  //   let filteredRules = [];
  //   for (let i = 0; i < rules.length; i++) {
  //     let rule = rules[i];
  //     if (!('test' in rule)){
  //       continue;
  //     }
  //     if (rule.test.toString().includes('css')) {
  //       continue;
  //     }
  //     filteredRules.push(rule);
  //   }
  //
  //   filteredRules.push({
  //     test: /\.css$/,
  //     oneOf: [
  //       {
  //         resourceQuery: /style/,
  //         use: [ 'style-loader', 'css-loader' ],
  //       },
  //       {
  //         type: 'asset/source',
  //       },
  //     ]
  //   });
  //
  //
  //
  //   return {
  //     ...config,
  //     module: { ...config.module, rules: filteredRules }
  //   }
  // },
};
export default config;
