const rendererWebpack = require('../webpack.config.js').find(config => config.name === 'renderer');

module.exports = {
  "stories": [
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      ...rendererWebpack.resolve.alias
    };
    config.resolve.extensions.push(".ts", ".tsx");
    return config;
  }
}
