import { render, RenderResult } from "@testing-library/react";
import { expect, test } from "vitest";

import Badge from "./Badge";

enum ELEM {
  container = "BadgeContainer",
  icon = "BadgeIcon",
}

test.each`
  iconPosition  | expContainerClass
  ${undefined}  | ${"pl-2"}
  ${"leading"}  | ${"pl-2"}
  ${"trailing"} | ${"pr-2"}
`(
  "className contains $expContainerClass for iconPosition=$iconPosition",
  ({ iconPosition, expContainerClass }) => {
    const result = render(
      <Badge icon="XMarkIcon" iconPosition={iconPosition}>
        Badge
      </Badge>
    );
    expect(result.getByTestId(ELEM.container)).toHaveClass(expContainerClass);
  }
);

test.each`
  size         | expContainerClass
  ${undefined} | ${"text-base leading-normal"}
  ${"large"}   | ${"text-base leading-normal"}
  ${"small"}   | ${"text-sm leading-[1.2]"}
`(
  "className contains $expContainerClass for size=$size",
  ({ size, expContainerClass }) => {
    const result = render(<Badge size={size}>Badge</Badge>);
    expect(result.getByTestId(ELEM.container)).toHaveClass(expContainerClass);
  }
);

describe.each`
  color          | expContainerClass                        | expIconClass
  ${undefined}   | ${"bg-onyx-100 text-onyx-800"}           | ${"text-onyx-500"}
  ${"celesteal"} | ${"bg-celesteal-100 text-celesteal-800"} | ${"text-celesteal-600"}
  ${"success"}   | ${"bg-success-100 text-success-500"}     | ${"text-success-500"}
  ${"info"}      | ${"bg-info-100 text-info-500"}           | ${"text-info-500"}
`("describe color=$color", ({ color, expContainerClass, expIconClass }) => {
  let result: RenderResult;
  beforeEach(() => {
    result = render(
      <Badge color={color} icon="XMarkIcon">
        Badge
      </Badge>
    );
  });

  test(`container className contains '${expContainerClass}'`, () => {
    expect(result.getByTestId(ELEM.container)).toHaveClass(expContainerClass);
  });

  test(`icon className contains '${expIconClass}'`, () => {
    expect(result.getByTestId(ELEM.icon)).toHaveClass(expIconClass);
  });
});
