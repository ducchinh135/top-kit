import { join } from 'node:path'
import { existsSync, mkdirSync, symlinkSync, readdirSync, unlinkSync, statSync, copyFileSync, rmSync } from 'node:fs'
import { detectPlatforms } from './detector.js'
import { getPackageDir } from './utils.js'

function removeIfExists(path) {
  if (existsSync(path)) {
    const stat = statSync(path)
    if (stat.isSymbolicLink()) {
      unlinkSync(path)
    } else if (stat.isDirectory()) {
      rmSync(path, { recursive: true, force: true })
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
  const skillsDir = join(getPackageDir(), 'skills')
  if (!existsSync(skillsDir)) return

  if (!existsSync(platformSkillsDir)) {
    mkdirSync(platformSkillsDir, { recursive: true })
  }

  for (const skill of readdirSync(skillsDir)) {
    const src = join(skillsDir, skill)
    const dst = join(platformSkillsDir, skill)
    createSymlink(src, dst)
  }
}

function linkPlugin(platformId, platform) {
  const pluginSource = join(getPackageDir(), 'plugins', platformId)
  if (!existsSync(pluginSource)) return

  const pluginDir = platform.pluginDir
  if (!existsSync(pluginDir)) {
    mkdirSync(pluginDir, { recursive: true })
  }

  const pluginJson = join(pluginSource, 'plugin.json')
  if (existsSync(pluginJson)) {
    copyFileSync(pluginJson, join(pluginDir, 'plugin.json'))
  }

  const hooksDir = join(pluginSource, 'hooks')
  if (existsSync(hooksDir)) {
    createSymlink(hooksDir, join(pluginDir, 'hooks'))
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

function unlinkPlugin(platform) {
  const pluginDir = platform.pluginDir
  if (existsSync(pluginDir)) {
    rmSync(pluginDir, { recursive: true, force: true })
  }
}

function printHeader(text) {
  console.log(`\n${'='.repeat(50)}`)
  console.log(`  ${text}`)
  console.log(`${'='.repeat(50)}`)
}

function printStep(text) {
  console.log(`  → ${text}`)
}

function printSuccess(text) {
  console.log(`  ✓ ${text}`)
}

function printError(text) {
  console.log(`  ✗ ${text}`)
}

function printInfo(text) {
  console.log(`  · ${text}`)
}

export async function install() {
  printHeader('Top-Kit Installer')

  printStep('Detecting AI tools...')
  const platforms = await detectPlatforms()

  for (const [id, platform] of Object.entries(platforms)) {
    if (platform.installed) {
      printSuccess(`${platform.name} found`)
    } else {
      printInfo(`${platform.name} not found`)
    }
  }

  printStep('Linking skills...')
  for (const [id, platform] of Object.entries(platforms)) {
    if (!platform.installed) continue
    try {
      linkSkills(platform.skillsDir)
      printSuccess(`Skills linked to ${platform.name}`)
    } catch (error) {
      printError(`Skills link failed: ${error.message}`)
    }
  }

  printStep('Linking plugins...')
  for (const [id, platform] of Object.entries(platforms)) {
    if (!platform.installed) continue
    try {
      linkPlugin(id, platform)
      printSuccess(`Plugin linked to ${platform.name}`)
    } catch (error) {
      printError(`Plugin link failed: ${error.message}`)
    }
  }

  printStep('Checking project files...')
  const pkgDir = getPackageDir()
  const cwd = process.cwd()
  const projectFiles = ['AGENTS.md', 'CLAUDE.md', 'core-instructions.md']

  for (const file of projectFiles) {
    const src = join(pkgDir, file)
    const dst = join(cwd, file)
    if (existsSync(dst)) {
      printInfo(`${file} already exists (skipped)`)
    } else if (existsSync(src)) {
      copyFileSync(src, dst)
      printSuccess(`${file} copied`)
    }
  }

  printHeader('Installation Complete!')
  console.log(`\n  Skills and plugins are symlinked (not copied).`)
  console.log(`  Updates happen automatically with \`npm update\`.\n`)
}

export async function uninstall() {
  printHeader('Top-Kit Uninstaller')

  printStep('Detecting AI tools...')
  const platforms = await detectPlatforms()

  for (const [id, platform] of Object.entries(platforms)) {
    if (platform.installed) {
      printSuccess(`${platform.name} found`)
    }
  }

  printStep('Unlinking skills...')
  for (const [id, platform] of Object.entries(platforms)) {
    if (!platform.installed) continue
    try {
      unlinkSkills(platform.skillsDir)
      printSuccess(`Skills unlinked from ${platform.name}`)
    } catch (error) {
      printError(`Skills unlink failed: ${error.message}`)
    }
  }

  printStep('Unlinking plugins...')
  for (const [id, platform] of Object.entries(platforms)) {
    if (!platform.installed) continue
    try {
      unlinkPlugin(platform)
      printSuccess(`Plugin unlinked from ${platform.name}`)
    } catch (error) {
      printError(`Plugin unlink failed: ${error.message}`)
    }
  }

  printHeader('Uninstall Complete!')
  console.log(`\n  Restart your AI tool to deactivate Top-Kit.\n`)
}

export async function list() {
  printHeader('Top-Kit Status')

  const platforms = await detectPlatforms()

  for (const [id, platform] of Object.entries(platforms)) {
    const status = platform.installed ? '✓ Installed' : '✗ Not found'
    console.log(`  ${platform.name}: ${status}`)

    if (platform.installed) {
      console.log(`    Config: ${platform.configDir}`)
      console.log(`    Skills: ${platform.skillsDir}`)
    }
  }

  console.log('')
}
