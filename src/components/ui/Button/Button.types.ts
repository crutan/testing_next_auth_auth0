import { ComponentPropsWithRef } from "react";

import { IconFormat, IconUnion } from "../ComponentIcon";

type ButtonSizes = "xsmall" | "small" | "base" | "large" | "xlarge";
type ButtonThemes =
  | "primary"
  | "secondary"
  | "tertiary"
  | "modalPrimaryError"
  | "modalSecondary";
type ButtonIconPosition = "leading" | "trailing";
export interface ButtonProperties {
  theme?: ButtonThemes;
  size?: ButtonSizes;
  icon?: IconUnion;
  iconPosition?: ButtonIconPosition;
  iconFormat?: IconFormat;
}

export type ButtonBaseProps = ComponentPropsWithRef<"button"> &
  ButtonProperties;
