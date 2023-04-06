import React from "react";
import { parseISO } from "date-fns";
import { Calendar, CalendarProps } from "ui/Calendar";

export const CalendarDemo = ({
  defaultFocusedDate,
  defaultSelectedDate,
  minDate,
  maxDate,
  ...props
}: Omit<
  CalendarProps,
  "defaultFocusedDate" | "defaultSelectedDate" | "minDate" | "maxDate"
> & {
  defaultFocusedDate?: string;
  defaultSelectedDate?: string;
  minDate?: string;
  maxDate?: string;
}) => {
  const convertStrToDate = (dateStr: string | undefined) =>
    dateStr?.length === 10 && dateStr !== "yyyy-MM-dd"
      ? parseISO(dateStr)
      : undefined;

  return (
    <Calendar
      defaultFocusedDate={convertStrToDate(defaultFocusedDate)}
      defaultSelectedDate={convertStrToDate(defaultSelectedDate)}
      maxDate={convertStrToDate(maxDate)}
      minDate={convertStrToDate(minDate)}
      {...props}
    />
  );
};
