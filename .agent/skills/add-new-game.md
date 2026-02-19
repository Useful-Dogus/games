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

4. **Add rewrite rule**
   - In `apps/web/next.config.js`, add:
     ```js
     { source: '/<slug>/:path*', destination: 'https://<slug>.vercel.app/:path*' }
     ```

5. **Verify Turborepo / pnpm workspace**
   - Confirm `pnpm-workspace.yaml` includes `apps/*` (or add `apps/<slug>` explicitly if needed).
   - Run `pnpm turbo build` to confirm no task graph breakage.

6. **Update agent docs**
   - Add a row to `.agent/project/games-registry.md`.
   - Add a row to `docs/games/<slug>.md`.

7. **Vercel deployment** _(requires user action)_
   - Create a new Vercel project linked to `apps/<slug>`.
   - Set the deployment URL to `https://<slug>.vercel.app`.
   - Note the URL and confirm the rewrite destination in step 4 matches.

## Completion Criteria

- [ ] Game appears in the hub site game list (`apps/web/config/games.config.ts`).
- [ ] Placeholder page is accessible at the correct slug path.
- [ ] `games-registry.md` and `docs/games/<slug>.md` are created/updated.
- [ ] `pnpm turbo build` passes without errors.
