import React from "react";
import { TextArea, TextAreaBaseProps } from "ui/FormFields";

// Retain automatic argTypes generation by wrapping TextArea
//  This is a necessary workaround since TextArea is wrapped with forwardRef
export const TextAreaDemo = (props: TextAreaBaseProps) => {
  return <TextArea {...props} />;
};
