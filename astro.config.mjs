import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://tiagolauer.dev",
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      theme: "github-dark-dimmed",
    },
  },
});
