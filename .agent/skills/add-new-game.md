# Skill: Add New Game

Purpose:
- Standardize the process of adding a new game app to the Dogus Games monorepo platform.

Trigger:

- A new game needs to be added to the platform.

## Pre-Implementation Gate

Confirm the following with the user before writing any code:

- [ ] `slug` — URL slug and directory name (must be identical, per `GAME-003` in SRS)
- [ ] `title` — display title
- [ ] `description` — one-line description
- [ ] `genre` — genre tags (array of strings)
- [ ] `status` — initial status (always `coming-soon` for a placeholder)
- [ ] Framework choice — Next.js (default) or Vite + React

## Implementation Checklist

1. **Create branch**
   - Branch: `issues/feat-add-<slug>`

2. **Create app directory**
   - `apps/<slug>/` with placeholder structure matching existing game apps.

3. **Register in hub config**
   - Add entry to `apps/web/config/games.config.ts` with all `GameMeta` fields.
   - Include `deploymentEnvKey` for the game's deployment URL variable.

4. **Configure deployment URL variable**
   - Add the game's deployment env key to `.env.example`.
   - Keep the value empty until the game is actually deployed.
   - Hub behavior:
     - `status: coming-soon` or empty env URL -> in-hub 안내 페이지
     - `status: live` + env URL set -> hub card moves directly to the external game URL

5. **Verify Turborepo / pnpm workspace**
   - Confirm `pnpm-workspace.yaml` includes `apps/*` (or add `apps/<slug>` explicitly if needed).
   - Run `pnpm turbo build` to confirm no task graph breakage.

6. **Update agent docs**
   - Add a row to `.agent/project/games-registry.md`.
   - Add a row to `docs/games/<slug>.md`.

7. **Vercel deployment** _(requires user action)_
   - Create a new Vercel project linked to `apps/<slug>`.
   - Set the deployment URL to `https://<slug>.vercel.app`.
   - Set the corresponding env var in `apps/web` project and switch status to `live` when ready.

## Completion Criteria

- [ ] Game appears in the hub site game list (`apps/web/config/games.config.ts`).
- [ ] `coming-soon` game slug shows in-hub 안내 페이지 at `/<slug>`.
- [ ] `live` + deployment URL configured game card moves to the external game URL.
- [ ] `games-registry.md` and `docs/games/<slug>.md` are created/updated.
- [ ] `pnpm turbo build` passes without errors.
