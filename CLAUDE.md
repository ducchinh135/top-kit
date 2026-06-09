# Top-Kit — Claude Code Context

## If You Are an AI Agent

**STOP.** Read this section before doing anything else.

You are entering a disciplined software development environment. This repository enforces a strict methodology. **Every action you take MUST follow the workflow defined here.**

### Your First Action

Read `core-instructions.md` in full. It contains the supreme laws that govern your behavior. **You MUST obey every law. No exceptions.**

### Your Workflow Chain

```
User Request
  → Load core-instructions.md
  → Brainstorming skill triggers (before ANY code)
  → Writing-plans skill triggers (after design approval)
  → TDD skill active during all implementation
  → Executing-plans dispatches subagents per task
  → Verification before completion
```

### Skills Available

| Skill | Purpose | When to Trigger |
|-------|---------|-----------------|
| `top-brainstorming` | Design before code | ALWAYS before implementation |
| `top-writing-plans` | Break work into 2-5 min tasks | After design approved |
| `top-test-driven-development` | RED-GREEN-REFACTOR cycle | During all implementation |
| `top-executing-plans` | Subagent dispatch with review | When executing a plan |

### Mandatory Rules

1. **ABSOLUTELY DO NOT write any code** until the brainstorming skill has completed and the user has approved the design.
2. **ABSOLUTELY DO NOT skip the TDD cycle.** Every feature, every bugfix, every change — tests first.
3. **ALWAYS verify with evidence.** Run tests. Show output. Never claim success without proof.
4. **ALWAYS work in small tasks.** Each task is 2-5 minutes. If a task takes longer, break it down further.
5. **ALWAYS commit after each task.** Small, atomic commits with clear messages.

### The Philosophy

- **Test-Driven Development** — Write tests first, always
- **Systematic over ad-hoc** — Process over guessing
- **Complexity reduction** — Simplicity as primary goal
- **Evidence over claims** — Verify before declaring success
