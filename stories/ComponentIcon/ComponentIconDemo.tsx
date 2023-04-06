import React from "react";
import { ComponentIcon, ComponentIconProps } from "ui/ComponentIcon";

// Retain automatic argTypes generation by wrapping ComponentIcon
//  This is a necessary workaround since ComponentIcon is wrapped with forwardRef
export const ComponentIconDemo = (props: ComponentIconProps) => {
  return <ComponentIcon {...props} />;
};
