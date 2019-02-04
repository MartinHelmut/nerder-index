"use strict";

module.exports = {
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module"
  },
  env: {
    node: true,
    browser: true,
    jest: true
  }
};
