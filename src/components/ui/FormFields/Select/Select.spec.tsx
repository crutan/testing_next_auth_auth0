import React from "react";
import { fireEvent, render, RenderResult } from "@testing-library/react";
import { DropDownSection } from "ui/DropDown";
import {
  assertFocusedIdx,
  DROP_DOWN_ELEM,
  getMenuItemIdFor,
} from "ui/DropDown/DropDown.spec";
import { expect, test, vi } from "vitest";

import Select from "./Select";
import SelectItem from "./SelectItem";

const onChange = vi.fn();
beforeEach(() => onChange.mockClear());

const MOCK_LABEL = "Favorite Sports Team";
const MOCK_VALUES = ["Eagles", "Phillies", "76ers", "Flyers"];

const renderSelect = (
  multiSelect: boolean,
  defaultCheckedIdxs: number[],
  sectioned: boolean
) => {
  const valueToSelectItem = (value: string, idx: number) => (
    <SelectItem defaultChecked={defaultCheckedIdxs.includes(idx)} key={value}>
      {value}
    </SelectItem>
  );
  return render(
    sectioned ? (
      <Select label={MOCK_LABEL} multiSelect={multiSelect} onChange={onChange}>
        <DropDownSection>
          {MOCK_VALUES.slice(0, 2).map(valueToSelectItem)}
        </DropDownSection>
        <DropDownSection>
          {MOCK_VALUES.slice(2).map((value, idx) =>
            valueToSelectItem(value, idx + 2)
          )}
        </DropDownSection>
      </Select>
    ) : (
      <Select label={MOCK_LABEL} multiSelect={multiSelect} onChange={onChange}>
        {MOCK_VALUES.map(valueToSelectItem)}
      </Select>
    )
  );
};

describe.each`
  sectioned
  ${true}
  ${false}
`("sectioned=$sectioned", ({ sectioned }) => {
  describe.each`
    multiSelect | defaultCheckedIdxs | expNewSelectedIdxs | expToggleTitle         | expInitialFocusedIdx
    ${false}    | ${[]}              | ${[2]}             | ${"Select"}            | ${0}
    ${false}    | ${[1]}             | ${[2]}             | ${MOCK_VALUES[1]}      | ${1}
    ${false}    | ${[0, 3]}          | ${[2]}             | ${MOCK_VALUES[0]}      | ${0}
    ${true}     | ${[]}              | ${[2]}             | ${"Select"}            | ${0}
    ${true}     | ${[3]}             | ${[2, 3]}          | ${MOCK_VALUES[3]}      | ${3}
    ${true}     | ${[1, 2]}          | ${[1]}             | ${"Multiple selected"} | ${1}
  `(
    "multiSelect=$multiSelect and defaultCheckedIdxs=$defaultCheckedIdxs",
    ({
      multiSelect,
      defaultCheckedIdxs,
      expToggleTitle,
      expInitialFocusedIdx,
      expNewSelectedIdxs,
    }) => {
      let result: RenderResult;
      beforeEach(() => {
        result = renderSelect(multiSelect, defaultCheckedIdxs, sectioned);
      });

      test(`toggle has expected title & text content: "${expToggleTitle}"`, () => {
        const toggleElem = result.getByTestId(DROP_DOWN_ELEM.toggle);
        expect(toggleElem).toHaveAttribute("title", expToggleTitle);
        expect(result.getByTestId(DROP_DOWN_ELEM.toggle)).toHaveTextContent(
          expToggleTitle
        );
      });

      describe("click toggle button", () => {
        beforeEach(() => {
          fireEvent.click(result.getByTestId(DROP_DOWN_ELEM.toggle));
        });

        test(`${expInitialFocusedIdx}-indexed item is focused`, () => {
          assertFocusedIdx(result, expInitialFocusedIdx);
        });

        test(`onChange is called with ${expNewSelectedIdxs} when 2-indexed select item is clicked`, () => {
          fireEvent.click(result.getByTestId(getMenuItemIdFor(2)));
          expect(onChange).toHaveBeenCalledTimes(1);
          expect(onChange).toHaveBeenCalledWith(new Set(expNewSelectedIdxs));
        });
      });
    }
  );
});
