const path = require("path");

export const entry = "./src/app.js";
export const output = {
  filename: "app.js",
  path: __dirname + "/build",
  devtool: "source-map",
};
export const devtool = "source-map";
export const mode = "production";

module.exports = {
  entry,
  output,
  devtool,
  mode,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, "app")],
        exclude: [path.resolve(__dirname, "node_modules")],
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/env",
              {
                targets: {
                  browsers: ["last 2 microsoft-edge", "last 2 chrome versions"],
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
