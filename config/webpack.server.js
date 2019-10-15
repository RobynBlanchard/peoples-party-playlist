const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  target : 'node',
  entry: {
    server: './server'
  },
  output: {
    filename: '[name]-production.js',
    path: path.resolve(__dirname, '../'),
    publicPath: '/'
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      // Process JS with Babel.
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
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
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json']
  },
  node: {
    fs: 'empty',
    net: 'empty',
    module: 'empty',
    os: 'empty'
  }
};
