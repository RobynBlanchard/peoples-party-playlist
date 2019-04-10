const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const nodeExternals = require('webpack-node-externals');

const dev = process.env.NODE_ENV !== "production";

const clientConfig = {
  mode: dev ? "development" : "production",
  context: path.join(__dirname, "src"),
  entry: './client.js',
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name].bundle.js"
  },
  module: { rules: [ { test: /\.(js)$/, use: 'babel-loader' }, {
    test: /\.(jpg|png|gif)$/,
    use: {
      loader: "file-loader"
    }
  }]},  plugins: [new CopyPlugin([{ from: "static/img", to: "images" }])],
};

const serverConfig = {
  mode: dev ? "development" : "production",
  entry: './src/server.js',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'server.js',
    publicPath: '/',
  },
  module: { rules: [ { test: /\.(js)$/, use: 'babel-loader' }, {
              test: /\.(jpg|png|gif)$/,
              use: {
                loader: "file-loader"
              }
            }]},
  // plugins: [
  //   new webpack.DefinePlugin({
  //     __isBrowser__: 'false',
  //   }),
  // ],
};

module.exports = [clientConfig, serverConfig];