import { UIBasePropsWithoutRef } from "ui/shared.types";
import { FONT_WEIGHT, FontSize, FontWeight, TextTag } from "ui/Text/Text.types";

export type HeadingTag = Extract<
  TextTag,
  "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
>;
export type HeadingFontSize = Extract<
  FontSize,
  "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
>;
export type HeadingFontWeight = Extract<FontWeight, "book" | "bold">;

export const HEADING_FONT_WEIGHT = <Record<400 | 700, HeadingFontWeight>>(
  FONT_WEIGHT
);

export interface HeadingVariant {
  size: HeadingFontSize;
  weight?: HeadingFontWeight;
  noColor?: boolean;
}

export type HeadingProps = Omit<UIBasePropsWithoutRef<HeadingTag>, "as"> &
  Partial<Pick<UIBasePropsWithoutRef<TextTag>, "as">> &
  HeadingVariant;
