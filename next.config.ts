import type { NextConfig } from "next";

const repo = "civicthread-20261121";
const onPages = process.env.PAGES_BUILD === "true";
const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  allowedDevOrigins: ["127.0.0.1"],
  images: {unoptimized: true},
  basePath: onPages ? `/${repo}` : "",
  assetPrefix: onPages ? `/${repo}/` : undefined,
};
export default config;
