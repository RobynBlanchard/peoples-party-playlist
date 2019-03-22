const path = require('path');
// var dotenv = require('dotenv').config({path: __dirname + '/.env'});
// var webpack = require('webpack');

const dev = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: dev ? 'development' : 'production',
  context: path.join(__dirname, 'src'),
  // devtool: dev ? "none" : "source-map",
  entry: {
    app: './client.js'
  },
  resolve: {
    modules: [path.resolve('./src'), 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'url?limit=8192',
            'img'
        ]
    },
      // {
      //   test: /\.(png|svg|jpg|gif)$/,
      //   use: ['file-loader']
      // }
      // {
      //   test: /\.(png|jpg|svg)$/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         emitFile: false,
      //         name: '[name].[ext]',
      //         outputPath: 'img/',
      //       },
      //     },
      //   ],
      // },
      // {
      //   test: /\.(jpe?g|png|gif|svg)$/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //       }
      //     },
      //     {
      //       loader: 'image-webpack-loader',
      //       options: {}
      //     },
      //     {
      //       loader: "url-loader",
      //       options: {}
      //     }
      //   ]
      // }
    ]
  },
  // plugins: [
  //     new webpack.DefinePlugin({
  //         "process.env": dotenv.parsed // TODO: Fix
  //     }),
  // ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
    // publicPath: './'
  }
};
