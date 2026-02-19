import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const patisserieDropUrl = process.env.PATISSERIE_DROP_URL ?? "https://patisserie-drop.vercel.app";
const sadariUrl = process.env.SADARI_URL ?? "https://sadari.vercel.app";
const santaRunnerUrl = process.env.SANTA_ENDLESS_RUNNER_URL ?? "https://santa-endless-runner.vercel.app";

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: path.join(__dirname, "../.."),
  async rewrites() {
    return [
      {
        source: "/patisserie-drop/:path*",
        destination: `${patisserieDropUrl}/:path*`
      },
      {
        source: "/sadari/:path*",
        destination: `${sadariUrl}/:path*`
      },
      {
        source: "/santa-endless-runner/:path*",
        destination: `${santaRunnerUrl}/:path*`
      }
    ];
  }
};

export default nextConfig;
