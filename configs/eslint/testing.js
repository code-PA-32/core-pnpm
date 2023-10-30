require("@rushstack/eslint-patch/modern-module-resolution")
module.exports = {
  plugins: ["testing-library", "ui-testing"],
  overrides: [
    {
      extends: ["plugin:ui-testing/playwright", "plugin:testing-library/react"],
      files: ["**/__tests__/**/*", "**/*.{spec,test}.*"],
      env: {
        node: true,
        browser: true,
        commonjs: true,
        es2021: true,
      },
      rules: {
        "ui-testing/no-assertions-in-hooks": "error",
        "ui-testing/no-disabled-tests": "error",
        "ui-testing/no-focused-tests": "error",
        "ui-testing/no-css-page-layout-selector": ["error", "playwright"],
        "ui-testing/no-hard-wait": ["error", "playwright"],
      },
    },
  ],
}
