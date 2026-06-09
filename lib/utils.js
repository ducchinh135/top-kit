import { existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync, statSync, copyFileSync, lstatSync, unlinkSync, rmSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { homedir } from 'node:os'
import { execSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

export function getHomeDir() {
  return homedir()
}

export function getTopKitDir() {
  return join(getHomeDir(), '.topkit')
}

export function fileExists(path) {
  return existsSync(path)
}

export function dirExists(path) {
  return existsSync(path)
}

export function mkdirp(dir) {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }
}

function removeIfExists(path) {
  if (existsSync(path)) {
    const stat = lstatSync(path)
    if (stat.isSymbolicLink() || stat.isDirectory()) {
      rmSync(path, { recursive: true, force: true })
    } else {
      unlinkSync(path)
    }
  }
}

export function copyDir(src, dst) {
  removeIfExists(dst)
  mkdirSync(dst, { recursive: true })
  for (const entry of readdirSync(src)) {
    const srcPath = join(src, entry)
    const dstPath = join(dst, entry)
    if (statSync(srcPath).isDirectory()) {
      copyDir(srcPath, dstPath)
    } else {
      copyFileSync(srcPath, dstPath)
    }
  }
}

export function copyFile(src, dst) {
  const dir = dirname(dst)
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }
  copyFileSync(src, dst)
}

export function readFile(path) {
  return readFileSync(path, 'utf-8')
}

export function writeFile(path, content) {
  const dir = dirname(path)
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }
  writeFileSync(path, content, 'utf-8')
}

export function exec(cmd, options = {}) {
  try {
    return execSync(cmd, { encoding: 'utf-8', ...options }).trim()
  } catch {
    return null
  }
}

export function commandExists(cmd) {
  const platform = process.platform
  const check = platform === 'win32' ? 'where' : 'which'
  try {
    execSync(`${check} ${cmd}`, { encoding: 'utf-8', stdio: 'ignore' })
    return true
  } catch {
    return false
  }
}

export function getPackageDir() {
  const __filename = fileURLToPath(import.meta.url)
  return join(dirname(__filename), '..')
}
