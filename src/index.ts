import type { UserConfig } from "vite"
import fs from "fs"
import { basename, join } from "path"
import shell from "shelljs"
import chalk from "chalk"
import ora from "ora"

import { PluginOptions } from "./types"

export default function copyToBeeboatPlusPlugin(options: PluginOptions) {
  const { source, dest, usePackageName = false } = options

  if (typeof source !== "string" && !Array.isArray(source)) {
    throw new Error(
      chalk.blue.bgRed.bold(
        "Invalid value for folder: must be a string or an array of strings."
      )
    )
  }
  const folders = typeof source === "string" ? [source] : source
  let outDir: string

  return {
    name: "vite-plugin-copyto",
    enforce: "post",
    configResolved(config: UserConfig) {
      outDir = config.build?.outDir || "dist"
    },
    writeBundle() {
      const targetDir: string = dest

      // 确保目标目录存在
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true })
      }

      // 当前子包的名称
      const packageName = basename(process.cwd())

      // 进行复制操作
      folders.forEach(folder => {
        const sourcePath = join(process.cwd(), ".", folder)

        // 定义目标路径，根据 usePackageName 选项决定是否包含子包名称
        const targetPath = usePackageName
          ? join(targetDir, packageName)
          : targetDir

        // 确保源目录存在
        if (fs.existsSync(sourcePath)) {
          // 创建目标目录
          fs.mkdirSync(targetPath, { recursive: true })
          // 复制文件，确保只复制目录中的内容而不创建额外的层级
          shell.cp("-r", join(sourcePath, "*"), targetPath)
          console.log(`Copied files from ${sourcePath} to ${targetPath}`)
        } else {
          console.warn(`Source directory does not exist: ${sourcePath}`)
        }
      })
    },
  }
}

