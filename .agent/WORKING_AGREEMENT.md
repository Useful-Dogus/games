# Working Agreement (Spec-First)

Top-level collaboration charter. Core principle: **minimize assumptions, maximize agreement, implement last**.

> When documents conflict, this file takes priority over all others. See §5.

---

## 1. Core Principles

- Begin implementation only after spec approval is recorded.
- Resolve ambiguity through questions (§2 format) — assumptions are not a substitute.
- Treat **intent**, not code, as the source of truth.
- Evaluate all implementation, review, and testing against the agreed spec.

## 2. Question-First Policy

Ask immediately when any of the following signals appear:

- Terminology is unclear
- Success criteria cannot be measured
- Impact scope is undefined
- Dependencies or constraints are missing
- Security, performance, or operational standards are undecided

Question format:

1. Current understanding
2. Point of uncertainty
3. Options (with recommended option)
4. Impact of each decision

## 3. Definition of Done (DoD)

A task is done when:

- Traceability between spec and implementation is established.
- Verification results (automated/manual) are recorded.
- Remaining risks and follow-up options are documented.
- `.agent` documentation is updated to reflect the current state.

## 4. Single-Agent Mode

**Trigger**: assume Single-Agent Mode unless the user explicitly designates separate agents for each role.

When one agent (e.g., a single Claude session) performs all three roles (Architect → Developer → Reviewer):

- Complete each role's responsibilities fully before transitioning to the next.
- Signal role transitions to the user: _"Architect phase complete — proceeding to Developer."_
- Treat user approval as the gate between roles, identical to multi-agent mode.
- The Reviewer phase is not skippable regardless of time pressure.

## 5. Document Priority

When documents conflict, follow this order:

1. `WORKING_AGREEMENT.md` ← this document
2. `workflow.md`
3. `roles/*`
4. `skills/*`
5. `templates/*`

Root `README.md` and `AGENTS.md` contain entry points only — detailed policies stay in `.agent` sub-documents.

## 6. Language Policy

| Document type | Language | Rationale |
|---|---|---|
| Agent behavior files (`WORKING_AGREEMENT`, `workflow`, `roles/`, `skills/`, `templates/`) | English | Consistent parsing across all AI tools (Claude, Codex, etc.) |
| Project context (`project/`) | Korean | Written and reviewed by the Korean-speaking team |
| Work outputs (`specs/`) | Korean | Human review and approval is the primary purpose |
| Root entry points (`CLAUDE.md`, `AGENTS.md`) | English | First file any agent reads |
| Code, variable names, inline comments | English | TypeScript project standard |

## 7. Approval Attribution Policy

- Approval records must include the approver's explicit display name (for example, `Chanhee Park`).
- Do not use placeholder approver values such as `User`, `Reviewer`, or `N/A` when the user identity is known.
- If the preferred approval name is unclear, ask once before recording approval metadata.
- After the name is confirmed, reuse the same approver name across Spec / Plan / Tasks artifacts for that workstream.

---

## Further Reading

| Topic | File |
|---|---|
| Workflow lifecycle (phases, gates, artifact requirements) | `workflow.md` |
| Git, branch, and GitHub standards | `skills/git-workflow.md` |
| Code quality, review, and performance standards | `roles/reviewer.md`, `skills/frontend-quality-review.md`, `skills/performance-audit.md` |
| Monorepo and game platform constraints | `project/constraints.md` |
