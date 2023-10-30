require("@core/eslint-configs/patch")

module.exports = {
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  extends: ["../../configs/eslint/index.js"],
}
