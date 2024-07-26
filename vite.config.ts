import { defineConfig } from "vite"
import path from "path"
import dts from "vite-plugin-dts"
import { basename, join, resolve, dirname } from "path"
import { nodePolyfills } from "vite-plugin-node-polyfills"

// 测试插件
import vitePluginCopyto from "./src/index"

export default defineConfig({
  plugins: [
    dts({
      entryRoot: "src",
      outputDir: "dist/types",
      tsConfigFilePath: "./tsconfig.json",
    }),
    nodePolyfills(),
    vitePluginCopyto({
      base: "dist",
      source: "./",
      dest: "dist-copy",
      root: path.resolve(__dirname),
      enforce: "post",
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "VitePluginCopyto",
      fileName: format => `vite-plugin-copyto.${format}.js`,
    },
    rollupOptions: {
      external: ["fs-extra", "ora", "chalk", "shelljs"],
      output: {
        globals: {
          "fs-extra": "fs-extra",
          ora: "ora",
          chalk: "chalk",
          shelljs: "shelljs",
        },
        exports: "named",
      },
    },
  },
})

