// vite.config.ts
import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig(() => {
  return {
    plugins: [
      tailwindcss(),
      sveltekit(),
      ...(process.env.VISUALIZE
        ? [
            visualizer({
              filename: "build/stats.html",
              open: true,
              gzipSize: true,
              brotliSize: true,
            }),
          ]
        : []),
    ],
  };
});
