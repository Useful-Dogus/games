import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const gameRouteTargets = [
  { slug: "patisserie-drop", target: process.env.PATISSERIE_DROP_URL },
  { slug: "sadari", target: process.env.SADARI_URL },
  { slug: "santa-endless-runner", target: process.env.SANTA_ENDLESS_RUNNER_URL }
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: path.join(__dirname, "../.."),
  async rewrites() {
    return gameRouteTargets
      .filter((route) => Boolean(route.target))
      .map((route) => ({
        source: `/${route.slug}/:path*`,
        destination: `${route.target}/:path*`
      }));
  }
};

export default nextConfig;
