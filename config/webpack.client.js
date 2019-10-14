const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
// import ImageminPlugin from 'imagemin-webpack-plugin'
var ImageminPlugin = require('imagemin-webpack-plugin').default;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    main: './src/client.js',
    // homePage: './src/templates/Homepage'
  },
  output: {
    path: path.resolve(__dirname, '../public'),
    // TODO:
    // filename: '[name].[contenthash:8].js',
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
  // https://medium.com/hackernoon/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        cache: true,
        parallel: true
      })
      // new OptimizeCSSAssetsPlugin({}),
    ],
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace('@', '')}`;
          }
        }
      }
      // chunks: 'all',
      // cacheGroups: {
      //   vendor: {
      //     name: 'vendors',
      //     test: /[\\/]node_modules[\\/]/,
      //     chunks: 'initial',
      //     enforce: true,
      //   },
      // },
    }
  },
  plugins: [
    new ManifestPlugin(),
    new CopyPlugin([{ from: './src/static/img', to: 'images' }]),
    new ImageminPlugin()
  ]
};

// externals
