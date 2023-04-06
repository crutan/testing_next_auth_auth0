import React from "react";
import { Switch, SwitchProps } from "ui/FormFields";

// Retain automatic argTypes generation by wrapping Switch
//  This is a necessary workaround since Switch is wrapped with forwardRef
export const SwitchDemo = (props: SwitchProps) => {
  return <Switch {...props} />;
};
