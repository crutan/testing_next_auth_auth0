import { render } from "@testing-library/react";
import { assertElementTag, assertTextContent } from "ui/shared.spec";
import { expect, test } from "vitest";

import Body from "./Body";

const EXP_DEFAULT_TAG = "p";

const EXP_DEFAULT_SIZE = "base";
const EXP_DEFAULT_SIZE_CLASS = "text-base";
test(`className contains "${EXP_DEFAULT_SIZE_CLASS}" for default size "${EXP_DEFAULT_SIZE}"`, () => {
  const result = render(<Body />);
  expect(result.container.firstChild).toHaveClass(EXP_DEFAULT_SIZE_CLASS);
});

const EXP_DEFAULT_WEIGHT = "book";
const EXP_DEFAULT_WEIGHT_CLASS = "font-normal";
test(`className contains "${EXP_DEFAULT_WEIGHT_CLASS}" for default weight "${EXP_DEFAULT_WEIGHT}"`, () => {
  const result = render(<Body />);
  expect(result.container.firstChild).toHaveClass(EXP_DEFAULT_WEIGHT_CLASS);
});

assertTextContent(<Body />);

assertElementTag(<Body size="small" />, undefined, EXP_DEFAULT_TAG);
assertElementTag(<Body size="xsmall" />, "span", "span");
