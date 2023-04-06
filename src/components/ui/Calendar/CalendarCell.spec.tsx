import React from "react";
import { render, RenderResult } from "@testing-library/react";
import { parseISO } from "date-fns";
import { expect, test } from "vitest";

import CalendarCell from "./CalendarCell";
import { CalendarContext } from "./context";

enum ELEM {
  container = "CalendarCellContainer",
  button = "CalendarCellButton",
}

interface CalendarCellTestCase {
  todayDateStr: string;
  minDateStr?: string;
  maxDateStr?: string;
  dateStr: string;
  focusedDateStr: string;
  selectedDateStr: string | undefined;
  expIsDisabled: boolean;
  isReadOnly?: boolean;
  allCellsDisabled?: boolean;
}

interface ExpectedCalendarCellIsValues {
  isToday: boolean;
  isMin: boolean;
  isMax: boolean;
  isFocused: boolean;
  isSelected: boolean;
  isInDifferentMonth: boolean;
  isDisabled: boolean;
  isReadOnly: boolean;
}

const renderCalendarCell = (testCase: CalendarCellTestCase) => {
  return render(
    <table>
      <tbody>
        <tr>
          <CalendarContext.Provider
            value={{
              todayDate: parseISO(testCase.todayDateStr),
              minDate: testCase.minDateStr
                ? parseISO(testCase.minDateStr)
                : undefined,
              maxDate: testCase.maxDateStr
                ? parseISO(testCase.maxDateStr)
                : undefined,
              focusedDate: parseISO(testCase.focusedDateStr),
              selectedDate: testCase.selectedDateStr
                ? parseISO(testCase.selectedDateStr)
                : undefined,
              isReadOnly: testCase.isReadOnly,
              allCellsDisabled: testCase.allCellsDisabled,
            }}
          >
            <CalendarCell date={parseISO(testCase.dateStr)} />
          </CalendarContext.Provider>
        </tr>
      </tbody>
    </table>
  );
};

const getExpIsValuesForCase = (
  testCase: CalendarCellTestCase
): ExpectedCalendarCellIsValues => {
  return {
    isToday: testCase.dateStr === testCase.todayDateStr,
    isMin: testCase.dateStr === testCase.minDateStr,
    isMax: testCase.dateStr === testCase.maxDateStr,
    isFocused: testCase.dateStr === testCase.focusedDateStr,
    isSelected: testCase.dateStr === testCase.selectedDateStr,
    isInDifferentMonth:
      testCase.dateStr.substring(0, 7) !==
      testCase.focusedDateStr.substring(0, 7),
    isDisabled: testCase.expIsDisabled,
    isReadOnly: testCase.isReadOnly ?? false,
  };
};

const assertIsDisabled = (result: RenderResult, expIsDisabled: boolean) => {
  const containerElem = result.getByTestId(ELEM.container);
  const buttonElem = result.getByTestId(ELEM.button);

  if (expIsDisabled) {
    expect(containerElem).toHaveAttribute("aria-disabled", "true");
    expect(buttonElem).toBeDisabled();
  } else {
    expect(containerElem).not.toHaveAttribute("aria-disabled");
    expect(buttonElem).toBeEnabled();
  }
};

const assertIsSelected = (result: RenderResult, expIsSelected: boolean) => {
  const containerElem = result.getByTestId(ELEM.container);
  const buttonElem = result.getByTestId(ELEM.button);

  const SELECTED_STR_IN_ARIA_LABEL = /, selected/;
  const SELECTED_CLASSES =
    "bg-celesteal-500 hover:bg-celesteal-400 enabled:hover:bg-celesteal-400";

  expect(containerElem).toHaveAttribute("aria-selected", String(expIsSelected));
  if (expIsSelected) {
    expect(buttonElem).toHaveAccessibleName(SELECTED_STR_IN_ARIA_LABEL);
    expect(buttonElem).toHaveClass(SELECTED_CLASSES);
  } else {
    expect(buttonElem).not.toHaveAccessibleName(SELECTED_STR_IN_ARIA_LABEL);
    expect(buttonElem).not.toHaveClass(SELECTED_CLASSES);
  }
};

const assertIsToday = (
  result: RenderResult,
  expIsToday: boolean,
  expIsSelected: boolean
) => {
  const buttonElem = result.getByTestId(ELEM.button);
  const TODAY_CLASSES = "bg-onyx-700";
  const TODAY_STR_IN_ARIA_LABEL = /^Today, /;
  if (expIsToday && !expIsSelected) {
    expect(buttonElem).toHaveAccessibleName(TODAY_STR_IN_ARIA_LABEL);
    expect(buttonElem).toHaveClass(TODAY_CLASSES);
  } else if (!expIsToday) {
    expect(buttonElem).not.toHaveAccessibleName(TODAY_STR_IN_ARIA_LABEL);
    expect(buttonElem).not.toHaveClass(TODAY_CLASSES);
  }
};

const assertIsMin = (result: RenderResult, expIsMin: boolean) => {
  const buttonElem = result.getByTestId(ELEM.button);
  const MIN_STR_IN_ARIA_LABEL = /, first available date/;
  expIsMin
    ? expect(buttonElem).toHaveAccessibleName(MIN_STR_IN_ARIA_LABEL)
    : expect(buttonElem).not.toHaveAccessibleName(MIN_STR_IN_ARIA_LABEL);
};
const assertIsMax = (result: RenderResult, expIsMax: boolean) => {
  const buttonElem = result.getByTestId(ELEM.button);
  const MAX_STR_IN_ARIA_LABEL = /, last available date/;
  expIsMax
    ? expect(buttonElem).toHaveAccessibleName(MAX_STR_IN_ARIA_LABEL)
    : expect(buttonElem).not.toHaveAccessibleName(MAX_STR_IN_ARIA_LABEL);
};

const assertIsFocused = (result: RenderResult, expIsFocused: boolean) => {
  const buttonElem = result.getByTestId(ELEM.button);
  expect(buttonElem).toHaveAttribute("tabIndex", String(expIsFocused ? 0 : -1));
};

const assertIsInDifferentMonth = (
  result: RenderResult,
  expIsInDifferentMonth: boolean
) => {
  const buttonElem = result.getByTestId(ELEM.button);
  const INVISIBLE_CLASS = "invisible";
  expIsInDifferentMonth
    ? expect(buttonElem).toHaveClass(INVISIBLE_CLASS)
    : expect(buttonElem).not.toHaveClass(INVISIBLE_CLASS);
};

const assertIsReadOnly = (result: RenderResult, expIsReadOnly: boolean) => {
  const buttonElem = result.getByTestId(ELEM.button);
  const CURSOR_DEFAULT_CLASS = "cursor-default";
  expIsReadOnly
    ? expect(buttonElem).toHaveClass(CURSOR_DEFAULT_CLASS)
    : expect(buttonElem).not.toHaveClass(CURSOR_DEFAULT_CLASS);
};

const assertExpValues = (
  result: RenderResult,
  exp: ExpectedCalendarCellIsValues
) => {
  assertIsDisabled(result, exp.isDisabled);
  assertIsSelected(result, exp.isSelected);
  assertIsToday(result, exp.isToday, exp.isSelected);
  assertIsMin(result, exp.isMin);
  assertIsMax(result, exp.isMax);
  assertIsFocused(result, exp.isFocused);
  assertIsInDifferentMonth(result, exp.isInDifferentMonth);
  assertIsReadOnly(result, exp.isReadOnly);
};

test.each`
  todayDateStr    | dateStr         | focusedDateStr  | selectedDateStr | expIsDisabled
  ${"2023-01-01"} | ${"2023-01-01"} | ${"2023-01-01"} | ${"2023-01-01"} | ${false}
  ${"2023-02-28"} | ${"2023-02-28"} | ${"2023-02-28"} | ${undefined}    | ${false}
  ${"2023-03-12"} | ${"2023-02-26"} | ${"2023-03-05"} | ${undefined}    | ${true}
  ${"2023-04-21"} | ${"2023-03-15"} | ${"2023-03-15"} | ${undefined}    | ${false}
  ${"2023-05-14"} | ${"2023-05-15"} | ${"2023-05-13"} | ${"2023-05-12"} | ${false}
  ${"2023-06-10"} | ${"2023-05-29"} | ${"2023-06-01"} | ${"2023-05-29"} | ${true}
`(
  "Cell is disabled=$expIsDisabled in writable calendar with date=$dateStr, focusedDate=$focusedDateStr, selectedDate=$selectedDateStr when todayDate=$todayDateStr",
  (testCase: CalendarCellTestCase) => {
    const exp = getExpIsValuesForCase(testCase);
    const result = renderCalendarCell(testCase);
    assertExpValues(result, exp);
  }
);

test.each`
  todayDateStr    | minDateStr      | maxDateStr      | dateStr         | focusedDateStr  | selectedDateStr | expIsDisabled
  ${"2023-07-04"} | ${"2023-07-04"} | ${undefined}    | ${"2023-07-04"} | ${"2023-07-04"} | ${"2023-07-01"} | ${false}
  ${"2023-08-10"} | ${"2023-07-08"} | ${"2023-08-10"} | ${"2023-08-10"} | ${"2023-08-01"} | ${"2023-07-18"} | ${false}
  ${"2023-09-09"} | ${"2023-09-09"} | ${"2023-09-09"} | ${"2023-09-09"} | ${"2023-09-09"} | ${"2023-09-09"} | ${false}
  ${"2023-10-03"} | ${"2023-09-01"} | ${"2023-09-30"} | ${"2023-10-02"} | ${"2023-10-02"} | ${undefined}    | ${true}
`(
  "Cell is disabled=$expIsDisabled in writable calendar with date=$dateStr, focusedDate=$focusedDateStr, selectedDate=$selectedDateStr when todayDate=$todayDateStr, minDateStr=$minDateStr, maxDateStr=$maxDateStr",
  (testCase: CalendarCellTestCase) => {
    const exp = getExpIsValuesForCase(testCase);
    const result = renderCalendarCell(testCase);
    assertExpValues(result, exp);
  }
);

test("Cell is read-only in read-only calendar", () => {
  const testCase: CalendarCellTestCase = {
    todayDateStr: "2023-11-11",
    dateStr: "2023-11-10",
    focusedDateStr: "2023-11-12",
    selectedDateStr: undefined,
    expIsDisabled: false,
    isReadOnly: true,
  };
  const exp = getExpIsValuesForCase(testCase);
  const result = renderCalendarCell(testCase);
  assertExpValues(result, exp);
});

test("Cell is disabled in disabled calendar", () => {
  const testCase: CalendarCellTestCase = {
    todayDateStr: "2023-12-18",
    dateStr: "2023-12-03",
    focusedDateStr: "2023-12-09",
    selectedDateStr: undefined,
    expIsDisabled: true,
    allCellsDisabled: true,
  };
  const exp = getExpIsValuesForCase(testCase);
  const result = renderCalendarCell(testCase);
  assertExpValues(result, exp);
});
