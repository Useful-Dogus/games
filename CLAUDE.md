# Dogus Games — Claude Instructions

@.agent/WORKING_AGREEMENT.md
@.agent/workflow.md
@.agent/project/overview.md
@.agent/project/architecture.md
@.agent/project/games-registry.md
@.agent/project/constraints.md
@.agent/skills/git-workflow.md

## Role & Skill Reference

Adopt a role or invoke a skill by reading the relevant file before acting:

- Roles: `.agent/roles/architect.md`, `.agent/roles/developer.md`, `.agent/roles/reviewer.md`
- Skills: `.agent/skills/` (git-workflow, spec-facilitator, frontend-quality-review, performance-audit, add-new-game)
- Templates: `.agent/templates/`
- Spec outputs: `.agent/specs/`

## Claude-Specific Behaviour

- Never auto-commit or auto-push without an explicit user instruction.
- Never run destructive git commands (`reset --hard`, `push --force`, `clean -f`, etc.) without explicit approval.
- Always present commit messages in a fenced code block.
- When scope or approach is unclear, ask — do not infer.
- Never add `Co-Authored-By: Claude` or any AI attribution to commit messages or PRs. All authorship belongs to the submitting engineer.
