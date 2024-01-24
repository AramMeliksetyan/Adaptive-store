import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      layout: path.resolve(__dirname, "./src/layout"),
      shared: path.resolve(__dirname, "./src/shared"),
      pages: path.resolve(__dirname, "./src/pages"),
      routes: path.resolve(__dirname, "./src/routes"),
      store: path.resolve(__dirname, "./src/store"),
      resources: path.resolve(__dirname, "./src/resources"),
      assets: path.resolve(__dirname, "./src/assets"),
    },
  },
  plugins: [react()],
});
