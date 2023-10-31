// @ts-nocheck
import { webpack, require, module, __dirname } from "webpack";

new webpack.optimize.CommonsChunkPlugin({
  name: "webpack",
  filename: __dirname,
});

const path = require("path");
export const entry = "/index.html";
export const output = {
  filename: "app.js",
  path: __dirname + "/dist",
  devtool: "source-map",
};
export const devtools = "source-map";
