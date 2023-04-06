import React, {
  KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { cn } from "@lib/utils/twHelpers";
import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  endOfMonth,
  formatISO,
  getMonth,
  getWeeksInMonth,
  getYear,
  isSameMonth,
  max as maxOfDates,
  min as minOfDates,
  parseISO,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subDays,
  subMonths,
  subWeeks,
  subYears,
} from "date-fns";
import { ComponentIcon } from "ui/ComponentIcon";

import { CalendarProps } from "./Calendar.types";
import CalendarCell from "./CalendarCell";
import { CalendarContext } from "./context";
import { dateToHumanReadableStr, DAY_NAMES, MONTH_NAMES } from "./utils";

// Input Dates must represent dates only and cannot include times
const Calendar = ({
  "aria-label": ariaLabelIn,
  disabled,
  isReadOnly,
  minDate,
  maxDate,
  defaultFocusedDate,
  defaultSelectedDate,
  onFocusedDateChange,
  onSelectedDateChange,
  className,
  ...props
}: CalendarProps) => {
  const todayDate = startOfDay(new Date());
  const [focusedDate, setFocusedDate] = useState<Date>(
    defaultFocusedDate ?? todayDate
  );
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    defaultSelectedDate
  );
  const cellRefs = React.useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    if (onFocusedDateChange) onFocusedDateChange(focusedDate);
  }, [onFocusedDateChange, focusedDate]);
  useEffect(() => {
    if (onSelectedDateChange && selectedDate != null)
      onSelectedDateChange(selectedDate);
  }, [onSelectedDateChange, selectedDate]);

  // The focusedMonthIso string prevents unnecessary calendarGrid rendering
  //  since it does not change unless the month of the focusedDate changes
  const focusedMonthIso = formatISO(startOfMonth(focusedDate), {
    representation: "date",
  });
  const focusedMonthLabel = `${MONTH_NAMES[getMonth(focusedDate)]} ${getYear(
    focusedDate
  )}`;
  const ariaLabel = `${
    ariaLabelIn ? `${ariaLabelIn}, ` : ""
  }${focusedMonthLabel}`;

  const handleCellClick = useCallback(
    (date: Date) => {
      setFocusedDate(date);
      if (!isReadOnly) setSelectedDate(date);
    },
    [isReadOnly]
  );

  const handleCellKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      const updateFocusedDate = (
        transformationFn: (prevFocusedDate: Date) => Date
      ) => {
        e.preventDefault();
        e.stopPropagation();
        setFocusedDate((prevFocusedDate: Date) => {
          // Transform prevFocusedDate and then use minDate if below range or maxDate if above range
          let newFocusedDate = transformationFn(prevFocusedDate);
          newFocusedDate =
            minDate != null
              ? maxOfDates([newFocusedDate, minDate])
              : newFocusedDate;
          newFocusedDate =
            maxDate != null
              ? minOfDates([newFocusedDate, maxDate])
              : newFocusedDate;

          const newFocusedDateISO = formatISO(newFocusedDate, {
            representation: "date",
          });
          // The cellRefs are only for the month of prevFocusedDate so we need to
          //  wait for calendarGrid to re-render if newFocusedDate is in a different month.
          //  We do this by adding the focus call to the event queue.
          setTimeout(() => cellRefs.current[newFocusedDateISO]?.focus());
          return newFocusedDate;
        });
      };

      switch (e.key) {
        case "PageUp": // Go back 1 month or 1 year with shift key
          updateFocusedDate((prevFocusedDate) =>
            e.shiftKey
              ? subYears(prevFocusedDate, 1)
              : subMonths(prevFocusedDate, 1)
          );
          break;
        case "PageDown": // Go forward 1 month or 1 year with shift key
          updateFocusedDate((prevFocusedDate) =>
            e.shiftKey
              ? addYears(prevFocusedDate, 1)
              : addMonths(prevFocusedDate, 1)
          );
          break;
        case "Home": // Go to start of month
          updateFocusedDate((prevFocusedDate) => startOfMonth(prevFocusedDate));
          break;
        case "End": // Go to end of month
          updateFocusedDate((prevFocusedDate) => endOfMonth(prevFocusedDate));
          break;
        case "ArrowLeft": // Go back 1 day
          updateFocusedDate((prevFocusedDate) => subDays(prevFocusedDate, 1));
          break;
        case "ArrowRight": // Go forward 1 day
          updateFocusedDate((prevFocusedDate) => addDays(prevFocusedDate, 1));
          break;
        case "ArrowUp": // Go back 1 week
          updateFocusedDate((prevFocusedDate) => subWeeks(prevFocusedDate, 1));
          break;
        case "ArrowDown": // Go forward 1 week
          updateFocusedDate((prevFocusedDate) => addWeeks(prevFocusedDate, 1));
          break;
      }
    },
    [minDate, maxDate]
  );

  const calendarGrid = useMemo(() => {
    const focusedMonth = parseISO(focusedMonthIso);
    return [...Array(getWeeksInMonth(focusedMonth))].map((_, weekIdx) => {
      const firstDateForWeekIdx = addWeeks(startOfWeek(focusedMonth), weekIdx);

      // Reset cellRefs since existing refs are for the previously rendered month/grid
      cellRefs.current = {};

      return (
        <tr key={weekIdx}>
          {[...Array(DAY_NAMES.length)].map((_, dayIdx) => {
            const date = addDays(firstDateForWeekIdx, dayIdx);
            const dateISO = formatISO(date, { representation: "date" });
            return (
              <CalendarCell
                date={date}
                key={dayIdx}
                onClick={() => {
                  handleCellClick(date);
                }}
                onKeyDown={handleCellKeyDown}
                ref={(el: HTMLButtonElement | null) =>
                  (cellRefs.current[dateISO] = el)
                }
              />
            );
          })}
        </tr>
      );
    });
  }, [focusedMonthIso, handleCellClick, handleCellKeyDown]);

  return (
    <div
      aria-label={ariaLabel}
      className={cn("w-64 text-onyx-0", className)}
      data-testid="CalendarContainer"
      role="group"
      {...props}
    >
      {/* Screen reader only month label (eg "January 2023") - placed here so it is read before the previous button */}
      <span
        aria-live="assertive"
        className="sr-only"
        data-testid="CalendarSrFocusedMonth"
      >
        {focusedMonthLabel}
      </span>
      <div
        className="grid grid-cols-[minmax(auto,1fr)_auto_minmax(auto,1fr)]"
        data-testid="CalendarHeader"
      >
        <button
          aria-label="Previous"
          className="justify-self-start rounded-full outline-none focus-visible:bg-onyx-700 hover:enabled:bg-onyx-700 disabled:text-onyx-300"
          data-testid="CalendarHeaderPreviousButton"
          disabled={
            disabled || (minDate != null && isSameMonth(focusedDate, minDate))
          }
          onClick={() =>
            setFocusedDate((prevFocusedDate) => subMonths(prevFocusedDate, 1))
          }
        >
          <ComponentIcon format="solid" icon="ChevronLeftIcon" size="large" />
        </button>
        <span aria-hidden data-testid="CalendarHeaderFocusedMonthLabel">
          {focusedMonthLabel}
        </span>
        <button
          aria-label="Next"
          className="justify-self-end rounded-full outline-none focus-visible:bg-onyx-700 hover:enabled:bg-onyx-700 disabled:text-onyx-300"
          data-testid="CalendarHeaderNextButton"
          disabled={
            disabled || (maxDate != null && isSameMonth(focusedDate, maxDate))
          }
          onClick={() =>
            setFocusedDate((prevFocusedDate) => addMonths(prevFocusedDate, 1))
          }
        >
          <ComponentIcon format="solid" icon="ChevronRightIcon" size="large" />
        </button>
      </div>
      <table
        aria-disabled={disabled}
        aria-label={ariaLabel}
        className="w-full table-fixed border-collapse border-spacing-0 select-none"
        role="grid"
      >
        {/* Day names are hidden since the aria-labels for each date already include the day name (e.g., "Sunday, January 1, 2023") */}
        <thead aria-hidden="true">
          <tr>
            {DAY_NAMES.map((dayName) => (
              <th className="w-8 pt-4 pb-1" key={dayName}>
                {dayName.slice(0, 1)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <CalendarContext.Provider
            value={{
              todayDate,
              minDate,
              maxDate,
              isReadOnly,
              allCellsDisabled: disabled,
              focusedDate,
              selectedDate,
            }}
          >
            {calendarGrid}
          </CalendarContext.Provider>
        </tbody>
      </table>
      {/* Screen reader only aria-live region to announce when a date has been selected */}
      <span
        aria-live="polite"
        className="sr-only"
        data-testid="CalendarSrSelectedDate"
        role="log"
      >
        {selectedDate &&
          `Selected Date: ${dateToHumanReadableStr(selectedDate)}`}
      </span>
    </div>
  );
};
Calendar.displayName = "Calendar";

export default Calendar;
