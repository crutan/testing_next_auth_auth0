import { render } from "@testing-library/react";
import { assertTextContent } from "ui/shared.spec";
import { expect, test } from "vitest";

import FormFieldLabel from "./FormFieldLabel";

const EXP_TEXT_COLOR_CLASSES = ["peer-disabled:text-onyx-500"];
test(`className contains ['${EXP_TEXT_COLOR_CLASSES.join("', '")}']`, () => {
  const result = render(<FormFieldLabel>Some label</FormFieldLabel>);
  expect(result.container.firstChild).toHaveClass(...EXP_TEXT_COLOR_CLASSES);
});

assertTextContent(<FormFieldLabel />);
