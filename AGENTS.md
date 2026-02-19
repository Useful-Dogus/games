# Dogus Games — Agent Instructions

This repository follows a Spec-Driven development workflow.

Before taking any action, read the following files **in order**:

1. `.agent/WORKING_AGREEMENT.md` — Top-level charter (highest priority)
2. `.agent/workflow.md` — Spec → Plan → Tasks → Implement lifecycle
3. `.agent/project/overview.md` — Platform purpose and constraints (Korean)
4. `.agent/project/architecture.md` — Monorepo structure and tech stack (Korean)
5. `.agent/project/games-registry.md` — Current game list and status (Korean)
6. `.agent/project/constraints.md` — Monorepo and game platform rules (Korean)

## Role & Skill Reference

| Need | File |
|---|---|
| Design / planning | `.agent/roles/architect.md` |
| Implementation | `.agent/roles/developer.md` |
| Code review | `.agent/roles/reviewer.md` |
| Writing a spec | `.agent/skills/spec-facilitator.md` + `.agent/templates/SPEC_TEMPLATE.md` |
| Adding a new game | `.agent/skills/add-new-game.md` |
| Commit message / branch / PR | `.agent/skills/git-workflow.md` |
| Quality review | `.agent/skills/frontend-quality-review.md` |
| Performance audit | `.agent/skills/performance-audit.md` |

Spec outputs live in `.agent/specs/`.

## Key Rules

- Begin implementation only after spec approval is recorded.
- Resolve ambiguity through questions — do not assume.
- Create a feature branch `issues/<type>-<topic>` before any code change.
- Commit and push exclusively on feature branches.
