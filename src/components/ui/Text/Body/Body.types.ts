import { UIBasePropsWithoutRef } from "ui/shared.types";
import { FONT_WEIGHT, FontSize, FontWeight, TextTag } from "ui/Text/Text.types";

export type BodyTag = Extract<TextTag, "p" | "span">;
export type BodyFontSize = Extract<
  FontSize,
  "large" | "base" | "small" | "xsmall" | "micro"
>;
export type BodyFontWeight = Extract<FontWeight, "book" | "medium" | "bold">;

export const BODY_FONT_WEIGHT = <Record<400 | 500 | 700, BodyFontWeight>>(
  FONT_WEIGHT
);

export interface BodyVariant {
  size?: BodyFontSize;
  weight?: BodyFontWeight;
  noColor?: boolean;
}

export type BodyProps = Omit<UIBasePropsWithoutRef<BodyTag>, "as"> &
  Partial<Pick<UIBasePropsWithoutRef<TextTag>, "as">> &
  BodyVariant;
