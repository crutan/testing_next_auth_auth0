import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import { assertToastandClose } from "../shared.spec";

import { MockToast } from "./Toast.mock";

afterAll(() => {
  vi.clearAllMocks();
  cleanup();
});

describe("Toast Core Components", () => {
  describe.each`
    variant           | expClasses
    ${"default"}      | ${"rounded-lg"}
    ${"accentBorder"} | ${"accentBorder rounded-r-lg border-l-4"}
  `("describe variant=$variant", ({ variant, expClasses }) => {
    test(`className contains '${expClasses}'`, () => {
      const result = render(<MockToast variant={variant} />);

      const openToast = result.getByTestId("mock-button");

      fireEvent.click(openToast);
      expect(result.getByTestId("toast-element")).toHaveClass(expClasses);

      assertToastandClose(result);
    });
  });

  describe.each`
    toastType      | expClasses
    ${"celesteal"} | ${"border-celesteal-700 bg-celesteal-100 text-celesteal-700 shadow-celesteal-700"}
    ${"info"}      | ${"border-info-500 bg-info-100 text-info-500"}
    ${"success"}   | ${"border-success-500 bg-success-100 text-success-500 shadow-success-500"}
    ${"warning"}   | ${"border-warning-500 bg-warning-100 text-warning-500 shadow-warning-500"}
    ${"error"}     | ${"border-error-500 bg-error-100 text-error-500 shadow-error-500"}
  `("describe toastType=$toastType", ({ toastType, expClasses }) => {
    test(`className contains '${expClasses}'`, () => {
      const result = render(<MockToast toastType={toastType} />);

      const openToast = result.getByTestId("mock-button");
      const viewport = result.getByTestId("toast-viewport");

      fireEvent.click(openToast);

      const toast = result.getByTestId("toast-element");

      expect(viewport).toContainElement(toast);
      expect(toast).toHaveClass(expClasses);

      assertToastandClose(result);

      expect(viewport).not.toContainElement(toast);
    });
  });
});
