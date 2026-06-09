#!/usr/bin/env node

import { install, uninstall, list } from '../lib/installer.js'

const args = process.argv.slice(2)
const command = args[0]

function showHelp() {
  console.log(`
Top-Kit - Disciplined software development methodology for AI coding agents

Installation (Recommended):
  npm install topkit --save-dev

This automatically:
  • Detects your AI tools
  • Creates symlinks for skills and plugins
  • Sets up session bootstrap hooks

CLI Commands:
  topkit install     Install Top-Kit for detected AI tools
  topkit uninstall   Remove Top-Kit from all platforms
  topkit list        Show detected platforms and installation status
  topkit help        Show this help message

Examples:
  npm install topkit --save-dev    # Recommended: auto-setup
  npx topkit install               # Manual install
  npx topkit list                  # Check status
  npx topkit uninstall             # Remove
`)
}

async function main() {
  switch (command) {
    case 'install':
      await install()
      break
    case 'uninstall':
      await uninstall()
      break
    case 'list':
      await list()
      break
    case 'help':
    case undefined:
      showHelp()
      break
    default:
      console.error(`Unknown command: ${command}`)
      showHelp()
      process.exit(1)
  }
}

main().catch((error) => {
  console.error('Error:', error.message)
  process.exit(1)
})
