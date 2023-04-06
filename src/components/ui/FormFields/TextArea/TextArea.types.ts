import { ComponentPropsWithRef, CSSProperties } from "react";

export interface TextAreaBaseProps extends ComponentPropsWithRef<"textarea"> {
  status?: "error" | "success" | "warning" | "normal";
  textAreaWrapperStyles?: CSSProperties;
  wrapperStyles?: CSSProperties;
  label?: string;
  helpText?: string;
}

export type TextAreaRef = HTMLTextAreaElement;
