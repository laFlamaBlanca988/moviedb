import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: "/src",
      assets: "/src/assets",
      components: "/src/components",
      hooks: "/src/hooks",
      pages: "/src/pages",
      layouts: "/src/layouts",
      contexts: "/src/contexts",
      services: "/src/services",
      types: "/src/types",
      config: "/src/config",
    },
  },
});
