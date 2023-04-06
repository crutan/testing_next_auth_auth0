import React from "react";
import { Button, ButtonProps } from "ui/Button";

export const ButtonDemo = ({ children, ...props }: ButtonProps) => {
  return <Button {...props}>{children}</Button>;
};
