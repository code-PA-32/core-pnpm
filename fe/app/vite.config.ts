import react from "@vitejs/plugin-react-swc"
import * as path from "path"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
/* eslint-disable import/no-default-export */
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
        rewrite: (aPath) => aPath.replace(/^\/api/, ""),
      },
    },
  },
  resolve: {
    alias: {
      "#": path.resolve(__dirname, "./src"),
    },
  },
})
