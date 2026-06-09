---
name: top-writing-plans
description: "Use when you have a spec or requirements for a multi-step task, before touching code. Breaks work into bite-sized tasks with exact file paths, complete code, and verification steps."
---

# Writing Plans — From Spec to Executable Tasks

**A plan is not a vague list of intentions. It is a precise, step-by-step instruction set that an engineer with ZERO context can follow without thinking.**

## Activation Condition

**This skill MUST be triggered when:**
- The brainstorming skill has completed and the design is approved
- The user has provided a spec or requirements
- You need to break work into executable tasks

**This skill is NEVER skipped.** No code is written directly from a spec. Every spec goes through planning first.

---

## Overview

Write comprehensive implementation plans assuming the engineer has:
- **Zero context** for your codebase
- **Questionable taste** (they might over-engineer)
- **No project history** (they don't know past decisions)

Document everything they need to know: which files to touch, what code to write, how to test it, how to commit it. Give them the whole plan as bite-sized tasks.

**Announce at start:** "I'm using the writing-plans skill to create the implementation plan."

---

## Scope Check

If the spec covers multiple independent subsystems, it should have been broken into sub-project specs during brainstorming. If it wasn't:

1. **Suggest decomposition** — What are the independent pieces?
2. **Define build order** — Which piece should be built first?
3. **Create separate plans** — One plan per subsystem

Each plan should produce working, testable software on its own.

---

## File Structure First

Before defining tasks, map out which files will be created or modified.

**Rules:**
- Design units with clear boundaries and well-defined interfaces
- Each file should have ONE clear responsibility
- Prefer smaller, focused files over large ones that do too much
- Files that change together should live together
- Follow existing codebase patterns (don't restructure unilaterally)

**Output format:**

```
Files to create:
- src/services/user.service.ts     — User business logic
- src/controllers/user.controller.ts — User HTTP layer
- src/dto/create-user.dto.ts       — Input validation
- tests/services/user.service.test.ts — Unit tests

Files to modify:
- src/app.module.ts:12-15          — Register UserModule
- src/prisma/schema.prisma:20-25  — Add User model
```

---

## Task Granularity

**Each task is ONE action (2-5 minutes max).**

| Step Type | Example |
|-----------|---------|
| Write failing test | `Write test for email validation` |
| Verify test fails | `Run test, confirm it fails with "Email required"` |
| Write minimal code | `Implement email validation in UserService` |
| Verify test passes | `Run test, confirm it passes` |
| Commit | `git commit -m "feat: add email validation"` |

**If a task takes longer than 5 minutes, it is TOO LARGE. Break it down.**

---

## Plan Document Header

**Every plan MUST start with this header:**

```markdown
# [Feature Name] Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use 05-executing-plans to implement this plan task-by-task.

**Goal:** [One sentence describing what this builds]

**Architecture:** [2-3 sentences about approach]

**Tech Stack:** [Key technologies/libraries]

---
```

---

## Task Structure

```markdown
### Task N: [Component Name]

**Files:**
- Create: `exact/path/to/file.ts`
- Modify: `exact/path/to/existing.ts:12-45`
- Test: `tests/exact/path/to/file.test.ts`

- [ ] **Step 1: Write the failing test**

```typescript
// Complete test code — NOT a placeholder
test('validates email format', () => {
  const result = validateEmail('invalid');
  expect(result).toBe(false);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test tests/path/file.test.ts -- --testNamePattern="validates email"`
Expected: FAIL with "expect(received).toBe(expected)"

- [ ] **Step 3: Write minimal implementation**

```typescript
// Complete implementation code — NOT a placeholder
function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test tests/path/file.test.ts -- --testNamePattern="validates email"`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/utils/email.ts tests/utils/email.test.ts
git commit -m "feat: add email validation"
```
```

---

## No Placeholders

Every step must contain the ACTUAL content an engineer needs.

**These are PLAN FAILURES — never write them:**

| Anti-Pattern | Why It's Wrong |
|--------------|----------------|
| `"TBD"`, `"TODO"`, `"implement later"` | Engineer doesn't know what to do |
| `"Add appropriate error handling"` | Which errors? How to handle them? |
| `"Write tests for the above"` (no test code) | Engineer doesn't know what to test |
| `"Similar to Task N"` | Engineer may read tasks out of order |
| Steps that describe WHAT without showing HOW | Code blocks required for code steps |
| References to undefined types/functions | Define everything inline |
| `"Handle edge cases"` | Which edge cases? What handling? |

---

## Task Ordering Rules

1. **Tests before implementation** — Always RED before GREEN
2. **Dependencies first** — If Task 3 depends on Task 2's service, Task 2 comes first
3. **Isolation** — Each task should be independently testable
4. **Frequent commits** — Commit after every completed task
5. **No partial tasks** — A task is either complete (committed) or not started

---

## Plan Document Template

```markdown
# [Feature Name] Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use 05-executing-plans to implement this plan task-by-task.

**Goal:** [One sentence]

**Architecture:** [2-3 sentences]

**Tech Stack:** [Technologies]

---

## File Structure

Files to create:
- [list]

Files to modify:
- [list with line ranges]

---

### Task 1: [Name]

**Files:**
- Create: `path/to/file.ts`
- Test: `tests/path/to/file.test.ts`

- [ ] **Step 1: Write failing test**
```typescript
// actual test code
```

- [ ] **Step 2: Verify fails**
Run: `command`
Expected: `output`

- [ ] **Step 3: Write implementation**
```typescript
// actual implementation code
```

- [ ] **Step 4: Verify passes**
Run: `command`
Expected: `output`

- [ ] **Step 5: Commit**
```bash
git add path/to/file.ts tests/path/to/file.test.ts
git commit -m "feat: description"
```

---

### Task 2: [Name]

[Same structure...]

---

## Verification

After all tasks complete:
- [ ] All tests pass
- [ ] No lint errors
- [ ] No type errors
- [ ] Coverage meets threshold
```

---

## Self-Review

After writing the complete plan, review it yourself:

**1. Spec coverage:**
- Skim each requirement in the spec
- Can you point to a task that implements it?
- List any gaps

**2. Placeholder scan:**
- Search for red flags from the "No Placeholders" section
- Fix any you find

**3. Type consistency:**
- Do types, method signatures, and property names match across tasks?
- A function called `getUser()` in Task 3 but `fetchUser()` in Task 7 is a bug

**4. Dependency check:**
- Does each task have everything it needs from prior tasks?
- Are there circular dependencies?

If you find issues, fix them inline. No need to re-review — just fix and move on.

---

## Execution Handoff

After saving the plan, offer execution choice:

**"Plan complete and saved to `docs/plans/<filename>`. Two execution options:**

**1. Subagent-Driven (recommended)** — Fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** — Execute tasks in this session with checkpoints

**Which approach?"**

**If Subagent-Driven chosen:**
- Invoke the `05-executing-plans` skill
- Fresh subagent per task + two-stage review

**If Inline Execution chosen:**
- Execute tasks sequentially in current session
- Human checkpoint after every 3-5 tasks

---

## Verification Checklist

Before completing writing-plans:

- [ ] File structure mapped out with line ranges
- [ ] Every task is 2-5 minutes max
- [ ] Every step has actual code (no placeholders)
- [ ] Every code step has exact run command and expected output
- [ ] Every task ends with a commit
- [ ] Tests come before implementation in every task
- [ ] Plan self-reviewed for spec coverage and consistency
- [ ] Execution handoff offered to user

**Can't check all boxes? Fix the gaps before presenting the plan.**
