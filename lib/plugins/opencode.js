import { join } from 'node:path'
import { mkdirp, copyFile, fileExists, getPackageDir } from '../utils.js'

export async function installPlugin(platform) {
  const pluginSource = join(getPackageDir(), 'plugins', 'opencode', 'topkit.js')
  const pluginDest = join(platform.pluginDir, 'topkit.js')

  mkdirp(platform.pluginDir)
  copyFile(pluginSource, pluginDest)

  return { success: true, path: pluginDest }
}

export async function uninstallPlugin(platform) {
  const pluginFile = join(platform.pluginDir, 'topkit.js')

  if (fileExists(pluginFile)) {
    const { unlinkSync } = await import('node:fs')
    unlinkSync(pluginFile)
  }

  return { success: true }
}
