const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

// const DEVELOPMENT = process.env.NODE_ENV === 'development';
// const PRODUCTION = process.env.NODE_ENV === 'production';
// console.log('DEVELOPMENT', DEVELOPMENT)

const env = process.env.NODE_ENV
console.log(env)

module.exports = {
  mode: 'development',
  optimization: {
    // We no not want to minimize our code.
    minimize: false
  },
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
            options: {}
          }
        ]
      }
    ]
  },
  plugins: [
    new CopyPlugin([{ from: 'static/img', to: 'images' }]),
    // new webpack.DefinePlugin({
    //   // 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    //   // 'proccess.env.DEVELOPMENT': JSON.stringify(DEVELOPMENT),
    //   // 'proccess.env.PRODUCTION': JSON.stringify(PRODUCTION),
    //   // 'DUCTION': JSON.stringify(DEVELOPMENT)
    //   'process.env': {
    //     NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    //   },

    // })
  ]
};
