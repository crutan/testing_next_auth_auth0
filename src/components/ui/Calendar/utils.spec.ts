import { parseISO } from "date-fns";
import { expect, test } from "vitest";

import { dateToHumanReadableStr } from "./utils";

describe("dateToHumanReadableStr()", () => {
  test.each`
    isoDateStr      | expHumanReadableStr
    ${"2020-02-29"} | ${"Saturday, February 29, 2020"}
    ${"2022-04-03"} | ${"Sunday, April 3, 2022"}
    ${"2023-03-31"} | ${"Friday, March 31, 2023"}
    ${"2023-12-25"} | ${"Monday, December 25, 2023"}
    ${"2025-01-01"} | ${"Wednesday, January 1, 2025"}
  `(
    "returns $expHumanReadableStr for $isoDateStr",
    ({ isoDateStr, expHumanReadableStr }) => {
      const date = parseISO(isoDateStr);
      expect(dateToHumanReadableStr(date)).toEqual(expHumanReadableStr);
    }
  );
});
