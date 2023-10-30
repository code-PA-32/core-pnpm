require("@core/eslint-configs/patch.js")

module.exports = {
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  extends: ["../../configs/eslint/index.js"],
}
