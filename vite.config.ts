import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/@visx") || id.includes("node_modules/d3-")) return "charts";
          if (id.includes("node_modules/motion")) return "motion";
          if (id.includes("node_modules/react")) return "react";
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "src": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
