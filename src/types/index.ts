export type PluginOptions = {
  source: string | string[]
  dest: string
  usePackageName?: boolean
  hooks?: {
    buildStart?: () => void | Promise<void>
    closeBundle?: () => void | Promise<void>
  }
}

