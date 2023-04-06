import { RefObject } from "react";
import React from "react";
import { fireEvent, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";

import ModalWrapper from "./ModalWrapper";

enum ELEM {
  wrapper = "ModalWrapper",
}

const assertFocus = (shift: boolean, expElemWithFocus: Element) => {
  userEvent.tab({ shift });
  expect(expElemWithFocus).toHaveFocus();
};

const refocusRefMock = {
  current: {
    focus: vi.fn(),
  },
};
const refocusRef = refocusRefMock as unknown as RefObject<HTMLButtonElement>;
const onClose = vi.fn();

beforeEach(() => {
  refocusRefMock.current.focus.mockClear();
  onClose.mockClear();
});

test.each`
  isOpen
  ${true}
  ${false}
`("renders conditionally based on isOpen (=$isOpen)", ({ isOpen }) => {
  const result = render(
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      primaryButtonText="Test Button 1"
      refocusRef={refocusRef}
    />
  );
  const wrapperElem = expect(result.queryByTestId(ELEM.wrapper));
  isOpen ? wrapperElem.toBeVisible() : wrapperElem.not.toBeInTheDocument();
});

describe.each`
  secondaryButtonText | buttonToClick
  ${undefined}        | ${"primaryButton"}
  ${"Test Button 2"}  | ${"primaryButton"}
  ${"Test Button 2"}  | ${"secondaryButton"}
`(
  "click $buttonToClick when secondaryButtonText=$secondaryButtonText",
  ({ secondaryButtonText, buttonToClick }) => {
    test("refocusRef.current.focus() & onClose are called", () => {
      const result = render(
        <ModalWrapper
          isOpen={true}
          onClose={onClose}
          primaryButtonText="Test Button 1"
          refocusRef={refocusRef}
          secondaryButtonText={secondaryButtonText}
        />
      );
      result
        .queryAllByRole("button")
        [buttonToClick === "primaryButton" ? 0 : 1].click();
      expect(refocusRefMock.current.focus).toHaveBeenCalledTimes(1);
      expect(onClose).toHaveBeenCalledTimes(1);
      expect(onClose).toHaveBeenCalledWith(buttonToClick);
    });

    test("buttonProps.onClick is called", () => {
      const primaryButtonProps = {
        onClick: vi.fn(),
      };
      const secondaryButtonProps = {
        onClick: vi.fn(),
      };
      const result = render(
        <ModalWrapper
          isOpen={true}
          onClose={onClose}
          primaryButtonProps={primaryButtonProps}
          primaryButtonText="Test Button 1"
          refocusRef={refocusRef}
          secondaryButtonProps={secondaryButtonProps}
          secondaryButtonText={secondaryButtonText}
        />
      );
      if (buttonToClick === "primaryButton") {
        result.queryAllByRole("button")[0].click();
        expect(primaryButtonProps.onClick).toHaveBeenCalledTimes(1);
        expect(secondaryButtonProps.onClick).toHaveBeenCalledTimes(0);
      } else {
        result.queryAllByRole("button")[1].click();
        expect(primaryButtonProps.onClick).toHaveBeenCalledTimes(0);
        expect(secondaryButtonProps.onClick).toHaveBeenCalledTimes(1);
      }
    });
  }
);

test("refocusRef.current.focus() & onClose are called after pressing ESC key", () => {
  render(
    <ModalWrapper
      isOpen={true}
      onClose={onClose}
      primaryButtonText="Test Button 1"
      refocusRef={refocusRef}
    />
  );
  fireEvent.keyDown(document.body, {
    key: "Escape",
  });
  expect(refocusRefMock.current.focus).toHaveBeenCalledTimes(1);
  expect(onClose).toHaveBeenCalledTimes(1);
  expect(onClose).toHaveBeenCalledWith("escKey");
});

test("focus is trapped to primary button when there is no secondary button", () => {
  const result = render(
    <ModalWrapper
      isOpen={true}
      onClose={onClose}
      primaryButtonText="Test Button 1"
      refocusRef={refocusRef}
    />
  );
  const primaryButton = result.queryAllByRole("button")[0];
  expect(primaryButton).toHaveFocus(); // default focus
  assertFocus(false, primaryButton); // tab focuses primary
  assertFocus(true, primaryButton); // tab + shift focuses primary
});

test("focus is trapped between two buttons when there is a secondary button", () => {
  const result = render(
    <ModalWrapper
      isOpen={true}
      onClose={onClose}
      primaryButtonText="Test Button 1"
      refocusRef={refocusRef}
      secondaryButtonText="Test Button 2"
    />
  );
  const primaryButton = result.queryAllByRole("button")[0];
  const secondaryButton = result.queryAllByRole("button")[1];

  expect(primaryButton).toHaveFocus(); // default focus
  assertFocus(false, secondaryButton); // tab focuses secondary
  assertFocus(false, primaryButton); // tab focuses primary
  assertFocus(false, secondaryButton); // tab focuses secondary
  assertFocus(true, primaryButton); // tab + shift focuses primary
  assertFocus(true, secondaryButton); // tab + shift focuses secondary
});
