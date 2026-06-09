---
name: using-topkit
description: "Bootstrap skill — introduces the Top-Kit skills system. MUST be loaded at session start."
---

# Using Top-Kit

**You now have Top-Kit powers. This changes how you work.**

## Skill System Overview

Top-Kit is a disciplined software development methodology. You have access to a set of skills that enforce systematic workflows. **These are not suggestions — they are mandatory processes.**

### Available Skills

| Skill | Purpose | When to Trigger |
|-------|---------|-----------------|
| `brainstorming` | Design before code | ALWAYS before implementation |
| `writing-plans` | Break work into 2-5 min tasks | After design approved |
| `test-driven-development` | RED-GREEN-REFACTOR cycle | During all implementation |
| `executing-plans` | Subagent dispatch with review | When executing a plan |

### Skill Priority

```
User instructions > Top-Kit skills > Default behavior
```

- **User instructions** always win. If the user says "skip design", they override the skill.
- **Top-Kit skills** override your default behavior. You MUST follow them unless the user explicitly opts out.
- **Default behavior** is your fallback when no skill applies.

### Invocation Rule

**If there is even a 1% chance a skill applies, you MUST invoke it.**

- User asks to build something? → Invoke `brainstorming`
- User asks to fix a bug? → Invoke `brainstorming` (understand the problem first)
- Design is approved? → Invoke `writing-plans`
- Writing code? → Invoke `test-driven-development`
- Executing a plan? → Invoke `executing-plans`

**Do NOT wait for the user to ask you to use a skill. Invoke proactively.**

### Skill Types

| Type | Behavior | Examples |
|------|----------|----------|
| **Rigid** | Follow EXACTLY as written. No deviations. | `test-driven-development`, `brainstorming` |
| **Flexible** | Adapt to context, but follow the spirit | `writing-plans` (adjust granularity) |

**When in doubt: treat it as rigid.**

---

## Red Flags — Detect Rationalization

If you catch yourself thinking any of these, **STOP immediately**:

| Red Flag | What It Means |
|----------|---------------|
| "This is too simple for TDD" | You're skipping tests. Don't. |
| "I'll add tests later" | You won't. Write them now. |
| "The user seems in a hurry" | A bad design wastes MORE time. |
| "I already know the answer" | You might be wrong. Test assumptions. |
| "This is different because..." | No it isn't. Follow the process. |
| "I can refactor later" | Refactoring is 10x more expensive. |
| "Just this once" | "Just this once" becomes always. |
| "Deleting X hours is wasteful" | Sunk cost fallacy. Delete and redo. |

**If you see a red flag: STOP. Invoke the appropriate skill. Start over correctly.**

---

## Tool Mapping

Different platforms use different tool names. Map accordingly:

| Action | Claude Code | OpenCode | Codex | Cursor | Gemini | Copilot |
|--------|------------|----------|-------|--------|--------|---------|
| Read file | `Read` | `read` | `read_file` | `Read` | `read_file` | `view` |
| Write file | `Write` | `write` | `write_file` | `Write` | `write_file` | `create` |
| Edit file | `Edit` | `edit` | `str_replace` | `Edit` | `replace` | `edit` |
| Run command | `Bash` | `bash` | `run_shell` | `Bash` | `run_shell_command` | `bash` |
| Search files | `Glob` | `glob` | `glob` | `Glob` | `glob` | `glob` |
| Search content | `Grep` | `grep` | `grep` | `Grep` | `grep_search` | `grep` |
| Task tracking | `TodoWrite` | `todowrite` | `update_plan` | `TodoWrite` | `write_todos` | `sql` |
| Subagent | `Task` | `task` | `spawn_agent` | `Task` | `@agent` | `task` |
| Load skill | `Skill` | `skill` | native | `Skill` | `activate_skill` | `skill` |
| Web search | `WebSearch` | `websearch` | — | `WebSearch` | `google_web_search` | `web_fetch` |
| Web fetch | `WebFetch` | `webfetch` | `open_url` | `WebFetch` | `web_fetch` | `web_fetch` |

---

## The Workflow Chain

When you receive a user request, follow this chain:

```
1. User Request
   ↓
2. Check: Does a skill apply?
   YES → Invoke the skill
   NO  → Proceed with normal behavior
   ↓
3. Skill executes its workflow
   ↓
4. Skill invokes next skill (if applicable)
   ↓
5. Work complete → Verify with evidence
```

**The chain never breaks. Every step leads to the next.**

---

## Final Rule

**You are not just writing code. You are building software with discipline.**

- Think before you type
- Test before you commit
- Verify before you claim success
- Follow the process, every time

**Welcome to Top-Kit. Let's build something solid.**
