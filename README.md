# Top-Kit

A disciplined software development methodology for AI coding agents. Enforces design-first, TDD, and systematic workflows.

## Quick Start

### Option 1: npx skills add (Recommended for skills-only)

```bash
npx skills add ducchinh135/top-kit --all -g
```

This installs skills globally for all supported platforms:
- Claude Code
- OpenCode
- Cursor
- Codex CLI

### Option 2: npm dependency (Recommended for full setup)

```bash
npm install topkit --save-dev
```

This automatically:
- Detects your AI tools
- Creates symlinks for skills and plugins
- Sets up session bootstrap hooks
- Updates automatically with `npm update`

### Option 3: Manual Install

```bash
npx topkit install
```

## Installation Methods Comparison

| Method | Skills | Plugins | Hooks | Best For |
|--------|--------|---------|-------|----------|
| `npx skills add` | ✅ | ❌ | ❌ | Skills only, global install |
| `npm install topkit --save-dev` | ✅ | ✅ | ✅ | Full setup, project-based |
| `npx topkit install` | ✅ | ✅ | ✅ | Manual control |

## Supported Platforms

| Platform | npx skills add | npm install | Hooks |
|----------|----------------|-------------|-------|
| Claude Code | ✅ | ✅ | ✅ SessionStart hook |
| OpenCode | ✅ | ✅ | ✅ Message transform hook |
| Cursor | ✅ | ✅ | ✅ sessionStart hook |
| Codex CLI | ✅ | ✅ | ❌ Skills load natively |
| Antigravity IDE | ✅ | ✅ | ❌ Semantic skill discovery |

## How It Works

### With npx skills add

1. **Skills installed** — Copies SKILL.md files to `~/.agents/skills/`
2. **Platform discovery** — Each platform finds skills in its skill path
3. **Manual setup** — You may need to configure hooks separately

### With npm install

1. **Postinstall runs** — Detects AI tools
2. **Symlinks created** — Skills and plugins linked (not copied)
3. **Hooks setup** — Session bootstrap activated

When AI agent starts a session:
1. **Bootstrap loads** — Agent reads `AGENTS.md` and `core-instructions.md`
2. **Skills activate** — Agent follows the workflow chain
3. **Enforcement** — Skills are mandatory, not suggestions

### The Workflow Chain

```
User Request
  → Brainstorming (design before code)
  → Writing Plans (break into 2-5 min tasks)
  → TDD (RED-GREEN-REFACTOR)
  → Executing Plans (subagent dispatch)
  → Verification (evidence over claims)
```

## CLI Commands

```bash
# Install (manual)
npx topkit install

# Remove Top-Kit
npx topkit uninstall

# Show detected platforms
npx topkit list

# Show help
npx topkit help
```

## Skills

| Skill | Purpose |
|-------|---------|
| `top-using-topkit` | Bootstrap — introduces the skill system |
| `top-brainstorming` | Design before code — Socratic questioning, 2-3 approaches, design doc |
| `top-writing-plans` | Break work into 2-5 min tasks with exact file paths and code |
| `top-test-driven-development` | RED-GREEN-REFACTOR — no code without failing test first |
| `top-executing-plans` | Subagent dispatch with two-stage review |

## Philosophy

- **Test-Driven Development** — Write tests first, always
- **Systematic over ad-hoc** — Process over guessing
- **Complexity reduction** — Simplicity as primary goal
- **Evidence over claims** — Verify before declaring success

## File Structure

```
top-kit/
├── package.json              # npm package config
├── bin/
│   └── topkit.js             # CLI entry point
├── lib/
│   ├── index.js              # Package exports
│   ├── installer.js          # Main orchestrator (symlinks)
│   ├── detector.js           # Platform detection
│   ├── postinstall.js        # Auto-setup on npm install
│   ├── preuninstall.js       # Cleanup on npm uninstall
│   └── utils.js              # Helper functions
├── plugins/                  # Plugin source files
│   ├── claude-code/
│   ├── opencode/
│   ├── cursor/
│   └── codex/
├── skills/                   # Skill files
├── AGENTS.md                 # Bootstrap entry point
├── CLAUDE.md                 # Claude Code context
├── core-instructions.md      # 7 Supreme Laws
└── README.md
```

## License

MIT
