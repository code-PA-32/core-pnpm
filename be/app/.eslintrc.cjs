require("@core/eslint-configs/patch")

module.exports = {
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    tsconfigRootDir: __dirname,
  },
  extends: ["../../configs/eslint/index.js"],
}
