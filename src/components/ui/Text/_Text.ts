import { cva } from "class-variance-authority";

import { CVAVariants } from "../shared.types";

import { FontSize, FontWeight } from "./Text.types";

const size: CVAVariants<FontSize> = {
  h1: "text-4xl",
  h2: "text-3xl",
  h3: "text-2xl",
  h4: "text-xl",
  h5: "text-lg",
  h6: "text-base",
  base: "text-base",
  small: "text-sm",
  xsmall: "text-xs",
  micro: "text-2xs",
};

const weight: CVAVariants<FontWeight> = {
  book: "font-normal",
  medium: "font-medium",
  bold: "font-bold",
};

export const _Text = cva([], {
  variants: {
    size,
    weight,
    noColor: {
      false: "",
    },
  },
  compoundVariants: [
    {
      size: ["h1", "h2", "h3", "h4", "h5", "h6"],
      noColor: false,
      className: "text-onyx-25 contrast-more:text-onyx-0",
    },
    {
      size: ["base", "small", "xsmall", "micro"],
      noColor: false,
      className: "text-onyx-50 contrast-more:text-onyx-25",
    },
    {
      size: ["h1", "h2"],
      className: "font-futura font-normal",
    },
    {
      size: ["h3", "h4", "h5", "h6"],
      weight: "bold",
      className: "tracking-tight",
    },
    {
      size: "xsmall",
      weight: "bold",
      className: "tracking-wide",
    },
    {
      size: "micro",
      weight: "bold",
      className: "tracking-wider",
    },
  ],
});
