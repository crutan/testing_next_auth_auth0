import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import TextArea from "./TextArea";

import { cn } from "@/lib/utils/twHelpers";
const BASE_WRAPPER_CLASSES =
  "flex bg-onyx-800 text-onyx-200 border items-center gap-2 px-3 py-2 rounded-md focus-within:bg-onyx-700 disabled:bg-onyx-800 disabled:border-onyx-700 disabled:resize-none disabled:cursor-not-allowed";
describe.each`
  status       | expStatusClass
  ${"normal"}  | ${"border-onyx-700"}
  ${"error"}   | ${"border-error-500 text-error-500"}
  ${"success"} | ${"border-success-500 text-success-500"}
  ${"warning"} | ${"border-warning-500 text-warning-500"}
`("describe status=$status", ({ status, expStatusClass }) => {
  test(`className contains '${expStatusClass}'`, () => {
    const result = render(<TextArea status={status} />);
    const classes = cn(BASE_WRAPPER_CLASSES, expStatusClass);
    expect(result.getByTestId("textareaWrapper")).toHaveClass(classes);
  });

  test(`textarea is required when required=true'`, () => {
    const result = render(<TextArea label="test" required status={status} />);
    expect(result.getByTestId("textarea")).toBeRequired();
  });

  test(`contains help text`, () => {
    const result = render(<TextArea helpText="help text" />);
    expect(result.getAllByText("help text")).toBeTruthy();
  });

  test("colors change when disabled", () => {
    const result = render(
      <TextArea disabled helpText="this is help text" label="test label" />
    );
    expect(result.getByTestId("textareaWrapper")).toHaveClass(
      "bg-onyx-800 border-onyx-700 disabled:bg-onyx-800 disabled:border-onyx-700 disabled:resize-none disabled:cursor-not-allowed"
    );

    expect(result.getByTestId("helpText")).toHaveClass(
      "w-full text-sm text-onyx-300 peer-disabled:text-onyx-600"
    );
  });
});
