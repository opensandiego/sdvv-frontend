import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  // Required
  framework: '@storybook/angular',
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../projects/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  // Optional
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-addon-angular-router',
    'storybook-addon-apollo-client',
  ],
  core: {
    disableTelemetry: true,
  },
  staticDirs: ['../src/assets'],
  docs: {},
};

export default config;
