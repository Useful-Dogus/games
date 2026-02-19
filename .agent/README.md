# .agent

Single Source of Truth for agent collaboration on Dogus Games.

## Document Map

| Path | Purpose |
|---|---|
| `WORKING_AGREEMENT.md` | Top-level charter — highest priority |
| `workflow.md` | Spec-Driven lifecycle (Phase 0–4), artifact requirements |
| `project/overview.md` | Platform purpose and constraints (Korean) |
| `project/architecture.md` | Monorepo structure and tech stack (Korean) |
| `project/games-registry.md` | Current game list and status (Korean) |
| `project/constraints.md` | Monorepo and game platform rules (Korean) |
| `roles/architect.md` | Architect role guide |
| `roles/developer.md` | Developer role guide |
| `roles/reviewer.md` | Reviewer role guide |
| `skills/git-workflow.md` | Git, branch, and GitHub standards |
| `skills/spec-facilitator.md` | Spec writing facilitation |
| `skills/frontend-quality-review.md` | Frontend quality review (FF4) |
| `skills/performance-audit.md` | Performance audit |
| `skills/add-new-game.md` | New game addition checklist |
| `skills/commit-message.md` | Commit message quick reference |
| `templates/` | Spec / Plan / Tasks / Review / Scout templates |
| `specs/` | Per-feature outputs (spec, plan, tasks) |
| `references/` | Screenshots and reference artifacts (gitignored) |

## Document Priority

When documents conflict, follow this order:

1. `WORKING_AGREEMENT.md`
2. `workflow.md`
3. `roles/*`
4. `skills/*`
5. `templates/*`

## Language Policy

| Document type | Language | Rationale |
|---|---|---|
| Agent behavior files (`WORKING_AGREEMENT`, `workflow`, `roles/`, `skills/`, `templates/`) | English | Consistent parsing across all AI tools (Claude, Codex, etc.) |
| Project context (`project/`) | Korean | Written and reviewed by the Korean-speaking team |
| Work outputs (`specs/`) | Korean | Human review and approval is the primary purpose |
| Root entry points (`CLAUDE.md`, `AGENTS.md`) | English | First file any agent reads |
| Code, variable names, inline comments | English | TypeScript project standard |

## Operating Rules

- Prioritize agreement over implementation.
- All agents share this folder as a common reference point.
- Update `project/games-registry.md` whenever a game is added or its status changes.
