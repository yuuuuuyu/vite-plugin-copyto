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

