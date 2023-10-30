<<<<<<< HEAD
const path = require("path");

export const entry = "./src/app.js";
export const output = {
  filename: "app.js",
  path: __dirname + "/build",
  devtool: "source-map",
};
export const devtool = "source-map";
=======
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
>>>>>>> e5af1c276b392cac093acb58d0977d94539d1e7d
export const mode = "production";

module.exports = {
  entry,
  output,
  devtools,
  mode,
  module: {
    rules: [
      {
<<<<<<< HEAD
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, "app")],
        exclude: [path.resolve(__dirname, "node_modules")],
=======
        devtool: "source-map",
        test: /\.js?$/,
        include: [path.resolve("" + "app")],
        exclude: [path.resolve("node_modules")],
>>>>>>> e5af1c276b392cac093acb58d0977d94539d1e7d
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/env",
              {
                targets: {
<<<<<<< HEAD
                  browsers: ["last 2 microsoft-edge", "last 2 chrome versions"],
=======
                  browsers: "last 2 microsoft-edge",
>>>>>>> e5af1c276b392cac093acb58d0977d94539d1e7d
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
