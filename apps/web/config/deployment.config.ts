import type { GameMeta } from "@/config/games.config";

export function getDeploymentUrl(game: GameMeta): string | undefined {
  if (!game.deploymentEnvKey) return undefined;
  const raw = process.env[game.deploymentEnvKey];
  if (!raw) return undefined;
  const trimmed = raw.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}
