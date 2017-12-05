const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin= require('extract-text-webpack-plugin');
module.exports = {
  entry: {
    app: './src/index.js'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new ExtractTextPlugin("static/css/[name].[hash].css")
  ],
  output: {
    filename: 'static/js/[name].[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase:'src',
    historyApiFallback:true,
    hot:true,
    progress:true,
    open: true,
    port: 8082,
    stats:{
        chunks: false
    },
    // distoryApiFallback: true,
    inline: true,//不使用inline模式，inline模式一般用于单页面应用开发，会自动将socket注入页面代码中
    // proxy: {
    //   //
    // }
  },
  module: {
    rules: [
      {
        test:/\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test:/\.less$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!less-loader'
        })
      },
      {
        test:/\.js$/,
        exclude:/node_modules/,
        loader:'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.(htm|html)$/i,
        loader: 'html-withimg-loader'
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      },
      {
        test:/\.(png|jpg|gif|woff|woff2|ttf|eot|svg|swf)$/,
        loader: "url-loader",
        options: {
          limit: 8192,
          name: 'static/img/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader'
      }
    ]
  }
};