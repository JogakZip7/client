import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/client/",
  plugins: [react()]
  // server: {
  //   port: 3000,
  //   proxy: {
  //     "/api": { 
  //       target: "http://localhost:3000/",
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ''),
  //     },
  //   },
  // },
});
