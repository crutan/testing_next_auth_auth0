import { act } from "react-dom/test-utils";
import { render, RenderResult } from "@testing-library/react";
import { expect, test, vi } from "vitest";

import Switch from "./Switch";

enum ELEM {
  container = "SwitchContainer",
  input = "SwitchInput",
  toggle = "SwitchToggle",
  toggleCircle = "SwitchToggleCircle",
  toggleCircleIcon_XMark = "SwitchToggleCircleIcon_XMark",
  toggleCircleIcon_Check = "SwitchToggleCircleIcon_Check",
}

describe.each`
  size          | expContainerClass | expToggleClasses   | expToggleCircleClasses
  ${undefined}  | ${"gap-x-3"}      | ${["w-11", "h-6"]} | ${["my-0.5", "ml-0.5"]}
  ${"standard"} | ${"gap-x-3"}      | ${["w-11", "h-6"]} | ${["my-0.5", "ml-0.5"]}
  ${"small"}    | ${"gap-x-2"}      | ${["w-9", "h-5"]}  | ${["my-0", "ml-0"]}
`(
  "describe size=$size",
  ({ size, expContainerClass, expToggleClasses, expToggleCircleClasses }) => {
    let result: RenderResult;
    beforeEach(() => {
      result = render(<Switch size={size} withIcons={true} />);
    });

    test(`container className contains '${expContainerClass}'`, () => {
      expect(result.getByTestId(ELEM.container)).toHaveClass(expContainerClass);
    });
    test(`toggle className contains '${expToggleClasses}'`, () => {
      expect(result.getByTestId(ELEM.toggle)).toHaveClass(...expToggleClasses);
    });
    test(`toggleCircle className contains '${expToggleCircleClasses}'`, () => {
      expect(result.getByTestId(ELEM.toggleCircle)).toHaveClass(
        ...expToggleCircleClasses
      );
    });
  }
);

describe.each`
  childrenPosition | expContainerClass    | expRelativePositionToToggle
  ${undefined}     | ${"justify-start"}   | ${"DOCUMENT_POSITION_FOLLOWING"}
  ${"right"}       | ${"justify-start"}   | ${"DOCUMENT_POSITION_FOLLOWING"}
  ${"left"}        | ${"justify-between"} | ${"DOCUMENT_POSITION_PRECEDING"}
`(
  "describe childrenPosition=$childrenPosition",
  ({ childrenPosition, expContainerClass, expRelativePositionToToggle }) => {
    const TEST_CHILD = "Remember me";

    let result: RenderResult;
    beforeEach(() => {
      result = render(
        <Switch childrenPosition={childrenPosition}>{TEST_CHILD}</Switch>
      );
    });

    test(`container className contains '${expContainerClass}'`, () => {
      expect(result.getByTestId(ELEM.container)).toHaveClass(expContainerClass);
    });

    test(`child's position relative to the toggle is '${expRelativePositionToToggle}'`, () => {
      const toggle = result.getByTestId(ELEM.toggle);
      const testChild = result.getByText(TEST_CHILD);
      expect(toggle.compareDocumentPosition(testChild)).toEqual(
        Node[expRelativePositionToToggle as keyof typeof Node]
      );
    });
  }
);

describe.each`
  defaultChecked
  ${undefined}
  ${false}
  ${true}
`("describe defaultChecked=$defaultChecked", ({ defaultChecked }) => {
  const onChange = vi.fn();
  let result: RenderResult;

  const assertIsChecked = (expIsChecked: boolean) => {
    expIsChecked
      ? expect(result.getByTestId(ELEM.input)).toBeChecked()
      : expect(result.getByTestId(ELEM.input)).not.toBeChecked();
  };

  const clickAndAssertIsChecked = (expIsChecked: boolean) => {
    onChange.mockClear();
    act(() => result.getByTestId(ELEM.toggle).click());
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ checked: expIsChecked }),
      })
    );
    assertIsChecked(expIsChecked);
  };

  beforeEach(() => {
    onChange.mockClear();
    result = render(
      <Switch
        defaultChecked={defaultChecked}
        onChange={onChange}
        withIcons={true}
      />
    );
  });

  test(`clicking the switch toggles it to '${!defaultChecked}' then '${Boolean(
    defaultChecked
  )}'`, () => {
    // Initial state
    expect(onChange).not.toHaveBeenCalled();
    assertIsChecked(Boolean(defaultChecked));

    // First click - expect next state
    clickAndAssertIsChecked(!defaultChecked);

    // Second click - expect previous state
    clickAndAssertIsChecked(Boolean(defaultChecked));
  });
});
