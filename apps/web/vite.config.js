import { defineConfig } from "vite";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/orinoco/",
  css: {
    modules: {
      generateScopedName: "[local]",
    },
  },
  resolve: {
    alias: {
      "@api": resolve(__dirname, "src/api"),
      "@components": resolve(__dirname, "src/components"),
      "@fonts": resolve(__dirname, "src/fonts"),
      "@images": resolve(__dirname, "src/images"),
      "@styles": resolve(__dirname, "src/styles"),
      "@utils": resolve(__dirname, "src/utils"),
    },
  },
});