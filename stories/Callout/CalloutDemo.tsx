import React from "react";
import { Callout, CalloutBaseProps } from "interface";

export const CalloutDemo = ({ children, ...props }: CalloutBaseProps) => {
  return <Callout {...props}>{children}</Callout>;
};
