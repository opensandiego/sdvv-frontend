module.exports = {
  "stories": ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)", "../projects/**/*.stories.@(js|jsx|ts|tsx)"],
  "addons": ["@storybook/addon-links", "@storybook/addon-essentials", "storybook-addon-angular-router"],
  "framework": {
    name: "@storybook/angular",
    options: {}
  },
  "core": {
    "disableTelemetry": true
  },
  "staticDirs": ['../src/assets'],
  docs: {
    autodocs: true
  }
};