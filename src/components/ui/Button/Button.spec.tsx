import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import Button from "./Button";

describe("Button with text", () => {
  describe.each`
    size        | expClasses
    ${"xsmall"} | ${"px-2 py-1 text-[0.75rem] leading-[1.2] normal-case rounded-md focus-visible:outline-1"}
    ${"small"}  | ${"px-2 py-1.5 text-[0.75rem] leading-[1.2] normal-case rounded-md focus-visible:outline-1"}
    ${"base"}   | ${"px-4 py-2 text-base leading-none uppercase rounded-md focus-visible:outline-1"}
    ${"large"}  | ${"px-4 py-3 text-base leading-none uppercase rounded-md focus-visible:outline-1"}
    ${"xlarge"} | ${"px-6 py-4 text-base leading-none uppercase rounded-md focus-visible:outline-1"}
  `("describe size=$size", ({ size, expClasses }) => {
    test(`className contains '${expClasses}'`, () => {
      const result = render(
        <Button size={size} theme="primary">
          Button
        </Button>
      );
      expect(result.container.firstChild).toHaveClass(expClasses);
    });

    test.each`
      theme          | expTheme
      ${"primary"}   | ${"bg-celesteal-500"}
      ${"secondary"} | ${"bg-onyx-100"}
      ${"tertiary"}  | ${"bg-transparent"}
    `(
      `className contains $expTheme for theme=$theme`,
      ({ theme, expTheme }) => {
        const result = render(<Button theme={theme}>Button</Button>);
        expect(result.container.firstChild).toHaveClass(expTheme);
      }
    );

    test.each`
      iconPosition
      ${"leading"}
      ${"trailing"}
    `(
      `when icon is present, icon node is positioned $iconPosition`,
      ({ iconPosition }) => {
        const result = render(
          <Button
            icon="ArchiveBoxIcon"
            iconFormat="solid"
            iconPosition={iconPosition}
          >
            Button
          </Button>
        );
        const button = result.getByTestId("button");
        const icon = result.getByTestId("icon");
        if (iconPosition === "leading") {
          expect(button.firstChild).toBe(icon);
        } else {
          expect(button.lastChild).toBe(icon);
        }
      }
    );
  });
});

describe("Button with icon only", () => {
  describe.each`
    size        | expClasses
    ${"xsmall"} | ${"p-[5px] rounded-full focus-visible:outline-2"}
    ${"small"}  | ${"p-[7px] rounded-full focus-visible:outline-2"}
    ${"base"}   | ${"p-[9px] rounded-full focus-visible:outline-2"}
    ${"large"}  | ${"p-[9px] rounded-full focus-visible:outline-2"}
    ${"xlarge"} | ${"p-[13px] rounded-full focus-visible:outline-2"}
  `("describe size=$size", ({ size, expClasses }) => {
    test(`className contains '${expClasses}'`, () => {
      const result = render(
        <Button icon="AcademicCapIcon" size={size} theme="primary" />
      );
      expect(result.container.firstChild).toHaveClass(expClasses);
    });
  });
});
