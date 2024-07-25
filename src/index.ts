import { Plugin } from "vite"
import path from "path"
import chalk from "chalk"
import ora from "ora"

import { PluginOptions } from "./types"
import { log } from "./utils"

export default function vitePluginClean(options: PluginOptions = {}): Plugin {
  let spinner = ora()
  return {
    name: "template-vite-plugin",
    enforce: "pre",
    buildStart() {},
    closeBundle() {},
  }
}

