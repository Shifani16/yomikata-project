import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "zlibjs/bin/gunzip.min.js": path.resolve(
        __dirname,
        "src/shims/zlib-gunzip.ts",
      ),
      path: "path-browserify",
    },
  },
  // server: {
  //   proxy: {
  //     "/jisho": {
  //       target: "https://jisho.org",
  //       changeOrigin: true,
  //       rewrite: (p) => p.replace(/^\/jisho/, "/api/v1/search/words"),
  //     }
  //   },
  // },
});
