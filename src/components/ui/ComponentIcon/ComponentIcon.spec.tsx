import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import ComponentIcon from "./ComponentIcon";
import { IconUnion } from "./ComponentIcon.types";

describe.each`
  icon
  ${"AcademicCapIcon"}
  ${"DotIcon"}
`("Creates an Icon from icon prop", ({ icon }) => {
  test("Creates a solid icon", () => {
    const result = render(<ComponentIcon icon={icon} />);
    expect(result.container.firstChild).toBeInstanceOf(SVGElement);
  });

  test("Creates a outline icon", () => {
    const result = render(<ComponentIcon format="outline" icon={icon} />);
    expect(result.container.firstChild).toBeInstanceOf(SVGElement);
  });
});

test("returns null for unknown icon", () => {
  const result = render(<ComponentIcon icon={"unknown" as IconUnion} />);
  expect(result.container.firstChild).toBeNull();
});
