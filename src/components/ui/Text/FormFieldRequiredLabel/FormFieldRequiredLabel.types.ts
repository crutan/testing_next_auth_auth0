import { ComponentPropsWithoutRef } from "react";
import { TextTag } from "ui/Text/Text.types";

export type FormFieldRequiredLabelTag = Extract<TextTag, "label">;

export interface FormFieldRequiredLabelVariant {
  children?: string;
  required?: boolean;
  disabled?: boolean;
  id: string;
}

export type FormFieldRequiredLabelProps = Omit<
  ComponentPropsWithoutRef<FormFieldRequiredLabelTag>,
  "children"
> &
  FormFieldRequiredLabelVariant;
