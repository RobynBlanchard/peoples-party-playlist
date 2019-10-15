const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  // context: path.join(__dirname, 'src'),
  entry: [
    'webpack-hot-middleware/client?reload=true&overlay=$true',
    './src/client.js'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader' },
      {
        test: /\.(png|jpg|svg)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CopyPlugin([{ from: './src/static/img', to: 'images' }])
  ],
  // resolve: {
  //   alias: {
  //     'react-dom': '@hot-loader/react-dom'
  //   }
  // },
  node: {
    fs: 'empty',
    vm: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
