# Dogus Games — Agent Instructions

This repository follows a Spec-Driven development workflow.

## MUST Read Before Any Action

Read the following files **in full, in order**, before taking any action.
Do not proceed past intake until all six files have been read.

1. `.agent/WORKING_AGREEMENT.md` — Top-level charter (highest priority)
2. `.agent/workflow.md` — Spec → Plan → Tasks → Implement lifecycle
3. `.agent/project/overview.md` — Platform purpose and constraints (Korean)
4. `.agent/project/architecture.md` — Monorepo structure and tech stack (Korean)
5. `.agent/project/games-registry.md` — Current game list and status (Korean)
6. `.agent/project/constraints.md` — Monorepo and game platform rules (Korean)

## Non-Negotiable Rules

These rules apply unconditionally. Full details are in the linked files.

### Commits — see `.agent/skills/git-workflow.md`

Format: `<emoji> [scope:] <subject>` · max 70 chars

| Emoji | Use |
|---|---|
| ✨ | feature |
| 💄 | UI / style |
| 🐛 | bug fix |
| ♻️ | refactor |
| 🔧 | config |
| 📝 | docs |
| ➕ | add dependency |
| ➖ | remove dependency |
| 🔥 | delete |
| 🏗️ | structural change |

- Always present the commit message in a Markdown fenced code block before running `git commit`.
- One commit = one independently verifiable unit (one task or one tightly related task pair).
- Never add `Co-Authored-By` or any AI tool attribution to commit messages or PRs. All authorship belongs to the submitting engineer.

### Branches — see `.agent/skills/git-workflow.md`

- Create a GitHub Issue before creating any branch. No issue = no branch.
- All branches: `issues/<number>-<type>-<description>` (e.g. `issues/123-feat-add-snippet-list`)
- Always branch from the latest `main`.
- Never commit directly to `main` under any circumstances.
- Integrate via PR only. Default merge strategy: Squash Merge.

### Workflow Gate — see `.agent/workflow.md`

- Begin implementation only after spec approval is recorded.
- User approval is required at two gates: Issue → Dev, and PR → Merge.
- Resolve ambiguity through questions — do not assume.

## Role & Skill Reference

Read the relevant file before acting in that capacity:

| Need | File |
|---|---|
| Design / planning | `.agent/roles/architect.md` |
| Implementation | `.agent/roles/developer.md` |
| Code review | `.agent/roles/reviewer.md` |
| Writing a spec | `.agent/skills/spec-facilitator.md` + `.agent/templates/SPEC_TEMPLATE.md` |
| Adding a new game | `.agent/skills/add-new-game.md` |
| Commit / branch / PR | `.agent/skills/git-workflow.md` |
| Quality review | `.agent/skills/frontend-quality-review.md` |
| Performance audit | `.agent/skills/performance-audit.md` |

Spec outputs live in `.agent/specs/`.
