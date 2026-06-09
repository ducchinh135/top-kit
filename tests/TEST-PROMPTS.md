# Top-Kit — Test Prompts

Sử dụng các prompt này trong project đã cài skill để verify skill tự động kích hoạt.

---

## Test 1: top-brainstorming

**Mục đích:** Verify agent tự động invoke brainstorming trước khi code.

**Prompt:**
```
Build a REST API for user management with registration, login, and profile CRUD
```

**Kỳ vọng:**
- Agent KHÔNG code ngay
- Agent hỏi clarifying questions (1 câu/lần)
- Agent propose 2-3 approaches
- Agent present design theo sections
- Agent save design doc trước khi code

**Red flag (FAIL):**
- Agent bắt đầu viết code ngay lập tức
- Agent không hỏi câu hỏi nào
- Agent không propose alternatives

---

## Test 2: top-brainstorming (Bug fix)

**Mục đích:** Verify agent invoke brainstorming ngay cả khi fix bug.

**Prompt:**
```
There's a bug where users can register with duplicate emails. Fix it.
```

**Kỳ vọng:**
- Agent hỏi: "Where is the registration code?"
- Agent reproduce bug trước khi fix
- Agent không fix ngay mà hiểu root cause trước

**Red flag (FAIL):**
- Agent fix ngay mà không investigate

---

## Test 3: top-writing-plans

**Mục đích:** Verify agent tạo implementation plan sau khi design approved.

**Setup:** Hoàn thành Test 1 trước, approve design.

**Prompt:**
```
Design looks good. Let's proceed.
```

**Kỳ vọng:**
- Agent invoke writing-plans skill
- Agent tạo plan với tasks 2-5 phút mỗi task
- Mỗi task có: exact file paths, code blocks, run commands, commit messages
- Plan saved to docs/plans/

**Red flag (FAIL):**
- Agent code ngay mà không có plan
- Plan có tasks quá lớn (>5 phút)
- Plan không có code blocks hay run commands

---

## Test 4: top-test-driven-development

**Mục đích:** Verify agent enforce TDD RED-GREEN-REFACTOR.

**Prompt:**
```
Let's start with the first task from the plan.
```

**Kỳ vọng:**
- Agent viết FAILING test trước
- Agent chạy test và show output FAIL
- Agent viết minimal code để pass
- Agent chạy test và show output PASS
- Agent commit sau mỗi step

**Red flag (FAIL):**
- Agent viết code trước khi viết test
- Agent không chạy test để verify
- Agent claim success mà không show output

---

## Test 5: top-executing-plans

**Mục đích:** Verify agent dispatch subagent cho mỗi task.

**Prompt:**
```
Execute the implementation plan.
```

**Kỳ vọng:**
- Agent dispatch subagent cho mỗi task
- Agent review output sau mỗi task
- Agent chạy verification checklist trước khi claim done

**Red flag (FAIL):**
- Agent làm tất cả trong một lần
- Agent không review giữa các tasks
- Agent không chạy full test suite

---

## Quick Validation Checklist

Sử dụng prompt này để test nhanh:

```
I want to add a search feature to the products page. It should filter by name and category.
```

**Check:**
- [ ] Agent invokes brainstorming (asks questions, proposes alternatives)
- [ ] Agent does NOT write code immediately
- [ ] Agent presents design for approval
- [ ] Agent creates plan after approval
- [ ] Agent writes tests first during implementation
- [ ] Agent shows test output (FAIL then PASS)
- [ ] Agent commits after each task

---

## Expected Workflow Chain

```
User: "Build a todo app"

Agent Response:
1. "I'm using the top-brainstorming skill..."
2. "What is the primary goal of this feature?"
   A) Personal productivity
   B) Team collaboration
   C) Something else
3. [Waits for user answer]
4. "Here are 3 approaches..."
5. "Here's the design in sections..."
6. [Waits for approval]
7. "I'm using the top-writing-plans skill..."
8. [Shows plan with 2-5 min tasks]
9. "Which execution approach?"
10. [Implements with TDD]
```

---

## Troubleshooting

Nếu skill KHÔNG tự động kích hoạt:

1. **Check skill files exist:**
   ```bash
   ls -la .claude/skills/  # hoặc .agents/skills/
   ```

2. **Check frontmatter:**
   ```bash
   head -5 .claude/skills/top-brainstorming/SKILL.md
   ```

3. **Re-install:**
   ```bash
   npx skills add ducchinh135/top-kit --all
   ```

4. **Check agent config:**
   - Claude Code: `.claude-plugin/plugin.json` hoặc `CLAUDE.md`
   - OpenCode: `.opencode/plugins/topkit.js`
