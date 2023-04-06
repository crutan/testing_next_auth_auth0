import { createRef } from "react";
import { render } from "@testing-library/react";
import { expect, test } from "vitest";

import ModalContent from "./ModalContent";

enum ELEM {
  container = "ModalContentContainer",
  icon = "ModalContentIcon",
  headingsContainer = "ModalContentHeadingsContainer",
}
const primaryButtonRef = createRef<HTMLButtonElement>();
const secondaryButtonRef = createRef<HTMLButtonElement>();

test.each`
  type         | expIconClass
  ${"success"} | ${"bg-success-100 text-success-400"}
  ${"error"}   | ${"bg-error-100 text-error-400"}
`(
  "icon className contains $expIconClass for type=$type",
  ({ type, expIconClass }) => {
    const result = render(
      <ModalContent
        primaryButtonRef={primaryButtonRef}
        primaryButtonText="Test Button 1"
        secondaryButtonRef={secondaryButtonRef}
        showIcon
        type={type}
      />
    );
    expect(result.getByTestId(ELEM.icon)).toHaveClass(expIconClass);
  }
);

test.each`
  heading      | subHeading      | expHeadingsContainerShown | expNumHeadingsContainerChildren
  ${"Heading"} | ${"Subheading"} | ${true}                   | ${2}
  ${"Heading"} | ${undefined}    | ${true}                   | ${1}
  ${undefined} | ${"Subheading"} | ${true}                   | ${1}
  ${undefined} | ${undefined}    | ${false}                  | ${0}
`(
  "headings container is shown = $expSecondaryButtonShown (with $expNumHeadingsContainerChildren children) for heading=$heading & subHeading=$subHeading",
  ({
    heading,
    subHeading,
    expHeadingsContainerShown,
    expNumHeadingsContainerChildren,
  }) => {
    const result = render(
      <ModalContent
        heading={heading}
        primaryButtonRef={primaryButtonRef}
        primaryButtonText="Test Button 1"
        secondaryButtonRef={secondaryButtonRef}
        subHeading={subHeading}
      />
    );
    const headingsContainerElem = result.queryByTestId(ELEM.headingsContainer);
    if (expHeadingsContainerShown) {
      expect(headingsContainerElem).toBeVisible();
      expect(headingsContainerElem?.children.length).toEqual(
        expNumHeadingsContainerChildren
      );
    } else {
      expect(headingsContainerElem).not.toBeInTheDocument();
    }
  }
);

test.each`
  secondaryButtonText | expSecondaryButtonShown
  ${"Test Button 2"}  | ${true}
  ${undefined}        | ${false}
`(
  `secondary button is shown = $expSecondaryButtonShown for secondaryButtonText=$secondaryButtonText`,
  ({ secondaryButtonText, expSecondaryButtonShown }) => {
    const result = render(
      <ModalContent
        primaryButtonRef={primaryButtonRef}
        primaryButtonText="Test Button 1"
        secondaryButtonRef={secondaryButtonRef}
        secondaryButtonText={secondaryButtonText}
      />
    );
    expect(result.queryAllByRole("button").length).toBe(
      expSecondaryButtonShown ? 2 : 1
    );
  }
);
