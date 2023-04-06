import React from "react";
import { Checkbox, CheckboxProps } from "ui/FormFields";

// Retain automatic argTypes generation by wrapping Checkbox
//  This is a necessary workaround since Checkbox is wrapped with forwardRef
export const CheckboxDemo = (props: CheckboxProps) => {
  return <Checkbox {...props} />;
};
