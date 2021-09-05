module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.mdx$/,
          use: [
            {
              loader: 'babel-loader',
              options: { plugins: ['@vue/babel-plugin-jsx'] },
            },
            {
              loader: 'xdm/webpack.cjs',
              options: { jsx: true },
            },
          ],
        },
      ],
    },
  },
};
