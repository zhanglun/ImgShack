var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var SRC_PATH = path.resolve(ROOT_PATH, 'src');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

// 前端代码
var RESOURCE_SRC_PATH = path.resolve(SRC_PATH, 'resource');
var RESOURCE_BUILD_PATH = path.resolve(BUILD_PATH, 'resource');


module.exports = {
  entry: {
    'app': RESOURCE_SRC_PATH + '/index.js',
  },
  output: {
    path: RESOURCE_BUILD_PATH,
    filename: './[name].bundle.js'
  },

  resolve: {
    root: path.resolve(__dirname),
    alias: {
      // sweetalert: 'node_modules/sweetalert/lib/sweetalert.js',
      // sweetalertcss: 'node_modules/sweetalert/dist/sweetalert.css',
    },
    extensions: ['', '.js', '.css']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: [
          path.resolve(__dirname, "node_modules"),
        ],
        loader: "babel-loader",
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-runtime'],
        },
        include: [RESOURCE_SRC_PATH, SRC_PATH],
      },
      {
        test: /.less$/,
        loader: 'style!css!less',
        include: [RESOURCE_SRC_PATH],
      },
      {
        test: /.css$/,
        loader: 'style!css',
      }
    ],
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
  },
  externals: {
    'electron': 'require("electron")',
    'net': 'require("net")',
    'remote': 'require("remote")',
    'shell': 'require("shell")',
    'app': 'require("bin")',
    'ipc': 'require("ipc")',
    'fs': 'require("fs")',
    'buffer': 'require("buffer")',
    'system': '{}',
    'file': '{}'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
      }
    }),
    new HtmlWebpackPlugin({
      template: RESOURCE_SRC_PATH + '/index.html',
      filename: RESOURCE_BUILD_PATH + '/index.html',
    }),
  ],
};