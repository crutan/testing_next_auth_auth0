import React from "react";
import { cva, VariantProps } from "class-variance-authority";

import type { GridBaseProps } from "./Grid.types";

import { cn } from "@/lib/utils/twHelpers";

export type GridProps = VariantProps<typeof GridBase> & GridBaseProps;

const GridBase = cva(["grid", "auto-cols-max"], {
  variants: {
    size: { fullBleed: "w-full", container: "container" },
    columns: {
      4: "grid-cols-4",
      8: "grid-cols-8",
      12: "grid-cols-12",
      16: "grid-cols-16",
    },
    gap: {
      none: "gap-0",
      minimal: "gap-4",
      loose: "gap-8",
    },
    breakpoints: {
      standard: null,
      none: null,
    },
  },
  defaultVariants: {
    breakpoints: "standard",
    size: "fullBleed",
    gap: "none",
  },
  compoundVariants: [
    {
      breakpoints: "standard",
      columns: 4,
      class: "grid-cols-4",
    },
    {
      breakpoints: "standard",
      columns: 8,
      class: ["grid-cols-4", "md:grid-cols-8"],
    },
    {
      breakpoints: "standard",
      columns: 12,
      class: ["grid-cols-4", "md:grid-cols-8", "lg:grid-cols-12"],
    },
    {
      breakpoints: "standard",
      columns: 16,
      class: ["grid-cols-4", "md:grid-cols-8", "lg:grid-cols-16"],
    },
  ],
});

const Grid = ({
  columns,
  size,
  gap,
  as,
  breakpoints,
  children,
  className,
  ...rest
}: GridProps) => {
  return React.createElement(
    as ?? "div",
    {
      className: cn(GridBase({ columns, breakpoints, size, gap }), className),
      ...rest,
    },
    children
  );
};

export default Grid;
