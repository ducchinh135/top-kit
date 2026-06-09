import { join, dirname } from 'node:path'
import { mkdirp, copyDir, fileExists, getPackageDir } from './utils.js'

const TOPKIT_SKILL_PREFIX = 'top-'
const TOPKIT_SKILLS = [
  'top-using-topkit',
  'top-brainstorming',
  'top-writing-plans',
  'top-test-driven-development',
  'top-executing-plans',
]

export async function installSkills(platforms) {
  const results = {}
  const skillsDir = join(getPackageDir(), 'skills')

  for (const [platformId, platform] of Object.entries(platforms)) {
    if (!platform.installed) continue

    try {
      mkdirp(platform.skillsDir)
      copyDir(skillsDir, platform.skillsDir)
      results[platformId] = { success: true, path: platform.skillsDir }
    } catch (error) {
      results[platformId] = { success: false, error: error.message }
    }
  }

  return results
}

export async function uninstallSkills(platforms) {
  const results = {}

  for (const [platformId, platform] of Object.entries(platforms)) {
    if (!platform.installed) continue

    try {
      if (fileExists(platform.skillsDir)) {
        const { readdirSync, rmSync, lstatSync } = await import('node:fs')
        const entries = readdirSync(platform.skillsDir)

        for (const entry of entries) {
          if (entry.startsWith(TOPKIT_SKILL_PREFIX)) {
            const entryPath = join(platform.skillsDir, entry)
            rmSync(entryPath, { recursive: true, force: true })
          }
        }
      }
      results[platformId] = { success: true }
    } catch (error) {
      results[platformId] = { success: false, error: error.message }
    }
  }

  return results
}
