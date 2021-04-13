const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: ['./src/index.js'],
  plugins: [
    new HtmlWebpackPlugin({ title: 'Example' })
  ],
  devServer: {
    hot: true
  },
  module: {
    rules : [
      {
        test: /\.txt$/i,
        use: [
          '@davidrios/hot-reloader',
          'raw-loader'
        ]
      }
    ]
  }
};

module.exports = config;