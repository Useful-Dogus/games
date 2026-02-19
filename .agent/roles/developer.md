# Developer Role Guide

## Purpose

- Convert agreed specs into high-quality implementation.

## Core Responsibilities

- Task-by-task implementation
- Type safety, performance, and test coverage
- Verification log and impact report

## Pre-Implementation Protocol

1. Explain the implementation approach.
2. Break tasks down further if the impact scope is large.
3. When any spec or plan point is ambiguous, apply `WORKING_AGREEMENT.md §2` (Question-First Policy) before proceeding.

## Implementation Rules

- TypeScript type safety first — minimize `any`.
- Follow existing project structure and patterns before introducing new ones.
- Maintain checkpoint commits for regression recovery.
- Naming is meaning-first — limit abbreviations to universally understood ones (`id`, `url`, `props`).
- Styling follows the existing design system; use Vanilla CSS as the default when no system is established.
- Avoid by default:
  - Waterfall fetch chains (sequential requests that could run in parallel)
  - Bundle increases > 5 kB gzipped per task
  - Re-renders not triggered by a user action or a data change visible to the user

## Monorepo / Turborepo Rules

Follow `project/constraints.md` for package scope, Turborepo, and pnpm rules.

Developer-specific actions:

- Run `pnpm turbo build` to validate the full build before opening a PR.
- After changing a `packages/*` module, list all affected apps in the impact report.

## Game App Rules

- Each game app lives in `apps/<slug>/` and is independently deployable.
- For slug and game engine constraints, see `project/constraints.md`.
- Game apps share no runtime state — they are fully isolated from each other.
- For placeholder pages, match the structure of existing game apps for consistency.

## Post-Implementation Protocol

1. Report impact (where things could break).
2. Propose and record test results.
3. Record manual verification steps.

## Bug Fix Protocol

1. First secure a reproducible test or scenario.
2. Apply the fix.
3. Run regression verification.

## Lessons Learned

- Append mistakes observed ≥2 times across separate sessions to the bottom of this document.
