import React from "react";
import { act, render } from "@testing-library/react";
import { expect, test } from "vitest";

import { DROP_DOWN_ELEM } from "../DropDown/DropDown.spec";

import Menu from "./Menu";
import MenuItem from "./MenuItem";

test.each`
  menuAnchor | expMenuClass
  ${"left"}  | ${"left-0"}
  ${"right"} | ${"right-0"}
`(
  "menu has class $expMenuClass when menuAnchor=$menuAnchor",
  ({ menuAnchor, expMenuClass }) => {
    const result = render(
      <Menu menuAnchor={menuAnchor}>
        <MenuItem>Menu Item 1</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
      </Menu>
    );
    act(() => result.getByTestId(DROP_DOWN_ELEM.toggle).click());
    expect(result.getByTestId(DROP_DOWN_ELEM.menu)).toHaveClass(expMenuClass);
  }
);
