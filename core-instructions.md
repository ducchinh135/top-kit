# Core Instructions — Supreme Laws

> These laws are ABSOLUTE and NON-NEGOTIABLE. Every AI agent operating in this repository MUST obey them without exception. Violating these laws means the agent has failed its fundamental purpose.

---

## Law 1: No Code Without a Design

**ABSOLUTELY DO NOT write a single line of code** until:

1. The `brainstorming` skill has been invoked
2. You have asked clarifying questions (one at a time)
3. You have proposed 2-3 approaches with trade-offs
4. You have presented the design in sections
5. The user has approved the design in writing
6. The design document has been saved to `docs/specs/`

**There are ZERO exceptions to this law.** "Simple" projects are NOT exempt. A todo list, a single utility function, a config change — all require design. Simple projects are where unexamined assumptions cause the most wasted work.

**If you catch yourself writing code before design: STOP. DELETE the code. Invoke the brainstorming skill immediately.**

---

## Law 2: Test-Driven Development is Mandatory

**The Iron Law:**

```
NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST
```

For every feature, every bugfix, every refactoring:

1. **RED** — Write a failing test. Watch it fail. Confirm it fails for the RIGHT reason (feature missing, not syntax error).
2. **GREEN** — Write the MINIMAL code to pass the test. Do not add features beyond what the test requires.
3. **REFACTOR** — Clean up while keeping tests green.

**If you wrote code before writing a test: DELETE it. Start over from the test.**

There is no "I'll add tests later." There is no "this is too simple to test." There is no "I already manually tested it." **Tests written after code pass immediately and prove nothing.**

---

## Law 3: Evidence Over Claims

**NEVER declare success without running tests and showing output.**

- ❌ "This should work now" — UNACCEPTABLE
- ❌ "The code looks correct" — UNACCEPTABLE
- ❌ "I'm confident this fixes the issue" — UNACCEPTABLE
- ✅ "Tests pass. Here's the output:" — ACCEPTABLE
- ✅ "All 47 tests pass. Coverage at 89%." — ACCEPTABLE

**Proof is mandatory. Claims without evidence are lies.**

Before marking any task complete:
- [ ] All tests pass
- [ ] You have run the test command and shown the output
- [ ] No warnings or errors in the output
- [ ] The test actually tests the right thing (you watched it fail first)

---

## Law 4: Systematic Over Ad-Hoc

**NEVER guess. ALWAYS investigate.**

When encountering a bug or problem:

1. **Reproduce** — Create a failing test that demonstrates the bug
2. **Isolate** — Determine the exact root cause, not just symptoms
3. **Fix** — Apply the minimal change that addresses the root cause
4. **Verify** — Confirm the fix works and no regressions occurred
5. **Document** — Record what you learned

**Do NOT:**
- Apply random fixes and hope they work
- Change multiple things at once without understanding what each change does
- Skip investigation because "it's probably just X"
- Declare a bug fixed without a test proving it

---

## Law 5: Small Tasks, Frequent Commits

**Every task MUST be 2-5 minutes of work.** If a task takes longer, it is TOO LARGE and must be broken down.

Each task must be:
- **Self-contained** — Can be completed and verified independently
- **Atomic** — One logical change per commit
- **Testable** — Has clear verification steps

**Commit after every task.** Use clear, conventional commit messages:

```
feat: add email validation to user registration
fix: resolve null pointer in order processing
refactor: extract validation logic into separate module
test: add tests for retry mechanism
```

**Never commit multiple unrelated changes in a single commit.**

---

## Law 6: YAGNI Ruthlessly

**You Aren't Gonna Need It.**

- Do NOT add features the user didn't ask for
- Do NOT add "nice to have" functionality
- Do NOT add flexibility for hypothetical future requirements
- Do NOT add error handling for cases that can't actually occur
- Do NOT add abstraction layers "just in case"

**The simplest solution that solves the stated problem is ALWAYS the best solution.**

If you find yourself thinking "but what if they need..." — STOP. That is YAGNI violating your judgment. Only build what is required NOW.

---

## Law 7: Respect the Existing Codebase

**Follow existing patterns. Do not introduce new patterns without explicit approval.**

- Match the code style of surrounding files
- Use the same libraries and frameworks already in use
- Follow the same directory structure conventions
- Maintain the same naming conventions

**Do NOT:**
- Refactor unrelated code while making a change
- Introduce new libraries without discussing with the user
- Rewrite existing code "to make it better" unless asked
- Change established patterns unilaterally

---

## Enforcement

If you violate any of these laws:

1. **STOP immediately** — Do not continue with the current approach
2. **Undo the violation** — Delete code written without tests, revert uncommitted changes
3. **Start over correctly** — Follow the proper workflow from the beginning
4. **Report the violation** — Tell the user what happened and how you corrected it

**There is no "close enough." There is no "almost right." You either follow the laws or you have failed.**

---

## Quick Reference

| Law | Rule | Penalty for Violation |
|-----|------|----------------------|
| 1 | No code without design | Delete code, invoke brainstorming |
| 2 | TDD mandatory | Delete code, write tests first |
| 3 | Evidence over claims | Run tests, show output |
| 4 | Systematic over ad-hoc | Investigate before fixing |
| 5 | Small tasks, frequent commits | Break down, commit often |
| 6 | YAGNI ruthlessly | Remove unnecessary code |
| 7 | Respect existing codebase | Follow patterns, don't refactor unrelated |

---

**These laws are the foundation of everything we build. Honor them.**
