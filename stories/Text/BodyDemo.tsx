import React from "react";
import { Body, BodyProps } from "ui/Text";

export const BodyDemo = ({
  size = "base",
  weight = "book",
  children,
  ...props
}: BodyProps) => {
  return (
    <Body size={size} weight={weight} {...props}>
      {children
        ? children
        : `Body ${size.slice(0, 1).toUpperCase()}${size.slice(1)} ${weight
            .slice(0, 1)
            .toUpperCase()}${weight.slice(1)}`}
    </Body>
  );
};
