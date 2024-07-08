import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["index.ts"],
  minify: true,
  target: "node18",
  clean: true,
  bundle: true,
  external: ["esbuild", "esbuild-plugin-swc", "html-minifier", "font-min"],
});
