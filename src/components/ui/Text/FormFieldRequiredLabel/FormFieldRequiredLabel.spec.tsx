import { render, RenderResult } from "@testing-library/react";
import { assertTextContent } from "ui/shared.spec";
import { expect, test } from "vitest";

import FormFieldRequiredLabel from "./FormFieldRequiredLabel";

enum ELEM {
  label = "FormFieldRequiredLabel",
  requiredSpan = "FormFieldRequiredLabelRequiredSpan",
}

const MOCK_ID = "someId";

test.each`
  disabled     | expLabelClass
  ${undefined} | ${"flex gap-1"}
  ${false}     | ${"flex gap-1"}
  ${true}      | ${"flex gap-1 text-onyx-500"}
`(
  "label className contains $expLabelClass when disabled=$disabled",
  ({ disabled, expLabelClass }) => {
    const result = render(
      <FormFieldRequiredLabel disabled={disabled} id={MOCK_ID}>
        Name
      </FormFieldRequiredLabel>
    );
    expect(result.getByTestId(ELEM.label)).toHaveClass(expLabelClass);
  }
);

describe.each`
  required
  ${undefined}
  ${false}
  ${true}
`("required=$required", ({ required }) => {
  let result: RenderResult;
  beforeEach(() => {
    result = render(
      <FormFieldRequiredLabel id={MOCK_ID} required={required}>
        Email Address
      </FormFieldRequiredLabel>
    );
  });

  test(`red asterisk is ${required ? "" : "NOT "}shown`, () => {
    const requiredSpanElem = result.queryByTestId(ELEM.requiredSpan);
    if (required) {
      expect(requiredSpanElem).toBeVisible();
      expect(requiredSpanElem).toHaveTextContent("*");
      expect(requiredSpanElem).toHaveClass("text-error-300");
    } else {
      expect(requiredSpanElem).not.toBeInTheDocument();
    }
  });
});

test(`id is set to "label-{id}"`, () => {
  const result = render(
    <FormFieldRequiredLabel id={MOCK_ID}>Some label</FormFieldRequiredLabel>
  );
  expect(result.getByTestId(ELEM.label).id).toEqual(`label-${MOCK_ID}`);
});

assertTextContent(<FormFieldRequiredLabel id={MOCK_ID} />);
