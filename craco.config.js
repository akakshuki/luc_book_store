const CracoLessPlugin = require('craco-less');
const aliyunTheme = require('@ant-design/aliyun-theme');
module.exports = {
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
