const CracoLessPlugin = require('craco-less');
const aliyunTheme = require('@ant-design/aliyun-theme');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Configure webpack's infrastructure logging to filter LESS warnings
      if (!webpackConfig.infrastructureLogging) {
        webpackConfig.infrastructureLogging = {};
      }
      
      // Store original console methods
      const originalConsoleLog = console.log;
      
      // Override console.log to filter LESS deprecation warnings
      console.log = function(...args) {
        const message = args.join(' ');
        // Filter out LESS deprecation warnings from antd
        if (message.includes('DEPRECATED WARNING') && message.includes('.less')) {
          return;
        }
        if (message.includes('<w>') && message.includes('deprecated')) {
          return;
        }
        originalConsoleLog.apply(console, args);
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
