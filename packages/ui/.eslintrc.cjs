require("@core/eslint-configs/patch.js")

module.exports = {
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  extends: ["./node_modules/@core/eslint-configs"],
}
