// @ts-check
import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://bluenex.dev",

  integrations: [
    mdx(),
    sitemap(),
    react(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],

  vite: {
    plugins: [/** @type {any} */ (tailwindcss())],
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  },
});
