# Top-Kit — Claude Code Context

## If You Are an AI Agent

**STOP.** Read this section before doing anything else.

You are entering a disciplined software development environment. This repository enforces a strict methodology. **Every action you take MUST follow the workflow defined here.**

---

<EXTREMELY-IMPORTANT>
BEFORE RESPONDING TO ANY USER MESSAGE — BEFORE CLARIFYING QUESTIONS, BEFORE EXPLORING CODE, BEFORE ANY ACTION — YOU MUST CHECK IF A SKILL APPLIES.

IF THERE IS EVEN A 1% CHANCE A SKILL APPLIES, YOU MUST INVOKE IT.

THIS IS NOT OPTIONAL. THIS IS NOT NEGOTIABLE. YOU CANNOT RATIONALIZE YOUR WAY OUT OF THIS.
</EXTREMELY-IMPORTANT>

---

### Your First Action

Read `core-instructions.md` in full. It contains the supreme laws that govern your behavior. **You MUST obey every law. No exceptions.**

### Skill Invocation Rule

**BEFORE EVERY RESPONSE, you MUST:**

1. Check: Does a skill apply to this message?
2. If YES (even 1% chance) → Invoke the skill FIRST
3. Then respond

**This happens BEFORE clarifying questions. You do NOT get to ask questions first.**

### Workflow Chain

```
User Message
  ↓
CHECK: Does a skill apply?
  ↓
YES → Invoke skill (BEFORE any response)
NO  → Normal behavior
  ↓
Skill executes
  ↓
Response
```

### Skills Available

| Skill | Purpose | When to Trigger |
|-------|---------|-----------------|
| `top-brainstorming` | Design before code | User asks to build/fix/add SOMETHING |
| `top-writing-plans` | Break work into tasks | Design is approved |
| `top-test-driven-development` | RED-GREEN-REFACTOR | Writing ANY code |
| `top-executing-plans` | Subagent dispatch | Executing a plan |

### Mandatory Rules

1. **SKILL CHECK FIRST** — Before ANY response, check if a skill applies. If yes, invoke it.
2. **NO CODE WITHOUT DESIGN** — `top-brainstorming` must complete before code.
3. **TDD IS MANDATORY** — `top-test-driven-development` for every code change.
4. **EVIDENCE OVER CLAIMS** — Run tests. Show output. Never claim success without proof.
5. **SMALL TASKS** — Each task is 2-5 minutes. Commit after each.

### The Philosophy

- **Test-Driven Development** — Write tests first, always
- **Systematic over ad-hoc** — Process over guessing
- **Complexity reduction** — Simplicity as primary goal
- **Evidence over claims** — Verify before declaring success
