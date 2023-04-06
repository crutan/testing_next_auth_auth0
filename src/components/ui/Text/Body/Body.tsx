import React from "react";
import { _Text } from "ui/Text/_Text";

import { BodyProps } from "./Body.types";

import { cn } from "@/lib/utils/twHelpers";

const Body = ({
  as = "p",
  size = "base",
  weight = "book",
  noColor = false,
  children,
  className,
  ...rest
}: BodyProps) => {
  return React.createElement(
    as,
    {
      className: cn(
        _Text({
          size,
          weight,
          noColor,
        }),
        className
      ),
      ...rest,
    },
    children
  );
};

export default Body;
