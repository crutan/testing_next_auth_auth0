import type { StorybookConfig } from "@storybook/nextjs";
import path from "path";

const config: StorybookConfig = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "storybook-addon-performance",
    "storybook-dark-mode",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {
      nextConfigPath: path.resolve(__dirname, "../next.config.js"),
    },
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: [
    { from: "../public", to: "/public" },
    { from: "../docs", to: "/docs" },
  ],
};

export default config;
