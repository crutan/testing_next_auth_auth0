import { ComponentPropsWithoutRef, ComponentPropsWithRef } from "react";

export interface CalendarCellVariant {
  date: Date;
  cellProps?: ComponentPropsWithoutRef<"td">;
}

export type CalendarCellProps = Omit<
  ComponentPropsWithRef<"button">,
  "children" | "disabled"
> &
  CalendarCellVariant;
