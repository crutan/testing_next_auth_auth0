import React from "react";
import { _Text } from "ui/Text/_Text";

import { HeadingProps } from "./Heading.types";

import { cn } from "@/lib/utils/twHelpers";

const Heading = ({
  as,
  size,
  weight = "book",
  noColor = false,
  children,
  className,
  ...rest
}: HeadingProps) => {
  return React.createElement(
    as ?? size,
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

export default Heading;
