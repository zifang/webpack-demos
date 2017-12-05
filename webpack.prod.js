const webpack = require('webpack');
const merge = require('webpack-merge');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const common = require('./webpack.common.js');
module.exports = merge(common, {
	devtool: 'source-map',
  plugins: [
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      // hash: true,
      minify: {
      	removeComments: true,
      	collapseWhitespace: true
      }
    }),
    new CopyWebpackPlugin([
        { from: './src/json', to: 'json' },
    ]),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
          //supresses warnings, usually from module minification
          warnings: false,
          drop_console: true
      },
      comments: false,
    })
  ]
});