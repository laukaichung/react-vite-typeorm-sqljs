import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

export default defineConfig(async () => {
  return {
    server: {
      port: 3001,
    },
    build: {
      commonjsOptions: { include: [] },
    },
    plugins: [
      wasm(),
      topLevelAwait(),
      react({
        babel: {
          parserOpts: {
            plugins: ["decorators-legacy", "classProperties"],
          },
        },
        // Use React plugin in all *.jsx and *.tsx files
        include: "**/*.{jsx,tsx}",
      }),
    ],
    // resolve: {
    //   alias: {
    //     typeorm: "/node_modules/typeorm/typeorm-model-shim",
    //   },
    // },
    define: {
      "process.env": {},
    },
  };
});
