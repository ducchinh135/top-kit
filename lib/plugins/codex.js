import { join } from 'node:path'
import { mkdirp, copyFile, fileExists, getPackageDir } from '../utils.js'

export async function installPlugin(platform) {
  const pluginSource = join(getPackageDir(), 'plugins', 'codex', 'plugin.json')
  const pluginDest = join(platform.pluginDir, 'plugin.json')

  mkdirp(platform.pluginDir)
  copyFile(pluginSource, pluginDest)

  return { success: true, path: pluginDest }
}

export async function uninstallPlugin(platform) {
  const pluginDir = platform.pluginDir

  if (fileExists(pluginDir)) {
    const { rmSync } = await import('node:fs')
    rmSync(pluginDir, { recursive: true, force: true })
  }

  return { success: true }
}
