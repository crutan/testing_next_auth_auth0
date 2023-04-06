import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import Hero from "./Hero";

describe("Renders a Hero Component", () => {
  test("renders a heading", () => {
    const { getByText } = render(<Hero />);
    const heading = getByText("Auth0 Integration Exploration");
    const button = getByText("Get started");

    expect(heading).toBeTruthy();
    expect(button).toBeTruthy();
  });
});
