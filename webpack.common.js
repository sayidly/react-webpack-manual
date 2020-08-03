// webpack.common.js
const path = require('path');
const webpack = require('webpack');  // 这个插件不需要安装，是基于webpack的，需要引入webpack模块
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 引入HtmlWebpackPlugin插件

module.exports = {
  entry: path.join(__dirname, "./src/index.js"), // 入口文件
  output: {
    path: path.join(__dirname, "/dist"), // 打包后的文件存放的地方 
    publicPath: "/dist/",
    filename: "bundle.js" // 打包后输出文件的文件名
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(scss|sass)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          //{ loader: 'file-loader' },
          {
            loader: 'url-loader',
            options: {
              limit: 1000,
              outputPath: 'images',
            }
          }
        ],
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  plugins: [
    new webpack.BannerPlugin('版权所有，翻版必究'),  // new一个插件的实例 
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "/src/index.html")// new一个这个插件的实例，并传入相关的参数
    }),
    new webpack.HotModuleReplacementPlugin(), // 热更新插件 
  ]
}

