import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { expect, test, vi } from "vitest";

import { DropDownContext } from "../DropDown";

import MenuItem from "./MenuItem";

enum ELEM {
  menuItem = "MenuItem",
}

const mockFns = {
  onClick: vi.fn(),
  onKeyDown: vi.fn(),
  onMouseEnter: vi.fn(),
};
const setFocusedIdx = vi.fn();
const closeMenu = vi.fn();

beforeEach(() => {
  mockFns.onClick.mockClear();
  mockFns.onKeyDown.mockClear();
  mockFns.onMouseEnter.mockClear();
  setFocusedIdx.mockClear();
  closeMenu.mockClear();
});

const renderMenuItem = (index?: number, focusedIdx?: number) =>
  render(
    <DropDownContext.Provider
      value={{
        focusedIdx,
        setFocusedIdx,
        closeMenu,
      }}
    >
      <MenuItem index={index} {...mockFns}>
        Some Option
      </MenuItem>
    </DropDownContext.Provider>
  );

test(`has expected role of "menuitem"`, () => {
  const result = renderMenuItem();
  expect(result.getByTestId(ELEM.menuItem)).toHaveAttribute("role", "menuitem");
});

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
    const result = renderMenuItem(index, focusedIdx);
    expect(result.queryByTestId(ELEM.menuItem)).toHaveAttribute(
      "tabIndex",
      expTabIndex
    );
  }
);

describe("handleClick", () => {
  test("closeMenu & onClick are called when menu item is clicked", () => {
    const result = renderMenuItem();
    fireEvent.click(result.getByTestId(ELEM.menuItem));
    expect(closeMenu).toHaveBeenCalledTimes(1);
    expect(closeMenu).not.toHaveBeenCalledWith(true);
    expect(mockFns.onClick).toHaveBeenCalledTimes(1);
  });
});

describe("handleKeyDown", () => {
  test.each`
    key        | expCloseMenuCalled
    ${"b"}     | ${false}
    ${"Tab"}   | ${false}
    ${"Enter"} | ${true}
    ${" "}     | ${true}
  `(
    "closeMenu is called=$expCloseMenuCalled on $key keydown",
    ({ key, expCloseMenuCalled }) => {
      const result = renderMenuItem();
      fireEvent.keyDown(result.getByTestId(ELEM.menuItem), { key });
      if (expCloseMenuCalled) {
        expect(closeMenu).toHaveBeenCalledTimes(1);
        expect(closeMenu).toHaveBeenCalledWith(true);
      } else {
        expect(closeMenu).not.toHaveBeenCalled();
      }
      expect(mockFns.onKeyDown).toHaveBeenCalledTimes(1);
    }
  );
});

describe("handleMouseEnter", () => {
  test("setFocusedIdx & onMouseEnter are called when mouse enters menu item", () => {
    const MOCK_INDEX = 2;
    const result = renderMenuItem(MOCK_INDEX);
    fireEvent.mouseEnter(result.getByTestId(ELEM.menuItem));
    expect(setFocusedIdx).toHaveBeenCalledTimes(1);
    expect(setFocusedIdx).toHaveBeenCalledWith(MOCK_INDEX);
    expect(mockFns.onMouseEnter).toHaveBeenCalledTimes(1);
  });
});
