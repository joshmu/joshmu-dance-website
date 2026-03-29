import type { KnipConfig } from "knip";

const config: KnipConfig = {
  entry: ["app/**/*.{ts,tsx}", "src/**/*.{ts,tsx}"],
  project: ["app/**/*.{ts,tsx}", "src/**/*.{ts,tsx}"],
  ignoreDependencies: ["autoprefixer"],
};

export default config;
