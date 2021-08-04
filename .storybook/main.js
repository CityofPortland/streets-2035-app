const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-a11y", "@storybook/addon-links", "@storybook/addon-essentials", {
    name: '@storybook/addon-postcss',
    options: {
      postcssLoaderOptions: {
        implementation: require('postcss'),
        postcssOptions: {
          plugins: [
            require('postcss-import'),
            require('postcss-url'),
            require('postcss-nested'),
            require('tailwindcss'),
            require('autoprefixer'),
          ],
        }
      },
    },
  },],
  webpackFinal: async (config, { configType }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, "../src")
    }

    config.module.rules.push({
      resourceQuery: /blockType=i18n/,
      type: 'javascript/auto',
      use: [
        {
          loader: '@intlify/vue-i18n-loader'
        }
      ]
    })

    return config;
  }
};