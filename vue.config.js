module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/streets-pdx/' : '/',
  chainWebpack: (config) => {
    config.module
      .rule('mdx')
      .test(/\.mdx?$/)
      .use('babel-loader')
      .loader('babel-loader')
      .options({ plugins: ['@vue/babel-plugin-jsx'] })
      .end()
      .use('@mdx-js/loader')
      .loader('@mdx-js/loader')
      .options({ jsx: true })
      .end();
  },
};
