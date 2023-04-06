import { ComponentPropsWithRef } from "react";
import { IconFormat, IconUnion } from "ui/ComponentIcon";

export interface StandardInputBaseProps extends ComponentPropsWithRef<"input"> {
  status?: "error" | "success" | "warning" | "normal";
  icon?: IconUnion;
  iconFormat?: IconFormat;
  iconPlacement?: "left" | "right";
  inputWrapperStyles?: string;
  wrapperStyles?: string;
  label?: string;
  helpText?: string;
}

export type InputRef = HTMLInputElement;
