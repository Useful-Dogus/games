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

AI authorship policy:

- AI tools (Claude, Copilot, ChatGPT, etc.) are development tools, not contributors.
- Never add `Co-Authored-By` or any AI tool to commit messages or PR author fields.
- All code ownership and review responsibility remain with the submitting engineer.
- AI assistance may be optionally noted in the PR description for transparency, but this does not change authorship.

---

## Issue Policy

- **Every branch must be linked to a GitHub Issue.** No issue = no branch.
- The following also require an issue without exception: refactoring, config changes, docs updates, dependency upgrades, bug fixes.
- Large work should be broken down:
  - One parent issue (goal definition)
  - Multiple child issues (execution units)
  - PRs are opened per child issue where possible.

---

## Branch Strategy

### Default

- Work exclusively on feature branches.
- Branch naming: `issues/<number>-<type>-<description>`
  - `issues/123-feat-add-snippet-list`
  - `issues/58-fix-login-bug`
  - `issues/202-refactor-auth-guard`
- Issue number is mandatory in the branch name.
- Use the `issues/` prefix for all branches — agent-generated and human-authored alike.
- Always branch from the latest `main`.

Procedure:

1. Create a GitHub Issue.
2. Confirm `main` is up to date.
3. Create the feature branch from `main`.
4. Implement and verify.
5. Commit on the feature branch using task-aligned checkpoint commits for recovery points.
6. Open a PR and merge to `main` after review.
7. Delete the branch after merge.

### Hotfix

Urgent fixes follow the **same procedure** as regular work.

1. Create a GitHub Issue.
2. Create an `issues/*` branch.
3. Open a PR.
4. Merge after review and CI pass.
5. Deploy immediately if needed.

No separate hotfix branch. No direct-to-main commits under any circumstances.

---

## Main Branch Protection

- Commit and push exclusively on feature branches.
- Direct push to `main` is never allowed — not even for hotfixes.
- Any git state-changing command on `main` (`add`, `commit`, `push`, `pull`, `merge`, `rebase`) requires explicit user approval before execution.
- Pre-commit then report is allowed on feature branches for development speed.

---

## GitHub Issue / PR Standards

- Use repository templates for all issues and PRs:
  - `.github/ISSUE_TEMPLATE.md`
  - `.github/pull_request_template.md`
- When the user requests a copy-pasteable issue body, provide it in a fenced code block.

### PR Title

Format: `#<issue-number> <short description>`

Example: `#123 Add snippet list view`

### PR–Issue Linking

Use in the PR body to connect the PR to its issue:

| Situation | Keyword |
|---|---|
| PR fully resolves the issue | `Closes #123` or `Fixes #123` |
| PR partially resolves the issue | `Part of #123` or `Related to #123` |

Do not use `Closes` on a partial-resolution PR.

### Merge Strategy

Default: **Squash Merge**

- One PR produces one final commit on `main`.
- The squash commit message must clearly state the purpose of the change.
- CI must pass before merging.
- Resolve conflicts against the latest `main` before merging.

### Issue Quality Checklist

A well-formed issue satisfies all of the following:

1. States the problem as a **system defect**, not a symptom list.
2. States the goal as a **verifiable target state**, not implementation actions.
3. Declares both **Scope** and **Out of Scope** to control scope creep.
4. Describes **procedure (when and what)** rather than listing user roles.
5. Reveals a state-transition flow: start → verify → fix failure → re-verify → done/merge.
6. Makes Acceptance Criteria measurable; failure behavior is stated as an API/UI contract.
7. Separates open questions (undecided items) from DoD / required checks.

---

## Prohibitions

- Direct push to `main`
- Branch without a linked Issue
- Merging with a failing CI
- Mixing unrelated changes in a single PR
- Long-lived branches (split large work into smaller issues instead)
