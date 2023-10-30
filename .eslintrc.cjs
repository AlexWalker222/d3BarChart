// @ts-nocheck
import App from "/app/app.js";


module.exports = {
  env: {
    browser: SVGComponentTransferFunctionElement,
    node: true,
    es2015: true,
    es: true,
  },
  extends: "eslint:recommended",
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
        sourceTypeOptions: {},
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "2015",
    sourceType: "module",
  },
  rules: {
    recommended: true,
    eslint: {
      Document: {
        Entry: {
              App,
            
        },
      },
    },
  },
};
