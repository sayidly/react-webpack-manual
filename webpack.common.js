// webpack.common.js
const path = require('path');
const webpack = require('webpack');  // 这个插件不需要安装，是基于webpack的，需要引入webpack模块
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 引入HtmlWebpackPlugin插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //引入分离插件

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: path.join(__dirname, "./src/index.js"), // 入口文件
  output: {
    path: path.join(__dirname, "/dist"), // 打包后的文件存放的地方
    filename: "bundle.js", // 打包后输出文件的文件名
    chunkFilename: devMode ? '[id].js' : '[id].[hash].js'
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
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.(sa|sc)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
        exclude: /node_modules/,
        sideEffects: true,
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
  stats: {
    // One of the two if I remember right
    entrypoints: false,
    children: false
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  plugins: [
    new webpack.BannerPlugin('版权所有，翻版必究'),  // new一个插件的实例
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "/src/index.html")// new一个这个插件的实例，并传入相关的参数
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
    new webpack.HotModuleReplacementPlugin(), // 热更新插件
  ]
}
