import { defineConfig } from "vite"
import path from "path"
import dts from "vite-plugin-dts"

// 测试插件
import vitePluginCopyto from "./src/index"

import { nodePolyfills } from "vite-plugin-node-polyfills"

export default defineConfig({
  plugins: [
    dts({
      entryRoot: "src",
      outputDir: "dist/types",
      tsConfigFilePath: "./tsconfig.json",
    }),
    nodePolyfills(),

    vitePluginCopyto({
      source: ["dist"],
      dest: "dist-copy",
      usePackageName: false,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "VitePluginCopyto",
      fileName: format => `vite-plugin-copyto.${format}.js`,
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

