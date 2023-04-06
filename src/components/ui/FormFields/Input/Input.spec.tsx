import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import Input from "./Input";

import { cn } from "@/lib/utils/twHelpers";

describe.each`
  statusType   | iconPlacement | expStatusClass
  ${"normal"}  | ${"left"}     | ${"border-onyx-700"}
  ${"error"}   | ${"right"}    | ${"border-error-500 text-error-500"}
  ${"success"} | ${"right"}    | ${"border-success-500 text-success-500"}
  ${"warning"} | ${"right"}    | ${"border-warning-500 text-warning-500"}
`(
  "describe status=$statusType",
  ({ statusType, expStatusClass, iconPlacement }) => {
    test(`classes for '${statusType} status'`, () => {
      const result = render(<Input status={statusType} />);
      const classes = cn(expStatusClass);
      expect(result.getByTestId("inputWrapper")).toHaveClass(classes);
    });

    test(`input is required when required=true'`, () => {
      const result = render(
        <Input label="test" required status={statusType} />
      );
      expect(result.getByTestId("input")).toBeRequired();
    });

    test(`contains help text`, () => {
      const result = render(<Input helpText="help text" />);
      expect(result.getAllByText("help text")).toBeTruthy();
    });

    test(`contains icon placed to ${iconPlacement}`, () => {
      const result = render(
        <Input
          icon="ArchiveBoxIcon"
          iconFormat="solid"
          iconPlacement={iconPlacement}
        />
      );
      const inputContainer = result.getByTestId("inputWrapper");
      const icon = result.getByTestId("icon");
      if (iconPlacement === "left") {
        expect(inputContainer.firstChild).toBe(icon);
      } else {
        expect(inputContainer.lastChild).toBe(icon);
      }
    });

    test(`disabled state`, () => {
      const result = render(<Input disabled />);
      expect(result.getByTestId("input")).toBeDisabled();
      expect(result.getByTestId("inputWrapper")).toHaveClass(
        "bg-onyx-800 text-onyx-600 border-onyx-700 resize-none cursor-not-allowed"
      );
    });
  }
);
