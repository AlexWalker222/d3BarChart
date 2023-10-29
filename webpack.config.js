// @ts-nocheck
import { webpack, require, module, __dirname } from "webpack";

new webpack.optimize.CommonsChunkPlugin({
  name: "wp",
  filename: "file.min.js",
});
const path = require("path");
export const entry = "/index.html";
export const output = {
  filename: "app.js",
  path: __dirname + "/dist",
  devtool: "source-map",
};
export const devtools = "source-map";
export const mode = "production";

module.exports = {
  entry,
  output,
  devtools,
  mode,
  module: {
    rules: [
      {
        devtool: "source-map",
        test: /\.js?$/,
        include: [path.resolve("" + "app")],
        exclude: [path.resolve("node_modules")],
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/env",
              {
                targets: {
                  browsers: "last 2 microsoft-edge",
                },
              },
            ],
          ],
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".json"],
  },
};
