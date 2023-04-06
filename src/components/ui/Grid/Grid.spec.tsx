import { render } from "@testing-library/react";
import { assertElementTag } from "ui/shared.spec";
import { describe, expect, test } from "vitest";

import Grid from "./Grid";

describe.each`
  columns | expColumnsClass
  ${4}    | ${"grid-cols-4"}
  ${8}    | ${"grid-cols-8"}
  ${12}   | ${"grid-cols-12"}
  ${16}   | ${"grid-cols-16"}
`("describe size=$size", ({ columns, expColumnsClass }) => {
  test(`className contains '${expColumnsClass}'`, () => {
    const result = render(<Grid breakpoints="none" columns={columns} />);
    expect(result.container.firstChild).toHaveClass(expColumnsClass);
  });

  test.each`
    size           | expSize
    ${"fullBleed"} | ${"w-full"}
    ${"container"} | ${"container"}
  `(`className contains $expSize for size=$expSize`, ({ expSize, size }) => {
    const result = render(<Grid columns={columns} size={size} />);
    expect(result.container.firstChild).toHaveClass(expSize);
  });

  test.each`
    gap          | expGap
    ${"none"}    | ${"gap-0"}
    ${"minimal"} | ${"gap-4"}
    ${"loose"}   | ${"gap-8"}
  `(`className contains $expSize for size=$expSize`, ({ expGap, gap }) => {
    const result = render(<Grid columns={columns} gap={gap} />);
    expect(result.container.firstChild).toHaveClass(expGap);
  });

  assertElementTag(<Grid columns={columns} />, undefined, "div");
  assertElementTag(<Grid columns={columns} />, "section", "section");
  assertElementTag(<Grid columns={columns} />, "article", "article");
  assertElementTag(<Grid columns={columns} />, "main", "main");
  assertElementTag(<Grid columns={columns} />, "aside", "aside");
});
