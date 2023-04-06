import React from "react";
import { fireEvent, render, RenderResult } from "@testing-library/react";
import { expect, test, vi } from "vitest";

export const assertElementTag = (
  element: React.ReactElement,
  as: string | undefined,
  expTag: string
) =>
  test(`element tag is '${expTag}' when as='${as}'`, () => {
    const createElementSpy = vi.spyOn(React, "createElement");
    render(React.cloneElement(element, { as }));
    expect(createElementSpy).toHaveBeenCalledWith(
      expTag,
      expect.anything(),
      undefined
    );
    createElementSpy.mockClear();
  });

export const assertTextContent = (
  element: React.ReactElement,
  children: React.ReactNode = "hello World!",
  expTextContent = "hello World!"
) =>
  test(`text content is '${expTextContent}' when children='${children?.toString()}'`, () => {
    const result = render(React.cloneElement(element, undefined, children));
    expect(result.container.firstChild).toHaveTextContent(expTextContent);
  });

export const assertToastandClose = (result: RenderResult) => {
  const toast = result.getByTestId("toast-element");
  const close = result.getByTestId("toast-close");

  expect(toast).toBeDefined();
  expect(close).toBeDefined();

  fireEvent.click(close);

  expect(toast).not.toBeInTheDocument();
};
