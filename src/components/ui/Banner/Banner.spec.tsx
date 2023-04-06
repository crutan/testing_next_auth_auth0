// @vitest-environment jsdom

import React from "react";
import { act, render } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";

import Banner from "./Banner";

const setVisible = vi.fn();
const setBannerClose = vi.fn();

beforeEach(() => {
  setVisible.mockClear();
  setBannerClose.mockClear();
});

describe("Banners", () => {
  describe.each`
    variant      | expClasses
    ${"neutral"} | ${"bg-gray-100 text-gray-500"}
    ${"info"}    | ${"bg-info-100 text-info-500"}
    ${"success"} | ${"bg-success-100 text-success-500"}
    ${"warning"} | ${"bg-warning-100 text-warning-500"}
    ${"error"}   | ${"bg-error-100 text-error-500"}
  `("describe variant=$variant", ({ variant, expClasses }) => {
    test(`className contains '${expClasses}'`, () => {
      const result = render(
        <Banner
          bannerId={4}
          linkLabel="Details"
          linkUrl="http://www.example.com"
          variant={variant}
        >
          Lorem Ipsum testing copy content
        </Banner>
      );
      expect(result.getByTestId("banner")).toHaveClass(expClasses);
    });

    test.each`
      initValue
      ${true}
      ${false}
    `("visible should be $initValue", ({ initValue }) => {
      vi.spyOn(React, "useState").mockReturnValue([initValue, setVisible]);

      const result = render(
        <Banner
          bannerId={4}
          initValue={initValue}
          linkLabel="Details"
          linkUrl="http://www.example.com"
          variant={variant}
        >
          Lorem Ipsum testing copy content
        </Banner>
      );

      if (initValue) {
        expect(result.getByTestId("banner")).toBeInTheDocument();
      } else {
        expect(result.queryByTestId("banner")).not.toBeInTheDocument();
      }
    });

    test("Renders a link with URL if linkLabel and url are provided", () => {
      const result = render(
        <Banner
          bannerId={4}
          linkLabel="Details"
          linkUrl="http://www.example.com"
          variant={variant}
        >
          Lorem Ipsum testing copy content
        </Banner>
      );

      const linkContainer = result.getByTestId("banner-link");

      expect(linkContainer).toHaveTextContent("Details");
      expect(linkContainer).toHaveAttribute("href", "http://www.example.com");
    });

    test.each`
      dismissState
      ${false}
      ${true}
    `("dismiss button display should be $dismissState", ({ dismissState }) => {
      const result = render(
        <Banner
          bannerId={Math.random()}
          dismissable={dismissState}
          linkLabel="Details"
          linkUrl="http://www.example.com"
          variant={variant}
        >
          Lorem Ipsum testing copy content
        </Banner>
      );
      const test = result.queryByTestId("banner-dismiss-container");
      if (dismissState) {
        expect(test).toBeInTheDocument();
      } else {
        expect(test).not.toBeInTheDocument();
      }
    });

    test("should render null", () => {
      const result = render(
        <Banner
          bannerId={4}
          initValue={false}
          linkLabel="Details"
          linkUrl="http://www.example.com"
          variant={variant}
        >
          Lorem Ipsum testing copy content
        </Banner>
      );

      expect(result.container).toBeEmptyDOMElement();
    });
  });
});

describe("Banner Dimiss", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("should close once dismissed", () => {
    vi.spyOn(React, "useState").mockReturnValue([false, setBannerClose]);

    const result = render(
      <Banner
        bannerId={4}
        linkLabel="Details"
        linkUrl="http://www.example.com"
        variant="error"
      >
        Lorem Ipsum testing copy content
      </Banner>
    );

    const dismissButton = result.getByTestId("banner-dismiss");

    expect(setBannerClose).toHaveBeenCalledTimes(0);

    act(() => {
      dismissButton.click();

      vi.spyOn(React, "useState").mockReturnValue([true, setBannerClose]);

      vi.advanceTimersByTime(1000);
    });

    expect(setBannerClose).toHaveBeenCalledTimes(1);
  });
});
