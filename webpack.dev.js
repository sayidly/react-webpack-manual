// webpack.dev.js
const path = require('path');
const { merge } = require('webpack-merge');  // 引入webpack-merge功能模块
const common = require('./webpack.common.js'); // 引入webpack.common.js

const openBrowser = require('react-dev-utils/openBrowser'); // 引入自动刷新 tab

module.exports = merge(common, {   // 将webpack.common.js合并到当前文件
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    hot: true,
    port: '8080',
    inline: true,
    open: false,
    overlay: true,
    clientLogLevel: "silent",
    after: () => { openBrowser("http://localhost:8080"); },
  },
})

