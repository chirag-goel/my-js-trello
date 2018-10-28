/*jshint esversion: 6 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BUILD_DIR = path.resolve(__dirname, 'build');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: BUILD_DIR,
    filename: 'index.js',
  },
  watch: true,
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new CopyWebpackPlugin([{
        from: './src/assets/css/index.css',
        to: `${BUILD_DIR}/css/index.css`
    },{
        from: './src/assets/img/cross.png',
        to: `${BUILD_DIR}/img/cross.png`
    },]),
    new HtmlWebpackPlugin({
      title: 'Trello',
      filename: 'index.html',
      template: './src/index.html',
      files: {
        js: ['index.js'],
    },
    })
  ],
};