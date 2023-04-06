import { ComponentPropsWithoutRef } from "react";
import { TextTag } from "ui/Text/Text.types";

export type FormFieldLabelTag = Extract<TextTag, "p">;

export interface FormFieldLabelVariant {
  children?: string;
}

export type FormFieldLabelProps = Omit<
  ComponentPropsWithoutRef<FormFieldLabelTag>,
  "children"
> &
  FormFieldLabelVariant;
