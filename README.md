# Introduce
用于构建后复制构建产物到指定目录的vite插件。

## Features
- 支持指定多个目录
- 支持在构建前执行自定义操作
- 支持在构建结束执行自定义操作

## Install
```bash
pnpm install vite-plugin-copyto -D
```

## Usage
```js
import { defineConfig } from 'vite'
import VitePluginCopyto from 'vite-plugin-copyto'

export default defineConfig({
  plugins: [
    VitePluginCopyto({
        root: resolve(__dirname),
        base: 'dist',
        source: ['es', 'lib', 'types'],
        dest: '../beeboat-plus',
    }),
  ]
})
```

## Options

```js
export type PluginOptions = {
  source: string | string[]
  dest: string
  base?: string
  root?: string
  hooks?: {
    buildStart?: () => void | Promise<void>
    closeBundle?: () => void | Promise<void>
  }
}
```
### root
非必须字段，指定插件运行时的根目录，默认为`vite.config.js`所在目录。获取了根目录文件夹名称，复制到指定目录时，会保留文件夹名称。

### base
非必须字段，默认值`dist`，如果项目内自定义了构建的输出目录，比如指定了`outDir`，那么需要指定`base`字段。
### source
基于`base`目录，复制`base`下的文件夹到`dest`目录。

注意：目前不支持通配符复制。
### dest
指定复制到的目标目录。
### hooks
自定义的钩子函数，在指定事件触发时执行。

目前支持的钩子函数：
- buildStart
- closeBundle

## Example
```js
export default defineConfig({
  plugins: [
    VitePluginCopyto({
        root: resolve(__dirname), // or '../xxxxx'
        base: 'dist',
        source: ['es', 'lib', 'types'], // or 'es'
        dest: '../beeboat-plus',
    }),
  ]
})
```