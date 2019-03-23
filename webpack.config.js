const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const dev = process.env.NODE_ENV !== "production";

module.exports = {
  mode: dev ? "development" : "production",
  context: path.join(__dirname, "src"),
  entry: {
    app: "./client.js"
  },
  resolve: {
    modules: [path.resolve("./src"), "node_modules"]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader"
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: "file-loader"
        }
      }
    ]
  },
  plugins: [new CopyPlugin([{ from: "static/img", to: "images" }])],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js"
  }
};
