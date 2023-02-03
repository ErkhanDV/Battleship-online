import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: "http://localhost:5173/",
  },
  plugins: [react(), svgr()],
});
