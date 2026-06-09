# Top-Kit

A disciplined software development methodology for AI coding agents. Enforces design-first, TDD, and systematic workflows.

## Quick Start

### Install as npm dependency (Recommended)

```bash
npm install topkit --save-dev
```

This automatically:
- Detects your AI tools (Claude Code, OpenCode, Cursor, Codex CLI)
- Creates symlinks for skills and plugins
- Sets up session bootstrap hooks
- Updates automatically with `npm update`

### Manual Install

```bash
npx topkit install
```

## Supported Platforms

| Platform | Install Method | Hooks |
|----------|----------------|-------|
| Claude Code | `npm install topkit --save-dev` | ✅ SessionStart hook |
| OpenCode | `npm install topkit --save-dev` | ✅ Message transform hook |
| Cursor | `npm install topkit --save-dev` | ✅ sessionStart hook |
| Codex CLI | `npm install topkit --save-dev` | ❌ Skills load natively |

## How It Works

When you run `npm install topkit --save-dev`:

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
