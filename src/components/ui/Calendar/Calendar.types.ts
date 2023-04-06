import { ComponentPropsWithoutRef } from "react";

export interface CalendarVariant {
  disabled?: boolean;
  isReadOnly?: boolean;
  minDate?: Date;
  maxDate?: Date;
  defaultFocusedDate?: Date;
  defaultSelectedDate?: Date;
  onFocusedDateChange?: (focusedDate: Date) => void;
  onSelectedDateChange?: (selectedDate: Date) => void;
}

export type CalendarProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "children" | "onChange"
> &
  CalendarVariant;
