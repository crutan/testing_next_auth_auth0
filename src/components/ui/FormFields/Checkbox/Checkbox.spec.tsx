import { act } from "react-dom/test-utils";
import { render, RenderResult } from "@testing-library/react";
import { expect, test, vi } from "vitest";

import Checkbox from "./Checkbox";

export enum CHECKBOX_ELEM {
  container = "CheckboxContainer",
  input = "CheckboxInput",
  button = "CheckboxButton",
  buttonIcon = "CheckboxButtonIcon",
}

describe.each`
  childrenPosition | expContainerClass    | expRelativePositionToToggle
  ${undefined}     | ${"justify-start"}   | ${"DOCUMENT_POSITION_FOLLOWING"}
  ${"right"}       | ${"justify-start"}   | ${"DOCUMENT_POSITION_FOLLOWING"}
  ${"left"}        | ${"justify-between"} | ${"DOCUMENT_POSITION_PRECEDING"}
`(
  "describe childrenPosition=$childrenPosition",
  ({ childrenPosition, expContainerClass, expRelativePositionToToggle }) => {
    const TEST_CHILD = "Notifications";

    let result: RenderResult;
    beforeEach(() => {
      result = render(
        <Checkbox childrenPosition={childrenPosition}>{TEST_CHILD}</Checkbox>
      );
    });

    test(`container className contains '${expContainerClass}'`, () => {
      expect(result.getByTestId(CHECKBOX_ELEM.container)).toHaveClass(
        expContainerClass
      );
    });

    test(`child's position relative to the button is '${expRelativePositionToToggle}'`, () => {
      const button = result.getByTestId(CHECKBOX_ELEM.button);
      const testChild = result.getByText(TEST_CHILD);
      expect(button.compareDocumentPosition(testChild)).toEqual(
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
      ? expect(result.getByTestId(CHECKBOX_ELEM.input)).toBeChecked()
      : expect(result.getByTestId(CHECKBOX_ELEM.input)).not.toBeChecked();
  };

  const clickAndAssertIsChecked = (expIsChecked: boolean) => {
    onChange.mockClear();
    act(() => result.getByTestId(CHECKBOX_ELEM.button).click());
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
      <Checkbox defaultChecked={defaultChecked} onChange={onChange}>
        Push Notification
      </Checkbox>
    );
  });

  test(`clicking the checkbox toggles it to '${!defaultChecked}' then '${Boolean(
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
