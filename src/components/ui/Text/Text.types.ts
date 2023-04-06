export type TextTag =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "label";
export type FontSize =
  | Extract<TextTag, "h1" | "h2" | "h3" | "h4" | "h5" | "h6">
  | "base"
  | "small"
  | "xsmall"
  | "micro";
export type FontWeight = "book" | "medium" | "bold";

export const FONT_WEIGHT: Record<number, FontWeight> = {
  400: "book",
  500: "medium",
  700: "bold",
};
