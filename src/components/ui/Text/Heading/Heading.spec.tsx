import { render } from "@testing-library/react";
import { assertElementTag, assertTextContent } from "ui/shared.spec";
import { expect, test } from "vitest";

import Heading from "./Heading";

const EXP_DEFAULT_WEIGHT = "book";
const EXP_DEFAULT_WEIGHT_CLASS = "font-normal";
test(`className contains "${EXP_DEFAULT_WEIGHT_CLASS}" for default weight "${EXP_DEFAULT_WEIGHT}"`, () => {
  const result = render(<Heading size="h3" />);
  expect(result.container.firstChild).toHaveClass(EXP_DEFAULT_WEIGHT_CLASS);
});

assertTextContent(<Heading size="h1" />);

assertElementTag(<Heading size="h2" />, undefined, "h2");
assertElementTag(<Heading size="h3" />, "h6", "h6");
