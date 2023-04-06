// @vitest-environment jsdom

import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { describe, vi } from "vitest";

import { assertToastandClose } from "../shared.spec";

import { MockToast } from "./Toast.mock";

afterAll(() => {
  vi.clearAllMocks();
  cleanup();
});

describe("Toast Component", () => {
  describe.each`
    type           | visible
    ${"celesteal"} | ${false}
    ${"error"}     | ${true}
    ${"info"}      | ${true}
    ${"warning"}   | ${true}
    ${"success"}   | ${true}
  `("Toaster Component", ({ type, visible }) => {
    test(`When type=${type} it should${
      visible ? "" : " not"
    } show an icon`, () => {
      const result = render(
        <MockToast title="icon render test" toastType={type} />
      );

      const toastButton = result.getByTestId("mock-button");

      fireEvent.click(toastButton);

      const toastIconWrapper = result.queryByTestId("toast-icon-wrapper");
      visible
        ? expect(toastIconWrapper).toBeVisible()
        : expect(toastIconWrapper).not.toBeInTheDocument();

      assertToastandClose(result);
    });
  });
});

describe.each`
  action
  ${(<a href="example.com">test</a>)}
  ${undefined}
`("Toaster Component", ({ action }) => {
  test(`When action is set it should render a link`, () => {
    const result = render(
      <MockToast action={action} title="action render test" />
    );

    const toastButton = result.getByTestId("mock-button");

    fireEvent.click(toastButton);

    if (action) {
      const links = result.getByTestId("toast-action");
      expect(links).toBeDefined();
    }

    if (!action) {
      const links = result.queryByTestId("toast-action");
      expect(links).toBeNull();
    }

    assertToastandClose(result);
  });
});
