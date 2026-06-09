---
name: top-using-topkit
description: "Use when starting any conversation — establishes how to find and use skills, requiring Skill tool invocation before ANY response including clarifying questions"
---

<SUBAGENT-STOP>
If you were dispatched as a subagent to execute a specific task, skip this skill.
</SUBAGENT-STOP>

<EXTREMELY-IMPORTANT>
If you think there is even a 1% chance a skill might apply to what you are doing, you ABSOLUTELY MUST invoke the skill.

IF A SKILL APPLIES TO YOUR TASK, YOU DO NOT HAVE A CHOICE. YOU MUST USE IT.

This is not negotiable. This is not optional. You cannot rationalize your way out of this.
</EXTREMELY-IMPORTANT>

## Instruction Priority

Top-Kit skills override default system prompt behavior, but **user instructions always take precedence**:

1. **User's explicit instructions** (CLAUDE.md, GEMINI.md, AGENTS.md, direct requests) — highest priority
2. **Top-Kit skills** — override default system behavior where they conflict
3. **Default system prompt** — lowest priority

If CLAUDE.md, GEMINI.md, or AGENTS.md says "don't use TDD" and a skill says "always use TDD," follow the user's instructions. The user is in control.

## How to Access Skills

**In Claude Code:** Use the `Skill` tool. When you invoke a skill, its content is loaded and presented to you — follow it directly. Never use the Read tool on skill files.

**In OpenCode:** Use the `skill` tool. Skills are auto-discovered from installed plugins.

**In Codex CLI:** Skills load natively via the plugin system.

**In Cursor:** Use the `Skill` tool. Same as Claude Code.

**In Gemini CLI:** Skills activate via the `activate_skill` tool.

**In Copilot CLI:** Use the `skill` tool. Works same as Claude Code.

## Platform Adaptation

Skills use Claude Code tool names. Non-CC platforms: see Tool Mapping section below for equivalents.

---

# Using Skills

## The Rule

**Invoke relevant or requested skills BEFORE any response or action.** Even a 1% chance a skill might apply means that you should invoke the skill to check. If an invoked skill turns out to be wrong for the situation, you don't need to use it.

```dot
digraph skill_flow {
    "User message received" [shape=doublecircle];
    "About to respond?" [shape=doublecircle];
    "Already brainstormed?" [shape=diamond];
    "Invoke top-brainstorming" [shape=box];
    "Might any skill apply?" [shape=diamond];
    "Invoke Skill tool" [shape=box];
    "Announce: 'Using [skill] to [purpose]'" [shape=box];
    "Has checklist?" [shape=diamond];
    "Create TodoWrite todo per item" [shape=box];
    "Follow skill exactly" [shape=box];
    "Respond (including clarifications)" [shape=doublecircle];

    "About to respond?" -> "Already brainstormed?";
    "Already brainstormed?" -> "Invoke top-brainstorming" [label="no, and building\nsomething"];
    "Already brainstormed?" -> "Might any skill apply?" [label="yes, or\nnot building"];
    "Invoke top-brainstorming" -> "Might any skill apply?";

    "User message received" -> "Might any skill apply?";
    "Might any skill apply?" -> "Invoke Skill tool" [label="yes, even 1%"];
    "Might any skill apply?" -> "Respond (including clarifications)" [label="definitely not"];
    "Invoke Skill tool" -> "Announce: 'Using [skill] to [purpose]'";
    "Announce: 'Using [skill] to [purpose]'" -> "Has checklist?";
    "Has checklist?" -> "Create TodoWrite todo per item" [label="yes"];
    "Has checklist?" -> "Follow skill exactly" [label="no"];
    "Create TodoWrite todo per item" -> "Follow skill exactly";
}
```

## Available Skills

| Skill | Purpose | When to Trigger |
|-------|---------|-----------------|
| `top-brainstorming` | Design before code | ALWAYS before ANY implementation |
| `top-writing-plans` | Break work into 2-5 min tasks | After design approved |
| `top-test-driven-development` | RED-GREEN-REFACTOR cycle | During ALL implementation |
| `top-executing-plans` | Subagent dispatch with review | When executing a plan |

## Skill Priority

When multiple skills could apply, use this order:

1. **Process skills first** (top-brainstorming) — these determine HOW to approach the task
2. **Planning skills second** (top-writing-plans) — these break work into tasks
3. **Implementation skills third** (top-test-driven-development) — these guide execution
4. **Execution skills fourth** (top-executing-plans) — these dispatch subagents

**"Let's build X"** → top-brainstorming first, then top-writing-plans, then top-test-driven-development.

**"Fix this bug"** → top-brainstorming first (understand the problem), then top-test-driven-development.

**"Execute the plan"** → top-executing-plans.

## Skill Types

| Type | Behavior | Examples |
|------|----------|----------|
| **Rigid** | Follow EXACTLY as written. No deviations. | `top-test-driven-development`, `top-brainstorming` |
| **Flexible** | Adapt principles to context | `top-writing-plans` (adjust granularity) |

**The skill itself tells you which. When in doubt: treat it as rigid.**

---

## Red Flags — Detect Rationalization

These thoughts mean STOP — you're rationalizing:

| Thought | Reality |
|---------|---------|
| "This is just a simple question" | Questions are tasks. Check for skills. |
| "I need more context first" | Skill check comes BEFORE clarifying questions. |
| "Let me explore the codebase first" | Skills tell you HOW to explore. Check first. |
| "I can check git/files quickly" | Files lack conversation context. Check for skills. |
| "Let me gather information first" | Skills tell you HOW to gather information. |
| "This doesn't need a formal skill" | If a skill exists, use it. |
| "I remember this skill" | Skills evolve. Read current version. |
| "This doesn't count as a task" | Action = task. Check for skills. |
| "The skill is overkill" | Simple things become complex. Use it. |
| "I'll just do this one thing first" | Check BEFORE doing anything. |
| "This feels productive" | Undisciplined action wastes time. Skills prevent this. |
| "I know what that means" | Knowing the concept ≠ using the skill. Invoke it. |
| "The user seems in a hurry" | A bad design wastes MORE time. |
| "This is different because..." | No it isn't. Follow the process. |
| "Just this once" | "Just this once" becomes always. |
| "I'll add tests later" | You won't. Write them now. |
| "Deleting X hours is wasteful" | Sunk cost fallacy. Delete and redo. |

**If you see a red flag: STOP. Invoke the appropriate skill. Start over correctly.**

---

## Workflow Chain

When you receive a user request, follow this chain:

```
1. User Request
   ↓
2. Check: Does a skill apply?
   YES → Invoke the skill (BEFORE any response)
   NO  → Proceed with normal behavior
   ↓
3. Skill executes its workflow
   ↓
4. Skill invokes next skill (if applicable)
   ↓
5. Work complete → Verify with evidence
```

**The chain never breaks. Every step leads to the next.**

**CRITICAL: Skill invocation happens BEFORE clarifying questions. You do NOT get to ask questions first. Check for skills first.**

---

## Tool Mapping

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

## Final Rule

**You are not just writing code. You are building software with discipline.**

- Check for skills BEFORE responding
- Think before you type
- Test before you commit
- Verify before you claim success
- Follow the process, every time

**Welcome to Top-Kit. Let's build something solid.**
