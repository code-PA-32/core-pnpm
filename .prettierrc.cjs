module.exports = {
  singleQuote: false,
  semi: false,
  trailingComma: "all",
  printWidth: 90,
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: false,
  plugins: [
    require.resolve("prettier-plugin-tailwindcss"),
    require.resolve("prettier-plugin-sql"),
  ],
  tailwindFunctions: ["clsx", "cva", "cn"],
  language: "mysql"
}
