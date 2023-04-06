// @vitest-environment jsdom

"use client";

import * as auth0 from "@auth0/nextjs-auth0";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Navigation from "./Navigation";

vi.mock("@auth0/nextjs-auth0");

describe("Renders a Navigation Component", () => {
  it("renders a navigation component", async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (auth0 as any).useUser = vi.fn().mockReturnValue({ user: true });
    const screen = render(
      <UserProvider>
        <Navigation />
      </UserProvider>
    );

    expect(screen).toBeTruthy();
    expect(screen.getByText("Home")).toBeTruthy();
  });
});
