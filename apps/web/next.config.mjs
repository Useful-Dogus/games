import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(__dirname, "../..");

const rootEnvPath = path.join(repoRoot, ".env");
if (fs.existsSync(rootEnvPath)) {
  const lines = fs.readFileSync(rootEnvPath, "utf8").split("\n");
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const separator = line.indexOf("=");
    if (separator <= 0) continue;
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();
    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

const gameRouteTargets = [
  { slug: "patisserie-drop", target: process.env.PATISSERIE_DROP_URL },
  { slug: "sadari", target: process.env.SADARI_URL },
  { slug: "santa-endless-runner", target: process.env.SANTA_ENDLESS_RUNNER_URL }
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: repoRoot,
  async rewrites() {
    const mappedRoutes = gameRouteTargets
      .filter((route) => Boolean(route.target))
      .map((route) => ({
        source: `/${route.slug}/:path*`,
        destination: `${route.target}/:path*`
      }));

    return {
      beforeFiles: mappedRoutes,
      afterFiles: [],
      fallback: []
    };
  }
};

export default nextConfig;
