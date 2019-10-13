const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  optimization: {
    // We no not want to minimize our code.
    minimize: false
  },
  context: path.join(__dirname, 'src'),
  entry: `webpack-hot-middleware/client?reload=true&overlay=$true`,
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' },
      {
        test: /\.(png|jpg|svg)$/,
        use: [
          {
            loader: 'file-loader'
            // options: {}
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CopyPlugin([{ from: 'static/img', to: 'images' }])
  ],
  // resolve: {
  //   alias: {
  //     'react-dom': '@hot-loader/react-dom'
  //   },
  //   modules: ['src', 'node_modules'],
  //   descriptionFiles: ['package.json'],
  //   extensions: ['.js', '.jsx', '.json', '.scss']
  // },
  node: {
    fs: 'empty',
    vm: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
