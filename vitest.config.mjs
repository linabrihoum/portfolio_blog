import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  // This project writes JSX in .js files (like Next.js allows), so parse them as JSX
  oxc: {
    include: /\.js$/,
    exclude: /node_modules/,
    lang: "jsx",
    jsx: { runtime: "automatic" },
  },
  resolve: {
    // Same "@/" alias as jsconfig.json, so tests import files the way the app does
    alias: [{ find: /^@\//, replacement: fileURLToPath(new URL("./", import.meta.url)) }],
  },
});
