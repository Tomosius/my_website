// tailwind.config.ts
import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import palette from "tailwindcss-palette-generator";

export default {
  content: [
    "./src/**/*.{svelte,ts,js}",
    "./src/**/*.css",
    "./static/**/*.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    forms,
    typography,
    palette({
      pec_dark: "#2c2c54",
      pec_med: "#1f1f3d",
      pec_light: "#1a1a33",
      glowtop: "rgba(139, 92, 246, 0.18)",
      glowside: "rgba(79, 70, 229, 0.12)",
      accent: "#8b5cf6",
      accentsoft: "#a78bfa",
    }),
  ],
} satisfies Config;
