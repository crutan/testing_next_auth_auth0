import React from "react";

import { CalendarProps } from "./Calendar.types";

export interface CalendarContextProps
  extends Pick<CalendarProps, "minDate" | "maxDate" | "isReadOnly"> {
  todayDate: Date;
  allCellsDisabled?: boolean;
  focusedDate: Date;
  selectedDate: Date | undefined;
}

export const CalendarContext = React.createContext<
  CalendarContextProps | Record<string, never>
>({});
