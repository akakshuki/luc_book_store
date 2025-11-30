const CracoLessPlugin = require('craco-less');
const aliyunTheme = require('@ant-design/aliyun-theme');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Filter out LESS deprecation warnings
      const originalWarn = console.warn;
      console.warn = function(msg) {
        if (typeof msg === 'string' && (msg.includes('DEPRECATED WARNING') || msg.includes('<w>'))) {
          return;
        }
        originalWarn.apply(console, arguments);
      };
      
      return webpackConfig;
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              ...aliyunTheme,
              '@primary-color': '#210535',
              '@link-color': '#210535',
              '@link-active-color': '#210535',
              '@link-hover-color': '#210535',
              '@link-focus-outline': '#210535',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
