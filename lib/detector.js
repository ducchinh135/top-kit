import { join } from 'node:path'
import { dirExists, commandExists, getHomeDir, fileExists, exec } from './utils.js'

const PLATFORMS = {
  'claude-code': {
    name: 'Claude Code',
    configDir: () => join(getHomeDir(), '.claude'),
    command: 'claude',
    pluginDir: () => join(getHomeDir(), '.claude', 'plugins', 'topkit'),
    hooksDir: () => join(getHomeDir(), '.claude', 'plugins', 'topkit', 'hooks'),
    skillsDir: () => join(getHomeDir(), '.claude', 'skills'),
  },
  'opencode': {
    name: 'OpenCode',
    configDir: () => join(getHomeDir(), '.config', 'opencode'),
    command: 'opencode',
    pluginDir: () => join(getHomeDir(), '.config', 'opencode', 'plugins'),
    skillsDir: () => join(getHomeDir(), '.config', 'opencode', 'skills'),
  },
  'cursor': {
    name: 'Cursor',
    configDir: () => join(getHomeDir(), '.cursor'),
    command: null,
    pluginDir: () => join(getHomeDir(), '.cursor', 'plugins', 'topkit'),
    hooksDir: () => join(getHomeDir(), '.cursor', 'plugins', 'topkit', 'hooks'),
    skillsDir: () => join(getHomeDir(), '.cursor', 'skills'),
  },
  'codex': {
    name: 'Codex CLI',
    configDir: () => join(getHomeDir(), '.codex'),
    command: 'codex',
    pluginDir: () => join(getHomeDir(), '.codex', 'plugins', 'topkit'),
    skillsDir: () => join(getHomeDir(), '.codex', 'skills'),
  },
}

export async function detectPlatforms() {
  const results = {}

  for (const [id, platform] of Object.entries(PLATFORMS)) {
    const configExists = dirExists(platform.configDir())
    const commandAvailable = platform.command ? commandExists(platform.command) : false

    results[id] = {
      name: platform.name,
      installed: configExists || commandAvailable,
      configDir: platform.configDir(),
      pluginDir: platform.pluginDir(),
      hooksDir: platform.hooksDir?.(),
      skillsDir: platform.skillsDir(),
    }
  }

  return results
}

export function getPlatformConfig(platformId) {
  return PLATFORMS[platformId]
}

export { PLATFORMS }
