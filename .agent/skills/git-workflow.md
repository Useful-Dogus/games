# Skill: Git Workflow

Purpose:
- Define commit, branch, and GitHub collaboration standards for consistent version control.

---

## Commit Convention

Format: `<emoji> [scope:] <subject>`

Rules:

- Subject: 70 characters maximum, noun-phrase form.
- Omit words made redundant by the emoji (e.g., avoid "add feature" with ✨).
- Include a body only for changes that require reasoning explanation.

Emoji mapping:

- ✨ feature
- 💄 UI / style
- 🐛 bug fix
- ♻️ refactor
- 🔧 config
- 📝 docs
- ➕ add dependency
- ➖ remove dependency
- 🔥 delete
- 🏗️ structural change

Steps:

1. Run `git status` to confirm scope.
2. Run `git diff` to understand intent.
3. Write the message focused on the purpose of the change.

Checkpoint policy:

- Prefer multiple checkpoint commits over one bulk commit.
- Each commit should represent one independently reviewable/verifiable unit.
- Default mapping: one task (or one tightly related task pair) per commit.
- Before each commit, run the smallest relevant verification command and include results in the PR summary.

Output rule: present every commit message suggestion inside a Markdown fenced code block for copy-paste.

---

## Branch Strategy

### Default

- Work exclusively on feature branches.
- Branch naming: `issues/<type>-<topic>`
  - `issues/docs-initial-setup`
  - `issues/feat-hub-game-list`
  - `issues/fix-rewrite-config`
- Use the `issues/` prefix for all branches — agent-generated and human-authored alike.

Procedure:

1. Confirm `main` is up to date.
2. Create / switch to the feature branch.
3. Implement and verify.
4. Commit on the feature branch using task-aligned checkpoint commits for recovery points.
5. Merge to `main` via PR.

### Exception: Hotfix

Applies when: production is broken and a branch/PR cycle cannot wait.

Required before any `main` commit:

- Explicit user approval in the current session.
- Intake Note stating the reason direct-to-main was necessary.

---

## Main Branch Protection

- Commit and push exclusively on feature branches.
- Any git state-changing command on `main` (`add`, `commit`, `push`, `pull`, `merge`, `rebase`, `checkout`) requires explicit user approval before execution.
- Pre-commit then report is allowed on feature branches for development speed.

---

## GitHub Issue / PR Standards

- Use repository templates for all issues and PRs:
  - `.github/ISSUE_TEMPLATE.md`
  - `.github/pull_request_template.md`
- When the user requests a copy-pasteable issue body, provide it in a fenced code block.

### Issue Quality Checklist

A well-formed issue satisfies all of the following:

1. States the problem as a **system defect**, not a symptom list.
2. States the goal as a **verifiable target state**, not implementation actions.
3. Declares both **Scope** and **Out of Scope** to control scope creep.
4. Describes **procedure (when and what)** rather than listing user roles.
5. Reveals a state-transition flow: start → verify → fix failure → re-verify → done/merge.
6. Makes Acceptance Criteria measurable; failure behavior is stated as an API/UI contract.
7. Separates open questions (undecided items) from DoD / required checks.
