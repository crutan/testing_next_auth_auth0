import React, { useContext } from "react";
import { cn } from "@lib/utils/twHelpers";
import { getDate, isAfter, isBefore, isSameDay, isSameMonth } from "date-fns";

import { CalendarCellProps } from "./CalendarCell.types";
import { CalendarContext } from "./context";
import { dateToHumanReadableStr } from "./utils";

const _CalendarCellButton = ({
  isInDifferentMonth,
  isToday,
  isSelected,
  isReadOnly,
}: {
  isInDifferentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isReadOnly?: boolean;
}) =>
  cn(
    "mx-auto h-8 w-8 rounded-full outline-none enabled:hover:bg-onyx-800",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-celesteal-500 disabled:text-onyx-300",
    isInDifferentMonth && "invisible",
    isToday && "bg-onyx-700",
    isSelected &&
      "bg-celesteal-500 hover:bg-celesteal-400 enabled:hover:bg-celesteal-400",
    isReadOnly && "cursor-default"
  );

const CalendarCell = React.forwardRef<HTMLButtonElement, CalendarCellProps>(
  ({ date, cellProps, ...props }, ref) => {
    const CalendarProps = useContext(CalendarContext);

    const isInDifferentMonth =
      CalendarProps.focusedDate == null ||
      !isSameMonth(date, CalendarProps.focusedDate);
    const isOutOfRange =
      (CalendarProps.minDate != null &&
        isBefore(date, CalendarProps.minDate)) ||
      (CalendarProps.maxDate != null && isAfter(date, CalendarProps.maxDate));
    const isDisabled =
      isInDifferentMonth || isOutOfRange || CalendarProps?.allCellsDisabled;

    const isToday =
      CalendarProps.todayDate != null &&
      isSameDay(date, CalendarProps.todayDate);
    const isFocused =
      CalendarProps.focusedDate != null &&
      isSameDay(date, CalendarProps.focusedDate);
    const isSelected =
      CalendarProps?.selectedDate != null &&
      isSameDay(date, CalendarProps.selectedDate);

    const ariaLabel = `${isToday ? "Today, " : ""}${dateToHumanReadableStr(
      date
    )}${isSelected ? ", selected" : ""}${
      CalendarProps.minDate != null && isSameDay(date, CalendarProps.minDate)
        ? ", first available date"
        : ""
    }${
      CalendarProps.maxDate != null && isSameDay(date, CalendarProps.maxDate)
        ? ", last available date"
        : ""
    }`;

    return (
      <td
        aria-disabled={isDisabled}
        aria-selected={isSelected}
        className="py-0.5 px-0 text-center"
        data-testid="CalendarCellContainer"
        role="gridcell"
        {...cellProps}
      >
        <button
          aria-label={ariaLabel}
          className={_CalendarCellButton({
            isInDifferentMonth,
            isToday,
            isSelected,
            isReadOnly: CalendarProps?.isReadOnly,
          })}
          data-testid="CalendarCellButton"
          disabled={isDisabled}
          ref={ref}
          tabIndex={isFocused ? 0 : -1}
          {...props}
        >
          {getDate(date)}
        </button>
      </td>
    );
  }
);
CalendarCell.displayName = "CalendarCell";

export default CalendarCell;
