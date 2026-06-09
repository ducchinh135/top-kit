#!/usr/bin/env node

/**
 * Top-Kit Preuninstall Script
 *
 * Cleans up symlinks when package is uninstalled.
 */

import { existsSync, readdirSync, unlinkSync, statSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { homedir } from 'node:os'

function getHomeDir() {
  return homedir()
}

function removeIfExists(path) {
  if (existsSync(path)) {
    try {
      unlinkSync(path)
    } catch {
      try {
        rmSync(path, { recursive: true, force: true })
      } catch {}
    }
  }
}

function unlinkSkills(platformSkillsDir) {
  if (!existsSync(platformSkillsDir)) return

  for (const entry of readdirSync(platformSkillsDir)) {
    if (entry.startsWith('top-')) {
      removeIfExists(join(platformSkillsDir, entry))
    }
  }
}

function unlinkPlugins(platform) {
  const pluginDir = platform.pluginDir()
  if (existsSync(pluginDir)) {
    rmSync(pluginDir, { recursive: true, force: true })
  }
}

const PLATFORMS = {
  'claude-code': {
    name: 'Claude Code',
    configDir: () => join(getHomeDir(), '.claude'),
    pluginDir: () => join(getHomeDir(), '.claude', 'plugins', 'topkit'),
    skillsDir: () => join(getHomeDir(), '.claude', 'skills'),
  },
  'opencode': {
    name: 'OpenCode',
    configDir: () => join(getHomeDir(), '.config', 'opencode'),
    pluginDir: () => join(getHomeDir(), '.config', 'opencode', 'plugins'),
    skillsDir: () => join(getHomeDir(), '.config', 'opencode', 'skills'),
  },
  'cursor': {
    name: 'Cursor',
    configDir: () => join(getHomeDir(), '.cursor'),
    pluginDir: () => join(getHomeDir(), '.cursor', 'plugins', 'topkit'),
    skillsDir: () => join(getHomeDir(), '.cursor', 'skills'),
  },
  'codex': {
    name: 'Codex CLI',
    configDir: () => join(getHomeDir(), '.codex'),
    pluginDir: () => join(getHomeDir(), '.codex', 'plugins', 'topkit'),
    skillsDir: () => join(getHomeDir(), '.codex', 'skills'),
  },
  'antigravity': {
    name: 'Antigravity IDE',
    configDir: () => join(getHomeDir(), '.antigravity'),
    pluginDir: () => join(getHomeDir(), '.antigravity', 'plugins', 'topkit'),
    skillsDir: () => join(getHomeDir(), '.antigravity', 'skills'),
  },
}

async function main() {
  console.log('\n🔗 Top-Kit: Cleaning up symlinks...\n')

  let cleaned = 0

  for (const [id, platform] of Object.entries(PLATFORMS)) {
    if (!existsSync(platform.configDir())) continue

    try {
      unlinkSkills(platform.skillsDir())
      unlinkPlugins(platform)
      console.log(`  ✓ ${platform.name}: cleaned`)
      cleaned++
    } catch (error) {
      console.log(`  ✗ ${platform.name}: ${error.message}`)
    }
  }

  if (cleaned > 0) {
    console.log(`\n✅ Top-Kit removed from ${cleaned} platform(s).\n`)
  }
}

main().catch(() => {})
