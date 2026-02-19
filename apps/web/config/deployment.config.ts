import type { GameMeta } from "@/config/games.config";

function getEnvValue(key?: string): string | undefined {
  if (!key) {
    return undefined;
  }

  const raw = process.env[key];
  if (!raw) {
    return undefined;
  }

  const trimmed = raw.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

export function getDeploymentUrl(game: GameMeta): string | undefined {
  return getEnvValue(game.deploymentEnvKey);
}

export function getLocalDevUrl(game: GameMeta): string | undefined {
  if (!game.deploymentEnvKey) {
    return undefined;
  }

  const localKey = game.deploymentEnvKey.endsWith("_URL")
    ? game.deploymentEnvKey.replace(/_URL$/, "_LOCAL_URL")
    : `${game.deploymentEnvKey}_LOCAL`;

  return getEnvValue(localKey);
}

export function getHubCardHref(game: GameMeta): string {
  const deploymentUrl = getDeploymentUrl(game);
  const isLive = game.status === "live";

  if (isLive && deploymentUrl) {
    return deploymentUrl;
  }

  if (process.env.NODE_ENV === "development") {
    const localDevUrl = getLocalDevUrl(game);
    if (localDevUrl) {
      return localDevUrl;
    }
  }

  return `/${game.slug}`;
}

export function getGameLandingRedirectUrl(game: GameMeta): string | undefined {
  const deploymentUrl = getDeploymentUrl(game);

  if (game.status === "live" && deploymentUrl) {
    return deploymentUrl;
  }

  if (process.env.NODE_ENV === "development") {
    return getLocalDevUrl(game);
  }

  return undefined;
}
