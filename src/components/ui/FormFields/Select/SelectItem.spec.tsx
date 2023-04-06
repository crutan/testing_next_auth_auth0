import { fireEvent, render } from "@testing-library/react";
import { DropDownContext } from "ui/DropDown";
import { CHECKBOX_ELEM } from "ui/FormFields/Checkbox/Checkbox.spec";
import { expect, test, vi } from "vitest";

import { SelectContext, SelectContextProps } from "./context";
import SelectItem from "./SelectItem";

export enum SELECT_ITEM_ELEM {
  container = "SelectItemContainer",
  checkIcon = "SelectItemCheckIcon",
}

const mockFns = {
  onChange: vi.fn(),
  onKeyDown: vi.fn(),
  onMouseEnter: vi.fn(),
};
const setFocusedIdx = vi.fn();
const closeMenu = vi.fn();
const contextOnChange = vi.fn();

beforeEach(() => {
  mockFns.onChange.mockClear();
  mockFns.onKeyDown.mockClear();
  mockFns.onMouseEnter.mockClear();
  setFocusedIdx.mockClear();
  closeMenu.mockClear();
  contextOnChange.mockClear();
});

const renderSelectItem = (
  selectContext: Omit<SelectContextProps, "onChange">,
  index?: number,
  focusedIdx?: number
) =>
  render(
    <SelectContext.Provider
      value={{ ...selectContext, onChange: contextOnChange }}
    >
      <DropDownContext.Provider
        value={{
          focusedIdx,
          setFocusedIdx,
          closeMenu,
        }}
      >
        <SelectItem index={index} {...mockFns}>
          Some Option
        </SelectItem>
      </DropDownContext.Provider>
    </SelectContext.Provider>
  );

const getBaseElementTestId = (multiSelect: boolean) =>
  multiSelect ? CHECKBOX_ELEM.input : SELECT_ITEM_ELEM.container;

const assertContextOnChangeAndCloseMenuCalledAsExpected = (
  index: number | undefined,
  expContextOnChangeCalled: boolean,
  expCloseMenuCalled: boolean
) => {
  if (expContextOnChangeCalled) {
    expect(contextOnChange).toHaveBeenCalledTimes(1);
    expect(contextOnChange).toHaveBeenCalledWith(index);
  } else {
    expect(contextOnChange).not.toHaveBeenCalled();
  }

  if (expCloseMenuCalled) {
    expect(closeMenu).toHaveBeenCalledTimes(1);
    expect(closeMenu).not.toHaveBeenCalledWith(true);
  } else {
    expect(closeMenu).not.toHaveBeenCalled();
  }
};

describe.each`
  multiSelect
  ${false}
  ${true}
`("describe multiSelect=$multiSelect", ({ multiSelect }) => {
  test.each`
    index | focusedIdx   | expTabIndex
    ${0}  | ${1}         | ${"-1"}
    ${1}  | ${0}         | ${"-1"}
    ${1}  | ${undefined} | ${"-1"}
    ${0}  | ${0}         | ${"0"}
    ${1}  | ${1}         | ${"0"}
  `(
    "tabIndex=$expTabIndex when index=$index & focusedIdx=$focusedIdx",
    ({ index, focusedIdx, expTabIndex }) => {
      const result = renderSelectItem(
        { multiSelect, selectedIdxs: new Set() },
        index,
        focusedIdx
      );
      expect(
        result.queryByTestId(getBaseElementTestId(multiSelect))
      ).toHaveAttribute("tabIndex", expTabIndex);
    }
  );

  test.each`
    index | selectedIdxs | expSelected
    ${0}  | ${[]}        | ${false}
    ${0}  | ${[1]}       | ${false}
    ${1}  | ${[0]}       | ${false}
    ${1}  | ${[1]}       | ${true}
  `(
    "expSelected=$expSelected when index=$index & selectedIdxs=$selectedIdxs",
    ({ index, selectedIdxs, expSelected }) => {
      const result = renderSelectItem(
        {
          multiSelect,
          selectedIdxs: new Set(selectedIdxs),
        },
        index
      );

      expect(
        result.queryByTestId(getBaseElementTestId(multiSelect))
      ).toHaveAttribute("aria-selected", String(expSelected));

      if (multiSelect) {
        expSelected
          ? expect(result.queryByTestId(CHECKBOX_ELEM.input)).toBeChecked()
          : expect(result.queryByTestId(CHECKBOX_ELEM.input)).not.toBeChecked();
      }
    }
  );

  describe("handleChange", () => {
    test.each`
      index        | expContextOnChangeCalled | expCloseMenuCalled
      ${undefined} | ${false}                 | ${false}
      ${0}         | ${true}                  | ${!multiSelect}
      ${1}         | ${true}                  | ${!multiSelect}
      ${2}         | ${true}                  | ${!multiSelect}
    `(
      "SelectContext.onChange is called=$expContextOnChangeCalled and closeMenu is called=$expCloseMenuCalled when index=$index",
      ({ index, expContextOnChangeCalled, expCloseMenuCalled }) => {
        const result = renderSelectItem(
          { multiSelect, selectedIdxs: new Set() },
          index
        );
        fireEvent.click(result.getByTestId(getBaseElementTestId(multiSelect)));
        assertContextOnChangeAndCloseMenuCalledAsExpected(
          index,
          expContextOnChangeCalled,
          expCloseMenuCalled
        );
        expect(mockFns.onChange).toHaveBeenCalledTimes(1);
      }
    );
  });

  describe("handleKeyDown", () => {
    test.each`
      key        | index        | expContextOnChangeCalled | expCloseMenuCalled
      ${"Enter"} | ${undefined} | ${false}                 | ${false}
      ${"Enter"} | ${0}         | ${true}                  | ${!multiSelect}
      ${"b"}     | ${1}         | ${false}                 | ${false}
      ${" "}     | ${2}         | ${!multiSelect}          | ${!multiSelect}
    `(
      "SelectContext.onChange is called=$expContextOnChangeCalled and closeMenu is called=$expCloseMenuCalled when index=$index on $key keydown",
      ({ key, index, expContextOnChangeCalled, expCloseMenuCalled }) => {
        const result = renderSelectItem(
          { multiSelect, selectedIdxs: new Set() },
          index
        );
        fireEvent.keyDown(
          result.getByTestId(getBaseElementTestId(multiSelect)),
          { key }
        );
        assertContextOnChangeAndCloseMenuCalledAsExpected(
          index,
          expContextOnChangeCalled,
          expCloseMenuCalled
        );
        expect(mockFns.onKeyDown).toHaveBeenCalledTimes(1);
      }
    );
  });

  describe("handleMouseEnter", () => {
    test("setFocusedIdx & onMouseEnter are called when mouse enters menu item", () => {
      const MOCK_INDEX = 2;
      const result = renderSelectItem(
        { multiSelect, selectedIdxs: new Set() },
        MOCK_INDEX
      );
      fireEvent.mouseEnter(
        result.getByTestId(getBaseElementTestId(multiSelect))
      );
      expect(setFocusedIdx).toHaveBeenCalledTimes(1);
      expect(setFocusedIdx).toHaveBeenCalledWith(MOCK_INDEX);
      expect(mockFns.onMouseEnter).toHaveBeenCalledTimes(1);
    });
  });
});
