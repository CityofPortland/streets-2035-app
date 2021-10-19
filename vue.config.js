module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/streets-2035/' : '',
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
