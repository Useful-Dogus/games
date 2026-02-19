import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isDev = process.env.NODE_ENV !== "production";

const patisserieDropUrl =
  process.env.PATISSERIE_DROP_URL ?? (isDev ? "http://127.0.0.1:3001" : "https://patisserie-drop.vercel.app");
const sadariUrl = process.env.SADARI_URL ?? (isDev ? "http://127.0.0.1:3002" : "https://sadari.vercel.app");
const santaRunnerUrl =
  process.env.SANTA_ENDLESS_RUNNER_URL ??
  (isDev ? "http://127.0.0.1:3003" : "https://santa-endless-runner.vercel.app");

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
