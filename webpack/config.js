const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";

module.exports = {
  entry: path.resolve(__dirname, "../client/index.js"),
  output: {
    filename: "js/[name].[contenthash].js",
    chunkFilename: "js/chunks/[name].[contenthash].js",
    path: path.resolve(__dirname, "../dist"),
    clean: true,
    publicPath: ""
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          "thread-loader",
          {
            loader: "babel-loader",
            options: {
              configFile: false,
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: ["@babel/plugin-transform-runtime"]
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "../client/public/index.html")
    })
  ],
  resolve: {
    extensions: [".js", ".jsx"],
    symlinks: false
  },
  devtool: isDev ? "eval-cheap-module-source-map" : false,
  optimization: {
    splitChunks: isDev
      ? false
      : {
          chunks: "all",
          name: "vendors"
        }
  },
  mode: isDev ? "development" : "production"
};
