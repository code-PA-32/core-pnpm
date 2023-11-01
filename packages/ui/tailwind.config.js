/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["src/**/*.{js,ts,jsx,tsx}", ".storybook/preview.tsx"],
  presets: [require("./node_modules/@core/tailwind-configs/tailwind.config.js")],
}
