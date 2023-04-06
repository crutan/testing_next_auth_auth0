import React from "react";
import { Grid, GridBaseProps } from "ui/Grid";
import type { UIBasePropsWithoutRef } from "ui/shared.types";

import { cn } from "@/lib/utils/twHelpers";

const GridDemoItem = ({
  className,
  children,
}: Omit<UIBasePropsWithoutRef<"div">, "as">) => {
  return (
    <div
      className={cn(
        "flex h-20 w-full items-center justify-center text-4xl text-white",
        className
      )}
    >
      {children}
    </div>
  );
};

export const GridDemo = ({
  size,
  columns,
  breakpoints,
  gap,
  ...props
}: GridBaseProps) => {
  return (
    <Grid
      breakpoints={breakpoints}
      className="border-4 border-solid border-red-400"
      columns={columns}
      gap={gap}
      size={size}
      {...props}
    >
      <GridDemoItem className="bg-onyx-400">1</GridDemoItem>
      <GridDemoItem className="bg-celesteal-400">2</GridDemoItem>
      <GridDemoItem className="bg-melon-400">3</GridDemoItem>
      <GridDemoItem className="bg-success-400">4</GridDemoItem>
      <GridDemoItem className="bg-warning-400">6</GridDemoItem>
      <GridDemoItem className="bg-error-400">7</GridDemoItem>
      <GridDemoItem className="bg-info-400">8</GridDemoItem>
      <GridDemoItem className="bg-onyx-400">9</GridDemoItem>
      <GridDemoItem className="bg-celesteal-400">10</GridDemoItem>
      <GridDemoItem className="bg-melon-400">11</GridDemoItem>
      <GridDemoItem className="bg-success-400">12</GridDemoItem>
      <GridDemoItem className="bg-warning-400">13</GridDemoItem>
      <GridDemoItem className="bg-error-400">14</GridDemoItem>
      <GridDemoItem className="bg-info-400">15</GridDemoItem>
      <GridDemoItem className="bg-onyx-400">16</GridDemoItem>
      <GridDemoItem className="bg-celesteal-400">17</GridDemoItem>
      <GridDemoItem className="bg-melon-400">18</GridDemoItem>
    </Grid>
  );
};
