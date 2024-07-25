import { defineConfig } from "vite"
import path from "path"
import dts from "vite-plugin-dts"

// 测试插件
// import vitePluginClean from "./src/index"

import { nodePolyfills } from "vite-plugin-node-polyfills"

export default defineConfig({
  plugins: [
    // vitePluginClean({
    //   folder: ["dist", "dist-types"],
    // }),
    dts({
      entryRoot: "src",
      outputDir: "dist/types",
      tsConfigFilePath: "./tsconfig.json",
    }),
    nodePolyfills(),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "TemplateVitePlugin",
      fileName: format => `template-vite-plugin.${format}.js`,
    },
    rollupOptions: {
      external: ["fs-extra", "ora", "chalk"],
      output: {
        globals: {
          "fs-extra": "fs-extra",
          ora: "ora",
          chalk: "chalk",
        },
        exports: "named",
      },
    },
  },
})

