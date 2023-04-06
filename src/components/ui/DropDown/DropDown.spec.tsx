import React from "react";
import { act, fireEvent, render, RenderResult } from "@testing-library/react";
import { expect, test, vi } from "vitest";

import DropDown from "./DropDown";
import DropDownSection from "./DropDownSection";

export enum DROP_DOWN_ELEM {
  container = "DropDownContainer",
  toggle = "DropDownToggle",
  menu = "DropDownMenu",
  section = "DropDownSection",
}

const MOCK_LABEL_ID = "label-123";

const MOCK_ID = "abc";
vi.spyOn(React, "useId").mockReturnValue(MOCK_ID);

const MOCK_TOGGLE_TEXT = "Toggle Menu";

const NUM_MOCK_CHILDREN = 5;
const MOCK_SECTIONED_CHILDREN = [
  <DropDownSection key="section-0">
    <p>Cut</p>
    <p>Copy</p>
    <p>Paste</p>
  </DropDownSection>,
  <p key="4">Undo</p>,
  <p key="5">Redo</p>,
];
const MOCK_INDEPENDENT_CHILDREN = [
  <p key="0">Cut</p>,
  <p key="1">Copy</p>,
  <p key="2">Paste</p>,
  <p key="3">Undo</p>,
  <p key="4">Redo</p>,
];
export const getMenuItemIdFor = (index: number) =>
  `menu-${MOCK_ID}-item-${index}`;

const assertToggleAttributes = (
  result: RenderResult,
  expIsMenuOpen: boolean,
  expMenuRole: string,
  expLabelledBy?: string
) => {
  const toggleElem = result.getByTestId(DROP_DOWN_ELEM.toggle);
  expect(toggleElem.id).toEqual(`toggle-${MOCK_ID}`);
  expect(toggleElem).toHaveAttribute("aria-controls", `menu-${MOCK_ID}`);
  expect(toggleElem).toHaveAttribute("aria-expanded", String(expIsMenuOpen));
  expect(toggleElem).toHaveAttribute("aria-haspopup", expMenuRole);
  expLabelledBy != null
    ? expect(toggleElem).toHaveAttribute("aria-labelledby", expLabelledBy)
    : expect(toggleElem).not.toHaveAttribute("aria-labelledby");
};

const assertIsMenuOpen = (result: RenderResult, expIsMenuOpen: boolean) => {
  const menuElem = result.queryByTestId(DROP_DOWN_ELEM.menu);
  expIsMenuOpen
    ? expect(menuElem).toBeVisible()
    : expect(menuElem).not.toBeInTheDocument();
};

const assertMenuAttributes = (
  result: RenderResult,
  expMenuRole: string,
  expLabelledBy?: string
) => {
  const menuElem = result.getByTestId(DROP_DOWN_ELEM.menu);
  expect(menuElem.id).toEqual(`menu-${MOCK_ID}`);
  expLabelledBy != null
    ? expect(menuElem).toHaveAttribute("aria-labelledby", expLabelledBy)
    : expect(menuElem).not.toHaveAttribute("aria-labelledby");
  expect(menuElem).toHaveAttribute("role", expMenuRole);
  expect(menuElem).toHaveAttribute("tabIndex", "-1");
};

export const assertFocusedIdx = (
  result: RenderResult,
  expFocusedIdx: number | undefined
) => {
  const menuElem = result.getByTestId(DROP_DOWN_ELEM.menu);
  if (expFocusedIdx != null) {
    expect(menuElem).toHaveAttribute(
      "aria-activedescendant",
      getMenuItemIdFor(expFocusedIdx)
    );
  } else {
    expect(menuElem).not.toHaveAttribute("aria-activedescendant");
    Array(NUM_MOCK_CHILDREN)
      .map((_, idx) => getMenuItemIdFor(idx))
      .forEach((inactiveId) =>
        expect(result.queryByTestId(inactiveId)).not.toHaveFocus()
      );
  }
};

describe.each`
  menuRole
  ${"menu"}
  ${"listbox"}
`("menuRole=$menuRole", ({ menuRole }) => {
  describe.each`
    disabled
    ${true}
    ${false}
  `("disabled=$disabled", ({ disabled }) => {
    let result: RenderResult;
    beforeEach(() => {
      result = render(
        <DropDown
          disabled={disabled}
          labelId={MOCK_LABEL_ID}
          menuRole={menuRole}
          toggleChildren={<span>{MOCK_TOGGLE_TEXT}</span>}
        >
          {...MOCK_SECTIONED_CHILDREN}
        </DropDown>
      );
    });

    test(`toggle has expected id and aria-* attributes`, () => {
      assertToggleAttributes(result, false, menuRole, MOCK_LABEL_ID);
    });

    test(`toggle has text content: "${MOCK_TOGGLE_TEXT}"`, () => {
      expect(result.getByTestId(DROP_DOWN_ELEM.toggle)).toHaveTextContent(
        MOCK_TOGGLE_TEXT
      );
    });

    test("menu is NOT open", () => {
      assertIsMenuOpen(result, false);
    });

    test(`toggle button is ${disabled ? "" : "NOT "}disabled`, () => {
      disabled
        ? expect(result.getByTestId(DROP_DOWN_ELEM.toggle)).toBeDisabled()
        : expect(result.getByTestId(DROP_DOWN_ELEM.toggle)).not.toBeDisabled();
    });
  });

  describe("click toggle button", () => {
    const menuRole = "menu";
    let result: RenderResult;

    beforeEach(() => {
      result = render(
        <DropDown
          menuRole={menuRole}
          toggleChildren={<span>{MOCK_TOGGLE_TEXT}</span>}
        >
          {...MOCK_INDEPENDENT_CHILDREN}
        </DropDown>
      );
      act(() => result.getByTestId(DROP_DOWN_ELEM.toggle).click());
    });

    test(`toggle has expected id and aria-* attributes`, () => {
      assertToggleAttributes(result, true, menuRole);
    });

    test("menu is open", () => {
      assertIsMenuOpen(result, true);
    });

    test("menu has expected id, role, tabIndex, and aria-labelledby attributes", () => {
      assertMenuAttributes(result, menuRole);
    });

    test(`0-indexed item is focused when getInitialIdxToFocus is not provided`, () => {
      assertFocusedIdx(result, 0);
    });

    test("the ArrowUp & ArrowDown keys change which menu item is focused", () => {
      // Press arrow up until at the top + press again to verify focus stays at the top
      for (let prevFocusedIdx = 0; prevFocusedIdx >= 0; prevFocusedIdx--) {
        fireEvent.keyDown(result.getByTestId(DROP_DOWN_ELEM.container), {
          key: "ArrowUp",
        });
        assertFocusedIdx(result, Math.max(0, prevFocusedIdx - 1));
      }

      // Press arrow down until at the bottom + press again to verify focus stays at the bottom
      for (
        let prevFocusedIdx = 0;
        prevFocusedIdx < NUM_MOCK_CHILDREN;
        prevFocusedIdx++
      ) {
        fireEvent.keyDown(result.getByTestId(DROP_DOWN_ELEM.container), {
          key: "ArrowDown",
        });
        assertFocusedIdx(
          result,
          Math.min(prevFocusedIdx + 1, NUM_MOCK_CHILDREN - 1)
        );
      }
    });

    test.each`
      key         | expIsMenuOpen
      ${"Escape"} | ${false}
      ${"Tab"}    | ${false}
      ${"."}      | ${true}
    `(
      "isMenuOpen=$expIsMenuOpen after pressing the $key key",
      ({ key, expIsMenuOpen }) => {
        fireEvent.keyDown(result.getByTestId(DROP_DOWN_ELEM.container), {
          key,
        });

        assertIsMenuOpen(result, expIsMenuOpen);
        if (!expIsMenuOpen) {
          expect(result.getByTestId(DROP_DOWN_ELEM.toggle)).toHaveFocus();
        }
      }
    );

    test.each`
      newFocusedId                | expIsMenuOpen
      ${DROP_DOWN_ELEM.menu}      | ${true}
      ${getMenuItemIdFor(1)}      | ${true}
      ${DROP_DOWN_ELEM.toggle}    | ${true}
      ${DROP_DOWN_ELEM.container} | ${false}
    `(
      "isMenuOpen=$expIsMenuOpen after the $newFocusedId element is focused",
      ({ newFocusedId, expIsMenuOpen }) => {
        fireEvent.blur(result.getByTestId(DROP_DOWN_ELEM.menu), {
          relatedTarget: result.getByTestId(newFocusedId),
        });
        assertIsMenuOpen(result, expIsMenuOpen);
      }
    );
  });
});
