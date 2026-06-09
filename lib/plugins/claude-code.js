import { join } from 'node:path'
import { mkdirp, copyDir, copyFile, fileExists, getPackageDir } from '../utils.js'

export async function installPlugin(platform) {
  const pluginSource = join(getPackageDir(), 'plugins', 'claude-code')
  const pluginDest = platform.pluginDir

  mkdirp(pluginDest)
  copyDir(pluginSource, pluginDest)

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
