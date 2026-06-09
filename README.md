# Top-Kit

A disciplined software development methodology for AI coding agents. Enforces design-first, TDD, and systematic workflows.

## Quick Start

Clone or copy this repository into your project:

```bash
git clone https://github.com/your-org/top-kit.git
```

Or copy the relevant files into your existing project.

## Installation by Platform

### Claude Code

**Option 1: Manual (Recommended)**

Copy these files to your project root:
- `AGENTS.md`
- `core-instructions.md`
- `.claude-plugin/plugin.json`
- `hooks/` directory (all files)
- `skills/` directory (all files)

**Option 2: Plugin Marketplace**

```bash
/plugin install topkit@your-marketplace
```

### OpenCode

**Step 1:** Copy these to your project:
- `AGENTS.md`
- `core-instructions.md`
- `.opencode/plugins/topkit.js`
- `skills/` directory

**Step 2:** Add to `opencode.json` (if not auto-detected):

```json
{
  "plugin": ["./.opencode/plugins/topkit.js"]
}
```

### Codex CLI

Copy these files to your project root:
- `AGENTS.md`
- `core-instructions.md`
- `.codex-plugin/plugin.json`
- `skills/` directory

The plugin is auto-discovered from `.codex-plugin/plugin.json`.

### Cursor

Copy these files to your project root:
- `AGENTS.md`
- `core-instructions.md`
- `.cursor-plugin/plugin.json`
- `hooks/hooks-cursor.json`
- `hooks/session-start`
- `hooks/run-hook.cmd`
- `skills/` directory

### Gemini CLI

Copy these files to your project root:
- `AGENTS.md`
- `core-instructions.md`
- `gemini-extension.json`
- `GEMINI.md`
- `skills/` directory

Register the extension:

```bash
gemini extensions install .
```

### Copilot CLI

Copy these files to your project root:
- `AGENTS.md`
- `core-instructions.md`
- `.claude-plugin/plugin.json` (Copilot uses same format)
- `hooks/` directory
- `skills/` directory

## How It Works

When an AI agent starts a session in your project:

1. **Bootstrap loads** — The agent reads `AGENTS.md` and `core-instructions.md`
2. **Skills activate** — The agent follows the workflow chain
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

## Skills

| Skill | Purpose |
|-------|---------|
| `using-topkit` | Bootstrap — introduces the skill system |
| `brainstorming` | Design before code — Socratic questioning, 2-3 approaches, design doc |
| `writing-plans` | Break work into 2-5 min tasks with exact file paths and code |
| `test-driven-development` | RED-GREEN-REFACTOR — no code without failing test first |
| `executing-plans` | Subagent dispatch with two-stage review |

## Philosophy

- **Test-Driven Development** — Write tests first, always
- **Systematic over ad-hoc** — Process over guessing
- **Complexity reduction** — Simplicity as primary goal
- **Evidence over claims** — Verify before declaring success

## File Structure

```
top-kit/
├── AGENTS.md                    # Bootstrap entry point
├── CLAUDE.md                    # Claude Code context
├── GEMINI.md                    # Gemini context references
├── README.md                    # This file
├── core-instructions.md         # 7 Supreme Laws
├── gemini-extension.json        # Gemini extension manifest
├── .claude-plugin/plugin.json   # Claude Code plugin
├── .codex-plugin/plugin.json    # Codex plugin
├── .cursor-plugin/plugin.json   # Cursor plugin
├── .opencode/plugins/topkit.js  # OpenCode plugin
├── hooks/
│   ├── run-hook.cmd             # Windows polyglot wrapper
│   ├── hooks.json               # Claude Code hooks
│   ├── hooks-cursor.json        # Cursor hooks
│   └── session-start            # Bootstrap injection script
└── skills/
    ├── using-topkit/SKILL.md    # Bootstrap skill
    ├── brainstorming/SKILL.md   # Design before code
    ├── writing-plans/SKILL.md   # Task breakdown
    ├── test-driven-development/SKILL.md  # TDD
    └── executing-plans/SKILL.md # Subagent dispatch
```

## License

MIT
