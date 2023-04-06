import React from "react";
import { fireEvent, render, RenderResult } from "@testing-library/react";
import { endOfDay, parseISO } from "date-fns";
import { expect, test, vi } from "vitest";

import Calendar from "./Calendar";
import { CalendarProps } from "./Calendar.types";
import { dateToHumanReadableStr } from "./utils";

enum ELEM {
  container = "CalendarContainer",
  header = "CalendarHeader",
  headerPrevBtn = "CalendarHeaderPreviousButton",
  headerFocusedMonthLabel = "CalendarHeaderFocusedMonthLabel",
  headerNextBtn = "CalendarHeaderNextButton",
  srFocusedMonth = "CalendarSrFocusedMonth",
  srSelectedDate = "CalendarSrSelectedDate",
}

interface CalendarTestInputDates {
  todayDateStr: string;
  defaultFocusedDateStr?: string;
  defaultSelectedDateStr?: string;
  minDateStr?: string;
  maxDateStr?: string;
}

const onFocusedDateChange = vi.fn();
const onSelectedDateChange = vi.fn();

beforeEach(() => {
  vi.useFakeTimers();
  onFocusedDateChange.mockClear();
  onSelectedDateChange.mockClear();
});

afterEach(() => {
  vi.useRealTimers();
});

const renderCalendar = (
  dates: CalendarTestInputDates,
  props: Pick<CalendarProps, "aria-label" | "disabled" | "isReadOnly"> = {}
) => {
  vi.setSystemTime(parseISO(dates.todayDateStr));
  return render(
    <Calendar
      {...props}
      defaultFocusedDate={
        dates.defaultFocusedDateStr
          ? parseISO(dates.defaultFocusedDateStr)
          : undefined
      }
      defaultSelectedDate={
        dates.defaultSelectedDateStr
          ? parseISO(dates.defaultSelectedDateStr)
          : undefined
      }
      maxDate={
        dates.maxDateStr ? endOfDay(parseISO(dates.maxDateStr)) : undefined
      }
      minDate={dates.minDateStr ? parseISO(dates.minDateStr) : undefined}
      onFocusedDateChange={onFocusedDateChange}
      onSelectedDateChange={onSelectedDateChange}
    />
  );
};

const getCell = (result: RenderResult, dateStr: string) =>
  result.getByRole("button", {
    name: new RegExp(dateToHumanReadableStr(parseISO(dateStr))),
  });

const assertFocusedMonthLabels = (
  result: RenderResult,
  expFocusedMonth: string
) => {
  const srFocusedMonthElem = result.getByTestId(ELEM.srFocusedMonth);
  const headerFocusedMonthLabelElem = result.getByTestId(
    ELEM.headerFocusedMonthLabel
  );

  expect(srFocusedMonthElem).toHaveTextContent(expFocusedMonth);
  expect(headerFocusedMonthLabelElem).toHaveTextContent(expFocusedMonth);
};

const assertAriaLabels = (result: RenderResult, expAriaLabel: string) => {
  const containerElem = result.getByTestId(ELEM.container);
  const table = result.container.querySelector("table");

  expect(containerElem).toHaveAccessibleName(expAriaLabel);
  expect(table).toHaveAccessibleName(expAriaLabel);
};

const assertSelectedDateLabel = (
  result: RenderResult,
  expSelectedDateLabel: string
) => {
  const srSelectedDateElem = result.getByTestId(ELEM.srSelectedDate);
  expSelectedDateLabel
    ? expect(srSelectedDateElem).toHaveTextContent(expSelectedDateLabel)
    : expect(srSelectedDateElem).toBeEmptyDOMElement();
};

describe.each`
  todayDateStr    | defaultFocusedDateStr | ariaLabelIn         | expFocusedMonth
  ${"2023-01-31"} | ${undefined}          | ${undefined}        | ${"January 2023"}
  ${"2022-12-01"} | ${undefined}          | ${"Consultation"}   | ${"December 2022"}
  ${"2021-05-08"} | ${"2021-06-06"}       | ${"Special Events"} | ${"June 2021"}
  ${"2020-03-01"} | ${"2020-02-29"}       | ${undefined}        | ${"February 2020"}
`(
  "todayDateStr=$todayDateStr, defaultFocusedDateStr=$defaultFocusedDateStr, ariaLabelIn=$ariaLabelIn",
  ({ todayDateStr, defaultFocusedDateStr, ariaLabelIn, expFocusedMonth }) => {
    test(`focused month labels are "${expFocusedMonth}"`, () => {
      const result = renderCalendar(
        { todayDateStr, defaultFocusedDateStr },
        { "aria-label": ariaLabelIn }
      );
      assertFocusedMonthLabels(result, expFocusedMonth);
    });

    const expAriaLabel = ariaLabelIn
      ? `${ariaLabelIn}, ${expFocusedMonth}`
      : expFocusedMonth;
    test(`aria labels are "${expAriaLabel}"`, () => {
      const result = renderCalendar(
        { todayDateStr, defaultFocusedDateStr },
        { "aria-label": ariaLabelIn }
      );
      assertAriaLabels(result, expAriaLabel);
    });
  }
);

const MAX_UNBOUNDED_TEST_CLICKS = 25;
const headerBtnDisabledTestExpectation = (
  expClicksBeforeDisabled: number | undefined
) =>
  `${
    expClicksBeforeDisabled
      ? `after clicking it ${expClicksBeforeDisabled} times`
      : expClicksBeforeDisabled == null
      ? "never, regardless of how many times it is clicked"
      : "immediately"
  }`;
const assertHeaderBtnDisabledAfterClicks = (
  headerBtn: HTMLElement,
  expClicksBeforeDisabled: number | undefined
) => {
  for (
    let i = 0;
    i < (expClicksBeforeDisabled ?? MAX_UNBOUNDED_TEST_CLICKS);
    i++
  ) {
    expect(headerBtn).toBeEnabled();
    fireEvent.click(headerBtn);
  }
  if (expClicksBeforeDisabled != null) {
    expect(headerBtn).toBeDisabled();
  }
};
describe.each`
  todayDateStr    | defaultFocusedDateStr | minDateStr      | maxDateStr      | expPrevClicksBeforeDisabled | expFocusedMonthAfter11PrevClicks | expNextClicksBeforeDisabled | expFocusedMonthAfter11NextClicks
  ${"2023-08-15"} | ${undefined}          | ${undefined}    | ${undefined}    | ${undefined}                | ${"September 2022"}              | ${undefined}                | ${"July 2024"}
  ${"2023-01-01"} | ${"2022-09-19"}       | ${undefined}    | ${undefined}    | ${undefined}                | ${"October 2021"}                | ${undefined}                | ${"August 2023"}
  ${"2025-12-31"} | ${undefined}          | ${"2025-12-31"} | ${undefined}    | ${0}                        | ${"December 2025"}               | ${undefined}                | ${"November 2026"}
  ${"2023-12-31"} | ${"2024-02-22"}       | ${"2023-11-15"} | ${undefined}    | ${3}                        | ${"November 2023"}               | ${undefined}                | ${"January 2025"}
  ${"2020-01-31"} | ${"2020-02-29"}       | ${undefined}    | ${"2020-02-29"} | ${undefined}                | ${"March 2019"}                  | ${0}                        | ${"February 2020"}
  ${"2024-06-12"} | ${undefined}          | ${undefined}    | ${"2024-12-31"} | ${undefined}                | ${"July 2023"}                   | ${6}                        | ${"December 2024"}
  ${"2026-10-10"} | ${"2025-03-19"}       | ${"2025-03-16"} | ${"2025-03-22"} | ${0}                        | ${"March 2025"}                  | ${0}                        | ${"March 2025"}
  ${"2030-08-20"} | ${undefined}          | ${"2030-02-20"} | ${"2030-11-20"} | ${6}                        | ${"February 2030"}               | ${3}                        | ${"November 2030"}
`(
  "todayDateStr=$todayDateStr, defaultFocusedDateStr=$defaultFocusedDateStr, minDateStr=$minDateStr, maxDateStr=$maxDateStr",
  ({
    todayDateStr,
    defaultFocusedDateStr,
    minDateStr,
    maxDateStr,
    expPrevClicksBeforeDisabled,
    expFocusedMonthAfter11PrevClicks,
    expNextClicksBeforeDisabled,
    expFocusedMonthAfter11NextClicks,
  }) => {
    let result: RenderResult;
    beforeEach(() => {
      result = renderCalendar({
        todayDateStr,
        defaultFocusedDateStr,
        minDateStr,
        maxDateStr,
      });
    });

    test(`PREVIOUS button is disabled ${headerBtnDisabledTestExpectation(
      expPrevClicksBeforeDisabled
    )}`, () => {
      assertHeaderBtnDisabledAfterClicks(
        result.getByTestId(ELEM.headerPrevBtn),
        expPrevClicksBeforeDisabled
      );
    });

    test(`NEXT button is disabled ${headerBtnDisabledTestExpectation(
      expNextClicksBeforeDisabled
    )}`, () => {
      assertHeaderBtnDisabledAfterClicks(
        result.getByTestId(ELEM.headerNextBtn),
        expNextClicksBeforeDisabled
      );
    });

    test(`focused month & aria labels are "${expFocusedMonthAfter11PrevClicks}" after clicking the PREVIOUS button 11 times`, () => {
      [...Array(11)].map(() => {
        fireEvent.click(result.getByTestId(ELEM.headerPrevBtn));
      });
      assertFocusedMonthLabels(result, expFocusedMonthAfter11PrevClicks);
      assertAriaLabels(result, expFocusedMonthAfter11PrevClicks);
    });

    test(`focused month & aria labels are "${expFocusedMonthAfter11PrevClicks}" after clicking the NEXT button 11 times`, () => {
      [...Array(11)].map(() => {
        fireEvent.click(result.getByTestId(ELEM.headerNextBtn));
      });
      assertFocusedMonthLabels(result, expFocusedMonthAfter11NextClicks);
      assertAriaLabels(result, expFocusedMonthAfter11NextClicks);
    });
  }
);

test.each`
  todayDateStr    | defaultSelectedDateStr | expSelectedDateLabel
  ${"2023-01-10"} | ${undefined}           | ${""}
  ${"2023-04-14"} | ${"2023-04-14"}        | ${"Selected Date: Friday, April 14, 2023"}
  ${"2024-09-15"} | ${"2024-10-31"}        | ${"Selected Date: Thursday, October 31, 2024"}
`(
  "expSelectedDateLabel=$expSelectedDateLabel when todayDateStr=$todayDateStr, defaultSelectedDateStr=$defaultSelectedDateStr",
  ({ todayDateStr, defaultSelectedDateStr, expSelectedDateLabel }) => {
    const result = renderCalendar({ todayDateStr, defaultSelectedDateStr });
    assertSelectedDateLabel(result, expSelectedDateLabel);
  }
);

test(`previous/next buttons are disabled & aria-disabled="true" when disabled="true"`, () => {
  const result = renderCalendar(
    { todayDateStr: "2023-11-11" },
    { disabled: true }
  );
  expect(result.getByTestId(ELEM.headerPrevBtn)).toBeDisabled();
  expect(result.getByTestId(ELEM.headerNextBtn)).toBeDisabled();
  expect(result.container.querySelector("table")).toHaveAttribute(
    "aria-disabled",
    "true"
  );
});

describe.each`
  todayDateStr    | defaultFocusedDateStr | dateStrToSelect | expFocusedMonth
  ${"2023-06-07"} | ${undefined}          | ${"2023-06-07"} | ${"June 2023"}
  ${"2023-07-08"} | ${undefined}          | ${"2023-07-31"} | ${"July 2023"}
  ${"2023-11-01"} | ${"2024-01-11"}       | ${"2024-01-15"} | ${"January 2024"}
`(
  "todayDateStr=$todayDateStr, defaultFocusedDateStr=$defaultFocusedDateStr",
  ({
    todayDateStr,
    defaultFocusedDateStr,
    dateStrToSelect,
    expFocusedMonth,
  }) => {
    const expSelectedDate = parseISO(dateStrToSelect);
    describe.each`
      isReadOnly
      ${false}
      ${true}
    `("isReadOnly=$isReadOnly", ({ isReadOnly }) => {
      let result: RenderResult;
      beforeEach(() => {
        result = renderCalendar(
          { todayDateStr, defaultFocusedDateStr },
          { isReadOnly }
        );
        fireEvent.click(getCell(result, dateStrToSelect));
      });

      test(`onFocusedDateChange is called with ${expSelectedDate}`, () => {
        expect(onFocusedDateChange).toHaveBeenLastCalledWith(expSelectedDate);
      });

      test(`onSelectedDateChange is ${
        isReadOnly ? "NOT called" : `called with ${expSelectedDate}`
      }`, () => {
        isReadOnly
          ? expect(onSelectedDateChange).not.toHaveBeenCalled()
          : expect(onSelectedDateChange).toHaveBeenLastCalledWith(
              expSelectedDate
            );
      });

      const expSelectedDateLabel = isReadOnly
        ? ""
        : dateToHumanReadableStr(expSelectedDate);
      test(`selected date label is "${expSelectedDateLabel}"`, () => {
        assertSelectedDateLabel(result, expSelectedDateLabel);
      });

      test(`focused month & aria labels are "${expFocusedMonth}"`, () => {
        assertFocusedMonthLabels(result, expFocusedMonth);
        assertAriaLabels(result, expFocusedMonth);
      });
    });
  }
);

const testCellKeyDown = (
  testCase: CalendarTestInputDates & {
    newFocusedDateStr: string;
    expEndOfDay?: boolean;
  },
  options: {
    key: string;
    shiftKey?: boolean;
  }
) => {
  const result = renderCalendar(testCase);
  const todayCell = getCell(result, testCase.todayDateStr);
  fireEvent.keyDown(todayCell, options);

  let expNewFocusedDate = parseISO(testCase.newFocusedDateStr);
  expNewFocusedDate = testCase.expEndOfDay
    ? endOfDay(expNewFocusedDate)
    : expNewFocusedDate;
  expect(onFocusedDateChange).toHaveBeenLastCalledWith(expNewFocusedDate);
};
describe("handleCellKeyDown", () => {
  // Expect to go back 1 month (or to min, if min comes after)
  test.each`
    todayDateStr    | minDateStr      | maxDateStr      | newFocusedDateStr
    ${"2023-03-31"} | ${undefined}    | ${undefined}    | ${"2023-02-28"}
    ${"2023-04-30"} | ${"2023-01-01"} | ${undefined}    | ${"2023-03-30"}
    ${"2023-01-14"} | ${"2023-01-14"} | ${"2023-01-14"} | ${"2023-01-14"}
    ${"2023-01-31"} | ${"2023-01-06"} | ${"2023-02-28"} | ${"2023-01-06"}
  `(
    "PageUp - focuses $newFocusedDateStr when todayDateStr=$todayDateStr, minDateStr=$minDateStr, maxDateStr=$maxDateStr",
    (testCase) => {
      testCellKeyDown(testCase, { key: "PageUp" });
    }
  );

  // Expect to go back 1 year (or to min, if min comes after)
  test.each`
    todayDateStr    | minDateStr      | maxDateStr      | newFocusedDateStr
    ${"2020-02-29"} | ${undefined}    | ${undefined}    | ${"2019-02-28"}
    ${"2020-06-16"} | ${"2000-01-01"} | ${undefined}    | ${"2019-06-16"}
    ${"2020-11-03"} | ${"2020-11-03"} | ${"2020-11-03"} | ${"2020-11-03"}
    ${"2020-02-09"} | ${"2019-12-09"} | ${"2020-02-09"} | ${"2019-12-09"}
  `(
    "PageUp + Shift key - focuses $newFocusedDateStr when todayDateStr=$todayDateStr, minDateStr=$minDateStr, maxDateStr=$maxDateStr",
    (testCase) => {
      testCellKeyDown(testCase, { key: "PageUp", shiftKey: true });
    }
  );

  // Expect to go forward 1 month (or to max, if max comes before)
  test.each`
    todayDateStr    | minDateStr      | maxDateStr      | newFocusedDateStr
    ${"2024-08-31"} | ${undefined}    | ${undefined}    | ${"2024-09-30"}
    ${"2024-07-25"} | ${undefined}    | ${"2024-12-25"} | ${"2024-08-25"}
    ${"2024-12-16"} | ${"2024-12-16"} | ${"2024-12-16"} | ${"2024-12-16"}
    ${"2024-03-27"} | ${"2024-03-01"} | ${"2024-03-31"} | ${"2024-03-31"}
  `(
    "PageDown - focuses $newFocusedDateStr when todayDateStr=$todayDateStr, minDateStr=$minDateStr, maxDateStr=$maxDateStr",
    (testCase) => {
      testCellKeyDown(
        {
          ...testCase,
          expEndOfDay: testCase.newFocusedDateStr === testCase.maxDateStr,
        },
        { key: "PageDown" }
      );
    }
  );

  // Expect to go forward 1 year (or to max, if max comes before)
  test.each`
    todayDateStr    | minDateStr      | maxDateStr      | newFocusedDateStr
    ${"2022-02-22"} | ${undefined}    | ${undefined}    | ${"2023-02-22"}
    ${"2022-04-12"} | ${undefined}    | ${"2023-04-11"} | ${"2023-04-11"}
    ${"2022-10-19"} | ${"2022-10-19"} | ${"2022-10-19"} | ${"2022-10-19"}
    ${"2022-06-24"} | ${"2022-06-17"} | ${"2022-08-09"} | ${"2022-08-09"}
  `(
    "PageDown + Shift key - focuses $newFocusedDateStr when todayDateStr=$todayDateStr, minDateStr=$minDateStr, maxDateStr=$maxDateStr",
    (testCase) => {
      testCellKeyDown(
        {
          ...testCase,
          expEndOfDay: testCase.newFocusedDateStr === testCase.maxDateStr,
        },
        { key: "PageDown", shiftKey: true }
      );
    }
  );

  // Expect to go back to start of month (or to min, if min comes after)
  test.each`
    todayDateStr    | minDateStr      | maxDateStr      | newFocusedDateStr
    ${"2023-03-31"} | ${undefined}    | ${undefined}    | ${"2023-03-01"}
    ${"2023-04-30"} | ${"2023-01-01"} | ${undefined}    | ${"2023-04-01"}
    ${"2023-01-14"} | ${"2023-01-14"} | ${"2023-01-14"} | ${"2023-01-14"}
    ${"2023-01-31"} | ${"2023-01-06"} | ${"2023-02-28"} | ${"2023-01-06"}
  `(
    "Home - focuses $newFocusedDateStr when todayDateStr=$todayDateStr, minDateStr=$minDateStr, maxDateStr=$maxDateStr",
    (testCase) => {
      testCellKeyDown(testCase, { key: "Home" });
    }
  );

  // Expect to go forward to end of month (or to max, if max comes before)
  test.each`
    todayDateStr    | minDateStr      | maxDateStr      | newFocusedDateStr
    ${"2024-08-31"} | ${undefined}    | ${undefined}    | ${"2024-08-31"}
    ${"2024-07-25"} | ${undefined}    | ${"2024-12-25"} | ${"2024-07-31"}
    ${"2024-12-16"} | ${"2024-12-16"} | ${"2024-12-16"} | ${"2024-12-16"}
    ${"2024-03-27"} | ${"2024-03-01"} | ${"2024-03-31"} | ${"2024-03-31"}
  `(
    "End - focuses $newFocusedDateStr when todayDateStr=$todayDateStr, minDateStr=$minDateStr, maxDateStr=$maxDateStr",
    (testCase) => {
      testCellKeyDown({ ...testCase, expEndOfDay: true }, { key: "End" });
    }
  );

  // Expect to go forward 1 week (or to max, if max comes before)
  test.each`
    todayDateStr    | minDateStr      | maxDateStr      | newFocusedDateStr
    ${"2025-01-07"} | ${undefined}    | ${undefined}    | ${"2025-01-14"}
    ${"2025-01-25"} | ${undefined}    | ${"2025-01-31"} | ${"2025-01-31"}
    ${"2025-01-20"} | ${"2025-01-20"} | ${"2025-01-20"} | ${"2025-01-20"}
    ${"2025-01-28"} | ${"2025-01-28"} | ${"2025-03-31"} | ${"2025-02-04"}
  `(
    "ArrowDown - focuses $newFocusedDateStr when todayDateStr=$todayDateStr, minDateStr=$minDateStr, maxDateStr=$maxDateStr",
    (testCase) => {
      testCellKeyDown(
        {
          ...testCase,
          expEndOfDay: testCase.newFocusedDateStr === testCase.maxDateStr,
        },
        { key: "ArrowDown" }
      );
    }
  );

  // Expect to go back 1 week (or to min, if min comes after)
  test.each`
    todayDateStr    | minDateStr      | maxDateStr      | newFocusedDateStr
    ${"2026-07-05"} | ${undefined}    | ${undefined}    | ${"2026-06-28"}
    ${"2026-07-07"} | ${"2026-07-04"} | ${undefined}    | ${"2026-07-04"}
    ${"2026-07-18"} | ${"2026-07-18"} | ${"2026-07-18"} | ${"2026-07-18"}
    ${"2026-07-27"} | ${"2026-07-01"} | ${"2026-07-31"} | ${"2026-07-20"}
  `(
    "ArrowUp - focuses $newFocusedDateStr when todayDateStr=$todayDateStr, minDateStr=$minDateStr, maxDateStr=$maxDateStr",
    (testCase) => {
      testCellKeyDown(testCase, { key: "ArrowUp" });
    }
  );

  // Expect to go forward 1 day (or to max, if max comes before)
  test.each`
    todayDateStr    | minDateStr      | maxDateStr      | newFocusedDateStr
    ${"2019-10-31"} | ${undefined}    | ${undefined}    | ${"2019-11-01"}
    ${"2019-10-12"} | ${undefined}    | ${"2019-10-12"} | ${"2019-10-12"}
    ${"2019-10-06"} | ${"2019-10-06"} | ${"2019-10-06"} | ${"2019-10-06"}
    ${"2019-10-16"} | ${"2019-01-01"} | ${"2019-12-31"} | ${"2019-10-17"}
  `(
    "ArrowRight - focuses $newFocusedDateStr when todayDateStr=$todayDateStr, minDateStr=$minDateStr, maxDateStr=$maxDateStr",
    (testCase) => {
      testCellKeyDown(
        {
          ...testCase,
          expEndOfDay: testCase.newFocusedDateStr === testCase.maxDateStr,
        },
        { key: "ArrowRight" }
      );
    }
  );

  // Expect to go back 1 day (or to min, if min comes after)
  test.each`
    todayDateStr    | minDateStr      | maxDateStr      | newFocusedDateStr
    ${"2024-03-01"} | ${undefined}    | ${undefined}    | ${"2024-02-29"}
    ${"2024-03-01"} | ${"2024-03-01"} | ${undefined}    | ${"2024-03-01"}
    ${"2024-03-30"} | ${"2024-03-30"} | ${"2024-03-30"} | ${"2024-03-30"}
    ${"2024-03-18"} | ${"2023-03-01"} | ${"2025-03-31"} | ${"2024-03-17"}
  `(
    "ArrowLeft - focuses $newFocusedDateStr when todayDateStr=$todayDateStr, minDateStr=$minDateStr, maxDateStr=$maxDateStr",
    (testCase) => {
      testCellKeyDown(testCase, { key: "ArrowLeft" });
    }
  );
});
