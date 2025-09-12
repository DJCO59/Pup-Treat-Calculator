import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const API_BASE = process.env.VITE_API_BASE_URL ?? "";

export default defineConfig({
  plugins: [react()],
  define: {
    __API_BASE__: JSON.stringify(API_BASE),
  },
});

