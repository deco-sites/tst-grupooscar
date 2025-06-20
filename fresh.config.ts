import { defineConfig } from "$fresh/server.ts";
import { plugins } from "deco/plugins/deco.ts";
import manifest from "./manifest.gen.ts";

export default defineConfig({
  render: (ctx, render) => {
    ctx.lang = "pt-BR";
    render();
  },
  plugins: plugins({
    manifest,
    // deno-lint-ignore no-explicit-any
    
  }),
});
