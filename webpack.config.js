const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: './client.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
    ]
  },
  plugins: [new CopyPlugin([{ from: 'static/img', to: 'images' }])]
};
