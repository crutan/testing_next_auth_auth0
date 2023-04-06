import React from "react";
import { Heading, HeadingProps } from "ui/Text";

export const HeadingDemo = ({
  size = "h1",
  weight = "bold",
  children,
  ...props
}: HeadingProps) => {
  return (
    <Heading size={size} weight={weight} {...props}>
      {children
        ? children
        : `${size.toUpperCase()}: ${
            size === "h1" || size === "h2"
              ? "Futura Passata"
              : `Gotham ${weight.slice(0, 1).toUpperCase()}${weight.slice(1)}`
          }`}
    </Heading>
  );
};
