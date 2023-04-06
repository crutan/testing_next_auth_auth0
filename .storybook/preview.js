import "!style-loader!css-loader!postcss-loader!tailwindcss/tailwind.css";
import clsx from "clsx";
import { themes } from "@storybook/theming";
import { withPerformance } from "storybook-addon-performance";
import { Toaster } from "ui/Toast";

import { futuraPassata, gotham } from "@styles/fonts";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  darkMode: {
    current: "dark",
    dark: {
      ...themes.dark,
      appContentBg: "#0C0D0D",
    },
  },
  layout: "fullscreen",
};

export const decorators = [
  withPerformance,
  (Story) => (
    <div
      className={clsx(
        futuraPassata.variable,
        gotham.variable,
        "font-sans",
        "bg-onyx-800 text-onyx-25 contrast-more:bg-onyx-900 contrast-more:text-onyx-0"
      )}
      id="sb-custom-decorator"
      style={{ padding: "1rem" }}
    >
      <Story />
      <Toaster />
    </div>
  ),
];
