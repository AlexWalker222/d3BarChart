// @ts-nocheck
module.exports = {
  env: {
    node: true,
    es2015: true,
    es: true,
  },
  extends: "eslint:recommended",
  overrides: [
    {
      files: [".eslintrc.{js, cjs}"],
      parserOptions: {
        sourceType: "script.js",
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
  },
};
