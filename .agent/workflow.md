# Spec-Driven Workflow

Defines the default execution lifecycle to reduce uncertainty before implementation.

## 3-Step Lifecycle (Role View)

1. Architect: Analysis, Scouting, Spec / Plan
2. Developer: Task-based Implementation
3. Reviewer: Verification, Risk Report

Feedback loops:

- Reviewer → Developer: defect / gap feedback
- Developer → Architect: re-design request on spec collision or discovered assumption

## Execution Sequence

Follow this sequence for every task:

1. Create a feature branch (`issues/<type>-<topic>`), then write spec and get user approval.
2. After spec approval, write plan and get user approval.
3. After plan approval, implement and verify on the feature branch.
4. Run self-review and fix loop until quality criteria are met.
5. Open a PR and report to the user.

---

## Phase 0: Intake

- Collect goal, constraints, and completion criteria.
- Build a question list for any missing information before proceeding.
- Output: `Intake Note` + open questions + `Scouting candidate paths`

Gate:

- Is the goal and completion criteria stated in clear sentences?
- Is Out of Scope defined?

## Phase 1: Specify (What / Why)

- Document user-facing requirements and success criteria.
- Technology choices are not the subject of this phase.
- Output: `.agent/specs/<feature>-spec.md`

Required content: user journey, success criteria, non-functional requirements, out-of-scope.

Gate:

- Are "what to build" and "why it's needed" separated?
- Is each acceptance criterion written in a testable sentence?

## Phase 2: Plan (How)

- Compile stack / architecture / constraints / operational needs / risks.
- Compare at least two alternatives when applicable.
- Output: `.agent/specs/<feature>-plan.md`

Required content: stack, architecture, constraints, risks, alternative comparisons.

Gate:

- Have conflicts with existing system constraints been reviewed?
- Are minimum performance, security, and operational criteria defined?

## Phase 3: Tasks (Break it down)

- Decompose the plan into small, independently verifiable tasks.
- Each task must be implementable and verifiable independently.
- Output: `.agent/specs/<feature>-tasks.md`

Required content: task list with completion criteria, estimated time (5–30 min per task), dependency map.

Gate:

- Are tasks broken into 5–30 minute chunks?
- Does each task have a completion criterion?

## Phase 4: Implement (Build / Verify)

- Implement task by task and verify immediately.
- When results differ from expectation, update the upstream document (Spec / Plan / Tasks) first.
- Output: code + verification log + change summary

Required content: single logical unit of change, verification log, traceability link to spec.

Gate:

- Does the implementation satisfy the spec's acceptance criteria?
- Are remaining risks and follow-up actions documented?

---

## Universal Artifact Requirements

Every phase output (Intake Note, Spec, Plan, Tasks, or Implementation report) must include:

- **Assumptions**: list all assumptions, or write "none".
- **Open questions**: unresolved items that need a decision.
- **Approval status**: `DRAFT` / `APPROVED` / `BLOCKED`.
- **Approval metadata**: approver display name + approval date when status is `APPROVED` or `BLOCKED`.
  - Never use generic placeholders (`User`, `Reviewer`) if a concrete approver name is known.

---

## Operating Rules

- Follow phases in order: Spec → Plan → Tasks → Implement.
- When implementation conflicts with spec, update the document before updating the code.
- Store screenshots and reference artifacts in `.agent/references/`.
- Branch-based (PR) integration is the default. See `skills/git-workflow.md` for branch and commit rules.
- Keep root `README.md` / `AGENTS.md` minimal; record details in `.agent` documents.
- During implementation, create task-aligned checkpoint commits instead of one large end-of-work commit.
  - One commit should map to one independently verifiable unit (typically one task or one tightly related task pair).

### Exception: Emergency Bug

Applies when: a production bug requires an immediate fix that cannot wait for the full lifecycle.

Minimum required output:

- Intake Note (goal + reproduction steps)
- Spec covering: what changed, why it changed, and what is out of scope

Proceed to Phase 4 without Phase 2 (Plan) or Phase 3 (Tasks). Record the skipped phases and the reason in the Intake Note.
