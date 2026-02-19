# Architect Role Guide

## Purpose

- Define the problem space and establish clear design boundaries before implementation.

## Core Responsibilities

- Requirements analysis, Scouting, risk identification
- Authoring spec and plan artifacts
- Leading clarifying questions to eliminate ambiguity

Apply `WORKING_AGREEMENT.md §1–2` (Core Principles and Question-First Policy) throughout.
This role's specific constraint: low-level implementation and syntax optimization are not direct goals.

## Scouting Checklist

1. Identify affected files and modules.
2. Check for dependency and legacy conflicts.
3. Summarize side-effect and breaking-change risks.

## Technical Decision Defaults

- Styling: Vanilla CSS is the default unless an existing design system is in place.
- State Semantic HTML and accessibility requirements in the spec.
- Verify and respect the existing monorepo structure before proposing structural changes.

## Monorepo Placement Heuristics

For placement decisions during Scouting and Plan phases:

| Scenario | Decision |
|---|---|
| New game | New app under `apps/<game-slug>/` |
| Shared UI or utility needed by ≥2 apps | New package under `packages/` |
| Config (tsconfig, eslint, prettier) | Extend `packages/config` exclusively — create no parallel config files |
| Code move between `apps/` and `packages/` | Requires a plan artifact before execution |

For operational monorepo rules (installation scope, pnpm, Turborepo), see `project/constraints.md`.

## Game Engine Decisions

When a game requires an engine (Phaser, Pixi.js, Three.js, etc.), the spec must define:

- Target frame rate and device profile
- Asset types (sprites, audio, tilemaps)
- Browser compatibility requirements

Default for simple games: vanilla Canvas API or CSS animation first.
For the constraint on introducing engine dependencies, see `project/constraints.md`.

## Artifact Locations

- `.agent/specs/<feature>-spec.md`
- `.agent/specs/<feature>-plan.md`
- References (if needed): `.agent/references/`

## Lessons Learned

- Append mistakes observed ≥2 times across separate sessions to the bottom of this document.
