import React from "react";
import { render } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import Callout from "./Callout";

const action = vi.fn();

beforeEach(() => {
  action.mockClear();
});

describe("Callouts", () => {
  describe.each`
    variant      | expClasses
    ${"info"}    | ${"bg-info-100 text-info-500"}
    ${"success"} | ${"bg-success-100 text-success-500"}
    ${"warning"} | ${"bg-warning-100 text-warning-500"}
    ${"error"}   | ${"bg-error-100 text-error-500"}
  `("describe variant=$variant", ({ variant, expClasses }) => {
    test(`className contains '${expClasses}'`, () => {
      const result = render(
        <Callout
          action={action}
          actionLabel="Action"
          copy="Lorem Ipsum testing copy content"
          dismissLabel="Dismiss"
          header="Attention Needed"
          variant={variant}
        />
      );
      expect(result.getByTestId("callout-container")).toHaveClass(expClasses);
    });

    test.each`
      size        | expSize
      ${"normal"} | ${"max-w-[600px]"}
      ${"full"}   | ${"w-full"}
    `(`className contains $expSize for size=$size`, ({ size, expSize }) => {
      const result = render(
        <Callout header="Attention Needed" size={size} variant={variant} />
      );
      expect(result.getByTestId("callout-container")).toHaveClass(expSize);
    });

    test("Renders a link with URL if linkLabel and url are provided", () => {
      const result = render(
        <Callout
          copy="Lorem Ipsum testing copy content"
          header="Attention Needed"
          linkLabel="link label"
          linkUrl="http://www.example.com"
          variant="info"
        />
      );

      const linkContainer = result.getByTestId("callout-link-url");

      expect(linkContainer).toHaveTextContent("link label");
      expect(linkContainer).toHaveAttribute("href", "http://www.example.com");
      expect(linkContainer).toHaveAttribute("target", "_blank");
    });
  });
});

describe("dismiss button", () => {
  test("renders a dismiss button", () => {
    const setIsVisible = vi.fn();
    vi.spyOn(React, "useState").mockReturnValue([true, setIsVisible]);

    const result = render(
      <Callout
        copy="Lorem Ipsum testing copy content"
        dismissLabel="Dismiss Label"
        header="Attention Needed"
        variant="info"
      />
    );

    const dismissButton = result.getByTestId("dismiss-button");

    expect(dismissButton).toBeInTheDocument();
    expect(dismissButton).toHaveTextContent("Dismiss Label");

    dismissButton.click();

    expect(setIsVisible).toHaveBeenCalledWith(false);
  });

  test("does not render a dismiss button", () => {
    const result = render(
      <Callout
        copy="Lorem Ipsum testing copy content"
        dismissible={false}
        header="Attention Needed"
        variant="info"
      />
    );
    const dismissButton = result.queryByTestId("dismiss-button");
    expect(dismissButton).not.toBeInTheDocument();
  });
});

describe("action button", () => {
  test("renders a action button and fires event when clicked", () => {
    const result = render(
      <Callout
        action={action}
        actionLabel="Action Label"
        copy="Lorem Ipsum testing copy content"
        header="Attention Needed"
        variant="info"
      />
    );

    const actionButton = result.getByTestId("callout-button-action");

    expect(actionButton).toBeInTheDocument();
    expect(actionButton).toHaveTextContent("Action Label");

    actionButton.click();

    expect(action).toHaveBeenCalledTimes(1);
  });
});
