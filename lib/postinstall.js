#!/usr/bin/env node

/**
 * Top-Kit Postinstall Script
 *
 * Automatically detects AI tools and creates symlinks.
 * Users just need to add "topkit" to devDependencies.
 */

import { existsSync, mkdirSync, symlinkSync, readdirSync, unlinkSync, statSync, copyFileSync, rmSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { homedir } from 'node:os'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'

const __filename = fileURLToPath(import.meta.url)
const PACKAGE_DIR = join(dirname(__filename), '..')

function getHomeDir() {
  return homedir()
}

function mkdirp(dir) {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }
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

function createSymlink(src, dst) {
  removeIfExists(dst)
  const dir = join(dst, '..')
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }
  const type = statSync(src).isDirectory() ? 'junction' : 'file'
  symlinkSync(src, dst, type)
}

function linkSkills(platformSkillsDir) {
  const skillsDir = join(PACKAGE_DIR, 'skills')
  if (!existsSync(skillsDir)) return

  mkdirp(platformSkillsDir)

  for (const skill of readdirSync(skillsDir)) {
    const src = join(skillsDir, skill)
    const dst = join(platformSkillsDir, skill)
    createSymlink(src, dst)
  }
}

function linkPlugins(platformId, platform) {
  const pluginSource = join(PACKAGE_DIR, 'plugins', platformId)
  if (!existsSync(pluginSource)) return

  const pluginDir = platform.pluginDir()
  mkdirp(pluginDir)

  const pluginJson = join(pluginSource, 'plugin.json')
  if (existsSync(pluginJson)) {
    copyFileSync(pluginJson, join(pluginDir, 'plugin.json'))
  }

  const hooksDir = join(pluginSource, 'hooks')
  if (existsSync(hooksDir)) {
    createSymlink(hooksDir, join(pluginDir, 'hooks'))
  }
}

function commandExists(cmd) {
  const platform = process.platform
  const check = platform === 'win32' ? 'where' : 'which'
  try {
    execSync(`${check} ${cmd}`, { encoding: 'utf-8', stdio: 'ignore' })
    return true
  } catch {
    return false
  }
}

const PLATFORMS = {
  'claude-code': {
    name: 'Claude Code',
    configDir: () => join(getHomeDir(), '.claude'),
    command: 'claude',
    pluginDir: () => join(getHomeDir(), '.claude', 'plugins', 'topkit'),
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

async function main() {
  console.log('\n🔗 Top-Kit: Setting up symlinks...\n')

  let linked = 0

  for (const [id, platform] of Object.entries(PLATFORMS)) {
    const configExists = existsSync(platform.configDir())
    const commandAvailable = platform.command ? commandExists(platform.command) : false

    if (!configExists && !commandAvailable) {
      console.log(`  · ${platform.name}: not found`)
      continue
    }

    try {
      linkSkills(platform.skillsDir())
      linkPlugins(id, platform)
      console.log(`  ✓ ${platform.name}: linked`)
      linked++
    } catch (error) {
      console.log(`  ✗ ${platform.name}: ${error.message}`)
    }
  }

  if (linked > 0) {
    console.log(`\n✅ Top-Kit linked to ${linked} platform(s). Restart your AI tool.\n`)
  } else {
    console.log('\n⚠️  No AI tools detected. Run `npx topkit install` manually.\n')
  }
}

main().catch(() => {})
