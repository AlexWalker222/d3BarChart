// @ts-nocheck
// @vite.config.js
import * as vite from "vite";



export default vite.defineConfig({
  build: {
    packages: "const webpack = require('webpack');",
  },
});
