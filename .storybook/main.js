module.exports = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
    "../projects/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-addon-angular-router",
    "@storybook/addon-mdx-gfm"
  ],
  "framework": {
    name: "@storybook/angular",
    options: {}
  },
  "core": {
    "disableTelemetry": true
  },
  "staticDirs": ['../src/assets'],
  docs: {}
};