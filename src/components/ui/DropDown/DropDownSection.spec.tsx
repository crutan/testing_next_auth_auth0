import { render } from "@testing-library/react";
import { expect, test } from "vitest";

import { DROP_DOWN_ELEM } from "./DropDown.spec";
import DropDownSection from "./DropDownSection";

test("nothing is rendered when children are not provided", () => {
  const result = render(<DropDownSection>{}</DropDownSection>);
  expect(result.queryByTestId(DROP_DOWN_ELEM.section)).not.toBeInTheDocument();
});

test("a div wraps the children and has the correct role and border classes", () => {
  const result = render(
    <DropDownSection>
      <p>Some Item</p>
    </DropDownSection>
  );
  const sectionElem = result.getByTestId(DROP_DOWN_ELEM.section);
  expect(sectionElem).toHaveAttribute("role", "group");
  expect(sectionElem).toHaveClass("border-b border-onyx-700 last:border-b-0");
});
