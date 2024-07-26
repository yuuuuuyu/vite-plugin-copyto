import type { UserConfig } from "vite"
import fs from "fs-extra"
import { basename, join, resolve } from "path"
import shell from "shelljs"
import chalk from "chalk"
import ora from "ora"

import { PluginOptions } from "./types"

export default function VitePluginCopyto(options: PluginOptions) {
  const { source, dest, base = "./", root, hooks = {} } = options

  if (typeof source !== "string" && !Array.isArray(source)) {
    throw new Error(
      chalk.blue.bgRed.bold(
        "Invalid value for folder: must be a string or an array of strings."
      )
    )
  }
  const folders = typeof source === "string" ? [source] : source
  let outDir: string
  const spinner = ora()

  return {
    name: "vite-plugin-copyto",
    configResolved(config: UserConfig) {
      outDir = config.build?.outDir || "dist"
    },
    async closeBundle() {
      console.log(
        chalk.blue("\n[vite:copyto]"),
        chalk.green(`Start copying files from: [${folders}]`)
      )

      const targetDir: string = dest

      try {
        // 确保目标目录存在
        if (!fs.existsSync(targetDir)) {
          fs.mkdirSync(targetDir, { recursive: true })
        }

        // 获取项目名称
        const rootName = (root && basename(root)) || basename(process.cwd())

        // 进行复制操作
        folders.forEach(folder => {
          const sourcePath = join(".", base, folder)

          // 定义目标路径，根据 root 选项决定是否包含项目名称
          const targetPath = root
            ? join(targetDir, folder, rootName)
            : join(targetDir, folder)

          // 确保源目录存在
          if (fs.existsSync(sourcePath)) {
            // 创建目标目录
            fs.mkdirSync(targetPath, { recursive: true })
            // 复制文件，确保只复制目录中的内容而不创建额外的层级
            shell.cp("-r", join(sourcePath, "*"), targetPath)
            spinner.succeed(`Copied files from ${sourcePath} to ${targetPath}`)
            spinner.stop()
          } else {
            spinner.fail(`Source directory does not exist: ${sourcePath}`)
            spinner.stop()
          }
        })
      } catch (error: any) {
        spinner.fail("Copyto failed!") // 失败时更新 spinner 状态
        spinner.stop()
        console.log(chalk.red(`Error: ${error.message}`)) // 记录错误信息
      }
      console.log(
        chalk.blue("[vite:copyto]"),
        chalk.green("Completed successfully!\n")
      )
      if (hooks.closeBundle) {
        await hooks.closeBundle()
      }
    },
  }
}

